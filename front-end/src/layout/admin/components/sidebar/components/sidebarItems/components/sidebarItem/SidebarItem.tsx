import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changePageName } from '../../../../../../../../store/slices/pageName'
import type { RootState } from '../../../../../../../../store/store'
import type { sidebarItemInfoType } from '../../../../../../../../types/types'
import styles from './SidebarItem.module.scss'

export default function SidebarItem({ disable, children, linkAddress, name, icon, iconColor }: sidebarItemInfoType) {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)
    const pageName = useSelector((state: RootState) => state.pageName.pageName)
    const dispatch = useDispatch()

    // state
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)

    return (
        disable ?
            <li id={setting.mode === 'dark' ? styles.darkMode : styles.lightMode}>
                <div className={styles.disableItem}>
                    <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                    {name}
                </div>
            </li> :
            !children ?
                <li id={setting.mode === 'dark' ? styles.darkMode : styles.lightMode}>
                    <Link to={linkAddress ?? '#'} onClick={() => { dispatch(changePageName(name)) }} id={pageName === name ? styles.chosenItem : ''}>
                        <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                            <FontAwesomeIcon icon={icon} />
                        </span>
                        {name}
                    </Link>
                </li>
                :
                <li onClick={() => { setIsDropDownOpen(prev => !prev) }} id={setting.mode === 'dark' ? styles.darkMode : styles.lightMode}>
                    <div className={styles.itemWithChildren} id={isDropDownOpen ? styles.chosenItem : undefined}>
                        <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                            <FontAwesomeIcon icon={icon} />
                        </span>
                        {name}
                    </div>
                    {isDropDownOpen &&
                        <div className={styles.dropDown}>
                            <ul>
                                {children.map((child, index) => (
                                    <li key={index} className={styles.childItem}>
                                        <div>
                                            <span>
                                                {child.name}
                                            </span>
                                        </div>
                                        <div>
                                            {child.inputType && <input type={child.inputType} />}
                                            {child.selectOp &&
                                                <select>
                                                    {child.selectOp.map((option, index) => (
                                                        <option key={index} value={option.value}>{option.name}</option>
                                                    ))}
                                                </select>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>}
                </li>
    )
}
