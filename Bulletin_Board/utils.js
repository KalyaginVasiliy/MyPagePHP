// utils.js
(function(app) {
    app.Utils = {
        createInput: function(className, placeholder) {
            let input = document.createElement("input");
            input.classList.add("inputFields");
            input.placeholder = placeholder || "";
            return input;
        },

        createLabel: function(text, className) {
            let label = document.createElement("label");
            label.textContent = text;
            label.classList.add("commentText");
            label.style.textAlign = "center";
            label.style.whiteSpace = "nowrap"; 
            if (className) {
                label.classList.add(className);
            }
            return label;
        },

        createButton: function(text, className, clickHandler) {
            let button = document.createElement("button");
            button.classList.add("registerButton");
            if (className) {
                button.classList.add(className);
            }
            button.append(document.createTextNode(text));
            if (clickHandler) {
                button.addEventListener("click", clickHandler);
            }
            return button;
        }
    };
})(AdsBoard);