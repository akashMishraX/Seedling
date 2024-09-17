"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartupProfile = exports.getStartup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//To get inverstor
const getStartup = (req, res) => {
    try {
        createRoles();
    }
    catch {
        console.error('error');
        res.redirect('/startup/profile');
    }
};
exports.getStartup = getStartup;
const getStartupProfile = (req, res) => {
    res.send('welcome to the startup profile');
};
exports.getStartupProfile = getStartupProfile;
async function createRoles() {
    const role = await prisma.roles.createMany({
        data: [
            {
                role_name: 'startup'
            },
            {
                role_name: 'investor'
            },
            {
                role_name: 'admin'
            }
        ]
    });
}
function redirect(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=startupController.js.map