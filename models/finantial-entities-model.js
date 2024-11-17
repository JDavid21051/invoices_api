import {postgreSQLClient} from "../core/database/conection.js"
import {
    ENTITIES_CREATE_ERROR,
    ENTITIES_DELETE_ERROR,
    ENTITIES_LIST_ERROR
} from "../core/errors/modelues/financial-entities.errors.js"

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

    static async create({input}) {
        try {
            const {name, status} = input;
            const entityName = 'financial_entity';
            const query = `
                INSERT INTO ${entityName} (username, email, password)
                VALUES ($1, $2, $3) RETURNING *`
            const values = [name, status];
            const result = await postgreSQLClient.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(ENTITIES_CREATE_ERROR);
        }
    }

    static async delete({id}) {
        try {
            const entityName = 'financial_entity';
            const query = `
                DELETE
                FROM ${entityName}
                WHERE id = $1 RETURNING *
            `;
            const result = await postgreSQLClient.query(query, [id]);
            return result.rows.length === 0;
        } catch (error) {
            throw new Error(ENTITIES_DELETE_ERROR);
        }
    }
}