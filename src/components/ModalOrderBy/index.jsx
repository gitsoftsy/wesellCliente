/* eslint-disable react/prop-types */
export default function ModalOrderBy({ orderBy, setOrderBy }) {
  return (
    <div
      className="modal fade"
      id="modalOrder"
      tabIndex="-1"
      aria-labelledby="modalOrderLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalOrderLabel">
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
            <div className="form-check">
              <input
                type="radio"
                id="order-relevance"
                name="order-by"
                value={1}
                checked={orderBy === 1}
                onChange={(e) => setOrderBy(Number(e.target.value))}
                className="form-check-input"
              />
              <label htmlFor="order-relevance" className="form-check-label">
                Relevância
              </label>
            </div>
            
            <div className="form-check">
              <input
                type="radio"
                id="order-lowest-price"
                name="order-by"
                value={5}
                checked={orderBy === 5}
                onChange={(e) => setOrderBy(Number(e.target.value))}
                className="form-check-input"
              />
              <label htmlFor="order-lowest-price" className="form-check-label">
                Menor preço
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="order-highest-price"
                name="order-by"
                value={6}
                checked={orderBy === 6}
                onChange={(e) => setOrderBy(Number(e.target.value))}
                className="form-check-input"
              />
              <label htmlFor="order-highest-price" className="form-check-label">
                Maior preço
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="order-best-sellers"
                name="order-by"
                value={2}
                disabled
                checked={orderBy === 2}
                onChange={(e) => setOrderBy(Number(e.target.value))}
                className="form-check-input"
              />
              <label htmlFor="order-best-sellers" className="form-check-label">
                Mais vendidos
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
