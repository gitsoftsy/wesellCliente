/* eslint-disable no-unused-vars */
import CardProdutoCarrinho from "../../components/CardProdutoCarrinho";
import { useEffect, useState } from "react";

import styles from "./carrinho.module.css";
import { toast } from "react-toastify";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ResumoPedido from "../../components/ResumoPedido/index.jsx";
import useContexts from "../../hooks/useContext.js";
import axios from "axios";
import { url_base, url_img } from "../../services/apis.js";

export default function Carrinho() {
  const [idsProductsCart, setIdsProductsCart] = useState([]);
  const [idsProductsSave, setIdsProductsSave] = useState([]);
  const [produtosComFrete, setProdutosComFrete] = useState([]);
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [produtosSalvos, setProdutosSalvos] = useState([]);
  const [quantidadeItens, setQuantidadeItens] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { clientLogado } = useContexts();

  const navigate = useNavigate();

  useEffect(() => {
    const idsInCart = JSON.parse(localStorage.getItem("@wesellItemsInCart"));
    const idsInListSave = JSON.parse(
      localStorage.getItem("wesell-saved-items")
    );

    if (idsInCart) {
      getProducts(idsInCart);
    }

    if (idsInListSave) {
      getProductsSave(idsInListSave);
    }
  }, []);

  async function getImagensProduto(idProduto) {
    try {
      const response = await axios.get(
        url_base + `/imagens/produto/${idProduto}`
      );
      if (response.data.length > 0) {
        let caminho = response.data[0].imagem.split("ROOT");
        return `${url_img}${caminho[1]}`;
      }
      return null;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return null;
    }
  }

  async function getProducts(listaIds) {
    try {
      const response = await axios.post(url_base + "/produtos/recentes", {
        ids: listaIds,
      });

      const data = response.data;
      setIdsProductsCart(listaIds);

      let listaProdutos = await Promise.all(
        data.map(async (item) => {
          const imagemProduto = await getImagensProduto(item.idProduto);

          return {
            idProduto: item.idProduto,
            nomeProduto: item.nomeProduto,
            imagem: imagemProduto,
            precoPromocional: item.precoPromocional,
            freteGratis: item.freteGratis,
            lojista: item.lojista,
            altura: item.altura,
            largura: item.largura,
            profundidade: item.profundidade,
            peso: item.peso,
            qtd: 1,
          };
        })
      );

      setProdutosCarrinho(listaProdutos);

      const { quantidadeTotal, subtotalCalculado } = listaProdutos.reduce(
        (acc, produto) => {
          acc.quantidadeTotal += produto.qtd;
          acc.subtotalCalculado += produto.precoPromocional * produto.qtd;
          return acc;
        },
        { quantidadeTotal: 0, subtotalCalculado: 0 }
      );

      setQuantidadeItens(quantidadeTotal);
      setTotal(subtotalCalculado);
      setSubtotal(subtotalCalculado);

      const productsFilter = listaProdutos.filter(
        (item) => item.freteGratis === "N"
      );
      let modeloProdutos = productsFilter.map((item) => ({
        idProduto: item.idProduto,
        cepCd: item?.lojista?.cepCd,
        altura: item?.altura,
        largura: item?.largura,
        profundidade: item?.profundidade,
        peso: item?.peso,
      }));

      setProdutosComFrete(modeloProdutos);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProductsSave(listaIds) {
    try {
      const response = await axios.post(url_base + "/produtos/recentes", {
        ids: listaIds,
      });

      const data = response.data;
      setIdsProductsSave(listaIds);

      let listaProdutos = await Promise.all(
        data.map(async (item) => {
          const imagemProduto = await getImagensProduto(item.idProduto);

          return {
            idProduto: item.idProduto,
            nomeProduto: item.nomeProduto,
            imagem: imagemProduto,
            precoPromocional: item.precoPromocional,
            freteGratis: item.freteGratis,
            lojista: item.lojista,
            altura: item.altura,
            largura: item.largura,
            profundidade: item.profundidade,
            peso: item.peso,
            qtd: 1,
          };
        })
      );

      setProdutosSalvos(listaProdutos);
    } catch (error) {
      console.log(error);
    }
  }

  function removeProductSave(id) {
    setIdsProductsSave((idsAtuais) => {
      const idsFiltrados = idsAtuais.filter((item) => item !== id);

      localStorage.setItem("wesell-saved-items", JSON.stringify(idsFiltrados));

      return idsFiltrados;
    });

    setProdutosSalvos((produtosAntigos) =>
      produtosAntigos.filter(({ idProduto }) => idProduto !== id)
    );
  }

  function removeProduct(id) {
    setProdutosCarrinho((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.idProduto != id
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
      setQuantidadeItens(quantidadeTotal);

      return produtosFiltrados;
    });

    setIdsProductsCart((idsAtuais) => {
      const idsFiltrados = idsAtuais.filter((item) => item !== id);

      localStorage.setItem("@wesellItemsInCart", JSON.stringify(idsFiltrados));

      return idsFiltrados;
    });
  }

  function addToCart(novoProduto) {
    const carrinho = localStorage.getItem("@wesellItemsInCart");

    let productsInCart = JSON.parse(carrinho) || [];
    productsInCart.push(novoProduto.idProduto);
    localStorage.setItem("@wesellItemsInCart", JSON.stringify(productsInCart));

    setProdutosCarrinho((produtosAntigos) => {
      const novoCarrinho = [...produtosAntigos, novoProduto];
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
      setQuantidadeItens(quantidadeTotal);

      return novoCarrinho;
    });

    setIdsProductsCart((idsAntigos) => {
      const novosIds = [...idsAntigos, novoProduto.idProduto];
      return novosIds;
    });

    removeProductSave(novoProduto.idProduto);
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
      setQuantidadeItens(quantidadeTotal);

      return novoCarrinho;
    });
  }

  function saveItem(produto) {
    let salvos = JSON.parse(localStorage.getItem("wesell-saved-items")) || [];
    if (!salvos.some((item) => item === produto.idProduto)) {
      salvos.push(produto.idProduto);
      localStorage.setItem("wesell-saved-items", JSON.stringify(salvos));
    }

    setProdutosCarrinho((produtosAntigos) => {
      const produtosFiltrados = produtosAntigos.filter(
        (item) => item.idProduto !== produto.idProduto
      );

      atualizarProdutosComFrete(produtosFiltrados);

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
      setQuantidadeItens(quantidadeTotal);

      return produtosFiltrados;
    });

    setIdsProductsCart((idsAtuais) => {
      const idsFiltrados = idsAtuais.filter(
        (item) => item !== produto.idProduto
      );

      localStorage.setItem("@wesellItemsInCart", JSON.stringify(idsFiltrados));

      return idsFiltrados;
    });
  }

  function atualizarProdutosComFrete(produtos) {
    const productsFilter = produtos.filter((item) => item.freteGratis === "N");
    let modeloProdutos = [];

    productsFilter.forEach((item) => {
      for (let i = 0; i < item.qtd; i++) {
        modeloProdutos.push({
          idProduto: item.idProduto,
          cepCd: item?.lojista?.cepCd,
          altura: item.altura,
          largura: item.largura,
          profundidade: item.profundidade,
          peso: item.peso,
        });
      }
    });
    setProdutosComFrete(modeloProdutos);
  }

  function continuarCompra() {
    if (clientLogado) {
      localStorage.setItem(
        "@wesellItemsCheckout",
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
            disabled={false}
            quantidadeFretes={produtosComFrete.length}
            quantidadeItens={quantidadeItens}
            subtotal={subtotal}
            total={total}
            continuarCompra={continuarCompra}
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
