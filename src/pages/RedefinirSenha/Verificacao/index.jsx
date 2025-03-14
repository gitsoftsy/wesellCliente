import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logoWesell.svg";
import styles from "./verificacao.module.css";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    navigate("/redefinit-senha/mudar-senha");
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
            <h2>Verificação necessária</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="codigo">
                Para recuperar sua senha, digite seu email e siga as instruções
                formecidas.<span>*</span>
              </label>
              <input
                type="number"
                id="codigo"
                name="codigo"
                placeholder="Código"
                value={codigo}
                maxLength={4}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 4);
                  setCodigo(value);
                }}
                required
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
