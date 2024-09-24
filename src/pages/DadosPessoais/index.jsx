import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import { url_base } from "../../services/apis";
import styles from "./dadosPessoais.module.css";
import InputPasswordToggle from "../../components/InputPasswordToggle";
import useContexts from "../../hooks/useContext";
import { useNavigate } from "react-router-dom";

export default function DadosPessoais() {
  const { client, setClient, storageClient } = useContexts();

  const currentDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    id: null,
    nomeSocial: null,
    nomeCompleto: null,
    bairro: null,
    email: null,
    genero: null,
    cpf: null,
    dataNascimento: null,
    celular: null,
    cep: null,
    uf: null,
    municipio: null,
    endereco: null,
    numero: null,
    complemento: null,
  });
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [alteraSenha, setAlteraSenha] = useState("N");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getDados() {
      await axios
        .get(url_base + `/clientes/${client.id || client.idCliente}`)
        .then((response) => {
          const dados = response.data;

          setFormData({
            idCliente: client.id ? client.id : client.idCliente,
            nomeCompleto: dados.nomeCompleto,
            nomeSocial: dados.nomeSocial,
            email: dados.email,
            genero: dados.genero,
            dataNascimento: dados.dataNascimento,
            celular: dados.celular,
            cep: dados.cep,
            uf: dados.uf,
            cpf: dados.cpf,
            municipio: dados.municipio,
            endereco: dados.endereco,
            bairro: dados.bairro,
            numero: dados.numero,
            complemento: dados.complemento,
            emailNotific: dados.emailNotific,
            celularNotific: dados.celularNotific,
          });
        })
        .catch(() => {
          toast.error("Erro ao buscar dados.");
        })
        .finally(() => {
          Swal.close();
        });
    }

    if (!client) {
      navigate("/login");
    } else {
      Swal.showLoading();
      getDados();
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    setIsFormDirty(true);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setIsFormDirty(true);
  };

  function limparMascara(valor, campo) {
    if (campo === "cpf" || campo === "celular" || campo === "cep") {
      return valor ? valor.replace(/[^\d]+/g, "") : "";
    }
    return valor;
  }
  const handleAlteraSenha = (event) => {
    const isChecked = event.target.checked;

    const novoEstado = isChecked ? "S" : "N";

    setAlteraSenha(novoEstado);
  };

  async function alteraSenhaUsuario() {
    const formDataLimpo = {};

    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        formDataLimpo[key] = limparMascara(formData[key], key);
      }
    }

    if (senhaConfirm !== senha) {
      return toast.error("Senhas não conferem!");
    }
    if (senha) {
      formDataLimpo.senha = senha;
    }

    await axios
      .put(url_base + `/clientes/${client.id ? client.id : client.idCliente}`, formDataLimpo)
      .then(() => {
        toast.success("Alterado com sucesso.");
      })
      .catch(() => {
        toast.error("Erro ao alterar senha.");
      })
      .finally(() => {
        delete formDataLimpo.senha;
        setSenha("");
        setSenhaConfirm("");
        setAlteraSenha("N");
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsFormDirty(false);
    Swal.showLoading();

    const formDataLimpo = {};

    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        formDataLimpo[key] = limparMascara(formData[key], key);
      }
    }
    await axios
      .put(url_base + `/clientes/${client.id ? client.id : client.idCliente}`, formDataLimpo)
      .then((response) => {
        let resData = response.data
        resData.id = response.data.idCliente
        storageClient(resData);
        setClient(resData);
        toast.success("Atualizado com sucesso.");
      })
      .catch(() => {
        console.log(formDataLimpo)
        console.log(client.id ? client.id : client.idCliente)
        toast.error("Erro ao atualizar dados.");
      })
      .finally(() => {
        Swal.close();
      });
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={`content-user ${styles.contentUser}`}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Minha conta</h2>
          <p className="text-center">
            Edite as informações da sua conta e altere sua senha aqui.
          </p>
          <div className="col-md-12 mt-4">
            <span className="form-text fs-5 text">Dados da conta</span>
            <hr className="mt-2" />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control form-control-lg ${styles.disabled}`}
              id="email"
              value={formData.email}
              readOnly
            />
          </div>

          <div className="mb-3 d-flex gap-3">
            <label htmlFor="alteraSenha" className="form-label">
              Alterar senha atual?
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="alteraSenha"
                value={alteraSenha}
                checked={alteraSenha === "S"}
                onChange={(e) => handleAlteraSenha(e)}
              />
            </div>
          </div>
          <div className="mb-3">
            <InputPasswordToggle
              id="senha"
              value={senha}
              disabled={alteraSenha}
              placeholder="Digite a senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <InputPasswordToggle
              disabled={alteraSenha}
              id="confirmSenha"
              value={senhaConfirm}
              placeholder="Confirme a senha"
              onChange={(e) => setSenhaConfirm(e.target.value)}
            />
          </div>
          <button
            type="button"
            id="btn-altera-senha"
            disabled={alteraSenha === "N"}
            className="btn btn-secondary mb-3"
            onClick={alteraSenhaUsuario}
          >
            Alterar senha
          </button>
          <div className="mt-2">
            <span className="form-text fs-5 text">Dados pessoais</span>
            <hr className="mt-2" />
          </div>

          <div className="mb-4 mt-4">
            <label htmlFor="nomeCompleto" className="form-label">
              Nome completo
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="nomeCompleto"
              required
              autoComplete="off"
              value={formData.nomeCompleto}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="nomeSocial" className="form-label">
              Nome social
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="nomeSocial"
              autoComplete="off"
              value={formData.nomeSocial}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <ReactInputMask
              mask="999.999.999-99"
              maskChar={null}
              type="text"
              className={`form-control form-control-lg ${styles.disabled}`}
              id="cpf"
              name="cpf"
              value={formData.cpf}
              readOnly
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Gênero</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="feminino"
                  value="F"
                  checked={formData.genero === "F"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="feminino">
                  Feminino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="masculino"
                  value="M"
                  checked={formData.genero === "M"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="masculino">
                  Masculino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="naoInformar"
                  value="N"
                  checked={formData.genero === "N"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="naoInformar">
                  Não informar
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="dataNascimento" className="form-label">
              Data de nascimento
            </label>
            <input
              type="date"
              className="form-control form-control-lg"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              max={currentDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="celular" className="form-label">
              Celular
            </label>
            <ReactInputMask
              mask="(99) 99999-9999"
              maskChar={null}
              type="text"
              className="form-control form-control-lg"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mt-2">
            <span className="form-text fs-5 text">Endereço</span>
            <hr className="mt-2" />
          </div>
          <div className="my-4 d-flex justify-content-between">
            <div className="col-6">
              <label htmlFor="cep" className="form-label">
                CEP
              </label>
              <ReactInputMask
                mask="99999-999"
                maskChar={null}
                type="tel"
                className="form-control form-control-lg"
                id="cep"
                name="cep"
                value={formData.cep}
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles.areaUf} col-6`}>
              <label htmlFor="uf" className="form-label">
                UF
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="uf"
                name="uf"
                value={formData.uf}
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-between">
            <div className="col-6">
              <label htmlFor="cep" className="form-label">
                Município
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="municipio"
                value={formData.municipio}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles.areaUf} col-6`}>
              <label htmlFor="bairro" className="form-label">
                Bairro
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="endereco" className="form-label">
              Logradouro
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="numero" className="form-label">
              Número
            </label>
            <input
              type="tel"
              className="form-control form-control-lg"
              id="numero"
              name="numero"
              value={formData.numero}
              autoComplete="off"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="complemento" className="form-label">
              Complemento (Opcional)
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="complemento"
              autoComplete="off"
              value={formData.complemento}
              onChange={handleInputChange}
            />
          </div>

          <div className={`${styles.btns} col-12`}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormDirty}
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
