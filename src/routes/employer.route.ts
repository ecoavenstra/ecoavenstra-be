import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";
import { getEmployerDashboard, employerEnquiry } from "../controllers/employer.js";

const route = Router();

route.post(
    "/recruit",
    // authenticateToken,
    // authorizeRole(["EMPLOYER"]),
    employerEnquiry
  );
  
export default route;
