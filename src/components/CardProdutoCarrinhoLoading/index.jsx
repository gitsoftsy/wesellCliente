/* eslint-disable react/prop-types */
import Placeholder from "react-bootstrap/Placeholder";
import styles from "../CardProdutoCarrinho/produtoCarrinho.module.css";

export default function CardProdutoCarrinhoLoading() {
  return (
    <div className={styles.cardItemCarrinho}>
      <div className="me-4" style={{ width: "13%", height: "100%" }}>
        <Placeholder as="div" animation="wave" className="w-100 h-100">
          <Placeholder className="w-100 h-100 rounded" />
        </Placeholder>
      </div>
      <div className="d-flex flex-column flex-grow-1 h-100">
        <div>
          <Placeholder as="div" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as="div" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
        <div className="mt-auto">
          <Placeholder as="div" animation="wave">
            <Placeholder xs={6} />
          </Placeholder>
        </div>
      </div>
    </div>
  );
}
