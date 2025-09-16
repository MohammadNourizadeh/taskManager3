import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './SettingInput.module.scss';

type SettingInputsPropsType = {
    label: string
    icon: IconDefinition
    inputType?: string
    inputValue?: string
    selectValue?: string
    selectOptions?: {
        value: string
        name: string
    }[]
}

export default function SettingInput({ label, icon, inputType, inputValue: propInputValue, selectOptions, selectValue }: SettingInputsPropsType) {
    // state
    const [inputVal, setInputVal] = useState(propInputValue)

    return (
        <div className={styles.inputAndLabelContainer}>
            <label htmlFor="theme">
                <span>
                    <FontAwesomeIcon icon={icon} />
                </span>
                {label} :
            </label>
            {!inputType ?
                <select value={selectValue} onChange={(e) => { changeSetting(e, 'theme') }}>
                    {selectOptions?.map((op, index) => (
                        <option key={index} value={op.value}>{op.name}</option>
                    ))}
                </select>
                :
                <div className={styles.inputContainer}>
                    <input type={inputType} value={inputVal} onChange={(e) => { setInputVal(e.target.value) }} />
                    {inputVal !== propInputValue &&
                        <div className={styles.confirmAndCancelBtnContainer}>
                            <button className={styles.confirmBtn}>confirm</button>
                            <button className={styles.cancelBtn} onClick={() => { setInputVal(propInputValue) }}>cancel</button>
                        </div>}
                </div>
            }
        </div>
    )
}
