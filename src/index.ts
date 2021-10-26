import express, { NextFunction, Request, Response } from "express"
import http from "http"
import Mongo from "./database/mongo"
import bodyParser from 'body-parser';
import { getTokenFromHeader } from "./middleware/auth"
import router from "./routes";

const app = express()
const server = http.createServer(app)

const conn = new Mongo()
conn.connection().then(() => console.log("Connected to MongoDB")).catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request: Request, response: Response, next: NextFunction) => {

    const token = getTokenFromHeader(request)

    if (!token) {
        return response.status(401).send("Unauthorized")
    }

    return next()
})

app.use(router)

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})
