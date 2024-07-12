import { useEffect, useState } from "react";
import BannersPrincipais from "../../components/BannersPrincipais";
import CarrosselProdutos from "../../components/CarrosselProdutos";
import styles from "./home.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import CarrosselCategorias from "../../components/CarrosselCategorias";
import BannersSecundarios from "../../components/BannersSecundarios";
import GridProdutos from "../../components/GridProdutos";
import { url_base } from "../../services/apis.js";
import useContexts from "../../hooks/useContext.js";

export default function Home() {
  const [produtosRecentes, setProdutosRecentes] = useState([]);
  const [produtosDestaque, setProdutosDestaques] = useState([]);
  const [historicoProdutos, setHistoricoProdutos] = useState([]);
  const [bannersPrinDesktop, setBannersPrinDesktop] = useState([]);
  const [bannersSecDesktop, setBannersSecDesktop] = useState([]);
  const [bannersPrinMobile, setBannersPrinMobile] = useState([]);
  const [bannersSecMobile, setBannersSecMobile] = useState([]);
  const { categorias } = useContexts();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const statusPage = localStorage.getItem("statusPage");

    if (statusPage != undefined) {
      localStorage.removeItem("statusPage");
    }
  }, []);

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

    async function getProdutosAdicionadosRecentemente() {
      await axios
        .get(url_base + "/produtos/ultimos10")
        .then((response) => {
          setProdutosRecentes(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getProdutosAdicionadosRecentemente();
    async function getDestaques() {
      await axios
        .get(url_base + "/produtos/destaques")
        .then((response) => {
          setProdutosDestaques(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getDestaques();

    async function getHistoricoProdutos() {
      const listaIds = JSON.parse(
        localStorage.getItem("historicoProdutosComprador")
      );

      await axios
        .post(url_base + "/produtos/recentes", {
          ids: listaIds,
        })
        .then((response) => {
          setHistoricoProdutos(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    getHistoricoProdutos();
  }, []);

  return (
    <>
      <section className={styles.areaBannerPrincipal}>
        <BannersPrincipais
          banners={isMobile ? bannersPrinMobile : bannersPrinDesktop}
        />
      </section>
      <section className={styles.areaProdutosDestaque}>
        {produtosDestaque.length == 0 ?
          <div className="container">
            <div className={styles.boxCards}>
              <div
                className={`${styles.box} card`}
                aria-hidden="true"
              >
                <span
                  className={`${styles.cardWave} placeholder`}
                >
                </span>
              </div>
              <div
                className={`${styles.box} card`}
                aria-hidden="true"
              >
                <span
                  className={`${styles.cardWave} placeholder`}
                >
                </span>
              </div>
              <div
                className={`${styles.box} card`}
                aria-hidden="true"
              >
                <span
                  className={`${styles.cardWave} placeholder`}
                >
                </span>
              </div>
              <div
                className={`${styles.box} card`}
                aria-hidden="true"
              >
                <span
                  className={`${styles.cardWave} placeholder`}
                >
                </span>
              </div>
            </div>
          </div>
          :
          <CarrosselProdutos produtos={produtosDestaque} />
        }
      </section>
      <section className={`${styles.areaCategorias} shadow-sm`}>
        {categorias.length == 0 ?
          <div className={`container mt-4 ${styles.containerCategorias}`}>
            <div className={styles.containerLoading}>
              <span class="placeholder col-6"></span>
              <div className={styles.boxCardsCategoria}>
                <div
                  className={`${styles.boxCategoria} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveCategoria} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.boxCategoria} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveCategoria} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.boxCategoria} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveCategoria} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.boxCategoria} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveCategoria} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.boxCategoria} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveCategoria} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.boxCategoria} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveCategoria} placeholder`}
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>
          :
          <CarrosselCategorias dadosApi={categorias} />
        }

      </section>
      <section className={styles.areaBannerSecundario}>
        {bannersSecMobile.length == 0 && bannersSecDesktop.length == 0 ?
          <div className="container mb-4">
            <div className={styles.containerLoading}>
              <span class="placeholder col-6"></span>
              <div className={styles.boxCardsBanner}>
                <div
                  className={`${styles.boxBanner} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWaveBanner} placeholder`}
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>
          :
          <BannersSecundarios
            banners={isMobile ? bannersSecMobile : bannersSecDesktop}
          />
        }
      </section>
      <section className={styles.areaProdutosBuscados}>
        {produtosRecentes.length == 0 ?
          <div className="container pb-4">
            <div className={styles.containerLoading}>
              <span class="placeholder col-6"></span>
              <div className={styles.boxCards}>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>
          :
          <GridProdutos
            qtdVisivel={4}
            titleVisivel={true}
            nomeSecao="ADICIONADOS RECENTEMENTE"
            produtos={produtosRecentes}
          />
        }
      </section>
      <section className={styles.areaProdutosHistorico}>
        {produtosRecentes.length == 0 ?
          <div className={`container pt-4 pb-4`}>
            <div className={styles.containerLoading}>
              <span class="placeholder col-6"></span>
              <div className={styles.boxCards}>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
                <div
                  className={`${styles.box} card`}
                  aria-hidden="true"
                >
                  <span
                    className={`${styles.cardWave} placeholder`}
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>
          :
          <GridProdutos
            titleVisivel={true}
            qtdVisivel={4}
            nomeSecao="VISTO RECENTEMENTE"
            produtos={historicoProdutos}
          />
        }
      </section>
    </>
  );
}
