/* eslint-disable react/prop-types */
import styles from "./cardproduto.module.css";
import formatCurrencyBR from "../../hooks/formatCurrency";
import { Link } from "react-router-dom";

export default function CardProduto({ produto }) {

  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const nomeAtualizado = removerAcentos(produto.descricao).toLowerCase().replace(/\s+/g, "-").replace(/\//g, "");

  return (
    <div className={`${styles.cardProduto}`}>
      <Link to={`/produto/${produto.id}/${nomeAtualizado}`} className={styles.areaImg}>
        <img src={produto.imagem ? produto.imagem : produto.imagens[0]} alt={produto.descricao} />
      </Link>
      <section className={styles.infoProduto}>
        <Link to={`/produto/${produto.id}/${nomeAtualizado}`} className={styles.areaDescricao}>
          <h6 className={styles.descricao}>{produto.descricao}</h6>
        </Link>
        <p className={styles.valor}>
          Valor do produto: <strong>{formatCurrencyBR(produto.valor)}</strong>
        </p>
        <section className={styles.areaBtn}>
          <div className={styles.areaComissao}>
            <p className={styles.comissao}>Comissão:</p>
            <p className={styles.valorComissao}>
              {formatCurrencyBR(produto.comissao)}
            </p>
          </div>
          <button
            className={styles.btnBuy}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Gerar Link
          </button>
        </section>
      </section>
    </div>
  );
}
