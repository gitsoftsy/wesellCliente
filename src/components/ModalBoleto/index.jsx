/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Barcode from "react-barcode";
import { MdContentCopy, MdDownload } from "react-icons/md";

export default function ModalBoleto({ isShow, setIsShow, boleto }) {
  const numeroDoBoleto = boleto ? boleto.line : '';
  

  function copiarBoleto() {
    navigator.clipboard.writeText(numeroDoBoleto != null? numeroDoBoleto : '').then(() => {
      toast.success("Número do boleto copiado!");
    });
  }

  // const gerarBoleto = () => {
  //   const doc = new jsPDF();

  //   // Adiciona o título do boleto
  //   doc.setFontSize(20);
  //   doc.text("Boleto Bancário", 10, 10);

  //   // Informações do pagador
  //   doc.setFontSize(12);
  //   doc.text("Nome: João da Silva", 10, 30);
  //   doc.text("CPF: 123.456.789-00", 10, 40);
  //   doc.text("Endereço: Rua Elton, 123", 10, 50);

  //   // Informações do boleto
  //   doc.text("Banco: 001 - Banco do Brasil", 10, 70);
  //   doc.text("Agência/Código beneficiário: 1234 / 56789-0", 10, 80);
  //   doc.text("Data de vencimento: 30/11/2024", 10, 90);
  //   doc.text("Valor: R$ 500,00", 10, 100);

  //   // Linha digitável fictícia
  //   doc.text(
  //     "Linha Digitável: " + numeroDoBoleto,
  //     10,
  //     120
  //   );

  //   // Salva o boleto como PDF
  //   doc.save("boleto-wesell.pdf");
  // };

  return (
    <Modal
      show={isShow}
      onHide={!isShow}
      backdrop="static" // Impede o fechamento ao clicar fora da modal
      keyboard={false} // Impede o fechamento ao pressionar a tecla Esc
      dialogClassName="modal-dialog-centered modal-lg" // Adiciona classes ao dialog
    >
      <Modal.Body
        className={`paddingModal d-flex flex-column align-items-center w-100`}
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
          <Barcode size={300} value={numeroDoBoleto != null? numeroDoBoleto : ''} />
          <div className="mt-4 btns btns-boleto btns-carrinho">
            <button className="btn btn-primary me-3" onClick={copiarBoleto}>
              <MdContentCopy size={22} className="me-2" /> Copiar Boleto
            </button>
            <a
              className="btn btn-primary"
              download={true}
              href={boleto != null? boleto.pdf : ''}
            >
              <MdDownload size={22} className="me-2" /> Baixar Boleto
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
