import { faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TaskBox.module.scss'

export default function TaskBox() {
    return (
        <div className={styles.king}>
            <div className={styles.checkboxInputContainer}>
                <input type="checkbox" />
            </div>
            <div className={styles.taskInfoContainer}>
                <div className={styles.taskName}>
                    washing parking
                </div>
                <div className={styles.taskDate}>
                    2025-03-20
                </div>
            </div>

            <div className={styles.starAndBasketBtnContainer}>
                <button className={styles.starBtn}>
                    <FontAwesomeIcon icon={faStar} />
                </button>
                <button className={styles.trashBtn}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}
