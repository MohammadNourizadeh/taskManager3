import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import AuthForm from "./components/authForm/AuthForm";
import AuthSwitchLink from "./components/authSwitchLink/AuthSwitchLink";
import AuthTitle from "./components/authTitle/AuthTitle";
import styles from './AuthPages.module.scss';

type AuthPagesPropsType = {
    pageTitle: string,
    titleIcon: IconDefinition,
    switchLinkText: string,
    switchLinkName: string,
    switchLinkAddress: string
}

export default function AuthPages({ pageTitle, titleIcon, switchLinkText, switchLinkName, switchLinkAddress }: AuthPagesPropsType) {
    return (
        <div className={styles.authPages}>
            <AuthTitle icon={titleIcon} title={pageTitle} />
            <AuthForm />
            <AuthSwitchLink text={switchLinkText} linkName={switchLinkName} linkAddress={switchLinkAddress} />
        </div>
    )
}
