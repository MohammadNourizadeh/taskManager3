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
        fetch(`http://localhost:8080/php/task_manager/deleteTask.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: confirmModalInfo.arrayItem.id })
        }).then(res => {
            if (res.ok) {
                const temp = confirmModalInfo.array.filter(item => item.id !== confirmModalInfo.arrayItem.id)
                onConfirm(temp)
                const tempConfirmModalInfo = { ...confirmModalInfo }
                tempConfirmModalInfo.isModalOpen = false
                setConfirmModalInfo(tempConfirmModalInfo)
                return res.text()
            }
        })
            .then(data => console.log(data)
            )
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