document.addEventListener('DOMContentLoaded', () => {
    let addTask = document.getElementById('addTask');
let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => {
    renderTask(task)
});

addTask.addEventListener('click', () => {
    const taskText = todoInput.value.trim()
    if(taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask)
        console.log(tasks);
        saveTasks()
        renderTask(newTask)
      todoInput.value =''
})

function renderTask(task) {
    const li = document.createElement('li')
    li.innerHTML = `<div class="bg-dark text-light flex justify-between items-center p-4 m-5 rounded-lg hover:cursor-pointer">
                            <p class="bg-dark text-light">${task.text}</p>
                            <button class="bg-red text-light p-2 rounded-lg">delete</button>
                         </div>`
    li.setAttribute('data-id', task.id)                     
    todoList.appendChild(li)
    console.log('rendered');
    
    saveTasks()

    li.addEventListener('click', (e) => {
        task.completed = !task.completed
        if(e.target.tagName === 'BUTTON') return;
        e.target.classList.toggle('line-through')
        saveTasks()
    })

   li.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation()
    todoList.removeChild(li)
    tasks = tasks.filter(t => t.id !== task.id)
    saveTasks()
    
   })
   
    
}



function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


})