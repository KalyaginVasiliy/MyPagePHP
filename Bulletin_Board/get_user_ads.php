<?php
// get_user_ads.php - файл для подключения к базе данных и получения данных объявлений авторизованного пользователя
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

$current_user_email = $_SESSION['email'] ?? null;
if (!$current_user_email) {
    echo json_encode([]);
    exit;
}

$sql = "SELECT ads.*, users.name, users.phone
        FROM ads
        INNER JOIN users ON ads.id_user = users.id
        WHERE users.email = ?
        ORDER BY ads.createDate DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $current_user_email);
$stmt->execute();
$result = $stmt->get_result();

$ads = [];
while ($row = $result->fetch_assoc()) {
    if (empty($row['pathImage']) || !file_exists($row['pathImage'])) {
        $row['pathImage'] = 'image/noProductPhoto.png';
    }
    $ads[] = $row;
}
$stmt->close();
$conn->close();

echo json_encode($ads);
?>