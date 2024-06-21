import React, { useState } from 'react';
import axios from "axios";
import { url_base } from "../../services/apis";
import styles from "./createAccount.module.css";
import { TiInfo } from 'react-icons/ti';
import WizardForm from '../../components/WizardForm';
import { Link } from 'react-router-dom';

export default function CreateAccount() {

    return (
        <div className={`container ${styles.containerLogin}`}>
            <section className={`${styles.sectionLogin}`}>
                <h1 className="text-center">Cadastre-se</h1>
                <p className="text-danger m-0 rounded-4 d-flex align-items-center gap-2">
                    <TiInfo size={50} /> O cadastro deve ser realizado com os dados do
                    responsável do aluno.
                </p>
                <div className="card-login text-secondary">
                    <WizardForm />
                </div>
                <div className="text-center">
                    <Link
                        to="/minha-conta/entrar"
                        className="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Já possui uma conta? Entre aqui.
                    </Link>
                </div>
            </section>
        </div>
    );
}

