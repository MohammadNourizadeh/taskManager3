import { useSelector } from 'react-redux'
import styles from './PageName.module.scss'
import type { RootState } from '../../../../../../store/store'

export default function PageName() {
    // redux
    const pageName = useSelector((state:RootState) => state.pageName.pageName)
    return (
        <div className={styles.pageName}>{pageName}</div>

    )
}
