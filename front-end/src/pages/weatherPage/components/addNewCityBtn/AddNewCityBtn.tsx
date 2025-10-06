import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import styles from './AddNewCityBtn.module.scss';
import { cities } from "./cities";
import type { WeatherType } from "../../../../types/types";
import { useNavigate } from "react-router-dom";

export default function AddNewCityBtn({ onAddNewCity }: { onAddNewCity: (newCityInfo: WeatherType) => void }) {
    // navigation
    const navigate = useNavigate()

    // func
    const handleAddNewCity = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const res = await fetch('http://localhost:8080/php/task_manager/addNewCityWeather.php', {
                method: "POST",
                body: JSON.stringify({ cityName: e.target.value }),
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error(res.statusText)
            }

            const data = await res.json()


            if (data.err) {
                navigate('/auth/login')
                toast.error(data.msg)
            } else {
                onAddNewCity(data)
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("An unknown error occurred.")
            }
        }
    }

    return (
        <div className={styles.king}>
            <FontAwesomeIcon icon={faAdd} />
            <span>Add City</span>
            <select onChange={handleAddNewCity}>
                {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}
            </select>
        </div>
    )
}
