/* eslint-disable react/prop-types */
import { useState } from "react";
import CardProduto from "../CardProduto";
import styles from "./gridProdutos.module.css";
import { IoIosArrowDown } from "react-icons/io";

export default function GridProdutos({
  loading,
  nomeSecao,
  produtos,
  qtdVisivel,
  titleVisivel,
  btnVisivel,
  removeFavorites,
}) {
  const [visibleCount, setVisibleCount] = useState(qtdVisivel);

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const hasMore = visibleCount < produtos.length;

  return (
    <div className={`${styles.gridProdutos} container`}>
      {titleVisivel && <h5>{nomeSecao}</h5>}
      <div className={styles.areaProdutos}>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          produtos
            .slice(0, visibleCount)
            .map(
              (produto) =>
                produto.lojista.idTransacoes != null && (
                  <CardProduto
                    produto={produto}
                    key={produto.idProduto}
                    btnVisivel={btnVisivel}
                    removeFavorites={removeFavorites}
                  />
                )
            )
        )}
      </div>
      {hasMore && (
        <h6 onClick={loadMoreItems} className={styles.loadItens}>
          Carregar mais <IoIosArrowDown size={18} />
        </h6>
      )}
    </div>
  );
}
