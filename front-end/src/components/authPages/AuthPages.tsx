import type { AuthPagesPropsType } from '../../types/types';
import styles from './AuthPages.module.scss';
import AuthForm from "./components/authForm/AuthForm";
import AuthSwitchLink from "./components/authSwitchLink/AuthSwitchLink";
import AuthTitle from "./components/authTitle/AuthTitle";



export default function AuthPages({ pageTitle, titleIcon, switchLinkText, switchLinkName, switchLinkAddress, isSignUp }: AuthPagesPropsType) {
    return (
        <div className={styles.authPages}>
            <AuthTitle icon={titleIcon} title={pageTitle} />
            <AuthForm signUp={!!isSignUp} />
            <AuthSwitchLink text={switchLinkText} linkName={switchLinkName} linkAddress={switchLinkAddress} />
        </div>
    )
}
