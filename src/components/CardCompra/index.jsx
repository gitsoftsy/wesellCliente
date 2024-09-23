/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./cardCompra.module.css";
import { useEffect, useState } from "react";
import formatCurrencyBR from "../../hooks/formatCurrency";
import axios from "axios";
import { url_base, url_img } from "../../services/apis";

export default function CardCompra({ pedido, status }) {
  const [classeSt, setClasseSt] = useState(null);
  const [st, setSt] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");

  useEffect(() => {
    if (pedido.formaPagamento == "C") {
      setFormaPagamento("Cartão");
    } else if (pedido.formaPagamento == "P") {
      setFormaPagamento("Pix");
    } else {
      setFormaPagamento("Boleto");
    }

    axios
      .get(url_base + `/imagens/produto/` + pedido.idProduto)
      .then((response) => {
        let caminho = response.data[0].imagem.split("ROOT");
        setImagemProduto(`${url_img}${caminho[1]}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [
    setFormaPagamento,
    pedido.formaPagamento,
    setImagemProduto,
    pedido.idProduto,
  ]);

  useEffect(() => {
    if (status === "A") {
      setSt("AGUARDANDO PAGAMENTO");
      setClasseSt("#FCEE47");
    } else if (status === "E") {
      setSt("ENTREGUE");
      setClasseSt("#198754");
    } else if (status === "N") {
      setSt("PAGAMENTO NEGADO");
      setClasseSt("#DC3545");
    } else if (status === "C") {
      setSt("PAGAMENTO CANCELADO");
      setClasseSt("#DC3545");
    }
  }, [status]);

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    const hoje = new Date();
    const options = { day: 'numeric', month: 'long' }; // Dia e mês por extenso
  
    let dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(data);
  
    // Verifica se o ano da data é diferente do ano atual
    if (data.getFullYear() < hoje.getFullYear()) {
      dataFormatada += ` de ${data.getFullYear()}`;
    }
  
    return dataFormatada;
  }

  return (
    <article className={styles.containerCompra}>
      <div className={styles.boxData}>
        <p className={styles.dataCompra}>{formatarData(pedido.dataVenda)}</p>
      </div>
      <div className={styles.boxCompra}>
        <div className={styles.boxImg}>
          <span>
            <img src={imagemProduto} alt="Imagem do produto" />
          </span>
        </div>
        <div className={styles.boxDados}>
          <div className={styles.boxDescricao}>
            <p className={styles.statusCompra} style={{ color: classeSt }}>
              {st}
            </p>
            <h2 className={styles.statusEntrega}>Chegou dia 15 de junho</h2>
            <span className={styles.nomeProduto}>{pedido.nomeProduto}</span>
            <span className={styles.quantidadeProduto}>
              {pedido.quantidade} unidade
            </span>
          </div>
          <div className={styles.boxVendedor}>
            <p id={styles.pagamento}>Forma de pagamento: {formaPagamento}</p>
            <p id={styles.valor}>
              Valor:{" "}
              {formatCurrencyBR(pedido.precoUnitario * pedido.quantidade)}
            </p>
            <span>Vendedor {pedido.nomeLojista}</span>
          </div>
        </div>
        <div className={styles.boxBtn}>
          <Link to="" className={styles.btnCompra}>
            Ver produto
          </Link>
          <Link
            to={`/minha-conta/pedidos/avaliacao/${pedido.idVendaItem}`}
            className={styles.comprarMais}
          >
            Avaliar
          </Link>
        </div>
      </div>
    </article>
  );
}
