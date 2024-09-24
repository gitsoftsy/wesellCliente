/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./cardOpiniaoProduto.module.css";
import StarsAvaliation from "../StarsAvaliation";
import axios from "axios";
import { url_base, url_img } from "../../services/apis";
import { toast } from "react-toastify";

export default function CardOpiniaoProduto({
  imagemProduto,
  nomeProduto,
  dataCompra,
  idProduto,
  idVendaItem, funcReload
}) {
  const [estrelas, setEstrelas] = useState(0);
  const [image, setImage] = useState("https://api.we-sell.store/Imagens/uploads/produtos/18/imagemProduto_20240813192920316.png");

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
  }, [setImage, idProduto]);

  const handleAvaliation = () => {
    const objeto = {
      idVendaItem: idVendaItem,
      avaliacao: estrelas,
      descricaoAvaliacao: '',
    };
    axios
      .put(url_base + "/vendaItens/avaliacao/" + idVendaItem, objeto)
      .then((response) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        toast.success(`Avaliado com sucesso!`);
        funcReload()
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

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
          color={"#f49516"}
          estrelas={estrelas}
          setEstrelas={(e) => setEstrelas(e)}
          onclick={() => handleAvaliation()}
        />
        <span>Comprado em 24 de fev.</span>
      </div>
    </div>
  );
}
