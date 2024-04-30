import { Router } from "express";
import { AdminStats } from "../Controller/utilityController.js";

const router = Router();


router.route('/adminStats').get(AdminStats);

export default router ; 