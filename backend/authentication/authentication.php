<?php

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $db = mysqli_connect("localhost", "root", "", "task_manager");
    $action = $data["action"];
    $email = $data['email'] ?? '';
    $username = $data['username'];
    $password = $data['password'];

    if ($action === 'signUp') {
        mysqli_query($db, "
        insert into `users`
        (`email` , `username` , `password`)
        values ('$email' , '$username' , '$password')
    ");

        echo json_encode(["error" => false, "msg" => "registration was successful"]);
    } else {
        $userFromDb = mysqli_query($db, "
        select * from `users`
        where 
        `username` = '$username' and `password` = '$password'
        ");

        if ($user = mysqli_fetch_assoc($userFromDb)) {
            echo json_encode(["error" => false, "msg" => "welcome"]);
        } else {
            echo json_encode(["error" => true, "msg" => "user not found"]);
        }
    }
}


