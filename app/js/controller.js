import { STATUS } from './constant';
import { createNewTasks, deleteTask, editTask, saveTask, cancelTask, changeStatus } from './task-logic'

export function startEvents() {
    document.getElementById('add-task').addEventListener('click', createNewTasks);
    document.querySelectorAll('.tasks-wrap').forEach(
        el => el.onclick = function (evnt) {
            evnt.preventDefault();
            let targetForm = evnt.target.closest('form');
            let targetButton = evnt.target.getAttribute('data-state');
            let targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');
            let targetTaskName = targetForm.querySelector('.name-field').innerHTML;

            switch (targetButton) {
                case 'delete-task':
                    deleteTask(targetTaskId);
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
                    changeStatus(targetTaskId, STATUS.processing);
                    break;
                case 'status-complete-task':
                    changeStatus(targetTaskId, STATUS.completed);
                    break;       
                default:
                    console.log('other');
            }
        }
    );
}
