/* eslint-disable react/prop-types */
import styles from "./bannerDestaque.module.css";
import Banner from "../../assets/bannerBaixo.png"

export default function BannerDestaque() {
  return (
    <div className={`${styles.areaBanner} container`}>
      <h5>NOVIDADE NA ÁREA</h5>
      <img src={Banner} alt="Banner" />
    </div>
  );
}
