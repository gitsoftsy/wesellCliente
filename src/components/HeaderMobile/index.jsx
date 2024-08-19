import styles from "./headerMobile.module.css";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import useContexts from "../../hooks/useContext";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import Logo from "../../assets/logoWesell.svg";

export default function HeaderMobile() {
  const [toggled, setToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    categorias,
    setCategoria,
    setValueSearch,
    categoria,
    client,
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
    localStorage.removeItem("wesell-user-comprador");
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
          <MenuItem onClick={() => navigate("/")}>
            <img src={Logo} className={styles.logo} alt="Logo Wesell" />
          </MenuItem>
          <SubMenu label="Minha conta">
            {clientLogado ? (
              <>
                <MenuItem onClick={() => navigate("/minha-conta")}>
                  Dados pessoais
                </MenuItem>
                <MenuItem onClick={() => navigate("/minha-conta/pedidos")}>
                  Pedidos
                </MenuItem>
                <MenuItem onClick={logout}>Sair</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => navigate("/")}>Login</MenuItem>
                <MenuItem onClick={() => navigate("/")}> Criar conta</MenuItem>
                <MenuItem onClick={() => navigate("/")}>Carrinho</MenuItem>
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
                  }}
                >
                  {" "}
                  {item.categoria}{" "}
                </MenuItem>
              );
            })}
          </SubMenu>
          <MenuItem onClick={() => navigate("/")}> Ofertas do dia</MenuItem>
          <MenuItem onClick={() => navigate("/tecnologia")}>
            {" "}
            Tecnologia{" "}
          </MenuItem>
          <MenuItem onClick={() => navigate("/esportes")}> Esportes</MenuItem>
          <MenuItem onClick={() => navigate("/favoritos")}> Favoritos</MenuItem>
          <MenuItem onClick={() => navigate("/suporte-ao-cliente")}>
            {" "}
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
