<?php

require '../helpers/_database.php';
//require '../helpers/_headers.php';
//require '../helpers/_functions.php';

?>

<?php

if (isset($_POST['songName']) && isset($_POST['songUrl'])) {

    $songName = $_POST['songName'];
    $songUrl = $_POST['songUrl'];

    $songModifiedUrl = str_replace('?dl=0', '?raw=1', $songUrl);

    $sql = "INSERT INTO songs (name, songUrl) VALUES ('$songName', '$songModifiedUrl')";

    $result = $conn->query($sql);

    if ($result) {

        echo $songName . 'Has been successfully inserted';

    } else {

        echo 'Song wasn\'t inserted, ERROR!';

    }

}

?>

<form method="post">

    <input type="text" name="songName" id="songName" placeholder="Song name">
    <br>
    <input type="text" name="songUrl" id="songUrl" placeholder="Song DB path">
    <br>

    <input type="submit" name="submit" value="submit">

</form>

