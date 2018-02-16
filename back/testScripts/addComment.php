<?php

require '../helpers/_database.php';
require '../helpers/_headers.php';
require '../helpers/_functions.php';

$comment = $_POST['comment'];
$userId = $_POST['userId'];
$songId = $_POST['songId'];

if (isset($comment) && isset($userId) && isset($songId)) {

    insertNewComment($comment, $userId, $songId);

}

function insertNewComment($comment, $userId, $songId) {

    global $conn;

    $sql = "INSERT INTO komentari (komentar, korisnikId, songId)
            VALUES ('$comment', '$userId', '$songId')";

    $result = $conn->query($sql);

    if ($result) {

        ej([
            'desc' => 'COMMENT_INSERTED',
            'status' => true
        ]);

    }
    else {

        ej([
            'desc' => 'COMMENT_NOT_INSERTED',
            'status' => false
        ]);

    }
}