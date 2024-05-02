// файл page.register.js Этот файл отображает страницу регистрации нового пользователя
(function (app) {
    app.PageRegister = {
        draw: function () {
            let content = document.querySelector('.content');
            document.querySelector('.content').innerHTML = '';
            let text = document.createElement("div");
            text.append(document.createTextNode("Регистрация"));
            text.classList.add("formName");
            let formDiv = document.createElement("div");
            formDiv.classList.add("formDiv");
            const usernameField = drawInputField('username', 'text', 'Имя пользователя:');
            const emailField = drawInputField('email', 'text', 'E-mail:');
            const phoneField = drawInputField('phone', 'text', 'Контактный телефон:');
            const passwordField = drawInputField('password', 'password', 'Пароль:');
            const confirmPasswordField = drawInputField('confirmPassword', 'password', 'Повторите пароль:');
            let registerButton = document.createElement("button");
            registerButton.classList.add("registerButton");
            registerButton.append(document.createTextNode("Зарегистрироваться"));
            registerButton.addEventListener("click", registerUser); // Изменение здесь
            let backButton = document.createElement("button");
            backButton.classList.add("registerButton");
            backButton.append(document.createTextNode("Войти"));
            backButton.addEventListener("click", goToEnter);
            formDiv.append(usernameField, emailField, phoneField, passwordField, confirmPasswordField, registerButton, backButton);

            content.append(text, formDiv);
        }
    }

    function registerUser(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!username || !email || !phone || !password || !confirmPassword) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        if (password.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'register.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const response = xhr.responseText;
                if (response === 'success') {
                    // Регистрация успешна, перерисовываем страницу профиля
                    document.querySelector('.content').innerHTML = '';
                    userPresence = true;
                    AdsBoard.Header.draw();
                    openSession(email);
                    AdsBoard.PageProfile.draw();
                } else {
                    alert('Ошибка регистрации: ' + response);
                }
            }
        };
        const formData = `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`;
        xhr.send(formData);
    }

    function goToEnter() {
        document.querySelector('.content').innerHTML = '';
        app.PageLogin.draw();
    }
})(AdsBoard);