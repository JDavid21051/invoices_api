import {Router} from "express";
import {FinancialEntitiesController} from "../controllers/financial-entities-cntl.js";

export const createFinancialEntitiesRouter = ({fEntitiesModel}) => {
    const fEntitiesRouter = Router()
    const controller = new FinancialEntitiesController({model: fEntitiesModel})

    fEntitiesRouter.get('/', controller.getAll)
    fEntitiesRouter.post('/', controller.create)

    return fEntitiesRouter
}