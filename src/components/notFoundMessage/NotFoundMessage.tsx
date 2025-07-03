import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './NotFoundMessage.module.scss'

export default function NotFoundMessage() {
    return (
        <div className={styles.king}>
            <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faClipboard} />
            </div>
            <div className={styles.message}>
                No important task found!
            </div>
            <div className={styles.description}>
                give a star to tasks that are important to you, and <br />
                show up here with star icon appearing at<br />
                the end
            </div>
        </div>
    )
}
