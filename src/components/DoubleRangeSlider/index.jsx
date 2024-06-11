import { useState } from "react";
import Slider from "rc-slider";
import "./doubleRange.css";

function DoubleRangeSlider() {
  const [values, setValues] = useState([100, 2500]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <>
      <h6 className="mb-3">R${values[0]} - R${values[1]}</h6>
      <Slider
        range
        min={100}
        max={2500}
        value={values}
        allowCross={false}
        onChange={handleChange}
      />
      <button className="btn btn-primary col-12 my-4">APLICAR FILTRO</button>
    </>
  );
}

export default DoubleRangeSlider;
