import { useEffect, useRef, useState } from "react";
import GridProdutos from "../../components/GridProdutos";
import axios from "axios";
import DoubleRangeSlider from "../../components/DoubleRangeSlider";
import { url_base } from "../../services/apis";
import useContexts from "../../hooks/useContext";
import styles from "./produtos.module.css";
import { toast } from "react-toastify";
import { FaFilter, FaSort } from "react-icons/fa";
import ModalFilters from "../../components/ModalFilters";
import ModalOrderBy from "../../components/ModalOrderBy";
import { LuSearchX } from "react-icons/lu";

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
  const [idsMarcas, setIdsMarcas] = useState([]);
  const [idLojista, setIdLojista] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null);
  const [idSubCategoria, setIdSubCategoria] = useState(null);
  const [precoDeVendaMin, setPrecoDeVendaMin] = useState(null);
  const [precoDeVendaMax, setPrecoDeVendaMax] = useState(null);
  const [semProdutos, setSemProdutos] = useState(false);
  const [orderBy, setOrderBy] = useState(null);

  const { valueSearch, categoria, setValueSearch, setCategoria, isMobile } =
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
          nome: produto.nomeFantasia,
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
        if (
          response.data ===
          "Nenhum resultado encontrado para os parâmetros informados."
        ) {
          setSemProdutos(true);
        } else {
          setProdutos(response.data);
          getFilters(response.data);
          setSemProdutos(false);
          setLoading(false);
        }
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
    setIdsMarcas([]);
    setIdLojista([]);
    setIdSubCategoria(null);
    setPrecoDeVendaMin(null);
    setPrecoDeVendaMax(null);
    setOrderBy(1);
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
        idMarca: idsMarcas.length > 0 ? idsMarcas : null,
        idLojista: idLojista.length > 0 ? idLojista : null,
        ordenacao: orderBy || 1,
      };

      await axios
        .post(url_base + "/produtos/listar", params)
        .then((response) => {
          console.log(response);
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
      idsMarcas !== null ||
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
    idsMarcas,
    idLojista,
    orderBy,
  ]);

  if (semProdutos) {
    return (
      <section
        className={`${styles.mainContainer} mt-5 container justify-content-center`}
      >
        <div className="col-12 col-md-10 p-5 shadow-sm border-0" id={styles.avisoErroBusca}>
          <div className="col-3 d-flex justify-content-center">
            <LuSearchX size={72} color="#3b3b3b"/>
          </div>
          <div>
            <h4>Não há anúncios que correspondam à sua busca</h4>
            <ul className="ps-3 mt-3">
              <li>Revise a ortografia da palavra.</li>
              <li>Utilize palavras mais genéricas ou menos palavras.</li>
              <li>
                Navegue pelas categorias para encontrar um produto semelhante.
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={`${styles.mainContainer} container`}>
        {!isMobile && (
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
                  const isChecked = idsMarcas.includes(item.id);

                  return (
                    <li key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={id}
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setIdsMarcas(
                              idsMarcas.filter((id) => id !== item.id)
                            );
                          } else {
                            setIdsMarcas([...idsMarcas, item.id]);
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
                            setIdLojista(
                              idLojista.filter((id) => id !== item.id)
                            );
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
        )}
        <section className={styles.containerProdutos}>
          {isMobile ? (
            <section className={styles.areaOrdenacaoMobile}>
              <div className={styles.sortBarMobile}>
                <div
                  className={styles.sortByMobile}
                  data-bs-toggle="modal"
                  data-bs-target="#modalFilters"
                >
                  <FaFilter size={14} />
                  Filtrar
                </div>
                <div
                  className={styles.sortByMobile}
                  data-bs-toggle="modal"
                  data-bs-target="#modalOrder"
                >
                  <FaSort size={16} /> Ordenar
                </div>
              </div>
              <div>
                <h4>
                  {routeCategory
                    ? categoria.nome
                    : `Resultados para "${valueSearch}"`}
                </h4>
                <p className="mb-0">
                  Total de {produtos.length} produtos encontrados.
                </p>
              </div>
            </section>
          ) : (
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
                    : `Total de ${produtos.length} ${
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
          )}
          <GridProdutos
            loading={loading}
            titleVisivel={false}
            qtdVisivel={12}
            produtos={produtos}
          />
        </section>
      </section>
      <ModalFilters
        categorias={categorias}
        idLojista={idLojista}
        lojistas={lojistas}
        marcas={marcas}
        setIdCategoria={setIdCategoria}
        setIdLojista={setIdLojista}
        setIdSubCategoria={setIdSubCategoria}
        setPrecoDeVendaMax={setPrecoDeVendaMax}
        setPrecoDeVendaMin={setPrecoDeVendaMin}
        setShowAllCategorias={setShowAllCategorias}
        setShowAllLojas={setShowAllLojas}
        idsMarcas={idsMarcas}
        setIdsMarcas={setIdsMarcas}
        setShowAllMarcas={setShowAllMarcas}
        setShowAllSubCategorias={setShowAllSubCategorias}
        showAllCategorias={showAllCategorias}
        showAllLojas={showAllLojas}
        showAllMarcas={showAllMarcas}
        showAllSubCategorias={showAllSubCategorias}
        subCategorias={subCategorias}
      />
      <ModalOrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
    </>
  );
}
