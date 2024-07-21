import { SearchArtistService } from "../../services/spotifyApi/searchArtistService.js"
import { TopTrackService } from "../../services/spotifyApi/topTrackService.js"
import { AlbumService } from "../../services/spotifyApi/albumService.js"
import { SocketIoErrorValidationHandler } from "../../errors/errorsInstances/socketIoErrorValidationHandler.js"
import { socketIoErrorHandler } from "../../errors/socketIoErrorHandler.js"


class GetArtistEventCOntroller {
    async handle(artistName) {
        try {
            const searchArtistService = new SearchArtistService()
            const topTrackService = new TopTrackService()
            const albumService = new AlbumService()

            if (!artistName) {
                throw new SocketIoErrorValidationHandler("Artist search submitted, but not filled.")
            }

            let artistInfos = await searchArtistService.handle(artistName)
            artistInfos = artistInfos.filter(item => item.images.length > 0)

            const topTracks = await topTrackService.handle(artistInfos[0].id)
            const albumImg = await albumService.handle(artistInfos[0].id)

            return {event: "topTracks",
                response: {artistInfos, topTracks, albumImg}
            }
        } catch (error) {
            return socketIoErrorHandler.handle(error)
        }
        
    }
}

export const getArtistEventCOntroller = new GetArtistEventCOntroller()