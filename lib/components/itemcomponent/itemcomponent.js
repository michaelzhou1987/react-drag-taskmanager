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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2l0ZW1jb21wb25lbnQvaXRlbWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJJdGVtY29tcG9uZW50IiwicHJvcHMiLCJzdGF0ZSIsImZyYW1lU3R5bGUiLCJ0cmFuc2xhdGVYIiwidHJhbnNsYXRlWSIsIm1vdmluZyIsImxhc3RYIiwibGFzdFkiLCJ0IiwiaW5kZXgiLCJwYXJlbnRJbmRleCIsIm1pZGRsZVgiLCJtaWRkbGVZIiwicmVmcyIsIm9mZnNldExlZnQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldFRvcCIsIm9mZnNldEhlaWdodCIsImVycm9yIiwiY29uc29sZSIsImluaXQiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiYnV0dG9uIiwiRGF0ZSIsImNsaWVudFgiLCJjbGllbnRZIiwibW91c2VEb3duU3R5bGUiLCJjdXJzb3IiLCJ1c2VyU2VsZWN0IiwiYmFja2dyb3VuZCIsInRyYW5zZm9ybSIsImJveFNpemluZyIsImJvcmRlciIsIm9wYWNpdHkiLCJzZXRTdGF0ZSIsImhhbmRsZU1vdXNlTW92ZSIsImR4IiwiZHkiLCJuZXdYIiwibmV3WSIsIm5ld01pZGRsZVgiLCJuZXdNaWRkbGVZIiwidXBkYXRlIiwieCIsInkiLCJoYW5kbGVNb3VzZVVwIiwibW91c2VVcFN0eWxlIiwidG9wWSIsInRlbXBUcmFuc2xhdGVZIiwiYm90dG9tWSIsIndpbmRvdyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpdGVtTW92ZUVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVNb3VzZURvd24iLCJpdGVtU3R5bGUiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsYTs7Ozs7QUFDSix5QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQix1RkFBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFB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QVd5RCxRQURkLENBUkYsQ0FERjtBQWNEOzs7O0VBNUx5QkMsZ0I7O2VBaU1iM0QsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vaXRlbWNvbXBvbmVudC5jc3MnO1xuXG5jbGFzcyBJdGVtY29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZyYW1lU3R5bGU6IHt9LFxuICAgICAgdHJhbnNsYXRlWDogMCxcbiAgICAgIHRyYW5zbGF0ZVk6IDBcbiAgICB9O1xuICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0WCA9IG51bGw7XG4gICAgdGhpcy5sYXN0WSA9IG51bGw7XG4gICAgdGhpcy50ID0gbnVsbDtcbiAgICB0aGlzLmluZGV4ID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudEluZGV4ID0gbnVsbDtcbiAgICB0aGlzLm1pZGRsZVggPSBudWxsO1xuICAgIHRoaXMubWlkZGxlWSA9IG51bGw7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5taWRkbGVYID1cbiAgICAgICAgdGhpcy5yZWZzWydjb21wb25lbnQtd3JhcHBlciddLm9mZnNldExlZnQgK1xuICAgICAgICB0aGlzLnJlZnNbJ2NvbXBvbmVudC13cmFwcGVyJ10ub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgdGhpcy5taWRkbGVZID1cbiAgICAgICAgdGhpcy5yZWZzWydjb21wb25lbnQtd3JhcHBlciddLm9mZnNldFRvcCArXG4gICAgICAgIHRoaXMucmVmc1snY29tcG9uZW50LXdyYXBwZXInXS5vZmZzZXRIZWlnaHQgLyAyO1xuICAgICAgdGhpcy5pbmRleCA9IHRoaXMucHJvcHMuaW5kZXg7XG4gICAgICB0aGlzLnBhcmVudEluZGV4ID0gdGhpcy5wcm9wcy5wYXJlbnRJbmRleDtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucHJvcHMuaW5pdChcbiAgICAgICAge1xuICAgICAgICAgIG9mZnNldFRvcDogdGhpcy5yZWZzWydjb21wb25lbnQtd3JhcHBlciddLm9mZnNldFRvcCxcbiAgICAgICAgICBvZmZzZXRIZWlnaHQ6IHRoaXMucmVmc1snY29tcG9uZW50LXdyYXBwZXInXS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgcGFyZW50SW5kZXg6IHRoaXMucGFyZW50SW5kZXhcbiAgICAgICAgfSxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbmRleCA9IHRoaXMucHJvcHMuaW5kZXg7XG4gICAgICB0aGlzLnBhcmVudEluZGV4ID0gdGhpcy5wcm9wcy5wYXJlbnRJbmRleDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgdGhpcy50ID0gK25ldyBEYXRlKCk7XG4gICAgdGhpcy5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICB0aGlzLmxhc3RZID0gZS5jbGllbnRZO1xuXG4gICAgY29uc3QgbW91c2VEb3duU3R5bGUgPSB7XG4gICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgIGJhY2tncm91bmQ6ICcjY2NjJyxcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3RoaXMuc3RhdGUudHJhbnNsYXRlWH1weCwgJHt0aGlzLnN0YXRlLnRyYW5zbGF0ZVl9cHgpYCxcbiAgICAgIGJveFNpemluZzogJ2JvcmRlcmJveCcsXG4gICAgICBib3JkZXI6ICcxcHggZGFzaGVkICMwMDAnLFxuICAgICAgb3BhY2l0eTogJzAuMidcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZnJhbWVTdHlsZTogbW91c2VEb3duU3R5bGVcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IGUgPT4ge1xuICAgICAgbGV0IHQgPSArbmV3IERhdGUoKTtcbiAgICAgIGlmICh0IC0gdGhpcy50IDwgMTYpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy50ID0gdDtcbiAgICAgIGxldCBkeCA9IGUuY2xpZW50WCAtIHRoaXMubGFzdFg7XG4gICAgICBsZXQgZHkgPSBlLmNsaWVudFkgLSB0aGlzLmxhc3RZO1xuICAgICAgbGV0IG5ld1ggPSB0aGlzLnN0YXRlLnRyYW5zbGF0ZVggKyBkeDtcbiAgICAgIGxldCBuZXdZID0gdGhpcy5zdGF0ZS50cmFuc2xhdGVZICsgZHk7XG4gICAgICBsZXQgbmV3TWlkZGxlWCA9IGR4ICsgdGhpcy5taWRkbGVYO1xuICAgICAgbGV0IG5ld01pZGRsZVkgPSBkeSArIHRoaXMubWlkZGxlWTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHRyYW5zbGF0ZVg6IG5ld1gsXG4gICAgICAgICAgdHJhbnNsYXRlWTogbmV3WSxcbiAgICAgICAgICBmcmFtZVN0eWxlOiB7XG4gICAgICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke25ld1h9cHgsICR7bmV3WX1weClgLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNjY2MnLFxuICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyYm94JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBkYXNoZWQgIzAwMCcsXG4gICAgICAgICAgICBvcGFjaXR5OiAnMC4yJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubGFzdFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgdGhpcy5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICB0aGlzLm1pZGRsZVggPSBuZXdNaWRkbGVYO1xuICAgICAgICAgIHRoaXMubWlkZGxlWSA9IG5ld01pZGRsZVk7XG4gICAgICAgICAgdGhpcy5wcm9wcy51cGRhdGUoe1xuICAgICAgICAgICAgeDogbmV3TWlkZGxlWCxcbiAgICAgICAgICAgIHk6IG5ld01pZGRsZVlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgIHRoaXMubGFzdFggPSBudWxsO1xuICAgICAgdGhpcy5sYXN0WSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IG1vdXNlVXBTdHlsZSA9IHtcbiAgICAgICAgLy8gdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7dGhpcy5zdGF0ZS50cmFuc2xhdGVYfXB4LCAke3RoaXMuc3RhdGUudHJhbnNsYXRlWX1weClgXG4gICAgICB9O1xuXG4gICAgICAvLyB0cnkge1xuICAgICAgLy8gICB0aGlzLnByb3BzLnVwZGF0ZVBvc2l0aW9uKHtcbiAgICAgIC8vICAgICBvZmZzZXRUb3A6IHRoaXMucmVmc1snY29tcG9uZW50LXdyYXBwZXInXS5vZmZzZXRUb3AsXG4gICAgICAvLyAgICAgb2Zmc2V0SGVpZ2h0OiB0aGlzLnJlZnNbJ2NvbXBvbmVudC13cmFwcGVyJ10ub2Zmc2V0SGVpZ2h0LFxuICAgICAgLy8gICAgIHRyYW5zbGF0ZVk6IHRoaXMuc3RhdGUudHJhbnNsYXRlWSxcbiAgICAgIC8vICAgICBpbmRleDogdGhpcy5pbmRleFxuICAgICAgLy8gICB9KTtcbiAgICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgLy8gfVxuXG4gICAgICBsZXQgdG9wWSA9XG4gICAgICAgIHRoaXMucmVmc1snY29tcG9uZW50LXdyYXBwZXInXS5vZmZzZXRUb3AgKyB0aGlzLnN0YXRlLnRyYW5zbGF0ZVk7XG4gICAgICBsZXQgdGVtcFRyYW5zbGF0ZVkgPSB0aGlzLnN0YXRlLnRyYW5zbGF0ZVk7XG4gICAgICBsZXQgYm90dG9tWSA9XG4gICAgICAgIHRoaXMucmVmc1snY29tcG9uZW50LXdyYXBwZXInXS5vZmZzZXRUb3AgK1xuICAgICAgICB0aGlzLnJlZnNbJ2NvbXBvbmVudC13cmFwcGVyJ10ub2Zmc2V0SGVpZ2h0ICtcbiAgICAgICAgdGhpcy5zdGF0ZS50cmFuc2xhdGVZO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIGZyYW1lU3R5bGU6IG1vdXNlVXBTdHlsZSxcbiAgICAgICAgICB0cmFuc2xhdGVYOiAwLFxuICAgICAgICAgIHRyYW5zbGF0ZVk6IDBcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1Nb3ZlRW5kKHtcbiAgICAgICAgICB4OiB0aGlzLm1pZGRsZVgsXG4gICAgICAgICAgeTogdG9wWSxcbiAgICAgICAgICBib3R0b21ZOiBib3R0b21ZLFxuICAgICAgICAgIHRyYW5zbGF0ZVk6IHRlbXBUcmFuc2xhdGVZLFxuICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICAgIHBhcmVudEluZGV4OiB0aGlzLnBhcmVudEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9XCJjb21wb25lbnQtd3JhcHBlclwiXG4gICAgICAgIGNsYXNzTmFtZT1cImRyYWdhYmxlLWNvbXBvbmVudFwiXG4gICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLmZyYW1lU3R5bGV9XG4gICAgICAgIG9uTW91c2VEb3duPXtlID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihlKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLWNvbXBvbmVudFwiIHN0eWxlPXt0aGlzLnByb3BzLml0ZW1TdHlsZX0+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgSXRlbWNvbXBvbmVudDtcbiJdfQ==