import { Outlet } from 'react-router-dom';
import styles from './Auth.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function Auth() {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)

    return (
        <div className={styles.king} id={setting.mode === 'dark' ? styles.darkMode : styles.lightMode}>
            <Outlet />
        </div>
    )
}
