import {failedSerializer, successSerializer} from "../core/lib/functions/serializer-response.js";
import {StatusCodes} from "../core/lib/enums/https-status-code.js";
import {safeUserLogin} from '../core/schemas/auth/login.schema.js';
import {isValidNumber} from '../core/schemas/financialEntitiesScrema.js';
import {
    ENTITIES_BAD_REQ,
    ENTITIES_ID_BAD_TYPE,
} from '../core/errors/modelues/financial-entities.errors.js';
import {safeUserLogout} from '../core/schemas/auth/logout.schema.js';
import {safeRefreshToken} from '../core/schemas/auth/refresh-token.schema.js';

export class AuthController {
    constructor({model}) {
        this.authModel = model
    }

    defUser = async (req, res) => {
        const newData = await this.authModel.defUser()
        console.log(newData);
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error executing the initial script')
        return successSerializer(res, StatusCodes.Created, newData)
    }

    login = async (req, res) => {
        const result = safeUserLogin(req.body)
        if (!result.success) return failedSerializer(res, StatusCodes.BadRequest, JSON.parse(result.error.message)[0].message)
        const newData = await this.authModel.login({input: result.data})
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error logging in')
        return successSerializer(res, StatusCodes.Created, newData);
    }

    refreshToken = async (req, res) => {
        const resultValidation = safeRefreshToken(req.body)
        if (!resultValidation.success) return failedSerializer(res, StatusCodes.BadRequest, JSON.parse(resultValidation.error.message)[0].message);
        const newData = await this.authModel.refreshToken({input: resultValidation.data})
        if (!newData) return failedSerializer(res, StatusCodes.BadRequest, 'Error refreshing token')
        console.log({newData});

        return successSerializer(res, StatusCodes.Created, newData);
    }

    logout = async (req, res) => {
        const result = safeUserLogout(req.body)
        if (!result.success) return failedSerializer(res, StatusCodes.BadRequest, 'Error logging out')
        const response = await this.authModel.logout({input: result.data})
        console.log({response});
        if (!response) return failedSerializer(res, StatusCodes.BadRequest, 'Error logging out')
        return successSerializer(res, StatusCodes.Created, response);
    }

    getById = async (req, res) => {
        const params = req.params
        const headers = req.headers
        console.log(headers)
        console.log(req.get('Authorization'))
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