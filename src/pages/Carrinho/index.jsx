import CardProdutoCarrinho from "../../components/CardProdutoCarrinho";
import styles from "./carrinho.module.css";
import { useEffect, useState } from "react";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productsInCart = localStorage.getItem("wesell-items-in-cart");
    const products = JSON.parse(productsInCart) || [];

    setProdutos(products);
  }, []);

  function removeProduct(id) {
    setProdutos((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "wesell-items-in-cart",
        JSON.stringify(produtosFiltrados)
      );

      return produtosFiltrados;
    });
  }

  function handleQuantidadeChange(idCurso, novaQuantidade) {
    setProdutos((cursosAntigos) => {
      const novoCarrinho = cursosAntigos.map((curso) =>
        curso.id === idCurso ? { ...curso, quantidade: novaQuantidade } : curso
      );

      const subtotalCalculado = novoCarrinho.reduce(
        (acc, curso) => acc + curso.valor * curso.quantidade,
        0
      );

      setTotal(subtotalCalculado);

      return novoCarrinho;
    });
  }

  return (
    <div className={styles.containerCart}>
      <section className={`container ${styles.contentCart}`}>
        <section className={`${styles.cardItensCarrinho} card`}>
          <div className={styles.titleCarrinho}>
            <h5>Carrinho de compras</h5>
            <p>Preço</p>
          </div>
          {produtos.map((item) => (
            <CardProdutoCarrinho
              item={item}
              removeProduct={removeProduct}
              onQuantidadeChange={(novaQuantidade) =>
                handleQuantidadeChange(item.id, novaQuantidade)
              }
              key={item.id}
            />
          ))}
        </section>
        <div className={`${styles.cardResumo} card`}>
          <div className={styles.titleResumo}>
            <h5>Resumo da compra</h5>
          </div>
          <div className={styles.infoResumo}>
            <span>
              <p>Produtos (2)</p> <p>R$ 4.560,00</p>
            </span>
            <span className={styles.spanTotal}>
              <p>Total</p> <p>R$ 4.560,00</p>
            </span>
          </div>
          <button className="btn btn-primary">Continuar a compra</button>
        </div>
      </section>
    </div>
  );
}
