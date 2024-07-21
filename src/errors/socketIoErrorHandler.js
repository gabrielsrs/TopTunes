import { SocketIoErrorValidationHandler } from "./errorsInstances/socketIoErrorValidationHandler.js"
import { AxiosError } from "axios"

class SocketIoErrorHandler {
    handle (error) {
        if (error instanceof SocketIoErrorValidationHandler) {
            return {
                event: "searchError", 
                response: { message: error.message }
            }
        }
    
        if (error instanceof AxiosError) {
            console.error(error.message)
            return {
                event: "searchError", 
                response: { message: "Failed to fetch data. Please try again latter." }
            }
        }
    
        return {
            event: "searchError", 
            response: { message: "Internal server Error." }
        }
    }
}


export const socketIoErrorHandler = new SocketIoErrorHandler()