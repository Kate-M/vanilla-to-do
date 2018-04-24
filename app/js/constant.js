const doc = document;
const taskArea = doc.querySelector(".tasks-container");
const status = {
    default: 0,
    processing: 1,
    completed: 2
};

export {doc, taskArea, status};