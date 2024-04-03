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
      className="w-full max-w-md mx-auto h-auto"
      itemOne={
        <Slider.ReactCompareSliderImage src={firstImage} alt="Image one" />
      }
      itemTwo={
        <Slider.ReactCompareSliderImage src={secondImage} alt="Image two" />
      }
    />
  );
};

export default CompareSlider;
