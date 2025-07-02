import type { TasksType } from '../../contexts/mainContext/MainContext'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import styles from './ConfirmModal.module.scss'

type ConfirmModalPropsType = {
    onConfirm: (val: TasksType[]) => void
}

export default function ConfirmModal({ onConfirm }: ConfirmModalPropsType) {
    // context
    const { confirmModalInfo, setConfirmModalInfo } = useMyContext()


    // func
    const handleDelete = () => {
        fetch(`http://localhost:8000/tasks/${confirmModalInfo.arrayItem.id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                const temp = confirmModalInfo.array.filter(item => item.id !== confirmModalInfo.arrayItem.id)
                onConfirm(temp)
            }
        })
    }

    return (
        <div className={styles.king}>
            <div className={styles.modal}>
                <div className={styles.modalText}>
                    Are you sure you want to delete the task ({confirmModalInfo.arrayItem.name})?
                </div>
                <div className={styles.btnsContainer}>
                    <button className={styles.yesBtn} onClick={handleDelete}>yes</button>
                    <button className={styles.noBtn} onClick={() => {
                        const temp = { ...confirmModalInfo }
                        temp.isModalOpen = false
                        setConfirmModalInfo(temp)
                    }}>no</button>
                </div>
            </div>
        </div>
    )
}

// handleDelete