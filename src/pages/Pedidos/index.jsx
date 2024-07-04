import { useEffect, useRef, useState } from 'react';
import useContexts from '../../hooks/useContext'
import { url_base } from '../../services/apis';
import styles from './pedidos.module.css'
import axios from 'axios';
import CardPedido from '../../components/CardPedido';

export default function Pedidos() {
    const { client } = useContexts()
    const [loading, setLoading] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const showModal = useRef(null);

    useEffect(() => {
        setLoading(true)
        async function getPedidos() {
            setLoading(true)
            await axios
                .get(
                    url_base + `/pedidos`
                )
                .then((response) => {
                    setLoading(false)
                    const dados = response.data;
                    setPedidos(dados);
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
                    {pedidos.slice().reverse().map((item) => {
                        return (
                            <CardPedido
                                key={item.idPedido}
                                idPedido={item.idPedido}
                                status={item.status}
                                produtos={item.produtos}
                                valorTotal={item.valorTotal}
                                formaPagamento={item.formaPagamento}
                                getDetails={() => { }}
                            />
                        );
                    })}
                    {loading && (
                        <>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                            <div
                                className="card placeholderWave"
                                aria-hidden="true"
                            >
                                <span
                                    className="placeholder bg-secondary"
                                    style={{ height: "100%" }}
                                ></span>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <button
                ref={showModal}
                hidden
                data-bs-toggle="modal"
                data-bs-target="#detalhesPedido"
            ></button>
            {/* <DetalhesPedido details={detailsPedido} cancelamento={false} /> */}
        </div>
    )
}