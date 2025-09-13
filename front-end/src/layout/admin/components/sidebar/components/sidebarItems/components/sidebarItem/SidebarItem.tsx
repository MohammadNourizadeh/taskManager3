import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changePageName } from '../../../../../../../../store/slices/pageName'
import type { RootState } from '../../../../../../../../store/store'
import type { sidebarItemInfoType } from '../../../../../../../../types/types'
import styles from './SidebarItem.module.scss'

export default function SidebarItem({ disable, linkAddress, name, icon, iconColor }: sidebarItemInfoType) {
    // redux
    const setting = useSelector((state: RootState) => state.setting)
    const pageName = useSelector((state: RootState) => state.pageName.pageName)
    const dispatch = useDispatch()

    return (
        disable ?
            <li>
                <div className={styles.disableItem}>
                    <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                    {name}
                </div>
            </li>
            :
            <li id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
                <Link to={linkAddress ?? '#'} onClick={() => { dispatch(changePageName(name)) }} id={pageName === name ? styles.chosenItem : ''}>
                    <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                    {name}
                </Link>
            </li>
    )
}
