let selectedNewBulletinFile; // Переменная для хранения выбранного файла
let currentNewBulletinData = {}; // Объект для хранения текущих данных нового объявления

const handleUploadClickNewBulletin = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.addEventListener('change', handleFileSelectNewBulletin);
  fileInput.click();
};

const handleFileSelectNewBulletin = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        newProductImage.src = reader.result;
        selectedNewBulletinFile = file;
      };

      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите файл изображения');
    }
  }
};

function drawAddModalBulletin() {
  currentNewBulletinData = {}; // Сбрасываем данные нового объявления

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalHeader = document.createElement('h2');
  modalHeader.textContent = 'Добавление нового объявления';
  modal.appendChild(modalHeader);

  const bulletinDataContainer = document.createElement('div');
  bulletinDataContainer.classList.add('bulletin-data-container');
  bulletinDataContainer.style.padding = '5px';

  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');
  productContainer.style.border = '1px solid #ccc';

  newProductImage = document.createElement('img');
  newProductImage.src = '';
  newProductImage.classList.add('product-image');
  productContainer.appendChild(newProductImage);

  const changeImageButton = document.createElement('button');
  changeImageButton.textContent = 'Добавить фото';
  changeImageButton.classList.add('page-button');
  changeImageButton.addEventListener('click', handleUploadClickNewBulletin);
  productContainer.appendChild(changeImageButton);

  bulletinDataContainer.appendChild(productContainer);

  const nameContainer = document.createElement('div');
  nameContainer.classList.add('bulletin-data-row');
  nameContainer.style.border = '1px solid #ccc';
  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Наименование товара';
  nameInput.classList.add('bulletin-data-input');
  nameContainer.appendChild(nameInput);
  bulletinDataContainer.appendChild(nameContainer);

  const priceContainer = document.createElement('div');
  priceContainer.classList.add('bulletin-data-row');
  priceContainer.style.border = '1px solid #ccc';
  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.placeholder = 'Цена товара';
  priceInput.classList.add('bulletin-data-input');
  priceContainer.appendChild(priceInput);
  bulletinDataContainer.appendChild(priceContainer);

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('bulletin-data-row');
  descriptionContainer.style.border = '1px solid #ccc';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Описание товара';
  descriptionInput.classList.add('bulletin-data-input');
  descriptionContainer.appendChild(descriptionInput);
  bulletinDataContainer.appendChild(descriptionContainer);

  modal.appendChild(bulletinDataContainer);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Сохранить';
  saveButton.classList.add('page-button');
  saveButton.style.marginRight = '10px';
  saveButton.style.marginTop = '20px';
  saveButton.style.width = '200px';
  saveButton.type = 'button';
  saveButton.addEventListener('click', () => {
    const productName = nameInput.value.trim();
    const price = priceInput.value.trim();
    const description = descriptionInput.value.trim();

    if (productName === '' || price === '' || description === '') {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    currentNewBulletinData = {
      productName,
      price,
      description
    };

    saveNewBulletinModal(currentNewBulletinData);
  });
  buttonContainer.appendChild(saveButton);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';
  closeButton.classList.add('page-button');
  closeButton.style.marginTop = '20px';
  closeButton.addEventListener('click', () => {
    overlay.remove();
    modal.remove();
  });
  buttonContainer.appendChild(closeButton);

  modal.appendChild(buttonContainer);

  document.body.appendChild(modal);
}

function saveNewBulletinModal(bulletinData) {
  const formData = new FormData();
  formData.append('productName', bulletinData.productName);
  formData.append('price', bulletinData.price);
  formData.append('description', bulletinData.description);
  if (selectedNewBulletinFile) {
    const fileExtension = selectedNewBulletinFile.name.split('.').pop();
    const newFileName = generateRandomString(12) + '.' + fileExtension;
    formData.append('file', selectedNewBulletinFile, newFileName);
  }

  fetch('save_new_bulletin.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      closeModal();
      AdsBoard.PageUserAds.draw();
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

addModalStyles();