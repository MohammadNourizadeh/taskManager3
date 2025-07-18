import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import AuthForm from "../../components/authComponents/authForm/AuthForm";
import AuthTitle from "../../components/authComponents/authTitle/AuthTitle";
import styles from './SignUpPage.module.scss'

export default function SignUpPage() {
    return (
        <div className={styles.signUpPage}>
            <AuthTitle icon={faCheckSquare} title="sign up" />
            <AuthForm />
        </div>
    )
}
