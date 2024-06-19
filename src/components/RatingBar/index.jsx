/* eslint-disable react/prop-types */
import styles from './ratingBar.module.css'

const RatingnBar = (props) => {
    const barPosition = {
        display: 'flex',
        height: '100%',
        backgroundColor: '#0732B5',
        width: `${props.porcentagem}%`,
        borderRadius: '16px',
        color: 'aqua',
        position: 'relative',
    }

    return (
        <div className={styles.bar}>
            <span className={styles.stars}> {props.estrelas} estrelas</span>
            <div className={styles.ratingBarBg}><div style={barPosition}></div></div>
            <span>{props.porcentagem}%</span>
        </div>
    )
}

export default RatingnBar;