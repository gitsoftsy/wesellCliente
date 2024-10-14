/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Barcode from "react-barcode";
import { MdContentCopy, MdDownload } from "react-icons/md";

export default function ModalBoleto({ isShow, setIsShow, boleto }) {
  const numeroDoBoleto = boleto?.line ?? "";
  const urlBoleto = boleto?.pdf ?? "";

  function copiarBoleto() {
    if (numeroDoBoleto) {
      navigator.clipboard.writeText(numeroDoBoleto).then(() => {
        toast.success("Número do boleto copiado!");
      });
    } else {
      toast.error("Número do boleto indisponível para cópia.");
    }
  }

  async function baixarBoleto() {
    if (urlBoleto) {
      window.open(urlBoleto, "_blank");
    } else {
      toast.error("Boleto indisponível para download.");
    }
  }

  return (
    <Modal
      show={isShow}
      onHide={!isShow}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-dialog-centered modal-lg"
    >
      <Modal.Body
        className={` modal-boleto d-flex flex-column align-items-center w-100`}
      >
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Boleto gerado com sucesso!
          </h1>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsShow(false)}
          ></button>
        </div>
        <div className="modal-body py-5 d-flex flex-column justify-content-center align-items-center">
          <p>
            Utilize o número do código de barras para realizar o pagamento da
            sua compra.
          </p>
          <Barcode
            size={300}
            value={numeroDoBoleto != null ? numeroDoBoleto : ""}
          />
          <div className="btnsBoleto mt-4">
            <button className="btn btn-primary me-3" onClick={copiarBoleto}>
              <MdContentCopy size={22} className="me-2" /> Copiar Boleto
            </button>
            <button className="btn btn-primary" onClick={baixarBoleto}>
              <MdDownload size={22} className="me-2" /> Baixar Boleto
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
