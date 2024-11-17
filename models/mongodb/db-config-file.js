import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    tls: true,
})

async function connect() {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB)
        return database.collection('poke-events')
    } catch (error) {
        console.error('Error connecting to the database')
        await client.close()
    }
}

export class EventsModel {
    static async getAll() {
        try {
            const dbCollection = await connect()
            return await dbCollection.find({})
                .limit(50)
                .toArray();

        } catch (error) {
            throw new Error('Error fetching all the events:');
        }
    }

    static async getById({id}) {
        const db = await connect()
        const objectId = new ObjectId(id)
        return db.findOne({_id: objectId})
    }

    static async create({input}) {
        const db = await connect()

        const {insertedId} = await db.insertOne(input)

        return {
            id: insertedId,
            ...input
        }
    }

    static async delete({id}) {
        const db = await connect()
        const objectId = new ObjectId(id)
        const {deletedCount} = await db.deleteOne({_id: objectId})
        return deletedCount > 0
    }

    static async update({id, input}) {
        const db = await connect()
        const objectId = new ObjectId(id)

        const {ok, value} = await db.findOneAndUpdate({_id: objectId}, {$set: input}, {returnNewDocument: true})

        if (!ok) return false

        return value
    }
}
