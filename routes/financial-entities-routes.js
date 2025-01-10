import {Router} from "express";
import {FinancialEntitiesController} from "../controllers/financial-entities-cntl.js";

export const createFinancialEntitiesRouter = ({fEntitiesModel}) => {
    const router = Router()
    const controller = new FinancialEntitiesController({model: fEntitiesModel})
    // list
    router.get('/', controller.getAll)
    // get
    router.get('/:id', controller.getById)
    // create
    router.post('/', controller.create)
    // delete
    router.delete('/:id', controller.delete)
    // update
    router.patch('/:id', controller.update)
    return router
}