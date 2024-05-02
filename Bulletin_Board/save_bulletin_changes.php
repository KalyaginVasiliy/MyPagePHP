<?php
session_start();

// Параметры подключения к базе данных
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BulletinBoard";

// Создаем подключение к базе данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bulletinId = $_POST['bulletinId'];
    $productName = $_POST['productName'];
    $price = $_POST['price'];
    $description = $_POST['description'];

    $sql = "UPDATE ads SET Product_name = ?, price = ?, description = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sisi", $productName, $price, $description, $bulletinId);
    $stmt->execute();

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $targetDir = 'uploads/';
        $targetFile = $targetDir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            $sql = "UPDATE ads SET pathImage = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $targetFile, $bulletinId);
            $stmt->execute();
        }
    }

    $stmt->close();
    $conn->close();

    echo "Изменения успешно сохранены";
} else {
    echo "Неверный метод запроса";
}
?>