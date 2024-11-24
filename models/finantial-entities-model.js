import {postgreSQLClient} from "../core/database/conection.js"
import {
    ENTITIES_CREATE_ERROR,
    ENTITIES_LIST_ERROR
} from "../core/errors/modelues/financial-entities.errors.js"
import {getLocaleDateTime} from "../utils/locale-datetime.js";

export class FinancialEntitiesModel {
    static async getAll() {
        try {
            const entityName = 'financial_entity'
            return await postgreSQLClient.query(`SELECT *
                                                 FROM ${entityName}`)
        } catch (error) {
            throw new Error(ENTITIES_LIST_ERROR);
        }
    }

    static async getById({id}) {
        try {
            console.log(id)
            const entityName = 'financial_entity'
            const query = `
                SELECT *
                FROM ${entityName}
                WHERE id = $1`
            console.log(query)

            const result = await postgreSQLClient.query(query, [id])
            console.log(result)
            return result.rows[0] ?? {id}
        } catch (error) {
            throw new Error(ENTITIES_LIST_ERROR);
        }
    }


    static async create({input}) {
        try {
            const {name, nit, location} = input
            const entityName = 'financial_entity'
            const query = `
                INSERT INTO ${entityName} (name, nit, location, entered_at)
                VALUES ($1, $2, $3, $4) RETURNING *`
            const values = [name, nit, location, getLocaleDateTime()]
            const result = await postgreSQLClient.query(query, values)
            console.log(result)
            return result.rows[0] ?? input
        } catch (error) {
            throw new Error(ENTITIES_CREATE_ERROR)
        }
    }

    static async delete({id}) {
        try {
            const entityName = 'financial_entity';
            const query = `
                DELETE
                FROM ${entityName}
                WHERE id = $1 RETURNING *
            `
            const result = await postgreSQLClient.query(query, [id]);
            return (result.rows.length > 0)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async update({id, input}) {
        try {
            const entityName = 'financial_entity';
            const fieldsToUpdate = Object.keys(input)
                .map((key, index) => `${key} = $${index + 1}`)
                .join(', ');
            const values = [...Object.values(input), id];

            const query = `
                UPDATE ${entityName}
                SET ${fieldsToUpdate}
                WHERE id = $${values.length} RETURNING *
            `
            const result = await postgreSQLClient.query(query, values);
            if (result.rows.length === 0) {
                return null
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(error.message)
        }
    }
}