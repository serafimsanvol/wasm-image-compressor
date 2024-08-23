'use client';
import {
  ChangeEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  DragEventHandler,
} from 'react';

import DropArea from '../components/DropArea';
import Preview from '../components/Preview';
import Carousel from '../components/Carousel';
import Result from '../components/Result';
import { useForm } from 'react-hook-form';

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

  const workerRef: MutableRefObject<null | Worker> = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker('/vips.custom.worker.js', {
      type: 'module',
    });

    workerRef.current.onmessage = (event) => {
      setIsLoading(false);
      setResultImages([...event.data]);
    };

    return () => {
      workerRef?.current?.terminate();
    };
  }, []);

  const cleanup = () => null;

  const reset = () => {
    cleanup();
    previews.forEach((preview) => URL.revokeObjectURL(preview));
    resultImages.forEach((resultImage) =>
      URL.revokeObjectURL(resultImage.file)
    );
    setFiles(null);
    setPreviews([]);
    setResultImages([]);
    setIsLoading(false);
  };

  const resetResult = () => {
    resultImages.forEach((resultImage) =>
      URL.revokeObjectURL(resultImage.file)
    );
    setResultImages([]);
    setIsLoading(false);
  };

  const compressImages = async (params: any) => {
    if (!files) return;

    setIsLoading(true);

    if (!workerRef.current) return;
    workerRef.current?.postMessage({ files, params });
  };

  const onDropAreaChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.length) return;
    const files = e.target.files;
    setFiles(files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  const onDrop: DragEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer.files?.length) return;
    const files = e.dataTransfer.files;
    setFiles(files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  return (
    <main className="px-4 flex min-h-[80vh] flex-col my-10 mb-0">
      {!files?.length ? (
        <DropArea onDrop={onDrop} onChange={onDropAreaChange} />
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
                    <p className="text-center mb-2 text-sm">
                      Please note that if you&apos;re going above recommended
                      parameter output image can be bigger than input
                    </p>
                    <input
                      type="range"
                      {...register('Q')}
                      min={1}
                      max={100}
                      className="range range-lg"
                    />
                    <div className="flex w-full justify-between px-2 text-xs mb-2">
                      <span>1%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
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
