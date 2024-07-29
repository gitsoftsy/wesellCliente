/* eslint-disable react/prop-types */
import axios from "axios";
import { useRef, useState } from "react";
import ReactInputMask from "react-input-mask";
import styles from "../../pages/Endereco/endereco.module.css";
import { MdOutlineLocationOn } from "react-icons/md";

export default function ModalFrete({ dadosFrete }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cepRef = useRef(null);

  function limparMascara(valor) {
    return valor ? valor.replace(/[^\d]+/g, "") : "";
  }

  async function calcularFrete(e) {
    e.preventDefault();
    setLoading(true);

    // let dados = {
    //   from: {
    //     postal_code: "01002001",
    //   },
    //   to: {
    //     postal_code: limparMascara(cepRef.current?.value),
    //   },
    //   package: {
    //     height: dadosFrete.altura,
    //     width: dadosFrete.largura,
    //     length: dadosFrete.profundidade,
    //     weight: dadosFrete.peso,
    //   },
    // };

    await axios
      .get(
        `https://viacep.com.br/ws/${limparMascara(cepRef.current?.value)}/json/`
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div
      className="modal fade"
      id="modalFrete"
      tabIndex="-1"
      aria-labelledby="Modal de Frete"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body py-5 px-4">
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{width: '200px', height: '200px'}} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <span className="d-flex align-items-center justify-content-between">
                  <h5 className="m-0">Calcule o frete e prazo de entrega</h5>
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
                <form onSubmit={calcularFrete}>
                  <div className="row mt-4">
                    <div className="col">
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
                        ref={cepRef}
                        required
                      />
                    </div>
                    <div className="col d-flex align-items-end">
                      <button type="submit" className="btn btn-primary px-4">
                        Calcular
                      </button>
                    </div>
                  </div>
                </form>
                {data && (
                  <>
                    <p className="mt-4 d-flex align-items-center">
                      <MdOutlineLocationOn size={20} />
                      {data.logradouro}, {data.bairro} - {data.localidade} -{" "}
                      {data.uf}
                    </p>
                    <div
                      className={`${styles.cardEndereco} mb-1 card rounded-1 py-2 ${styles.radioSelected}`}
                    >
                      <div className="d-flex align-items-center ps-2 py-2">
                        <label
                          className={`pe-2 form-check-label col-12 d-flex justify-content-between`}
                          htmlFor="melhorEnvio"
                        >
                          <span>PAC - de 1 a 20 dias úteis</span>
                          <span className="fw-semibold">R$ 25,37</span>
                        </label>
                      </div>
                    </div>
                    <div
                      className={`${styles.cardEndereco} card rounded-1 py-2 ${styles.radioSelected}`}
                    >
                      <div className="d-flex align-items-center ps-2 py-2">
                        <label
                          className={`pe-2 form-check-label col-12 d-flex justify-content-between`}
                          htmlFor="melhorEnvio"
                        >
                          <span>SEDEX - de 1 a 10 dias úteis</span>
                          <span className="fw-semibold">R$ 55,07</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
