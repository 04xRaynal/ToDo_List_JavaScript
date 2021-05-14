const newTask = document.querySelector('#new-task-input');
const addTaskBtn = document.querySelector('.add-task-btn');
const removeTaskBtn = document.querySelector('.remove-task-btn');

const taskList = document.querySelector('.task-list');
const taskTemplate = document.querySelector('#task-template');

const historyBtn = document.querySelector('.history-btn');
const restoreBtn = document.querySelector('.restore-btn');
const deletedTaskList = document.querySelector('.deleted-task-list');
const deletedTaskTemplate = document.querySelector('#delete-task-template');

let id = 1, deleteId = 1;
let deletedTaskFlag = false;            //Flag to distinguish restored tasks
let deletedTaskLabel;


newTask.addEventListener('keyup', e => {
    if(e.keyCode === 13 && inputValid()){           //keyCode 13 is the enter key
        addTask();
    }
});


addTaskBtn.addEventListener('click', () => {
    if(inputValid()){
        addTask();
    }
});


removeTaskBtn.addEventListener('click', () => {
    const tasks = document.querySelectorAll('.task');
    
    //Each task is looped to check if it is checked or not
    tasks.forEach(task => {
        const checked = task.querySelector('.task-input').checked;

        const label = task.querySelector('.task-label');
        
        if(checked){
            //the stating 3 characters are of the heavy mark symbol, 
            //hence the substring is used to obtain only the task text value.
            const removedTask = label.innerText.substring(3);       

            task.remove();                  //task is removed from the task-list
            addDeletedTask(removedTask);        //deleted task is added to the deleted-task-list
        }
    })
});


historyBtn.addEventListener('click', () => {
    //Makes the Show History button act as a Toggle(Switch) Button
    if(historyBtn.innerText === 'Show History'){
        document.querySelector('.deleted-header h3').style.display = 'block';
        document.querySelector('.restore-btn').style.display = 'block';
        document.querySelector('.deleted-task-list').style.display = 'block';
        historyBtn.innerText = 'Hide History';
    }
    else if(historyBtn.innerText === 'Hide History'){
        document.querySelector('.deleted-header h3').style.display = 'none';
        document.querySelector('.restore-btn').style.display = 'none';
        document.querySelector('.deleted-task-list').style.display = 'none';
        historyBtn.innerText = 'Show History';
    }
});


restoreBtn.addEventListener('click', () => {
    const deletedTasks = document.querySelectorAll('.delete-task');

    //Each task is looped to check if it is checked or not
    deletedTasks.forEach((task) => {
        const checked = task.querySelector(".delete-input").checked;

        const label = task.querySelector('.delete-label');

        if(checked){
            //the stating 3 characters are of the heavy mark symbol, 
            //hence the substring is used to obtain only the task text value.
            deletedTaskLabel = label.innerText.substring(3);
            deletedTaskFlag = true;         //to denote the task is a restored task
            
            task.remove();              //task is removed from the deleted-task-list
            addTask();                  //the task is restored back to the task-list
        }
    })
});


//function to check if the text value is empty
function inputValid(){
    return newTask.value !== '';
}


//fuction to add a task to the task list
function addTask(){
    const taskElement = document.importNode(taskTemplate.content, true);        //imports all the content of the template, 
    //boolean true denotes all lines of the template (not just the first line)

    const checkbox = taskElement.querySelector('.task-input');
    checkbox.id = "task-" + id;             //a unique id is added to the element

    const label = taskElement.querySelector('.task-label');
    label.htmlFor = "task-" + id;         //label matches for the above unique id
    
    if(deletedTaskFlag){            //if the task is a restored task
        label.append(deletedTaskLabel);         //appended at the end of the label
        deletedTaskLabel = '';
        deletedTaskFlag = false;                //flag is reseted
    }
    else {                          //task added  from the input text value
        label.append(newTask.value);            //appended at the end of the label
    }

    taskList.appendChild(taskElement);            //the taskElement is added as a List Item to the task-list
    newTask.value = '';
    id++;
}


//function to add selected tasks from the task list to the deleted task list
function addDeletedTask(task){
    const deletedTaskElement = document.importNode(deletedTaskTemplate.content, true);          //imports all the content of the template, 
    //boolean true denotes all lines of the template (not just the first line)

    const checkbox = deletedTaskElement.querySelector('.delete-input');
    const label = deletedTaskElement.querySelector('.delete-label');
    
    checkbox.id = "deleted-task-" + deleteId;           //a unique id is added to the element

    label.htmlFor = "deleted-task-" + deleteId;         //label matches for the above unique id

    label.append(task);                     //appended at the end of the label

    deletedTaskList.appendChild(deletedTaskElement);        //the deletedTaskElement is added as a List Item to the deleted-task-list
    deleteId++;   
}