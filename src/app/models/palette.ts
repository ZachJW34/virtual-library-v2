export interface Filter {
  (red: number, green: number, blue: number, alpha: number): boolean;
}
export declare type Vec3 = [number, number, number];
export interface Palette {
  Vibrant: Swatch | null;
  Muted: Swatch | null;
  DarkVibrant: Swatch | null;
  DarkMuted: Swatch | null;
  LightVibrant: Swatch | null;
  LightMuted: Swatch | null;
  [name: string]: Swatch | null;
}

export interface Swatch {
  population: number;
  rgb: Vec3;
}
