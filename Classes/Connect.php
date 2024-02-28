<?php
    class Connect {
        private $connectionDataBase;
        function __construct() {
            $this->connectionDataBase = mysqli_connect("localhost", "root", "root", "calcBase");
        }
        function saveResultToDataBase($numberOne, $calcOperation, $numberTwo, $calcResultDataBase) {
            mysqli_query($this->connectionDataBase, "INSERT INTO `Operations` (`number_one`, `operation`, `number_two`, `result`) VALUES ('" . $numberOne . "', '" . $calcOperation . "', '" . $numberTwo . "', '" . $calcResultDataBase . "')");
        }
        function loadResultsFromDataBase($numberOfOperations) {
            $DataBase = [];
            $queryDataBase = mysqli_query($this->connectionDataBase, "SELECT * FROM `Operations` ORDER BY `id` DESC");
            $i=0;  
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