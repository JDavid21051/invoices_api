import {failedSerializer} from '../lib/functions/serializer-response.js';
import {StatusCodes} from '../lib/enums/https-status-code.js';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../config.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader?.startsWith('JWT ')) {
            return failedSerializer(res, StatusCodes.Unauthorized, 'Unauthorised user')
        }
        const [_, token] = authHeader.split(' ');
        const {id, first_name, iat, exp} = jwt.verify(token, JWT_SECRET);
        req.user = {id, firstName: first_name, iat, exp};
        next();
    } catch (error) {
        const errorResponse = {
            status: 500,
            body: {
                error: 'Error de autenticación',
                message: 'Error al procesar el token',
            },
        };
        if (error instanceof jwt.JsonWebTokenError) {
            errorResponse.status = 401;
            errorResponse.body = {
                error: 'Token inválido',
                message: 'El token proporcionado no es válido',
            };
        } else if (error instanceof jwt.TokenExpiredError) {
            errorResponse.status = 401;
            errorResponse.body = {
                error: 'Token expirado',
                message: 'El token ha expirado',
            };
        }
        return failedSerializer(res, StatusCodes.Unauthorized, 'Unauthorised user')

    }
};
