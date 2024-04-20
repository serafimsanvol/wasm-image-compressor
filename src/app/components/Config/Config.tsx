import React from 'react';
import {
  SaveBufferOptions,
  SaveExtensionFormats,
  SaveExtensionFormatsType,
} from './constants';

const Config = ({ extension }: { extension: SaveExtensionFormatsType }) => {
  const options = {} as SaveBufferOptions;
  const isLossless = options && 'lossless' in options;

  return (
    <div>
      {isLossless && options.lossless && (
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Lossless</span>
            <input
              className="checkbox"
              type="checkbox"
              name="lossless"
              id="lossless"
            />
          </label>
        </div>
      )}
      <p className="text-center mb-2">Quality</p>
      <input
        type="range"
        name="quality"
        min={0}
        max={100}
        className="range range-lg"
      />
      <div className="w-full mb-2 flex justify-between text-xs px-2">
        <span>Lowest</span>
        <span>Highest</span>
      </div>
      <p className="text-center mb-2">Format</p>
      <select
        defaultValue={extension}
        className="select select-bordered w-full mb-4"
      >
        {Object.keys(SaveExtensionFormats).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Config;
