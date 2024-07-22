/* eslint-disable react/prop-types */
import styles from "./avaliation.module.css";
import AvaliacaoEstrelas from "../Stars";

const Avaliation = (props) => {
  const style = {
    color: "#D07119",
    fontSize: "1.1em",
  };

  return (
    <div className={styles.boxAvaliation}>
      <div className={styles.lineAvaliation}>
      <h6 className="my-0">Kerley Pollyany <span className="text-secondary text-end">(31/03/2024)</span></h6>
        <AvaliacaoEstrelas
          numeroAvaliacao={props.numeroAvaliacao}
          color={style.color}
          font={style.fontSize}
        />
      </div>
      <p>
        O console é top demais gráficos realistas, gostei muito. Entrega foi
        rápida e chegou antes do prazo.
      </p>
    </div>
  );
};

export default Avaliation;
