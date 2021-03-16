

if (storageAvailable('localStorage')) {
 storage_enter();
}
else {
    console.log('Too bad, no localStorage for us');
}


function  storage_enter(){
    let storage = {};

    window.addEventListener('load', btn, false);

    function btn(){
        let sw = localStorage.getItem('switch');
        let result = JSON.parse(sw) || {};
        let len = Object.keys(result).length
        if( len < 1){
            document.querySelectorAll('.corps').forEach(button => {
                if (button.classList.contains('connected')){
                    storage[button.id] = 1;
                }else{
                    storage[button.id] = 0;
                }
            })
            localStorage.setItem('switch', JSON.stringify(storage));
         }

        let storagen = JSON.parse(localStorage.getItem('switch'));

        document.querySelectorAll('.corps').forEach(button => {

            try{
                let id = button.id;
                let bt = document.getElementById(id);
                if (id in storagen &&  storagen[bt.id] === 1){
                    bt.classList.add('connected');
                }else{
                    bt.classList.remove('connected');
                }
            }catch (error){
               console.log('Error: This button not id:', button);
            }

            // let storage = button.dataset.name;

            button.addEventListener('click', event =>{
                event.stopPropagation();

                let target = event.currentTarget;

                if (target.classList.contains('connected')){
                    target.classList.remove('connected');
                    storagen[target.id] = 0;
                }else{
                    target.classList.add('connected');
                    storagen[target.id] = 1;
                }
                localStorage.setItem('switch', JSON.stringify(storagen));
            })
        })
    }


}

// empty
function randomID(long = true){
    let r = null;
     r = long ?  btoa(Math.random()).replace(/=+/g, "a"): Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
     console.log('r', r)
    return r;
}

// run storage and remove
function removeStorage(){
    let storagen2 = JSON.parse(localStorage.getItem('switch'));
    for (let key in storagen2){
        if (storagen2.hasOwnProperty(key)) {
             storagen2[key] = 2;
        }
    }
    localStorage.setItem('switch', JSON.stringify(storagen2));
    localStorage.removeItem('switch');
}




// Test storage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
