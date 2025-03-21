/* eslint-disable react/prop-types */
import { FiMinus, FiPlus } from "react-icons/fi";
import formatCurrencyBR from "../../hooks/formatCurrency";
import styles from "./produtoCarrinho.module.css";
import { Link } from "react-router-dom";

export default function CardProdutoCarrinho({
  item,
  removeProduct,
  onQuantidadeChange,
  savedItemsArea,
  saveItem,
  removeProductSave,
  addToCart
}) {
  const encodeCustom = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const produtoNome = encodeCustom(item.nomeProduto)
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/\//g, "-")

  return (
    <div className={styles.cardItemCarrinho} key={item.idProduto}>
      <div className={styles.areaImg}>
        <img
          src={item.imagem}
          alt={item.nomeProduto}
        />
      </div>
      <div className={styles.areaDescricao}>
        <Link
          to={`/produto/${item.idProduto}/${produtoNome}`}
          id={styles.nomeProduto}
        >
          {item.nomeProduto}
        </Link>
        <p className={styles.estoque}>Em estoque</p>
        <div className={styles.spans}>
          {savedItemsArea ? (
            <>
              <span onClick={() => removeProductSave(item.idProduto)}>Remover</span>
              <span onClick={() => { addToCart(item), removeProductSave(item.idProduto) }}>Adicionar ao carrinho</span>
            </>
          ) : (
            <>
              <span onClick={() => removeProduct(item.idProduto)}>Remover</span>
              <span onClick={() => saveItem(item)}>Salvar para mais tarde</span>
            </>
          )}
        </div>
      </div>
      <div className={styles.areaQtd} hidden={savedItemsArea}>
        <FiMinus
          size={24}
          onClick={() => onQuantidadeChange(Math.max(1, item.qtd - 1))}
          style={{ cursor: "pointer" }}
        />
        {item.qtd}
        <FiPlus
          size={24}
          onClick={() => onQuantidadeChange(item.qtd + 1)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={`${styles.areaValor} ${savedItemsArea ? styles.valor : ''}`}>
        <p>{formatCurrencyBR(item.precoPromocional)}</p>
      </div>
    </div>
  );
}
