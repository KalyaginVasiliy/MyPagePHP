<?php
session_start();

// Получение старого пароля из запроса
$oldPassword = $_POST['oldPassword'];

// Проверка соответствия старого пароля текущему паролю пользователя в базе данных
$email = $_SESSION['email'];

// Параметры для соединения с базой данных
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "BulletinBoard";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка соединения: " . $conn->connect_error);
}

// Поиск пользователя в базе данных по email
$sql = "SELECT password FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentPassword = $row['password'];

    if ($oldPassword === $currentPassword) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'error';
}

// Закрытие соединения с базой данных
$conn->close();
?>