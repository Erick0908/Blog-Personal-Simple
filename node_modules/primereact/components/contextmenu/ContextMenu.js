'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContextMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _NestedMenu = require('../nestedmenu/NestedMenu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = exports.ContextMenu = function (_Component) {
    _inherits(ContextMenu, _Component);

    function ContextMenu() {
        _classCallCheck(this, ContextMenu);

        return _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).apply(this, arguments));
    }

    _createClass(ContextMenu, [{
        key: 'toggle',
        value: function toggle(event) {
            if (this.container.offsetParent) this.hide();else this.show(event);
        }
    }, {
        key: 'show',
        value: function show(event) {
            this.position(event);
            _DomHandler2.default.fadeIn(this.container, 250);
            this.container.style.display = 'block';

            if (event) {
                event.preventDefault();
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.container) {
                this.container.style.display = 'none';
            }
        }
    }, {
        key: 'position',
        value: function position(event) {
            if (event) {
                var left = event.pageX + 1;
                var top = event.pageY + 1;
                var width = this.container.offsetParent ? this.container.offsetWidth : _DomHandler2.default.getHiddenElementOuterWidth(this.container);
                var height = this.container.offsetParent ? this.container.offsetHeight : _DomHandler2.default.getHiddenElementOuterHeight(this.container);
                var viewport = _DomHandler2.default.getViewport();

                //flip
                if (left + width - document.body.scrollLeft > viewport.width) {
                    left -= width;
                }

                //flip
                if (top + height - document.body.scrollTop > viewport.height) {
                    top -= height;
                }

                //fit
                if (left < document.body.scrollLeft) {
                    left = document.body.scrollLeft;
                }

                //fit
                if (top < document.body.scrollTop) {
                    top = document.body.scrollTop;
                }

                this.container.style.left = left + 'px';
                this.container.style.top = top + 'px';
            }
        }
    }, {
        key: 'bindDocumentListener',
        value: function bindDocumentListener() {
            var _this2 = this;

            this.documentClickListener = function () {
                _this2.hide();
            };
            document.addEventListener('click', this.documentClickListener, false);

            var documentEvent = document.createEvent('HTMLEvents');
            documentEvent.initEvent('click', true, false);

            if (this.props.global) {
                this.rightClickListener = function (event) {
                    document.dispatchEvent(documentEvent);
                    _this2.show(event);
                    event.preventDefault();
                };
                document.addEventListener('contextmenu', this.rightClickListener);
            } else if (this.props.target) {
                this.rightClickListener = function (event) {
                    document.dispatchEvent(documentEvent);
                    _this2.show(event);
                    event.preventDefault();
                    event.stopPropagation();
                };

                document.getElementById(this.props.target).addEventListener('contextmenu', this.rightClickListener);
            }
        }
    }, {
        key: 'unbindDocumentListener',
        value: function unbindDocumentListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }

            if (this.rightClickListener) {
                document.removeEventListener('contextmenu', this.rightClickListener);
                this.rightClickListener = null;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.bindDocumentListener();

            if (this.props.appendTo) {
                if (this.props.appendTo === 'body') document.body.appendChild(this.container);else _DomHandler2.default.appendChild(this.container, this.props.appendTo);
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

            var className = (0, _classnames2.default)('ui-contextmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-dynamic ui-shadow', this.props.className);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        return _this3.container = el;
                    } },
                _react2.default.createElement(_NestedMenu.NestedMenu, { className: 'ui-menu-list ui-helper-reset', items: this.props.model, root: true, parentMenu: 'ContextMenu', index: Math.random() })
            );
        }
    }]);

    return ContextMenu;
}(_react.Component);

ContextMenu.defaultProps = {
    id: null,
    model: null,
    style: null,
    className: null,
    global: false,
    target: null,
    appendTo: null
};
ContextMenu.propsTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    global: _propTypes2.default.bool,
    target: _propTypes2.default.any,
    appendTo: _propTypes2.default.any
};