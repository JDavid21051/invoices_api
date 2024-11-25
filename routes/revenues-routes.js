import {Router} from "express";
import {RevenuesController} from "../controllers/revenues-cntl.js";

export const createRevenuesRouter = ({accountsModel}) => {
    const revenuesRouter = Router()
    const controller = new RevenuesController({model: accountsModel})
    revenuesRouter.get('/', controller.getAll)
    revenuesRouter.post('/', controller.create)
    return revenuesRouter

}