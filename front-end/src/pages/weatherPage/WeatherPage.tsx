import { useEffect, useState } from "react";
import type { CitiesInfoType, WeatherType } from "../../types/types";
import AddNewCityBtn from "./components/addNewCityBtn/AddNewCityBtn";
import CitiesList from "./components/citiesList/CitiesList";
import WeatherBox from "./components/weatherBox/WeatherBox";
import styles from './WeatherPage.module.scss';
import NotFoundMessage from "../../components/notFoundMessage/NotFoundMessage";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";

export default function WeatherPage() {

    // state
    const [weathers, setWeathers] = useState<WeatherType[] | null>(null)
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
                        id: city.id,
                        cityName: city.cityName,
                        countryName: city.countryName
                    })
                });
                setCities(cityInfoList)
            })
    }, [])

    // func
    const handleAddNewCity = (newCityInfo: WeatherType) => {
        setWeathers(prev => [newCityInfo, ...(prev ?? [])])
        setCities(prev => [{ id: newCityInfo.id, cityName: newCityInfo.cityName, countryName: newCityInfo.countryName }, ...prev])
    }

    const onDeleteCity = (newCityList: typeof cities, itemId: number) => {
        setCities(newCityList)
        if (weathers) setWeathers(weathers.filter(item => item.id !== itemId))
    }

    return (
        <div className={styles.king}>
            <div className={styles.addNewBtnAndCitiesListContainer}>
                <AddNewCityBtn onAddNewCity={handleAddNewCity} />
                <CitiesList cities={cities} onDelete={onDeleteCity} />
            </div>
            <div className={styles.weatherBoxContainer}>
                {weathers === null ?
                    <div className={styles.loadingIconContainer}>
                        <LoadingIcon />
                    </div>
                    :
                    weathers.length !== 0 ?
                        weathers.map((weather) => (
                            <div key={weather.id} className={styles.weatherBox}>
                                <WeatherBox cityName={weather.cityName} countryName={weather.countryName} lastUpdate={weather.lastUpdate} temp={weather.temp} weatherImg={weather.weatherImg} />
                            </div>
                        ))
                        :
                        <NotFoundMessage notFoundItem="city" description="Please choose a city to see its weather, and the selected city will appear here ." />}
            </div>
        </div>
    )
}
