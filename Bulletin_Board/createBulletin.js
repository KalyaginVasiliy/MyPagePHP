function drawProductContainer(imagePath, description, price, seller, phoneNumber) {
    // Создаем контейнер
    const container = document.createElement('div');
    container.classList.add('product-container');
  
    // Создаем блок для изображения
    const imageBlock = document.createElement('div');
    imageBlock.classList.add('image-block');
    const image = document.createElement('img');
    image.src = imagePath;
    image.classList.add('product-image');
    imageBlock.appendChild(image);
  
    // Создаем блок для описания товара
    const descriptionBlock = document.createElement('div');
    descriptionBlock.classList.add('description-block');
    const descriptionText = document.createElement('p');
    descriptionText.textContent = description;
    descriptionBlock.appendChild(descriptionText);
  
    // Создаем блок для цены
    const priceBlock = document.createElement('div');
    priceBlock.classList.add('price-block');
    const priceText = document.createElement('p');
    priceText.textContent = `Цена: ${price}`;
    priceBlock.appendChild(priceText);
  
    // Создаем блок для информации о продавце и кнопки "Показать телефон"
    const sellerBlock = document.createElement('div');
    sellerBlock.classList.add('seller-block');
    const sellerText = document.createElement('p');
    sellerText.textContent = `Продавец: ${seller}`;
    const phoneButton = document.createElement('button');
    phoneButton.textContent = 'Показать телефон';
    phoneButton.addEventListener('click', () => {
      phoneButton.style.display = 'none';
      const phoneText = document.createElement('p');
      phoneText.textContent = `Телефон: ${phoneNumber}`;
      sellerBlock.appendChild(phoneText);
    });
    sellerBlock.appendChild(sellerText);
    sellerBlock.appendChild(phoneButton);
  
    // Добавляем блоки в контейнер
    container.append(imageBlock, descriptionBlock, priceBlock, sellerBlock);
    return container;
  }