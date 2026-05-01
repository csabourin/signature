/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

// App init
var app = new Vue({
  el: '#app',
    data: {
      name:   "John Smith",
      certification:   "BA, MSC, etc",
      pronounEn: "he/him, she/her, they/them, etc.",
      pronounFr: "il, elle, iel, etc.",
      deviceName: "FAX / Télécopieur",
      deviceNum: "613-123-1234",
      ext:    "5555",
      cell:   "613-123-1234",
      email:  "john.smith@ncc-ccn.ca",
      roleEn: "Job Title",
      roleFr: "Titre du poste",
      displayOrder: false
    }
});
// Copy to clipboard
var signatureCopy = new Clipboard('.copybutton'),    
success = document.getElementById('success');
// Success message
signatureCopy.on('success', function(e) {  e.clearSelection();  fadeIn(success);  setTimeout(function() {    fadeOut(success);  }, 7000);});
// Fade In
function fadeIn(element) {  var op = 0.1;  
// initial opacity  
element.style.display = 'block';  
var timer = setInterval(function () {    
  if (op >= 1){        
    clearInterval(timer);    
  }    
  element.style.opacity = op;    
  element.style.filter = 'alpha(opacity=' + op * 100 + ")";    
  op += op * 0.1;  }, 10);
}
// Fade Out
function fadeOut(element) {  
  var op = 1;  
  // initial opacity  
  var timer = setInterval(function () {    
  if (op <= 0.1){        
    clearInterval(timer);        
    element.style.display = 'none';    
  }    
  element.style.opacity = op;    
  element.style.filter = 'alpha(opacity=' + op * 100 + ")";   
  op -= op * 0.1;  
}, 50);}

/***/ }
/******/ ]);
