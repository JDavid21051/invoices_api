import {safeCreateAccount} from "../core/schemas/accounts.schema.js";
import {failedSerializer, successSerializer} from "../core/lib/functions/serializer-response.js";
import {StatusCodes} from "../core/lib/enums/https-status-code.js";

export class AccountsController {
    constructor({model}) {
        this.accountsModel = model
    }

    getAll = async (req, res) => {
        const listData = await this.accountsModel.getAll()
        successSerializer(res, StatusCodes.Created, listData)
    }
    create = async (req, res) => {
        const result = safeCreateAccount(req.body)
        if (!result.success) return failedSerializer(res, StatusCodes.BadRequest, result.error.message)
        const newData = await this.accountsModel.create({input: result.data})
        successSerializer(res, StatusCodes.Created, newData)
    }
}