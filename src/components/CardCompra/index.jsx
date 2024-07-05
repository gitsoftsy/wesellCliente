import { Link } from 'react-router-dom'
import styles from './cardCompra.module.css'
import ImagemProduto from "../../assets/wesell_vertical_azul.png";
import { useEffect, useState } from 'react';

export default function CardCompra({ compra }) {
    const [classeSt, setClasseSt] = useState(null);
    const [st, setSt] = useState(null);

    useEffect(() => {
        if (compra.status === "A") {
            setSt("AGUARDANDO PAGAMENTO");
            setClasseSt('#FCEE47')
        } else if (compra.status === "P") {
            setSt("PAGAMENTO REALIZADO");
            setClasseSt("#198754")
        } else if (compra.status === "E") {
            setSt("PAGAMENTO ESTORNADO");
            setClasseSt("#6C757D")
        } else if (compra.status === "N") {
            setSt("PAGAMENTO NEGADO");
            setClasseSt("#DC3545");
        } else if (compra.status === "C") {
            setSt("PAGAMENTO CANCELADO");
            setClasseSt("#DC3545");
        }
    }, [])

    return (
        <article className={styles.containerCompra}>
            <div className={styles.boxData}>
                <p className={styles.dataCompra}>11 de junho</p>
            </div>
            <div className={styles.boxCompra}>
                <div className={styles.boxImg}>
                    <span>
                        <img src={ImagemProduto} alt="Imagem do produto" />
                    </span>
                </div>
                <div className={styles.boxDados}>
                    <div className={styles.boxDescricao}>
                        <p
                            className={styles.statusCompra}
                            style={{ color: '#00a650' }}
                        >Entregue</p>
                        <h2 className={styles.statusEntrega}>Chegou dia 15 de junho</h2>
                        <span className={styles.nomeProduto}>Cabo Adaptador Usb 3.0 Para Hd E Ssd 2.5 Premium</span>
                        <span className={styles.quantidadeProduto}>1 unidade</span>
                    </div>
                    <div className={styles.boxVendedor}>
                        <p id={styles.pagamento}>Forma de pagamento: Cartão de crédito</p>
                        <p id={styles.valor}>Valor: R$15,90</p>
                        <span>Vendedor Kabum</span>
                    </div>
                </div>
                <div className={styles.boxBtn}>
                    <Link to='' className={styles.btnCompra}>Ver produto</Link>
                    <Link to='' className={styles.comprarMais}>Comprar novamente</Link>
                </div>
            </div>
        </article>
    )
}