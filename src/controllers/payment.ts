import { Request, Response } from "express";
import { getUserId } from "../middleware/auth";
import { transferBalance } from "../models/balance";

export async function getPayment(req: Request, res: Response) {
   
    const userId =  await getUserId(req);
    const { from, amount } = req.body;

    try {
        await transferBalance(userId, from, amount);

        console.log(`Um novo pagamento foi feito entre: ${userId} para ${from} no valor de ${amount}`);
        res.status(200).json({ message: "Payment successful" });
    }
    catch (err) {   
        res.status(400).json({ message: err.message });
    }
}