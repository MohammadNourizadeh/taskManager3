import DisableItem from './components/disableItem/DisableItem'
import LinkItem from './components/linkItem/LinkItem'
import styles from './SidebarItems.module.scss'
import { sidebarItemsInfo } from './sidebarItemsInfo'

export default function SidebarItems() {
    return (
        <ul className={styles.king}>
            {sidebarItemsInfo.map((sidebarItem, index) => (
                !sidebarItem.children ?
                    sidebarItem.disable ?
                        <li key={index} className={styles.disableItem}>
                            <DisableItem icon={sidebarItem.icon} iconColor={sidebarItem.iconColor} itemName={sidebarItem.name} />
                        </li>
                        :
                        <li key={index}>
                            <LinkItem linkAddress={sidebarItem.linkAddress ?? '#'} icon={sidebarItem.icon} iconColor={sidebarItem.iconColor} itemName={sidebarItem.name} />
                        </li>
                    :
                    ''
            ))}
        </ul>
    )
}
