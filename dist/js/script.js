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
// let tasksListTempBD = [{status:0, id:0, name:'Task1'}];
// let serialTasksList = JSON.stringify(tasksListTempBD);
// localStorage.setItem("tasksBD", serialTasksList);
var taskArea = doc.querySelector(".tasks-container");

function init() {
    var tasksList = JSON.parse(localStorage.getItem("tasksBD"));

    tasksList.forEach(function (el, index, arr) {
        drowNewTasks(el.name);
    });

    doc.getElementById('add-task').addEventListener('click', createNewTasks);

    function createNewTasks(evnt) {
        evnt.preventDefault();
        var taskItem = {
            status: 0
        };
        var taksName = doc.querySelector('.add-field').value;
        if (taksName) {
            taskItem.id = tasksList[tasksList.length - 1].id + 1;
            taskItem.name = taksName;
            tasksList.push(taskItem);
            doc.querySelector('.add-field').value = '';
            sendTaskInLocalBD(tasksList);
            drowNewTasks(taksName);
        }
    }
    function sendTaskInLocalBD(tasksList) {
        var serialTasksList = JSON.stringify(tasksList);
        localStorage.setItem("tasksBD", serialTasksList);
    }
    function drowNewTasks(taksName) {
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
        taskFieldset.appendChild(taskText);
        taskText.innerHTML = taksName;

        var taskButtonWrap = doc.createElement('div');
        taskButtonWrap.setAttribute('class', 'btn-group');
        taskForm.appendChild(taskButtonWrap);

        var taskButtonSatus = doc.createElement('button');
        taskButtonSatus.setAttribute('class', 'btn btn-sm btn-status');
        taskButtonWrap.appendChild(taskButtonSatus);

        var taskButtonEdit = doc.createElement('button');
        taskButtonEdit.setAttribute('class', 'btn btn-sm btn-edit');
        taskButtonWrap.appendChild(taskButtonEdit);

        var taskButtonDeleteItem = doc.createElement('button');
        taskButtonDeleteItem.setAttribute('class', 'btn btn-sm btn-delete-item');
        taskButtonWrap.appendChild(taskButtonDeleteItem);
    }
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