import {safeCreateRevenues} from "../core/schemas/revenues.schema.js";

export class RevenuesController {
    constructor({model}) {
        this.revenuesModel = model
    }

    getAll = async (req, res) => {
        const listData = await this.revenuesModel.getAll()
        res.json(listData)
    }
    create = async (req, res) => {
        const result = safeCreateRevenues(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newData = await this.revenuesModel.create({input: result.data})
        res.status(201).json(newData)
    }

}