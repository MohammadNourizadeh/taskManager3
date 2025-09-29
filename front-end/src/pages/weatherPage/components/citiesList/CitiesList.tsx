import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import styles from './CitiesList.module.scss';
import type { CitiesInfoType } from "../../../../types/types";

export default function CitiesList({ cities }: { cities: CitiesInfoType[] }) {
    // redux
    const setting = useSelector((state: RootState) => state.setting)

    return (
        <div className={styles.citiesListContainer} id={setting.theme === 'dark' ? styles.darkMode : styles.lightMode}>
            <ul className={styles.citiesList}>
                {cities?.map((item, index) => (
                    <li key={index}>
                        <div className={styles.citiesInfoContainer}>
                            <span className={styles.cityName}>
                                {item.cityName}
                            </span>
                            <span className={styles.countryName}>
                                {item.countryName}
                            </span>
                        </div>
                        <button>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
