import {createApp} from "../app.js";
import {FinancialEntitiesModel} from "../models/finantial-entities-model.js";
import {CategoriesModel} from "../models/parameters/categories-model.js";
import {AccountsModel} from "../models/accounts-model.js";

createApp({
    financialEntitiesModel: FinancialEntitiesModel,
    categoriesModel: CategoriesModel,
    accountsModel: AccountsModel
})