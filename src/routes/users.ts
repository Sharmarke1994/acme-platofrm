import { Router } from "express";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/users", authMiddleware, (req, res) => {
  res.json({ users: [] });
});

router.post("/users", authMiddleware, (req, res) => {
  res.json({ created: true });
});

export default router;
