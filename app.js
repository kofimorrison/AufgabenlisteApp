//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks)
  //add task event
  form.addEventListener('submit',addtask);
  //remove task event
  taskList.addEventListener('click',removetask);
  //clear task event
  clearBtn.addEventListener('click',cleartasks);
  filter.addEventListener('keyup',filtertasks);
}

//get tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(x){
    //create list element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    let txt = document.createTextNode(x);
    li.appendChild(txt);
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  })
}

//add task
function addtask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }
    //create list element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';//to make your li look good in materalize,we have to set the class to collection-item

    //create text node and append to li
    let txt = document.createTextNode(taskInput.value);
    li.appendChild(txt);

    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    
    //clear input
    taskInput.value = '';
  
  e.preventDefault();
}

//store task...localstorage can only store strings so we parse it as JSON
function storeTaskInLocalStorage(x){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(x);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removetask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure?')){
    e.target.parentElement.parentElement.remove();

    //remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };
  tasks.forEach(function(x, index){
    if(taskItem.textContent === x){
      tasks.splice(index,1)
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function cleartasks(){
  taskList.innerHTML = '';

  //clear from localstorage
  clearTaskSFromLocalStorage()
}

function clearTaskSFromLocalStorage(){
  localStorage.clear();
}

//filter tasks
function filtertasks(e){
  const z = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(x){
    const item = x.firstChild.textContent.toLowerCase();
    if(item.indexOf(z) != -1){
      x.style.display = 'block';
    }else{
      x.style.display = 'none';
    }
  })
}
