<?php
// Подключение к базе данных
$servername = "localhost"; // Имя хоста (в данном случае локальный сервер)
$username = "root"; // Имя пользователя для доступа к базе данных
$password = "root"; // Пароль для доступа к базе данных
$dbname = "BulletinBoard"; // Имя базы данных

// Создание объекта соединения с базой данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка соединения: " . $conn->connect_error); // Вывод ошибки в случае неудачного соединения
}

// Получение данных из формы
$email = $_POST['email']; // Получение email из POST-запроса
$password = $_POST['password']; // Получение пароля из POST-запроса

// Подготовка SQL-запроса
$sql = "SELECT * FROM users WHERE email = ? AND password = ?"; // Запрос на выборку пользователя по email и паролю
$stmt = $conn->prepare($sql); // Подготовка SQL-запроса
$stmt->bind_param("ss", $email, $password); // Привязка параметров к запросу

// Выполнение запроса
$stmt->execute(); // Выполнение запроса
$result = $stmt->get_result(); // Получение результата запроса

// Проверка наличия совпадений
if ($result->num_rows > 0) {
    echo "Авторизация успешна"; // Вывод сообщения об успешной авторизации
} else {
    echo "Неверное имя пользователя и/или пароль"; // Вывод сообщения об ошибке авторизации
}

// Закрытие соединения
$stmt->close(); // Закрытие prepared statement
$conn->close(); // Закрытие соединения с базой данных
?>