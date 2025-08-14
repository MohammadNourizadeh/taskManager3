import { Link } from 'react-router-dom';
import type { AuthSwitchLinkProps } from '../../../../types/types';
import styles from './AuthSwitchLink.module.scss';



export default function AuthSwitchLink({ text, linkAddress, linkName }: AuthSwitchLinkProps) {
    return (
        <div className={styles.authSwitchLink}>
            {text} ? <Link to={linkAddress}>{linkName}</Link>
        </div>
    )
}
