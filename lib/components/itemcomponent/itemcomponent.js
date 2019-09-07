"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./itemcomponent.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Itemcomponent =
/*#__PURE__*/
function (_Component) {
  _inherits(Itemcomponent, _Component);

  function Itemcomponent(props) {
    var _this;

    _classCallCheck(this, Itemcomponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Itemcomponent).call(this, props));
    _this.state = {
      frameStyle: {},
      translateX: 0,
      translateY: 0
    };
    _this.moving = false;
    _this.lastX = null;
    _this.lastY = null;
    _this.t = null;
    _this.index = null;
    _this.parentIndex = null;
    _this.middleX = null;
    _this.middleY = null;
    return _this;
  }

  _createClass(Itemcomponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        this.middleX = this.refs['component-wrapper'].offsetLeft + this.refs['component-wrapper'].offsetWidth / 2;
        this.middleY = this.refs['component-wrapper'].offsetTop + this.refs['component-wrapper'].offsetHeight / 2;
        this.index = this.props.index;
        this.parentIndex = this.props.parentIndex;
      } catch (error) {
        console.error(error);
      }

      try {
        this.props.init({
          offsetTop: this.refs['component-wrapper'].offsetTop,
          offsetHeight: this.refs['component-wrapper'].offsetHeight,
          index: this.index,
          parentIndex: this.parentIndex
        }, this);
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      try {
        this.index = this.props.index;
        this.parentIndex = this.props.parentIndex;
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      var _this2 = this;

      e.stopPropagation();

      if (e.button !== 0) {
        return;
      }

      this.moving = true;
      this.t = +new Date();
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      var mouseDownStyle = {
        cursor: 'move',
        userSelect: 'none',
        background: '#ccc',
        transform: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)"),
        boxSizing: 'borderbox',
        border: '1px dashed #000',
        opacity: '0.2'
      };
      this.setState({
        frameStyle: mouseDownStyle
      });

      var handleMouseMove = function handleMouseMove(e) {
        var t = +new Date();

        if (t - _this2.t < 16) {
          return;
        }

        _this2.t = t;
        var dx = e.clientX - _this2.lastX;
        var dy = e.clientY - _this2.lastY;
        var newX = _this2.state.translateX + dx;
        var newY = _this2.state.translateY + dy;
        var newMiddleX = dx + _this2.middleX;
        var newMiddleY = dy + _this2.middleY;

        _this2.setState({
          translateX: newX,
          translateY: newY,
          frameStyle: {
            cursor: 'move',
            transform: "translate(".concat(newX, "px, ").concat(newY, "px)"),
            background: '#ccc',
            boxSizing: 'borderbox',
            border: '1px dashed #000',
            opacity: '0.2'
          }
        }, function () {
          _this2.lastX = e.clientX;
          _this2.lastY = e.clientY;
          _this2.middleX = newMiddleX;
          _this2.middleY = newMiddleY;

          _this2.props.update({
            x: newMiddleX,
            y: newMiddleY
          });
        });
      };

      var handleMouseUp = function handleMouseUp() {
        _this2.lastX = null;
        _this2.lastY = null;
        var mouseUpStyle = {// transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`
        }; // try {
        //   this.props.updatePosition({
        //     offsetTop: this.refs['component-wrapper'].offsetTop,
        //     offsetHeight: this.refs['component-wrapper'].offsetHeight,
        //     translateY: this.state.translateY,
        //     index: this.index
        //   });
        // } catch (error) {
        //   console.error(error);
        // }

        var topY = _this2.refs['component-wrapper'].offsetTop + _this2.state.translateY;
        var tempTranslateY = _this2.state.translateY;
        var bottomY = _this2.refs['component-wrapper'].offsetTop + _this2.refs['component-wrapper'].offsetHeight + _this2.state.translateY;

        _this2.setState({
          frameStyle: mouseUpStyle,
          translateX: 0,
          translateY: 0
        });

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        try {
          _this2.props.itemMoveEnd({
            x: _this2.middleX,
            y: topY,
            bottomY: bottomY,
            translateY: tempTranslateY,
            index: _this2.index,
            parentIndex: _this2.parentIndex
          });
        } catch (error) {
          console.error(error);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement("div", {
        ref: "component-wrapper",
        className: "dragable-component",
        style: this.state.frameStyle,
        onMouseDown: function onMouseDown(e) {
          _this3.handleMouseDown(e);
        }
      }, _react["default"].createElement("div", {
        className: "item-component",
        style: this.props.itemStyle
      }, this.props.children));
    }
  }]);

  return Itemcomponent;
}(_react.Component);

var _default = Itemcomponent;
exports["default"] = _default;