const formatPriceBR = (value) => {
    const fixedValue = (Math.floor(value * 100) / 100).toFixed(2);

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(fixedValue);
};

export default formatPriceBR;