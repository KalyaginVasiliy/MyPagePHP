<?php
        $connectionDataBase = mysqli_connect("localhost", "root", "root", "calcBase");
        $calcResult = "";
        if (!empty($_REQUEST["numberToEnterOne"]) && (!empty($_REQUEST["numberToEnterTwo"]))) {
            $numberOne = $_REQUEST["numberToEnterOne"];
            $numberTwo = $_REQUEST["numberToEnterTwo"];
            if ($_REQUEST["operationSelect"]== "addition") { 
                $calcResult = (($numberOne) . (" + ") . ($numberTwo) . (" = ") . ($numberOne + $numberTwo));
                $calcResultDataBase = $numberOne + $numberTwo;
                $calcOperation ="+"; 
            }
            if ($_REQUEST["operationSelect"]== "subtraction") { 
                    $calcResult = (($numberOne) . (" - ") . ($numberTwo) . (" = ") . ($numberOne - $numberTwo));
                    $calcResultDataBase = $numberOne - $numberTwo;
                    $calcOperation ="-";
            }
            if ($_REQUEST["operationSelect"]== "multiplication") { 
                $calcResult = (($numberOne) . (" * ") . ($numberTwo) . (" = ") . ($numberOne * $numberTwo));
                $calcResultDataBase = $numberOne * $numberTwo;
                $calcOperation ="*";
            }
            if ($_REQUEST["operationSelect"]== "division") { 
                $calcResult =  (($numberOne) . (" / ") . ($numberTwo) . (" = ") . ($numberOne / $numberTwo));
                $calcResultDataBase = $numberOne / $numberTwo;
                $calcOperation ="/";
            }
            mysqli_query($connectionDataBase, "INSERT INTO `Operations` (`number_one`, `operation`, `number_two`, `result`) VALUES ('" . $numberOne . "', '" . $calcOperation . "', '" . $numberTwo . "', '" . $calcResultDataBase . "')");
        }
        $operationsDataBase = [];
        $queryDataBase = mysqli_query($connectionDataBase, "SELECT * FROM `Operations` ORDER BY `id` DESC");
        $i=0;
        // foreach($operationDataBase as $usersData) { 
        //             echo $usersData["number_one"]  . $usersData["operation"] . $usersData["number_two"] . "=" . $usersData["result"];
        //             $forBreack = $forBreack+1;
        //             if ($forBreack == 7) break;
        //         }

        while ($row = mysqli_fetch_assoc($queryDataBase)) {
            $operationDataBase[]= $row["number_one"]  . " " . $row["operation"] . " " . $row["number_two"] . " = " . $row["result"];  
            $i++;
            if ($i==8) {
                break;
            }

        }
        // $calcResultArray = [
        //     "operationDataBase" => [
        //         $operationDataBase
        //     ]
        // ];
            echo json_encode($operationDataBase);
     
    ?>