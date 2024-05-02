// файл page.login.js Этот файл отображает страницу входа пользователя
(function (app) {
    app.PageLogin = {
        draw: function () {
            let content = document.querySelector('.content');
            document.querySelector('.content').innerHTML = '';
            let text = document.createElement("div");
            text.append(document.createTextNode("Вход"));
            text.classList.add("formName");
            let formDiv = document.createElement("div");
            formDiv.classList.add("formDiv");
            const emailField = drawInputField('email', 'text', 'E-mail:');
            const passwordField = drawInputField('password', 'password', 'Пароль:');
            let enterButton = document.createElement("button");
            enterButton.classList.add("registerButton");
            enterButton.append(document.createTextNode("Войти"));
            enterButton.addEventListener("click", login);
            let registerButton = document.createElement("button");
            registerButton.classList.add("registerButton");
            registerButton.append(document.createTextNode("Зарегистрироваться"));
            registerButton.addEventListener("click", goToRegister);
            formDiv.append(emailField, passwordField, enterButton, registerButton);
            content.append(text, formDiv);
        }
    }

    function goToRegister() {
        document.querySelector('.content').innerHTML = '';
        app.PageRegister.draw();
    }

    function login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const response = xhr.responseText;
                if (response === 'Авторизация успешна') {
                    document.querySelector('.content').innerHTML = '';
                    userPresence = true;
                    app.Header.draw();
                    app.PageProfile.draw();
                    // Открываем сессию после успешной авторизации с email
                    openSession(email);
                } else {
                    alert(response);
                }
            }
        };

        const formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        xhr.send(formData);
    }
})(AdsBoard);