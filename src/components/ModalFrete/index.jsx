/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import styles from "../../pages/Endereco/endereco.module.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { apiFrete } from "../../services/apis";
import formatPriceBR from "../../hooks/formatPrice";

export default function ModalFrete({ produto }) {
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [frete, setFrete] = useState(null);
  const [cep, setCep] = useState("");

  function limparMascara(valor) {
    return valor ? valor.replace(/[^\d]+/g, "") : "";
  }

  async function buscaCep(e) {
    e.preventDefault();
    setLoading(true);

    await axios
      .get(`https://viacep.com.br/ws/${limparMascara(cep)}/json/`)
      .then((response) => {
        setEndereco(response.data);
        calculaFrete(cep);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  async function calculaFrete() {
    let objetoApi = {
      from: {
        postal_code: produto.lojista.cepCd,
      },
      to: {
        postal_code: limparMascara(cep),
      },
      package: {
        height: produto.altura,
        width: produto.largura,
        length: produto.profundidade,
        weight: produto.peso,
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
        setLoading(false);
        console.log(fretes);
        console.log(freteMaiorValor);
      } else {
        setLoading(false);
        console.error(response.data);
        return null;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      return null;
    }
  }

  function resetAddress() {
    setEndereco(null);
    setFrete(null);
    setCep("");
  }

  return (
    <div
      className="modal fade"
      id="modalFrete"
      tabIndex="-1"
      aria-labelledby="Modal de Frete"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body paddingModal">
            {frete && endereco ? (
              <>
                <span className="d-flex align-items-center justify-content-between">
                  <h5 id={styles.titleModal}>Frete e prazo de entrega</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </span>
                <p className="mt-4 fs-6 d-flex align-items-center">
                  <MdOutlineLocationOn size={20} className="me-1" />
                  {endereco?.logradouro
                    ? `${endereco.logradouro}, ${endereco.bairro} -
                  ${endereco.localidade} - ${endereco.uf}`
                    : ""}
                </p>
                <div className="d-flex px-3" id={styles.headerFretes}>
                  <div className="col">
                    <p>Transportadora</p>
                  </div>

                  <div className="col">
                    <p>Modalidade</p>
                  </div>

                  <div className="col">
                    <p>Prazo Estimado</p>
                  </div>

                  <div className="col text-end">
                    <p>Preço</p>
                  </div>
                </div>
                <div
                  key={frete.id}
                  className={`${styles.cardEndereco} mb-1 card rounded-1 py-2 ${styles.cardModalEndereco} ${styles.radioSelected}`}
                >
                  <div className="d-flex align-items-center px-3 py-2">
                    <label
                      className={`form-check-label col-12 d-flex justify-content-between`}
                      htmlFor={frete.name}
                    >
                      <div className="col">
                        <img
                          src={frete?.company?.picture}
                          alt={frete?.company?.name}
                          className={styles.imgFrete}
                        />
                      </div>

                      <div className="col">
                        <p>{frete?.name}</p>
                      </div>

                      <div className="col">
                        <p>
                          {frete?.delivery_range?.min} -{" "}
                          {frete?.delivery_range?.max} dias úteis
                        </p>
                      </div>

                      <div className="col text-end">
                        <p className="fw-semibold">
                          {formatPriceBR(frete?.price)}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col text-center mt-4">
                  <button
                    type="button"
                    onClick={resetAddress}
                    className="btn btn-primary btn-sm"
                  >
                    Calcular novamente
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="d-flex align-items-center justify-content-between">
                  <h5 id={styles.titleModal}>
                    Calcule o frete e prazo de entrega
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </span>
                <p className="mt-1">
                  Saiba os prazos de entrega e as formas de envio.
                </p>
                <form onSubmit={buscaCep}>
                  <div className="col-12 row">
                    <div className="col-12 col-md-7 mb-3 mb-md-0">
                      <label htmlFor="cep" className="ps-1">
                        CEP
                      </label>
                      <ReactInputMask
                        type="tel"
                        mask="99999-999"
                        maskChar={null}
                        className="form-control"
                        id="cep"
                        autoComplete="off"
                        placeholder="Informar um CEP"
                        onChange={(e) => setCep(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-5 d-flex align-items-end">
                      {loading ? (
                        <button
                          className="col-12 btn btn-primary px-4"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden" role="status">
                            Loading...
                          </span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="col-12 btn btn-primary px-4"
                        >
                          Calcular
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
