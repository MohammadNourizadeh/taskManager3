import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingIcon from "../../components/loadingIcon/LoadingIcon"
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage"
import TaskBox from "../../components/taskBox/TaskBox"
import type { RootState } from "../../store/store"
import type { TasksType } from "../../types/types"
import styles from './CheckedTasksPage.module.scss'

export default function CheckedTasksPage() {
    // redux 
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    // side effect
    useEffect(() => {
        fetch('http://localhost:8000/tasks', {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => dispatch(data.filter((item: TasksType) => item.isDone === true)))
    }, [dispatch])

    if (tasks === null) return (
        <div className={styles.loadingIconContainer}>
            <LoadingIcon />
        </div>
    )

    return (
        tasks?.length !== 0 ?
            tasks?.map((task, index) => (
                <TaskBox key={task.id} task={task} index={index} />
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
