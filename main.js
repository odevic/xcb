
const containerList = document.getElementById('list');

const buttonAdd = document.getElementById('add');
const buttonRemove = document.getElementsByClassName('remove');

let tasks = [
];


buttonAdd.addEventListener('click', () => {
    if(document.getElementById('title').value === '' || document.getElementById('about').value === '' ) {
        alert('You need put value in the inputs')
    }else {
        handleAdd();
    }
});

    function doneTask(id) {
        let newDoneTask = tasks.filter(function(i) {
            return i.id === parseFloat(id); 
        });

        newDoneTask[0].done = newDoneTask[0].done ? false : true;

        handleFetch()
        checkLocalStorage()
    }

function removeTask(id) {
    const newTask = tasks.filter(function(i) {
        return i.id !== parseFloat(id)
    }) 

    tasks = newTask;    
    
    console.log(newTask, id)

    localStorage.setItem('lgs', JSON.stringify(newTask))
    handleFetch()
}

function handleAdd() {
    const nameTask = document.getElementById('title').value;
    const aboutTask = document.getElementById('about').value;

    tasks.push({
        nameTask: nameTask,
        aboutTask: aboutTask,
        id: tasks.length + 1,
        done: false,
    });

    localStorage.setItem('lgs', JSON.stringify(tasks))
    
    handleFetch()
}

function checkLocalStorage() {
    const lc = localStorage.getItem('lgs');
    if(lc) {
         tasks = JSON.parse(lc);
    } else {
        localStorage.setItem('lgs', JSON.stringify(tasks))
    }
}


function handleFetch() {

    containerList.innerHTML = '';
    checkLocalStorage()
    
    tasks.forEach((i) => {
        const div = document.createElement('div');

        div.classList.add('box-task');
    
            div.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
                <h2 style="text-decoration: ${i.done ? 'line-through' : 'none'}">${i.nameTask}</h2>
                <span>${i.aboutTask}</span>
            </div>    
            <div style="">
            <button onclick="removeTask(${i.id})" style="margin-right: 10px;" id="remove">REMOVE</button>
            <button onclick="doneTask(${i.id})" style="margin-right: 10px;" id="remove">${!i.done ? 'DONE' : 'UNDONE'}</button>
            </div>
            `
        
        containerList.appendChild(div)
    })
};

handleFetch()
