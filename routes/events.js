import {Router} from "express";
import {EventsController} from "../controllers/events.js";

export const createEventsRouter = ({eventsModel}) => {
    const eventRouter = Router()

    const controller = new EventsController({model: eventsModel})

    eventRouter.get('/', controller.getAll)
    eventRouter.post('/', controller.create)

    eventRouter.get('/:id', controller.getById)
    eventRouter.delete('/:id', controller.delete)
    eventRouter.patch('/:id', controller.update)

    return eventRouter
}
