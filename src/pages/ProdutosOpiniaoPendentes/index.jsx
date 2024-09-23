import { useEffect, useState } from "react";
import CardOpiniaoProduto from "../../components/CardOpiniaoProduto";
import styles from "./produtosOpiniaoPendentes.module.css";
import { url_base } from "../../services/apis";
import axios from "axios";
import { toast } from "react-toastify";
export default function ProdutosOpiniaoPendentes() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getPedidos() {
      setLoading(true);
      const userStorage = localStorage.getItem("wesell-user-comprador");
      const userJson = JSON.parse(userStorage);
      axios
        .get(url_base + `/produtos/clientes?idCliente=` + userJson.id)
        // .get(url_base + `/produtos/clientes?idCliente=` + 1)
        .then((response) => {
          const dados = response.data;
          setPedidos(dados);
          console.log(dados);
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
  }, [setPedidos]);
  return (
    <div className={styles.containerHistorico}>
      <section className={`${styles.containerCli} ${styles.contentHistorico}`}>
        <div className={styles.headHistorico}>
          <h2>Opiniões</h2>
        </div>
        <div className={styles.cardsPedidos}>
          {loading && (
            <>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
              <div className="card placeholderWave" aria-hidden="true">
                <span
                  className="placeholder bg-secondary"
                  style={{ height: "100%" }}
                ></span>
              </div>
            </>
          )}
          {pedidos !=
          "Nenhum resultado encontrado para os parâmetros informados."
            ? pedidos.map((pedido) => (
                <CardOpiniaoProduto 
                key={pedido.idVendaItem}
                imagemProduto={pedido.imagem}
                nomeProduto={pedido.nomeProduto}
                dataCompra={pedido.dataVenda}
                idProduto={pedido.idProduto}
                />
              ))
            : ""}
        </div>
      </section>
    </div>
  );
}
