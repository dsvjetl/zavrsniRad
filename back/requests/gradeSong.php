<?php

require '../helpers/_database.php';
require '../helpers/_headers.php';
require '../helpers/_functions.php';

$userId = $_POST['userId'];
$songId = $_POST['songId'];
$grade = $_POST['grade'];

// Main
if (isset($userId) && isset($songId) && isset($grade)) {


    if (userAlreadyGraded($userId) === false) {
        setNewGrade($userId, $songId, $grade);
    } else {

        // TODO: update score or disable scoring
        ej([
            'desc' => 'USER_ALREADY_GRADED',
            'status' => false
        ]);

    }

} else {

    ej([
        'desc' => 'PARAMETERS_NOT_RECEIVED',
        'status' => true
    ]);

}


// Functions
function userAlreadyGraded($userId)
{

    global $conn;

    $sql = "SELECT korisnikId FROM grades
            WHERE korisnikId = '$userId'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        return true;
    } else {
        return false;
    }

}

function setNewGrade($userId, $songId, $grade)
{

    global $conn;

    $sql = "INSERT INTO grades (korisnikId, songId, grade) 
            VALUES ('$userId', '$songId', '$grade')";


    $result = $conn->query($sql);

    if ($result) {

        ej([
            'desc' => 'NEW_GRADE_ADDED',
            'status' => true
        ]);

    } else {

        ej([
            'desc' => 'NEW_GRADE_NOT_ADDED',
            'status' => false
        ]);

    }

}

function updateGradeForCurrentUser($userId) {

    global $conn;

    $sql = "SELECT grade FROM grades
            WHERE korisnikId = '$userId' LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($result->fetch_assoc()) {

        }
    }

}
