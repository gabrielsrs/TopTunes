import { instanceApi } from "../../config/axios.js";
import { ApiToken } from "../../utils/apiToken.js";

class TopTrackService {
    async handle(artistId) {
        const apiToken = new ApiToken()
        
        return await instanceApi.get(`/artists/${artistId}/top-tracks`, {
            headers: {
                "Authorization": `${await apiToken.getToken()}`
            },
        })
        .then((response) => {
            const tracksInfo = []
            for (let index = 0;  index < 5; index++) {
                const item = response.data.tracks[index]
                const { name,  album: { external_urls: { spotify: spotify } }, album: { images: images }} = item
                
                const currentTrackInfo = {
                    name,
                    spotifyTrackLink: spotify,
                    trackImages: images
                }

                tracksInfo.push(currentTrackInfo)
            }

            return tracksInfo
        })
    }
}

export { TopTrackService }