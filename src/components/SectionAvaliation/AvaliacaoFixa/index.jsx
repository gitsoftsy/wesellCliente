/* eslint-disable react/prop-types */
import ReactStarRatings from "react-star-ratings";

const AvaliacaoFixa = ({ mediaAvaliacoes, heigth }) => {
  return (
    <ReactStarRatings
      rating={mediaAvaliacoes}
      starRatedColor="#ffc107"
      starEmptyColor="#e0e0e0"
      numberOfStars={5}
      starDimension={heigth}
      starSpacing="1px"
      name="rating"
    />
  );
};

export default AvaliacaoFixa;