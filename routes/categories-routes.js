import {Router} from "express";
import {CategoriesController} from "../controllers/categories-cntl.js";

export const createCategoriesRouter = ({categoriesModel}) => {
    const categoriesRouter = Router()
    const controller = new CategoriesController({model: categoriesModel})
    // list
    categoriesRouter.get('/', controller.getAll)
    // create
    categoriesRouter.post('/', controller.create)
    return categoriesRouter
}