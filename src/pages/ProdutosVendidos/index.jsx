import { Link } from "react-router-dom";
import styles from "./produtosVendidos.module.css";
import { FiFilter, FiSearch } from "react-icons/fi";
import GridProdutos from "../../components/GridProdutos";
import { useEffect, useState } from "react";
import axios from "axios";
import url_base from "../../services/url_base";
import { toast } from "react-toastify";

export default function ProdutosVendidos() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function getProdutos() {
      await axios
        .get(url_base + "/produtosVendidos")
        .then((response) => {
          setProdutos(response.data);
          setProdutosFiltrados(response.data);
          setProdutos(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getProdutos();
  }, []);

  useEffect(() => {
    const resultado = produtos.filter((produto) =>
      produto.descricao.toLowerCase().includes(busca.toLowerCase())
    );
    setProdutosFiltrados(resultado);
  }, [busca, produtos]);

  return (
    <div className="container">
      <section className={styles.areaLink}>
        <Link to="/relatorio-de-vendas" className="btn btn-primary">
          Ir para relatório de vendas
        </Link>
      </section>
      <section className={`${styles.sectionFilter}`}>
        <p>Sou afiliado(a)</p>
        <div className={styles.areaFilters}>
          <div className={styles.areaOptions}>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="roxo-outlined"
              autoComplete="off"
              checked
            />
            <label
              className="btn btn-sm btn-outline-roxo rounded-pill"
              htmlFor="roxo-outlined"
            >
              Afiliações confirmadas
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="roxo2-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-sm btn-outline-roxo rounded-pill"
              htmlFor="roxo2-outlined"
            >
              Solicitadas
            </label>
          </div>
          <div className={styles.areaSearch}>

            <div className={styles.inputSearch}>
              <div className={`${styles.search} input-group`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Qual produto quer encontrar?"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <span className="ps-2">
                  <FiSearch size={20} />
                </span>
              </div>
            </div>

            <p>
              <FiFilter /> Mais filtros
            </p>
          </div>
        </div>
      </section>
      <section className={styles.areaProdutos}>
        <GridProdutos
          titleVisivel={false}
          produtos={produtosFiltrados}
          qtdVisivel={8}
        />
      </section>
    </div>
  );
}
