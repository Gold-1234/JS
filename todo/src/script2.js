document.addEventListener('DOMContentLoaded', () => {
    const addTask = document.getElementById('addTask')
    const todoInput = document.getElementById('todo-input')
    const todoList = document.getElementById('todo-list')
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        renderTask(task);
    });

    addTask.addEventListener('click', () => {
        const taskText = todoInput.value.trim()
        if(taskText === '') return;
        else{
             const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            }
            tasks.push(newTask);
            saveTasks( )
            console.log(tasks);
            renderTask(newTask)
        }
        todoInput.value = ''
    })

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if(task.completed) li.classList('line-through')
        li.innerHTML =  `<div class="bg-dark text-light flex justify-between items-center p-4 m-5 rounded-lg hover:cursor-pointer">
                            <p class="bg-dark text-light">${task.text}</p>
                            <button class="bg-red text-light p-2 rounded-lg">delete</button>
                         </div>`
        todoList.appendChild(li)

        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON')
            task.completed = !completed
            saveTasks()
            console.log('clicked');
            li.classList.toggle('line-through')
        })

        // li.querySelector('.button').addEventListener(('click'), (e) => {
        //     e.stopPropagation();    //prevent toggle from firing
        //     tasks = tasks.filter(t => t.id == task.id)
        //     li.remove();
        //     saveTasks();
        // })
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log('save task');
        
    }

    function deleteTask() {
        
    }
    })