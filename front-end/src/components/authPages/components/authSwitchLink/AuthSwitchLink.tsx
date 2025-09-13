import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../../../store/store';
import type { AuthSwitchLinkProps } from '../../../../types/types';
import styles from './AuthSwitchLink.module.scss';



export default function AuthSwitchLink({ text, linkAddress, linkName }: AuthSwitchLinkProps) {
    // redux
    const setting = useSelector((state: RootState) => state.setting)

    return (
        <div className={styles.authSwitchLink} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            {text} ? <Link to={linkAddress}>{linkName}</Link>
        </div>
    )
}
