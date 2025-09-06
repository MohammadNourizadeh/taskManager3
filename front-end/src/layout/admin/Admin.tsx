import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import type { RootState } from '../../store/store'
import styles from './Admin.module.scss'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'

export default function Admin() {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)

    return (
        <div className={styles.king} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <div className={styles.sidebarPart}>
                <Sidebar />
            </div>
            <div className={styles.headerAndOutletPart}>
                <div className={styles.headerPart}>
                    <Header />
                </div>
                <div className={styles.pagePart}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
