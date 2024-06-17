import { FiMinus, FiPlus } from "react-icons/fi";
import styles from "./carrinho.module.css";

export default function Carrinho() {
  return (
    <div className={styles.containerCart}>
      <section className={`container ${styles.contentCart}`}>
        <section className={`${styles.cardItensCarrinho} card col-8`}>
          <div className={styles.titleCarrinho}>
            <h5>Carrinho de compras</h5>
            <p>Preço</p>
          </div>
          <div className={styles.cardItemCarrinho}>
            <div className={styles.areaImg}>
              <img
                src="https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg"
                alt="teste"
              />
            </div>
            <div className={styles.areaDescricao}>
              <p>Playstation 5, com voucher do jogo EA Sports FC 24</p>
              <p className={styles.estoque}>Em estoque</p>
              <div className={styles.spans}>
                <span>Remover</span>
                <span>Salvar para mais tarde</span>
              </div>
            </div>
            <div className={styles.areaQtd}>
              <FiMinus /> 1 <FiPlus />
            </div>
            <div className={styles.areaValor}>
              <p>R$ 3.329,99</p>
            </div>
          </div>
          <div className={styles.cardItemCarrinho}>
            <div className={styles.areaImg}>
              <img
                src="https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg"
                alt="teste"
              />
            </div>
            <div className={styles.areaDescricao}>
              <p>Playstation 5, com voucher do jogo EA Sports FC 24</p>
              <p className={styles.estoque}>Em estoque</p>
              <div className={styles.spans}>
                <span>Remover</span>
                <span>Salvar para mais tarde</span>
              </div>
            </div>
            <div className={styles.areaQtd}>
              <FiMinus /> 1 <FiPlus />
            </div>
            <div className={styles.areaValor}>
              <p>R$ 1.229,00</p>
            </div>
          </div>
        </section>
        <aside className={`${styles.cardResumo} col-3 card`}>
          <div className={styles.titleResumo}>
            <h5>Resumo da compra</h5>
          </div>
        </aside>
      </section>
    </div>
  );
}
