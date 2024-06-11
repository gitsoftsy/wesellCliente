import { GoHeart, GoHeartFill } from "react-icons/go";
import styles from "./heart.module.css"

const FavoriteIcon = ({ status, onClick }) => {
    return (
        <>
            {status ? <GoHeartFill className={styles.icon} onClick={onClick}/> : <GoHeart className={styles.icon} onClick={onClick}/>}
        </>
    )
}

export default FavoriteIcon;