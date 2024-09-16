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
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWUzOGRjMzMzNDg4MmQxYzhjODM2OWE3ZjNjZDEyZmQ1N2M2OGIxYzQyYjE0ZDYyN2I1MDNmYTllZWZlN2ZjOTU0ZmQzODNkYWQ3ZGY4OTkiLCJpYXQiOjE3MjU5ODA5NDcuMDkzMjk1LCJuYmYiOjE3MjU5ODA5NDcuMDkzMjk3LCJleHAiOjE3NTc1MTY5NDcuMDc2NjIsInN1YiI6IjljODE2YzRiLTc4MTAtNDZhNi1iYjY0LTM1M2EzYmY4OGRiMiIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.hkTp2oyptBC1jCxjl94vIOgxLiwa8Nk7VDBEfC-yVXzvgS7F17sP-DRt2lCosx8cYO2mkyS4_E9zUcBF_eY3Impp12Z8u4lBXusPeInnFRWDwOoYRj2g-nWGsNz48WjGOeC1IgRmOQBFPKwpBa9L5L_uMhot2NGL_HpBmGK0MY6lASEgxpF9koXfDnSfRniB0ryZ5vwVUAwvZwqklRnS03VFBKfQnHL7LXpV4dUGuNU-DWrmqQzmqzUPNZD8MjQtvfymPr2mjeTYdNv-WqnYGVoAC_nYEi-aUnq5OCNzJU4je8QSpa-Iu3e2J97LIW4chvW1Tc6jdjEaYHPON0q9M7RPP8Kb7H_ms20Z9x_CTnYR7_E3fK8m_5Xf6dFf8JYo3FPYOPiFCpkQlLh63ylvBgCZDRe84oiqOwG3Hq8JmbqYZeG1df8PyMcRUPESS1u6LjVqBgzaqYHeFjzmOivdttfxNJJWzioWa0KMxXVDg4uQ5ZKvI-oPtLeTVhKciP1KHufjDEQYS_vGOgliP0XdPl1t5Zl7Nj89_hq5XVZ_k6q-GB1qYdqx-Lt3DSHNd855JJUKyjXqLQgydJQ0Y906ufCzNMMgQixYjfM__BL4yTT079ypXBdx3DMbeyXH-Dmd1lai_t-prlyfU18Er7niTDvj-KlYRVC43cJbSobuSMY";

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
        calculaFrete();
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
      const response = await axios.post(apiFrete, objetoApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const fretes = response.data;

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
    } catch (error) {
      console.error(error);
      return null;
    }
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
            {loading ? (
              // <div className="d-flex justify-content-center">
              //   <div
              //     className="spinner-border text-primary"
              //     style={{ width: "200px", height: "200px" }}
              //     role="status"
              //   >
              //     <span className="visually-hidden">Loading...</span>
              //   </div>
              // </div>
              <>
                <span className="d-flex align-items-center justify-content-between">
                  <h5 id={styles.titleModal}>
                    Frete e prazo de entrega
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </span>
                <p className="mt-4 fs-6 d-flex align-items-center justify-content-center">
                  <MdOutlineLocationOn size={20} className="me-1" />
                  {endereco?.logradouro
                    ? `${endereco.logradouro}, ${endereco.bairro} -
                  ${endereco.localidade} - ${endereco.uf}`
                    : ""}
                </p>
                <div className="d-flex px-3" id={styles.headerFretes}>
                  <div className="col">
                    <p>Transportadora</p>
                    <span>Manir</span>
                  </div>

                  <div className="col">
                    <p>Modalidade</p>
                    <span>Normal</span>
                  </div>

                  <div className="col">
                    <p>Prazo Estimado</p>
                    <span>20/09/2024</span>
                  </div>

                  <div className="col text-end">
                    <p>Preço</p>
                    <span>R$ 14,90</span>
                  </div>
                </div>
                <div className="col text-center mt-4">
                  <button
                    className={styles.btnCalc}
                    onClick={() => {
                      setLoading(false);
                      setEndereco(false);
                    }}
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
                  <div className="row mt-4">
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
                    <div className="col-12 col-md-auto d-flex align-items-end">
                      <button
                        type="submit"
                        className="col-12 btn btn-primary px-4"
                      >
                        Calcular
                      </button>
                    </div>
                  </div>
                </form>
                {endereco && (
                  <>
                    <p className="mt-4 fs-6 d-flex align-items-center justify-content-center">
                      <MdOutlineLocationOn size={22} className="me-1" />
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
                  </>
                )}
                {frete && (
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
