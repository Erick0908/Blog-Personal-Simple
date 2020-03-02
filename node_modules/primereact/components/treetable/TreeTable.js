'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTable = exports.UITreeRow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _Column = require('../column/Column');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITreeRow = exports.UITreeRow = function (_Component) {
    _inherits(UITreeRow, _Component);

    function UITreeRow(props) {
        _classCallCheck(this, UITreeRow);

        var _this = _possibleConstructorReturn(this, (UITreeRow.__proto__ || Object.getPrototypeOf(UITreeRow)).call(this, props));

        _this.node = _this.props.node;
        _this.node.parent = _this.props.parentNode;
        _this.treeTable = _this.props.treeTable;
        _this.state = { expanded: _this.node.expanded };
        return _this;
    }

    _createClass(UITreeRow, [{
        key: 'toggle',
        value: function toggle(event) {
            if (this.state.expanded && this.treeTable.props.onNodeCollapse) this.treeTable.props.onNodeCollapse({ originalEvent: event, node: this.node });else if (this.treeTable.props.onNodeExpand) this.treeTable.props.onNodeExpand({ originalEvent: event, node: this.node });

            this.setState({ expanded: !this.state.expanded });

            event.preventDefault();
        }
    }, {
        key: 'isLeaf',
        value: function isLeaf() {
            return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            return this.treeTable.isSelected(this.node);
        }
    }, {
        key: 'onRowClick',
        value: function onRowClick(event) {
            this.treeTable.onRowClick(event, this.node);
        }
    }, {
        key: 'onRowTouchEnd',
        value: function onRowTouchEnd() {
            this.treeTable.onRowTouchEnd();
        }
    }, {
        key: 'resolveFieldData',
        value: function resolveFieldData(data, field) {
            if (data && field) {
                if (field.indexOf('.') === -1) {
                    return data[field];
                } else {
                    var fields = field.split('.');
                    var value = data;
                    for (var i = 0, len = fields.length; i < len; ++i) {
                        value = value[fields[i]];
                    }
                    return value;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tableRowClass = (0, _classnames2.default)('ui-treetable-row', {
                'ui-state-highlight': this.isSelected(),
                'ui-treetable-row-selectable': this.treeTable.props.selectionMode && this.node.selectable !== false
            });

            var childTbody = this.node.children && this.node.children.map(function (childNode, index) {
                return _react2.default.createElement(UITreeRow, { key: index, node: childNode, index: index, level: _this2.props.level + 1, labelExpand: _this2.props.labelExpand, labelCollapse: _this2.props.labelCollapse, treeTable: _this2.treeTable, parentNode: _this2.node });
            });

            return _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                    'tr',
                    { className: tableRowClass },
                    this.treeTable.columns && this.treeTable.columns.map(function (col, i) {
                        var toggler = null,
                            checkbox = null;

                        if (i === 0) {
                            var togglerClass = (0, _classnames2.default)('ui-treetable-toggler fa fa-fw ui-c', {
                                'fa-caret-down': _this2.state.expanded,
                                'fa-caret-right': !_this2.state.expanded
                            }),
                                togglerStyle = { 'marginLeft': _this2.props.level * 16 + 'px', 'visibility': _this2.isLeaf() ? 'hidden' : 'visible' };

                            toggler = _react2.default.createElement(
                                'a',
                                { className: togglerClass, style: togglerStyle, onClick: _this2.toggle.bind(_this2), title: _this2.state.expanded ? _this2.props.labelCollapse : _this2.props.labelExpand },
                                _react2.default.createElement('span', null)
                            );

                            if (_this2.treeTable.props.selectionMode === 'checkbox') {
                                var checkboxIconClass = (0, _classnames2.default)('ui-chkbox-icon ui-c fa', {
                                    'fa-check': _this2.isSelected(),
                                    'fa-minus': _this2.node.partialSelected
                                });

                                checkbox = _react2.default.createElement(
                                    'div',
                                    { className: 'ui-chkbox ui-treetable-checkbox' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'ui-chkbox-box ui-widget ui-corner-all ui-state-default' },
                                        _react2.default.createElement('span', { className: checkboxIconClass })
                                    )
                                );
                            }
                        }

                        var rowData = _react2.default.createElement(
                            'span',
                            null,
                            _ObjectUtils2.default.resolveFieldData(_this2.node.data, col.props.field)
                        );

                        return _react2.default.createElement(
                            'td',
                            { key: 'col_' + i, style: col.props.style, className: col.props.className, onClick: _this2.onRowClick.bind(_this2), onTouchEnd: _this2.onRowTouchEnd.bind(_this2) },
                            toggler,
                            checkbox,
                            rowData
                        );
                    })
                ),
                this.node.children && this.state.expanded && _react2.default.createElement(
                    'tr',
                    { className: 'ui-treetable-row', style: { 'display': 'table-row' } },
                    _react2.default.createElement(
                        'td',
                        { colSpan: this.treeTable.columns.length, className: 'ui-treetable-child-table-container' },
                        _react2.default.createElement(
                            'table',
                            null,
                            childTbody
                        )
                    )
                )
            );
        }
    }]);

    return UITreeRow;
}(_react.Component);

UITreeRow.defaultProps = {
    node: null,
    level: null,
    treeTable: null,
    parentNode: null,
    labelExpand: "Expand",
    labelCollapse: "Collapse"
};
UITreeRow.propsTypes = {
    node: _propTypes2.default.any,
    level: _propTypes2.default.any,
    treeTable: _propTypes2.default.any,
    parentNode: _propTypes2.default.any,
    labelExpand: _propTypes2.default.string,
    labelCollapse: _propTypes2.default.string
};

var TreeTable = exports.TreeTable = function (_Component2) {
    _inherits(TreeTable, _Component2);

    function TreeTable() {
        _classCallCheck(this, TreeTable);

        return _possibleConstructorReturn(this, (TreeTable.__proto__ || Object.getPrototypeOf(TreeTable)).apply(this, arguments));
    }

    _createClass(TreeTable, [{
        key: 'onRowClick',
        value: function onRowClick(event, node) {
            var eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('ui-treetable-toggler') === 0) {
                return;
            } else if (this.props.selectionMode) {
                if (node.selectable === false) {
                    return;
                }

                var metaSelection = this.rowTouched ? false : this.props.metaKeySelection;
                var index = this.findIndexInSelection(node);
                var selected = index >= 0;

                if (this.isCheckboxSelectionMode()) {
                    if (selected) {
                        this.propagateSelectionDown(node, false);
                        if (node.parent) {
                            this.propagateSelectionUp(node.parent, false);
                        }

                        this.props.selectionChange({
                            originalEvent: event,
                            selection: this.selection
                        });

                        if (this.props.onNodeUnselect) {
                            this.props.onNodeUnselect({
                                originalEvent: event,
                                node: node
                            });
                        }
                    } else {
                        this.propagateSelectionDown(node, true);
                        if (node.parent) {
                            this.propagateSelectionUp(node.parent, true);
                        }

                        this.props.selectionChange({
                            originalEvent: event,
                            selection: this.selection
                        });

                        if (this.props.onNodeSelect) {
                            this.props.onNodeSelect({
                                originalEvent: event,
                                node: node
                            });
                        }
                    }
                } else {
                    if (metaSelection) {
                        var metaKey = event.metaKey || event.ctrlKey;

                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                this.selection = null;
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: null
                                });
                            } else {
                                this.selection = this.selection.filter(function (val, i) {
                                    return i !== index;
                                });
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: this.selection
                                });
                            }

                            if (this.props.onNodeUnselect) {
                                this.props.onNodeUnselect({
                                    originalEvent: event,
                                    node: node
                                });
                            }
                        } else {
                            if (this.isSingleSelectionMode()) {
                                this.selection = node;
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: node
                                });
                            } else if (this.isMultipleSelectionMode()) {
                                this.selection = !metaKey ? [] : this.selection || [];
                                this.selection = [].concat(_toConsumableArray(this.selection), [node]);
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: this.selection
                                });
                            }

                            if (this.props.onNodeSelect) {
                                this.props.onNodeSelect({
                                    originalEvent: event,
                                    node: node
                                });
                            }
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            if (selected) {
                                this.selection = null;
                                if (this.props.onNodeUnselect) {
                                    this.props.onNodeUnselect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            } else {
                                this.selection = node;
                                if (this.props.onNodeSelect) {
                                    this.props.onNodeSelect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            }
                        } else {
                            if (selected) {
                                this.selection = this.selection.filter(function (val, i) {
                                    return i !== index;
                                });
                                if (this.props.onNodeUnselect) {
                                    this.props.onNodeUnselect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            } else {
                                this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
                                if (this.props.onNodeSelect) {
                                    this.props.onNodeSelect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            }
                        }

                        this.props.selectionChange({
                            originalEvent: event,
                            selection: this.selection
                        });
                    }
                }
            }

            this.rowTouched = false;
        }
    }, {
        key: 'onRowTouchEnd',
        value: function onRowTouchEnd() {
            this.rowTouched = true;
        }
    }, {
        key: 'findIndexInSelection',
        value: function findIndexInSelection(node) {
            var index = -1;

            if (this.props.selectionMode && this.selection) {
                if (this.isSingleSelectionMode()) {
                    index = _ObjectUtils2.default.equals(this.selection, node) ? 0 : -1;
                } else {
                    for (var i = 0; i < this.selection.length; i++) {
                        if (_ObjectUtils2.default.equals(this.selection[i], node)) {
                            index = i;
                            break;
                        }
                    }
                }
            }

            return index;
        }
    }, {
        key: 'propagateSelectionUp',
        value: function propagateSelectionUp(node, select) {
            if (node.children && node.children.length) {
                var selectedCount = 0;
                var childPartialSelected = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var child = _step.value;

                        if (this.isSelected(child)) {
                            selectedCount++;
                        } else if (child.partialSelected) {
                            childPartialSelected = true;
                        }
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

                if (select && selectedCount === node.children.length) {
                    this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
                    node.partialSelected = false;
                } else {
                    if (!select) {
                        var index = this.findIndexInSelection(node);
                        if (index >= 0) {
                            this.selection = this.selection.filter(function (val, i) {
                                return i !== index;
                            });
                        }
                    }

                    if ((childPartialSelected || selectedCount > 0) && selectedCount !== node.children.length) node.partialSelected = true;else node.partialSelected = false;
                }
            }

            var parent = node.parent;
            if (parent) {
                this.propagateSelectionUp(parent, select);
            }
        }
    }, {
        key: 'propagateSelectionDown',
        value: function propagateSelectionDown(node, select) {
            var index = this.findIndexInSelection(node);

            if (select && index === -1) {
                this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
            } else if (!select && index > -1) {
                this.selection = this.selection.filter(function (val, i) {
                    return i !== index;
                });
            }

            node.partialSelected = false;

            if (node.children && node.children.length) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var child = _step2.value;

                        this.propagateSelectionDown(child, select);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(node) {
            return this.findIndexInSelection(node) !== -1;
        }
    }, {
        key: 'isSingleSelectionMode',
        value: function isSingleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'single';
        }
    }, {
        key: 'isMultipleSelectionMode',
        value: function isMultipleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isCheckboxSelectionMode',
        value: function isCheckboxSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'checkbox';
        }
    }, {
        key: 'hasFooter',
        value: function hasFooter() {
            if (this.columns) {
                var columnsArr = this.columns;
                for (var i = 0; i < columnsArr.length; i++) {
                    if (columnsArr[i].footer) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            this.columns = _react2.default.Children.map(this.props.children, function (element, i) {
                if (element && element.type === _Column.Column) return element;
            });

            var treeTableClass = (0, _classnames2.default)('ui-treetable ui-widget', this.props.className);

            var header = this.props.header && _react2.default.createElement(
                'div',
                { className: 'ui-treetable-header ui-widget-header' },
                this.props.header
            ),
                footer = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'ui-treetable-footer ui-widget-header' },
                this.props.footer
            );

            var thead = _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    this.columns && this.columns.map(function (col, i) {
                        var colStyleClass = (0, _classnames2.default)('ui-state-default ui-unselectable-text', col.props.className);

                        return _react2.default.createElement(
                            'th',
                            { key: 'headerCol_' + i, className: colStyleClass, style: col.props.style },
                            _react2.default.createElement(
                                'span',
                                { className: 'ui-column-title' },
                                col.props.header
                            )
                        );
                    })
                )
            ),
                tfoot = this.hasFooter() && _react2.default.createElement(
                'tfoot',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    this.columns && this.columns.map(function (col, i) {
                        var colStyleClass = (0, _classnames2.default)('ui-state-default', col.props.className);

                        return _react2.default.createElement(
                            'td',
                            { key: 'footerCol_' + i, className: colStyleClass, style: col.props.style },
                            _react2.default.createElement(
                                'span',
                                { className: 'ui-column-footer' },
                                col.props.footer
                            )
                        );
                    })
                )
            ),
                tbody = this.props.value && this.props.value.map(function (node, index) {
                return _react2.default.createElement(UITreeRow, { key: 'row_' + index, node: node, index: index, level: 0, labelExpand: _this4.props.labelExpand, labelCollapse: _this4.props.labelCollapse, treeTable: _this4, parentNode: _this4.props.value });
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: treeTableClass, style: this.props.style },
                header,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-treetable-tablewrapper' },
                    _react2.default.createElement(
                        'table',
                        { className: 'ui-widget-content' },
                        thead,
                        tfoot,
                        tbody
                    )
                ),
                footer
            );
        }
    }]);

    return TreeTable;
}(_react.Component);

TreeTable.defaultProps = {
    id: null,
    value: null,
    labelExpand: "Expand",
    labelCollapse: "Collapse",
    selectionMode: null,
    selection: null,
    selectionChange: null,
    style: null,
    className: null,
    metaKeySelection: true,
    header: '',
    footer: '',
    onNodeSelect: null,
    onNodeUnselect: null,
    onNodeExpand: null,
    onNodeCollapse: null
};
TreeTable.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    labelExpand: _propTypes2.default.string,
    labelCollapse: _propTypes2.default.string,
    selectionMode: _propTypes2.default.string,
    selection: _propTypes2.default.any,
    selectionChange: _propTypes2.default.func.isRequired,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    metaKeySelection: _propTypes2.default.bool,
    header: _propTypes2.default.string,
    footer: _propTypes2.default.string,
    onNodeSelect: _propTypes2.default.func,
    onNodeUnselect: _propTypes2.default.func,
    onNodeExpand: _propTypes2.default.func,
    onNodeCollapse: _propTypes2.default.func
};