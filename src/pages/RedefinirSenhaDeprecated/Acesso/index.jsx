import styles from "./acesso.module.css";
import Logo from "../../../assets/logoWesell.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Acesso() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

    const handleSubmit  = () => {
        navigate('/redefinit-senha/verificacao')
    }

  return (
    <main className={`${styles.containerAcesso}`}>
      <img src={Logo} alt="Logo wecommerce" />
      <form onSubmit={handleSubmit} className={`${styles.formulario}`}>
        <h1>Acesso</h1>
        <label htmlFor="email">
          Para recuperar sua senha, digite seu email e siga as instruções
          formecidas.<span>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Continuar</button>
      </form>
    </main>
  );
}
