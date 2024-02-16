<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Правим кодировку для правильного отображения русского шрифта для заглавия страницы -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <!-- подключаем шрифт Roboto  -->
    <link rel="preconnect" href="https://fonts.googleapis.com"> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <!-- подключаем стили -->
    <link rel="stylesheet" href="styles.css", type="text/css", rel="stylesheet">
    <title>Моя страница 1</title>
    <script src="calculation.js"></script>
</head>

<body>
    <div class="mainBox">
        <!-- Размещаем верхнее меню -->
        <div class="boxMainMenu">
            <div style="display: flex;">
                <div class="textMyName">Василий Калягин</div>
                <div class="textMainMenuAboutMe"> <a href="#aboutMe", style="color:#ffffff">Обо мне</a></div>
                <div class="textMainMenu"><a href="#myActivity", style="color: #ffffff;">Моя деятельность</a></div>
                <div class="textMainMenu"><a href="#calc", style="color: #ffffff;">Калькулятор</a></div>
                <div class="textMainMenu"><a href="#difficulties", style="color: #ffffff;">Сложности</a></div>
                <div class="textMainMenu"><a href="#mood", style="color: #ffffff;">Настроение</a></div>
                <div class="textMainMenu"><a href="#contacts", style="color: #ffffff;">Контакты</a></div>             
            </div>
        </div>
        <!-- Делаем блок "Обо мне" -->
        <div style="display: flex;">
            <div id="aboutMe">
                <div class="textMyNameIs"> Меня зовут Василий </div>
                <div class="textAboutMe">Мне 42 года, недавно начал изучать программирование</div>
                <div class="textAboutMe">Занимался фотографией 14 лет, имел свою фотостудию в п. Санчурск Кировской области</div>
                <div class="textAboutMe">Сейчас фотография перешла в разряд хобби, а я решил кардинально поменять свою жизнь </div>
                <div class="textAboutMe">А ещё я люблю рыбалку, петь и играть на гитаре))) </div>
            </div>
            <div class="myImage"><img src="MyPhoto.jpg"></div>
        </div>
        <!-- Размещаем блок "Моя деятельность" -->
        <div id="myActivity", style="padding-top: 102px; margin-top: -102px"></div>
        <div class="myActivityBox"> 
            <div class="textBlockHeader"> 
                Моя деятельность
            </div>
            <div style="display: flex;">
                <div class="miniBoxTop", style="margin-left: 165px;">
                    <div class="textMiniBoxTitle">1</div>
                    <div class="textMiniBox">Учусь на разработчика программного обеспечения</div>
                </div>
                <div class="miniBoxBottom">
                    <div class="textMiniBoxTitle">2</div>
                    <div class="textMiniBox">Женат на лучшей в мире женщине вот уже более 10 лет</div>
                </div>
                <div class="miniBoxTop">
                    <div class="textMiniBoxTitle">3</div>
                    <div class="textMiniBox">Воспитываем дочь и сына, радуемся их успехам</div>
                </div>
                <div class="miniBoxBottom">
                    <div class="textMiniBoxTitle">4</div>
                    <div class="textMiniBox">У меня есть друзья, которые очень помогают в жизни</div>
                </div>
                <div class="miniBoxTop">
                    <div class="textMiniBoxTitle">5</div>
                    <div class="textMiniBox">В нашей большой семье ни одно застолье не обходится без песен</div>
                </div>
            </div>
        </div>
        <!-- Размещаем блок с калькулятором -->
        <div id="calc" style="padding-top: 102px; margin-top: -102px"></div>
        <div class="textBlockHeader">Калькулятор</div>
        <div class="textCalc">Введите первое число:</div>
        <input class="inputCalc numberOneData", type="number">
        <div class="textCalc">Выберите операцию:</div>
        <select class="inputCalc calcOperation" id="operationSelect">
            <option value="addition">Сложение +</option>
            <option value="subtraction">Вычитание -</option>
            <option value="multiplication">Умножение *</option>
            <option value="division">Деление /</option>
        </select>
        <div class="textCalc">Введите второе число:</div>
        <input class="inputCalc numberTwoData", type="number">
        <button class="buttonCalc"> 
            <div class="buttonCalcText", onclick="openWindow()">
               Вычислить
            </div>   
        </button>
        <!-- Модальное окно вывода результата действий калькулятора -->
        <div class="maskPage hiddenWindow">
            <div class="modalWindow">
                <h2> Результат </h2>
                <hr />
                <div class="resultCalc">
                    Основная часть
                </div>
                <hr />
                <div class="resultClose">
                    <button onclick="showWindow()">
                        Закрыть
                    </button>
                </div>
                
            </div>
        </div>
        <!-- Размещаем блок "сложности" -->
       <div id="difficulties" style="padding-top: 102px; margin-top: -102px"></div>
        <div class="myActivityBox"> 
            <div class="textBlockHeader">Сложности</div>
            <div style="display: flex;">
                <div class="miniBoxTop", style="margin-left: 165px;">
                    <div class="textMiniBoxQuestions">?</div>
                    <div class="textMiniBox">Очень долго разбирался с различными отступами </div>
                </div>
                <div class="miniBoxBottom">
                    <div class="textMiniBoxQuestions">?</div>
                    <div class="textMiniBox">Не мог понять, как масштабировать картинку под нужный размер</div>
                </div>
                <div class="miniBoxTop">
                    <div class="textMiniBoxQuestions">?</div>
                    <div class="textMiniBox">Не сразу получилось сделать переход по ссылкам</div>
                </div>
                <div class="miniBoxBottom">
                    <div class="textMiniBoxQuestions">?</div>
                    <div class="textMiniBox">Много времени ушло на формирование различных блочных структур</div>
                </div>
                <div class="miniBoxTop">
                    <div class="textMiniBoxQuestions">?</div>
                    <div class="textMiniBox">Не мог понять, как правильно подключить нужный шрифт</div>
                </div>
            </div>
        </div>
        <!-- Добавляем блок "Настроение" -->
        <div id="mood" style="padding-top: 102px; margin-top: -102px"></div>
        <div class="textBlockHeader">Настроение</div>
        <div class="smileImage"><img src="Smile.jpg"></div>
        <div id="contacts" style="padding-top: 102px; margin-top: -102px"></div>
        <!-- Внизу страницы помещаем блок "контакты" -->
        <div class="boxMainMenu", style="position: relative;">
            <div style="display: flex;">
                <div class="textMyName">Василий Калягин</div>
                <div style="margin-left: 600px; margin-top: 34px;">
                    <a href="https://vk.com/kalyaginvasiliy">
                        <img src="Vector.png"></a></div>
            </div>
        </div>
    </div>
    
</body>
</html>