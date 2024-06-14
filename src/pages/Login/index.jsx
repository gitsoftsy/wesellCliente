import React, { useState } from 'react';
import axios from "axios";
import { url_base } from "../../services/apis";
import styles from "./login.module.css";
import logo from "../../assets/wesell_vertical_azul.png";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true)
        let dadosLogin = {
            email: email,
            senha: password,
            perfil: "COMPRADOR"
        }

        await axios.post(url_base + `/login`, dadosLogin, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            localStorage.setItem('user', response.data)
            navigate('/')
        }).catch((error) => {
            console.log(error.message);
            toast.error(error.message);
        })
    };

    return (
        <div className={styles.container}>
            <div className={styles.sections}>
                <section className={styles.boxWesell}>
                    <div className={styles.sloganCompany}>
                        <img className={styles.logoCompany} src={logo} alt="logo" />
                        <h1 className={styles.h1Company}>
                            Nunca foi tão fácil transformar o que você sabe em um negócio digital.
                        </h1>
                        <p>Vamos te ajudar desde os primeiros passos.<br /> Cadastre-se grátis.</p>
                    </div>
                </section>
                <section className={styles.boxLogin}>
                    <img className={styles.logoCompany} src={logo} alt="logo" />
                    <div className={styles.loginForm}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">E-mail:<span>*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label htmlFor="password">Senha:<span>*</span></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit">
                                {loading ? <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> : 'Entrar'}
                            </button>
                        </form>
                        <p>Caso ainda não tenha cadastro, clique <a href="/signup">Aqui!</a></p>
                    </div>
                </section>
            </div>
            <footer>
                Copyright @ 2000-2024 - Todos os direitos reservados - Desenvolvido pela Softsy
            </footer>
        </div>
    );
}

