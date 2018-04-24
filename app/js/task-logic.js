import { status } from './constant';
import { tasksList, sendTaskInLocalDB } from './index';
import { drawTask, drawEditMode } from './dom';

function createNewTasks(evnt) {
    evnt.preventDefault();
    let taskItem = {
        status: status.default
    };
    let taskName = document.querySelector('.add-field').value;
    if (taskName) {
        if (tasksList.length != 0) {
            taskItem.id = tasksList[tasksList.length - 1].id + 1;
        } else {
            taskItem.id = 0;
        }
        taskItem.name = taskName;
        let taskId = taskItem.id;
        tasksList.push(taskItem);
        document.querySelector('.add-field').value = '';
        sendTaskInLocalDB(tasksList);
        drawTask(taskName, taskId);
    }
}
let deleteTask = function (id) {
    tasksList.map((el, index, array) => {
        if (array[index].id == id) {
            array.splice(index, 1);
        }
        sendTaskInLocalDB(array);
    })
};

let editTask = function (form, name, id) {
    let containerTask = form.parentNode;
    containerTask.classList.add('edit-mode');
    drawEditMode(containerTask, name, id);
};

let saveTask = function (form, id) {
    let newTaskName = form.querySelector('.name-field').value.trim();
    tasksList.map((el, index, array) => {
        if (array[index].id == id && newTaskName != '') {
            array[index].name = newTaskName;
        }
        sendTaskInLocalDB(array);
    })
};

let cancelTask = function (form) {
    form.parentNode.classList.remove('edit-mode');
    form.remove();
};

export { createNewTasks, deleteTask, editTask, saveTask, cancelTask };