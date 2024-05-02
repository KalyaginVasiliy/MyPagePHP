

let selectedBulletinFile; // Переменная для хранения выбранного файла
let currentBulletinData = {}; // Объект для хранения текущих данных объявления

const handleUploadClickBulletin = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*'; // Указываем, что можно выбирать только файлы изображений
  fileInput.addEventListener('change', handleFileSelectBulletin);
  fileInput.click();
};

const handleFileSelectBulletin = (event) => {
  const file = event.target.files[0]; // Получаем выбранный файл

  if (file) {
    // Проверяем, является ли выбранный файл изображением
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        // Обновляем изображение товара
        productImage.src = reader.result;
        selectedBulletinFile = file; // Сохраняем выбранный файл в переменную
      };

      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите файл изображения');
    }
  }
};

function drawEditModalBulletin(bulletinId, imagePath, productName, price, description) {
  currentBulletinData = { bulletinId, imagePath, productName, price, description }; // Сохраняем текущие данные объявления

  // Создаем затемненный фон
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  // Создаем модальное окно
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Создаем заголовок модального окна
  const modalHeader = document.createElement('h2');
  modalHeader.textContent = 'Редактирование объявления';
  modal.appendChild(modalHeader);

  // Создаем контейнер для данных объявления
  const bulletinDataContainer = document.createElement('div');
  bulletinDataContainer.classList.add('bulletin-data-container');
  bulletinDataContainer.style.padding = '5px';

  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');
  productContainer.style.border = '1px solid #ccc';

  productImage = document.createElement('img'); // Инициализация productImage
  productImage.src = imagePath;
  productImage.classList.add('product-image');
  productContainer.appendChild(productImage);

  const changeImageButton = document.createElement('button');
  changeImageButton.textContent = 'Изменить фото';
  changeImageButton.classList.add('page-button');
  changeImageButton.addEventListener('click', handleUploadClickBulletin);
  productContainer.appendChild(changeImageButton);

  bulletinDataContainer.appendChild(productContainer);

  // 2. Наименование товара
  const nameContainer = document.createElement('div');
  nameContainer.classList.add('bulletin-data-row');
  nameContainer.style.border = '1px solid #ccc';
  const nameLabel = document.createElement('span');
  nameLabel.textContent = 'Наименование: ' + productName;
  nameContainer.appendChild(nameLabel);
  const changeNameButton = document.createElement('button');
  changeNameButton.textContent = 'Изменить';
  changeNameButton.classList.add('page-button');
  changeNameButton.addEventListener('click', () => {
    const nameInput = document.createElement('input');
    nameInput.value = productName;
    nameInput.classList.add('bulletin-data-input');
    nameContainer.replaceChild(nameInput, nameLabel);
    const okButton = document.createElement('button');
    okButton.textContent = 'Ок';
    okButton.classList.add('page-button');
    okButton.addEventListener('click', () => {
      const newName = nameInput.value;
      updateBulletinData('productName', newName);
      nameContainer.replaceChild(nameLabel, nameInput);
      nameLabel.textContent = 'Наименование: ' + newName;
      nameContainer.replaceChild(changeNameButton, okButton);
    });
    nameContainer.appendChild(okButton);
    nameContainer.removeChild(changeNameButton);
  });
  nameContainer.appendChild(changeNameButton);
  bulletinDataContainer.appendChild(nameContainer);

  // 3. Цена товара
  const priceContainer = document.createElement('div');
  priceContainer.classList.add('bulletin-data-row');
  priceContainer.style.border = '1px solid #ccc';
  const priceLabel = document.createElement('span');
  priceLabel.textContent = 'Цена: ' + price;
  priceContainer.appendChild(priceLabel);

  const changePriceButton = document.createElement('button');
  changePriceButton.textContent = 'Изменить';
  changePriceButton.classList.add('page-button');
  changePriceButton.addEventListener('click', () => {
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.value = price;
    priceInput.classList.add('bulletin-data-input');
    priceContainer.replaceChild(priceInput, priceLabel);

    const okButton = document.createElement('button');
    okButton.textContent = 'Ок';
    okButton.classList.add('page-button');
    okButton.addEventListener('click', () => {
      const newPrice = priceInput.value;
      updateBulletinData('price', newPrice);
      priceContainer.replaceChild(priceLabel, priceInput);
      priceLabel.textContent = 'Цена: ' + newPrice;
      priceContainer.replaceChild(changePriceButton, okButton);
    });
    priceContainer.appendChild(okButton);
    priceContainer.removeChild(changePriceButton);
  });
  priceContainer.appendChild(changePriceButton);
  bulletinDataContainer.appendChild(priceContainer);

  // 4. Описание товара
  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('bulletin-data-row');
  descriptionContainer.style.border = '1px solid #ccc';
  const descriptionLabel = document.createElement('span');
  descriptionLabel.textContent = 'Описание: ' + description;
  descriptionContainer.appendChild(descriptionLabel);

  const changeDescriptionButton = document.createElement('button');
  changeDescriptionButton.textContent = 'Изменить';
  changeDescriptionButton.classList.add('page-button');
  changeDescriptionButton.addEventListener('click', () => {
    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = description;
    descriptionInput.classList.add('bulletin-data-input');
    descriptionContainer.replaceChild(descriptionInput, descriptionLabel);

    const okButton = document.createElement('button');
    okButton.textContent = 'Ок';
    okButton.classList.add('page-button');
    okButton.addEventListener('click', () => {
      const newDescription = descriptionInput.value;
      updateBulletinData('description', newDescription);
      descriptionContainer.replaceChild(descriptionLabel, descriptionInput);
      descriptionLabel.textContent = 'Описание: ' + newDescription;
      descriptionContainer.replaceChild(changeDescriptionButton, okButton);
    });
    descriptionContainer.appendChild(okButton);
    descriptionContainer.removeChild(changeDescriptionButton);
  });
  descriptionContainer.appendChild(changeDescriptionButton);

  bulletinDataContainer.appendChild(descriptionContainer);

  // Добавляем контейнер с данными объявления в модальное окно
  modal.appendChild(bulletinDataContainer);

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
    saveChangesModal(currentBulletinData); // Вызываем функцию saveChangesModal при нажатии на кнопку
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

function updateBulletinData(field, newValue) {
  switch (field) {
    case 'productName':
      currentBulletinData.productName = newValue;
      alert('Изменение наименования товара сохранено');
      break;
    case 'price':
      currentBulletinData.price = newValue;
      alert('Изменение цены товара сохранено');
      break;
    case 'description':
      currentBulletinData.description = newValue;
      alert('Изменение описания товара сохранено');
      break;
  }

  // Обновляем соответствующее поле в модальном окне
  updateFieldInModalBulletin(field, newValue);
}

function updateFieldInModalBulletin(field, newValue) {
  switch (field) {
    case 'productName':
      document.querySelector('.bulletin-data-row:nth-child(2) input').value = newValue;
      break;
    case 'price':
      document.querySelector('.bulletin-data-row:nth-child(3) input').value = newValue;
      break;
    case 'description':
      document.querySelector('.bulletin-data-row:nth-child(4) textarea').value = newValue;
      break;
  }
}

function saveChangesModal(bulletinData) {
  // 1. Создание FormData для отправки данных на сервер
  const formData = new FormData();
  formData.append('bulletinId', bulletinData.bulletinId); // Отправляем ID объявления для поиска
  formData.append('productName', bulletinData.productName);
  formData.append('price', bulletinData.price);
  formData.append('description', bulletinData.description);
  if (selectedBulletinFile) {
    const fileExtension = selectedBulletinFile.name.split('.').pop();
    const newFileName = generateRandomString(12) + '.' + fileExtension;
    formData.append('file', selectedBulletinFile, newFileName);
  } else {
    formData.append('file', null);
  }

  // 2. Отправка запроса на сервер
  fetch('save_bulletin_changes.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert(data); // Выводим ответ от сервера
      closeModal(); // Закрытие модального окна
      AdsBoard.PageUserAds.draw(); // Перерисовываем страницу личных объявлений
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

    .bulletin-data-container {
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
    }

    .bulletin-data-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px;
    }

    .bulletin-data-row span {
      margin-right: 10px;
    }

    .bulletin-data-input {
      flex-grow: 1;
      padding: 15px;
    }

    .close-button {
      margin-top: 10px;
      align-self: center;
    }

    .product-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px;
    }

    .product-image {
      max-width: 100px;
      max-height: 100px;
      margin-right: 10px;
    }
  `;
  document.head.appendChild(style);
}

// Вызываем функцию для добавления стилей при загрузке страницы
addModalStyles();