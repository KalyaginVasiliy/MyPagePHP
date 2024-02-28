<?php
    class ForCalculations {
        public function transform($operation){
            switch ($operation) {
                case "addition":
                    return "+";
                case "subtraction":
                    return "-";
                case "multiplication":
                    return "*";
                case "division":
                    return "/";
            }
        }
        public function calculate($numberOne, $numberTwo, $operation) {
            switch ($operation) {
                case "+":
                    return $numberOne + $numberTwo;
                case "-":
                    return $numberOne - $numberTwo;
                case " * ":
                    return $numberOne  *  $numberTwo;
                case "/":
                    return $numberOne / $numberTwo;
            }
        }
    }
?>