/* eslint-disable react/prop-types */
import Avaliation from "../Avaliation";
import CardRecommendation from "../CardRecommendation";
import RatingnBar from "../RatingBar";
import AvaliacaoEstrelas from "../Stars";
import styles from "./sectionAvaliation.module.css";

const SectionAvaliation = (props) => {
  const style = {
    color: "#D07119",
    fontSize: "2.5rem",
  };

  return (
    <>
      <div className={styles.infoAvaliation}>
        <div className={styles.textStar}>
          <span>
            <p>{props.numeroAvaliacao}.0</p>
            <AvaliacaoEstrelas
              numeroAvaliacao={props.numeroAvaliacao}
              color={style.color}
              font={style.fontSize}
            />
          </span>
          <p>Total de {props.numeroAvaliacao} avaliações</p>
        </div>
        <div className={styles.rankings}>
          <RatingnBar estrelas="5" porcentagem={props.porcentagem.cinco} />
          <RatingnBar estrelas="4" porcentagem={props.porcentagem.quatro} />
          <RatingnBar estrelas="3" porcentagem={props.porcentagem.tres} />
          <RatingnBar estrelas="2" porcentagem={props.porcentagem.dois} />
          <RatingnBar estrelas="1" porcentagem={props.porcentagem.um} />
        </div>
        {props.avaliacaoCliente ? (
          <div className={styles.avaliationClients}>
            <h1>Avaliações de clientes</h1>
            <div className={styles.boxCards}>
              <CardRecommendation status={true} value={100} />
              <CardRecommendation status={false} value={0} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.commentsAvaliation}>
        {props.avaliacaoCliente ? (
          <>
            <h1>Avaliações de clientes</h1>
            <Avaliation numeroAvaliacao="4" />
          </>
        ) : (
          <h6>Nenhuma avaliação de cliente</h6>
        )}
      </div>
    </>
  );
};

export default SectionAvaliation;
