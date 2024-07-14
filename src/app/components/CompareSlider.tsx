'use client';
import * as Slider from 'react-compare-slider';

const CompareSlider = ({
  firstImage,
  secondImage,
}: {
  firstImage: string;
  secondImage: string;
}) => {
  return (
    <Slider.ReactCompareSlider
      className="w-full max-h-[70vh] mx-auto"
      itemOne={
        <Slider.ReactCompareSliderImage
          className="max-h-[70vh]"
          src={firstImage}
          alt="Image one"
        />
      }
      itemTwo={
        <Slider.ReactCompareSliderImage src={secondImage} alt="Image two" />
      }
    />
  );
};

export default CompareSlider;
