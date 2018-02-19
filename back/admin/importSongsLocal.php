<?php

require '../helpers/_database.php';
//require '../helpers/_headers.php';
require '../helpers/_functions.php';
require '../helpers/_mp3File.php';

?>

<?php

$dbPath = 'http://localhost/zavrsni/songs/';

if (isset($_POST['submit'])) {

    $files = getMultiple_FILES($_FILES['images'])['images'];
    $genre = $_POST['genre'];

    pre($files);

    foreach ($files as $file) {

        $mp3file = new MP3File($file['tmp_name']);
        $duration2 = $mp3file->getDuration();
        $songDuration = substr(MP3File::formatTime($duration2), 3);

        move_uploaded_file($file['tmp_name'], "../songs/" . $file['name']);
        saveSongToDatabase($file['name'], $dbPath . $file['name'], $file['size'], $genre, $songDuration);

    }

}

function uploadFiles($files)
{

    foreach ($files as $file) {

        move_uploaded_file($file['tmp_name'], "uploads/" . $file['name']);

    }

}

function saveSongToDatabase($name, $songUrl, $size, $genre, $songDuration)
{

    global $conn;

    $sql = "INSERT INTO songs (name, songUrl, songSize, genre, duration) 
            VALUES ('$name', '$songUrl', '$size', '$genre', '$songDuration')";

    $result = $conn->query($sql);

    if ($result) {

        echo '<h5>Song <b>' . $name . '</b> has been successfully inserted into database!<br>';

    } else {

        echo '<b>ERROR</b> - song <b>' . $name . '</b> isn\'t inserted to database!<br>';

    }

}

function getMultiple_FILES()
{
    $_FILE = array();
    foreach ($_FILES as $name => $file) {
        foreach ($file as $property => $keys) {
            foreach ($keys as $key => $value) {
                $_FILE[$name][$key][$property] = $value;
            }
        }
    }
    return $_FILE;
}

?>

<form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="images[]" multiple/>
    <input type="text" name="genre" placeholder="Enter genre">
    <input type="submit" name="submit"/>
</form>

