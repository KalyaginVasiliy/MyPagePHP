<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BulletinBoard";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productName = $_POST['productName'];
    $price = $_POST['price'];
    $description = $_POST['description'];

    $userEmail = $_SESSION['email'];

    // Получаем id пользователя на основе email из сессии
    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $userId = $row['id'];

    $sql = "INSERT INTO ads (id_user, Product_name, price, description, createDate) VALUES (?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isss", $userId, $productName, $price, $description);
    $stmt->execute();

    $bulletinId = $stmt->insert_id;

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

    echo "Новое объявление успешно добавлено";
} else {
    echo "Неверный метод запроса";
}
?>