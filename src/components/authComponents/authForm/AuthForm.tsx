import useToggle from '../../../customHooks/useToggle/useToggle';
import styles from './AuthForm.module.scss';
import ShowPassIcon from './components/showPassIcon/ShowPassIcon';

export default function AuthForm({ signUp = false }: { signUp?: boolean }) {
    // custom hook
    const [showPass, setShowPass] = useToggle();
    const [showConfirmPass, setShowConfirmPass] = useToggle();

    return (
        <form className={styles.authForm} onSubmit={(e) => { e.preventDefault() }}>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="email">email :</label>
                    <input type="email" id='email' />
                </div>
            }
            <div className={styles.inputsContainer}>
                <label htmlFor="username">username :</label>
                <input type="text" id='username' />
            </div>
            <div className={styles.inputsContainer}>
                <label htmlFor="password">password :</label>
                <div className={styles.passwordInput}>
                    <input type={showPass ? 'text' : "password"} id='password' />
                    <ShowPassIcon showPass={showPass} onToggle={(val) => { setShowPass(val) }} />
                </div>
            </div>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="confirmPassword">confirm your password :</label>
                    <div className={styles.passwordInput}>
                        <input type={showConfirmPass ? 'text' : "password"} id='confirmPassword' />
                        <ShowPassIcon showPass={showConfirmPass} onToggle={(val) => { setShowConfirmPass(val) }} />
                    </div>
                </div>
            }
            <div className={styles.btnContainer}>
                <button>
                    {signUp ? 'sign up' : 'login'}
                </button>
            </div>
        </form>
    )
}
