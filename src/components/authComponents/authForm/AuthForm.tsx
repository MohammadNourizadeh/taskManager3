import styles from './AuthForm.module.scss'

export default function AuthForm() {
    return (
        <form className={styles.authForm}>
            <div className={styles.inputsContainer}>
                <label htmlFor="">email :</label>
                <input type="email" />
            </div>
            <div className={styles.inputsContainer}>
                <label htmlFor="">username :</label>
                <input type="text" />
            </div>
            <div className={styles.inputsContainer}>
                <label htmlFor="">password :</label>
                <input type="password" />
            </div>
            <div className={styles.inputsContainer}>
                <label htmlFor="">confirm your password :</label>
                <input type="password" />
            </div>
            <div className={styles.btnContainer}>
                <button>sign up</button>
            </div>
        </form>
    )
}
