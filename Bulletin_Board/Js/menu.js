// файл Menu.js Этот файл отрисовывает пункты меню в заголовке, а также обрабатывает нажатие на пункты меню
(function(app) {
    app.Menu = {
        draw: function() {
            const header = document.querySelector('.header');
            const menuContainer = document.createElement('div');
            menuContainer.classList.add('menu-container');

            const menuItems = ['Лента', 'Мой профиль', 'Мои объявления', 'Выход'];

            menuItems.forEach(item => {
                const menuItem = document.createElement('a');
                menuItem.classList.add('menu-item');
                menuItem.textContent = item;
                menuItem.addEventListener('mouseover', () => menuItem.style.color = 'yellow');
                menuItem.addEventListener('mouseout', () => menuItem.style.color = 'var(--primary-textcolor)');
                menuItem.addEventListener('click', () => handleMenuItemClick(item));
                menuContainer.appendChild(menuItem);
            });

            header.appendChild(menuContainer);
        }
    };

    function handleMenuItemClick(item) {
        switch (item) {
            case 'Лента':
                AdsBoard.PageBulletinBoard.draw();
                break;
            case 'Мой профиль':
                app.PageProfile.draw();
                break;
            case 'Мои объявления':
                app.PageUserAds.draw();
                break;
            case 'Выход':
                closeSession ();
                app.PageBulletinBoard.draw();
                userPresence = false;
                app.Header.draw();
                break;
            default:
                console.log(`Выбран неизвестный пункт меню: ${item}`);
                break;
        }
    }
})(AdsBoard);