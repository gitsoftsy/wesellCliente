import styles from "./mudar-senha.module.css";
import Logo from "../../../assets/logoWesell.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MudarSenha() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("");
  };

  return (
    <main className={`${styles.containerAcesso}`}>
      <img src={Logo} alt="Logo wecommerce" />
      <form onSubmit={handleSubmit} className={`${styles.formulario}`}>
        <h1>Criar nova senha</h1>
        <div className="w-100">
          <label htmlFor="senha">
            Insira a nova senha<span>*</span>
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={senha}
            maxLength={4}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmarSenha">
            Insira a senha nova mais uma vez<span>*</span>
          </label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            maxLength={4}
            onChange={(e) => {
              setConfirmarSenha(e.target.value);
            }}
            required
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
