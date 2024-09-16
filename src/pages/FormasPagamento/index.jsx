import { useEffect, useState } from "react";
import styles from "./pagamentos.module.css";
import formatCurrencyBR from "../../hooks/formatCurrency";
import { MdOutlinePayment, MdPix } from "react-icons/md";
import ReactInputMask from "react-input-mask";
import { FaBarcode, FaCreditCard } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ModalCompra from "../../components/ModalCompra";
import QRCode from "qrcode.react";

export default function FormasPagamento() {
  const [formaPagamento, setFormaPagamento] = useState("cartao");
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [total, setTotal] = useState(0);
  const [lojista, setLojista] = useState({});
  const [showModal, setShowModal] = useState(false)
  // Dados fictícios para simular um QR Code de Pix
  const fakePixData = {
    chave: '00000000000',
    nome: 'Fulano de Tal',
    valor: '10.00',
    cidade: 'São Paulo',
  };

  // Formato de exemplo para um QR Code de Pix
  const qrCode =
    "https://images.tcdn.com.br/img/img_prod/691184/teste_213_1_20200528133119.png";


  useEffect(() => {
    const productsInCart = localStorage.getItem("wesell-items-in-cart");
    const products = JSON.parse(productsInCart) || [];

    setLojista(products[0].lojista);

    const subtotalCalculado = products.reduce(
      (acc, produto) => acc + produto.precoVenda * produto.qtd,
      0
    );
    const quantidadeTotal = products.reduce(
      (acc, produto) => acc + produto.qtd,
      0
    );
    setQuantidadeTotalProdutos(quantidadeTotal);
    setTotal(subtotalCalculado);
  }, []);

  const handleEnderecoChange = (e) => {
    setFormaPagamento(e.target.id);
  };

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
            <div
              className={`${styles.cardEndereco} card rounded-1 px-3  ${formaPagamento === "cartao" ? styles.radioSelected : ""
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
                    <span
                      className={`${styles.textCard} fw-normal`}
                      style={{ color: "#f49516" }}
                    >
                      Parcele em até 12x sem juros
                    </span>
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

                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="expirationDate" className="form-label">
                        Data de vencimento
                      </label>
                      <ReactInputMask
                        type="tel"
                        required
                        mask="99/9999"
                        maskChar=""
                        className="form-control"
                        id="expirationDate"
                      />
                    </div>
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
                  <div className="row mb-3">
                    <div className="col-md-8">
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
                          { length: lojista.maximoParcelas },
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1} {index > 0 ? 'Parcela(s)' : 'Parcela'}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <span className="btn btn-primary px-4" onClick={formaPagamento === "pix" ? <QRCode size={280} value={qrCode} /> : () => setShowModal(true)}>
                    Continuar
                  </span>
                </form>
              )}
            </div>
            <div
              className={`${styles.cardEndereco} card rounded-1 px-3  ${formaPagamento === "pix" ? styles.radioSelected : ""
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
            <div
              className={`${styles.cardEndereco} card rounded-1 px-3  ${formaPagamento === "boleto" ? styles.radioSelected : ""
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
          </section>
          <Link to="/carrinho/endereco">
            <FiArrowLeft size={18} /> Voltar para endereço
          </Link>
        </div>

        <div className={`${styles.cardResumo} card`}>
          <div className={styles.titleResumo}>
            <h5>Resumo da compra</h5>
          </div>
          <div className={styles.infoResumo}>
            <span>
              <p>Produtos ({quantidadeTotalProdutos})</p>{" "}
              <p>{formatCurrencyBR(total)}</p>
            </span>
            <span>
              <p>Frete</p>
              <p>R$ 25,37</p>
            </span>
            <span className={styles.spanTotal}>
              <p>Total</p> <p>{formatCurrencyBR(total + 25.37)}</p>
            </span>
          </div>
          {formaPagamento !== "cartao" && (
            <button type="button" className="btn btn-primary">
              Continuar
            </button>
          )}
        </div>
      </section>
      <ModalCompra status={true} isShow={showModal} setIsShow={setShowModal} />
    </div>
  );
}
