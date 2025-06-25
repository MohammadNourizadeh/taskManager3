import styles from './Sidebar.module.scss'
import SidebarItems from './components/sidebarItems/SidebarItems'
import UsernamePart from './components/usernamePart/UsernamePart'

export default function Sidebar() {
    return (
        <div className={styles.king}>
            <UsernamePart />
            <hr />
            <SidebarItems />
        </div>
    )
}
