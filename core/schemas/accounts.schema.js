import z from "zod";

const createAccount = z.object({
    name: z.string({
        invalid_type_error: 'Account name must be a string',
        required_error: 'Account name is required.'
    }).max(200, {
        message: 'Account name must be at most 100 characters long',
    }),
    description: z.string({
        invalid_type_error: 'Description must be a string',
        required_error: 'Description is required.'
    }).max(200, {
        message: 'Description must be at most 15 characters long',
    }).optional().or((z.null())),
    financialEntity: z.number({
        invalid_type_error: 'Financial entity must be a number',
        required_error: 'Financial entity is required.'
    })
})

export function safeCreateAccount(input) {
    return createAccount.safeParse(input)
}