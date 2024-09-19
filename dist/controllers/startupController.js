"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartupProfile = exports.getStartup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//To get startup
const getStartup = (req, res) => {
    try {
        if (!req || !res) {
            throw new Error('Missing request or response objects');
        }
        res.send(`Hello Startup`);
    }
    catch (error) {
        console.error('Error in getStartup function:', error);
        res.status(500).send({ error: 'Internal Server Error' });
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
//# sourceMappingURL=startupController.js.map