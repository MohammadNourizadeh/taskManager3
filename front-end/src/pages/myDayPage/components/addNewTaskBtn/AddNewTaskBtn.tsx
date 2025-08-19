import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AddNewTaskBtn.module.scss'

export default function AddNewTaskBtn({ onOpenForm }: { onOpenForm: (val: boolean) => void }) {
    return (
        <button className={styles.king} onClick={() => { onOpenForm(true) }}>
            <span>
                <FontAwesomeIcon icon={faAdd} />
            </span>
            Add New Task
        </button>
    )
}
