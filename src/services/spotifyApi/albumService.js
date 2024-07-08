import { instanceApi } from "../../config/axios.js";
import { ApiToken } from "../../utils/apiToken.js";

class AlbumService {
    async handle(artistId) {
        const apiToken = new ApiToken()
        
        return await instanceApi.get(`/artists/${artistId}/albums `, {
            headers: {
                "Authorization": `${await apiToken.getToken()}`
            },
            params: {
                limit: 1
            }
        })
        .then((response) => {
            const albumImage = response.data.items[0].images
            
            return albumImage
        })
        .catch(err => {
            console.error("Error when fetch dada: ", err)
        }) 
    }
}

export { AlbumService }