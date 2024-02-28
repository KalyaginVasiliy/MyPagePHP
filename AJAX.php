<?php
    require_once ("classes/Connect.php");
    require_once ("classes/ForCalculations.php");
    $connect = new Connect ();
    $forCalculations = new ForCalculations;
    $numberDownloadsFromDatabase = 7;
    if (!empty($_REQUEST["numberToEnterOne"]) && (!empty($_REQUEST["numberToEnterTwo"]))) {
        $numberOne = $_REQUEST["numberToEnterOne"];
        $numberTwo = $_REQUEST["numberToEnterTwo"];
        $calcOperation = $forCalculations->transform($_REQUEST["operationSelect"]);
        $calcResultDataBase = $forCalculations->calculate($numberOne, $numberTwo, $calcOperation);
        $connect->saveResultToDataBase($numberOne, $calcOperation, $numberTwo, $calcResultDataBase);
        $operationDataBase = $connect->loadResultsFromDataBase($numberDownloadsFromDatabase);
    }
    
    echo json_encode($operationDataBase);

    
?>