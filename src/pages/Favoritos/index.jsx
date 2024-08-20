import GridProdutos from "../../components/GridProdutos";
import { FaHeart } from "react-icons/fa";
import styles from "./favorites.module.css";
import { useState } from "react";
import { LuHeartOff } from "react-icons/lu";

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

      {data && data.length > 0 ? (
        <GridProdutos
          qtdVisivel={10}
          titleVisivel={true}
          produtos={data}
          btnVisivel={true}
          removeFavorites={removeFavorites}
        />
      ) : (
        <section className={`${styles.cardFavoritos} card`}>
          <div className="col-12 text-center px-1">
            <LuHeartOff size={35} className="mb-2"/>
            <h5>Sua lista de favoritos está vazia</h5>
            <p>
              Encontre os produtos que deseja, clique no coração e salve para
              comprar depois.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
