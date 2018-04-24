/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/index.js":
/*!*************************!*\
  !*** ./app/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var doc = document;
var taskArea = doc.querySelector(".tasks-container");
var tasksList = [];

var status = {
    default: 0,
    processing: 1,
    completed: 2
};

function init() {
    if (typeof Storage !== "undefined") {
        if (localStorage.getItem('tasksDB')) {
            tasksList = JSON.parse(localStorage.getItem("tasksDB"));
            tasksList.forEach(function (el) {
                return drawTask(el.name, el.id);
            });
        }
    } else {
        console.log('Sorry! No Web Storage support');
    }

    doc.getElementById('add-task').addEventListener('click', createNewTasks);
    doc.querySelectorAll('.tasks-wrap').forEach(function (el) {
        return el.onclick = function (evnt) {
            evnt.preventDefault();
            var targetForm = evnt.target.closest('form');
            var targetButton = evnt.target.getAttribute('data-state');
            var targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');
            var targetTaskName = targetForm.querySelector('.name-field').innerHTML;

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
                default:
                    console.log('other');
            }
        };
    });
}

function createNewTasks(evnt) {
    evnt.preventDefault();
    var taskItem = {
        status: status.default
    };
    var taskName = doc.querySelector('.add-field').value;
    if (taskName) {
        if (tasksList.length != 0) {
            taskItem.id = tasksList[tasksList.length - 1].id + 1;
        } else {
            taskItem.id = 0;
        }
        taskItem.name = taskName;
        var taskId = taskItem.id;
        tasksList.push(taskItem);
        clearForm();
        sendTaskInLocalDB(tasksList);
        drawTask(taskName, taskId);
    }
}
var deleteTask = function deleteTask(id) {
    tasksList.map(function (el, index, array) {
        if (array[index].id == id) {
            array.splice(index, 1);
        }
        sendTaskInLocalDB(array);
    });
};

var editTask = function editTask(form, name, id) {
    var containerTask = form.parentNode;
    containerTask.classList.add('edit-mode');
    drawEditMode(containerTask, name, id);
};

var cancelTask = function cancelTask(form) {
    form.parentNode.classList.remove('edit-mode');
    form.remove();
};

function drawTask(name, id) {
    var newTask = doc.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    taskArea.insertBefore(newTask, taskArea.firstChild);

    var taskForm = doc.createElement('form');
    taskForm.setAttribute('class', 'form task-form task-normal not-progress');
    newTask.appendChild(taskForm);

    var taskFieldset = doc.createElement('fieldset');
    taskFieldset.setAttribute('class', 'field-wrap');
    taskForm.appendChild(taskFieldset);

    var taskInput = doc.createElement('input');
    taskInput.setAttribute('class', 'status-cntrl');
    taskInput.setAttribute('type', 'checkbox');
    taskFieldset.appendChild(taskInput);

    var taskText = doc.createElement('p');
    taskText.setAttribute('class', 'field name-field');
    taskText.setAttribute('data-id', "" + id);
    taskFieldset.appendChild(taskText);
    taskText.innerHTML = name;

    var taskButtonWrap = doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    var taskButtonStatus = doc.createElement('button');
    taskButtonStatus.setAttribute('class', 'btn btn-sm btn-status');
    taskButtonWrap.appendChild(taskButtonStatus);

    var taskButtonEdit = doc.createElement('button');
    taskButtonEdit.setAttribute('class', 'btn btn-sm btn-edit');
    taskButtonEdit.setAttribute('data-state', 'edit-task');
    taskButtonWrap.appendChild(taskButtonEdit);

    var taskButtonDeleteItem = doc.createElement('button');
    taskButtonDeleteItem.setAttribute('class', 'btn btn-sm btn-delete-item');
    taskButtonDeleteItem.setAttribute('data-state', 'delete-task');
    taskButtonWrap.appendChild(taskButtonDeleteItem);
}
function drawEditMode(container, name, id) {

    var taskForm = doc.createElement('form');
    taskForm.setAttribute('class', 'form task-form task-editable');
    container.appendChild(taskForm);

    var taskFieldset = doc.createElement('fieldset');
    taskFieldset.setAttribute('class', 'field-wrap');
    taskForm.appendChild(taskFieldset);

    var taskInput = doc.createElement('input');
    taskInput.setAttribute('class', 'field name-field');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('data-id', "" + id);
    taskFieldset.appendChild(taskInput);
    taskInput.value = name;

    var taskButtonWrap = doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    var taskButtonSave = doc.createElement('button');
    taskButtonSave.setAttribute('class', 'btn btn-sm btn-save');
    taskButtonSave.setAttribute('data-state', 'save-task');
    taskButtonWrap.appendChild(taskButtonSave);

    var taskButtonCancel = doc.createElement('button');
    taskButtonCancel.setAttribute('class', 'btn btn-sm btn-cancel');
    taskButtonCancel.setAttribute('data-state', 'cancel-task');
    taskButtonWrap.appendChild(taskButtonCancel);
}

function clearForm() {
    doc.querySelector('.add-field').value = '';
}

function sendTaskInLocalDB(tasksList) {
    var serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
    location.reload();
}

doc.addEventListener('DOMContentLoaded', init);

/***/ }),

/***/ "./app/scss/style.scss":
/*!*****************************!*\
  !*** ./app/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./app/js/index.js ./app/scss/style.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app/js/index.js */"./app/js/index.js");
module.exports = __webpack_require__(/*! ./app/scss/style.scss */"./app/scss/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=script.js.map