import { TASK_AREA } from './constant';

function drawTask(name, id) {
    let newTask = document.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    TASK_AREA.insertBefore(newTask, TASK_AREA.firstChild);

    newTask.innerHTML =
        `<form action="smth" class="form task-form not-progress">
            <fieldset class="field-wrap">
                <input type="checkbox" class="status-btn">
                <p class="field name-field" data-id="${id}">${name}</p>
                <input type="text" class="field edit-name-field" data-id="${id}" value="${name}">
            </fieldset>
            <div class="btn-group">
                <button class="btn btn-sm btn-status"></button>
                <button class="btn btn-sm btn-edit" data-state ="edit-task"></button>
                <button class="btn btn-sm btn-delete-item" data-state ="delete-task"></button>
                <button class="btn btn-sm btn-save" data-state="save-task"></button>
                <button class="btn btn-sm btn-cancel" data-state="cancel-task"></button>
            </div>
        </form>`;
}

export { drawTask };