<?php

// CORS headers 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PATCH , OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {

    $taskId = $data['id'];
    $taskState = $data['taskState'];
    $taskStateValue = $data['taskStateValue'] ? 1 : 0;

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        UPDATE `tasks`
        SET $taskState = $taskStateValue
        WHERE id = $taskId
    ");

}