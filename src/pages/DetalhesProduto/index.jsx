import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import url_base from "../../services/url_base";
import styles from "./produto.module.css";
import FavoriteIcon from "../../components/Heart";
import AvaliacaoEstrelas from "../../components/Stars";
import GridProdutos from "../../components/GridProdutos";
import SectionAvaliation from "../../components/SectionAvaliation";
import { toast } from "react-toastify";

export default function DetalhesProduto() {
  const [produto, setProduto] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [produtosMaisBuscados, setProdutosMaisBuscados] = useState([]);

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const { id } = useParams();

  async function getProduto() {
    await axios
      .get(url_base + `/produtos/${id}`)
      .then((response) => {
        setProduto(response.data);
        if (response.data.imagens.length > 0) {
          setSelectedImage(response.data.imagens[0]);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getProduto();
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

    
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduto();
  }, [id]);

  let porcentagens = {
    cinco: 85,
    quatro: 5,
    tres: 6,
    dois: 4,
    um: 0,
  };

  return (
    <>
      <section className={styles.areaCinza}>
        <div className="container pt-5">
          <section className={`${styles.areaProduto} rounded-4`}>
            <div className={`${styles.areaImagens}`}>
              <div className={styles.thumbnails_mainImage}>
                <div className={styles.thumbnails}>
                  {produto.imagens?.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={`Thumbnail`}
                      className={styles.thumbnail}
                      onMouseEnter={() => handleThumbnailClick(image)}
                    />
                  ))}
                </div>
                <div className={styles.mainImage}>
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
                    <FavoriteIcon />
                  </div>
                  <h6 className={styles.description}>{produto.descricao}</h6>
                  <div className={styles.stars}>
                    <span className={styles.textStar}>{produto.avaliacao}</span>
                    <AvaliacaoEstrelas
                      numeroAvaliacao={produto.avaliacao}
                      color="#5089D9"
                    />
                    <span className={styles.textStar}>
                      ({produto.avaliacaoTotal})
                    </span>
                  </div>
                </div>
                <div className={styles.soldPlus_console}>
                  <span className={styles.soldPlus}>Mais Vendidos</span>
                  <a className={styles.console}>
                    {produto.hierarquiaCategoria}º em {produto.categoria}
                  </a>
                </div>
                <div>
                  <div className={styles.values}>
                    <span className={styles.values_liquid}>
                      <s>R${produto.valor}</s>
                    </span>
                    <h5 className={styles.values_deduction}>
                      R${produto.valorComDesconto}
                      <sub>,00</sub>
                    </h5>
                  </div>
                  <div className={styles}>
                    <span>em </span>
                    <span className={styles.interestFree}>
                      10x R${produto.valorParcela} sem juros
                    </span>
                  </div>
                  <a className={styles.methodPayments}>
                    Ver os meios de pagamento
                  </a>
                </div>
              </div>
              <div className={styles.frete}>
                <div className={styles.freeShipping_deadline_calculate}>
                  <h5 className={styles.freeShipping}>Frete Grátis</h5>
                  <span className={styles.deadline}>
                    Saiba os prazos de entrega e as formas de envio.
                  </span>
                  <a className={styles.calculate}>
                    Calcular o prazo de entrega
                  </a>
                </div>
                <div className={styles.stock_quantity_unit}>
                  <span className={styles.stock}>Estoque disponivel</span>
                  <span className={styles.quantity}>
                    Quantidade: {produto.qtdEstoque} unidade (+5 disponivel)
                  </span>
                  <span className={styles.unit}>
                    Você pode comprar apenas 1 Unidade
                  </span>
                </div>
                <div className={styles.purchase_addCart}>
                  <button className={styles.purchase}>Comprar</button>
                  <button className={styles.addCart}>
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.descriptionProduct}>
            <h2 className={styles.descriptionDetailed}>Descrição do Produto</h2>
            <p>{produto.descricaoDetalhada}</p>
          </section>
        </div>
      </section>
      <section className={styles.areaBranca}>
        <section className={`${styles.areaAvaliacoes} container rounded-4`}>
          <SectionAvaliation
            numeroAvaliacao="4"
            color="amarelo"
            porcentagem={porcentagens}
          />
        </section>
        <section className={`${styles.areaProdutosSimilares} rounded-4`}>
          <GridProdutos
            nomeSecao="PRODUTOS SIMILARES"
            titleVisivel={true}
            produtos={produtosMaisBuscados}
            qtdVisivel={4}
          />
        </section>
      </section>
    </>
  );
}
