import {postgreSQLClient} from '../../core/database/conection.js';
import bcrypt from 'bcrypt';
import {getLocaleDateTime} from '../../utils/locale-datetime.js';
import {prefixBase64} from '../../utils/prefix-base64.js';
import avatar_base from '../../utils/avatar_base.js';


export class AuthModel {
    static entityName = 'user_access';

    static async getUserLogin() {
        const query = `
                SELECT *
                FROM ${AuthModel.entityName}
            `
        const result = await postgreSQLClient.query(query)
        return result.rows ?? []
    }

    static async login({input}) {
        try {
            const {password} = input;
            const userResult = await AuthModel.getUserLogin()
            if (userResult.length === 0) return null;
            const user = userResult[0]
            const isValid = await bcrypt.compare(password, user['access_value'])
            if (!isValid) return null
            const {entered_at, first_name, last_name, role, avatar } = user
            return {entered_at, first_name, last_name, role, avatar: prefixBase64 + avatar};
        } catch (error) {
            throw new Error('Error logging in');
        }
    }

    static async defUser() {
        try {
            const userResult = await AuthModel.getUserLogin()
            if (userResult.length > 0) return null
            const accessValue = process.env.ACCESS
            const saltRounds = Number(process.env.SALT_ROUND)
            const passwordHash = await bcrypt.hash(accessValue, saltRounds)
            const values = [passwordHash, getLocaleDateTime(), 'David', 'Pelaez', 0, avatar_base]
            const query = `
                INSERT INTO ${AuthModel.entityName} (access_value, entered_at, first_name, last_name, role, avatar )
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
            const result = await postgreSQLClient.query(query, values)
            if (result.rows.length === 0) return null
            const entered_at = result.rows[0].entered_at
            return {entered_at: entered_at};
        } catch (error) {
            throw new Error('Error al ejecutar el script inicial')
        }
    }
}