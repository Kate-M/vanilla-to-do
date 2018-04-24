'use strict'

const doc = document;
let taskArea = doc.querySelector(".tasks-container");
let tasksList = [];

let status = {
    default: 0,
    processing: 1,
    completed: 2
};

function init() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem('tasksDB')) {
            tasksList = JSON.parse(localStorage.getItem("tasksDB"));
            tasksList.forEach(el => drawTask(el.name, el.id));
        }
    } else {
        console.log('Sorry! No Web Storage support');
    }

    doc.getElementById('add-task').addEventListener('click', createNewTasks);
    doc.querySelectorAll('.tasks-wrap').forEach(
        el => el.onclick = function (evnt) {
            evnt.preventDefault();
            let targetForm = evnt.target.closest('form');
            let targetButton = evnt.target.getAttribute('data-state');
            let targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');
            let targetTaskName = targetForm.querySelector('.name-field').innerHTML;

            switch (targetButton) {
                case 'delete-task':
                    deleteTask(targetTaskId);
                    break;
                case 'edit-task':
                    editTask(targetForm, targetTaskName, targetTaskId);
                    break;
                case 'cancel-task':
                    cancelTask(targetForm);
                    break;
                default:
                    console.log('other');
            }
        }
    );
}

function createNewTasks(evnt) {
    evnt.preventDefault();
    let taskItem = {
        status: status.default
    };
    let taskName = doc.querySelector('.add-field').value;
    if (taskName) {
        if (tasksList.length != 0) {
            taskItem.id = tasksList[tasksList.length - 1].id + 1;
        } else {
            taskItem.id = 0;
        }
        taskItem.name = taskName;
        let taskId = taskItem.id;
        tasksList.push(taskItem);
        clearForm();
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

let cancelTask = function (form) {
    form.parentNode.classList.remove('edit-mode');
    form.remove();
};

function drawTask(name, id) {
    let newTask = doc.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    taskArea.insertBefore(newTask, taskArea.firstChild);

    let taskForm = doc.createElement('form');
    taskForm.setAttribute('class', 'form task-form task-normal not-progress');
    newTask.appendChild(taskForm);

    let taskFieldset = doc.createElement('fieldset');
    taskFieldset.setAttribute('class', 'field-wrap');
    taskForm.appendChild(taskFieldset);

    let taskInput = doc.createElement('input');
    taskInput.setAttribute('class', 'status-cntrl');
    taskInput.setAttribute('type', 'checkbox');
    taskFieldset.appendChild(taskInput);

    let taskText = doc.createElement('p');
    taskText.setAttribute('class', 'field name-field');
    taskText.setAttribute('data-id', `${id}`);
    taskFieldset.appendChild(taskText);
    taskText.innerHTML = name;

    let taskButtonWrap = doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    let taskButtonStatus = doc.createElement('button');
    taskButtonStatus.setAttribute('class', 'btn btn-sm btn-status');
    taskButtonWrap.appendChild(taskButtonStatus);

    let taskButtonEdit = doc.createElement('button');
    taskButtonEdit.setAttribute('class', 'btn btn-sm btn-edit');
    taskButtonEdit.setAttribute('data-state', 'edit-task');
    taskButtonWrap.appendChild(taskButtonEdit);

    let taskButtonDeleteItem = doc.createElement('button');
    taskButtonDeleteItem.setAttribute('class', 'btn btn-sm btn-delete-item');
    taskButtonDeleteItem.setAttribute('data-state', 'delete-task');
    taskButtonWrap.appendChild(taskButtonDeleteItem);
}
function drawEditMode(container, name, id) {

    let taskForm = doc.createElement('form');
    taskForm.setAttribute('class', 'form task-form task-editable');
    container.appendChild(taskForm);

    let taskFieldset = doc.createElement('fieldset');
    taskFieldset.setAttribute('class', 'field-wrap');
    taskForm.appendChild(taskFieldset);

    let taskInput = doc.createElement('input');
    taskInput.setAttribute('class', 'field name-field');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('data-id', `${id}`);
    taskFieldset.appendChild(taskInput);
    taskInput.value = name;

    let taskButtonWrap = doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    let taskButtonSave = doc.createElement('button');
    taskButtonSave.setAttribute('class', 'btn btn-sm btn-save');
    taskButtonSave.setAttribute('data-state', 'save-task');
    taskButtonWrap.appendChild(taskButtonSave);

    let taskButtonCancel = doc.createElement('button');
    taskButtonCancel.setAttribute('class', 'btn btn-sm btn-cancel');
    taskButtonCancel.setAttribute('data-state', 'cancel-task');
    taskButtonWrap.appendChild(taskButtonCancel);
}

function clearForm() {
    doc.querySelector('.add-field').value = '';
}

function sendTaskInLocalDB(tasksList) {
    let serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
    location.reload();
}

doc.addEventListener('DOMContentLoaded', init);