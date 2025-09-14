<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (isset($_COOKIE['userId'])) {

    $userId = $_COOKIE['userId'];
    $userSetting = [];

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    $query = mysqli_query($db, "
    SELECT `user_setting`.`theme` , `users`.`username` , `users`.`password`
    FROM `users` 
    INNER JOIN `user_setting` ON `user_setting`.`user_id` = $userId; 
");

    $result = mysqli_fetch_assoc($query);

    echo json_encode([
        'theme' => $result['theme'],
        'username' => $result['username'],
        'password' => $result['password']
    ]);

}

