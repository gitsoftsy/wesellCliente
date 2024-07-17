/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import useContexts from "../../hooks/useContext";
import styles from "./navbar.module.css";

const CategoryDropdown = ({ visible, onMouseLeave }) => {
  const { categorias } = useContexts();
  const navigate = useNavigate();

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const formatCategory = (categoria) => {
    return removeAccents(categoria).toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div
      className={visible ? styles.dropdownVisible : styles.dropdownHidden}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.dropdownContent}>
        <ul className={styles.categoryList}>
          {categorias.map((item) => {
            const formattedCategory = formatCategory(item.categoria);

            return (
              <li
                onClick={() => navigate("/c/" + formattedCategory)}
                key={item.idCategoria}
              >
                {item.categoria}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div
          className={styles.categorias}
          onMouseEnter={handleMouseEnter}
        >
          Categorias
          <IoIosArrowDown size={18} className={styles.arrowIcon} />
        </div>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Ofertas do Dia
        </NavLink>

        <NavLink
          to="/tecnologia"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Tecnologia
        </NavLink>

        <NavLink
          to="/esportes"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Esportes
        </NavLink>

        <NavLink
          to="/moda"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Moda
        </NavLink>
        <NavLink
          to="/suporte-ao-cliente"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Suporte ao cliente
        </NavLink>
      </nav>

      <CategoryDropdown
        visible={showDropdown}
        onMouseLeave={() => setShowDropdown(false)}
      />
    </div>
  );
}
