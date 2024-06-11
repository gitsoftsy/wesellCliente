import { useEffect, useState } from "react";
import Banners from "../../components/Banners";
import CarrosselProdutos from "../../components/CarrosselProdutos";
import styles from "./home.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import CarrosselCategorias from "../../components/CarrosselCategorias";
import BannerDestaque from "../../components/BannerDestaque";
import GridProdutos from "../../components/GridProdutos";
import { MdContentCopy } from "react-icons/md";
import url_base from "../../services/url_base";

export default function Home() {
  const [produtosOfertaDia, setProdutosOfertaDia] = useState([]);
  const [produtosMaisBuscados, setProdutosMaisBuscados] = useState([]);
  const [historicoProdutos, setHistoricoProdutos] = useState([]);
  const [tendencias, setTendencias] = useState([]);

  useEffect(() => {
    async function getProdutosOfertaDia() {
      await axios
        .get(url_base + "/produtosOfertaDia")
        .then((response) => {
          setProdutosOfertaDia(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getProdutosOfertaDia();

    async function getTendencias() {
      await axios
        .get(url_base + "/tendencias")
        .then((response) => {
          setTendencias(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getTendencias();

    async function getProdutosMaisBuscados() {
      await axios
        .get(url_base + "/produtosMaisBuscados")
        .then((response) => {
          setProdutosMaisBuscados(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getProdutosMaisBuscados();

    async function getHistoricoProdutos() {
      await axios
        .get(url_base + "/historicoProdutos")
        .then((response) => {
          setHistoricoProdutos(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getHistoricoProdutos();
  }, []);

  function copiarLink() {
    navigator.clipboard
      .writeText(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5d3TGp9XOusVHFG9gik7Afr-LBDcPX3-UvwIecXXc&s"
      )
      .then(() => {
        toast.success("Link copiado!");
      });
  }

  return (
    <>
      <section className={styles.areaBanner}>
        <Banners />
      </section>
      <section className={styles.areaProdutosOfertaDia}>
        <CarrosselProdutos produtos={produtosOfertaDia} />
      </section>
      <section className={`${styles.areaCategorias} shadow-sm`}>
        <CarrosselCategorias dadosApi={tendencias} />
      </section>
      <section className={styles.areaBannerDestaque}>
        <BannerDestaque />
      </section>
      <section className={styles.areaProdutosBuscados}>
        <GridProdutos
        qtdVisivel={4}
        titleVisivel={true}
          nomeSecao="PRODUTOS MAIS BUSCADOS"
          produtos={produtosMaisBuscados}
        />
      </section>
      <section className={styles.areaProdutosHistorico}>
        <GridProdutos titleVisivel={true} qtdVisivel={4} nomeSecao="SEU HISTÓRICO" produtos={historicoProdutos} />
      </section>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Link gerado com sucesso!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className={`${styles.areaLinkGerado} modal-body`}>
              <p>Seu link está abaixo:</p>
              <input
                type="text"
                name="link"
                id="link"
                className="form-control"
                value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5d3TGp9XOusVHFG9gik7Afr-LBDcPX3-UvwIecXXc&s"
                disabled
              />
              <button
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
                onClick={copiarLink}
              >
                <MdContentCopy size={18} className="me-2" />
                Copiar link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
