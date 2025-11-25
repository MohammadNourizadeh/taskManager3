<?php

// CORS headers 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PATCH , OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$fetchedData = file_get_contents("php://input");
$newData = json_decode($fetchedData, true);

if (isset($newData)) {
    $paramsType = '';
    $newFields = [];
    $values = [];
    $prevTaskName = null;
    $prevTaskDate = null;
    $taskId = $newData['id'];
    $taskName = $newData['name'] ?? null;
    $taskDate = $newData['date'] ?? null;

    $db = mysqli_connect('localhost', 'root', '', 'task_manager');

    $prevData = mysqli_prepare($db, "
        SELECT tasks.name , tasks.date FROM `tasks`
        WHERE `tasks`.`id` = ?;
    ");
    mysqli_stmt_bind_param($prevData, 'i', $taskId);
    mysqli_stmt_execute($prevData);
    $prevData = mysqli_stmt_get_result($prevData);

    while ($data = mysqli_fetch_assoc($prevData)) {
        $prevTaskName = $data['name'];
        $prevTaskDate = $data['date'];
    }

    if ($taskDate !== $prevTaskDate || $taskName !== $prevTaskName) {
        if ($taskName !== null && $taskName !== '' && $taskName !== $prevTaskName) {
            $newFields[] = "name = ?";
            $paramsType .= 's';
            $values[] = $taskName;
        }


        if ($taskDate !== null && $taskDate !== '' && $taskDate !== $prevTaskDate) {
            $newFields[] = "date = ?";
            $paramsType .= 's';
            $values[] = $taskDate;
        }

        $values[] = $taskId;
        $paramsType .= "i";

        $updatedData = mysqli_prepare($db, "
            UPDATE `tasks` 
            SET " . implode(", ", $newFields) . " 
            WHERE `tasks`.`id` = ?
        ");
        mysqli_stmt_bind_param($updatedData, $paramsType, ...$values);
        mysqli_stmt_execute($updatedData);
    }

    

    http_response_code(204);
}