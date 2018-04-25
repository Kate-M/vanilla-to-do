import { STATUS, TASK_AREA } from './constant';
import { tasksList, sendTaskInLocalDB } from './index';
import { drawTask } from './dom';

function createNewTasks(evnt) {
    evnt.preventDefault();

    let taskName = document.querySelector('.add-field').value.trim();

    if (!taskName) {
        document.querySelector('.add-task .error').innerHTML = "Invalid value";
    } else {
        let taskId = new Date().valueOf() + '_' + taskName;
        tasksList.push({
            status: STATUS.default,
            id: taskId,
            name: taskName
        });
        document.querySelector('.add-field').value = '';
        sendTaskInLocalDB(tasksList);
        drawTask(taskId, taskName, STATUS.default);
    }
}
function deleteTask(id) {
    let list = tasksList.filter((el, index, arr) => arr[index].id != id);
    sendTaskInLocalDB(list);
};

function editTask(form, name, id) {
    form.classList.add('edit-mode');
};

function saveTask(form, id) {
    let newTaskName = form.querySelector('.edit-name-field').value.trim();
    let currentTask = tasksList.filter((el, index, array) =>
        array[index].id == id && newTaskName != ''
    )
    currentTask[0].name = newTaskName;
    sendTaskInLocalDB(tasksList);
};

function cancelTask(form) {
    form.classList.remove('edit-mode');
};

function changeStatus(id, statusValue) {
    let currentTask = selectTask(id);
    if (currentTask[0].status == statusValue) {
        currentTask[0].status = STATUS.default;
    } else {
        currentTask[0].status = statusValue;
    }
    sendTaskInLocalDB(tasksList);
}

function selectTask(id) {
    return tasksList.filter((el, index, array) =>
        array[index].id == id
    )
}

function filterTask(filterParam){
    TASK_AREA.innerHTML = '';
    if(!filterParam) {
        tasksList.forEach(el =>  drawTask(el.id, el.name, el.status))
    } else {
        let filteredTasks = tasksList.filter((el, index, array) => el.status == filterParam);
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