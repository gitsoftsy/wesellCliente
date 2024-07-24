import styles from "./createAccount.module.css";
import WizardForm from '../../components/WizardForm';
import { Link } from 'react-router-dom';

export default function CreateAccount() {

    return (
        <div className={`container ${styles.containerLogin}`}>
            <section className={`${styles.sectionLogin}`}>
                <h1 className="text-center mb-4">Cadastre-se</h1>
                <div className="card-login text-secondary">
                    <WizardForm />
                </div>
                <div className="text-center mt-4">
                    <Link
                        to="/login"
                        className="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Já possui uma conta? Entre aqui.
                    </Link>
                </div>
            </section>
        </div>
    );
}

