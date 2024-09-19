import axios from "axios";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import { url_base } from "../../../services/apis";

/* eslint-disable react/prop-types */
export default function Etapa2({
  handleChange,
  formData,
  nextStep,
  previousStep,
}) {
  const [passwordConfirmed, setPasswordConfirmed] = useState(null);
  const [cpfValido, setCpfValido] = useState(true);

  const isFormValid = () => {
    return (
      formData.cpf &&
      formData.celular &&
      formData.senha &&
      passwordConfirmed &&
      cpfValido
    );
  };

  const arePasswordsEqual = () => {
    return formData.senha === passwordConfirmed;
  };

  const handleNextStep = () => {
    if (isFormValid() && arePasswordsEqual()) {
      nextStep();
    } else if (!arePasswordsEqual()) {
      toast.error("Senhas não coincidem.");
    } else if (!cpfValido) {
      toast.error("Esse CPF já existe.");
    } else {
      toast.error("Preencha todos os campos.");
    }
  };

  const verificarCPF = async () => {
    try {
      const cpfLimpo = formData.cpf.replace(/\D/g, "");

      const response = await axios.get(
        `${url_base}/clientes/verificar-cpf?cpf=${cpfLimpo}`
      );

      if (response) {
        setCpfValido(true);
      }
    } catch (error) {
      console.log(error);
      setCpfValido(false);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="etapa2">
      <div className="form-floating mb-3">
        <ReactInputMask
          mask="999.999.999-99"
          maskChar={null}
          type="tel"
          className="form-control"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="CPF*"
          onBlur={verificarCPF}
          autoComplete="off"
          required
        />
        <label htmlFor="cpf">CPF*</label>
      </div>
      <div className="form-floating mb-3">
        <ReactInputMask
          mask="(99) 99999-9999"
          maskChar={null}
          type="tel"
          className="form-control"
          id="celular"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          placeholder="Celular*"
          autoComplete="off"
          required
        />
        <label htmlFor="celular">Celular*</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Senha*"
          autoComplete="off"
          required
        />
        <label htmlFor="senha">Senha*</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="passwordConfirmed"
          name="passwordConfirmed"
          value={passwordConfirmed}
          onChange={(e) => setPasswordConfirmed(e.target.value)}
          placeholder="passwordConfirmed*"
          autoComplete="off"
          required
        />
        <label htmlFor="passwordConfirmed">Confirme a senha*</label>
      </div>
      <div className="btns-wizard">
        <button className="btn btn-primary me-2 col-6" onClick={previousStep}>
          Anterior
        </button>
        <button className="btn btn-primary col-6" onClick={handleNextStep}>
          Próximo
        </button>
      </div>
    </div>
  );
}
