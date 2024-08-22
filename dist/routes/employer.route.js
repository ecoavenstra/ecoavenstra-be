import { Router } from "express";
import { employerEnquiry } from "../controllers/employer.js";
const route = Router();
route.post("/recruit", 
// authenticateToken,
// authorizeRole(["EMPLOYER"]),
employerEnquiry);
export default route;
