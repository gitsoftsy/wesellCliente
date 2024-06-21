import CardProdutoCarrinho from "../../components/CardProdutoCarrinho";
import { useEffect, useState } from "react";
import formatCurrencyBR from "../../hooks/formatCurrency.js";
import styles from "./carrinho.module.css";
import { toast } from "react-toastify";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export default function Carrinho() {
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [produtosSalvos, setProdutosSalvos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productsInCart = localStorage.getItem("wesell-items-in-cart");
    const products = JSON.parse(productsInCart) || [];
    const savedProducts = localStorage.getItem("wesell-saved-items");
    const productsInListSave = JSON.parse(savedProducts) || [];

    const subtotalCalculado = products.reduce(
      (acc, produto) => acc + produto.valor * produto.qtd,
      0
    );
    setTotal(subtotalCalculado);
    setProdutosSalvos(productsInListSave);
    setProdutosCarrinho(products);
  }, []);

  function removeProductSave(id) {
    setProdutosSalvos((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "wesell-saved-items",
        JSON.stringify(produtosFiltrados)
      );

      return produtosFiltrados;
    });
  }
  function removeProduct(id) {
    setProdutosCarrinho((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "wesell-items-in-cart",
        JSON.stringify(produtosFiltrados)
      );

      const subtotalCalculado = produtosFiltrados.reduce(
        (acc, produto) => acc + produto.valor * produto.qtd,
        0
      );

      setTotal(subtotalCalculado);

      return produtosFiltrados;
    });
  }

  function handleQuantidadeChange(idProduto, novaQuantidade) {
    setProdutosCarrinho((produtosAntigos) => {
      const novoCarrinho = produtosAntigos.map((produto) =>
        produto.id === idProduto ? { ...produto, qtd: novaQuantidade } : produto
      );

      const subtotalCalculado = novoCarrinho.reduce(
        (acc, produto) => acc + produto.valor * produto.qtd,
        0
      );

      setTotal(subtotalCalculado);

      return novoCarrinho;
    });
  }
  function addToCart(product) {
    const carrinho = localStorage.getItem("wesell-items-in-cart");
  
    let productsInCart = JSON.parse(carrinho) || [];
  
    productsInCart.push(product);
    localStorage.setItem(
      "wesell-items-in-cart",
      JSON.stringify(productsInCart)
    );
  
    setProdutosCarrinho((produtosAntigos) => [...produtosAntigos, product]);
  
    const subtotalCalculado = productsInCart.reduce(
      (acc, produto) => acc + produto.valor * produto.qtd,
      0
    );
    setTotal(subtotalCalculado);
  }

  function saveItem(produto) {
    let salvos = JSON.parse(localStorage.getItem("wesell-saved-items")) || [];
    if (!salvos.some((item) => item.id === produto.id)) {
      salvos.push(produto);
      localStorage.setItem("wesell-saved-items", JSON.stringify(salvos));
    }

    setProdutosCarrinho((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.id !== produto.id
      );

      localStorage.setItem(
        "wesell-items-in-cart",
        JSON.stringify(produtosFiltrados)
      );

      const subtotalCalculado = produtosFiltrados.reduce(
        (acc, produtoList) => acc + produtoList.valor * produtoList.qtd,
        0
      );

      setTotal(subtotalCalculado);
      toast.success("Item salvo!");
      setProdutosSalvos((produtosSalvosAntigos) => [
        ...produtosSalvosAntigos,
        produto,
      ]);

      return produtosFiltrados;
    });
  }

  return (
    <div className={styles.containerCart}>
      <section className={`container ${styles.contentCart}`}>
        <div className={`${styles.sectionItensCarrinho}`}>
          {produtosCarrinho.length > 0 ? (
            <section className={`${styles.cardItensCarrinho} card`}>
              <div className={styles.titleCarrinho}>
                <h5>Carrinho de compras</h5>
                <p>Preço</p>
              </div>
              {produtosCarrinho.map((item) => (
                <CardProdutoCarrinho
                  item={item}
                  savedItemsArea={false}
                  removeProduct={removeProduct}
                  saveItem={saveItem}
                  onQuantidadeChange={(novaQuantidade) =>
                    handleQuantidadeChange(item.id, novaQuantidade)
                  }
                  key={item.id}
                />
              ))}
            </section>
          ) : (
            <section className={`${styles.cardItensCarrinho} card`}>
              <div className="col-4 text-center mx-auto my-5">
                <MdOutlineRemoveShoppingCart size={30} color="#FF5E93"/>
                <h5 style={{color: '#FF5E93'}}>Seu carrinho está vazio!</h5>
                <p>Você ainda não possui itens no seu carrinho.</p>
                <button className="btn btn-primary">Ver produtos</button>
              </div>
            </section>
          )}

          {produtosSalvos.length > 0 && (
            <section className={`${styles.cardItensCarrinho} card`}>
              <div className={styles.titleCarrinho}>
                <h5>Produtos salvos</h5>
                <p>Preço</p>
              </div>
              {produtosSalvos.map((item) => (
                <CardProdutoCarrinho
                  item={item}
                  removeProduct={removeProduct}
                  removeProductSave={removeProductSave}
                  saveItem={saveItem}
                  addToCart={addToCart}
                  savedItemsArea={true}
                  onQuantidadeChange={(novaQuantidade) =>
                    handleQuantidadeChange(item.id, novaQuantidade)
                  }
                  key={item.id}
                />
              ))}
            </section>
          )}
        </div>
        {produtosCarrinho.length > 0 ? (
          <div className={`${styles.cardResumo} card`}>
            <div className={styles.titleResumo}>
              <h5>Resumo da compra</h5>
            </div>
            <div className={styles.infoResumo}>
              <span>
                <p>Produtos (2)</p> <p>{formatCurrencyBR(total)}</p>
              </span>
              <span className={styles.spanTotal}>
                <p>Total</p> <p>{formatCurrencyBR(total)}</p>
              </span>
            </div>
            <button className="btn btn-primary">Continuar a compra</button>
          </div>
        ) : (
          <div className={`${styles.cardResumo2} card`}>
            <div className={styles.titleResumo2}>
              <h5>Resumo da compra</h5>
            </div>
            <p id={styles.textoSemProduto}>
              Aqui você encontrará os valores da sua compra assim que adicionar
              produtos.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
