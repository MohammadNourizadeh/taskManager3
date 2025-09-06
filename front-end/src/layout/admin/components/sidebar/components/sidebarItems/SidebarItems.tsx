import SidebarItem from './components/sidebarItem/SidebarItem'
import SidebarSettingItem from './components/sidebarSettingItem/SidebarSettingItem'
import styles from './SidebarItems.module.scss'
import { sidebarItemsInfo } from './sidebarItemsInfo'

export default function SidebarItems() {
    return (
        <ul className={styles.king}>
            {sidebarItemsInfo.map((sidebarItem, index) => (
                sidebarItem.name === 'setting' ?
                    <SidebarSettingItem key={index} icon={sidebarItem.icon} name={sidebarItem.name} />
                    :
                    <SidebarItem key={index} icon={sidebarItem.icon} iconColor={sidebarItem?.iconColor} disable={sidebarItem?.disable} name={sidebarItem.name} linkAddress={sidebarItem?.linkAddress} />
            ))}
        </ul>
    )
}
