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
import { WorkerEvents } from './constants';

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
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
      const eventName = event.data.event;
      if (eventName === WorkerEvents.Progress) {
        setProgress(event.data.progress);
        return;
      } else if (eventName === WorkerEvents.Compress) {
        setIsLoading(false);
        setProgress(0);
        setResultImages([...event.data.files]);
      } else {
        console.error('unexpected event type');
      }
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
    setProgress(0);
  };

  const resetResult = () => {
    resultImages.forEach((resultImage) =>
      URL.revokeObjectURL(resultImage.file)
    );
    setResultImages([]);
    setIsLoading(false);
    setProgress(0);
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
                      disabled={isLoading}
                      max={100}
                      // ugh ugly
                      className={`range range-lg ${
                        isLoading && 'bg-neutral-content'
                      }`}
                    />
                    <div className="flex w-full justify-between px-2 text-xs mb-2">
                      <span>1%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <progress
                      className={`progress progress-success w-full h-8 ${
                        !isLoading && 'invisible'
                      }`}
                      value={progress}
                      max="100"
                    ></progress>
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
                  className="btn mt-2 w-full btn-neutral"
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
