import { taskArea } from './constant';

function drawTask(name, id) {
    let newTask = document.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    taskArea.insertBefore(newTask, taskArea.firstChild);

    newTask.innerHTML =
        `<form action="smth" class="form task-form task-normal not-progress">
            <fieldset class="field-wrap">
                <input type="checkbox" class="status-cntrl">
                <p class="field name-field" data-id="${id}">${name}</p>
            </fieldset>
            <div class="btn-group">
                <button class="btn btn-sm btn-status"></button>
                <button class="btn btn-sm btn-edit" data-state ="edit-task"></button>
                <button class="btn btn-sm btn-delete-item" data-state ="delete-task"></button>
            </div>
        </form>`;
}

function drawEditMode(container, name, id) {

    container.innerHTML =
        `<form action="smth" class="form task-form task-editable">
            <fieldset class="field-wrap">
                <input type="text" class="field name-field" data-id="${id}" value="${name}">
            </fieldset>
            <div class="btn-group">
                <button class="btn btn-sm btn-save" data-state="save-task"></button>
                <button class="btn btn-sm btn-cancel" data-state="cancel-task"></button>
            </div>
        </form>`;
}

export { drawTask, drawEditMode };