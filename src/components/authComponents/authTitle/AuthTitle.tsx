import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './AuthTitle.module.scss'

type AuthTitlePropsType = {
    title: string,
    icon: IconDefinition
}

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
