'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MegaMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuItem = require('../menu/MenuItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MegaMenu = exports.MegaMenu = function (_Component) {
    _inherits(MegaMenu, _Component);

    function MegaMenu(props) {
        _classCallCheck(this, MegaMenu);

        var _this = _possibleConstructorReturn(this, (MegaMenu.__proto__ || Object.getPrototypeOf(MegaMenu)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(MegaMenu, [{
        key: 'onItemMouseEnter',
        value: function onItemMouseEnter(event, item) {
            if (item.disabled) {
                return;
            }

            this.setState({ activeItem: item });
            var submenu = event.currentTarget.children[1];

            if (submenu) {
                submenu.style.zIndex = String(_DomHandler2.default.generateZIndex());

                if (this.props.orientation === 'horizontal') {
                    submenu.style.top = _DomHandler2.default.getOuterHeight(event.currentTarget.children[0]) + 'px';
                    submenu.style.left = '0px';
                } else if (this.props.orientation === 'vertical') {
                    submenu.style.top = '0px';
                    submenu.style.left = _DomHandler2.default.getOuterWidth(event.currentTarget.children[0]) + 'px';
                }
            }
        }
    }, {
        key: 'onItemMouseLeave',
        value: function onItemMouseLeave(event, link) {
            this.setState({ activeItem: null });
        }
    }, {
        key: 'getColumnClass',
        value: function getColumnClass(menuitem) {
            var length = menuitem.items ? menuitem.items.length : 0;
            var columnClass = void 0;
            switch (length) {
                case 2:
                    columnClass = 'ui-g-6';
                    break;

                case 3:
                    columnClass = 'ui-g-4';
                    break;

                case 4:
                    columnClass = 'ui-g-3';
                    break;

                case 6:
                    columnClass = 'ui-g-2';
                    break;

                default:
                    columnClass = 'ui-g-12';
                    break;
            }

            return columnClass;
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

            this.setState({ activeItem: null });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var divClass = (0, _classnames2.default)('ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix', this.props.className, { 'ui-megamenu-vertical': this.props.orientation === 'vertical' });
            var horizontalChild, menuItems;
            if (this.props.orientation === 'horizontal') {
                horizontalChild = _react2.default.createElement(
                    'li',
                    { className: 'ui-menuitem ui-menuitem-custom ui-widget ui-corner-all' },
                    this.props.children
                );
            }
            menuItems = this.props.model && this.props.model.map(function (category, index) {
                var liClass = (0, _classnames2.default)('ui-menuitem ui-widget ui-corner-all', { 'ui-menu-parent': category.items, 'ui-menuitem-active': category === _this2.state.activeItem });
                var aClass = (0, _classnames2.default)('ui-menuitem-link ui-corner-all ui-submenu-link', { 'ui-state-disabled': category.disabled });
                var spanClass = (0, _classnames2.default)('ui-menuitem-icon fa fa-fw ', category.icon);
                var submenuClass = (0, _classnames2.default)('ui-submenu-icon fa fa-fw ', { 'fa-caret-down': _this2.props.orientation === 'horizontal', 'fa-caret-right': _this2.props.orientation === 'vertical' });

                var categoryItem = category.separator ? _react2.default.createElement('li', { className: 'ui-menu-separator ui-widget-content', key: index }) : _react2.default.createElement(
                    'li',
                    { onMouseEnter: function onMouseEnter(event) {
                            return _this2.onItemMouseEnter(event, category);
                        }, onMouseLeave: function onMouseLeave(event) {
                            return _this2.onItemMouseLeave(event, category);
                        },
                        className: liClass, ref: function ref(el) {
                            return _this2.item = el;
                        }, key: index },
                    _react2.default.createElement(
                        'a',
                        { className: aClass },
                        _react2.default.createElement('span', { className: spanClass }),
                        _react2.default.createElement(
                            'span',
                            { className: 'ui-menuitem-text' },
                            category.label
                        ),
                        _react2.default.createElement('span', { className: submenuClass })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-g' },
                            category.items && category.items.map(function (column, index1) {
                                return _react2.default.createElement(
                                    'div',
                                    { className: _this2.getColumnClass(category), key: index + '_' + index1 },
                                    column && column.map(function (submenu, index2) {
                                        return _react2.default.createElement(
                                            'ul',
                                            { className: 'ui-menu-list ui-helper-reset', key: index + '_' + index1 + '_' + index2 },
                                            _react2.default.createElement(
                                                'li',
                                                { className: 'ui-widget-header ui-corner-all' },
                                                _react2.default.createElement(
                                                    'h3',
                                                    null,
                                                    submenu.label
                                                )
                                            ),
                                            submenu.items && submenu.items.map(function (item, index3) {
                                                return item.separator ? _react2.default.createElement('li', { className: 'ui-menu-separator ui-widget-content', key: index + '_' + index1 + '_' + index2 + '_' + index3 }) : _react2.default.createElement(
                                                    'li',
                                                    { className: 'ui-menuitem ui-widget ui-corner-all', key: index + '_' + index1 + '_' + index2 + '_' + index3 },
                                                    _react2.default.createElement(_MenuItem.MenuItem, { items: item, onItemClick: function onItemClick(event) {
                                                            return _this2.itemClick(event, item);
                                                        }, index: index + '_' + index1 + '_' + index2 + '_' + index3 })
                                                );
                                            })
                                        );
                                    })
                                );
                            })
                        )
                    )
                );
                return categoryItem;
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: divClass, style: this.props.style, ref: function ref(el) {
                        return _this2.container = el;
                    } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-menu-list ui-helper-reset ui-menubar-root-list' },
                    menuItems,
                    horizontalChild
                )
            );
        }
    }]);

    return MegaMenu;
}(_react.Component);

MegaMenu.defaultProps = {
    id: null,
    model: null,
    style: null,
    className: null,
    orientation: 'horizontal'
};
MegaMenu.propsTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    orientation: _propTypes2.default.string
};