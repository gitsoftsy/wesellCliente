import styles from "./header.module.css";
import Logo from "../../assets/logoWesell.svg";
import { IoCaretDown } from "react-icons/io5";
import { PiShoppingCartLight } from "react-icons/pi";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut, FiPackage, FiSearch, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState({})

  const logout = () => {
    localStorage.removeItem('wesell-user-comprador')
    window.location.reload()
  }

  useEffect(() => {
    const jsonUser = JSON.parse(localStorage.getItem('wesell-user-comprador'))
    if (jsonUser) {
      setUser(jsonUser)
    }
  }, [])

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
              <p>Olá, {user.nome ? user.nome.split(' ')[0] : 'Bem vindo'}</p>
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
              {user.id ?
                <ul
                  className="dropdown-menu links-drop"
                  aria-labelledby="dropdownMenuButton"
                >

                  <li>
                    <Link
                      to={"/minha-conta/pedidos"}
                      className={`${styles.dropdownItem} dropdown-item`}
                    >
                      <FiPackage size={18} />
                      Pedidos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/minha-conta"}
                      className={`${styles.dropdownItem} dropdown-item`}
                    >
                      <FiUser size={18} />
                      Cadastro
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/"}
                      className={`${styles.dropdownItem} dropdown-item`}
                      onClick={logout}
                    >
                      <FiLogOut size={18} />
                      Sair da conta
                    </Link>
                  </li>
                </ul>
                :
                <ul
                  className="dropdown-menu links-drop"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link
                      to={"/registro"}
                      className={`${styles.dropdownItem} dropdown-item`}
                    >
                      <FiUser size={18} />
                      Criar conta
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/login"}
                      className={`${styles.dropdownItem} dropdown-item`}
                    >
                      <FiLogIn size={18} />
                      Login
                    </Link>
                  </li>
                </ul>
              }
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
