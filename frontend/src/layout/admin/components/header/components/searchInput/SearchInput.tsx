import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchInput.module.scss'

export default function SearchInput() {
    return (
        <div className={styles.inputContainer}>
            <input type="text" placeholder='search' />
            <div className={styles.searchIcon}>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    )
}
  