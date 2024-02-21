<?php
    $connectionDataBase = mysqli_connect("localhost", "root", "root", "test");
    if (!$connectionDataBase) {
        die ("Связь не установлена: " . mysqli_connect_error());
    }
    if (!empty($_REQUEST["imya"])) {
        $greetings = "Привет, " . $_REQUEST["imya"] . "!";
        mysqli_query($connectionDataBase, "INSERT INTO `users` (`name`) VALUES ('" . $_REQUEST["imya"] . "') ");
    }
    if (!empty($_REQUEST["knopka"]) && (empty($_REQUEST["imya"]))) {
        $error = "Пожалуйста, введите имя";
    }
    $usersDataBase = [];
    $queryDataBase = mysqli_query($connectionDataBase, "SELECT * FROM `users`");
    while ($row = mysqli_fetch_assoc($queryDataBase)) {
        $usersDataBase[]= $row;  
    }
    
?>
<html>
    <head>
        
    </head>
    <body>
        <form method="POST">
            <div>
                <input type = "text" name = "imya" value="<?php echo ($_REQUEST["imya"]) ?? "" ?>"/>
                <div>
                    <input type = "submit" name = "knopka" value="Сказать привет" />
                </div>
            </div>
        </form>
        <?php if (!empty($error)) { ?>
        <div>
            <span> Ошибка: </span> 
            <span> 
                <?php 
                    echo $error;
                ?> 
            </span>
        </div>
        <?php } ?>
        <?php if (!empty($greetings)) { ?>
        <div>
            <span>Результат: </span> 
            <span> 
                <?php 
                    echo $greetings;
                ?> 
            </span>
        </div>
        <?php } ?>
        <?php foreach($usersDataBase as $usersData) { ?>
            <div>
                <span> -> [<?php echo $usersData["id"]?>]</span> 
                <?php echo $usersData["name"]?>
                
            </div>
        <?php } ?>
    </body>
</html> 