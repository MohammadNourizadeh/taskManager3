import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './AddNewCityBtn.module.scss';
import { cities } from "./cities";

export default function AddNewCityBtn() {
    return (
        <div className={styles.king}>
            <FontAwesomeIcon icon={faAdd} />
            <span>Add City</span>
            <select>
                {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}
            </select>
        </div>
    )
}
