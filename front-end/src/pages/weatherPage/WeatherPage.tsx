import { useEffect, useState } from "react";
import type { CitiesInfoType, WeatherType } from "../../types/types";
import AddNewCityBtn from "./components/addNewCityBtn/AddNewCityBtn";
import CitiesList from "./components/citiesList/CitiesList";
import WeatherBox from "./components/weatherBox/WeatherBox";
import styles from './WeatherPage.module.scss';

export default function WeatherPage() {

    // state
    const [weathers, setWeathers] = useState<WeatherType[]>([])
    const [cities, setCities] = useState<CitiesInfoType[]>([])

    // side effect
    useEffect(() => {
        fetch('http://localhost:8080/php/task_manager/showWeather.php', {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setWeathers(data)
                const cityInfoList: typeof cities = []
                data.forEach((city: WeatherType) => {
                    cityInfoList.push({
                        cityName: city.cityName,
                        countryName: city.countryName
                    })
                });
                setCities(cityInfoList)
            })
    }, [])

    return (
        <div className={styles.king}>
            <div className={styles.addNewBtnAndCitiesListContainer}>
                <AddNewCityBtn />
                <CitiesList cities={cities} />
            </div>
            <div className={styles.weatherBoxContainer}>
                {weathers.map((weather, index) => (
                    <div className={styles.weatherBox}>
                        <WeatherBox key={index} cityName={weather.cityName} countryName={weather.countryName} lastUpdate={weather.lastUpdate} temp={weather.temp} weatherImg={weather.weatherImg} />
                    </div>
                ))}
            </div>
        </div>
    )
}
