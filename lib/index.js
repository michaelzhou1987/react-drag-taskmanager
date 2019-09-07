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
        if (i !== positionInfo.index.toString() && positionInfo.translateY > 0 && positionInfo.y > itemGroup[i].start && positionInfo.y < itemGroup[i].end && positionInfo.x > _this.gridPositionMap[positionInfo.parentIndex].start && positionInfo.x < _this.gridPositionMap[positionInfo.parentIndex].end) {
          var tempData = (0, _deepcopy["default"])(_this.state.data);
          var tempItem = tempData[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];
          tempData[positionInfo.parentIndex].data.splice(i, 0, tempItem);

          _this.setState({
            data: tempData
          });
        } else if (i !== positionInfo.index.toString() && positionInfo.translateY < 0 && positionInfo.bottomY > itemGroup[i].start && positionInfo.bottomY < itemGroup[i].end && positionInfo.x > _this.gridPositionMap[positionInfo.parentIndex].start && positionInfo.x < _this.gridPositionMap[positionInfo.parentIndex].end) {
          var _tempData = (0, _deepcopy["default"])(_this.state.data);

          var _tempItem = _tempData[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];

          _tempData[positionInfo.parentIndex].data.splice(i, 0, _tempItem);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJUYXNrbWFuYWdlciIsInByb3BzIiwiZ2VuZXJhdGVLZXkiLCJuYW1lIiwicmVmIiwia2V5IiwiRGF0ZSIsImluY2x1ZGVzIiwicHVzaCIsInJlbmRlckl0ZW1UZW1wbGF0ZSIsIml0ZW0iLCJpdGVtVGVtcGxhdGUiLCJoYW5kbGVHcmlkSW5pdCIsInBvc2l0aW9uSW5mbyIsImdyaWRQb3NpdGlvbk1hcCIsImluZGV4Iiwic3RhcnQiLCJvZmZzZXRMZWZ0IiwiZW5kIiwib2Zmc2V0V2lkdGgiLCJoYW5kbGVHcmlkVXBkYXRlIiwiaGFuZGxlSXRlbUluaXQiLCJvZmZzZXRUb3AiLCJvZmZzZXRIZWlnaHQiLCJwYXJlbnRJbmRleCIsIml0ZW1Qb3NpdGlvbk1hcCIsInVuZGVmaW5lZCIsImhhbmRsZUl0ZW1VcGRhdGUiLCJpIiwidG9nZ2xlRHJvcFJlYWR5IiwieCIsImhhbmRsZUl0ZW1Nb3ZlRW5kIiwiaXRlbUdyb3VwIiwidG9TdHJpbmciLCJ0cmFuc2xhdGVZIiwieSIsInRlbXBEYXRhIiwic3RhdGUiLCJkYXRhIiwidGVtcEl0ZW0iLCJzcGxpY2UiLCJzZXRTdGF0ZSIsImJvdHRvbVkiLCJvblVwZGF0ZSIsImVycm9yIiwiY29uc29sZSIsImdyaWRLZXlzIiwiaXRlbUtleXMiLCJmb3JFYWNoIiwiZHJvcFJlYWR5U3RhdGUiLCJ3cmFwcGVyU3R5bGUiLCJsZW5ndGgiLCJtYXAiLCJncmlkIiwiZ3JpZEluZGV4IiwidGl0bGUiLCJpdGVtU3R5bGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVzs7Ozs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQixxRkFBTUEsS0FBTjs7QUFEaUIsVUFXbkJDLFdBWG1CLEdBV0wsVUFBQ0MsSUFBRCxFQUFPQyxHQUFQLEVB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O0FBMEREOzs7O0VBL011QmEsZ0I7O2VBa05YekQsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR3JpZGNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvZ3JpZGNvbXBvbmVudC9ncmlkY29tcG9uZW50JztcbmltcG9ydCBJdGVtY29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50cy9pdGVtY29tcG9uZW50L2l0ZW1jb21wb25lbnQnO1xuaW1wb3J0IGRlZXBjb3B5IGZyb20gJy4vaGVscGVyL2RlZXBjb3B5JztcblxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbmNsYXNzIFRhc2ttYW5hZ2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRhdGE6IFtdXG4gICAgfTtcbiAgICB0aGlzLmdyaWRLZXlzID0gW107XG4gICAgdGhpcy5pdGVtS2V5cyA9IFtdO1xuICAgIHRoaXMuZ3JpZFBvc2l0aW9uTWFwID0ge307XG4gICAgdGhpcy5pdGVtUG9zaXRpb25NYXAgPSB7fTtcbiAgfVxuXG4gIGdlbmVyYXRlS2V5ID0gKG5hbWUsIHJlZikgPT4ge1xuICAgIGxldCBrZXkgPSBuYW1lICsgK25ldyBEYXRlKCk7XG4gICAgd2hpbGUgKHJlZi5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBrZXkgPSBuYW1lICsgK25ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgcmVmLnB1c2goa2V5KTtcblxuICAgIHJldHVybiBrZXk7XG4gIH07XG5cbiAgcmVuZGVySXRlbVRlbXBsYXRlID0gaXRlbSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbVRlbXBsYXRlID8gdGhpcy5wcm9wcy5pdGVtVGVtcGxhdGUoaXRlbSkgOiBudWxsO1xuICB9O1xuXG4gIGhhbmRsZUdyaWRJbml0ID0gKHBvc2l0aW9uSW5mbywgcmVmKSA9PiB7XG4gICAgdGhpcy5ncmlkUG9zaXRpb25NYXBbcG9zaXRpb25JbmZvLmluZGV4XSA9IHtcbiAgICAgIHN0YXJ0OiBwb3NpdGlvbkluZm8ub2Zmc2V0TGVmdCxcbiAgICAgIGVuZDogcG9zaXRpb25JbmZvLm9mZnNldExlZnQgKyBwb3NpdGlvbkluZm8ub2Zmc2V0V2lkdGgsXG4gICAgICByZWY6IHJlZlxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5ncmlkUG9zaXRpb25NYXApO1xuICB9O1xuXG4gIGhhbmRsZUdyaWRVcGRhdGUgPSAocG9zaXRpb25JbmZvLCByZWYpID0+IHtcbiAgICB0aGlzLmdyaWRQb3NpdGlvbk1hcFtwb3NpdGlvbkluZm8uaW5kZXhdID0ge1xuICAgICAgc3RhcnQ6IHBvc2l0aW9uSW5mby5vZmZzZXRMZWZ0LFxuICAgICAgZW5kOiBwb3NpdGlvbkluZm8ub2Zmc2V0TGVmdCArIHBvc2l0aW9uSW5mby5vZmZzZXRXaWR0aCxcbiAgICAgIHJlZjogcmVmXG4gICAgfTtcbiAgfTtcblxuICBoYW5kbGVJdGVtSW5pdCA9IChwb3NpdGlvbkluZm8sIHJlZikgPT4ge1xuICAgIGxldCB7IG9mZnNldFRvcCwgb2Zmc2V0SGVpZ2h0LCBpbmRleCwgcGFyZW50SW5kZXggfSA9IHBvc2l0aW9uSW5mbztcbiAgICBpZiAodGhpcy5pdGVtUG9zaXRpb25NYXBbcGFyZW50SW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaXRlbVBvc2l0aW9uTWFwW3BhcmVudEluZGV4XSA9IHt9O1xuICAgIH1cbiAgICB0aGlzLml0ZW1Qb3NpdGlvbk1hcFtwYXJlbnRJbmRleF1baW5kZXhdID0ge1xuICAgICAgc3RhcnQ6IG9mZnNldFRvcCxcbiAgICAgIGVuZDogb2Zmc2V0VG9wICsgb2Zmc2V0SGVpZ2h0LFxuICAgICAgcmVmXG4gICAgfTtcbiAgfTtcblxuICBoYW5kbGVJdGVtVXBkYXRlID0gcG9zaXRpb25JbmZvID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhwb3NpdGlvbkluZm8pO1xuICAgIGZvciAobGV0IGkgaW4gdGhpcy5ncmlkUG9zaXRpb25NYXApIHtcbiAgICAgIHRoaXMuZ3JpZFBvc2l0aW9uTWFwW2ldLnJlZi50b2dnbGVEcm9wUmVhZHkoZmFsc2UpO1xuICAgICAgaWYgKFxuICAgICAgICBwb3NpdGlvbkluZm8ueCA+IHRoaXMuZ3JpZFBvc2l0aW9uTWFwW2ldLnN0YXJ0ICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby54IDwgdGhpcy5ncmlkUG9zaXRpb25NYXBbaV0uZW5kXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5ncmlkUG9zaXRpb25NYXBbaV0ucmVmLnRvZ2dsZURyb3BSZWFkeSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGhhbmRsZUl0ZW1Nb3ZlRW5kID0gcG9zaXRpb25JbmZvID0+IHtcbiAgICBsZXQgaXRlbUdyb3VwID0gdGhpcy5pdGVtUG9zaXRpb25NYXBbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XTtcbiAgICBmb3IgKGxldCBpIGluIGl0ZW1Hcm91cCkge1xuICAgICAgaWYgKFxuICAgICAgICBpICE9PSBwb3NpdGlvbkluZm8uaW5kZXgudG9TdHJpbmcoKSAmJlxuICAgICAgICBwb3NpdGlvbkluZm8udHJhbnNsYXRlWSA+IDAgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLnkgPiBpdGVtR3JvdXBbaV0uc3RhcnQgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLnkgPCBpdGVtR3JvdXBbaV0uZW5kICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby54ID4gdGhpcy5ncmlkUG9zaXRpb25NYXBbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XS5zdGFydCAmJlxuICAgICAgICBwb3NpdGlvbkluZm8ueCA8IHRoaXMuZ3JpZFBvc2l0aW9uTWFwW3Bvc2l0aW9uSW5mby5wYXJlbnRJbmRleF0uZW5kXG4gICAgICApIHtcbiAgICAgICAgbGV0IHRlbXBEYXRhID0gZGVlcGNvcHkodGhpcy5zdGF0ZS5kYXRhKTtcbiAgICAgICAgbGV0IHRlbXBJdGVtID0gdGVtcERhdGFbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XS5kYXRhLnNwbGljZShcbiAgICAgICAgICBwb3NpdGlvbkluZm8uaW5kZXgsXG4gICAgICAgICAgMVxuICAgICAgICApWzBdO1xuICAgICAgICB0ZW1wRGF0YVtwb3NpdGlvbkluZm8ucGFyZW50SW5kZXhdLmRhdGEuc3BsaWNlKGksIDAsIHRlbXBJdGVtKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGF0YTogdGVtcERhdGFcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBpICE9PSBwb3NpdGlvbkluZm8uaW5kZXgudG9TdHJpbmcoKSAmJlxuICAgICAgICBwb3NpdGlvbkluZm8udHJhbnNsYXRlWSA8IDAgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLmJvdHRvbVkgPiBpdGVtR3JvdXBbaV0uc3RhcnQgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLmJvdHRvbVkgPCBpdGVtR3JvdXBbaV0uZW5kICYmXG4gICAgICAgIHBvc2l0aW9uSW5mby54ID4gdGhpcy5ncmlkUG9zaXRpb25NYXBbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XS5zdGFydCAmJlxuICAgICAgICBwb3NpdGlvbkluZm8ueCA8IHRoaXMuZ3JpZFBvc2l0aW9uTWFwW3Bvc2l0aW9uSW5mby5wYXJlbnRJbmRleF0uZW5kXG4gICAgICApIHtcbiAgICAgICAgbGV0IHRlbXBEYXRhID0gZGVlcGNvcHkodGhpcy5zdGF0ZS5kYXRhKTtcbiAgICAgICAgbGV0IHRlbXBJdGVtID0gdGVtcERhdGFbcG9zaXRpb25JbmZvLnBhcmVudEluZGV4XS5kYXRhLnNwbGljZShcbiAgICAgICAgICBwb3NpdGlvbkluZm8uaW5kZXgsXG4gICAgICAgICAgMVxuICAgICAgICApWzBdO1xuICAgICAgICB0ZW1wRGF0YVtwb3NpdGlvbkluZm8ucGFyZW50SW5kZXhdLmRhdGEuc3BsaWNlKGksIDAsIHRlbXBJdGVtKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGF0YTogdGVtcERhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vc2F2ZSBkYXRhIHRvIGRhdGFiYXNlXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucHJvcHMub25VcGRhdGUodGhpcy5zdGF0ZS5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLmdyaWRQb3NpdGlvbk1hcCkge1xuICAgICAgdGhpcy5ncmlkUG9zaXRpb25NYXBbaV0ucmVmLnRvZ2dsZURyb3BSZWFkeShmYWxzZSk7XG4gICAgICBpZiAoXG4gICAgICAgIHBvc2l0aW9uSW5mby54ID4gdGhpcy5ncmlkUG9zaXRpb25NYXBbaV0uc3RhcnQgJiZcbiAgICAgICAgcG9zaXRpb25JbmZvLnggPCB0aGlzLmdyaWRQb3NpdGlvbk1hcFtpXS5lbmQgJiZcbiAgICAgICAgaSAhPT0gcG9zaXRpb25JbmZvLnBhcmVudEluZGV4LnRvU3RyaW5nKClcbiAgICAgICkge1xuICAgICAgICBsZXQgdGVtcERhdGEgPSBkZWVwY29weSh0aGlzLnN0YXRlLmRhdGEpO1xuICAgICAgICBsZXQgdGVtcEl0ZW0gPSB0ZW1wRGF0YVtwb3NpdGlvbkluZm8ucGFyZW50SW5kZXhdLmRhdGEuc3BsaWNlKFxuICAgICAgICAgIHBvc2l0aW9uSW5mby5pbmRleCxcbiAgICAgICAgICAxXG4gICAgICAgIClbMF07XG4gICAgICAgIHRlbXBEYXRhW2ldLmRhdGEucHVzaCh0ZW1wSXRlbSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogdGVtcERhdGFcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHt9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZGF0YSA9IGRlZXBjb3B5KHRoaXMucHJvcHMuZGF0YSk7XG4gICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5kcm9wUmVhZHlTdGF0ZSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhXG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLXdyYXBwZXJcIiBzdHlsZT17dGhpcy5wcm9wcy53cmFwcGVyU3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLWdyaWRcIj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5kYXRhLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5kYXRhLm1hcCgoZ3JpZCwgZ3JpZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxHcmlkY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGluaXQ9eyhwb3NpdGlvbkluZm8sIHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlR3JpZEluaXQocG9zaXRpb25JbmZvLCByZWYpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU9eyhwb3NpdGlvbkluZm8sIHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlR3JpZFVwZGF0ZShwb3NpdGlvbkluZm8sIHJlZik7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtncmlkSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGtleT17KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUtleSgnZ3JpZCcsIHRoaXMuZ3JpZEtleXMpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+e2dyaWQudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtncmlkLmRhdGEubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgID8gZ3JpZC5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEl0ZW1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJbmRleD17Z3JpZEluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVLZXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1LZXlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdD17KHBvc2l0aW9uSW5mbywgcmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJdGVtSW5pdChwb3NpdGlvbkluZm8sIHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZT17cG9zaXRpb25JbmZvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUl0ZW1VcGRhdGUocG9zaXRpb25JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU1vdmVFbmQ9e3Bvc2l0aW9uSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJdGVtTW92ZUVuZChwb3NpdGlvbkluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtU3R5bGU9e3RoaXMucHJvcHMuaXRlbVN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJJdGVtVGVtcGxhdGUoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0l0ZW1jb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L0dyaWRjb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2ttYW5hZ2VyO1xuIl19