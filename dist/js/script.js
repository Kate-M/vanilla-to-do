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

/***/ "./app/js/cancel-task.js":
/*!*******************************!*\
  !*** ./app/js/cancel-task.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cancelTask = undefined;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var cancelTask = exports.cancelTask = function cancelTask(form) {
    form.parentNode.classList.remove('edit-mode');
    form.remove();
};

/***/ }),

/***/ "./app/js/clear-form.js":
/*!******************************!*\
  !*** ./app/js/clear-form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearForm = clearForm;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

function clearForm() {
    _constant.doc.querySelector('.add-field').value = '';
}

/***/ }),

/***/ "./app/js/constant.js":
/*!****************************!*\
  !*** ./app/js/constant.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var doc = document;
var taskArea = doc.querySelector(".tasks-container");
var status = {
    default: 0,
    processing: 1,
    completed: 2
};

exports.doc = doc;
exports.taskArea = taskArea;
exports.status = status;

/***/ }),

/***/ "./app/js/create-task.js":
/*!*******************************!*\
  !*** ./app/js/create-task.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNewTasks = createNewTasks;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _index = __webpack_require__(/*! ./index */ "./app/js/index.js");

var _clearForm = __webpack_require__(/*! ./clear-form */ "./app/js/clear-form.js");

var _drawTask = __webpack_require__(/*! ./draw-task */ "./app/js/draw-task.js");

function createNewTasks(evnt) {
    evnt.preventDefault();
    var taskItem = {
        status: _constant.status.default
    };
    var taskName = _constant.doc.querySelector('.add-field').value;
    if (taskName) {
        if (_index.tasksList.length != 0) {
            taskItem.id = _index.tasksList[_index.tasksList.length - 1].id + 1;
        } else {
            taskItem.id = 0;
        }
        taskItem.name = taskName;
        var taskId = taskItem.id;
        _index.tasksList.push(taskItem);
        (0, _clearForm.clearForm)();
        (0, _index.sendTaskInLocalDB)(_index.tasksList);
        (0, _drawTask.drawTask)(taskName, taskId);
    }
}

/***/ }),

/***/ "./app/js/delete-task.js":
/*!*******************************!*\
  !*** ./app/js/delete-task.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteTask = undefined;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _index = __webpack_require__(/*! ./index */ "./app/js/index.js");

var deleteTask = exports.deleteTask = function deleteTask(id) {
    _index.tasksList.map(function (el, index, array) {
        if (array[index].id == id) {
            array.splice(index, 1);
        }
        (0, _index.sendTaskInLocalDB)(array);
    });
};

/***/ }),

/***/ "./app/js/draw-edit.js":
/*!*****************************!*\
  !*** ./app/js/draw-edit.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawEditMode = drawEditMode;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

function drawEditMode(container, name, id) {
    var taskForm = _constant.doc.createElement('form');
    taskForm.setAttribute('class', 'form task-form task-editable');
    container.appendChild(taskForm);

    var taskFieldset = _constant.doc.createElement('fieldset');
    taskFieldset.setAttribute('class', 'field-wrap');
    taskForm.appendChild(taskFieldset);

    var taskInput = _constant.doc.createElement('input');
    taskInput.setAttribute('class', 'field name-field');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('data-id', '' + id);
    taskFieldset.appendChild(taskInput);
    taskInput.value = name;

    var taskButtonWrap = _constant.doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    var taskButtonSave = _constant.doc.createElement('button');
    taskButtonSave.setAttribute('class', 'btn btn-sm btn-save');
    taskButtonSave.setAttribute('data-state', 'save-task');
    taskButtonWrap.appendChild(taskButtonSave);

    var taskButtonCancel = _constant.doc.createElement('button');
    taskButtonCancel.setAttribute('class', 'btn btn-sm btn-cancel');
    taskButtonCancel.setAttribute('data-state', 'cancel-task');
    taskButtonWrap.appendChild(taskButtonCancel);
}

/***/ }),

/***/ "./app/js/draw-task.js":
/*!*****************************!*\
  !*** ./app/js/draw-task.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawTask = drawTask;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

function drawTask(name, id) {
    var newTask = _constant.doc.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    _constant.taskArea.insertBefore(newTask, _constant.taskArea.firstChild);

    var taskForm = _constant.doc.createElement('form');
    taskForm.setAttribute('class', 'form task-form task-normal not-progress');
    newTask.appendChild(taskForm);

    var taskFieldset = _constant.doc.createElement('fieldset');
    taskFieldset.setAttribute('class', 'field-wrap');
    taskForm.appendChild(taskFieldset);

    var taskInput = _constant.doc.createElement('input');
    taskInput.setAttribute('class', 'status-cntrl');
    taskInput.setAttribute('type', 'checkbox');
    taskFieldset.appendChild(taskInput);

    var taskText = _constant.doc.createElement('p');
    taskText.setAttribute('class', 'field name-field');
    taskText.setAttribute('data-id', '' + id);
    taskFieldset.appendChild(taskText);
    taskText.innerHTML = name;

    var taskButtonWrap = _constant.doc.createElement('div');
    taskButtonWrap.setAttribute('class', 'btn-group');
    taskForm.appendChild(taskButtonWrap);

    var taskButtonStatus = _constant.doc.createElement('button');
    taskButtonStatus.setAttribute('class', 'btn btn-sm btn-status');
    taskButtonWrap.appendChild(taskButtonStatus);

    var taskButtonEdit = _constant.doc.createElement('button');
    taskButtonEdit.setAttribute('class', 'btn btn-sm btn-edit');
    taskButtonEdit.setAttribute('data-state', 'edit-task');
    taskButtonWrap.appendChild(taskButtonEdit);

    var taskButtonDeleteItem = _constant.doc.createElement('button');
    taskButtonDeleteItem.setAttribute('class', 'btn btn-sm btn-delete-item');
    taskButtonDeleteItem.setAttribute('data-state', 'delete-task');
    taskButtonWrap.appendChild(taskButtonDeleteItem);
}

/***/ }),

/***/ "./app/js/edit-task.js":
/*!*****************************!*\
  !*** ./app/js/edit-task.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editTask = undefined;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _drawEdit = __webpack_require__(/*! ./draw-edit */ "./app/js/draw-edit.js");

var editTask = exports.editTask = function editTask(form, name, id) {
    var containerTask = form.parentNode;
    containerTask.classList.add('edit-mode');
    (0, _drawEdit.drawEditMode)(containerTask, name, id);
};

/***/ }),

/***/ "./app/js/events.js":
/*!**************************!*\
  !*** ./app/js/events.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startEvents = startEvents;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _createTask = __webpack_require__(/*! ./create-task */ "./app/js/create-task.js");

var _editTask = __webpack_require__(/*! ./edit-task */ "./app/js/edit-task.js");

var _deleteTask = __webpack_require__(/*! ./delete-task */ "./app/js/delete-task.js");

var _saveTask = __webpack_require__(/*! ./save-task */ "./app/js/save-task.js");

var _cancelTask = __webpack_require__(/*! ./cancel-task */ "./app/js/cancel-task.js");

function startEvents() {
    _constant.doc.getElementById('add-task').addEventListener('click', _createTask.createNewTasks);

    _constant.doc.querySelectorAll('.tasks-wrap').forEach(function (el) {
        return el.onclick = function (evnt) {
            evnt.preventDefault();
            var targetForm = evnt.target.closest('form');
            var targetButton = evnt.target.getAttribute('data-state');
            var targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');
            var targetTaskName = targetForm.querySelector('.name-field').innerHTML;

            switch (targetButton) {
                case 'delete-task':
                    (0, _deleteTask.deleteTask)(targetTaskId);
                    break;
                case 'edit-task':
                    (0, _editTask.editTask)(targetForm, targetTaskName, targetTaskId);
                    break;
                case 'cancel-task':
                    (0, _cancelTask.cancelTask)(targetForm);
                    break;
                case 'save-task':
                    (0, _saveTask.saveTask)(targetForm, targetTaskId);
                    break;
                default:
                    console.log('other');
            }
        };
    });
}

/***/ }),

/***/ "./app/js/index.js":
/*!*************************!*\
  !*** ./app/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tasksList = undefined;
exports.sendTaskInLocalDB = sendTaskInLocalDB;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _events = __webpack_require__(/*! ./events */ "./app/js/events.js");

var _drawTask = __webpack_require__(/*! ./draw-task */ "./app/js/draw-task.js");

// import { drawEditMode } from './drawEdit';
// const doc = document;
// let taskArea = doc.querySelector(".tasks-container");
var tasksList = exports.tasksList = [];

function init() {

    if (typeof Storage !== "undefined") {
        if (localStorage.getItem('tasksDB')) {
            exports.tasksList = tasksList = JSON.parse(localStorage.getItem("tasksDB"));
            tasksList.forEach(function (el) {
                return (0, _drawTask.drawTask)(el.name, el.id);
            });
        }
    } else {
        console.log('Sorry! No Web Storage support');
    }

    (0, _events.startEvents)();
}

function sendTaskInLocalDB(tasksList) {
    var serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
    location.reload();
}

_constant.doc.addEventListener('DOMContentLoaded', init);

/***/ }),

/***/ "./app/js/save-task.js":
/*!*****************************!*\
  !*** ./app/js/save-task.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveTask = undefined;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _index = __webpack_require__(/*! ./index */ "./app/js/index.js");

var saveTask = exports.saveTask = function saveTask(form, id) {
    var newTaskName = form.querySelector('.name-field').value.trim();
    _index.tasksList.map(function (el, index, array) {
        if (array[index].id == id && newTaskName != '') {
            array[index].name = newTaskName;
        }
        (0, _index.sendTaskInLocalDB)(array);
    });
};

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