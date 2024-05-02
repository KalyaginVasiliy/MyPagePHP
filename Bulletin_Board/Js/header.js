// Файл header.js
(function (app) {
    app.Header = {
        draw: function () {
            // Очистка заголовка
            const headerElement = document.querySelector('.header');
            headerElement.innerHTML = '';

            // Создание и добавление логотипа
            headerElement.appendChild(document.createTextNode('Из рук в руки.RU'));

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'session.php?action=check', false); // Синхронный запрос
            xhr.send();

            const sessionExists = xhr.responseText === 'true';

            // Контейнер для меню
            const menuContainer = document.createElement('div');
            menuContainer.classList.add('menu-container');
            headerElement.appendChild(menuContainer);

            // Если пользователь не авторизован
            if (!userPresence) {
                // Создаем пункт меню "Войти"
                const loginMenuItem = document.createElement('a');
                loginMenuItem.classList.add('menu-item');
                loginMenuItem.textContent = 'Войти';
                /* loginMenuItem.style.marginRight = '30px'; // Установка отступа 30px от правого края
                loginMenuItem.style.color = 'var(--primary-textcolor)'; // Цвет текста
                loginMenuItem.style.lineHeight = '60px'; // Выравнивание по вертикали */

                loginMenuItem.addEventListener('mouseenter', () => {
                    loginMenuItem.style.color = 'lightgray';
                });
                loginMenuItem.addEventListener('mouseleave', () => {
                    loginMenuItem.style.color = 'var(--primary-textcolor)';
                });
                loginMenuItem.addEventListener('click', () => {
                    document.querySelector('.content').innerHTML = '';
                    // Если пользователь не авторизован, рисуем страницу авторизации
                    if ((!userPresence) && (loginMenuItem.textContent === 'Войти')) {
                        loginMenuItem.textContent = 'Вернуться в ленту';
                        app.PageLogin.draw();
                    } else 
                    if ((!userPresence) && (loginMenuItem.textContent === 'Вернуться в ленту')) {
                        loginMenuItem.textContent = 'Войти';
                        app.PageBulletinBoard.draw();
                    } else 
                    {
                        // Если пользователь авторизован, рисуем ленту объявлений
                        loginMenuItem.textContent = 'Войти';
                        app.PageBulletinBoard.draw();
                        // Закрываем сессию при выходе из профиля
                        userPresence = false;
                        closeSession();
                    }
                });

                menuContainer.appendChild(loginMenuItem);
            } else {
                // Если пользователь авторизован, рисуем меню из файла menu.js
                app.Menu.draw();
            }
        }
    }

    function closeSession() {
        // Закрываем сессию на сервере
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'session.php?action=close', true);
        xhr.send();
    }
})(AdsBoard);