import {safeCreateAccount} from "../core/schemas/accounts.schema.js";

export class AccountsController {
    constructor({model}) {
        this.accountsModel = model
    }

    getAll = async (req, res) => {
        const listData = await this.accountsModel.getAll()
        res.json(listData)
    }
    create = async (req, res) => {
        const result = safeCreateAccount(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newData = await this.accountsModel.create({input: result.data})
        res.status(201).json(newData)
    }
}