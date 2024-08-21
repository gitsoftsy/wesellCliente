import { useEffect, useRef, useState } from "react";
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
  const [idMarca, setIdMarca] = useState([]);
  const [idLojista, setIdLojista] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null);
  const [idSubCategoria, setIdSubCategoria] = useState(null);
  const [precoDeVendaMin, setPrecoDeVendaMin] = useState(null);
  const [precoDeVendaMax, setPrecoDeVendaMax] = useState(null);
  const [orderBy, setOrderBy] = useState(null);

  const { valueSearch, categoria, setValueSearch, setCategoria } =
    useContexts();
  const currentUrl = window.location.href;
  let routeCategory = currentUrl.includes("/c/");
  const prevValueSearchRef = useRef(valueSearch);
  const prevCategoriaRef = useRef(categoria);

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
    const valueSearchChanged = prevValueSearchRef.current !== valueSearch;
    const categoriaChanged = prevCategoriaRef.current !== categoria;

    prevValueSearchRef.current = valueSearch;
    prevCategoriaRef.current = categoria;

    if (valueSearchChanged || categoriaChanged || !marcas.length) {
      setMarcas(marcasArray);
      setLojistas(lojistasArray);
    }
  }
  async function getProdutos() {
    const params = {
      nmProduto: routeCategory ? null : valueSearch,
      idCategoria: routeCategory ? categoria.id : null,
      ordenacao: 1,
    };

    await axios
      .post(url_base + "/produtos/listar", params)
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
    if (routeCategory) {
      setValueSearch("");
    } else {
      setCategoria("");
    }

    setIdCategoria(null);
    setIdMarca([]);
    setIdLojista([]);
    setIdSubCategoria(null);
    setPrecoDeVendaMin(null);
    setPrecoDeVendaMax(null);
    setOrderBy(null);
    getProdutos();
  }, [valueSearch, categoria]);

  useEffect(() => {
    async function filtrarProdutos() {
      const params = {
        nmProduto: routeCategory ? null : valueSearch,
        idCategoria: routeCategory ? categoria.id : idCategoria,
        idSubCategoria: idSubCategoria || null,
        precoDeVendaMin: precoDeVendaMin || null,
        precoDeVendaMax: precoDeVendaMax || null,
        idMarca: idMarca.length > 0 ? idMarca : null,
        idLojista: idLojista.length > 0 ? idLojista : null,
        ordenacao: orderBy || 1,
      };

      await axios
        .post(url_base + "/produtos/listar", params)
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
      idLojista !== null ||
      orderBy !== null
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
    orderBy,
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
              const isChecked = idMarca.includes(item.id);

              return (
                <li key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        setIdMarca(idMarca.filter((id) => id !== item.id));
                      } else {
                        setIdMarca([...idMarca, item.id]);
                      }
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
              const isChecked = idLojista.includes(item.id);

              return (
                <li key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        setIdLojista(idLojista.filter((id) => id !== item.id));
                      } else {
                        setIdLojista([...idLojista, item.id]);
                      }
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
              {produtos.length < 2
                ? `${produtos.length} produto encontrado.`
                : `Mais de ${produtos.length - 1} ${
                    produtos.length < 3
                      ? "produto encontrado."
                      : "produtos encontrados."
                  }`}
            </p>
          </div>
          <div className={styles.sortBar}>
            <label>Ordenar por:</label>
            <div className={styles.sortBy}>
              <select
                name="sort-by"
                id="sort-by"
                className="form-select form-select-sm"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option selected value={1}>
                  Relevância
                </option>
                <option value={2} disabled>
                  Mais vendidos
                </option>
                <option value={5}>Menor preço</option>
                <option value={6}>Maior preço</option>
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
