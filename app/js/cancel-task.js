import { doc } from './constant';

export let cancelTask = function (form) {
    form.parentNode.classList.remove('edit-mode');
    form.remove();
};