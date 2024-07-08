import { SocketIoController } from "../../controllers/socketIoController.js"

class SocketRouter {
    handle (io) {
        const socketIoController = new SocketIoController()

        io.on("connection", (socket) => {
            socketIoController.connection(socket)
        })
    }
}

export { SocketRouter }