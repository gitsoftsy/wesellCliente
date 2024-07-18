/* eslint-disable react/prop-types */
import { useState } from "react";
import Slider from "rc-slider";
import "./doubleRange.css";

function DoubleRangeSlider({ onApplyFilter }) {
  const [values, setValues] = useState([50, 5000]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  const handleApplyFilter = () => {
    onApplyFilter(values[0], values[1]);
  };

  return (
    <>
      <h6 className="mb-3">R${values[0]} - R${values[1]}</h6>
      <Slider
        range
        min={50}
        max={5000}
        value={values}
        allowCross={false}
        onChange={handleChange}
      />
      <button className="btn btn-primary col-12 my-4" onClick={handleApplyFilter}>APLICAR FILTRO</button>
    </>
  );
}

export default DoubleRangeSlider;
