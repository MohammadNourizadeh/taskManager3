import { useSelector } from 'react-redux'
import type { RootState } from '../../../../store/store'
import styles from './Sidebar.module.scss'
import SidebarItems from './components/sidebarItems/SidebarItems'
import UsernamePart from './components/usernamePart/UsernamePart'

export default function Sidebar() {
    // redux
    const username = useSelector((state: RootState) => state.setting.username)

    return (
        <div className={styles.king}>
            <UsernamePart username={username} />
            <hr />
            <SidebarItems />
        </div>
    )
}
