import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './UsernamePart.module.scss'

export default function UsernamePart() {
    return (
        <div className={styles.usernamePart}>
            <div className={styles.userIcon}>
                <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div className={styles.username}>
                Mohammad
            </div>
        </div>
    )
}
