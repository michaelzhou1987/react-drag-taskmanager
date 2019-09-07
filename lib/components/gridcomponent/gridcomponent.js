"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./gridcomponent.css");

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

var Gridcomponent =
/*#__PURE__*/
function (_Component) {
  _inherits(Gridcomponent, _Component);

  function Gridcomponent(props) {
    var _this;

    _classCallCheck(this, Gridcomponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Gridcomponent).call(this, props));

    _this.toggleDropReady = function (rdyState) {
      _this.setState({
        dropRead: rdyState
      });
    };

    _this.state = {
      dropRead: false
    };
    _this.index = null;
    return _this;
  }

  _createClass(Gridcomponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.index = this.props.index;
      var positionInfo = {
        offsetLeft: this.refs['grid-component'].offsetLeft,
        offsetWidth: this.refs['grid-component'].offsetWidth,
        index: this.index
      };

      try {
        this.props.init(positionInfo, this); // console.log(this)
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.index = this.props.index;
      var positionInfo = {
        offsetLeft: this.refs['grid-component'].offsetLeft,
        offsetWidth: this.refs['grid-component'].offsetWidth,
        index: this.index
      };

      try {
        this.props.update(positionInfo, this);
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: 'grid-component' + "".concat(this.state.dropRead ? ' drop-ready-state' : ''),
        ref: "grid-component"
      }, this.props.children);
    }
  }]);

  return Gridcomponent;
}(_react.Component);

var _default = Gridcomponent;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2dyaWRjb21wb25lbnQvZ3JpZGNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJHcmlkY29tcG9uZW50IiwicHJvcHMiLCJ0b2dnbGVEcm9wUmVhZHkiLCJyZHlTdGF0ZSIsInNldFN0YXRlIiwiZHJvcFJlYWQiLCJzdGF0ZSIsImluZGV4IiwicG9zaXRpb25JbmZvIiwib2Zmc2V0TGVmdCIsInJlZnMiLCJvZmZzZXRXaWR0aCIsImluaXQiLCJlcnJvciIsImNvbnNvbGUiLCJ1cGRhdGUiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsYTs7Ozs7QUFDSix5QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQix1RkFBTUEsS0FBTjs7QUFEaUIsVUFRbkJDLGVBUm1CLEdBUUQsVUFBQUMsUUFBUSxFQUFJO0FBQzVCLFlBQUtDLFFBQUwsQ0FBYztBQUNaQyxRQUFBQSxRQUFRLEVBQUVGO0FBREUsT0FBZDtBQUdELEtBWmtCOztBQUVqQixVQUFLRyxLQUFMLEdBQWE7QUFDWEQsTUFBQUEsUUFBUSxFQUFFO0FBREMsS0FBYjtBQUdBLFVBQUtFLEtBQUwsR0FBYSxJQUFiO0FBTGlCO0FBTWxCOzs7O3dDQVFtQjtBQUNsQixXQUFLQSxLQUFMLEdBQWEsS0FBS04sS0FBTCxDQUFXTSxLQUF4QjtBQUNBLFVBQUlDLFlBQVksR0FBRztBQUNqQkMsUUFBQUEsVUFBVSxFQUFFLEtBQUtDLElBQUwsQ0FBVSxnQkFBVixFQUE0QkQsVUFEdkI7QUFFakJFLFFBQUFBLFdBQVcsRUFBRSxLQUFLRCxJQUFMLENBQVUsZ0JBQVYsRUFBNEJDLFdBRnhCO0FBR2pCSixRQUFBQSxLQUFLLEVBQUUsS0FBS0E7QUFISyxPQUFuQjs7QUFLQSxVQUFJO0FBQ0YsYUFBS04sS0FBTCxDQUFXVyxJQUFYLENBQWdCSixZQUFoQixFQUE4QixJQUE5QixFQURFLENBRUY7QUFDRCxPQUhELENBR0UsT0FBT0ssS0FBUCxFQUFjO0FBQ2RDLFFBQUFBLE9BQU8sQ0FBQ0QsS0FBUixDQUFjQSxLQUFkO0FBQ0Q7QUFDRjs7O3lDQUVvQjtBQUNuQixXQUFLTixLQUFMLEdBQWEsS0FBS04sS0FBTCxDQUFXTSxLQUF4QjtBQUNBLFVBQUlDLFlBQVksR0FBRztBQUNqQkMsUUFBQUEsVUFBVSxFQUFFLEtBQUtDLElBQUwsQ0FBVSxnQkFBVixFQUE0QkQsVUFEdkI7QUFFakJFLFFBQUFBLFdBQVcsRUFBRSxLQUFLRCxJQUFMLENBQVUsZ0JBQVYsRUFBNEJDLFdBRnhCO0FBR2pCSixRQUFBQSxLQUFLLEVBQUUsS0FBS0E7QUFISyxPQUFuQjs7QUFLQSxVQUFJO0FBQ0YsYUFBS04sS0FBTCxDQUFXYyxNQUFYLENBQWtCUCxZQUFsQixFQUFnQyxJQUFoQztBQUNELE9BRkQsQ0FFRSxPQUFPSyxLQUFQLEVBQWM7QUFDZEMsUUFBQUEsT0FBTyxDQUFDRCxLQUFSLENBQWNBLEtBQWQ7QUFDRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUssUUFBQSxTQUFTLEVBQUUsNkJBQXNCLEtBQUtQLEtBQUwsQ0FBV0QsUUFBWCxHQUFxQixtQkFBckIsR0FBMEMsRUFBaEUsQ0FBaEI7QUFBc0YsUUFBQSxHQUFHLEVBQUM7QUFBMUYsU0FDRyxLQUFLSixLQUFMLENBQVdlLFFBRGQsQ0FERjtBQUtEOzs7O0VBbER5QkMsZ0I7O2VBc0RiakIsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vZ3JpZGNvbXBvbmVudC5jc3MnXG5cbmNsYXNzIEdyaWRjb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcm9wUmVhZDogZmFsc2VcbiAgICB9XG4gICAgdGhpcy5pbmRleCA9IG51bGw7XG4gIH1cblxuICB0b2dnbGVEcm9wUmVhZHkgPSByZHlTdGF0ZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcm9wUmVhZDogcmR5U3RhdGVcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLnByb3BzLmluZGV4XG4gICAgbGV0IHBvc2l0aW9uSW5mbyA9IHtcbiAgICAgIG9mZnNldExlZnQ6IHRoaXMucmVmc1snZ3JpZC1jb21wb25lbnQnXS5vZmZzZXRMZWZ0LFxuICAgICAgb2Zmc2V0V2lkdGg6IHRoaXMucmVmc1snZ3JpZC1jb21wb25lbnQnXS5vZmZzZXRXaWR0aCxcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5wcm9wcy5pbml0KHBvc2l0aW9uSW5mbywgdGhpcyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIH1cbiAgfVxuICBcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLnByb3BzLmluZGV4O1xuICAgIGxldCBwb3NpdGlvbkluZm8gPSB7XG4gICAgICBvZmZzZXRMZWZ0OiB0aGlzLnJlZnNbJ2dyaWQtY29tcG9uZW50J10ub2Zmc2V0TGVmdCxcbiAgICAgIG9mZnNldFdpZHRoOiB0aGlzLnJlZnNbJ2dyaWQtY29tcG9uZW50J10ub2Zmc2V0V2lkdGgsXG4gICAgICBpbmRleDogdGhpcy5pbmRleFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucHJvcHMudXBkYXRlKHBvc2l0aW9uSW5mbywgdGhpcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydncmlkLWNvbXBvbmVudCcgKyBgJHt0aGlzLnN0YXRlLmRyb3BSZWFkPyAnIGRyb3AtcmVhZHktc3RhdGUnOiAnJ31gfSByZWY9XCJncmlkLWNvbXBvbmVudFwiPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBHcmlkY29tcG9uZW50OyJdfQ==