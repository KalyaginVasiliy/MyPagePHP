<?php
$servername = "localhost"; // Имя хоста (в данном случае локальный сервер)
$username = "root"; // Имя пользователя для доступа к базе данных
$password = "root"; // Пароль для доступа к базе данных
$dbname = "BulletinBoard"; // Имя базы данных

$conn = new mysqli($servername, $username, $password, $dbname); // Создаем новое соединение с базой данных
if ($conn->connect_error) { // Если при соединении произошла ошибка
    die("Connection failed: " . $conn->connect_error); // Выводим сообщение об ошибке и завершаем выполнение скрипта
}

$email = $_POST['email']; // Получаем email из POST-данных

$sql = "SELECT * FROM users WHERE email = '$email'"; // Формируем SQL-запрос для поиска пользователя по email
$result = $conn->query($sql); // Выполняем SQL-запрос

if ($result->num_rows > 0) { // Если найден пользователь с указанным email
    echo "User found"; // Выводим "Пользователь найден"
} else {
    echo "User not found"; // Иначе выводим "Пользователь не найден"
}

$conn->close(); // Закрываем соединение с базой данных
?>