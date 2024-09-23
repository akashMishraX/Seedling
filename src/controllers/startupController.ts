import { Request , Response , NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { categorySchema, postReadOrDeleteType, postType, postUpdateType, projectReadOrDeleteType, projectType, projectUpdateType, userStartupRegisterData } from '../types';
import { getOrCreateAllRoles } from '../util/allRolesHelper';
import { asyncHandler } from "../util/asyncHandler";
import { ApiError } from "../util/errorHandler";
import { ApiResponse } from "../util/responseHandler";


const prisma = new PrismaClient();


//To get startup
export const getStartupController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const __ID = res.locals.__ID;
    res.send(`${__ID}`);
})
export const getStartupProfileController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    
    res.send('welcome to the startup profile');
})


export const createProjectController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const __ID = res.locals.__ID;
    const PROJECT_DATA : Readonly<projectType> = {
        __ID: __ID,
        name: req.body.name,
        description: req.body.description,
        goal_amount: req.body.goal_amount,
        raised_amount: req.body.raised_amount,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    }
    const helperStartup =  new StartupHelperFunctions()
    const result = await helperStartup.createProject(PROJECT_DATA)  
    if (!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Project successfully created", data: {}})
    res.status(response.statusCode).json(response)
})
export const readProjectController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const READ_PROJECT_DATA:Readonly<projectReadOrDeleteType>= {
        project_id  : parseInt(req.params.projectId)
    }
    console.log(READ_PROJECT_DATA)
    const helperStartup =  new StartupHelperFunctions()
    const result = await helperStartup.readProject(READ_PROJECT_DATA) 
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Project successfully extracted", data: result})
    res.status(response.statusCode).json(response)
})
export const deleteProjectController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const DELETE_PROJECT_DATA:Readonly<projectReadOrDeleteType>= {
        project_id  : parseInt(req.params.projectId)
    }
    const helperStartup =  new StartupHelperFunctions()
    const result = await helperStartup.deleteProject(DELETE_PROJECT_DATA)
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Project successfully Deleted", data: {}})
    res.status(response.statusCode).json(response)
})
export const updateProjectController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const UPDATE_PROJECT_DATA : Partial<projectUpdateType> = {
        project_id: parseInt(req.params.projectId),
        name: req.body.name,
        description: req.body.description,
        goal_amount: req.body.goal_amount,
        raised_amount: req.body.raised_amount,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        active: req.body.active
    }
    const helperStartup =  new StartupHelperFunctions()
    const result = await helperStartup.updateProject(UPDATE_PROJECT_DATA)
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Project successfully Updated", data: result})
    res.status(response.statusCode).json(response)

})


export const createPostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const project_id = req.params.projectId
    const POST_DATA :Readonly<postType>= {
        project_id: parseInt(project_id),
        title : req.body.title,
        content : req.body.content
    }
   
    const helperStartup = new StartupHelperFunctions()
    const result = await helperStartup.createPost(POST_DATA)
    if (!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Post successfully created", data: {}})
    res.status(response.statusCode).json(response)
})
export const readPostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const project_id = parseInt(req.params.projectId)
    const post_id = parseInt(req.params.postId)
    const READ_POST_DATA :Readonly<postReadOrDeleteType>={
        project_id: project_id,
        post_id:post_id
    }
    const helperStartup = new StartupHelperFunctions()
    const result = await helperStartup.readPost(READ_POST_DATA)
    if (!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Post successfully extracted", data: result})
    res.status(response.statusCode).json(response)

})
export const deletePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const DELETE_POST_DATA:Readonly<postReadOrDeleteType>= {
        project_id  : parseInt(req.params.projectId),
        post_id: parseInt(req.params.postId)
    }
    const helperStartup =  new StartupHelperFunctions()
    const result = await helperStartup.deletePost(DELETE_POST_DATA)
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Post successfully Deleted", data: {}})
    res.status(response.statusCode).json(response)
})
export const updatePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    const UPDATE_POST_DATA : Partial<postUpdateType> = {
        project_id: parseInt(req.params.projectId),
        post_id: parseInt(req.params.postId),
        title : req.body.title,
        content : req.body.content
    }
    const helperStartup =  new StartupHelperFunctions()
    const result = await helperStartup.updatePost(UPDATE_POST_DATA)
    if(!result){
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const response = new ApiResponse({statusCode: 200, message: "Post successfully Updated", data: {}})
    res.status(response.statusCode).json(response)

})



export class StartupHelperFunctions{
    private async getOrCreateCategories(CATEGORY_DATA:Readonly<categorySchema>): Promise<number> {
        let category_Name: string; 
        let category_id: number;
        const categoryRes = await prisma.category.findUnique({
            where: { category_name: CATEGORY_DATA.category },
        });
    
        if (categoryRes) {
            category_Name = categoryRes.category_name;
            category_id = categoryRes.category_id;
        } else {
            const newCategory = await prisma.category.create({
                data: {
                    category_name: CATEGORY_DATA.category ,
                    description: CATEGORY_DATA.categoryDescription
                }
            });
            category_Name = newCategory.category_name;
            category_id = newCategory.category_id;
        }
        return category_id;
    }
    
    createStartup = async(USER_DATA:Readonly<userStartupRegisterData>,USER_TYPE:string) : Promise<boolean> => { 
        const existingUser = await prisma.user.findUnique({
            where: { username: USER_DATA.username },
        });
        if (!USER_DATA || !USER_TYPE) { throw new Error('Missing required fields');}
        if (existingUser) {throw new Error('Username already taken');}
       
        const roleName :string = await getOrCreateAllRoles(USER_TYPE);
        const CATEGORY_DATA = {
            category: USER_DATA.category,
            categoryDescription: USER_DATA.categoryDescription
        }
        const categoryId: number = await this.getOrCreateCategories(CATEGORY_DATA);
        await prisma.user.create({
            data: {
                username: USER_DATA.username,
                email:  USER_DATA.email, 
                address: {
                    create: {
                        country: USER_DATA.country,
                        city: USER_DATA.city,
                        pincode: USER_DATA.pincode,
                        address_description: USER_DATA.address_description,
                        address_type:   USER_DATA.address_type,
                    }
                },
                login: {
                    create: {
                        password : USER_DATA.password,
                    }
                },           
                Roles:{
                    connect: {
                        role_name: roleName
                    }
                },
                Startup:{
                    create:{
                        Category:{
                            connect: {
                                category_id: categoryId
                            }
                        }   
                    }
                }
                
            }
        })
        return true   
    }

    //PROJECTS
    createProject = async (PROJECT_DATA:Readonly<projectType>):Promise<Boolean>=> {
        const existingProject = await prisma.project.findFirst({
            where: { name: PROJECT_DATA.name},
        })
        if (existingProject) {
            throw new ApiError({statusCode: 409, message: "Project name already exists", errors: [], stack: ''});
        }

        const startupRes = await prisma.startup.findUnique({
            where: { founder_id: PROJECT_DATA.__ID },
        })
        if (!startupRes) {
            throw new ApiError({statusCode: 404, message: "Startup not found", errors: [], stack: ''});
        }
        const STARTUP_ID = startupRes.startup_id

        const startDate = new Date(PROJECT_DATA.start_date).toISOString();
        const endDate = new Date(PROJECT_DATA.end_date).toISOString();
      
        
        await prisma.project.create({
            data: {
                name:PROJECT_DATA.name,
                description: PROJECT_DATA.description,
                goal_amount: PROJECT_DATA.goal_amount,
                raised_amount: PROJECT_DATA.raised_amount,
                start_date: startDate,
                end_date: endDate,

                startup:{
                    connect: {
                        startup_id: STARTUP_ID
                    }
                }
            }
        })
        return true
    }
    readProject = async (READ_PROJECT_DATA:Readonly<projectReadOrDeleteType>):Promise<object> => {
        const projectRes = await prisma.project.findUnique({
            where: { project_id: READ_PROJECT_DATA.project_id},
        })
        if (!projectRes) {
            throw new ApiError({statusCode: 404, message: "Project not found", errors: [], stack: ''});
        }
        return projectRes
    }
    deleteProject = async (DELETE_PROJECT_DATA:Readonly<projectReadOrDeleteType>):Promise<Boolean> => {
        const projectRes = await prisma.project.findUnique({
            where: { project_id: DELETE_PROJECT_DATA.project_id},
        })
        if (!projectRes) {
            throw new ApiError({statusCode: 404, message: "Project not found", errors: [], stack: ''});
        }
        if(projectRes.active){
            throw new ApiError({statusCode: 400, message: "Project is active", errors: [], stack: ''});
        }

        //delete all post,reward and upadtes
        const result = await prisma.$transaction(async (tx) => {
            await tx.post.deleteMany({
                where :{ project_id: DELETE_PROJECT_DATA.project_id } 
            })
            await tx.reward.deleteMany({
                where :{ project_id: DELETE_PROJECT_DATA.project_id } 
            })
            await tx.timeline.deleteMany({
                where :{ project_id: DELETE_PROJECT_DATA.project_id } 
            })
            const deletedProject = await tx.project.delete({
                where: { project_id: DELETE_PROJECT_DATA.project_id },
            })
            return true
        })
        return result
    }
    updateProject = async (UPDATE_PROJECT_DATA:Partial<projectUpdateType>):Promise<Boolean> => {
        const projectRes = await prisma.project.findUnique({
            where: { project_id: UPDATE_PROJECT_DATA.project_id },
        })
        if (!projectRes) {
            throw new ApiError({statusCode: 404, message: "Project not found", errors: [], stack: ''});
        }
        //add ts
        function updateDataFunction():Partial<projectUpdateType> {
            const updateData: Partial<projectUpdateType> = {};
            if (UPDATE_PROJECT_DATA.name !== undefined) {updateData.name = UPDATE_PROJECT_DATA.name;}
            if (UPDATE_PROJECT_DATA.description !== undefined) {updateData.description = UPDATE_PROJECT_DATA.description;}
            if (UPDATE_PROJECT_DATA.goal_amount !== undefined) {updateData.goal_amount = UPDATE_PROJECT_DATA.goal_amount;}
            if (UPDATE_PROJECT_DATA.raised_amount !== undefined) {updateData.raised_amount = UPDATE_PROJECT_DATA.raised_amount;}
            if (UPDATE_PROJECT_DATA.start_date !== undefined) {updateData.start_date = UPDATE_PROJECT_DATA.start_date;}
            if (UPDATE_PROJECT_DATA.end_date !== undefined) {updateData.end_date = UPDATE_PROJECT_DATA.end_date;}
            if (UPDATE_PROJECT_DATA.active !== undefined) {updateData.active = UPDATE_PROJECT_DATA.active;}

            return updateData
        }       
        const updateData = updateDataFunction() 
        if(Object.keys(updateData).length > 0) {
            await prisma.project.update({
                where: { project_id: UPDATE_PROJECT_DATA.project_id },
                data: updateData
            })
        }
        
        return true
    }

    //POSTS
    createPost = async (POST_DATA:Readonly<postType>) : Promise<Boolean> => 
    {
        await prisma.post.create({
            data: {
                title: POST_DATA.title,
                content: POST_DATA.content,

                Project:{
                    connect: {
                        project_id: POST_DATA.project_id
                    }
                }
            }
        })
        return true
    }
    readPost = async (READ_POST_DATA:Readonly<postReadOrDeleteType>):Promise<object> => {
        const postRes = await prisma.post.findUnique({
            where: { post_id: READ_POST_DATA.post_id},
        })
        if (!postRes) {
            throw new ApiError({statusCode: 404, message: "Post not found", errors: [], stack: ''});
        }
        return postRes
    }
    deletePost = async (DELETE_POST_DATA:Readonly<postReadOrDeleteType>):Promise<ApiResponse> => {
        const postRes = await prisma.post.findUnique({
            where: { post_id: DELETE_POST_DATA.post_id, project_id: DELETE_POST_DATA.project_id},
        })
        if (!postRes) {
            throw new ApiError({statusCode: 404, message: "Post not found", errors: [], stack: ''});
        }
        await prisma.post.delete({
            where: { post_id: DELETE_POST_DATA.post_id, project_id: DELETE_POST_DATA.project_id},
        })
        return new ApiResponse({statusCode: 200, message: "Post deleted", data: {}})
    }
    updatePost = async (UPDATE_POST_DATA:Partial<postUpdateType>):Promise<Boolean> => {
        const postRes = await prisma.post.findFirst({
            where:{ post_id: UPDATE_POST_DATA.post_id, project_id: UPDATE_POST_DATA.project_id},
        })
        if (!postRes) {
            throw new ApiError({statusCode: 404, message: "Post not found", errors: [], stack: ''});
        } 
        
        function updateDataFunction():Partial<postUpdateType> {
            const updateData: Partial<postUpdateType> = {};
            if (UPDATE_POST_DATA.title !== undefined) {updateData.title = UPDATE_POST_DATA.title;} 
            if (UPDATE_POST_DATA.content !== undefined) {updateData.content = UPDATE_POST_DATA.content;}

            return updateData
        }       
        const updateData = updateDataFunction() 
 
        if (Object.keys(updateData).length > 0) {
            await prisma.post.update({
                where: { post_id : UPDATE_POST_DATA.post_id, project_id: UPDATE_POST_DATA.project_id},
                data: updateData
            })
        }
        return true
    }
    //REWARDS
    //UPDATES

}