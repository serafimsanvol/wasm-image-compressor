import WASMVips from './vips-es6.js';

let Vips = null;

WASMVips({
  preRun: (module) => {
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
  console.log('wasm-vips version:', vips.version());
  console.log('emscripten version:', vips.emscriptenVersion());
  console.log('concurrency:', vips.concurrency());
});

self.onmessage = async (event) => {
  const { file, params, defaultParams } = event.data;
  const fileBuffer = await file.arrayBuffer();
  const currentExtension = file.type.split('/')[1];
  const desiredExtension = currentExtension;

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

  const size = await blob.arrayBuffer();

  console.log('post executionStats:', {
    allocations: Vips.Stats.allocations(),
    files: Vips.Stats.files(),
    mem: Vips.Stats.mem(),
    memHighwater: Vips.Stats.memHighwater(),
  });

  postMessage({ file: URL.createObjectURL(blob), size: size.byteLength });
};
