import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { url_base } from "../services/apis";
import { toast } from "react-toastify";

export const ClienteContext = createContext({});

ClienteProvider.propTypes = {
  children: PropTypes.node,
};

export default function ClienteProvider({ children }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function getCategorias() {
      await axios
        .get(url_base + "/categorias/ativos")
        .then((response) => {
          setCategorias(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getCategorias();
  }, []);

  const dados = {
    categorias,
  };

  return (
    <ClienteContext.Provider value={dados}>
      {children}
    </ClienteContext.Provider>
  );
}
