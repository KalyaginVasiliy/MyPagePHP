(function (app) { 
    app.PageBulletinBoard =  {
           draw : function(){
            let content = document.querySelector('.content'); /// Получаем элемент с классом content
                document.querySelector('.content').innerHTML = ''; // Очищаем элемент с классом content
                let text = document.createElement("div"); // Создаем элемент div для надписи
                    text.append(document.createTextNode("Ваши объявления")); // Устанавливаем текст
                    text.classList.add("formName"); // Устанавливаем класс
                const productContainer1 = drawProductContainer(
                        'image/Notebook.jpg',
                        'Ноутбук в неплохом состоянии, тянет большинство игр и рабочих приложений. Операционная система  Windows 10',
                        '10000 руб.',
                        'Калягин Василий',
                        '+7(922)927-20-21'
                      );
                const productContainer2 = drawProductContainer(
                        'image/Canon.jpg',
                        'Фотоаппарат Canon Mark 2, пробег 120000, в хорошем состоянии. Объектив KIT 24-105mm f/4',
                        '20000 руб.',
                        'Калягин Василий',
                        '+7(922)927-20-21'
                      );
                let formDiv = document.createElement("div"); // Создаем элемент div для формы
                    formDiv.classList.add("formDiv"); // Устанавливаем класс
                        let exitButton = document.createElement("button"); // Создаем элемент кнопки
                            exitButton.classList.add("registerButton"); // Устанавливаем класс
                            exitButton.append(document.createTextNode("Выйти")); // Устанавливаем текст
                            exitButton.addEventListener("click", goToEnter); // Устанавливаем обработчик события
                    formDiv.append(exitButton);   // Добавляем элементы в форму

            content.append(text, productContainer1, productContainer2, formDiv);  
           }
       }
       function goToEnter(){
        document.querySelector('.content').innerHTML = '';
        alert('Вы успешно вышли из системы');
        app.PageLogin.draw();
       }
}) (AdsBoard);