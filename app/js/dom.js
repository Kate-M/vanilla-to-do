import { TASK_AREA } from './constant';

function drawTask(id, name, status) {
    let newTask = document.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    TASK_AREA.insertBefore(newTask, TASK_AREA.firstChild);

    newTask.innerHTML =
        `<form action="smth" class="form task-form">
            <fieldset class="field-wrap">
                <input type="checkbox" class="btn-status-complete" data-state ="status-complete-task" checked="${status==2}">
                <p class="field name-field" data-id="${id}">${name}</p>
                <input type="text" class="field edit-name-field" data-id="${id}" value="${name}">
            </fieldset>
            <div class="btn-group">
                <button class="btn btn-sm btn-status" data-state ="status-task" data-status="${status}"></button>
                <button class="btn btn-sm btn-edit" data-state ="edit-task"></button>
                <button class="btn btn-sm btn-delete-item" data-state ="delete-task"></button>
                <button class="btn btn-sm btn-save" data-state="save-task"></button>
                <button class="btn btn-sm btn-cancel" data-state="cancel-task"></button>
            </div>
        </form>`;
}

export { drawTask };