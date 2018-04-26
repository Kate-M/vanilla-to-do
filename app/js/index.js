import { STATUS } from './constant';
import { taskManager } from './controller';
import {
    createNewTasks,
    deleteTask,
    editTask,
    saveTask,
    cancelTask,
    changeStatus,
    filterTask
} from './task-logic'

let filterContainer = document.querySelector('.filter-task');

export function startEvents() {
    document.getElementById('add-task').addEventListener('click', createNewTasks);
    document.getElementById('tasks-container').addEventListener('click',
        function (evnt) {
            evnt.preventDefault();
            let targetForm = evnt.target.closest('form');
            let targetContainer = targetForm.parentNode;
            let targetButton = evnt.target.getAttribute('data-state');
            let targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');
            let targetTaskName = targetForm.querySelector('.name-field').innerHTML;
            switch (targetButton) {
                case 'delete-task':
                    deleteTask(targetTaskId, targetContainer);
                    console.log(targetTaskId);
                    break;
                case 'edit-task':
                    editTask(targetForm, targetTaskName, targetTaskId);
                    break;
                case 'cancel-task':
                    cancelTask(targetForm);
                    break;
                case 'save-task':
                    saveTask(targetForm, targetTaskId);
                    break;
                case 'status-task':
                    changeStatus(targetForm, targetTaskId, STATUS.processing);
                    break;
                case 'status-complete-task':
                    changeStatus(targetForm, targetTaskId, STATUS.completed);
                    break;
            }
        }

    );
    document.querySelector('.filter-btn').onclick = function () {
        filterContainer.classList.toggle('open');
    }
    document.querySelectorAll('.filter-item').forEach(
        el => el.onclick = function (evnt) {
            evnt.preventDefault();
            filterContainer.classList.remove('open');
            let targetFilter = evnt.target.getAttribute('data-filter');
            switch (targetFilter) {
                case 'filter-all':
                    filterTask();
                    break;
                case 'filter-in-progress':
                    filterTask(STATUS.processing);
                    break;
                case 'filter-complete':
                    filterTask(STATUS.completed);
                    break;
                default:
                    filterTask();
            }
        }
    );

}

document.addEventListener('DOMContentLoaded', taskManager.init());
