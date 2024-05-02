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

// Получаем email пользователя из сессии
$userEmail = $_SESSION['email'];

// Удаляем пользователя из базы данных
$sql = "DELETE FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userEmail);
$stmt->execute();

// Закрываем соединение с базой данных
$stmt->close();
$conn->close();

// Закрываем сессию
session_destroy();

// Отправляем ответ об успешном удалении пользователя
echo json_encode(['success' => true]);
?>