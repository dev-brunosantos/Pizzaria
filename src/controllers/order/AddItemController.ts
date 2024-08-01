import { Request, Response } from "express";
import { AddItemServe } from "../../services/order/AddItemServe";

class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body;

        const addItemServe = new AddItemServe();

        const order = await addItemServe.execute({
            order_id, product_id, amount
        })

        return res.json(order)
    }
}

export { AddItemController }