/* eslint-disable react/prop-types */
import styles from "./carrosselCategorias.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function CarrosselCategorias({ dadosApi }) {
  return (
    <div className={`${styles.areaTendencias} container`}>
      <h5>TENDÊNCIAS NA WESELL</h5>
      <Swiper
        slidesPerView={6}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={styles.carrosselCategorias}
      >
        {dadosApi.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.cardTendencia}>
              <div>
                <img src={item.imagem} alt={item.nome} />
              </div>
              <p className={styles.nomeCategoria}>{item.nome}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
