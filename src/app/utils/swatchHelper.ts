import { Palette } from "../models/palette";

export const getVibrant = (
  palette: Palette,
  fallback: string,
  opacity?: number
) => {
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
  return swatch
    ? rgbToHex(
        swatch.rgb[0],
        swatch.rgb[1],
        swatch.rgb[2],
        opacity ? opacity : 1
      )
    : fallback;
};

// function componentToHex(c: number) {
//   var hex = c.toString(16);
//   return hex.length == 1 ? "0" + hex : hex;
// }

const rgbToHex = (r: number, g: number, b: number, o: number) =>
  `rgba(${r},${g},${b},${o})`;
