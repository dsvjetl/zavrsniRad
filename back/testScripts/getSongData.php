<?php

require '../helpers/_database.php';
require '../helpers/_headers.php';
require '../helpers/_functions.php';

$songId = $_GET['songId'];

if (isset($songId)) {
    getSongData($songId);
}

function getSongData($songId)
{

    global $conn;

    $response = [];

    $sql = "SELECT k.komentar as komentar, k.id as komentarId, s.id as songId, ko.username FROM komentari as k
        INNER JOIN korisnici as ko ON k.korisnikId=ko.id
        INNER JOIN songs as s ON k.songId=s.id
        WHERE s.id='$songId'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($response, [
                'komentar' => $row['komentar'],
                'id' => $row['komentarId'],
                'songId' => $row['songId'],
                'user' => $row['username']
            ]);
        }
    } else {
        echo 'no results';
    }

    ej($response);

}


// SQL syntax for examples

//SELECT
//  s.name       AS songName,
//  s.id         AS songId,
//  k.username   AS userName,
//  kom.id       AS komentarId,
//  kom.komentar AS komentar
//FROM songs AS s
//  INNER JOIN komentari AS kom ON s.id = kom.songId
//  INNER JOIN korisnici k ON kom.korisnikId = k.id
//  WHERE k.id = 57;

//SELECT
//  s.name       AS songName,
//  s.id         AS songId,
//  k.username   AS userName,
//  kom.id       AS komentarId,
//  kom.komentar AS komentar,
//  g.grade      AS grade
//FROM songs AS s
//  INNER JOIN komentari AS kom ON s.id = kom.songId
//  INNER JOIN korisnici k ON kom.korisnikId = k.id
//  INNER JOIN grades g ON k.id = g.korisnikId
//WHERE k.id = 57;