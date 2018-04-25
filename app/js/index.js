import { startEvents } from './controller';
import { drawTask } from './dom';

export var tasksList = [];

function init() {

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem('tasksDB')) {
            tasksList = JSON.parse(localStorage.getItem("tasksDB"));
            tasksList.forEach(el => drawTask(el.id,el.name, el.status));
        }
    } else {
        console.log('Sorry! No Web Storage support');
    }

    startEvents();
}

export function sendTaskInLocalDB(tasksList, reload) {
    let serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
    location.reload();
}

document.addEventListener('DOMContentLoaded', init);