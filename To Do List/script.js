function handleKeyDown(event){
    if(event.key == 'Enter'){
        addList();
    }else if(event.key == 'Delete'){
        const list = document.getElementById('dolist');
        if (list.firstChild) { 
            list.removeChild(list.firstChild); 
        }   
        backupItems(); 
    }
}

function formatLongString(longString, lineLength) {
    let formattedString = '';
    for (let i = 0; i < longString.length; i += lineLength) {
        formattedString += longString.slice(i, i + lineLength) + '\n';
    }
    return formattedString.trim(); 
}

function addList(){
    let input = document.getElementById('input');
    let val = input.value.trim();
    if(val != ''){
        if(val.length > 50){    val = formatLongString(val, 50);  }
        let list = document.createElement('li');
        list.textContent = val;
        removeHandler(list);
        document.getElementById('dolist').appendChild(list);
        input.value = '';
        backupItems();
    }else {
        alert('Please enter a task.'); 
    }
}

function removeHandler(list){
    list.onclick = function() { 
        this.remove();
        backupItems();
    }
}
    
function backupItems(){
    let items = document.querySelectorAll('#dolist li');
    let arr = [];
    items.forEach(item =>{
        arr.push(item.textContent)
    });
    localStorage.setItem('item', JSON.stringify(arr));
}

function loadList() {
    let storedList = JSON.parse(localStorage.getItem('item'));

    if (storedList) {
        storedList.forEach(item => {
            let list = document.createElement('li');
            list.textContent = item;
            removeHandler(list);
            document.getElementById('dolist').appendChild(list);
        });
    }
}

window.onload = loadList();
window.addEventListener('keydown', handleKeyDown);
