import { useEffect } from "react"
import TaskBox from "../../components/taskBox/TaskBox"
import { useMyContext } from "../../contexts/mainContext/useMyContext"
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage"

export default function ImportantTasksPage() {
    // context
    const { fetchedTasks, setFetchedTasks, changeTasks } = useMyContext()

    // side effect
    useEffect(() => {
        fetch("http://localhost:8000/tasks")
            .then(res => res.json())
            .then(data => setFetchedTasks(data))
    }, [setFetchedTasks])


    // var
    const importantTasks = [...fetchedTasks].filter(importantTask => importantTask.isImportant)

    return (
        importantTasks.length !== 0 ?
            <div>
                {importantTasks.map(importantTask => (
                    <TaskBox tasks={fetchedTasks} task={importantTask} onCheckTask={changeTasks} onMakeTaskImportant={changeTasks} key={importantTask.id} />
                ))}
            </div>
            :
            <NotFoundMessage />
    )
}
