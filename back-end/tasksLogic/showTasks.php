<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
if (!isset($_SESSION['userId'])) {
    echo json_encode([]);
    exit;
}

$userId = $_SESSION['userId'];


$db = mysqli_connect('localhost', 'root', '', 'task_manager');
$tasks = mysqli_query($db, "
    SELECT * FROM `tasks` 
    WHERE tasks.user_id = $userId
");

$userTasks = [];

while ($task = mysqli_fetch_assoc($tasks)) {
    $userTasks[] = $task;
}
echo json_encode($userTasks);