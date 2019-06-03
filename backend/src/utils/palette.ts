import Vibrant from 'node-vibrant';
import { Volume } from '../models/google-volumes';

export const addPalette = (volume: Volume): Promise<Volume> =>
  Vibrant.from(volume.volumeInfo.imageLinks.smallThumbnail)
    .getPalette()
    .then(palette => {
      volume.volumeInfo.palette = palette;
      return volume;
    })
    .catch(() => volume);
