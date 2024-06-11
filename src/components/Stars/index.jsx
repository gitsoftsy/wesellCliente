import React from 'react';
import './AvaliacaoEstrelas.css';

const AvaliacaoEstrelas = ({ numeroAvaliacao, color, font }) => {
    const primeiraAvaliacao = numeroAvaliacao;
    const estrelas = [];

    const styleCor = {
        color: color ,
        fontSize: font
    }

    const style = {
        fontSize: font
    }

    // Adiciona as estrelas preenchidas
    for (let i = 0; i < primeiraAvaliacao; i++) {
        estrelas.push(<span key={i} className="stars" style={styleCor}>&#9733;</span>);
    }

    // Adiciona as estrelas vazias até completar 5 estrelas
    for (let i = primeiraAvaliacao; i < 5; i++) {
        estrelas.push(<span key={i} className="stars" style={style}>&#9734;</span>);
    }

    return (
        <div className="avaliacao-estrelas">
            <span>{estrelas}</span>
        </div>
    );
};

export default AvaliacaoEstrelas;
