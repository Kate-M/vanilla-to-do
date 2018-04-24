import { doc } from './constant';
import { tasksList, sendTaskInLocalDB } from './index';

export let deleteTask = function (id) {
    tasksList.map((el, index, array) => {
        if (array[index].id == id) {
            array.splice(index, 1);
        }
        sendTaskInLocalDB(array);
    })
};