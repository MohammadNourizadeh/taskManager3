import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../../../store/store'
import styles from './SearchInput.module.scss'

export default function SearchInput() {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)

    return (
        <div className={styles.inputContainer} id={setting.mode === 'dark' ? styles.darkMode : styles.lightMode}>
            <input type="text" placeholder='search' />
            <div className={styles.searchIcon}>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    )
}
