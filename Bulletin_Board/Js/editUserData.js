// editUserData.js

let selectedUserFile; // Переменная для хранения выбранного файла
let currentUserData = {}; // Объект для хранения текущих данных пользователя

const handleUploadClick = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*'; // Указываем, что можно выбирать только файлы изображений
  fileInput.addEventListener('change', handleFileSelect);
  fileInput.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0]; // Получаем выбранный файл

  if (file) {
    // Проверяем, является ли выбранный файл изображением
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        // Обновляем изображение аватара
        avatarImage.src = reader.result;
        selectedUserFile= file; // Сохраняем выбранный файл в переменную
      };

      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите файл изображения');
    }
  }
};

function drawEditModal(imagePath, description, name, email, phoneNumber) {
  currentUserData = { imagePath, description, name, email, phoneNumber }; // Сохраняем текущие данные пользователя

  // Создаем затемненный фон
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  // Создаем модальное окно
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Создаем заголовок модального окна
  const modalHeader = document.createElement('h2');
  modalHeader.textContent = 'Редактирование личных данных';
  modal.appendChild(modalHeader);

  // Создаем контейнер для данных пользователя
  const userDataContainer = document.createElement('div');
  userDataContainer.classList.add('user-data-container');
  userDataContainer.style.padding = '5px';

  const avatarContainer = document.createElement('div');
  avatarContainer.classList.add('avatar-container');
  avatarContainer.style.border = '1px solid #ccc';

  avatarImage = document.createElement('img'); // Инициализация avatarImage
  avatarImage.src = imagePath;
  avatarImage.classList.add('avatar-image');
  avatarContainer.appendChild(avatarImage);

  const changeAvatarButton = document.createElement('button');
  changeAvatarButton.textContent = 'Изменить фото';
  changeAvatarButton.classList.add('page-button');
  changeAvatarButton.addEventListener('click', handleUploadClick);
  avatarContainer.appendChild(changeAvatarButton);

  userDataContainer.appendChild(avatarContainer);

  // 2. Имя пользователя
  const nameContainer = document.createElement('div');
  nameContainer.classList.add('user-data-row');
  nameContainer.style.border = '1px solid #ccc';
  const nameLabel = document.createElement('span');
  nameLabel.textContent = 'Имя: ' + name;
  nameContainer.appendChild(nameLabel);
  const changeNameButton = document.createElement('button');
  changeNameButton.textContent = 'Изменить';
    changeNameButton.classList.add('page-button');
    changeNameButton.addEventListener('click', () => {
      const nameInput = document.createElement('input');
      nameInput.value = name;
      nameInput.classList.add('user-data-input');
      nameContainer.replaceChild(nameInput, nameLabel);
      const okButton = document.createElement('button');
      okButton.textContent = 'Ок';
      okButton.classList.add('page-button');
      okButton.addEventListener('click', () => {
        const newName = nameInput.value;
        updateUserData('name', newName);
        nameContainer.replaceChild(nameLabel, nameInput);
        nameLabel.textContent = 'Имя: ' + newName;
        nameContainer.replaceChild(changeNameButton, okButton);
      });
    nameContainer.appendChild(okButton);
    nameContainer.removeChild(changeNameButton);
  });
  nameContainer.appendChild(changeNameButton);
  userDataContainer.appendChild(nameContainer);

  // 3. Email пользователя
  const emailContainer = document.createElement('div');
  emailContainer.classList.add('user-data-row');
  emailContainer.style.border = '1px solid #ccc';
  const emailLabel = document.createElement('span');
  emailLabel.textContent = 'Email: ' + email;
  emailContainer.appendChild(emailLabel);

  const changeEmailButton = document.createElement('button');
  changeEmailButton.textContent = 'Изменить';
  changeEmailButton.classList.add('page-button');
  changeEmailButton.addEventListener('click', () => {
    const emailInput = document.createElement('input');
    emailInput.value = email;
    emailInput.classList.add('user-data-input');
    emailContainer.replaceChild(emailInput, emailLabel);
  
    const okButton = document.createElement('button');
    okButton.textContent = 'Ок';
    okButton.classList.add('page-button');
    okButton.addEventListener('click', () => {
      const newEmail = emailInput.value;
      currentUserData.newEmail = newEmail; // Сохраняем новый email в объекте currentUserData
      emailContainer.replaceChild(emailLabel, emailInput);
      emailLabel.textContent = 'Email: ' + newEmail;
      emailContainer.replaceChild(changeEmailButton, okButton);
    });
    emailContainer.appendChild(okButton);
    emailContainer.removeChild(changeEmailButton);
  });
  emailContainer.appendChild(changeEmailButton);
userDataContainer.appendChild(emailContainer);

// 4. Номер телефона пользователя
const phoneContainer = document.createElement('div');
phoneContainer.classList.add('user-data-row');
phoneContainer.style.border = '1px solid #ccc';
const phoneLabel = document.createElement('span');
phoneLabel.textContent = 'Номер телефона: ' + (phoneNumber || '');
phoneContainer.appendChild(phoneLabel);

const changePhoneButton = document.createElement('button');
changePhoneButton.textContent = 'Изменить номер';
changePhoneButton.classList.add('page-button');
changePhoneButton.addEventListener('click', () => {
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.value = '+7';
  phoneInput.classList.add('user-data-input');
  phoneContainer.replaceChild(phoneInput, phoneLabel);

  // Обработчик события ввода для форматирования номера телефона
  phoneInput.addEventListener('input', function(event) {
    const input = event.target;
    const value = input.value;
    const numericValue = value.replace(/\D/g, '');

    let formattedValue = '+7-';

    if (numericValue.length > 1) {
      formattedValue += numericValue.slice(1, 4);
    }

    if (numericValue.length > 4) {
      formattedValue += '-' + numericValue.slice(4, 7);
    }

    if (numericValue.length > 7) {
      formattedValue += '-' + numericValue.slice(7, 9);
    }

    if (numericValue.length > 9) {
      formattedValue += '-' + numericValue.slice(9, 11);
    }

    input.value = formattedValue;
  });

  // Обработчик события ввода для ограничения длины номера телефона
  phoneInput.addEventListener('input', function() {
    if (this.value.replace(/\D/g, '').length > 11) {
      this.value = this.value.slice(0, 16);
    }
  });

  const okButton = document.createElement('button');
  okButton.textContent = 'Ок';
  okButton.classList.add('page-button');
  okButton.addEventListener('click', () => {
    const newPhone = phoneInput.value;
    updateUserData('phone', newPhone);
    phoneContainer.replaceChild(phoneLabel, phoneInput);
    phoneLabel.textContent = 'Номер телефона: ' + newPhone;
    phoneContainer.replaceChild(changePhoneButton, okButton);
  });
  phoneContainer.appendChild(okButton);
  phoneContainer.removeChild(changePhoneButton);
});
phoneContainer.appendChild(changePhoneButton);

userDataContainer.appendChild(phoneContainer);

  // 5. Пароль
  const passwordContainer = document.createElement('div');
  passwordContainer.classList.add('user-data-row');
  passwordContainer.style.border = '1px solid #ccc';
  const passwordLabel = document.createElement('span');
  passwordLabel.textContent = 'Пароль:';
  passwordContainer.appendChild(passwordLabel);

  const changePasswordButton = document.createElement('button');
  changePasswordButton.textContent = 'Сменить пароль';
  changePasswordButton.classList.add('page-button');
  // Добавить обработчик клика на кнопку "Сменить пароль"
changePasswordButton.addEventListener('click', () => {
  const oldPassword = prompt('Введите старый пароль:');
  if (oldPassword) {
    // Отправить запрос на сервер для проверки старого пароля
    checkOldPassword(oldPassword)
      .then(response => {
        if (response === 'success') {
          const newPassword = prompt('Введите новый пароль:');
          if (newPassword) {
            currentUserData.newPassword = newPassword;
            alert('Новый пароль сохранен. Не забудьте нажать кнопку "Сохранить изменения".');
          }
        } else {
          alert('Неверный старый пароль. Попробуйте еще раз.');
        }
      })
      .catch(error => {
        console.error('Ошибка при проверке старого пароля:', error);
      });
  }
});

// Функция для проверки старого пароля
function checkOldPassword(oldPassword) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'checkOldPassword.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject('Ошибка сервера');
        }
      }
    };

    const formData = `oldPassword=${encodeURIComponent(oldPassword)}`;
    xhr.send(formData);
  });
}
  passwordContainer.appendChild(changePasswordButton);

  userDataContainer.appendChild(passwordContainer);

  // 6. Данные о пользователе
const aboutContainer = document.createElement('div');
aboutContainer.classList.add('user-data-row');
aboutContainer.style.border = '1px solid #ccc';
const aboutLabel = document.createElement('span');
aboutLabel.textContent = 'О пользователе: ' + description;
aboutContainer.appendChild(aboutLabel);

const changeAboutButton = document.createElement('button');
changeAboutButton.textContent = 'Изменить';
changeAboutButton.classList.add('page-button');
changeAboutButton.addEventListener('click', () => {
  const aboutInput = document.createElement('textarea');
  aboutInput.value = description;
  aboutInput.classList.add('user-data-input');
  aboutContainer.replaceChild(aboutInput, aboutLabel);

  const okButton = document.createElement('button');
okButton.textContent = 'Ок';
okButton.classList.add('page-button');
okButton.addEventListener('click', () => {
  const newEmail = emailInput.value;

  // Проверка уникальности email
  checkEmailUniqueness(newEmail)
    .then(response => {
      if (response === 'User not found') {
        currentUserData.newEmail = newEmail; // Сохраняем новый email в объекте currentUserData
        emailContainer.replaceChild(emailLabel, emailInput);
        emailLabel.textContent = 'Email: ' + newEmail;
        emailContainer.replaceChild(changeEmailButton, okButton);
      } else {
        alert('Этот email уже используется другим пользователем. Пожалуйста, выберите другой email.');
      }
    })
    .catch(error => {
      console.error('Ошибка при проверке уникальности email:', error);
    });
});

// Функция для проверки уникальности email
function checkEmailUniqueness(email) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'check_user.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject('Ошибка сервера');
        }
      }
    };

    const formData = `email=${encodeURIComponent(email)}`;
    xhr.send(formData);
  });
}
  aboutContainer.appendChild(okButton);
  aboutContainer.removeChild(changeAboutButton);
});
aboutContainer.appendChild(changeAboutButton);

  userDataContainer.appendChild(aboutContainer);

  // Добавляем контейнер с данными пользователя в модальное окно
  modal.appendChild(userDataContainer);

  // Создаем контейнер для кнопок
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Создаем кнопку "Сохранить изменения"
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Сохранить изменения';
  saveButton.classList.add('page-button');
  saveButton.style.marginRight = '10px';
  saveButton.style.marginTop = '20px';
  saveButton.style.width = '200px';
  saveButton.type = 'button'; // Добавляем атрибут type="button"
  saveButton.addEventListener('click', () => {
    saveChanges(currentUserData); // Вызываем функцию saveChanges при нажатии на кнопку
  });
  buttonContainer.appendChild(saveButton);

  // Создаем кнопку закрытия модального окна
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';
  closeButton.classList.add('page-button');
  closeButton.style.marginTop = '20px';
  closeButton.addEventListener('click', () => {
    // Удаляем модальное окно и затемненный фон
    overlay.remove();
    modal.remove();
  });
  buttonContainer.appendChild(closeButton);

  // Добавляем контейнер с кнопками в модальное окно
  modal.appendChild(buttonContainer);

  // Добавляем модальное окно на страницу
  document.body.appendChild(modal);
}

function updateUserData(field, newValue) {
  switch (field) {
    case 'name':
      currentUserData.name = newValue;
      alert('Изменение имени сохранено');
      break;
    case 'email':
      currentUserData.email = newValue;
      alert('Изменение email сохранено');
      break;
    case 'phone':
      currentUserData.phoneNumber = newValue;
      alert('Изменение телефона сохранено');
      break;
    case 'password':
      // Обновление пароля
      break;
    case 'description':
      currentUserData.description = newValue;
      alert('Изменение данных о пользователе сохранено');
      break;
  }

  // Обновляем соответствующее поле в модальном окне
  updateFieldInModal(field, newValue);
}

function updateFieldInModal(field, newValue) {
  switch (field) {
    case 'name':
      document.querySelector('.user-data-row:nth-child(2) input').value = newValue;
      break;
    case 'email':
      document.querySelector('.user-data-row:nth-child(3) input').value = newValue;
      break;
    case 'phone':
      document.querySelector('.user-data-row:nth-child(4) input').value = newValue;
      break;
    case 'description':
      document.querySelector('.user-data-row:nth-child(6) textarea').value = newValue;
      break;
  }
}

function saveChanges(userData) {
  // 1. Создание FormData для отправки данных на сервер
  const formData = new FormData();
  formData.append('oldEmail', userData.email); // Отправляем старый email для поиска пользователя
  formData.append('newEmail', userData.newEmail || userData.email); // Отправляем новый email, если он изменился
  formData.append('name', userData.name);
  if (userData.phoneNumber) {
    formData.append('phone', userData.phoneNumber); // Отправляем номер телефона, если он есть
  }
  formData.append('aboutUser', userData.description); // Отправляем описание пользователя
  if (selectedUserFile) {
    const fileExtension = selectedUserFile.name.split('.').pop();
    const newFileName = generateRandomString(12) + '.' + fileExtension;
    formData.append('file', selectedUserFile, newFileName);
  } else {
    formData.append('file', null);
  }
  
  // Добавляем новый пароль, если он был изменен
  if (userData.newPassword) {
    formData.append('newPassword', userData.newPassword);
  }

  // 2. Отправка запроса на сервер
  fetch('save_changes.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert(data); // Выводим ответ от сервера
      closeModal(); // Закрытие модального окна
      AdsBoard.PageProfile.draw(); // Перерисовываем страницу профиля
    })
    .catch(error => {
      alert('Ошибка при загрузке данных на сервер');
      console.error('Ошибка:', error);
    });
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function closeModal() {
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  overlay.remove();
  modal.remove();
}
// Функция для добавления стилей для модального окна
function addModalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      z-index: 1000;
      max-width: 600px;
      width: 80%;
      max-height: 80%;
      overflow-y: auto;
    }

    .user-data-container {
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
    }

    .user-data-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px;
    }

    .user-data-row span {
      margin-right: 10px;
    }

    .user-data-input {
      flex-grow: 1;
      padding: 15px;
    }

    .close-button {
      margin-top: 10px;
      align-self: center;
    }

    .avatar-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px;
    }

    .avatar-image {
      max-width: 100px;
      max-height: 100px;
      margin-right: 10px;
    }
  `;
  document.head.appendChild(style);
}

// Вызываем функцию для добавления стилей при загрузке страницы
addModalStyles();