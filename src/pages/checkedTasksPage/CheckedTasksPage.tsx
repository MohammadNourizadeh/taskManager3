import { useEffect } from "react"
import type { TasksType } from "../../contexts/mainContext/MainContext"
import { useMyContext } from "../../contexts/mainContext/useMyContext"
import TaskBox from "../../components/taskBox/TaskBox"
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage"

export default function CheckedTasksPage() {
    // context
    const { tasks, setTasks } = useMyContext()

    // side effect
    useEffect(() => {
        fetch('http://localhost:8000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data.filter((item: TasksType) => item.isDone === true)))
    }, [setTasks])

    return (
        tasks.length !== 0 ?
            tasks.map(task => (
                <TaskBox key={task.id} task={task} tasks={tasks} onCheckTask={(val) => { setTasks(val) }} onMakeTaskImportant={(val) => { setTasks(val) }} />
            ))
            :
            <NotFoundMessage
                notFoundItem="checked task"
                description="
                mark tasks as done, and 
                they'll show up here with check icon 
                at the beginning"/>
    )
}
