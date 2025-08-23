import { faMultiply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { add } from '../../../../store/slices/tasks'
import styles from './AddNewTaskForm.module.scss'

export default function AddNewTaskForm({ onCloseForm }: { onCloseForm: (val: boolean) => void }) {
    // redux
    const dispatch = useDispatch()

    // state
    const [taskName, setTaskName] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [isTaskImportant, setIsTaskImportant] = useState(false)

    // func
    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            name: taskName,
            date: taskDate,
            isImportant: isTaskImportant
        }

        fetch("http://localhost:8080/php/task_manager/addNewTask.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(add({ id: data.newTaskId, taskName, taskDate, isImportant: isTaskImportant }))
                toast.success(data.msg)
            })

        onCloseForm(false)
    }

    return (
        <div className={styles.king}>
            <form className={styles.AddNewTaskForm} onSubmit={handleAdd}>
                <div className={styles.inputsAndSelectContainer}>
                    <label htmlFor="taskName" className={styles.inputsLabel}>Enter the task :</label>
                    <input type="text" id='taskName' value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
                </div>
                <div className={styles.inputsAndSelectContainer}>
                    <label htmlFor="taskDate" className={styles.inputsLabel}>Enter the date of the task :</label>
                    <input type="date" id='taskDate' value={taskDate} onChange={(e) => { setTaskDate(e.target.value) }} />
                </div>
                <div className={styles.inputsAndSelectContainer}>
                    <div className={styles.selectContainer}>
                        <label htmlFor="isTaskImportant">is the note important ?</label>
                        <select id="isTaskImportant" value={isTaskImportant ? 'true' : 'false'} onChange={(e) => { setIsTaskImportant(e.target.value === 'true') }}>
                            <option value='false'>no</option>
                            <option value='true'>yes</option>
                        </select>
                    </div>
                </div>
                <hr />
                <div className={styles.addBtnContainer}>
                    <button type='submit'>Add</button>
                </div>
                <div className={styles.cancelBtn}>
                    <button onClick={() => { onCloseForm(false) }}>
                        <FontAwesomeIcon icon={faMultiply} />
                    </button>
                </div>
            </form>
        </div>
    )
}