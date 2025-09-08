<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$weatherURL = 'https://api.weatherapi.com/v1/current.json?key=2219e611ea0c4fe0834220540212709&q=';
$cities = ['London', 'paris'];

$db = mysqli_connect('localhost', 'root', '', 'task_manager');
$userCitiesData = mysqli_query($db, '
    SELECT city FROM `city_weather`
    WHERE user_id = 7
');

while ($cityData = mysqli_fetch_assoc($userCitiesData)) {
    $cities[] = $cityData['city'];
}

$citiesInfo = [];

foreach ($cities as $city) {
    $getData = file_get_contents($weatherURL . $city);
    $data = json_decode($getData, true);

    $citiesInfo[] = [
        'cityName' => $data['location']['name'],
        'countryName' => $data['location']['country'],
        'lastUpdate' => $data['current']['last_updated'],
        'temp' => $data['current']['temp_c'],
        'weatherImg' => $data['current']['condition']['icon'],
    ];
}

echo json_encode($citiesInfo);