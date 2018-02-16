<?php

require '../helpers/_headers.php';
require '../helpers/_database.php';
require '../helpers/_functions.php';

//$userId = $_POST['userId'];
//$songId = $_POST['songId'];
//$grade = $_POST['grade'];

$userId = 57;
$songId = 4;
$grade = 9;

if (isset($userId) && isset($songId)) {

    insertSongGrade($userId, $songId, $grade);

}

function insertSongGrade($userId, $songId, $grade)
{

    global $conn;

    $sql = "INSERT INTO grades (korisnikId, songId, grade)
            VALUES ('$userId', '$songId', '$grade')";

    $result = $conn->query($sql);

    if ($result) {

        ej([
            'desc' => 'GRADE_INSERTED',
            'status' => true
        ]);

    }
    else {

        ej([
            'desc' => 'GRADE_NOT_INSERTED',
            'status' => false
        ]);

    }

}