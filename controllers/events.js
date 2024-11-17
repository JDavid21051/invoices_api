import { safeCreatingEvent } from '../schemas/events.js'

export class EventsController {
  constructor ({ model }) {
    this.eventsModel = model
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const eventsList = await this.eventsModel.getAll({ genre })
    console.log(eventsList)
    res.json(eventsList)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const event = await this.eventsModel.getById({ id })
    if (event) return res.json(event)
    res.status(404).json({ message: 'Event not found' })
  }

  create = async (req, res) => {
    const result = safeCreatingEvent(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newEvent = await this.eventsModel.create({ input: result.data })

    res.status(201).json(newEvent)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.eventsModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Event not found' })
    }

    return res.json({ message: 'Event deleted' })
  }
  update = async (req, res) => {
    const result = safeCreatingEvent(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await this.eventsModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
