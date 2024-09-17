"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartupProfile = exports.getStartup = void 0;
//To get inverstor
const getStartup = (req, res) => {
    res.send('startup');
};
exports.getStartup = getStartup;
const getStartupProfile = (req, res) => {
    res.send('welcome to the startup profile');
};
exports.getStartupProfile = getStartupProfile;
//# sourceMappingURL=startupController.js.map