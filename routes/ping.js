import {Router} from "express";

export const createPingRouter = () => {
    const pingRouter = Router()

    pingRouter.get('/', (req, res) => {
        const PORT = process.env.PORT ?? 1234
        res.json({message: `pong on port ${PORT}`})
    })
    return pingRouter
}