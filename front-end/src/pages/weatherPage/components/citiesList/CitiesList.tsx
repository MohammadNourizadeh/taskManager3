import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import type { CitiesInfoType } from "../../../../types/types";
import styles from './CitiesList.module.scss';

export default function CitiesList({ cities, onDelete }: { cities: CitiesInfoType[], onDelete: (newCityList: CitiesInfoType[], itemId: number) => void }) {
    // redux
    const setting = useSelector((state: RootState) => state.setting)

    // func
    const handleDeleteCity = (itemId: number) => {
        fetch('http://localhost:8080/php/task_manager/deleteCityWeather.php', {
            method: "DELETE",
            body: JSON.stringify({ cityId: itemId })
        }).then(res => {
            if (res.ok) {
                const temp = [...cities]
                const newCitiesList = temp.filter(city => city.id !== itemId)
                onDelete(newCitiesList, itemId)
            }
        })
    }

    return (
        <div className={styles.citiesListContainer} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <ul className={styles.citiesList}>
                {cities?.map((item) => (
                    <li key={item.id}>
                        <div className={styles.citiesInfoContainer}>
                            <span className={styles.cityName}>
                                {item.cityName}
                            </span>
                            <span className={styles.countryName}>
                                {item.countryName}
                            </span>
                        </div>
                        <button onClick={() => { handleDeleteCity(item.id) }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
