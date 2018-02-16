<?php

require '../helpers/_database.php';
require '../helpers/_headers.php';
require '../helpers/_functions.php';

$response = [];
$data = [];

$sql = "SELECT s.id as songId, s.name as songName, s.songUrl as songUrl,
        s.genre as genre, s.songUrl as url, s.songSize as songSize, s.duration as duration FROM songs as s";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        array_push($data, [
            'id' => $row['songId'],
            'name' => $row['songName'],
            'url' => $row['songUrl'],
            'genre' => $row['genre'],
            'size' => $row['songSize'],
            'duration' => $row['duration']
        ]);

    }

    $response = [
        'desc' => 'SONGS_SUCCESSFULLY_LOADED',
        'status' => true,
        'songs' => $data
    ];

} else {

    $response = [
        'desc' => 'NO_SONGS_FOUND',
        'status' => false
    ];

}

ej($response);