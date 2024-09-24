/* eslint-disable react/prop-types */
import ReactInputMask from "react-input-mask";
import formatCurrencyBR from "../../hooks/formatCurrency.js";
// import formatPriceBR from "../../hooks/formatPrice.js";
import styles from "./resumo.module.css";
import { useState } from "react";
import formatPriceBR from "../../hooks/formatPrice.js";
import axios from "axios";
import { apiFrete } from "../../services/apis.js";

export default function ResumoPedido({
  totalProdutos,
  disabled,
  total,
  dadosFrete,
  valorFrete,
  continuarCompra,
  subtotal,
  showCalculaFrete = true,
}) {
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);

  function limparMascara(valor) {
    return valor ? valor.replace(/[^\d]+/g, "") : "";
  }

  async function calculaFrete() {
    let objetoApi = {
      from: {
        postal_code: dadosFrete.cepCd,
      },
      to: {
        postal_code: limparMascara(cep),
      },
      package: {
        height: dadosFrete.altura,
        width: dadosFrete.largura,
        length: dadosFrete.profundidade,
        weight: dadosFrete.peso,
      },
    };

    try {
      const response = await axios.post(apiFrete, objetoApi);

      if (response.data.sucesso) {
        const fretes = response.data.retorno;

        const freteMaiorValor = fretes
          .filter((item) => !item.error)
          .reduce(
            (maxFrete, currentFrete) => {
              return parseFloat(currentFrete.price) > parseFloat(maxFrete.price)
                ? currentFrete
                : maxFrete;
            },
            { price: "0.00" }
          );

        setFrete(freteMaiorValor);
        console.log(fretes);
        console.log(freteMaiorValor);
      } else {
        console.error(response.data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

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
          <section className="w-100">
            <div className="d-flex align-items-center w-100 justify-content-between">
              <p>Frete</p>
              {showCalculaFrete ? (
                <>
                  <div
                    id={styles.calculaFrete}
                    className="input-group input-group-sm"
                  >
                    <ReactInputMask
                      type="tel"
                      mask="99999-999"
                      maskChar={null}
                      className="form-control"
                      id="cep"
                      autoComplete="off"
                      placeholder="CEP"
                      aria-describedby="inputCep"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={calculaFrete}
                      className="input-group-text m-0"
                      id="inputCep"
                    >
                      Calcular
                    </button>
                  </div>
                </>
              ) : (
                <p>{valorFrete ? formatCurrencyBR(valorFrete) : "--"}</p>
              )}
            </div>
            {frete && (
              <div className=" mt-3 form-check w-100 d-flex align-items-center gap-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name={frete.name}
                  id={frete.name}
                  checked
                />
                <label
                  className={`form-check-label col d-flex align-items-center justify-content-between`}
                  htmlFor={frete.name}
                >
                  <div>
                    <p>{frete?.name}</p>
                    <p>
                      {frete?.delivery_range?.min} -{" "}
                      {frete?.delivery_range?.max} dias úteis
                    </p>
                  </div>

                  <p>{formatPriceBR(frete?.price)}</p>
                </label>
              </div>
            )}
          </section>
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
