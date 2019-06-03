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

export const handleGoogleDrive = async (
  request: FastifyRequest<
    IncomingMessage,
    any,
    DefaultParams,
    DefaultHeaders,
    any
  >,
  reply: FastifyReply<any>
) => {
  try {
    rp.get("https://www.googleapis.com/drive/v3/files", {
      qs: {
        name: 'malazan'
      },
      headers: {
        authorization: request.headers.authorization
      }
    }).then(res => reply.send(res))
  } catch (err) {
    reply.send(new httpErrors.InternalServerError(err));
  }
};
