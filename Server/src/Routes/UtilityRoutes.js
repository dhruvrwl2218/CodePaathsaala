import { Router } from "express";
import { AdminStats, checkout, getKey, paymentverification } from "../Controller/UtilityController.js";
import VerifyUser from "../Middleware/AuthMiddleware.js"
const router = Router();


router.route('/adminStats').get(VerifyUser,AdminStats);

router.route('/checkout').post(checkout);

router.route('razorPayKey').get(getKey);

router.route('paymentverification').post(paymentverification);

// router.route('checkToken').get(VerifyUser,checkToken);

export default router ; 