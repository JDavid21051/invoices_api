import {Router} from "express";
import {RevenuesController} from "../controllers/revenues-cntl.js";

export const createRevenuesRouter = ({revenuesModel}) => {
    const revenuesRouter = Router()
    const controller = new RevenuesController({model: revenuesModel})
    revenuesRouter.get('/', controller.getAll)
    revenuesRouter.post('/', controller.create)
    return revenuesRouter
}