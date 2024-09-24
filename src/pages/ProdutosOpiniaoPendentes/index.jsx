import { useEffect, useState } from "react";
import CardOpiniaoProduto from "../../components/CardOpiniaoProduto";
import styles from "./produtosOpiniaoPendentes.module.css";
import { url_base } from "../../services/apis";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";

export default function ProdutosOpiniaoPendentes() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState([]); // Estado para controlar os itens que estão sendo removidos
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const hasMore = visibleCount < pedidos.length;

  useEffect(() => {
    setLoading(true);
    async function getPedidos() {
      setLoading(true);
      const userStorage = localStorage.getItem("wesell-user-comprador");
      // eslint-disable-next-line no-unused-vars
      const userJson = JSON.parse(userStorage);
      axios
        .get(url_base + `/produtos/clientes?idCliente=` + userJson.id)
        // .get(url_base + `/produtos/clientes?idCliente=` + 7)
        .then((response) => {
          const dados = response.data;
          setPedidos(dados);
        })
        .catch((error) => {
          toast.error("Erro na requisição.");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getPedidos();
  }, []);

  const handleRemove = (idVendaItem) => {
    // Adiciona o item à lista de itens sendo removidos
    setRemoving((prev) => [...prev, idVendaItem]);

    // Remove o item após a animação (500ms, por exemplo)
    setTimeout(() => {
      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.idVendaItem !== idVendaItem)
      );
      // Remove o item da lista de itens sendo removidos
      setRemoving((prev) => prev.filter((id) => id !== idVendaItem));
    }, 500); // Atraso para coincidir com a duração da animação
  };

  return (
    <div className={styles.containerHistorico}>
      <section className={`${styles.containerCli} ${styles.contentHistorico}`}>
        <div className={styles.headHistorico}>
          <h2>Opiniões</h2>
        </div>
        <div className={styles.cardsPedidos}>
          {loading && (
            <>
              {/* Placeholder loading cards */}
            </>
          )}
          {pedidos != "Nenhum resultado encontrado para os parâmetros informados." 
            ? pedidos.slice(0, visibleCount).map((pedido) => (
                <div
                  key={pedido.idVendaItem}
                  className={`${styles.card} ${
                    removing.includes(pedido.idVendaItem) ? styles.removing : ""
                  }`}
                >
                  <CardOpiniaoProduto
                    imagemProduto={pedido.imagem}
                    nomeProduto={pedido.nomeProduto}
                    dataCompra={pedido.dataVenda}
                    idProduto={pedido.idProduto}
                    idVendaItem={pedido.idVendaItem}
                    funcReload={() => handleRemove(pedido.idVendaItem)}
                  />
                </div>
              ))
            : ""}

          {hasMore && (
            <h6 onClick={loadMoreItems} className={styles.loadItens}>
              Carregar mais <IoIosArrowDown size={18} />
            </h6>
          )}
        </div>
      </section>
    </div>
  );
}
