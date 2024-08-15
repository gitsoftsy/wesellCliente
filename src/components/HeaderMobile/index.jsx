import styles from "./headerMobile.module.css";
import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import useContexts from '../../hooks/useContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiMenu, FiUser } from 'react-icons/fi';
import { PiShoppingCartLight } from 'react-icons/pi';
import Logo from "../../assets/logoWesell.svg";

export default function HeaderMobile() {
    const { categorias, setCategoria } = useContexts();
    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const formatCategory = (categoria) => {
        return removeAccents(categoria).toLowerCase().replace(/\s+/g, "-");
    };

    return (
        <>
            <Sidebar className={styles.menu} onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
                <Menu>
                    <MenuItem onClick={() => navigate('/')}> <img src={Logo} className={styles.logo} alt="Logo Wesell" /></MenuItem>
                    <SubMenu label="Minha conta">
                        <MenuItem onClick={() => navigate('/')} icon={<FiUser size={18} />}> Criar conta</MenuItem>
                        <MenuItem onClick={() => navigate('/')} icon={<PiShoppingCartLight size={18} />}> Carrinho</MenuItem>
                        <MenuItem onClick={() => navigate('/')} icon={<FiLogIn size={18} />}> Login</MenuItem>
                    </SubMenu>
                    <SubMenu label="Categorias">
                        {categorias.map((item) => {
                            const formattedCategory = formatCategory(item.categoria);

                            return (
                                <MenuItem key={item.idCategoria} onClick={() => {
                                    navigate("/c/" + formattedCategory);
                                    setCategoria({ nome: item.categoria, id: item.idCategoria })
                                }}> {item.categoria} </MenuItem>
                            );
                        })}
                    </SubMenu>
                    <MenuItem onClick={() => navigate('/')}> Ofertas do dia</MenuItem>
                    <MenuItem onClick={() => navigate('/tecnologia')}> Tecnologia </MenuItem>
                    <MenuItem onClick={() => navigate('/esportes')}> Esportes</MenuItem>
                    <MenuItem onClick={() => navigate('/favoritos')}> Favoritos</MenuItem>
                    <MenuItem onClick={() => navigate('/suporte-ao-cliente')}> Suporte ao cliente</MenuItem>
                </Menu>
            </Sidebar>
            <header className={styles.header}>
                {/* <div>
                    <button className="sb-button" onClick={() => setToggled(!toggled)}>
                        Toggle
                    </button>
                </div> */}
                <FiMenu className={styles.iconMenu} onClick={() => setToggled(!toggled)} />
                <Link to="/">
                    <img src={Logo} className={styles.logoPrincipal} alt="Logo Wesell" />
                </Link>
            </header>
        </>
    );
}

{/* <>
    <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
        <Menu>
            <MenuItem> Documentation</MenuItem>
            <MenuItem> Calendar</MenuItem>
            <MenuItem> E-commerce</MenuItem>
            <MenuItem> Examples</MenuItem>
        </Menu>
    </Sidebar>
    <div>
        <button className="sb-button" onClick={() => setToggled(!toggled)}>
            Toggle
        </button>
    </div>
</> */}