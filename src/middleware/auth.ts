import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

interface JWTPayload {
  userId: string;
  role: "admin" | "user" | "readonly";
  permissions: string[];
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Attach decoded claims to request for downstream use
    (req as any).user = decoded;

    // Enforce admin-only routes
    if (req.path.startsWith("/admin") && decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin role required" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JWTPayload | undefined;
    if (!user || !user.permissions.includes(permission)) {
      return res.status(403).json({ error: `Missing permission: ${permission}` });
    }
    next();
  };
}
