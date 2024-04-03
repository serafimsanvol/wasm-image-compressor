'use client';
import { ChangeEventHandler, useState } from 'react';

import DropArea from './components/DropArea';
import Preview from './components/Preview';
import Carousel from './components/Carousel';
import CompareSlider from './components/CompareSlider';
import Config from './components/Config';
import CompressionStats from './components/CompressionStats';
import { useVips } from './common/hooks/useVips';
import Result from './components/Result';

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [resultImages, setResultImages] = useState<
    { file: string; size: number }[]
  >([]);
  const [active, setActive] = useState(0);
  const [extension, setExtension] = useState(null);

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

  const compressImages = async () => {
    if (!files || !Vips) return;
    const buffers: any[] = [];
    try {
      setIsLoading(true);
      const promises = Array.from(files).map(async (file) => {
        const fileBuffer = await file.arrayBuffer();
        console.log(file.type);
        const currentExtension = file.type.split('/')[1];
        const desiredExtension = extension || currentExtension;
        const buffer = await Vips.Image.newFromBuffer(fileBuffer);
        buffers.push(buffer);
        const blob = new Blob(
          [
            buffer.writeToBuffer(`.${desiredExtension}`, {
              Q: 1,
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
    <main className="px-4 flex min-h-screen flex-col my-10">
      {!files?.length ? (
        <DropArea onChange={onDropAreaChange} />
      ) : (
        <>
          <div>
            <div className="mb-4">
              <p className="text-center mb-2">Before / After</p>
              <div className="max-w-[80vh] mx-auto">
                {resultImages.length ? (
                  <Result
                    previews={previews}
                    resultImages={resultImages}
                    files={files}
                    reset={reset}
                    active={active}
                  />
                ) : (
                  <>
                    <Preview image={previews[active]} />
                    <Config options={{}} extension="jpg" />
                    <div className="flex justify-center">
                      <button
                        disabled={isLoading}
                        type="submit"
                        onClick={compressImages}
                        className="btn w-full btn-primary"
                      >
                        {isLoading ? (
                          <span className="loading loading-ring loading-lg"></span>
                        ) : (
                          'Compress'
                        )}
                      </button>
                    </div>
                  </>
                )}
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
