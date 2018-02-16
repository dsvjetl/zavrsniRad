<?php
/**
 * Created by PhpStorm.
 * User: domagojsvjetlicic
 * Date: 06/01/2018
 * Time: 15:50
 */

require '../helpers/_headers.php';
require '../helpers/_database.php';
require '../helpers/_functions.php';

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$password = $_POST['password'];
$googleId = $_POST['googleId'];

// Main
if (isset($firstName) && isset($lastName) && isset($password) && isset($googleId)) {

    if (inputValidation($firstName, $lastName, $password, $googleId) && checkDatabase($username, $googleId)) {

        if (insertIntoDatabase($username, $password)) {
            getUserFromDatabase($username, $password);
        }

    }

}

//

function inputValidation($firstName, $lastName, $password, $googleId)
{

    if (strlen($firstName) < 4 || strlen($lastName) < 4 || strlen($password) < 8 && strlen($googleId) <= 0) {
        return false;
    } else {
        return true;
    }

}

function checkDatabase($username, $googleId)
{

    global $conn;

    $sql = "SELECT username FROM korisnici
            WHERE username='$username'
            AND googleId='$googleId' 
            LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        ej([
            'status' => false,
            'desc' => 'USER_ALREADY_EXISTS'
        ]);

        return false;
    }
    else {
        return true;
    }

}

function insertIntoDatabase($username, $password)
{

    global $conn;

    $sql = "INSERT INTO korisnici (username, password)
            VALUES ('$username', '$password')";

    if ($conn->query($sql)) {

        return true;

    } else {

        return false;

    }

}

function getUserFromDatabase($username, $password)
{

    global $conn;

    $sql = "SELECT id, username, password FROM korisnici
            WHERE username='$username' LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            ej([
                'desc' => 'USER_SIGNED_UP',
                'status' => true,
                'currentUser' => [
                    'username' => $username,
                    'password' => $password,
                    'id' => $row['id']
                ]
            ]);

        }

    }

}

$conn->close();
