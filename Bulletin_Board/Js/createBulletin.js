// Файл createBulletin.js

function drawProductContainer(productName, imagePath, description, price, seller, phoneNumber, isPersonal) {
    const container = document.createElement('div');
    container.classList.add('product-container');

    const boxProduct = document.createElement('div');
    boxProduct.classList.add('box-product');

    const imageBlock = document.createElement('div');
    imageBlock.classList.add('image-block');

    const image = document.createElement('img');
    image.src = imagePath;
    image.classList.add('product-image');
    image.style.maxWidth = '350px';
    image.style.maxHeight = '350px';
    imageBlock.append(image);

    const textBlock = document.createElement('div');
    textBlock.classList.add('text-block');

    const productNameText = document.createElement('h2');
    productNameText.textContent = productName;
    productNameText.classList.add('product-name');

    const descriptionText = document.createElement('p');
    descriptionText.textContent = description;

    const priceText = document.createElement('p');
    priceText.textContent = `Цена: ${price} руб.`;

    textBlock.append(productNameText, descriptionText, priceText);
    boxProduct.append(imageBlock, textBlock);

    if (!isPersonal) {
        const sellerBlock = document.createElement('div');
        sellerBlock.classList.add('seller-block');
        sellerBlock.style.display = 'flex';
        sellerBlock.style.justifyContent = 'space-between';
        sellerBlock.style.alignItems = 'center';

        const phoneButton = document.createElement('button');
        phoneButton.textContent = 'Показать телефон';
        phoneButton.classList.add('registerButton');
        phoneButton.addEventListener('click', () => {
            phoneButton.textContent = `Телефон: ${phoneNumber}`;
            phoneButton.classList.remove('registerButton');
            phoneButton.style.backgroundColor = 'white';
            phoneButton.style.border = 'none';
            phoneButton.style.marginTop = '20px';
        });

        const sellerTextContainer = document.createElement('div');
        sellerTextContainer.style.display = 'flex';
        sellerTextContainer.style.alignItems = 'center';

        const sellerText = document.createElement('span');
        sellerText.textContent = 'Продавец: ' + ' ';

        const sellerLink = document.createElement('a');
        sellerLink.textContent = seller;
        sellerLink.href = '#';
        sellerLink.classList.add('seller-link');

        sellerTextContainer.append(sellerText, sellerLink);
        sellerBlock.append(phoneButton, sellerTextContainer);
        container.append(boxProduct, sellerBlock);
    } else {
        container.append(boxProduct);
    }
    
    return container;
}