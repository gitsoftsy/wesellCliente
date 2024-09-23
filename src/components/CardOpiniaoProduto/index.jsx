/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./cardOpiniaoProduto.module.css";
import StarsAvaliation from "../StarsAvaliation";
import axios from "axios";
import { url_base, url_img } from "../../services/apis";

export default function CardOpiniaoProduto({
  imagemProduto,
  nomeProduto,
  dataCompra,
  idProduto,
}) {
  const [estrelas, setEstrelas] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(url_base + `/imagens/produto/` + idProduto)
      .then((response) => {
        let caminho = response.data[0].imagem.split("ROOT");
        setImage(`${url_img}${caminho[1]}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return (
    <div className={styles.cardOpiniaoProduto}>
      <div className={styles.boxImg}>
          <span>
            <img src={image} alt="Imagem do produto" />
          </span>
        </div>
      <div className={styles.dadosPedido}>
        <p>Cabo Adaptador Displayport Vga Conversor Vídeo Para Dell Hp</p>
        <StarsAvaliation
          font={40}
          color={"#3483FA"}
          estrelas={estrelas}
          setEstrelas={(e) => setEstrelas(e)}
        />
        <span>Comprado em 24 de fev.</span>
      </div>
    </div>
  );
}
