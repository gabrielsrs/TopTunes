import axios from "axios"

export const instanceToken = axios.create({
    baseURL: "https://accounts.spotify.com/api",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
})

export const instanceApi = axios.create({
    baseURL: "https://api.spotify.com/v1"
})