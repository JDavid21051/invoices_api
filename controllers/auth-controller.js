import {failedSerializer, successSerializer} from "../core/lib/functions/serializer-response.js";
import {StatusCodes} from "../core/lib/enums/https-status-code.js";
import {safeUserLogin} from '../core/schemas/auth/login.schema.js';
import {isValidNumber} from '../core/schemas/financialEntitiesScrema.js';
import {
    ENTITIES_BAD_REQ,
    ENTITIES_ID_BAD_TYPE,
} from '../core/errors/modelues/financial-entities.errors.js';

export class AuthController {
    constructor({model}) {
        this.authModel = model
    }

    login = async (req, res) => {
        const result = safeUserLogin(req.body)
        if (!result.success) return failedSerializer(res, StatusCodes.BadRequest, JSON.parse(result.error.message)[0].message)
        const newData = await this.authModel.login({input: result.data})
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error logging in')
        return successSerializer(
            res.cookie('token', newData.token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60,
                sameSite: 'lax',
            }),
            StatusCodes.Created,
            newData);
    }

    defUser = async (req, res) => {
        const newData = await this.authModel.defUser()
        console.log(newData);
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error executing the initial script')
        return successSerializer(res, StatusCodes.Created, newData)
    }

    getById = async (req, res) => {
        const params = req.params
        if (params && params.id !== undefined && params.id !== null) {
            if (isValidNumber(params.id)) {
                const result = await this.authModel.getUserById({id: params.id})
                if (!result) return failedSerializer(res, StatusCodes.NotFound, 'User not found')
                successSerializer(res, StatusCodes.Ok, result)
            } else {
                return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_ID_BAD_TYPE)
            }
        } else {
            return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_BAD_REQ)
        }
    }


}