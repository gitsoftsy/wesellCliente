import { Swiper, SwiperSlide } from "swiper/react";
import styles from './avaliation.module.css'
import { Autoplay } from "swiper/modules";
import AvaliacaoEstrelas from "../Stars";


const Avaliation = (props) => {
    const primeiraAvaliacao = props.numeroAvaliacao

    let images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s",
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSPk20Kgo3Snyqf3PFV3iZQRy9KoI-ZITGCjQxR3xlw&s"
    ]

    const style = {
        color: '#D07119',
        fontSize: '1rem',
    }

    return (
        <div className={styles.boxAvaliation}>
            <span>Wagner</span>
            <div className={styles.lineAvaliation}>
                <div className={styles.stars}>
                    <AvaliacaoEstrelas numeroAvaliacao={props.numeroAvaliacao} color={style.color} font={style.fontSize} />
                    <p>Avaliado em 25 de fevereiro de 2 024</p>
                </div>
            </div>
            <p>O console é top demais gráficos realistas, gostei muito. Entrega foi rápida, chegou antes do previsto</p>

            {
                images.length > 0 ?
                    images.length > 7 ?
                        <Swiper
                            slidesPerView={7}
                            spaceBetween={1}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className={styles.carrosselImagens}
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} />
                                </SwiperSlide>
                            ))}
                        </Swiper> :
                        <div className={styles.boxImg}>
                            {images.map((img, index) => (
                                <img key={index} src={img} className={styles.img} />
                            ))}
                        </div>
                    : ''
            }
        </div>
    )
}

export default Avaliation;