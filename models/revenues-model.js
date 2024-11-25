import {postgreSQLClient} from "../core/database/conection.js";
import {getLocaleDateTime} from "../utils/locale-datetime.js";

export class RevenuesModel {
    static entityName = 'revenues';
    static async getAll() {
        try {
            const result = await postgreSQLClient.query(`SELECT *
                                                 FROM ${RevenuesModel.entityName}`)
            return result.rows ?? []
        } catch (error) {
        }
    }
    static async create({input}) {
        try {
            const {description, category, budget, amount, account} = input
            const query = `
                INSERT INTO ${RevenuesModel.entityName} (description, category, budget, amount, account_id, entered_at)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
            const values = [description, category, (budget ?? null), amount, account, getLocaleDateTime()]
            const result = await postgreSQLClient.query(query, values)
            return result.rows[0] ?? input
        } catch (error) {
            throw new Error('ENTITIES_CREATE_ERROR')

        }
    }
}