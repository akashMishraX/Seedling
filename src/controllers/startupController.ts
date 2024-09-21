import {Request , Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { categorySchema, userStartupRegisterData } from '../types';
import { getOrCreateAllRoles } from '../util/allRolesHelper';

const prisma = new PrismaClient();


//To get startup
export class StartupController {
    async getStartup(req: Request, res: Response){
        try {
            if (!req || !res) {
                throw new Error('Missing request or response objects');
            }
    
            res.send(`Hello Startup`);
        } catch (error) {
            console.error('Error in getStartup function:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
    async getStartupProfile(req:Request , res:Response){
        res.send('welcome to the startup profile');
    }
    
}


export class StartupHelperFunctions{
    async getOrCreateCategories(CATEGORY_DATA:Readonly<categorySchema>): Promise<number> {
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
    
    
    async createStartup(USER_DATA:Readonly<userStartupRegisterData>,USER_TYPE:string) : Promise<string> {
            
        const existingUser = await prisma.user.findUnique({
            where: { username: USER_DATA.username },
        });
        if (!USER_DATA || !USER_TYPE) { throw new Error('Missing required fields');}
        if (existingUser) {throw new Error('Username already taken');}
        try {
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
        return "success"   
        }
        catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
    
    
}