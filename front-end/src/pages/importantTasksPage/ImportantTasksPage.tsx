import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage"
import TaskBox from "../../components/taskBox/TaskBox"
import { setAll } from "../../store/slices/tasks"
import type { RootState } from "../../store/store"
import type { TasksType } from "../../types/types"
import LoadingIcon from "../../components/loadingIcon/LoadingIcon"

export default function ImportantTasksPage() {
    // redux
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    // side effect
    useEffect(() => {
        dispatch(setAll(null))
        fetch('http://localhost:8080/php/task_manager/showTasks.php', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                const importantTasks = data.filter((task: TasksType) => task.isImportant)
                dispatch(setAll(importantTasks))
            })
    }, [dispatch])
 
    if (tasks === null) return <LoadingIcon />

    return (
        tasks?.length !== 0 ?
            <div>
                {tasks?.map((task, index) => (
                    <TaskBox task={task} index={index} key={task.id} />
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
