import { useEffect } from 'react'
import ConfirmModal from '../../components/confirmModal/ConfirmModal'
import TaskBox from '../../components/taskBox/TaskBox'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'

export default function MyDayPage() {
    // context
    const { setTasks, tasks, confirmModalInfo, fetchedTasks, changeTasks } = useMyContext()



    // sideEffect
    useEffect(() => {
        fetch('http://localhost:8000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))

        console.log('1');

    }, [fetchedTasks, setTasks])



    return (
        <div className={styles.king}>
            {tasks.map(task => (
                <TaskBox
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    onMakeTaskImportant={changeTasks}
                    onCheckTask={changeTasks}
                />
            ))}
            <AddNewTaskBtn />
            {confirmModalInfo.isModalOpen && <ConfirmModal onConfirm={changeTasks} />}
        </div>
    )
}
