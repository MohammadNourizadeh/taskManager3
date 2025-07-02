import type { TasksType } from '../../contexts/mainContext/MainContext'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import styles from './ConfirmModal.module.scss'

type ConfirmModalPropsType = {
    onConfirm: (val: TasksType[]) => void
}

export default function ConfirmModal({ onConfirm }: ConfirmModalPropsType) {
    // context
    const { tasks, confirmModalInfo, setConfirmModalInfo } = useMyContext()


    // func
    const handleDelete = () => {
        fetch(`http://localhost:8000/tasks/${confirmModalInfo.chosenItemId}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                const temp = tasks.filter(item => item.id !== confirmModalInfo.chosenItemId)
                onConfirm(temp)
            }
        })

        const temp = { ...confirmModalInfo }
        temp.isModalOpen = false
        setConfirmModalInfo(temp)
    }

    return (
        <div className={styles.king}>
            <div className={styles.modal}>
                <div className={styles.modalText}>
                    Are you sure you want to delete the task ({tasks[0].name})?
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