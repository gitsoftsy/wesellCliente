/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GoCheckCircle, GoXCircle } from "react-icons/go";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./modalCompra.module.css";
import { useNavigate } from "react-router-dom";

export default function ModalCompra({ status, isShow }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Não é mais necessário gerenciar manualmente a exibição da modal
    // O react-bootstrap lida com isso através do state `show`
    return () => {
      // Qualquer limpeza necessária pode ser feita aqui
    };
  }, []);

  return (
    <Modal
      show={isShow}
      onHide={!isShow}
      backdrop="static" // Impede o fechamento ao clicar fora da modal
      keyboard={false} // Impede o fechamento ao pressionar a tecla Esc
      dialogClassName="modal-dialog-centered modal-dialog-scrollable" // Adiciona classes ao dialog
    >
      <Modal.Body className={`paddingModal d-flex flex-column align-items-center w-100 ${styles.modalBody}`}>
        {status ? (
          <>
            <h1 className="modal-title">Status da compra</h1>
            <hr className="w-100" />
            <p className="fs-5">Compra realizada com sucesso</p>
            <GoCheckCircle className={styles.iconModalSuccess} />
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
            <h1 className="modal-title">Status da compra</h1>
            <hr className="w-100" />
            <p className="fs-5">Transição não aprovada</p>
            <GoXCircle className={styles.iconModalError} />
            <Button
              variant="primary"
              className="mt-4 px-5"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
