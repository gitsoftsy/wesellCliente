/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { url_base } from "../../services/apis";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import useContexts from "../../hooks/useContext";
import styles from "./navbar.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CategoryDropdown = ({ visible, onMouseLeave }) => {
  const { categorias, setCategoria } = useContexts();
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
                onClick={() => {
                  navigate("/c/" + formattedCategory);
                  setCategoria({ nome: item.categoria, id: item.idCategoria });
                }}
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
  const [categorias, setCategorias] = useState([]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const formatCategory = (categoria) => {
    return removeAccents(categoria).toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    async function getCategorias() {
      await axios
        .get(url_base + "/categorias/destaques")
        .then((response) => {
          setCategorias(response.data.data);
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    }

    getCategorias();
  });

  const handleMouseEnter = () => {
    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.categorias} onMouseEnter={handleMouseEnter}>
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
          to="/favoritos"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Favoritos
        </NavLink>
        {categorias.map((categoria) => {
          const formattedCategory = formatCategory(categoria.categoria);

          return (
            <NavLink
              key={categoria.categoria}
              to={`/c/${formattedCategory}`}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              {categoria.categoria}
            </NavLink>
          );
        })}
      </nav>

      <CategoryDropdown
        visible={showDropdown}
        onMouseLeave={() => setShowDropdown(false)}
      />
    </div>
  );
}
