/* eslint-disable react/prop-types */
import formatCurrencyBR from "../../hooks/formatCurrency.js";
// import formatPriceBR from "../../hooks/formatPrice.js";
import styles from "./resumo.module.css";

export default function ResumoPedido({
  disabled = false,
  textButon = "Continuar a compra",
  quantidadeItens,
  quantidadeFretes,
  subtotal,
  loading = false,
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
          <p>Itens {quantidadeItens && `(${quantidadeItens})`}</p> <p>{subtotal ? formatCurrencyBR(subtotal) : "--"}</p>
        </span>
        {showAreaFrete && (
          <span>
            <p>Fretes {quantidadeFretes > 0 && `(${quantidadeFretes})`}</p>
            <p>{valorFrete ? formatCurrencyBR(valorFrete) : "--"}</p>
          </span>
        )}

        <span className={styles.spanTotal}>
          <p>Total</p> <p>{total ? formatCurrencyBR(total) : '--'}</p>
        </span>
      </div>
      <div id={styles.areaBtn}>
        {loading ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden" role="status">
              Processando...
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={disabled}
            onClick={continuarCompra}
          >
            {textButon}
          </button>
        )}
      </div>
    </div>
  );
}
