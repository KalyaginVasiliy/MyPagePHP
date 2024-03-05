<?php
    // создаём новый класс
    class Connect {
        // объявляем локальную переменную, доступную только внутри данного класса
        private $connectionDataBase;
        // создаём функцию для соединения с БД, которая будет вызываться всякий раз, когда вызывается данный класс
        function __construct() {
            $this->connectionDataBase = mysqli_connect("localhost", "root", "root", "calcBase");
        }
        // создаём функцию для вставки алгебраической операции в базу данных:
        function saveResultToDataBase($numberOne, $calcOperation, $numberTwo, $calcResultDataBase) {
            mysqli_query($this->connectionDataBase, "INSERT INTO `Operations` (`number_one`, `operation`, `number_two`, `result`) VALUES ('" . $numberOne . "', '" . $calcOperation . "', '" . $numberTwo . "', '" . $calcResultDataBase . "')");
        }
        // создаём функцию для загрузки в массив нужного количества арифметических операций из базы данных:
        function loadResultsFromDataBase($numberOfOperations) {
            // объявляем пустой массив
            $DataBase = [];
            // делаем запрос в БД
            $queryDataBase = mysqli_query($this->connectionDataBase, "SELECT * FROM `Operations` ORDER BY `id` DESC");
            // обнуляем счётчик количества арифметических операций
            $i=0;  
            // цикл извлечения данных из БД в массив, прерывается как только достигли нужного количества записей:
            while ($row = mysqli_fetch_assoc($queryDataBase)) {
                $DataBase[]= $row["number_one"]  . " " . $row["operation"] . " " . $row["number_two"] . " = " . $row["result"];  
                $i++;
                if ($i==$numberOfOperations+1) {
                        break;
                }
            }
            return $DataBase;
        }
    }
?>