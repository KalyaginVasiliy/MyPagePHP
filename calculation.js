// Функция открытия окна результата вычислений
function openWindow() {
    let elementInputOne = document.querySelector(".numberOneData");
    let numberOne = Number(elementInputOne.value);
    let elementInputTwo = document.querySelector(".numberTwoData");
    let numberTwo = Number(elementInputTwo.value);
    let selectCalc = document.querySelector('#operationSelect').value;
    document.getElementById("resultCalcServer").innerHTML = "";
    // Создаём новый массив, куда потом запишем полученный на сервере массив с данными
    let responseArray =[];
    fetch("AJAX.php?numberToEnterOne="+numberOne+"&operationSelect="+selectCalc+"&numberToEnterTwo="+numberTwo) // посылаем запрос с нужными параметрами
        .then(response => response.json()) // преобразуем полученный ответ 
        .then(data => {
            // заполняем массив пришедшими данными с сервера
            for (let i = 0; i < data.length; i++) {
                responseArray.push(data[i])}
            // выводим данные из массива в нужном месте и с нужными комментариями
            for (let i = 0; i < responseArray.length; i++) {
                if (i==0) document.getElementById('resultCalcServer').innerHTML += "Результат вычислений: " + responseArray[i] + '<br>';
                if (i==1) document.getElementById('resultCalcServer').innerHTML += "Последние семь операций, находящихся в базе данных: " + '<br>' + responseArray[i] + '<br>';
                if (i>1) document.getElementById('resultCalcServer').innerHTML += responseArray[i] + '<br>';
                }
        })       
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