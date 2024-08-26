/* eslint-disable react/prop-types */
import styles from "../../pages/Produtos/produtos.module.css";
import DoubleRangeSlider from "../DoubleRangeSlider";

export default function ModalFilters({
  setShowAllMarcas,
  setPrecoDeVendaMax,
  setPrecoDeVendaMin,
  lojistas,
  setShowAllLojas,
  setIdLojista,
  idLojista,
  showAllLojas,
  setIdsMarcas,
  idsMarcas,
  showAllMarcas,
  setShowAllSubCategorias,
  marcas,
  setIdSubCategoria,
  showAllSubCategorias,
  subCategorias,
  categorias,
  showAllCategorias,
  setIdCategoria,
  setShowAllCategorias,
}) {
  return (
    <div
      className="modal fade"
      id="modalFilters"
      tabIndex="-1"
      aria-labelledby="modalFiltersLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalFiltersLabel">
              Filtrar
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
                  <span
                    onClick={() => setShowAllCategorias(!showAllCategorias)}
                  >
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
                    onClick={() =>
                      setShowAllSubCategorias(!showAllSubCategorias)
                    }
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
          </div>
        </div>
      </div>
    </div>
  );
}
