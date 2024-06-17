/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "./bannersPrincipais.css";

export default function BannersPrincipais({ banners }) {
  const bannersOrdenados = banners.sort((a, b) => a.ordem - b.ordem);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      navigation={true}
      modules={[Navigation]}
      className="customSwiper"
    >
      {bannersOrdenados.map((item) => {
        const newPathImagem = item.pathImagem.replace(
          "/opt/apache-tomcat-9.0.89/webapps/ROOT",
          "http://ec2-18-235-243-90.compute-1.amazonaws.com:8080"
        );
        return (
          <SwiperSlide key={item.idBanner}>
            <Link
              to={item.urlDestino}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={newPathImagem} alt={`Banner ${item.idBanner}`} />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
