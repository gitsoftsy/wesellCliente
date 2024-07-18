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
  const [client, setClient] = useState(
    JSON.parse(localStorage.getItem("wesell-login-cliente"))
  );
  const [valueSearch, setValueSearch] = useState('')
  const [categoria, setCategoria] = useState('')

  function storageClient(data) {
    localStorage.setItem("wesell-login-cliente", JSON.stringify(data));
  }

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

  function addToCart(product) {
    const carrinho = localStorage.getItem("wesell-items-in-cart");

    let productsInCart = JSON.parse(carrinho) || [];

    const hasCurso = productsInCart.some(
      (productInCart) => productInCart.idProduto === product.idProduto
    );

    if (hasCurso) {
      toast.warning("Este produto já está no carrinho.");
      return;
    }

    productsInCart.push(product);
    localStorage.setItem(
      "wesell-items-in-cart",
      JSON.stringify(productsInCart)
    );
    toast.success("Adicionado com sucesso!");
  }

  const dados = {
    categorias,
    addToCart,
    client,
    setClient,
    storageClient,
    setValueSearch,
    setCategoria,
    categoria,
    valueSearch
  };

  return (
    <ClienteContext.Provider value={dados}>{children}</ClienteContext.Provider>
  );
}
