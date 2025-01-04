import {failedSerializer, successSerializer} from "../core/lib/functions/serializer-response.js";
import {StatusCodes} from "../core/lib/enums/https-status-code.js";
import {safeUserLogin} from '../core/schemas/auth/login.schema.js';

export class AuthController {
    constructor({model}) {
        this.authModel = model
    }

    login = async (req, res) => {
        const result = safeUserLogin(req.body)
        if (!result.success) return failedSerializer(res, StatusCodes.BadRequest, JSON.parse(result.error.message)[0].message)
        const newData = await this.authModel.login({input: result.data})
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error logging in')
        return successSerializer(res, StatusCodes.Created, newData)
    }

    defUser = async (req, res) => {
        const newData = await this.authModel.defUser()
        console.log(newData);
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error executing the initial script')
        return successSerializer(res, StatusCodes.Created, newData)
    }


}