'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SlideMenu = exports.SlideMenuSub = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideMenuSub = exports.SlideMenuSub = function (_Component) {
    _inherits(SlideMenuSub, _Component);

    function SlideMenuSub(props) {
        _classCallCheck(this, SlideMenuSub);

        var _this = _possibleConstructorReturn(this, (SlideMenuSub.__proto__ || Object.getPrototypeOf(SlideMenuSub)).call(this, props));

        _this.state = { activeItemIndex: null };
        return _this;
    }

    _createClass(SlideMenuSub, [{
        key: 'itemClick',
        value: function itemClick(event, item, index) {
            var _this2 = this;

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

            if (item.items && !this.props.isAnimating()) {
                this.props.onMenuItemClick();

                this.setState({ activeItemIndex: index });
                this.props.setAnimating(true);
                setTimeout(function () {
                    return _this2.props.setAnimating(false);
                }, this.props.effectDuration);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var menuListClass = (0, _classnames2.default)('ui-menu-list', {
                'ui-helper-reset ui-menu-rootlist': this.props.root,
                'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child': !this.props.root
            }),
                menuListStyle = {
                'width': this.props.menuWidth,
                'left': this.props.root ? this.props.slideMenuLeft : this.props.menuWidth,
                'transitionProperty': this.props.root ? 'left' : 'none',
                'transitionDuration': this.props.effectDuration + 'ms',
                'transitionTimingFunction': this.props.easing
            };

            var menuMap = this.props.root ? this.props.item : this.props.item.items;

            return _react2.default.createElement(
                'ul',
                { className: menuListClass, style: menuListStyle },
                menuMap && menuMap.map(function (child, index) {
                    if (child.separator) {
                        return _react2.default.createElement('li', { key: 'item_' + index, className: 'ui-menu-separator ui-widget-content' });
                    } else {
                        var menuitemClass = (0, _classnames2.default)('ui-menuitem ui-widget ui-corner-all', {
                            'ui-menu-parent': child.items,
                            'ui-slidemenuitem-active': index === _this3.state.activeItemIndex
                        }),
                            menuLinkClass = (0, _classnames2.default)('ui-menuitem-link ui-corner-all', {
                            'ui-menuitem-link-parent': child.items,
                            'ui-state-disabled': child.disabled
                        }),
                            menuiconClass = (0, _classnames2.default)('ui-menuitem-icon fa fa-fw', child.icon);

                        return _react2.default.createElement(
                            'li',
                            { key: 'item_' + index, className: menuitemClass },
                            _react2.default.createElement(
                                'a',
                                { href: child.url || '#', className: menuLinkClass, target: child.target, onClick: function onClick(e) {
                                        return _this3.itemClick(e, child, index);
                                    } },
                                child.items && _react2.default.createElement('span', { className: 'ui-submenu-icon fa fa-fw fa-caret-right' }),
                                child.icon && _react2.default.createElement('span', { className: menuiconClass }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'ui-menuitem-text' },
                                    child.label
                                )
                            ),
                            child.items && _react2.default.createElement(SlideMenuSub, { item: child, menuWidth: _this3.props.menuWidth, onMenuItemClick: _this3.props.onMenuItemClick, isAnimating: _this3.props.isAnimating, setAnimating: _this3.props.setAnimating })
                        );
                    }
                })
            );
        }
    }]);

    return SlideMenuSub;
}(_react.Component);

SlideMenuSub.defaultProps = {
    item: null,
    root: false,
    backLabel: 'Back',
    menuWidth: null,
    effectDuration: null,
    easing: 'ease-out',
    slideMenu: null,
    slideMenuLeft: null,
    onMenuItemClick: null,
    isAnimating: null,
    setAnimating: null
};
SlideMenuSub.propsTypes = {
    item: _propTypes2.default.any,
    root: _propTypes2.default.bool,
    backLabel: _propTypes2.default.string,
    menuWidth: _propTypes2.default.any,
    effectDuration: _propTypes2.default.any,
    easing: _propTypes2.default.string,
    slideMenu: _propTypes2.default.any,
    slideMenuLeft: _propTypes2.default.string,
    onMenuItemClick: _propTypes2.default.func,
    isAnimating: _propTypes2.default.func,
    setAnimating: _propTypes2.default.func
};

var SlideMenu = exports.SlideMenu = function (_Component2) {
    _inherits(SlideMenu, _Component2);

    function SlideMenu(props) {
        _classCallCheck(this, SlideMenu);

        var _this4 = _possibleConstructorReturn(this, (SlideMenu.__proto__ || Object.getPrototypeOf(SlideMenu)).call(this, props));

        _this4.left = 0;
        _this4.animating = false;
        _this4.onClick = _this4.onClick.bind(_this4);
        _this4.goBack = _this4.goBack.bind(_this4);
        _this4.onMenuItemClick = _this4.onMenuItemClick.bind(_this4);
        _this4.isAnimating = _this4.isAnimating.bind(_this4);
        _this4.setAnimating = _this4.setAnimating.bind(_this4);
        return _this4;
    }

    _createClass(SlideMenu, [{
        key: 'onMenuItemClick',
        value: function onMenuItemClick() {
            this.left -= this.props.menuWidth;
            this.rootSlideMenuSub.style.left = this.left + 'px';
            this.updateBackward();
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.container.offsetParent) this.hide();else this.show(event);
        }
    }, {
        key: 'show',
        value: function show(event) {
            this.preventDocumentDefault = true;
            this.container.style.display = 'block';
            _DomHandler2.default.absolutePosition(this.container, event.target);
            _DomHandler2.default.fadeIn(this.container, 250);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.container.style.display = 'none';
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            this.preventDocumentDefault = true;
        }
    }, {
        key: 'goBack',
        value: function goBack() {
            this.left += this.props.menuWidth;
            this.rootSlideMenuSub.style.left = this.left + 'px';
            this.updateBackward();
        }
    }, {
        key: 'updateBackward',
        value: function updateBackward() {
            this.backward.style.display = this.left ? 'block' : 'none';
        }
    }, {
        key: 'isAnimating',
        value: function isAnimating() {
            return this.animating;
        }
    }, {
        key: 'setAnimating',
        value: function setAnimating(_animating) {
            this.animating = _animating;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            if (this.props.popup) {
                this.slideMenuContent.style.height = this.props.viewportHeight - _DomHandler2.default.getHiddenElementOuterHeight(this.backward) + 'px';

                this.documentClickListener = function () {
                    if (!_this5.preventDocumentDefault) {
                        _this5.hide();
                    }
                    _this5.preventDocumentDefault = false;
                };

                document.addEventListener('click', this.documentClickListener);
            } else {
                this.slideMenuContent.style.height = this.props.viewportHeight + 'px';
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var menuClass = (0, _classnames2.default)('ui-menu ui-slidemenu ui-widget ui-widget-content ui-corner-all', this.props.className, {
                'ui-menu-dynamic ui-shadow': this.props.popup
            });
            return _react2.default.createElement(
                'div',
                { id: this.props.id, ref: function ref(el) {
                        return _this6.container = el;
                    }, className: menuClass, style: this.props.style, onClick: this.onClick },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-slidemenu-wrapper', style: { 'height': this.props.viewportHeight + 'px' } },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(el) {
                                return _this6.slideMenuContent = el;
                            }, className: 'ui-slidemenu-content' },
                        _react2.default.createElement(SlideMenuSub, { ref: function ref(el) {
                                return _this6.rootSlideMenuSub = _reactDom2.default.findDOMNode(el);
                            }, onMenuItemClick: this.onMenuItemClick, item: this.props.model, slideMenuLeft: 0, root: true, menuWidth: this.props.menuWidth,
                            effectDuration: this.props.effectDuration, easing: this.props.easing, isAnimating: this.isAnimating, setAnimating: this.setAnimating })
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(el) {
                                return _this6.backward = el;
                            }, className: 'ui-slidemenu-backward ui-widget-header ui-corner-all', style: { 'display': this.left ? 'block' : 'none' }, onClick: this.goBack },
                        _react2.default.createElement('span', { className: 'fa fa-fw fa-caret-left' }),
                        ' ',
                        _react2.default.createElement(
                            'span',
                            null,
                            this.props.backLabel
                        )
                    )
                )
            );
        }
    }]);

    return SlideMenu;
}(_react.Component);

SlideMenu.defaultProps = {
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    easing: 'ease-out',
    effectDuration: 250,
    backLabel: 'Back',
    menuWidth: 190,
    viewportHeight: 175
};
SlideMenu.propsTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    popup: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    easing: _propTypes2.default.string,
    effectDuration: _propTypes2.default.number,
    backLabel: _propTypes2.default.string,
    menuWidth: _propTypes2.default.number,
    viewportHeight: _propTypes2.default.number
};