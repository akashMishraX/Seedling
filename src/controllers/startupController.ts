import { Request , Response , NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { categorySchema, userStartupRegisterData } from '../types';
import { getOrCreateAllRoles } from '../util/allRolesHelper';
import { asyncHandler } from "../util/asyncHandler";
import { ApiError } from "../util/errorHandler";

const prisma = new PrismaClient();


//To get startup
export const getStartup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    res.send('startup');
})
export const getStartupProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const USER_TYPE = req.headers['user-type'] as string;
    if(USER_TYPE != 'startup') {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    
    res.send('welcome to the startup profile');
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

     
}