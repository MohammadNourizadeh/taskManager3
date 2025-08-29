import { useEffect } from "react"
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage"
import TaskBox from "../../components/taskBox/TaskBox"
import type { TasksType } from "../../types/types"

export default function ImportantTasksPage() {


    // side effect
    useEffect(() => {
        fetch("http://localhost:8080/php/task_manager/showTasks.php")
            .then(res => res.json())
            .then(data => setTasks(data.filter((item: TasksType) => item.isImportant)))
    }, [setTasks])



    return (
        tasks.length !== 0 ?
            <div>
                {tasks.map(task => (
                    <TaskBox tasks={tasks} task={task} onUpdateTaskState={(val) => { setTasks(val) }} key={task.id} />
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
