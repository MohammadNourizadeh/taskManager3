import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useMyContext } from '../../../../../../contexts/mainContext/useMyContext'
import styles from './SidebarItems.module.scss'
import { sidebarItemsInfo } from './sidebarItemsInfo'

export default function SidebarItems() {
    // context
    const { pageName, setPageName } = useMyContext();

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
                        <Link to={sidebarItem.linkAddress ?? '#'} onClick={() => { setPageName(sidebarItem.name) }} id={pageName === sidebarItem.name ? styles.chosenItem : ''}>
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
