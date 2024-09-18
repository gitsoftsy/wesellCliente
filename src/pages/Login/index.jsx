import { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import logo from "../../assets/logoWesell.svg";
import { useNavigate } from "react-router-dom";
import { url_base } from "../../services/apis";
import { toast } from "react-toastify";
import useContexts from "../../hooks/useContext";

export default function Login() {
  const routeOnCar = localStorage.getItem("@wesellRouteOnCar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { storageClient, setClient } = useContexts();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    let dadosLogin = {
      email: email,
      senha: password,
      perfil: "CLIENTE",
    };

    await axios
      .post(url_base + `/login`, dadosLogin)
      .then((response) => {
        const statusPage = JSON.parse(localStorage.getItem("statusPage"));
        storageClient(response.data);
        setClient(response.data);

        if (statusPage == undefined) {
          if (routeOnCar) {
            navigate("/carrinho");
          } else {
            navigate("/home");
          }
        } else {
          navigate(statusPage.url);
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response.status)
        if (error.response.status == 403) {
          toast.error("Email ou senha inválidos.");
          setLoading(false);
        } else {
          toast.error("Email ou senha inválidos.");
          setLoading(false);
        }
      });
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
              Vamos te ajudar desde os primeiros passos.
              <br /> Cadastre-se grátis.
            </p>
          </div>
        </section>
        <section className={styles.boxLogin}>
          <img className={styles.logoCompany} src={logo} alt="logo" />
          <div className={styles.loginForm}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                E-mail:<span>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">
                Senha:<span>*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
            <p>
              Caso ainda não tenha cadastro, clique <a href="/signup">Aqui!</a>
            </p>
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
