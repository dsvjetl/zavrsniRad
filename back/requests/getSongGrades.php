<?php

require '../helpers/_database.php';
require '../helpers/_headers.php';
require '../helpers/_functions.php';

$userId = $_GET['userId'];
$songId = $_GET['songId'];

$data = [];

if (isset($userId) && isset($songId)) {
    findCurrentUserGrade($userId, $songId);
    getGrades($songId);

    ej($data);
}

function getGrades($songId)
{

    global $conn;
    global $data;

    $sql = "SELECT g.grade grade, AVG(g.grade) averageGrade, g.korisnikId userId FROM grades g
            WHERE g.songId = '$songId'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $data['desc'] = 'GRADES_FETCHED';
            $data['status'] = true;
            $data['averageGrade'] = number_format($row['averageGrade'], 2);

        }

    } else {

        $data['desc'] = 'GRADES_NOT_FETCHED';
        $data['status'] = false;

    }

}

function findCurrentUserGrade($userId, $songId)
{

    global $conn;
    global $data;

    $sql = "SELECT g.grade grade FROM grades g
            WHERE g.korisnikId = '$userId' AND g.songId = '$songId' LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {

            $data['currentUserGrade'] = $row['grade'];

        }
    }
    else {

        $data['currentUserGrade'] = false;

    }

}