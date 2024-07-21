import { SearchArtistService } from "../../services/spotifyApi/searchArtistService.js"
import { SocketIoErrorValidationHandler } from "../../errors/errorsInstances/socketIoErrorValidationHandler.js"
import { socketIoErrorHandler } from "../../errors/socketIoErrorHandler.js"

class SearchArtistEventController {
    async handle (artistName) {
        try {
            const searchArtistService = new SearchArtistService()

            if (!artistName) {
                throw new SocketIoErrorValidationHandler("Please fill out the artist input field.")                
            }

            const response = await searchArtistService.handle(artistName)

            return {
                event: "searchResponse", 
                response: response.filter(item => item.images.length > 0)
            }
        } catch (error) {
            return socketIoErrorHandler.handle(error)
        }
            
    }
}

export const searchArtistEventController = new SearchArtistEventController()
