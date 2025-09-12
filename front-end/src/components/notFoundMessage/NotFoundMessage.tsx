import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles/NotFoundMessage.module.scss'

export default function NotFoundMessage({ notFoundItem, description }: { notFoundItem: string, description: string }) {
    return (
        <div className={styles.king}>
            <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faClipboard} />
            </div>
            <div className={styles.message}>
                No {notFoundItem} found!
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}
