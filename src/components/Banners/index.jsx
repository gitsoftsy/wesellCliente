import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import Banner1 from "../../assets/bannerInicial.jpg";
import Banner2 from "../../assets/bannerTeste.jpg";

export default function Banners() {
  return (
    <Swiper
      slidesPerView={1}
      effect={"fade"}
      spaceBetween={30}
      loop={true}
      navigation={true}
      modules={[EffectFade, Navigation]}
    >
      <SwiperSlide>
        <img src={Banner1} alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={Banner2} alt="Banner 2" />
      </SwiperSlide>
    </Swiper>
  );
}
