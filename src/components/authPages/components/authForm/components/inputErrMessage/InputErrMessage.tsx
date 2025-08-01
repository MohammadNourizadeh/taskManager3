import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './InputErrMessage.module.scss'

type InputErrMessageProps = {
    errMessage: string,
    conditionState1: string,
    conditionState2?: string
}

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

