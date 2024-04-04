function drawInputField(inputId, inputType, labelText) {
    // Создаем элемент div для контейнера поля ввода и надписи
    const container = document.createElement('div');
    container.classList.add("formDiv");

    // Создаем поле ввода
    const inputField = document.createElement('input');
    inputField.id = inputId;
    inputField.type = inputType;
    inputField.classList.add('inputFields');

    // Создаем надпись
    const containerLabel = document.createElement('div');
        containerLabel.classList.add('commentTextDiv');
        const label = document.createElement('label');
            label.textContent = labelText;
            label.classList.add('commentText');
        containerLabel.append(label);

    // Добавляем поле ввода и надпись в контейнер
    container.append(inputField, containerLabel);
    return container;
}