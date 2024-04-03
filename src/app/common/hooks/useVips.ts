import { useEffect, useState } from 'react';
import WASMVips from 'wasm-vips';

export const useVips = () => {
  const [vips, setVips] = useState<typeof WASMVips | null>(null);
  const [cleanup, setCleanup] = useState<() => void>(() => () => {});

  useEffect(() => {
    WASMVips({
      preRun: (module) => {
        module.setAutoDeleteLater(false);
        // module.setAutoDeleteLater(true);
        // module.setDelayFunction((fn: () => void) => setCleanup(fn));
        // TODO: figure out how to make this work
        // module.setAutoDeleteLater(true);
      },
      dynamicLibraries: [],
      // Workers needs to import the unbundled version of `vips.js`
      mainScriptUrlOrBlob: './vips.js',
      // wasm-vips is served from the public directory
      locateFile: (fileName) => fileName,
    }).then((vips) => {
      // vips.concurrency(1);
      setVips(vips);
      vips.emscriptenVersion();
      vips.Cache.max(0);
      vips.config();
      console.log('wasm-vips version:', vips.version());
      console.log('emscripten version:', vips.emscriptenVersion());
      console.log('🚀 ~ useEffect ~ vips.concurrency():', vips.concurrency());
      console.log('🚀 ~ useEffect ~ vips.config():', vips.config());
    });
  }, []);

  return { vips, cleanup };
};
