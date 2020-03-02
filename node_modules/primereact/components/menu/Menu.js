'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuItem = require('./MenuItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = exports.Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu() {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(Menu, [{
        key: 'hasSubMenu',
        value: function hasSubMenu() {
            if (this.props.model) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.props.model[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var items = _step.value;

                        if (items.items) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return false;
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

            if (this.props.popup) {
                this.hide(event);
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.documentClickListener) {
                this.dropdownClick = true;
            }
            if (this.container.offsetParent) this.hide(event);else this.show(event);
        }
    }, {
        key: 'show',
        value: function show(event) {
            var target = event.currentTarget;
            this.onResizeTarget = event.currentTarget;
            this.container.style.display = 'block';
            _DomHandler2.default.absolutePosition(this.container, target);
            _DomHandler2.default.fadeIn(this.container, 250);
            this.bindDocumentListener();
            if (this.props.onShow) {
                this.props.onShow({
                    originalEvent: event
                });
            }
        }
    }, {
        key: 'hide',
        value: function hide(event) {
            if (this.container) this.container.style.display = 'none';
            if (this.props.onHide) {
                this.props.onHide({
                    originalEvent: event
                });
            }
            this.unbindDocumentListener();
        }
    }, {
        key: 'bindDocumentListener',
        value: function bindDocumentListener() {
            var _this2 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function () {
                    if (_this2.dropdownClick) _this2.dropdownClick = false;else _this2.hide();
                };

                document.addEventListener('click', this.documentClickListener);
            }

            window.addEventListener('resize', function () {
                if (_this2.onResizeTarget && _this2.container.offsetParent) {
                    _DomHandler2.default.absolutePosition(_this2.container, _this2.onResizeTarget);
                }
            });
        }
    }, {
        key: 'unbindDocumentListener',
        value: function unbindDocumentListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentListener();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix', this.props.className, { 'ui-menu-dynamic ui-shadow': this.props.popup });
            var itemSubMenu, itemMenu;

            if (this.hasSubMenu()) {
                itemSubMenu = this.props.model && this.props.model.map(function (submenu, indexSub) {
                    var subMenu = _react2.default.createElement(
                        'div',
                        { key: indexSub },
                        _react2.default.createElement(
                            'li',
                            { className: submenu.separator ? 'ui-menu-separator ui-widget-content' : 'ui-widget-header ui-corner-all' },
                            _react2.default.createElement(
                                'h3',
                                null,
                                submenu.label
                            )
                        ),
                        submenu.items && submenu.items.map(function (item, indexItem) {
                            var menu = _react2.default.createElement(
                                'li',
                                { className: item.separator ? 'ui-menu-separator ui-widget-content' : 'ui-menuitem ui-widget ui-corner-all',
                                    key: item.label + '_' + indexSub + '_' + indexItem },
                                _react2.default.createElement(_MenuItem.MenuItem, { items: item, index: indexItem, onItemClick: function onItemClick(event) {
                                        return _this3.itemClick(event, item);
                                    } })
                            );
                            return menu;
                        })
                    );
                    return subMenu;
                });
            } else {
                itemMenu = this.props.model && this.props.model.map(function (item, index) {
                    var menu = _react2.default.createElement(
                        'li',
                        { className: item.separator ? 'ui-menu-separator ui-widget-content' : 'ui-menuitem ui-widget ui-corner-all',
                            key: item.label + '_' + index },
                        _react2.default.createElement(_MenuItem.MenuItem, { items: item, index: index, onItemClick: function onItemClick(event) {
                                return _this3.itemClick(event, item);
                            } })
                    );
                    return menu;
                });
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        return _this3.container = el;
                    }, onClick: function onClick() {
                        return _this3.preventDocumentDefault = true;
                    } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-menu-list ui-helper-reset' },
                    itemSubMenu,
                    itemMenu
                )
            );
        }
    }]);

    return Menu;
}(_react.Component);

Menu.defaultProps = {
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    onShow: null,
    onHide: null
};
Menu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    popup: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onShow: _propTypes2.default.func,
    onHide: _propTypes2.default.func
};