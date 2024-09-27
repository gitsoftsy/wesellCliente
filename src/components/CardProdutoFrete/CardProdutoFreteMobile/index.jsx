/* eslint-disable react/prop-types */
import formatCurrencyBR from "../../../hooks/formatCurrency";
import styles from "./produtoFreteMobile.module.css";

export default function CardProdutoFreteMobile({ item }) {
  return (
    <div className={styles.cardItemCarrinho} key={item.idProduto}>
      <div className={styles.sectionImg}>
        <div className={`${styles.areaImg} me-2`}>
          <img src={item.imagem} alt={item.nomeProduto} />
        </div>
        <div className={styles.colNomeProduto}>
          <p id={styles.nomeProduto}>{item.nomeProduto}</p>
          <span className={styles.nomeLojista}>
            <p>Vendido por: {item.lojista.nomeFantasia}</p>
            <p>x {item.qtd}</p>
          </span>

          <p className="mb-0 text-end">
            {formatCurrencyBR(item.precoPromocional)}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <p className="fw-semibold mb-0">Subtotal:</p>
        <p className="fw-semibold mb-0">
          {formatCurrencyBR(item.precoPromocional * Number(item.qtd))}
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <p className="fw-semibold mb-0">Frete:</p>
        <p className="fw-semibold mb-0">{formatCurrencyBR(item.vlFrete)}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p className="fw-semibold mb-0">Total do pedido:</p>
        <p className="text-primary mb-0 fw-semibold">
          {formatCurrencyBR(
            item.precoPromocional * item.qtd + Number(item.vlFrete)
          )}
        </p>
      </div>
    </div>
  );
}
