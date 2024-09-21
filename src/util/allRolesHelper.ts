import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function getOrCreateAllRoles(role_name:string) {
    const roleRes = await prisma.roles.findUnique({
        where: { role_name: role_name },
    });
    if (roleRes) {
        return roleRes.role_name;
    }

    await prisma.roles.createMany({
        data: [
            {role_name: 'admin'},
            {role_name: 'investor'},
            {role_name: 'startup'}
        ]
    })
    console.log('All roles created successfully');
    return role_name 
}