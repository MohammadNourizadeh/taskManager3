import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ShowPassIconPropsType } from "../../../../../../types/types";
import styles from './ShowPassIcon.module.scss';



export default function ShowPassIcon({ showPass, onToggle }: ShowPassIconPropsType) {
    return (
        <button className={styles.showPassIcon}
            onClick={(e) => {
                e.preventDefault();
                onToggle()
            }}>
            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
        </button>
    )
}