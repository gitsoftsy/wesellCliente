import { Link } from 'react-router-dom'
import styles from './carrinho.module.css'
import { MdOutlineAccessTime } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'

export default function Carrinho() {
    return (
        <section id={styles.carrinho} className='container pt-4'>
            <div className="col-12 title-carrinho d-flex justify-content-between">
                <h2 className="mb-0 text-secondary">Meu carrinho</h2>

                <div className="d-flex gap-3">
                    <Link
                        className="btn btn-sm rounded-pill btn-secondary text-white px-3 d-flex align-items-center justify-content-center"
                        to="/minha-conta/pedidos"
                    >
                        <MdOutlineAccessTime className="me-2" size={22} />
                        Histórico de compras
                    </Link>
                    <Link
                        className="btn btn-sm rounded-pill btn-danger px-3 d-flex align-items-center justify-content-center"
                        onClick={''}
                    >
                        <FiShoppingCart size={20} className="me-2" />
                        Limpar carrinho
                    </Link>
                </div>
            </div>
            <hr />
        </section>
    )
}