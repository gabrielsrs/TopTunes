import { SearchArtistService } from "../services/spotifyApi/searchArtistService.js"
import { TopTrackService } from "../services/spotifyApi/topTrackService.js"
import { AlbumService } from "../services/spotifyApi/albumService.js"

class SocketIoController {
    connection (socket) {
        console.log('a user connected');
        const searchArtistService = new SearchArtistService()
        const topTrackService = new TopTrackService()
        const albumService = new AlbumService()

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("searchingArtists", async (artistName) => {
            const response = await searchArtistService.handle(artistName)
            
            socket.emit("searchResponse", response)
        })

        socket.on("getArtist", async (artistName) => {
            const artistInfos = await searchArtistService.handle(artistName)
            const topTracks = await topTrackService.handle(artistInfos[0].id)
            const albumImg = await albumService.handle(artistInfos[0].id)

            socket.emit("topTracks", artistInfos, topTracks, albumImg)
        })
    }
}

export { SocketIoController }