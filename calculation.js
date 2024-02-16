// Функция открытия окна результата вычислений
function openWindow() {
    let elementInputOne = document.querySelector(".numberOneData");
    let numberOne = Number(elementInputOne.value);
    let elementInputTwo = document.querySelector(".numberTwoData");
    let numberTwo = Number(elementInputTwo.value);
    let selectCalc = document.querySelector('#operationSelect').value;
    let resultCalc = 0;
    if (numberOne && numberTwo) {
        let elementResult = document.querySelector(".resultCalc")
        switch  (selectCalc) {
            case "addition" :
            result = numberOne+numberTwo;
            elementResult.innerHTML = numberOne + " + " + numberTwo + " = " + result;
            break;
            case "subtraction" :
            result = numberOne-numberTwo;
            elementResult.innerHTML = numberOne + " - " + numberTwo + " = " + result;
            break;
            case "multiplication" :
            result = numberOne*numberTwo;
            elementResult.innerHTML = numberOne + " * " + numberTwo + " = " + result;
            break;
            case "division" :
            result = numberOne/numberTwo;
            elementResult.innerHTML = numberOne + " / " + numberTwo + " = " + result;
            break;
            }
        let elementWindow = document.querySelector(".maskPage");
        elementWindow.classList.remove("hiddenWindow");
        }
}
 // Функция закрытия окна результата вычислений
 function showWindow() {
    let elementWindow = document.querySelector(".maskPage");
    elementWindow.classList.add("hiddenWindow");
}