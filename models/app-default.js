import {postgreSQLClient} from '../core/database/conection.js';
import bcrypt from 'bcrypt';

export const AppDefaultUser = async () => {
    try {
        const entityName = 'user_access';
        const access_value = process.env.ACCESS;
        const saltRounds = process.env.SALT_ROUND;
        const passwordHash = await bcrypt.hash(access_value, saltRounds);
        const query = `
            SELECT
            FROM ${entityName}
            WHERE access_value = $1 RETURNING *
        `
        const result = await postgreSQLClient.query(query, [passwordHash]);
        // const example = (result.rows.length > 0);
        console.log('Usuario administrador creado exitosamente:', result.rows[0]);

    } catch (error) {
        console.error('Error al crear el primer usuario:', error);
        throw new Error('Error al crear el primer usuario: ' + error.toString());
    } finally {
        await postgreSQLClient.end();
    }

}