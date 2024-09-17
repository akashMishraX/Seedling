import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function  createInvestor(USER_DATA:{username:string,email:string,country:string,city:string,pincode:string,address_description:string,address_type:string,password:string},USER_TYPE:string) {
    const existingUser = await prisma.user.findUnique({
        where: { username: USER_DATA.username },
    });
    if (!USER_DATA || !USER_TYPE) { throw new Error('Missing required fields');}
    if (existingUser) {throw new Error('Username already taken');}
    try {
        
        const user = await prisma.user.create({
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
                                role_name: USER_TYPE
                            }
                        }
                    }             
                },
                Investor:{},        
            }
        })    
    }
    catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
}
