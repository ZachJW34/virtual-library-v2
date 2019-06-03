import {
  DefaultHeaders,
  DefaultParams,
  FastifyReply,
  FastifyRequest
  } from 'fastify';
import { IncomingMessage } from 'http';
import httpErrors from 'http-errors';
import rp from 'request-promise';
import { GOOGLE_API_KEY } from '../constants/google-keys';
import { VolumeSearchParams, VolumeSearchResponse } from '../models/google-volumes';

export const handleVolumeSearch = async (
  request: FastifyRequest<
    IncomingMessage,
    VolumeSearchParams,
    DefaultParams,
    DefaultHeaders,
    any
  >,
  reply: FastifyReply<any>
) => {
  try {
    const transform = transformVolumeQuery(request.query);
    console.log("Transformed: ", transform);
    const volumes: VolumeSearchResponse = await rp.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        qs: {
          q: transform,
          key: GOOGLE_API_KEY,
          country: "US"
        }
      }
    );
    // const fileWriteSuccess = await jsonToFile('C:\\Users\\Zach\\Desktop\\web-dev\\virtual-library-backend\\src\\logs\\google-books.json', volumes);
    // fastify.log.info(`Number of books: ${volumes.items}`);
    reply.send(volumes);
  } catch (err) {
    reply.send(new httpErrors.InternalServerError(err))
  }
};

const transformVolumeQuery = (query: VolumeSearchParams) => {
  const { q, ...rest } = query;
  const params = <{ [key: string]: string }>rest;
  return `${q}${Object.keys(params).reduce((acc: string, key: string) => {
    return `${acc}+${key}:${params[key]}`;
  }, "")}`.replace(/ /g, "");
};
