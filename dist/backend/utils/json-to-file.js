"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.jsonToFile = (path, json) => {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(json);
        fs_1.default.writeFile(path, json, 'utf-8', (err) => {
            resolve(!!err);
        });
    });
};
//# sourceMappingURL=json-to-file.js.map