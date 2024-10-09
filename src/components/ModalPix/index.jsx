/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

export default function ModalPix({ isShow, qrCode, imgQrCode, setIsShow }) {
  const navigate = useNavigate();

  function copiarPix() {
    navigator.clipboard.writeText(qrCode).then(() => {
      toast.success("Código pix copiado!");
    });
  }


  return (
    <Modal
      show={isShow}
      onHide={!isShow}
      backdrop="static" // Impede o fechamento ao clicar fora da modal
      keyboard={false} // Impede o fechamento ao pressionar a tecla Esc
      dialogClassName="modal-dialog-centered modal-dialog-scrollable" // Adiciona classes ao dialog
    >
      <Modal.Body
        className={`paddingModal d-flex flex-column align-items-center w-100`}
      >
        <p className="fs-5">Scannear QRcode</p>
        <QRCodeSVG size={280} value={imgQrCode} />
        <div className="row">
          <Button
            variant="primary"
            className="mt-4 px-5"
            onClick={() => navigate("/minha-conta/pedidos")}
          >
            Concluir
          </Button>
          <button className="btn btn-secondary me-3 mt-3" onClick={copiarPix}>
            <MdContentCopy size={22} className="me-2" /> Copiar código pix
          </button>
          <Button
            variant="danger"
            className="mt-3 px-5"
            onClick={() => setIsShow(false)}
          >
            Fechar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
