import { useEffect, useState } from "react";
import type { WeatherType } from "../../types/types";
import WeatherBox from "./components/weatherBox/WeatherBox";
import styles from './WeatherPage.module.scss';

export default function WeatherPage() {
    // state
    const [weathers, setWeathers] = useState<WeatherType[]>([])

    // side effect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/showWeather.php')
            .then(res => res.json())
            .then(data => setWeathers(data))
    }, [])

    return (
        <div className={styles.king}>
            {weathers.map((weather, index) => (
                <div className={styles.weatherBoxContainer}>
                    <WeatherBox key={index} cityName={weather.cityName} countryName={weather.countryName} lastUpdate={weather.lastUpdate} temp={weather.temp} weatherImg={weather.weatherImg} />
                </div>
            ))}
        </div>
    )
}
