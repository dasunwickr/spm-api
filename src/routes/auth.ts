import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { loginUser, registerUser } from "../controllers/authController";

const router = express.Router();

// Public routes
router.post("/signup", async (req, res, next) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    next(error);
  }
});

// Protected route
router.get("/protected", authenticateToken, (req, res, next) => {
  try {
    res.json({ message: "This is a protected route", user: req.body.user });
  } catch (error) {
    next(error);
  }
});

export default router;
