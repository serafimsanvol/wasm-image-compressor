// TODO figure out how to import it properly
const getParamsByExtension = (extension) => {
  switch (extension) {
    case 'png':
      return {
        palette: true,
      };
    case 'jpeg':
    case 'jpg':
      return {
        optimize_coding: true,
        interlace: true,
        optimize_scans: true,
        trellis_quant: true,
        quant_table: 3,
      };
    case 'gif':
      return {
        // dither: 1,
        // use instead of quality
        // interframe_maxerror: 32.0,
        // interpalette_maxerror: 32.0,
        interframe_maxerror: 8.0,
        reuse: true,
        interlace: true,
      };
    default:
      return {};
  }
};

import WASMVips from './vips-es6.js';

let Vips = null;

WASMVips({
  preRun: (module) => {
    module.ENV.VIPS_INFO = 1;
    module.setAutoDeleteLater(false);
    // TODO: figure out how to make this work
    // module.setAutoDeleteLater(true);
  },
  dynamicLibraries: [],
}).then((vips) => {
  Vips = vips;
  vips.emscriptenVersion();
  vips.Cache.max(10);
  vips.config();
  vips.concurrency(1);
  console.log('wasm-vips version:', vips.version());
  console.log('emscripten version:', vips.emscriptenVersion());
  console.log('concurrency:', vips.concurrency());
});

self.onmessage = async (event) => {
  const { files, params } = event.data;
  const compressedFiles = await Promise.all(
    Array.from(files).map(async (file) => {
      const fileBuffer = await file.arrayBuffer();
      const currentExtension = file.type.split('/')[1];
      const desiredExtension = currentExtension;
      const defaultParams = getParamsByExtension(desiredExtension);

      let imageParams = '';
      if (['gif', 'webp'].includes(desiredExtension)) {
        imageParams = '[n=-1]';
      }
      const buffer = await Vips.Image.newFromBuffer(fileBuffer, imageParams);

      if (desiredExtension === 'gif') {
        delete params.Q;
      } else {
        params.Q = +params.Q;
      }

      const bl0 = performance.now();
      // TODO not quite working as expected, found out why
      buffer.onProgress = (percent) =>
        postMessage({ event: 'progress', progress: percent });
      const writtenBuffer = buffer.writeToBuffer(`.${desiredExtension}`, {
        ...params,
        ...defaultParams,
        keep: 'none',
      });

      buffer.delete();
      const bl1 = performance.now();
      console.log(`Call to writeToBuffer took ${bl1 - bl0} milliseconds.`);
      const blob = new Blob([writtenBuffer], {
        type: `image/${desiredExtension}`,
      });

      console.log('post executionStats:', {
        allocations: Vips.Stats.allocations(),
        files: Vips.Stats.files(),
        mem: Vips.Stats.mem(),
        memHighwater: Vips.Stats.memHighwater(),
      });

      return {
        file: URL.createObjectURL(blob),
        size: blob.size,
      };
    })
  );

  postMessage({
    event: 'compress',
    files: compressedFiles,
  });
};
