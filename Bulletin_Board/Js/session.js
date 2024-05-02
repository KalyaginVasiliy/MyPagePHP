// файл session.js Этот файл содержит функции для работы с сессиями

// Функция для открытия сессии с e-mail
function openSession(email) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'session.php?action=open', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
  
    const formData = `action=open&email=${encodeURIComponent(email)}`;
    xhr.send(formData);
  }
  // Функция для закрытия сессии
  function closeSession() {
    // Создаем объект XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // Открываем GET-запрос к файлу session.php
    xhr.open('GET', 'session.php?action=close', true);
  
    // Обработчик события, который вызывается при получении ответа от сервера
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText); // Выводим ответ сервера в консоль
      }
    };
  
    // Отправляем запрос на сервер
    xhr.send();
  }
  
  function checkSession() {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'session.php?action=check', false);
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const response = xhr.responseText;
          if (response === 'session_exists') {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      };
  
      xhr.send();
    });
  }
  