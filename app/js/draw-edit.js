import { doc, taskArea } from './constant';

export function drawEditMode(container, name, id) {
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