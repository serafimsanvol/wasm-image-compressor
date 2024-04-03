import Vips from 'wasm-vips';

export type webpsaveBuffer = Parameters<Vips.ImageAutoGen['webpsaveBuffer']>[0];
export type pngsaveBuffer = Parameters<Vips.ImageAutoGen['pngsaveBuffer']>[0];
export type jpegsaveBuffer = Parameters<Vips.ImageAutoGen['jpegsaveBuffer']>[0];

export type SaveBufferOptions = webpsaveBuffer | pngsaveBuffer | jpegsaveBuffer;

export const SaveExtensionFormats = {
  webp: 'webp',
  png: 'png',
  jpg: 'jpg',
  jpeg: 'jpeg',
};

export type SaveExtensionFormatsType = keyof typeof SaveExtensionFormats;
