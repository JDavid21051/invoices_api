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
    }).min(7, {
        message: 'NIT must be at least 7 characters long',
    }),
    location: z.string({
        invalid_type_error: 'Location must be a string',
        required_error: 'Location is required.'
    }).max(200, {
        message: 'Location must be at most 200 characters long',
    })
})

const updateFESchema = z.object({
    id: z.number({
        invalid_type_error: 'id must be a number',
        required_error: 'id is required.'
    }),
    name: z.string({
        invalid_type_error: 'Financial entity name must be a string',
        required_error: 'Financial entity title is required.'
    }).max(200, {
        message: 'Financial entity title must be at most 100 characters long',
    }),
    nit: z.string({
        invalid_type_error: 'NIT must be a string',
        required_error: 'NIT is required.'
    }).max(15, {
        message: 'NIT must be at most 15 characters long',
    }).min(7, {
        message: 'NIT must be at least 7 characters long',
    }),
    location: z.string({
        invalid_type_error: 'Location must be a string',
        required_error: 'Location is required.'
    }).max(200, {
        message: 'Location must be at most 15 characters long',
    })
})

export function safeCreateFE(input) {
    return createFESchema.safeParse(input)
}

export function safeUpdateFE(input) {
    return createFESchema.partial().safeParse(input)
}

export function isValidNumber(number) {
    const regex = /^\d+$/;  // Adjust as needed
    return regex.test(number);
}