'use client';
import { ChangeEventHandler, useState } from 'react';

import DropArea from '../components/DropArea';
import Preview from '../components/Preview';
import Carousel from '../components/Carousel';
import Config from '../components/Config';
import { useVips } from '../common/hooks/useVips';
import Result from '../components/Result';
import { useForm } from 'react-hook-form';
import { getParamsByExtension } from './helpers';

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [resultImages, setResultImages] = useState<
    { file: string; size: number }[]
  >([]);
  const [active, setActive] = useState(0);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      Q: 75,
    },
  });

  const { vips: Vips, cleanup } = useVips();

  const reset = () => {
    cleanup();
    previews.forEach((preview) => URL.revokeObjectURL(preview));
    resultImages.forEach((resultImage) =>
      URL.revokeObjectURL(resultImage.file)
    );
    setFiles(null);
    setPreviews([]);
    setResultImages([]);
  };

  const resetResult = () => {
    resultImages.forEach((resultImage) =>
      URL.revokeObjectURL(resultImage.file)
    );
    setResultImages([]);
  };

  const compressImages = async (params: any) => {
    if (!files || !Vips) return;
    const buffers: any[] = [];
    try {
      setIsLoading(true);
      const promises = Array.from(files).map(async (file) => {
        const fileBuffer = await file.arrayBuffer();
        const currentExtension = file.type.split('/')[1];
        const desiredExtension = currentExtension;
        const buffer = await Vips.Image.newFromBuffer(fileBuffer);
        buffers.push(buffer);
        params.Q = +params.Q;
        const defaultParams = getParamsByExtension(desiredExtension);
        const blob = new Blob(
          [
            buffer.writeToBuffer(`.${desiredExtension}`, {
              ...params,
              ...defaultParams,
              keep: 'none',
            }),
          ],
          {
            type: `image/${desiredExtension}`,
          }
        );
        const size = await blob.arrayBuffer();

        return { file: URL.createObjectURL(blob), size: size.byteLength };
      });

      const result = await Promise.all(promises);
      setResultImages(result);
    } catch (e) {
      console.error('execution error:', e);
    } finally {
      console.log('post executionStats:', {
        allocations: Vips.Stats.allocations(),
        files: Vips.Stats.files(),
        mem: Vips.Stats.mem(),
        memHighwater: Vips.Stats.memHighwater(),
      });
      buffers.forEach((buffer) => buffer.delete());
      setIsLoading(false);
      cleanup();
    }
  };

  const onDropAreaChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.length) return;
    const files = e.target.files;
    setFiles(files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  return (
    <main className="px-4 flex min-h-[80vh] flex-col my-10 mb-0">
      {!files?.length ? (
        <DropArea onChange={onDropAreaChange} />
      ) : (
        <>
          <div>
            <div className="mb-4">
              <p className="text-center mb-2">Before / After</p>
              <div className="mx-auto">
                {resultImages.length ? (
                  <Result
                    previews={previews}
                    resultImages={resultImages}
                    files={files}
                    reset={reset}
                    active={active}
                  />
                ) : (
                  <form onSubmit={handleSubmit(compressImages)}>
                    <Preview image={previews[active]} />
                    <p className="text-center mb-2">Quality</p>
                    <input
                      type="range"
                      {...register('Q')}
                      min={1}
                      max={100}
                      className="range range-lg"
                    />
                    <div className="w-full mb-2 flex justify-between text-xs px-2">
                      <span>Lowest</span>
                      <span>Highest</span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        disabled={isLoading}
                        type="submit"
                        onClick={handleSubmit(compressImages)}
                        className="btn w-full btn-primary"
                      >
                        {isLoading ? (
                          <span className="loading loading-ring loading-lg"></span>
                        ) : (
                          'Compress'
                        )}
                      </button>
                    </div>
                  </form>
                )}
                <button
                  onClick={resetResult}
                  className="btn mt-2 w-full mb-4 btn-neutral"
                >
                  Reset result
                </button>
                <button
                  onClick={reset}
                  className="btn mt-2 w-full mb-4 btn-warning"
                >
                  Reset
                </button>
              </div>
            </div>
            <Carousel setActive={setActive} images={previews} />
          </div>
        </>
      )}
    </main>
  );
}
