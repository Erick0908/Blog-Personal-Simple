'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MenuItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = exports.MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem(props) {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

        _this.state = {};
        _this.item = _this.props.items;
        return _this;
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-menuitem-link ui-corner-all', { 'ui-state-disabled': this.item.disabled }, { 'ui-menuitem-link-parent': this.item.items && this.props.parentMenu === 'SlideMenu' });
            var iconClass = (0, _classnames2.default)('ui-menuitem-icon fa fa-fw', this.item.icon ? this.item.icon : null);
            var rootClass = (0, _classnames2.default)('ui-submenu-icon fa fa-fw', { ' fa-caret-down': this.props.root }, { ' fa-caret-right': !this.props.root });
            if (this.item.url) {
                return _react2.default.createElement(
                    'a',
                    { href: this.item.url || '#', className: className, target: this.item.target, onClick: this.props.onItemClick },
                    this.item.items && (this.props.parentMenu === 'TieredMenu' || this.props.parentMenu === 'ContextMenu') && _react2.default.createElement('span', { className: 'ui-submenu-icon fa fa-fw fa-caret-right' }),
                    this.item.icon && _react2.default.createElement('span', { className: iconClass }),
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-menuitem-text' },
                        this.item.label
                    ),
                    this.item.items && this.props.parentMenu === 'Menubar' && _react2.default.createElement('span', { className: rootClass })
                );
            } else {
                return _react2.default.createElement(
                    'a',
                    { className: className, target: this.item.target, onClick: this.props.onItemClick },
                    this.item.items && (this.props.parentMenu === 'TieredMenu' || this.props.parentMenu === 'ContextMenu') && _react2.default.createElement('span', { className: 'ui-submenu-icon fa fa-fw fa-caret-right' }),
                    this.item.icon && _react2.default.createElement('span', { className: iconClass }),
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-menuitem-text' },
                        this.item.label
                    ),
                    this.item.items && this.props.parentMenu === 'Menubar' && _react2.default.createElement('span', { className: rootClass })
                );
            }
        }
    }]);

    return MenuItem;
}(_react.Component);

MenuItem.defaultProps = {
    index: null,
    items: null,
    onItemClick: null,
    parentMenu: null,
    root: false
};
MenuItem.propTypes = {
    index: _propTypes2.default.any,
    items: _propTypes2.default.any,
    onItemClick: _propTypes2.default.func,
    parentMenu: _propTypes2.default.string,
    root: _propTypes2.default.bool
};