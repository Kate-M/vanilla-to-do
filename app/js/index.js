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
    doc.querySelectorAll('.task-form').forEach(
        el => el.onclick = function (evnt) {
            evnt.preventDefault();
            var targetForm = evnt.target.closest('form');
            var targetButton = evnt.target.getAttribute('data-state');
            var targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');

            switch (targetButton) {
                case 'delete-task':
                    deleteTask(targetTaskId);
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
function clearForm() {
    doc.querySelector('.add-field').value = '';
}

function sendTaskInLocalDB(tasksList) {
    let serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
    location.reload();
}
var deleteTask = function (id) {
    tasksList.map((el, index, array) => {
        if (array[index].id == id) {
            array.splice(index, 1);
        }
        sendTaskInLocalDB(array);
    })
}

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
    taskButtonWrap.appendChild(taskButtonEdit);

    let taskButtonDeleteItem = doc.createElement('button');
    taskButtonDeleteItem.setAttribute('class', 'btn btn-sm btn-delete-item');
    taskButtonDeleteItem.setAttribute('data-state', 'delete-task');
    taskButtonWrap.appendChild(taskButtonDeleteItem);
}

doc.addEventListener('DOMContentLoaded', init);