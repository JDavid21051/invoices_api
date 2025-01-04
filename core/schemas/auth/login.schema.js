import z from 'zod';

const loginSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required.'
    }).max(200, {
        message: 'Password must be at most 100 characters long',
    }).min(8, {
        message: 'Password must be at least 8 characters long',
    }),
})

export function safeUserLogin(input) {
    return loginSchema.safeParse(input)
}