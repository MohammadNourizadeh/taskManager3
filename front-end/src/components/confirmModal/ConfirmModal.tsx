import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/slices/confirmModal'
import type { RootState } from '../../store/store'
import type { ConfirmModalPropsType } from '../../types/types'
import styles from './ConfirmModal.module.scss'


export default function ConfirmModal({ onSetNewListOfDeletedItem }: ConfirmModalPropsType) {
    // redux
    const list = useSelector((state: RootState) => state.confirmModal.list)
    const targetItemId = useSelector((state: RootState) => state.confirmModal.targetItemId)
    const dispatch = useDispatch()

    // var
    const targetItemIndex = list.findIndex(item => item.id === targetItemId)
    const targetItem = list[targetItemIndex]

    // func
    const handleDelete = () => {
        fetch(`http://localhost:8080/php/task_manager/deleteTask.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: targetItemId })
        }).then(res => {
            if (res.ok) {
                const newList = list.filter(item => item.id !== targetItemId)
                dispatch(closeModal())
                onSetNewListOfDeletedItem(newList)
            }
        })
    }

    return (
        <div className={styles.king}>
            <div className={styles.modal}>
                <div className={styles.modalText}>
                    Are you sure you want to delete the task ( {targetItem.name} )?
                </div>
                <div className={styles.btnsContainer}>
                    <button className={styles.yesBtn} onClick={handleDelete}>yes</button>
                    <button className={styles.noBtn} onClick={() => {
                        dispatch(closeModal())
                    }}>no</button>
                </div>
            </div>
        </div>
    )
}