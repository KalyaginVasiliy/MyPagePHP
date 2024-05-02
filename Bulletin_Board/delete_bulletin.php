<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BulletinBoard";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bulletinId = $_POST['bulletinId'];

    $sql = "DELETE FROM ads WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bulletinId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Объявление успешно удалено";
    } else {
        echo "Не удалось удалить объявление";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Неверный метод запроса";
}
?>