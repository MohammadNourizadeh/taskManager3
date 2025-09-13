import { useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useToggle from '../../../../customHooks/useToggle/useToggle';
import type { RootState } from '../../../../store/store';
import type { AuthenticationErrorType, LogInFetchBodyContentType, SignUpFetchBodyContentType } from '../../../../types/types';
import styles from './AuthForm.module.scss';
import InputErrMessage from './components/inputErrMessage/InputErrMessage';
import ShowPassIcon from './components/showPassIcon/ShowPassIcon';
import { setUsername } from '../../../../store/slices/userInfo';



export default function AuthForm({ signUp = false }: { signUp?: boolean }) {
    // useNavigate
    const navigate = useNavigate()

    // redux
    const setting = useSelector((state: RootState) => state.setting)
    const dispatch = useDispatch()

    // custom hook
    const [showPass, setShowPass] = useToggle();
    const [showConfirmPass, setShowConfirmPass] = useToggle();

    // states
    const [emailInput, setEmailInput] = useState<string>('')
    const [usernameInput, setUsernameInput] = useState<string>('')
    const [passwordInput, setPasswordInput] = useState<string>('')
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('')
    const [errors, setErrors] = useState<AuthenticationErrorType>({
        emailErr: '',
        usernameErr: '',
        passwordErr: '',
        confirmPasswordErr: ''
    })



    // func
    const handleFetch = (isSignUp: boolean = false) => {
        let url: string;
        let bodyContent: SignUpFetchBodyContentType | LogInFetchBodyContentType;
        let navigationUrl: string;

        if (isSignUp) {
            url = 'http://localhost:8080/php/task_manager/signup.php';
            bodyContent = { email: emailInput, username: usernameInput, password: passwordInput };
            navigationUrl = '/auth/login';
        } else {
            url = 'http://localhost:8080/php/task_manager/login.php';
            bodyContent = { username: usernameInput, password: passwordInput };
            navigationUrl = '/admin/my_day';
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent),
            credentials: !isSignUp ? "include" : "omit"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.msg)
                } else {
                    toast.success(data.msg)
                    navigate(navigationUrl)
                    dispatch(setUsername(data.userInfo.username))
                }
            })
    }

    const handleInputErr = (inputName: keyof AuthenticationErrorType, errMessage: string) => {
        setErrors(prev => ({
            ...prev,
            [inputName]: errMessage
        }));
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (emailInput === '') {
            handleInputErr('emailErr', 'Enter your email')
        } else {
            handleInputErr('emailErr', '')
        }

        if (usernameInput === '') {
            handleInputErr('usernameErr', 'Set your username')
        } else {
            handleInputErr('usernameErr', '')

        }

        if (passwordInput === '') {
            handleInputErr('passwordErr', 'Set your password')
        } else {
            handleInputErr('passwordErr', '')

        }

        if (confirmPasswordInput === '') {
            handleInputErr('confirmPasswordErr', 'Confirm your password')
        } else if (confirmPasswordInput !== passwordInput) {
            handleInputErr('confirmPasswordErr', 'Passwords do not match')
        } else {
            handleInputErr('confirmPasswordErr', '')
        }

        if (signUp) {
            if (confirmPasswordInput === passwordInput && emailInput !== '' && usernameInput !== '' && passwordInput !== '' && confirmPasswordInput !== '') {
                handleFetch(signUp)
            }
        } else {
            if (usernameInput !== '' && passwordInput !== '') {
                handleFetch()
            }
        }
    }

    return (
        <form className={styles.authForm} onSubmit={handleFormSubmit} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="email">email :</label>
                    <input type="email" id='email' value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }} className={errors.emailErr !== '' && emailInput === '' ? styles.inputWithError : ''} />
                    {errors.emailErr !== '' && <InputErrMessage errMessage={errors.emailErr} conditionState1={emailInput} />}
                </div>
            }
            <div className={styles.inputsContainer}>
                <label htmlFor="username">username :</label>
                <input type="text" id='username' value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }} className={errors.usernameErr !== '' && usernameInput === '' ? styles.inputWithError : ''} />
                {errors.usernameErr !== '' && <InputErrMessage errMessage={errors.usernameErr} conditionState1={usernameInput} />}
            </div>
            <div className={styles.inputsContainer}>
                <label htmlFor="password">password :</label>
                <div className={styles.passwordInput}>
                    <input type={showPass ? 'text' : "password"} id='password' value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} className={errors.passwordErr !== '' && passwordInput === '' ? styles.inputWithError : ''} />
                    <ShowPassIcon showPass={showPass} onToggle={() => { setShowPass() }} />
                </div>
                {errors.passwordErr !== '' && <InputErrMessage errMessage={errors.passwordErr} conditionState1={passwordInput} />}
            </div>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="confirmPassword">confirm your password :</label>
                    <div className={styles.passwordInput}>
                        <input type={showConfirmPass ? 'text' : "password"} id='confirmPassword' value={confirmPasswordInput} onChange={(e) => { setConfirmPasswordInput(e.target.value) }} className={(errors.confirmPasswordErr === 'Confirm your password' && confirmPasswordInput === '') || (errors.confirmPasswordErr === 'Passwords do not match' && passwordInput !== confirmPasswordInput) ? styles.inputWithError : ''} />
                        <ShowPassIcon showPass={showConfirmPass} onToggle={() => { setShowConfirmPass() }} />
                    </div>
                    {errors.confirmPasswordErr !== '' && <InputErrMessage conditionState1={confirmPasswordInput} errMessage={errors.confirmPasswordErr} conditionState2={passwordInput} />}
                </div>
            }
            <div className={styles.btnContainer}>
                <button type='submit'>
                    {signUp ? 'sign up' : 'login'}
                </button>
            </div>
        </form >
    )
}
