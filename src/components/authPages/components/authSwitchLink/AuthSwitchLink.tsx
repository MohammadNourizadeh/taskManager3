import { Link } from 'react-router-dom';
import styles from './AuthSwitchLink.module.scss';


type AuthSwitchLinkProps = {
    text: string,
    linkAddress: string,
    linkName: string
}
export default function AuthSwitchLink({ text, linkAddress, linkName }: AuthSwitchLinkProps) {
    return (
        <div className={styles.authSwitchLink}>
            {text} ? <Link to={linkAddress}>{linkName}</Link>
        </div>
    )
}
