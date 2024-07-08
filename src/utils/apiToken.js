import { instanceToken } from "../config/axios.js"
import qs from "qs"
import fs from "fs"

class ApiToken {
    async getToken() { 
        try {    
            const tokenData = JSON.parse(fs.readFileSync('src/data/token.json', 'utf-8'))

            if (Date.now() > tokenData.expires_in) {
                await this._fetchToken()
                return this.getToken()
            }

            return `${tokenData.token_type} ${tokenData.access_token}`
        }catch(err) {
            console.error('Error get Spotify token:', err)
        }
        
    }
    
    async _fetchToken() {
        const data =  qs.stringify({
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        })

        await instanceToken.post("/token", data)
        .then((response) => {
            const { access_token, token_type, expires_in} = response.data

            const tokenData = {
                access_token, 
                token_type, 
                expires_in: Date.now() + (expires_in * 1000)
            }

            fs.writeFileSync('src/data/token.json', JSON.stringify(tokenData), { encoding: "utf-8" })
        }) 
    }

}

export { ApiToken }