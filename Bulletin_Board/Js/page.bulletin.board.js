// Файл page.bulletin.board.js Этот файл рисует ленту объявлений
(function(app) {
    app.PageBulletinBoard = {
        draw: function() {
            let content = document.querySelector('.content');
            document.querySelector('.content').innerHTML = '';
            let text = document.createElement("div");
            text.append(document.createTextNode("Лента объявлений"));
            text.classList.add("formName");
            content.append(text);
            // Загрузка объявлений с помощью AJAX
            fetch('get_ads.php')
                .then(response => response.json())
                .then(data => {
                    data.forEach(ad => {
                        const productContainer = drawProductContainer(
                            ad.Product_name,
                            ad.pathImage,
                            ad.description,
                            ad.price,
                            ad.name,
                            ad.phone,
                            false,
                        );
                        content.append(productContainer);
                    });
                })
                .catch(error => {
                    console.error('Ошибка загрузки объявлений:', error);
                });
        }
    }

    function goToEnter() {
        document.querySelector('.content').innerHTML = '';
        app.PageLogin.draw();
    }
})(AdsBoard);