/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import styles from "./bannersSecundarios.module.css";
import { url_img } from "../../services/apis";

export default function BannersSecundarios({ banners }) {
  const bannersOrdenados = banners.sort((a, b) => a.ordem - b.ordem);

  return (
    <div className={`${styles.areaBanner} container`}>
      <h5>NOVIDADE NA ÁREA</h5>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        className={styles.carrossel}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {bannersOrdenados.map((item) => {
          const newPathImagem = item.pathImagem.replace(
            "/opt/apache-tomcat-9.0.89/webapps/ROOT",
            url_img
          );
          return (
            <SwiperSlide key={item.idBanner}>
              <Link
                to={item.urlDestino}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={newPathImagem}
                  alt={`Banner secundário ${item.idBanner}`}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
