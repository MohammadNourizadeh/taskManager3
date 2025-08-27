import { faTrashCan, faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import { openModal, setList, setTargetItemId } from '../../store/slices/confirmModal'
import { handleDone, handleImportant } from '../../store/slices/tasks'
import type { RootState } from '../../store/store'
import type { TaskBoxType } from '../../types/types'
import styles from './TaskBox.module.scss'





export default function TaskBox({ task, index }: TaskBoxType) {
    // redux
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    // context
    const { pageName } = useMyContext()

    // func
    const handleRemoveTask = () => {
        dispatch(openModal())
        dispatch(setList(tasks))
        dispatch(setTargetItemId(task.id))
    }

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
                    switch (state) {
                        case 'isImportant':
                            dispatch(handleImportant(index))
                            break;
                        case 'isDone':
                            dispatch(handleDone(index))
                            break;
                        default:
                            break;
                    }
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
                    <button className={styles.trashBtn} onClick={handleRemoveTask}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>}
            </div>
        </div>
    )
}
