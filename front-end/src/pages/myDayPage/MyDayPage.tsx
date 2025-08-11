import { useEffect } from 'react'
import AddNewForm from './components/addNewForm/AddNewForm'
import ConfirmModal from '../../components/confirmModal/ConfirmModal'
import TaskBox from '../../components/taskBox/TaskBox'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import useToggle from '../../customHooks/useToggle/useToggle'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'

export default function MyDayPage() {
    // context
    const { setTasks, tasks, confirmModalInfo } = useMyContext()

    // state
    const [isFormOpen, setIsFormOpen] = useToggle()

    // sideEffect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/showTasks.php', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setTasks(data))

    }, [setTasks])

    return (
        <div className={styles.king}>
            {tasks?.map(task => (
                <TaskBox
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    onUpdateTaskState={(val) => { setTasks(val) }}
                />
            ))}
            <AddNewTaskBtn onOpenForm={(val) => { setIsFormOpen(val) }} />

            {/* confirm modal */}
            {confirmModalInfo.isModalOpen && <ConfirmModal onConfirm={(val) => { setTasks(val) }} />}

            {/* add new task form */}
            {isFormOpen && <AddNewForm onCloseForm={(val) => { setIsFormOpen(val) }} />}
        </div>
    )
}
