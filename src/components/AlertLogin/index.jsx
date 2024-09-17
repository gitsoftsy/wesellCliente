import { useRef } from "react";
import { Link } from "react-router-dom";

export default function AlertLogin() {
  const btnCloseAlert = useRef(null);

  function fechaModal() {
    if (btnCloseAlert.current) {
      localStorage.setItem("@wesellRouteOnCar", true);
      btnCloseAlert.current.click();
    }
  }

  return (
    <div
      className="modal fade"
      id="modalAlert"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Faça o login!
            </h1>
            <button
              type="button"
              className="btn-close"
              ref={btnCloseAlert}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Para realizar a compra das atividades eletivas, por favor, realize o
            login em sua conta.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <Link className="btn btn-primary" to="/login" onClick={fechaModal}>
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
