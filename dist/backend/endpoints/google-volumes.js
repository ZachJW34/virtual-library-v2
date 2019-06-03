"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const request_promise_1 = __importDefault(require("request-promise"));
const google_keys_1 = require("../constants/google-keys");
exports.handleVolumeSearch = (request, reply) => __awaiter(this, void 0, void 0, function* () {
    try {
        const transform = transformVolumeQuery(request.query);
        console.log("Transformed: ", transform);
        const volumes = yield request_promise_1.default.get("https://www.googleapis.com/books/v1/volumes", {
            qs: {
                q: transform,
                key: google_keys_1.GOOGLE_API_KEY,
                country: "US"
            }
        });
        // const fileWriteSuccess = await jsonToFile('C:\\Users\\Zach\\Desktop\\web-dev\\virtual-library-backend\\src\\logs\\google-books.json', volumes);
        // fastify.log.info(`Number of books: ${volumes.items}`);
        reply.send(volumes);
    }
    catch (err) {
        reply.send(new http_errors_1.default.InternalServerError(err));
    }
});
const transformVolumeQuery = (query) => {
    const { q } = query, rest = __rest(query, ["q"]);
    const params = rest;
    return `${q}${Object.keys(params).reduce((acc, key) => {
        return `${acc}+${key}:${params[key]}`;
    }, "")}`.replace(/ /g, "");
};
//# sourceMappingURL=google-volumes.js.map