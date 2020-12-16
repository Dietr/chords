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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/focus-visible/dist/focus-visible.js":
/*!**********************************************************!*\
  !*** ./node_modules/focus-visible/dist/focus-visible.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function (global, factory) {\n   true ? factory() :\n  undefined;\n}(this, (function () { 'use strict';\n\n  /**\n   * Applies the :focus-visible polyfill at the given scope.\n   * A scope in this case is either the top-level Document or a Shadow Root.\n   *\n   * @param {(Document|ShadowRoot)} scope\n   * @see https://github.com/WICG/focus-visible\n   */\n  function applyFocusVisiblePolyfill(scope) {\n    var hadKeyboardEvent = true;\n    var hadFocusVisibleRecently = false;\n    var hadFocusVisibleRecentlyTimeout = null;\n\n    var inputTypesAllowlist = {\n      text: true,\n      search: true,\n      url: true,\n      tel: true,\n      email: true,\n      password: true,\n      number: true,\n      date: true,\n      month: true,\n      week: true,\n      time: true,\n      datetime: true,\n      'datetime-local': true\n    };\n\n    /**\n     * Helper function for legacy browsers and iframes which sometimes focus\n     * elements like document, body, and non-interactive SVG.\n     * @param {Element} el\n     */\n    function isValidFocusTarget(el) {\n      if (\n        el &&\n        el !== document &&\n        el.nodeName !== 'HTML' &&\n        el.nodeName !== 'BODY' &&\n        'classList' in el &&\n        'contains' in el.classList\n      ) {\n        return true;\n      }\n      return false;\n    }\n\n    /**\n     * Computes whether the given element should automatically trigger the\n     * `focus-visible` class being added, i.e. whether it should always match\n     * `:focus-visible` when focused.\n     * @param {Element} el\n     * @return {boolean}\n     */\n    function focusTriggersKeyboardModality(el) {\n      var type = el.type;\n      var tagName = el.tagName;\n\n      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {\n        return true;\n      }\n\n      if (tagName === 'TEXTAREA' && !el.readOnly) {\n        return true;\n      }\n\n      if (el.isContentEditable) {\n        return true;\n      }\n\n      return false;\n    }\n\n    /**\n     * Add the `focus-visible` class to the given element if it was not added by\n     * the author.\n     * @param {Element} el\n     */\n    function addFocusVisibleClass(el) {\n      if (el.classList.contains('focus-visible')) {\n        return;\n      }\n      el.classList.add('focus-visible');\n      el.setAttribute('data-focus-visible-added', '');\n    }\n\n    /**\n     * Remove the `focus-visible` class from the given element if it was not\n     * originally added by the author.\n     * @param {Element} el\n     */\n    function removeFocusVisibleClass(el) {\n      if (!el.hasAttribute('data-focus-visible-added')) {\n        return;\n      }\n      el.classList.remove('focus-visible');\n      el.removeAttribute('data-focus-visible-added');\n    }\n\n    /**\n     * If the most recent user interaction was via the keyboard;\n     * and the key press did not include a meta, alt/option, or control key;\n     * then the modality is keyboard. Otherwise, the modality is not keyboard.\n     * Apply `focus-visible` to any current active element and keep track\n     * of our keyboard modality state with `hadKeyboardEvent`.\n     * @param {KeyboardEvent} e\n     */\n    function onKeyDown(e) {\n      if (e.metaKey || e.altKey || e.ctrlKey) {\n        return;\n      }\n\n      if (isValidFocusTarget(scope.activeElement)) {\n        addFocusVisibleClass(scope.activeElement);\n      }\n\n      hadKeyboardEvent = true;\n    }\n\n    /**\n     * If at any point a user clicks with a pointing device, ensure that we change\n     * the modality away from keyboard.\n     * This avoids the situation where a user presses a key on an already focused\n     * element, and then clicks on a different element, focusing it with a\n     * pointing device, while we still think we're in keyboard modality.\n     * @param {Event} e\n     */\n    function onPointerDown(e) {\n      hadKeyboardEvent = false;\n    }\n\n    /**\n     * On `focus`, add the `focus-visible` class to the target if:\n     * - the target received focus as a result of keyboard navigation, or\n     * - the event target is an element that will likely require interaction\n     *   via the keyboard (e.g. a text box)\n     * @param {Event} e\n     */\n    function onFocus(e) {\n      // Prevent IE from focusing the document or HTML element.\n      if (!isValidFocusTarget(e.target)) {\n        return;\n      }\n\n      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {\n        addFocusVisibleClass(e.target);\n      }\n    }\n\n    /**\n     * On `blur`, remove the `focus-visible` class from the target.\n     * @param {Event} e\n     */\n    function onBlur(e) {\n      if (!isValidFocusTarget(e.target)) {\n        return;\n      }\n\n      if (\n        e.target.classList.contains('focus-visible') ||\n        e.target.hasAttribute('data-focus-visible-added')\n      ) {\n        // To detect a tab/window switch, we look for a blur event followed\n        // rapidly by a visibility change.\n        // If we don't see a visibility change within 100ms, it's probably a\n        // regular focus change.\n        hadFocusVisibleRecently = true;\n        window.clearTimeout(hadFocusVisibleRecentlyTimeout);\n        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {\n          hadFocusVisibleRecently = false;\n        }, 100);\n        removeFocusVisibleClass(e.target);\n      }\n    }\n\n    /**\n     * If the user changes tabs, keep track of whether or not the previously\n     * focused element had .focus-visible.\n     * @param {Event} e\n     */\n    function onVisibilityChange(e) {\n      if (document.visibilityState === 'hidden') {\n        // If the tab becomes active again, the browser will handle calling focus\n        // on the element (Safari actually calls it twice).\n        // If this tab change caused a blur on an element with focus-visible,\n        // re-apply the class when the user switches back to the tab.\n        if (hadFocusVisibleRecently) {\n          hadKeyboardEvent = true;\n        }\n        addInitialPointerMoveListeners();\n      }\n    }\n\n    /**\n     * Add a group of listeners to detect usage of any pointing devices.\n     * These listeners will be added when the polyfill first loads, and anytime\n     * the window is blurred, so that they are active when the window regains\n     * focus.\n     */\n    function addInitialPointerMoveListeners() {\n      document.addEventListener('mousemove', onInitialPointerMove);\n      document.addEventListener('mousedown', onInitialPointerMove);\n      document.addEventListener('mouseup', onInitialPointerMove);\n      document.addEventListener('pointermove', onInitialPointerMove);\n      document.addEventListener('pointerdown', onInitialPointerMove);\n      document.addEventListener('pointerup', onInitialPointerMove);\n      document.addEventListener('touchmove', onInitialPointerMove);\n      document.addEventListener('touchstart', onInitialPointerMove);\n      document.addEventListener('touchend', onInitialPointerMove);\n    }\n\n    function removeInitialPointerMoveListeners() {\n      document.removeEventListener('mousemove', onInitialPointerMove);\n      document.removeEventListener('mousedown', onInitialPointerMove);\n      document.removeEventListener('mouseup', onInitialPointerMove);\n      document.removeEventListener('pointermove', onInitialPointerMove);\n      document.removeEventListener('pointerdown', onInitialPointerMove);\n      document.removeEventListener('pointerup', onInitialPointerMove);\n      document.removeEventListener('touchmove', onInitialPointerMove);\n      document.removeEventListener('touchstart', onInitialPointerMove);\n      document.removeEventListener('touchend', onInitialPointerMove);\n    }\n\n    /**\n     * When the polfyill first loads, assume the user is in keyboard modality.\n     * If any event is received from a pointing device (e.g. mouse, pointer,\n     * touch), turn off keyboard modality.\n     * This accounts for situations where focus enters the page from the URL bar.\n     * @param {Event} e\n     */\n    function onInitialPointerMove(e) {\n      // Work around a Safari quirk that fires a mousemove on <html> whenever the\n      // window blurs, even if you're tabbing out of the page. ¯\\_(ツ)_/¯\n      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {\n        return;\n      }\n\n      hadKeyboardEvent = false;\n      removeInitialPointerMoveListeners();\n    }\n\n    // For some kinds of state, we are interested in changes at the global scope\n    // only. For example, global pointer input, global key presses and global\n    // visibility change should affect the state at every scope:\n    document.addEventListener('keydown', onKeyDown, true);\n    document.addEventListener('mousedown', onPointerDown, true);\n    document.addEventListener('pointerdown', onPointerDown, true);\n    document.addEventListener('touchstart', onPointerDown, true);\n    document.addEventListener('visibilitychange', onVisibilityChange, true);\n\n    addInitialPointerMoveListeners();\n\n    // For focus and blur, we specifically care about state changes in the local\n    // scope. This is because focus / blur events that originate from within a\n    // shadow root are not re-dispatched from the host element if it was already\n    // the active element in its own scope:\n    scope.addEventListener('focus', onFocus, true);\n    scope.addEventListener('blur', onBlur, true);\n\n    // We detect that a node is a ShadowRoot by ensuring that it is a\n    // DocumentFragment and also has a host property. This check covers native\n    // implementation and polyfill implementation transparently. If we only cared\n    // about the native implementation, we could just check if the scope was\n    // an instance of a ShadowRoot.\n    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {\n      // Since a ShadowRoot is a special kind of DocumentFragment, it does not\n      // have a root element to add a class to. So, we add this attribute to the\n      // host element instead:\n      scope.host.setAttribute('data-js-focus-visible', '');\n    } else if (scope.nodeType === Node.DOCUMENT_NODE) {\n      document.documentElement.classList.add('js-focus-visible');\n      document.documentElement.setAttribute('data-js-focus-visible', '');\n    }\n  }\n\n  // It is important to wrap all references to global window and document in\n  // these checks to support server-side rendering use cases\n  // @see https://github.com/WICG/focus-visible/issues/199\n  if (typeof window !== 'undefined' && typeof document !== 'undefined') {\n    // Make the polyfill helper globally available. This can be used as a signal\n    // to interested libraries that wish to coordinate with the polyfill for e.g.,\n    // applying the polyfill to a shadow root:\n    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;\n\n    // Notify interested libraries of the polyfill's presence, in case the\n    // polyfill was loaded lazily:\n    var event;\n\n    try {\n      event = new CustomEvent('focus-visible-polyfill-ready');\n    } catch (error) {\n      // IE11 does not support using CustomEvent as a constructor directly:\n      event = document.createEvent('CustomEvent');\n      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});\n    }\n\n    window.dispatchEvent(event);\n  }\n\n  if (typeof document !== 'undefined') {\n    // Apply the polyfill to the global document, so that no JavaScript\n    // coordination is required to use the polyfill in the top-level document:\n    applyFocusVisiblePolyfill(document);\n  }\n\n})));\n\n\n//# sourceURL=webpack:///./node_modules/focus-visible/dist/focus-visible.js?");

/***/ }),

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-visible */ \"./node_modules/focus-visible/dist/focus-visible.js\");\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_visible__WEBPACK_IMPORTED_MODULE_0__);\n\nwindow.addEventListener('load', function () {\n  // SERVICE WORKER\n  if ('serviceWorker' in navigator) {\n    navigator.serviceWorker.register('/service-worker.js');\n  } // THEME SWITCH\n\n\n  var STORAGE_KEY = 'user-color-scheme';\n  var COLOR_MODE_KEY = '--color-mode';\n  var modeToggleButton = document.querySelector('.js-mode-toggle');\n  var modeToggleText = document.querySelector('.js-mode-toggle-text');\n  var modeStatusElement = document.querySelector('.js-mode-status');\n  /**\n   * Pass in a custom prop key and this function will return its\n   * computed value.\n   * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/\n   */\n\n  var getCSSCustomProp = function getCSSCustomProp(propKey) {\n    var response = getComputedStyle(document.documentElement).getPropertyValue(propKey); // Tidy up the string if there’s something to work with\n\n    if (response.length) {\n      response = response.replace(/\\'|\"/g, '').trim();\n    } // Return the string response by default\n\n\n    return response;\n  };\n  /**\n   * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.\n   * If it can’t find the setting in either, it tries to load the CSS color mode,\n   * controlled by the media query\n   */\n\n\n  var applySetting = function applySetting(passedSetting) {\n    var currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);\n\n    if (currentSetting) {\n      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);\n      setButtonLabelAndStatus(currentSetting);\n    } else {\n      setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));\n    }\n  };\n  /**\n   * Get’s the current setting > reverses it > stores it\n   */\n\n\n  var toggleSetting = function toggleSetting() {\n    var currentSetting = localStorage.getItem(STORAGE_KEY);\n\n    switch (currentSetting) {\n      case null:\n        currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';\n        break;\n\n      case 'light':\n        currentSetting = 'dark';\n        break;\n\n      case 'dark':\n        currentSetting = 'light';\n        break;\n    }\n\n    localStorage.setItem(STORAGE_KEY, currentSetting);\n    return currentSetting;\n  };\n  /**\n   * A shared method for setting the button text label and visually hidden status element\n   */\n\n\n  var setButtonLabelAndStatus = function setButtonLabelAndStatus(currentSetting) {\n    modeToggleText.innerText = \"\".concat(currentSetting === 'dark' ? 'Light' : 'Dark', \" mode\");\n    modeStatusElement.innerText = \"Color mode is now \\\"\".concat(currentSetting, \"\\\"\");\n  };\n  /**\n   * Clicking the button runs the apply setting method which grabs its parameter\n   * from the toggle setting method.\n   */\n\n\n  modeToggleButton.addEventListener('click', function (evt) {\n    evt.preventDefault();\n    applySetting(toggleSetting());\n  });\n  applySetting(); // RETAIN SCROLL HISTORY\n\n  if ('scrollRestoration' in history) {\n    history.scrollRestoration = 'manual';\n  } // add lazyload attribute to single post images\n\n\n  var singlePostImgs = document.querySelectorAll('.single-post .post img');\n\n  if (singlePostImgs) {\n    for (var i = 0; i < singlePostImgs.length; i++) {\n      singlePostImgs[i].setAttribute('loading', 'lazy');\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/assets/js/main.js?");

/***/ })

/******/ });