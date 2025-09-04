import SidebarItem from './components/sidebarItem/SidebarItem'
import styles from './SidebarItems.module.scss'
import { sidebarItemsInfo } from './sidebarItemsInfo'

export default function SidebarItems() {
    return (
        <ul className={styles.king}>
            {sidebarItemsInfo.map((sidebarItem, index) => (
                <SidebarItem key={index} children={sidebarItem?.children} icon={sidebarItem.icon} iconColor={sidebarItem?.iconColor} disable={sidebarItem?.disable} name={sidebarItem.name} linkAddress={sidebarItem?.linkAddress} />
            ))}
        </ul>
    )
}
