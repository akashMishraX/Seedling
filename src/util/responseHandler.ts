import { apiResponseType } from "../types"

export class ApiResponse {
    statusCode: number
    success: boolean
    message: string
    data:  {}
    constructor(RESPONSE_DATA: Readonly<apiResponseType>) {
        this.statusCode = RESPONSE_DATA.statusCode
        this.data = RESPONSE_DATA.data
        this.message = RESPONSE_DATA.message
        this.success = RESPONSE_DATA.statusCode < 400
    }
}
