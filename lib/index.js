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
      console.log(_this.itemPositionMap);
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
      console.log(positionInfo.translateY);

      for (var i in _this.gridPositionMap) {
        _this.gridPositionMap[i].ref.toggleDropReady(false);

        if (positionInfo.x > _this.gridPositionMap[i].start && positionInfo.x < _this.gridPositionMap[i].end && i !== positionInfo.parentIndex.toString()) {
          var tempData = (0, _deepcopy["default"])(_this.state.data);
          var tempItem = tempData[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0]; // console.log(tempItem)

          tempData[i].data.push(tempItem);

          _this.setState({
            data: tempData
          }, function () {
            //save data to database
            try {
              _this.props.onUpdate(_this.state.data);
            } catch (error) {
              console.error(error);
            }
          });
        }
      }

      var itemGroup = _this.itemPositionMap[positionInfo.parentIndex];

      for (var _i in itemGroup) {
        if (_i !== positionInfo.index.toString() && positionInfo.translateY > 0 && positionInfo.y > itemGroup[_i].start && positionInfo.y < itemGroup[_i].end) {
          var _tempData = (0, _deepcopy["default"])(_this.state.data);

          var _tempItem = _tempData[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];

          _tempData[positionInfo.parentIndex].data.splice(_i, 0, _tempItem);

          _this.setState({
            data: _tempData
          }, function () {
            //save data to database
            try {
              _this.props.onUpdate(_this.state.data);
            } catch (error) {
              console.error(error);
            }
          });
        } else if (_i !== positionInfo.index.toString() && positionInfo.translateY < 0 && positionInfo.bottomY > itemGroup[_i].start && positionInfo.bottomY < itemGroup[_i].end) {
          var _tempData2 = (0, _deepcopy["default"])(_this.state.data);

          var _tempItem2 = _tempData2[positionInfo.parentIndex].data.splice(positionInfo.index, 1)[0];

          _tempData2[positionInfo.parentIndex].data.splice(_i, 0, _tempItem2);

          _this.setState({
            data: _tempData2
          }, function () {
            //save data to database
            try {
              _this.props.onUpdate(_this.state.data);
            } catch (error) {
              console.error(error);
            }
          });
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
              return new Promise(function (resolve, reject) {
                _this2.handleItemMoveEnd(positionInfo);

                resolve();
              });
            },
            itemStyle: _this2.props.itemStyle
          }, _this2.renderItemTemplate(item));
        }) : null);
      }) : null));
    }
  }]);

  return Taskmanager;
}(_react.Component);

var _default = Taskmanager;
exports["default"] = _default;