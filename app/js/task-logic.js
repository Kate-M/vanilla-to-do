import { STATUS, TASK_AREA } from './constant';
import { taskManager } from './controller';
import { drawTask } from './dom';

function createNewTasks(evnt) {
    evnt.preventDefault();

    let taskName = document.querySelector('.add-field').value.trim();

    if (!taskName) {
        document.querySelector('.add-task .error').innerHTML = "Invalid value";
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
    container.parentNode.removeChild(container);
    taskManager.delete(id);
};

function editTask(form, name, id) {
    form.classList.add('edit-mode');
}

function saveTask(form, id) {    
    let newTaskName = form.querySelector('.edit-name-field').value.trim();
    let task = taskManager.get(id); 
    task.name = newTaskName;
    taskManager.save();

    let labelTask = form.querySelector('.name-field');
    labelTask.innerHTML = newTaskName;
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
    form.querySelector('.btn-status-complete').setAttribute('checked', currentTask.status == 2)
    form.querySelector('.btn-status').setAttribute('data-status', currentTask.status)
    taskManager.save();
}

function filterTask(filterParam){
    TASK_AREA.innerHTML = '';
    if(!filterParam) {
        taskManager.tasksList.forEach(el =>  drawTask(el.id, el.name, el.status))
    } else {
        let filteredTasks = taskManager.tasksList.filter((el, index, array) => el.status == filterParam);
        filteredTasks.forEach(el =>  drawTask(el.id, el.name, el.status));
    }
}

export {
    createNewTasks,
    deleteTask,
    editTask,
    saveTask,
    cancelTask,
    changeStatus,
    filterTask
};