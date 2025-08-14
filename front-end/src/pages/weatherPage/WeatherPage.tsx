import { useEffect, useState } from "react";
import WeatherBox from "./components/weatherBox/WeatherBox";
import styles from './WeatherPage.module.scss';

export default function WeatherPage() {
    // state
    const [weathers, setWeathers] = useState([])

    // side effect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/showWeather.php')
            .then(res => res.json())
            .then(data => setWeathers(data))
    }, [])

    return (
        <div className={styles.king}>
            {weathers.map(weather => (
                <div className={styles.weatherBoxContainer}>
                    <WeatherBox cityName={weather.city_name} countryName={weather.country_name} lastUpdate={weather.last_update} temp={weather.temp_c} weatherImg={weather.img} />
                </div>
            ))}
        </div>
    )
}
