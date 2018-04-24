import { doc } from './constant';
import { drawEditMode } from './draw-edit';

export let editTask = function (form, name, id) {
    let containerTask = form.parentNode;
    containerTask.classList.add('edit-mode');
    drawEditMode(containerTask, name, id);
};