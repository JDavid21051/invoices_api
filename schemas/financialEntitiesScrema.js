import z from 'zod'

const createFESchema = z.object({
    name: z.string({
        invalid_type_error: 'Event title must be a string',
        required_error: 'Event title is required.'
    }).max(200, {
        message: 'Event title must be at most 100 characters long',
    }),
    nit: z.string({
        invalid_type_error: 'NIT must be a string',
        required_error: 'NIT is required.'
    }).max(15, {
        message: 'NIT must be at most 15 characters long',
    }),
    location: z.string({
        invalid_type_error: 'Location must be a string',
        required_error: 'Location is required.'
    }).max(200, {
        message: 'Location must be at most 15 characters long',
    }),
    entered_at: z.string({
        invalid_type_error: 'Entered data must be a datetime',
        required_error: 'Entered data is required.'
    }).datetime({
        offset: true,
        message: 'Event publish_at must be a valid datetime',
    }),
})

export function safeCreateFE(input) {
    return createFESchema.safeParse(input)
}