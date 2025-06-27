import AddNewTaskBtn from './components/addNewTaskBtn/AddNewTaskBtn'
import styles from './myDayPage.module.scss'

export default function MyDayPage() {
    return (
        <div className={styles.king}>
            <AddNewTaskBtn />
        </div>
    )
}
