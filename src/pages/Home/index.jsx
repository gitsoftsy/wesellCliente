import { useEffect, useState } from "react";
import BannersPrincipais from "../../components/BannersPrincipais";
import CarrosselProdutos from "../../components/CarrosselProdutos";
import styles from "./home.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import CarrosselCategorias from "../../components/CarrosselCategorias";
import BannersSecundarios from "../../components/BannersSecundarios";
import GridProdutos from "../../components/GridProdutos";
import { MdContentCopy } from "react-icons/md";
import { url_base, url_base2 } from "../../services/apis.js";
import useContexts from "../../hooks/useContext.js";

export default function Home() {
  const [produtosOfertaDia, setProdutosOfertaDia] = useState([]);
  const [produtosRecentes, setProdutosRecentes] = useState([]);
  const [historicoProdutos, setHistoricoProdutos] = useState([]);
  const [bannersPrinDesktop, setBannersPrinDesktop] = useState([]);
  const [bannersSecDesktop, setBannersSecDesktop] = useState([]);
  const [bannersPrinMobile, setBannersPrinMobile] = useState([]);
  const [bannersSecMobile, setBannersSecMobile] = useState([]);
  const { categorias } = useContexts();


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function getBanners() {
      await axios
        .get(url_base + "/banners/ativos")
        .then((response) => {
          const bannersCliente = response.data.filter(
            (item) => item.tipoBanner === "C"
          );

          const filterBanners = (localBanner, tipoDispositivo) =>
            bannersCliente.filter(
              (item) =>
                item.localBanner === localBanner &&
                item.tipoDispositivo === tipoDispositivo
            );

          const principaisDesktop = filterBanners("P", "D");
          const secundariosDesktop = filterBanners("S", "D");
          const principaisMobile = filterBanners("P", "M");
          const secundariosMobile = filterBanners("S", "M");

          setBannersPrinDesktop(principaisDesktop);
          setBannersSecDesktop(secundariosDesktop);
          setBannersPrinMobile(principaisMobile);
          setBannersSecMobile(secundariosMobile);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getBanners();

    async function getProdutosOfertaDia() {
      await axios
        .get(url_base2 + "/produtosOfertaDia")
        .then((response) => {
          setProdutosOfertaDia(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getProdutosOfertaDia();

    async function getProdutosAdicionadosRecentemente() {
      await axios
        .get(url_base2 + "/produtosMaisBuscados")
        .then((response) => {
          setProdutosRecentes(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getProdutosAdicionadosRecentemente();

    async function getHistoricoProdutos() {
      await axios
        .get(url_base2 + "/historicoProdutos")
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
      <section className={styles.areaBannerPrincipal}>
        <BannersPrincipais banners={isMobile ? bannersPrinMobile : bannersPrinDesktop} />
      </section>
      <section className={styles.areaProdutosOfertaDia}>
        <CarrosselProdutos produtos={produtosOfertaDia} />
      </section>
      <section className={`${styles.areaCategorias} shadow-sm`}>
        <CarrosselCategorias dadosApi={categorias} />
      </section>
      <section className={styles.areaBannerSecundario}>
        <BannersSecundarios banners={isMobile ? bannersSecMobile : bannersSecDesktop}/>
      </section>
      <section className={styles.areaProdutosBuscados}>
        <GridProdutos
          qtdVisivel={4}
          titleVisivel={true}
          nomeSecao="PRODUTOS MAIS BUSCADOS"
          produtos={produtosRecentes}
        />
      </section>
      <section className={styles.areaProdutosHistorico}>
        <GridProdutos
          titleVisivel={true}
          qtdVisivel={4}
          nomeSecao="SEU HISTÓRICO"
          produtos={historicoProdutos}
        />
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
