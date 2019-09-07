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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXIvZGVlcGNvcHkuanMiXSwibmFtZXMiOlsiZGVlcGNvcHkiLCJ0YXJnZXQiLCJyZXN1bHQiLCJBcnJheSIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQ3hCLE1BQUlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLE1BQUcsUUFBT0QsTUFBUCxNQUFtQixRQUF0QixFQUFnQztBQUM5QixRQUFJQSxNQUFNLFlBQVlFLEtBQXRCLEVBQTZCO0FBQzNCRCxNQUFBQSxNQUFNLEdBQUcsRUFBVDtBQUNELEtBRkQsTUFFTztBQUNMQSxNQUFBQSxNQUFNLEdBQUcsRUFBVDtBQUNEOztBQUVELFNBQUksSUFBSUUsQ0FBUixJQUFhSCxNQUFiLEVBQXFCO0FBQ25CQyxNQUFBQSxNQUFNLENBQUNFLENBQUQsQ0FBTixHQUFZSixRQUFRLENBQUNDLE1BQU0sQ0FBQ0csQ0FBRCxDQUFQLENBQXBCO0FBQ0Q7QUFFRixHQVhELE1BV087QUFDTEYsSUFBQUEsTUFBTSxHQUFHRCxNQUFUO0FBQ0Q7O0FBRUQsU0FBT0MsTUFBUDtBQUVEOztlQUVjRixRIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZGVlcGNvcHkodGFyZ2V0KSB7XG4gIGxldCByZXN1bHQgPSBudWxsO1xuICBpZih0eXBlb2YodGFyZ2V0KSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB7fTtcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgaW4gdGFyZ2V0KSB7XG4gICAgICByZXN1bHRbaV0gPSBkZWVwY29weSh0YXJnZXRbaV0pXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdGFyZ2V0ICAgIFxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZXBjb3B5Il19