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
var TASK_AREA = document.querySelector(".tasks-container");
var STATUS = {
    default: 0,
    processing: 1,
    completed: 2
};

exports.TASK_AREA = TASK_AREA;
exports.STATUS = STATUS;

/***/ }),

/***/ "./app/js/controller.js":
/*!******************************!*\
  !*** ./app/js/controller.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.taskManager = exports.sendTaskInLocalDB = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(/*! ./index */ "./app/js/index.js");

var _dom = __webpack_require__(/*! ./dom */ "./app/js/dom.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskManager = function () {
    function TaskManager() {
        _classCallCheck(this, TaskManager);

        this.tasksList = [];
    }

    _createClass(TaskManager, [{
        key: 'init',
        value: function init() {
            if (typeof Storage !== "undefined") {
                if (localStorage.getItem('tasksDB')) {
                    this.tasksList = JSON.parse(localStorage.getItem("tasksDB"));
                    this.tasksList.forEach(function (el) {
                        return (0, _dom.drawTask)(el.id, el.name, el.status);
                    });
                }
            } else {
                console.log('Sorry! No Web Storage support');
            }
            (0, _index.startEvents)();
        }
    }, {
        key: 'get',
        value: function get(id) {
            return this.tasksList.filter(function (el, index, array) {
                return el.id == id;
            })[0];
        }
    }, {
        key: 'add',
        value: function add(item) {
            this.tasksList.push(item);
            sendTaskInLocalDB(this.tasksList);
        }
    }, {
        key: 'save',
        value: function save() {
            sendTaskInLocalDB(this.tasksList);
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            this.tasksList = this.tasksList.filter(function (i) {
                return i.id != id;
            });
            sendTaskInLocalDB(this.tasksList);
        }
    }]);

    return TaskManager;
}();

var taskManager = new TaskManager();

function sendTaskInLocalDB(tasksList) {
    var serialTasksList = JSON.stringify(tasksList);
    localStorage.setItem("tasksDB", serialTasksList);
}

exports.sendTaskInLocalDB = sendTaskInLocalDB;
exports.taskManager = taskManager;

/***/ }),

/***/ "./app/js/dom.js":
/*!***********************!*\
  !*** ./app/js/dom.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawTask = undefined;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

function drawTask(id, name, status) {
    var newTask = document.createElement('div');
    newTask.setAttribute('class', 'tasks-wrap');
    _constant.TASK_AREA.insertBefore(newTask, _constant.TASK_AREA.firstChild);

    newTask.innerHTML = '<form action="smth" class="form task-form">\n            <fieldset class="field-wrap">\n                <input type="checkbox" class="btn-status-complete" data-state ="status-complete-task" checked="' + (status == _constant.STATUS.completed) + '">\n                <p class="field name-field" data-id="' + id + '">' + name + '</p>\n                <input type="text" class="field edit-name-field" data-id="' + id + '" value="' + name + '">\n            </fieldset>\n            <div class="btn-group">\n                <button class="btn btn-sm btn-status" data-state ="status-task" data-status="' + status + '"></button>\n                <button class="btn btn-sm btn-edit" data-state ="edit-task"></button>\n                <button class="btn btn-sm btn-delete-item" data-state ="delete-task"></button>\n                <button class="btn btn-sm btn-save" data-state="save-task"></button>\n                <button class="btn btn-sm btn-cancel" data-state="cancel-task"></button>\n            </div>\n        </form>';
}

exports.drawTask = drawTask;

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
exports.filterButton = undefined;
exports.startEvents = startEvents;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _controller = __webpack_require__(/*! ./controller */ "./app/js/controller.js");

var _taskLogic = __webpack_require__(/*! ./task-logic */ "./app/js/task-logic.js");

var filterContainer = document.querySelector('.filter-task'); // import "babel-polyfill";
var filterButton = exports.filterButton = document.querySelector('.filter-btn');

function startEvents() {
    document.getElementById('add-task').addEventListener('click', _taskLogic.createNewTasks);
    document.getElementById('tasks-container').addEventListener('click', function (evnt) {
        evnt.preventDefault();
        var targetElement = evnt.target;
        var targetForm = targetElement.closest('form');
        var targetContainer = targetForm.parentNode;
        var targetButton = evnt.target.getAttribute('data-state');
        var targetTaskId = targetForm.querySelector('.name-field').getAttribute('data-id');
        var targetTaskName = targetForm.querySelector('.name-field').innerHTML;

        switch (targetButton) {
            case 'delete-task':
                (0, _taskLogic.deleteTask)(targetTaskId, targetContainer);
                break;
            case 'edit-task':
                (0, _taskLogic.editTask)(targetForm);
                break;
            case 'cancel-task':
                (0, _taskLogic.cancelTask)(targetForm);
                break;
            case 'save-task':
                (0, _taskLogic.saveTask)(targetForm, targetTaskId, targetTaskName);
                break;
            case 'status-task':
                (0, _taskLogic.changeStatus)(targetForm, targetTaskId, _constant.STATUS.processing);
                break;
            case 'status-complete-task':
                (0, _taskLogic.changeStatus)(targetForm, targetTaskId, _constant.STATUS.completed);
                break;
        }
    });
    filterButton.onclick = function () {
        filterContainer.classList.toggle('open');
    };
    document.querySelectorAll('.filter-item').forEach(function (el) {
        return el.onclick = function (evnt) {
            evnt.preventDefault();
            filterContainer.classList.remove('open');
            var activeFilter = evnt.target.innerHTML;
            filterButton.innerHTML = activeFilter;
            var targetFilter = evnt.target.getAttribute('data-filter');

            switch (targetFilter) {
                case 'filter-all':
                    (0, _taskLogic.filterTask)();
                    break;
                case 'filter-in-progress':
                    (0, _taskLogic.filterTask)(_constant.STATUS.processing);
                    break;
                case 'filter-complete':
                    (0, _taskLogic.filterTask)(_constant.STATUS.completed);
                    break;
                default:
                    (0, _taskLogic.filterTask)();
            }
        };
    });
    document.getElementById('search-btn').addEventListener('click', _taskLogic.searchTask);
    document.getElementById('reset-search-btn').addEventListener('click', _taskLogic.resetSearchTask);
    document.getElementById('btn-remove-completed').addEventListener('click', _taskLogic.removeCompletedTasks);
    document.getElementById('btn-remove-all').addEventListener('click', _taskLogic.removeAllTasks);
}

document.addEventListener('DOMContentLoaded', _controller.taskManager.init());

/***/ }),

/***/ "./app/js/task-logic.js":
/*!******************************!*\
  !*** ./app/js/task-logic.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeAllTasks = exports.removeCompletedTasks = exports.resetSearchTask = exports.searchTask = exports.filterTask = exports.changeStatus = exports.cancelTask = exports.saveTask = exports.editTask = exports.deleteTask = exports.createNewTasks = undefined;

var _constant = __webpack_require__(/*! ./constant */ "./app/js/constant.js");

var _controller = __webpack_require__(/*! ./controller */ "./app/js/controller.js");

var _dom = __webpack_require__(/*! ./dom */ "./app/js/dom.js");

var _index = __webpack_require__(/*! ./index */ "./app/js/index.js");

var errorField = document.querySelector('.error');
var addFied = document.querySelector('.add-field');
var resetSearchButton = document.querySelector('.reset-search');
var inFiltered = void 0;
var inSearched = void 0;
var filterMode = void 0;

function createNewTasks(evnt) {
    evnt.preventDefault();
    clearFilter();
    clearField(errorField);
    inSearched = null;
    var taskName = document.querySelector('.add-field').value.trim();

    if (!taskName) {
        errorField.innerHTML = "Invalid value";
    } else {
        var taskId = new Date().valueOf() + '_' + taskName;
        _controller.taskManager.add({
            status: _constant.STATUS.default,
            id: taskId,
            name: taskName
        });
        document.querySelector('.add-field').value = '';

        (0, _dom.drawTask)(taskId, taskName, _constant.STATUS.default);
    }
}
function deleteTask(id, container) {
    if (container) {
        container.parentNode.removeChild(container);
    }
    if (id) {
        _controller.taskManager.delete(id);
    }
};

function editTask(form) {
    form.classList.add('edit-mode');
}

function saveTask(form, id, name) {
    var newTaskName = form.querySelector('.edit-name-field').value.trim();
    var task = _controller.taskManager.get(id);
    var labelTask = form.querySelector('.name-field');
    if (newTaskName != '') {
        task.name = newTaskName;
        labelTask.innerHTML = newTaskName;
        _controller.taskManager.save();
    } else {
        labelTask.innerHTML = name;
    }
    form.classList.remove('edit-mode');
};

function cancelTask(form) {
    form.classList.remove('edit-mode');
};

function changeStatus(form, id, statusValue) {
    var currentTask = _controller.taskManager.get(id);

    if (currentTask.status == statusValue) {
        currentTask.status = _constant.STATUS.default;
    } else {
        currentTask.status = statusValue;
    }
    form.querySelector('.btn-status-complete').setAttribute('checked', currentTask.status == _constant.STATUS.completed);
    form.querySelector('.btn-status').setAttribute('data-status', currentTask.status);
    _controller.taskManager.save();
}

function filterTask(filterParam) {
    filterMode = filterParam;
    _constant.TASK_AREA.innerHTML = '';
    var filteredTasksList = inSearched ? inSearched : _controller.taskManager.tasksList;
    if (!filterParam) {
        filteredTasksList.forEach(function (el) {
            return (0, _dom.drawTask)(el.id, el.name, el.status);
        });
        inFiltered = null;
    } else {
        var filteredTasks = filteredTasksList.filter(function (el, index, array) {
            return el.status == filterParam;
        });
        filteredTasks.forEach(function (el) {
            return (0, _dom.drawTask)(el.id, el.name, el.status);
        });
        inFiltered = filteredTasks;

        if (filteredTasks.length == 0) {
            _constant.TASK_AREA.innerHTML = 'Nothing';
        }
    }
}
function searchTask(evnt) {
    evnt.preventDefault();
    clearField(errorField);

    var serchedTasksList = inFiltered ? inFiltered : _controller.taskManager.tasksList;
    var searchValue = document.querySelector('.search-form .search-field').value.trim();

    if (searchValue != '') {
        _constant.TASK_AREA.innerHTML = '';
        resetSearchButton.classList.add('open');

        var serchedTasks = serchedTasksList.filter(function (el, index, array) {
            return el.name == searchValue;
        });
        serchedTasks.forEach(function (el) {
            return (0, _dom.drawTask)(el.id, el.name, el.status);
        });
        inSearched = serchedTasks;

        if (serchedTasks.length == 0) {
            _constant.TASK_AREA.innerHTML = 'Nothing';
        }
    } else {
        errorField.innerHTML = "Empty field";
        inSearched = null;
    }
}
function resetSearchTask(evnt) {
    evnt.preventDefault();
    document.querySelector('.search-field').value = '';
    inSearched = null;
    filterTask(filterMode);
    resetSearchButton.classList.remove('open');
}
function removeCompletedTasks(evnt) {
    evnt.preventDefault();
    var removetList = _controller.taskManager.tasksList.filter(function (el) {
        return el.status == _constant.STATUS.completed;
    });
    var checkTasks = document.querySelectorAll('.btn-status-complete');
    checkTasks.forEach(function (el) {
        if (el.getAttribute('checked') == 'true') {
            var removerForm = el.closest('form');
            deleteTask(false, removerForm);
        }
    });
    removetList.forEach(function (el) {
        return deleteTask(el.id);
    });
}
function removeAllTasks(evnt) {
    evnt.preventDefault();
    _constant.TASK_AREA.innerHTML = '';
    _controller.taskManager.tasksList.forEach(function (el) {
        return deleteTask(el.id);
    });
}
function clearFilter() {
    filterTask();
    _index.filterButton.innerHTML = "All";
}
function clearField(field) {
    field.innerHTML = '';
}

exports.createNewTasks = createNewTasks;
exports.deleteTask = deleteTask;
exports.editTask = editTask;
exports.saveTask = saveTask;
exports.cancelTask = cancelTask;
exports.changeStatus = changeStatus;
exports.filterTask = filterTask;
exports.searchTask = searchTask;
exports.resetSearchTask = resetSearchTask;
exports.removeCompletedTasks = removeCompletedTasks;
exports.removeAllTasks = removeAllTasks;

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