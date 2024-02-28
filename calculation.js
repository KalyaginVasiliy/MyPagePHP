// Функция открытия окна результата вычислений
function openWindow() {
    // Считываем значения чисел и операции между ними
    let elementInputOne = document.querySelector(".numberOneData");
    let numberOne = Number(elementInputOne.value);
    let elementInputTwo = document.querySelector(".numberTwoData");
    let numberTwo = Number(elementInputTwo.value);
    let selectCalc = document.querySelector('#operationSelect').value;
    // Проверяем правильность вводимых данных:
    if ((numberOne==0) && (numberTwo==0)) {
        document.getElementById("resultCalcServer").innerHTML = "";
        document.getElementById('resultCalcServer').innerHTML += "ОШИБКА! Числа не введены!";
    }
    else {
        if ((selectCalc=="division") && (numberTwo==0)) {
            document.getElementById("resultCalcServer").innerHTML = "";
            document.getElementById('resultCalcServer').innerHTML += "ОШИБКА! Деление на ноль!";
            }
            else {
            // Обнуляем все значения в элементе с id resultCalcServer
            document.getElementById("resultCalcServer").innerHTML = "";
            // Создаём новый массив, куда потом запишем полученный на сервере массив с данными
            let responseArray =[];
            // посылаем запрос с нужными параметрами
            fetch("AJAX.php?numberToEnterOne="+numberOne+"&operationSelect="+selectCalc+"&numberToEnterTwo="+numberTwo) 
                // преобразуем полученный ответ в массив, с которым можно в дальнейшем работать 
                .then(response => response.json()) 
                .then(data => {
                    // заполняем массив пришедшими данными с сервера
                    for (let i = 0; i < data.length; i++) {
                        responseArray.push(data[i])}
                    // выводим данные из массива в нужном месте и с нужными комментариями
                    for (let i = 0; i < responseArray.length; i++) {
                        if (i==0) document.getElementById('resultCalcServer').innerHTML += "Результат текущего вычисления: " + responseArray[i] +  '<br>' + '<br>';
                        if (i==1) {
                            document.getElementById('resultCalcServer').innerHTML += "Последние семь операций, находящихся в базе данных: " + '<br>' + '<br>';
                            document.getElementById('resultCalcServer').innerHTML += responseArray[i] + '<br>';
                        }
                        if (i>1) document.getElementById('resultCalcServer').innerHTML += responseArray[i] + '<br>';
                    }
                })
            }
            
        }   
    //Открываем модальное окно, в котором отображены результаты вычислений    
    let elementWindow = document.querySelector(".maskPage");
    elementWindow.classList.remove("hiddenWindow");
}        

 // Функция закрытия окна результата вычислений
 function showWindow() {
    let elementWindow = document.querySelector(".maskPage");
    elementWindow.classList.add("hiddenWindow");
    document.querySelector('.numberOneData').value="";
    document.querySelector('.numberTwoData').value="";
}