import { preventDefaultAndStopPropagation } from '../common/helpers';

const DropArea = ({
  onChange,
  onDrop,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onDrop: React.DragEventHandler<HTMLInputElement>;
}) => {
  return (
    <div
      data-animate
      onDrop={onDrop}
      onChange={onChange}
      onDragEnter={preventDefaultAndStopPropagation}
      onDragLeave={preventDefaultAndStopPropagation}
      onDrag={preventDefaultAndStopPropagation}
      onDragOver={preventDefaultAndStopPropagation}
      onDragEnd={preventDefaultAndStopPropagation}
      className="flex cursor-pointer w-full mx-auto justify-center items-center min-h-[80vh] max-w-[80vw] bg-primary card shadow-xl"
    >
      <label htmlFor="fileInput" className="w-full grow">
        <p className="text-white absolute left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2">
          Drop your files here
        </p>
        <input
          className="text-white file-input bg-transparent w-full invisible"
          id="fileInput"
          onDrop={onDrop}
          onChange={onChange}
          type="file"
          // test on playground
          accept="image/png, image/jpeg, image/webp, image/gif"
          multiple
        />
      </label>
    </div>
  );
};

export default DropArea;
