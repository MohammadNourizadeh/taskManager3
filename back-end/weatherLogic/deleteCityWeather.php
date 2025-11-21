<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $cityId = $data['cityId'];

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        DELETE FROM `city_weather` 
        WHERE `id` = $cityId; 
    ");
}