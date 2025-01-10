import {Router} from "express";
import {AccountsController} from "../controllers/accounts-cntl.js";

export const createAccountsRouter = ({accountsModel}) => {
    const accountsRouter = Router()
    const controller = new AccountsController({model: accountsModel})
    accountsRouter.get('/', controller.getAll)
    accountsRouter.post('/', controller.create)
    return accountsRouter
}