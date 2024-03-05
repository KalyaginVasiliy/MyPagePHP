<?php
    session_start();                   // открываем сессию
    echo "Последняя операция на калькуляторе такая: " . $_SESSION['Operation'];
    
?>