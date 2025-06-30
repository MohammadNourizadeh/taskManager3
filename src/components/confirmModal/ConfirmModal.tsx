import styles from './ConfirmModal.module.scss'

export default function ConfirmModal() {
    return (
        <div className={styles.king}>
            <div className={styles.modal}>
                <div className={styles.modalText}>
                    Are you sure you want to delete the task ?
                </div>
                <div className={styles.btnsContainer}>
                    <button className={styles.yesBtn}>yes</button>
                    <button className={styles.noBtn}>no</button>
                </div>
            </div>
        </div>
    )
}
