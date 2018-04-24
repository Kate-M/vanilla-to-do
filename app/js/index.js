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
    doc.getElementById('add-task').addEventListener('click', createNewTasks);
    
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem('tasksDB')) {
            tasksList = JSON.parse(localStorage.getItem("tasksDB"));
            tasksList.forEach(el => drawTask(el.name));
        }
    } else {
        console.log('Sorry! No Web Storage support');
    }
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
        tasksList.push(taskItem);
        clearForm();
        sendTaskInLocalDB(tasksList);
        drawTask(taskName);
    }
}
function clearForm() {
    doc.querySelector('.add-field').value = '';
}

function sendTaskInLocalDB(tasksList) {
    let serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
}

function drawTask(taskName) {
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
    taskFieldset.appendChild(taskText);
    taskText.innerHTML = taskName;

    let taskButtonWrap = doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    let taskButtonStatus = doc.createElement('button');
    taskButtonStatus.setAttribute('class', 'btn btn-sm btn-status');
    taskButtonWrap.appendChild(taskButtonStatus);

    let taskButtonEdit = doc.createElement('button');
    taskButtonEdit.setAttribute('class', 'btn btn-sm btn-edit');
    taskButtonWrap.appendChild(taskButtonEdit);

    let taskButtonDeleteItem = doc.createElement('button');
    taskButtonDeleteItem.setAttribute('class', 'btn btn-sm btn-delete-item');
    taskButtonWrap.appendChild(taskButtonDeleteItem);
}

doc.addEventListener('DOMContentLoaded', init);