<?php
    session_start();                                                                                        // открываем сессию
    require_once ("classes/Connect.php");                                                                   // подгружаем класс Connect
    require_once ("classes/ForCalculations.php");                                                           // подгружаем класс ForCalculations
    $connect = new Connect ();                                                                              // делаем ассоциацию переменной сonnect с классом Connect
    $forCalculations = new ForCalculations;                                                                 // делаем ассоциацию переменной forCalculations с классом ForCalculations
    $numberDownloadsFromDatabase = 7;                                                                       // определяем количество записей из базы данных, которые будем отображать в конечном результате
    if (!empty($_REQUEST["numberToEnterOne"]) && (!empty($_REQUEST["numberToEnterTwo"]))) {                 // проверяем на непустые значения в полях чисел
        $numberOne = $_REQUEST["numberToEnterOne"];                                                         // считываем значение первого числа
        $numberTwo = $_REQUEST["numberToEnterTwo"];                                                         // считываем значение второго числа
        $calcOperation = $forCalculations->transform($_REQUEST["operationSelect"]);                         // считываем значение операции в выпадающем списке и сразу присваиваем переменной calcOperation 
                                                                                                            // значение в виде алгебраических действий
        $calcResultDataBase = $forCalculations->calculate($numberOne, $numberTwo, $calcOperation);          // производим необходимые вычисления с помощью функции calculate
        $connect->saveResultToDataBase($numberOne, $calcOperation, $numberTwo, $calcResultDataBase);        // соединяемся с базой данных и записываем туда значения текущей арифметической операции    
        $_SESSION['Operation'] = [$numberOne . " " . $calcOperation . " " . $numberTwo . " " . " = " . $calcResultDataBase];       // запоминаем текущий результат в сессию 
        $operationDataBase = $connect->loadResultsFromDataBase($numberDownloadsFromDatabase);               // загружаем из базы данных необходимое количество записей для отображения, преобразуем запись 
                                                                                                            // в удобную для чтения строки и складываем их в переменную operationDataBase
    }
    echo json_encode($operationDataBase);                                                                   // выводим результат в виде массива строк 
?>