"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const google_bookshelves_1 = require("./endpoints/google-bookshelves");
const google_drive_1 = require("./endpoints/google-drive");
const google_volumes_1 = require("./endpoints/google-volumes");
const fastify = fastify_1.default({ logger: true });
const DEBUG = true;
fastify.get("/api/volumes", google_volumes_1.handleVolumeSearch);
fastify.get("/api/bookshelves", DEBUG ? google_bookshelves_1.handleGetBookshelvesMock : google_bookshelves_1.handleGetBookshelves);
fastify.post("/api/bookshelves/add-volume", google_bookshelves_1.handleAddVolumeToBookshelf);
fastify.get("/api/bookshelves/delete-volume", google_bookshelves_1.handleDeleteVolumeFromBookshelf);
fastify.get("/api/drive", google_drive_1.handleGoogleDrive);
const start = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield fastify.listen(3000);
        fastify.log.info(`fastify listening on ${fastify.server.address().toString()}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
//# sourceMappingURL=index.js.map