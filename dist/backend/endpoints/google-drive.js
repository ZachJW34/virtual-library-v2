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
const http_errors_1 = __importDefault(require("http-errors"));
const request_promise_1 = __importDefault(require("request-promise"));
exports.handleGoogleDrive = (request, reply) => __awaiter(this, void 0, void 0, function* () {
    try {
        request_promise_1.default.get("https://www.googleapis.com/drive/v3/files", {
            qs: {
                name: 'malazan'
            },
            headers: {
                authorization: request.headers.authorization
            }
        }).then(res => reply.send(res));
    }
    catch (err) {
        reply.send(new http_errors_1.default.InternalServerError(err));
    }
});
//# sourceMappingURL=google-drive.js.map