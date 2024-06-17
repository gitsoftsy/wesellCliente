import styles from "./header.module.css";
import Logo from "../../assets/logoHeader.png";
import { MdInsertChartOutlined } from "react-icons/md";
import { IoCaretDown } from "react-icons/io5";
import { PiShoppingCartLight } from "react-icons/pi";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsClipboardData } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={`${styles.headerContainer} container`}>
          <Link to="/">
            <img src={Logo} alt="Logo Wesell" />
          </Link>
          <form className={styles.searchForm}>
            <input
              type="text"
              placeholder="Buscar produtos, marcas e muito mais..."
            />
            <button type="submit" className="ps-2">
              <FiSearch size={24} color="#797979d5" />
            </button>
          </form>

          <span className={styles.areaIconCar}>
            <span className="dropdown-center">
              <p>Olá, Giovanna</p>
              <p
                className={`${styles.dropdownToggle} dropdown-toggle`}
                data-bs-auto-close="outside"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                <strong>
                  Minha conta <IoCaretDown />
                </strong>
              </p>
              <ul
                className="dropdown-menu links-drop"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link
                    to={"/relatorio-de-vendas"}
                    className={`${styles.dropdownItem} dropdown-item`}
                  >
                    <MdInsertChartOutlined size={18} />
                    Relátorio de vendas
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/produtos-vendidos"}
                    className={`${styles.dropdownItem} dropdown-item`}
                  >
                    <BsClipboardData size={18} />
                    Produtos vendidos
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className={`${styles.dropdownItem} dropdown-item`}
                  >
                    <FiUser size={18} />
                    Meus dados pessoais
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className={`${styles.dropdownItem} dropdown-item`}
                  >
                    <AiOutlineBank size={18} />
                    Meus dados bancários
                  </Link>
                </li>
              </ul>
            </span>
            <Link to='/carrinho'>
              <PiShoppingCartLight
                size={40}
                color="fff"
              />
            </Link>
          </span>
        </div>
      </div>
      <NavBar />
    </header>
  );
}
