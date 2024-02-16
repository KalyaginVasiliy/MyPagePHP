<?php
    // if (!empty($_REQUEST["imya"])) {
    //     $greetings = "Привет, " . $_REQUEST["imya"] . "!";
    // }
    // if (!empty($_REQUEST["knopka"]) && (empty($_REQUEST["imya"]))) {
    //     $error = "Пожалуйста, введите имя";
    // }
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
    </body>
</html> 