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
import { toast } from "react-toastify";
import { apiFinanceiro } from "../../services/apis";
import axios from "axios";
import useContexts from "../../hooks/useContext";

export default function FormasPagamento() {
  const [formaPagamento, setFormaPagamento] = useState("cartao");
  const [showModal, setShowModal] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [showBoleto, setShowBoleto] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [dataCart, setDataCart] = useState({
    numeroCartao: "",
    nomeCartao: "",
    cpfTitular: "",
    mesVencimento: "0",
    anoVencimento: "0",
    cvv: "",
  });
  const [numParcelas, setParcelas] = useState("0");
  const [loading, setLoading] = useState(false);
  const [statusCompra, setStatusCompra] = useState(false);
  const [msgModal, setMsgModal] = useState("");
  const [imgQrCode, setImgQrCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [boleto, setBoleto] = useState(null);

  const { client, limpaStorage } = useContexts();

  const listMes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const listAno = [
    2024, 2025, 2026, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
    2035,
  ];

  useEffect(() => {
    setOrderData(JSON.parse(localStorage.getItem("@wesellOrderData")));
  }, []);

  const handleChangePagamento = (e) => {
    setFormaPagamento(e.target.id);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDataCart((prevDataCart) => ({
      ...prevDataCart,
      [id]: value,
    }));
  };

  const handlePagamento = () => {
    const {
      numeroCartao,
      cpfTitular,
      nomeCartao,
      mesVencimento,
      anoVencimento,
      cvv,
    } = dataCart;

    if (formaPagamento === "cartao") {
      if (
        !numeroCartao ||
        !nomeCartao ||
        !cpfTitular ||
        mesVencimento === "0" ||
        anoVencimento === "0" ||
        !cvv
      ) {
        toast.warn("Preencha todos os campos obrigatórios.");
        return;
      }

      if (
        orderData?.lojista?.possuiParcelamento === "S" &&
        (!numParcelas || numParcelas === "0")
      ) {
        toast.warn("Por favor, selecione o número de parcelas.");
        return;
      }

      processarPagamentoCartao();
      return;
    } else if (formaPagamento === "pix") {
      gerarQrCode();
    } else {
      gerarBoleto();
    }
  };

  const gerarBoleto = async () => {
    setLoading(true);
    const dadosInfluencer = JSON.parse(localStorage.getItem("statusPage"));

    const objetoBoleto = {
      idCliente: client.id,
      idEnderecoEntrega: orderData.enderecoId,
      idVendedor:
        dadosInfluencer != undefined ? dadosInfluencer.idVendedor : null,
      formaPagamento: "BOLETO",
      itens: orderData.itens,
    };

    if (boleto != null) {
      setLoading(false);
      setStatusCompra(true);
      setShowBoleto(true);
      return;
    }

    await axios
      .post(apiFinanceiro + `/venda`, objetoBoleto)
      .then((response) => {
        const data = response.data;
        if (data.sucesso) {
          setBoleto(data.retorno);
          if (data.retorno.status === "PAGO") {
            setLoading(false);
            setStatusCompra(true);
            setShowBoleto(true);
          } else {
            setStatusCompra(false);
            setMsgModal(data.retorno.mensagemErro);
            setShowBoleto(true);
          }
        } else {
          setLoading(false);
          console.log(response.data);
          setStatusCompra(false);
          setMsgModal(data.retorno.status);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function limparMascara(valor) {
    return valor ? valor.replace(/[^\d]+/g, "") : "";
  }

  async function processarPagamentoCartao() {
    setLoading(true);
    const {
      numeroCartao,
      nomeCartao,
      mesVencimento,
      anoVencimento,
      cpfTitular,
      cvv,
    } = dataCart;

    const possuiParcelamento = orderData?.lojista?.possuiParcelamento === "S";
    const dadosInfluencer = JSON.parse(localStorage.getItem("statusPage"));

    const objeto = {
      idCliente: client.id,
      idEnderecoEntrega: orderData.enderecoId,
      // verificar se o produto esta sendo comprado por um link de influencer e pegar o id dele
      idVendedor:
        dadosInfluencer != undefined ? dadosInfluencer.idVendedor : null,
      formaPagamento: "CARTAO_CREDITO",
      itens: orderData.itens,
      cartaoCredito: {
        numeroCartao: limparMascara(numeroCartao),
        nomeCartao,
        cvv,
        cpfTitular: limparMascara(cpfTitular),
        mesVencimento,
        anoVencimento,
        numParcelas: possuiParcelamento ? numParcelas : null,
      },
    };
    await axios.post(apiFinanceiro + `/venda`, objeto).then((response) => {
      const data = response.data;
      if (data.sucesso) {
        if (data.retorno.status === "PAGO") {
          setLoading(false);
          setStatusCompra(true);
          setShowModal(true);
          limpaStorage();
        } else {
          setStatusCompra(false);
          setMsgModal(data.retorno.mensagemErro);
          setShowModal(true);
          console.log(data.retorno.codigoErro);
        }
      } else {
        setLoading(false);
        console.log(response.data);
        setStatusCompra(false);
        setMsgModal(data.retorno.status);
        setShowModal(true);
      }
    });
  }

  async function gerarQrCode() {
    setLoading(true);

    const dadosInfluencer = JSON.parse(localStorage.getItem("statusPage"));

    const objeto = {
      idCliente: client.id,
      idEnderecoEntrega: orderData.enderecoId,
      idVendedor: dadosInfluencer ? dadosInfluencer.idVendedor : null,
      formaPagamento: "PIX",
      itens: orderData.itens,
    };

    await axios.post(apiFinanceiro + `/venda`, objeto).then((response) => {
      const data = response.data;
      if (data.sucesso) {
        setImgQrCode(data.retorno.qrCodeUrl);
        setQrCode(data.retorno.qrCode);
        setShowPix(true);
        setLoading(false);

        const checkPaymentStatus = async () => {
          try {
            const responseStatus = await axios.get(
              apiFinanceiro + `/venda/status?idVenda=${data.retorno.idVenda}`
            );

            if (
              responseStatus.data.sucesso &&
              responseStatus.data.retorno === "PAGO"
            ) {
              setShowPix(false);
              setStatusCompra(true);
              setShowModal(true);
              limpaStorage();
            } else {
              setTimeout(checkPaymentStatus, 1000);
            }
          } catch (error) {
            setMsgModal(data.retorno.mensagem);
            setShowModal(true);
            console.log(error);
          }
        };

        setTimeout(checkPaymentStatus, 1000);
      } else {
        setLoading(false);
        console.log(response.data);
        setStatusCompra(false);
        setMsgModal(data.mensagem);
        setShowModal(true);
      }
    });
  }

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
                  onChange={handleChangePagamento}
                />
                <label
                  className="ms-3 pe-2 form-check-label col-12 d-flex justify-content-between"
                  htmlFor="cartao"
                >
                  <span>
                    CARTÃO DE CRÉDITO
                    <br />
                    {orderData?.lojista?.possuiParcelamento == "S" && (
                      <span
                        className={`${styles.textCard} fw-normal`}
                        style={{ color: "#f49516" }}
                      >
                        Parcele em até {orderData?.lojista.maximoParcelas}x sem
                        juros
                      </span>
                    )}
                  </span>
                  <FaCreditCard size={22} />
                </label>
              </div>
              {formaPagamento === "cartao" && (
                <form className="py-3">
                  <div className="row">
                    <div className="mb-3 col-12 col-sm-6">
                      <label htmlFor="cpfTitular" className="form-label">
                        CPF do titular
                        <span className="text-danger">*</span>
                      </label>
                      <ReactInputMask
                        type="tel"
                        required
                        mask="999.999.999-99"
                        maskChar=""
                        className="form-control"
                        id="cpfTitular"
                        value={dataCart.cpfTitular}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3 col-12 col-sm-6">
                      <label htmlFor="nomeCartao" className="form-label">
                        Nome do titular<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        autoComplete="off"
                        id="nomeCartao"
                        value={dataCart.nomeCartao}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-12 col-sm-6">
                      <label htmlFor="numeroCartao" className="form-label">
                        Número do cartão<span className="text-danger">*</span>
                      </label>
                      <ReactInputMask
                        required
                        type="tel"
                        mask="9999 9999 9999 9999"
                        maskChar=""
                        className="form-control"
                        id="numeroCartao"
                        value={dataCart.numeroCartao}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3 col-12 col-sm-6">
                      <label htmlFor="mesVencimento" className="form-label">
                        Mês de vencimento
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="mesVencimento"
                        id="mesVencimento"
                        value={dataCart.mesVencimento}
                        onChange={handleInputChange}
                      >
                        <option value="0" disabled>
                          Mês
                        </option>
                        {listMes.map((mes) => (
                          <option key={mes} value={mes}>
                            {mes}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-12 col-sm-6">
                      <label htmlFor="anoVencimento" className="form-label">
                        Ano de vencimento
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="anoVencimento"
                        id="anoVencimento"
                        value={dataCart.anoVencimento}
                        onChange={handleInputChange}
                      >
                        <option value="0" disabled>
                          Ano
                        </option>
                        {listAno.map((ano) => (
                          <option key={ano} value={ano}>
                            {ano}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-12 col-sm-6">
                      <label htmlFor="cvv" className="form-label">
                        Código de segurança
                        <span className="text-danger">*</span>
                      </label>
                      <ReactInputMask
                        type="tel"
                        required
                        mask="999"
                        maskChar=""
                        className="form-control"
                        id="cvv"
                        value={dataCart.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                    {orderData?.lojista?.possuiParcelamento === "S" && (
                      <div className="mb-3 col-12 col-sm-6">
                        <label htmlFor="numParcelas" className="form-label">
                          Número de parcelas
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          name="numParcelas"
                          id="numParcelas"
                          value={numParcelas}
                          onChange={(e) => setParcelas(e.target.value)}
                        >
                          <option value="0" disabled>
                            Selecione uma opção
                          </option>
                          {Array.from(
                            { length: orderData?.lojista.maximoParcelas },
                            (_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1} {index > 0 ? "Parcelas" : "Parcela"}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>

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
                  onChange={handleChangePagamento}
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
                  onChange={handleChangePagamento}
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

        <ResumoPedido
          textButon="Realizar pagamento"
          loading={loading}
          continuarCompra={handlePagamento}
          total={orderData?.resumo.total}
          subtotal={orderData?.resumo.subtotal}
          valorFrete={orderData?.resumo.valorFrete}
          quantidadeFretes={orderData?.resumo.qtdFretes}
          showAreaFrete={true}
          quantidadeItens={orderData?.resumo.qtdProdutos}
        />
      </section>
      <ModalCompra
        textoModal={msgModal}
        status={statusCompra}
        isShow={showModal}
        setIsShow={setShowModal}
      />
      <ModalPix
        isShow={showPix}
        setIsShow={setShowPix}
        imgQrCode={imgQrCode}
        qrCode={qrCode}
      />
      <ModalBoleto
        limpaStorage={limpaStorage}
        isShow={showBoleto}
        setIsShow={setShowBoleto}
        boleto={boleto}
      />
    </div>
  );
}
