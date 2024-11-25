import {postgreSQLClient} from "../core/database/conection.js";
import {ENTITIES_CREATE_ERROR, ENTITIES_LIST_ERROR} from "../core/errors/modelues/financial-entities.errors.js";
import {getLocaleDateTime} from "../utils/locale-datetime.js";

export class AccountsModel {
    static entityName = 'accounts';
    static async getAll() {
        try {
            const result = await postgreSQLClient.query(`SELECT *
                                                 FROM ${AccountsModel.entityName}`)
            return result.rows ?? []
        } catch (error) {
            throw new Error(ENTITIES_LIST_ERROR);
        }
    }
    static async create({input}) {
        try {
            const {name, description, financialEntity} = input
            const query = `
                INSERT INTO ${AccountsModel.entityName} (name, description, entered_at, financial_entity_id)
                VALUES ($1, $2, $3, $4) RETURNING *`
            const values = [name, (description ?? null), getLocaleDateTime(), financialEntity]
            const result = await postgreSQLClient.query(query, values)
            return result.rows[0] ?? input
        } catch (error) {
            throw new Error(error);
        }
    }
}