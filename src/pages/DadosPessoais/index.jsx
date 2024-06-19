import { useState, useEffect } from "react";
import axios from "axios";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import { url_base } from "../../services/apis";
import styles from "./dadosPessoais.module.css";
import InputPasswordToggle from "../../components/InputPasswordToggle";

export default function DadosPessoais() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmCassword, setConfirmPassword] = useState('')
  const [user, setUser] = useState('')
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')

  return (
    <div className={`container ${styles.container}`}>
      <div className={`content-user ${styles.contentUser}`}>
        <form onSubmit={''/*handleSubmit*/}>
          <h2 className="text-center">Minha conta</h2>
          <p className="text-center">
            Edite as configurações da sua conta e altere sua senha aqui.
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
              value={''}
              readOnly
            />
          </div>

          <div className="mb-3 d-flex gap-3">
            <label htmlFor="senha" className="form-label">
              Alterar senha atual?
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="alteraSenha"
                onChange={''}
              />
            </div>
          </div>
          <div className="mb-3">
            <InputPasswordToggle
              id="senha"
              value={''}
              disabled={''}
              placeholder="Digite a senha"
              onChange={''}
            />
          </div>
          <div className="mb-3">
            <InputPasswordToggle
              disabled={'alteraSenha'}
              id="confirmSenha"
              value={''}
              placeholder="Confirme a senha"
              onChange={''}
            />
          </div>
          <button
            type="button"
            id="btn-altera-senha"
            disabled={'' === "N"}
            className="btn btn-secondary mb-3"
            onClick={''}
          >
            Alterar senha
          </button>

          <div className="mb-4 mt-4">
            <label htmlFor="nome" className="form-label">
              Nome completo
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="nome"
              required
              autoComplete="off"
              value={''}
              onChange={''}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <ReactInputMask
              mask="999.999.999-99"
              maskChar={null}
              type="tel"
              className={`form-control form-control-lg ${styles.disabled}`}
              id="cpf"
              name="cpf"
              value={''}
              readOnly
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="usuario" className="form-label">
              Usuário
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="usuario"
              required
              autoComplete="off"
              value={''}
              onChange={''}
            />
          </div>
          <div className="col-12 btns-minha-conta">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={''}
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
