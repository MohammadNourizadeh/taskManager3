import { useSelector } from 'react-redux'
import styles from './Sidebar.module.scss'
import SidebarItems from './components/sidebarItems/SidebarItems'
import UsernamePart from './components/usernamePart/UsernamePart'
import type { RootState } from '../../../../store/store'

export default function Sidebar() {
    // redux
    const username = useSelector((state: RootState) => state.userInfo.username)

    return (
        <div className={styles.king}>
            <UsernamePart username={username} />
            <hr />
            <SidebarItems />
        </div>
    )
}
