/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/defaultLoad.js":
/*!***************************************!*\
  !*** ./src/components/defaultLoad.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ \"./src/components/engine.js\");\n\r\n\r\nconst defaultLoad = () => {\r\n  const gameboard = document.querySelector('#gameboard');\r\n  \r\n  for (let i = 1; i <= 256; i++) {\r\n    const div = document.createElement('div');\r\n    if (i % 16 == 0 || (i <= 16 && i > 0) || (i > 240 && i <= 256) || (i - 1) % 16 == 0) {\r\n      div.classList.add('border');\r\n      div.style.backgroundColor = 'orange';\r\n      div.slot = i - 1;\r\n    } else div.classList.add('inside');\r\n    gameboard.appendChild(div);\r\n  };\r\n  const inside = Array.from(document.querySelectorAll('.inside'));\r\n  inside.forEach((grid) => {\r\n    if (inside[inside.indexOf(grid) - 1] == undefined) {\r\n      grid.slot = 0;\r\n    } else {\r\n      grid.slot = Number(inside[inside.indexOf(grid) - 1].slot) + 1;\r\n    }\r\n  })\r\n\r\n  const grids = Array.from(gameboard.children);\r\n\r\n  const startBtn = document.querySelector('#start');\r\n  startBtn.addEventListener('click', () => _engine__WEBPACK_IMPORTED_MODULE_0__[\"default\"].startGame(grids));\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultLoad);\n\n//# sourceURL=webpack://snake-game/./src/components/defaultLoad.js?");

/***/ }),

/***/ "./src/components/engine.js":
/*!**********************************!*\
  !*** ./src/components/engine.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst e = () => {\r\n  let snake = [{num: 97, dir: 'right'}, {num: 98, dir: 'right'}, {num: 99, dir: 'right'}, {num: 100, dir: 'right'}, {num: 101, dir: 'right'}, {num: 102, dir: 'right'}, {num: 103, dir: 'right'}];\r\n\r\n  let direction = 'right';\r\n  let prevDirection = 'up';\r\n\r\n  const apple = document.createElement('img');\r\n  apple.src = './apple-icon.svg';\r\n  apple.setAttribute('id', 'apple');\r\n\r\n\r\n  const tossApple = () => {\r\n    const inside = Array.from(document.querySelectorAll('.inside'));\r\n    let num = parseInt(Math.random() * 196)\r\n    if (snake.every(piece => piece.num != num)) {\r\n      apple.slot = num;\r\n      inside[num].appendChild(apple);\r\n      return\r\n    } else {\r\n      console.log('new apple!');\r\n      tossApple();\r\n      return\r\n    };\r\n  };\r\n\r\n  const foundApple = (grids) => {\r\n    let num = snake[0].num;\r\n    let dir = snake[0].dir;\r\n    switch(dir) {\r\n      case 'up':\r\n        num = num + 16;\r\n        break;\r\n        \r\n      case 'right':\r\n        num--;\r\n        break;\r\n        \r\n      case 'down':\r\n        num = num - 16;\r\n        break;\r\n        \r\n      case 'left':\r\n        num++;\r\n        break;\r\n    };\r\n    grids[num].style.backgroundColor = 'black';\r\n    snake.unshift({num: num, dir: dir});\r\n  };\r\n\r\n  const startGame = (grids) => {\r\n    window.addEventListener('keydown', switchDirection);\r\n    const borderGrids = Array.from(document.querySelectorAll('.border'));\r\n    const inside = Array.from(document.querySelectorAll('.inside'));\r\n\r\n    snake.forEach(piece => {\r\n      grids[piece.num].style.backgroundColor = 'black';\r\n      grids[snake[snake.length - 1].num].style.backgroundColor = 'red';\r\n    });\r\n\r\n    tossApple();\r\n\r\n    let move = setInterval(() => {\r\n\r\n      grids.forEach(grid => grid.style.backgroundColor = '');\r\n      borderGrids.forEach(grid => grid.style.backgroundColor = 'orange');\r\n\r\n      snake[snake.length - 1].dir = direction;\r\n\r\n      snake.forEach(piece => {\r\n\r\n        switch(piece.dir) {\r\n          case 'left':\r\n            piece.num--;\r\n            if (piece == snake[snake.length - 1]) {\r\n              let appleGrid = grids[snake[snake.length - 1].num];\r\n        \r\n              if (inside[apple.slot] == appleGrid) {\r\n                tossApple(grids);\r\n                foundApple(grids);\r\n              };\r\n              \r\n              if (borderGrids.some(grid => grid.slot == piece.num)) {\r\n                clearInterval(move);\r\n                console.log('you lost');\r\n              };\r\n            };\r\n            break;\r\n            \r\n          case 'up':\r\n            piece.num = piece.num - 16;\r\n            if (piece == snake[snake.length - 1]) {\r\n              let appleGrid = grids[snake[snake.length - 1].num];\r\n        \r\n              if (inside[apple.slot] == appleGrid) {\r\n                tossApple(grids);\r\n                foundApple(grids);\r\n              };\r\n              \r\n              if (borderGrids.some(grid => grid.slot == piece.num)) {\r\n                clearInterval(move);\r\n                console.log('you lost');\r\n              };\r\n            };\r\n            break;\r\n            \r\n          case 'right':\r\n            piece.num++;\r\n            if (piece == snake[snake.length - 1]) {\r\n              let appleGrid = grids[snake[snake.length - 1].num];\r\n        \r\n              if (inside[apple.slot] == appleGrid) {\r\n                tossApple(grids);\r\n                foundApple(grids);\r\n              };\r\n              \r\n              if (borderGrids.some(grid => grid.slot == piece.num)) {\r\n                clearInterval(move);\r\n                console.log('you lost');\r\n              };\r\n            };\r\n            break;\r\n            \r\n          case 'down':\r\n            piece.num = piece.num + 16;\r\n            if (piece == snake[snake.length - 1]) {\r\n              let appleGrid = grids[snake[snake.length - 1].num];\r\n        \r\n              if (inside[apple.slot] == appleGrid) {\r\n                tossApple(grids);\r\n                foundApple(grids);\r\n              };\r\n\r\n              if (borderGrids.some(grid => grid.slot == piece.num)) {\r\n                clearInterval(move);\r\n                console.log('you lost');\r\n              };\r\n            };\r\n            break;\r\n        }\r\n\r\n        grids[piece.num].style.backgroundColor = 'black';\r\n\r\n        let index = snake.indexOf(piece);\r\n\r\n        if (piece != snake[snake.length - 1]) {\r\n          piece.dir = snake[index + 1].dir;\r\n        };\r\n      });\r\n\r\n      grids[snake[snake.length - 1].num].style.backgroundColor = 'red';\r\n      prevDirection = direction;\r\n    }, 100);\r\n  };\r\n\r\n  const switchDirection = (e) => {\r\n    if ((prevDirection === 'down' || prevDirection === 'up') && e.keyCode === 37) {\r\n      direction = 'left';\r\n    }\r\n    \r\n    if ((prevDirection === 'down' || prevDirection === 'up') && e.keyCode === 39) {\r\n      direction = 'right';\r\n    }\r\n    \r\n    if ((prevDirection === 'left' || prevDirection === 'right') && e.keyCode === 38) {\r\n      direction = 'up';\r\n    }\r\n    \r\n    if ((prevDirection === 'left' || prevDirection === 'right') && e.keyCode === 40) {\r\n      direction = 'down';\r\n    }\r\n  };\r\n\r\n  return {\r\n    startGame\r\n  }\r\n};\r\n\r\nconst engine = e();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (engine);\n\n//# sourceURL=webpack://snake-game/./src/components/engine.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_defaultLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/defaultLoad */ \"./src/components/defaultLoad.js\");\n/* harmony import */ var _components_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/engine */ \"./src/components/engine.js\");\n\r\n\r\n\r\nwindow.addEventListener('load', _components_defaultLoad__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://snake-game/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;