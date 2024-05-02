<?php
// файл session.php Он записывает данные email в сессию, также осуществляет проверку состояния сессии и её закрытие
session_start();

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'open':
            $email = $_POST['email'];

            // Открываем сессию и записываем email в сессию
            $_SESSION['email'] = $email;
            echo 'Session opened';
            break;

        case 'close':
            // Закрываем сессию
            session_unset();
            session_destroy();
            echo 'Session closed';
            break;

        case 'check':
            // Проверяем существование открытой сессии
            echo checkSession() ? 'true' : 'false';
            break;

        default:
            echo 'Invalid action';
            break;
    }
} else {
    echo 'No action specified';
}

function checkSession() {
    if (isset($_SESSION['email'])) {
        return true;
    } else {
        return false;
    }
}