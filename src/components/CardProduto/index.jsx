/* eslint-disable react/prop-types */
import styles from "./cardproduto.module.css";
import formatCurrencyBR from "../../hooks/formatCurrency";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CardProduto({ produto }) {
  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const nomeAtualizado = removerAcentos(produto.descricao)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "");

  function addToCart() {
    toast.success("Adicionado com sucesso.");
  }

  return (
    <div className={`${styles.cardProduto}`}>
      <Link
        to={`/produto/${produto.id}/${nomeAtualizado}`}
        className={styles.areaImg}
      >
        <img
          src={produto.imagem ? produto.imagem : produto.imagens[0]}
          alt={produto.descricao}
        />
      </Link>
      <section className={styles.infoProduto}>
        <Link
          to={`/produto/${produto.id}/${nomeAtualizado}`}
          className={styles.areaDescricao}
        >
          <h6 className={styles.descricao}>{produto.descricao}</h6>
        </Link>
        <div>
          <p className={styles.valor}>{formatCurrencyBR(produto.valor)}</p>
          <p className={styles.infoParcelas}>
            em até 12x de R$ 139,90 sem juros
          </p>
        </div>
        <section className={styles.areaBtn}>
          <button className={styles.btnBuy} type="button" onClick={addToCart}>
             Adicionar ao carrinho
          </button>
        </section>
      </section>
    </div>
  );
}
