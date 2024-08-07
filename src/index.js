import express from "express"
import { fileURLToPath } from "url"
import { join } from "path"

import { route } from "./routes/index.js"

import { SocketRouter } from "./routes/socketIo/index.js"
import { Server } from "socket.io";
import http from "http"

import { errorHandler } from "./errors/errorHandler.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server);

const socketRouter = new SocketRouter()
socketRouter.handle(io)

const __dirname = fileURLToPath(import.meta.url)
app.set("views", join(__dirname, "../views"))
app.set("view engine", "ejs")

app.use(express.static("src/public"))
app.use(route)

app.use(errorHandler)

server.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running!!")
})

