<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$getData = file_get_contents("php://input");
$data = json_decode($getData, true);


if (isset($data)) {
    $db = mysqli_connect('localhost', 'root', '', 'task_manager');

    $email = $data['email'];
    $username = $data['username'];
    $password = $data['password'];

    mysqli_query($db, "
        INSERT INTO `users`
        (`email` , `username` , `password`)
        values ('$email' , '$username' , '$password')
    ");

    $dataSend = ['error' => false, 'msg' => 'registration was successful'];
    echo json_encode($dataSend);
}