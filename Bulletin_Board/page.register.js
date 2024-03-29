// файл page.register.js
(function (app) { // Создается анонимная функция, принимающая объект app в качестве аргумента
    // Объект для управления страницей регистрации
    app.PageRegister = { // Создается объект PageRegister внутри объекта app
        draw: function () { // Метод draw объекта PageRegister
            let content = document.querySelector(".content"); // Находим элемент с классом "content"
            content.innerHTML = ""; // Очистка контента

            let formDiv = document.createElement("div"); // Создаем элемент div для формы
            formDiv.style.display = "flex"; // Устанавливаем гибкое расположение элементов внутри контейнера
            formDiv.style.flexDirection = "column"; // Устанавливаем вертикальное расположение элементов
            formDiv.style.alignItems = "center"; // Центрируем элементы по горизонтали
            formDiv.style.marginTop = "20px"; // Устанавливаем отступ сверху

            let registerLabel = document.createElement("label"); // Создаем элемент label для надписи
            registerLabel .textContent = "Регистрация"; // Устанавливаем текст надписи
            registerLabel .style.color = "#0EA5E9"; // Устанавливаем цвет текста надписи
            registerLabel .style.fontWeight = "bold"; // Устанавливаем жирный шрифт для надписи
            registerLabel .style.marginBottom = "10px"; // Устанавливаем отступ снизу
            formDiv.appendChild(registerLabel ); // Добавляем надпись в контейнер формы

            let nameField = document.createElement("input"); // Создаем поле ввода для имени
            nameField.classList.add("inputFields");
            formDiv.appendChild(nameField); // Добавляем поле ввода в контейнер формы

            let nameLabel  = document.createElement("label"); // Создаем элемент label для надписи
            nameLabel.textContent = "Имя"; // Устанавливаем текст надписи
            nameLabel.classList.add("commentText");
            nameLabel.style.marginBottom = "10px"; // Устанавливаем отступ снизу
            formDiv.appendChild(nameLabel); // Добавляем надпись в контейнер формы

            let emailField = document.createElement("input"); // Создаем поле ввода для email
            emailField.classList.add("inputFields");
            emailField.placeholder = "E-mail"; // Устанавливаем placeholder для поля ввода
            formDiv.appendChild(emailField); // Добавляем поле ввода в контейнер формы

            let emailLabel = document.createElement("label"); // Создаем элемент label для надписи
            emailLabel.textContent = "E-mail"; // Устанавливаем текст надписи
            emailLabel.classList.add("commentText");
            emailLabel.style.marginBottom = "10px"; // Устанавливаем отступ снизу
            formDiv.appendChild(emailLabel); // Добавляем надпись в контейнер формы

            let phoneField = document.createElement("input");
            phoneField.classList.add("inputFields");
            phoneField.placeholder = "Телефон";
            formDiv.appendChild(phoneField);

            let phoneLabel = document.createElement("label");
            phoneLabel.classList.add("commentText");
            phoneLabel.textContent = "Телефон";
            phoneLabel.style.marginBottom = "10px";
            formDiv.appendChild(phoneLabel);

            let surnameField = document.createElement("input");
            surnameField.classList.add("inputFields");
            surnameField.placeholder = "ФИО";
            formDiv.appendChild(surnameField);

            let surregisterLabel  = document.createElement("label");
            surregisterLabel .classList.add("commentText");
            surregisterLabel .textContent = "ФИО";
            surregisterLabel .style.marginBottom = "10px";
            formDiv.appendChild(surregisterLabel );

            let passwordField = document.createElement("input");
            passwordField.classList.add("inputFields");
            passwordField.type = "password";
            passwordField.placeholder = "Пароль";
            formDiv.appendChild(passwordField);

            let passwordLabel = document.createElement("label");
            passwordLabel.classList.add("commentText");
            passwordLabel.textContent = "Пароль";
            passwordLabel.style.marginBottom = "10px";
            formDiv.appendChild(passwordLabel);

            let confirmPasswordField = document.createElement("input");
            confirmPasswordField.classList.add("inputFields");
            confirmPasswordField.type = "password";
            confirmPasswordField.placeholder = "Подтверждение пароля";
            formDiv.appendChild(confirmPasswordField);

            let confirmPasswordLabel = document.createElement("label");
            confirmPasswordLabel.classList.add("commentText");
            confirmPasswordLabel.textContent = "Подтверждение пароля";
            confirmPasswordLabel.style.marginBottom = "20px";
            formDiv.appendChild(confirmPasswordLabel);


            let registerButton = document.createElement("button"); // Создаем кнопку "Зарегистрироваться"
            registerButton.classList.add("registerButton"); // Добавляем класс "registerButton" к кнопке
            registerButton.append(document.createTextNode("Зарегистрироваться")); // Создаем текстовый узел и добавляем его в кнопку
            registerButton.addEventListener("click", showRegisterSuccess); // Добавляем обработчик события click для кнопки
            formDiv.appendChild(registerButton); // Добавляем кнопку в контейнер формы

            let loginButton = document.createElement("button"); // Создаем кнопку "Войти"
            loginButton.classList.add("registerButton"); // Добавляем класс "registerButton" к кнопке
            loginButton.append(document.createTextNode("Войти")); // Создаем текстовый узел и добавляем его в кнопку
            loginButton.addEventListener("click", app.PageLogin.draw); // Добавляем обработчик события click для кнопки
            formDiv.appendChild(loginButton); // Добавляем кнопку в контейнер формы

            content.appendChild(formDiv); // Добавляем контейнер формы в основной контент
        }
    }

    // Функция для отображения сообщения об успешной регистрации
    function showRegisterSuccess() { // Функция, вызываемая при нажатии на кнопку "Зарегистрироваться"
        let content = document.querySelector(".content"); // Находим элемент с классом "content"
        content.innerHTML = ""; // Очистка контента

        let successMsg = document.createElement("div"); // Создаем элемент div для сообщения об успехе
        successMsg.append(document.createTextNode("Вы успешно зарегистрировались!")); // Создаем текстовый узел и добавляем его в элемент
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
})(AdsBoard); // Вызываем анонимную функцию и передаем ей объект AdsBoard

