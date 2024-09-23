import { Router } from "express";
import { authenticate } from "../middleware/checkAuthentication";
import { createCommentController,readCommentController,deleteCommentController,updateCommentController } from "../controllers/commentController";


const commentRouter = Router();

//Inverstors route
commentRouter.route('/:postId/:parentCommentId/createComment').post(authenticate,createCommentController)
commentRouter.route('/:commentId/:parentCommentId/readComment').get(authenticate,readCommentController)
commentRouter.route('/:commentId/:parentCommentId/deleteComment').delete(authenticate,deleteCommentController)
commentRouter.route('/:commentId/:parentCommentId/updateComment').put(authenticate,updateCommentController)



export default commentRouter;