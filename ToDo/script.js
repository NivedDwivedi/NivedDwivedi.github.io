var theList = document.getElementById('theList'),
    form = document.querySelector('form'),
    input = form.querySelector('input'),
    cache = {};


form.addEventListener('submit', function(ev){
    "use strict";
    ev.preventDefault();
  
    var value = input.value;
    
    // if (!cache[value] && !(value == ""))
    if (!(value == "")) {
        cache[value] = true;
        theList.innerHTML += '<li>' + value + '</li>';
        localStorage.myToDo = theList.innerHTML;
        input.value='';
    }

    

});

theList.addEventListener('click', function(ev){
    "use strict";
    var t = ev.target;
    
    if (!t.classList.contains('done')) {
        t.classList.add('done');
    } else {
        t.parentNode.removeChild(t);
    }
    localStorage.myToDo = theList.innerHTML;
});

if (localStorage.myToDo !== undefined) {
    theList.innerHTML = localStorage.myToDo;
}
