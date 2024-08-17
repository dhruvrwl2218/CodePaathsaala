import { Router } from "express";
import { AdminStats} from "../Controller/UtilityController.js";
import VerifyUser from "../Middleware/AuthMiddleware.js"
import { Issues } from "../Controller/UtilityController.js";

const router = Router();

router.route('/adminStats').get(VerifyUser,AdminStats);

router.route('/ContactUs').post(VerifyUser,Issues);

export default router ; 