import { doc, status } from './constant';
import { startEvents } from './events';
import { drawTask } from './draw-task';
// import { drawEditMode } from './drawEdit';
// const doc = document;
// let taskArea = doc.querySelector(".tasks-container");
export let tasksList = [];

function init() {

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem('tasksDB')) {
            tasksList = JSON.parse(localStorage.getItem("tasksDB"));
            tasksList.forEach(el => drawTask(el.name, el.id));
        }
    } else {
        console.log('Sorry! No Web Storage support');
    }

    startEvents();
}

export function sendTaskInLocalDB(tasksList) {
    let serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
    location.reload();
}

doc.addEventListener('DOMContentLoaded', init);