import { STATUS, TASK_AREA } from './constant';
import { taskManager } from './controller';
import { drawTask } from './dom';
import { filterButton } from './index';

let errorField = document.querySelector('.error');
let addFied = document.querySelector('.add-field');
let resetSearchButton = document.querySelector('.reset-search');
let inFiltered;
let inSearched;

function createNewTasks(evnt) {
    evnt.preventDefault();
    clearFilter();
    clearField(errorField);
    inSearched = null;
    let taskName = document.querySelector('.add-field').value.trim();

    if (!taskName) {
        errorField.innerHTML = "Invalid value";
    } else {
        let taskId = new Date().valueOf() + '_' + taskName;
        taskManager.add({
            status: STATUS.default,
            id: taskId,
            name: taskName
        });
        document.querySelector('.add-field').value = '';

        drawTask(taskId, taskName, STATUS.default);
    }
}
function deleteTask(id, container) {
    if(container){
        container.parentNode.removeChild(container);
    }
    taskManager.delete(id);
};

function editTask(form) {
    form.classList.add('edit-mode');
}

function saveTask(form, id, name) {   
    let newTaskName = form.querySelector('.edit-name-field').value.trim();
    let task = taskManager.get(id);
    let labelTask = form.querySelector('.name-field');
    if(newTaskName != ''){
        task.name = newTaskName;
        labelTask.innerHTML = newTaskName;
        taskManager.save();
    }else {
        labelTask.innerHTML = name;
    }
    form.classList.remove('edit-mode');
};

function cancelTask(form) {
    form.classList.remove('edit-mode');
};

function changeStatus(form, id, statusValue) {
    let currentTask = taskManager.get(id);
    
    if (currentTask.status == statusValue) {
        currentTask.status = STATUS.default;
    } else {
        currentTask.status = statusValue;
    }
    form.querySelector('.btn-status-complete').setAttribute('checked', currentTask.status == STATUS.completed)
    form.querySelector('.btn-status').setAttribute('data-status', currentTask.status)
    taskManager.save();
}
let filterMode;
function filterTask(filterParam){
    filterMode = filterParam;
    TASK_AREA.innerHTML = '';
    let filteredTasksList = inSearched ? inSearched : taskManager.tasksList;
    if(!filterParam) {
        filteredTasksList.forEach(el =>  drawTask(el.id, el.name, el.status));
        inFiltered = null;
    } else {
        let filteredTasks = filteredTasksList.filter((el, index, array) => el.status == filterParam);
        filteredTasks.forEach(el =>  drawTask(el.id, el.name, el.status));
        inFiltered = filteredTasks;
        
        if(filteredTasks.length == 0){ 
            TASK_AREA.innerHTML = 'Nothing';
        }
    }
   
}
function searchTask(evnt){
    evnt.preventDefault();
    clearField(errorField);

    let serchedTasksList = inFiltered ? inFiltered : taskManager.tasksList;
    let searchValue = document.querySelector('.search-form .search-field').value.trim();

    if(searchValue != '') {
        TASK_AREA.innerHTML = '';
        resetSearchButton.classList.add('open');

        let serchedTasks = serchedTasksList.filter((el, index, array) => el.name == searchValue);
        serchedTasks.forEach(el =>  drawTask(el.id, el.name, el.status));
        inSearched = serchedTasks;

        if(serchedTasks.length == 0){ 
            TASK_AREA.innerHTML = 'Nothing';
        }

    } else {
        errorField.innerHTML = "Empty field";
        inSearched = null;
    }
}
function resetSearchTask(evnt) {
    evnt.preventDefault();
    document.querySelector('.search-field').value = '';
    inSearched = null;
    filterTask(filterMode);
    resetSearchButton.classList.remove('open');
}
function removeCompletedTasks(evnt) {
    evnt.preventDefault();
    let removetList = taskManager.tasksList.filter(el => el.status == STATUS.completed);
    let checkTasks = document.querySelectorAll('.btn-status-complete');
    checkTasks.forEach(el =>  
        { 
        if(el.getAttribute('checked') == 'true') {
            let removerForm = el.closest('form');
            removerForm.parentNode.removeChild(removerForm);
        }
        }
    ); 

    removetList.forEach(el =>  deleteTask(el.id)); 
}
function removeAllTasks(evnt) {
    evnt.preventDefault();
    TASK_AREA.innerHTML = '';
    taskManager.tasksList.forEach(el =>  deleteTask(el.id)); 
}
function clearFilter() {
    filterTask();
    filterButton.innerHTML = "All";
}
function clearField(field) {
    field.innerHTML = '';
}

export {
    createNewTasks,
    deleteTask,
    editTask,
    saveTask,
    cancelTask,
    changeStatus,
    filterTask,
    searchTask,
    resetSearchTask,
    removeCompletedTasks,
    removeAllTasks
};