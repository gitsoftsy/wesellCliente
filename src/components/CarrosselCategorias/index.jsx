/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./carrosselCategorias.module.css";
import { useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContext";
import { url_img } from "../../services/apis";

export default function CarrosselCategorias({ dadosApi, isMobile }) {
  const navigate = useNavigate();
  const { setCategoria } = useContexts();
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const formatCategory = (categoria) => {
    return removeAccents(categoria).toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className={`${styles.areaTendencias} container`}>
      <h5>TENDÊNCIAS NA WESELL</h5>
      <Swiper
        slidesPerView={isMobile ? 3 : 6}
        spaceBetween={isMobile ? 0 : 25}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={styles.carrosselCategorias}
      >
        {dadosApi.map((item) => {
          const formattedCategory = formatCategory(item.categoria);

          const newPathImagem = item.pathImagem?.replace(
            "/opt/apache-tomcat-9.0.89/webapps",
            url_img
          );
          return (
            <SwiperSlide key={item.idCategoria}>
              <div className={styles.cardTendencia}>
                <div>
                  <img
                    src={newPathImagem}
                    alt={item.categoria}
                    onClick={() => {
                      navigate("/c/" + formattedCategory);
                      setCategoria({nome: item.categoria, id: item.idCategoria})
                    }}
                  />
                </div>
                <p
                  className={styles.nomeCategoria}
                  onClick={() => {
                    navigate("/c/" + formattedCategory);
                    setCategoria({nome: item.categoria, id: item.idCategoria})
                  }}
                >
                  {item.categoria}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
