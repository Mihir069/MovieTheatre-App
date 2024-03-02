import "./style.css";

const SliderArrow = ({ sliderMovie,sliderPosition,setSliderPosition }) => {

  const handlePrevClick = () => {
    if (sliderPosition > 0) {
      setSliderPosition(sliderPosition - 1);
    }
  };

  const handleNextClick = () => {
    if (sliderPosition < sliderMovie.length - 5) {
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <>
      {sliderPosition < sliderMovie.length && (
        <div className="slider-card-arrow p-3 " onClick={handlePrevClick}>
          &lt;
        </div>
      )}
      {
        <div className="slider-card-arrow p-3" onClick={handleNextClick} disabled={sliderPosition >= sliderMovie.length - 5}>
          &gt;
        </div>
      }
    </>
  );
};

export default SliderArrow;
