import { useEffect } from 'react'
import ConfirmModal from '../../components/confirmModal/ConfirmModal'
import TaskBox from '../../components/taskBox/TaskBox'
import type { TasksType } from '../../contexts/mainContext/MainContext'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'
import AddNewForm from '../../components/addNewForm/AddNewForm'
import useToggle from '../../customHooks/useToggle/useToggle'

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

    // func
    const changeTasksState = (val: TasksType[]) => {
        setTasks(val)
    }


    return (
        <div className={styles.king}>
            {tasks?.map(task => (
                <TaskBox
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    onMakeTaskImportant={changeTasksState}
                    onCheckTask={changeTasksState}
                />
            ))}
            <AddNewTaskBtn onOpenForm={(val) => { setIsFormOpen(val) }} />

            {/* confirm modal */}
            {confirmModalInfo.isModalOpen && <ConfirmModal onConfirm={changeTasksState} />}

            {/* add new task form */}
            {isFormOpen && <AddNewForm onCloseForm={(val) => { setIsFormOpen(val) }} />}
        </div>
    )
}
