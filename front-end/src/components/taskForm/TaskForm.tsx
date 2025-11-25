import { faMultiply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { add, edit } from '../../store/slices/tasks'
import type { RootState } from '../../store/store'
import type { TaskEditObjType } from '../../types/types'
import styles from './TaskForm.module.scss'

type TaskFormType = {
    onCloseForm: () => void,
    editObj?: TaskEditObjType
}

export default function TaskForm({ onCloseForm, editObj }: TaskFormType) {
    // var
    const navigate = useNavigate()

    // redux
    const setting = useSelector((state: RootState) => state.setting)
    const dispatch = useDispatch()

    // state
    const [taskName, setTaskName] = useState(editObj ? editObj.name : '')
    const [taskDate, setTaskDate] = useState(editObj ? editObj.date : '')
    const [isTaskImportant, setIsTaskImportant] = useState(false)

    // func
    const handleReset = () => {
        if (editObj) {
            setTaskName(editObj.name)
            setTaskDate(editObj.date)
        }
    }

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
            body: JSON.stringify(body),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    navigate('/auth/login')
                    toast.error(data.msg)
                } else {
                    dispatch(add({ id: data.newTaskId, taskName, taskDate, isImportant: isTaskImportant }))
                    toast.success(data.msg)
                }
            })

        onCloseForm()
    }

    const handleEdit = () => {
        if (!editObj) return

        let body: { id: number, name?: string, date?: string } = {
            id: editObj.id
        }

        if (editObj.name !== taskName) {
            body = { ...body, name: taskName }
        }

        if (editObj.name !== taskName) {
            body = { ...body, date: taskDate }
        }

        fetch('http://localhost:8080/php/task_manager/editTask.php', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                if (res.ok) {
                    dispatch(edit(body))
                }
            })
        onCloseForm()
    }

    return (
        <div className={styles.king} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <form className={styles.taskForm} onSubmit={handleAdd}>
                <div className={styles.inputsAndSelectContainer}>
                    <label htmlFor="taskName" className={styles.inputsLabel}>Enter the task :</label>
                    <input type="text" id='taskName' value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
                </div>
                <div className={styles.inputsAndSelectContainer}>
                    <label htmlFor="taskDate" className={styles.inputsLabel}>Enter the date of the task :</label>
                    <input type="date" id='taskDate' value={taskDate} onChange={(e) => { setTaskDate(e.target.value) }} />
                </div>
                <div className={styles.inputsAndSelectContainer}>
                    {!editObj &&
                        <div className={styles.selectContainer}>
                            <label htmlFor="isTaskImportant">is the note important ?</label>
                            <select id="isTaskImportant" value={isTaskImportant ? 'true' : 'false'} onChange={(e) => { setIsTaskImportant(e.target.value === 'true') }}>
                                <option value='false'>no</option>
                                <option value='true'>yes</option>
                            </select>
                        </div>}
                </div>
                <hr />
                <div className={styles.btnsContainer}>
                    {!editObj ?
                        <button className={styles.addBtn} type='submit'>Add</button>
                        :
                        <div className={styles.editingBtnsContainer}>
                            <button type='button' disabled={editObj.name !== taskName || editObj.date !== taskDate ? false : true} className={styles.confirmBtn} onClick={handleEdit}>confirm</button>
                            <button type='button' disabled={editObj.name !== taskName || editObj.date !== taskDate ? false : true} className={styles.resetEditBtn} onClick={handleReset}>reset</button>
                            <button type='button' className={styles.cancelEditBtn} onClick={() => { onCloseForm() }}>cancel</button>
                        </div>
                    }
                </div>
                <div className={styles.cancelBtn}>
                    <button type='button' onClick={() => { onCloseForm() }}>
                        <FontAwesomeIcon icon={faMultiply} />
                    </button>
                </div>
            </form>
        </div>
    )
}