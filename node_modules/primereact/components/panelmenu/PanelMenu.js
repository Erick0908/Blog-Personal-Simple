'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PanelMenu = exports.PanelMenuHeaderItems = exports.PanelMenuItem = exports.PanelMenuSub = undefined;

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

var PanelMenuSub = exports.PanelMenuSub = function (_Component) {
    _inherits(PanelMenuSub, _Component);

    function PanelMenuSub(props) {
        _classCallCheck(this, PanelMenuSub);

        var _this = _possibleConstructorReturn(this, (PanelMenuSub.__proto__ || Object.getPrototypeOf(PanelMenuSub)).call(this, props));

        _this.item = _this.props.item;
        return _this;
    }

    _createClass(PanelMenuSub, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var items = this.item && this.item.items,
                menuitems = null;

            if (items) {
                menuitems = items.map(function (child, index) {
                    return _react2.default.createElement(PanelMenuItem, { key: 'panelmenuitem_' + index, child: child, tabIndex: _this2.props.expanded ? null : '-1', index: index });
                });
            }

            return _react2.default.createElement(
                'ul',
                { className: 'ui-menu-list ui-helper-reset', style: { display: this.props.expanded ? 'block' : 'none' } },
                menuitems
            );
        }
    }]);

    return PanelMenuSub;
}(_react.Component);

PanelMenuSub.defaultProps = {
    item: null,
    expanded: false
};
PanelMenuSub.propsTypes = {
    item: _propTypes2.default.any,
    expanded: _propTypes2.default.bool
};

var PanelMenuItem = exports.PanelMenuItem = function (_Component2) {
    _inherits(PanelMenuItem, _Component2);

    function PanelMenuItem(props) {
        _classCallCheck(this, PanelMenuItem);

        var _this3 = _possibleConstructorReturn(this, (PanelMenuItem.__proto__ || Object.getPrototypeOf(PanelMenuItem)).call(this, props));

        _this3.child = _this3.props.child;
        _this3.state = { expanded: _this3.child.expanded };
        return _this3;
    }

    _createClass(PanelMenuItem, [{
        key: 'handleClick',
        value: function handleClick(event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            this.setState({ expanded: !this.state.expanded });

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
            var _this4 = this;

            if (this.child.separator) {
                return _react2.default.createElement('li', { key: 'separator_' + this.props.index, className: 'ui-menu-separator ui-widget-content' });
            } else {
                var menuitemClass = (0, _classnames2.default)('ui-menuitem ui-corner-all', this.child.className, {
                    'ui-menu-parent': this.child.items
                }),
                    menuitemLinkClass = (0, _classnames2.default)('ui-menuitem-link ui-corner-all', {
                    'ui-menuitem-link-hasicon': this.child.icon && this.child.items,
                    'ui-state-disabled': this.child.disabled
                }),
                    panelMenuIconClass = (0, _classnames2.default)('ui-panelmenu-icon fa fa-fw', {
                    'fa-caret-right': !this.state.expanded,
                    'fa-caret-down': this.state.expanded
                }),
                    menuitemIconClass = (0, _classnames2.default)('ui-menuitem-icon fa fa-fw', this.child.icon);

                var panelMenuIcon = this.child.items && _react2.default.createElement('span', { className: panelMenuIconClass }),
                    menuitemIcon = this.child.icon && _react2.default.createElement('span', { className: menuitemIconClass }),
                    menuitemText = _react2.default.createElement(
                    'span',
                    { className: 'ui-menuitem-text' },
                    this.child.label
                );

                return _react2.default.createElement(
                    'li',
                    { key: 'menuitem_' + this.props.index, className: menuitemClass, style: this.child.style },
                    _react2.default.createElement(
                        'a',
                        { href: this.child.url || '#', className: menuitemLinkClass, tabIndex: this.props.tabIndex,
                            onClick: function onClick(e) {
                                return _this4.handleClick(e, _this4.child);
                            }, target: this.child.target },
                        panelMenuIcon,
                        menuitemIcon,
                        menuitemText
                    ),
                    this.child.items && _react2.default.createElement(PanelMenuSub, { item: this.child, expanded: this.state.expanded })
                );
            }
        }
    }]);

    return PanelMenuItem;
}(_react.Component);

PanelMenuItem.defaultProps = {
    child: null,
    tabIndex: null,
    index: null
};
PanelMenuItem.propsTypes = {
    child: _propTypes2.default.any,
    tabIndex: _propTypes2.default.bool,
    index: _propTypes2.default.any
};

var PanelMenuHeaderItems = exports.PanelMenuHeaderItems = function (_Component3) {
    _inherits(PanelMenuHeaderItems, _Component3);

    function PanelMenuHeaderItems(props) {
        _classCallCheck(this, PanelMenuHeaderItems);

        var _this5 = _possibleConstructorReturn(this, (PanelMenuHeaderItems.__proto__ || Object.getPrototypeOf(PanelMenuHeaderItems)).call(this, props));

        _this5.item = _this5.props.item;
        _this5.state = { expanded: _this5.item.expanded };
        return _this5;
    }

    _createClass(PanelMenuHeaderItems, [{
        key: 'handleClick',
        value: function handleClick(event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            this.setState({ expanded: !this.state.expanded });

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
            var _this6 = this;

            var panelMenuHeaderClass = (0, _classnames2.default)('ui-widget ui-panelmenu-header ui-state-default', this.item.className, {
                'ui-corner-top': this.props.first,
                'ui-corner-bottom': this.props.last && !this.state.expanded,
                'ui-state-active': this.state.expanded,
                'ui-state-disabled': this.item.disabled
            }),
                headerLinkClass = (0, _classnames2.default)({ 'ui-panelmenu-headerlink-hasicon': this.item.icon }),
                panelMenuIconClass = (0, _classnames2.default)('ui-panelmenu-icon fa', {
                'fa-caret-right': !this.state.expanded,
                'fa-caret-down': this.state.expanded
            }),
                menuitemIconClass = (0, _classnames2.default)('ui-menuitem-icon fa', this.item.icon);

            var panelMenuIcon = this.item.items && _react2.default.createElement('span', { className: panelMenuIconClass }),
                menuitemIcon = this.item.icon && _react2.default.createElement('span', { className: menuitemIconClass }),
                menuitemText = _react2.default.createElement(
                'span',
                { className: 'ui-menuitem-text' },
                this.item.label
            );

            var panelMenuContentWrapperClass = (0, _classnames2.default)('ui-panelmenu-content-wrapper', {
                'ui-panelmenu-content-wrapper-overflown': !this.state.expanded
            }),
                panelMenuContent = this.item.items && _react2.default.createElement(
                'div',
                { className: panelMenuContentWrapperClass, style: { display: this.state.expanded ? 'block' : 'none' } },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-panelmenu-content ui-widget-content' },
                    _react2.default.createElement(PanelMenuSub, { item: this.item, expanded: true })
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'ui-panelmenu-panel' },
                _react2.default.createElement(
                    'div',
                    { className: panelMenuHeaderClass, style: this.item.style },
                    _react2.default.createElement(
                        'a',
                        { href: this.item.url || '#', className: headerLinkClass, onClick: function onClick(e) {
                                return _this6.handleClick(e, _this6.item);
                            }, target: this.item.target },
                        panelMenuIcon,
                        menuitemIcon,
                        menuitemText
                    )
                ),
                panelMenuContent
            );
        }
    }]);

    return PanelMenuHeaderItems;
}(_react.Component);

PanelMenuHeaderItems.defaultProps = {
    item: null,
    first: false,
    last: false
};
PanelMenuHeaderItems.propsTypes = {
    item: _propTypes2.default.array,
    first: _propTypes2.default.bool,
    last: _propTypes2.default.bool
};

var PanelMenu = exports.PanelMenu = function (_Component4) {
    _inherits(PanelMenu, _Component4);

    function PanelMenu() {
        _classCallCheck(this, PanelMenu);

        return _possibleConstructorReturn(this, (PanelMenu.__proto__ || Object.getPrototypeOf(PanelMenu)).apply(this, arguments));
    }

    _createClass(PanelMenu, [{
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-panelmenu ui-widget', this.props.className),
                panel = null;

            if (this.props.model) {
                var length = this.props.model.length;

                panel = this.props.model.map(function (item, index) {
                    return _react2.default.createElement(PanelMenuHeaderItems, { key: 'menuItem_' + index, item: item, first: index === 0, last: length === index });
                });
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                panel
            );
        }
    }]);

    return PanelMenu;
}(_react.Component);

PanelMenu.defaultProps = {
    id: null,
    model: null,
    style: null,
    className: null
};
PanelMenu.propsTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};