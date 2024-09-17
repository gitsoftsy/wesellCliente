import styles from "./headerMobile.module.css";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import useContexts from "../../hooks/useContext";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import Logo from "../../assets/logoWesell.svg";
import { MdMenuOpen } from "react-icons/md";

export default function HeaderMobile() {
  const [toggled, setToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    categorias,
    setCategoria,
    setValueSearch,
    categoria,
    setClient,
    clientLogado,
  } = useContexts();

  const navigate = useNavigate();

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const formatCategory = (categoria) => {
    return removeAccents(categoria).toLowerCase().replace(/\s+/g, "-");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setValueSearch(searchTerm);
    navigate(`/produtos/${searchTerm}`);
  };

  const logout = () => {
    setClient(null)
    localStorage.removeItem("wesell-user-comprador");
    localStorage.setItem("@wesellRouteOnCar", false);
    navigate("/login");
  };

  useEffect(() => {
    if (categoria) {
      setSearchTerm("");
    }
  }, [categoria]);

  return (
    <>
      <Sidebar
        className={styles.menu}
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="always"
      >
        <Menu>
          <MenuItem className={styles.menuItemMobile}>
            <img
              src={Logo}
              className={styles.logo}
              alt="Logo Wesell"
              onClick={() => {
                navigate("/");
                setToggled(false);
              }}
            />
            <MdMenuOpen
              id={styles.iconCloseMenu}
              size={35}
              className="sb-button me-2"
              color="#fff"
              onClick={() => setToggled(false)}
            />
          </MenuItem>
          <SubMenu label="Minha conta">
            {clientLogado ? (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/minha-conta");
                    setToggled(false);
                  }}
                >
                  Dados pessoais
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/minha-conta/pedidos");
                    setToggled(false);
                  }}
                >
                  Pedidos
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    setToggled(false);
                  }}
                >
                  Sair
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/");
                    setToggled(false);
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/");
                    setToggled(false);
                  }}
                >
                  Criar conta
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/");
                    setToggled(false);
                  }}
                >
                  Carrinho
                </MenuItem>
              </>
            )}
          </SubMenu>
          <SubMenu label="Categorias">
            {categorias.map((item) => {
              const formattedCategory = formatCategory(item.categoria);

              return (
                <MenuItem
                  key={item.idCategoria}
                  onClick={() => {
                    navigate("/c/" + formattedCategory);
                    setCategoria({
                      nome: item.categoria,
                      id: item.idCategoria,
                    });
                    setToggled(false);
                  }}
                >
                  {item.categoria}
                </MenuItem>
              );
            })}
          </SubMenu>
          <MenuItem
            onClick={() => {
              navigate("/");
              setToggled(false);
            }}
          >
            Ofertas do dia
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/tecnologia");
              setToggled(false);
            }}
          >
            Tecnologia
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/esportes");
              setToggled(false);
            }}
          >
            Esportes
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/favoritos");
              setToggled(false);
            }}
          >
            Favoritos
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/suporte-ao-cliente");
              setToggled(false);
            }}
          >
            Suporte ao cliente
          </MenuItem>
        </Menu>
      </Sidebar>

      <header className={styles.header}>
        <div className={`${styles.headerContent} container`}>
          <FiMenu
            className={styles.iconMenu}
            onClick={() => setToggled(!toggled)}
          />
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="ps-2">
              <FiSearch size={22} color="#797979d5" />
            </button>
          </form>
          <Link to="/" className={styles.logoHeader}>
            <img src={Logo} alt="Logo Wesell" />
          </Link>
        </div>
      </header>
    </>
  );
}
