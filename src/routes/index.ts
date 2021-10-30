import { Router } from "express";
import { getPayment, createWallet } from "../controllers/payment";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Leia a documentação em InstantPay" });
});

router.post("/payment/create", getPayment)
router.post("/wallet", createWallet)

export default router;

