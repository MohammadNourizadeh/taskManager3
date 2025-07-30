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
        <div className={(conditionState1 === '') || (conditionState2 ? (conditionState1 !== conditionState2) : "") ? styles.errMsgContainer : styles.greenErrMsgContainer}>
            <span>
                <FontAwesomeIcon icon={(conditionState1 === '') || (conditionState2 ? (conditionState1 !== conditionState2) : "") ? faWarning : faCheckCircle} />
            </span>
            {errMessage}
        </div>
    )
}
