import { useEffect, useState } from "react";
import BannersPrincipais from "../../components/BannersPrincipais";
import CarrosselProdutos from "../../components/CarrosselProdutos";
import styles from "./home.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import CarrosselCategorias from "../../components/CarrosselCategorias";
import BannersSecundarios from "../../components/BannersSecundarios";
import GridProdutos from "../../components/GridProdutos";
import { url_base, url_base2 } from "../../services/apis.js";
import useContexts from "../../hooks/useContext.js";

export default function Home() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
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
        .get(url_base2 + "/produtosDestaque")
        .then((response) => {
          setProdutosDestaque(response.data);
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
      const listaIds = JSON.parse(localStorage.getItem('historicoProdutosComprador'))

      await axios
        .post(url_base + "/produtos/recentes", {
          ids: listaIds
        })
        .then((response) => {
          console.log('====================================');
          console.log(listaIds);
          console.log(response);
          console.log('====================================');
          setHistoricoProdutos(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getHistoricoProdutos();
  }, []);

  return (
    <>
      <section className={styles.areaBannerPrincipal}>
        <BannersPrincipais banners={isMobile ? bannersPrinMobile : bannersPrinDesktop} />
      </section>
      <section className={styles.areaProdutosDestaque}>
        <CarrosselProdutos produtos={produtosDestaque} />
      </section>
      <section className={`${styles.areaCategorias} shadow-sm`}>
        <CarrosselCategorias dadosApi={categorias} />
      </section>
      <section className={styles.areaBannerSecundario}>
        <BannersSecundarios banners={isMobile ? bannersSecMobile : bannersSecDesktop} />
      </section>
      <section className={styles.areaProdutosBuscados}>
        <GridProdutos
          qtdVisivel={4}
          titleVisivel={true}
          nomeSecao="ADICIONADOS RECENTEMENTE"
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
    </>
  );
}
