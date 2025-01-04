import express, {json} from 'express'
import 'dotenv/config'
import {corsMiddleware} from "./core/middlewares/cors.js";
import {createPingRouter} from "./routes/ping.js";
import {LISTENER_MESSAGE} from "./core/errors/root.js";
import dotenv from "dotenv";
import {createFinancialEntitiesRouter} from "./routes/financial-entities-routes.js";
import {createCategoriesRouter} from "./routes/categories-routes.js";
import {createAccountsRouter} from "./routes/accounts-routes.js";
import {createRevenuesRouter} from "./routes/revenues-routes.js";
import {ROOT_PAGE} from "./core/domain/root-page.js";
import {createAuthRouter} from './routes/auth-routes.js';

export const createApp = (
    {
        authModel,
        financialEntitiesModel,
        categoriesModel,
        accountsModel,
        revenuesModel
    }
) => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    dotenv.config();

    app.use('/api/ping', createPingRouter())
    app.use('/api/auth', createAuthRouter({ authModel: authModel }))
    app.use('/api/financial-entities', createFinancialEntitiesRouter({fEntitiesModel: financialEntitiesModel}))
    app.use('/api/categories', createCategoriesRouter({ categoriesModel: categoriesModel }))
    app.use('/api/accounts', createAccountsRouter({ accountsModel: accountsModel }))
    app.use('/api/revenues', createRevenuesRouter({ revenuesModel: revenuesModel }))
    app.get('/', (req, res) => res.send(ROOT_PAGE))
    app.get('**', (req, res) => res.send(ROOT_PAGE))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(LISTENER_MESSAGE(PORT))
    })
}
