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

    $data = [];

    $sql = "SELECT k.komentar komentar, k.id komentarId, ko.firstName firstName, ko.lastName lastName FROM komentari k
        INNER JOIN korisnici ko ON k.korisnikId=ko.id
        WHERE k.songId='$songId'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            array_push($data, [
                'komentar' => $row['komentar'],
                'id' => $row['komentarId'],
                'userFirstName' => $row['firstName'],
                'userLastName' => $row['lastName']
            ]);

        }

        $response = [
            'desc' => 'SONG_SUCCESSFULLY_LOADED',
            'status' => true,
            'data' => $data
        ];

    } else {

        $response = [
            'desc' => 'NO_SONGS_FOUND',
            'status' => false
        ];

    }

    ej($response);

}