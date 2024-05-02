<?php
// getUserData.php

// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BulletinBoard";

$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка соединения: " . $conn->connect_error);
}

// Получение данных о текущем пользователе из сессии
session_start();
$email = $_SESSION['email'];

// Подготовка SQL-запроса
$sql = "SELECT name, email, phone, password, pathForPhotos, AboutUser, registrDate FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);

// Выполнение запроса
$stmt->execute();
$result = $stmt->get_result();

// Если найден пользователь, возвращаем его данные в формате JSON
if ($result->num_rows > 0) {
    $userData = $result->fetch_assoc();
    echo json_encode($userData);
} else {
    echo json_encode(array('error' => 'Пользователь не найден'));
}

// Закрытие соединения
$stmt->close();
$conn->close();
?>