<?php

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    $username = $data['username'];
    $password = $data['password'];

    $userFromDb = mysqli_query($db, "
        SELECT * FROM `users`
        WHERE `username` = '$username' AND `password` = '$password'
    ");

    if (mysqli_fetch_assoc($userFromDb)) {
        $dataSend = ['error' => false, 'msg' => 'welcome'];
        echo json_encode($dataSend);
    } else {
        $dataSend = ['error' => true, 'msg' => 'user not found'];
        echo json_encode($dataSend);
    }
}