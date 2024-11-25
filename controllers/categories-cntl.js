import {safeCreateCategories} from "../core/schemas/categories.schema.js";

export class CategoriesController {
    constructor({model}) {
        this.categoriesModel = model
    }

    getAll = async (req, res) => {
        const eventsList = await this.categoriesModel.getAll()
        res.json(eventsList)
    }

    create = async (req, res) => {
        const result = safeCreateCategories(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newEvent = await this.categoriesModel.create({input: result.data})
        res.status(201).json(newEvent)
    }

}