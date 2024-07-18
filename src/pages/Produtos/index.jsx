import { useEffect, useState } from "react";
import GridProdutos from "../../components/GridProdutos";
import axios from "axios";
import DoubleRangeSlider from "../../components/DoubleRangeSlider";
import { url_base } from "../../services/apis";
import useContexts from "../../hooks/useContext";
import styles from "./produtos.module.css";
import { toast } from "react-toastify";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllCategorias, setShowAllCategorias] = useState(false);
  const [showAllSubCategorias, setShowAllSubCategorias] = useState(false);
  const [showAllMarcas, setShowAllMarcas] = useState(false);
  const [showAllLojas, setShowAllLojas] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [lojistas, setLojistas] = useState([]);
  const [idMarca, setIdMarca] = useState(null);
  const [idLojista, setIdLojista] = useState(null);
  const [idCategoria, setIdCategoria] = useState(null);
  const [idSubCategoria, setIdSubCategoria] = useState(null);
  const [precoDeVendaMin, setPrecoDeVendaMin] = useState(null);
  const [precoDeVendaMax, setPrecoDeVendaMax] = useState(null);

  const { valueSearch, categoria } = useContexts();
  const currentUrl = window.location.href;
  let routeCategory = currentUrl.includes("/c/");

  function getFilters(produtos) {
    let categoriasArray = [];
    let subCategoriasArray = [];
    let marcasArray = [];
    let lojistasArray = [];

    produtos.forEach((produto) => {
      if (
        produto.categoriaId &&
        !categoriasArray.some((item) => item.id === produto.categoriaId)
      ) {
        categoriasArray.push({
          id: produto.categoriaId,
          nome: produto.categoria,
        });
      }

      if (
        produto.subCategoriaId &&
        !subCategoriasArray.some((item) => item.id === produto.subCategoriaId)
      ) {
        subCategoriasArray.push({
          id: produto.subCategoriaId,
          nome: produto.subcategoria,
        });
      }

      if (
        produto.marcaId &&
        !marcasArray.some((item) => item.id === produto.marcaId)
      ) {
        marcasArray.push({ id: produto.marcaId, nome: produto.marca });
      }

      if (
        produto.lojistaId &&
        !lojistasArray.some((item) => item.id === produto.lojistaId)
      ) {
        lojistasArray.push({
          id: produto.lojistaId,
          nome: produto.lojista,
        });
      }
    });

    setCategorias(categoriasArray);
    setSubCategorias(subCategoriasArray);
    if (!marcas.length > 0) {
      setMarcas(marcasArray);
      setLojistas(lojistasArray);
    }
  }
  async function getProdutos() {
    await axios
      .get(
        url_base +
          `${
            routeCategory
              ? `/produtos/listar?nmProduto=&idCategoria=${categoria.id}`
              : "/produtos/listar?nmProduto=" + valueSearch
          }`
      )
      .then((response) => {
        setProdutos(response.data);
        getFilters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao listar produtos.");
      });
  }

  useEffect(() => {
    setIdCategoria(null);
    setIdMarca(null);
    setIdLojista(null);
    setIdSubCategoria(null);
    setPrecoDeVendaMin(null);
    setPrecoDeVendaMax(null);
    getProdutos();
  }, [valueSearch]);

  useEffect(() => {
    async function filtrarProdutos() {
      await axios
        .get(
          `${url_base}/produtos/listar?` +
            `${
              !routeCategory
                ? `nmProduto=${valueSearch}&${
                    idCategoria ? `idCategoria=${idCategoria}&` : ""
                  }`
                : `idCategoria=${categoria.id}&`
            }` +
            `${idSubCategoria ? `idSubCategoria=${idSubCategoria}&` : ""}` +
            `${precoDeVendaMin ? `precoDeVendaMin=${precoDeVendaMin}&` : ""}` +
            `${precoDeVendaMax ? `precoDeVendaMax=${precoDeVendaMax}&` : ""}` +
           
            `${idMarca ? `idMarca=${idMarca}&` : ""}` +
            `${idLojista ? `idLojista=${idLojista}&` : ""}`
        )
        .then((response) => {
          setProdutos(response.data);
          getFilters(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao filtrar produtos:", error);
        });
    }

    if (
      
      idCategoria !== null ||
      idSubCategoria !== null ||
     
      precoDeVendaMin !== null ||
      precoDeVendaMax !== null ||
      idMarca !== null ||
      idLojista !== null
    ) {
      setLoading(true);
      filtrarProdutos();
    }
  }, [
    idCategoria,
    idSubCategoria,
    precoDeVendaMin,
    precoDeVendaMax,
    idMarca,
    idLojista,
  ]);

  return (
    <section className={`${styles.mainContainer} container`}>
      <aside className={styles.containerFiltros}>
        <h6>Categoria</h6>
        <ul>
          {categorias
            .slice(0, showAllCategorias ? categorias.length : 5)
            .map((item, index) => {
              return (
                <li key={index}>
                  <label
                    className={styles.labelItem}
                    onClick={() => {
                      setIdCategoria(item.id);
                    }}
                  >
                    {item.nome}
                  </label>
                </li>
              );
            })}
          {categorias.length > 5 && (
            <span onClick={() => setShowAllCategorias(!showAllCategorias)}>
              {showAllCategorias ? <>Ver menos</> : <>Ver todos</>}
            </span>
          )}
        </ul>
        <h6>Subcategoria</h6>
        <ul>
          {subCategorias
            .slice(0, showAllSubCategorias ? subCategorias.length : 5)
            .map((item, index) => {
              return (
                <li key={index}>
                  <label
                    className={styles.labelItem}
                    onClick={() => {
                      setIdSubCategoria(item.id);
                    }}
                  >
                    {item.nome}
                  </label>
                </li>
              );
            })}
          {subCategorias.length > 5 && (
            <span
              onClick={() => setShowAllSubCategorias(!showAllSubCategorias)}
            >
              {showAllSubCategorias ? <>Ver menos</> : <>Ver todos</>}
            </span>
          )}
        </ul>
        <h6>Marcas</h6>
        <ul>
          {marcas
            .slice(0, showAllMarcas ? marcas.length : 5)
            .map((item, index) => {
              const id = `marca-checkbox-${index}`;
              return (
                <li key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    onChange={() => {
                      setIdMarca(idMarca === item.id ? null : item.id);
                    }}
                  />
                  <label htmlFor={id} className={styles.labelItem}>
                    {item.nome}
                  </label>
                </li>
              );
            })}
          {marcas.length > 5 && (
            <span onClick={() => setShowAllMarcas(!showAllMarcas)}>
              {showAllMarcas ? <>Ver menos</> : <>Ver todos</>}
            </span>
          )}
        </ul>
        <h6>Vendido por</h6>
        <ul>
          {lojistas
            .slice(0, showAllLojas ? lojistas.length : 5)
            .map((item, index) => {
              const id = `lojista-checkbox-${index}`;

              return (
                <li key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    onChange={() => {
                      setIdLojista(idLojista === item.id ? null : item.id);
                    }}
                  />
                  <label htmlFor={id} className={styles.labelItem}>
                    {item.nome}
                  </label>
                </li>
              );
            })}

          {lojistas.length > 5 && (
            <span onClick={() => setShowAllLojas(!showAllLojas)}>
              {showAllLojas ? <>Ver menos</> : <>Ver todos</>}
            </span>
          )}
        </ul>
        <h6 className="mb-2">Preço</h6>
        <DoubleRangeSlider
          onApplyFilter={(min, max) => {
            setPrecoDeVendaMin(min);
            setPrecoDeVendaMax(max);
          }}
        />
      </aside>
      <section className={styles.containerProdutos}>
        <section className={styles.areaOrdenacao}>
          <div>
            <h4>
              {routeCategory
                ? categoria.nome
                : `Resultados para "${valueSearch}"`}
            </h4>
            <p className="mb-0">
              Mais de {produtos.length - 1} produtos encontrados.
            </p>
          </div>
          <div className={styles.sortBar}>
            <label>Ordenar por:</label>
            <div className={styles.sortBy}>
              <select
                name="sort-by"
                id="sort-by"
                className="form-select form-select-sm"
              >
                <option selected value="relevancia">
                  Relevância
                </option>
                <option value="maisVendidos">Mais vendidos</option>
                <option value="maiorComissao">Maior comissão</option>
                <option value="menorComissao">Menor comissão</option>
              </select>
            </div>
          </div>
        </section>
        <GridProdutos
          loading={loading}
          titleVisivel={false}
          qtdVisivel={12}
          produtos={produtos}
        />
      </section>
    </section>
  );
}
