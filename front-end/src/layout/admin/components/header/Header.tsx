import HeaderDate from './components/headerDate/HeaderDate'
import PageName from './components/pageName/PageName'
import SearchInput from './components/searchInput/SearchInput'
import styles from './styles/Header.module.scss'

export default function Header() {
    return (
        <div className={styles.king}>
            <div className={styles.pageNameAndDateContainer}>
                <PageName />
                <HeaderDate />
            </div>
            <div className={styles.searchInputContainer}>
                <SearchInput />
            </div>
        </div>
    )
}
