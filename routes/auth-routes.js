import {Router} from 'express';
import {AuthController} from '../controllers/auth-controller.js';

export const createAuthRouter = ({authModel}) => {
    const router = Router()
    const controller = new AuthController({model: authModel})
    // login
    router.post('/bG9naW4tYXBw', controller.login)
    router.post('/YWNjZXNzYXBw', controller.defUser)

    return router
}