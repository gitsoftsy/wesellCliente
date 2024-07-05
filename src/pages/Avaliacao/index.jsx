import { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./avaliacao.module.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { url_base, url_img } from '../../services/apis';
import { toast } from 'react-toastify';
import StarsAvaliation from '../../components/StarsAvaliation';

export default function Avaliacao() {
    const [produto, setProduto] = useState('')
    const [imgProduto, setImgProduto] = useState('')
    const { idProduto } = useParams();

    async function getImagemProduto() {
        await axios
            .get(url_base + `/imagens/produto/` + idProduto)
            .then((response) => {
                let caminho = response.data[0].imagem.split('ROOT')
                setImgProduto(`${url_img}${caminho[1]}`);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    }

    async function getProduto() {
        await axios
            .get(url_base + `/produtos/` + idProduto)
            .then((response) => {
                setProduto(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    }

    useEffect(() => {
        getProduto()
        getImagemProduto()
    }, [])


    return (
        <section className={styles.boxConteudo}>
            <div className={`container-md ${styles.containerAvaliacao}`} >
                {produto != '' ?
                    <>
                        <div className={`${styles.cardProduto}`}>
                            <img src={imgProduto} alt="Imagem do produto" />
                            <h1>O que você achou do produto?</h1>
                            <span>{produto.nomeProduto}</span>
                            <div className={`${styles.avaliacao}`}>
                                <span className={styles.txt}>Ruim</span>
                                <StarsAvaliation font={32} color={'#3483FA'} />
                                <span className={styles.txt}>Excelente</span>
                            </div>
                        </div>
                        <div className={styles.cardProduto}>
                            <h1>Dê mais detalhes sobre seu produto</h1>
                            <textarea name="descricao" id="descricao" placeholder='Eu achei o meu produto...'></textarea>
                        </div>
                        <div className={styles.btns}>
                            <button>Salvar</button>
                            <Link to="" className={styles.link}>Excluir Opniao</Link>
                        </div>
                    </>
                    :
                    <>
                        <div
                            className={`${styles.box} card`}
                            aria-hidden="true"
                        >
                            <span
                                className={`${styles.cardWave} placeholder`}
                            >
                            </span>
                        </div>
                        <div
                            className={`${styles.box} card`}
                            aria-hidden="true"
                        >
                            <span
                                className={`${styles.cardWave} placeholder`}
                            >
                            </span>
                        </div>
                    </>
                }
            </div>
        </section>
    );
}

