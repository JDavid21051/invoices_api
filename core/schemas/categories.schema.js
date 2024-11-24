import z from "zod";

const createCategories = z.object({
    name: z.string({
        invalid_type_error: 'Category name must be a string',
        required_error: 'Category name is required.'
    }).max(200, {
        message: 'Category name must be at most 100 characters long',
    }),
    status: z.boolean({
        invalid_type_error: 'Category status must be a boolean',
        required_error: 'Category status is required.'
    })
})

export function safeCreateCategories(input) {
    return createCategories.safeParse(input)
}