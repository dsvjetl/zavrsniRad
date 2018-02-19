<?php
/**
 * Created by PhpStorm.
 * User: domagojsvjetlicic
 * Date: 20/01/2018
 * Time: 15:02
 */

require '../helpers/_headers.php';
require '../helpers/_database.php';
require '../helpers/_functions.php';

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$googleId = $_POST['googleId'];

$userId = null;

// Main
if (isset($firstName) && isset($lastName) && isset($googleId)) {

    if (inputValidation($firstName, $lastName, $googleId)) {

        if (userExists($googleId) === false) {

            insertNewUser($firstName, $lastName, $googleId);

        }


    } else {

        ej([
            'status' => false,
            'desc' => 'VALIDATION_NOT_VALID'
        ]);

    }

} else {

    ej([
        'status' => false,
        'desc' => 'PARAMS_NOT_RECEIVED'
    ]);

}

//

function userExists($googleId)
{

    global $conn;
    global $userId;

    $sql = "SELECT firstName, lastName, googleId, id
            FROM korisnici
            WHERE googleId='$googleId' LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            ej([
                'desc' => 'USER_ALREADY_EXISTS',
                'status' => true,
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'googleId' => $row['googleId'],
                'id' => $row['id']
            ]);

            $userId = $row['id'];

        }

        return true;

    } else {

        return false;

    }

}

function inputValidation($firstName, $lastName, $googleId)
{

    return strlen($firstName) > 0 && strlen($lastName) > 0 && strlen($googleId) > 0;

}

function insertNewUser($firstName, $lastName, $googleId)
{

    global $conn;

    $sql = "INSERT INTO korisnici (firstName, lastName, googleId)
            VALUES ('$firstName', '$lastName', '$googleId')";

    $result = $conn->query($sql);

    if ($result) {

        getUserIdAndRespond($googleId);

    } else {

        ej([
            'desc' => 'USER_NOT_INSERTED',
            'status' => false,
        ]);

    }

}

function getUserIdAndRespond($googleId)
{

    global $conn;

    $sql = "SELECT id, googleId, firstName, lastName
            FROM korisnici
            WHERE googleId = '$googleId' LIMIT 1";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {

            ej([
                'desc' => 'NEW_USER_INSERTED',
                'status' => true,
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'googleId' => $row['googleId'],
                'id' => $row['id']
            ]);        

        }
    } else {

        ej([
            'desc' => 'USER_NOT_INSERTED',
            'status' => false
        ]);

    }
}

$conn->close();
