// файл myProfile.js Этот файл отрисовывает страницу профиля пользователя

// Функция для получения данных пользователя из базы данных
function getUserData() {
  // Создаем объект XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Открываем GET-запрос к файлу getUserData.php
  xhr.open('GET', 'getUserData.php', true);

  // Возвращаем Promise, который будет разрешен или отклонен в зависимости от ответа сервера
  return new Promise((resolve, reject) => {
    // Обработчик события, который вызывается при получении ответа от сервера
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Парсим ответ сервера из JSON в объект JavaScript
        const userData = JSON.parse(xhr.responseText);

        // Если ответ содержит ошибку, отклоняем Promise
        if (userData.error) {
          reject(userData.error);
        } else {
          // Иначе разрешаем Promise с данными пользователя
          resolve(userData);
        }
      }
    };

    // Отправляем запрос на сервер
    xhr.send();
  });
}

function drawProfileContainer(imagePath, description, name, email, phoneNumber) {
  // Создаем контейнер
  const container = document.createElement('div');
  container.classList.add('product-container');
  container.style.flexDirection = 'column';

  const boxProduct = document.createElement('div');
  boxProduct.classList.add('box-product');

  // Создаем блок для изображения
  const image = document.createElement('img');
  image.style.maxWidth = '300px';
  image.style.maxHeight = '300px';
  image.src = imagePath;
  image.classList.add('avatar-image');

  // Создаем блок для описания пользователя
  const descriptionText = document.createElement('p');
  descriptionText.style.padding = '20px';
  descriptionText.textContent = description;

  // Создаем блок для email
  const emailText = document.createElement('p');
  emailText.textContent = `E-mail: ${email}`;

  boxProduct.append(image, descriptionText, emailText);

  // Создаем блок для информации в профиле пользователя и его аватара
  const sellerBlock = document.createElement('div');
  sellerBlock.classList.add('seller-block');

  const sellerText = document.createElement('p');
  sellerText.textContent = `Номер телефона: ${phoneNumber}`;
  sellerBlock.appendChild(sellerText);

  // Создаем контейнер для кнопок
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Создаем кнопку "Редактировать данные"
  const editButton = document.createElement('button');
  editButton.textContent = 'Редактировать данные';
  editButton.classList.add('page-button');
  editButton.style.width = '250px';
  editButton.addEventListener('click', () => {
    drawEditModal(imagePath, description, name, email, phoneNumber);
  });

  // Создаем кнопку "Удалить пользователя"
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить пользователя';
  deleteButton.classList.add('page-button');
  deleteButton.style.width = '250px';
  deleteButton.style.marginLeft = '30px';
  deleteButton.addEventListener('click', () => {
    if (confirm('Вы уверены?')) {
      deleteUser();
    }
  });

  buttonContainer.append(editButton, deleteButton);

  // Добавляем блоки в контейнер
  container.append(boxProduct, sellerBlock, buttonContainer);

  return container;
}

function deleteUser() {
  // Создаем объект XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Открываем POST-запрос к файлу deleteUser.php
  xhr.open('POST', 'deleteUser.php', true);

  // Устанавливаем заголовок Content-Type для передачи данных в формате URL-encoded
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Обработчик события, который вызывается при получении ответа от сервера
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Парсим ответ сервера из JSON в объект JavaScript
        const response = JSON.parse(xhr.responseText);

        // Если удаление прошло успешно, выводим сообщение и перенаправляем на главную страницу
        if (response.success) {
          alert('Пользователь успешно удален');
          window.location.href = 'index.html';
        } else {
          alert('Ошибка при удалении пользователя');
        }
      } else {
        alert('Ошибка при удалении пользователя');
      }
    }
  };

  // Отправляем запрос на сервер
  xhr.send();
}

// Модуль для отрисовки страницы профиля пользователя
(function (app) {
  app.PageProfile = {
    draw: function () {
      let content = document.querySelector('.content');
      document.querySelector('.content').innerHTML = '';
      let text = document.createElement("div");

      // Создаем элемент с именем пользователя
      getUserData().then(userData => {
        text.append(document.createTextNode(`Профиль пользователя: ${userData.name}`));
      }).catch(error => {
        console.error('Ошибка получения данных пользователя:', error);
        text.append(document.createTextNode('Мой профиль'));
      });

      text.classList.add("formName");
      content.appendChild(text);

      // Рисуем контейнер профиля с полученными данными
      getUserData().then(userData => {
        const profileContainer = drawProfileContainer(
          userData.pathForPhotos || 'image/NoPhoto.jpg', // Путь к изображению аватара, или изображение по умолчанию
          userData.AboutUser || 'Данные о пользователе не заполнены', // Описание пользователя, или текст по умолчанию
          userData.name,
          userData.email, // Email пользователя
          userData.phone // Номер телефона пользователя
        );
        content.appendChild(profileContainer);
      }).catch(error => {
        console.error('Ошибка получения данных пользователя:', error);
      });
    }
  }
})(AdsBoard);