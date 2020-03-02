'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TieredMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _NestedMenu = require('../nestedmenu/NestedMenu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TieredMenu = exports.TieredMenu = function (_Component) {
    _inherits(TieredMenu, _Component);

    function TieredMenu(props) {
        _classCallCheck(this, TieredMenu);

        var _this = _possibleConstructorReturn(this, (TieredMenu.__proto__ || Object.getPrototypeOf(TieredMenu)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(TieredMenu, [{
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
        }
    }, {
        key: 'hide',
        value: function hide(event) {
            if (this.container) this.container.style.display = 'none';
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

            var divClass = (0, _classnames2.default)('ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix', this.props.className, { 'ui-menu-dynamic ui-shadow': this.props.popup });
            var ulClass = (0, _classnames2.default)('ui-menu-list ui-helper-reset');

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: divClass, style: this.props.style, ref: function ref(el) {
                        return _this3.container = el;
                    } },
                _react2.default.createElement(_NestedMenu.NestedMenu, { className: ulClass, items: this.props.model, root: true, parentMenu: 'TieredMenu', index: Math.random() })
            );
        }
    }]);

    return TieredMenu;
}(_react.Component);

TieredMenu.defaultProps = {
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null
};
TieredMenu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    popup: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};