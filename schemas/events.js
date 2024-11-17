import z from 'zod'

const EventTypeEnum = ["Article", "Events", "Guides", "News", "Meta", "Trainer Battles"];
const EventTypeSchema = z.enum(EventTypeEnum, {
    invalid_type_error: `Event type must be one of the following values: ${EventTypeEnum.toString()}`,
    required_error: 'Event type is required.'
});

const eventSchema = z.object({
    title: z.string({
        invalid_type_error: 'Event title must be a string',
        required_error: 'Event title is required.'
    }).min(3, {
        message: 'Event title must be at least 3 characters long',
    }).max(100, {
        message: 'Event title must be at most 100 characters long',
    }),
    publish_by: z.string({
        invalid_type_error: 'Event publish_by must be a string',
        required_error: 'Event publish_by is required.'
    }),
    publish_at: z.string({
        invalid_type_error: 'Event publish_at must be a datetime',
        required_error: 'Event publish_at is required.'
    }).datetime({
        offset: true,
        message: 'Event publish_at must be a valid datetime',
    }),
    type: EventTypeSchema,
    imageUrl: z.string(
        {
            invalid_type_error: 'Event imageUrl must be a string',
            required_error: 'Event image is required.'
        }
    ).url({
        message: 'Event image must be a valid URL',
    }),
    url: z.string(
        {
            invalid_type_error: 'Event url must be a string',
            required_error: 'Event url is required.'
        }
    ).url({
        message: 'Event url must be a valid URL',
    }),
})

export function safeCreatingEvent(input) {
    return eventSchema.safeParse(input)
}
