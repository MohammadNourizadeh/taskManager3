import { useEffect } from "react"
import TaskBox from "../../components/taskBox/TaskBox"
import { useMyContext } from "../../contexts/mainContext/useMyContext"

export default function ImportantTasksPage() {
    // context
    const { fetchedTasks: importantTasks, setFetchedTasks: setImportantTasks, changeTasks } = useMyContext()

    // side effect
    useEffect(() => {
        fetch("http://localhost:8000/tasks")
            .then(res => res.json())
            .then(data => setImportantTasks(data))
    }, [setImportantTasks])
    return (
        importantTasks.map(importantTask => {
            if (importantTask.isImportant) {
                return <TaskBox tasks={importantTasks} task={importantTask} onCheckTask={changeTasks} onMakeTaskImportant={changeTasks} key={importantTask.id} />
            }
        })
    )
}
