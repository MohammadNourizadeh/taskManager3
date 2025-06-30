import { faTrashCan, faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { TasksType } from '../../contexts/mainContext/MainContext'
import styles from './TaskBox.module.scss'

type TaskBoxType = {
    task: TasksType,
    tasks: TasksType[],
    onMakeTaskImportant: (val: TasksType[]) => void,
    onDeleteTask: (val: TasksType[]) => void,
    onCheckTask: (val: TasksType[]) => void
}


export default function TaskBox({ task, tasks, onMakeTaskImportant, onDeleteTask, onCheckTask }: TaskBoxType) {

    // func
    const handleImportant = () => {
        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({ isImportant: !task.isImportant })
        }).then(res => {
            if (res.ok) {
                const index = tasks.findIndex(item => item.id === task.id)
                const temp = [...tasks]
                const changedTask = temp[index]
                changedTask.isImportant = !changedTask.isImportant
                temp[index] = changedTask
                onMakeTaskImportant(temp)
            }
        })
    }

    const handleDelete = () => {
        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                const temp = tasks.filter(item => item.id !== task.id)
                onDeleteTask(temp)
            }
        })
    }

    const handleCheck = () => {
        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({ isDone: !task.isDone })
        }).then(res => {
            if (res.ok) {
                const index = tasks.findIndex(item => item.id === task.id)
                const temp = [...tasks]
                const changedTask = temp[index]
                changedTask.isDone = !changedTask.isDone
                temp[index] = changedTask
                onCheckTask(temp)
            }
        })
    }

    return (
        <div className={styles.king}>
            <div className={styles.checkboxInputContainer} onChange={handleCheck}>
                <input type="checkbox" checked={task.isDone} />
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
                <button className={styles.starBtn} id={task.isImportant ? styles.turnedOnStar : ''} onClick={handleImportant}>
                    <FontAwesomeIcon icon={task.isImportant ? solidStar : regStar} />
                </button>
                <button className={styles.trashBtn} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}
