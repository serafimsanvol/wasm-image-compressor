import { preventDefaultAndStopPropagation } from '../common/helpers';

const DropArea = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label
      htmlFor="fileInput"
      className="flex cursor-pointer w-full mx-auto justify-center items-center min-h-[80vh] max-w-[80vw] bg-primary card shadow-xl"
    >
      <input
        onDragEnter={preventDefaultAndStopPropagation}
        onDragLeave={preventDefaultAndStopPropagation}
        onDrag={preventDefaultAndStopPropagation}
        onDrop={(e) => {
          preventDefaultAndStopPropagation(e);
        }}
        onChange={onChange}
        onDragOver={preventDefaultAndStopPropagation}
        onDragEnd={preventDefaultAndStopPropagation}
        className="hidden"
        id="fileInput"
        type="file"
        // test on playground
        accept="image/png, image/jpeg, image/webp, image/gif"
        // accept="image/*"
        multiple
      />
      <p className="">Drop your file here</p>
    </label>
  );
};

export default DropArea;
