<?php
    session_start();                   // открываем сессию
    echo "Последняя операция на калькуляторе такая: " . implode($_SESSION['Operation']);
    
?>