(function (app) { 
    app.PageLogin =  {
           draw : function(){
            let content = document.querySelector('.content'); /// Получаем элемент с классом content
                document.querySelector('.content').innerHTML = ''; // Очищаем элемент с классом content
                let text = document.createElement("div"); // Создаем элемент div для надписи
                    text.append(document.createTextNode("Вход")); // Устанавливаем текст
                    text.classList.add("formName"); // Устанавливаем класс
                let formDiv = document.createElement("div"); // Создаем элемент div для формы
                    formDiv.classList.add("formDiv"); // Устанавливаем класс
                        const emailField = drawInputField('email', 'text', 'E-mail:'); // Создаем поле ввода для emailField
                        const passwordField = drawInputField('password', 'password', 'Пароль:'); // Создаем поле ввода для passwordField
                        let enterButton = document.createElement("button"); // Создаем элемент кнопки
                            enterButton.classList.add("registerButton"); // Устанавливаем класс
                            enterButton.append(document.createTextNode("Войти")); // Устанавливаем текст
                            enterButton.addEventListener("click", goToEnter); // Устанавливаем обработчик события
                        let registerButton = document.createElement("button"); // Создаем элемент кнопки
                            registerButton.classList.add("registerButton"); // Устанавливаем класс
                            registerButton.append(document.createTextNode("Зарегистрироваться")); // Устанавливаем текст
                            registerButton.addEventListener("click", goToRegister); // Устанавливаем обработчик события
                    formDiv.append(emailField, passwordField, enterButton, registerButton);   // Добавляем элементы в форму

            content.append(text, formDiv);  
           }
       }
       function goToRegister(){
        document.querySelector('.content').innerHTML = '';
        app.PageRegister.draw();
       }
       function goToEnter(){
        document.querySelector('.content').innerHTML = '';
        alert('Вы успешно вошли в систему');
        app.PageLogin.draw();
       }
}) (AdsBoard);