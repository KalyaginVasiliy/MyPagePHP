(function(app) {
    app.PageUserAds = {
        draw: function() {
            let content = document.querySelector('.content');
            content.innerHTML = '';
            
            let addButton = document.createElement("button");
            addButton.textContent = "Добавить новое объявление";
            addButton.classList.add("registerButton");
            addButton.style.margin = "10px auto";
            addButton.style.display = "block";
            addButton.addEventListener('click', () => {
                drawAddModalBulletin();
            });
            content.appendChild(addButton);

            fetch('get_user_ads.php')
                .then(response => response.json())
                .then(ads => {
                    ads.forEach(ad => {
                        const productContainer = drawProductContainer(
                            ad.Product_name,
                            ad.pathImage,
                            ad.description,
                            ad.price,
                            ad.name,
                            ad.phone,
                            true
                        );
                        content.appendChild(productContainer);

                        const buttonContainer = document.createElement('div');
                        buttonContainer.style.textAlign = 'center';
                        buttonContainer.style.marginTop = '10px';

                        const editButton = document.createElement('button');
                        editButton.textContent = 'Редактировать';
                        editButton.classList.add('registerButton');
                        editButton.style.marginRight = '30px';
                        editButton.addEventListener('click', () => {
                            drawEditModalBulletin(ad.id, ad.pathImage, ad.Product_name, ad.price, ad.description);
                        });
                        buttonContainer.appendChild(editButton);

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Удалить';
                        deleteButton.classList.add('registerButton');
                        deleteButton.addEventListener('click', () => {
                            if (confirm('Вы уверены?')) {
                                deleteBulletin(ad.id);
                            }
                        });
                        buttonContainer.appendChild(deleteButton);

                        content.appendChild(buttonContainer);
                    });
                })
                .catch(error => {
                    console.error('Ошибка загрузки объявлений:', error);
                });
        }
    }

    function deleteBulletin(bulletinId) {
        fetch('delete_bulletin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `bulletinId=${bulletinId}`
        })
            .then(response => response.text())
            .then(data => {
                alert(data);
                AdsBoard.PageUserAds.draw();
            })
            .catch(error => {
                alert('Ошибка при удалении объявления');
                console.error('Ошибка:', error);
            });
    }
})(AdsBoard);