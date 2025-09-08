import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setSetting } from '../../store/slices/setting'
import type { RootState } from '../../store/store'
import styles from './Admin.module.scss'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'

export default function Admin() {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)
    const dispatch = useDispatch()

    // side effect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/getUserSetting.php', {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                dispatch(setSetting(data))
            })
    }, [dispatch])

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
