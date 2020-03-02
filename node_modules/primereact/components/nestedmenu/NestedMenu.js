'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NestedMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NestedMenuItem = require('./NestedMenuItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestedMenu = exports.NestedMenu = function (_Component) {
    _inherits(NestedMenu, _Component);

    function NestedMenu(props) {
        _classCallCheck(this, NestedMenu);

        var _this = _possibleConstructorReturn(this, (NestedMenu.__proto__ || Object.getPrototypeOf(NestedMenu)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(NestedMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'ul',
                { className: this.props.className, style: this.props.style },
                this.props.items && this.props.items.map(function (item, index) {
                    return _react2.default.createElement(_NestedMenuItem.NestedMenuItem, { key: _this2.props.index + '_' + index, item: item, root: _this2.props.root, index: _this2.props.index + '_' + index,
                        menu: _this2, parentMenu: _this2.props.parentMenu });
                }),
                this.props.parentMenu === 'Menubar' && _react2.default.createElement(
                    'li',
                    { className: 'ui-menuitem ui-menuitem-custom ui-widget ui-corner-all' },
                    this.props.children
                )
            );
        }
    }]);

    return NestedMenu;
}(_react.Component);

NestedMenu.defaultProps = {
    className: null,
    style: null,
    items: null,
    parentMenu: null,
    root: null,
    index: null
};
NestedMenu.propTypes = {
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    items: _propTypes2.default.any,
    parentMenu: _propTypes2.default.string,
    root: _propTypes2.default.bool,
    index: _propTypes2.default.any
};