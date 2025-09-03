import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmModal from '../../components/confirmModal/ConfirmModal'
import LoadingIcon from '../../components/loadingIcon/LoadingIcon'
import TaskBox from '../../components/taskBox/TaskBox'
import useToggle from '../../customHooks/useToggle/useToggle'
import { setAll } from '../../store/slices/tasks'
import type { RootState } from '../../store/store'
import AddNewTaskForm from './components/AddNewTaskForm/AddNewTaskForm'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'

export default function MyDayPage() {
    // redux
    const isModalOpen = useSelector((state: RootState) => state.confirmModal.isModalOpen)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    // state
    const [isFormOpen, setIsFormOpen] = useToggle()

    // sideEffect
    useEffect(() => {
        dispatch(setAll(null))
        fetch('http://localhost:8080/php/task_manager/showTasks.php', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => dispatch(setAll(data)))

    }, [dispatch])


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
                    />
                ))
            }
            <AddNewTaskBtn onOpenForm={(val) => { setIsFormOpen(val) }} />

            {/* confirm modal */}
            {isModalOpen && <ConfirmModal onSetNewListOfDeletedItem={(val) => { dispatch(setAll(val)) }} />}

            {/* add new task form */}
            {isFormOpen && <AddNewTaskForm onCloseForm={(val) => { setIsFormOpen(val) }} />}
        </div>
    )
}
