import Image from 'next/image';
import React from 'react';

const Preview = ({ image }: { image: string }) => {
  return (
    <div className="w-full flex justify-center mb-2 relative my-auto">
      <Image
        className="h-full top-0 left-0 object-cover rounded-2xl max-h-[500px]"
        width={400}
        height={400}
        src={image}
        alt="preview"
      />
    </div>
  );
};

export default Preview;
