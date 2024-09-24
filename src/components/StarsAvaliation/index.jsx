import PropTypes from 'prop-types'; 
import styles from './starsAvaliation.module.css';

const StarsAvaliation = ({ color, font, setEstrelas, estrelas, onclick }) => {
  const styleCor = {
    color: color,
    fontSize: font,
  };

  const style = {
    fontSize: font,
  };

  const handleClick = (index) => {
    setEstrelas(index + 1);
    onclick()
  };

  const listaEstrelas = [];
  for (let i = 0; i < 5; i++) {
    listaEstrelas.push(
      <span
        key={i}
        className={`stars ${styles.estrelas}`}
        style={i < estrelas ? styleCor : style}
        onClick={() => handleClick(i)} 
      >
        {i < estrelas ? '\u2605' : '\u2606'}
      </span>
    );
  }

  return (
    <div className={`avaliacao-estrelas ${styles.avalicaoMobile}`}>
      {listaEstrelas}
    </div>
  );
};

StarsAvaliation.propTypes = {
  color: PropTypes.string,
  font: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
  setEstrelas: PropTypes.func.isRequired,
  estrelas: PropTypes.number.isRequired, 
  onclick: PropTypes.func
};

export default StarsAvaliation;
