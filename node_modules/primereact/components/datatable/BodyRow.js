'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BodyRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BodyCell = require('./BodyCell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyRow = exports.BodyRow = function (_Component) {
    _inherits(BodyRow, _Component);

    function BodyRow(props) {
        _classCallCheck(this, BodyRow);

        var _this = _possibleConstructorReturn(this, (BodyRow.__proto__ || Object.getPrototypeOf(BodyRow)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onRightClick = _this.onRightClick.bind(_this);
        return _this;
    }

    _createClass(BodyRow, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    data: this.props.rowData,
                    index: this.props.rowIndex
                });
            }
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(event) {
            if (this.props.onTouchEnd) {
                this.props.onTouchEnd(event);
            }
        }
    }, {
        key: 'onRightClick',
        value: function onRightClick(event) {
            if (this.props.onRightClick) {
                this.props.onRightClick({
                    originalEvent: event,
                    data: this.props.rowData,
                    index: this.props.rowIndex
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var columns = _react2.default.Children.toArray(this.props.children);
            var conditionalStyles = { 'ui-state-highlight': this.props.selected, 'ui-datatable-even': this.props.rowIndex % 2 === 0, 'ui-datatable-odd': this.props.rowIndex % 2 === 1 };
            if (this.props.rowClassName) {
                var rowClassNameCondition = this.props.rowClassName(this.props.rowData);
                conditionalStyles = _extends({}, conditionalStyles, rowClassNameCondition);
            }
            var className = (0, _classnames2.default)('ui-widget-content', conditionalStyles);
            var hasRowSpanGrouping = this.props.rowGroupMode === 'rowspan';
            var cells = [];

            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var rowSpan = void 0;
                if (hasRowSpanGrouping) {
                    if (this.props.sortField === column.props.field) {
                        if (this.props.groupRowSpan) rowSpan = this.props.groupRowSpan;else continue;
                    }
                }

                var cell = _react2.default.createElement(_BodyCell.BodyCell, _extends({ key: i }, column.props, { rowSpan: rowSpan, rowData: this.props.rowData, rowIndex: this.props.rowIndex, onRowToggle: this.props.onRowToggle, expanded: this.props.expanded,
                    onRadioClick: this.props.onRadioClick, onCheckboxClick: this.props.onCheckboxClick, responsive: this.props.responsive, selected: this.props.selected }));

                cells.push(cell);
            }

            return _react2.default.createElement(
                'tr',
                { className: className, onClick: this.onClick, onTouchEnd: this.onTouchEnd, onContextMenu: this.onRightClick },
                cells
            );
        }
    }]);

    return BodyRow;
}(_react.Component);