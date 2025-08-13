<?php

// CORS headers 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PATCH , DELETE , OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$getData = file_get_contents('php://input');
$data = json_decode($getData, true);

if (isset($data)) {
    $id = $data['taskId'];

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        DELETE FROM `tasks`
        WHERE id = $id
    ");

}
