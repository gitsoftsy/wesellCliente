import { useEffect, useState } from "react";
import styles from "./endereco.module.css";
import formatCurrencyBR from "../../hooks/formatCurrency";
import ReactInputMask from "react-input-mask";
import {
  MdOutlineAddLocation,
  MdOutlineEditLocation,
  MdOutlineLocalShipping,
  MdOutlineLocationOn,
  MdSaveAlt,
} from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Endereco() {
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [total, setTotal] = useState(0);
  const [exibirFormulario, setExibirFormulario] = useState(false);

  const [editandoEndereco, setEditandoEndereco] = useState(false);
  const [valoresFormulario, setValoresFormulario] = useState({
    id: '',
    nome: "",
    sobrenome: "",
    cep: "",
    endereco: "",
    complemento: "",
    numero: "",
    bairro: "",
    estado: "",
    cidade: "",
    celular: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const productsInCart = localStorage.getItem("wesell-items-in-cart");
    const addressesStorage = localStorage.getItem("wesell-customer-addresses");
    const products = JSON.parse(productsInCart) || [];
    const addresses = JSON.parse(addressesStorage) || [];
    const trueOrFalse = addresses.length > 0 ? false : true;

    setExibirFormulario(trueOrFalse);
    if (addresses.length > 0) {
      setEnderecoSelecionado(addresses[0].id);
    }

    const subtotalCalculado = products.reduce(
      (acc, produto) => acc + produto.preco * produto.qtd,
      0
    );
    const quantidadeTotal = products.reduce(
      (acc, produto) => acc + produto.qtd,
      0
    );
    setAddresses(addresses);
    setQuantidadeTotalProdutos(quantidadeTotal);
    setTotal(subtotalCalculado);
  }, []);

  const handleEnderecoChange = (e) => {
    setEnderecoSelecionado(e.target.id);
  };

  const handleSalvarEndereco = (e) => {
    e.preventDefault();

    const {
      id,
      nome,
      sobrenome,
      cep,
      endereco,
      complemento,
      numero,
      bairro,
      estado,
      cidade,
      celular,
    } = valoresFormulario;

    const novoEndereco = {
      id: id || new Date().getTime(),
      nome,
      sobrenome,
      cep,
      endereco,
      complemento,
      numero,
      bairro,
      estado,
      cidade,
      celular,
    };

    let addresses =
      JSON.parse(localStorage.getItem("wesell-customer-addresses")) || [];

    const enderecoExistente = addresses.find((addr) => addr.id == id);
    if (enderecoExistente && editandoEndereco) {
      addresses = addresses.map((addr) =>
        addr.id == id ? novoEndereco : addr
      );
    } else {
      addresses.push(novoEndereco);
      setEnderecoSelecionado(novoEndereco.id);
    }

    localStorage.setItem(
      "wesell-customer-addresses",
      JSON.stringify(addresses)
    );

    setAddresses(addresses);
    setExibirFormulario(false);
    setEditandoEndereco(false);
    setValoresFormulario({
      id: '',
      nome: "",
      sobrenome: "",
      cep: "",
      endereco: "",
      complemento: "",
      numero: "",
      bairro: "",
      estado: "",
      cidade: "",
      celular: "",
    });
  };

  const toggleFormulario = () => {
    setExibirFormulario(!exibirFormulario);
    setEditandoEndereco(false);
    setValoresFormulario({
      id: '',
      nome: "",
      sobrenome: "",
      cep: "",
      endereco: "",
      complemento: "",
      numero: "",
      bairro: "",
      estado: "",
      cidade: "",
      celular: "",
    });
  };

  const handleEditarEndereco = (endereco) => {
    setEditandoEndereco(true);
    setExibirFormulario(true);

    setValoresFormulario({
      id: endereco.id,
      nome: endereco.nome,
      sobrenome: endereco.sobrenome,
      cep: endereco.cep,
      endereco: endereco.endereco,
      complemento: endereco.complemento,
      numero: endereco.numero,
      bairro: endereco.bairro,
      estado: endereco.estado,
      cidade: endereco.cidade,
      celular: endereco.celular,
    });

    setEnderecoSelecionado(endereco.id);
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
          endereco: logradouro,
          bairro: bairro,
          cidade: localidade,
          estado: uf,
        }));
      }
    }
  };

  function irParaPagamento() {
    navigate("pagamentos");
  }

  return (
    <div className={styles.containerCart}>
      <section className={`container ${styles.contentCart}`}>
        <div className={`${styles.sectionItensCarrinho}`}>
          <section className={`${styles.cardItensCarrinho} card`}>
            {!exibirFormulario ? (
              <>
                <div className={styles.titleCarrinho}>
                  <h5 className="d-flex align-items-center gap-2">
                    <MdOutlineLocationOn size={25} /> Endereço de entrega
                  </h5>
                </div>
                {addresses.map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      styles.cardEndereco
                    } card rounded-1 px-3 py-2 ${
                      enderecoSelecionado == item.id
                        ? styles.radioSelected
                        : ""
                    }`}
                  >
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="endereco"
                        id={item.id}
                        checked={enderecoSelecionado == item.id}
                        onChange={handleEnderecoChange}
                      />
                      <label
                        className={`ms-3 form-check-label`}
                        htmlFor={item.id}
                      >
                        <span className="fw-semibold">
                          {`${item.nome} ${item.sobrenome}`}
                        </span>
                        <br />
                        {`${item.endereco}, ${item.bairro}, ${item.numero}, ${item.cep}`}
                        <br />
                        {item.cidade} - {item.estado}
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
                <div className="text-end">
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
                <form onSubmit={handleSalvarEndereco}>
                  <div className="row g-3 mb-3">
                    <div className="col">
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Nome*"
                        aria-label="Nome*"
                        name="nome"
                        value={valoresFormulario.nome}
                        onChange={(e) =>
                          setValoresFormulario((prevState) => ({
                            ...prevState,
                            nome: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Sobrenome*"
                        aria-label="Sobrenome*"
                        name="sobrenome"
                        value={valoresFormulario.sobrenome}
                        onChange={(e) =>
                          setValoresFormulario((prevState) => ({
                            ...prevState,
                            sobrenome: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
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
                    <div className="col">
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Endereço* (Rua, Avenida...)"
                        aria-label="Endereço* (Rua, Avenida...)"
                        name="endereco"
                        value={valoresFormulario.endereco}
                        onChange={(e) =>
                          setValoresFormulario((prevState) => ({
                            ...prevState,
                            endereco: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
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
                        placeholder="Cidade*"
                        aria-label="Cidade*"
                        autoComplete="off"
                        name="cidade"
                        value={valoresFormulario.cidade}
                        onChange={(e) =>
                          setValoresFormulario((prevState) => ({
                            ...prevState,
                            cidade: e.target.value,
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
                        placeholder="Estado*"
                        aria-label="Estado*"
                        name="estado"
                        value={valoresFormulario.estado}
                        onChange={(e) =>
                          setValoresFormulario((prevState) => ({
                            ...prevState,
                            estado: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="col">
                      <ReactInputMask
                        type="tel"
                        mask="(99) 99999-9999"
                        required
                        maskChar={null}
                        className="form-control"
                        placeholder="Celular*"
                        aria-label="Celular*"
                        name="celular"
                        value={valoresFormulario.celular}
                        onChange={(e) =>
                          setValoresFormulario((prevState) => ({
                            ...prevState,
                            celular: e.target.value,
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
                      >
                        <MdSaveAlt size={18} /> Salvar Endereço
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                      >
                        <MdSaveAlt size={18} /> Salvar Endereço
                      </button>
                    </div>
                  )}
                </form>
              </>
            )}
          </section>
          {!exibirFormulario && (
            <section className={`${styles.cardItensCarrinho} card`}>
              <div className={styles.titleCarrinho}>
                <h5 className="d-flex align-items-center gap-2">
                  <MdOutlineLocalShipping size={25} /> Formas de envio
                </h5>
              </div>
              <div
                className={`${styles.cardEndereco} card rounded-1 px-3 py-2 ${styles.radioSelected}`}
              >
                <div className="form-check d-flex align-items-center py-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="melhorEnvio"
                    id="melhorEnvio"
                    checked={true}
                  />
                  <label
                    className={`ms-3 pe-2 form-check-label col-12 d-flex justify-content-between`}
                    htmlFor="melhorEnvio"
                  >
                    <span>Melhor Envio - de 1 a 20 dias úteis</span>
                    <span className="fw-semibold">R$ 25,37</span>
                  </label>
                </div>
              </div>
            </section>
          )}
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

          <button
            type="button"
            className="btn btn-primary"
            disabled={exibirFormulario}
            onClick={irParaPagamento}
          >
            Continuar
          </button>
        </div>
      </section>
    </div>
  );
}
