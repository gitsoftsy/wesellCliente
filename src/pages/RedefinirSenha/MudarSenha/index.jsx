import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logoWesell.svg";
import styles from "./mudarSenha.module.css";
import { toast } from "react-toastify";

export default function MudarSenha() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    toast.success('Senha alterada com sucesso')
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <section className={styles.boxWesell}>
          <div className={styles.sloganCompany}>
            <img className={styles.logoCompany} src={logo} alt="logo" />
            <h1 className={styles.h1Company}>
              Nunca foi tão fácil transformar o que você sabe em um negócio
              digital.
            </h1>
            <p>
              Vamos te ajudar a recuperar sua senha.
              <br /> Sigas os passos.
            </p>
          </div>
        </section>
        <section className={styles.boxLogin}>
          <img className={styles.logoCompany} src={logo} alt="logo" />
          <div className={styles.loginForm}>
            <h2>Criar nova senh</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="password">
                Insira a nova senha:<span>*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword">
              Insira a senha nova mais uma vez:<span>*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit">
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Salvar"
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
      <footer>
        Copyright @ 2000-2024 - Todos os direitos reservados - Desenvolvido pela
        Softsy
      </footer>
    </div>
  );
}
