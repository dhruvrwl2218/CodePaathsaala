import { Router } from "express";
import { AdminStats} from "../Controller/UtilityController.js";
import VerifyUser from "../Middleware/AuthMiddleware.js"
const router = Router();


router.route('/adminStats').get(VerifyUser,AdminStats);

router.route('/grivences').post()

export default router ; 