'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BodyRow = require('./BodyRow');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableBody = exports.TableBody = function (_Component) {
    _inherits(TableBody, _Component);

    function TableBody(props) {
        _classCallCheck(this, TableBody);

        var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

        _this.onRowClick = _this.onRowClick.bind(_this);
        _this.onRowRightClick = _this.onRowRightClick.bind(_this);
        _this.onRowTouchEnd = _this.onRowTouchEnd.bind(_this);
        _this.onRowToggle = _this.onRowToggle.bind(_this);
        _this.onRadioClick = _this.onRadioClick.bind(_this);
        _this.onCheckboxClick = _this.onCheckboxClick.bind(_this);
        return _this;
    }

    _createClass(TableBody, [{
        key: 'onRowClick',
        value: function onRowClick(event) {
            var targetNode = event.originalEvent.target.nodeName;
            if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || _DomHandler2.default.hasClass(event.originalEvent.target, 'ui-clickable')) {
                return;
            }

            if (this.props.onRowClick) {
                this.props.onRowClick(event);
            }

            if (this.props.selectionMode) {
                var rowData = event.data;
                var rowIndex = event.index;

                if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex !== null) {
                    _DomHandler2.default.clearSelection();
                    //todo: shift key
                } else {
                    var selected = this.isSelected(rowData);
                    var metaSelection = this.rowTouched ? false : this.props.metaKeySelection;
                    this.anchorRowIndex = rowIndex;
                    this.rangeRowIndex = rowIndex;
                    var selection = void 0;

                    if (metaSelection) {
                        var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                selection = null;
                            } else {
                                var selectionIndex = this.findIndexInSelection(rowData);
                                selection = this.props.selection.filter(function (val, i) {
                                    return i !== selectionIndex;
                                });
                            }

                            if (this.props.onRowUnselect) {
                                this.onRowUnselect({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            }
                        } else {
                            if (this.isSingleSelectionMode()) {
                                selection = rowData;
                            } else if (this.isMultipleSelectionMode()) {
                                if (metaKey) selection = this.props.selection ? [].concat(_toConsumableArray(this.props.selection)) : [];else selection = [];

                                selection = [].concat(_toConsumableArray(selection), [rowData]);
                            }

                            if (this.props.onRowSelect) {
                                this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            }
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            if (selected) {
                                selection = null;
                                if (this.props.onRowUnselect) {
                                    this.onRowUnselect({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                                }
                            } else {
                                selection = rowData;
                                if (this.props.onRowSelect) {
                                    this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                                }
                            }
                        } else {
                            if (selected) {
                                var _selectionIndex = this.findIndexInSelection(rowData);
                                selection = this.props.selection.filter(function (val, i) {
                                    return i !== _selectionIndex;
                                });
                                if (this.props.onRowSelect) {
                                    this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                                }
                            } else {
                                selection = [].concat(_toConsumableArray(this.props.selection || []), [rowData]);
                                if (this.props.onRowSelect) {
                                    this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                                }
                            }
                        }
                    }

                    this.props.onSelectionChange({ originalEvent: event.originalEvent, data: selection });
                }
            }

            this.rowTouched = false;
        }
    }, {
        key: 'onRowTouchEnd',
        value: function onRowTouchEnd(event) {
            this.rowTouched = true;
        }
    }, {
        key: 'onRowRightClick',
        value: function onRowRightClick(event) {
            if (this.props.contextMenu) {
                var selectionIndex = this.findIndexInSelection(event.data);
                var selected = selectionIndex !== -1;
                var selection = void 0;

                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        selection = event.data;
                    } else if (this.isMultipleSelectionMode()) {
                        selection = [event.data];
                    }

                    this.props.onSelectionChange({ originalEvent: event.originalEvent, data: selection });
                }

                this.props.contextMenu.show(event.originalEvent);
                if (this.props.onContextMenuSelect) {
                    this.props.onContextMenuSelect({ originalEvent: event.originalEvent, data: event.data });
                }
                event.originalEvent.preventDefault();
            }
        }
    }, {
        key: 'onRadioClick',
        value: function onRadioClick(event) {
            var rowData = event.data;
            var selection = void 0;

            if (this.isSelected(rowData)) {
                selection = null;
                if (this.props.onRowUnselect) {
                    this.onRowUnselect({ originalEvent: event.originalEvent, data: rowData, type: 'radio' });
                }
            } else {
                selection = rowData;
                if (this.props.onRowSelect) {
                    this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'radio' });
                }
            }

            this.props.onSelectionChange({ originalEvent: event.originalEvent, data: selection });
        }
    }, {
        key: 'onCheckboxClick',
        value: function onCheckboxClick(event) {
            var rowData = event.data;
            var selection = void 0;

            if (this.isSelected(rowData)) {
                var selectionIndex = this.findIndexInSelection(rowData);
                selection = this.props.selection.filter(function (val, i) {
                    return i !== selectionIndex;
                });
                if (this.props.onRowSelect) {
                    this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
                }
            } else {
                selection = [].concat(_toConsumableArray(this.props.selection || []), [rowData]);
                if (this.props.onRowSelect) {
                    this.props.onRowSelect({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
                }
            }

            this.props.onSelectionChange({ originalEvent: event.originalEvent, data: selection });
        }
    }, {
        key: 'isSingleSelectionMode',
        value: function isSingleSelectionMode() {
            return this.props.selectionMode === 'single';
        }
    }, {
        key: 'isMultipleSelectionMode',
        value: function isMultipleSelectionMode() {
            return this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isSelected',
        value: function isSelected(rowData) {
            if (rowData && this.props.selection) {
                if (this.props.selection instanceof Array) return this.findIndexInSelection(rowData) > -1;else return this.equals(rowData, this.props.selection);
            }

            return false;
        }
    }, {
        key: 'equals',
        value: function equals(data1, data2) {
            return this.props.compareSelectionBy === 'equals' ? data1 === data2 : _ObjectUtils2.default.equals(data1, data2, this.props.dataKey);
        }
    }, {
        key: 'findIndexInSelection',
        value: function findIndexInSelection(rowData) {
            var index = -1;
            if (this.props.selection) {
                for (var i = 0; i < this.props.selection.length; i++) {
                    if (this.equals(rowData, this.props.selection[i])) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }, {
        key: 'onRowToggle',
        value: function onRowToggle(event) {
            var expandedRowIndex = this.findExpandedRowIndex(event.data);
            var expandedRows = this.props.expandedRows ? [].concat(_toConsumableArray(this.props.expandedRows)) : [];

            if (expandedRowIndex !== -1) {
                expandedRows = expandedRows.filter(function (val, i) {
                    return i !== expandedRowIndex;
                });

                if (this.props.onRowCollapse) {
                    this.props.onRowCollapse({ originalEvent: event, data: event.data });
                }
            } else {
                expandedRows.push(event.data);

                if (this.props.onRowExpand) {
                    this.props.onRowExpand({ originalEvent: event, data: event.data });
                }
            }

            this.props.onRowToggle({
                data: expandedRows
            });
        }
    }, {
        key: 'findExpandedRowIndex',
        value: function findExpandedRowIndex(row) {
            var index = -1;
            if (this.props.expandedRows) {
                for (var i = 0; i < this.props.expandedRows.length; i++) {
                    if (this.props.expandedRows[i] === row) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        }
    }, {
        key: 'isRowExpanded',
        value: function isRowExpanded(row) {
            return this.findExpandedRowIndex(row) !== -1;
        }
    }, {
        key: 'isSelectionEnabled',
        value: function isSelectionEnabled() {
            if (this.props.selectionMode) {
                return true;
            } else {
                if (Array.isArray(this.props.children)) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.props.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var col = _step.value;

                            if (col.props.selectionMode) return true;
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
                } else {
                    return this.props.children.selectionMode != null;
                }
            }

            return false;
        }
    }, {
        key: 'renderRowGroupHeader',
        value: function renderRowGroupHeader(rowData, index) {
            return _react2.default.createElement(
                'tr',
                { key: index + '_rowgroupheader', className: 'ui-widget-header ui-rowgroup-header' },
                _react2.default.createElement(
                    'td',
                    { colSpan: _react2.default.Children.count(this.props.children) },
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-rowgroup-header-name' },
                        this.props.rowGroupHeaderTemplate(rowData, index)
                    )
                )
            );
        }
    }, {
        key: 'renderRowGroupFooter',
        value: function renderRowGroupFooter(rowData, index) {
            return _react2.default.createElement(
                'tr',
                { key: index + '_rowgroupfooter', className: 'ui-widget-header ui-rowgroup-footer' },
                this.props.rowGroupFooterTemplate(rowData, index)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-datatable-data ui-widget-content', { 'ui-datatable-hoverable-rows': this.props.selectionMode });
            var rows = void 0;
            var rpp = this.props.rows || 0;
            var first = this.props.first || 0;
            var selectionEnabled = this.isSelectionEnabled();
            var rowGroupMode = this.props.rowGroupMode;
            var hasSubheaderGrouping = rowGroupMode && rowGroupMode === 'subheader';
            var rowSpanGrouping = rowGroupMode && rowGroupMode === 'rowspan';

            if (this.props.value && this.props.value.length) {
                rows = [];
                var startIndex = this.props.lazy ? 0 : first;
                var endIndex = this.props.virtualScroll ? startIndex + rpp * 2 : startIndex + rpp || this.props.value.length;

                for (var i = startIndex; i < endIndex; i++) {
                    if (i >= this.props.value.length) {
                        break;
                    }

                    var rowData = this.props.value[i];
                    var expanded = this.isRowExpanded(rowData);
                    var selected = selectionEnabled ? this.isSelected(this.props.value[i]) : false;
                    var groupRowSpan = void 0;

                    //header row group
                    if (hasSubheaderGrouping) {
                        var currentRowFieldData = _ObjectUtils2.default.resolveFieldData(rowData, this.props.groupField);
                        var previousRowFieldData = _ObjectUtils2.default.resolveFieldData(this.props.value[i - 1], this.props.groupField);

                        if (i === 0 || currentRowFieldData !== previousRowFieldData) {
                            rows.push(this.renderRowGroupHeader(rowData, i));
                        }
                    }

                    if (rowSpanGrouping) {
                        var rowSpanIndex = i;
                        var _currentRowFieldData = _ObjectUtils2.default.resolveFieldData(rowData, this.props.sortField);
                        var shouldCountRowSpan = i === 0 || _ObjectUtils2.default.resolveFieldData(this.props.value[i - 1], this.props.sortField) !== _currentRowFieldData;

                        if (shouldCountRowSpan) {
                            var nextRowFieldData = _currentRowFieldData;
                            groupRowSpan = 0;

                            while (_currentRowFieldData === nextRowFieldData) {
                                groupRowSpan++;
                                var nextRowData = this.props.value[++rowSpanIndex];
                                if (nextRowData) {
                                    nextRowFieldData = _ObjectUtils2.default.resolveFieldData(nextRowData, this.props.sortField);
                                } else {
                                    break;
                                }
                            }
                        }
                    }

                    //row content
                    var bodyRow = _react2.default.createElement(
                        _BodyRow.BodyRow,
                        { key: i, rowData: rowData, rowIndex: i, onClick: this.onRowClick, onRightClick: this.onRowRightClick, onTouchEnd: this.onRowTouchEnd,
                            onRowToggle: this.onRowToggle, expanded: expanded, responsive: this.props.responsive,
                            onRadioClick: this.onRadioClick, onCheckboxClick: this.onCheckboxClick, selected: selected, rowClassName: this.props.rowClassName,
                            sortField: this.props.sortField, rowGroupMode: this.props.rowGroupMode, groupRowSpan: groupRowSpan },
                        this.props.children
                    );

                    rows.push(bodyRow);

                    //row expansion
                    if (expanded) {
                        var expandedRowContent = this.props.rowExpansionTemplate(rowData);
                        var expandedRow = _react2.default.createElement(
                            'tr',
                            { className: 'ui-widget-content', key: i + '_expanded' },
                            _react2.default.createElement(
                                'td',
                                { colSpan: this.props.children.length },
                                expandedRowContent
                            )
                        );
                        rows.push(expandedRow);
                    }

                    //footer row group
                    if (hasSubheaderGrouping) {
                        var _currentRowFieldData2 = _ObjectUtils2.default.resolveFieldData(rowData, this.props.groupField);
                        var _nextRowFieldData = _ObjectUtils2.default.resolveFieldData(this.props.value[i + 1], this.props.groupField);

                        if (i === this.props.value.length - 1 || _currentRowFieldData2 !== _nextRowFieldData) {
                            rows.push(this.renderRowGroupFooter(rowData, i));
                        }
                    }
                }
            } else {
                rows = _react2.default.createElement(
                    'tr',
                    { className: 'ui-widget-content ui-datatable-emptymessage' },
                    _react2.default.createElement(
                        'td',
                        { colSpan: this.props.children.length },
                        this.props.emptyMessage
                    )
                );
            }

            return _react2.default.createElement(
                'tbody',
                { className: className },
                rows
            );
        }
    }]);

    return TableBody;
}(_react.Component);