import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setSetting } from '../../store/slices/setting'
import type { RootState } from '../../store/store'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import styles from './styles/Admin.module.scss'

export default function Admin() {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)
    const dispatch = useDispatch()

    // state
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

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
            <div className={`${styles.sidebarPart} ${isSidebarOpen ? styles.open : undefined}`}>
                <Sidebar />
            </div>
            <div className={`${styles.sidebarToggleBtn} ${isSidebarOpen ? styles.open : undefined}`}>
                <button onClick={() => { setIsSidebarOpen(prev => !prev) }}>
                    <FontAwesomeIcon icon={isSidebarOpen ? faArrowLeft : faArrowRight} />
                </button>
            </div>
            <div className={styles.headerAndOutletPart}>
                <div className={styles.headerPart}>
                    <Header />
                </div>
                <div className={styles.outletPart}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
