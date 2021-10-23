// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filterTask = document.querySelector('#filter');

//calling the function to record the events
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter task event
    filterTask.addEventListener('keyup',filterTasks);
}

//Load tasks that have already been recorded
function getTasks(){
    let tasks;
    //checks if there are some tasks that have been already recorded and displays them
    if(localStorage.getItem('tasks') != null){
        tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function(task){
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Create a text node and append to li
            li.appendChild(document.createTextNode(task));
            // Create new link element
            const link  = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content';
            // Add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append the link to li
            li.appendChild(link);
    
            // Append li to ul
            taskList.appendChild(li);
        })
    } 
}

//Add task function
function addTask(e){
    if(taskInput.value === '') {
        alert('Error! Add a task to record');
    }else{

        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create a text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link  = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        //Storing in localstorage
        storeTaskInLocalStorage(taskInput.value);

        //Clears the input section after recording the task
        taskInput.value = ''; 
        
        e.preventDefault(); //prevents the page from redirecting to default or specified href
    }
}

//Store task 
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS function
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS function
function clearTasks(){
    //deleting using the innerHTML
    //taskList.innerHTML = '';

    //a faster alternative
    while(taskList.firstChild) {        //the loop iterates until there is a child
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from Ls
    clearTaskFromLocalStorage();
}

//clear task from LS function
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks function
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}
