import { commentReadOrDeleteType, commentType, commentUpdateType } from "../types"
import { ApiError } from "../util/errorHandler"
import { ApiResponse } from "../util/responseHandler"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class GeneralHelperFunctions {
    createCommentController(authenticate: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<any>, createCommentController: any) {
        throw new Error("Method not implemented.");
    }

    //COMMMENT FUNCTIONS
    createComment = async (COMMENT_DATA:commentType):Promise<Boolean> => {

    
        const newComment = await prisma.comment.create({
            data:{
                comment_message: COMMENT_DATA.comment_message,
                post:{
                    connect:{
                        post_id: COMMENT_DATA.post_id
                    }
                },
                user:{
                    connect:{
                        id: COMMENT_DATA.user_id
                    }
                }   
            }
        })
        if (COMMENT_DATA.parent_comment_id && COMMENT_DATA.parent_comment_id !== 0){
            await prisma.comment.update({
                where:{ comment_id :newComment.comment_id }, 
                data:{
                    parent_comment_id: COMMENT_DATA.parent_comment_id,
                }
            })
        }

        return true
    } 
    readComment = async (READ_COMMENT_DATA:Readonly<commentReadOrDeleteType>):Promise<object> => {
        const commentRes = await prisma.comment.findUnique({
            where: { comment_id: READ_COMMENT_DATA.comment_id },
        })
        if (!commentRes) {
            throw new ApiError({statusCode: 404, message: "Comment not found", errors: [], stack: ''});
        }
        return commentRes
    }
    deleteComment = async (DELETE_COMMENT_DATA:Readonly<commentReadOrDeleteType>):Promise<ApiResponse> => {
        const commentRes = await prisma.comment.findUnique({
            where: { comment_id: DELETE_COMMENT_DATA.comment_id },
        })
        if (!commentRes) {
            throw new ApiError({statusCode: 404, message: "Comment not found", errors: [], stack: ''});
        }
        await prisma.comment.delete({
            where: { comment_id: DELETE_COMMENT_DATA.comment_id },
        })
        return new ApiResponse({statusCode: 200, message: "Comment deleted", data: {}})
    }
    updateComment = async (UPDATE_COMMENT_DATA:Partial<commentUpdateType>):Promise<Boolean> => {
        const commentRes = await prisma.comment.findFirst({
            where:{ comment_id: UPDATE_COMMENT_DATA.comment_id },
        })
        if (!commentRes) {
            throw new ApiError({statusCode: 404, message: "Comment not found", errors: [], stack: ''});
        } 
        
        function updateDataFunction():Partial<commentUpdateType> {
            const updateData: Partial<commentUpdateType> = {};
            if (UPDATE_COMMENT_DATA.comment_message !== undefined) {updateData.comment_message = UPDATE_COMMENT_DATA.comment_message;} 
            if (UPDATE_COMMENT_DATA.like_count !== undefined) {updateData.like_count = UPDATE_COMMENT_DATA.like_count;} 

            return updateData
        }       
        const updateData = updateDataFunction() 

        if (Object.keys(updateData).length > 0) {
            updateData['is_edited'] = true
            await prisma.comment.update({
                where: { comment_id : UPDATE_COMMENT_DATA.comment_id},
                data: updateData
            })
        }
        return true
    }
}