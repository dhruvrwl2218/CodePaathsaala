import { Router } from "express";
import { AdminStats, checkout, getKey, paymentverification } from "../Controller/UtilityController.js";

const router = Router();


router.route('/adminStats').get(AdminStats);

router.route('/checkout').post(checkout);

router.route('razorPayKey').get(getKey);

router.route('paymentverification').post(paymentverification);


export default router ; 