(function (app) { 
    app.PageRegister =  {
           draw : function(){
            let content = document.querySelector('.content'); /// Получаем элемент с классом content
                document.querySelector('.content').innerHTML = ''; // Очищаем элемент с классом content
                let text = document.createElement("div"); // Создаем элемент div для надписи
                    text.append(document.createTextNode("Регистрация")); // Устанавливаем текст
                    text.classList.add("formName"); // Устанавливаем класс
                let formDiv = document.createElement("div"); // Создаем элемент div для формы
                    formDiv.classList.add("formDiv"); // Устанавливаем класс
                        const usernameField = drawInputField('username', 'text', 'Имя пользователя:'); // Создаем поле ввода для usernameField
                        const emailField = drawInputField('email', 'text', 'E-mail:'); // Создаем поле ввода для emailField
                        const phoneField = drawInputField('phone', 'text', 'E-mail:'); // Создаем поле ввода для phoneField
                        const passwordField = drawInputField('password', 'password', 'Пароль:'); // Создаем поле ввода для passwordField
                        const confirmPasswordField = drawInputField('confirmPassword', 'password', 'Повторите пароль:');
                        let registerButton = document.createElement("button"); // Создаем элемент кнопки
                            registerButton.classList.add("registerButton"); // Устанавливаем класс
                            registerButton.append(document.createTextNode("Зарегистрироваться")); // Устанавливаем текст
                            registerButton.addEventListener("click", goToGoodRegister); // Устанавливаем обработчик события
                        let backButton = document.createElement("button"); // Создаем элемент кнопки
                            backButton.classList.add("registerButton"); // Устанавливаем класс
                            backButton.append(document.createTextNode("Войти")); // Устанавливаем текст
                            backButton.addEventListener("click", goToEnter); // Устанавливаем обработчик события
                    formDiv.append(usernameField, emailField, phoneField, passwordField, confirmPasswordField, registerButton, backButton);   // Добавляем элементы в форму

            content.append(text, formDiv);  // Добавляем элементы в элемент с классом content
           }
       }
       function goToGoodRegister(){ // Обработчик события при нажатии кнопки "Зарегистрироваться"
        document.querySelector('.content').innerHTML = ''; /// Очищаем элемент с классом content
        alert('Регистрация прошла успешно');/// Отображаем сообщение
        app.PageLogin.draw();// заново рисуем страницу для входа
       }
       function goToEnter(){// Обработчик события при нажатии кнопки "Войти"
        document.querySelector('.content').innerHTML = '';/// Очищаем элемент с классом content
        app.PageLogin.draw();// заново рисуем страницу для входа
       }
}) (AdsBoard);