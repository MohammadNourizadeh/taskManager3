import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faMoon, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useToggle from '../../../../../../../../customHooks/useToggle/useToggle'
import { setPartOfSetting } from '../../../../../../../../store/slices/setting'
import type { RootState } from '../../../../../../../../store/store'
import styles from './SidebarSettingItem.module.scss'

export default function SidebarSettingItem({ icon, name }: { icon: IconDefinition, name: string }) {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)
    const dispatch = useDispatch()

    // state
    const [isDropDownOpen, setIsDropDownOpen] = useToggle()

    // func
    const changeSetting = (e: ChangeEvent<HTMLSelectElement>, changedStateName: keyof typeof setting) => {
        const newSettingValue = e.target.value

        const body = {
            settingItem: changedStateName,
            newValue: newSettingValue
        }

        fetch('http://localhost:8080/php/task_manager/setSetting.php', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    dispatch(setPartOfSetting({ settingItem: changedStateName, newSettingValue }))
                }
            })
    }

    return (
        <li className={`${styles.settingItem} ${isDropDownOpen ? styles.chosenItem : undefined}`} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <div className={styles.settingItem} onClick={() => { setIsDropDownOpen() }} >
                <span style={{ color: 'rgb(51, 139, 246)' }}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                {name}
            </div>
            {isDropDownOpen &&
                <div className={styles.dropDown}>
                    <div className={styles.settingForm}>
                        <div className={styles.inputAndLabelContainer}>
                            <label htmlFor="theme">
                                <span>
                                    <FontAwesomeIcon icon={setting.theme === 'light' ? faSun : faMoon} />
                                </span>
                                theme :
                            </label>
                            <select value={setting.theme} onChange={(e) => { changeSetting(e, 'theme') }}>
                                <option value="dark">dark</option>
                                <option value="light">light</option>
                            </select>
                        </div>
                    </div>
                </div>}
        </li>
    )
}
