import { Palette } from '../models/palette';

export const getVibrant = (palette: Palette, fallback: string) => {
  if (!palette) {
    return fallback;
  }
  const swatch = palette.Vibrant
    ? palette.Vibrant
    : palette.DarkVibrant
    ? palette.DarkVibrant
    : palette.LightVibrant
    ? palette.LightVibrant
    : palette.Muted
    ? palette.Muted
    : palette.LightMuted
    ? palette.LightMuted
    : palette.DarkMuted
    ? palette.DarkMuted
    : undefined;
  return swatch ? rgbToHex(...swatch.rgb) : fallback;
};

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
}
