import express, {json} from 'express'
import 'dotenv/config'
import {corsMiddleware} from "./core/middlewares/cors.js";
import {createPingRouter} from "./routes/ping.js";
import {LISTENER_MESSAGE} from "./core/errors/root.js";
import {createFinancialEntitiesRouter} from "./routes/financial-entities-routes.js";
import dotenv from "dotenv";
import {createCategoriesRouter} from "./routes/categories-routes.js";

export const createApp = (
    {
        financialEntitiesModel,
        categoriesModel
    }
) => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    dotenv.config();

    app.use('/api/ping', createPingRouter())

    app.use('/api/financial-entities', createFinancialEntitiesRouter({fEntitiesModel: financialEntitiesModel}))
    app.use('/api/categories', createCategoriesRouter({ categoriesModel: categoriesModel }))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(LISTENER_MESSAGE(PORT))
    })
}
