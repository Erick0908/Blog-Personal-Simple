'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScrollPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollPanel = exports.ScrollPanel = function (_Component) {
    _inherits(ScrollPanel, _Component);

    function ScrollPanel(props) {
        _classCallCheck(this, ScrollPanel);

        var _this = _possibleConstructorReturn(this, (ScrollPanel.__proto__ || Object.getPrototypeOf(ScrollPanel)).call(this, props));

        _this.moveBar = _this.moveBar.bind(_this);
        _this.onBarMouseDown = _this.onBarMouseDown.bind(_this);
        _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_this);
        _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_this);
        return _this;
    }

    _createClass(ScrollPanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);

            window.addEventListener('resize', this.moveBar);
            this.initialized = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.initialized) {
                window.removeEventListener('resize', this.moveBar);
            }
        }
    }, {
        key: 'moveBar',
        value: function moveBar() {
            var _this2 = this;

            var totalHeight = this.content.scrollHeight;
            var ownHeight = this.content.clientHeight;
            var right = (this.container.clientWidth - this.bar.clientWidth) * -1;
            this.scrollRatio = ownHeight / totalHeight;

            this.requestAnimationFrame(function () {
                if (_this2.scrollRatio >= 1) {
                    _DomHandler2.default.addClass(_this2.bar, 'ui-scrollpanel-hidden');
                } else {
                    _DomHandler2.default.removeClass(_this2.bar, 'ui-scrollpanel-hidden');
                    _this2.bar.style.cssText = 'height:' + Math.max(_this2.scrollRatio * 100, 10) + '%; top:' + _this2.content.scrollTop / totalHeight * 100 + '%;right:' + right + 'px;';
                }
            });
        }
    }, {
        key: 'onBarMouseDown',
        value: function onBarMouseDown(e) {
            this.lastPageY = e.pageY;
            _DomHandler2.default.addClass(this.bar, 'ui-scrollpanel-grabbed');
            _DomHandler2.default.addClass(document.body, 'ui-scrollpanel-grabbed');

            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        }
    }, {
        key: 'onDocumentMouseMove',
        value: function onDocumentMouseMove(e) {
            var _this3 = this;

            var delta = e.pageY - this.lastPageY;
            this.lastPageY = e.pageY;

            this.requestAnimationFrame(function () {
                _this3.content.scrollTop += delta / _this3.scrollRatio;
            });
        }
    }, {
        key: 'onDocumentMouseUp',
        value: function onDocumentMouseUp(e) {
            _DomHandler2.default.removeClass(this.bar, 'ui-scrollpanel-grabbed');
            _DomHandler2.default.removeClass(document.body, 'ui-scrollpanel-grabbed');

            document.removeEventListener('mousemove', this.onDocumentMouseMove);
            document.removeEventListener('mouseup', this.onDocumentMouseUp);
        }
    }, {
        key: 'requestAnimationFrame',
        value: function requestAnimationFrame(f) {
            var frame = window.requestAnimationFrame || this.timeoutFrame;
            frame(f);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var className = (0, _classnames2.default)('ui-scrollpanel ui-widget ui-widget-content ui-corner-all', this.props.className);

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        _this4.container = el;
                    }, id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-scrollpanel-wrapper' },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(el) {
                                _this4.content = el;
                            }, className: 'ui-scrollpanel-content', onScroll: this.moveBar, onMouseEnter: this.moveBar },
                        this.props.children
                    )
                ),
                _react2.default.createElement('div', { ref: function ref(el) {
                        _this4.bar = el;
                    }, className: 'ui-scrollpanel-bar', onMouseDown: this.onBarMouseDown })
            );
        }
    }]);

    return ScrollPanel;
}(_react.Component);

ScrollPanel.defaultProps = {
    style: null,
    className: null
};
ScrollPanel.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};