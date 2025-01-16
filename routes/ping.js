import {Router} from "express";
import {PORT} from '../config.js';

 const createPingRouter = () => {
    const pingRouter = Router()
    pingRouter.get('/', (req, res) => {
        res.json({message: `pong on port ${PORT}`})
    })
    return pingRouter
}
export default createPingRouter