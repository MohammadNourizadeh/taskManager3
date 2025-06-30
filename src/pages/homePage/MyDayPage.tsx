import { useEffect, useState } from 'react'
import TaskBox from '../../components/taskBox/TaskBox'
import { useMyContext } from '../../contexts/mainContext/useMyContext'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'
import type { TasksType } from '../../contexts/mainContext/MainContext'

export default function MyDayPage() {
    // context
    const { setTasks, tasks } = useMyContext()

    // states
    const [fetchedTasks, setFetchedTasks] = useState<TasksType[]>([])

    // sideEffect
    useEffect(() => {
        fetch('http://localhost:8000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [fetchedTasks, setTasks])

    // func
    const changeTasks = (val: TasksType[]) => {
        setFetchedTasks(val)
    }

    return (
        <div className={styles.king}>
            {tasks.map(task => (
                <TaskBox
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    onMakeTaskImportant={changeTasks}
                    onDeleteTask={changeTasks}
                    onCheckTask={changeTasks}
                />
            ))}
            <AddNewTaskBtn />
        </div>
    )
}
