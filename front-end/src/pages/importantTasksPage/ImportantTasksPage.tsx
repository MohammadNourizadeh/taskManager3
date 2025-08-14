import { useEffect } from "react"
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage"
import TaskBox from "../../components/taskBox/TaskBox"
import { useMyContext } from "../../contexts/mainContext/useMyContext"
import type { TasksType } from "../../types/types"

export default function ImportantTasksPage() {
    // context
    const { tasks, setTasks } = useMyContext()

    // side effect
    useEffect(() => {
        fetch("http://localhost:8000/tasks")
            .then(res => res.json())
            .then(data => setTasks(data.filter((item: TasksType) => item.isImportant)))
    }, [setTasks])

    // func
    const changeTasksState = (val: TasksType[]) => {
        setTasks(val)
    }


    return (
        tasks.length !== 0 ?
            <div>
                {tasks.map(task => (
                    <TaskBox tasks={tasks} task={task} onCheckTask={changeTasksState} onMakeTaskImportant={changeTasksState} key={task.id} />
                ))}
            </div>
            :
            <NotFoundMessage
                notFoundItem="important task"
                description="give a star to tasks that are important to you, and 
                show up here with star icon appearing at
                the end"/>
    )
}
