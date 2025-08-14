import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AuthTitlePropsType } from "../../../../types/types";
import styles from './AuthTitle.module.scss';



export default function AuthTitle({ title, icon }: AuthTitlePropsType) {
    return (
        <div className={styles.authTitle}>
            <span>
                <FontAwesomeIcon icon={icon} />
            </span>
            {title}
        </div>
    )
}
