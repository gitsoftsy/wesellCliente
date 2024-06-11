/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CardProduto from "../CardProduto";
import styles from "./carrosselprodutos.module.css";

export default function CarrosselProdutos({ produtos }) {
  return (
    <div className="container">
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={styles.carrosselProdutos}
      >
        {produtos.map((produto) => (
          <SwiperSlide key={produto.id}>
            <CardProduto produto={produto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
