<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

$fetchedData = file_get_contents("php://input");
$data = json_decode($fetchedData, true);

if (isset($data)) {
    $name = $data['name'];
    $date = $data['date'];
    $isImportant = $data['isImportant'] ? 1 : 0;

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');
    mysqli_query($db, "
        INSERT INTO `tasks` 
        (`name` , `date` , `isImportant`)
        VALUES ('$name' , '$date' , $isImportant)
    ");
    echo 'New task added';
}
