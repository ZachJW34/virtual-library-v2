import {
  DefaultHeaders,
  DefaultParams,
  DefaultQuery,
  FastifyReply,
  FastifyRequest
  } from 'fastify';
import { IncomingMessage } from 'http';
import httpError, { HttpError } from 'http-errors';
import Vibrant from 'node-vibrant';
import * as rp from 'request-promise';
import volumesById from './../mocks/volumesById.json';
import { GOOGLE_API_KEY } from '../constants/google-keys';
import bookshelvesById from '../mocks/bookshelvesById.json';
import volumesByBookshelfId from '../mocks/volumesByBookshelfId.json';
import { Bookshelf, BookshelvesResponse } from '../models/google-bookshelves';
import bookshelves from '../mocks/bookshelves.json';
import { Volume, VolumeSearchParams, VolumeSearchResponse } from '../models/google-volumes';
import { addPalette } from '../utils/palette.js';

export const handleGetBookshelves = (
  request: FastifyRequest<
    IncomingMessage,
    VolumeSearchParams,
    DefaultParams,
    DefaultHeaders,
    any
  >,
  reply: FastifyReply<any>
) => {
  rp.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves", {
    qs: {
      key: GOOGLE_API_KEY
    },
    headers: {
      authorization: request.headers.authorization
    },
    json: true
  })
    .then((response: BookshelvesResponse) =>
      response.items.map(bookshelf => ({ ...bookshelf, id: `${bookshelf.id}` }))
    )
    .then(bookshelves => {
      return Promise.all(
        bookshelves.map(bookshelf =>
          rp
            .get(
              `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${
                bookshelf.id
              }/volumes?key=${GOOGLE_API_KEY}`,
              {
                headers: {
                  authorization: request.headers.authorization
                },
                json: true
              }
            )
            .then((volumes: VolumeSearchResponse) =>
              Promise.all(
                volumes.items.map(volume =>
                  !volume.volumeInfo.imageLinks.smallThumbnail
                    ? volume
                    : addPalette(volume)
                )
              ).then((volumes: Volume[]) => ({ bookshelf, volumes }))
            )
            .catch(e => ({ bookshelf, volumes: [] }))
        )
      );
    })
    .then(
      (
        bookshelvesAndVolumes: {
          bookshelf: Bookshelf;
          volumes: Volume[];
        }[]
      ) => {
        const filtered = bookshelvesAndVolumes.filter(
          ({ volumes }) => volumes.length
        );
        const bookshelvesById = filtered.reduce(
          (acc, { bookshelf }) => ({ ...acc, [bookshelf.id]: bookshelf }),
          {}
        );
        const volumesByBookshelfId = filtered.reduce(
          (acc, obj) => ({
            ...acc,
            [obj.bookshelf.id]: obj.volumes.length
              ? obj.volumes.map(volume => volume.id)
              : []
          }),
          {}
        );
        const volumesById = filtered.reduce(
          (acc, { volumes }) => ({
            ...acc,
            ...(volumes.length
              ? volumes.reduce(
                  (acc, volume) => ({ ...acc, [volume.id]: volume }),
                  {}
                )
              : {})
          }),
          {}
        );
        reply.send({
          bookshelvesById,
          volumesById,
          volumesByBookshelfId
        });
      }
    )
    .catch((e: HttpError) => reply.send(new httpError.InternalServerError(e.message)));
};

export const handleGetBookshelvesMock = (
  request: FastifyRequest<
    IncomingMessage,
    VolumeSearchParams,
    DefaultParams,
    DefaultHeaders,
    any
  >,
  reply: FastifyReply<any>
) => {
  reply.send(bookshelves);
};

export const handleAddVolumeToBookshelf = (
  request: FastifyRequest<
    IncomingMessage,
    DefaultQuery,
    DefaultParams,
    DefaultHeaders,
    { bookshelfId: string, volume: Volume }
  >,
  reply: FastifyReply<any>
) => {
  console.log(request.body);
  const { bookshelfId, volume } = request.body;
  rp.post(
    `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfId}/addVolume`,
    {
      qs: {
        volumeId: volume.id,
        key: GOOGLE_API_KEY
      },
      headers: {
        authorization: request.headers.authorization
      },
      resolveWithFullResponse: true
    }
  )
    .then(res => {
      // reply.send({ didSucceed: res.statusCode === 204 ? true : false })
      if (res.statusCode === 204) {
        !volume.volumeInfo.imageLinks.smallThumbnail
          ? reply.send(volume)
          : Vibrant.from(volume.volumeInfo.imageLinks.smallThumbnail)
              .getPalette()
              .then(palette => {
                console.log('Palette: ', palette);
                volume.volumeInfo.palette = palette;
                reply.send(volume);
              });
      } else {
        reply.send(new httpError.InternalServerError());
      }
    })
    .catch(e => reply.send(new httpError.InternalServerError(e)));
};

export const handleDeleteVolumeFromBookshelf = (
  request: FastifyRequest<
    IncomingMessage,
    { bookshelfId: string; volumeId: string },
    DefaultParams,
    DefaultHeaders,
    any
  >,
  reply: FastifyReply<any>
) => {
  const { bookshelfId, volumeId } = request.query;
  rp.post(
    `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfId}/removeVolume`,
    {
      qs: {
        volumeId,
        key: GOOGLE_API_KEY
      },
      headers: {
        authorization: request.headers.authorization
      },
      resolveWithFullResponse: true
    }
  )
    .then(res =>
      reply.send({ didSucceed: res.statusCode === 204 ? true : false })
    )
    .catch(e => reply.send(new httpError.InternalServerError(e)));
};
