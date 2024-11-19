import {isValidNumber, safeCreateFE, safeUpdateFE} from "../schemas/financialEntitiesScrema.js";
import {
    ENTITIES_BAD_REQ,
    ENTITIES_DELETE_BAD_TYPE,
    ENTITIES_DELETE_ERROR, ENTITIES_UPDATE_BAD_REQ, ENTITIES_UPDATE_ERROR
} from "../core/errors/modelues/financial-entities.errors.js";
import {ENTITIES_DELETE_SUCCESS} from "../core/errors/modelues/financial-entities.message.js";

export class FinancialEntitiesController {
    constructor({model}) {
        this.fEntityModel = model
    }

    getAll = async (req, res) => {
        const {genre} = req.query
        const eventsList = await this.fEntityModel.getAll({genre})
        res.json(eventsList)
    }

    create = async (req, res) => {
        const result = safeCreateFE(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newEvent = await this.fEntityModel.create({input: result.data})
        res.status(201).json(newEvent)
    }

    delete = async (req, res) => {
        const params = req.params
        if (params && params.id !== undefined && params.id !== null) {
            if (isValidNumber(params.id)) {
                const result = await this.fEntityModel.delete({id: params.id})
                if (result === false) return res.status(404).json({message: ENTITIES_DELETE_ERROR})
                return res.json({message: ENTITIES_DELETE_SUCCESS})
            } else {
                return res.status(404).json({message: ENTITIES_DELETE_BAD_TYPE})
            }

        } else {
            return res.status(404).json({message: ENTITIES_BAD_REQ})
        }
    }

    update = async (req, res) => {
        const result = safeUpdateFE(req.body)

        console.log({result})
        if (!result.success || Object.keys(result.data).length === 0) {
            return res.status(400).json({message: ENTITIES_UPDATE_BAD_REQ})
        }

        const {id} = req.params
        if (!id) {
            return res.status(404).json({message: ENTITIES_BAD_REQ})
        }

        const updatedFEntity = await this.fEntityModel.update({id, input: result.data})
        if (updatedFEntity === null) return res.status(404).json({message: ENTITIES_UPDATE_ERROR})
        return res.json(updatedFEntity)
    }
}