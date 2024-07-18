import GridProdutos from "../../components/GridProdutos";
import { FaHeart } from "react-icons/fa";
import styles from "./favorites.module.css";
import { useState } from "react";

export default function Favoritos() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("wesell-favorites-comprador")) || []
  );

  function removeFavorites(id) {
    setData((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.idProduto !== id
      );

      localStorage.setItem(
        "wesell-favorites-comprador",
        JSON.stringify(produtosFiltrados)
      );

      return produtosFiltrados;
    });
  }

  return (
    <div className="container" id={styles.contentFavorites}>
      <h4 className="d-flex align-items-center gap-3">
        <FaHeart />
        Meus Favoritos
      </h4>
      <GridProdutos
        qtdVisivel={10}
        titleVisivel={true}
        produtos={data}
        btnVisivel={true}
        removeFavorites={removeFavorites}
      />
    </div>
  );
}
