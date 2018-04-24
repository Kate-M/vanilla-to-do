import { doc } from './constant';
import { tasksList, sendTaskInLocalDB } from './index';

export let saveTask = function (form, id) {
    let newTaskName = form.querySelector('.name-field').value.trim();
    tasksList.map((el, index, array) => {
        if (array[index].id == id && newTaskName != '') {
            array[index].name = newTaskName;
        }
        sendTaskInLocalDB(array);
    })
};