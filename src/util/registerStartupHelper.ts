import { PrismaClient } from '@prisma/client';
import { getOrCreateAllRoles } from './allRolesHelper'


const prisma = new PrismaClient();


async function getOrCreateCategories(categoryName: string,categoryDescription:string): Promise<string> {
    let category_Name: string; 
    const categoryRes = await prisma.category.findUnique({
        where: { category_name: categoryName },
    });

        if (categoryRes) {
            category_Name = categoryRes.category_name;
        } else {
            const newCategory = await prisma.category.create({
                data: {
                    category_name: categoryName,
                    description: categoryDescription
                }
            });
            category_Name = newCategory.category_name;
        }
    return category_Name;
}


export async function  createStartup(
    USER_DATA:{
        username:string,
        email:string,
        country:string,
        city:string,
        pincode:string,
        address_description:string,
        address_type:string,
        password:string,
        category:string,
        categoryDescription:string
    },USER_TYPE:string) : Promise<void> {
        
    const existingUser = await prisma.user.findUnique({
        where: { username: USER_DATA.username },
    });
    if (!USER_DATA || !USER_TYPE) { throw new Error('Missing required fields');}
    if (existingUser) {throw new Error('Username already taken');}
    try {
        const roleName :string = await getOrCreateAllRoles(USER_TYPE);
        const categoryName: string = await getOrCreateCategories(USER_DATA.category,USER_DATA.categoryDescription);
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
                UserRole: {
                    create: {
                        role:{
                            connect:{
                                role_name: roleName
                            }
                        }
                    }             
                },
                Startup:{
                    create: {
                        startupCategory:{
                            create:{
                                category:{
                                    connect:{
                                        category_name: categoryName
                                    }
                                }
                            }
                        }                        
                    }
                },        
            }
        })    
    }
    catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
}

