import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { DisableItemPropsType } from '../../../../../../../../types/types'
import styles from './DisableItem.module.scss'

export default function DisableItem({ iconColor, icon, itemName }: DisableItemPropsType) {
    return (
        <div className={styles.king}>
            <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                <FontAwesomeIcon icon={icon} />
            </span>
            {itemName}
        </div>
    )
}
