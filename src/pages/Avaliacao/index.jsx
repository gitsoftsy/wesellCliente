import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./avaliacao.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url_base, url_img } from "../../services/apis";
import { toast } from "react-toastify";
import StarsAvaliation from "../../components/StarsAvaliation";

export default function Avaliacao() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState("");
  const [imgProduto, setImgProduto] = useState("");
  const { idVendaItem } = useParams();
  const [descricao, setDescricao] = useState("");
  const [estrelas, setEstrelas] = useState(0);

  useEffect(() => {
    axios
      .get(url_base + `/produtos/avaliar?idVendaItem=` + idVendaItem)
      .then((res) => {
        setProduto(res.data[0]);
        axios
          .get(url_base + `/imagens/produto/` + res.data[0].idProduto)
          .then((response) => {
            let caminho = response.data[0].imagem.split("ROOT");
            setImgProduto(`${url_img}${caminho[1]}`);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [setProduto, idVendaItem]);

  const handleAvaliation = () => {
    const objeto = {
      idVendaItem: idVendaItem,
      avaliacao: estrelas,
      descricaoAvaliacao: descricao,
    };
    axios
      .put(url_base + "/vendaItens/avaliacao/" + idVendaItem, objeto)
      .then((response) => {
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        toast.success(`Avaliado com sucesso!`);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <section className={styles.boxConteudo}>
      <div className={`container-md ${styles.containerAvaliacao}`}>
        {produto != "" ? (
          <>
            <div className={`${styles.cardProduto}`}>
              <div className={`${styles.boxImg}`}>
                <img src={imgProduto} alt="Imagem do produto" />
              </div>
              <h1>O que você achou do produto?</h1>
              <span>{produto.nomeProduto}</span>
              <div className={`${styles.avaliacao}`}>
                <span className={styles.txt}>Ruim</span>
                <StarsAvaliation
                  font={32}
                  color={"#f49516"}
                  estrelas={estrelas}
                  setEstrelas={(e) => setEstrelas(e)}
                />
                <span className={styles.txt}>Excelente</span>
              </div>
            </div>
            <div className={styles.cardProduto}>
              <h1>Dê mais detalhes sobre seu produto</h1>
              <textarea
                name="descricao"
                id="descricao"
                placeholder="Eu achei o meu produto..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.btns}>
              <button
                onClick={handleAvaliation}
                to="/minha-conta/pedidos"
                className={styles.btnSave}
              >
                Salvar
              </button>
              <Link to="/minha-conta/pedidos" className={styles.link}>
                Cancelar
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.box} card`} aria-hidden="true">
              <span className={`${styles.cardWave} placeholder`}></span>
            </div>
            <div className={`${styles.box} card`} aria-hidden="true">
              <span className={`${styles.cardWave} placeholder`}></span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
