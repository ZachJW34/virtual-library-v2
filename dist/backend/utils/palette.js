"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_vibrant_1 = __importDefault(require("node-vibrant"));
exports.addPalette = (volume) => node_vibrant_1.default.from(volume.volumeInfo.imageLinks.smallThumbnail)
    .getPalette()
    .then(palette => {
    volume.volumeInfo.palette = palette;
    return volume;
})
    .catch(() => volume);
//# sourceMappingURL=palette.js.map