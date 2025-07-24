import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useToggle from '../../../../customHooks/useToggle/useToggle';
import styles from './AuthForm.module.scss';
import ShowPassIcon from './components/showPassIcon/ShowPassIcon';

type FetchBodyType = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}

type ErrorType = {
    emailErr: string,
    usernameErr: string,
    passwordErr: string,
    confirmPasswordErr: string
}

export default function AuthForm({ signUp = false }: { signUp?: boolean }) {
    // useNavigate
    const navigate = useNavigate()

    // custom hook
    const [showPass, setShowPass] = useToggle();
    const [showConfirmPass, setShowConfirmPass] = useToggle();

    // states
    const [emailInput, setEmailInput] = useState<string>('')
    const [usernameInput, setUsernameInput] = useState<string>('')
    const [passwordInput, setPasswordInput] = useState<string>('')
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('')
    const [errors, setErrors] = useState<ErrorType>({
        emailErr: '',
        usernameErr: '',
        passwordErr: '',
        confirmPasswordErr: ''
    })



    // func
    const handleInputErr = (inputName: keyof ErrorType, errMessage: string) => {
        setErrors(prev => ({
            ...prev,
            [inputName]: errMessage
        }));
    }

    const handleFormSubmit = () => {
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

        if (confirmPasswordInput === passwordInput && emailInput !== '' && usernameInput !== '' && passwordInput !== '' && confirmPasswordInput !== '') {
            const body: FetchBodyType = {
                email: emailInput,
                username: usernameInput,
                password: passwordInput,
                confirmPassword: confirmPasswordInput,
            }

            fetch('http://localhost:8080/php/task_manager/authentication.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
                .then(res => {
                    if (res.ok) {
                        navigate("/auth/login")
                    }
                })
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleFormSubmit()
    }

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="email">email :</label>
                    <input type="email" id='email' value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }} className={errors.emailErr !== '' && emailInput === '' ? styles.inputWithError : ''} />
                    {errors.emailErr !== '' && <div className={emailInput === '' ? styles.errMsgContainer : styles.greenErrMsgContainer}>
                        <span>
                            <FontAwesomeIcon icon={emailInput === '' ? faWarning : faCheckCircle} />
                        </span>
                        {errors.emailErr}
                    </div>}
                </div>
            }
            <div className={styles.inputsContainer}>
                <label htmlFor="username">username :</label>
                <input type="text" id='username' value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }} className={errors.usernameErr !== '' && usernameInput === '' ? styles.inputWithError : ''} />
                {errors.usernameErr !== '' && <div className={usernameInput === '' ? styles.errMsgContainer : styles.greenErrMsgContainer}>
                    <span>
                        <FontAwesomeIcon icon={usernameInput === '' ? faWarning : faCheckCircle} />
                    </span>
                    {errors.usernameErr}
                </div>}
            </div>
            <div className={styles.inputsContainer}>
                <label htmlFor="password">password :</label>
                <div className={styles.passwordInput}>
                    <input type={showPass ? 'text' : "password"} id='password' value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} className={errors.passwordErr !== '' && passwordInput === '' ? styles.inputWithError : ''} />
                    <ShowPassIcon showPass={showPass} onToggle={(val) => { setShowPass(val) }} />
                </div>
                {errors.passwordErr !== '' && <div className={passwordInput === '' ? styles.errMsgContainer : styles.greenErrMsgContainer}>
                    <span>
                        <FontAwesomeIcon icon={passwordInput === '' ? faWarning : faCheckCircle} />
                    </span>
                    {errors.passwordErr}
                </div>}
            </div>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="confirmPassword">confirm your password :</label>
                    <div className={styles.passwordInput}>
                        <input type={showConfirmPass ? 'text' : "password"} id='confirmPassword' value={confirmPasswordInput} onChange={(e) => { setConfirmPasswordInput(e.target.value) }} className={errors.confirmPasswordErr !== '' && (confirmPasswordInput === '' || confirmPasswordInput !== passwordInput) ? styles.inputWithError : ''} />
                        <ShowPassIcon showPass={showConfirmPass} onToggle={(val) => { setShowConfirmPass(val) }} />
                    </div>
                    {errors.confirmPasswordErr !== '' && <div className={confirmPasswordInput === '' || confirmPasswordInput !== passwordInput ? styles.errMsgContainer : styles.greenErrMsgContainer}>
                        <span>
                            <FontAwesomeIcon icon={confirmPasswordInput === '' || confirmPasswordInput !== passwordInput ? faWarning : faCheckCircle} />
                        </span>
                        {errors.confirmPasswordErr}
                    </div>}
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
