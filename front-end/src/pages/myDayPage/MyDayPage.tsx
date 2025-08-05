import { useEffect } from 'react'
import ConfirmModal from '../../components/confirmModal/ConfirmModal'
import TaskBox from '../../components/taskBox/TaskBox'
import type { TasksType } from '../../contexts/mainContext/MainContext'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'

export default function MyDayPage() {
    // context
    const { setTasks, tasks, confirmModalInfo } = useMyContext()

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
            <AddNewTaskBtn />
            {confirmModalInfo.isModalOpen && <ConfirmModal onConfirm={changeTasksState} />}
        </div>
    )
}
