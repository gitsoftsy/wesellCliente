/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './cardRecommendation.module.css'

const CardRecommendation = (props) => {
    return (
        <div className={styles.card}>
            {props.status ? <CardGood value={props.value} /> : <CardBad value={props.value} />}
        </div>
    )
}

const CardGood = ({value}) => {
    const styleGood = {
        color: '#0732B5'
    }

    return (
        <>
            <span style={styleGood}>{value}%</span>
            <p>dos clientes <strong>recomendam</strong> este produto</p>
        </>
    )
}

const CardBad = ({value}) => {
    const styleBad = {
        color: '#8A8C8D'
    }

    return (
        <>
            <span style={styleBad}>{value}%</span>
            <p>dos clientes <strong>não recomendam</strong> este produto </p>
        </>
    )
}

export default CardRecommendation;