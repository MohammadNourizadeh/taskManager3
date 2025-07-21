import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import AuthForm from "../../components/authComponents/authForm/AuthForm";
import AuthSwitchLink from "../../components/authComponents/authSwitchLink/AuthSwitchLink";
import AuthTitle from "../../components/authComponents/authTitle/AuthTitle";
import styles from './SignUpPage.module.scss';

export default function SignUpPage() {
    return (
        <div className={styles.signUpPage}>
            <AuthTitle icon={faCheckSquare} title="sign up" />
            <AuthForm signUp />
            <AuthSwitchLink text="already have account" linkName="login" linkAddress="/auth/login" />
        </div>
    )
}
