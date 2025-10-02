<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$userId = $_COOKIE['userId'];

if (isset($userId)) {
    $newCityInfo = []; // for echo

    $fetchedData = file_get_contents("php://input");
    $newCityFromUser = json_decode($fetchedData, true);
    $newCityFromUser = $newCityFromUser['cityName'];
    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        INSERT INTO `city_weather`
        (`city` , `user_id`) 
        VALUES('$newCityFromUser' , $userId); 
    ");

    $newCityId = mysqli_insert_id($db);
    $newCityFromDb = mysqli_query($db, "
        SELECT `city` FROM `city_weather`
        WHERE `city_weather`.`id` = $newCityId; 
    ");

    $weatherURL = 'https://api.weatherapi.com/v1/current.json?key=2219e611ea0c4fe0834220540212709&q=';
    $newCityName = mysqli_fetch_assoc($newCityFromDb);
    $fetchedCityWeatherInfo = file_get_contents($weatherURL . $newCityName['city']);
    $cityInfo = json_decode($fetchedCityWeatherInfo, true);

    $newCityInfo = [
        'cityName' => $cityInfo['location']['name'],
        'countryName' => $cityInfo['location']['country'],
        'lastUpdate' => $cityInfo['current']['last_updated'],
        'temp' => $cityInfo['current']['temp_c'],
        'weatherImg' => $cityInfo['current']['condition']['icon'],
    ];
    echo json_encode($newCityInfo);
}