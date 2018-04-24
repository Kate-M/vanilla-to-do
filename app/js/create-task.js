import { doc, status } from './constant';
import { tasksList, sendTaskInLocalDB } from './index';
import { clearForm } from './clear-form';
import { drawTask } from './draw-task';

export function createNewTasks(evnt) {
    evnt.preventDefault();
    let taskItem = {
        status: status.default
    };
    let taskName = doc.querySelector('.add-field').value;
    if (taskName) {
        if (tasksList.length != 0) {
            taskItem.id = tasksList[tasksList.length - 1].id + 1;
        } else {
            taskItem.id = 0;
        }
        taskItem.name = taskName;
        let taskId = taskItem.id;
        tasksList.push(taskItem);
        clearForm();
        sendTaskInLocalDB(tasksList);
        drawTask(taskName, taskId);
    }
}