import type { WeatherBoxProps } from '../../../../types/types';
import styles from './WeatherBox.module.scss';



export default function WeatherBox({ cityName, countryName, lastUpdate, temp, weatherImg }: WeatherBoxProps) {
    return (
        <div className={styles.king}>

            <div className={styles.top}>
                <div>
                    <h2>{cityName}</h2>
                    <span>{countryName}</span>
                </div>
                <div className={styles.weatherImgContainer}>
                    <img src={weatherImg} alt='weather' />
                </div>
            </div>

            <div className={styles.bottom}>
                <span className={styles.temp}>
                    {temp}°C
                </span>
                <span className={styles.weatherType}>
                    CLEAR SKY
                </span>
                <small className={styles.lastUpdate}>
                    last update: {lastUpdate}
                </small>
            </div>
        </div>
    )
}
