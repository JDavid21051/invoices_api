import {safeCreateFE} from "../schemas/financialEntitiesScrema.js";

export class FinancialEntitiesController {
    constructor({model}) {
        this.fEntityModel = model
    }

    getAll = async (req, res) => {
        const {genre} = req.query
        const eventsList = await this.fEntityModel.getAll({genre})
        console.log(eventsList)
        res.json(eventsList)
    }

    create = async (req, res) => {
        const result = safeCreateFE(req.body)

        if (!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const newEvent = await this.fEntityModel.create({input: result.data})

        res.status(201).json(newEvent)
    }
}