import { faTrashCan, faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import type { TaskBoxType } from '../../types/types'
import styles from './TaskBox.module.scss'




export default function TaskBox({ task, tasks, onUpdateTaskState }: TaskBoxType) {
    // context
    const { setConfirmModalInfo, pageName } = useMyContext()

    // func
    const handleUpdateTaskState = (state: string) => {
        const body = {
            id: task.id,
            taskState: state === 'isImportant' ? 'isImportant' : 'isDone',
            taskStateValue: state === 'isImportant' ? !task.isImportant : !task.isDone,
        }

        fetch('http://localhost:8080/php/task_manager/updateTaskState.php', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) {
                    const changedTaskIndex = tasks.findIndex(item => item.id === task.id)
                    const temp = [...tasks]
                    const changedTask = temp[changedTaskIndex];

                    switch (state) {
                        case 'isImportant':
                            changedTask.isImportant = !changedTask.isImportant
                            break;
                        case 'isDone':
                            changedTask.isDone = !changedTask.isDone
                            break;
                        default:
                            break;
                    }

                    temp[changedTaskIndex] = changedTask;
                    onUpdateTaskState(temp);
                }
            })
    }

    return (
        <div className={styles.king}>
            <div className={styles.checkboxInputContainer}>
                <input type="checkbox" checked={task.isDone ? true : false} onChange={() => { handleUpdateTaskState('isDone') }} />
            </div>
            <div className={styles.taskInfoContainer}>
                <div className={styles.taskName}>
                    {task.name}
                </div>
                <div className={styles.taskDate}>
                    {task.date}
                </div>
            </div>

            <div className={styles.starAndBasketBtnContainer}>
                <button className={styles.starBtn} id={task.isImportant ? styles.turnedOnStar : ''} onClick={() => { handleUpdateTaskState('isImportant') }}>
                    <FontAwesomeIcon icon={task.isImportant ? solidStar : regStar} />
                </button>
                {pageName === 'my day' &&
                    <button className={styles.trashBtn} onClick={() => {
                        setConfirmModalInfo({ isModalOpen: true, array: tasks, arrayItem: task })
                    }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>}
            </div>
        </div>
    )
}
