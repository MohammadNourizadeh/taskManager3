import { faMoon, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSetting } from '../../../../../../../../store/slices/setting'
import type { RootState } from '../../../../../../../../store/store'
import styles from './SidebarSettingItem.module.scss'

export default function SidebarSettingItem({ icon, name }: { icon: IconDefinition, name: string }) {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)
    const dispatch = useDispatch()

    // state
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
    const [theme, setTheme] = useState<string>('dark')

    // func
    const changeSetting = (e: ChangeEvent<HTMLSelectElement>, changedStateName: keyof typeof setting, changedStateSetter: (value: React.SetStateAction<string>) => void) => {
        const newSettingValue = e.target.value
        changedStateSetter(e.target.value)
        dispatch(setSetting({ settingItem: changedStateName, newSettingValue }))
    }

    return (
        <li id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <div className={styles.settingItem} onClick={() => { setIsDropDownOpen(prev => !prev) }} id={isDropDownOpen ? styles.chosenItem : undefined}>
                <span style={{ color: 'rgb(51, 139, 246)' }}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                {name}
            </div>
            <div className={`${styles.dropDown} ${isDropDownOpen ? styles.open : ''}`}>
                <div className={styles.settingForm}>
                    <div className={styles.inputAndLabelContainer}>
                        <label htmlFor="theme">
                            <span>
                                <FontAwesomeIcon icon={faMoon} />
                            </span>
                            theme
                        </label>
                        <select value={theme} onChange={(e) => { changeSetting(e, 'theme', setTheme) }}>
                            <option value="dark">dark</option>
                            <option value="light">light</option>
                        </select>
                    </div>
                </div>
            </div>
        </li>
    )
}
