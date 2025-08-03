import { Outlet } from 'react-router-dom'
import styles from './Admin.module.scss'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'

export default function Admin() {
    return (
        <div className={styles.king}>
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
