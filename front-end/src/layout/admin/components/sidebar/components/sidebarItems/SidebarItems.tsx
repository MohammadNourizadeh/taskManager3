import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changePageName } from '../../../../../../store/slices/pageName'
import type { RootState } from '../../../../../../store/store'
import styles from './SidebarItems.module.scss'
import { sidebarItemsInfo } from './sidebarItemsInfo'

export default function SidebarItems() {
    // redux
    const pageName = useSelector((state: RootState) => state.pageName.pageName)
    const dispatch = useDispatch()


    return (
        <ul className={styles.king}>
            {sidebarItemsInfo.map((sidebarItem, index) => (
                sidebarItem.disable ?
                    <li key={index} className={styles.disableItem}>
                        <span style={{ color: sidebarItem.iconColor ?? 'rgb(51, 139, 246)' }}>
                            <FontAwesomeIcon icon={sidebarItem.icon} />
                        </span>
                        {sidebarItem.name}
                    </li>
                    :
                    <li key={index}>
                        <Link to={sidebarItem.linkAddress ?? '#'} onClick={() => { dispatch(changePageName(sidebarItem.name)) }} id={pageName === sidebarItem.name ? styles.chosenItem : ''}>
                            <span style={{ color: sidebarItem.iconColor ?? 'rgb(51, 139, 246)' }}>
                                <FontAwesomeIcon icon={sidebarItem.icon} />
                            </span>
                            {sidebarItem.name}
                        </Link>
                    </li>
            ))}
        </ul>
    )
}
