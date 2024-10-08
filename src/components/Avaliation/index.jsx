/* eslint-disable react/prop-types */
import styles from "./avaliation.module.css";
import AvaliacaoFixa from "../SectionAvaliation/AvaliacaoFixa";

const Avaliation = ({ numeroAvaliacoes, nomeUsuario, comentario, dataAvaliacao}) => {
  return (
    <div className={`${styles.boxAvaliation} border-bottom`}>
      <div className={styles.lineAvaliation}>
        <h6 className="mt-0">
          {nomeUsuario}
        </h6>
        <AvaliacaoFixa heigth="1.4em" mediaAvaliacoes={numeroAvaliacoes} />
      </div>
      <p className={!comentario && 'text-secondary'}>{comentario ? comentario : 'Avaliação sem descrição.'}</p>
      <p className="text-secondary">Em {dataAvaliacao}</p>
    </div>
  );
};

export default Avaliation;
