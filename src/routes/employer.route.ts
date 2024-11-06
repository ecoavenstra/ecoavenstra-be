import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";
import {
  getEmployerDashboard,
  employerEnquiry,
  updateJobApprovalStatus,
} from "../controllers/employer.js";

const route = Router();

route.post(
  "/recruit",
  // authenticateToken,
  // authorizeRole(["EMPLOYER"]),
  employerEnquiry
);

route.patch("/job/approve/:jobId", updateJobApprovalStatus);

export default route;
