"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const node_vibrant_1 = __importDefault(require("node-vibrant"));
const rp = __importStar(require("request-promise"));
const google_keys_1 = require("../constants/google-keys");
const bookshelves_json_1 = __importDefault(require("../mocks/bookshelves.json"));
const palette_js_1 = require("../utils/palette.js");
exports.handleGetBookshelves = (request, reply) => {
    rp.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves", {
        qs: {
            key: google_keys_1.GOOGLE_API_KEY
        },
        headers: {
            authorization: request.headers.authorization
        },
        json: true
    })
        .then((response) => response.items.map(bookshelf => (Object.assign({}, bookshelf, { id: `${bookshelf.id}` }))))
        .then(bookshelves => {
        return Promise.all(bookshelves.map(bookshelf => rp
            .get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelf.id}/volumes?key=${google_keys_1.GOOGLE_API_KEY}`, {
            headers: {
                authorization: request.headers.authorization
            },
            json: true
        })
            .then((volumes) => Promise.all(volumes.items.map(volume => !volume.volumeInfo.imageLinks.smallThumbnail
            ? volume
            : palette_js_1.addPalette(volume))).then((volumes) => ({ bookshelf, volumes })))
            .catch(e => ({ bookshelf, volumes: [] }))));
    })
        .then((bookshelvesAndVolumes) => {
        const filtered = bookshelvesAndVolumes.filter(({ volumes }) => volumes.length);
        const bookshelvesById = filtered.reduce((acc, { bookshelf }) => (Object.assign({}, acc, { [bookshelf.id]: bookshelf })), {});
        const volumesByBookshelfId = filtered.reduce((acc, obj) => (Object.assign({}, acc, { [obj.bookshelf.id]: obj.volumes.length
                ? obj.volumes.map(volume => volume.id)
                : [] })), {});
        const volumesById = filtered.reduce((acc, { volumes }) => (Object.assign({}, acc, (volumes.length
            ? volumes.reduce((acc, volume) => (Object.assign({}, acc, { [volume.id]: volume })), {})
            : {}))), {});
        reply.send({
            bookshelvesById,
            volumesById,
            volumesByBookshelfId
        });
    })
        .catch((e) => reply.send(new http_errors_1.default.InternalServerError(e.message)));
};
exports.handleGetBookshelvesMock = (request, reply) => {
    reply.send(bookshelves_json_1.default);
};
exports.handleAddVolumeToBookshelf = (request, reply) => {
    console.log(request.body);
    const { bookshelfId, volume } = request.body;
    rp.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfId}/addVolume`, {
        qs: {
            volumeId: volume.id,
            key: google_keys_1.GOOGLE_API_KEY
        },
        headers: {
            authorization: request.headers.authorization
        },
        resolveWithFullResponse: true
    })
        .then(res => {
        // reply.send({ didSucceed: res.statusCode === 204 ? true : false })
        if (res.statusCode === 204) {
            !volume.volumeInfo.imageLinks.smallThumbnail
                ? reply.send(volume)
                : node_vibrant_1.default.from(volume.volumeInfo.imageLinks.smallThumbnail)
                    .getPalette()
                    .then(palette => {
                    console.log('Palette: ', palette);
                    volume.volumeInfo.palette = palette;
                    reply.send(volume);
                });
        }
        else {
            reply.send(new http_errors_1.default.InternalServerError());
        }
    })
        .catch(e => reply.send(new http_errors_1.default.InternalServerError(e)));
};
exports.handleDeleteVolumeFromBookshelf = (request, reply) => {
    const { bookshelfId, volumeId } = request.query;
    rp.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfId}/removeVolume`, {
        qs: {
            volumeId,
            key: google_keys_1.GOOGLE_API_KEY
        },
        headers: {
            authorization: request.headers.authorization
        },
        resolveWithFullResponse: true
    })
        .then(res => reply.send({ didSucceed: res.statusCode === 204 ? true : false }))
        .catch(e => reply.send(new http_errors_1.default.InternalServerError(e)));
};
//# sourceMappingURL=google-bookshelves.js.map