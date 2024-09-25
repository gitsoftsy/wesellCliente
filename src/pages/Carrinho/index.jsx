import CardProdutoCarrinho from "../../components/CardProdutoCarrinho";
import { useEffect, useState } from "react";

import styles from "./carrinho.module.css";
import { toast } from "react-toastify";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ResumoPedido from "../../components/ResumoPedido/index.jsx";
import useContexts from "../../hooks/useContext.js";

export default function Carrinho() {
  const [produtosComFrete, setProdutosComFrete] = useState([]);
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [produtosSalvos, setProdutosSalvos] = useState([]);
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { clientLogado } = useContexts();

  const navigate = useNavigate();

  useEffect(() => {
    const productsInCart = localStorage.getItem("@wesellItemsInCart");
    const products = JSON.parse(productsInCart) || [];
    const savedProducts = localStorage.getItem("wesell-saved-items");
    const productsInListSave = JSON.parse(savedProducts) || [];
    const quantidadeTotal = products.reduce(
      (acc, produto) => acc + produto.qtd,
      0
    );
    setQuantidadeTotalProdutos(quantidadeTotal);

    const subtotalCalculado = products.reduce(
      (acc, produto) => acc + produto.precoPromocional * produto.qtd,
      0
    );
    setTotal(subtotalCalculado);
    setSubtotal(subtotalCalculado);
    setProdutosSalvos(productsInListSave);
    setProdutosCarrinho(products);
    const productsFilter = products.filter((item) => item.freteGratis === "N");
    let modeloProdutos = [];

    productsFilter.map((item) => {
      modeloProdutos.push({
        cepCd: item.lojista.cepCd,
        altura: item.altura,
        largura: item.largura,
        profundidade: item.profundidade,
        peso: item.peso,
      });
    });

    setProdutosComFrete(modeloProdutos);
  }, []);

  function removeProductSave(id) {
    setProdutosSalvos((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.idProduto !== id
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
        (item) => item.idProduto !== id
      );

      localStorage.setItem(
        "@wesellItemsInCart",
        JSON.stringify(produtosFiltrados)
      );

      atualizarProdutosComFrete(produtosFiltrados);

      const subtotalCalculado = produtosFiltrados.reduce(
        (acc, produto) => acc + produto.precoPromocional * produto.qtd,
        0
      );

      setTotal(subtotalCalculado);
      setSubtotal(subtotalCalculado);

      const quantidadeTotal = produtosFiltrados.reduce(
        (acc, produto) => acc + produto.qtd,
        0
      );
      setQuantidadeTotalProdutos(quantidadeTotal);

      return produtosFiltrados;
    });
  }

  function handleQuantidadeChange(idProduto, novaQuantidade) {
    setProdutosCarrinho((produtosAntigos) => {
      const novoCarrinho = produtosAntigos.map((produto) =>
        produto.idProduto === idProduto
          ? { ...produto, qtd: novaQuantidade }
          : produto
      );

      atualizarProdutosComFrete(novoCarrinho);

      const subtotalCalculado = novoCarrinho.reduce(
        (acc, produto) => acc + produto.precoPromocional * produto.qtd,
        0
      );

      setTotal(subtotalCalculado);
      setSubtotal(subtotalCalculado);

      const quantidadeTotal = novoCarrinho.reduce(
        (acc, produto) => acc + produto.qtd,
        0
      );
      setQuantidadeTotalProdutos(quantidadeTotal);

      return novoCarrinho;
    });
  }

  function addToCart(product) {
    const carrinho = localStorage.getItem("@wesellItemsInCart");

    let productsInCart = JSON.parse(carrinho) || [];

    productsInCart.push(product);
    localStorage.setItem("@wesellItemsInCart", JSON.stringify(productsInCart));

    setProdutosCarrinho((produtosAntigos) => {
      const novoCarrinho = [...produtosAntigos, product];
      atualizarProdutosComFrete(novoCarrinho);
      return novoCarrinho;
    });

    const subtotalCalculado = productsInCart.reduce(
      (acc, produto) => acc + produto.precoPromocional * produto.qtd,
      0
    );
    setTotal(subtotalCalculado);
    setSubtotal(subtotalCalculado);

    const quantidadeTotal = productsInCart.reduce(
      (acc, produto) => acc + produto.qtd,
      0
    );
    setQuantidadeTotalProdutos(quantidadeTotal);
  }

  function saveItem(produto) {
    let salvos = JSON.parse(localStorage.getItem("wesell-saved-items")) || [];
    if (!salvos.some((item) => item.idProduto === produto.idProduto)) {
      salvos.push(produto);
      localStorage.setItem("wesell-saved-items", JSON.stringify(salvos));
    }

    setProdutosCarrinho((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.idProduto !== produto.idProduto
      );

      atualizarProdutosComFrete(produtosFiltrados);

      localStorage.setItem(
        "@wesellItemsInCart",
        JSON.stringify(produtosFiltrados)
      );

      const subtotalCalculado = produtosFiltrados.reduce(
        (acc, produtoList) =>
          acc + produtoList.precoPromocional * produtoList.qtd,
        0
      );

      setTotal(subtotalCalculado);
      setSubtotal(subtotalCalculado);
      toast.success("Item salvo!");
      setProdutosSalvos((produtosSalvosAntigos) => [
        ...produtosSalvosAntigos,
        produto,
      ]);

      const quantidadeTotal = produtosFiltrados.reduce(
        (acc, produto) => acc + produto.qtd,
        0
      );
      setQuantidadeTotalProdutos(quantidadeTotal);

      return produtosFiltrados;
    });
  }

  function atualizarProdutosComFrete(produtos) {
    const productsFilter = produtos.filter((item) => item.freteGratis === "N");
    let modeloProdutos = [];

    productsFilter.forEach((item) => {
      for (let i = 0; i < item.qtd; i++) {
        modeloProdutos.push({
          cepCd: item.lojista.cepCd,
          altura: item.altura,
          largura: item.largura,
          profundidade: item.profundidade,
          peso: item.peso,
        });
      }
    });

    console.log(modeloProdutos)
    setProdutosComFrete(modeloProdutos);
  }

  function continuarCompra() {
    if (clientLogado) {
      localStorage.setItem(
        "@wesellItemsInCart",
        JSON.stringify(produtosCarrinho)
      );
      localStorage.setItem(
        "@wesellItemsFreight",
        JSON.stringify(produtosComFrete)
      );
      navigate("endereco");
    } else {
      localStorage.setItem("@wesellRouteOnCar", true);
      navigate("/login");
    }
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
                    handleQuantidadeChange(item.idProduto, novaQuantidade)
                  }
                  key={item.idProduto}
                />
              ))}
            </section>
          ) : (
            <section className={`${styles.cardItensCarrinho} card`}>
              <div className="col-12 text-center px-1 my-5">
                <MdOutlineRemoveShoppingCart size={35} className="mb-2" />
                <h5>Seu carrinho está vazio!</h5>
                <p>Você ainda não possui itens no seu carrinho.</p>
                <Link to={"/home"} className="btn btn-primary">
                  Ver produtos
                </Link>
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
          <ResumoPedido
            produtosComFrete={produtosComFrete}
            continuarCompra={continuarCompra}
            total={total}
            disabled={false}
            totalProdutos={quantidadeTotalProdutos}
            subtotal={subtotal}
          />
        ) : (
          <div className={`${styles.cardResumo2} card`}>
            <div className={styles.titleResumo2}>
              <h5>Resumo da compra</h5>
            </div>
            <p id={styles.textoSemProduto}>
              Aqui você encontrará os preços da sua compra assim que adicionar
              produtos.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
