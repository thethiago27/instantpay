import { MongoClient } from 'mongodb';
require('dotenv').config();


class Mongo {
  
    client: MongoClient;

    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI);
    }

    async connection() {
        await this.client.connect();
        return this.client.db(process.env.MONGO_DB_NAME);
    }

    async collection(name: string) {
        const db = await this.connection();
        return db.collection(name);
    }
}

export default Mongo;