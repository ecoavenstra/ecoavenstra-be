import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";
import {
  getEmployerDashboard,
  employerEnquiry,
  updateJobApprovalStatus,
  ApplyJobs,
} from "../controllers/employer.js";
import { upload } from "../middleware/multer.js";

const route = Router();

route.post(
  "/recruit",
  // authenticateToken,
  // authorizeRole(["EMPLOYER"]),
  employerEnquiry
);

route.patch("/job/approve/:jobId", updateJobApprovalStatus);
route.post(
  "/apply-job",
  upload.fields([{ name: "resume", maxCount: 1 }]),
  ApplyJobs
);

export default route;
