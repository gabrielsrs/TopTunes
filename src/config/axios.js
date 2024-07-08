export const instanceToken = axios.create({
    baseURL: "https://accounts.spotify.com/api/token",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }
})

export const instanceApi = axios.create({
    baseURL: "https://api.spotify.com/v1/"
})