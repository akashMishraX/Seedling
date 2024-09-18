import { PrismaClient } from '@prisma/client';
import { getOrCreateAllRoles } from './allRolesHelper'


const prisma = new PrismaClient();


export async function  createInvestor(
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
    },USER_TYPE:string) : Promise<string> {
        
    const existingUser = await prisma.user.findUnique({
        where: { username: USER_DATA.username },
    });
    if (!USER_DATA || !USER_TYPE) { throw new Error('Missing required fields');}
    if (existingUser) {throw new Error('Username already taken');}
    try {
        const roleName :string = await getOrCreateAllRoles(USER_TYPE);
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
                Investor:{
                    create:{
                        total_pledged: 0,
                        total_reward: 0.0,                            
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


