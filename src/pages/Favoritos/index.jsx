import GridProdutos from "../../components/GridProdutos";
import { FaHeart } from "react-icons/fa";
import styles from "./favorites.module.css";
import { useEffect, useState } from "react";
import { LuHeartOff } from "react-icons/lu";
import axios from "axios";
import { url_base } from "../../services/apis";

export default function Favoritos() {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listaIds = JSON.parse(
      localStorage.getItem("wesell-favorites-comprador")
    );

    async function getProducts() {
      await axios
        .post(url_base + "/produtos/recentes", {
          ids: listaIds,
        })
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (listaIds) {
      getProducts();
      setIds(listaIds);
      return;
    }

    setLoading(false);
  }, []);

  function removeFavorites(id) {
    setIds((idsAtuais) => {
      const idsFiltrados = idsAtuais.filter((item) => item !== id);

      localStorage.setItem(
        "wesell-favorites-comprador",
        JSON.stringify(idsFiltrados)
      );

      return idsFiltrados;
    });

    setProducts((produtosAntigos) =>
      produtosAntigos.filter(({ idProduto }) => idProduto !== id)
    );
  }

  if (loading) {
    return (
      <div className="container" id={styles.contentFavorites}>
        <h4 className="d-flex align-items-center gap-3">
          <FaHeart />
          Meus Favoritos
        </h4>

        <div className="position-absolute top-50 start-50 translate-middle">
          <div
            className="spinner-grow me-1 spinner-grow-sm spinner-delay-1"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div
            className="spinner-grow me-1 spinner-grow-sm spinner-delay-2"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div
            className="spinner-grow me-1 spinner-grow-sm spinner-delay-3"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div
            className="spinner-grow spinner-grow-sm spinner-delay-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" id={styles.contentFavorites}>
      <h4 className="d-flex align-items-center gap-3">
        <FaHeart />
        Meus Favoritos
      </h4>

      {products && products.length > 0 ? (
        <GridProdutos
          qtdVisivel={10}
          titleVisivel={true}
          produtos={products}
          btnVisivel={true}
          removeFavorites={removeFavorites}
        />
      ) : (
        <section className={`${styles.cardFavoritos} card`}>
          <div className="col-12 text-center px-1">
            <LuHeartOff size={35} className="mb-2" />
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
