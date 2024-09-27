/* eslint-disable react/prop-types */
import formatCurrencyBR from "../../../hooks/formatCurrency";
import styles from "./produtoFrete.module.css";

export default function CardProdutoFrete({ item }) {
  return (
    <div className={styles.cardItemCarrinho} key={item.idProduto}>
      <div className={`${styles.areaImg} col-1 me-2`}>
        <img src={item.imagem} alt={item.nomeProduto} />
      </div>
      <div className={`${styles.colNomeProduto} col-5 text-start`}>
        <p id={styles.nomeProduto}>{item.nomeProduto}</p>
        <span className={styles.nomeLojista}>
          vendido por: {item.lojista.nomeFantasia}
        </span>
      </div>
      <div className={`${styles.colPrecoUnitario} col`}>
        {formatCurrencyBR(item.precoPromocional)}
      </div>
      <div className={`${styles.colQuantidade} col`}>{item.qtd}</div>
      <div className={`${styles.colSubtotal} col`}>
        {formatCurrencyBR(item.precoPromocional * Number(item.qtd))}
      </div>
      <div className={`${styles.colFrete} col`}>
        {formatCurrencyBR(item.vlFrete)}
      </div>
    </div>
  );
}
