import z from 'zod';

const logoutSchema = z.object({
    accessToken: z.string({
        invalid_type_error: 'Token must be a string',
        required_error: 'Token is required.'
    }).startsWith('JWT ', {
        message: 'Token is not valid'
    })
})

export function safeUserLogout(input) {
    return logoutSchema.safeParse(input)
}