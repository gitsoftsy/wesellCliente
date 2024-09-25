import { useEffect, useState } from "react";
import styles from "./pagamentos.module.css";
import { MdOutlinePayment, MdPix } from "react-icons/md";
import ReactInputMask from "react-input-mask";
import { FaBarcode, FaCreditCard } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ModalCompra from "../../components/ModalCompra";
import ModalPix from "../../components/ModalPix";
import ModalBoleto from "../../components/ModalBoleto";
import ResumoPedido from "../../components/ResumoPedido";

export default function FormasPagamento() {
  const [formaPagamento, setFormaPagamento] = useState("cartao");
  const [showModal, setShowModal] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [showBoleto, setShowBoleto] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    setOrderData(JSON.parse(localStorage.getItem("@wesellOrderData")));
  }, []);

  const handleEnderecoChange = (e) => {
    setFormaPagamento(e.target.id);
  };

  const listMes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const listAno = [
    2024, 2025, 2026, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
    2035,
  ];

  return (
    <div className={styles.containerCart}>
      <section className={`container ${styles.contentCart}`}>
        <div className={`${styles.sectionItensCarrinho}`}>
          <section className={`${styles.cardItensCarrinho} card`}>
            <div className={styles.titleCarrinho}>
              <h5 className="d-flex align-items-center gap-2">
                <MdOutlinePayment size={25} /> Formas de pagamento
              </h5>
            </div>

            {orderData?.lojista.aceitaCartao == "S" && (
              <div
                className={`${styles.cardEndereco} card rounded-1 px-3  ${
                  formaPagamento === "cartao" && styles.radioSelected
                }`}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="formaPagamento"
                    id="cartao"
                    checked={formaPagamento === "cartao"}
                    onChange={handleEnderecoChange}
                  />
                  <label
                    className="ms-3 pe-2 form-check-label col-12 d-flex justify-content-between"
                    htmlFor="cartao"
                  >
                    <span>
                      CARTÃO DE CRÉDITO
                      <br />
                      {orderData?.lojista.possuiParcelamento == "S" && (
                        <span
                          className={`${styles.textCard} fw-normal`}
                          style={{ color: "#f49516" }}
                        >
                          {/* pegar numero de parcelas do produto */}
                          Parcele em até {orderData?.lojista.maximoParcelas}x sem juros
                        </span>
                      )}
                    </span>
                    <FaCreditCard size={22} />
                  </label>
                </div>
                {formaPagamento === "cartao" && (
                  <form className="py-3">
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">
                        Número do cartão
                      </label>
                      <ReactInputMask
                        required
                        type="tel"
                        mask="9999 9999 9999 9999"
                        maskChar=""
                        className="form-control"
                        id="cardNumber"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cardHolder" className="form-label">
                        Nome do titular
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        autoComplete="off"
                        id="cardHolder"
                      />
                    </div>

                    <div className="row">
                      <label htmlFor="expirationDate" className="form-label">
                        Data de vencimento
                      </label>
                      <div className="col-md-6 mb-3">
                        <select className="form-select" name="mes" id="mes">
                          <option value="0" disabled selected>
                            Mês
                          </option>
                          {listMes.map((mes) => (
                            <option key={mes} value={mes}>
                              {mes}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <select className="form-select" name="ano" id="ano">
                          <option value="0" disabled selected>
                            Ano
                          </option>
                          {listAno.map((ano) => (
                            <option key={ano} value={ano}>
                              {ano}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="cvv" className="form-label">
                          Código de segurança
                        </label>
                        <ReactInputMask
                          type="tel"
                          required
                          mask="999"
                          maskChar=""
                          className="form-control"
                          id="cvv"
                        />
                      </div>
                    </div>
                    {orderData?.lojista.possuiParcelamento == "S" && (
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <label htmlFor="parcelas" className="form-label">
                            Parcelas
                          </label>
                          <select
                            className="form-select"
                            name="parcelas"
                            id="parcelas"
                          >
                            <option value="0" disabled selected>
                              Selecione uma opção
                            </option>
                            {Array.from(
                              { length: orderData?.lojista.maximoParcelas },
                              (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}{" "}
                                  {index > 0 ? "Parcela(s)" : "Parcela"}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    )}
                    <span
                      className="btn btn-primary px-4"
                      onClick={() => setShowModal(true)}
                    >
                      Fazer pagamento
                    </span>
                  </form>
                )}
              </div>
            )}
            {orderData?.lojista.aceitaPix == "S" && (
              <div
                className={`${styles.cardEndereco} card rounded-1 px-3  ${
                  formaPagamento === "pix" && styles.radioSelected
                }`}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="formaPagamento"
                    id="pix"
                    checked={formaPagamento === "pix"}
                    onChange={handleEnderecoChange}
                  />
                  <label
                    className="ms-3 pe-2 form-check-label col-12 d-flex justify-content-between"
                    htmlFor="pix"
                  >
                    <span>
                      PAGAMENTO VIA PIX <br />
                      <span
                        className={`${styles.textCard} fw-normal`}
                        style={{ color: "#f49516" }}
                      >
                        Aprovação imediata
                      </span>
                    </span>
                    <MdPix size={22} />
                  </label>
                </div>
              </div>
            )}
            {orderData?.lojista.aceitaBoleto == "S" && (
              <div
                className={`${styles.cardEndereco} card rounded-1 px-3  ${
                  formaPagamento === "boleto" && styles.radioSelected
                }`}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="formaPagamento"
                    id="boleto"
                    checked={formaPagamento === "boleto"}
                    onChange={handleEnderecoChange}
                  />
                  <label
                    className="ms-3 pe-2 form-check-label col-12 d-flex justify-content-between"
                    htmlFor="boleto"
                  >
                    <span>
                      BOLETO
                      <br />
                      <span
                        className={`${styles.textCard} fw-normal`}
                        style={{ color: "#f49516" }}
                      >
                        Será aprovado em 1 ou 2 dias úteis.
                      </span>
                    </span>
                    <FaBarcode size={22} />
                  </label>
                </div>
              </div>
            )}
          </section>
          <Link to="/carrinho/endereco">
            <FiArrowLeft size={18} /> Voltar para endereço
          </Link>
        </div>

        <ResumoPedido
          disabled={formaPagamento === "cartao"}
          continuarCompra={() => {
            formaPagamento === "pix" ? setShowPix(true) : setShowBoleto(true);
          }}
          total={orderData?.resumo.total}
          subtotal={orderData?.resumo.subtotal}
          valorFrete={orderData?.resumo.valorFrete}
          quantidadeFretes={orderData?.resumo.qtdFretes}
          showAreaFrete={true}
          quantidadeItens={orderData?.resumo.qtdProdutos}
        />
      </section>
      <ModalCompra status={true} isShow={showModal} setIsShow={setShowModal} />
      <ModalPix isShow={showPix} setIsShow={setShowPix} />
      <ModalBoleto isShow={showBoleto} setIsShow={setShowBoleto} />
    </div>
  );
}
