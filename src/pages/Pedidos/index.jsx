import { useEffect, useState } from "react";
import { url_base, url_img } from "../../services/apis";
import styles from "./pedidos.module.css";
import axios from "axios";
import CardCompra from "../../components/CardCompra";
import { toast } from "react-toastify";

export default function Pedidos() {
  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getPedidos() {
      setLoading(true);
      await axios
        .get(url_base + `/produtos/19`)
        .then((response) => {
          const dados = response.data;
          setPedido(dados);
          console.log(dados);
          axios
            .get(url_base + `/imagens/produto/19`)
            .then((response) => {
              let caminho = response.data[0].imagem.split("ROOT");
              setImage(`${url_img}${caminho[1]}`);
            })
            .catch((error) => {
              console.log(error.message);
            });
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
          {pedido && image && <CardCompra pedido={pedido} status="E" imagem={image} />}
        </div>
      </section>
    </div>
  );
}
