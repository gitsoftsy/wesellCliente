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
  const [orderData, setOrderData] = useState(null);
  const [client, setClient] = useState(
    JSON.parse(localStorage.getItem("wesell-user-comprador"))
  );
  const [valueSearch, setSearch] = useState(
    JSON.parse(localStorage.getItem("@wesell-search-value")) ?? null
  );
  const [categoria, setCategoriaId] = useState(
    JSON.parse(localStorage.getItem("@wesell-category-id")) ?? null
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  function storageClient(data) {
    localStorage.setItem("wesell-user-comprador", JSON.stringify(data));
  }

  useEffect(() => {
    localStorage.setItem("@wesellRouteOnCar", false);

    async function getCategorias() {
      await axios
        .get(url_base + "/categorias/ativos")
        .then((response) => {
          setCategorias(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    }
    getCategorias();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setCategoria = (categoria) => {
    setCategoriaId(categoria);
    localStorage.setItem("@wesell-category-id", JSON.stringify(categoria));
  };

  const setValueSearch = (value) => {
    setSearch(value);
    localStorage.setItem("@wesell-search-value", JSON.stringify(value));
  };

  function addToCart(id) {
    const carrinho = localStorage.getItem("@wesellItemsInCart");
  
    let productsInCart = JSON.parse(carrinho) || [];
  
    const produtoIndex = productsInCart.findIndex((produto) => produto.id == id);
  
    if (produtoIndex !== -1) {
      productsInCart[produtoIndex].qtd += 1;
      localStorage.setItem("@wesellItemsInCart", JSON.stringify(productsInCart));
      toast.success("Quantidade atualizada no carrinho!");
    } else {
      productsInCart.push({ id: id, qtd: 1 });
      localStorage.setItem("@wesellItemsInCart", JSON.stringify(productsInCart));
      toast.success("Adicionado com sucesso!");
    }
  }
  

  function limpaStorage() {
    localStorage.removeItem("@wesellItemsInCart");
    localStorage.removeItem("@wesellOrderData");
  }

  const dados = {
    categorias,
    setOrderData,
    orderData,
    addToCart,
    limpaStorage,
    client,
    clientLogado: !!client,
    setClient,
    storageClient,
    setValueSearch,
    setCategoria,
    isMobile,
    categoria,
    valueSearch,
  };

  return (
    <ClienteContext.Provider value={dados}>{children}</ClienteContext.Provider>
  );
}
