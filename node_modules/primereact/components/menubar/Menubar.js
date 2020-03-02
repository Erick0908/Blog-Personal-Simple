'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Menubar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _NestedMenu = require('../nestedmenu/NestedMenu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menubar = exports.Menubar = function (_Component) {
    _inherits(Menubar, _Component);

    function Menubar(props) {
        _classCallCheck(this, Menubar);

        var _this = _possibleConstructorReturn(this, (Menubar.__proto__ || Object.getPrototypeOf(Menubar)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Menubar, [{
        key: 'render',
        value: function render() {

            var className = (0, _classnames2.default)('ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix', this.props.className);
            var ulClass = (0, _classnames2.default)('ui-menu-list ui-menubar-root-list ui-helper-clearfix');

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(
                    _NestedMenu.NestedMenu,
                    { className: ulClass, items: this.props.model, parentMenu: 'Menubar', root: true, index: Math.random() },
                    this.props.children
                )
            );
        }
    }]);

    return Menubar;
}(_react.Component);

Menubar.defaultProps = {
    id: null,
    model: null,
    style: null,
    className: null
};
Menubar.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};