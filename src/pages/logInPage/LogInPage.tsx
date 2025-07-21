import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import AuthForm from "../../components/authComponents/authForm/AuthForm";
import AuthSwitchLink from "../../components/authComponents/authSwitchLink/AuthSwitchLink";
import AuthTitle from "../../components/authComponents/authTitle/AuthTitle";
import styles from './LogInPage.module.scss';

export default function LogInPage() {
    return (
        <div className={styles.logInPage}>
            <AuthTitle icon={faUserCheck} title="login" />
            <AuthForm />
            <AuthSwitchLink text="don't have account" linkName="sign up" linkAddress="/auth/signup" />
        </div>
    )
}
