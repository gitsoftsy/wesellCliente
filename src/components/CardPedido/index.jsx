/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './cardPedido.module.css'
import formatCurrencyBR from '../../hooks/formatCurrency';

export default function CardPedido(props) {
    const [classeSt, setClasseSt] = useState(null);
    const [st, setSt] = useState(null);

    useEffect(() => {
        if (props.status === "A") {
            setSt("AGUARDANDO PAGAMENTO");
            setClasseSt('#FCEE47')
        } else if (props.status === "P") {
            setSt("PAGAMENTO REALIZADO");
            setClasseSt("#198754")
        } else if (props.status === "E") {
            setSt("PAGAMENTO ESTORNADO");
            setClasseSt("#6C757D")
        } else if (props.status === "N") {
            setSt("PAGAMENTO NEGADO");
            setClasseSt("#DC3545");
        } else if (props.status === "C") {
            setSt("PAGAMENTO CANCELADO");
            setClasseSt("#DC3545");
        }
    }, [])

    return (
        <div className={styles.cardPedido}>
            <div
                className={styles.titleCardPedido}
                style={{
                    backgroundColor:
                        classeSt,
                    color: props.status !== "A" ? "#f8f8f8" : "#3b3b3b",
                }}
            >
                <h5>{st}</h5>
            </div>
            <div className={styles.bodyCardPedido}>
                {props.formaPagamento === "RECORRENCIA" && props.status === "P" ? (
                    <div className={styles.headerCardPedido}>
                        <h5>PEDIDO Nº {props.idPedido}</h5>
                        <h6 className={styles.showDetailsHeader} onClick={() => getDetails(props.idPedido)}>
                            Ver detalhes
                        </h6>
                    </div>
                ) : (
                    <h5 className={styles.numberPedido}>PEDIDO Nº {props.idPedido}</h5>
                )}
                <div className="d-flex justify-content-between">
                    <p className="col-8">Item</p>
                    <p className="col-1">Qtd</p>
                    <p className="col-3 text-end">Valor</p>
                </div>

                {props.produtos.map((item) => {
                    return (
                        <div key={item.idProduto} className="d-flex justify-content-between">
                            <p className="col-8">{item.nome}</p>
                            <p className="col-1">{item.quantidade} x</p>
                            <p className="col-3 text-end">
                                {formatCurrencyBR(item.precoUnitario)}
                            </p>
                        </div>
                    );
                })}

                {props.formaPagamento === "RECORRENCIA" && props.status === "P" ? (
                    <div className={styles.footerCardPedido}>
                        <h6>
                            Total {formatCurrencyBR(props.valorTotal)} - RECORRÊNCIA
                        </h6>
                        <h6
                            className={styles.showDetails}
                            style={{ whiteSpace: "nowrap" }}
                            onClick={() => getDetails(props.idPedido)}
                        >
                            Exibir detalhes
                        </h6>
                    </div>
                ) : (
                    <h5 className={styles.totalCardPedido}>
                        Total R$ {props.valorTotal && formatCurrencyBR(props.valorTotal)} -{" "}
                        {props.formaPagamento}
                    </h5>
                )}
            </div>

        </div>
    )
}
