<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $settingItem = $data['settingItem'];
    $newSettingValue = $data['newValue'];
    $userId = $_COOKIE['userId'];

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        UPDATE `user_setting`
        SET `$settingItem`  = '$newSettingValue'
        WHERE user_id = $userId
    ");
}