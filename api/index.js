import {createApp} from "../app.js";
import {FinancialEntitiesModel} from "../models/finantial-entities-model.js";
import {CategoriesModel} from "../models/parameters/categories-model.js";
import {AccountsModel} from "../models/accounts-model.js";
import {RevenuesModel} from "../models/revenues-model.js";

createApp({
    financialEntitiesModel: FinancialEntitiesModel,
    categoriesModel: CategoriesModel,
    accountsModel: AccountsModel,
    revenuesModel: RevenuesModel
})