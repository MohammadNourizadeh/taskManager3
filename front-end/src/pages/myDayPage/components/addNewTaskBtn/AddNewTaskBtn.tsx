import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AddNewTaskBtn.module.scss'

export default function AddNewTaskBtn({ onOpenForm }: { onOpenForm: () => void }) {
    return (
        <button className={styles.king} onClick={() => { onOpenForm() }}>
            <span>
                <FontAwesomeIcon icon={faAdd} />
            </span>
            Add New Task
        </button>
    )
}
