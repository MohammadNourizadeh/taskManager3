import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import useToggle from '../../customHooks/useToggle/useToggle'
import { setSetting } from '../../store/slices/setting'
import type { RootState } from '../../store/store'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import styles from './styles/Admin.module.scss'
import { toast } from 'react-toastify'

export default function Admin() {
    // redux
    const setting = useSelector((state: RootState) => state.setting)
    const dispatch = useDispatch()

    // state
    const [isSidebarOpen, setIsSidebarOpen] = useToggle()

    // side effect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/getUserSetting.php', {
            method: "GET",
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(String(res.statusText))
                }

                return res.json()
            })
            .then(data => {
                dispatch(setSetting(data))
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }, [dispatch])

    return (
        <div className={styles.king} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <div className={`${styles.sidebarPart} ${isSidebarOpen ? styles.open : undefined}`}>
                <Sidebar />
            </div>
            <div className={`${styles.sidebarToggleBtn} ${isSidebarOpen ? styles.open : undefined}`}>
                <button onClick={() => { setIsSidebarOpen() }}>
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
