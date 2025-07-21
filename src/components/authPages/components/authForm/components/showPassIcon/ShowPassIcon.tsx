import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './ShowPassIcon.module.scss';

type ShowPassIconPropsType = {
    showPass: boolean,
    onToggle: ((val: boolean) => void)
}

export default function ShowPassIcon({ showPass, onToggle }: ShowPassIconPropsType) {
    return (
        <button className={styles.showPassIcon} onClick={() => { onToggle(!showPass) }}>
            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
        </button>
    )
}