import { Response,Request,NextFunction } from "express";
import { ControllerFunction } from "../types";
import { ApiError } from "./errorHandler";

export class MethodsHandler {
    private validateCommonFields(username: string, requestType: string | undefined, expectedRequestType: string): void {
        if (!username) {
            throw new ApiError({ statusCode: 400, message: "Missing username parameter", errors: [], stack: "" });
        }
        if (!requestType) {
            throw new ApiError({ statusCode: 400, message: "Missing request type", errors: [], stack: "" });
        }
        if (requestType !== expectedRequestType) {
            throw new ApiError({ statusCode: 400, message: "Invalid request type", errors: [], stack: "" });
        }
    }

    getHandler = (fn: ControllerFunction) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username } = req.body;
            const userType = req.headers['User-Type'] as string;
            const requestType = req.headers['Request-Type'] as string;

            this.validateCommonFields(username, requestType, 'get');

            if (!userType) {
                throw new ApiError({ statusCode: 400, message: "Unauthorized: Missing user type", errors: [], stack: "" });
            }

            // Call the passed controller function
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }

    postHandler = (fn: ControllerFunction) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username } = req.body;
            const requestType = req.headers['request-type'] as string;

            this.validateCommonFields(username, requestType, 'post');

            // Call the passed controller function
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }

    deleteHandler = (fn: ControllerFunction) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username } = req.body;
            const requestType = req.headers['request-type'] as string;

            this.validateCommonFields(username, requestType, 'delete');

            // Call the passed controller function
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}