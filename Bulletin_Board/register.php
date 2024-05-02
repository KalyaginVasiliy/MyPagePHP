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
$username = $_POST['username']; // Получение имени пользователя из POST-запроса
$email = $_POST['email']; // Получение email из POST-запроса
$phone = $_POST['phone']; // Получение номера телефона из POST-запроса
$password = $_POST['password']; // Получение пароля из POST-запроса

// Проверка уникальности данных
$check_email_query = "SELECT * FROM users WHERE email = ?";
$check_phone_query = "SELECT * FROM users WHERE phone = ?";

$errorMessages = [];

$stmt_email = $conn->prepare($check_email_query);
$stmt_email->bind_param("s", $email);
$stmt_email->execute();
$result_email = $stmt_email->get_result();

if ($result_email->num_rows > 0) {
    $errorMessages[] = "Email уже зарегистрирован";
}

$stmt_phone = $conn->prepare($check_phone_query);
$stmt_phone->bind_param("s", $phone);
$stmt_phone->execute();
$result_phone = $stmt_phone->get_result();

if ($result_phone->num_rows > 0) {
    $errorMessages[] = "Номер телефона уже зарегистрирован";
}

if (!empty($errorMessages)) {
    echo implode(". ", $errorMessages);
} else {
    // Иначе вставляем данные в таблицу
    $sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)"; // SQL-запрос для вставки данных
    $stmt = $conn->prepare($sql); // Подготовка SQL-запроса
    $stmt->bind_param("ssss", $username, $email, $phone, $password); // Привязка параметров к запросу

    // Выполнение запроса
    if ($stmt->execute()) {
        echo "success"; // Выводим ответ "success" после успешной регистрации
    } else {
        echo "Ошибка: " . $stmt->error; // Вывод ошибки в случае неудачной регистрации
    }
}

// Закрытие соединения
$stmt_email->close(); // Закрытие prepared statement для email
$stmt_phone->close(); // Закрытие prepared statement для телефона
$stmt->close(); // Закрытие prepared statement для вставки данных
$conn->close(); // Закрытие соединения с базой данных
?>