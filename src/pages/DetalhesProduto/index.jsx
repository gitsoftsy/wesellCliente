import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./produto.module.css";
import FavoriteIcon from "../../components/Heart";
import AvaliacaoEstrelas from "../../components/Stars";
import GridProdutos from "../../components/GridProdutos";
import SectionAvaliation from "../../components/SectionAvaliation";
import { toast } from "react-toastify";
import { url_base, url_base2, url_img } from "../../services/apis";
import useContexts from "../../hooks/useContext";
import formatCurrencyBR from "../../hooks/formatCurrency";

export default function DetalhesProduto() {
  const [produto, setProduto] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [produtosMaisBuscados, setProdutosMaisBuscados] = useState([]);
  const [isFavoritado, setIsFavoritado] = useState(false);
  const [listImages, setListImages] = useState([])
  const path = useLocation()

  const { addToCart } = useContexts();

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const { id, vendedor, nomeProduto } = useParams();


  useEffect(() => {

    if (path.pathname.includes('static')) {
      const jsonPage = {
        idProduto: 204,
        idVendedor: 2,
        nomeVendedor: 'Luiz',
        url: path.pathname
      }

      localStorage.setItem('statusPage', JSON.stringify(jsonPage))
    }
  }, [])

  async function getProduto() {
    await axios
      .get(url_base + `/produtos/${id}`)
      .then((response) => {
        setProduto(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    await axios
      .get(url_base + `/imagens/produto/${id}`)
      .then((response) => {
        setListImages(response.data);
        let caminho = response.data[0].imagem.split('ROOT')
        setSelectedImage(`${url_img}${caminho[1]}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    let favoritos =
      JSON.parse(localStorage.getItem("wesell-favorites-comprador")) || [];
    let favoritado = favoritos.some(item => item.id === id);
    setIsFavoritado(favoritado);
    getProduto();
    async function getProdutosMaisBuscados() {
      await axios
        .get(url_base2 + "/produtosMaisBuscados")
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
    const listIds = JSON.parse(localStorage.getItem('historicoProdutosComprador'))

    if (listIds == undefined) {
      const newList = [id]
      localStorage.setItem('historicoProdutosComprador', JSON.stringify(newList))
    } else {
      listIds.unshift(id)
    }

    window.scrollTo(0, 0);
    getProduto();

    const favoritos =
      JSON.parse(localStorage.getItem("wesell-favorites-comprador")) || [];
    const favoritado = favoritos.some(item => item.id === id);
    setIsFavoritado(favoritado);
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
                  {listImages?.map((image) => (
                    <img
                      key={image.idImagemProduto}
                      src={`${url_img}${image.imagem.split('ROOT')[1]}`}
                      alt={`Thumbnail`}
                      className={styles.thumbnail}
                      onMouseEnter={() => handleThumbnailClick(`${url_img}${image.imagem.split('ROOT')[1]}`)}
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
                    <FavoriteIcon favoritado={isFavoritado} produto={produto} handleFavorite={setIsFavoritado} />
                  </div>
                  <h6>{produto.nomeProduto}</h6>
                  <div className={styles.stars}>
                    <span className={styles.textStar}>{produto.avaliacao ? produto.avaliacao : '0.0'}</span>
                    <AvaliacaoEstrelas
                      numeroAvaliacao={produto.avaliacao ? produto.avaliacao : 0}
                      color="#5089D9"
                    />
                    <span className={styles.textStar}>
                      {produto.avaliacao ? `(${produto.avaliacao})` : 'Sem avaliações'}
                    </span>
                  </div>
                </div>
                <div className={styles.soldPlus_console}>
                  <span className={styles.soldPlus}>{produto.categorias ? produto.categorias.categoria : ''}</span>
                </div>
                <div>
                  <div className={styles.values}>
                    <hr />
                    <h4>Valor produto:</h4>
                    <span className={styles.values_liquid}>
                      <s>{`${formatCurrencyBR(produto.preco + (produto.preco / 10))}`}</s>
                    </span>
                    <h5 className={styles.values_deduction}>
                      {formatCurrencyBR(produto.preco)}
                    </h5>
                  </div>
                  {produto.quantidadeParcela ?
                    <div className={styles}>

                      <span>em </span>
                      <span className={styles.interestFree}>
                        {`${produto.quantidadeParcela}x de ${produto.preco / produto.quantidadeParcela} sem juros`}
                      </span>
                    </div> :
                    <div className={styles}>
                      <span>em </span>
                      <span className={styles.interestFree}>
                        {`10x de 36,90 sem juros`}
                      </span>
                    </div>
                  }
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
                  <a href="#" className={styles.unit}>Consulte o regulamento</a>
                </div>
                <div className={styles.purchase_addCart}>
                  <button className={styles.purchase}>Comprar</button>
                  <button type="button" className={styles.addCart} onClick={() => addToCart({ ...produto, qtd: 1 })}>
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.descriptionProduct}>
            <h2 className={styles.descriptionDetailed}>Descrição do Produto</h2>
            {/* Tranforma descrição do produto que vem em Html - obs: esta off pois a tela ainda n esta consumindo os dados das apis*/}
            {/* {parse(produto.descricaoDetalhada)} */}
            {produto.descrProduto}
          </section>
        </div>
      </section>
      <section className={styles.areaBranca}>
        <section className={`${styles.areaAvaliacoes} container rounded-4`}>
          <SectionAvaliation
            numeroAvaliacao={produto.avaliacao ? produto.avaliacao : 0}
            color="amarelo"
            porcentagem={produto.porcentagens ? produto.porcentagens : {
              cinco: 0,
              quatro: 0,
              tres: 0,
              dois: 0,
              um: 0
            }}
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
