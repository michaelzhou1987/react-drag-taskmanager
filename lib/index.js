"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _gridcomponent = _interopRequireDefault(require("./components/gridcomponent/gridcomponent"));

var _itemcomponent = _interopRequireDefault(require("./components/itemcomponent/itemcomponent"));

var _deepcopy = _interopRequireDefault(require("./helper/deepcopy"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Taskmanager =
/*#__PURE__*/
function (_Component) {
  _inherits(Taskmanager, _Component);

  function Taskmanager(props) {
    var _this;

    _classCallCheck(this, Taskmanager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Taskmanager).call(this, props));

    _this.generateKey = function (name, ref) {
      var key = name + +new Date();

      while (ref.includes(key)) {
        key = name + +new Date();
      }

      ref.push(key);
      return key;
    };

    _this.renderItemTemplate = function (item) {
      return _this.props.itemTemplate ? _this.props.itemTemplate(item) : null;
    };

    _this.handleGridInit = function (positionInfo, ref) {
      _this.gridPositionMap[positionInfo.index] = {
        start: positionInfo.offsetLeft,
        end: positionInfo.offsetLeft + positionInfo.offsetWidth,
        ref: ref
      }; // console.log(this.gridPositionMap);
    };

    _this.handleGridUpdate = function (positionInfo, ref) {
      _this.gridPositionMap[positionInfo.index] = {
        start: positionInfo.offsetLeft,
        end: positionInfo.offsetLeft + positionInfo.offsetWidth,
        ref: ref
      };
    };

    _this.handleItemInit = function (positionInfo, ref) {
      var offsetTop = positionInfo.offsetTop,
          offsetHeight = positionInfo.offsetHeight,
          index = positionInfo.index,
          parentIndex = positionInfo.parentIndex;

      if (_this.itemPositionMap[parentIndex] === undefined) {
        _this.itemPositionMap[parentIndex] = {};
      }

      _this.itemPositionMap[parentIndex][index] = {
        start: offsetTop,
        end: offsetTop + offsetHeight,
        ref: ref
      };
    };

    _this.handleItemUpdate = function (positionInfo) {
      // console.log(positionInfo);
      for (var i in _this.gridPositionMap) {
        _this.gridPositionMap[i].ref.toggleDropReady(false);

        if (positionInfo.x > _this.gridPositionMap[i].start && positionInfo.x < _this.gridPositionMap[i].end) {
          _this.gridPositionMap[i].ref.toggleDropReady(true);
        }
      }
    };

    _this.handleItemMoveEnd = function (positionInfo) {
      var itemGroup = _this.itemPositionMap[positionInfo.parentIndex];

      for (var i in itemGroup) {
        if (i !== positionInfo.index.toString() && positionInfo.translateY > 0 && positionInfo.y > itemGroup[i].start && positionInfo.y < itemGroup[i].end) {
          var tempData = (0, _deepcopy["default"])(_this.state.data);
          var tempItem = tempData[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];
          tempData[positionInfo.parentIndex].data.splice(i, 0, tempItem);

          _this.setState({
            data: tempData
          });
        } else if (i !== positionInfo.index.toString() && positionInfo.translateY < 0 && positionInfo.bottomY > itemGroup[i].start && positionInfo.bottomY < itemGroup[i].end) {
          var _tempData = (0, _deepcopy["default"])(_this.state.data);

          var _tempItem = _tempData[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];

          _tempData[positionInfo.parentIndex].data.splice(i, 0, _tempItem);

          console.log('22222', _tempData);

          _this.setState({
            data: _tempData
          });
        }
      } //save data to database


      try {
        _this.props.onUpdate(_this.state.data);
      } catch (error) {
        console.error(error);
      }

      for (var _i in _this.gridPositionMap) {
        _this.gridPositionMap[_i].ref.toggleDropReady(false);

        if (positionInfo.x > _this.gridPositionMap[_i].start && positionInfo.x < _this.gridPositionMap[_i].end && _i !== positionInfo.parentIndex.toString()) {
          var _tempData2 = (0, _deepcopy["default"])(_this.state.data);

          var _tempItem2 = _tempData2[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];

          _tempData2[_i].data.push(_tempItem2);

          _this.setState({
            data: _tempData2
          }, function () {});
        }
      }
    };

    _this.state = {
      data: []
    };
    _this.gridKeys = [];
    _this.itemKeys = [];
    _this.gridPositionMap = {};
    _this.itemPositionMap = {};
    return _this;
  }

  _createClass(Taskmanager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.data) {
        return;
      }

      var data = (0, _deepcopy["default"])(this.props.data);
      data.forEach(function (item) {
        item.dropReadyState = false;
      });
      this.setState({
        data: this.props.data
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: "table-wrapper",
        style: this.props.wrapperStyle
      }, _react["default"].createElement("div", {
        className: "table-grid"
      }, this.state.data.length > 0 ? this.state.data.map(function (grid, gridIndex) {
        return _react["default"].createElement(_gridcomponent["default"], {
          init: function init(positionInfo, ref) {
            _this2.handleGridInit(positionInfo, ref);
          },
          update: function update(positionInfo, ref) {
            _this2.handleGridUpdate(positionInfo, ref);
          },
          index: gridIndex,
          key: function () {
            return _this2.generateKey('grid', _this2.gridKeys);
          }()
        }, _react["default"].createElement("div", {
          className: "title"
        }, grid.title), grid.data.length > 0 ? grid.data.map(function (item, index) {
          try {
            return _react["default"].createElement(_itemcomponent["default"], {
              index: index,
              parentIndex: gridIndex,
              key: function () {
                return _this2.generateKey('item', _this2.itemKeys);
              }(),
              init: function init(positionInfo, ref) {
                _this2.handleItemInit(positionInfo, ref);
              },
              update: function update(positionInfo) {
                _this2.handleItemUpdate(positionInfo);
              },
              itemMoveEnd: function itemMoveEnd(positionInfo) {
                _this2.handleItemMoveEnd(positionInfo);
              },
              itemStyle: _this2.props.itemStyle
            }, _this2.renderItemTemplate(item));
          } catch (error) {
            console.error(error);
          }
        }) : null);
      }) : null));
    }
  }]);

  return Taskmanager;
}(_react.Component);

var _default = Taskmanager;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYXNrbWFuYWdlciIsInByb3BzIiwiZ2VuZXJhdGVLZXkiLCJuYW1lIiwicmVmIiwia2V5IiwiRGF0ZSIsImluY2x1ZGVzIiwicHVzaCIsInJlbmRlckl0ZW1UZW1wbGF0ZSIsIml0ZW0iLCJpdGVtVGVtcGxhdGUiLCJoYW5kbGVHcmlkSW5pdCIsInBvc2l0aW9uSW5mbyIsImdyaWRQb3NpdGlvbk1hcCIsImluZGV4Iiwic3RhcnQiLCJvZmZzZXRMZWZ0IiwiZW5kIiwib2Zmc2V0V2lkdGgiLCJoYW5kbGVHcmlkVXBkYXRlIiwiaGFuZGxlSXRlbUluaXQiLCJvZmZzZXRUb3AiLCJvZmZzZXRIZWlnaHQiLCJwYXJlbnRJbmRleCIsIml0ZW1Qb3NpdGlvbk1hcCIsInVuZGVmaW5lZCIsImhhbmRsZUl0ZW1VcGRhdGUiLCJpIiwidG9nZ2xlRHJvcFJlYWR5IiwieCIsImhhbmRsZUl0ZW1Nb3ZlRW5kIiwiaXRlbUdyb3VwIiwidG9TdHJpbmciLCJ0cmFuc2xhdGVZIiwieSIsInRlbXBEYXRhIiwic3RhdGUiLCJkYXRhIiwidGVtcEl0ZW0iLCJzcGxpY2UiLCJzZXRTdGF0ZSIsImJvdHRvbVkiLCJjb25zb2xlIiwibG9nIiwib25VcGRhdGUiLCJlcnJvciIsImdyaWRLZXlzIiwiaXRlbUtleXMiLCJmb3JFYWNoIiwiZHJvcFJlYWR5U3RhdGUiLCJ3cmFwcGVyU3R5bGUiLCJsZW5ndGgiLCJtYXAiLCJncmlkIiwiZ3JpZEluZGV4IiwidGl0bGUiLCJpdGVtU3R5bGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVzs7Ozs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQixxRkFBTUEsS0FBTjs7QUFEaUIsVUFXbkJDLFdBWG1CLEdBV0wsVUFBQ0MsSUFBRCxFQUFPQyxH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RSxjQUFBLEdBQUcsRUFBRyxZQUFNO0FBQ1YsdUJBQU8sTUFBSSxDQUFDckQsV0FBTCxDQUNMLE1BREssRUFFTCxNQUFJLENBQUM4QyxRQUZBLENBQVA7QUFJRCxlQUxJLEVBSFA7QUFTRSxjQUFBLElBQUksRUFBRSxjQUFDbkMsWUFBRCxFQUFlVCxHQUFmLEVBQXVCO0FBQzNCLGdCQUFBLE1BQUksQ0FBQ2lCLGNBQUwsQ0FBb0JSLFlBQXBCLEVBQWtDVCxHQUFsQztBQUNELGVBWEg7QUFZRSxjQUFBLE1BQU0sRUFBRSxnQkFBQVMsWUFBWSxFQUFJO0FBQ3RCLGdCQUFBLE1BQUksQ0FBQ2MsZ0JBQUwsQ0FBc0JkLFlBQXRCO0FBQ0QsZUFkSDtBQWVFLGNBQUEsV0FBVyxFQUFFLHFCQUFBQSxZQUFZLEVBQUk7QUFDM0IsZ0JBQUEsTUFBSSxDQUFDa0IsaUJBQUwsQ0FBdUJsQixZQUF2QjtBQUNELGVBakJIO0FBa0JFLGNBQUEsU0FBUyxFQUFFLE1BQUksQ0FBQ1osS0FBTCxDQUFXd0Q7QUFsQnhCLGVBb0JHLE1BQUksQ0FBQ2hELGtCQUFMLENBQXdCQyxJQUF4QixDQXBCSCxDQURGO0FBd0JELFdBekJELENBeUJFLE9BQU9vQyxLQUFQLEVBQWM7QUFDZEgsWUFBQUEsT0FBTyxDQUFDRyxLQUFSLENBQWNBLEtBQWQ7QUFDRDtBQUNGLFNBN0JELENBREgsR0ErQkcsSUE1Q04sQ0FERjtBQWdERCxPQWpERCxDQURILEdBbURHLElBcEROLENBREYsQ0FERjtBQTBERDs7OztFQTVNdUJZLGdCOztlQStNWDFELFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdyaWRjb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL2dyaWRjb21wb25lbnQvZ3JpZGNvbXBvbmVudCc7XG5pbXBvcnQgSXRlbWNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvaXRlbWNvbXBvbmVudC9pdGVtY29tcG9uZW50JztcbmltcG9ydCBkZWVwY29weSBmcm9tICcuL2hlbHBlci9kZWVwY29weSc7XG5cbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuXG5jbGFzcyBUYXNrbWFuYWdlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRhOiBbXVxuICAgIH07XG4gICAgdGhpcy5ncmlkS2V5cyA9IFtdO1xuICAgIHRoaXMuaXRlbUtleXMgPSBbXTtcbiAgICB0aGlzLmdyaWRQb3NpdGlvbk1hcCA9IHt9O1xuICAgIHRoaXMuaXRlbVBvc2l0aW9uTWFwID0ge307XG4gIH1cblxuICBnZW5lcmF0ZUtleSA9IChuYW1lLCByZWYpID0+IHtcbiAgICBsZXQga2V5ID0gbmFtZSArICtuZXcgRGF0ZSgpO1xuICAgIHdoaWxlIChyZWYuaW5jbHVkZXMoa2V5KSkge1xuICAgICAga2V5ID0gbmFtZSArICtuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHJlZi5wdXNoKGtleSk7XG5cbiAgICByZXR1cm4ga2V5O1xuICB9O1xuXG4gIHJlbmRlckl0ZW1UZW1wbGF0ZSA9IGl0ZW0gPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1UZW1wbGF0ZSA/IHRoaXMucHJvcHMuaXRlbVRlbXBsYXRlKGl0ZW0pIDogbnVsbDtcbiAgfTtcblxuICBoYW5kbGVHcmlkSW5pdCA9IChwb3NpdGlvbkluZm8sIHJlZikgPT4ge1xuICAgIHRoaXMuZ3JpZFBvc2l0aW9uTWFwW3Bvc2l0aW9uSW5mby5pbmRleF0gPSB7XG4gICAgICBzdGFydDogcG9zaXRpb25JbmZvLm9mZnNldExlZnQsXG4gICAgICBlbmQ6IHBvc2l0aW9uSW5mby5vZmZzZXRMZWZ0ICsgcG9zaXRpb25JbmZvLm9mZnNldFdpZHRoLFxuICAgICAgcmVmOiByZWZcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ3JpZFBvc2l0aW9uTWFwKTtcbiAgfTtcblxuICBoYW5kbGVHcmlkVXBkYXRlID0gKHBvc2l0aW9uSW5mbywgcmVmKSA9PiB7XG4gICAgdGhpcy5ncmlkUG9zaXRpb25NYXBbcG9zaXRpb25JbmZvLmluZGV4XSA9IHtcbiAgICAgIHN0YXJ0OiBwb3NpdGlvbkluZm8ub2Zmc2V0TGVmdCxcbiAgICAgIGVuZDogcG9zaXRpb25JbmZvLm9mZnNldExlZnQgKyBwb3NpdGlvbkluZm8ub2Zmc2V0V2lkdGgsXG4gICAgICByZWY6IHJlZlxuICAgIH07XG4gIH07XG5cbiAgaGFuZGxlSXRlbUluaXQgPSAocG9zaXRpb25JbmZvLCByZWYpID0+IHtcbiAgICBsZXQgeyBvZmZzZXRUb3AsIG9mZnNldEhlaWdodCwgaW5kZXgsIHBhcmVudEluZGV4IH0gPSBwb3NpdGlvbkluZm87XG4gICAgaWYgKHRoaXMuaXRlbVBvc2l0aW9uTWFwW3BhcmVudEluZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLml0ZW1Qb3NpdGlvbk1hcFtwYXJlbnRJbmRleF0gPSB7fTtcbiAgICB9XG4gICAgdGhpcy5pdGVtUG9zaXRpb25NYXBbcGFyZW50SW5kZXhdW2luZGV4XSA9IHtcbiAgICAgIHN0YXJ0OiBvZmZzZXRUb3AsXG4gICAgICBlbmQ6IG9mZnNldFRvcCArIG9mZnNldEhlaWdodCxcbiAgICAgIHJlZlxuICAgIH07XG4gIH07XG5cbiAgaGFuZGxlSXRlbVVwZGF0ZSA9IHBvc2l0aW9uSW5mbyA9PiB7XG4gICAgLy8gY29uc29sZS5sb2cocG9zaXRpb25JbmZvKTtcbiAgICBmb3IgKGxldCBpIGluIHRoaXMuZ3JpZFBvc2l0aW9uTWFwKSB7XG4gICAgICB0aGlzLmdyaWRQb3NpdGlvbk1hcFtpXS5yZWYudG9nZ2xlRHJvcFJlYWR5KGZhbHNlKTtcbiAgICAgIGlmIChcbiAgICAgICAgcG9zaXRpb25JbmZvLnggPiB0aGlzLmdyaWRQb3NpdGlvbk1hcFtpXS5zdGFydCAmJlxuICAgICAgICBwb3NpdGlvbkluZm8ueCA8IHRoaXMuZ3JpZFBvc2l0aW9uTWFwW2ldLmVuZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZ3JpZFBvc2l0aW9uTWFwW2ldLnJlZi50b2dnbGVEcm9wUmVhZHkodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBoYW5kbGVJdGVtTW92ZUVuZCA9IHBvc2l0aW9uSW5mbyA9PiB7XG4gICAgbGV0IGl0ZW1Hcm91cCA9IHRoaXMuaXRlbVBvc2l0aW9uTWFwW3Bvc2l0aW9uSW5mby5wYXJlbnRJbmRleF07XG4gICAgZm9yIChsZXQgaSBpbiBpdGVtR3JvdXApIHtcbiAgICAgIGlmIChcbiAgICAgICAgaSAhPT0gcG9zaXRpb25JbmZvLmluZGV4LnRvU3RyaW5nKCkgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLnRyYW5zbGF0ZVkgPiAwICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby55ID4gaXRlbUdyb3VwW2ldLnN0YXJ0ICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby55IDwgaXRlbUdyb3VwW2ldLmVuZFxuICAgICAgKSB7XG4gICAgICAgIGxldCB0ZW1wRGF0YSA9IGRlZXBjb3B5KHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIGxldCB0ZW1wSXRlbSA9IHRlbXBEYXRhW3Bvc2l0aW9uSW5mby5wYXJlbnRJbmRleF0uZGF0YS5zcGxpY2UoXG4gICAgICAgICAgcG9zaXRpb25JbmZvLmluZGV4LFxuICAgICAgICAgIDFcbiAgICAgICAgKVswXTtcbiAgICAgICAgdGVtcERhdGFbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XS5kYXRhLnNwbGljZShpLCAwLCB0ZW1wSXRlbSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGRhdGE6IHRlbXBEYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgaSAhPT0gcG9zaXRpb25JbmZvLmluZGV4LnRvU3RyaW5nKCkgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLnRyYW5zbGF0ZVkgPCAwICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby5ib3R0b21ZID4gaXRlbUdyb3VwW2ldLnN0YXJ0ICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby5ib3R0b21ZIDwgaXRlbUdyb3VwW2ldLmVuZFxuICAgICAgKSB7XG4gICAgICAgIGxldCB0ZW1wRGF0YSA9IGRlZXBjb3B5KHRoaXMuc3RhdGUuZGF0YSk7XG4gICAgICAgIGxldCB0ZW1wSXRlbSA9IHRlbXBEYXRhW3Bvc2l0aW9uSW5mby5wYXJlbnRJbmRleF0uZGF0YS5zcGxpY2UoXG4gICAgICAgICAgcG9zaXRpb25JbmZvLmluZGV4LFxuICAgICAgICAgIDFcbiAgICAgICAgKVswXTtcbiAgICAgICAgdGVtcERhdGFbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XS5kYXRhLnNwbGljZShpLCAwLCB0ZW1wSXRlbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcyMjIyMicsIHRlbXBEYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGF0YTogdGVtcERhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vc2F2ZSBkYXRhIHRvIGRhdGFiYXNlXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGUodGhpcy5zdGF0ZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLmdyaWRQb3NpdGlvbk1hcCkge1xuICAgICAgdGhpcy5ncmlkUG9zaXRpb25NYXBbaV0ucmVmLnRvZ2dsZURyb3BSZWFkeShmYWxzZSk7XG4gICAgICBpZiAoXG4gICAgICAgIHBvc2l0aW9uSW5mby54ID4gdGhpcy5ncmlkUG9zaXRpb25NYXBbaV0uc3RhcnQgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLnggPCB0aGlzLmdyaWRQb3NpdGlvbk1hcFtpXS5lbmQgJiZcbiAgICAgICAgaSAhPT0gcG9zaXRpb25JbmZvLnBhcmVudEluZGV4LnRvU3RyaW5nKClcbiAgICAgICkge1xuICAgICAgICBsZXQgdGVtcERhdGEgPSBkZWVwY29weSh0aGlzLnN0YXRlLmRhdGEpO1xuICAgICAgICBsZXQgdGVtcEl0ZW0gPSB0ZW1wRGF0YVtwb3NpdGlvbkluZm8ucGFyZW50SW5kZXhdLmRhdGEuc3BsaWNlKFxuICAgICAgICAgIHBvc2l0aW9uSW5mby5pbmRleCxcbiAgICAgICAgICAxXG4gICAgICAgIClbMF07XG4gICAgICAgIHRlbXBEYXRhW2ldLmRhdGEucHVzaCh0ZW1wSXRlbSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogdGVtcERhdGFcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHt9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZGF0YSA9IGRlZXBjb3B5KHRoaXMucHJvcHMuZGF0YSk7XG4gICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5kcm9wUmVhZHlTdGF0ZSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhXG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLXdyYXBwZXJcIiBzdHlsZT17dGhpcy5wcm9wcy53cmFwcGVyU3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWdyaWRcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5kYXRhLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5kYXRhLm1hcCgoZ3JpZCwgZ3JpZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxHcmlkY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGluaXQ9eyhwb3NpdGlvbkluZm8sIHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlR3JpZEluaXQocG9zaXRpb25JbmZvLCByZWYpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU9eyhwb3NpdGlvbkluZm8sIHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlR3JpZFVwZGF0ZShwb3NpdGlvbkluZm8sIHJlZik7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtncmlkSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGtleT17KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUtleSgnZ3JpZCcsIHRoaXMuZ3JpZEtleXMpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e2dyaWQudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtncmlkLmRhdGEubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgID8gZ3JpZC5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJbmRleD17Z3JpZEluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVLZXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1LZXlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdD17KHBvc2l0aW9uSW5mbywgcmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJdGVtSW5pdChwb3NpdGlvbkluZm8sIHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZT17cG9zaXRpb25JbmZvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUl0ZW1VcGRhdGUocG9zaXRpb25JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU1vdmVFbmQ9e3Bvc2l0aW9uSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJdGVtTW92ZUVuZChwb3NpdGlvbkluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU9e3RoaXMucHJvcHMuaXRlbVN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtVGVtcGxhdGUoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0l0ZW1jb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L0dyaWRjb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2ttYW5hZ2VyO1xuIl19