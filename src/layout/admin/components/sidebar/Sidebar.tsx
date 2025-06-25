import styles from './Sidebar.module.scss'
import UsernamePart from './components/usernamePart/UsernamePart'

export default function Sidebar() {
    return (
        <div className={styles.king}>
            <UsernamePart />
            <hr />
            <div></div>
        </div>
    )
}
