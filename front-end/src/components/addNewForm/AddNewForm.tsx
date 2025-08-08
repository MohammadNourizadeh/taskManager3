import { faMultiply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AddNewForm.module.scss'

export default function AddNewForm() {
    return (
        <div className={styles.king}>
            <form className={styles.addNewForm}>
                <div className={styles.inputsAndSelectContainer}>
                    <label htmlFor="taskName" className={styles.inputsLabel}>Enter the task :</label>
                    <input type="text" id='taskName' />
                </div>
                <div className={styles.inputsAndSelectContainer}>
                    <label htmlFor="taskDate" className={styles.inputsLabel}>Enter the date of the task :</label>
                    <input type="date" id='taskDate' />
                </div>
                <div className={styles.inputsAndSelectContainer}>
                    <div className={styles.selectContainer}>
                        <label htmlFor="isTaskImportant">is the note important ?</label>
                        <select id="isTaskImportant">
                            <option value="no">no</option>
                            <option value="yes">yes</option>
                        </select>
                    </div>
                </div>
                <hr />
                <div className={styles.addBtnContainer}>
                    <button>Add</button>
                </div>
                <div className={styles.cancelBtn}>
                    <button>
                        <FontAwesomeIcon icon={faMultiply} />
                    </button>
                </div>
            </form>
        </div>
    )
}
