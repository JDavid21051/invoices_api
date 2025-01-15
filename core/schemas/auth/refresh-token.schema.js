import z from 'zod';

const refreshTokenSchema = z.object({
    accessToken: z.string({
        invalid_type_error: 'access token must be a string',
        required_error: 'access token is required.'
    }).startsWith('JWT ', {
        message: 'access token is not valid'
    }),
    refreshToken: z.string({
        invalid_type_error: 'refresh token must be a string',
        required_error: 'refresh token is required.'
    }).startsWith('JWT ', {
        message: 'refresh token is not valid'
    })
})
export function safeRefreshToken(input) {
    return refreshTokenSchema.safeParse(input)
}