import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./produto.module.css";
import FavoriteIcon from "../../components/Heart";
import GridProdutos from "../../components/GridProdutos";
import SectionAvaliation from "../../components/SectionAvaliation";
import { toast } from "react-toastify";
import { url_base, url_img } from "../../services/apis";
import useContexts from "../../hooks/useContext";
import formatCurrencyBR from "../../hooks/formatCurrency";
import formatPriceBR from "../../hooks/formatPrice";
import AvaliacaoFixa from "../../components/SectionAvaliation/AvaliacaoFixa";
import ModalFrete from "../../components/ModalFrete";
import { LoadingOverlay } from "@achmadk/react-loading-overlay";

export default function DetalhesProduto() {
  const [produto, setProduto] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [produtosSimilares, setProdutosSimilares] = useState([]);
  const [isFavoritado, setIsFavoritado] = useState(false);
  const [listImages, setListImages] = useState([]);
  const [maximoParcela, setMaximoParcela] = useState(false);
  const [calculaFrete, setCalculaFrete] = useState(true);
  const [isActive, setActive] = useState(true);
  const [avaliationsProduct, setAvaliationsProduct] = useState([]);

  const getLink = async (link) => {
    const url = decodeURIComponent(link);

    let jsonDados = {
      link: url,
    };

    if (path.pathname.includes("static")) {
      await axios
        .post(url_base + `/indicacoesVenda/link`, jsonDados, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(window.location.href);

          if (result.data.length > 0) {
            if (result.data[0].dataCancelamento == null) {
              setActive(false);
            } else {
              setActive(false);
              console.log("Link expirado, cancelado");
              toast.info("Link está inválido, pode ter expirado.");
              navigate("/home");
            }
          } else {
            setActive(false);
            console.log("Link expirado, não existe");
            toast.info("Link está inválido, pode ter expirado.");
            navigate("/home");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Link expirado, error");

          setActive(false);
          toast.info("Link está inválido, pode ter expirado.");
          navigate("/home");
        });
    }
  };

  useEffect(() => {
    getLink(window.location.href);
  });

  // const avaliations = [
  //   { id: 1, star: 4, nome: "Wagner Moura" },
  //   { id: 2, star: 3, nome: "Wagner Moura" },
  //   { id: 3, star: 5, nome: "Wagner Moura" },
  //   { id: 4, star: 5, nome: "Wagner Moura" },
  //   { id: 5, star: 5, nome: "Wagner Moura" },
  //   { id: 6, star: 3, nome: "Wagner Moura" },
  //   { id: 7, star: 2, nome: "Wagner Moura" },
  //   { id: 8, star: 5, nome: "Wagner Moura" },
  //   { id: 9, star: 5, nome: "Wagner Moura" },
  //   { id: 10, star: 5, nome: "Wagner Moura" },
  //   { id: 11, star: 5, nome: "Wagner Moura" },
  //   { id: 12, star: 4, nome: "Wagner Moura" },
  //   { id: 13, star: 4, nome: "Wagner Moura" },
  //   { id: 14, star: 4, nome: "Wagner Moura" },
  //   { id: 15, star: 4, nome: "Wagner Moura" },
  //   { id: 16, star: 5, nome: "Wagner Moura" },
  //   { id: 17, star: 3, nome: "Wagner Moura" },
  //   { id: 18, star: 3, nome: "Wagner Moura" },
  //   { id: 19, star: 4, nome: "Wagner Moura" },
  //   { id: 20, star: 4, nome: "Wagner Moura" },
  //   { id: 21, star: 5, nome: "Wagner Moura" },
  //   { id: 22, star: 5, nome: "Wagner Moura" },
  //   { id: 23, star: 5, nome: "Wagner Moura" },
  //   { id: 24, star: 5, nome: "Wagner Moura" },
  //   { id: 25, star: 5, nome: "Wagner Moura" },
  // ];

  const path = useLocation();

  const navigate = useNavigate();

  const { addToCart } = useContexts();

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const { id } = useParams();

  useEffect(() => {
    if (path.pathname.includes("static")) {
      const jsonPage = {
        idProduto: 204,
        idVendedor: 2,
        nomeVendedor: "Luiz",
        url: path.pathname,
      };

      localStorage.setItem("statusPage", JSON.stringify(jsonPage));
    }
  }, [path.pathname]);

  async function getProdutosSimilares(produto) {
    if (produto.categorias) {
      await axios
        .get(
          url_base +
            `/produtos/categoria/${produto.categorias.idCategoria}/subCategoria/${produto.subcategorias.id}`
        )
        .then((response) => {
          setProdutosSimilares(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  }

  async function getProduto() {
    await axios
      .get(url_base + `/produtos/${id}`)
      .then( async (response) => {
        const data = response.data;
        console.log(data);
        setProduto(data);
        getProdutosSimilares(data);

         await axios
          .get(url_base + `/produtos/avaliacoes?idProduto=${id}`)
          .then((response) => {
            console.log(response.data)
            setAvaliationsProduct(response.data != 'Nenhum resultado encontrado para os parâmetros informados.' && response.data);
          })
          .catch((error) => {
            console.log(error);
            //toast.error(error.message);
          });

        data.freteGratis === "S"
          ? setCalculaFrete(false)
          : setCalculaFrete(true);

        if (data.lojista.possuiParcelamento === "S") {
          setMaximoParcela(data.lojista.maximoParcelas);
        } else {
          setMaximoParcela(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    await axios
      .get(url_base + `/imagens/produto/${id}`)
      .then((response) => {
        setListImages(response.data);
        let caminho = response.data[0].imagem.split("ROOT");
        setSelectedImage(`${url_img}${caminho[1]}`);
        setActive(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const favoritos =
      JSON.parse(localStorage.getItem("wesell-favorites-comprador")) || [];
    const favoritado = favoritos.some((item) => item.idProduto == id);
    setIsFavoritado(favoritado);

    let listIds =
      JSON.parse(localStorage.getItem("historicoProdutosComprador")) || [];

    const hasId = listIds.some((idProduct) => idProduct === id);

    if (!hasId) {
      listIds.push(id);
      localStorage.setItem(
        "historicoProdutosComprador",
        JSON.stringify(listIds)
      );
    }

    window.scrollTo(0, 0);
    getProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner
        text="Carregando seu conteúdo..."
      >
        <section className={styles.areaCinza}>
          <div className="container pt-5">
            <section className={`${styles.areaProduto} rounded-4`}>
              <div className={`${styles.areaImagens}`}>
                <div className={styles.thumbnails_mainImage}>
                  <div className={styles.thumbnails}>
                    {listImages?.map((image) => (
                      <img
                        key={image.idImagemProduto}
                        src={`${url_img}${image.imagem.split("ROOT")[1]}`}
                        alt={`Thumbnail`}
                        className={styles.thumbnail}
                        onMouseEnter={() =>
                          handleThumbnailClick(
                            `${url_img}${image.imagem.split("ROOT")[1]}`
                          )
                        }
                      />
                    ))}
                  </div>
                  <div className={styles.boxMainImage}>
                    <img
                      src={selectedImage}
                      alt="Imagem principal"
                      className={styles.mainImage}
                    />
                  </div>
                </div>

                <div className={styles.desc}>
                  <div className={styles.description_stars}>
                    <div className={styles.favoriteIcon}>
                      <FavoriteIcon
                        favoritado={isFavoritado}
                        produto={produto}
                        handleFavorite={setIsFavoritado}
                      />
                    </div>
                    <h6>{produto.nomeProduto}</h6>
                    <div className={styles.stars}>
                      <span className={styles.textStar}>4.3</span>
                      <AvaliacaoFixa mediaAvaliacoes={4.3} heigth="18px" />
                      <span className={styles.textStar}>(25)</span>
                    </div>
                  </div>
                  <div className={styles.soldPlus_console}>
                    <span className={styles.soldPlus}>
                      {produto.categorias ? produto.categorias.categoria : ""}
                    </span>
                  </div>
                  <div>
                    <div className={styles.values}>
                      <hr />
                      <h4>Valor produto:</h4>
                      <span className={styles.values_liquid}>
                        <s>{formatCurrencyBR(produto.precoVenda)}</s>
                      </span>
                      <h5 className={styles.values_deduction}>
                        {formatCurrencyBR(produto.precoPromocional)}
                      </h5>
                    </div>
                    {maximoParcela && (
                      <div>
                        <span>em </span>
                        <span className={styles.interestFree}>
                          {`${maximoParcela}x de ${formatPriceBR(
                            produto.precoPromocional / maximoParcela
                          )} sem juros`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.frete} ${
                    !calculaFrete && "justify-content-center"
                  }`}
                >
                  {calculaFrete ? (
                    <>
                      <div className={styles.freeShipping_deadline_calculate}>
                        <h5 className={styles.freeShipping}>Calcule o frete</h5>
                        <span className={styles.deadline}>
                          Saiba os prazos de entrega e as formas de envio.
                        </span>
                        <span
                          className={styles.calculate}
                          data-bs-toggle="modal"
                          data-bs-target="#modalFrete"
                        >
                          Calcular o prazo de entrega
                        </span>
                      </div>
                      <div className={styles.stock_quantity_unit}>
                        <span className={styles.stock}>Estoque disponível</span>
                        <a href="#" className={styles.unit}>
                          Consulte o regulamento
                        </a>
                      </div>
                      <div className={styles.purchase_addCart}>
                        <button
                          className={styles.purchase}
                          onClick={() => {
                            addToCart({
                              ...produto,
                              qtd: 1,
                              imagem: selectedImage,
                            });
                            navigate("/carrinho");
                          }}
                        >
                          Comprar
                        </button>
                        <button
                          type="button"
                          className={styles.addCart}
                          onClick={() => {
                            addToCart({
                              ...produto,
                              qtd: 1,
                              imagem: selectedImage,
                            });
                          }}
                        >
                          Adicionar ao carrinho
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.purchase_addCart}>
                      <button
                        className={styles.purchase}
                        onClick={() => {
                          addToCart({
                            ...produto,
                            qtd: 1,
                            imagem: selectedImage,
                          });
                          navigate("/carrinho");
                        }}
                      >
                        Comprar
                      </button>
                      <button
                        type="button"
                        className={styles.addCart}
                        onClick={() => {
                          addToCart({
                            ...produto,
                            qtd: 1,
                            imagem: selectedImage,
                          });
                        }}
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section className={styles.descriptionProduct}>
              <h2 className={styles.descriptionDetailed}>
                Descrição do Produto
              </h2>
              {parse(produto.descrProduto ? produto.descrProduto : "")}
            </section>
          </div>
        </section>
        <section className={styles.areaBranca}>
          <section className={`${styles.areaAvaliacoes} container rounded-4`}>
            <SectionAvaliation
              avaliacoes={avaliationsProduct}
              total={avaliationsProduct.length}
            />
          </section>
          <section className={`${styles.areaProdutosSimilares} rounded-4`}>
            {produtosSimilares.length > 0 && (
              <GridProdutos
                nomeSecao="PRODUTOS SIMILARES"
                titleVisivel={true}
                produtos={produtosSimilares}
                qtdVisivel={4}
              />
            )}
          </section>
        </section>
        <ModalFrete produto={produto} />
      </LoadingOverlay>
    </>
  );
}
