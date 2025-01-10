import {failedSerializer} from '../lib/functions/serializer-response.js';
import {StatusCodes} from '../lib/enums/https-status-code.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET ?? 'tu-clave-secreta';
    try {
        const authHeader = req.headers?.authorization;
        console.log(authHeader);
        if (!authHeader?.startsWith('JWT ')) {
            return failedSerializer(res, StatusCodes.Unauthorized, 'Unauthorised user')
        }
        const [_, token] = authHeader.split(' ');
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log({decodedToken});
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log({error});
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
