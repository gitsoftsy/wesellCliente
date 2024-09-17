/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./cardCompra.module.css";
import { useEffect, useState } from "react";
import formatCurrencyBR from "../../hooks/formatCurrency";

export default function CardCompra({ pedido, status, imagem }) {
  const [classeSt, setClasseSt] = useState(null);
  const [st, setSt] = useState(null);

  useEffect(() => {
    console.log(pedido);
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
  }, []);

  return (
    <article className={styles.containerCompra}>
      <div className={styles.boxData}>
        <p className={styles.dataCompra}>11 de junho</p>
      </div>
      <div className={styles.boxCompra}>
        <div className={styles.boxImg}>
          <span>
            <img src={imagem} alt="Imagem do produto" />
          </span>
        </div>
        <div className={styles.boxDados}>
          <div className={styles.boxDescricao}>
            <p className={styles.statusCompra} style={{ color: classeSt }}>
              {st}
            </p>
            <h2 className={styles.statusEntrega}>Chegou dia 15 de junho</h2>
            <span className={styles.nomeProduto}>{pedido.nomeProduto}</span>
            <span className={styles.quantidadeProduto}>1 unidade</span>
          </div>
          <div className={styles.boxVendedor}>
            <p id={styles.pagamento}>Forma de pagamento: Cartão de crédito</p>
            <p id={styles.valor}>
              Valor: {formatCurrencyBR(pedido.precoPromocional)}
            </p>
            <span>Vendedor Kabum</span>
          </div>
        </div>
        <div className={styles.boxBtn}>
          <Link to="" className={styles.btnCompra}>
            Ver produto
          </Link>
          <Link
            to="/minha-conta/pedidos/avaliacao/19"
            className={styles.comprarMais}
          >
            Avaliar
          </Link>
        </div>
      </div>
    </article>
  );
}
