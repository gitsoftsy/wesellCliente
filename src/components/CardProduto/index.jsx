/* eslint-disable react/prop-types */
import styles from "./cardproduto.module.css";
import formatCurrencyBR from "../../hooks/formatCurrency";
import { Link, useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { url_base, url_img } from "../../services/apis";

export default function CardProduto({ produto }) {
  const { addToCart } = useContexts();
  const [srcImage, setSrcImage] = useState('')
  const navigate = useNavigate();


  useEffect(() => {

    async function getImagensProduto() {
      await axios
        .get(url_base + `/imagens/produto/${produto.idProduto}`)
        .then((response) => {
          if (response.data.length > 0) {
            let caminho = response.data[0].imagem.split('ROOT')
            setSrcImage(`${url_img}${caminho[1]}`);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error.message);
        });
    }
    getImagensProduto();
  }, [srcImage])

  // const removerAcentos = (str) => {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // };

  // const nomeAtualizado = removerAcentos(produto.descrProduto)
  //   .toLowerCase()
  //   .replace(/\s+/g, "-")
  //   .replace(/\//g, "");

  return (
    <div className={`${styles.cardProduto}`}>
      <Link
        to={`/produto/${produto.idProduto}/${produto.nomeProduto.toLowerCase().replace(/ /g, '-')}`}
        className={styles.areaImg}
      >
        <img
          src={srcImage ? srcImage : 'https://imgs.casasbahia.com.br/55060824/1g.jpg'}
          alt={produto.descrProduto}
        />
      </Link>
      <section className={styles.infoProduto}>
        <Link
          to={`/produto/${produto.idProduto}/${produto.nomeProduto ? produto.nomeProduto.toLowerCase().replace(/ /g, '-') : produto.descricao}`}
          className={styles.areaDescricao}
        >
          <h6 className={styles.descricao}>{produto.nomeProduto}</h6>
        </Link>
        <div>
          <p className={styles.valor}>{produto.precoVenda && formatCurrencyBR(produto.precoVenda)}</p>
          <p className={styles.infoParcelas}>
            em até 12x de R$ 139,90 sem juros
          </p>
        </div>
        <section className={styles.areaBtn}>
          <button
            className={styles.btnBuy}
            type="button"
            onClick={() => { addToCart({ ...produto, qtd: 1, imagem: srcImage }), navigate('/carrinho') }}
          >
            Adicionar ao carrinho
          </button>
        </section>
      </section>
    </div>
  );
}
