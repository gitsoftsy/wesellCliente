import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { useState } from "react";

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.expandFooter}`} onClick={toggleFooter}>
        <p>
          Mais informações{" "}
          {isExpanded ? <IoIosArrowDown size={18} /> : <IoIosArrowUp size={18} />}
        </p>
      </div>
      {isExpanded && (
        <div className={styles.areaInfoFooter}>
          <div className={`${styles.content} container`}>
            <nav>
              <Link>Termos e condições</Link>
              <Link>Como cuidamos da sua privacidade</Link>
              <Link>Acessibilidade</Link>
              <Link>Contato</Link>
              <Link>Informações sobre seguros</Link>
            </nav>
            <p>
              Copyright © 1999-2024 - Estrada Velha de Itapevi - Barueri - SP -
              02674030
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
