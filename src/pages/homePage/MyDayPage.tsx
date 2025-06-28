import TaskBox from '../../components/taskBox/TaskBox'
import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'

export default function MyDayPage() {
    return (
        <div className={styles.king}>
            <TaskBox />
            <AddNewTaskBtn />
        </div>
    )
}
