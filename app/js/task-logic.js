import { STATUS } from './constant';
import { tasksList, sendTaskInLocalDB } from './index';
import { drawTask } from './dom';

function createNewTasks(evnt) {
    evnt.preventDefault();
    let taskItem = {
        STATUS: STATUS.default
    };
    let taskName = document.querySelector('.add-field').value.trim();
    if (!taskName ) {
        document.querySelector('.add-task .error').innerHTML = "Invalid value";
    } else {
        taskItem.id = new Date().valueOf()  + '_' + taskName;
        taskItem.name = taskName;
        let taskId = taskItem.id;
        tasksList.push(taskItem);
        document.querySelector('.add-field').value = '';
        sendTaskInLocalDB(tasksList);
        drawTask(taskName, taskId);
    }
}
function deleteTask (id) {
    let list = tasksList.filter((el, index, arr) => arr[index].id != id);
    sendTaskInLocalDB(list);
};

function editTask (form, name, id) {
    form.classList.add('edit-mode');
};

function saveTask (form, id) {
    let newTaskName = form.querySelector('.edit-name-field').value.trim();
    tasksList.map((el, index, array) => {
        if (array[index].id == id && newTaskName != '') {
            array[index].name = newTaskName;
        }
        sendTaskInLocalDB(array);
    })
};

function cancelTask (form) {
    form.classList.remove('edit-mode');
    console.log(form);
};

export { createNewTasks, deleteTask, editTask, saveTask, cancelTask };