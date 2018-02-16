<?php

require '../helpers/_database.php';
require '../helpers/_headers.php';
require '../helpers/_functions.php';

$userId = $_POST['userId'];
$songId = $_POST['songId'];
$comment = $_POST['comment'];

if (isset($userId) && isset($songId) && isset($comment)) {
    addComment($userId, $songId, $comment);
}

function addComment($userId, $songId, $comment)
{

    global $conn;

    $sql = "INSERT INTO komentari (komentar, korisnikId, songId) 
            VALUES ('$comment', '$userId', '$songId')";

    $result = $conn->query($sql);

    if ($result) {

        ej([
           'desc' => 'NEW_COMMENT_ADDED',
           'status' => true
        ]);

    }
    else {

        ej([
            'desc' => 'COMMENT_NOT_ADDED',
            'status' => false
        ]);

    }


}