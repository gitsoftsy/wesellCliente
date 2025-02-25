import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logoWesell.svg";
import styles from "./acesso.module.css";

export default function Acesso() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    navigate('/redefinit-senha/verificacao')
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
            <h2>Acesso</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                Para recuperar sua senha, digite seu email e siga as instruções
                formecidas.<span>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email"
              />
              <button type="submit">
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Continuar"
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
