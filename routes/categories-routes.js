import {Router} from "express";
import {CategoriesController} from "../controllers/categories-cntl.js";

export const createCategoriesRouter = ({categoriesModel}) => {
    const accountsRouter = Router()
    const controller = new CategoriesController({model: categoriesModel})
    // list
    accountsRouter.get('/', controller.getAll)
    accountsRouter.post('/', controller.create)
    return accountsRouter

}