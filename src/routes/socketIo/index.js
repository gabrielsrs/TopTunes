import { getArtistEventCOntroller } from "../../controllers/socketIoEventControllers/getArtistEventController.js"
import { searchArtistEventController } from "../../controllers/socketIoEventControllers/searchArtistEventController.js"

class SocketRouter {
    handle (io) {
        io.on("connection", (socket) => {
            console.log('a user connected')

            socket.on('disconnect', () => {
                console.log('user disconnected')
            })

            socket.on("searchingArtists", async (artistName) => {
                await searchArtistEventController.handle(artistName)
                .then(({ event, response }) => {
                    socket.emit(event, response)
                })
            })

            socket.on("getArtist", async(artistName) => {
                await getArtistEventCOntroller.handle(artistName)
                .then(({ event, response }) => {
                    socket.emit(event, response)
                })
            })
        })

    }

}

export { SocketRouter }