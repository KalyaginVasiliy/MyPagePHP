// файл page.login.js
(function (app) { // Создается анонимная функция, принимающая объект app в качестве аргумента
    // Объект для управления страницей входа
    app.PageLogin = { // Создается объект PageLogin внутри объекта app
        draw: function () { // Метод draw объекта PageLogin
            let content = document.querySelector(".content"); // Находим элемент с классом "content"
            content.innerHTML = ""; // Очистка контента

            let formDiv = document.createElement("div"); // Создаем элемент div для формы
            formDiv.style.display = "flex"; // Устанавливаем гибкое расположение элементов внутри контейнера
            formDiv.style.flexDirection = "column"; // Устанавливаем вертикальное расположение элементов
            formDiv.style.alignItems = "center"; // Центрируем элементы по горизонтали
            formDiv.style.marginTop = "20px"; // Устанавливаем отступ сверху

            let text = document.createElement("div"); // Создаем элемент div для текста
            text.append(document.createTextNode("Вход")); // Создаем текстовый узел и добавляем его в элемент
            text.classList.add("formName"); // Добавляем класс "formName" к элементу
            formDiv.appendChild(text); // Добавляем элемент с текстом в контейнер формы

            let emailField = document.createElement("input"); // Создаем поле ввода для email
            emailField.classList.add("inputFields");
            formDiv.appendChild(emailField); // Добавляем поле ввода в контейнер формы

            let nameLabel  = document.createElement("label"); // Создаем элемент label для надписи
            nameLabel.textContent = "Имя_пользователя"; // Устанавливаем текст надписи
            nameLabel.classList.add("commentText");
            nameLabel.style.marginBottom = "10px"; // Устанавливаем отступ снизу
            formDiv.appendChild(nameLabel); // Добавляем надпись в контейнер формы

            let passwordField = document.createElement("input"); // Создаем поле ввода для пароля
            passwordField.classList.add("inputFields");
            passwordField.type = "password"; // Устанавливаем тип поля ввода как "password"
            passwordField.placeholder = "Пароль"; // Устанавливаем placeholder для поля ввода
            formDiv.appendChild(passwordField); // Добавляем поле ввода в контейнер формы

            let passwordLabel  = document.createElement("label"); // Создаем элемент label для надписи
            passwordLabel.textContent = "Пароль"; // Устанавливаем текст надписи
            passwordLabel.classList.add("commentText");
            passwordLabel.style.marginBottom = "10px"; // Устанавливаем отступ снизу
            formDiv.appendChild(passwordLabel); // Добавляем надпись в контейнер формы

            let loginButton = document.createElement("button"); // Создаем кнопку "Войти"
            loginButton.classList.add("registerButton"); // Добавляем класс "registerButton" к кнопке
            loginButton.append(document.createTextNode("Войти")); // Создаем текстовый узел и добавляем его в кнопку
            loginButton.addEventListener("click", showLoginSuccess); // Добавляем обработчик события click для кнопки
            formDiv.appendChild(loginButton); // Добавляем кнопку в контейнер формы

            let registerButton = document.createElement("button"); // Создаем кнопку "Зарегистрироваться"
            registerButton.classList.add("registerButton"); // Добавляем класс "registerButton" к кнопке
            registerButton.append(document.createTextNode("Зарегистрироваться")); // Создаем текстовый узел и добавляем его в кнопку
            registerButton.addEventListener("click", goToRegister); // Добавляем обработчик события click для кнопки
            formDiv.appendChild(registerButton); // Добавляем кнопку в контейнер формы

            content.appendChild(formDiv); // Добавляем контейнер формы в основной контент
        }
    }

    // Функция для отображения сообщения об успешном входе
    function showLoginSuccess() { // Функция, вызываемая при нажатии на кнопку "Войти"
        let content = document.querySelector(".content"); // Находим элемент с классом "content"
        content.innerHTML = ""; // Очистка контента

        let successMsg = document.createElement("div"); // Создаем элемент div для сообщения об успехе
        successMsg.append(document.createTextNode("Вы успешно вошли!")); // Создаем текстовый узел и добавляем его в элемент
        successMsg.style.textAlign = "center"; // Выравниваем текст по центру
        successMsg.style.marginTop = "20px"; // Устанавливаем отступ сверху
        content.appendChild(successMsg); // Добавляем сообщение в основной контент

        let okButton = document.createElement("button"); // Создаем кнопку "ОК"
        okButton.classList.add("registerButton"); // Добавляем класс "registerButton" к кнопке
        okButton.append(document.createTextNode("ОК")); // Создаем текстовый узел и добавляем его в кнопку
        okButton.style.display = "block"; // Устанавливаем блочное отображение кнопки
        okButton.style.margin = "20px auto"; // Устанавливаем отступы сверху и снизу, а также центрируем кнопку
        okButton.addEventListener("click", app.PageLogin.draw); // Добавляем обработчик события click для кнопки
        content.appendChild(okButton); // Добавляем кнопку в основной контент
    }

    // Функция для перехода на страницу регистрации
    function goToRegister() { // Функция, вызываемая при нажатии на кнопку "Зарегистрироваться"
        app.PageRegister.draw(); // Вызываем метод draw объекта PageRegister
    }
})(AdsBoard); // Вызываем анонимную функцию и передаем ей объект AdsBoard