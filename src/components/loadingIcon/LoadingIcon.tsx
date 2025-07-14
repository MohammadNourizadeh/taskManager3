import { useEffect, useState } from 'react';
import styles from './LoadingIcon.module.scss';

export default function LoadingIcon() {
    // state
    const [index, setIndex] = useState<number>(0)

    // var
    const loadings: string[] = [
        'loading',
        'loading .',
        'loading . .',
        'loading . . .'
    ]

    // side effect
    useEffect(() => {
        const myInterval = setInterval(() => {
            setIndex(prev => (prev + 1) % loadings.length);
        }, 300)

        return () => {
            clearInterval(myInterval)
        }
    }, [loadings.length])


    return (
        <div className={styles.king}>
            <div className={styles.spinner} />
            <div className={styles.loadingContainer}>
                {loadings[index]}
            </div>
        </div>
    )
}
