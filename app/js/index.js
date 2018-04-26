import { STATUS } from './constant';
import { taskManager } from './controller';
import {
    createNewTasks,
    deleteTask,
    editTask,
    saveTask,
    cancelTask,
    changeStatus,
    filterTask,
    searchTask,
    resetSearchTask,
    removeCompletedTasks,
    removeAllTasks
} from './task-logic'

let filterContainer = document.querySelector('.filter-task');
export let filterButton = document.querySelector('.filter-btn');

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
                    editTask(targetForm);
                    break;
                case 'cancel-task':
                    cancelTask(targetForm);
                    break;
                case 'save-task':
                    saveTask(targetForm, targetTaskId, targetTaskName);
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
    filterButton.onclick = function () {
        filterContainer.classList.toggle('open');
    }
    document.querySelectorAll('.filter-item').forEach(
        el => el.onclick = function (evnt) {
            evnt.preventDefault();
            filterContainer.classList.remove('open');
            let activeFilter = evnt.target.innerHTML;
            filterButton.innerHTML = activeFilter;
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
    document.getElementById('search-btn').addEventListener('click', searchTask);
    document.getElementById('reset-search-btn').addEventListener('click', resetSearchTask);
    document.getElementById('btn-remove-completed').addEventListener('click', removeCompletedTasks);
    document.getElementById('btn-remove-all').addEventListener('click', removeAllTasks);

}

document.addEventListener('DOMContentLoaded', taskManager.init());
