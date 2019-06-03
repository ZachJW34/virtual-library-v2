import Fastify from 'fastify';
import {
  handleAddVolumeToBookshelf,
  handleDeleteVolumeFromBookshelf,
  handleGetBookshelves,
  handleGetBookshelvesMock
  } from './endpoints/google-bookshelves';
import { handleGoogleDrive } from './endpoints/google-drive';
import { handleVolumeSearch } from './endpoints/google-volumes';

const fastify = Fastify({ logger: true });

const DEBUG = true;

fastify.get("/api/volumes", handleVolumeSearch);
fastify.get("/api/bookshelves", DEBUG ? handleGetBookshelvesMock : handleGetBookshelves);
fastify.post("/api/bookshelves/add-volume", handleAddVolumeToBookshelf);
fastify.get("/api/bookshelves/delete-volume", handleDeleteVolumeFromBookshelf);
fastify.get("/api/drive", handleGoogleDrive);

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(
      `fastify listening on ${(fastify.server.address() as string).toString()}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
