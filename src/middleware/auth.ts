import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  // TODO: check user permissions and RBAC roles
  // TODO: check user permissions and RBAC roles
  next();
}
