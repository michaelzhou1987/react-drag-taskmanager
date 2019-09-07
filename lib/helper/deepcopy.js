"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function deepcopy(target) {
  var result = null;

  if (_typeof(target) === 'object') {
    if (target instanceof Array) {
      result = [];
    } else {
      result = {};
    }

    for (var i in target) {
      result[i] = deepcopy(target[i]);
    }
  } else {
    result = target;
  }

  return result;
}

var _default = deepcopy;
exports["default"] = _default;