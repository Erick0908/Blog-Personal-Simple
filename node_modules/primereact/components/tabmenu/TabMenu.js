'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuItem = require('../menu/MenuItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabMenu = exports.TabMenu = function (_Component) {
    _inherits(TabMenu, _Component);

    function TabMenu(props) {
        _classCallCheck(this, TabMenu);

        var _this = _possibleConstructorReturn(this, (TabMenu.__proto__ || Object.getPrototypeOf(TabMenu)).call(this, props));

        _this.state = { activeItem: _this.props.activeItem || _this.props.model[0] };
        return _this;
    }

    _createClass(TabMenu, [{
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

            this.setState({ activeItem: item });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tabMenuClass = (0, _classnames2.default)('ui-tabmenu ui-widget ui-widget-content ui-corner-all', this.props.className);

            var item = this.props.model && this.props.model.map(function (item, index) {
                var listClass = (0, _classnames2.default)('ui-tabmenuitem ui-state-default ui-corner-top', { 'ui-state-disabled': item.disabled }, { 'ui-tabmenuitem-hasicon': item.icon }, { 'ui-state-active': _this2.state.activeItem === item });
                var list = _react2.default.createElement(
                    'li',
                    { className: listClass, key: 'tabmenuItem_' + index },
                    _react2.default.createElement(_MenuItem.MenuItem, { index: index, items: item, onItemClick: function onItemClick(event) {
                            return _this2.itemClick(event, item);
                        } })
                );
                return list;
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: tabMenuClass, style: this.props.style, ref: function ref(el) {
                        return _this2.container = el;
                    } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all', role: 'tablist' },
                    item
                )
            );
        }
    }]);

    return TabMenu;
}(_react.Component);

TabMenu.defaultProps = {
    id: null,
    model: null,
    activeItem: null,
    style: null,
    className: null
};
TabMenu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    activeItem: _propTypes2.default.any,
    style: _propTypes2.default.any,
    className: _propTypes2.default.string
};