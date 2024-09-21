import { customErrorType } from "../types";

export class ApiError extends Error {
    statusCode: number
    errors: unknown[]
    success: boolean
    constructor(ERROR_DATA: Readonly<customErrorType>) {
      super(ERROR_DATA.message);
      this.statusCode = ERROR_DATA.statusCode;
      this.success = false;
      this.errors = ERROR_DATA.errors;

      // Need to learn more about this
      if(ERROR_DATA.stack){
        this.stack = ERROR_DATA.stack
      }else{
        Error.captureStackTrace(this, this.constructor);
      }
    }
}
     
      