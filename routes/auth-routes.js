import {Router} from 'express';
import {AuthController} from '../controllers/auth-controller.js';
import {authMiddleware} from '../core/middlewares/authenticate.js';

export const createAuthRouter = ({authModel}) => {
    const router = Router()
    const controller = new AuthController({model: authModel})
    // login
    router.post('/bG9naW4tYXBw', controller.login)
    // def user
    router.post('/YWNjZXNzYXBw', controller.defUser)
    // refresh token
    router.post('/refresh-token', controller.refreshToken)
    // logout
    router.post('/logout', controller.logout)
    // authMiddleware
    router.use(authMiddleware)
    // get user by id
    router.get('/user/:id', controller.getById)
    return router
}