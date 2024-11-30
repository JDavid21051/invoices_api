import {isValidNumber, safeCreateFE, safeUpdateFE} from "../core/schemas/financialEntitiesScrema.js";
import {
    ENTITIES_BAD_REQ,
    ENTITIES_ID_BAD_TYPE,
    ENTITIES_DELETE_ERROR, ENTITIES_UPDATE_BAD_REQ, ENTITIES_UPDATE_ERROR, ENTITIES_GET_ERROR
} from "../core/errors/modelues/financial-entities.errors.js";
import {ENTITIES_DELETE_SUCCESS} from "../core/errors/modelues/financial-entities.message.js";
import {StatusCodes} from "../core/lib/enums/https-status-code.js";
import {failedSerializer, successSerializer} from "../core/lib/functions/serializer-response.js";

export class FinancialEntitiesController {
    constructor({model}) {
        this.fEntityModel = model
    }

    getAll = async (req, res) => {
        const listData = await this.fEntityModel.getAll()
        successSerializer(res, StatusCodes.Ok, listData)
    }

    getById = async (req, res) => {
        const params = req.params
        if (params && params.id !== undefined && params.id !== null) {
            if (isValidNumber(params.id)) {
                const result = await this.fEntityModel.getById({id: params.id})
                if (!result) return failedSerializer(res, StatusCodes.NotFound, ENTITIES_GET_ERROR)
                successSerializer(res, StatusCodes.Ok, result)
            } else {
                return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_ID_BAD_TYPE)
            }
        } else {
            return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_BAD_REQ)
        }
    }

    create = async (req, res) => {
        const result = safeCreateFE(req.body)
        if (!result.success) return successSerializer(res, StatusCodes.BadRequest, result.error.message)
        const newData = await this.fEntityModel.create({input: result.data})
        successSerializer(res, StatusCodes.Created, newData)
    }

    delete = async (req, res) => {
        const params = req.params
        if (params && params.id !== undefined && params.id !== null) {
            if (isValidNumber(params.id)) {
                const result = await this.fEntityModel.delete({id: params.id})
                if (result === false) failedSerializer(res, StatusCodes.NotFound, ENTITIES_DELETE_ERROR)
                successSerializer(res, StatusCodes.Ok, [ENTITIES_DELETE_SUCCESS])
            } else {
                return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_ID_BAD_TYPE)
            }

        } else {
            return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_BAD_REQ)
        }
    }

    update = async (req, res) => {
        const result = safeUpdateFE(req.body)

        if (!result.success || Object.keys(result.data).length === 0) {
            return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_UPDATE_BAD_REQ)
        }

        const {id} = req.params
        if (!id) return failedSerializer(res, StatusCodes.BadRequest, ENTITIES_BAD_REQ)

        const updatedFEntity = await this.fEntityModel.update({id, input: result.data})
        if (updatedFEntity === null) failedSerializer(res, StatusCodes.BadRequest, ENTITIES_UPDATE_ERROR)
        successSerializer(res, StatusCodes.Ok, updatedFEntity)
    }
}