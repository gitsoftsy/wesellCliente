/* eslint-disable react/prop-types */
import { GoCheckCircle, GoXCircle } from "react-icons/go";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function ModalCompra({ textoModal, status, isShow, setIsShow }) {
  const navigate = useNavigate();

  return (
    <Modal
      show={isShow}
      onHide={!isShow}
      backdrop="static" 
      keyboard={false} 
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
    >
      <Modal.Body className={`py-4 d-flex flex-column align-items-center w-100`}>
        {status ? (
          <>
            <h2 className="m-0">Status da compra</h2>
            <hr className="w-100 mt-2 mb-5" />
            <GoCheckCircle size={90} color="#A5DC86" />
            <p className="fs-3 mb-4">Compra realizada com sucesso</p>
            <Button
              variant="primary"
              className="mt-4 px-5"
              onClick={() => navigate('/minha-conta/pedidos')}
            >
              Concluir
            </Button>
          </>
        ) : (
          <>
            <h2 className="m-0">Status da compra</h2>
            <hr className="w-100 mt-2 mb-5" />
            <GoXCircle size={90} color="#F27474" />
            <p className="fs-3 mb-4">{textoModal}</p>
            <Button
              variant="primary"
              className="px-5 btn-sm"
              onClick={() => setIsShow(false)}
            >
              Fechar
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
