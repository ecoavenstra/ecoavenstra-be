import { Router } from "express";
import { employerEnquiry, updateJobApprovalStatus, } from "../controllers/employer.js";
const route = Router();
route.post("/recruit", 
// authenticateToken,
// authorizeRole(["EMPLOYER"]),
employerEnquiry);
route.patch("/job/approve/:jobId", updateJobApprovalStatus);
export default route;
