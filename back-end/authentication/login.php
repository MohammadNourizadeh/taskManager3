<?php

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $username = $data['username'];
    $password = $data['password'];

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    $userFromDb = mysqli_prepare($db, "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?");
    mysqli_stmt_bind_param($userFromDb, 'ss', $username, $password);
    mysqli_stmt_execute($userFromDb);
    $userFromDb = mysqli_stmt_get_result($userFromDb );

    if ($userInfo = mysqli_fetch_assoc($userFromDb)) {
        $_SESSION['userId'] = $userInfo['id'];
        echo json_encode(['error' => false, 'msg' => 'welcome']);
    } else {
        echo json_encode(['error' => true, 'msg' => 'user not found']);
    }
}