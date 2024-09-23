import {NextFunction, Request , Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../util/asyncHandler';
import { ApiError } from '../util/errorHandler';
import { GeneralHelperFunctions } from '../helperFunction/helperFunction';
import { ApiResponse } from '../util/responseHandler';
import { commentReadOrDeleteType, commentType, commentUpdateType } from '../types';
const prisma = new PrismaClient();



export const createCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const COMMENT_DATA :Readonly<commentType>= {
        post_id: parseInt(req.params.postId),
        parent_comment_id : parseInt(req.params.parentCommentId) || 0,
        comment_message : req.body.comment_message,
        user_id : res.locals.__ID,
        like_count:0
    }
    console.log(COMMENT_DATA)
    const helperStartup = new GeneralHelperFunctions()
    const result = await helperStartup.createComment(COMMENT_DATA)
    if (!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Commment successfully created", data: {}})
    res.status(response.statusCode).json(response)
})
export const readCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const READ_COMMENT_DATA :Readonly<commentReadOrDeleteType>={
        comment_id: parseInt(req.params.commentId),
        parent_comment_id: parseInt(req.params.parentCommentId),
    }
    const helperStartup = new GeneralHelperFunctions()
    const result = await helperStartup.readComment(READ_COMMENT_DATA)
    if (!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Commment successfully extracted", data: result})
    res.status(response.statusCode).json(response)

})
export const deleteCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const DELETE_COMMENT_DATA:Readonly<commentReadOrDeleteType>= {
        comment_id: parseInt(req.params.commentId),
        parent_comment_id: parseInt(req.params.parentCommentId),
    }
    const helperStartup =  new GeneralHelperFunctions()
    const result = await helperStartup.deleteComment(DELETE_COMMENT_DATA)
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Commment successfully deleted", data: {}})
    res.status(response.statusCode).json(response)
})
export const updateCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const UPDATE_COMMENT_DATA : Partial<commentUpdateType> = {
        comment_id: parseInt(req.params.commentId),
        parent_comment_id: parseInt(req.params.parentCommentId),
        user_id : res.locals.__ID,
        comment_message : req.body.comment_message,
        like_count:parseInt(req.body.like_count),
    }
    const helperStartup =  new GeneralHelperFunctions()
    const result = await helperStartup.updateComment(UPDATE_COMMENT_DATA)
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Comment successfully Updated", data: {}})
    res.status(response.statusCode).json(response)

})

