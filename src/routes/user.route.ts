import { Router } from "express";
import { getUserDashboard, login, Signup, forgotPassword, logout, verifyOtp } from "../controllers/user.js";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";

const route = Router();

route.post("/signup", Signup);
route.post("/login", login);
route.post("/logout", logout);
route.post("/forgot-password", forgotPassword);
route.post("/verify-otp", verifyOtp);


route.get(
    "/",
    authenticateToken,
    authorizeRole(["USER"]),
    getUserDashboard
  );

export default route;
