import { useEffect, useState } from "react";
import GridProdutos from "../../components/GridProdutos";
import styles from "./produtos.module.css";
import axios from "axios";
import DoubleRangeSlider from "../../components/DoubleRangeSlider";
import { url_base2 } from "../../services/apis";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [showAllCategorias, setShowAllCategorias] = useState(false);
  const [showAllMarcas, setShowAllMarcas] = useState(false);
  const [showAllLojas, setShowAllLojas] = useState(false);

  const lojas = [
    "Softsy",
    "Magalu",
    "Americanas",
    "Kabum",
    "Amazon",
    "Pichau",
    "Wesell",
  ];

  const categorias = [
    "Celulares e Smartphones",
    "Eletrônicos",
    "Informática",
    "Telefonia Fixa",
    "Brinquedos",
    "Recém chegados",
    "Tablets, iPads e E-reader",
    "Ferramenta",
  ];

  const marcas = [
    "Alcatel",
    "Android",
    "Apple",
    "ASUS",
    "Honor",
    "Huawei",
    "Motorola",
    "Samsung",
    "Xiaomi",
  ];

  useEffect(() => {
    async function getProdutos() {
      await axios
        .get(url_base2 + `/produtos`)
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    getProdutos();
  }, []);

  return (
    <section className={`${styles.mainContainer} container`}>
      <aside className={styles.containerFiltros}>
        <h6>Categoria</h6>
        <ul>
          {categorias
            .slice(0, showAllCategorias ? categorias.length : 5)
            .map((item, index) => {
              return (
                <li key={index}>
                  <label className={styles.labelItem}>{item}</label>
                </li>
              );
            })}
          <span onClick={() => setShowAllCategorias(!showAllCategorias)}>
            {showAllCategorias ? <>Ver menos</> : <>Ver todos</>}
          </span>
        </ul>
        <h6>Marcas</h6>
        <ul>
          {marcas
            .slice(0, showAllMarcas ? marcas.length : 5)
            .map((item, index) => {
              const id = `checkbox-${index}`;
              return (
                <li key={index}>
                  <input className="form-check-input" type="checkbox" id={id} />
                  <label htmlFor={id} className={styles.labelItem}>
                    {item}
                  </label>
                </li>
              );
            })}
          <span onClick={() => setShowAllMarcas(!showAllMarcas)}>
            {showAllMarcas ? <>Ver menos</> : <>Ver todos</>}
          </span>
        </ul>
        <h6 className="mb-2">Preço</h6>
        <DoubleRangeSlider />
        <h6>Vendido por</h6>
        <ul>
          {lojas
            .slice(0, showAllLojas ? lojas.length : 5)
            .map((item, index) => {
              const id = `checkbox-${index}`;
              return (
                <li key={index}>
                  <input className="form-check-input" type="checkbox" id={id} />
                  <label htmlFor={id} className={styles.labelItem}>
                    {item}
                  </label>
                </li>
              );
            })}
          <span onClick={() => setShowAllLojas(!showAllLojas)}>
            {showAllLojas ? <>Ver menos</> : <>Ver todos</>}
          </span>
        </ul>
      </aside>
      <section className={styles.containerProdutos}>
        <section className={styles.areaOrdenacao}>
          <div>
            <h4>Resultados para &#34;celulares&#34;</h4>
            <p className="mb-0">Mais de 10.000 produtos encontrados.</p>
          </div>
          <div className={styles.sortBar}>
            <label>Ordenar por:</label>
            <div className={styles.sortBy}>
              <select
                name="sort-by"
                id="sort-by"
                className="form-select form-select-sm"
              >
                <option value="relevancia">Relevância</option>
                <option value="maisVendidos">Mais vendidos</option>
                <option value="maiorComissao">Maior comissão</option>
                <option value="menorComissao">Menor comissão</option>
              </select>
            </div>
          </div>
        </section>
        <GridProdutos
          titleVisivel={false}
          qtdVisivel={12}
          produtos={produtos}
        />
      </section>
    </section>
  );
}
