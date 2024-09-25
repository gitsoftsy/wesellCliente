/* eslint-disable react/prop-types */
import formatCurrencyBR from "../../hooks/formatCurrency.js";
// import formatPriceBR from "../../hooks/formatPrice.js";
import styles from "./resumo.module.css";

export default function ResumoPedido({
  disabled,
  quantidadeItens,
  quantidadeFretes,
  subtotal,
  valorFrete = null,
  showAreaFrete = false,
  total,
  continuarCompra,
}) {



  return (
    <div className={`${styles.cardResumo} card`}>
      <div className={styles.titleResumo}>
        <h5>Resumo da compra</h5>
      </div>
      <div className={styles.infoResumo}>
        <span>
          <p>Itens ({quantidadeItens})</p> <p>{formatCurrencyBR(subtotal)}</p>
        </span>
        {showAreaFrete && (
          <span>
            <p>Fretes ({quantidadeFretes})</p>
            <p>{valorFrete ? formatCurrencyBR(valorFrete) : "--"}</p>
          </span>
        )}

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
