'use strict'
const doc = document;
// let tasksListTempBD = [{status:0, id:0, name:'Task1'}];
// let serialTasksList = JSON.stringify(tasksListTempBD);
// localStorage.setItem("tasksBD", serialTasksList);
let taskArea = doc.querySelector(".tasks-container");

function init() {
    var tasksList = JSON.parse(localStorage.getItem("tasksBD"));

    tasksList.forEach(function(el, index, arr){
        drowNewTasks(el.name);
    });

    doc.getElementById('add-task').addEventListener('click', createNewTasks);

    function createNewTasks(evnt) {
        evnt.preventDefault();
        let taskItem = {
            status: 0
        };
        let taksName = doc.querySelector('.add-field').value;
        if(taksName){
            taskItem.id = tasksList[tasksList.length - 1].id + 1;
            taskItem.name = taksName;
            tasksList.push(taskItem);
            doc.querySelector('.add-field').value = '';
            sendTaskInLocalBD(tasksList);
            drowNewTasks(taksName);
        }
    }
    function sendTaskInLocalBD(tasksList) {
        let serialTasksList = JSON.stringify(tasksList);
        localStorage.setItem("tasksBD", serialTasksList);
    }
    function drowNewTasks(taksName){
            let newTask = doc.createElement('div');
            newTask.setAttribute('class','tasks-wrap');
            taskArea.insertBefore(newTask, taskArea.firstChild);

            let taskForm = doc.createElement('form');
            taskForm.setAttribute('class','form task-form task-normal not-progress');
            newTask.appendChild(taskForm);

            let taskFieldset = doc.createElement('fieldset');
            taskFieldset.setAttribute('class','field-wrap');
            taskForm.appendChild(taskFieldset);
            
            let taskInput = doc.createElement('input');
            taskInput.setAttribute('class','status-cntrl');
            taskInput.setAttribute('type','checkbox');
            taskFieldset.appendChild(taskInput);

            let taskText = doc.createElement('p');
            taskText.setAttribute('class','field name-field');
            taskFieldset.appendChild(taskText);
            taskText.innerHTML = taksName;

            let taskButtonWrap = doc.createElement('div');
            taskButtonWrap.setAttribute('class','btn-group');
            taskForm.appendChild(taskButtonWrap);

            let taskButtonSatus = doc.createElement('button');
            taskButtonSatus.setAttribute('class','btn btn-sm btn-status');
            taskButtonWrap.appendChild(taskButtonSatus);

            let taskButtonEdit = doc.createElement('button');
            taskButtonEdit.setAttribute('class','btn btn-sm btn-edit');
            taskButtonWrap.appendChild(taskButtonEdit);

            let taskButtonDeleteItem = doc.createElement('button');
            taskButtonDeleteItem.setAttribute('class','btn btn-sm btn-delete-item');
            taskButtonWrap.appendChild(taskButtonDeleteItem);
        
    }
}
doc.addEventListener('DOMContentLoaded', init);