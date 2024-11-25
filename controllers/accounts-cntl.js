import {safeCreateAccount} from "../core/schemas/accounts.schema.js";

export class AccountsController {
    constructor({model}) {
        this.accountsModel = model
    }

    getAll = async (req, res) => {
        const eventsList = await this.accountsModel.getAll()
        res.json(eventsList)
    }
    create = async (req, res) => {
        const result = safeCreateAccount(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newEvent = await this.accountsModel.create({input: result.data})
        res.status(201).json(newEvent)
    }
}