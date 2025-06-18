import {
  ExportLoadPanel,
  core_default,
  date_default,
  getDefaultAlignment,
  getFormat2 as getFormat,
  number_default
} from "./chunk-2SPVQWIC.js";
import {
  _extends,
  camelize,
  extend,
  format,
  hasWindow,
  isDate,
  isDefined,
  isFunction,
  isNumeric,
  isObject,
  isString
} from "./chunk-SFROUENP.js";

// node_modules/devextreme/esm/common/core/localization/language_codes.js
var LANGUAGE_CODES = {
  ar: 1,
  bg: 2,
  ca: 3,
  "zh-Hans": 4,
  cs: 5,
  da: 6,
  de: 7,
  el: 8,
  en: 9,
  es: 10,
  fi: 11,
  fr: 12,
  he: 13,
  hu: 14,
  is: 15,
  it: 16,
  ja: 17,
  ko: 18,
  nl: 19,
  no: 20,
  pl: 21,
  pt: 22,
  rm: 23,
  ro: 24,
  ru: 25,
  hr: 26,
  sk: 27,
  sq: 28,
  sv: 29,
  th: 30,
  tr: 31,
  ur: 32,
  id: 33,
  uk: 34,
  be: 35,
  sl: 36,
  et: 37,
  lv: 38,
  lt: 39,
  tg: 40,
  fa: 41,
  vi: 42,
  hy: 43,
  az: 44,
  eu: 45,
  hsb: 46,
  mk: 47,
  tn: 50,
  xh: 52,
  zu: 53,
  af: 54,
  ka: 55,
  fo: 56,
  hi: 57,
  mt: 58,
  se: 59,
  ga: 60,
  ms: 62,
  kk: 63,
  ky: 64,
  sw: 65,
  tk: 66,
  uz: 67,
  tt: 68,
  bn: 69,
  pa: 70,
  gu: 71,
  or: 72,
  ta: 73,
  te: 74,
  kn: 75,
  ml: 76,
  as: 77,
  mr: 78,
  sa: 79,
  mn: 80,
  bo: 81,
  cy: 82,
  km: 83,
  lo: 84,
  gl: 86,
  kok: 87,
  syr: 90,
  si: 91,
  iu: 93,
  am: 94,
  tzm: 95,
  ne: 97,
  fy: 98,
  ps: 99,
  fil: 100,
  dv: 101,
  ha: 104,
  yo: 106,
  quz: 107,
  nso: 108,
  ba: 109,
  lb: 110,
  kl: 111,
  ig: 112,
  ii: 120,
  arn: 122,
  moh: 124,
  br: 126,
  ug: 128,
  mi: 129,
  oc: 130,
  co: 131,
  gsw: 132,
  sah: 133,
  qut: 134,
  rw: 135,
  wo: 136,
  prs: 140,
  gd: 145,
  "ar-SA": 1025,
  "bg-BG": 1026,
  "ca-ES": 1027,
  "zh-TW": 1028,
  "cs-CZ": 1029,
  "da-DK": 1030,
  "de-DE": 1031,
  "el-GR": 1032,
  "en-US": 1033,
  "fi-FI": 1035,
  "fr-FR": 1036,
  "he-IL": 1037,
  "hu-HU": 1038,
  "is-IS": 1039,
  "it-IT": 1040,
  "ja-JP": 1041,
  "ko-KR": 1042,
  "nl-NL": 1043,
  "nb-NO": 1044,
  "pl-PL": 1045,
  "pt-BR": 1046,
  "rm-CH": 1047,
  "ro-RO": 1048,
  "ru-RU": 1049,
  "hr-HR": 1050,
  "sk-SK": 1051,
  "sq-AL": 1052,
  "sv-SE": 1053,
  "th-TH": 1054,
  "tr-TR": 1055,
  "ur-PK": 1056,
  "id-ID": 1057,
  "uk-UA": 1058,
  "be-BY": 1059,
  "sl-SI": 1060,
  "et-EE": 1061,
  "lv-LV": 1062,
  "lt-LT": 1063,
  "tg-Cyrl-TJ": 1064,
  "fa-IR": 1065,
  "vi-VN": 1066,
  "hy-AM": 1067,
  "az-Latn-AZ": 1068,
  "eu-ES": 1069,
  "hsb-DE": 1070,
  "mk-MK": 1071,
  "tn-ZA": 1074,
  "xh-ZA": 1076,
  "zu-ZA": 1077,
  "af-ZA": 1078,
  "ka-GE": 1079,
  "fo-FO": 1080,
  "hi-IN": 1081,
  "mt-MT": 1082,
  "se-NO": 1083,
  "ms-MY": 1086,
  "kk-KZ": 1087,
  "ky-KG": 1088,
  "sw-KE": 1089,
  "tk-TM": 1090,
  "uz-Latn-UZ": 1091,
  "tt-RU": 1092,
  "bn-IN": 1093,
  "pa-IN": 1094,
  "gu-IN": 1095,
  "or-IN": 1096,
  "ta-IN": 1097,
  "te-IN": 1098,
  "kn-IN": 1099,
  "ml-IN": 1100,
  "as-IN": 1101,
  "mr-IN": 1102,
  "sa-IN": 1103,
  "mn-MN": 1104,
  "bo-CN": 1105,
  "cy-GB": 1106,
  "km-KH": 1107,
  "lo-LA": 1108,
  "gl-ES": 1110,
  "kok-IN": 1111,
  "syr-SY": 1114,
  "si-LK": 1115,
  "iu-Cans-CA": 1117,
  "am-ET": 1118,
  "ne-NP": 1121,
  "fy-NL": 1122,
  "ps-AF": 1123,
  "fil-PH": 1124,
  "dv-MV": 1125,
  "ha-Latn-NG": 1128,
  "yo-NG": 1130,
  "quz-BO": 1131,
  "nso-ZA": 1132,
  "ba-RU": 1133,
  "lb-LU": 1134,
  "kl-GL": 1135,
  "ig-NG": 1136,
  "ii-CN": 1144,
  "arn-CL": 1146,
  "moh-CA": 1148,
  "br-FR": 1150,
  "ug-CN": 1152,
  "mi-NZ": 1153,
  "oc-FR": 1154,
  "co-FR": 1155,
  "gsw-FR": 1156,
  "sah-RU": 1157,
  "qut-GT": 1158,
  "rw-RW": 1159,
  "wo-SN": 1160,
  "prs-AF": 1164,
  "gd-GB": 1169,
  "ar-IQ": 2049,
  "zh-CN": 2052,
  "de-CH": 2055,
  "en-GB": 2057,
  "es-MX": 2058,
  "fr-BE": 2060,
  "it-CH": 2064,
  "nl-BE": 2067,
  "nn-NO": 2068,
  "pt-PT": 2070,
  "sr-Latn-CS": 2074,
  "sv-FI": 2077,
  "az-Cyrl-AZ": 2092,
  "dsb-DE": 2094,
  "se-SE": 2107,
  "ga-IE": 2108,
  "ms-BN": 2110,
  "uz-Cyrl-UZ": 2115,
  "bn-BD": 2117,
  "mn-Mong-CN": 2128,
  "iu-Latn-CA": 2141,
  "tzm-Latn-DZ": 2143,
  "quz-EC": 2155,
  "ar-EG": 3073,
  "zh-HK": 3076,
  "de-AT": 3079,
  "en-AU": 3081,
  "es-ES": 3082,
  "fr-CA": 3084,
  "sr-Cyrl-CS": 3098,
  "se-FI": 3131,
  "quz-PE": 3179,
  "ar-LY": 4097,
  "zh-SG": 4100,
  "de-LU": 4103,
  "en-CA": 4105,
  "es-GT": 4106,
  "fr-CH": 4108,
  "hr-BA": 4122,
  "smj-NO": 4155,
  "ar-DZ": 5121,
  "zh-MO": 5124,
  "de-LI": 5127,
  "en-NZ": 5129,
  "es-CR": 5130,
  "fr-LU": 5132,
  "bs-Latn-BA": 5146,
  "smj-SE": 5179,
  "ar-MA": 6145,
  "en-IE": 6153,
  "es-PA": 6154,
  "fr-MC": 6156,
  "sr-Latn-BA": 6170,
  "sma-NO": 6203,
  "ar-TN": 7169,
  "en-ZA": 7177,
  "es-DO": 7178,
  "sr-Cyrl-BA": 7194,
  "sma-SE": 7227,
  "ar-OM": 8193,
  "en-JM": 8201,
  "es-VE": 8202,
  "bs-Cyrl-BA": 8218,
  "sms-FI": 8251,
  "ar-YE": 9217,
  "en-029": 9225,
  "es-CO": 9226,
  "sr-Latn-RS": 9242,
  "smn-FI": 9275,
  "ar-SY": 10241,
  "en-BZ": 10249,
  "es-PE": 10250,
  "sr-Cyrl-RS": 10266,
  "ar-JO": 11265,
  "en-TT": 11273,
  "es-AR": 11274,
  "sr-Latn-ME": 11290,
  "ar-LB": 12289,
  "en-ZW": 12297,
  "es-EC": 12298,
  "sr-Cyrl-ME": 12314,
  "ar-KW": 13313,
  "en-PH": 13321,
  "es-CL": 13322,
  "ar-AE": 14337,
  "es-UY": 14346,
  "ar-BH": 15361,
  "es-PY": 15370,
  "ar-QA": 16385,
  "en-IN": 16393,
  "es-BO": 16394,
  "en-MY": 17417,
  "es-SV": 17418,
  "en-SG": 18441,
  "es-HN": 18442,
  "es-NI": 19466,
  "es-PR": 20490,
  "es-US": 21514,
  "bs-Cyrl": 25626,
  "bs-Latn": 26650,
  "sr-Cyrl": 27674,
  "sr-Latn": 28698,
  smn: 28731,
  "az-Cyrl": 29740,
  sms: 29755,
  zh: 30724,
  nn: 30740,
  bs: 30746,
  "az-Latn": 30764,
  sma: 30779,
  "uz-Cyrl": 30787,
  "mn-Cyrl": 30800,
  "iu-Cans": 30813,
  "zh-Hant": 31748,
  nb: 31764,
  sr: 31770,
  "tg-Cyrl": 31784,
  dsb: 31790,
  smj: 31803,
  "uz-Latn": 31811,
  "mn-Mong": 31824,
  "iu-Latn": 31837,
  "tzm-Latn": 31839,
  "ha-Latn": 31848
};
function getLanguageId() {
  return LANGUAGE_CODES[core_default.locale()];
}

// node_modules/devextreme/esm/exporter/exceljs/export_format.js
var DEFINED_NUMBER_FORMTATS = {
  thousands: "#,##0{0},&quot;K&quot;",
  millions: "#,##0{0},,&quot;M&quot;",
  billions: "#,##0{0},,,&quot;B&quot;",
  trillions: "#,##0{0},,,,&quot;T&quot;",
  percent: "0{0}%",
  decimal: "#{0}",
  fixedpoint: "#,##0{0}",
  exponential: "0{0}E+00",
  currency: " "
};
var PERIOD_REGEXP = /a+/g;
var DAY_REGEXP = /E/g;
var DO_REGEXP = /dE+/g;
var STANDALONE_MONTH_REGEXP = /L/g;
var HOUR_REGEXP = /h/g;
var ANY_REGEXP = /./g;
function _applyPrecision(format2, precision) {
  let result;
  let i;
  if (precision > 0) {
    result = "decimal" !== format2 ? "." : "";
    for (i = 0; i < precision; i++) {
      result += "0";
    }
    return result;
  }
  return "";
}
function _hasArabicDigits(text) {
  let code;
  for (let i = 0; i < text.length; i++) {
    code = text.charCodeAt(i);
    if (code >= 1632 && code < 1642) {
      return true;
    }
  }
  return false;
}
function _convertDateFormat(format2) {
  const formattedValue = (date_default.format(new Date(2009, 8, 8, 6, 5, 4), format2) || "").toString();
  let result = getFormat((value) => date_default.format(value, format2));
  if (result) {
    result = _convertDateFormatToOpenXml(result);
    result = _getLanguageInfo(formattedValue) + result;
  }
  return result;
}
function _getLanguageInfo(defaultPattern) {
  const languageID = getLanguageId();
  let languageIDStr = languageID ? languageID.toString(16) : "";
  let languageInfo = "";
  if (_hasArabicDigits(defaultPattern)) {
    while (languageIDStr.length < 3) {
      languageIDStr = "0" + languageIDStr;
    }
    languageInfo = "[$-2010" + languageIDStr + "]";
  } else if (languageIDStr) {
    languageInfo = "[$-" + languageIDStr + "]";
  }
  return languageInfo;
}
function _convertDateFormatToOpenXml(format2) {
  return format2.split("/").join("\\/").split("'").map(function(datePart, index) {
    if (index % 2 === 0) {
      return datePart.replace(PERIOD_REGEXP, "AM/PM").replace(DO_REGEXP, "d").replace(DAY_REGEXP, "d").replace(STANDALONE_MONTH_REGEXP, "M").replace(HOUR_REGEXP, "H").split("[").join("\\[").split("]").join("\\]");
    }
    if (datePart) {
      return datePart.replace(ANY_REGEXP, "\\$&");
    }
    return "'";
  }).join("");
}
function _convertNumberFormat(format2, precision, currency) {
  let result;
  let excelFormat;
  if ("currency" === format2) {
    excelFormat = number_default.getOpenXmlCurrencyFormat(currency);
  } else {
    excelFormat = DEFINED_NUMBER_FORMTATS[format2.toLowerCase()];
  }
  if (excelFormat) {
    result = format(excelFormat, _applyPrecision(format2, precision));
  }
  return result;
}
function _hasCSVInjection(value) {
  if (!value || value.length < 2) {
    return false;
  }
  return _includesCSVExpression(value);
}
function _hasCSVQuotedInjection(value, textQualifier) {
  if (!value || value.length < 4 || value[0] !== textQualifier) {
    return false;
  }
  return _includesCSVExpression(value.substring(1, value.length - 1));
}
function _includesCSVExpression(value) {
  if (!value) {
    return false;
  }
  if (/^[@=\t\r]/.test(value)) {
    return true;
  }
  if (!/^[+-]/.test(value)) {
    return false;
  }
  return !isNumeric(value);
}
var ExportFormat = {
  formatObjectConverter(format2, dataType) {
    const result = {
      format: format2,
      precision: format2 && format2.precision,
      dataType
    };
    if (isObject(format2)) {
      return extend(result, format2, {
        format: format2.formatter || format2.type,
        currency: format2.currency
      });
    }
    return result;
  },
  convertFormat(format2, precision, type, currency) {
    if (isDefined(format2)) {
      if ("date" === type) {
        return _convertDateFormat(format2);
      } else if (isString(format2) && DEFINED_NUMBER_FORMTATS[format2.toLowerCase()]) {
        return _convertNumberFormat(format2, precision, currency);
      }
    }
  },
  encode(value) {
    let escaped = false;
    if (_hasCSVInjection(value)) {
      escaped = true;
    } else if (_hasCSVQuotedInjection(value, '"')) {
      value = value.substring(1, value.length - 1);
      escaped = true;
    }
    if (escaped) {
      const singleTextQualifier = '"';
      const escapedTextQualifier = '""';
      return `"'` + value.replaceAll(singleTextQualifier, escapedTextQualifier) + '"';
    }
    return value;
  }
};

// node_modules/devextreme/esm/exporter/exceljs/export.js
var Export = {
  getFullOptions(options) {
    const fullOptions = extend({}, options);
    if (!(isDefined(fullOptions.worksheet) && isObject(fullOptions.worksheet))) {
      throw Error('The "worksheet" field must contain an object.');
    }
    if (!isDefined(fullOptions.topLeftCell)) {
      fullOptions.topLeftCell = {
        row: 1,
        column: 1
      };
    } else if (isString(fullOptions.topLeftCell)) {
      const {
        row,
        col
      } = fullOptions.worksheet.getCell(fullOptions.topLeftCell);
      fullOptions.topLeftCell = {
        row,
        column: col
      };
    }
    if (!isDefined(fullOptions.keepColumnWidths)) {
      fullOptions.keepColumnWidths = true;
    }
    if (!isDefined(fullOptions.loadPanel)) {
      fullOptions.loadPanel = {};
    }
    if (!isDefined(fullOptions.loadPanel.enabled)) {
      fullOptions.loadPanel.enabled = true;
    }
    if (!isDefined(fullOptions.encodeExecutableContent)) {
      fullOptions.encodeExecutableContent = false;
    }
    return fullOptions;
  },
  convertDateForExcelJS: (date) => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
  setNumberFormat(excelCell, numberFormat) {
    excelCell.numFmt = numberFormat;
  },
  getCellStyles(dataProvider) {
    const styles = dataProvider.getStyles();
    styles.forEach((style) => {
      let numberFormat = this.tryConvertToExcelNumberFormat(style.format, style.dataType);
      if (isDefined(numberFormat)) {
        numberFormat = numberFormat.replace(/&quot;/g, '"');
      }
      style.numberFormat = numberFormat;
    });
    return styles;
  },
  tryConvertToExcelNumberFormat(format2, dataType) {
    const newFormat = ExportFormat.formatObjectConverter(format2, dataType);
    const currency = newFormat.currency;
    format2 = newFormat.format;
    dataType = newFormat.dataType;
    return ExportFormat.convertFormat(format2, newFormat.precision, dataType, currency);
  },
  setAlignment(excelCell, wrapText, horizontalAlignment) {
    excelCell.alignment = excelCell.alignment ?? {};
    if (isDefined(wrapText)) {
      excelCell.alignment.wrapText = wrapText;
    }
    if (isDefined(horizontalAlignment)) {
      excelCell.alignment.horizontal = horizontalAlignment;
    }
    excelCell.alignment.vertical = "top";
  },
  setColumnsWidth(worksheet, widths, startColumnIndex) {
    if (!isDefined(widths)) {
      return;
    }
    for (let i = 0; i < widths.length; i++) {
      const columnWidth = widths[i];
      if ("number" === typeof columnWidth && isFinite(columnWidth)) {
        worksheet.getColumn(startColumnIndex + i).width = Math.min(255, Math.floor(columnWidth / 7 * 100) / 100);
      }
    }
  },
  export(options, Helpers, getLoadPanelTargetElement, getLoadPanelContainer) {
    var _component$_getIntern;
    const {
      component,
      worksheet,
      topLeftCell,
      keepColumnWidths,
      selectedRowsOnly,
      loadPanel,
      encodeExecutableContent
    } = options;
    const dataProvider = component.getDataProvider(selectedRowsOnly);
    const internalComponent = (null === (_component$_getIntern = component._getInternalInstance) || void 0 === _component$_getIntern ? void 0 : _component$_getIntern.call(component)) || component;
    const initialLoadPanelEnabledOption = internalComponent.option("loadPanel") && internalComponent.option("loadPanel").enabled;
    if (initialLoadPanelEnabledOption) {
      component.option("loadPanel.enabled", false);
    }
    let exportLoadPanel;
    if (loadPanel.enabled && hasWindow()) {
      const $targetElement = getLoadPanelTargetElement(component);
      const $container = getLoadPanelContainer(component);
      exportLoadPanel = new ExportLoadPanel(component, $targetElement, $container, loadPanel);
      exportLoadPanel.show();
    }
    const wrapText = !!component.option("wordWrapEnabled");
    worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false
    };
    const cellRange = {
      from: {
        row: topLeftCell.row,
        column: topLeftCell.column
      },
      to: {
        row: topLeftCell.row,
        column: topLeftCell.column
      }
    };
    return new Promise((resolve) => {
      dataProvider.ready().done(() => {
        const columns = dataProvider.getColumns();
        const dataRowsCount = dataProvider.getRowsCount();
        const helpers = new Helpers(component, dataProvider, worksheet, options);
        if (keepColumnWidths) {
          this.setColumnsWidth(worksheet, dataProvider.getColumnsWidths(), cellRange.from.column);
        }
        helpers._exportAllFieldHeaders(columns, this.setAlignment);
        const fieldHeaderRowsCount = helpers._getFieldHeaderRowsCount();
        cellRange.to.row = cellRange.from.row + fieldHeaderRowsCount;
        const styles = this.getCellStyles(dataProvider);
        for (let rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
          const currentRowIndex = cellRange.from.row + fieldHeaderRowsCount + rowIndex;
          const row = worksheet.getRow(currentRowIndex);
          let startColumnIndex = 0;
          if (helpers._isRowFieldHeadersRow(rowIndex)) {
            startColumnIndex = dataProvider.getRowAreaColCount();
            helpers._exportFieldHeaders("row", currentRowIndex, 0, startColumnIndex, this.setAlignment);
          }
          helpers._trySetOutlineLevel(row, rowIndex);
          this.exportRow(dataProvider, helpers, row, rowIndex, startColumnIndex, columns.length, wrapText, styles, encodeExecutableContent);
          cellRange.to.row = currentRowIndex;
        }
        helpers.mergedRangesManager.applyMergedRages();
        cellRange.to.column += columns.length > 0 ? columns.length - 1 : 0;
        const worksheetViewSettings = worksheet.views[0] || {};
        if (component.option("rtlEnabled")) {
          worksheetViewSettings.rightToLeft = true;
        }
        if (helpers._isFrozenZone(dataProvider)) {
          if (-1 === Object.keys(worksheetViewSettings).indexOf("state")) {
            extend(worksheetViewSettings, helpers._getWorksheetFrozenState(cellRange));
          }
          helpers._trySetAutoFilter(cellRange);
        }
        if (Object.keys(worksheetViewSettings).length > 0) {
          worksheet.views = [worksheetViewSettings];
        }
        resolve(cellRange);
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
  exportRow(dataProvider, helpers, row, rowIndex, startColumnIndex, columnsCount, wrapText, styles, encodeExecutableContent) {
    for (let cellIndex = startColumnIndex; cellIndex < columnsCount; cellIndex++) {
      const cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
      const excelCell = row.getCell(helpers._getFirstColumnIndex() + cellIndex);
      helpers.mergedRangesManager.updateMergedRanges(excelCell, rowIndex, cellIndex, helpers);
      const cellInfo = helpers.mergedRangesManager.findMergedCellInfo(rowIndex, cellIndex, helpers._isHeaderCell(rowIndex, cellIndex));
      if (isDefined(cellInfo) && excelCell !== cellInfo.masterCell) {
        excelCell.style = cellInfo.masterCell.style;
        excelCell.value = cellInfo.masterCell.value;
      } else {
        if (isDate(cellData.value)) {
          excelCell.value = this.convertDateForExcelJS(cellData.value);
        } else {
          excelCell.value = cellData.value;
        }
        if (isDefined(excelCell.value)) {
          const {
            bold,
            alignment: horizontalAlignment,
            numberFormat
          } = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
          if (isDefined(numberFormat)) {
            this.setNumberFormat(excelCell, numberFormat);
          } else if (isString(excelCell.value) && /^[@=+-]/.test(excelCell.value)) {
            this.setNumberFormat(excelCell, "@");
          }
          helpers._trySetFont(excelCell, bold);
          this.setAlignment(excelCell, wrapText, horizontalAlignment);
        }
      }
      helpers._customizeCell(excelCell, cellData.cellSourceData);
      if (encodeExecutableContent) {
        excelCell.value = ExportFormat.encode(excelCell.value);
      }
    }
  }
};

// node_modules/devextreme/esm/exporter/exceljs/export_merged_ranges_manager.js
var MergedRangesManager = class {
  constructor(dataProvider, worksheet) {
    this.dataProvider = dataProvider;
    this.worksheet = worksheet;
    this.mergedCells = [];
    this.mergedRanges = [];
  }
  updateMergedRanges(excelCell, rowIndex, cellIndex, helpers) {
    if (helpers._isHeaderCell(rowIndex, cellIndex) && !this.isCellInMergedRanges(rowIndex, cellIndex)) {
      const {
        rowspan,
        colspan
      } = this.dataProvider.getCellMerging(rowIndex, cellIndex);
      const isMasterCellOfMergedRange = colspan || rowspan;
      if (isMasterCellOfMergedRange) {
        const allowToMergeRange = helpers._allowToMergeRange(rowIndex, cellIndex, rowspan, colspan);
        this.updateMergedCells(excelCell, rowIndex, cellIndex, rowspan, colspan);
        if (allowToMergeRange) {
          const shouldReduceInfoRange = helpers._isInfoCell(rowIndex, cellIndex) && helpers._allowExportRowFieldHeaders();
          this.mergedRanges.push({
            masterCell: excelCell,
            rowspan: rowspan - (shouldReduceInfoRange && rowspan > 0),
            colspan
          });
        }
      }
    }
  }
  isCellInMergedRanges(rowIndex, cellIndex) {
    return this.mergedCells[rowIndex] && this.mergedCells[rowIndex][cellIndex];
  }
  findMergedCellInfo(rowIndex, cellIndex, isHeaderCell) {
    if (isHeaderCell && this.isCellInMergedRanges(rowIndex, cellIndex)) {
      return this.mergedCells[rowIndex][cellIndex];
    }
  }
  updateMergedCells(excelCell, rowIndex, cellIndex, rowspan, colspan) {
    for (let i = rowIndex; i <= rowIndex + rowspan; i++) {
      for (let j = cellIndex; j <= cellIndex + colspan; j++) {
        if (!this.mergedCells[i]) {
          this.mergedCells[i] = [];
        }
        this.mergedCells[i][j] = {
          masterCell: excelCell
        };
      }
    }
  }
  addMergedRange(masterCell, rowspan, colspan) {
    this.mergedRanges.push({
      masterCell,
      rowspan,
      colspan
    });
  }
  applyMergedRages() {
    this.mergedRanges.forEach((range) => {
      const startRowIndex = range.masterCell.fullAddress.row;
      const startColumnIndex = range.masterCell.fullAddress.col;
      const endRowIndex = startRowIndex + range.rowspan;
      const endColumnIndex = startColumnIndex + range.colspan;
      this.worksheet.mergeCells(startRowIndex, startColumnIndex, endRowIndex, endColumnIndex);
    });
  }
};

// node_modules/devextreme/esm/exporter/exceljs/export_data_grid.js
var DataGridHelpers = class {
  constructor(component, dataProvider, worksheet, options) {
    this.component = component;
    this.dataProvider = dataProvider;
    this.worksheet = worksheet;
    this.mergedRangesManager = new MergedRangesManager(dataProvider, worksheet);
    this.topLeftCell = options.topLeftCell;
    this.customizeCell = options.customizeCell;
    this.autoFilterEnabled = options.autoFilterEnabled;
  }
  _getFirstColumnIndex() {
    return this.topLeftCell.column;
  }
  _getFieldHeaderRowsCount() {
    return 0;
  }
  _trySetAutoFilter(cellRange) {
    if (this.autoFilterEnabled) {
      if (!isDefined(this.worksheet.autoFilter) && this.dataProvider.getRowsCount() > 0) {
        const dataRange = {
          from: {
            row: cellRange.from.row + this.dataProvider.getHeaderRowCount() - 1,
            column: cellRange.from.column
          },
          to: cellRange.to
        };
        this.worksheet.autoFilter = dataRange;
      }
    }
  }
  _trySetFont(excelCell, bold) {
    if (isDefined(bold)) {
      excelCell.font = excelCell.font || {};
      excelCell.font.bold = bold;
    }
  }
  _getWorksheetFrozenState(cellRange) {
    return {
      state: "frozen",
      ySplit: cellRange.from.row + this.dataProvider.getFrozenArea().y - 1
    };
  }
  _trySetOutlineLevel(row, rowIndex) {
    if (rowIndex >= this.dataProvider.getHeaderRowCount()) {
      row.outlineLevel = this.dataProvider.getGroupLevel(rowIndex);
    }
  }
  _isFrozenZone(dataProvider) {
    return dataProvider.getHeaderRowCount() > 0;
  }
  _isHeaderCell(rowIndex) {
    return rowIndex < this.dataProvider.getHeaderRowCount();
  }
  _isInfoCell() {
    return false;
  }
  _allowToMergeRange() {
    return true;
  }
  _getAllFieldHeaders() {
    return [];
  }
  _customizeCell(excelCell, gridCell) {
    if (isFunction(this.customizeCell)) {
      this.customizeCell({
        excelCell,
        gridCell
      });
    }
  }
  _exportFieldHeaders() {
  }
  _exportAllFieldHeaders() {
  }
  _isRowFieldHeadersRow() {
  }
};
function exportDataGrid(options) {
  return Export.export(_getFullOptions(options), DataGridHelpers, _getLoadPanelTargetElement, _getLoadPanelContainer);
}
function _getFullOptions(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && "dxDataGrid" === options.component.NAME)) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!isDefined(options.selectedRowsOnly)) {
    options.selectedRowsOnly = false;
  }
  if (!isDefined(options.autoFilterEnabled)) {
    options.autoFilterEnabled = false;
  }
  return Export.getFullOptions(options);
}
function _getLoadPanelTargetElement(component) {
  return component.getView("rowsView").element();
}
function _getLoadPanelContainer(component) {
  return component.getView("rowsView").element().parent();
}

// node_modules/devextreme/esm/exporter/exceljs/export_pivot_grid.js
var PivotGridHelpers = class {
  constructor(component, dataProvider, worksheet, options) {
    this.component = component;
    this.dataProvider = dataProvider;
    this.worksheet = worksheet;
    this.mergedRangesManager = new MergedRangesManager(dataProvider, worksheet);
    this.topLeftCell = options.topLeftCell;
    this.customizeCell = options.customizeCell;
    this.mergeColumnFieldValues = options.mergeColumnFieldValues;
    this.mergeRowFieldValues = options.mergeRowFieldValues;
    this.exportFilterFieldHeaders = options.exportFilterFieldHeaders;
    this.exportDataFieldHeaders = options.exportDataFieldHeaders;
    this.exportColumnFieldHeaders = options.exportColumnFieldHeaders;
    this.exportRowFieldHeaders = options.exportRowFieldHeaders;
    this.rtlEnabled = component.option("rtlEnabled");
    this.rowHeaderLayout = component.option("rowHeaderLayout");
    this.wrapText = !!component.option("wordWrapEnabled");
    this.filterFieldHeaders = this._tryGetFieldHeaders("filter");
    this.dataFieldHeaders = this._tryGetFieldHeaders("data");
    this.columnFieldHeaders = this._tryGetFieldHeaders("column");
    this.rowFieldHeaders = this._tryGetFieldHeaders("row");
  }
  _getFirstColumnIndex() {
    return this.topLeftCell.column;
  }
  _getWorksheetFrozenState(cellRange) {
    const {
      x,
      y
    } = this.dataProvider.getFrozenArea();
    return {
      state: "frozen",
      xSplit: cellRange.from.column + x - 1,
      ySplit: cellRange.from.row + y + this._getFieldHeaderRowsCount() - 1
    };
  }
  _getFieldHeaderRowsCount() {
    return 0 + this._allowExportFilterFieldHeaders() + (this._allowExportDataFieldHeaders() || this._allowExportColumnFieldHeaders());
  }
  _isFrozenZone() {
    return true;
  }
  _isHeaderCell(rowIndex, cellIndex) {
    return rowIndex < this.dataProvider.getColumnAreaRowCount() || cellIndex < this.dataProvider.getRowAreaColCount();
  }
  _getDefaultFieldHeaderCellsData(value) {
    return {
      text: value,
      value
    };
  }
  _isInfoCell(rowIndex, cellIndex) {
    return rowIndex < this.dataProvider.getColumnAreaRowCount() && cellIndex < this.dataProvider.getRowAreaColCount();
  }
  _allowToMergeRange(rowIndex, cellIndex, rowspan, colspan) {
    return !(this.dataProvider.isColumnAreaCell(rowIndex, cellIndex) && !this.mergeColumnFieldValues && !!colspan || this.dataProvider.isRowAreaCell(rowIndex, cellIndex) && !this.mergeRowFieldValues && !!rowspan);
  }
  _trySetAutoFilter() {
  }
  _trySetFont(excelCell, bold) {
    if (isDefined(bold)) {
      excelCell.font = excelCell.font || {};
      excelCell.font.bold = bold;
    }
  }
  _getFieldHeaderStyles() {
    const borderStyle = {
      style: "thin",
      color: {
        argb: "FF7E7E7E"
      }
    };
    return {
      alignment: getDefaultAlignment(this.rtlEnabled),
      bold: true,
      border: {
        bottom: borderStyle,
        left: borderStyle,
        right: borderStyle,
        top: borderStyle
      }
    };
  }
  _trySetOutlineLevel() {
  }
  _getAllFieldHeaders() {
    return this.dataProvider._exportController.getDataSource()._descriptions;
  }
  _tryGetFieldHeaders(area) {
    if (!this[`export${camelize(area, true)}FieldHeaders`]) {
      return [];
    }
    const fields = this._getAllFieldHeaders()["data" === area ? "values" : `${area}s`].filter((fieldHeader) => fieldHeader.area === area);
    if ("right" === getDefaultAlignment(this.rtlEnabled)) {
      fields.sort((a, b) => b.areaIndex - a.areaIndex);
    }
    return fields.map((field) => field.caption);
  }
  _customizeCell(excelCell, pivotCell, shouldPreventCall) {
    if (isFunction(this.customizeCell) && !shouldPreventCall) {
      this.customizeCell({
        excelCell,
        pivotCell
      });
    }
  }
  _isRowFieldHeadersRow(rowIndex) {
    const isLastInfoRangeCell = this._isInfoCell(rowIndex, 0) && "row" === this.dataProvider.getCellData(rowIndex + 1, 0, true).cellSourceData.area;
    return this._allowExportRowFieldHeaders() && isLastInfoRangeCell;
  }
  _exportAllFieldHeaders(columns, setAlignment) {
    const totalCellsCount = columns.length;
    const rowAreaColCount = this.dataProvider.getRowAreaColCount();
    let rowIndex = this.topLeftCell.row;
    if (this._allowExportFilterFieldHeaders()) {
      this._exportFieldHeaders("filter", rowIndex, 0, totalCellsCount, setAlignment);
      rowIndex++;
    }
    if (this._allowExportDataFieldHeaders()) {
      this._exportFieldHeaders("data", rowIndex, 0, rowAreaColCount, setAlignment);
      if (!this._allowExportColumnFieldHeaders()) {
        this._exportFieldHeaders("column", rowIndex, rowAreaColCount, totalCellsCount - rowAreaColCount, setAlignment);
      }
    }
    if (this._allowExportColumnFieldHeaders()) {
      if (!this._allowExportDataFieldHeaders()) {
        this._exportFieldHeaders("data", rowIndex, 0, rowAreaColCount, setAlignment);
      }
      this._exportFieldHeaders("column", rowIndex, rowAreaColCount, totalCellsCount - rowAreaColCount, setAlignment);
    }
  }
  _exportFieldHeaders(area, rowIndex, startColumnIndex, totalColumnsCount, setAlignment) {
    const fieldHeaders = this[`${area}FieldHeaders`];
    const row = this.worksheet.getRow(rowIndex);
    const shouldMergeHeaderField = "row" !== area || "row" === area && "tree" === this.rowHeaderLayout;
    if (shouldMergeHeaderField) {
      this.mergedRangesManager.addMergedRange(row.getCell(this.topLeftCell.column + startColumnIndex), 0, totalColumnsCount - 1);
    }
    for (let cellIndex = 0; cellIndex < totalColumnsCount; cellIndex++) {
      const excelCell = row.getCell(this.topLeftCell.column + startColumnIndex + cellIndex);
      const values = fieldHeaders;
      let cellData = [];
      const value = values.length > totalColumnsCount || shouldMergeHeaderField ? values.join(", ") : values[cellIndex];
      cellData = _extends({}, this._getDefaultFieldHeaderCellsData(value), {
        headerType: area
      });
      excelCell.value = value;
      this._applyHeaderStyles(excelCell, setAlignment);
      this._customizeCell(excelCell, cellData);
    }
  }
  _applyHeaderStyles(excelCell, setAlignment) {
    const {
      bold,
      alignment,
      border
    } = this._getFieldHeaderStyles();
    this._trySetFont(excelCell, bold);
    setAlignment(excelCell, this.wrapText, alignment);
    excelCell.border = border;
  }
  _allowExportRowFieldHeaders() {
    return this.rowFieldHeaders.length > 0;
  }
  _allowExportFilterFieldHeaders() {
    return this.filterFieldHeaders.length > 0;
  }
  _allowExportDataFieldHeaders() {
    return this.dataFieldHeaders.length > 0;
  }
  _allowExportColumnFieldHeaders() {
    return this.columnFieldHeaders.length > 0;
  }
};
function exportPivotGrid(options) {
  return Export.export(_getFullOptions2(options), PivotGridHelpers, _getLoadPanelTargetElement2, _getLoadPanelContainer2);
}
function _getFullOptions2(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportPivotGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && "dxPivotGrid" === options.component.NAME)) {
    throw Error('The "component" field must contain a PivotGrid instance.');
  }
  if (!isDefined(options.mergeRowFieldValues)) {
    options.mergeRowFieldValues = true;
  }
  if (!isDefined(options.mergeColumnFieldValues)) {
    options.mergeColumnFieldValues = true;
  }
  if (!isDefined(options.exportDataFieldHeaders)) {
    options.exportDataFieldHeaders = false;
  }
  if (!isDefined(options.exportRowFieldHeaders)) {
    options.exportRowFieldHeaders = false;
  }
  if (!isDefined(options.exportColumnFieldHeaders)) {
    options.exportColumnFieldHeaders = false;
  }
  if (!isDefined(options.exportFilterFieldHeaders)) {
    options.exportFilterFieldHeaders = false;
  }
  return Export.getFullOptions(options);
}
function _getLoadPanelTargetElement2(component) {
  return component._dataArea.groupElement();
}
function _getLoadPanelContainer2(component) {
  return component.$element();
}

export {
  getLanguageId,
  exportDataGrid,
  exportPivotGrid
};
//# sourceMappingURL=chunk-GZT6E6YY.js.map
