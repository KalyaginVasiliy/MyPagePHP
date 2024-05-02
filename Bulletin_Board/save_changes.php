<?php
// файл save_changes.php

// Параметры для соединения с базой данных
$servername = "localhost"; // Имя хоста (в данном случае локальный сервер)
$username = "root"; // Имя пользователя для доступа к базе данных
$password = "root"; // Пароль для доступа к базе данных
$dbname = "BulletinBoard"; // Имя базы данных

// Получение старого email пользователя из запроса
$oldEmail = $_POST['oldEmail'];

// Получение нового email пользователя из запроса (если он был изменен)
$newEmail = $_POST['newEmail'];

// Получение нового пароля пользователя из запроса (если он был изменен)
$newPassword = isset($_POST['newPassword']) ? $_POST['newPassword'] : null;

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка соединения: " . $conn->connect_error);
}

// Получение имени пользователя из запроса
$name = $_POST['name'];

// Получение номера телефона пользователя из запроса, если он был отправлен
$phone = isset($_POST['phone']) ? $_POST['phone'] : null;

// Получение описания пользователя из запроса, если оно было отправлено
$aboutUser = isset($_POST['aboutUser']) ? $_POST['aboutUser'] : null;

// Проверка, был ли передан файл на сервер
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    // Перемещение загруженного файла в папку "uploads"
    $uploadDir = 'uploads/';
    $uploadPath = $uploadDir . $fileName;
    if (!move_uploaded_file($fileTmpName, $uploadPath)) {
        die("Ошибка при перемещении файла на сервер");
    }
} else {
    // Если файл не был передан, устанавливаем значения по умолчанию
    $uploadPath = null;
}

// Поиск пользователя в базе данных по старому email
$sql = "SELECT pathForPhotos FROM users WHERE email = '$oldEmail'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentPathForPhotos = $row['pathForPhotos'];

    // Обновление данных пользователя в базе данных
    $updateSql = "UPDATE users SET name = '$name', email = '$newEmail'";
    if ($phone !== null) {
        $updateSql .= ", phone = '$phone'";
    }
    if ($aboutUser !== null) {
        $updateSql .= ", AboutUser = '$aboutUser'";
    }
    if ($uploadPath !== null) {
        $updateSql .= ", pathForPhotos = '$uploadPath'";
    }
    if ($newPassword !== null) {
        $updateSql .= ", password = '$newPassword'";
    }
    $updateSql .= " WHERE email = '$oldEmail'";

    if ($conn->query($updateSql) === TRUE) {
        echo "Данные на сервер успешно загружены";

        // Обновление email в сессии, если он был изменен
        if ($newEmail !== $oldEmail) {
            session_start();
            $_SESSION['email'] = $newEmail;
            session_write_close();
        }
    } else {
        echo "Ошибка при обновлении данных: " . $conn->error;
    }
} else {
    echo "Пользователь с таким email не найден";
}

// Закрытие соединения с базой данных
$conn->close();
?>