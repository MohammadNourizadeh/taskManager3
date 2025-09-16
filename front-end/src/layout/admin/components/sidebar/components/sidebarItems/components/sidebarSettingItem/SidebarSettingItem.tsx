import { faSun, faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useToggle from '../../../../../../../../customHooks/useToggle/useToggle'
import { setPartOfSetting } from '../../../../../../../../store/slices/setting'
import type { RootState } from '../../../../../../../../store/store'
import styles from './SidebarSettingItem.module.scss'
import SettingInput from './components/settinginput/SettingInput'

export default function SidebarSettingItem({ icon, name }: { icon: IconDefinition, name: string }) {
    // redux
    const setting = useSelector((state: RootState) => state.setting)
    const dispatch = useDispatch()

    // state
    const [isDropDownOpen, setIsDropDownOpen] = useToggle()

    // var
    const selectOptions = [
        {
            value: 'dark',
            name: 'dark'
        },
        {
            value: 'light',
            name: 'light'
        }
    ]

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
                        <SettingInput
                            icon={faSun}
                            label='theme'
                            selectValue={setting.theme}
                            selectOptions={selectOptions}
                        />
                        <SettingInput
                            icon={faUser}
                            label='username'
                            inputType='text'
                            inputValue={setting.username}
                        />
                        <SettingInput
                            icon={faLock}
                            label='password'
                            inputType='text'
                            inputValue={setting.password}
                        />
                    </div>
                </div>}
        </li>
    )
}
