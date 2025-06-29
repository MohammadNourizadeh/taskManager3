import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../../../../../../contexts/mainContext/MainContext'
import styles from './SidebarItems.module.scss'
import { sidebarItemsInfo } from './sidebarItemsInfo'

export default function SidebarItems() {
    // context
    const context = useContext(MainContext);
    if (!context) return null;
    const { setPageName } = context;

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
                        <Link to={sidebarItem.linkAddress ?? '#'} onClick={() => { setPageName(sidebarItem.name)}}>
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
