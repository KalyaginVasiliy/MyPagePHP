<?php
    session_start();                   // открываем сессию
    echo "Последняя операция на калькуляторе: " . implode($_SESSION['Operation']);
    
?>