(function (app) { 
    app.Header =  {
           draw : function(){
            document.querySelector('.header')
                .appendChild(document.createTextNode('Из рук в руки.RU'));
           }
       }
}) (AdsBoard);