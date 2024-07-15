/* eslint-disable react/prop-types */
import { GoHeart, GoHeartFill } from "react-icons/go";
import styles from "./heart.module.css"

const FavoriteIcon = ({ favoritado, handleFavorite, produto }) => {

    const adicionarAosFavoritos = (produto) => {
        let favoritos = JSON.parse(localStorage.getItem("wesell-favorites-comprador")) || [];
        if (!favoritos.some(item => item.idProduto == produto.idProduto)) {
            favoritos.push(produto);
            localStorage.setItem("wesell-favorites-comprador", JSON.stringify(favoritos));
        }
        handleFavorite(!favoritado);
    };

    const removerDosFavoritos = (produto) => {
        let favoritos = JSON.parse(localStorage.getItem("wesell-favorites-comprador")) || [];
        favoritos = favoritos.filter(item => item.idProduto != produto.idProduto);
        localStorage.setItem("wesell-favorites-comprador", JSON.stringify(favoritos));
        handleFavorite(!favoritado);
    };


    const handleClick = () => {
        if (favoritado) {
            removerDosFavoritos(produto);
        } else {
            adicionarAosFavoritos(produto);
        }
    };

    return (
        <>
            {favoritado ? (
                <GoHeartFill className={styles.icon} size={26} onClick={handleClick} />
            ) : (
                <GoHeart className={styles.icon} size={26} onClick={handleClick} />
            )}
        </>
    )
}

export default FavoriteIcon;