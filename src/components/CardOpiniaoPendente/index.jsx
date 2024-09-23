import styles from "./cardOpiniaoPendente.module.css";
import starImg from "../../assets/icon_star.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardOpiniaoPendente({ quantidade }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.iconStar}>
          <img src={starImg} alt="Imagem de estrelas" />
        </div>
        <p className={styles.itensPendentes}>{quantidade} produtos esperam sua opinião</p>
      </div>

      <Link className={styles.opinar} to="/minha-conta/pedidos/avaliar">Opinar</Link>
    </div>
  );
}

CardOpiniaoPendente.propTypes = {
  quantidade: PropTypes.number,
};
