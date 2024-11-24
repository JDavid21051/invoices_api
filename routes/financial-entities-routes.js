import {Router} from "express";
import {FinancialEntitiesController} from "../controllers/financial-entities-cntl.js";

export const createFinancialEntitiesRouter = ({fEntitiesModel}) => {
    const fEntitiesRouter = Router()
    const controller = new FinancialEntitiesController({model: fEntitiesModel})

    // list
    fEntitiesRouter.get('/', controller.getAll)
    // get
    fEntitiesRouter.get('/:id', controller.getById)
    // create
    fEntitiesRouter.post('/', controller.create)
    // delete
    fEntitiesRouter.delete('/:id', controller.delete)
    // update
    fEntitiesRouter.patch('/:id', controller.update)

    return fEntitiesRouter
}