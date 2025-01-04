import {createApp} from "../app.js";
import {FinancialEntitiesModel} from "../models/finantial-entities-model.js";
import {CategoriesModel} from "../models/parameters/categories-model.js";
import {AccountsModel} from "../models/accounts-model.js";
import {RevenuesModel} from "../models/revenues-model.js";
import {AuthModel} from '../models/auth/auth-model.js';

createApp({
    authModel: AuthModel,
    financialEntitiesModel: FinancialEntitiesModel,
    categoriesModel: CategoriesModel,
    accountsModel: AccountsModel,
    revenuesModel: RevenuesModel
})