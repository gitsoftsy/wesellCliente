/* eslint-disable react/prop-types */
import formatCurrencyBR from "../../hooks/formatCurrency.js";
import formatPriceBR from "../../hooks/formatPrice.js";
import styles from "./resumo.module.css";

export default function ResumoPedido({
  totalProdutos,
  disabled,
  total,
  continuarCompra,
  frete,
  subtotal
}) {
  return (
    <div className={`${styles.cardResumo} card`}>
      <div className={styles.titleResumo}>
        <h5>Resumo da compra</h5>
      </div>
      <div className={styles.infoResumo}>
        <span>
          <p>Produtos ({totalProdutos})</p> <p>{formatCurrencyBR(subtotal)}</p>
        </span>
        <span>
          <p>Frete</p> <p>{formatPriceBR(frete?.price)}</p>
        </span>
        <span className={styles.spanTotal}>
          <p>Total</p> <p>{formatCurrencyBR(total)}</p>
        </span>
      </div>
      <div id={styles.areaBtn}>
        <button
          type="button"
          className="btn btn-primary"
          disabled={disabled}
          onClick={continuarCompra}
        >
          Continuar a compra
        </button>
      </div>
    </div>
  );
}
