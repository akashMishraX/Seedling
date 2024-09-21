import { Response,Request,NextFunction } from "express";

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction): Promise<string | null> => {
   return Promise.resolve(fn(req, res, next)).catch((err)=>next(err));
};
