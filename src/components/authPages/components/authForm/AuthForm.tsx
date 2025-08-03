import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useToggle from '../../../../customHooks/useToggle/useToggle';
import styles from './AuthForm.module.scss';
import InputErrMessage from './components/inputErrMessage/InputErrMessage';
import ShowPassIcon from './components/showPassIcon/ShowPassIcon';
import { toast } from 'react-toastify';

type signUpFetchBodyType = {
    action: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}

type logInFetchBodyType = {
    action: string,
    username: string,
    password: string,
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
    const handleFetch = () => {
        const body: signUpFetchBodyType | logInFetchBodyType = signUp ?
            {
                action: 'signUp',
                email: emailInput,
                username: usernameInput,
                password: passwordInput,
                confirmPassword: confirmPasswordInput,
            }
            :
            {
                action: 'logIn',
                username: usernameInput,
                password: passwordInput,
            }

        fetch('http://localhost:8080/php/task_manager/authentication.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.msg)
                } else {
                    toast.success(data.msg, {
                        hideProgressBar: true,
                    })
                    if (signUp) {
                        navigate('/auth/login')
                    }
                }
            })
    }

    const handleInputErr = (inputName: keyof ErrorType, errMessage: string) => {
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
                handleFetch()
            }
        } else {
            if (usernameInput !== '' && passwordInput !== '') {
                handleFetch()
            }
        }
    }

    return (
        <form className={styles.authForm} onSubmit={handleFormSubmit}>
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
                    <ShowPassIcon showPass={showPass} onToggle={(val) => { setShowPass(val) }} />
                </div>
                {errors.passwordErr !== '' && <InputErrMessage errMessage={errors.passwordErr} conditionState1={passwordInput} />}
            </div>
            {
                signUp &&
                <div className={styles.inputsContainer}>
                    <label htmlFor="confirmPassword">confirm your password :</label>
                    <div className={styles.passwordInput}>
                        <input type={showConfirmPass ? 'text' : "password"} id='confirmPassword' value={confirmPasswordInput} onChange={(e) => { setConfirmPasswordInput(e.target.value) }} className={(errors.confirmPasswordErr === 'Confirm your password' && confirmPasswordInput === '') || (errors.confirmPasswordErr === 'Passwords do not match' && passwordInput !== confirmPasswordInput) ? styles.inputWithError : ''} />
                        <ShowPassIcon showPass={showConfirmPass} onToggle={(val) => { setShowConfirmPass(val) }} />
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
