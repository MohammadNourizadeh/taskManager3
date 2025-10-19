import { useEffect, useState } from 'react'
import styles from './HeaderDate.module.scss'
import LoadingIcon from '../../../../../../components/loadingIcon/LoadingIcon'

export default function HeaderDate() {
    // state
    const [date, setDate] = useState<string | null>(null)

    // side effect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/getDate.php')
            .then(res => res.text())
            .then(data => {
                const myNewDate = new Date(data)
                setDate(myNewDate.toLocaleString("en-US", {
                    day: 'numeric',
                    weekday: "long",
                    month: 'long',
                }))

            })
    }, [])

    return (
        <div className={styles.date}>
            {date !== 'null' ?
                <LoadingIcon width={24} loadingText={false} />
                :
                date}
        </div>
    )
}
