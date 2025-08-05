import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AddNewTaskBtn.module.scss'

export default function AddNewTaskBtn() {
    return (
        <button className={styles.king}>
            <span>
                <FontAwesomeIcon icon={faAdd} />
            </span>
            add new task
        </button>
    )
}
