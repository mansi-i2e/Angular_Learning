import {
  ExportLoadPanel,
  _objectWithoutPropertiesLoose,
  date_default,
  message_default,
  number_default
} from "./chunk-2SPVQWIC.js";
import {
  _extends,
  errors_default,
  extend,
  hasWindow,
  isDate,
  isDefined,
  isFunction,
  isNumeric,
  isObject
} from "./chunk-SFROUENP.js";

// node_modules/devextreme/esm/exporter/jspdf/common/normalizeOptions.js
function normalizeBoundaryValue(value) {
  if (isNumeric(value)) {
    return {
      top: value,
      right: value,
      bottom: value,
      left: value
    };
  }
  return {
    top: (null === value || void 0 === value ? void 0 : value.top) ?? 0,
    right: (null === value || void 0 === value ? void 0 : value.right) ?? 0,
    bottom: (null === value || void 0 === value ? void 0 : value.bottom) ?? 0,
    left: (null === value || void 0 === value ? void 0 : value.left) ?? 0
  };
}
function normalizeRowsInfo(rowsInfo) {
  rowsInfo.forEach((row) => {
    row.cells.forEach((_ref) => {
      let {
        pdfCell
      } = _ref;
      pdfCell.padding = normalizeBoundaryValue(pdfCell.padding);
    });
  });
}

// node_modules/devextreme/esm/exporter/jspdf/common/pdf_utils.js
function toPdfUnit(doc, value) {
  const coefficient = 1 / doc.internal.scaleFactor;
  return value * coefficient;
}
function getPageWidth(doc) {
  return doc.internal.pageSize.getWidth();
}
function getPageHeight(doc) {
  return doc.internal.pageSize.getHeight();
}
function getTextLines(doc, text, font, _ref) {
  let {
    wordWrapEnabled,
    targetRectWidth
  } = _ref;
  if (wordWrapEnabled) {
    const usedFont = doc.getFont(null === font || void 0 === font ? void 0 : font.name, null === font || void 0 === font ? void 0 : font.style);
    return doc.splitTextToSize(text, targetRectWidth, {
      fontSize: (null === font || void 0 === font ? void 0 : font.size) || doc.getFontSize(),
      fontName: usedFont.fontName,
      fontStyle: usedFont.fontStyle
    });
  }
  let textWithoutLineBreak = text.split("\n").filter((ch) => "" !== ch).join(" ");
  if (getTextDimensions(doc, textWithoutLineBreak, font).w <= targetRectWidth) {
    return [textWithoutLineBreak];
  }
  let textWidth = getTextDimensions(doc, textWithoutLineBreak + "...", font).w;
  while (textWithoutLineBreak.length > 0 && textWidth > targetRectWidth) {
    let symbolsCountToRemove = 0;
    if (textWidth >= 2 * targetRectWidth) {
      symbolsCountToRemove = textWithoutLineBreak.length / 2;
    }
    if (symbolsCountToRemove < 1) {
      symbolsCountToRemove = 1;
    }
    textWithoutLineBreak = textWithoutLineBreak.substring(0, textWithoutLineBreak.length - symbolsCountToRemove);
    textWidth = getTextDimensions(doc, textWithoutLineBreak + "...", font).w;
  }
  return [textWithoutLineBreak + "..."];
}
function calculateTargetRectWidth(columnWidth, padding) {
  const width = columnWidth - (padding.left + padding.right);
  return width >= 0 ? width : 0;
}
function getTextDimensions(doc, text, font) {
  return doc.getTextDimensions(text, {
    font: doc.getFont(null === font || void 0 === font ? void 0 : font.name, null === font || void 0 === font ? void 0 : font.style),
    fontSize: (null === font || void 0 === font ? void 0 : font.size) || doc.getFontSize()
  });
}
function calculateTextHeight(doc, text, font, _ref2) {
  let {
    wordWrapEnabled,
    targetRectWidth
  } = _ref2;
  const heightOfOneLine = getTextDimensions(doc, text, font).h;
  const linesCount = getTextLines(doc, text, font, {
    wordWrapEnabled,
    targetRectWidth
  }).length;
  return heightOfOneLine * linesCount * doc.getLineHeightFactor();
}
function calculateRowHeight(doc, cells, columnWidths) {
  if (cells.length !== columnWidths.length) {
    throw "the cells count must be equal to the count of the columns";
  }
  let rowHeight = 0;
  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (isDefined(cells[cellIndex].rowSpan)) {
      continue;
    }
    const cellText = cells[cellIndex].pdfCell.text;
    const cellPadding = cells[cellIndex].pdfCell.padding;
    const font = cells[cellIndex].pdfCell.font;
    const wordWrapEnabled = cells[cellIndex].pdfCell.wordWrapEnabled;
    const columnWidth = columnWidths[cellIndex];
    const targetRectWidth = calculateTargetRectWidth(columnWidth, cellPadding);
    if (isDefined(cellText)) {
      const textHeight = "" !== cellText ? calculateTextHeight(doc, cellText, font, {
        wordWrapEnabled,
        targetRectWidth
      }) : 0;
      const cellHeight = textHeight + cellPadding.top + cellPadding.bottom;
      if (rowHeight < cellHeight) {
        rowHeight = cellHeight;
      }
    }
  }
  return rowHeight;
}
function applyWordWrap(doc, rowsInfo) {
  rowsInfo.forEach((row) => {
    row.cells.forEach((_ref3) => {
      let {
        pdfCell
      } = _ref3;
      if (isDefined(pdfCell.text)) {
        const lines = getTextLines(doc, pdfCell.text, pdfCell.font, {
          wordWrapEnabled: pdfCell.wordWrapEnabled,
          targetRectWidth: calculateTargetRectWidth(pdfCell._rect.w, pdfCell.padding)
        });
        pdfCell.text = lines.join("\n");
      }
    });
  });
}
function applyRtl(doc, rectsByPages, options) {
  rectsByPages.forEach((pageRects) => {
    pageRects.forEach((pdfCell) => {
      const mirroredX = getPageWidth(doc) - (pdfCell._rect.x + pdfCell._rect.w);
      const marginDiff = options.margin.left - options.margin.right;
      pdfCell._rect.x = mirroredX + marginDiff;
    });
  });
}

// node_modules/devextreme/esm/exporter/jspdf/common/row_utils.js
var getSum = (a, b) => a + b;
function calculateColumnWidths(doc, dataProvider, topLeftX, margin, customerColumnWidths) {
  const resultWidths = dataProvider.getColumnsWidths().map((width) => toPdfUnit(doc, width ?? 150));
  const totalAutoColumnsWidth = resultWidths.filter((width, index) => !isDefined(customerColumnWidths[index])).reduce(getSum, 0);
  const totalCustomerColumnsWidth = customerColumnWidths.filter((width) => isNumeric(width)).reduce(getSum, 0);
  const availablePageWidth = getAvailablePageAreaWidth(doc, topLeftX, margin);
  const ratio = totalCustomerColumnsWidth < availablePageWidth ? (availablePageWidth - totalCustomerColumnsWidth) / totalAutoColumnsWidth : 1;
  return resultWidths.map((width, index) => customerColumnWidths[index] ?? width * ratio);
}
function getAvailablePageAreaWidth(doc, topLeftX, margin) {
  return getPageWidth(doc) - topLeftX - margin.left - margin.right;
}
function initializeCellsWidth(doc, dataProvider, rows, options) {
  const columnWidths = calculateColumnWidths(doc, dataProvider, options.topLeft.x, options.margin, options.columnWidths);
  rows.forEach((row) => {
    row.cells.forEach((_ref, index) => {
      let {
        gridCell,
        pdfCell
      } = _ref;
      pdfCell._rect.w = columnWidths[index];
    });
  });
}
function calculateHeights(doc, rows, options) {
  rows.forEach((row) => {
    const pdfCells = row.cells.map((c) => c.pdfCell);
    let customerHeight;
    if (options.onRowExporting) {
      const args = {
        rowCells: pdfCells
      };
      options.onRowExporting(args);
      if (isDefined(args.rowHeight)) {
        customerHeight = args.rowHeight;
      }
    }
    row.height = isDefined(customerHeight) ? customerHeight : calculateRowHeight(doc, row.cells, pdfCells.map((c) => c._rect.w));
    pdfCells.forEach((cell) => {
      cell._rect.h = row.height;
    });
  });
}
function applyColSpans(rows) {
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      const cell = row.cells[cellIndex];
      if (isDefined(cell.colSpan) && !isDefined(cell.pdfCell.isMerged)) {
        for (let spanIndex = 1; spanIndex <= cell.colSpan; spanIndex++) {
          const mergedCell = rows[rowIndex].cells[cellIndex + spanIndex];
          cell.pdfCell._rect.w += mergedCell.pdfCell._rect.w;
          mergedCell.pdfCell._rect.w = 0;
          mergedCell.pdfCell.isMerged = true;
        }
      }
    }
  }
}
function applyRowSpans(rows) {
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      const cell = row.cells[cellIndex];
      if (isDefined(cell.rowSpan) && !isDefined(cell.pdfCell.isMerged)) {
        for (let spanIndex = 1; spanIndex <= cell.rowSpan; spanIndex++) {
          const mergedCell = rows[rowIndex + spanIndex].cells[cellIndex];
          cell.pdfCell._rect.h += mergedCell.pdfCell._rect.h;
          mergedCell.pdfCell._rect.h = 0;
          mergedCell.pdfCell.isMerged = true;
        }
      }
    }
  }
}
function resizeFirstColumnByIndentLevel(rows, options) {
  rows.forEach((row) => {
    row.cells[0].pdfCell._rect.w -= row.indentLevel * options.indent;
  });
}
function applyBordersConfig(rows) {
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const cells = rows[rowIndex].cells;
    for (let columnIndex = 0; columnIndex < cells.length; columnIndex++) {
      const pdfCell = cells[columnIndex].pdfCell;
      const leftPdfCell = columnIndex >= 1 ? cells[columnIndex - 1].pdfCell : null;
      const topPdfCell = rowIndex >= 1 ? rows[rowIndex - 1].cells[columnIndex].pdfCell : null;
      if (false === pdfCell.drawLeftBorder && !isDefined(cells[columnIndex].colSpan)) {
        if (isDefined(leftPdfCell)) {
          leftPdfCell.drawRightBorder = false;
        }
      } else if (!isDefined(pdfCell.drawLeftBorder)) {
        if (isDefined(leftPdfCell) && false === leftPdfCell.drawRightBorder) {
          pdfCell.drawLeftBorder = false;
        }
      }
      if (false === pdfCell.drawTopBorder) {
        if (isDefined(topPdfCell)) {
          topPdfCell.drawBottomBorder = false;
        }
      } else if (!isDefined(pdfCell.drawTopBorder)) {
        if (isDefined(topPdfCell) && false === topPdfCell.drawBottomBorder) {
          pdfCell.drawTopBorder = false;
        }
      }
    }
  }
}
function calculateCoordinates(doc, rows, options) {
  const topLeft = null === options || void 0 === options ? void 0 : options.topLeft;
  const margin = null === options || void 0 === options ? void 0 : options.margin;
  let y = ((null === topLeft || void 0 === topLeft ? void 0 : topLeft.y) ?? 0) + margin.top;
  rows.forEach((row) => {
    let x = ((null === topLeft || void 0 === topLeft ? void 0 : topLeft.x) ?? 0) + margin.left;
    const intend = row.indentLevel * options.indent;
    row.cells.forEach((cell) => {
      cell.pdfCell._rect.x = x + intend;
      cell.pdfCell._rect.y = y;
      x += cell.pdfCell._rect.w;
    });
    y += row.height;
  });
}
function calculateTableSize(doc, cells, options) {
  var _options$topLeft, _options$topLeft2;
  let leftPos;
  let topPos;
  let rightPos;
  let bottomPos;
  cells.forEach((cell) => {
    if (!isDefined(leftPos) || leftPos > cell._rect.x) {
      leftPos = cell._rect.x;
    }
    if (!isDefined(topPos) || topPos > cell._rect.y) {
      topPos = cell._rect.y;
    }
    if (!isDefined(rightPos) || rightPos < cell._rect.x + cell._rect.w) {
      rightPos = cell._rect.x + cell._rect.w;
    }
    if (!isDefined(bottomPos) || bottomPos < cell._rect.y + cell._rect.h) {
      bottomPos = cell._rect.y + cell._rect.h;
    }
  });
  const x = leftPos ?? (null === options || void 0 === options || null === (_options$topLeft = options.topLeft) || void 0 === _options$topLeft ? void 0 : _options$topLeft.x) ?? 0;
  const y = topPos ?? (null === options || void 0 === options || null === (_options$topLeft2 = options.topLeft) || void 0 === _options$topLeft2 ? void 0 : _options$topLeft2.y) ?? 0;
  const w = isDefined(rightPos) ? rightPos - x : 0;
  const h = isDefined(bottomPos) ? bottomPos - y : 0;
  return {
    x,
    y,
    w,
    h
  };
}

// node_modules/devextreme/esm/exporter/jspdf/common/height_updater.js
function updateRowsAndCellsHeights(doc, rows) {
  const rowsAdditionalHeights = calculateAdditionalRowsHeights(doc, rows);
  rows.forEach((row) => {
    row.height += rowsAdditionalHeights[row.rowIndex];
  });
  rows.forEach((row) => {
    row.cells.forEach((cell) => {
      const rowsCount = (cell.rowSpan ?? 0) + 1;
      cell.pdfCell._rect.h = rows.slice(row.rowIndex, row.rowIndex + rowsCount).reduce((accumulator, rowInfo) => accumulator + rowInfo.height, 0);
    });
  });
}
function calculateAdditionalRowsHeights(doc, rows) {
  const rowsAdditionalHeights = Array.from({
    length: rows.length
  }, () => 0);
  const sortedRows = sortRowsByMaxRowSpanAsc(rows);
  sortedRows.forEach((row) => {
    const cellsWithRowSpan = row.cells.filter((cell) => isDefined(cell.rowSpan));
    cellsWithRowSpan.forEach((cell) => {
      const targetRectWidth = calculateTargetRectWidth(cell.pdfCell._rect.w, cell.pdfCell.padding);
      const textHeight = calculateTextHeight(doc, cell.pdfCell.text, cell.pdfCell.font, {
        wordWrapEnabled: cell.pdfCell.wordWrapEnabled,
        targetRectWidth
      });
      const cellHeight = textHeight + cell.pdfCell.padding.top + cell.pdfCell.padding.bottom;
      const rowsCount = cell.rowSpan + 1;
      const currentRowSpanRowsHeight = rows.slice(row.rowIndex, row.rowIndex + rowsCount).reduce((accumulator, rowInfo) => accumulator + rowInfo.height + rowsAdditionalHeights[rowInfo.rowIndex], 0);
      if (cellHeight > currentRowSpanRowsHeight) {
        const delta = (cellHeight - currentRowSpanRowsHeight) / rowsCount;
        for (let spanIndex = row.rowIndex; spanIndex < row.rowIndex + rowsCount; spanIndex++) {
          rowsAdditionalHeights[spanIndex] += delta;
        }
      }
    });
  });
  return rowsAdditionalHeights;
}
function sortRowsByMaxRowSpanAsc(rows) {
  const getMaxRowSpan = (row) => {
    const spansArray = row.cells.map((cell) => cell.rowSpan ?? 0);
    return Math.max(...spansArray);
  };
  return [...rows].sort((row1, row2) => {
    const row1RowSpan = getMaxRowSpan(row1);
    const row2RowSpan = getMaxRowSpan(row2);
    if (row1RowSpan > row2RowSpan) {
      return 1;
    }
    if (row2RowSpan > row1RowSpan) {
      return -1;
    }
    return 0;
  });
}

// node_modules/devextreme/esm/exporter/jspdf/common/rows_generator.js
var defaultStyles = {
  base: {
    font: {
      size: 10
    },
    borderWidth: 0.5,
    borderColor: "#979797"
  },
  header: {
    textColor: "#979797"
  },
  group: {},
  data: {},
  groupFooter: {},
  totalFooter: {}
};
function generateRowsInfo(doc, dataProvider, dataGrid, headerBackgroundColor) {
  const result = [];
  const rowsCount = dataProvider.getRowsCount();
  const wordWrapEnabled = !!dataGrid.option("wordWrapEnabled");
  const rtlEnabled = !!dataGrid.option("rtlEnabled");
  const columns = dataProvider.getColumns();
  const styles = dataProvider.getStyles();
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const rowType = dataProvider.getCellData(rowIndex, 0, true).cellSourceData.rowType;
    let indentLevel = "header" !== rowType ? dataProvider.getGroupLevel(rowIndex) : 0;
    const previousRow = result[rowIndex - 1];
    if ("groupFooter" === rowType && "groupFooter" === (null === previousRow || void 0 === previousRow ? void 0 : previousRow.rowType)) {
      indentLevel = previousRow.indentLevel - 1;
    }
    result.push({
      rowType,
      indentLevel,
      cells: generateRowCells({
        doc,
        dataProvider,
        rowIndex,
        wordWrapEnabled,
        columns,
        styles,
        rowType,
        backgroundColor: "header" === rowType ? headerBackgroundColor : void 0,
        rtlEnabled
      }),
      rowIndex
    });
  }
  return result;
}
function generateRowCells(_ref) {
  let {
    doc,
    dataProvider,
    rowIndex,
    wordWrapEnabled,
    columns,
    styles,
    rowType,
    backgroundColor,
    rtlEnabled
  } = _ref;
  const result = [];
  for (let cellIndex = 0; cellIndex < columns.length; cellIndex++) {
    const cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
    const cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
    const style = getPdfCellStyle(columns[cellIndex], rowType, cellStyle);
    const defaultAlignment = rtlEnabled ? "right" : "left";
    const paddingValue = toPdfUnit(doc, 5);
    const pdfCell = {
      text: getFormattedValue(cellData.value, cellStyle.format),
      verticalAlign: "middle",
      horizontalAlign: style.alignment ?? defaultAlignment,
      wordWrapEnabled,
      backgroundColor,
      padding: {
        top: paddingValue,
        right: paddingValue,
        bottom: paddingValue,
        left: paddingValue
      },
      _rect: {},
      _internalTextOptions: {}
    };
    if (rtlEnabled) {
      pdfCell._internalTextOptions.isInputVisual = false;
      pdfCell._internalTextOptions.isOutputVisual = true;
      pdfCell._internalTextOptions.isInputRtl = true;
      pdfCell._internalTextOptions.isOutputRtl = false;
    }
    const cellInfo = {
      gridCell: cellData.cellSourceData,
      pdfCell: Object.assign({}, pdfCell, style)
    };
    if ("header" === rowType) {
      const cellMerging = dataProvider.getCellMerging(rowIndex, cellIndex);
      if (cellMerging && cellMerging.rowspan > 0) {
        cellInfo.rowSpan = cellMerging.rowspan;
      }
      if (cellMerging && cellMerging.colspan > 0) {
        cellInfo.colSpan = cellMerging.colspan;
      }
    } else if ("group" === rowType) {
      const drawLeftBorderField = rtlEnabled ? "drawRightBorder" : "drawLeftBorder";
      const drawRightBorderField = rtlEnabled ? "drawLeftBorder" : "drawRightBorder";
      cellInfo.pdfCell[drawLeftBorderField] = 0 === cellIndex;
      cellInfo.pdfCell[drawRightBorderField] = cellIndex === columns.length - 1;
      if (cellIndex > 0) {
        const isEmptyCellsExceptFirst = result.slice(1).reduce((accumulate, cellInfo2) => accumulate && !isDefined(cellInfo2.pdfCell.text), true);
        if (!isDefined(cellInfo.pdfCell.text) && isEmptyCellsExceptFirst) {
          result[0].pdfCell[drawRightBorderField] = true;
          for (let i = 0; i < result.length; i++) {
            result[i].colSpan = result.length;
          }
          cellInfo.colSpan = result.length;
        }
      }
    }
    result.push(cellInfo);
  }
  return result;
}
function getBaseTableStyle() {
  return defaultStyles.base;
}
function getPdfCellStyle(column, rowType, cellStyle) {
  const styles = Object.assign({}, defaultStyles.base, defaultStyles[rowType]);
  const alignment = "header" === rowType ? column.alignment : cellStyle.alignment;
  if (alignment) {
    styles.alignment = alignment;
  }
  if (cellStyle.bold && "header" !== rowType) {
    styles.font = Object.assign({}, styles.font, {
      style: "bold"
    });
  }
  return styles;
}
function getFormattedValue(value, format) {
  if (isDefined(format)) {
    if (isDate(value)) {
      return date_default.format(value, format);
    }
    if (isNumeric(value)) {
      return number_default.format(value, format);
    }
  }
  return null === value || void 0 === value ? void 0 : value.toString();
}

// node_modules/devextreme/esm/exporter/jspdf/common/draw_utils.js
var _excluded = ["_rect", "gridCell"];
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function roundToThreeDecimals(value) {
  return Math.round(1e3 * value) / 1e3;
}
function drawCellsContent(doc, customDrawCell, cellsArray, docStyles) {
  cellsArray.forEach((cell) => {
    const {
      _rect,
      gridCell
    } = cell, pdfCell = _objectWithoutPropertiesLoose(cell, _excluded);
    const {
      x,
      y,
      w,
      h
    } = _rect;
    const rect = {
      x,
      y,
      w,
      h
    };
    const eventArg = {
      doc,
      rect,
      pdfCell,
      gridCell,
      cancel: false
    };
    null === customDrawCell || void 0 === customDrawCell || customDrawCell(eventArg);
    if (!eventArg.cancel) {
      drawCellBackground(doc, cell);
      drawCellText(doc, cell, docStyles);
    }
  });
}
function drawLine(doc, startX, startY, endX, endY) {
  doc.line(roundToThreeDecimals(startX), roundToThreeDecimals(startY), roundToThreeDecimals(endX), roundToThreeDecimals(endY));
}
function drawRect(doc, x, y, width, height, style) {
  if (isDefined(style)) {
    doc.rect(roundToThreeDecimals(x), roundToThreeDecimals(y), roundToThreeDecimals(width), roundToThreeDecimals(height), style);
  } else {
    doc.rect(roundToThreeDecimals(x), roundToThreeDecimals(y), roundToThreeDecimals(width), roundToThreeDecimals(height));
  }
}
function getLineHeightShift(doc) {
  return (doc.getLineHeightFactor() - 1.15) * doc.getFontSize();
}
function drawTextInRect(doc, text, rect, verticalAlign, horizontalAlign, jsPDFTextOptions) {
  const textArray = text.split("\n");
  const linesCount = textArray.length;
  const heightOfOneLine = calculateTextHeight(doc, textArray[0], doc.getFont(), {
    wordWrapEnabled: false,
    targetRectWidth: 1e9
  });
  const vAlign = verticalAlign ?? "middle";
  const hAlign = horizontalAlign ?? "left";
  const verticalAlignCoefficientsMap = {
    top: 0,
    middle: 0.5,
    bottom: 1
  };
  const y = rect.y + rect.h * verticalAlignCoefficientsMap[vAlign] - heightOfOneLine * (linesCount - 1) * verticalAlignCoefficientsMap[vAlign] + getLineHeightShift(doc);
  const x = rect.x + rect.w * {
    left: 0,
    center: 0.5,
    right: 1
  }[hAlign];
  const textOptions = extend({
    baseline: vAlign,
    align: hAlign
  }, jsPDFTextOptions);
  doc.text(textArray.join("\n"), roundToThreeDecimals(x), roundToThreeDecimals(y), textOptions);
}
function drawCellBackground(doc, cell) {
  if (isDefined(cell.backgroundColor)) {
    trySetColor(doc, "fill", cell.backgroundColor);
    drawRect(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h, "F");
  }
}
function drawCellText(doc, cell, docStyles) {
  if (isDefined(cell.text) && "" !== cell.text) {
    const {
      textColor,
      font,
      _rect,
      padding
    } = cell;
    setTextStyles(doc, {
      textColor,
      font
    }, docStyles);
    const textRect = {
      x: _rect.x + padding.left,
      y: _rect.y + padding.top,
      w: _rect.w - (padding.left + padding.right),
      h: _rect.h - (padding.top + padding.bottom)
    };
    if (isDefined(cell._textLeftOffset) || isDefined(cell._textTopOffset)) {
      textRect.x = textRect.x + (cell._textLeftOffset ?? 0);
      textRect.y = textRect.y + (cell._textTopOffset ?? 0);
      doc.saveGraphicsState();
      clipOutsideRectContent(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h);
    }
    drawTextInRect(doc, cell.text, textRect, cell.verticalAlign, cell.horizontalAlign, cell._internalTextOptions);
    if (isDefined(cell._textLeftOffset) || isDefined(cell._textTopOffset)) {
      doc.restoreGraphicsState();
    }
  }
}
function drawCellsLines(doc, cellsArray, docStyles) {
  cellsArray.filter((cell) => !isDefined(cell.borderColor)).forEach((cell) => {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
  cellsArray.filter((cell) => isDefined(cell.borderColor)).forEach((cell) => {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
}
function drawGridLines(doc, rect, options, docStyles) {
  drawBorders(doc, rect, options, docStyles);
}
function drawBorders(doc, rect, _ref, docStyles) {
  let {
    borderWidth,
    borderColor,
    drawLeftBorder = true,
    drawRightBorder = true,
    drawTopBorder = true,
    drawBottomBorder = true
  } = _ref;
  if (!isDefined(rect)) {
    throw "rect is required";
  }
  if (!drawLeftBorder && !drawRightBorder && !drawTopBorder && !drawBottomBorder) {
    return;
  } else if (drawLeftBorder && drawRightBorder && drawTopBorder && drawBottomBorder) {
    setLinesStyles(doc, {
      borderWidth,
      borderColor
    }, docStyles);
    drawRect(doc, rect.x, rect.y, rect.w, rect.h);
  } else {
    setLinesStyles(doc, {
      borderWidth,
      borderColor
    }, docStyles);
    if (drawTopBorder) {
      drawLine(doc, rect.x, rect.y, rect.x + rect.w, rect.y);
    }
    if (drawLeftBorder) {
      drawLine(doc, rect.x, rect.y, rect.x, rect.y + rect.h);
    }
    if (drawRightBorder) {
      drawLine(doc, rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h);
    }
    if (drawBottomBorder) {
      drawLine(doc, rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h);
    }
  }
}
function setTextStyles(doc, _ref2, docStyles) {
  let {
    textColor,
    font
  } = _ref2;
  trySetColor(doc, "text", isDefined(textColor) ? textColor : docStyles.textColor);
  const currentFont = isDefined(font) ? extend({}, docStyles.font, font) : docStyles.font;
  const docFont = doc.getFont();
  if (currentFont.name !== docFont.fontName || currentFont.style !== docFont.fontStyle || isDefined(currentFont.weight)) {
    doc.setFont(currentFont.name, currentFont.style, currentFont.weight);
  }
  if (currentFont.size !== doc.getFontSize()) {
    doc.setFontSize(currentFont.size);
  }
}
function setLinesStyles(doc, _ref3, docStyles) {
  let {
    borderWidth,
    borderColor
  } = _ref3;
  const currentBorderWidth = isDefined(borderWidth) ? borderWidth : docStyles.borderWidth;
  if (currentBorderWidth !== getDocBorderWidth(doc)) {
    setDocBorderWidth(doc, toPdfUnit(doc, currentBorderWidth));
  }
  trySetColor(doc, "draw", isDefined(borderColor) ? borderColor : docStyles.borderColor);
}
function trySetColor(doc, target, color) {
  const getterName = `get${capitalizeFirstLetter(target)}Color`;
  const setterName = `set${capitalizeFirstLetter(target)}Color`;
  const {
    ch1 = color,
    ch2,
    ch3,
    ch4
  } = color;
  const normalizedColor = doc.__private__.decodeColorString(doc.__private__.encodeColorString({
    ch1,
    ch2,
    ch3,
    ch4,
    precision: "text" === target ? 3 : 2
  }));
  if (normalizedColor !== doc[getterName]() || "fill" === target) {
    doc[setterName].apply(doc, [ch1, ch2, ch3, ch4].filter((item) => void 0 !== item));
  }
}
function getDocumentStyles(doc) {
  const docFont = doc.getFont();
  return {
    borderWidth: getDocBorderWidth(doc),
    borderColor: doc.getDrawColor(),
    font: {
      name: docFont.fontName,
      style: docFont.fontStyle,
      size: doc.getFontSize()
    },
    textColor: doc.getTextColor()
  };
}
function setDocumentStyles(doc, styles) {
  const {
    borderWidth,
    borderColor,
    font,
    textColor
  } = styles;
  const docFont = doc.getFont();
  if (docFont.fontName !== font.name || docFont.fontStyle !== font.style) {
    doc.setFont(font.name, font.style, void 0);
  }
  const docFontSize = doc.getFontSize();
  if (docFontSize !== font.size) {
    doc.setFontSize(font.size);
  }
  if (getDocBorderWidth(doc) !== borderWidth) {
    setDocBorderWidth(doc, borderWidth);
  }
  if (doc.getDrawColor() !== borderColor) {
    doc.setDrawColor(borderColor);
  }
  if (doc.getTextColor() !== textColor) {
    doc.setTextColor(textColor);
  }
}
function addNewPage(doc) {
  doc.addPage();
  resetDocBorderWidth(doc);
}
function getDocBorderWidth(doc) {
  if (isDefined(doc.getLineWidth)) {
    return doc.getLineWidth();
  }
  return doc.__borderWidth ?? 0.200025;
}
function setDocBorderWidth(doc, width) {
  doc.setLineWidth(width);
  if (!isDefined(doc.getLineWidth)) {
    doc.__borderWidth = width;
  }
}
function resetDocBorderWidth(doc) {
  if (!isDefined(doc.getLineWidth)) {
    doc.__borderWidth = null;
  }
}
function clipOutsideRectContent(doc, x, y, w, h) {
  doc.moveTo(roundToThreeDecimals(x), roundToThreeDecimals(y));
  doc.lineTo(roundToThreeDecimals(x + w), roundToThreeDecimals(y));
  doc.lineTo(roundToThreeDecimals(x + w), roundToThreeDecimals(y + h));
  doc.lineTo(roundToThreeDecimals(x), roundToThreeDecimals(y + h));
  doc.clip();
  doc.discardPath();
}

// node_modules/devextreme/esm/exporter/jspdf/common/rows_spliting_utils/get_multipage_row_pages.js
var isHeader = (rect) => "header" === (null === rect || void 0 === rect ? void 0 : rect.sourceCellInfo.gridCell.rowType);
var spitMultiPageRows = (rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc) => {
  let [newPageRects, remainPageRects] = splitMultiPageRowFunc(isCurrentPageContainsOnlyHeader, rectsToPatch);
  const newPageRectsArray = [isCurrentPageContainsOnlyHeader ? newPageRects.map((rect) => _extends({}, rect, {
    y: firstRectYAdjustment
  })) : newPageRects];
  while (!checkIsFitToPageFunc(false, remainPageRects[0].h)) {
    [newPageRects, remainPageRects] = splitMultiPageRowFunc(false, remainPageRects);
    newPageRectsArray.push(newPageRects);
  }
  return [newPageRectsArray, remainPageRects];
};
var patchRects = (rectsToSplit, rectsToPatch, remainPageRects) => {
  rectsToPatch.forEach((rect, rectIndex) => {
    rect.sourceCellInfo.text = remainPageRects[rectIndex].sourceCellInfo.text;
    rect.h = remainPageRects[rectIndex].h;
  });
  const untouchedRowIdx = rectsToSplit.indexOf(rectsToPatch[rectsToPatch.length - 1]) + 1;
  if (untouchedRowIdx >= rectsToSplit.length) {
    return;
  }
  const delta = rectsToSplit[untouchedRowIdx].y - (rectsToPatch[0].y + remainPageRects[0].h);
  for (let idx = untouchedRowIdx; idx < rectsToSplit.length; idx++) {
    rectsToSplit[idx].y = rectsToSplit[idx].y - delta;
  }
};
var checkPageContainsOnlyHeader = (pageRects, isFirstPage) => isFirstPage && isHeader(pageRects[pageRects.length - 1]);
var getMultiPageRowPages = (currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, splitMultiPageRowFunc, checkIsFitToPageFunc) => {
  if (!splitMultiPageRowFunc) {
    return [];
  }
  const currentPageLastRect = currentPageRects[currentPageRects.length - 1];
  const nextPageFirstRect = rectsToSplit[currentPageRects.length];
  if (!nextPageFirstRect || isHeader(nextPageFirstRect)) {
    return [];
  }
  const isRectsFitsToPage = checkIsFitToPageFunc(isCurrentPageContainsOnlyHeader, nextPageFirstRect.h);
  if (isRectsFitsToPage && !isCurrentPageContainsOnlyHeader) {
    return [];
  }
  const rectsToPatch = rectsToSplit.filter((_ref) => {
    let {
      y
    } = _ref;
    return y === nextPageFirstRect.y;
  });
  const firstRectYAdjustment = currentPageLastRect.y + currentPageLastRect.h;
  const [multiPageRowPages, remainPageRects] = spitMultiPageRows(rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc);
  patchRects(rectsToSplit, rectsToPatch, remainPageRects);
  return multiPageRowPages;
};

// node_modules/devextreme/esm/exporter/jspdf/common/rows_spliting_utils/create_on_split_multipage_row.js
function createMultiCellRect(rect, text, marginTop) {
  return _extends({}, rect, {
    sourceCellInfo: _extends({}, rect.sourceCellInfo, {
      text
    }),
    y: marginTop
  });
}
var createOnSplitMultiPageRow = (doc, options, headerHeight, maxBottomRight) => (isFirstPage, pageRects) => {
  const currentPageRects = [];
  const nextPageRects = [];
  let maxCurrentPageHeight = 0;
  let maxNextPageHeight = 0;
  pageRects.forEach((rect) => {
    const {
      w,
      sourceCellInfo
    } = rect;
    const additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : headerHeight + options.topLeft.y;
    const heightOfOneLine = getTextDimensions(doc, sourceCellInfo.text, sourceCellInfo.font).h;
    const paddingHeight = sourceCellInfo.padding.top + sourceCellInfo.padding.bottom;
    const fullPageHeight = maxBottomRight.y - additionalHeight - paddingHeight - options.margin.top;
    const possibleLinesCount = Math.floor(fullPageHeight / (heightOfOneLine * doc.getLineHeightFactor()));
    const allLines = getTextLines(doc, sourceCellInfo.text, sourceCellInfo.font, {
      wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
      targetRectWidth: w
    });
    if (possibleLinesCount < allLines.length) {
      const currentPageText = allLines.slice(0, possibleLinesCount).join("\n");
      const currentPageHeight = calculateTextHeight(doc, currentPageText, sourceCellInfo.font, {
        wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
        targetRectWidth: w
      });
      maxCurrentPageHeight = Math.max(maxCurrentPageHeight, currentPageHeight + paddingHeight);
      maxNextPageHeight = rect.h - currentPageHeight;
      currentPageRects.push(createMultiCellRect(rect, currentPageText, options.margin.top));
      nextPageRects.push(createMultiCellRect(rect, allLines.slice(possibleLinesCount).join("\n"), options.margin.top));
    } else {
      const currentPageHeight = calculateTextHeight(doc, sourceCellInfo.text, sourceCellInfo.font, {
        wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
        targetRectWidth: w
      });
      maxCurrentPageHeight = Math.max(maxCurrentPageHeight, currentPageHeight + paddingHeight);
      maxNextPageHeight = Math.max(maxNextPageHeight, currentPageHeight + paddingHeight);
      currentPageRects.push(createMultiCellRect(rect, sourceCellInfo.text, options.margin.top));
      nextPageRects.push(createMultiCellRect(rect, "", options.margin.top));
    }
  });
  currentPageRects.forEach((rect) => rect.h = maxCurrentPageHeight);
  nextPageRects.forEach((rect) => rect.h = maxNextPageHeight);
  return [currentPageRects, nextPageRects];
};

// node_modules/devextreme/esm/exporter/jspdf/common/rows_splitting.js
function convertToCellsArray(rows) {
  return [].concat.apply([], rows.map((rowInfo) => rowInfo.cells.filter((cell) => !isDefined(cell.pdfCell.isMerged)).map((cellInfo) => Object.assign({}, cellInfo.pdfCell._rect, {
    sourceCellInfo: _extends({}, cellInfo.pdfCell, {
      gridCell: cellInfo.gridCell
    })
  }))));
}
function splitByPages(doc, rowsInfo, options, onSeparateRectHorizontally, onSeparateRectVertically) {
  if (0 === rowsInfo.length) {
    return [[]];
  }
  const maxBottomRight = {
    x: getPageWidth(doc) - options.margin.right,
    y: getPageHeight(doc) - options.margin.bottom
  };
  const headerRows = rowsInfo.filter((r) => "header" === r.rowType);
  const headerHeight = headerRows.reduce((accumulator, row) => accumulator + row.height, 0);
  const verticallyPages = splitRectsByPages(convertToCellsArray(rowsInfo), options.margin.top, "y", "h", (isFirstPage, currentCoordinate) => {
    const additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : 0;
    return roundToThreeDecimals(currentCoordinate + additionalHeight) <= roundToThreeDecimals(maxBottomRight.y);
  }, (rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) => {
    const args = {
      sourceRect: rect,
      topRect: {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: currentPageMaxRectCoordinate - rect.y
      },
      bottomRect: {
        x: rect.x,
        y: currentPageMaxRectCoordinate,
        w: rect.w,
        h: rect.h - (currentPageMaxRectCoordinate - rect.y)
      }
    };
    onSeparateRectVertically(args);
    currentPageRects.push(args.topRect);
    rectsToSplit.push(args.bottomRect);
  }, createOnSplitMultiPageRow(doc, options, headerHeight, maxBottomRight));
  if (options.repeatHeaders) {
    for (let i = 1; i < verticallyPages.length; i++) {
      verticallyPages[i].forEach((rect) => rect.y += headerHeight);
      const headerCells = convertToCellsArray(headerRows);
      headerCells.forEach((cell) => {
        cell.y -= options.topLeft.y;
      });
      verticallyPages[i] = [...headerCells, ...verticallyPages[i]];
    }
  }
  let pageIndex = 0;
  while (pageIndex < verticallyPages.length) {
    const horizontallyPages = splitRectsByPages(verticallyPages[pageIndex], options.margin.left, "x", "w", (pagesLength, currentCoordinate) => roundToThreeDecimals(currentCoordinate) <= roundToThreeDecimals(maxBottomRight.x), (rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) => {
      const args = {
        sourceRect: rect,
        leftRect: {
          x: rect.x,
          y: rect.y,
          w: currentPageMaxRectCoordinate - rect.x,
          h: rect.h
        },
        rightRect: {
          x: currentPageMaxRectCoordinate,
          y: rect.y,
          w: rect.w - (currentPageMaxRectCoordinate - rect.x),
          h: rect.h
        }
      };
      onSeparateRectHorizontally(args);
      currentPageRects.push(args.leftRect);
      rectsToSplit.push(args.rightRect);
    });
    if (horizontallyPages.length > 1) {
      verticallyPages.splice(pageIndex, 1, ...horizontallyPages);
      pageIndex += horizontallyPages.length;
    } else {
      pageIndex += 1;
    }
  }
  return verticallyPages.map((rects) => rects.map((rect) => Object.assign({}, rect.sourceCellInfo, {
    _rect: rect
  })));
}
function splitRectsByPages(rects, marginValue, coordinate, dimension, isFitToPage, onSeparateCallback, onSplitMultiPageRow) {
  const pages = [];
  const rectsToSplit = [...rects];
  const isFitToPageForMultiPageRow = (isFirstPage, rectHeight) => isFitToPage(isFirstPage, rectHeight + marginValue);
  while (rectsToSplit.length > 0) {
    let currentPageMaxRectCoordinate = 0;
    const currentPageRects = rectsToSplit.filter((rect) => {
      const currentRectCoordinate = rect[coordinate] + rect[dimension];
      if (isFitToPage(0 === pages.length, currentRectCoordinate)) {
        if (currentPageMaxRectCoordinate <= currentRectCoordinate) {
          currentPageMaxRectCoordinate = currentRectCoordinate;
        }
        return true;
      } else {
        return false;
      }
    });
    const isCurrentPageContainsOnlyHeader = checkPageContainsOnlyHeader(currentPageRects, 0 === pages.length);
    const multiPageRowPages = getMultiPageRowPages(currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, onSplitMultiPageRow, isFitToPageForMultiPageRow);
    const rectsToSeparate = rectsToSplit.filter((rect) => {
      const currentRectLeft = rect[coordinate];
      const currentRectRight = rect[coordinate] + rect[dimension];
      return currentPageMaxRectCoordinate - currentRectLeft > 1e-3 && currentRectRight - currentPageMaxRectCoordinate > 1e-3;
    });
    rectsToSeparate.forEach((rect) => {
      onSeparateCallback(rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit);
      const index = rectsToSplit.indexOf(rect);
      if (-1 !== index) {
        rectsToSplit.splice(index, 1);
      }
    });
    currentPageRects.forEach((rect) => {
      const index = rectsToSplit.indexOf(rect);
      if (-1 !== index) {
        rectsToSplit.splice(index, 1);
      }
    });
    rectsToSplit.forEach((rect) => {
      rect[coordinate] = isDefined(currentPageMaxRectCoordinate) ? rect[coordinate] - currentPageMaxRectCoordinate + marginValue : rect[coordinate];
    });
    const firstPageContainsHeaderAndMultiPageRow = isCurrentPageContainsOnlyHeader && multiPageRowPages.length > 0;
    if (firstPageContainsHeaderAndMultiPageRow) {
      const [firstPage, ...restOfPages] = multiPageRowPages;
      pages.push([...currentPageRects, ...firstPage]);
      pages.push(...restOfPages);
    } else if (currentPageRects.length > 0) {
      pages.push(currentPageRects);
      pages.push(...multiPageRowPages);
    } else if (multiPageRowPages.length > 0) {
      pages.push(...multiPageRowPages);
      pages.push(rectsToSplit);
    } else {
      pages.push(rectsToSplit);
      break;
    }
  }
  return pages;
}

// node_modules/devextreme/esm/exporter/jspdf/common/export.js
function _getFullOptions(options) {
  const {
    jsPDFDocument
  } = options;
  const fullOptions = extend({}, options);
  if (!isDefined(fullOptions.topLeft)) {
    fullOptions.topLeft = {
      x: 0,
      y: 0
    };
  }
  if (!isDefined(fullOptions.indent)) {
    fullOptions.indent = 0;
  }
  if (!isDefined(fullOptions.repeatHeaders)) {
    fullOptions.repeatHeaders = true;
  }
  if (!isDefined(fullOptions.margin)) {
    fullOptions.margin = toPdfUnit(jsPDFDocument, 40);
  }
  fullOptions.margin = normalizeBoundaryValue(fullOptions.margin);
  if (!Array.isArray(fullOptions.columnWidths)) {
    fullOptions.columnWidths = [];
  }
  if (!isDefined(fullOptions.loadPanel)) {
    fullOptions.loadPanel = {};
  }
  if (!isDefined(fullOptions.loadPanel.enabled)) {
    fullOptions.loadPanel.enabled = true;
  }
  if (!isDefined(fullOptions.loadPanel.text)) {
    fullOptions.loadPanel.text = message_default.format("dxDataGrid-exporting");
  }
  return fullOptions;
}
function exportDataGrid(options) {
  var _component$_getIntern;
  const {
    jsPDFDocument,
    component,
    selectedRowsOnly,
    loadPanel
  } = options;
  const internalComponent = (null === (_component$_getIntern = component._getInternalInstance) || void 0 === _component$_getIntern ? void 0 : _component$_getIntern.call(component)) || component;
  const initialLoadPanelEnabledOption = internalComponent.option("loadPanel") && internalComponent.option("loadPanel").enabled;
  if (initialLoadPanelEnabledOption) {
    component.option("loadPanel.enabled", false);
  }
  let exportLoadPanel;
  if (loadPanel.enabled && hasWindow()) {
    const rowsView = component.getView("rowsView");
    exportLoadPanel = new ExportLoadPanel(component, rowsView.element(), rowsView.element().parent(), loadPanel);
    exportLoadPanel.show();
  }
  const dataProvider = component.getDataProvider(selectedRowsOnly);
  return new Promise((resolve) => {
    dataProvider.ready().done(() => {
      var _options$rowOptions;
      const rowsInfo = generateRowsInfo(jsPDFDocument, dataProvider, component, null === (_options$rowOptions = options.rowOptions) || void 0 === _options$rowOptions || null === (_options$rowOptions = _options$rowOptions.headerStyles) || void 0 === _options$rowOptions ? void 0 : _options$rowOptions.backgroundColor);
      if (options.customizeCell) {
        rowsInfo.forEach((rowInfo) => rowInfo.cells.forEach((cellInfo) => options.customizeCell(cellInfo)));
      }
      normalizeRowsInfo(rowsInfo);
      initializeCellsWidth(jsPDFDocument, dataProvider, rowsInfo, options);
      resizeFirstColumnByIndentLevel(rowsInfo, options);
      applyColSpans(rowsInfo);
      calculateHeights(jsPDFDocument, rowsInfo, options);
      applyRowSpans(rowsInfo);
      updateRowsAndCellsHeights(jsPDFDocument, rowsInfo);
      calculateCoordinates(jsPDFDocument, rowsInfo, options);
      applyBordersConfig(rowsInfo);
      applyWordWrap(jsPDFDocument, rowsInfo);
      const docStyles = getDocumentStyles(jsPDFDocument);
      const rtlEnabled = !!component.option("rtlEnabled");
      const rectsByPages = splitByPages(jsPDFDocument, rowsInfo, options, (_ref) => {
        var _sourceRect$sourceCel;
        let {
          sourceRect,
          leftRect,
          rightRect
        } = _ref;
        let leftRectTextOptions = {};
        let rightRectTextOptions = {};
        const isTextNotEmpty = (null === (_sourceRect$sourceCel = sourceRect.sourceCellInfo.text) || void 0 === _sourceRect$sourceCel ? void 0 : _sourceRect$sourceCel.length) > 0;
        if (isTextNotEmpty) {
          if (rtlEnabled) {
            const isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
            const isTextRightAlignment = !isDefined(sourceRect.sourceCellInfo.horizontalAlign) || "right" === sourceRect.sourceCellInfo.horizontalAlign;
            if (isTextWidthGreaterThanRect || !isTextRightAlignment) {
              var _sourceRect$sourceCel2, _sourceRect$sourceCel3, _sourceRect$sourceCel4;
              let rightRectTextOffset;
              let leftRectTextOffset;
              if ("right" === (null === (_sourceRect$sourceCel2 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel2 ? void 0 : _sourceRect$sourceCel2.horizontalAlign)) {
                rightRectTextOffset = sourceRect.sourceCellInfo._textLeftOffset ?? 0;
                leftRectTextOffset = rightRectTextOffset + leftRect.w;
              } else if ("center" === (null === (_sourceRect$sourceCel3 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel3 ? void 0 : _sourceRect$sourceCel3.horizontalAlign)) {
                leftRectTextOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w) + sourceRect.sourceCellInfo._rect.w / 2 - leftRect.w / 2;
                rightRectTextOffset = leftRectTextOffset - rightRect.w;
              } else if ("left" === (null === (_sourceRect$sourceCel4 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel4 ? void 0 : _sourceRect$sourceCel4.horizontalAlign)) {
                leftRectTextOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w);
                rightRectTextOffset = leftRectTextOffset - rightRect.w;
              }
              leftRectTextOptions = Object.assign({}, {
                _textLeftOffset: rightRectTextOffset
              });
              rightRectTextOptions = Object.assign({}, {
                _textLeftOffset: leftRectTextOffset
              });
            } else {
              rightRectTextOptions = Object.assign({}, {
                text: ""
              });
            }
          } else {
            const isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
            const isTextLeftAlignment = !isDefined(sourceRect.sourceCellInfo.horizontalAlign) || "left" === sourceRect.sourceCellInfo.horizontalAlign;
            if (isTextWidthGreaterThanRect || !isTextLeftAlignment) {
              var _sourceRect$sourceCel5, _sourceRect$sourceCel6, _sourceRect$sourceCel7;
              let leftTextLeftOffset;
              let rightTextLeftOffset;
              if ("left" === (null === (_sourceRect$sourceCel5 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel5 ? void 0 : _sourceRect$sourceCel5.horizontalAlign)) {
                leftTextLeftOffset = sourceRect.sourceCellInfo._textLeftOffset ?? 0;
                rightTextLeftOffset = leftTextLeftOffset - leftRect.w;
              } else if ("center" === (null === (_sourceRect$sourceCel6 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel6 ? void 0 : _sourceRect$sourceCel6.horizontalAlign)) {
                const offset = sourceRect.sourceCellInfo._textLeftOffset ?? 0;
                leftTextLeftOffset = offset + (sourceRect.x + sourceRect.w / 2) - (leftRect.x + leftRect.w / 2);
                rightTextLeftOffset = offset + (sourceRect.x + sourceRect.w / 2) - (rightRect.x + rightRect.w / 2);
              } else if ("right" === (null === (_sourceRect$sourceCel7 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel7 ? void 0 : _sourceRect$sourceCel7.horizontalAlign)) {
                leftTextLeftOffset = sourceRect.x + sourceRect.w - (leftRect.x + leftRect.w);
                rightTextLeftOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w);
              }
              leftRectTextOptions = Object.assign({}, {
                _textLeftOffset: leftTextLeftOffset
              });
              rightRectTextOptions = Object.assign({}, {
                _textLeftOffset: rightTextLeftOffset
              });
            } else {
              rightRectTextOptions = Object.assign({}, {
                text: ""
              });
            }
          }
        }
        leftRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
          debugSourceCellInfo: sourceRect.sourceCellInfo
        }, leftRectTextOptions);
        rightRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
          debugSourceCellInfo: sourceRect.sourceCellInfo
        }, rightRectTextOptions);
      }, (_ref2) => {
        var _sourceRect$sourceCel8;
        let {
          sourceRect,
          topRect,
          bottomRect
        } = _ref2;
        let topRectTextOptions = {};
        let bottomRectTextOptions = {};
        const isTextNotEmpty = (null === (_sourceRect$sourceCel8 = sourceRect.sourceCellInfo.text) || void 0 === _sourceRect$sourceCel8 ? void 0 : _sourceRect$sourceCel8.length) > 0;
        if (isTextNotEmpty) {
          var _sourceRect$sourceCel9;
          const isTextHeightGreaterThanRect = jsPDFDocument.getTextDimensions(sourceRect.sourceCellInfo.text).h > topRect.h;
          const isTextTopAlignment = "top" === (null === (_sourceRect$sourceCel9 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel9 ? void 0 : _sourceRect$sourceCel9.verticalAlign);
          if (isTextHeightGreaterThanRect || !isTextTopAlignment) {
            var _sourceRect$sourceCel10, _sourceRect$sourceCel11, _sourceRect$sourceCel12;
            let topTextTopOffset;
            let bottomTextTopOffset;
            if ("top" === (null === (_sourceRect$sourceCel10 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel10 ? void 0 : _sourceRect$sourceCel10.verticalAlign)) {
              topTextTopOffset = sourceRect.sourceCellInfo._textTopOffset ?? 0;
              bottomTextTopOffset = topTextTopOffset - topRect.h;
            } else if ("middle" === (null === (_sourceRect$sourceCel11 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel11 ? void 0 : _sourceRect$sourceCel11.verticalAlign)) {
              const offset = sourceRect.sourceCellInfo._textTopOffset ?? 0;
              topTextTopOffset = offset + (sourceRect.y + sourceRect.h / 2) - (topRect.y + topRect.h / 2);
              bottomTextTopOffset = offset + (sourceRect.y + sourceRect.h / 2) - (bottomRect.y + bottomRect.h / 2);
            } else if ("bottom" === (null === (_sourceRect$sourceCel12 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel12 ? void 0 : _sourceRect$sourceCel12.verticalAlign)) {
              topTextTopOffset = sourceRect.y + sourceRect.h - (topRect.y + topRect.h);
              bottomTextTopOffset = sourceRect.y + sourceRect.h - (bottomRect.y + bottomRect.h);
            }
            topRectTextOptions = Object.assign({}, {
              _textTopOffset: topTextTopOffset
            });
            bottomRectTextOptions = Object.assign({}, {
              _textTopOffset: bottomTextTopOffset
            });
          } else {
            bottomRectTextOptions = Object.assign({}, {
              text: ""
            });
          }
        }
        topRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
          debugSourceCellInfo: sourceRect.sourceCellInfo
        }, topRectTextOptions);
        bottomRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
          debugSourceCellInfo: sourceRect.sourceCellInfo
        }, bottomRectTextOptions);
      });
      if (rtlEnabled) {
        applyRtl(jsPDFDocument, rectsByPages, options);
      }
      rectsByPages.forEach((pdfCellsInfo, index) => {
        if (index > 0) {
          addNewPage(jsPDFDocument);
        }
        drawCellsContent(jsPDFDocument, options.customDrawCell, pdfCellsInfo, docStyles);
        drawCellsLines(jsPDFDocument, pdfCellsInfo, docStyles);
        const isEmptyPdfCellsInfoSpecified = isDefined(pdfCellsInfo) && 0 === pdfCellsInfo.length;
        if (isEmptyPdfCellsInfoSpecified) {
          const tableRect = calculateTableSize(jsPDFDocument, pdfCellsInfo, options);
          const baseStyle = getBaseTableStyle();
          drawGridLines(jsPDFDocument, tableRect, baseStyle, docStyles);
        }
      });
      setDocumentStyles(jsPDFDocument, docStyles);
      resolve();
    }).always(() => {
      if (initialLoadPanelEnabledOption) {
        component.option("loadPanel.enabled", initialLoadPanelEnabledOption);
      }
      if (loadPanel.enabled && hasWindow()) {
        exportLoadPanel.dispose();
      }
    });
  });
}
var Export = {
  getFullOptions: _getFullOptions,
  export: exportDataGrid
};

// node_modules/devextreme/esm/exporter/jspdf/export_data_grid.js
var HOW_TO_MIGRATE_ARTICLE = "https://supportcenter.devexpress.com/ticket/details/t1077554";
function _getFullOptions2(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && "dxDataGrid" === options.component.NAME)) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!(isDefined(options.jsPDFDocument) && isObject(options.jsPDFDocument))) {
    throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
  }
  if (isDefined(options.autoTableOptions)) {
    errors_default.log("W0001", "Export", "autoTableOptions", "22.1", `You can migrate from exporting to PDF with the AutoTable plugin to a new export system. See the following topic for more information: ${HOW_TO_MIGRATE_ARTICLE}`);
  }
  return Export.getFullOptions(options);
}
function exportDataGrid2(options) {
  return Export.export(_getFullOptions2(options));
}

// node_modules/devextreme/esm/exporter/jspdf/autotable/export.js
var Export2 = {
  getFullOptions: function(options) {
    const fullOptions = extend({}, options);
    if (!(isDefined(fullOptions.jsPDFDocument) && isObject(fullOptions.jsPDFDocument))) {
      throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
    }
    if (!(isDefined(fullOptions.jsPDFDocument.autoTable) && isFunction(fullOptions.jsPDFDocument.autoTable))) {
      throw Error('The "exportDataGrid" method requires a autoTable plugin for jsPDF object.');
    }
    if (!isDefined(fullOptions.keepColumnWidths)) {
      fullOptions.keepColumnWidths = true;
    }
    if (!isDefined(fullOptions.autoTableOptions)) {
      fullOptions.autoTableOptions = this._getDefaultAutoTableOptions();
    } else {
      if (!isObject(fullOptions.autoTableOptions)) {
        throw Error('The "autoTableOptions" option must be of object type.');
      }
      fullOptions.autoTableOptions = extend(true, {}, this._getDefaultAutoTableOptions(), fullOptions.autoTableOptions);
    }
    if (!isDefined(fullOptions.loadPanel)) {
      fullOptions.loadPanel = {};
    }
    if (!isDefined(fullOptions.loadPanel.enabled)) {
      fullOptions.loadPanel.enabled = true;
    }
    if (!isDefined(fullOptions.loadPanel.text)) {
      fullOptions.loadPanel.text = message_default.format("dxDataGrid-exporting");
    }
    return fullOptions;
  },
  _getDefaultAutoTableOptions: function() {
    return {
      theme: "plain",
      tableLineColor: 149,
      tableLineWidth: 0.1,
      styles: {
        textColor: 51,
        lineColor: 149,
        lineWidth: 0
      },
      columnStyles: {},
      headStyles: {
        fontStyle: "normal",
        textColor: 149,
        lineWidth: 0.1
      },
      bodyStyles: {
        lineWidth: 0.1
      },
      head: [],
      body: []
    };
  },
  export: function(options) {
    var _component$_getIntern;
    const {
      jsPDFDocument,
      autoTableOptions,
      component,
      customizeCell,
      keepColumnWidths,
      selectedRowsOnly,
      loadPanel
    } = options;
    const internalComponent = (null === (_component$_getIntern = component._getInternalInstance) || void 0 === _component$_getIntern ? void 0 : _component$_getIntern.call(component)) || component;
    const initialLoadPanelEnabledOption = internalComponent.option("loadPanel") && internalComponent.option("loadPanel").enabled;
    if (initialLoadPanelEnabledOption) {
      component.option("loadPanel.enabled", false);
    }
    let exportLoadPanel;
    if (loadPanel.enabled && hasWindow()) {
      const rowsView = component.getView("rowsView");
      exportLoadPanel = new ExportLoadPanel(component, rowsView.element(), rowsView.element().parent(), loadPanel);
      exportLoadPanel.show();
    }
    const dataProvider = component.getDataProvider(selectedRowsOnly);
    const wrapText = !!component.option("wordWrapEnabled");
    return new Promise((resolve) => {
      dataProvider.ready().done(() => {
        const columns = dataProvider.getColumns();
        const styles = dataProvider.getStyles();
        const dataRowsCount = dataProvider.getRowsCount();
        const headerRowCount = dataProvider.getHeaderRowCount();
        const mergedCells = [];
        if (keepColumnWidths) {
          const pdfColumnWidths = this._tryGetPdfColumnWidths(autoTableOptions.tableWidth, dataProvider.getColumnsWidths());
          if (isDefined(pdfColumnWidths) && isDefined(autoTableOptions.columnStyles)) {
            this._setColumnWidths(autoTableOptions.columnStyles, pdfColumnWidths);
          }
        }
        for (let rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
          const row = [];
          for (let cellIndex = 0; cellIndex < columns.length; cellIndex++) {
            const {
              value,
              cellSourceData: gridCell
            } = dataProvider.getCellData(rowIndex, cellIndex, true);
            const cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
            const pdfCell = {
              content: this._getFormattedValue(value, cellStyle.format),
              styles: this._getPDFCellStyles(gridCell.rowType, columns[cellIndex].alignment, cellStyle, wrapText)
            };
            if ("header" === gridCell.rowType) {
              const mergedRange = this._tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider);
              if (mergedRange && mergedRange.rowSpan > 0) {
                pdfCell.rowSpan = mergedRange.rowSpan + 1;
              }
              if (mergedRange && mergedRange.colSpan > 0) {
                pdfCell.colSpan = mergedRange.colSpan + 1;
              }
              const isMergedCell = mergedCells[rowIndex] && mergedCells[rowIndex][cellIndex];
              if (!isMergedCell || pdfCell.rowSpan > 1 || pdfCell.colSpan > 1) {
                if (isFunction(customizeCell)) {
                  customizeCell({
                    gridCell,
                    pdfCell
                  });
                }
                row.push(pdfCell);
              }
            } else if ("group" === gridCell.rowType && !isDefined(pdfCell.content) && 1 === row.length) {
              row[0].colSpan = row[0].colSpan ?? 1;
              row[0].colSpan++;
            } else {
              pdfCell.content = pdfCell.content ?? "";
              if (isFunction(customizeCell)) {
                customizeCell({
                  gridCell,
                  pdfCell
                });
              }
              row.push(pdfCell);
            }
          }
          if (rowIndex < headerRowCount) {
            autoTableOptions.head.push(row);
          } else {
            autoTableOptions.body.push(row);
          }
        }
        jsPDFDocument.autoTable(autoTableOptions);
        resolve();
      }).always(() => {
        if (initialLoadPanelEnabledOption) {
          component.option("loadPanel.enabled", initialLoadPanelEnabledOption);
        }
        if (loadPanel.enabled && hasWindow()) {
          exportLoadPanel.dispose();
        }
      });
    });
  },
  _getFormattedValue: function(value, format) {
    if (isDefined(format)) {
      if (isDate(value)) {
        return date_default.format(value, format);
      }
      if (isNumeric(value)) {
        return number_default.format(value, format);
      }
    }
    return value;
  },
  _getPDFCellStyles: function(rowType, columnAlignment, cellStyle, wrapText) {
    const {
      alignment: cellAlignment,
      bold
    } = cellStyle;
    const align = "header" === rowType ? columnAlignment : cellAlignment;
    const pdfCellStyle = {};
    if (align) {
      pdfCellStyle.halign = align;
    }
    if (bold && "header" !== rowType) {
      pdfCellStyle.fontStyle = "bold";
    }
    if (wrapText) {
      pdfCellStyle.cellWidth = "wrap";
    }
    return pdfCellStyle;
  },
  _tryGetMergeRange: function(rowIndex, cellIndex, mergedCells, dataProvider) {
    if (!mergedCells[rowIndex] || !mergedCells[rowIndex][cellIndex]) {
      const {
        colspan,
        rowspan
      } = dataProvider.getCellMerging(rowIndex, cellIndex);
      if (colspan || rowspan) {
        for (let i = rowIndex; i <= rowIndex + rowspan || 0; i++) {
          for (let j = cellIndex; j <= cellIndex + colspan || 0; j++) {
            if (!mergedCells[i]) {
              mergedCells[i] = [];
            }
            mergedCells[i][j] = true;
          }
        }
        return {
          rowSpan: rowspan,
          colSpan: colspan
        };
      }
    }
  },
  _tryGetPdfColumnWidths(autoTableWidth, columnWidths) {
    if (isNumeric(autoTableWidth) && isDefined(columnWidths)) {
      const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
      return columnWidths.map((columnWidth) => autoTableWidth * columnWidth / tableWidth);
    }
  },
  _setColumnWidths: function(autoTableColumnStyles, pdfColumnWidths) {
    pdfColumnWidths.forEach((width, index) => {
      autoTableColumnStyles[index] = autoTableColumnStyles[index] || {};
      autoTableColumnStyles[index].cellWidth = width;
    });
  }
};

// node_modules/devextreme/esm/exporter/jspdf/autotable/export_data_grid.js
function _getFullOptions3(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && "dxDataGrid" === options.component.NAME)) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!isDefined(options.selectedRowsOnly)) {
    options.selectedRowsOnly = false;
  }
  return Export2.getFullOptions(options);
}
function exportDataGrid3(options) {
  return Export2.export(_getFullOptions3(options));
}

// node_modules/devextreme/esm/exporter/jspdf/export_gantt.js
function exportGantt(options) {
  const component = options.component;
  return null === component || void 0 === component ? void 0 : component.exportToPdf(options);
}

export {
  exportDataGrid2 as exportDataGrid,
  exportDataGrid3 as exportDataGrid2,
  exportGantt
};
//# sourceMappingURL=chunk-MKAILQ3Z.js.map
