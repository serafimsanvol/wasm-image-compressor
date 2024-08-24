import React from 'react';
import CompareSlider from './CompareSlider';
import CompressionStats from './CompressionStats';

const Result = ({
  previews,
  resultImages,
  active,
  reset,
  files,
}: {
  previews: string[];
  resultImages: { file: string; size: number }[];
  active: number;
  reset: () => void;
  files: FileList;
}) => {
  return (
    <>
      <CompareSlider
        firstImage={previews[active]}
        secondImage={resultImages[active].file}
      />
      <div className="text-center mt-4">
        <CompressionStats
          before={files[active].size}
          after={resultImages[active].size}
        />
      </div>
      <a
        className="block"
        download={files[active].name}
        href={resultImages[active].file}
      >
        <button type="button" className="btn mt-4 btn-primary w-full">
          Download
        </button>
      </a>
    </>
  );
};

export default Result;
