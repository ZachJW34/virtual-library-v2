const IMAGE_MIME_TYPES = [
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp"
];

export const isImage = (mimeType: string) =>
  IMAGE_MIME_TYPES.includes(mimeType);
