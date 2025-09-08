<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if (!isset($_COOKIE['userId'])) {
    echo json_encode(['err' => true, 'msg' => 'please log in']);
    exit;
}

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $name = $data['name'];
    $date = $data['date'];
    $isImportant = $data['isImportant'] ? 1 : 0;
    $userId = $_COOKIE['userId'];

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        INSERT INTO `tasks` 
        (`name` , `date` , `isImportant` , `user_id`)
        VALUES ('$name' , '$date' , $isImportant , $userId)
    ");
    $newTaskId = mysqli_insert_id($db);

    echo json_encode(['newTaskId' => $newTaskId, 'msg' => 'New task added']);
}
