import { instanceApi } from "../../config/axios.js";
import { ApiToken } from "../../utils/apiToken.js";

class SearchArtistService {
    async handle(artist) {
        const apiToken = new ApiToken()
        
        return await instanceApi.get("/search", {
            headers: {
                "Authorization": `${await apiToken.getToken()}`
            },
            params: {
                q: artist,
                type: "artist",
                limit: 5
            }
        })
        .then((response) => {
            const artistData = []

            for (const item of response.data.artists.items) {
                const {id, name, images, external_urls: {spotify: spotify}, followers: {total: total}} = item

                const artistSingleData = {
                    id,
                    name,
                    images,
                    spotifyUrl: spotify,
                    followers: total
                }

                artistData.push(artistSingleData)
            }

            return artistData
        })
    }
}

export { SearchArtistService }