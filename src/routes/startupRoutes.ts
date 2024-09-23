import { Router } from "express";
import { getStartupController, getStartupProfileController, createProjectController , readProjectController, deleteProjectController, updateProjectController,createPostController, readPostController, deletePostController, updatePostController} from "../controllers/startupController";
import { authenticate } from "../middleware/checkAuthentication";

const startupRouter = Router();


//Startup route
startupRouter.route('/').get(authenticate,getStartupController)
startupRouter.route('/profile').get(authenticate,getStartupProfileController)

startupRouter.route('/createProject').post(authenticate,createProjectController)
startupRouter.route('/readProject/:projectId').get(authenticate,readProjectController)
startupRouter.route('/deleteProject/:projectId').delete(authenticate,deleteProjectController)
startupRouter.route('/editProject/:projectId').put(authenticate,updateProjectController)

startupRouter.route('/:projectId/createPost').post(authenticate,createPostController)
startupRouter.route('/:projectId/readPost/:postId').get(authenticate,readPostController)
startupRouter.route('/:projectId/deletePost/:postId').delete(authenticate,deletePostController)
startupRouter.route('/:projectId/editPost/:postId').put(authenticate,updatePostController)



export default startupRouter;