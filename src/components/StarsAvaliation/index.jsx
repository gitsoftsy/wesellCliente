import React, { useState } from 'react';
import styles from './starsAvaliation.module.css'

const StarsAvaliation = ({ color, font }) => {
    const [avaliacao, setAvaliacao] = useState(0); // Estado para controlar o número de estrelas preenchidas

    const styleCor = {
        color: color,
        fontSize: font
    };

    const style = {
        fontSize: font
    };

    const handleClick = (index) => {
        setAvaliacao(index + 1); // Atualiza o estado para a quantidade de estrelas clicadas
    };

    const estrelas = [];
    for (let i = 0; i < 5; i++) {
        estrelas.push(
            <span
                key={i}
                className={`stars ${styles.estrelas}`}
                style={i < avaliacao ? styleCor : style}
                onClick={() => handleClick(i)} // Adiciona o evento de clique
            >
                {i < avaliacao ? '\u2605' : '\u2606'} {/* \u2605 é a estrela preenchida e \u2606 é a estrela vazia */}
            </span>
        );
    }

    return (
        <div className="avaliacao-estrelas">
            {estrelas}
        </div>
    );
};

export default StarsAvaliation;
