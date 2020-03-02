'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NestedMenuItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuItem = require('../menu/MenuItem');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _NestedMenu = require('./NestedMenu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestedMenuItem = exports.NestedMenuItem = function (_Component) {
    _inherits(NestedMenuItem, _Component);

    function NestedMenuItem(props) {
        _classCallCheck(this, NestedMenuItem);

        var _this = _possibleConstructorReturn(this, (NestedMenuItem.__proto__ || Object.getPrototypeOf(NestedMenuItem)).call(this, props));

        _this.state = { activeItem: null };
        _this.onItemMouseLeave = _this.onItemMouseLeave.bind(_this);
        return _this;
    }

    _createClass(NestedMenuItem, [{
        key: 'onItemMouseEnter',
        value: function onItemMouseEnter(event, menuitem) {
            this.setState({ activeItem: menuitem });
            this.sublist = event.currentTarget.children[1];
            if (this.sublist) {
                this.sublist.style.zIndex = String(_DomHandler2.default.generateZIndex());
                if (this.props.parentMenu === 'TieredMenu' || this.props.parentMenu === 'Menubar' && !this.props.root || this.props.parentMenu === 'ContextMenu') _DomHandler2.default.addClass(this.sublist, 'ui-tieredmenu-item');
                this.sublist.style.display = 'block';
            }
        }
    }, {
        key: 'onItemMouseLeave',
        value: function onItemMouseLeave(event) {
            this.setState({ activeItem: null });
            if (this.sublist) {
                _DomHandler2.default.removeClass(this.sublist, 'ui-tieredmenu-item');
                this.sublist.style.display = 'none';
            }
        }
    }, {
        key: 'itemClick',
        value: function itemClick(event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (!item.url) {
                event.preventDefault();
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var listClass = (0, _classnames2.default)('ui-menuitem ui-widget ui-corner-all', { 'ui-menu-parent': this.props.item.items }, { 'ui-menuitem-active': this.state.activeItem === this.props.item });
            return this.props.item.separator ? _react2.default.createElement('li', { className: 'ui-menu-separator ui-widget-content', key: this.props.index }) : _react2.default.createElement(
                'li',
                { className: listClass, key: this.props.index, onMouseEnter: function onMouseEnter(event) {
                        return _this2.onItemMouseEnter(event, _this2.props.item);
                    },
                    onMouseLeave: this.onItemMouseLeave, onClick: function onClick() {
                        _this2.setState({ activeItem: null });
                        if (_this2.sublist) _this2.sublist.style.display = 'none';
                    } },
                _react2.default.createElement(_MenuItem.MenuItem, { items: this.props.item, onItemClick: function onItemClick(event) {
                        return _this2.itemClick(event, _this2.props.item);
                    }, root: this.props.root, parentMenu: this.props.parentMenu }),
                this.props.item.items ? _react2.default.createElement(_NestedMenu.NestedMenu, { className: 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow', index: this.props.index,
                    items: this.props.item.items, menu: this, parentMenu: this.props.parentMenu, root: false }) : null
            );
        }
    }]);

    return NestedMenuItem;
}(_react.Component);

NestedMenuItem.defaultProps = {
    item: null,
    menu: null,
    parentMenu: null,
    root: null,
    index: null
};
NestedMenuItem.propTypes = {
    item: _propTypes2.default.any,
    menu: _propTypes2.default.any,
    parentMenu: _propTypes2.default.string,
    root: _propTypes2.default.bool,
    index: _propTypes2.default.any
};