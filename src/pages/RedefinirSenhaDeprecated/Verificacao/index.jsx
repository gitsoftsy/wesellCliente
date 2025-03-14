import styles from "./verificacao.module.css";
import Logo from "../../../assets/logoWesell.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/redefinit-senha/mudar-senha");
  };

  return (
    <main className={`${styles.containerAcesso}`}>
      <img src={Logo} alt="Logo wecommerce" />
      <form onSubmit={handleSubmit} className={`${styles.formulario}`}>
        <h1>Verificação necessária</h1>
        <label htmlFor="codigo">
          Para continuar, conclua esta etapa de verificação. Enviamos um código
          para o email.<span>*</span>
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
        <button type="submit">Continuar</button>
      </form>
    </main>
  );
}
