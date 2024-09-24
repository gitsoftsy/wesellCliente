import { useEffect, useState } from "react";
import { url_base } from "../../services/apis";
import styles from "./pedidos.module.css";
import axios from "axios";
import CardCompra from "../../components/CardCompra";
import { toast } from "react-toastify";
import CardOpiniaoPendente from "../../components/CardOpiniaoPendente";

export default function Pedidos() {
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  // const [avaliacaoPendente, setAvaliacaoPendente] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function getPedidos() {
      setLoading(true);
      const userStorage = localStorage.getItem("wesell-user-comprador");
      const userJson = JSON.parse(userStorage);
      let idSearch = userJson.id != undefined ? userJson.id : userJson.idCliente
      await axios
      ///produtos/clientes?idCliente=14
        .get(url_base + `/produtos/clientes?idCliente=` + idSearch)
        // .get(url_base + `/produtos/clientes?idCliente=` + 1)
        .then((response) => {
          const dados = response.data;
          setPedidos(dados);
          console.log(response);
          console.log(response.data);
          console.log( idSearch);
          console.log( userJson.id);
          console.log( userJson.idCliente);
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

  return (
    <div className={styles.containerHistorico}>
      <section className={`${styles.containerCli} ${styles.contentHistorico}`}>
        <div className={styles.headHistorico}>
          <h2>Pedidos</h2>
        </div>
        <div className={styles.cardsPedidos}>
          {pedidos.length > 0 && pedidos[pedidos.length - 1].totalAvaliacaoNull > 0 && (
            <CardOpiniaoPendente
              quantidade={pedidos[pedidos.length - 1].totalAvaliacaoNull}
            />
          )}
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
          "Nenhum resultado encontrado para os parâmetros informados." && pedidos.length >0
            ? pedidos.map((pedido) => (
                pedido.idProduto != null && <CardCompra
                  key={pedido.idVendaItem}
                  pedido={pedido}
                  status="E"
                />
              ))
            : ""}
        </div>
      </section>
    </div>
  );
}
