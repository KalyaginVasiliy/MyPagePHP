function drawProductContainer(imagePath, description, price, seller, phoneNumber) {
    // Создаем контейнер
    const container = document.createElement('div');
    container.classList.add('product-container');

        const boxProduct = document.createElement('div');
        boxProduct.classList.add('box-product');
    
            // Создаем блок для изображения
            // const imageBlock = document.createElement('div');
                //imageBlock.classList.add('image-block');
                    const image = document.createElement('img');
                    image.src = imagePath;
                    image.classList.add('product-image');
        
            // Создаем блок для описания товара
                const descriptionText = document.createElement('p');
                descriptionText.textContent = description;
  
            // Создаем блок для цены
                const priceText = document.createElement('p');
                priceText.textContent = `Цена: ${price}`;

        boxProduct.append(image, descriptionText, priceText);
  
    // Создаем блок для информации о продавце и кнопки "Показать телефон"
    const sellerBlock = document.createElement('div');
    sellerBlock.classList.add('seller-block');
        const phoneButton = document.createElement('button');
        phoneButton.textContent = 'Показать телефон';
        phoneButton.classList.add('registerButton');
        phoneButton.addEventListener('click', () => { 
            phoneButton.style.display = 'none';
            const phoneText = document.createElement('p');
            phoneText.textContent = `Телефон: ${phoneNumber}`;
            sellerBlock.append(phoneText, sellerText);
        });
        const sellerText = document.createElement('p');
        sellerText.textContent = `Продавец: ${seller}`;
        sellerBlock.append(phoneButton, sellerText);
  
    // Добавляем блоки в контейнер
    container.append(boxProduct, sellerBlock);
    return container;
  }