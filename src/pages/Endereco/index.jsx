import { useEffect, useState } from "react";
import styles from "./endereco.module.css";
import ReactInputMask from "react-input-mask";
import {
  MdOutlineAddLocation,
  MdOutlineEditLocation,
  MdOutlineLocationOn,
  MdSaveAlt,
} from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResumoPedido from "../../components/ResumoPedido";
import { url_base } from "../../services/apis";
import useContexts from "../../hooks/useContext";
import { calculaFrete } from "../../hooks/calculaFrete";

export default function Endereco() {
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(null);
  const [valorFrete, setValorFrete] = useState(null);
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtosComFrete, setProdutosComFrete] = useState([]);

  const [editandoEndereco, setEditandoEndereco] = useState(false);
  const [valoresFormulario, setValoresFormulario] = useState({
    nomeEndereco: "",
    cep: "",
    logradouro: "",
    complemento: "",
    numero: "",
    bairro: "",
    uf: "",
    municipio: "",
  });

  const { client } = useContexts();
  const navigate = useNavigate();

  function limparMascara(valor) {
    return valor ? valor.replace(/[^\d]+/g, "") : "";
  }

  async function handleCalculaFrete(produtos, cep) {
    try {
      const response = await calculaFrete(produtos, cep);

      if (response && response.length > 0) {
        const totalFreteCalculado = response.reduce(
          (acc, item) => acc + item.price,
          0
        );

        // response traz todos os fretes - vc pode pegar o valor referente ao produto e exibir no card
        console.log(response);
        console.log(enderecoSelecionado);

        // aqui ele soma o valor de todos os fretes - esse cara vc vai exibir no resumo do pedido
        // no card vc vai pegar um frete de cada e exibir no produto correspondente - pode pegar como base o layout da shopee e inserir uma coluna de frete e colocar o preco do frete. 
        // abaixo do produto exibir as informacoes do frete igual exibia antes nas formas de envio (deixei essa tela de backup, ai vc volta ela e ver quais eram as informações.)
        // caso precise acessar a funcao que calcula o frete pra ver os objetos retornados, fica em hooks
        setValorFrete(totalFreteCalculado);

        
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    const productsInCart = localStorage.getItem("@wesellItemsInCart");
    const productsFreight =
      JSON.parse(localStorage.getItem("@wesellItemsFreight")) || [];
    const products = JSON.parse(productsInCart) || [];
    setProdutos(products);
    setProdutosComFrete(productsFreight);

    const subtotalCalculado = products.reduce(
      (acc, produto) => acc + produto.precoPromocional * produto.qtd,
      0
    );
    const quantidadeTotal = products.reduce(
      (acc, produto) => acc + produto.qtd,
      0
    );
    setQuantidadeTotalProdutos(quantidadeTotal);
    setSubtotal(subtotalCalculado);
    setTotal(subtotalCalculado);
    async function getAddress() {
      try {
        const response = await axios.get(
          `${url_base}/clienteEnderecos/cliente/${
            client.id || client.idCliente
          }`
        );

        if (response.data && response.data.length > 0) {
          setAddresses(response.data);
          setEnderecoSelecionado(response.data[0].idClienteEndereco);
          setEndereco(response.data[0]);

          await handleCalculaFrete(productsFreight, response.data[0].cep);
        } else {
          setExibirFormulario(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getAddress();
  }, []);

  const handleEnderecoChange = async (id, item) => {
    setEnderecoSelecionado(id);
    setEndereco(item);

    await handleCalculaFrete(produtosComFrete, item.cep);
  };

  const handleSalvarEndereco = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    try {
      const response = await axios.post(`${url_base}/clienteEnderecos`, {
        clienteId: client.id || client.idCliente,
        nomeEndereco: valoresFormulario.nomeEndereco,
        cep: limparMascara(valoresFormulario.cep),
        logradouro: valoresFormulario.logradouro,
        complemento: valoresFormulario.complemento,
        numero: valoresFormulario.numero,
        bairro: valoresFormulario.bairro,
        uf: valoresFormulario.uf,
        municipio: valoresFormulario.municipio,
      });

      setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      setEnderecoSelecionado(response.data.idClienteEndereco);
      setEndereco(response.data);
      await handleCalculaFrete(produtosComFrete, valoresFormulario.cep);
      setExibirFormulario(false);
    } catch (error) {
      console.error("Erro ao salvar o endereço:", error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const toggleFormulario = () => {
    setExibirFormulario(!exibirFormulario);
    setValoresFormulario({
      nomeEndereco: "",
      cep: "",
      logradouro: "",
      complemento: "",
      numero: "",
      bairro: "",
      uf: "",
      municipio: "",
    });
  };

  const handleEditarEndereco = (endereco) => {
    setEditandoEndereco(true);
    setExibirFormulario(true);

    setValoresFormulario({
      nomeEndereco: endereco.nomeEndereco,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      complemento: endereco.complemento,
      numero: endereco.numero,
      bairro: endereco.bairro,
      uf: endereco.uf,
      municipio: endereco.municipio,
    });

    setEnderecoSelecionado(endereco.idClienteEndereco);
    setEndereco(endereco);
  };

  const handleAtualizarEndereco = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const objeto = {
      idClienteEndereco: enderecoSelecionado,
      clienteId: endereco.clienteId,
      ativo: "S",
      nomeEndereco: valoresFormulario.nomeEndereco,
      logradouro: valoresFormulario.logradouro,
      numero: valoresFormulario.numero,
      complemento: valoresFormulario.complemento,
      cep: limparMascara(valoresFormulario.cep),
      municipio: valoresFormulario.municipio,
      uf: valoresFormulario.uf,
      bairro: valoresFormulario.bairro,
    };

    try {
      const response = await axios.put(`${url_base}/clienteEnderecos`, objeto);
      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr.idClienteEndereco === enderecoSelecionado ? response.data : addr
        )
      );
      setEnderecoSelecionado(response.data.idClienteEndereco);
      setEndereco(response.data);
      await handleCalculaFrete(produtosComFrete, valoresFormulario.cep);
      setExibirFormulario(false);
      setEditandoEndereco(false);
    } catch (error) {
      console.error("Erro ao atualizar o endereço:", error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const fetchAddressFromCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      return null;
    }
  };

  const handleCEPChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length == 8) {
      const addressData = await fetchAddressFromCEP(cep);

      if (addressData) {
        const { logradouro, bairro, localidade, uf } = addressData;

        setValoresFormulario((prevState) => ({
          ...prevState,
          logradouro: logradouro,
          bairro: bairro,
          municipio: localidade,
          uf: uf,
        }));
      }
    }
  };

  function irParaPagamento() {
    const data = {
      endereco: endereco,
      lojista: produtos[0].lojista,
      resumo: {
        qtdProdutos: quantidadeTotalProdutos,
        qtdFretes: produtosComFrete.length,
        subtotal: subtotal,
        valorFrete: valorFrete,
        total: total + valorFrete,
      },
    };

    localStorage.setItem("@wesellOrderData", JSON.stringify(data));
    navigate("pagamentos");
  }

  return (
    <div className={styles.containerCart}>
      <section className={`container ${styles.contentCart}`}>
        <div className={`${styles.sectionItensCarrinho}`}>
          <section className={`${styles.cardItensCarrinho} card`}>
            {loading ? (
              <>
                <div className={styles.titleCarrinho}>
                  <h5 className="d-flex align-items-center gap-2">
                    <MdOutlineLocationOn size={25} /> Endereço de entrega
                  </h5>
                </div>
                <div
                  className={`${styles.cardEndereco} card rounded-1 px-3 py-2`}
                >
                  <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-10"></span>
                    <span className="placeholder col-6"></span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {!exibirFormulario ? (
                  <>
                    <div className={styles.titleCarrinho}>
                      <h5 className="d-flex align-items-center gap-2">
                        <MdOutlineLocationOn size={25} /> Endereço de entrega
                      </h5>
                    </div>
                    {addresses.map((item) => (
                      <div
                        key={item.idClienteEndereco}
                        className={`${
                          styles.cardEndereco
                        } card rounded-1 px-3 py-2 ${
                          enderecoSelecionado == item.idClienteEndereco
                            ? styles.radioSelected
                            : ""
                        }`}
                      >
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="endereco"
                            id={item.idClienteEndereco}
                            checked={
                              enderecoSelecionado == item.idClienteEndereco
                            }
                            onChange={(e) =>
                              handleEnderecoChange(e.target.id, item)
                            }
                          />
                          <label
                            className={`ms-3 form-check-label`}
                            htmlFor={item.idClienteEndereco}
                          >
                            <span className="fw-semibold">
                              {`${item.nomeEndereco}`}
                            </span>
                            <br />
                            {`${item.logradouro}, ${item.bairro}, ${item.numero}, ${item.cep}`}
                            <br />
                            {item.municipio} - {item.uf}
                            
                          </label>
                          <span
                            className="ms-auto text-primary fw-medium"
                            onClick={() => handleEditarEndereco(item)}
                            id={styles.editar}
                          >
                            Editar
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-light btn-sm text-dark"
                        onClick={() => navigate("/carrinho")}
                      >
                        <FiArrowLeft size={18} /> Voltar
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={toggleFormulario}
                      >
                        Adicionar endereço
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.titleCarrinho}>
                      <h5 className="d-flex align-items-center gap-2">
                        {editandoEndereco ? (
                          <MdOutlineEditLocation size={25} />
                        ) : (
                          <MdOutlineAddLocation size={25} />
                        )}
                        {editandoEndereco
                          ? "Editar endereço"
                          : "Adicionar endereço"}
                      </h5>
                    </div>
                    <form
                      onSubmit={
                        editandoEndereco
                          ? handleAtualizarEndereco
                          : handleSalvarEndereco
                      }
                    >
                      <div className="row g-3 mb-3">
                        <div className="col">
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Destinatário*"
                            aria-label="Destinatário*"
                            name="nomeEndereco"
                            value={valoresFormulario.nomeEndereco}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                nomeEndereco: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="col">
                          <ReactInputMask
                            type="tel"
                            required
                            mask="99999-999"
                            maskChar={null}
                            className="form-control"
                            placeholder="CEP*"
                            aria-label="CEP*"
                            name="cep"
                            value={valoresFormulario.cep}
                            onBlur={handleCEPChange}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                cep: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col">
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="UF*"
                            aria-label="UF*"
                            name="uf"
                            value={valoresFormulario.uf}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                uf: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Município*"
                            aria-label="Município*"
                            autoComplete="off"
                            name="municipio"
                            value={valoresFormulario.municipio}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                municipio: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col">
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Bairro*"
                            aria-label="Bairro*"
                            name="bairro"
                            value={valoresFormulario.bairro}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                bairro: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Logradouro* (Rua, Avenida...)"
                            aria-label="Logradouro* (Rua, Avenida...)"
                            name="logradouro"
                            value={valoresFormulario.logradouro}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                logradouro: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col">
                          <input
                            type="tel"
                            required
                            className="form-control"
                            placeholder="Número*"
                            aria-label="Número*"
                            name="numero"
                            value={valoresFormulario.numero}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                numero: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Complemento"
                            aria-label="Complemento"
                            name="complemento"
                            value={valoresFormulario.complemento}
                            onChange={(e) =>
                              setValoresFormulario((prevState) => ({
                                ...prevState,
                                complemento: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      {addresses.length > 0 ? (
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-outline-light btn-sm text-dark"
                            onClick={toggleFormulario}
                          >
                            <FiArrowLeft size={18} /> Voltar
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                            disabled={loadingBtn}
                          >
                            {loadingBtn ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                {editandoEndereco
                                  ? "Atualizando..."
                                  : "Salvando..."}
                              </>
                            ) : (
                              <>
                                <MdSaveAlt size={18} />
                                {editandoEndereco
                                  ? "Atualizar Endereço"
                                  : "Salvar Endereço"}
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                            disabled={loadingBtn}
                          >
                            {loadingBtn ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                {editandoEndereco
                                  ? "Atualizando..."
                                  : "Salvando..."}
                              </>
                            ) : (
                              <>
                                <MdSaveAlt size={18} />
                                {editandoEndereco
                                  ? "Atualizar Endereço"
                                  : "Salvar Endereço"}
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </form>
                  </>
                )}
              </>
            )}
          </section>
          {/* {frete && (
            <section className={`${styles.cardItensCarrinho} card`}>
              <div className={styles.titleCarrinho}>
                <h5 className="d-flex align-items-center gap-2">
                  <MdOutlineLocalShipping size={25} /> Formas de envio
                </h5>
              </div>
              <div className="d-flex px-4" id={styles.headerFretes}>
                <div className="col">
                  <p className="mb-0">Transportadora</p>
                </div>

                <div className="col">
                  <p className="mb-0">Modalidade</p>
                </div>

                <div className="col">
                  <p className="mb-0">Prazo Estimado</p>
                </div>

                <div className="col text-end">
                  <p className="mb-0">Preço</p>
                </div>
              </div>

              <div
                key={frete.id}
                className={`${styles.cardEndereco} card rounded-1 px-3 py-2 ${styles.radioSelected}`}
              >
                <div className="form-check d-flex align-items-center py-3 mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={frete.name}
                    id={frete.name}
                    checked={true}
                  />
                  <label
                    className={`ms-2 pe-2 form-check-label col-12 d-flex justify-content-between`}
                    htmlFor={frete.name}
                  >
                    <div className="col">
                      <img
                        src={frete?.picture}
                        alt={frete?.alt}
                        className={styles.imgFrete}
                      />
                    </div>

                    <div className="col">
                      <p className="mb-0">{frete?.name}</p>
                    </div>

                    <div className="col">
                      <p className="mb-0">
                        {frete?.delivery_range?.min} -{" "}
                        {frete?.delivery_range?.max} dias úteis
                      </p>
                    </div>

                    <div className="col text-end">
                      <p className="fw-semibold mb-0">
                        {formatPriceBR(frete?.price)}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </section>
          )} */}
        </div>
        <ResumoPedido
          disabled={exibirFormulario}
          continuarCompra={irParaPagamento}
          quantidadeItens={quantidadeTotalProdutos}
          quantidadeFretes={produtosComFrete.length}
          subtotal={subtotal}
          total={total}
          showAreaFrete={true}
          valorFrete={valorFrete}
        />
      </section>
    </div>
  );
}
