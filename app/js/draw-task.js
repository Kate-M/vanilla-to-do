import { doc, taskArea } from './constant';

export function drawTask(name, id) {
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