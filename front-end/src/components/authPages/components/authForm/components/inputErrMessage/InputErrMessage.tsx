import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { InputErrMessageProps } from '../../../../../../types/types'
import styles from './InputErrMessage.module.scss'



export default function InputErrMessage({ errMessage, conditionState1, conditionState2 }: InputErrMessageProps) {

    return (
        <div className={(conditionState2 ? errMessage === 'Confirm your password' ? conditionState1 !== '' : conditionState1 === conditionState2 : conditionState1 !== '') ? styles.greenErrMsgContainer : styles.errMsgContainer}>
            <span>
                <FontAwesomeIcon icon={(conditionState2 ? errMessage === 'Confirm your password' ? conditionState1 !== '' : conditionState1 === conditionState2 : conditionState1 !== '') ? faCheckCircle : faWarning} />
            </span>
            {errMessage}
        </div >
    )
}

