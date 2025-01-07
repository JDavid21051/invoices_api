import {postgreSQLClient} from '../../core/database/conection.js';
import bcrypt from 'bcrypt';
import {getLocaleDateTime} from '../../utils/locale-datetime.js';
import {prefixBase64} from '../../utils/prefix-base64.js';
import avatar_base from '../../utils/avatar_base.js';
import jwt from 'jsonwebtoken';

export class AuthModel {
    static entityName = 'user_access';

    static async getUserLogin() {
        const query = `
                SELECT *
                FROM ${AuthModel.entityName}`
        const result = await postgreSQLClient.query(query)
        return result.rows ?? []
    }

    static async login({input}) {
        try {
            const {password} = input
            const registeredUser = await AuthModel.getUserLogin()
            if (registeredUser.length === 0) return null
            const user = registeredUser[0]
            const isValid = await bcrypt.compare(password, user['access_value'])
            if (!isValid) return null
            const secretKey = process.env.JWT_SECRET
            const token = jwt.sign(
                {id: user.id, first_name: user.first_name},
                secretKey,
                {expiresIn: '1h'}
            )
            const entityName = 'user_access_control'
            const sessionQuery = `
                INSERT INTO ${entityName} (access_token, user_id, entered_at, updated_at, active)
                VALUES ($2, $1, $3, NULL, $4)
                ON CONFLICT (user_id)
                DO UPDATE SET 
                    access_token = $2,
                    updated_at = $3,
                    active = $4 
                RETURNING *`
            const sessionValues = [user.id, token, getLocaleDateTime(), true]
            const sessionResult = await postgreSQLClient.query(sessionQuery, sessionValues)
            if (sessionResult.rows.length === 0) return null
            const newRegisteredUser = sessionResult.rows[0]
            return {
                entered_at: newRegisteredUser.entered_at,
                updated_at: newRegisteredUser.updated_at,
                user_id: newRegisteredUser.user_id,
                token
            }
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

    static async getUserById({id}) {
       /* try {
            const query = `
                SELECT
                    ${AuthModel.entityName}.id AS userId,
                    ${AuthModel.entityName}.first_name AS firstName,
                    ${AuthModel.entityName}.last_name AS lastName,
                    ${AuthModel.entityName}.role AS role,
                    ${AuthModel.entityName}.avatar AS avatar,
                    ${AuthModel.entityName}_control.entered_at AS enteredAt,
                    ${AuthModel.entityName}_control.updated_at AS updatedAt,
                FROM ${AuthModel.entityName}
                INNER JOIN ${AuthModel.entityName}_control
                ON ${AuthModel.entityName}.id = ${AuthModel.entityName}_control.user_id
                WHERE ${AuthModel.entityName}.id = $1`
            const result = await postgreSQLClient.query(query, [id])
            if (result.rows.length === 0) return null
            const { userId, enteredAt, firstName, lastName, role, avatar, updatedAt } = result.rows[0]
            return { userId, enteredAt, firstName, lastName, role, avatar, updatedAt }
        } catch (error) {
            throw new Error('error obtaining user data by id')
        }*/
        try {
            const query = `
                SELECT *
                FROM ${AuthModel.entityName}
                WHERE id = $1`
            const result = await postgreSQLClient.query(query, [id])
            if (result.rows.length === 0) return null
            const { id: userId, entered_at, first_name, last_name, role, avatar } = result.rows[0]
            return { userId, entered_at, first_name, last_name, role, avatar: prefixBase64 + avatar }
        } catch (error) {
            throw new Error('error obtaining user data by id')
        }
    }

}