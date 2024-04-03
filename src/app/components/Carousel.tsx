import Image from 'next/image';
import React from 'react';

const Carousel = ({
  images,
  setActive,
}: {
  images: string[];
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (images.length === 0) return null;

  return (
    <div className="carousel max-h-[400px] carousel-center max-w-full w-full p-4 space-x-4 bg-neutral rounded-box">
      {images.map((preview, index) => (
        <div
          onClick={() => setActive(index)}
          key={preview + index}
          className="carousel-item max-w-full"
        >
          <div className="w-full relative my-auto">
            <Image
              key={preview}
              className="w-full h-full top-0 left-0 object-cover rounded-2xl max-h-[300px]"
              width={400}
              height={400}
              src={preview}
              alt="preview"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
