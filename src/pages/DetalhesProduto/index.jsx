import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./produto.module.css";
import FavoriteIcon from "../../components/Heart";
import AvaliacaoEstrelas from "../../components/Stars";
import GridProdutos from "../../components/GridProdutos";
import SectionAvaliation from "../../components/SectionAvaliation";
import { toast } from "react-toastify";
import { url_base, url_img } from "../../services/apis";
import useContexts from "../../hooks/useContext";
import formatCurrencyBR from "../../hooks/formatCurrency";
import formatPriceBR from "../../hooks/formatPrice";

export default function DetalhesProduto() {
  const [produto, setProduto] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [produtosSimilares, setProdutosSimilares] = useState([]);
  const [isFavoritado, setIsFavoritado] = useState(false);
  const [listImages, setListImages] = useState([]);
  const [maximoParcela, setMaximoParcela] = useState(0);

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
  }, []);

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
      .then((response) => {
        setProduto(response.data);
        getProdutosSimilares(response.data);
        setMaximoParcela(response.data.lojista.maximoParcelas);
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

    let listIds = JSON.parse(
      localStorage.getItem("historicoProdutosComprador")
    );

    if (!listIds) {
      listIds = [id];
    } else {
      listIds.unshift(id);
    }
    localStorage.setItem("historicoProdutosComprador", JSON.stringify(listIds));

    window.scrollTo(0, 0);
    getProduto();
  }, [id]);

  // let porcentagens = {
  //   cinco: 85,
  //   quatro: 5,
  //   tres: 6,
  //   dois: 4,
  //   um: 0,
  // };

  return (
    <>
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
                    <span className={styles.textStar}>
                      {produto.avaliacao ? produto.avaliacao : "0.0"}
                    </span>
                    <AvaliacaoEstrelas
                      numeroAvaliacao={
                        produto.avaliacao ? produto.avaliacao : 0
                      }
                      color="#5089D9"
                    />
                    <span className={styles.textStar}>
                      {produto.avaliacao
                        ? `(${produto.avaliacao})`
                        : "Sem avaliações"}
                    </span>
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
                  {maximoParcela > 0 ? (
                    <div>
                      <span>em </span>
                      <span className={styles.interestFree}>
                        {`${maximoParcela}x de ${formatPriceBR(
                          produto.precoVenda / maximoParcela
                        )} sem juros`}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>em </span>
                      <span className={styles.interestFree}>
                        {`10x de 36,90 sem juros`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.frete}>
                <div className={styles.freeShipping_deadline_calculate}>
                  <h5 className={styles.freeShipping}>Calcule o frete</h5>
                  <span className={styles.deadline}>
                    Saiba os prazos de entrega e as formas de envio.
                  </span>
                  <a className={styles.calculate}>
                    Calcular o prazo de entrega
                  </a>
                </div>
                <div className={styles.stock_quantity_unit}>
                  <span className={styles.stock}>Estoque disponivel</span>
                  <a href="#" className={styles.unit}>
                    Consulte o regulamento
                  </a>
                </div>
                <div className={styles.purchase_addCart}>
                  <button className={styles.purchase}>Comprar</button>
                  <button
                    type="button"
                    className={styles.addCart}
                    onClick={() => {
                      addToCart({ ...produto, qtd: 1, imagem: selectedImage }),
                        navigate("/carrinho");
                    }}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.descriptionProduct}>
            <h2 className={styles.descriptionDetailed}>Descrição do Produto</h2>
            {parse(produto.descrProduto ? produto.descrProduto : "")}
          </section>
        </div>
      </section>
      <section className={styles.areaBranca}>
        <section className={`${styles.areaAvaliacoes} container rounded-4`}>
          <SectionAvaliation
            numeroAvaliacao={produto.avaliacao ? produto.avaliacao : 0}
            color="amarelo"
            porcentagem={
              produto.porcentagens
                ? produto.porcentagens
                : {
                    cinco: 0,
                    quatro: 0,
                    tres: 0,
                    dois: 0,
                    um: 0,
                  }
            }
          />
        </section>
        <section className={`${styles.areaProdutosSimilares} rounded-4`}>
          <GridProdutos
            nomeSecao="PRODUTOS SIMILARES"
            titleVisivel={true}
            produtos={produtosSimilares}
            qtdVisivel={4}
          />
        </section>
      </section>
    </>
  );
}
