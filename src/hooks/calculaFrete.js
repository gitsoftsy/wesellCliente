import axios from "axios";
import { apiFrete } from "../services/apis";

function limparMascara(valor) {
  return valor ? valor.replace(/[^\d]+/g, "") : "";
}

async function calculaFrete(produtos, cep) {
  const promessasFrete = produtos.map(async (item) => {
    let objetoApi = {
      from: {
        postal_code: item.cepCd,
      },
      to: {
        postal_code: limparMascara(cep),
      },
      package: {
        height: item.altura,
        width: item.largura,
        length: item.profundidade,
        weight: item.peso,
      },
    };

    try {
      const response = await axios.post(apiFrete, objetoApi);

      if (response.data.sucesso) {
        const fretes = response.data.retorno;

        const freteMenorValor = fretes
          .filter((item) => !item.error)
          .reduce(
            (minFrete, currentFrete) => {
              return parseFloat(currentFrete.price) < parseFloat(minFrete.price)
                ? currentFrete
                : minFrete;
            },
            { price: "Infinity" }
          );

        return { item: item.idProduto, frete: freteMenorValor };
      } else {
        console.error(response.data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const resultadosFrete = await Promise.all(promessasFrete);

  return resultadosFrete;
}

export { calculaFrete };
