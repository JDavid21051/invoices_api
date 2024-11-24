import {postgreSQLClient} from "../../core/database/conection.js";
import {ENTITIES_CREATE_ERROR, ENTITIES_LIST_ERROR} from "../../core/errors/modelues/financial-entities.errors.js";
import {getLocaleDateTime} from "../../utils/locale-datetime.js";

export class CategoriesModel {
    static entityName = 'expenses_category';
    static async getAll() {
        try {
            // const entityName = 'accounts'
            const result = await postgreSQLClient.query(`SELECT *
                                                 FROM ${CategoriesModel.entityName}`)
            return result.rows ?? []
        } catch (error) {
            throw new Error(ENTITIES_LIST_ERROR);
        }
    }

    static async create({input}) {
        try {
            const {name, status} = input
            const query = `
                INSERT INTO ${CategoriesModel.entityName} (name, status, entered_at, updated_at)
                VALUES ($1, $2, $3, $4) RETURNING *`
            const values = [name, status, getLocaleDateTime(), null]
            const result = await postgreSQLClient.query(query, values)
            return result.rows[0] ?? input
        } catch (error) {
            throw new Error(ENTITIES_CREATE_ERROR)
        }
    }
}