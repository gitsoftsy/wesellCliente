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
            <p>dos clientes <strong>recomendam</strong> esse produto</p>
        </>
    )
}

const CardBad = ({value, text}) => {
    const styleBad = {
        color: '#8A8C8D'
    }

    return (
        <>
            <span style={styleBad}>{value}%</span>
            <p>dos clientes <strong>não recomendam</strong> esse produto </p>
        </>
    )
}

export default CardRecommendation;