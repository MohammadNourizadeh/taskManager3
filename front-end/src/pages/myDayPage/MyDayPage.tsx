import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ConfirmModal from '../../components/confirmModal/ConfirmModal'
import LoadingIcon from '../../components/loadingIcon/LoadingIcon'
import TaskBox from '../../components/taskBox/TaskBox'
import TaskForm from '../../components/taskForm/TaskForm'
import useToggle from '../../customHooks/useToggle/useToggle'
import { setAll } from '../../store/slices/tasks'
import type { RootState } from '../../store/store'
import type { TaskEditObjType } from '../../types/types'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './MyDayPage.module.scss'

export default function MyDayPage() {
    // redux
    const isModalOpen = useSelector((state: RootState) => state.confirmModal.isModalOpen)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    // state
    const [isFormOpen, setIsFormOpen] = useToggle()
    const [editObj, setEditObj] = useState<TaskEditObjType | null>(null)

    // sideEffect
    useEffect(() => {
        dispatch(setAll(null))
        fetch('http://localhost:8080/php/task_manager/showTasks.php', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(data => dispatch(setAll(data)))
            .catch((err) => {
                toast.error(err.message)
            })

    }, [dispatch])

    // func
    const handleCloseForm = () => {
        setIsFormOpen()
        setEditObj(null)
    }


    return (
        <div className={styles.king}>
            {tasks === null ?
                <div className={styles.loadingIconContainer}>
                    <LoadingIcon />
                </div>
                :
                tasks.map((task, index) => (
                    <TaskBox
                        key={task.id}
                        task={task}
                        index={index}
                        onEdit={(taskInfo: TaskEditObjType) => { setEditObj(taskInfo) }}
                        onOpenEditForm={() => { setIsFormOpen() }}
                    />
                ))
            }
            <AddNewTaskBtn onOpenForm={() => { setIsFormOpen() }} />

            {/* confirm modal */}
            {isModalOpen && <ConfirmModal onSetNewListOfDeletedItem={(val) => { dispatch(setAll(val)) }} />}

            {/* add new task form */}
            {isFormOpen && <TaskForm onCloseForm={handleCloseForm} editObj={editObj ? editObj : undefined} />}
        </div>
    )
}
