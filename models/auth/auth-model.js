import {postgreSQLClient} from '../../core/database/conection.js';
import bcrypt from 'bcrypt';
import {getLocaleDateTime} from '../../utils/locale-datetime.js';
import {prefixBase64} from '../../utils/prefix-base64.js';
import avatar_base from '../../utils/avatar_base.js';
import jwt from 'jsonwebtoken';
import {ACCESS_SECRET, JWT_SECRET, SALT_ROUND} from '../../config.js';

export class AuthModel {
    static entityName = 'user_access';
    static controlEntityName = 'user_access_control';

    static generateToken(secret, userId, firstName) {
        const accessToken = jwt.sign(
            {id: userId, firstName: firstName},
            secret,
            {expiresIn: '1h'},
        );
        const refreshToken = jwt.sign(
            {id: userId, firstName: firstName},
            secret,
            {expiresIn: '6h'},
        );
        return {accessToken, refreshToken};
    }

    static async getUserLogin() {
        const query = `
            SELECT *
            FROM ${AuthModel.entityName}`;
        const result = await postgreSQLClient.query(query);
        return result.rows ?? [];
    }

    static async login({input}) {
        try {
            const {password} = input;
            const registeredUser = await AuthModel.getUserLogin();
            if (registeredUser.length === 0) return null;
            const user = registeredUser[0];
            const isValid = await bcrypt.compare(password, user['access_value']);
            if (!isValid) return null;
            const accessToken = jwt.sign(
                {id: user.id, first_name: user.first_name},
                JWT_SECRET,
                {expiresIn: '1h'},
            );
            const refreshToken = jwt.sign(
                {id: user.id, first_name: user.first_name},
                JWT_SECRET,
                {expiresIn: '6h'},
            );
            const sessionQuery = `
                INSERT INTO ${AuthModel.controlEntityName} (access_token, user_id, entered_at, updated_at, active, refresh_token)
                VALUES ($2, $1, $3, NULL, $4, $5) ON CONFLICT (user_id)
                DO
                UPDATE SET
                    access_token = $2,
                    updated_at = $3,
                    active = $4,
                    refresh_token = $5 RETURNING *`;
            const sessionValues = [user.id, accessToken, getLocaleDateTime(), true, refreshToken];
            const sessionResult = await postgreSQLClient.query(sessionQuery, sessionValues);
            if (sessionResult.rows.length === 0) return null;
            const newRegisteredUser = sessionResult.rows[0];
            return {
                enteredAt: newRegisteredUser['entered_at'],
                updatedAt: newRegisteredUser['updated_at'],
                userId: newRegisteredUser['user_id'],
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw new Error('Error logging in');
        }
    }

    static async logout({input}) {
        try {
            const {accessToken} = input;
            const [_, tokenValue] = accessToken.split(' ');
            if (!tokenValue) return false;
            const query = `
                DELETE
                FROM ${AuthModel.controlEntityName}
                WHERE access_token = $1 RETURNING *`;
            const result = await postgreSQLClient.query(query, [tokenValue]);
            return (result.rows.length > 0);
        } catch (error) {
            throw new Error('Error logging out');
        }
    }

    static async defUser() {
        try {
            const userResult = await AuthModel.getUserLogin();
            if (userResult.length > 0) return null;
            const saltRounds = Number(SALT_ROUND);
            const passwordHash = await bcrypt.hash(ACCESS_SECRET, saltRounds);
            const values = [passwordHash, getLocaleDateTime(), 'David', 'Pelaez', 0, avatar_base];
            const query = `
                INSERT INTO ${AuthModel.entityName} (access_value, entered_at, first_name, last_name, role, avatar)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const result = await postgreSQLClient.query(query, values);
            if (result.rows.length === 0) return null;
            const entered_at = result.rows[0]['entered_at'];
            return {enteredAt: entered_at};
        } catch (error) {
            throw new Error('Error executing the initial script');
        }
    }

    static async getUserById({id}) {
        try {
            const query = `
                SELECT *
                FROM ${AuthModel.entityName}
                WHERE id = $1`;
            const result = await postgreSQLClient.query(query, [id]);
            if (result.rows.length === 0) return null;
            const {id: userId, entered_at, first_name, last_name, role, avatar} = result.rows[0];
            return {
                userId,
                enteredAt: entered_at,
                firstName: first_name,
                lastName: last_name,
                role,
                avatar: prefixBase64 + avatar,
            };
        } catch (error) {
            throw new Error('error obtaining user data by id');
        }
    }

    static async refreshToken({input}) {
        try {
            const {accessToken, refreshToken} = input;
            const accessTokenValue = accessToken.split(' ')[1];
            const refreshTokenValue = refreshToken.split(' ')[1];
            const decodedToken = jwt.verify(refreshTokenValue, JWT_SECRET);
            if (!decodedToken) return null;
            const registeredUser = await AuthModel.getUserLogin();
            if (registeredUser.length === 0) return null;
            const user = registeredUser[0];
            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            } = AuthModel.generateToken(JWT_SECRET, user.id, user.first_name);
            const updateValues = [user.id, accessTokenValue, refreshTokenValue, newAccessToken, newRefreshToken, getLocaleDateTime()];
            const updateQuery = `
                UPDATE ${AuthModel.controlEntityName}
                SET access_token = $4,
                    refresh_token = $5,
                    updated_at = $6
                WHERE user_id = $1
                  AND access_token = $2
                  AND refresh_token = $3 RETURNING *`;
            const updateResult = await postgreSQLClient.query(updateQuery, updateValues);
            if (updateResult.rows.length === 0) return null;
            return {
                enteredAt: updateResult.rows[0]['entered_at'],
                updatedAt: updateResult.rows[0]['updated_at'],
                userId: updateResult.rows[0]['user_id'],
                accessToken: updateResult.rows[0]['access_token'],
                refreshToken: updateResult.rows[0]['refresh_token'],
            };
        } catch (error) {
            throw new Error('Error refreshing token');
        }
    }

}