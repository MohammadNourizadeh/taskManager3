import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { changePageName } from "../../../../../../../../store/slices/pageName"
import type { RootState } from "../../../../../../../../store/store"
import type { LinkItemPropsType } from "../../../../../../../../types/types"
import styles from './LinkItem.module.scss'

export default function LinkItem({ linkAddress, iconColor, icon, itemName }: LinkItemPropsType) {
    // redux
    const setting = useSelector((state: RootState) => state.setting.setting)
    const pageName = useSelector((state: RootState) => state.pageName.pageName)
    const dispatch = useDispatch()

    return (
        <div className={styles.king} id={setting.mode === 'dark' ? styles.darkMode : styles.lightMode}>
            <Link to={linkAddress} onClick={() => { dispatch(changePageName(itemName)) }} id={pageName === itemName ? styles.chosenItem : ''}>
                <span style={{ color: iconColor ?? 'rgb(51, 139, 246)' }}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                {itemName}
            </Link>
        </div>
    )
}
