'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BreadCrumb = undefined;

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

var BreadCrumb = exports.BreadCrumb = function (_Component) {
    _inherits(BreadCrumb, _Component);

    function BreadCrumb() {
        _classCallCheck(this, BreadCrumb);

        var _this = _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(BreadCrumb, [{
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
        key: 'onHomeClick',
        value: function onHomeClick(event) {
            if (this.props.home) {
                this.itemClick(event, this.props.home);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all', this.props.className);
            var homeClass = (0, _classnames2.default)('ui-menuitem-link', { 'ui-state-disabled': this.props.home && this.props.home.disabled });

            var home, right, menu;

            if (this.props.home) {
                home = _react2.default.createElement(
                    'li',
                    { className: 'ui-breadcrumb-home' },
                    this.props.home.url ? _react2.default.createElement(
                        'a',
                        { href: this.props.home.url || '#', className: homeClass, target: this.props.home.target,
                            onClick: function onClick(event) {
                                return _this2.itemClick(event, _this2.props.home);
                            } },
                        _react2.default.createElement('span', { className: 'fa fa-home' })
                    ) : _react2.default.createElement(
                        'a',
                        { className: homeClass, target: this.props.home.target,
                            onClick: function onClick(event) {
                                return _this2.itemClick(event, _this2.props.home);
                            } },
                        _react2.default.createElement('span', { className: 'fa fa-home' })
                    )
                );
            } else {
                home = _react2.default.createElement('li', { className: 'ui-breadcrumb-home fa fa-home' });
            }
            if (this.props.model) {
                right = _react2.default.createElement('li', { className: 'ui-breadcrumb-chevron fa fa-chevron-right' });
            }
            menu = this.props.model && this.props.model.map(function (item, index) {
                var menuItem = _react2.default.createElement(
                    'span',
                    { key: index },
                    _react2.default.createElement(
                        'li',
                        { role: 'menuitem' },
                        _react2.default.createElement(_MenuItem.MenuItem, { items: item, index: index, onItemClick: function onItemClick(event) {
                                return _this2.itemClick(event, item);
                            } })
                    ),
                    _this2.props.model.length - 1 !== index && _react2.default.createElement('li', { className: 'ui-breadcrumb-chevron fa fa-chevron-right', style: { marginLeft: 4, marginRight: 4 } })
                );
                return menuItem;
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        return _this2.container = el;
                    } },
                _react2.default.createElement(
                    'ul',
                    null,
                    home,
                    right,
                    menu
                )
            );
        }
    }]);

    return BreadCrumb;
}(_react.Component);

BreadCrumb.defaultProps = {
    id: null,
    model: null,
    home: null,
    style: null,
    className: null
};
BreadCrumb.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    home: _propTypes2.default.any,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};