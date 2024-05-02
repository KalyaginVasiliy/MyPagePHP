<?php
// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BulletinBoard";

$conn = new mysqli($servername, $username, $password, $dbname);
$current_user_email = isset($_SESSION['email']) ? $_SESSION['email'] : null;

if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}

// Получение объявлений из базы данных
$sql = "SELECT ads.*, users.name, users.phone 
        FROM ads 
        INNER JOIN users ON ads.id_user = users.id
        ORDER BY ads.createDate DESC";

$result = $conn->query($sql);

$ads = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Проверка наличия фото у товара
        if (empty($row['pathImage']) || !file_exists($row['pathImage'])) {
            $row['pathImage'] = 'image/noProductPhoto.png';
        }
        $ads[] = $row;
    }
}

$conn->close();

// Отправка данных в формате JSON
header('Content-Type: application/json');
echo json_encode($ads);
?>