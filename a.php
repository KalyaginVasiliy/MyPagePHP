<?php 
    if (!empty($_REQUEST["name"])) {
        echo "Привет, " . $_REQUEST["name"] . "!";

        $doorman = new Doorman ();

        $doorman->saveUser($_REQUEST['name']);

        $users = $doorman->loadUser();

        echo "<pre>";
        print_r($users);
        echo "</pre>";
    }
    class Doorman {
        private $connection;

        function __construct(){
            $this->connection = mysqli_connect("localhost", "root", "root", "test");
        }
        function saveUser($name) {
            mysqli_query($this->connection, "INSERT INTO `users` (`name`) VALUES ('" .$name . "') ");
        } 
        function loadUser(){
            $query = mysqli_query($this->connection, "SELECT * FROM `users` ORDER BY id DESC");
            $users = [];
            while ($row = mysqli_fetch_assoc($query)) {
                $users[]= $row;  
            }
            return $users;
        }
    }
    
?>