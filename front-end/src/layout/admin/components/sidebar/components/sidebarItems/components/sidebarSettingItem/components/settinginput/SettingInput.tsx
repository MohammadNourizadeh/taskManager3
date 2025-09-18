import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import type { SettingSliceInitialStateType } from '../../../../../../../../../../types/types';
import styles from './SettingInput.module.scss';

type SettingInputsPropsType = {
    label: string
    icon: IconDefinition
    settingKey: keyof SettingSliceInitialStateType
    inputType?: string
    inputValue?: string
    selectValue?: string
    selectOptions?: {
        value: string
        name: string
    }[]
    onChangeSetting: (inputEvent: string, settingItemName: keyof SettingSliceInitialStateType) => void
}

export default function SettingInput({ label, icon, inputType, inputValue: propInputValue, selectOptions, selectValue, onChangeSetting, settingKey }: SettingInputsPropsType) {
    // state
    const [inputVal, setInputVal] = useState(propInputValue)

    return (
        <div className={styles.inputAndLabelContainer}>
            <label htmlFor={settingKey}>
                <span>
                    <FontAwesomeIcon icon={icon} />
                </span>
                {label} :
            </label>
            {!inputType ?
                <select value={selectValue} id={settingKey} onChange={(e) => { onChangeSetting(e.target.value, settingKey) }}>
                    {selectOptions?.map((op, index) => (
                        <option key={index} value={op.value}>{op.name}</option>
                    ))}
                </select>
                :
                <div className={styles.inputContainer}>
                    <input type={inputType} id={settingKey} value={inputVal} onChange={(e) => { setInputVal(e.target.value) }} />
                    {inputVal && inputVal !== propInputValue &&
                        <div className={styles.confirmAndCancelBtnContainer}>
                            <button className={styles.confirmBtn} onClick={() => { onChangeSetting(inputVal, settingKey) }}>confirm</button>
                            <button className={styles.cancelBtn} onClick={() => { setInputVal(propInputValue) }}>cancel</button>
                        </div>}
                </div>
            }
        </div >
    )
}
