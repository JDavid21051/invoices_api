import z from "zod";
import {RevenuesCategorySchema} from "../domain/enums/revenues.enum.js";

const createRevenues = z.object({
    description: z.string({
        invalid_type_error: 'Revenues description must be a string',
        required_error: 'Revenues description is required.'
    }).max(200, {
        message: 'Revenues description must be at most 100 characters long',
    }).min(5, {
        message: 'Revenues description must be at least 5 characters long',
    }),
    category: RevenuesCategorySchema,
    budget: z.number({
        invalid_type_error: 'Revenues budget must be a number',
        required_error: 'Revenues budget is required.'
    }).max(99999999, {
        message: 'Revenues budget must be at most $99999999',
    }).min(100, {
        message: 'Revenues budget must be at least $100',
    }).optional(),
    amount: z.number({
        invalid_type_error: 'Revenues amount must be a number',
        required_error: 'Revenues amount is required.'
    }).max(99999999, {
        message: 'Revenues amount must be at most $99999999',
    }).min(100, {
        message: 'Revenues amount must be at least $100',
    }),
    account: z.number({
        invalid_type_error: 'Deposit account id must be a number',
        required_error: 'Deposit account is required.'
    }).min(0, {
        message: 'Deposit account id must be a number valid',
    })
})

export function safeCreateRevenues(input) {
    return createRevenues.safeParse(input)
}