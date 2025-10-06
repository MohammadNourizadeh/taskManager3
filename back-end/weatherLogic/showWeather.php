<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$userId = $_COOKIE["userId"] ?? null;

$weatherURL = 'https://api.weatherapi.com/v1/current.json?key=2219e611ea0c4fe0834220540212709&q=';
$citiesInfo = [];
$cities = [];

if (isset($userId)) {
    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    $userChosenCities = mysqli_query($db, "
        SELECT * FROM `city_weather`
        WHERE `city_weather`.`user_id` = $userId; 
    ");

    while ($cityFromDb = mysqli_fetch_assoc($userChosenCities)) {
        $cities[] = [
            'id' => $cityFromDb['id'],
            'city' => $cityFromDb['city']
        ];
    }

    foreach ($cities as $city) {
        $fetchedData = file_get_contents($weatherURL . $city['city']);
        $data = json_decode($fetchedData, true);

        $citiesInfo[] = [
            'id' => $city['id'],
            'cityName' => $data['location']['name'],
            'countryName' => $data['location']['country'],
            'lastUpdate' => $data['current']['last_updated'],
            'temp' => $data['current']['temp_c'],
            'weatherImg' => $data['current']['condition']['icon'],
        ];
    }
}



echo json_encode(array_reverse($citiesInfo));