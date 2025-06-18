import {
  Deferred,
  _extends,
  addShadowDomStyles,
  ajax_default,
  beforeCleanData,
  call_once_default,
  callbacks_default,
  camelize,
  class_default,
  cleanDataRecursive,
  compileGetter,
  compileSetter,
  config_default,
  config_default2,
  data,
  deepExtendArraySafe,
  deferRender,
  dependency_injector_default,
  dom_adapter_default,
  each,
  ensureDefined,
  equalByValue,
  error_default,
  errors_default,
  escapeRegExp,
  event_registrator_callbacks_default,
  extend,
  findBestMatches,
  format,
  fromPromise,
  fullVersion,
  getCurrentTemplateEngine,
  getEventTarget,
  getHeight,
  getInnerWidth,
  getNavigator,
  getOuterHeight,
  getOuterWidth,
  getPathParts,
  getWidth,
  getWindow,
  grep,
  guid_default2 as guid_default,
  hasProperty,
  hasWindow,
  humanize,
  isBoolean,
  isDate,
  isDefined,
  isEmptyObject,
  isEvent,
  isExponential,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPromise,
  isRenderer,
  isString,
  isWindow,
  logger,
  m_callbacks_default,
  m_common_default,
  m_dom_adapter_default,
  m_events_engine_default,
  m_ready_callbacks_default,
  m_type_default,
  m_window_default,
  map,
  memorized_callbacks_default,
  noop,
  orderEach,
  pairToObject,
  parseHTML,
  ready_callbacks_default,
  registerTemplateEngine,
  removeData,
  renderer_default,
  setStyle,
  setTemplateEngine,
  setWidth,
  splitPair,
  styleProp,
  stylePropPrefix,
  toComparable,
  type,
  uiLayerInitialized,
  variable_wrapper_default,
  when
} from "./chunk-SFROUENP.js";
import {
  __async
} from "./chunk-NJ4VOZBH.js";

// node_modules/devextreme/esm/common/core/environment/hide_callback.js
var hideCallback = /* @__PURE__ */ function() {
  let callbacks = [];
  return {
    add: function(callback) {
      if (!callbacks.includes(callback)) {
        callbacks.push(callback);
      }
    },
    remove: function(callback) {
      const indexOfCallback = callbacks.indexOf(callback);
      if (-1 !== indexOfCallback) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire: function() {
      const callback = callbacks.pop();
      const result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback: function() {
      return callbacks.length > 0;
    }
  };
}();

// node_modules/devextreme/esm/common/core/environment/hide_top_overlay.js
function hide_top_overlay_default() {
  return hideCallback.fire();
}

// node_modules/devextreme/esm/__internal/core/utils/m_resize_callbacks.js
var resizeCallbacks = function() {
  let prevSize;
  const callbacks = m_callbacks_default();
  const originalCallbacksAdd = callbacks.add;
  const originalCallbacksRemove = callbacks.remove;
  if (!m_window_default.hasWindow()) {
    return callbacks;
  }
  const formatSize = function() {
    const window11 = m_window_default.getWindow();
    return {
      width: window11.innerWidth,
      height: window11.innerHeight
    };
  };
  const handleResize = function() {
    const now = formatSize();
    if (now.width === prevSize.width && now.height === prevSize.height) {
      return;
    }
    let changedDimension;
    if (now.width === prevSize.width) {
      changedDimension = "height";
    }
    if (now.height === prevSize.height) {
      changedDimension = "width";
    }
    prevSize = now;
    callbacks.fire(changedDimension);
  };
  const setPrevSize = call_once_default(function() {
    prevSize = formatSize();
  });
  let removeListener;
  callbacks.add = function() {
    const result = originalCallbacksAdd.apply(callbacks, arguments);
    setPrevSize();
    m_ready_callbacks_default.add(function() {
      if (!removeListener && callbacks.has()) {
        removeListener = dom_adapter_default.listen(m_window_default.getWindow(), "resize", handleResize);
      }
    });
    return result;
  };
  callbacks.remove = function() {
    const result = originalCallbacksRemove.apply(callbacks, arguments);
    if (!callbacks.has() && removeListener) {
      removeListener();
      removeListener = void 0;
    }
    return result;
  };
  return callbacks;
}();

// node_modules/devextreme/esm/core/utils/resize_callbacks.js
var resize_callbacks_default = resizeCallbacks;

// node_modules/devextreme/esm/__internal/core/m_events_strategy.js
var EventsStrategy = class _EventsStrategy {
  constructor(owner) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    this._events = {};
    this._owner = owner;
    this._options = options;
  }
  static create(owner, strategy2) {
    if (strategy2) {
      return isFunction(strategy2) ? strategy2(owner) : strategy2;
    }
    return new _EventsStrategy(owner);
  }
  hasEvent(eventName) {
    const callbacks = this._events[eventName];
    return callbacks ? callbacks.has() : false;
  }
  fireEvent(eventName, eventArgs) {
    const callbacks = this._events[eventName];
    if (callbacks) {
      callbacks.fireWith(this._owner, eventArgs);
    }
    return this._owner;
  }
  on(eventName, eventHandler) {
    if (isPlainObject(eventName)) {
      each(eventName, (e, h) => {
        this.on(e, h);
      });
    } else {
      let callbacks = this._events[eventName];
      if (!callbacks) {
        callbacks = callbacks_default({
          syncStrategy: this._options.syncStrategy
        });
        this._events[eventName] = callbacks;
      }
      const addFn = callbacks.originalAdd || callbacks.add;
      addFn.call(callbacks, eventHandler);
    }
  }
  off(eventName, eventHandler) {
    const callbacks = this._events[eventName];
    if (callbacks) {
      if (isFunction(eventHandler)) {
        callbacks.remove(eventHandler);
      } else {
        callbacks.empty();
      }
    }
  }
  dispose() {
    each(this._events, (eventName, event) => {
      event.empty();
    });
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_storage.js
var window = getWindow();
var getSessionStorage = function() {
  let sessionStorage;
  try {
    sessionStorage = window.sessionStorage;
  } catch (e) {
  }
  return sessionStorage;
};

// node_modules/devextreme/esm/__internal/core/utils/m_view_port.js
var ready = ready_callbacks_default.add;
var changeCallback = callbacks_default();
var $originalViewPort = renderer_default();
var value = /* @__PURE__ */ function() {
  let $current;
  return function(element) {
    if (!arguments.length) {
      return $current;
    }
    const $element = renderer_default(element);
    $originalViewPort = $element;
    const isNewViewportFound = !!$element.length;
    const prevViewPort = value();
    $current = isNewViewportFound ? $element : renderer_default("body");
    changeCallback.fire(isNewViewportFound ? value() : renderer_default(), prevViewPort);
  };
}();
ready(function() {
  value(".dx-viewport");
});
function originalViewPort() {
  return $originalViewPort;
}

// node_modules/devextreme/esm/__internal/core/m_devices.js
var window2 = getWindow();
var KNOWN_UA_TABLE = {
  iPhone: "iPhone",
  iPhone5: "iPhone",
  iPhone6: "iPhone",
  iPhone6plus: "iPhone",
  iPad: "iPad",
  iPadMini: "iPad Mini",
  androidPhone: "Android Mobile",
  androidTablet: "Android",
  msSurface: "Windows ARM Tablet PC",
  desktop: "desktop"
};
var DEFAULT_DEVICE = {
  deviceType: "desktop",
  platform: "generic",
  version: [],
  phone: false,
  tablet: false,
  android: false,
  ios: false,
  generic: true,
  grade: "A",
  mac: false
};
var UA_PARSERS = {
  generic(userAgent) {
    const isPhone = /windows phone/i.test(userAgent) || userAgent.match(/WPDesktop/);
    const isTablet = !isPhone && /Windows(.*)arm(.*)Tablet PC/i.test(userAgent);
    const isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
    const isMac = /((intel|ppc) mac os x)/.test(userAgent.toLowerCase());
    if (!(isPhone || isTablet || isDesktop || isMac)) {
      return null;
    }
    return {
      deviceType: isPhone ? "phone" : isTablet ? "tablet" : "desktop",
      platform: "generic",
      version: [],
      grade: "A",
      mac: isMac
    };
  },
  appleTouchDevice(userAgent) {
    const navigator3 = getNavigator();
    const isIpadOs = /Macintosh/i.test(userAgent) && (null === navigator3 || void 0 === navigator3 ? void 0 : navigator3.maxTouchPoints) > 2;
    const isAppleDevice = /ip(hone|od|ad)/i.test(userAgent);
    if (!isAppleDevice && !isIpadOs) {
      return null;
    }
    const isPhone = /ip(hone|od)/i.test(userAgent);
    const matches = userAgent.match(/os\s{0,}X? (\d+)_(\d+)_?(\d+)?/i);
    const version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
    const isIPhone4 = 480 === window2.screen.height;
    const grade = isIPhone4 ? "B" : "A";
    return {
      deviceType: isPhone ? "phone" : "tablet",
      platform: "ios",
      version,
      grade
    };
  },
  android(userAgent) {
    const isAndroid = /android|htc_|silk/i.test(userAgent);
    const isWinPhone = /windows phone/i.test(userAgent);
    if (!isAndroid || isWinPhone) {
      return null;
    }
    const isPhone = /mobile/i.test(userAgent);
    const matches = userAgent.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
    const version = matches ? [parseInt(matches[1], 10), parseInt(matches[2] || 0, 10), parseInt(matches[3] || 0, 10)] : [];
    const worseThan4_4 = version.length > 1 && (version[0] < 4 || 4 === version[0] && version[1] < 4);
    const grade = worseThan4_4 ? "B" : "A";
    return {
      deviceType: isPhone ? "phone" : "tablet",
      platform: "android",
      version,
      grade
    };
  }
};
var UA_PARSERS_ARRAY = [UA_PARSERS.appleTouchDevice, UA_PARSERS.android, UA_PARSERS.generic];
var Devices = class {
  constructor(options) {
    this._window = (null === options || void 0 === options ? void 0 : options.window) ?? window2;
    this._realDevice = this._getDevice();
    this._currentDevice = void 0;
    this._currentOrientation = void 0;
    this._eventsStrategy = new EventsStrategy(this);
    this.changed = callbacks_default();
    if (hasWindow()) {
      ready_callbacks_default.add(this._recalculateOrientation.bind(this));
      resize_callbacks_default.add(this._recalculateOrientation.bind(this));
    }
  }
  current(deviceOrName) {
    if (deviceOrName) {
      this._currentDevice = this._getDevice(deviceOrName);
      this._forced = true;
      this.changed.fire();
      return;
    }
    if (!this._currentDevice) {
      deviceOrName = void 0;
      try {
        deviceOrName = this._getDeviceOrNameFromWindowScope();
      } catch (e) {
        deviceOrName = this._getDeviceNameFromSessionStorage();
      } finally {
        if (!deviceOrName) {
          deviceOrName = this._getDeviceNameFromSessionStorage();
        }
        if (deviceOrName) {
          this._forced = true;
        }
      }
      this._currentDevice = this._getDevice(deviceOrName);
    }
    return this._currentDevice;
  }
  real(forceDevice) {
    return extend({}, this._realDevice);
  }
  orientation() {
    return this._currentOrientation;
  }
  isForced() {
    return this._forced;
  }
  isRippleEmulator() {
    return !!this._window.tinyHippos;
  }
  _getCssClasses(device) {
    const result = [];
    const realDevice = this._realDevice;
    device = device || this.current();
    if (device.deviceType) {
      result.push(`dx-device-${device.deviceType}`);
      if ("desktop" !== device.deviceType) {
        result.push("dx-device-mobile");
      }
    }
    result.push(`dx-device-${realDevice.platform}`);
    if (realDevice.version && realDevice.version.length) {
      result.push(`dx-device-${realDevice.platform}-${realDevice.version[0]}`);
    }
    if (this.isSimulator()) {
      result.push("dx-simulator");
    }
    if (config_default2().rtlEnabled) {
      result.push("dx-rtl");
    }
    return result;
  }
  attachCssClasses(element, device) {
    this._deviceClasses = this._getCssClasses(device).join(" ");
    renderer_default(element).addClass(this._deviceClasses);
  }
  detachCssClasses(element) {
    renderer_default(element).removeClass(this._deviceClasses);
  }
  isSimulator() {
    try {
      var _this$_window$top;
      return this._isSimulator || hasWindow() && this._window.top !== this._window.self && (null === (_this$_window$top = this._window.top) || void 0 === _this$_window$top ? void 0 : _this$_window$top["dx-force-device"]) || this.isRippleEmulator();
    } catch (e) {
      return false;
    }
  }
  forceSimulator() {
    this._isSimulator = true;
  }
  _getDevice(deviceName) {
    if ("genericPhone" === deviceName) {
      deviceName = {
        deviceType: "phone",
        platform: "generic",
        generic: true
      };
    }
    if (isPlainObject(deviceName)) {
      return this._fromConfig(deviceName);
    }
    let ua;
    if (deviceName) {
      ua = KNOWN_UA_TABLE[deviceName];
      if (!ua) {
        throw errors_default.Error("E0005");
      }
    } else {
      const navigator3 = getNavigator();
      ua = navigator3.userAgent;
    }
    return this._fromUA(ua);
  }
  _getDeviceOrNameFromWindowScope() {
    var _this$_window$top2, _this$_window$top3;
    let result;
    if (hasWindow() && (null !== (_this$_window$top2 = this._window.top) && void 0 !== _this$_window$top2 && _this$_window$top2["dx-force-device-object"] || null !== (_this$_window$top3 = this._window.top) && void 0 !== _this$_window$top3 && _this$_window$top3["dx-force-device"])) {
      var _this$_window$top4, _this$_window$top5;
      result = (null === (_this$_window$top4 = this._window.top) || void 0 === _this$_window$top4 ? void 0 : _this$_window$top4["dx-force-device-object"]) || (null === (_this$_window$top5 = this._window.top) || void 0 === _this$_window$top5 ? void 0 : _this$_window$top5["dx-force-device"]);
    }
    return result;
  }
  _getDeviceNameFromSessionStorage() {
    const sessionStorage = getSessionStorage();
    if (!sessionStorage) {
      return;
    }
    const deviceOrName = sessionStorage.getItem("dx-force-device");
    try {
      return JSON.parse(deviceOrName);
    } catch (ex) {
      return deviceOrName;
    }
  }
  _fromConfig(config) {
    const result = extend({}, DEFAULT_DEVICE, this._currentDevice, config);
    const shortcuts = {
      phone: "phone" === result.deviceType,
      tablet: "tablet" === result.deviceType,
      android: "android" === result.platform,
      ios: "ios" === result.platform,
      generic: "generic" === result.platform
    };
    return extend(result, shortcuts);
  }
  _fromUA(ua) {
    for (let idx = 0; idx < UA_PARSERS_ARRAY.length; idx += 1) {
      const parser = UA_PARSERS_ARRAY[idx];
      const config = parser(ua);
      if (config) {
        return this._fromConfig(config);
      }
    }
    return DEFAULT_DEVICE;
  }
  _changeOrientation() {
    const $window = renderer_default(this._window);
    const orientation = getHeight($window) > getWidth($window) ? "portrait" : "landscape";
    if (this._currentOrientation === orientation) {
      return;
    }
    this._currentOrientation = orientation;
    this._eventsStrategy.fireEvent("orientationChanged", [{
      orientation
    }]);
  }
  _recalculateOrientation() {
    const windowWidth = getWidth(this._window);
    if (this._currentWidth === windowWidth) {
      return;
    }
    this._currentWidth = windowWidth;
    this._changeOrientation();
  }
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
};
var devices = new Devices();
when(uiLayerInitialized).done(() => {
  const viewPortElement = value();
  if (viewPortElement) {
    devices.attachCssClasses(viewPortElement);
  }
  changeCallback.add((viewPort2, prevViewport) => {
    devices.detachCssClasses(prevViewport);
    devices.attachCssClasses(viewPort2);
  });
});
var m_devices_default = devices;

// node_modules/devextreme/esm/__internal/core/utils/m_support.js
var {
  maxTouchPoints
} = getNavigator();
var transitionEndEventNames = {
  webkitTransition: "webkitTransitionEnd",
  MozTransition: "transitionend",
  OTransition: "oTransitionEnd",
  transition: "transitionend"
};
var supportProp = function(prop) {
  return !!styleProp(prop);
};
var isNativeScrollingSupported = function() {
  const {
    platform,
    mac: isMac
  } = m_devices_default.real();
  const isNativeScrollDevice = "ios" === platform || "android" === platform || isMac;
  return isNativeScrollDevice;
};
var inputType = function(type2) {
  if ("text" === type2) {
    return true;
  }
  const input = dom_adapter_default.createElement("input");
  try {
    input.setAttribute("type", type2);
    input.value = "wrongValue";
    return !input.value;
  } catch (e) {
    return false;
  }
};
var detectTouchEvents = function(hasWindowProperty, maxTouchPoints2) {
  return (hasWindowProperty("ontouchstart") || !!maxTouchPoints2) && !hasWindowProperty("callPhantom");
};
var detectPointerEvent = function(hasWindowProperty) {
  return hasWindowProperty("PointerEvent");
};
var touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
var pointerEvents = detectPointerEvent(hasProperty);
var touchPointersPresent = !!maxTouchPoints;
var touch = touchEvents || pointerEvents && touchPointersPresent;
var transition = call_once_default(function() {
  return supportProp("transition");
});
var transitionEndEventName = call_once_default(function() {
  return transitionEndEventNames[styleProp("transition")];
});
var animation = call_once_default(function() {
  return supportProp("animation");
});
var nativeScrolling = isNativeScrollingSupported();
var m_support_default = {
  animation,
  inputType,
  nativeScrolling,
  pointerEvents,
  styleProp,
  stylePropPrefix,
  supportProp,
  touch,
  touchEvents,
  transition,
  transitionEndEventName
};

// node_modules/devextreme/esm/common/core/environment/init_mobile_viewport/init_mobile_viewport.js
var window3 = getWindow();
var initMobileViewport = function(options) {
  options = extend({}, options);
  let realDevice = m_devices_default.real();
  const allowZoom = options.allowZoom;
  const allowPan = options.allowPan;
  const allowSelection = "allowSelection" in options ? options.allowSelection : "generic" === realDevice.platform;
  if (!renderer_default("meta[name=viewport]").length) {
    renderer_default("<meta>").attr("name", "viewport").appendTo("head");
  }
  const metaVerbs = ["width=device-width"];
  const msTouchVerbs = [];
  if (allowZoom) {
    msTouchVerbs.push("pinch-zoom");
  } else {
    metaVerbs.push("initial-scale=1.0", "maximum-scale=1.0, user-scalable=no");
  }
  if (allowPan) {
    msTouchVerbs.push("pan-x", "pan-y");
  }
  if (!allowPan && !allowZoom) {
    renderer_default("html, body").css({
      msContentZooming: "none",
      msUserSelect: "none",
      overflow: "hidden"
    });
  } else {
    renderer_default("html").css("msOverflowStyle", "-ms-autohiding-scrollbar");
  }
  if (!allowSelection && m_support_default.supportProp("userSelect")) {
    renderer_default(".dx-viewport").css(styleProp("userSelect"), "none");
  }
  renderer_default("meta[name=viewport]").attr("content", metaVerbs.join());
  renderer_default("html").css("msTouchAction", msTouchVerbs.join(" ") || "none");
  realDevice = m_devices_default.real();
  if (m_support_default.touch) {
    m_events_engine_default.off(m_dom_adapter_default.getDocument(), ".dxInitMobileViewport");
    m_events_engine_default.on(m_dom_adapter_default.getDocument(), "dxpointermove.dxInitMobileViewport", function(e) {
      const count = e.pointers.length;
      const isTouchEvent2 = "touch" === e.pointerType;
      const zoomDisabled = !allowZoom && count > 1;
      const panDisabled = !allowPan && 1 === count && !e.isScrollingEvent;
      if (isTouchEvent2 && (zoomDisabled || panDisabled)) {
        e.preventDefault();
      }
    });
  }
  if (realDevice.ios) {
    const isPhoneGap = "file:" === m_dom_adapter_default.getLocation().protocol;
    if (!isPhoneGap) {
      resize_callbacks_default.add(function() {
        const windowWidth = getWidth(window3);
        setWidth(renderer_default("body"), windowWidth);
      });
    }
  }
  if (realDevice.android) {
    resize_callbacks_default.add(function() {
      setTimeout(function() {
        const activeElement = m_dom_adapter_default.getActiveElement();
        activeElement.scrollIntoViewIfNeeded ? activeElement.scrollIntoViewIfNeeded() : activeElement.scrollIntoView(false);
      });
    });
  }
};

// node_modules/devextreme/esm/common/core/environment/init_mobile_viewport.js
var init_mobile_viewport_default = initMobileViewport;

// node_modules/devextreme/esm/__internal/core/utils/date.js
var addOffsets = (date, offsets) => {
  const newDateMs = offsets.reduce((result, offset2) => result + offset2, date.getTime());
  return new Date(newDateMs);
};
var isValidDate = (date) => Boolean(date && !isNaN(new Date(date).valueOf()));
var dateUtilsTs = {
  addOffsets,
  isValidDate
};

// node_modules/devextreme/esm/common/core/localization/default_date_names.js
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var PERIODS = ["AM", "PM"];
var QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
var cutCaptions = (captions, format2) => {
  const lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return map(captions, (caption) => caption.substr(0, lengthByFormat[format2]));
};
var default_date_names_default = {
  getMonthNames: function(format2) {
    return cutCaptions(MONTHS, format2);
  },
  getDayNames: function(format2) {
    return cutCaptions(DAYS, format2);
  },
  getQuarterNames: function(format2) {
    return QUARTERS;
  },
  getPeriodNames: function(format2) {
    return PERIODS;
  }
};

// node_modules/devextreme/esm/common/core/localization/ldml/date.formatter.js
function leftPad(text, length) {
  while (text.length < length) {
    text = "0" + text;
  }
  return text;
}
var FORMAT_TYPES = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var LDML_FORMATTERS = {
  y: function(date, count, useUtc) {
    let year = date[useUtc ? "getUTCFullYear" : "getFullYear"]();
    if (2 === count) {
      year %= 100;
    }
    return leftPad(year.toString(), count);
  },
  M: function(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "format")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  L: function(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "standalone")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  Q: function(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const quarter = Math.floor(month / 3);
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getQuarterNames(formatType)[quarter];
    }
    return leftPad((quarter + 1).toString(), Math.min(count, 2));
  },
  E: function(date, count, useUtc, dateParts) {
    const day = date[useUtc ? "getUTCDay" : "getDay"]();
    const formatType = FORMAT_TYPES[count < 3 ? 3 : count];
    return dateParts.getDayNames(formatType)[day];
  },
  a: function(date, count, useUtc, dateParts) {
    const hours = date[useUtc ? "getUTCHours" : "getHours"]();
    const period = hours < 12 ? 0 : 1;
    const formatType = FORMAT_TYPES[count];
    return dateParts.getPeriodNames(formatType)[period];
  },
  d: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCDate" : "getDate"]().toString(), Math.min(count, 2));
  },
  H: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCHours" : "getHours"]().toString(), Math.min(count, 2));
  },
  h: function(date, count, useUtc) {
    const hours = date[useUtc ? "getUTCHours" : "getHours"]();
    return leftPad((hours % 12 || 12).toString(), Math.min(count, 2));
  },
  m: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCMinutes" : "getMinutes"]().toString(), Math.min(count, 2));
  },
  s: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCSeconds" : "getSeconds"]().toString(), Math.min(count, 2));
  },
  S: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCMilliseconds" : "getMilliseconds"]().toString(), 3).substr(0, count);
  },
  x: function(date, count, useUtc) {
    const timezoneOffset = useUtc ? 0 : date.getTimezoneOffset();
    const signPart = timezoneOffset > 0 ? "-" : "+";
    const timezoneOffsetAbs = Math.abs(timezoneOffset);
    const hours = Math.floor(timezoneOffsetAbs / 60);
    const minutes = timezoneOffsetAbs % 60;
    const hoursPart = leftPad(hours.toString(), 2);
    const minutesPart = leftPad(minutes.toString(), 2);
    return signPart + hoursPart + (count >= 3 ? ":" : "") + (count > 1 || minutes ? minutesPart : "");
  },
  X: function(date, count, useUtc) {
    if (useUtc || !date.getTimezoneOffset()) {
      return "Z";
    }
    return LDML_FORMATTERS.x(date, count, useUtc);
  },
  Z: function(date, count, useUtc) {
    return LDML_FORMATTERS.X(date, count >= 5 ? 3 : 2, useUtc);
  }
};
var getFormatter = function(format2, dateParts) {
  return function(date) {
    let charIndex;
    let formatter;
    let char;
    let charCount = 0;
    let isEscaping = false;
    let isCurrentCharEqualsNext;
    let result = "";
    if (!date) {
      return null;
    }
    if (!format2) {
      return date;
    }
    const useUtc = "Z" === format2[format2.length - 1] || "'Z'" === format2.slice(-3);
    for (charIndex = 0; charIndex < format2.length; charIndex++) {
      char = format2[charIndex];
      formatter = LDML_FORMATTERS[char];
      isCurrentCharEqualsNext = char === format2[charIndex + 1];
      charCount++;
      if (!isCurrentCharEqualsNext) {
        if (formatter && !isEscaping) {
          result += formatter(date, charCount, useUtc, dateParts);
        }
        charCount = 0;
      }
      if ("'" === char && !isCurrentCharEqualsNext) {
        isEscaping = !isEscaping;
      } else if (isEscaping || !formatter) {
        result += char;
      }
      if ("'" === char && isCurrentCharEqualsNext) {
        charIndex++;
      }
    }
    return result;
  };
};

// node_modules/devextreme/esm/__internal/core/utils/m_date_serialization.js
var ISO8601_PATTERN = /^(\d{4,})(-)?(\d{2})(-)?(\d{2})(?:T(\d{2})(:)?(\d{2})?(:)?(\d{2}(?:\.(\d{1,3})\d*)?)?)?(Z|([+-])(\d{2})(:)?(\d{2})?)?$/;
var ISO8601_TIME_PATTERN = /^(\d{2}):(\d{2})(:(\d{2}))?$/;
var ISO8601_PATTERN_PARTS = ["", "yyyy", "", "MM", "", "dd", "THH", "", "mm", "", "ss", ".SSS"];
var DATE_SERIALIZATION_PATTERN = /^(\d{4})\/(\d{2})\/(\d{2})$/;
var dateParser = function(text, skipISO8601Parsing) {
  let result;
  if (isString(text) && !skipISO8601Parsing) {
    result = parseISO8601String(text);
  }
  return result || parseDate(text);
};
function getTimePart(part) {
  return +part || 0;
}
function parseDate(text) {
  const isDefaultSerializationFormat = "yyyy/MM/dd" === getDateSerializationFormat(text);
  const parsedValue = !isDate(text) && Date.parse(text);
  if (!parsedValue && isDefaultSerializationFormat) {
    const parts = text.match(DATE_SERIALIZATION_PATTERN);
    if (parts) {
      const newDate = new Date(getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[3]));
      newDate.setFullYear(getTimePart(parts[1]));
      newDate.setMonth(getTimePart(parts[2]) - 1);
      newDate.setDate(getTimePart(parts[3]));
      return newDate;
    }
  }
  return isNumeric(parsedValue) ? new Date(parsedValue) : text;
}
function parseISO8601String(text) {
  let parts = text.match(ISO8601_PATTERN);
  if (!parts) {
    parts = text.match(ISO8601_TIME_PATTERN);
    if (parts) {
      return new Date(0, 0, 0, getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[4]));
    }
    return;
  }
  const year = getTimePart(parts[1]);
  const month = --parts[3];
  const day = parts[5];
  let timeZoneHour = 0;
  let timeZoneMinute = 0;
  const correctYear = (d) => {
    year < 100 && d.setFullYear(year);
    return d;
  };
  timeZoneHour = getTimePart(parts[14]);
  timeZoneMinute = getTimePart(parts[16]);
  if ("-" === parts[13]) {
    timeZoneHour = -timeZoneHour;
    timeZoneMinute = -timeZoneMinute;
  }
  const hour = getTimePart(parts[6]) - timeZoneHour;
  const minute = getTimePart(parts[8]) - timeZoneMinute;
  const second = getTimePart(parts[10]);
  const millisecond = function(part) {
    part = part || "";
    return getTimePart(part) * 10 ** (3 - part.length);
  }(parts[11]);
  if (parts[12]) {
    return correctYear(new Date(Date.UTC(year, month, day, hour, minute, second, millisecond)));
  }
  return correctYear(new Date(year, month, day, hour, minute, second, millisecond));
}
var getIso8601Format = function(text, useUtc) {
  let parts = text.match(ISO8601_PATTERN);
  let result = "";
  if (!parts) {
    parts = text.match(ISO8601_TIME_PATTERN);
    if (parts) {
      return parts[3] ? "HH:mm:ss" : "HH:mm";
    }
    return;
  }
  for (let i = 1; i < ISO8601_PATTERN_PARTS.length; i++) {
    if (parts[i]) {
      result += ISO8601_PATTERN_PARTS[i] || parts[i];
    }
  }
  if ("Z" === parts[12]) {
    result += "'Z'";
  }
  if (parts[14]) {
    if (parts[15]) {
      result += "xxx";
    } else if (parts[16]) {
      result += "xx";
    } else {
      result += "x";
    }
  }
  return result;
};
var deserializeDate = function(value2) {
  if ("number" === typeof value2) {
    return new Date(value2);
  }
  return dateParser(value2, !config_default2().forceIsoDateParsing);
};
var serializeDate = function(value2, serializationFormat) {
  if (!serializationFormat) {
    return value2;
  }
  if (!isDate(value2)) {
    return null;
  }
  if ("number" === serializationFormat) {
    return value2 && value2.valueOf ? value2.valueOf() : null;
  }
  return getFormatter(serializationFormat, default_date_names_default)(value2);
};
var getDateSerializationFormat = function(value2) {
  if ("number" === typeof value2) {
    return "number";
  }
  if (isString(value2)) {
    let format2;
    if (config_default2().forceIsoDateParsing) {
      format2 = getIso8601Format(value2);
    }
    if (format2) {
      return format2;
    }
    if (value2.includes(":")) {
      return "yyyy/MM/dd HH:mm:ss";
    }
    return "yyyy/MM/dd";
  }
  if (value2) {
    return null;
  }
};
var dateSerialization = {
  dateParser,
  deserializeDate,
  serializeDate,
  getDateSerializationFormat
};

// node_modules/devextreme/esm/core/utils/date_serialization.js
var date_serialization_default = dateSerialization;

// node_modules/devextreme/esm/__internal/scheduler/utils/data_accessor/data_accessor.js
var DataAccessor = class {
  constructor() {
    this.getter = {};
    this.setter = {};
  }
  updateExpressions(fields) {
    Object.entries(fields).forEach((_ref) => {
      let [key, value2] = _ref;
      return this.updateExpression(key, value2);
    });
  }
  get(field, obj) {
    if (this.getter[field]) {
      return this.getter[field](obj);
    }
    return;
  }
  set(field, obj, value2) {
    if (this.setter[field]) {
      this.setter[field](obj, value2);
    }
    return this;
  }
  has(field) {
    return isDefined(this.getter[field]);
  }
};

// node_modules/devextreme/esm/__internal/scheduler/utils/data_accessor/appointment_data_accessor.js
var isDateField = (field) => "startDate" === field || "endDate" === field;
var AppointmentDataAccessor = class extends DataAccessor {
  constructor(fields) {
    let forceIsoDateParsing = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
    let dateSerializationFormat = arguments.length > 2 ? arguments[2] : void 0;
    super();
    this.forceIsoDateParsing = forceIsoDateParsing;
    this.dateSerializationFormat = dateSerializationFormat;
    this.expr = _extends({}, fields);
    this.updateExpressions(fields);
  }
  getCommonAccessExpressions(expr) {
    return {
      getter: compileGetter(expr),
      setter: compileSetter(expr)
    };
  }
  getDateFieldAccessExpressions(expr) {
    const {
      getter: commonGetter,
      setter: commonSetter
    } = this.getCommonAccessExpressions(expr);
    let serializationFormatCache;
    return {
      getter: (object) => this.forceIsoDateParsing ? date_serialization_default.deserializeDate(commonGetter(object)) : commonGetter(object),
      setter: (object, value2) => {
        if (this.dateSerializationFormat) {
          serializationFormatCache = this.dateSerializationFormat;
        } else if (this.forceIsoDateParsing && !serializationFormatCache) {
          const oldValue = commonGetter(object);
          serializationFormatCache = date_serialization_default.getDateSerializationFormat(oldValue);
        }
        const newValue = date_serialization_default.serializeDate(value2, serializationFormatCache);
        commonSetter(object, newValue);
      }
    };
  }
  getAccessExpressions(name, expr) {
    return isDateField(name) ? this.getDateFieldAccessExpressions(expr) : this.getCommonAccessExpressions(expr);
  }
  updateExpression(field, expr) {
    const name = field.replace("Expr", "");
    if (!expr) {
      delete this.getter[name];
      delete this.setter[name];
      delete this.expr[field];
      return;
    }
    const {
      getter,
      setter
    } = this.getAccessExpressions(name, expr);
    this.getter[name] = getter;
    this.setter[name] = setter;
    this.expr[field] = expr;
  }
};

// node_modules/devextreme/esm/__internal/scheduler/utils/macro_task_array/dispatcher.js
var macroTaskIdSet = /* @__PURE__ */ new Set();
var schedule = (callback, macroTaskTimeoutMs) => __async(void 0, null, function* () {
  return new Promise((resolve) => {
    const taskId = setTimeout(() => {
      callback();
      macroTaskIdSet.delete(taskId);
      resolve();
    }, macroTaskTimeoutMs);
    macroTaskIdSet.add(taskId);
  });
});
var dispose = () => {
  Array.from(macroTaskIdSet).forEach((id) => {
    clearTimeout(id);
    macroTaskIdSet.delete(id);
  });
};
var dispatcher_default = {
  schedule,
  dispose
};

// node_modules/devextreme/esm/__internal/scheduler/utils/macro_task_array/methods.js
var macroTaskArrayForEach = function(_0, _1) {
  return __async(this, arguments, function* (array, callback) {
    let step = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
    let macroTaskTimeoutMs = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    const promises = [];
    const batchesCount = Math.ceil(array.length / step);
    for (let batchIdx = 0; batchIdx < batchesCount; batchIdx += 1) {
      const scheduledTask = dispatcher_default.schedule(() => {
        const startIdx = batchIdx * step;
        const maxIdx = startIdx + step;
        for (let idx = startIdx; idx < maxIdx && void 0 !== array[idx]; idx += 1) {
          callback(array[idx]);
        }
      }, macroTaskTimeoutMs);
      promises.push(scheduledTask);
    }
    yield Promise.all(promises);
  });
};
var macroTaskArrayMap = function(_0, _1) {
  return __async(this, arguments, function* (array, callback) {
    let step = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
    let macroTaskTimeoutMs = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    const result = [];
    yield macroTaskArrayForEach(array, (item) => {
      result.push(callback(item));
    }, step, macroTaskTimeoutMs);
    return result;
  });
};

// node_modules/devextreme/esm/__internal/scheduler/utils/macro_task_array/index.js
var macro_task_array_default = {
  forEach: macroTaskArrayForEach,
  map: macroTaskArrayMap,
  dispose: dispatcher_default.dispose
};

// node_modules/devextreme/esm/__internal/core/utils/m_math.js
var sign = function(value2) {
  if (0 === value2) {
    return 0;
  }
  return value2 / Math.abs(value2);
};
var fitIntoRange = function(value2, minValue, maxValue) {
  const isMinValueUndefined = !minValue && 0 !== minValue;
  const isMaxValueUndefined = !maxValue && 0 !== maxValue;
  isMinValueUndefined && (minValue = !isMaxValueUndefined ? Math.min(value2, maxValue) : value2);
  isMaxValueUndefined && (maxValue = !isMinValueUndefined ? Math.max(value2, minValue) : value2);
  return Math.min(Math.max(value2, minValue), maxValue);
};
var inRange = function(value2, minValue, maxValue) {
  return value2 >= minValue && value2 <= maxValue;
};
function getExponent(value2) {
  return Math.abs(parseInt(value2.toExponential().split("e")[1], 10));
}
function getExponentialNotation(value2) {
  const parts = value2.toExponential().split("e");
  const mantissa = parseFloat(parts[0]);
  const exponent = parseInt(parts[1], 10);
  return {
    exponent,
    mantissa
  };
}
function multiplyInExponentialForm(value2, exponentShift) {
  const exponentialNotation = getExponentialNotation(value2);
  return parseFloat(`${exponentialNotation.mantissa}e${exponentialNotation.exponent + exponentShift}`);
}
function isEdgeBug() {
  return "0.000300" !== 3e-4.toPrecision(3);
}
function adjust(value2, interval) {
  let precision = getPrecision(interval || 0) + 2;
  const separatedValue = value2.toString().split(".");
  const sourceValue = value2;
  const absValue = Math.abs(value2);
  let separatedAdjustedValue;
  const isExponentValue = isExponential(value2);
  const integerPart = absValue > 1 ? 10 : 0;
  if (1 === separatedValue.length) {
    return value2;
  }
  if (!isExponentValue) {
    if (isExponential(interval)) {
      precision = separatedValue[0].length + getExponent(interval);
    }
    value2 = absValue;
    value2 = value2 - Math.floor(value2) + integerPart;
  }
  precision = isEdgeBug() && getExponent(value2) > 6 || precision > 7 ? 15 : 7;
  if (!isExponentValue) {
    separatedAdjustedValue = parseFloat(value2.toPrecision(precision)).toString().split(".");
    if (separatedAdjustedValue[0] === integerPart.toString()) {
      return parseFloat(`${separatedValue[0]}.${separatedAdjustedValue[1]}`);
    }
  }
  return parseFloat(sourceValue.toPrecision(precision));
}
function getPrecision(value2) {
  const str = value2.toString();
  if (str.indexOf(".") < 0) {
    return 0;
  }
  const mantissa = str.split(".");
  const positionOfDelimiter = mantissa[1].indexOf("e");
  return positionOfDelimiter >= 0 ? positionOfDelimiter : mantissa[1].length;
}
function getRoot(x, n) {
  if (x < 0 && n % 2 !== 1) {
    return NaN;
  }
  const y = Math.abs(x) ** (1 / n);
  return n % 2 === 1 && x < 0 ? -y : y;
}
function solveCubicEquation(a, b, c, d) {
  if (Math.abs(a) < 1e-8) {
    a = b;
    b = c;
    c = d;
    if (Math.abs(a) < 1e-8) {
      a = b;
      b = c;
      if (Math.abs(a) < 1e-8) {
        return [];
      }
      return [-b / a];
    }
    const D2 = b * b - 4 * a * c;
    if (Math.abs(D2) < 1e-8) {
      return [-b / (2 * a)];
    }
    if (D2 > 0) {
      return [(-b + Math.sqrt(D2)) / (2 * a), (-b - Math.sqrt(D2)) / (2 * a)];
    }
    return [];
  }
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  let roots;
  let u;
  if (Math.abs(p) < 1e-8) {
    roots = [getRoot(-q, 3)];
  } else if (Math.abs(q) < 1e-8) {
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
  } else {
    const D3 = q * q / 4 + p * p * p / 27;
    if (Math.abs(D3) < 1e-8) {
      roots = [-1.5 * q / p, 3 * q / p];
    } else if (D3 > 0) {
      u = getRoot(-q / 2 - Math.sqrt(D3), 3);
      roots = [u - p / (3 * u)];
    } else {
      u = 2 * Math.sqrt(-p / 3);
      const t = Math.acos(3 * q / p / u) / 3;
      const k = 2 * Math.PI / 3;
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
    }
  }
  for (let i = 0; i < roots.length; i++) {
    roots[i] -= b / (3 * a);
  }
  return roots;
}
function trunc(value2) {
  return Math.trunc ? Math.trunc(value2) : value2 > 0 ? Math.floor(value2) : Math.ceil(value2);
}
function getRemainderByDivision(dividend, divider, digitsCount) {
  if (divider === parseInt(divider, 10)) {
    return dividend % divider;
  }
  const quotient = roundFloatPart(dividend / divider, digitsCount);
  return (quotient - parseInt(quotient, 10)) * divider;
}
function getExponentLength(value2) {
  var _valueString$split$;
  const valueString = value2.toString();
  return (null === (_valueString$split$ = valueString.split(".")[1]) || void 0 === _valueString$split$ ? void 0 : _valueString$split$.length) || parseInt(valueString.split("e-")[1], 10) || 0;
}
function roundFloatPart(value2) {
  let digitsCount = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  return parseFloat(value2.toFixed(digitsCount));
}

// node_modules/devextreme/esm/__internal/utils/toMilliseconds.js
var timeIntervals = {
  millisecond: 1,
  second: 1e3,
  minute: 6e4,
  hour: 36e5,
  day: 864e5,
  week: 6048e5,
  month: 2592e6,
  quarter: 7776e6,
  year: 31536e6
};
function toMilliseconds(value2) {
  return timeIntervals[value2];
}

// node_modules/devextreme/esm/__internal/core/utils/m_date.js
var dateUnitIntervals = ["millisecond", "second", "minute", "hour", "day", "week", "month", "quarter", "year"];
var getDatesInterval = function(startDate, endDate, intervalUnit) {
  const delta = endDate.getTime() - startDate.getTime();
  const millisecondCount = toMilliseconds(intervalUnit) || 1;
  return Math.floor(delta / millisecondCount);
};
var getNextDateUnit = function(unit, withWeeks) {
  const interval = getDateUnitInterval(unit);
  switch (interval) {
    case "millisecond":
      return "second";
    case "second":
      return "minute";
    case "minute":
      return "hour";
    case "hour":
      return "day";
    case "day":
      return withWeeks ? "week" : "month";
    case "week":
      return "month";
    case "month":
      return "quarter";
    case "quarter":
    case "year":
      return "year";
    default:
      return 0;
  }
};
var convertMillisecondsToDateUnits = function(value2) {
  let i;
  let dateUnitCount;
  let dateUnitInterval;
  const dateUnitIntervals2 = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
  const result = {};
  for (i = dateUnitIntervals2.length - 1; i >= 0; i--) {
    dateUnitInterval = dateUnitIntervals2[i];
    dateUnitCount = Math.floor(value2 / toMilliseconds(dateUnitInterval));
    if (dateUnitCount > 0) {
      result[`${dateUnitInterval}s`] = dateUnitCount;
      value2 -= convertDateUnitToMilliseconds(dateUnitInterval, dateUnitCount);
    }
  }
  return result;
};
var dateToMilliseconds = function(tickInterval) {
  let milliseconds = 0;
  if (isObject(tickInterval)) {
    each(tickInterval, function(key, value2) {
      milliseconds += convertDateUnitToMilliseconds(key.substr(0, key.length - 1), value2);
    });
  }
  if (isString(tickInterval)) {
    milliseconds = convertDateUnitToMilliseconds(tickInterval, 1);
  }
  return milliseconds;
};
function convertDateUnitToMilliseconds(dateUnit, count) {
  return toMilliseconds(dateUnit) * count;
}
function getDateUnitInterval(tickInterval) {
  let maxInterval = -1;
  let i;
  if (isString(tickInterval)) {
    return tickInterval;
  }
  if (isObject(tickInterval)) {
    each(tickInterval, function(key, value2) {
      for (i = 0; i < dateUnitIntervals.length; i++) {
        if (value2 && (key === `${dateUnitIntervals[i]}s` || key === dateUnitIntervals[i]) && maxInterval < i) {
          maxInterval = i;
        }
      }
    });
    return dateUnitIntervals[maxInterval];
  }
  return "";
}
var tickIntervalToFormatMap = {
  millisecond: "millisecond",
  second: "longtime",
  minute: "shorttime",
  hour: "shorttime",
  day: "day",
  week: "day",
  month: "month",
  quarter: "quarter",
  year: "year"
};
function getDateFormatByTickInterval(tickInterval) {
  return tickIntervalToFormatMap[getDateUnitInterval(tickInterval)] || "";
}
var getQuarter = function(month) {
  return Math.floor(month / 3);
};
var getFirstQuarterMonth = function(month) {
  return 3 * getQuarter(month);
};
function correctDateWithUnitBeginning(date, dateInterval, withCorrection, firstDayOfWeek) {
  date = new Date(date.getTime());
  const oldDate = new Date(date.getTime());
  let firstQuarterMonth;
  let month;
  const dateUnitInterval = getDateUnitInterval(dateInterval);
  switch (dateUnitInterval) {
    case "second":
      date = new Date(1e3 * Math.floor(oldDate.getTime() / 1e3));
      break;
    case "minute":
      date = new Date(6e4 * Math.floor(oldDate.getTime() / 6e4));
      break;
    case "hour":
      date = new Date(36e5 * Math.floor(oldDate.getTime() / 36e5));
      break;
    case "year":
      date.setMonth(0);
    case "month":
      date.setDate(1);
    case "day":
      date.setHours(0, 0, 0, 0);
      break;
    case "week":
      date = getFirstWeekDate(date, firstDayOfWeek || 0);
      date.setHours(0, 0, 0, 0);
      break;
    case "quarter":
      firstQuarterMonth = getFirstQuarterMonth(date.getMonth());
      month = date.getMonth();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      if (month !== firstQuarterMonth) {
        date.setMonth(firstQuarterMonth);
      }
  }
  if (withCorrection && "hour" !== dateUnitInterval && "minute" !== dateUnitInterval && "second" !== dateUnitInterval) {
    fixTimezoneGap(oldDate, date);
  }
  return date;
}
function trimTime(date) {
  return correctDateWithUnitBeginning(date, "day");
}
var setToDayEnd = function(date) {
  const result = trimTime(date);
  result.setDate(result.getDate() + 1);
  return new Date(result.getTime() - 1);
};
var getDatesDifferences = function(date1, date2) {
  let counter = 0;
  const differences = {
    year: date1.getFullYear() !== date2.getFullYear(),
    month: date1.getMonth() !== date2.getMonth(),
    day: date1.getDate() !== date2.getDate(),
    hour: date1.getHours() !== date2.getHours(),
    minute: date1.getMinutes() !== date2.getMinutes(),
    second: date1.getSeconds() !== date2.getSeconds(),
    millisecond: date1.getMilliseconds() !== date2.getMilliseconds()
  };
  each(differences, function(key, value2) {
    if (value2) {
      counter++;
    }
  });
  if (0 === counter && 0 !== getTimezonesDifference(date1, date2)) {
    differences.hour = true;
    counter++;
  }
  differences.count = counter;
  return differences;
};
function addDateInterval(value2, interval, dir) {
  const result = new Date(value2.getTime());
  const intervalObject = isString(interval) ? getDateIntervalByString(interval.toLowerCase()) : isNumeric(interval) ? convertMillisecondsToDateUnits(interval) : interval;
  if (intervalObject.years) {
    result.setFullYear(result.getFullYear() + intervalObject.years * dir);
  }
  if (intervalObject.quarters) {
    result.setMonth(result.getMonth() + 3 * intervalObject.quarters * dir);
  }
  if (intervalObject.months) {
    result.setMonth(result.getMonth() + intervalObject.months * dir);
  }
  if (intervalObject.weeks) {
    result.setDate(result.getDate() + 7 * intervalObject.weeks * dir);
  }
  if (intervalObject.days) {
    result.setDate(result.getDate() + intervalObject.days * dir);
  }
  if (intervalObject.hours) {
    result.setTime(result.getTime() + 36e5 * intervalObject.hours * dir);
  }
  if (intervalObject.minutes) {
    result.setTime(result.getTime() + 6e4 * intervalObject.minutes * dir);
  }
  if (intervalObject.seconds) {
    result.setTime(result.getTime() + 1e3 * intervalObject.seconds * dir);
  }
  if (intervalObject.milliseconds) {
    result.setTime(result.getTime() + intervalObject.milliseconds * dir);
  }
  return result;
}
var addInterval = function(value2, interval, isNegative) {
  const dir = isNegative ? -1 : 1;
  return isDate(value2) ? addDateInterval(value2, interval, dir) : adjust(value2 + interval * dir, interval);
};
var getSequenceByInterval = function(min, max, interval) {
  const intervals = [];
  let cur;
  intervals.push(isDate(min) ? new Date(min.getTime()) : min);
  cur = min;
  while (cur < max) {
    cur = addInterval(cur, interval);
    intervals.push(cur);
  }
  return intervals;
};
var getViewFirstCellDate = function(viewType, date) {
  if ("month" === viewType) {
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  }
  if ("year" === viewType) {
    return createDateWithFullYear(date.getFullYear(), 0, date.getDate());
  }
  if ("decade" === viewType) {
    return createDateWithFullYear(getFirstYearInDecade(date), date.getMonth(), date.getDate());
  }
  if ("century" === viewType) {
    return createDateWithFullYear(getFirstDecadeInCentury(date), date.getMonth(), date.getDate());
  }
};
var getViewLastCellDate = function(viewType, date) {
  if ("month" === viewType) {
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), getLastMonthDay(date));
  }
  if ("year" === viewType) {
    return createDateWithFullYear(date.getFullYear(), 11, date.getDate());
  }
  if ("decade" === viewType) {
    return createDateWithFullYear(getFirstYearInDecade(date) + 9, date.getMonth(), date.getDate());
  }
  if ("century" === viewType) {
    return createDateWithFullYear(getFirstDecadeInCentury(date) + 90, date.getMonth(), date.getDate());
  }
};
var getViewMinBoundaryDate = function(viewType, date) {
  const resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  if ("month" === viewType) {
    return resultDate;
  }
  resultDate.setMonth(0);
  if ("year" === viewType) {
    return resultDate;
  }
  if ("decade" === viewType) {
    resultDate.setFullYear(getFirstYearInDecade(date));
  }
  if ("century" === viewType) {
    resultDate.setFullYear(getFirstDecadeInCentury(date));
  }
  return resultDate;
};
var getViewMaxBoundaryDate = function(viewType, date) {
  const resultDate = new Date(date);
  resultDate.setDate(getLastMonthDay(date));
  if ("month" === viewType) {
    return resultDate;
  }
  resultDate.setMonth(11);
  resultDate.setDate(getLastMonthDay(resultDate));
  if ("year" === viewType) {
    return resultDate;
  }
  if ("decade" === viewType) {
    resultDate.setFullYear(getFirstYearInDecade(date) + 9);
  }
  if ("century" === viewType) {
    resultDate.setFullYear(getFirstDecadeInCentury(date) + 99);
  }
  return resultDate;
};
function getLastMonthDay(date) {
  const resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0);
  return resultDate.getDate();
}
var getViewUp = function(typeView) {
  switch (typeView) {
    case "month":
      return "year";
    case "year":
      return "decade";
    case "decade":
      return "century";
  }
};
var getViewDown = function(typeView) {
  switch (typeView) {
    case "century":
      return "decade";
    case "decade":
      return "year";
    case "year":
      return "month";
  }
};
var getDifferenceInMonth = function(typeView) {
  let difference = 1;
  if ("year" === typeView) {
    difference = 12;
  }
  if ("decade" === typeView) {
    difference = 120;
  }
  if ("century" === typeView) {
    difference = 1200;
  }
  return difference;
};
var getDifferenceInMonthForCells = function(typeView) {
  let difference = 1;
  if ("decade" === typeView) {
    difference = 12;
  }
  if ("century" === typeView) {
    difference = 120;
  }
  return difference;
};
function getDateIntervalByString(intervalString) {
  const result = {};
  switch (intervalString) {
    case "year":
      result.years = 1;
      break;
    case "month":
      result.months = 1;
      break;
    case "quarter":
      result.months = 3;
      break;
    case "week":
      result.weeks = 1;
      break;
    case "day":
      result.days = 1;
      break;
    case "hour":
      result.hours = 1;
      break;
    case "minute":
      result.minutes = 1;
      break;
    case "second":
      result.seconds = 1;
      break;
    case "millisecond":
      result.milliseconds = 1;
  }
  return result;
}
function sameDate(date1, date2) {
  return sameMonthAndYear(date1, date2) && date1.getDate() === date2.getDate();
}
function sameMonthAndYear(date1, date2) {
  return sameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}
function sameYear(date1, date2) {
  return date1 && date2 && date1.getFullYear() === date2.getFullYear();
}
function sameHoursAndMinutes(date1, date2) {
  return date1 && date2 && date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}
var sameDecade = function(date1, date2) {
  if (!isDefined(date1) || !isDefined(date2)) {
    return;
  }
  const startDecadeDate1 = date1.getFullYear() - date1.getFullYear() % 10;
  const startDecadeDate2 = date2.getFullYear() - date2.getFullYear() % 10;
  return date1 && date2 && startDecadeDate1 === startDecadeDate2;
};
var sameCentury = function(date1, date2) {
  if (!isDefined(date1) || !isDefined(date2)) {
    return;
  }
  const startCenturyDate1 = date1.getFullYear() - date1.getFullYear() % 100;
  const startCenturyDate2 = date2.getFullYear() - date2.getFullYear() % 100;
  return date1 && date2 && startCenturyDate1 === startCenturyDate2;
};
var sameDatesArrays = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((date1, index2) => {
    const date2 = arr2[index2];
    if ([date1, date2].some((date) => null !== date && !(date instanceof Date))) {
      return false;
    }
    if (date1 instanceof Date && date2 instanceof Date) {
      return sameDate(date1, date2);
    }
    return date1 === date2;
  });
};
function getFirstDecadeInCentury(date) {
  return date && date.getFullYear() - date.getFullYear() % 100;
}
function getFirstYearInDecade(date) {
  return date && date.getFullYear() - date.getFullYear() % 10;
}
var getShortDateFormat = function() {
  return "yyyy/MM/dd";
};
var getFirstMonthDate = function(date) {
  let offset2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (!isDefined(date)) {
    return;
  }
  const currentDate = new Date(date.getTime());
  const month = currentDate.getMonth() + offset2;
  currentDate.setMonth(month);
  return createDateWithFullYear(currentDate.getFullYear(), month, 1);
};
var getLastMonthDate = function(date) {
  let offset2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (!isDefined(date)) {
    return;
  }
  const currentDate = new Date(date.getTime());
  const month = currentDate.getMonth() + offset2;
  currentDate.setMonth(month);
  return createDateWithFullYear(currentDate.getFullYear(), month + 1, 0);
};
function getFirstWeekDate(date, firstDayOfWeek) {
  const delta = (date.getDay() - firstDayOfWeek + 7) % 7;
  const result = new Date(date);
  result.setDate(date.getDate() - delta);
  return result;
}
function getUTCTime(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}
function getDayNumber(date) {
  const ms = getUTCTime(date) - getUTCTime(getFirstDateInYear(date.getFullYear()));
  return 1 + Math.floor(ms / toMilliseconds("day"));
}
function getFirstDateInYear(year) {
  return new Date(year, 0, 1);
}
function getLastDateInYear(year) {
  return new Date(year, 11, 31);
}
function getDayWeekNumber(date, firstDayOfWeek) {
  let day = date.getDay() - firstDayOfWeek + 1;
  if (day <= 0) {
    day += 7;
  }
  return day;
}
function getWeekNumber(date, firstDayOfWeek, rule) {
  const firstWeekDayInYear = getDayWeekNumber(getFirstDateInYear(date.getFullYear()), firstDayOfWeek);
  const lastWeekDayInYear = getDayWeekNumber(getLastDateInYear(date.getFullYear()), firstDayOfWeek);
  const daysInFirstWeek = 7 - firstWeekDayInYear + 1;
  let weekNumber = Math.ceil((getDayNumber(date) - daysInFirstWeek) / 7);
  switch (rule) {
    case "fullWeek":
      if (7 === daysInFirstWeek) {
        weekNumber++;
      }
      if (0 === weekNumber) {
        const lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
        return getWeekNumber(lastDateInPreviousYear, firstDayOfWeek, rule);
      }
      return weekNumber;
    case "firstDay": {
      if (daysInFirstWeek > 0) {
        weekNumber++;
      }
      const isSunday = 7 === firstWeekDayInYear || 7 === lastWeekDayInYear;
      if (weekNumber > 52 && !isSunday || 54 === weekNumber) {
        weekNumber = 1;
      }
      return weekNumber;
    }
    case "firstFourDays": {
      if (daysInFirstWeek > 3) {
        weekNumber++;
      }
      const isThursday = 4 === firstWeekDayInYear || 4 === lastWeekDayInYear;
      if (weekNumber > 52 && !isThursday) {
        weekNumber = 1;
      }
      if (0 === weekNumber) {
        const lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
        return getWeekNumber(lastDateInPreviousYear, firstDayOfWeek, rule);
      }
      return weekNumber;
    }
  }
}
var normalizeDateByWeek = function(date, currentDate) {
  const differenceInDays = dateUtils.getDatesInterval(date, currentDate, "day");
  let resultDate = new Date(date);
  if (differenceInDays >= 6) {
    resultDate = new Date(resultDate.setDate(resultDate.getDate() + 7));
  }
  return resultDate;
};
var dateInRange = function(date, min, max, format2) {
  if ("date" === format2) {
    min = min && dateUtils.correctDateWithUnitBeginning(min, "day");
    max = max && dateUtils.correctDateWithUnitBeginning(max, "day");
    date = date && dateUtils.correctDateWithUnitBeginning(date, "day");
  }
  return normalizeDate(date, min, max) === date;
};
var intervalsOverlap = function(options) {
  const {
    firstMin,
    firstMax,
    secondMin,
    secondMax
  } = options;
  return firstMin <= secondMin && secondMin <= firstMax || firstMin > secondMin && firstMin < secondMax || firstMin < secondMax && firstMax > secondMax;
};
var dateTimeFromDecimal = function(number) {
  const hours = Math.floor(number);
  const minutes = number % 1 * 60;
  return {
    hours,
    minutes
  };
};
var roundDateByStartDayHour = function(date, startDayHour) {
  const startTime = this.dateTimeFromDecimal(startDayHour);
  const result = new Date(date);
  if (date.getHours() === startTime.hours && date.getMinutes() < startTime.minutes || date.getHours() < startTime.hours) {
    result.setHours(startTime.hours, startTime.minutes, 0, 0);
  }
  return result;
};
function normalizeDate(date, min, max) {
  let normalizedDate = date;
  if (!isDefined(date)) {
    return date;
  }
  if (isDefined(min) && date < min) {
    normalizedDate = min;
  }
  if (isDefined(max) && date > max) {
    normalizedDate = max;
  }
  return normalizedDate;
}
function fixTimezoneGap(oldDate, newDate) {
  if (!isDefined(oldDate)) {
    return;
  }
  const diff = newDate.getHours() - oldDate.getHours();
  if (0 === diff) {
    return;
  }
  const sign2 = 1 === diff || -23 === diff ? -1 : 1;
  const trial = new Date(newDate.getTime() + 36e5 * sign2);
  if (sign2 > 0 || trial.getDate() === newDate.getDate()) {
    newDate.setTime(trial.getTime());
  }
}
var roundToHour = function(date) {
  const result = new Date(date.getTime());
  result.setHours(result.getHours() + 1);
  result.setMinutes(0);
  return result;
};
function getTimezonesDifference(min, max) {
  return 60 * (max.getTimezoneOffset() - min.getTimezoneOffset()) * 1e3;
}
var makeDate = function(date) {
  return new Date(date);
};
var getDatesOfInterval = function(startDate, endDate, step) {
  const result = [];
  let currentDate = new Date(startDate.getTime());
  while (currentDate < endDate) {
    result.push(new Date(currentDate.getTime()));
    currentDate = this.addInterval(currentDate, step);
  }
  return result;
};
var createDateWithFullYear = function(year) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  const result = new Date(year, ...args);
  result.setFullYear(year);
  return result;
};
var getMachineTimezoneName = () => {
  const hasIntl3 = "undefined" !== typeof Intl;
  return hasIntl3 ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;
};
var getRangesByDates = (dates) => {
  const datesInMilliseconds = dates.map((value2) => correctDateWithUnitBeginning(value2, "day").getTime());
  const sortedDates = datesInMilliseconds.sort((a, b) => a - b);
  const msInDay = toMilliseconds("day");
  const ranges = [];
  let startDate = sortedDates[0];
  for (let i = 1; i <= sortedDates.length; ++i) {
    const nextDate = sortedDates[i];
    const currentDate = sortedDates[i - 1];
    const isNewRange = nextDate - currentDate > msInDay;
    if (isNewRange || i === sortedDates.length) {
      const range = startDate === sortedDates[i - 1] ? [startDate] : [startDate, sortedDates[i - 1]];
      const serializedRange = range.map((value2) => date_serialization_default.deserializeDate(value2));
      ranges.push(serializedRange);
      startDate = nextDate;
    }
  }
  return ranges;
};
var sameView = function(view, date1, date2) {
  return dateUtils[camelize(`same ${view}`)](date1, date2);
};
var dateUtils = {
  dateUnitIntervals,
  convertMillisecondsToDateUnits,
  dateToMilliseconds,
  getNextDateUnit,
  convertDateUnitToMilliseconds,
  getDateUnitInterval,
  getDateFormatByTickInterval,
  getDatesDifferences,
  correctDateWithUnitBeginning,
  trimTime,
  setToDayEnd,
  roundDateByStartDayHour,
  dateTimeFromDecimal,
  addDateInterval,
  addInterval,
  getSequenceByInterval,
  getDateIntervalByString,
  sameHoursAndMinutes,
  sameDate,
  sameMonthAndYear,
  sameMonth: sameMonthAndYear,
  sameYear,
  sameDecade,
  sameCentury,
  sameView,
  sameDatesArrays,
  getDifferenceInMonth,
  getDifferenceInMonthForCells,
  getFirstYearInDecade,
  getFirstDecadeInCentury,
  getShortDateFormat,
  getViewFirstCellDate,
  getViewLastCellDate,
  getViewDown,
  getViewUp,
  getLastMonthDay,
  getLastMonthDate,
  getFirstMonthDate,
  getFirstWeekDate,
  getWeekNumber,
  normalizeDateByWeek,
  getQuarter,
  getFirstQuarterMonth,
  dateInRange,
  intervalsOverlap,
  roundToHour,
  normalizeDate,
  getViewMinBoundaryDate,
  getViewMaxBoundaryDate,
  fixTimezoneGap,
  getTimezonesDifference,
  makeDate,
  getDatesInterval,
  getDatesOfInterval,
  createDateWithFullYear,
  getMachineTimezoneName,
  getRangesByDates
};

// node_modules/devextreme/esm/core/utils/date.js
var date_default = dateUtils;

// node_modules/devextreme/esm/__internal/scheduler/m_date_adapter.js
var toMs = date_default.dateToMilliseconds;
var DateAdapterCore = class {
  constructor(source) {
    this._source = new Date(source.getTime ? source.getTime() : source);
  }
  get source() {
    return this._source;
  }
  result() {
    return this._source;
  }
  getTimezoneOffset() {
    let format2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
    const value2 = this._source.getTimezoneOffset();
    if ("minute" === format2) {
      return value2 * toMs("minute");
    }
    return value2;
  }
  getTime() {
    return this._source.getTime();
  }
  setTime(value2) {
    this._source.setTime(value2);
    return this;
  }
  addTime(value2) {
    this._source.setTime(this._source.getTime() + value2);
    return this;
  }
  setMinutes(value2) {
    this._source.setMinutes(value2);
    return this;
  }
  addMinutes(value2) {
    this._source.setMinutes(this._source.getMinutes() + value2);
    return this;
  }
  subtractMinutes(value2) {
    this._source.setMinutes(this._source.getMinutes() - value2);
    return this;
  }
};
var DateAdapter = (date) => new DateAdapterCore(date);
var m_date_adapter_default = DateAdapter;

// node_modules/devextreme/esm/__internal/scheduler/timezones/m_utils_timezones_data.js
var getConvertedUntils = (value2) => value2.split("|").map((until) => {
  if ("Infinity" === until) {
    return null;
  }
  return 1e3 * parseInt(until, 36);
});
var parseTimezone = (timeZoneConfig) => {
  const {
    offsets
  } = timeZoneConfig;
  const {
    offsetIndices
  } = timeZoneConfig;
  const {
    untils
  } = timeZoneConfig;
  const offsetList = offsets.split("|").map((value2) => parseInt(value2));
  const offsetIndexList = offsetIndices.split("").map((value2) => parseInt(value2));
  const dateList = getConvertedUntils(untils).map((accumulator = 0, (value2) => accumulator += value2));
  var accumulator;
  return {
    offsetList,
    offsetIndexList,
    dateList
  };
};
var TimeZoneCache = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  tryGet(id) {
    if (!this.map.get(id)) {
      const config = timeZoneDataUtils.getTimezoneById(id);
      if (!config) {
        return false;
      }
      const timeZoneInfo = parseTimezone(config);
      this.map.set(id, timeZoneInfo);
    }
    return this.map.get(id);
  }
};
var tzCache = new TimeZoneCache();
var timeZoneDataUtils = {
  _tzCache: tzCache,
  getTimeZonesOld: () => config_default2().timezones ?? [],
  formatOffset(offset2) {
    const hours = Math.floor(offset2);
    const minutesInDecimal = offset2 - hours;
    const signString = sign(offset2) >= 0 ? "+" : "-";
    const hoursString = `0${Math.abs(hours)}`.slice(-2);
    const minutesString = minutesInDecimal > 0 ? ":" + 60 * minutesInDecimal : ":00";
    return signString + hoursString + minutesString;
  },
  formatId: (id) => id.split("/").join(" - ").split("_").join(" "),
  getTimezoneById(id) {
    if (!id) {
      return;
    }
    const tzList = this.getTimeZonesOld();
    for (let i = 0; i < tzList.length; i++) {
      const currentId = tzList[i].id;
      if (currentId === id) {
        return tzList[i];
      }
    }
    return;
  },
  getTimeZoneOffsetById(id, timestamp) {
    const timeZoneInfo = tzCache.tryGet(id);
    return timeZoneInfo ? this.getUtcOffset(timeZoneInfo, timestamp) : void 0;
  },
  getTimeZoneDeclarationTuple(id, year) {
    const timeZoneInfo = tzCache.tryGet(id);
    return timeZoneInfo ? this.getTimeZoneDeclarationTupleCore(timeZoneInfo, year) : [];
  },
  getTimeZoneDeclarationTupleCore(timeZoneInfo, year) {
    const {
      offsetList
    } = timeZoneInfo;
    const {
      offsetIndexList
    } = timeZoneInfo;
    const {
      dateList
    } = timeZoneInfo;
    const tupleResult = [];
    for (let i = 0; i < dateList.length; i++) {
      const currentDate = dateList[i];
      const currentYear = new Date(currentDate).getFullYear();
      if (currentYear === year) {
        const offset2 = offsetList[offsetIndexList[i + 1]];
        tupleResult.push({
          date: currentDate,
          offset: -offset2 / 60
        });
      }
      if (currentYear > year) {
        break;
      }
    }
    return tupleResult;
  },
  getUtcOffset(timeZoneInfo, dateTimeStamp) {
    const {
      offsetList
    } = timeZoneInfo;
    const {
      offsetIndexList
    } = timeZoneInfo;
    const {
      dateList
    } = timeZoneInfo;
    const lastIntervalStartIndex = dateList.length - 1 - 1;
    let index2 = lastIntervalStartIndex;
    while (index2 >= 0 && dateTimeStamp < dateList[index2]) {
      index2--;
    }
    const offset2 = offsetList[offsetIndexList[index2 + 1]];
    return -offset2 / 60 || offset2;
  }
};
var m_utils_timezones_data_default = timeZoneDataUtils;

// node_modules/devextreme/esm/__internal/scheduler/timezones/timezone_list.js
var timezone_list_default = {
  value: ["Etc/GMT+12", "Etc/GMT+11", "Pacific/Midway", "Pacific/Niue", "Pacific/Pago_Pago", "Pacific/Samoa", "US/Samoa", "Etc/GMT+10", "HST", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Rarotonga", "Pacific/Tahiti", "US/Hawaii", "Pacific/Marquesas", "America/Adak", "America/Atka", "Etc/GMT+9", "Pacific/Gambier", "US/Aleutian", "America/Anchorage", "America/Juneau", "America/Metlakatla", "America/Nome", "America/Sitka", "America/Yakutat", "Etc/GMT+8", "Pacific/Pitcairn", "US/Alaska", "America/Creston", "America/Dawson_Creek", "America/Dawson", "America/Ensenada", "America/Fort_Nelson", "America/Hermosillo", "America/Los_Angeles", "America/Phoenix", "America/Santa_Isabel", "America/Tijuana", "America/Vancouver", "America/Whitehorse", "Canada/Pacific", "Canada/Yukon", "Etc/GMT+7", "Mexico/BajaNorte", "MST", "PST8PDT", "US/Arizona", "US/Pacific", "America/Belize", "America/Boise", "America/Cambridge_Bay", "America/Chihuahua", "America/Costa_Rica", "America/Denver", "America/Edmonton", "America/El_Salvador", "America/Guatemala", "America/Inuvik", "America/Managua", "America/Mazatlan", "America/Monterrey", "America/Ojinaga", "America/Regina", "America/Shiprock", "America/Swift_Current", "America/Tegucigalpa", "America/Yellowknife", "Canada/Mountain", "Canada/Saskatchewan", "Chile/EasterIsland", "Etc/GMT+6", "Mexico/BajaSur", "MST7MDT", "Navajo", "Pacific/Easter", "Pacific/Galapagos", "US/Mountain", "America/Atikokan", "America/Bahia_Banderas", "America/Bogota", "America/Cancun", "America/Cayman", "America/Chicago", "America/Coral_Harbour", "America/Eirunepe", "America/Guayaquil", "America/Indiana/Knox", "America/Indiana/Tell_City", "America/Jamaica", "America/Knox_IN", "America/Lima", "America/Matamoros", "America/Menominee", "America/Merida", "America/Mexico_City", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Panama", "America/Porto_Acre", "America/Rainy_River", "America/Rankin_Inlet", "America/Resolute", "America/Rio_Branco", "America/Winnipeg", "Brazil/Acre", "Canada/Central", "CST6CDT", "EST", "Etc/GMT+5", "Jamaica", "Mexico/General", "US/Central", "US/Indiana-Starke", "America/Anguilla", "America/Antigua", "America/Aruba", "America/Asuncion", "America/Barbados", "America/Blanc-Sablon", "America/Boa_Vista", "America/Campo_Grande", "America/Caracas", "America/Cuiaba", "America/Curacao", "America/Detroit", "America/Dominica", "America/Fort_Wayne", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guyana", "America/Havana", "America/Indiana/Indianapolis", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis", "America/Iqaluit", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Louisville", "America/Lower_Princes", "America/Manaus", "America/Marigot", "America/Martinique", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nipigon", "America/Pangnirtung", "America/Port_of_Spain", "America/Port-au-Prince", "America/Porto_Velho", "America/Puerto_Rico", "America/Santiago", "America/Santo_Domingo", "America/St_Barthelemy", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Thunder_Bay", "America/Toronto", "America/Tortola", "America/Virgin", "Brazil/West", "Canada/Eastern", "Chile/Continental", "Cuba", "EST5EDT", "Etc/GMT+4", "US/East-Indiana", "US/Eastern", "US/Michigan", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/ComodRivadavia", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Bahia", "America/Belem", "America/Buenos_Aires", "America/Catamarca", "America/Cayenne", "America/Cordoba", "America/Fortaleza", "America/Glace_Bay", "America/Goose_Bay", "America/Halifax", "America/Jujuy", "America/Maceio", "America/Mendoza", "America/Moncton", "America/Montevideo", "America/Paramaribo", "America/Punta_Arenas", "America/Recife", "America/Rosario", "America/Santarem", "America/Sao_Paulo", "America/Thule", "Antarctica/Palmer", "Antarctica/Rothera", "Atlantic/Bermuda", "Atlantic/Stanley", "Brazil/East", "Canada/Atlantic", "Etc/GMT+3", "America/St_Johns", "Canada/Newfoundland", "America/Godthab", "America/Miquelon", "America/Noronha", "America/Nuuk", "Atlantic/South_Georgia", "Brazil/DeNoronha", "Etc/GMT+2", "Atlantic/Cape_Verde", "Etc/GMT+1", "Africa/Abidjan", "Africa/Accra", "Africa/Bamako", "Africa/Banjul", "Africa/Bissau", "Africa/Conakry", "Africa/Dakar", "Africa/Freetown", "Africa/Lome", "Africa/Monrovia", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Sao_Tome", "Africa/Timbuktu", "America/Danmarkshavn", "America/Scoresbysund", "Atlantic/Azores", "Atlantic/Reykjavik", "Atlantic/St_Helena", "Etc/GMT-0", "Etc/GMT", "Etc/GMT+0", "Etc/GMT0", "Etc/Greenwich", "Etc/UCT", "Etc/Universal", "Etc/UTC", "Etc/Zulu", "GMT-0", "GMT", "GMT+0", "GMT0", "Greenwich", "Iceland", "UCT", "Universal", "UTC", "Zulu", "Africa/Algiers", "Africa/Bangui", "Africa/Brazzaville", "Africa/Casablanca", "Africa/Douala", "Africa/El_Aaiun", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Luanda", "Africa/Malabo", "Africa/Ndjamena", "Africa/Niamey", "Africa/Porto-Novo", "Africa/Tunis", "Atlantic/Canary", "Atlantic/Faeroe", "Atlantic/Faroe", "Atlantic/Madeira", "Eire", "Etc/GMT-1", "Europe/Belfast", "Europe/Dublin", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey", "Europe/Lisbon", "Europe/London", "GB-Eire", "GB", "Portugal", "WET", "Africa/Blantyre", "Africa/Bujumbura", "Africa/Cairo", "Africa/Ceuta", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Khartoum", "Africa/Kigali", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Tripoli", "Africa/Windhoek", "Antarctica/Troll", "Arctic/Longyearbyen", "Atlantic/Jan_Mayen", "CET", "Egypt", "Etc/GMT-2", "Europe/Amsterdam", "Europe/Andorra", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Budapest", "Europe/Busingen", "Europe/Copenhagen", "Europe/Gibraltar", "Europe/Kaliningrad", "Europe/Ljubljana", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Monaco", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Rome", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Skopje", "Europe/Stockholm", "Europe/Tirane", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zurich", "Libya", "MET", "Poland", "Africa/Addis_Ababa", "Africa/Asmara", "Africa/Asmera", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Juba", "Africa/Kampala", "Africa/Mogadishu", "Africa/Nairobi", "Antarctica/Syowa", "Asia/Aden", "Asia/Amman", "Asia/Baghdad", "Asia/Bahrain", "Asia/Beirut", "Asia/Damascus", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Istanbul", "Asia/Jerusalem", "Asia/Kuwait", "Asia/Nicosia", "Asia/Qatar", "Asia/Riyadh", "Asia/Tel_Aviv", "EET", "Etc/GMT-3", "Europe/Athens", "Europe/Bucharest", "Europe/Chisinau", "Europe/Helsinki", "Europe/Istanbul", "Europe/Kiev", "Europe/Kirov", "Europe/Mariehamn", "Europe/Minsk", "Europe/Moscow", "Europe/Nicosia", "Europe/Riga", "Europe/Simferopol", "Europe/Sofia", "Europe/Tallinn", "Europe/Tiraspol", "Europe/Uzhgorod", "Europe/Vilnius", "Europe/Zaporozhye", "Indian/Antananarivo", "Indian/Comoro", "Indian/Mayotte", "Israel", "Turkey", "W-SU", "Asia/Baku", "Asia/Dubai", "Asia/Muscat", "Asia/Tbilisi", "Asia/Yerevan", "Etc/GMT-4", "Europe/Astrakhan", "Europe/Samara", "Europe/Saratov", "Europe/Ulyanovsk", "Europe/Volgograd", "Indian/Mahe", "Indian/Mauritius", "Indian/Reunion", "Asia/Kabul", "Asia/Tehran", "Iran", "Antarctica/Mawson", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Ashkhabad", "Asia/Atyrau", "Asia/Dushanbe", "Asia/Karachi", "Asia/Oral", "Asia/Qyzylorda", "Asia/Samarkand", "Asia/Tashkent", "Asia/Yekaterinburg", "Etc/GMT-5", "Indian/Kerguelen", "Indian/Maldives", "Asia/Calcutta", "Asia/Colombo", "Asia/Kolkata", "Asia/Kathmandu", "Asia/Katmandu", "Antarctica/Vostok", "Asia/Almaty", "Asia/Bishkek", "Asia/Dacca", "Asia/Dhaka", "Asia/Kashgar", "Asia/Omsk", "Asia/Qostanay", "Asia/Thimbu", "Asia/Thimphu", "Asia/Urumqi", "Etc/GMT-6", "Indian/Chagos", "Asia/Rangoon", "Asia/Yangon", "Indian/Cocos", "Antarctica/Davis", "Asia/Bangkok", "Asia/Barnaul", "Asia/Ho_Chi_Minh", "Asia/Hovd", "Asia/Jakarta", "Asia/Krasnoyarsk", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Saigon", "Asia/Tomsk", "Asia/Vientiane", "Etc/GMT-7", "Indian/Christmas", "Antarctica/Casey", "Asia/Brunei", "Asia/Choibalsan", "Asia/Chongqing", "Asia/Chungking", "Asia/Harbin", "Asia/Hong_Kong", "Asia/Irkutsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Macao", "Asia/Macau", "Asia/Makassar", "Asia/Manila", "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Australia/Perth", "Australia/West", "Etc/GMT-8", "Hongkong", "PRC", "ROC", "Singapore", "Australia/Eucla", "Asia/Chita", "Asia/Dili", "Asia/Jayapura", "Asia/Khandyga", "Asia/Pyongyang", "Asia/Seoul", "Asia/Tokyo", "Asia/Yakutsk", "Etc/GMT-9", "Japan", "Pacific/Palau", "ROK", "Australia/Adelaide", "Australia/Broken_Hill", "Australia/Darwin", "Australia/North", "Australia/South", "Australia/Yancowinna", "Antarctica/DumontDUrville", "Asia/Ust-Nera", "Asia/Vladivostok", "Australia/ACT", "Australia/Brisbane", "Australia/Canberra", "Australia/Currie", "Australia/Hobart", "Australia/Lindeman", "Australia/Melbourne", "Australia/NSW", "Australia/Queensland", "Australia/Sydney", "Australia/Tasmania", "Australia/Victoria", "Etc/GMT-10", "Pacific/Chuuk", "Pacific/Guam", "Pacific/Port_Moresby", "Pacific/Saipan", "Pacific/Truk", "Pacific/Yap", "Australia/LHI", "Australia/Lord_Howe", "Antarctica/Macquarie", "Asia/Magadan", "Asia/Sakhalin", "Asia/Srednekolymsk", "Etc/GMT-11", "Pacific/Bougainville", "Pacific/Efate", "Pacific/Guadalcanal", "Pacific/Kosrae", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pohnpei", "Pacific/Ponape", "Antarctica/McMurdo", "Antarctica/South_Pole", "Asia/Anadyr", "Asia/Kamchatka", "Etc/GMT-12", "Kwajalein", "NZ", "Pacific/Auckland", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Nauru", "Pacific/Tarawa", "Pacific/Wake", "Pacific/Wallis", "NZ-CHAT", "Pacific/Chatham", "Etc/GMT-13", "Pacific/Apia", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Tongatapu", "Etc/GMT-14", "Pacific/Kiritimati"]
};

// node_modules/devextreme/esm/__internal/scheduler/m_utils_time_zone.js
var toMs2 = date_default.dateToMilliseconds;
var GMT = "GMT";
var offsetFormatRegexp = /^GMT(?:[+-]\d{2}:\d{2})?$/;
var createUTCDateWithLocalOffset = (date) => {
  if (!date) {
    return null;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
var createDateFromUTCWithLocalOffset = (date) => {
  const result = m_date_adapter_default(date);
  const timezoneOffsetBeforeInMin = result.getTimezoneOffset();
  result.addTime(result.getTimezoneOffset("minute"));
  result.subtractMinutes(timezoneOffsetBeforeInMin - result.getTimezoneOffset());
  return result.source;
};
var createUTCDate = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
var getTimezoneOffsetChangeInMinutes = (startDate, endDate, updatedStartDate, updatedEndDate) => getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
var getTimezoneOffsetChangeInMs = (startDate, endDate, updatedStartDate, updatedEndDate) => getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs2("minute");
var getDaylightOffset = (startDate, endDate) => new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
var getDaylightOffsetInMs = (startDate, endDate) => getDaylightOffset(startDate, endDate) * toMs2("minute");
var calculateTimezoneByValueOld = function(timezone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  const customTimezones = m_utils_timezones_data_default.getTimeZonesOld();
  if (0 === customTimezones.length) {
    return;
  }
  const dateUtc = createUTCDate(date);
  return m_utils_timezones_data_default.getTimeZoneOffsetById(timezone, dateUtc.getTime());
};
var calculateTimezoneByValueCore = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  const offset2 = getStringOffset(timeZone, date);
  if (void 0 === offset2) {
    return;
  }
  if (offset2 === GMT) {
    return 0;
  }
  const isMinus = "-" === offset2.substring(3, 4);
  const hours = offset2.substring(4, 6);
  const minutes = offset2.substring(7, 9);
  const result = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
  return isMinus ? -result : result;
};
var calculateTimezoneByValue = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  if (!timeZone) {
    return;
  }
  const isValidTimezone = timezone_list_default.value.includes(timeZone);
  if (!isValidTimezone) {
    errors_default.log("W0009", timeZone);
    return;
  }
  if (!dateUtilsTs.isValidDate(date)) {
    return;
  }
  let result = calculateTimezoneByValueOld(timeZone, date);
  if (void 0 === result) {
    result = calculateTimezoneByValueCore(timeZone, date);
  }
  return result;
};
var getStringOffset = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  let result = "";
  try {
    var _dateTimeFormat$forma;
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset"
    });
    result = (null === (_dateTimeFormat$forma = dateTimeFormat.formatToParts(date).find((_ref) => {
      let {
        type: type2
      } = _ref;
      return "timeZoneName" === type2;
    })) || void 0 === _dateTimeFormat$forma ? void 0 : _dateTimeFormat$forma.value) ?? "";
  } catch (e) {
    errors_default.log("W0009", timeZone);
    return;
  }
  const isSupportedFormat = offsetFormatRegexp.test(result);
  if (!isSupportedFormat) {
    errors_default.log("W0009", timeZone);
    return;
  }
  return result;
};
var getOffsetNamePart = (offset2) => {
  if (offset2 === GMT) {
    return `${offset2} +00:00`;
  }
  return offset2.replace(GMT, `${GMT} `);
};
var getTimezoneTitle = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  if (!dateUtilsTs.isValidDate(date)) {
    return "";
  }
  const tzNamePart = timeZone.replace(/\//g, " - ").replace(/_/g, " ");
  const offset2 = getStringOffset(timeZone, date);
  if (void 0 === offset2) {
    return;
  }
  const offsetNamePart = getOffsetNamePart(offset2);
  return `(${offsetNamePart}) ${tzNamePart}`;
};
var _getDaylightOffsetByTimezone = (startDate, endDate, timeZone) => {
  const startDayOffset = calculateTimezoneByValue(timeZone, startDate);
  const endDayOffset = calculateTimezoneByValue(timeZone, endDate);
  if (void 0 === startDayOffset || void 0 === endDayOffset) {
    return 0;
  }
  return startDayOffset - endDayOffset;
};
var getCorrectedDateByDaylightOffsets = (convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) => {
  const daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
  const daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
  const diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
  return new Date(date.getTime() - diff * toMs2("hour"));
};
var correctRecurrenceExceptionByTimezone = function(exception, exceptionByStartDate, timeZone, startDateTimeZone) {
  let isBackConversion = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
  let timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / 60;
  if (startDateTimeZone) {
    timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, startDateTimeZone);
  } else if (timeZone) {
    timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, timeZone);
  }
  return new Date(exception.getTime() + (isBackConversion ? -1 : 1) * timezoneOffset * toMs2("hour"));
};
var isTimezoneChangeInDate = (date) => {
  const startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  const endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
  return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0;
};
var getDateWithoutTimezoneChange = (date) => {
  const clonedDate = new Date(date);
  if (isTimezoneChangeInDate(clonedDate)) {
    const result = new Date(clonedDate);
    return new Date(result.setDate(result.getDate() + 1));
  }
  return clonedDate;
};
var isSameAppointmentDates = (startDate, endDate) => {
  endDate = new Date(endDate.getTime() - 1);
  return date_default.sameDate(startDate, endDate);
};
var getClientTimezoneOffset = function() {
  let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  return 6e4 * date.getTimezoneOffset();
};
var getDiffBetweenClientTimezoneOffsets = function() {
  let firstDate = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  let secondDate = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate);
};
var isEqualLocalTimeZone = function(timeZoneName) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  if (Intl) {
    const localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (localTimeZoneName === timeZoneName) {
      return true;
    }
  }
  return isEqualLocalTimeZoneByDeclaration(timeZoneName, date);
};
var hasDSTInLocalTimeZone = () => {
  const [startDate, endDate] = getExtremeDates();
  return startDate.getTimezoneOffset() !== endDate.getTimezoneOffset();
};
var getOffset = (date) => -date.getTimezoneOffset() / 60;
var getDateAndMoveHourBack = (dateStamp) => new Date(dateStamp - toMs2("hour"));
var isEqualLocalTimeZoneByDeclarationOld = (timeZoneName, date) => {
  const year = date.getFullYear();
  const configTuple = m_utils_timezones_data_default.getTimeZoneDeclarationTuple(timeZoneName, year);
  const [summerTime, winterTime] = configTuple;
  const noDSTInTargetTimeZone = configTuple.length < 2;
  if (noDSTInTargetTimeZone) {
    const targetTimeZoneOffset = m_utils_timezones_data_default.getTimeZoneOffsetById(timeZoneName, date);
    const localTimeZoneOffset = getOffset(date);
    if (targetTimeZoneOffset !== localTimeZoneOffset) {
      return false;
    }
    return !hasDSTInLocalTimeZone();
  }
  const localSummerOffset = getOffset(new Date(summerTime.date));
  const localWinterOffset = getOffset(new Date(winterTime.date));
  if (localSummerOffset !== summerTime.offset) {
    return false;
  }
  if (localSummerOffset === getOffset(getDateAndMoveHourBack(summerTime.date))) {
    return false;
  }
  if (localWinterOffset !== winterTime.offset) {
    return false;
  }
  if (localWinterOffset === getOffset(getDateAndMoveHourBack(winterTime.date))) {
    return false;
  }
  return true;
};
var isEqualLocalTimeZoneByDeclaration = (timeZoneName, date) => {
  const customTimezones = m_utils_timezones_data_default.getTimeZonesOld();
  const targetTimezoneData = customTimezones.filter((tz) => tz.id === timeZoneName);
  if (1 === targetTimezoneData.length) {
    return isEqualLocalTimeZoneByDeclarationOld(timeZoneName, date);
  }
  return false;
};
var getExtremeDates = () => {
  const nowDate = new Date(Date.now());
  const startDate = /* @__PURE__ */ new Date();
  const endDate = /* @__PURE__ */ new Date();
  startDate.setFullYear(nowDate.getFullYear(), 0, 1);
  endDate.setFullYear(nowDate.getFullYear(), 6, 1);
  return [startDate, endDate];
};
var setOffsetsToDate = (targetDate, offsetsArray) => {
  const newDateMs = offsetsArray.reduce((result, offset2) => result + offset2, targetDate.getTime());
  return new Date(newDateMs);
};
var addOffsetsWithoutDST = function(date) {
  for (var _len = arguments.length, offsets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    offsets[_key - 1] = arguments[_key];
  }
  const newDate = dateUtilsTs.addOffsets(date, offsets);
  const daylightShift = getDaylightOffsetInMs(date, newDate);
  if (!daylightShift) {
    return newDate;
  }
  const correctLocalDate = dateUtilsTs.addOffsets(newDate, [-daylightShift]);
  const daylightSecondShift = getDaylightOffsetInMs(newDate, correctLocalDate);
  return !daylightSecondShift ? correctLocalDate : newDate;
};
var getTimeZoneLabelsAsyncBatch = function() {
  let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  return macro_task_array_default.map(timezone_list_default.value, (timezoneId) => ({
    id: timezoneId,
    title: getTimezoneTitle(timezoneId, date)
  }), 20);
};
var getTimeZoneLabel = function(timezoneId) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  return {
    id: timezoneId,
    title: getTimezoneTitle(timezoneId, date)
  };
};
var getTimeZones = function() {
  let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  return timezone_list_default.value.map((timezoneId) => ({
    id: timezoneId,
    title: getTimezoneTitle(timezoneId, date),
    offset: calculateTimezoneByValue(timezoneId, date)
  }));
};
var utils = {
  getDaylightOffset,
  getDaylightOffsetInMs,
  getTimezoneOffsetChangeInMinutes,
  getTimezoneOffsetChangeInMs,
  calculateTimezoneByValue,
  getCorrectedDateByDaylightOffsets,
  isSameAppointmentDates,
  correctRecurrenceExceptionByTimezone,
  getClientTimezoneOffset,
  getDiffBetweenClientTimezoneOffsets,
  createUTCDateWithLocalOffset,
  createDateFromUTCWithLocalOffset,
  createUTCDate,
  isTimezoneChangeInDate,
  getDateWithoutTimezoneChange,
  hasDSTInLocalTimeZone,
  isEqualLocalTimeZone,
  isEqualLocalTimeZoneByDeclaration,
  setOffsetsToDate,
  addOffsetsWithoutDST,
  getTimeZoneLabelsAsyncBatch,
  getTimeZoneLabel,
  getTimeZones
};
var m_utils_time_zone_default = utils;

// node_modules/devextreme/esm/common/core/environment/time_zone_utils.js
var getTimeZones2 = m_utils_time_zone_default.getTimeZones;

// node_modules/devextreme/esm/common/core/animation/frame.js
var window4 = hasWindow() ? getWindow() : {};
var FRAME_ANIMATION_STEP_TIME = 1e3 / 60;
var request = function(callback) {
  return setTimeout(callback, 16.666666666666668);
};
var cancel = function(requestID) {
  clearTimeout(requestID);
};
var setAnimationFrameMethods = call_once_default(function() {
  const nativeRequest = window4.requestAnimationFrame || window4.webkitRequestAnimationFrame || window4.mozRequestAnimationFrame || window4.oRequestAnimationFrame || window4.msRequestAnimationFrame;
  const nativeCancel = window4.cancelAnimationFrame || window4.webkitCancelAnimationFrame || window4.mozCancelAnimationFrame || window4.oCancelAnimationFrame || window4.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
});
function requestAnimationFrame() {
  setAnimationFrameMethods();
  return request.apply(window4, arguments);
}
function cancelAnimationFrame() {
  setAnimationFrameMethods();
  cancel.apply(window4, arguments);
}

// node_modules/devextreme/esm/__internal/core/m_element.js
function getPublicElementNonJquery(element) {
  if (element && element.get) {
    return element.get(0);
  }
  return element;
}
var strategy = getPublicElementNonJquery;
function getPublicElement(element) {
  return strategy(element);
}

// node_modules/devextreme/esm/common/core/animation/translator.js
var TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
var TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
var locate = function($element) {
  $element = renderer_default($element);
  const translate = getTranslate($element);
  return {
    left: translate.x,
    top: translate.y
  };
};
function isPercentValue(value2) {
  return "string" === type(value2) && "%" === value2[value2.length - 1];
}
function cacheTranslate($element, translate) {
  if ($element.length) {
    data($element.get(0), "dxTranslator", translate);
  }
}
var clearCache = function($element) {
  if ($element.length) {
    removeData($element.get(0), "dxTranslator");
  }
};
var getTranslateCss = function(translate) {
  translate.x = translate.x || 0;
  translate.y = translate.y || 0;
  const xValueString = isPercentValue(translate.x) ? translate.x : translate.x + "px";
  const yValueString = isPercentValue(translate.y) ? translate.y : translate.y + "px";
  return "translate(" + xValueString + ", " + yValueString + ")";
};
var getTranslate = function($element) {
  let result = $element.length ? data($element.get(0), "dxTranslator") : null;
  if (!result) {
    const transformValue = $element.css("transform") || getTranslateCss({
      x: 0,
      y: 0
    });
    let matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
    const is3D = matrix && matrix[1];
    if (matrix) {
      matrix = matrix[2].split(",");
      if ("3d" === is3D) {
        matrix = matrix.slice(12, 15);
      } else {
        matrix.push(0);
        matrix = matrix.slice(4, 7);
      }
    } else {
      matrix = [0, 0, 0];
    }
    result = {
      x: parseFloat(matrix[0]),
      y: parseFloat(matrix[1]),
      z: parseFloat(matrix[2])
    };
    cacheTranslate($element, result);
  }
  return result;
};
var move = function($element, position2) {
  $element = renderer_default($element);
  const left = position2.left;
  const top = position2.top;
  let translate;
  if (void 0 === left) {
    translate = getTranslate($element);
    translate.y = top || 0;
  } else if (void 0 === top) {
    translate = getTranslate($element);
    translate.x = left || 0;
  } else {
    translate = {
      x: left || 0,
      y: top || 0,
      z: 0
    };
    cacheTranslate($element, translate);
  }
  $element.css({
    transform: getTranslateCss(translate)
  });
  if (isPercentValue(left) || isPercentValue(top)) {
    clearCache($element);
  }
};
var resetPosition = function($element, finishTransition) {
  $element = renderer_default($element);
  let originalTransition;
  const stylesConfig = {
    left: 0,
    top: 0,
    transform: "none"
  };
  if (finishTransition) {
    originalTransition = $element.css("transition");
    stylesConfig.transition = "none";
  }
  $element.css(stylesConfig);
  clearCache($element);
  if (finishTransition) {
    $element.get(0).offsetHeight;
    $element.css("transition", originalTransition);
  }
};
var parseTranslate = function(translateString) {
  let result = translateString.match(TRANSLATE_REGEX);
  if (!result || !result[1]) {
    return;
  }
  result = result[1].split(",");
  result = {
    x: parseFloat(result[0]),
    y: parseFloat(result[1]),
    z: parseFloat(result[2])
  };
  return result;
};

// node_modules/devextreme/esm/common/core/animation/easing.js
var CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
var TransitionTimingFuncMap = {
  linear: "cubic-bezier(0, 0, 1, 1)",
  swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
  "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
var polynomBezier = function(x1, y1, x2, y2) {
  const Cx = 3 * x1;
  const Bx = 3 * (x2 - x1) - Cx;
  const Ax = 1 - Cx - Bx;
  const Cy = 3 * y1;
  const By = 3 * (y2 - y1) - Cy;
  const Ay = 1 - Cy - By;
  const bezierX = function(t) {
    return t * (Cx + t * (Bx + t * Ax));
  };
  const derivativeX = function(t) {
    return Cx + t * (2 * Bx + 3 * t * Ax);
  };
  return function(t) {
    return function(t2) {
      return t2 * (Cy + t2 * (By + t2 * Ay));
    }(function(t2) {
      let x = t2;
      let i = 0;
      let z;
      while (i < 14) {
        z = bezierX(x) - t2;
        if (Math.abs(z) < 1e-3) {
          break;
        }
        x -= z / derivativeX(x);
        i++;
      }
      return x;
    }(t));
  };
};
var easing = {};
var convertTransitionTimingFuncToEasing = function(cssTransitionEasing) {
  cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
  let coeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
  let forceName;
  if (!coeffs) {
    forceName = "linear";
    coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX);
  }
  coeffs = coeffs.slice(1, 5);
  for (let i = 0; i < coeffs.length; i++) {
    coeffs[i] = parseFloat(coeffs[i]);
  }
  const easingName = forceName || "cubicbezier_" + coeffs.join("_").replace(/\./g, "p");
  if (!isFunction(easing[easingName])) {
    easing[easingName] = function(x, t, b, c, d) {
      return c * polynomBezier(coeffs[0], coeffs[1], coeffs[2], coeffs[3])(t / d) + b;
    };
  }
  return easingName;
};
function getEasing(name) {
  return easing[name];
}

// node_modules/devextreme/esm/__internal/core/utils/m_position.js
var getDefaultAlignment = (isRtlEnabled) => {
  const rtlEnabled = isRtlEnabled ?? config_default2().rtlEnabled;
  return rtlEnabled ? "right" : "left";
};
var getBoundingRect = (element) => {
  var _element$getBoundingC;
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }
  return null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
};

// node_modules/devextreme/esm/__internal/core/utils/m_browser.js
var navigator = getNavigator();
var webkitRegExp = /(webkit)[ /]([\w.]+)/;
var mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))/;
var browserFromUA = (ua) => {
  ua = ua.toLowerCase();
  const result = {};
  const matches = webkitRegExp.exec(ua) || ua.indexOf("compatible") < 0 && mozillaRegExp.exec(ua) || [];
  let browserName = matches[1];
  let browserVersion = matches[2];
  if ("webkit" === browserName) {
    result.webkit = true;
    if (ua.indexOf("chrome") >= 0 || ua.indexOf("crios") >= 0) {
      browserName = "chrome";
      browserVersion = /(?:chrome|crios)\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf("fxios") >= 0) {
      browserName = "mozilla";
      browserVersion = /fxios\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf("safari") >= 0 && /version|phantomjs/.test(ua)) {
      browserName = "safari";
      browserVersion = /(?:version|phantomjs)\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else {
      browserName = "unknown";
      browserVersion = /applewebkit\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    }
  }
  if (browserName) {
    result[browserName] = true;
    result.version = browserVersion;
  }
  return result;
};
var browser = extend({
  _fromUA: browserFromUA
}, browserFromUA(navigator.userAgent));

// node_modules/devextreme/esm/core/utils/browser.js
var browser_default = browser;

// node_modules/devextreme/esm/core/devices.js
var devices_default = m_devices_default;

// node_modules/devextreme/esm/common/core/animation/position.js
var window5 = getWindow();
var horzRe = /left|right/;
var vertRe = /top|bottom/;
var collisionRe = /fit|flip|none/;
var scaleRe = /scale\(.+?\)/;
var IS_SAFARI = browser_default.safari;
var normalizeAlign = function(raw) {
  const result = {
    h: "center",
    v: "center"
  };
  const pair = splitPair(raw);
  if (pair) {
    each(pair, function() {
      const w = String(this).toLowerCase();
      if (horzRe.test(w)) {
        result.h = w;
      } else if (vertRe.test(w)) {
        result.v = w;
      }
    });
  }
  return result;
};
var normalizeOffset = function(raw, preventRound) {
  return pairToObject(raw, preventRound);
};
var normalizeCollision = function(raw) {
  const pair = splitPair(raw);
  let h = String(pair && pair[0]).toLowerCase();
  let v = String(pair && pair[1]).toLowerCase();
  if (!collisionRe.test(h)) {
    h = "none";
  }
  if (!collisionRe.test(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
var getAlignFactor = function(align) {
  switch (align) {
    case "center":
      return 0.5;
    case "right":
    case "bottom":
      return 1;
    default:
      return 0;
  }
};
var inverseAlign = function(align) {
  switch (align) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    default:
      return align;
  }
};
var calculateOversize = function(data2, bounds) {
  let oversize = 0;
  if (data2.myLocation < bounds.min) {
    oversize += bounds.min - data2.myLocation;
  }
  if (data2.myLocation > bounds.max) {
    oversize += data2.myLocation - bounds.max;
  }
  return oversize;
};
var collisionSide = function(direction, data2, bounds) {
  if (data2.myLocation < bounds.min) {
    return "h" === direction ? "left" : "top";
  }
  if (data2.myLocation > bounds.max) {
    return "h" === direction ? "right" : "bottom";
  }
  return "none";
};
var initMyLocation = function(data2) {
  data2.myLocation = data2.atLocation + getAlignFactor(data2.atAlign) * data2.atSize - getAlignFactor(data2.myAlign) * data2.mySize + data2.offset;
};
var collisionResolvers = {
  fit: function(data2, bounds) {
    let result = false;
    if (data2.myLocation > bounds.max) {
      data2.myLocation = bounds.max;
      result = true;
    }
    if (data2.myLocation < bounds.min) {
      data2.myLocation = bounds.min;
      result = true;
    }
    data2.fit = result;
  },
  flip: function(data2, bounds) {
    data2.flip = false;
    if ("center" === data2.myAlign && "center" === data2.atAlign) {
      return;
    }
    if (data2.myLocation < bounds.min || data2.myLocation > bounds.max) {
      const inverseData = extend({}, data2, {
        myAlign: inverseAlign(data2.myAlign),
        atAlign: inverseAlign(data2.atAlign),
        offset: -data2.offset
      });
      initMyLocation(inverseData);
      inverseData.oversize = calculateOversize(inverseData, bounds);
      if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || data2.oversize > inverseData.oversize) {
        data2.myLocation = inverseData.myLocation;
        data2.oversize = inverseData.oversize;
        data2.flip = true;
      }
    }
  },
  flipfit: function(data2, bounds) {
    this.flip(data2, bounds);
    this.fit(data2, bounds);
  },
  none: function(data2) {
    data2.oversize = 0;
  }
};
var scrollbarWidth;
var calculateScrollbarWidth = function() {
  const $scrollDiv = renderer_default("<div>").css({
    width: 100,
    height: 100,
    overflow: "scroll",
    position: "absolute",
    top: -9999
  }).appendTo(renderer_default("body"));
  const result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
  $scrollDiv.remove();
  scrollbarWidth = result;
};
var defaultPositionResult = {
  h: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  },
  v: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  }
};
var calculatePosition = function(what, options) {
  const $what = renderer_default(what);
  const currentOffset = $what.offset();
  const result = extend(true, {}, defaultPositionResult, {
    h: {
      location: currentOffset.left
    },
    v: {
      location: currentOffset.top
    }
  });
  if (!options) {
    return result;
  }
  const my = normalizeAlign(options.my);
  const at = normalizeAlign(options.at);
  let of = renderer_default(options.of).length && options.of || window5;
  const offset2 = normalizeOffset(options.offset, options.precise);
  const collision = normalizeCollision(options.collision);
  const boundary = options.boundary;
  const boundaryOffset = normalizeOffset(options.boundaryOffset, options.precise);
  const h = {
    mySize: getOuterWidth($what),
    myAlign: my.h,
    atAlign: at.h,
    offset: offset2.h,
    collision: collision.h,
    boundaryOffset: boundaryOffset.h
  };
  const v = {
    mySize: getOuterHeight($what),
    myAlign: my.v,
    atAlign: at.v,
    offset: offset2.v,
    collision: collision.v,
    boundaryOffset: boundaryOffset.v
  };
  if (of.preventDefault) {
    h.atLocation = of.pageX;
    v.atLocation = of.pageY;
    h.atSize = 0;
    v.atSize = 0;
  } else {
    of = renderer_default(of);
    if (isWindow(of[0])) {
      h.atLocation = of.scrollLeft();
      v.atLocation = of.scrollTop();
      if ("phone" === devices_default.real().deviceType && of[0].visualViewport) {
        h.atLocation = Math.max(h.atLocation, of[0].visualViewport.offsetLeft);
        v.atLocation = Math.max(v.atLocation, of[0].visualViewport.offsetTop);
        h.atSize = of[0].visualViewport.width;
        v.atSize = of[0].visualViewport.height;
      } else {
        h.atSize = of[0].innerWidth > of[0].outerWidth ? of[0].innerWidth : getWidth(of);
        v.atSize = of[0].innerHeight > of[0].outerHeight || IS_SAFARI ? of[0].innerHeight : getHeight(of);
      }
    } else if (9 === of[0].nodeType) {
      h.atLocation = 0;
      v.atLocation = 0;
      h.atSize = getWidth(of);
      v.atSize = getHeight(of);
    } else {
      const ofRect = getBoundingRect(of.get(0));
      const o = getOffsetWithoutScale(of);
      h.atLocation = o.left;
      v.atLocation = o.top;
      h.atSize = Math.max(ofRect.width, getOuterWidth(of));
      v.atSize = Math.max(ofRect.height, getOuterHeight(of));
    }
  }
  initMyLocation(h);
  initMyLocation(v);
  const bounds = function() {
    const win = renderer_default(window5);
    const windowWidth = getWidth(win);
    const windowHeight = getHeight(win);
    let left = win.scrollLeft();
    let top = win.scrollTop();
    const documentElement = dom_adapter_default.getDocumentElement();
    const hZoomLevel = touch ? documentElement.clientWidth / windowWidth : 1;
    const vZoomLevel = touch ? documentElement.clientHeight / windowHeight : 1;
    if (void 0 === scrollbarWidth) {
      calculateScrollbarWidth();
    }
    let boundaryWidth = windowWidth;
    let boundaryHeight = windowHeight;
    if (boundary && !isWindow(boundary)) {
      const $boundary = renderer_default(boundary);
      const boundaryPosition = $boundary.offset();
      left = boundaryPosition.left;
      top = boundaryPosition.top;
      boundaryWidth = getWidth($boundary);
      boundaryHeight = getHeight($boundary);
    }
    return {
      h: {
        min: left + h.boundaryOffset,
        max: left + boundaryWidth / hZoomLevel - h.mySize - h.boundaryOffset
      },
      v: {
        min: top + v.boundaryOffset,
        max: top + boundaryHeight / vZoomLevel - v.mySize - v.boundaryOffset
      }
    };
  }();
  h.oversize = calculateOversize(h, bounds.h);
  v.oversize = calculateOversize(v, bounds.v);
  h.collisionSide = collisionSide("h", h, bounds.h);
  v.collisionSide = collisionSide("v", v, bounds.v);
  if (collisionResolvers[h.collision]) {
    collisionResolvers[h.collision](h, bounds.h);
  }
  if (collisionResolvers[v.collision]) {
    collisionResolvers[v.collision](v, bounds.v);
  }
  const preciser = function(number) {
    return options.precise ? number : Math.round(number);
  };
  extend(true, result, {
    h: {
      location: preciser(h.myLocation),
      oversize: preciser(h.oversize),
      fit: h.fit,
      flip: h.flip,
      collisionSide: h.collisionSide
    },
    v: {
      location: preciser(v.myLocation),
      oversize: preciser(v.oversize),
      fit: v.fit,
      flip: v.flip,
      collisionSide: v.collisionSide
    },
    precise: options.precise
  });
  return result;
};
var setScaleProperty = function(element, scale, styleAttr, isEmpty) {
  const stylePropIsValid = isDefined(element.style) && !dom_adapter_default.isNode(element.style);
  const newStyleValue = isEmpty ? styleAttr.replace(scale, "") : styleAttr;
  if (stylePropIsValid) {
    setStyle(element, newStyleValue, false);
  } else {
    const styleAttributeNode = dom_adapter_default.createAttribute("style");
    styleAttributeNode.value = newStyleValue;
    element.setAttributeNode(styleAttributeNode);
  }
};
var getOffsetWithoutScale = function($startElement) {
  var _currentElement$getAt, _style$match;
  let $currentElement = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : $startElement;
  const currentElement = $currentElement.get(0);
  if (!currentElement) {
    return $startElement.offset();
  }
  const style = (null === (_currentElement$getAt = currentElement.getAttribute) || void 0 === _currentElement$getAt ? void 0 : _currentElement$getAt.call(currentElement, "style")) || "";
  const scale = null === (_style$match = style.match(scaleRe)) || void 0 === _style$match ? void 0 : _style$match[0];
  let offset2;
  if (scale) {
    setScaleProperty(currentElement, scale, style, true);
    offset2 = getOffsetWithoutScale($startElement, $currentElement.parent());
    setScaleProperty(currentElement, scale, style, false);
  } else {
    offset2 = getOffsetWithoutScale($startElement, $currentElement.parent());
  }
  return offset2;
};
var position = function(what, options) {
  const $what = renderer_default(what);
  if (!options) {
    return $what.offset();
  }
  resetPosition($what, true);
  const offset2 = getOffsetWithoutScale($what);
  const targetPosition = options.h && options.v ? options : calculatePosition($what, options);
  const preciser = function(number) {
    return options.precise ? number : Math.round(number);
  };
  move($what, {
    left: targetPosition.h.location - preciser(offset2.left),
    top: targetPosition.v.location - preciser(offset2.top)
  });
  return targetPosition;
};
var offset = function(element) {
  element = renderer_default(element).get(0);
  if (isWindow(element)) {
    return null;
  } else if (element && "pageY" in element && "pageX" in element) {
    return {
      top: element.pageY,
      left: element.pageX
    };
  }
  return renderer_default(element).offset();
};
if (!position.inverseAlign) {
  position.inverseAlign = inverseAlign;
}
if (!position.normalizeAlign) {
  position.normalizeAlign = normalizeAlign;
}
var position_default = {
  calculateScrollbarWidth,
  calculate: calculatePosition,
  setup: position,
  offset
};

// node_modules/devextreme/esm/__internal/events/core/m_event_registrator.js
var registerEvent = function(name, eventObject) {
  const strategy2 = {};
  if ("noBubble" in eventObject) {
    strategy2.noBubble = eventObject.noBubble;
  }
  if ("bindType" in eventObject) {
    strategy2.bindType = eventObject.bindType;
  }
  if ("delegateType" in eventObject) {
    strategy2.delegateType = eventObject.delegateType;
  }
  each(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], (_, methodName) => {
    if (!eventObject[methodName]) {
      return;
    }
    strategy2[methodName] = function() {
      const args = [].slice.call(arguments);
      args.unshift(this);
      return eventObject[methodName].apply(eventObject, args);
    };
  });
  event_registrator_callbacks_default.fire(name, strategy2);
};
registerEvent.callbacks = event_registrator_callbacks_default;
var m_event_registrator_default = registerEvent;

// node_modules/devextreme/esm/__internal/events/m_remove.js
var removeEvent = "dxremove";
var eventPropName = "dxRemoveEvent";
beforeCleanData((elements) => {
  elements = [].slice.call(elements);
  for (let i = 0; i < elements.length; i++) {
    const $element = renderer_default(elements[i]);
    if ($element.prop(eventPropName)) {
      $element[0][eventPropName] = null;
      m_events_engine_default.triggerHandler($element, "dxremove");
    }
  }
});
m_event_registrator_default("dxremove", {
  noBubble: true,
  setup(element) {
    renderer_default(element).prop(eventPropName, true);
  }
});

// node_modules/devextreme/esm/ui/widget/selectors.js
var focusableFn = function(element, tabIndex) {
  if (!visible(element)) {
    return false;
  }
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !isNaN(tabIndex);
  const isDisabled = element.disabled;
  const isDefaultFocus = /^(input|select|textarea|button|object|iframe)$/.test(nodeName);
  const isHyperlink = "a" === nodeName;
  let isFocusable;
  const isContentEditable = element.isContentEditable;
  if (isDefaultFocus || isContentEditable) {
    isFocusable = !isDisabled;
  } else if (isHyperlink) {
    isFocusable = element.href || isTabIndexNotNaN;
  } else {
    isFocusable = isTabIndexNotNaN;
  }
  return isFocusable;
};
function visible(element) {
  const $element = renderer_default(element);
  return $element.is(":visible") && "hidden" !== $element.css("visibility") && "hidden" !== $element.parents().css("visibility");
}
var focusable = function(index2, element) {
  return focusableFn(element, renderer_default(element).attr("tabIndex"));
};
var tabbable = function(index2, element) {
  const tabIndex = renderer_default(element).attr("tabIndex");
  return (isNaN(tabIndex) || tabIndex >= 0) && focusableFn(element, tabIndex);
};
var focused = function($element) {
  const element = renderer_default($element).get(0);
  return dom_adapter_default.getActiveElement(element) === element;
};

// node_modules/devextreme/esm/__internal/events/utils/m_add_namespace.js
var addNamespace = (eventNames, namespace) => {
  if (!namespace) {
    throw errors_default.Error("E0017");
  }
  if (Array.isArray(eventNames)) {
    return eventNames.map((eventName) => addNamespace(eventName, namespace)).join(" ");
  }
  if (-1 !== eventNames.indexOf(" ")) {
    return addNamespace(eventNames.split(/\s+/g), namespace);
  }
  return `${eventNames}.${namespace}`;
};
var m_add_namespace_default = addNamespace;

// node_modules/devextreme/esm/__internal/events/utils/index.js
var KEY_MAP = {
  backspace: "backspace",
  tab: "tab",
  enter: "enter",
  escape: "escape",
  pageup: "pageUp",
  pagedown: "pageDown",
  end: "end",
  home: "home",
  arrowleft: "leftArrow",
  arrowup: "upArrow",
  arrowright: "rightArrow",
  arrowdown: "downArrow",
  delete: "del",
  " ": "space",
  f: "F",
  a: "A",
  "*": "asterisk",
  "-": "minus",
  alt: "alt",
  control: "control",
  shift: "shift"
};
var LEGACY_KEY_CODES = {
  8: "backspace",
  9: "tab",
  13: "enter",
  27: "escape",
  33: "pageUp",
  34: "pageDown",
  35: "end",
  36: "home",
  37: "leftArrow",
  38: "upArrow",
  39: "rightArrow",
  40: "downArrow",
  46: "del",
  32: "space",
  70: "F",
  65: "A",
  106: "asterisk",
  109: "minus",
  189: "minus",
  173: "minus",
  16: "shift",
  17: "control",
  18: "alt"
};
var EVENT_SOURCES_REGEX = {
  dx: /^dx/i,
  mouse: /(mouse|wheel)/i,
  touch: /^touch/i,
  keyboard: /^key/i,
  pointer: /^(ms)?pointer/i
};
var eventSource = (_ref) => {
  let {
    type: type2
  } = _ref;
  let result = "other";
  each(EVENT_SOURCES_REGEX, function(key) {
    if (this.test(type2)) {
      result = key;
      return false;
    }
  });
  return result;
};
var fixMethod = (e) => e;
var getEvent = (originalEvent) => m_events_engine_default.Event(originalEvent, originalEvent);
var copyEvent = (originalEvent) => fixMethod(getEvent(originalEvent), originalEvent);
var isDxEvent = (e) => "dx" === eventSource(e);
var isNativeMouseEvent = (e) => "mouse" === eventSource(e);
var isNativeTouchEvent = (e) => "touch" === eventSource(e);
var isPointerEvent = (e) => "pointer" === eventSource(e);
var isMouseEvent = (e) => isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "mouse" === e.pointerType;
var isDxMouseWheelEvent = (e) => e && "dxmousewheel" === e.type;
var isTouchEvent = (e) => isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "touch" === e.pointerType;
var isFakeClickEvent = (_ref2) => {
  let {
    screenX,
    offsetX,
    pageX
  } = _ref2;
  return 0 === screenX && !offsetX && 0 === pageX;
};
var eventData = (_ref3) => {
  let {
    pageX,
    pageY,
    timeStamp
  } = _ref3;
  return {
    x: pageX,
    y: pageY,
    time: timeStamp
  };
};
var eventDelta = (from, to) => ({
  x: to.x - from.x,
  y: to.y - from.y,
  time: to.time - from.time || 1
});
var hasTouches = (e) => {
  const {
    originalEvent,
    pointers
  } = e;
  if (isNativeTouchEvent(e)) {
    return (originalEvent.touches || []).length;
  }
  if (isDxEvent(e)) {
    return (pointers || []).length;
  }
  return 0;
};
var skipEvents = false;
var needSkipEvent = (e) => {
  if (skipEvents) {
    return true;
  }
  const {
    target
  } = e;
  const $target = renderer_default(target);
  const isContentEditable = (null === target || void 0 === target ? void 0 : target.isContentEditable) || (null === target || void 0 === target ? void 0 : target.hasAttribute("contenteditable"));
  const touchInEditable = $target.is("input, textarea, select") || isContentEditable;
  if (isDxMouseWheelEvent(e)) {
    const isTextArea = $target.is("textarea") && $target.hasClass("dx-texteditor-input");
    if (isTextArea || isContentEditable) {
      return false;
    }
    const isInputFocused = $target.is("input[type='number'], textarea, select") && $target.is(":focus");
    return isInputFocused;
  }
  if (isMouseEvent(e)) {
    return touchInEditable || e.which > 1;
  }
  if (isTouchEvent(e)) {
    return touchInEditable && focused($target);
  }
};
var createEvent = (originalEvent, args) => {
  const event = copyEvent(originalEvent);
  if (args) {
    extend(event, args);
  }
  return event;
};
var fireEvent = (props) => {
  const {
    originalEvent,
    delegateTarget
  } = props;
  const event = createEvent(originalEvent, props);
  m_events_engine_default.trigger(delegateTarget || event.target, event);
  return event;
};
var normalizeKeyName = (_ref4) => {
  let {
    key,
    which
  } = _ref4;
  const normalizedKey = KEY_MAP[null === key || void 0 === key ? void 0 : key.toLowerCase()] || key;
  const normalizedKeyFromWhich = LEGACY_KEY_CODES[which];
  if (normalizedKeyFromWhich && normalizedKey === key) {
    return normalizedKeyFromWhich;
  }
  if (!normalizedKey && which) {
    return String.fromCharCode(which);
  }
  return normalizedKey;
};
var getChar = (_ref5) => {
  let {
    key,
    which
  } = _ref5;
  return key || String.fromCharCode(which);
};
var addNamespace2 = m_add_namespace_default;
var isCommandKeyPressed = (_ref6) => {
  let {
    ctrlKey,
    metaKey
  } = _ref6;
  return ctrlKey || metaKey;
};

// node_modules/devextreme/esm/common/core/animation/fx.js
var window6 = getWindow();
var removeEventName = addNamespace2(removeEvent, "dxFX");
var RELATIVE_VALUE_REGEX = /^([+-])=(.*)/i;
var TransitionAnimationStrategy = {
  initAnimation: function($element, config) {
    $element.css({
      transitionProperty: "none"
    });
    if ("string" === typeof config.from) {
      $element.addClass(config.from);
    } else {
      setProps($element, config.from);
    }
    const that = this;
    const deferred = new Deferred();
    const cleanupWhen = config.cleanupWhen;
    config.transitionAnimation = {
      deferred,
      finish: function() {
        that._finishTransition($element);
        if (cleanupWhen) {
          when(deferred, cleanupWhen).always(function() {
            that._cleanup($element, config);
          });
        } else {
          that._cleanup($element, config);
        }
        deferred.resolveWith($element, [config, $element]);
      }
    };
    this._completeAnimationCallback($element, config).done(function() {
      config.transitionAnimation.finish();
    }).fail(function() {
      deferred.rejectWith($element, [config, $element]);
    });
    if (!config.duration) {
      config.transitionAnimation.finish();
    }
    $element.css("transform");
  },
  animate: function($element, config) {
    this._startAnimation($element, config);
    return config.transitionAnimation.deferred.promise();
  },
  _completeAnimationCallback: function($element, config) {
    const that = this;
    const startTime = Date.now() + config.delay;
    const deferred = new Deferred();
    const transitionEndFired = new Deferred();
    const simulatedTransitionEndFired = new Deferred();
    let simulatedEndEventTimer;
    const transitionEndEventFullName = m_support_default.transitionEndEventName() + ".dxFX";
    config.transitionAnimation.cleanup = function() {
      clearTimeout(simulatedEndEventTimer);
      clearTimeout(waitForJSCompleteTimer);
      m_events_engine_default.off($element, transitionEndEventFullName);
      m_events_engine_default.off($element, removeEventName);
    };
    m_events_engine_default.one($element, transitionEndEventFullName, function() {
      if (Date.now() - startTime >= config.duration) {
        transitionEndFired.reject();
      }
    });
    m_events_engine_default.off($element, removeEventName);
    m_events_engine_default.on($element, removeEventName, function() {
      that.stop($element, config);
      deferred.reject();
    });
    const waitForJSCompleteTimer = setTimeout(function() {
      simulatedEndEventTimer = setTimeout(function() {
        simulatedTransitionEndFired.reject();
      }, config.duration + config.delay + fx._simulatedTransitionEndDelay);
      when(transitionEndFired, simulatedTransitionEndFired).fail(function() {
        deferred.resolve();
      }.bind(this));
    });
    return deferred.promise();
  },
  _startAnimation: function($element, config) {
    $element.css({
      transitionProperty: "all",
      transitionDelay: config.delay + "ms",
      transitionDuration: config.duration + "ms",
      transitionTimingFunction: config.easing
    });
    if ("string" === typeof config.to) {
      $element[0].className += " " + config.to;
    } else if (config.to) {
      setProps($element, config.to);
    }
  },
  _finishTransition: function($element) {
    $element.css("transition", "none");
  },
  _cleanup: function($element, config) {
    config.transitionAnimation.cleanup();
    if ("string" === typeof config.from) {
      $element.removeClass(config.from);
      $element.removeClass(config.to);
    }
  },
  stop: function($element, config, jumpToEnd) {
    if (!config) {
      return;
    }
    if (jumpToEnd) {
      config.transitionAnimation.finish();
    } else {
      if (isPlainObject(config.to)) {
        each(config.to, function(key) {
          $element.css(key, $element.css(key));
        });
      }
      this._finishTransition($element);
      this._cleanup($element, config);
    }
  }
};
var FrameAnimationStrategy = {
  initAnimation: function($element, config) {
    setProps($element, config.from);
  },
  animate: function($element, config) {
    const deferred = new Deferred();
    const that = this;
    if (!config) {
      return deferred.reject().promise();
    }
    each(config.to, function(prop) {
      if (void 0 === config.from[prop]) {
        config.from[prop] = that._normalizeValue($element.css(prop));
      }
    });
    if (config.to.transform) {
      config.from.transform = that._parseTransform(config.from.transform);
      config.to.transform = that._parseTransform(config.to.transform);
    }
    config.frameAnimation = {
      to: config.to,
      from: config.from,
      currentValue: config.from,
      easing: convertTransitionTimingFuncToEasing(config.easing),
      duration: config.duration,
      startTime: (/* @__PURE__ */ new Date()).valueOf(),
      finish: function() {
        this.currentValue = this.to;
        this.draw();
        cancelAnimationFrame(config.frameAnimation.animationFrameId);
        deferred.resolve();
      },
      draw: function() {
        if (config.draw) {
          config.draw(this.currentValue);
          return;
        }
        const currentValue = extend({}, this.currentValue);
        if (currentValue.transform) {
          currentValue.transform = map(currentValue.transform, function(value2, prop) {
            if ("translate" === prop) {
              return getTranslateCss(value2);
            } else if ("scale" === prop) {
              return "scale(" + value2 + ")";
            } else if ("rotate" === prop.substr(0, prop.length - 1)) {
              return prop + "(" + value2 + "deg)";
            }
          }).join(" ");
        }
        $element.css(currentValue);
      }
    };
    if (config.delay) {
      config.frameAnimation.startTime += config.delay;
      config.frameAnimation.delayTimeout = setTimeout(function() {
        that._startAnimation($element, config);
      }, config.delay);
    } else {
      that._startAnimation($element, config);
    }
    return deferred.promise();
  },
  _startAnimation: function($element, config) {
    m_events_engine_default.off($element, removeEventName);
    m_events_engine_default.on($element, removeEventName, function() {
      if (config.frameAnimation) {
        cancelAnimationFrame(config.frameAnimation.animationFrameId);
      }
    });
    this._animationStep($element, config);
  },
  _parseTransform: function(transformString) {
    const result = {};
    each(transformString.match(/\w+\d*\w*\([^)]*\)\s*/g), function(i, part) {
      const translateData = parseTranslate(part);
      const scaleData = part.match(/scale\((.+?)\)/);
      const rotateData = part.match(/(rotate.)\((.+)deg\)/);
      if (translateData) {
        result.translate = translateData;
      }
      if (scaleData && scaleData[1]) {
        result.scale = parseFloat(scaleData[1]);
      }
      if (rotateData && rotateData[1]) {
        result[rotateData[1]] = parseFloat(rotateData[2]);
      }
    });
    return result;
  },
  stop: function($element, config, jumpToEnd) {
    const frameAnimation = config && config.frameAnimation;
    if (!frameAnimation) {
      return;
    }
    cancelAnimationFrame(frameAnimation.animationFrameId);
    clearTimeout(frameAnimation.delayTimeout);
    if (jumpToEnd) {
      frameAnimation.finish();
    }
    delete config.frameAnimation;
  },
  _animationStep: function($element, config) {
    const frameAnimation = config && config.frameAnimation;
    if (!frameAnimation) {
      return;
    }
    const now = (/* @__PURE__ */ new Date()).valueOf();
    if (now >= frameAnimation.startTime + frameAnimation.duration) {
      frameAnimation.finish();
      return;
    }
    frameAnimation.currentValue = this._calcStepValue(frameAnimation, now - frameAnimation.startTime);
    frameAnimation.draw();
    const that = this;
    frameAnimation.animationFrameId = requestAnimationFrame(function() {
      that._animationStep($element, config);
    });
  },
  _calcStepValue: function(frameAnimation, currentDuration) {
    const calcValueRecursively = function(from, to) {
      const result = Array.isArray(to) ? [] : {};
      each(to, function(propName, endPropValue) {
        if ("string" === typeof endPropValue && false === parseFloat(endPropValue)) {
          return true;
        }
        result[propName] = "object" === typeof endPropValue ? calcValueRecursively(from[propName], endPropValue) : function(propName2) {
          const x = currentDuration / frameAnimation.duration;
          const t = currentDuration;
          const b = 1 * from[propName2];
          const c = to[propName2] - from[propName2];
          const d = frameAnimation.duration;
          return getEasing(frameAnimation.easing)(x, t, b, c, d);
        }(propName);
      });
      return result;
    };
    return calcValueRecursively(frameAnimation.from, frameAnimation.to);
  },
  _normalizeValue: function(value2) {
    const numericValue = parseFloat(value2);
    if (false === numericValue) {
      return value2;
    }
    return numericValue;
  }
};
var FallbackToNoAnimationStrategy = {
  initAnimation: function() {
  },
  animate: function() {
    return new Deferred().resolve().promise();
  },
  stop: noop,
  isSynchronous: true
};
var getAnimationStrategy = function(config) {
  config = config || {};
  const animationStrategies = {
    transition: m_support_default.transition() ? TransitionAnimationStrategy : FrameAnimationStrategy,
    frame: FrameAnimationStrategy,
    noAnimation: FallbackToNoAnimationStrategy
  };
  let strategy2 = config.strategy || "transition";
  if ("css" === config.type && !m_support_default.transition()) {
    strategy2 = "noAnimation";
  }
  return animationStrategies[strategy2];
};
var baseConfigValidator = function(config, animationType, validate, typeMessage) {
  each(["from", "to"], function() {
    if (!validate(config[this])) {
      throw errors_default.Error("E0010", animationType, this, typeMessage);
    }
  });
};
var isObjectConfigValidator = function(config, animationType) {
  return baseConfigValidator(config, animationType, function(target) {
    return isPlainObject(target);
  }, "a plain object");
};
var isStringConfigValidator = function(config, animationType) {
  return baseConfigValidator(config, animationType, function(target) {
    return "string" === typeof target;
  }, "a string");
};
var CustomAnimationConfigurator = {
  setup: function() {
  }
};
var CssAnimationConfigurator = {
  validateConfig: function(config) {
    isStringConfigValidator(config, "css");
  },
  setup: function() {
  }
};
var positionAliases = {
  top: {
    my: "bottom center",
    at: "top center"
  },
  bottom: {
    my: "top center",
    at: "bottom center"
  },
  right: {
    my: "left center",
    at: "right center"
  },
  left: {
    my: "right center",
    at: "left center"
  }
};
var SlideAnimationConfigurator = {
  validateConfig: function(config) {
    isObjectConfigValidator(config, "slide");
  },
  setup: function($element, config) {
    const location = locate($element);
    if ("slide" !== config.type) {
      const positioningConfig = "slideIn" === config.type ? config.from : config.to;
      positioningConfig.position = extend({
        of: window6
      }, positionAliases[config.direction]);
      setupPosition($element, positioningConfig);
    }
    this._setUpConfig(location, config.from);
    this._setUpConfig(location, config.to);
    clearCache($element);
  },
  _setUpConfig: function(location, config) {
    config.left = "left" in config ? config.left : "+=0";
    config.top = "top" in config ? config.top : "+=0";
    this._initNewPosition(location, config);
  },
  _initNewPosition: function(location, config) {
    const position2 = {
      left: config.left,
      top: config.top
    };
    delete config.left;
    delete config.top;
    let relativeValue = this._getRelativeValue(position2.left);
    if (void 0 !== relativeValue) {
      position2.left = relativeValue + location.left;
    } else {
      config.left = 0;
    }
    relativeValue = this._getRelativeValue(position2.top);
    if (void 0 !== relativeValue) {
      position2.top = relativeValue + location.top;
    } else {
      config.top = 0;
    }
    config.transform = getTranslateCss({
      x: position2.left,
      y: position2.top
    });
  },
  _getRelativeValue: function(value2) {
    let relativeValue;
    if ("string" === typeof value2 && (relativeValue = RELATIVE_VALUE_REGEX.exec(value2))) {
      return parseInt(relativeValue[1] + "1") * relativeValue[2];
    }
  }
};
var FadeAnimationConfigurator = {
  setup: function($element, config) {
    const from = config.from;
    const to = config.to;
    const defaultFromOpacity = "fadeOut" === config.type ? 1 : 0;
    const defaultToOpacity = "fadeOut" === config.type ? 0 : 1;
    let fromOpacity = isPlainObject(from) ? String(from.opacity ?? defaultFromOpacity) : String(from);
    let toOpacity = isPlainObject(to) ? String(to.opacity ?? defaultToOpacity) : String(to);
    if (!config.skipElementInitialStyles) {
      fromOpacity = $element.css("opacity");
    }
    switch (config.type) {
      case "fadeIn":
        toOpacity = 1;
        break;
      case "fadeOut":
        toOpacity = 0;
    }
    config.from = {
      visibility: "visible",
      opacity: fromOpacity
    };
    config.to = {
      opacity: toOpacity
    };
  }
};
var PopAnimationConfigurator = {
  validateConfig: function(config) {
    isObjectConfigValidator(config, "pop");
  },
  setup: function($element, config) {
    const from = config.from;
    const to = config.to;
    const fromOpacity = "opacity" in from ? from.opacity : $element.css("opacity");
    const toOpacity = "opacity" in to ? to.opacity : 1;
    const fromScale = "scale" in from ? from.scale : 0;
    const toScale = "scale" in to ? to.scale : 1;
    config.from = {
      opacity: fromOpacity
    };
    const translate = getTranslate($element);
    config.from.transform = this._getCssTransform(translate, fromScale);
    config.to = {
      opacity: toOpacity
    };
    config.to.transform = this._getCssTransform(translate, toScale);
  },
  _getCssTransform: function(translate, scale) {
    return getTranslateCss(translate) + "scale(" + scale + ")";
  }
};
var animationConfigurators = {
  custom: CustomAnimationConfigurator,
  slide: SlideAnimationConfigurator,
  slideIn: SlideAnimationConfigurator,
  slideOut: SlideAnimationConfigurator,
  fade: FadeAnimationConfigurator,
  fadeIn: FadeAnimationConfigurator,
  fadeOut: FadeAnimationConfigurator,
  pop: PopAnimationConfigurator,
  css: CssAnimationConfigurator
};
var getAnimationConfigurator = function(config) {
  const result = animationConfigurators[config.type];
  if (!result) {
    throw errors_default.Error("E0011", config.type);
  }
  return result;
};
var defaultJSConfig = {
  type: "custom",
  from: {},
  to: {},
  duration: 400,
  start: noop,
  complete: noop,
  easing: "ease",
  delay: 0
};
var defaultCssConfig = {
  duration: 400,
  easing: "ease",
  delay: 0
};
function setupAnimationOnElement() {
  const $element = this.element;
  const config = this.config;
  setupPosition($element, config.from);
  setupPosition($element, config.to);
  this.configurator.setup($element, config);
  $element.data("dxAnimData", this);
  if (fx.off) {
    config.duration = 0;
    config.delay = 0;
  }
  this.strategy.initAnimation($element, config);
  if (config.start) {
    const element = getPublicElement($element);
    config.start.apply(this, [element, config]);
  }
}
var onElementAnimationComplete = function(animation2) {
  const $element = animation2.element;
  const config = animation2.config;
  $element.removeData("dxAnimData");
  if (config.complete) {
    const element = getPublicElement($element);
    config.complete.apply(this, [element, config]);
  }
  animation2.deferred.resolveWith(this, [$element, config]);
};
var startAnimationOnElement = function() {
  const animation2 = this;
  const $element = animation2.element;
  const config = animation2.config;
  animation2.isStarted = true;
  return animation2.strategy.animate($element, config).done(function() {
    onElementAnimationComplete(animation2);
  }).fail(function() {
    animation2.deferred.rejectWith(this, [$element, config]);
  });
};
var stopAnimationOnElement = function(jumpToEnd) {
  const animation2 = this;
  const $element = animation2.element;
  const config = animation2.config;
  clearTimeout(animation2.startTimeout);
  if (!animation2.isStarted) {
    animation2.start();
  }
  animation2.strategy.stop($element, config, jumpToEnd);
};
var scopedRemoveEvent = addNamespace2(removeEvent, "dxFXStartAnimation");
var subscribeToRemoveEvent = function(animation2) {
  m_events_engine_default.off(animation2.element, scopedRemoveEvent);
  m_events_engine_default.on(animation2.element, scopedRemoveEvent, function() {
    fx.stop(animation2.element);
  });
  animation2.deferred.always(function() {
    m_events_engine_default.off(animation2.element, scopedRemoveEvent);
  });
};
var createAnimation = function(element, initialConfig) {
  const defaultConfig = "css" === initialConfig.type ? defaultCssConfig : defaultJSConfig;
  const config = extend(true, {}, defaultConfig, initialConfig);
  const configurator = getAnimationConfigurator(config);
  const strategy2 = getAnimationStrategy(config);
  const animation2 = {
    element: renderer_default(element),
    config,
    configurator,
    strategy: strategy2,
    isSynchronous: strategy2.isSynchronous,
    setup: setupAnimationOnElement,
    start: startAnimationOnElement,
    stop: stopAnimationOnElement,
    deferred: new Deferred()
  };
  if (isFunction(configurator.validateConfig)) {
    configurator.validateConfig(config);
  }
  subscribeToRemoveEvent(animation2);
  return animation2;
};
var animate = function(element, config) {
  const $element = renderer_default(element);
  if (!$element.length) {
    return new Deferred().resolve().promise();
  }
  const animation2 = createAnimation($element, config);
  pushInAnimationQueue($element, animation2);
  return animation2.deferred.promise();
};
function pushInAnimationQueue($element, animation2) {
  const queueData = getAnimQueueData($element);
  writeAnimQueueData($element, queueData);
  queueData.push(animation2);
  if (!isAnimating($element)) {
    shiftFromAnimationQueue($element, queueData);
  }
}
function getAnimQueueData($element) {
  return $element.data("dxAnimQueue") || [];
}
function writeAnimQueueData($element, queueData) {
  $element.data("dxAnimQueue", queueData);
}
var destroyAnimQueueData = function($element) {
  $element.removeData("dxAnimQueue");
};
function isAnimating($element) {
  return !!$element.data("dxAnimData");
}
function shiftFromAnimationQueue($element, queueData) {
  queueData = getAnimQueueData($element);
  if (!queueData.length) {
    return;
  }
  const animation2 = queueData.shift();
  if (0 === queueData.length) {
    destroyAnimQueueData($element);
  }
  executeAnimation(animation2).done(function() {
    if (!isAnimating($element)) {
      shiftFromAnimationQueue($element);
    }
  });
}
function executeAnimation(animation2) {
  animation2.setup();
  if (fx.off || animation2.isSynchronous) {
    animation2.start();
  } else {
    animation2.startTimeout = setTimeout(function() {
      animation2.start();
    });
  }
  return animation2.deferred.promise();
}
function setupPosition($element, config) {
  if (!config || !config.position) {
    return;
  }
  const win = renderer_default(window6);
  let left = 0;
  let top = 0;
  const position2 = position_default.calculate($element, config.position);
  const offset2 = $element.offset();
  const currentPosition = $element.position();
  if (currentPosition.top > offset2.top) {
    top = win.scrollTop();
  }
  if (currentPosition.left > offset2.left) {
    left = win.scrollLeft();
  }
  extend(config, {
    left: position2.h.location - offset2.left + currentPosition.left - left,
    top: position2.v.location - offset2.top + currentPosition.top - top
  });
  delete config.position;
}
function setProps($element, props) {
  each(props, function(key, value2) {
    try {
      $element.css(key, isFunction(value2) ? value2() : value2);
    } catch (e) {
    }
  });
}
var stop = function(element, jumpToEnd) {
  const $element = renderer_default(element);
  const queueData = getAnimQueueData($element);
  each(queueData, function(_, animation3) {
    animation3.config.delay = 0;
    animation3.config.duration = 0;
    animation3.isSynchronous = true;
  });
  if (!isAnimating($element)) {
    shiftFromAnimationQueue($element, queueData);
  }
  const animation2 = $element.data("dxAnimData");
  if (animation2) {
    animation2.stop(jumpToEnd);
  }
  $element.removeData("dxAnimData");
  destroyAnimQueueData($element);
};
var fx = {
  off: false,
  animationTypes: animationConfigurators,
  animate,
  createAnimation,
  isAnimating,
  stop,
  _simulatedTransitionEndDelay: 100
};
var fx_default = fx;

// node_modules/devextreme/esm/__internal/core/m_action.js
var Action = class _Action {
  constructor(action, config) {
    config = config || {};
    this._action = action;
    this._context = config.context || getWindow();
    this._beforeExecute = config.beforeExecute;
    this._afterExecute = config.afterExecute;
    this._component = config.component;
    this._validatingTargetName = config.validatingTargetName;
    const excludeValidators = this._excludeValidators = {};
    if (config.excludeValidators) {
      for (let i = 0; i < config.excludeValidators.length; i++) {
        excludeValidators[config.excludeValidators[i]] = true;
      }
    }
  }
  execute() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const e = {
      action: this._action,
      args: Array.prototype.slice.call(args),
      context: this._context,
      component: this._component,
      validatingTargetName: this._validatingTargetName,
      cancel: false,
      handled: false
    };
    const beforeExecute = this._beforeExecute;
    const afterExecute = this._afterExecute;
    const argsBag = e.args[0] || {};
    if (!this._validateAction(e)) {
      return;
    }
    null === beforeExecute || void 0 === beforeExecute || beforeExecute.call(this._context, e);
    if (e.cancel) {
      return;
    }
    const result = this._executeAction(e);
    if (argsBag.cancel) {
      return;
    }
    null === afterExecute || void 0 === afterExecute || afterExecute.call(this._context, e);
    return result;
  }
  _validateAction(e) {
    const excludeValidators = this._excludeValidators;
    const {
      executors
    } = _Action;
    for (const name in executors) {
      if (!excludeValidators[name]) {
        var _executor$validate;
        const executor = executors[name];
        null === (_executor$validate = executor.validate) || void 0 === _executor$validate || _executor$validate.call(executor, e);
        if (e.cancel) {
          return false;
        }
      }
    }
    return true;
  }
  _executeAction(e) {
    let result;
    const {
      executors
    } = _Action;
    for (const name in executors) {
      var _executor$execute;
      const executor = executors[name];
      null === (_executor$execute = executor.execute) || void 0 === _executor$execute || _executor$execute.call(executor, e);
      if (e.handled) {
        result = e.result;
        break;
      }
    }
    return result;
  }
  static registerExecutor(name, executor) {
    if (isPlainObject(name)) {
      each(name, _Action.registerExecutor);
      return;
    }
    _Action.executors[name] = executor;
  }
  static unregisterExecutor() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    each(args, function() {
      delete _Action.executors[this];
    });
  }
};
Action.executors = {};
var createValidatorByTargetElement = (condition) => (e) => {
  if (!e.args.length) {
    return;
  }
  const args = e.args[0];
  const element = args[e.validatingTargetName] || args.element;
  if (element && condition(renderer_default(element))) {
    e.cancel = true;
  }
};
Action.registerExecutor({
  disabled: {
    validate: createValidatorByTargetElement(($target) => $target.is(".dx-state-disabled, .dx-state-disabled *"))
  },
  readOnly: {
    validate: createValidatorByTargetElement(($target) => $target.is(".dx-state-readonly, .dx-state-readonly *:not(.dx-state-independent)"))
  },
  undefined: {
    execute: (e) => {
      if (!e.action) {
        e.result = void 0;
        e.handled = true;
      }
    }
  },
  func: {
    execute: (e) => {
      if (isFunction(e.action)) {
        e.result = e.action.call(e.context, e.args[0]);
        e.handled = true;
      }
    }
  }
});

// node_modules/devextreme/esm/core/action.js
var action_default = Action;

// node_modules/devextreme/esm/__internal/core/options/m_utils.js
var cachedGetters = {};
var convertRulesToOptions = (rules) => {
  const currentDevice = devices_default.current();
  return rules.reduce((options, _ref) => {
    let {
      device,
      options: ruleOptions
    } = _ref;
    const deviceFilter = device || {};
    const match = isFunction(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
    if (match) {
      extend(true, options, ruleOptions);
    }
    return options;
  }, {});
};
var normalizeOptions = (options, value2) => "string" !== typeof options ? options : {
  [options]: value2
};
var deviceMatch = (device, filter) => isEmptyObject(filter) || findBestMatches(device, [filter]).length > 0;
var getFieldName = (fullName) => fullName.substr(fullName.lastIndexOf(".") + 1);
var getParentName = (fullName) => fullName.substr(0, fullName.lastIndexOf("."));
var getNestedOptionValue = function(optionsObject, name) {
  cachedGetters[name] = cachedGetters[name] || compileGetter(name);
  return cachedGetters[name](optionsObject, {
    functionsAsIs: true
  });
};
var createDefaultOptionRules = function() {
  let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
  return options;
};

// node_modules/devextreme/esm/__internal/core/utils/m_comparator.js
var hasNegation = function(oldValue, newValue) {
  return 1 / oldValue === 1 / newValue;
};
var equals = function(oldValue, newValue) {
  oldValue = toComparable(oldValue, true);
  newValue = toComparable(newValue, true);
  if (oldValue && newValue && isRenderer(oldValue) && isRenderer(newValue)) {
    return newValue.is(oldValue);
  }
  const oldValueIsNaN = oldValue !== oldValue;
  const newValueIsNaN = newValue !== newValue;
  if (oldValueIsNaN && newValueIsNaN) {
    return true;
  }
  if (0 === oldValue && 0 === newValue) {
    return hasNegation(oldValue, newValue);
  }
  if (null === oldValue || "object" !== typeof oldValue || dom_adapter_default.isElementNode(oldValue)) {
    return oldValue === newValue;
  }
  return false;
};

// node_modules/devextreme/esm/__internal/core/options/m_option_manager.js
var cachedGetters2 = {};
var cachedSetters = {};
var OptionManager = class {
  constructor(options, optionsByReference) {
    this._options = options;
    this._optionsByReference = optionsByReference;
    this._changingCallback;
    this._changedCallback;
    this._namePreparedCallbacks;
    this._validateOptionsCallback;
  }
  _setByReference(options, rulesOptions) {
    extend(true, options, rulesOptions);
    for (const fieldName in this._optionsByReference) {
      if (Object.prototype.hasOwnProperty.call(rulesOptions, fieldName)) {
        options[fieldName] = rulesOptions[fieldName];
      }
    }
  }
  _setPreparedValue(name, value2, merge, silent) {
    const previousValue = this.get(this._options, name, false);
    if (!equals(previousValue, value2)) {
      const path = getPathParts(name);
      !silent && this._changingCallback(name, previousValue, value2);
      cachedSetters[name] = cachedSetters[name] || compileSetter(name);
      cachedSetters[name](this._options, value2, {
        functionsAsIs: true,
        merge: isDefined(merge) ? merge : !this._optionsByReference[name],
        unwrapObservables: path.length > 1 && !!this._optionsByReference[path[0]]
      });
      !silent && this._changedCallback(name, value2, previousValue);
    }
  }
  _prepareRelevantNames(options, name, value2, silent) {
    if (isPlainObject(value2)) {
      for (const valueName in value2) {
        this._prepareRelevantNames(options, `${name}.${valueName}`, value2[valueName]);
      }
    }
    this._namePreparedCallbacks(options, name, value2, silent);
  }
  get() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._options;
    let name = arguments.length > 1 ? arguments[1] : void 0;
    let unwrapObservables = arguments.length > 2 ? arguments[2] : void 0;
    cachedGetters2[name] = cachedGetters2[name] || compileGetter(name);
    return cachedGetters2[name](options, {
      functionsAsIs: true,
      unwrapObservables
    });
  }
  set(options, value2, merge, silent) {
    options = normalizeOptions(options, value2);
    for (const name in options) {
      this._prepareRelevantNames(options, name, options[name], silent);
    }
    if (this._validateOptionsCallback) {
      options = this._validateOptionsCallback(options);
    }
    for (const name in options) {
      this._setPreparedValue(name, options[name], merge, silent);
    }
  }
  onRelevantNamesPrepared(callBack) {
    this._namePreparedCallbacks = callBack;
  }
  onChanging(callBack) {
    this._changingCallback = callBack;
  }
  onChanged(callBack) {
    this._changedCallback = callBack;
  }
  onValidateOptions(callback) {
    this._validateOptionsCallback = callback;
  }
  dispose() {
    this._changingCallback = noop;
    this._changedCallback = noop;
  }
};

// node_modules/devextreme/esm/__internal/core/options/m_index.js
var Options = class {
  constructor(options, defaultOptions, optionsByReference, deprecatedOptions) {
    this._deprecatedCallback;
    this._startChangeCallback;
    this._endChangeCallback;
    this._validateOptionsCallback;
    this._default = defaultOptions;
    this._deprecated = deprecatedOptions;
    this._deprecatedNames = [];
    this._initDeprecatedNames();
    this._optionManager = new OptionManager(options, optionsByReference);
    this._optionManager.onRelevantNamesPrepared((options2, name, value2, silent) => this._setRelevantNames(options2, name, value2, silent));
    this._cachedOptions = {};
    this._rules = [];
  }
  set _initial(value2) {
    this._initialOptions = value2;
  }
  get _initial() {
    if (!this._initialOptions) {
      const rulesOptions = this._getByRules(this.silent("defaultOptionsRules"));
      this._initialOptions = this._default;
      this._optionManager._setByReference(this._initialOptions, rulesOptions);
    }
    return this._initialOptions;
  }
  _initDeprecatedNames() {
    for (const optionName in this._deprecated) {
      this._deprecatedNames.push(optionName);
    }
  }
  _getByRules(rules) {
    rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
    return convertRulesToOptions(rules);
  }
  _notifyDeprecated(option) {
    const info = this._deprecated[option];
    if (info) {
      this._deprecatedCallback(option, info);
    }
  }
  _setRelevantNames(options, name, value2, silent) {
    if (name) {
      const normalizedName = this._normalizeName(name, silent);
      if (normalizedName && normalizedName !== name) {
        this._setField(options, normalizedName, value2);
        this._clearField(options, name);
      }
    }
  }
  _setField(options, fullName, value2) {
    let fieldName = "";
    let fieldObject = null;
    do {
      fieldName = fieldName ? `.${fieldName}` : "";
      fieldName = getFieldName(fullName) + fieldName;
      fullName = getParentName(fullName);
      fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options;
    } while (!fieldObject);
    fieldObject[fieldName] = value2;
  }
  _clearField(options, name) {
    delete options[name];
    const previousFieldName = getParentName(name);
    const fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;
    if (fieldObject) {
      delete fieldObject[getFieldName(name)];
    }
  }
  _normalizeName(name, silent) {
    if (this._deprecatedNames.length && name) {
      for (let i = 0; i < this._deprecatedNames.length; i++) {
        if (this._deprecatedNames[i] === name) {
          const deprecate = this._deprecated[name];
          if (deprecate) {
            !silent && this._notifyDeprecated(name);
            return deprecate.alias || name;
          }
        }
      }
    }
    return name;
  }
  addRules(rules) {
    this._rules = rules.concat(this._rules);
  }
  applyRules(rules) {
    const options = this._getByRules(rules);
    this.silent(options);
  }
  dispose() {
    this._deprecatedCallback = noop;
    this._startChangeCallback = noop;
    this._endChangeCallback = noop;
    this._optionManager.dispose();
  }
  onChanging(callBack) {
    this._optionManager.onChanging(callBack);
  }
  onChanged(callBack) {
    this._optionManager.onChanged(callBack);
  }
  validateOptions(callBack) {
    this._optionManager.onValidateOptions(callBack);
  }
  onDeprecated(callBack) {
    this._deprecatedCallback = callBack;
  }
  onStartChange(callBack) {
    this._startChangeCallback = callBack;
  }
  onEndChange(callBack) {
    this._endChangeCallback = callBack;
  }
  isInitial(name) {
    const value2 = this.silent(name);
    const initialValue = this.initial(name);
    const areFunctions = isFunction(value2) && isFunction(initialValue);
    return areFunctions ? value2.toString() === initialValue.toString() : equalByValue(value2, initialValue);
  }
  initial(name) {
    return getNestedOptionValue(this._initial, name);
  }
  option(options, value2) {
    const isGetter = arguments.length < 2 && "object" !== type(options);
    if (isGetter) {
      return this._optionManager.get(void 0, this._normalizeName(options));
    }
    this._startChangeCallback();
    try {
      this._optionManager.set(options, value2);
    } finally {
      this._endChangeCallback();
    }
  }
  silent(options, value2) {
    const isGetter = arguments.length < 2 && "object" !== type(options);
    if (isGetter) {
      return this._optionManager.get(void 0, options, void 0, true);
    }
    this._optionManager.set(options, value2, void 0, true);
  }
  reset(name) {
    if (name) {
      const fullPath = getPathParts(name);
      const value2 = fullPath.reduce((value3, field) => value3 ? value3[field] : this.initial(field), null);
      const defaultValue = isObject(value2) ? _extends({}, value2) : value2;
      this._optionManager.set(name, defaultValue, false);
    }
  }
  getAliasesByName(name) {
    return Object.keys(this._deprecated).filter((aliasName) => name === this._deprecated[aliasName].alias);
  }
  isDeprecated(name) {
    return Object.prototype.hasOwnProperty.call(this._deprecated, name);
  }
  cache(name, options) {
    const isGetter = arguments.length < 2;
    if (isGetter) {
      return this._cachedOptions[name];
    }
    this._cachedOptions[name] = extend(this._cachedOptions[name], options);
  }
};

// node_modules/devextreme/esm/__internal/core/m_postponed_operations.js
var PostponedOperations = class {
  constructor() {
    this._postponedOperations = {};
  }
  add(key, fn, postponedPromise) {
    if (key in this._postponedOperations) {
      postponedPromise && this._postponedOperations[key].promises.push(postponedPromise);
    } else {
      const completePromise = new Deferred();
      this._postponedOperations[key] = {
        fn,
        completePromise,
        promises: postponedPromise ? [postponedPromise] : []
      };
    }
    return this._postponedOperations[key].completePromise.promise();
  }
  callPostponedOperations() {
    for (const key in this._postponedOperations) {
      const operation = this._postponedOperations[key];
      if (isDefined(operation)) {
        if (operation.promises && operation.promises.length) {
          when(...operation.promises).done(operation.fn).then(operation.completePromise.resolve);
        } else {
          operation.fn().done(operation.completePromise.resolve);
        }
      }
    }
    this._postponedOperations = {};
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_public_component.js
var componentNames = /* @__PURE__ */ new WeakMap();
var nextAnonymousComponent = 0;
var getName = function(componentClass, newName) {
  if (isDefined(newName)) {
    componentNames.set(componentClass, newName);
    return;
  }
  if (!componentNames.has(componentClass)) {
    const generatedName = "dxPrivateComponent" + nextAnonymousComponent++;
    componentNames.set(componentClass, generatedName);
    return generatedName;
  }
  return componentNames.get(componentClass);
};
function attachInstanceToElement($element, componentInstance, disposeFn) {
  const data2 = data($element.get(0));
  const name = getName(componentInstance.constructor);
  data2[name] = componentInstance;
  if (disposeFn) {
    m_events_engine_default.one($element, removeEvent, function() {
      disposeFn.call(componentInstance);
    });
  }
  if (!data2.dxComponents) {
    data2.dxComponents = [];
  }
  data2.dxComponents.push(name);
}
function getInstanceByElement($element, componentClass) {
  const name = getName(componentClass);
  return data($element.get(0), name);
}

// node_modules/devextreme/esm/__internal/core/widget/component.js
var getEventName = (actionName) => actionName.charAt(2).toLowerCase() + actionName.substr(3);
var isInnerOption = (optionName) => 0 === optionName.indexOf("_", 0);
var Component = class extends class_default.inherit({}) {
  _setDeprecatedOptions() {
    this._deprecatedOptions = {};
  }
  _getDeprecatedOptions() {
    return this._deprecatedOptions;
  }
  _getDefaultOptions() {
    return {
      onInitialized: null,
      onOptionChanged: null,
      onDisposing: null,
      defaultOptionsRules: null
    };
  }
  _defaultOptionsRules() {
    return [];
  }
  _setOptionsByDevice(rules) {
    this._options.applyRules(rules);
  }
  _convertRulesToOptions(rules) {
    return convertRulesToOptions(rules);
  }
  _isInitialOptionValue(name) {
    return this._options.isInitial(name);
  }
  _setOptionsByReference() {
    this._optionsByReference = {};
  }
  _getOptionsByReference() {
    return this._optionsByReference;
  }
  ctor() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const {
      _optionChangedCallbacks,
      _disposingCallbacks
    } = options;
    this.NAME = getName(this.constructor);
    this._eventsStrategy = EventsStrategy.create(this, options.eventsStrategy);
    this._updateLockCount = 0;
    this._optionChangedCallbacks = _optionChangedCallbacks || callbacks_default();
    this._disposingCallbacks = _disposingCallbacks || callbacks_default();
    this.postponedOperations = new PostponedOperations();
    this._createOptions(options);
  }
  _createOptions(options) {
    this.beginUpdate();
    try {
      this._setOptionsByReference();
      this._setDeprecatedOptions();
      this._options = new Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
      this._options.onChanging((name, previousValue, value2) => this._initialized && this._optionChanging(name, previousValue, value2));
      this._options.onDeprecated((option, info) => this._logDeprecatedOptionWarning(option, info));
      this._options.onChanged((name, value2, previousValue) => this._notifyOptionChanged(name, value2, previousValue));
      this._options.onStartChange(() => this.beginUpdate());
      this._options.onEndChange(() => this.endUpdate());
      this._options.addRules(this._defaultOptionsRules());
      this._options.validateOptions((o) => this._validateOptions(o));
      if (options && options.onInitializing) {
        options.onInitializing.apply(this, [options]);
      }
      this._setOptionsByDevice(options.defaultOptionsRules);
      this._initOptions(options);
    } finally {
      this.endUpdate();
    }
  }
  _initOptions(options) {
    this.option(options);
  }
  _init() {
    this._createOptionChangedAction();
    this.on("disposing", (args) => {
      this._disposingCallbacks.fireWith(this, [args]);
    });
  }
  _logDeprecatedOptionWarning(option, info) {
    const message = info.message || `Use the '${info.alias}' option instead`;
    errors_default.log("W0001", this.NAME, option, info.since, message);
  }
  _logDeprecatedComponentWarning(since, alias) {
    errors_default.log("W0000", this.NAME, since, `Use the '${alias}' widget instead`);
  }
  _createOptionChangedAction() {
    this._optionChangedAction = this._createActionByOption("onOptionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _createDisposingAction() {
    this._disposingAction = this._createActionByOption("onDisposing", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "onDisposing":
      case "onInitialized":
      case "defaultOptionsRules":
      default:
        break;
      case "onOptionChanged":
        this._createOptionChangedAction();
    }
  }
  _dispose() {
    var _this$_disposingActio;
    this._optionChangedCallbacks.empty();
    this._createDisposingAction();
    null === (_this$_disposingActio = this._disposingAction) || void 0 === _this$_disposingActio || _this$_disposingActio.call(this);
    this._eventsStrategy.dispose();
    this._options.dispose();
    this._disposed = true;
  }
  _lockUpdate() {
    this._updateLockCount++;
  }
  _unlockUpdate() {
    this._updateLockCount = Math.max(this._updateLockCount - 1, 0);
  }
  _isUpdateAllowed() {
    return 0 === this._updateLockCount;
  }
  _isInitializingRequired() {
    return !this._initializing && !this._initialized;
  }
  isInitialized() {
    return this._initialized;
  }
  _commitUpdate() {
    this.postponedOperations.callPostponedOperations();
    this._isInitializingRequired() && this._initializeComponent();
  }
  _initializeComponent() {
    this._initializing = true;
    try {
      this._init();
    } finally {
      this._initializing = false;
      this._lockUpdate();
      this._createActionByOption("onInitialized", {
        excludeValidators: ["disabled", "readOnly"]
      })();
      this._unlockUpdate();
      this._initialized = true;
    }
  }
  instance() {
    return this;
  }
  beginUpdate() {
    this._lockUpdate();
  }
  endUpdate() {
    this._unlockUpdate();
    this._isUpdateAllowed() && this._commitUpdate();
  }
  _optionChanging() {
  }
  _notifyOptionChanged(option, value2, previousValue) {
    if (this._initialized) {
      const optionNames = [option].concat(this._options.getAliasesByName(option));
      for (let i = 0; i < optionNames.length; i++) {
        const name = optionNames[i];
        const args = {
          name: getPathParts(name)[0],
          fullName: name,
          value: value2,
          previousValue
        };
        if (!isInnerOption(name)) {
          var _this$_optionChangedA;
          this._optionChangedCallbacks.fireWith(this, [extend(this._defaultActionArgs(), args)]);
          null === (_this$_optionChangedA = this._optionChangedAction) || void 0 === _this$_optionChangedA || _this$_optionChangedA.call(this, extend({}, args));
        }
        if (!this._disposed && this._cancelOptionChange !== name) {
          this._optionChanged(args);
        }
      }
    }
  }
  initialOption(name) {
    return this._options.initial(name);
  }
  _defaultActionConfig() {
    return {
      context: this,
      component: this
    };
  }
  _defaultActionArgs() {
    return {
      component: this
    };
  }
  _createAction(actionSource, config) {
    let action;
    return (e) => {
      if (!isDefined(e)) {
        e = {};
      }
      if (!isPlainObject(e)) {
        e = {
          actionValue: e
        };
      }
      action = action || new action_default(actionSource, extend({}, config, this._defaultActionConfig()));
      return action.execute.call(action, extend(e, this._defaultActionArgs()));
    };
  }
  _createActionByOption(optionName, config) {
    var _this = this;
    let action;
    let eventName;
    let actionFunc;
    config = extend({}, config);
    const result = function() {
      var _config, _config2;
      if (!eventName) {
        config = config || {};
        if ("string" !== typeof optionName) {
          throw errors_default.Error("E0008");
        }
        if (optionName.startsWith("on")) {
          eventName = getEventName(optionName);
        }
        actionFunc = _this.option(optionName);
      }
      if (!action && !actionFunc && !(null !== (_config = config) && void 0 !== _config && _config.beforeExecute) && !(null !== (_config2 = config) && void 0 !== _config2 && _config2.afterExecute) && !_this._eventsStrategy.hasEvent(eventName)) {
        return;
      }
      if (!action) {
        const {
          beforeExecute
        } = config;
        config.beforeExecute = function() {
          for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            props[_key2] = arguments[_key2];
          }
          beforeExecute && beforeExecute.apply(_this, props);
          _this._eventsStrategy.fireEvent(eventName, props[0].args);
        };
        action = _this._createAction(actionFunc, config);
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (config_default2().wrapActionsBeforeExecute) {
        const beforeActionExecute = _this.option("beforeActionExecute") || noop;
        const wrappedAction = beforeActionExecute(_this, action, config) || action;
        return wrappedAction.apply(_this, args);
      }
      return action.apply(_this, args);
    };
    if (config_default2().wrapActionsBeforeExecute) {
      return result;
    }
    const onActionCreated = this.option("onActionCreated") || noop;
    return onActionCreated(this, result, config) || result;
  }
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
  hasActionSubscription(actionName) {
    return !!this._options.silent(actionName) || this._eventsStrategy.hasEvent(getEventName(actionName));
  }
  isOptionDeprecated(name) {
    return this._options.isDeprecated(name);
  }
  _setOptionWithoutOptionChange(name, value2) {
    this._cancelOptionChange = name;
    this.option(name, value2);
    this._cancelOptionChange = false;
  }
  _getOptionValue(name, context2) {
    const value2 = this.option(name);
    if (isFunction(value2)) {
      return value2.bind(context2)();
    }
    return value2;
  }
  option() {
    return this._options.option(...arguments);
  }
  resetOption(name) {
    this.beginUpdate();
    this._options.reset(name);
    this.endUpdate();
  }
  _validateOptions(options) {
    return options;
  }
};

// node_modules/devextreme/esm/common/core/animation/presets/presets.js
var directionPostfixes = {
  forward: " dx-forward",
  backward: " dx-backward",
  none: " dx-no-direction",
  undefined: " dx-no-direction"
};
var AnimationPresetCollection = Component.inherit({
  ctor: function() {
    this.callBase.apply(this, arguments);
    this._registeredPresets = [];
    this.resetToDefaults();
  },
  _getDefaultOptions: function() {
    return extend(this.callBase(), {
      defaultAnimationDuration: 400,
      defaultAnimationDelay: 0,
      defaultStaggerAnimationDuration: 300,
      defaultStaggerAnimationDelay: 40,
      defaultStaggerAnimationStartDelay: 500
    });
  },
  _defaultOptionsRules: function() {
    return this.callBase().concat([{
      device: function(device) {
        return device.phone;
      },
      options: {
        defaultStaggerAnimationDuration: 350,
        defaultStaggerAnimationDelay: 50,
        defaultStaggerAnimationStartDelay: 0
      }
    }, {
      device: function() {
        return m_devices_default.current().android || m_devices_default.real.android;
      },
      options: {
        defaultAnimationDelay: 100
      }
    }]);
  },
  _getPresetOptionName: function(animationName) {
    return "preset_" + animationName;
  },
  _createAndroidSlideAnimationConfig: function(throughOpacity, widthMultiplier) {
    const that = this;
    const createBaseConfig = function(configModifier) {
      return {
        type: "slide",
        delay: void 0 === configModifier.delay ? that.option("defaultAnimationDelay") : configModifier.delay,
        duration: void 0 === configModifier.duration ? that.option("defaultAnimationDuration") : configModifier.duration
      };
    };
    return {
      enter: function($element, configModifier) {
        const width = getWidth($element.parent()) * widthMultiplier;
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.to = {
          left: 0,
          opacity: 1
        };
        if ("forward" === direction) {
          config.from = {
            left: width,
            opacity: throughOpacity
          };
        } else if ("backward" === direction) {
          config.from = {
            left: -width,
            opacity: throughOpacity
          };
        } else {
          config.from = {
            left: 0,
            opacity: 0
          };
        }
        return fx_default.createAnimation($element, config);
      },
      leave: function($element, configModifier) {
        const width = getWidth($element.parent()) * widthMultiplier;
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.from = {
          left: 0,
          opacity: 1
        };
        if ("forward" === direction) {
          config.to = {
            left: -width,
            opacity: throughOpacity
          };
        } else if ("backward" === direction) {
          config.to = {
            left: width,
            opacity: throughOpacity
          };
        } else {
          config.to = {
            left: 0,
            opacity: 0
          };
        }
        return fx_default.createAnimation($element, config);
      }
    };
  },
  _createOpenDoorConfig: function() {
    const that = this;
    const createBaseConfig = function(configModifier) {
      return {
        type: "css",
        extraCssClasses: "dx-opendoor-animation",
        delay: void 0 === configModifier.delay ? that.option("defaultAnimationDelay") : configModifier.delay,
        duration: void 0 === configModifier.duration ? that.option("defaultAnimationDuration") : configModifier.duration
      };
    };
    return {
      enter: function($element, configModifier) {
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.delay = "none" === direction ? config.delay : config.duration;
        config.from = "dx-enter dx-opendoor-animation" + directionPostfixes[direction];
        config.to = "dx-enter-active";
        return fx_default.createAnimation($element, config);
      },
      leave: function($element, configModifier) {
        const direction = configModifier.direction;
        const config = createBaseConfig(configModifier);
        config.from = "dx-leave dx-opendoor-animation" + directionPostfixes[direction];
        config.to = "dx-leave-active";
        return fx_default.createAnimation($element, config);
      }
    };
  },
  _createWinPopConfig: function() {
    const that = this;
    const baseConfig = {
      type: "css",
      extraCssClasses: "dx-win-pop-animation",
      duration: that.option("defaultAnimationDuration")
    };
    return {
      enter: function($element, configModifier) {
        const config = baseConfig;
        const direction = configModifier.direction;
        config.delay = "none" === direction ? that.option("defaultAnimationDelay") : that.option("defaultAnimationDuration") / 2;
        config.from = "dx-enter dx-win-pop-animation" + directionPostfixes[direction];
        config.to = "dx-enter-active";
        return fx_default.createAnimation($element, config);
      },
      leave: function($element, configModifier) {
        const config = baseConfig;
        const direction = configModifier.direction;
        config.delay = that.option("defaultAnimationDelay");
        config.from = "dx-leave dx-win-pop-animation" + directionPostfixes[direction];
        config.to = "dx-leave-active";
        return fx_default.createAnimation($element, config);
      }
    };
  },
  resetToDefaults: function() {
    this.clear();
    this.registerDefaultPresets();
    this.applyChanges();
  },
  clear: function(name) {
    const that = this;
    const newRegisteredPresets = [];
    each(this._registeredPresets, function(index2, preset) {
      if (!name || name === preset.name) {
        that.option(that._getPresetOptionName(preset.name), void 0);
      } else {
        newRegisteredPresets.push(preset);
      }
    });
    this._registeredPresets = newRegisteredPresets;
    this.applyChanges();
  },
  registerPreset: function(name, config) {
    this._registeredPresets.push({
      name,
      config
    });
  },
  applyChanges: function() {
    const that = this;
    const customRules = [];
    each(this._registeredPresets, function(index2, preset) {
      const rule = {
        device: preset.config.device,
        options: {}
      };
      rule.options[that._getPresetOptionName(preset.name)] = preset.config.animation;
      customRules.push(rule);
    });
    this._setOptionsByDevice(customRules);
  },
  getPreset: function(name) {
    let result = name;
    while ("string" === typeof result) {
      result = this.option(this._getPresetOptionName(result));
    }
    return result;
  },
  registerDefaultPresets: function() {
    this.registerPreset("pop", {
      animation: {
        extraCssClasses: "dx-android-pop-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("openDoor", {
      animation: this._createOpenDoorConfig()
    });
    this.registerPreset("win-pop", {
      animation: this._createWinPopConfig()
    });
    this.registerPreset("fade", {
      animation: {
        extraCssClasses: "dx-fade-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("slide", {
      device: function() {
        return m_devices_default.current().android || m_devices_default.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(1, 1)
    });
    this.registerPreset("slide", {
      device: function() {
        return !m_devices_default.current().android && !m_devices_default.real.android;
      },
      animation: {
        extraCssClasses: "dx-slide-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-slide", {
      animation: {
        extraCssClasses: "dx-ios7-slide-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("overflow", {
      animation: {
        extraCssClasses: "dx-overflow-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-toolbar", {
      device: function() {
        return !m_devices_default.current().android && !m_devices_default.real.android;
      },
      animation: {
        extraCssClasses: "dx-ios7-toolbar-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-toolbar", {
      device: function() {
        return m_devices_default.current().android || m_devices_default.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(0, 0.4)
    });
    this.registerPreset("stagger-fade", {
      animation: {
        extraCssClasses: "dx-fade-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-slide", {
      animation: {
        extraCssClasses: "dx-slide-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-slide", {
      animation: {
        extraCssClasses: "dx-fade-slide-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-drop", {
      animation: {
        extraCssClasses: "dx-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-drop", {
      animation: {
        extraCssClasses: "dx-fade-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-rise", {
      animation: {
        extraCssClasses: "dx-fade-rise-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-3d-drop", {
      animation: {
        extraCssClasses: "dx-3d-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-zoom", {
      animation: {
        extraCssClasses: "dx-fade-zoom-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
  }
});
var animationPresets = new AnimationPresetCollection();

// node_modules/devextreme/esm/common/core/animation/presets.js
var presets_default = animationPresets;

// node_modules/devextreme/esm/common/core/animation/transition_executor/transition_executor.js
var directionPostfixes2 = {
  forward: " dx-forward",
  backward: " dx-backward",
  none: " dx-no-direction",
  undefined: " dx-no-direction"
};
var TransitionExecutor = class_default.inherit({
  ctor: function() {
    this._accumulatedDelays = {
      enter: 0,
      leave: 0
    };
    this._animations = [];
    this.reset();
  },
  _createAnimations: function($elements, initialConfig, configModifier, type2) {
    $elements = renderer_default($elements);
    const that = this;
    const result = [];
    configModifier = configModifier || {};
    const animationConfig = this._prepareElementAnimationConfig(initialConfig, configModifier, type2);
    if (animationConfig) {
      $elements.each(function() {
        const animation2 = that._createAnimation(renderer_default(this), animationConfig, configModifier);
        if (animation2) {
          animation2.element.addClass("dx-animating");
          animation2.setup();
          result.push(animation2);
        }
      });
    }
    return result;
  },
  _prepareElementAnimationConfig: function(config, configModifier, type2) {
    let result;
    if ("string" === typeof config) {
      const presetName = config;
      config = animationPresets.getPreset(presetName);
    }
    if (!config) {
      result = void 0;
    } else if (isFunction(config[type2])) {
      result = config[type2];
    } else {
      result = extend({
        skipElementInitialStyles: true,
        cleanupWhen: this._completePromise
      }, config, configModifier);
      if (!result.type || "css" === result.type) {
        const cssClass = "dx-" + type2;
        const extraCssClasses = (result.extraCssClasses ? " " + result.extraCssClasses : "") + directionPostfixes2[result.direction];
        result.type = "css";
        result.from = (result.from || cssClass) + extraCssClasses;
        result.to = result.to || cssClass + "-active";
      }
      result.staggerDelay = result.staggerDelay || 0;
      result.delay = result.delay || 0;
      if (result.staggerDelay) {
        result.delay += this._accumulatedDelays[type2];
        this._accumulatedDelays[type2] += result.staggerDelay;
      }
    }
    return result;
  },
  _createAnimation: function($element, animationConfig, configModifier) {
    let result;
    if (isPlainObject(animationConfig)) {
      result = fx_default.createAnimation($element, animationConfig);
    } else if (isFunction(animationConfig)) {
      result = animationConfig($element, configModifier);
    }
    return result;
  },
  _startAnimations: function() {
    const animations = this._animations;
    for (let i = 0; i < animations.length; i++) {
      animations[i].start();
    }
  },
  _stopAnimations: function(jumpToEnd) {
    const animations = this._animations;
    for (let i = 0; i < animations.length; i++) {
      animations[i].stop(jumpToEnd);
    }
  },
  _clearAnimations: function() {
    const animations = this._animations;
    for (let i = 0; i < animations.length; i++) {
      animations[i].element.removeClass("dx-animating");
    }
    this._animations.length = 0;
  },
  reset: function() {
    this._accumulatedDelays.enter = 0;
    this._accumulatedDelays.leave = 0;
    this._clearAnimations();
    this._completeDeferred = new Deferred();
    this._completePromise = this._completeDeferred.promise();
  },
  enter: function($elements, animationConfig, configModifier) {
    const animations = this._createAnimations($elements, animationConfig, configModifier, "enter");
    this._animations.push.apply(this._animations, animations);
  },
  leave: function($elements, animationConfig, configModifier) {
    const animations = this._createAnimations($elements, animationConfig, configModifier, "leave");
    this._animations.push.apply(this._animations, animations);
  },
  start: function() {
    const that = this;
    let result;
    if (!this._animations.length) {
      that.reset();
      result = new Deferred().resolve().promise();
    } else {
      const animationDeferreds = map(this._animations, function(animation2) {
        const result2 = new Deferred();
        animation2.deferred.always(function() {
          result2.resolve();
        });
        return result2.promise();
      });
      result = when.apply(renderer_default, animationDeferreds).always(function() {
        that._completeDeferred.resolve();
        that.reset();
      });
      m_common_default.executeAsync(function() {
        that._startAnimations();
      });
    }
    return result;
  },
  stop: function(jumpToEnd) {
    this._stopAnimations(jumpToEnd);
  }
});

// node_modules/devextreme/esm/common/core/animation/transition_executor.js
var transition_executor_default = TransitionExecutor;

// node_modules/devextreme/esm/__internal/data/m_errors.js
var errors = error_default(errors_default.ERROR_MESSAGES, {
  E4000: "[DevExpress.data]: {0}",
  E4001: "Unknown aggregating function is detected: '{0}'",
  E4002: "Unsupported OData protocol version is used",
  E4003: "Unknown filter operation is used: {0}",
  E4004: "The thenby() method is called before the sortby() method",
  E4005: "Store requires a key expression for this operation",
  E4006: "ArrayStore 'data' option must be an array",
  E4007: "Compound keys cannot be auto-generated",
  E4008: "Attempt to insert an item with a duplicated key",
  E4009: "Data item cannot be found",
  E4010: "CustomStore does not support creating queries",
  E4011: "Custom Store method is not implemented or is not a function: {0}",
  E4012: "Custom Store method returns an invalid value: {0}",
  E4013: "Local Store requires the 'name' configuration option is specified",
  E4014: "Unknown data type is specified for ODataStore: {0}",
  E4015: "Unknown entity name or alias is used: {0}",
  E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter",
  E4017: "Keys cannot be modified",
  E4018: "The server has returned a non-numeric value in a response to an item count request",
  E4019: "Mixing of group operators inside a single group of filter expression is not allowed",
  E4020: "Unknown store type is detected: {0}",
  E4021: "The server response does not provide the totalCount value",
  E4022: "The server response does not provide the groupCount value",
  E4023: "Could not parse the following XML: {0}",
  E4024: "String function {0} cannot be used with the data field {1} of type {2}.",
  W4000: "Data returned from the server has an incorrect structure",
  W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
  W4002: "Data loading has failed for some cells due to the following error: {0}"
});
var errorHandler = null;
var handleError = function(error) {
  var _errorHandler;
  null === (_errorHandler = errorHandler) || void 0 === _errorHandler || _errorHandler(error);
};
var setErrorHandler = (handler) => errorHandler = handler;

// node_modules/devextreme/esm/__internal/data/m_utils.js
var ready2 = ready_callbacks_default.add;
var XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
var normalizeBinaryCriterion = function(crit) {
  return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
};
var normalizeSortingInfo = function(info) {
  if (!Array.isArray(info)) {
    info = [info];
  }
  return map(info, (i) => {
    const result = {
      selector: isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
      desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
    };
    if (i.compare) {
      result.compare = i.compare;
    }
    return result;
  });
};
var errorMessageFromXhr = function() {
  const textStatusMessages = {
    timeout: "Network connection timeout",
    error: "Unspecified network error",
    parsererror: "Unexpected server response"
  };
  let unloading;
  ready2(() => {
    const window11 = getWindow();
    dom_adapter_default.listen(window11, "beforeunload", () => {
      unloading = true;
    });
  });
  return function(xhr, textStatus) {
    if (unloading) {
      return XHR_ERROR_UNLOAD;
    }
    if (xhr.status < 400) {
      return function(textStatus2) {
        let result = textStatusMessages[textStatus2];
        if (!result) {
          return textStatus2;
        }
        return result;
      }(textStatus);
    }
    return xhr.statusText;
  };
}();
var aggregators = {
  count: {
    seed: 0,
    step: (count) => 1 + count
  },
  sum: {
    seed: 0,
    step: (sum, item) => sum + item
  },
  min: {
    step: (min, item) => item < min ? item : min
  },
  max: {
    step: (max, item) => item > max ? item : max
  },
  avg: {
    seed: [0, 0],
    step: (pair, value2) => [pair[0] + value2, pair[1] + 1],
    finalize: (pair) => pair[1] ? pair[0] / pair[1] : NaN
  }
};
var processRequestResultLock = /* @__PURE__ */ function() {
  let lockCount = 0;
  let lockDeferred;
  return {
    obtain: function() {
      if (0 === lockCount) {
        lockDeferred = new Deferred();
      }
      lockCount++;
    },
    release: function() {
      lockCount--;
      if (lockCount < 1) {
        lockDeferred.resolve();
      }
    },
    promise: function() {
      const deferred = 0 === lockCount ? new Deferred().resolve() : lockDeferred;
      return deferred.promise();
    },
    reset: function() {
      lockCount = 0;
      if (lockDeferred) {
        lockDeferred.resolve();
      }
    }
  };
}();
function isConjunctiveOperator(condition) {
  return /^(and|&&|&)$/i.test(condition);
}
var keysEqual = function(keyExpr, key1, key2) {
  if (Array.isArray(keyExpr)) {
    const names = map(key1, (v, k) => k);
    let name;
    for (let i = 0; i < names.length; i++) {
      name = names[i];
      if (!equalByValue(key1[name], key2[name], {
        strict: false
      })) {
        return false;
      }
    }
    return true;
  }
  return equalByValue(key1, key2, {
    strict: false
  });
};
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var base64_encode = function(input) {
  if (!Array.isArray(input)) {
    input = stringToByteArray(String(input));
  }
  let result = "";
  function getBase64Char(index2) {
    return BASE64_CHARS.charAt(index2);
  }
  for (let i = 0; i < input.length; i += 3) {
    const octet1 = input[i];
    const octet2 = input[i + 1];
    const octet3 = input[i + 2];
    result += map([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("");
  }
  return result;
};
function stringToByteArray(str) {
  const bytes = [];
  let code;
  let i;
  for (i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code < 128) {
      bytes.push(code);
    } else if (code < 2048) {
      bytes.push(192 + (code >> 6), 128 + (63 & code));
    } else if (code < 65536) {
      bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (63 & code));
    } else if (code < 2097152) {
      bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (63 & code));
    }
  }
  return bytes;
}
var isUnaryOperation = function(crit) {
  return "!" === crit[0] && Array.isArray(crit[1]);
};
var isGroupOperator = function(value2) {
  return "and" === value2 || "or" === value2;
};
var isUniformEqualsByOr = function(crit) {
  if (crit.length > 2 && Array.isArray(crit[0]) && "or" === crit[1] && "string" === typeof crit[0][0] && "=" === crit[0][1]) {
    const [prop] = crit[0];
    return !crit.find((el, i) => i % 2 !== 0 ? "or" !== el : !Array.isArray(el) || 3 !== el.length || el[0] !== prop || "=" !== el[1]);
  }
  return false;
};
var isGroupCriterion = function(crit) {
  const first = crit[0];
  const second = crit[1];
  if (Array.isArray(first)) {
    return true;
  }
  if (isFunction(first)) {
    if (Array.isArray(second) || isFunction(second) || isGroupOperator(second)) {
      return true;
    }
  }
  return false;
};
var trivialPromise = function() {
  const d = new Deferred();
  return d.resolve.apply(d, arguments).promise();
};
var rejectedPromise = function() {
  const d = new Deferred();
  return d.reject.apply(d, arguments).promise();
};
function throttle(func, timeout) {
  let timeoutId;
  return function() {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = void 0;
        func.call(this);
      }, isFunction(timeout) ? timeout() : timeout);
    }
    return timeoutId;
  };
}
function throttleChanges(func, timeout) {
  let cache = [];
  const throttled = throttle(function() {
    func.call(this, cache);
    cache = [];
  }, timeout);
  return function(changes) {
    if (Array.isArray(changes)) {
      cache.push(...changes);
    }
    return throttled.call(this, cache);
  };
}

// node_modules/devextreme/esm/__internal/data/m_array_query.js
var Iterator = class_default.inherit({
  toArray() {
    const result = [];
    this.reset();
    while (this.next()) {
      result.push(this.current());
    }
    return result;
  },
  countable: () => false
});
var ArrayIterator = Iterator.inherit({
  ctor(array) {
    this.array = array;
    this.index = -1;
  },
  next() {
    if (this.index + 1 < this.array.length) {
      this.index++;
      return true;
    }
    return false;
  },
  current() {
    return this.array[this.index];
  },
  reset() {
    this.index = -1;
  },
  toArray() {
    return this.array.slice(0);
  },
  countable: () => true,
  count() {
    return this.array.length;
  }
});
var WrappedIterator = Iterator.inherit({
  ctor(iter) {
    this.iter = iter;
  },
  next() {
    return this.iter.next();
  },
  current() {
    return this.iter.current();
  },
  reset() {
    return this.iter.reset();
  }
});
var MapIterator = WrappedIterator.inherit({
  ctor(iter, mapper) {
    this.callBase(iter);
    this.index = -1;
    this.mapper = mapper;
  },
  current() {
    return this.mapper(this.callBase(), this.index);
  },
  next() {
    const hasNext = this.callBase();
    if (hasNext) {
      this.index++;
    }
    return hasNext;
  }
});
var defaultCompare = function(xValue, yValue, options) {
  if (isString(xValue) && isString(yValue) && (null !== options && void 0 !== options && options.locale || null !== options && void 0 !== options && options.collatorOptions)) {
    return new Intl.Collator((null === options || void 0 === options ? void 0 : options.locale) || void 0, (null === options || void 0 === options ? void 0 : options.collatorOptions) || void 0).compare(xValue, yValue);
  }
  xValue = toComparable(xValue, false, options);
  yValue = toComparable(yValue, false, options);
  if (null === xValue && null !== yValue) {
    return -1;
  }
  if (null !== xValue && null === yValue) {
    return 1;
  }
  if (void 0 === xValue && void 0 !== yValue) {
    return 1;
  }
  if (void 0 !== xValue && void 0 === yValue) {
    return -1;
  }
  if (xValue < yValue) {
    return -1;
  }
  if (xValue > yValue) {
    return 1;
  }
  return 0;
};
var SortIterator = Iterator.inherit({
  ctor(iter, getter, desc, compare2) {
    this.langParams = iter.langParams;
    if (!(iter instanceof MapIterator)) {
      iter = new MapIterator(iter, this._wrap);
      iter.langParams = this.langParams;
    }
    this.iter = iter;
    this.rules = [{
      getter,
      desc,
      compare: compare2,
      langParams: this.langParams
    }];
  },
  thenBy(getter, desc, compare2) {
    const result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare2);
    if (!this.sortedIter) {
      result.rules = this.rules.concat(result.rules);
    }
    return result;
  },
  next() {
    this._ensureSorted();
    return this.sortedIter.next();
  },
  current() {
    this._ensureSorted();
    return this.sortedIter.current();
  },
  reset() {
    delete this.sortedIter;
  },
  countable() {
    return this.sortedIter || this.iter.countable();
  },
  count() {
    if (this.sortedIter) {
      return this.sortedIter.count();
    }
    return this.iter.count();
  },
  _ensureSorted() {
    const that = this;
    if (that.sortedIter) {
      return;
    }
    each(that.rules, function() {
      this.getter = compileGetter(this.getter);
    });
    that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort((x, y) => that._compare(x, y))), that._unwrap);
  },
  _wrap: (record, index2) => ({
    index: index2,
    value: record
  }),
  _unwrap: (wrappedItem) => wrappedItem.value,
  _getDefaultCompare: (langParams) => (xValue, yValue) => defaultCompare(xValue, yValue, langParams),
  _compare(x, y) {
    const xIndex = x.index;
    const yIndex = y.index;
    x = x.value;
    y = y.value;
    if (x === y) {
      return xIndex - yIndex;
    }
    for (let i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
      const rule = this.rules[i];
      const xValue = rule.getter(x);
      const yValue = rule.getter(y);
      const compare2 = rule.compare || this._getDefaultCompare(rule.langParams);
      const compareResult = compare2(xValue, yValue);
      if (compareResult) {
        return rule.desc ? -compareResult : compareResult;
      }
    }
    return xIndex - yIndex;
  }
});
var compileCriteria = /* @__PURE__ */ function() {
  let langParams = {};
  const _toComparable = (value2) => toComparable(value2, false, langParams);
  const compileGroup = function(crit) {
    if (isUniformEqualsByOr(crit)) {
      return ((crit2) => {
        const getter = compileGetter(crit2[0][0]);
        const filterValues = crit2.reduce((acc, item, i) => {
          if (i % 2 === 0) {
            acc.push(_toComparable(item[2]));
          }
          return acc;
        }, []);
        return (obj) => {
          const value2 = _toComparable(getter(obj));
          return filterValues.some((filterValue) => useStrictComparison(filterValue) ? value2 === filterValue : value2 == filterValue);
        };
      })(crit);
    }
    const ops = [];
    let isConjunctiveOperator2 = false;
    let isConjunctiveNextOperator = false;
    each(crit, function() {
      if (Array.isArray(this) || isFunction(this)) {
        if (ops.length > 1 && isConjunctiveOperator2 !== isConjunctiveNextOperator) {
          throw errors.Error("E4019");
        }
        ops.push(compileCriteria(this, langParams));
        isConjunctiveOperator2 = isConjunctiveNextOperator;
        isConjunctiveNextOperator = true;
      } else {
        isConjunctiveNextOperator = isConjunctiveOperator(this);
      }
    });
    return function(d) {
      let result = isConjunctiveOperator2;
      for (let i = 0; i < ops.length; i++) {
        if (ops[i](d) !== isConjunctiveOperator2) {
          result = !isConjunctiveOperator2;
          break;
        }
      }
      return result;
    };
  };
  const toString = function(value2) {
    var _langParams;
    return isDefined(value2) ? null !== (_langParams = langParams) && void 0 !== _langParams && _langParams.locale ? value2.toLocaleString(langParams.locale) : value2.toString() : "";
  };
  function compileEquals(getter, value2, negate) {
    return function(obj) {
      obj = _toComparable(getter(obj));
      let result = useStrictComparison(value2) ? obj === value2 : obj == value2;
      if (negate) {
        result = !result;
      }
      return result;
    };
  }
  function useStrictComparison(value2) {
    return "" === value2 || 0 === value2 || false === value2;
  }
  return function(crit, options) {
    langParams = options || {};
    if (isFunction(crit)) {
      return crit;
    }
    if (isGroupCriterion(crit)) {
      return compileGroup(crit);
    }
    if (isUnaryOperation(crit)) {
      return function(crit2) {
        const op = crit2[0];
        const criteria = compileCriteria(crit2[1], langParams);
        if ("!" === op) {
          return function(obj) {
            return !criteria(obj);
          };
        }
        throw errors.Error("E4003", op);
      }(crit);
    }
    return function(crit2) {
      crit2 = normalizeBinaryCriterion(crit2);
      const getter = compileGetter(crit2[0]);
      const op = crit2[1];
      let value2 = crit2[2];
      value2 = _toComparable(value2);
      const compare2 = (obj, operatorFn) => {
        obj = _toComparable(getter(obj));
        return (null == value2 || null == obj) && value2 !== obj ? false : operatorFn(obj, value2);
      };
      switch (op.toLowerCase()) {
        case "=":
          return compileEquals(getter, value2);
        case "<>":
          return compileEquals(getter, value2, true);
        case ">":
          return (obj) => compare2(obj, (a, b) => a > b);
        case "<":
          return (obj) => compare2(obj, (a, b) => a < b);
        case ">=":
          return (obj) => compare2(obj, (a, b) => a >= b);
        case "<=":
          return (obj) => compare2(obj, (a, b) => a <= b);
        case "startswith":
          return (obj) => _toComparable(toString(getter(obj))).startsWith(value2);
        case "endswith":
          return (obj) => _toComparable(toString(getter(obj))).endsWith(value2);
        case "contains":
          return (obj) => _toComparable(toString(getter(obj))).includes(value2);
        case "notcontains":
          return (obj) => !_toComparable(toString(getter(obj))).includes(value2);
      }
      throw errors.Error("E4003", op);
    }(crit);
  };
}();
var FilterIterator = WrappedIterator.inherit({
  ctor(iter, criteria) {
    this.callBase(iter);
    this.langParams = iter.langParams;
    this.criteria = compileCriteria(criteria, this.langParams);
  },
  next() {
    while (this.iter.next()) {
      if (this.criteria(this.current())) {
        return true;
      }
    }
    return false;
  }
});
var GroupIterator = Iterator.inherit({
  ctor(iter, getter) {
    this.iter = iter;
    this.getter = getter;
  },
  next() {
    this._ensureGrouped();
    return this.groupedIter.next();
  },
  current() {
    this._ensureGrouped();
    return this.groupedIter.current();
  },
  reset() {
    delete this.groupedIter;
  },
  countable() {
    return !!this.groupedIter;
  },
  count() {
    return this.groupedIter.count();
  },
  _ensureGrouped() {
    if (this.groupedIter) {
      return;
    }
    const hash = {};
    const keys = [];
    const {
      iter
    } = this;
    const getter = compileGetter(this.getter);
    iter.reset();
    while (iter.next()) {
      const current2 = iter.current();
      const key = getter(current2);
      if (key in hash) {
        hash[key].push(current2);
      } else {
        hash[key] = [current2];
        keys.push(key);
      }
    }
    this.groupedIter = new ArrayIterator(map(keys, (key) => ({
      key,
      items: hash[key]
    })));
  }
});
var SelectIterator = WrappedIterator.inherit({
  ctor(iter, getter) {
    this.callBase(iter);
    this.getter = compileGetter(getter);
  },
  current() {
    return this.getter(this.callBase());
  },
  countable() {
    return this.iter.countable();
  },
  count() {
    return this.iter.count();
  }
});
var SliceIterator = WrappedIterator.inherit({
  ctor(iter, skip, take) {
    this.callBase(iter);
    this.skip = Math.max(0, skip);
    this.take = Math.max(0, take);
    this.pos = 0;
  },
  next() {
    if (this.pos >= this.skip + this.take) {
      return false;
    }
    while (this.pos < this.skip && this.iter.next()) {
      this.pos++;
    }
    this.pos++;
    return this.iter.next();
  },
  reset() {
    this.callBase();
    this.pos = 0;
  },
  countable() {
    return this.iter.countable();
  },
  count() {
    return Math.min(this.iter.count() - this.skip, this.take);
  }
});
var arrayQueryImpl = function(iter, queryOptions) {
  queryOptions = queryOptions || {};
  if (!(iter instanceof Iterator)) {
    iter = new ArrayIterator(iter);
  }
  if (queryOptions.langParams) {
    iter.langParams = queryOptions.langParams;
  }
  const handleError2 = function(error) {
    const handler = queryOptions.errorHandler;
    if (handler) {
      handler(error);
    }
    handleError(error);
  };
  const aggregateCore = function(aggregator) {
    const d = new Deferred().fail(handleError2);
    let seed;
    const {
      step
    } = aggregator;
    const {
      finalize
    } = aggregator;
    try {
      iter.reset();
      if ("seed" in aggregator) {
        seed = aggregator.seed;
      } else {
        seed = iter.next() ? iter.current() : NaN;
      }
      let accumulator = seed;
      while (iter.next()) {
        accumulator = step(accumulator, iter.current());
      }
      d.resolve(finalize ? finalize(accumulator) : accumulator);
    } catch (x) {
      d.reject(x);
    }
    return d.promise();
  };
  const standardAggregate = function(name) {
    return aggregateCore(aggregators[name]);
  };
  const select = function(getter) {
    if (!isFunction(getter) && !Array.isArray(getter)) {
      getter = [].slice.call(arguments);
    }
    return chainQuery(new SelectIterator(iter, getter));
  };
  const selectProp = function(name) {
    return select(compileGetter(name));
  };
  function chainQuery(iter2) {
    return arrayQueryImpl(iter2, queryOptions);
  }
  return {
    toArray: () => iter.toArray(),
    enumerate() {
      const d = new Deferred().fail(handleError2);
      try {
        d.resolve(iter.toArray());
      } catch (x) {
        d.reject(x);
      }
      return d.promise();
    },
    setLangParams(options) {
      iter.langParams = options;
    },
    sortBy: (getter, desc, compare2) => chainQuery(new SortIterator(iter, getter, desc, compare2)),
    thenBy(getter, desc, compare2) {
      if (iter instanceof SortIterator) {
        return chainQuery(iter.thenBy(getter, desc, compare2));
      }
      throw errors.Error("E4004");
    },
    filter(criteria) {
      if (!Array.isArray(criteria)) {
        criteria = [].slice.call(arguments);
      }
      return chainQuery(new FilterIterator(iter, criteria));
    },
    slice(skip, take) {
      if (void 0 === take) {
        take = Number.MAX_VALUE;
      }
      return chainQuery(new SliceIterator(iter, skip, take));
    },
    select,
    groupBy: (getter) => chainQuery(new GroupIterator(iter, getter)),
    aggregate: function(seed, step, finalize) {
      if (arguments.length < 2) {
        return aggregateCore({
          step: arguments[0]
        });
      }
      return aggregateCore({
        seed,
        step,
        finalize
      });
    },
    count() {
      if (iter.countable()) {
        const d = new Deferred().fail(handleError2);
        try {
          d.resolve(iter.count());
        } catch (x) {
          d.reject(x);
        }
        return d.promise();
      }
      return standardAggregate("count");
    },
    sum(getter) {
      if (getter) {
        return selectProp(getter).sum();
      }
      return standardAggregate("sum");
    },
    min(getter) {
      if (getter) {
        return selectProp(getter).min();
      }
      return standardAggregate("min");
    },
    max(getter) {
      if (getter) {
        return selectProp(getter).max();
      }
      return standardAggregate("max");
    },
    avg(getter) {
      if (getter) {
        return selectProp(getter).avg();
      }
      return standardAggregate("avg");
    }
  };
};
var m_array_query_default = arrayQueryImpl;

// node_modules/devextreme/esm/__internal/data/m_array_utils.js
function hasKey(target, keyOrKeys) {
  let key;
  const keys = "string" === typeof keyOrKeys ? keyOrKeys.split() : keyOrKeys.slice();
  while (keys.length) {
    key = keys.shift();
    if (key in target) {
      return true;
    }
  }
  return false;
}
function findItems(keyInfo, items, key, groupCount) {
  let childItems;
  let result;
  if (groupCount) {
    for (let i = 0; i < items.length; i++) {
      childItems = items[i].items || items[i].collapsedItems || [];
      result = findItems(keyInfo, childItems || [], key, groupCount - 1);
      if (result) {
        return result;
      }
    }
  } else if (indexByKey(keyInfo, items, key) >= 0) {
    return items;
  }
}
function getItems(keyInfo, items, key, groupCount) {
  if (groupCount) {
    return findItems(keyInfo, items, key, groupCount) || [];
  }
  return items;
}
function generateDataByKeyMap(keyInfo, array) {
  if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
    const dataByKeyMap = {};
    const arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
      dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i];
    }
    array._dataByKeyMap = dataByKeyMap;
    array._dataByKeyMapLength = arrayLength;
  }
}
function getCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
}
function getHasKeyCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
  return true;
}
function setDataByKeyMapValue(array, key, data2) {
  if (array._dataByKeyMap) {
    array._dataByKeyMap[JSON.stringify(key)] = data2;
    array._dataByKeyMapLength += data2 ? 1 : -1;
  }
}
function cloneInstanceWithChangedPaths(instance, changes, clonedInstances) {
  clonedInstances = clonedInstances || /* @__PURE__ */ new WeakMap();
  const result = instance ? Object.create(Object.getPrototypeOf(instance)) : {};
  if (instance) {
    clonedInstances.set(instance, result);
  }
  const instanceWithoutPrototype = _extends({}, instance);
  deepExtendArraySafe(result, instanceWithoutPrototype, true, true, true);
  for (const name in instanceWithoutPrototype) {
    const value2 = instanceWithoutPrototype[name];
    const change = null === changes || void 0 === changes ? void 0 : changes[name];
    if (isObject(value2) && !isPlainObject(value2) && isObject(change) && !clonedInstances.has(value2)) {
      result[name] = cloneInstanceWithChangedPaths(value2, change, clonedInstances);
    }
  }
  for (const name in result) {
    const prop = result[name];
    if (isObject(prop) && clonedInstances.has(prop)) {
      result[name] = clonedInstances.get(prop);
    }
  }
  return result;
}
function createObjectWithChanges(target, changes) {
  const result = cloneInstanceWithChangedPaths(target, changes);
  return deepExtendArraySafe(result, changes, true, true, true);
}
function applyBatch(_ref) {
  let {
    keyInfo,
    data: data2,
    changes,
    groupCount,
    useInsertIndex,
    immutable,
    disableCache,
    logError,
    skipCopying
  } = _ref;
  const resultItems = true === immutable ? [...data2] : data2;
  changes.forEach((item) => {
    const items = "insert" === item.type ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
    !disableCache && generateDataByKeyMap(keyInfo, items);
    switch (item.type) {
      case "update":
        update(keyInfo, items, item.key, item.data, true, immutable, logError);
        break;
      case "insert":
        insert(keyInfo, items, item.data, useInsertIndex && isDefined(item.index) ? item.index : -1, true, logError, skipCopying);
        break;
      case "remove":
        remove(keyInfo, items, item.key, true, logError);
    }
  });
  return resultItems;
}
function getErrorResult(isBatch, logError, errorCode) {
  return !isBatch ? rejectedPromise(errors.Error(errorCode)) : logError && errors.log(errorCode);
}
function applyChanges(data2, changes) {
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  const {
    keyExpr = "id",
    immutable = true
  } = options;
  const keyGetter = compileGetter(keyExpr);
  const keyInfo = {
    key: () => keyExpr,
    keyOf: (obj) => keyGetter(obj)
  };
  return applyBatch({
    keyInfo,
    data: data2,
    changes,
    immutable,
    disableCache: true,
    logError: true
  });
}
function update(keyInfo, array, key, data2, isBatch, immutable, logError) {
  let target;
  const keyExpr = keyInfo.key();
  if (keyExpr) {
    if (hasKey(data2, keyExpr) && !keysEqual(keyExpr, key, keyInfo.keyOf(data2))) {
      return getErrorResult(isBatch, logError, "E4017");
    }
    target = getCacheValue(array, key);
    if (!target) {
      const index2 = indexByKey(keyInfo, array, key);
      if (index2 < 0) {
        return getErrorResult(isBatch, logError, "E4009");
      }
      target = array[index2];
      if (true === immutable && isDefined(target)) {
        const newTarget = createObjectWithChanges(target, data2);
        array[index2] = newTarget;
        return !isBatch && trivialPromise(newTarget, key);
      }
    }
  } else {
    target = key;
  }
  deepExtendArraySafe(target, data2, true, false, true, true);
  if (!isBatch) {
    if (config_default2().useLegacyStoreResult) {
      return trivialPromise(key, data2);
    }
    return trivialPromise(target, key);
  }
}
function insert(keyInfo, array, data2, index2, isBatch, logError, skipCopying) {
  let keyValue;
  const keyExpr = keyInfo.key();
  const obj = isPlainObject(data2) && !skipCopying ? extend({}, data2) : data2;
  if (keyExpr) {
    keyValue = keyInfo.keyOf(obj);
    if (void 0 === keyValue || "object" === typeof keyValue && isEmptyObject(keyValue)) {
      if (Array.isArray(keyExpr)) {
        throw errors.Error("E4007");
      }
      keyValue = obj[keyExpr] = String(new guid_default());
    } else if (void 0 !== array[indexByKey(keyInfo, array, keyValue)]) {
      return getErrorResult(isBatch, logError, "E4008");
    }
  } else {
    keyValue = obj;
  }
  if (index2 >= 0) {
    array.splice(index2, 0, obj);
  } else {
    array.push(obj);
  }
  setDataByKeyMapValue(array, keyValue, obj);
  if (!isBatch) {
    return trivialPromise(config_default2().useLegacyStoreResult ? data2 : obj, keyValue);
  }
}
function remove(keyInfo, array, key, isBatch, logError) {
  const index2 = indexByKey(keyInfo, array, key);
  if (index2 > -1) {
    array.splice(index2, 1);
    setDataByKeyMapValue(array, key, null);
  }
  if (!isBatch) {
    return trivialPromise(key);
  }
  if (index2 < 0) {
    return getErrorResult(isBatch, logError, "E4009");
  }
}
function indexByKey(keyInfo, array, key) {
  const keyExpr = keyInfo.key();
  if (!getHasKeyCacheValue(array, key)) {
    return -1;
  }
  for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
    if (keysEqual(keyExpr, keyInfo.keyOf(array[i]), key)) {
      return i;
    }
  }
  return -1;
}

// node_modules/devextreme/esm/__internal/data/m_store_helper.js
function multiLevelGroup(query2, groupInfo) {
  query2 = query2.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query2 = query2.select((g) => extend({}, g, {
      items: multiLevelGroup(m_array_query_default(g.items), groupInfo.slice(1)).toArray()
    }));
  }
  return query2;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  const filteredGroup = [];
  each(groupInfo, (_, group) => {
    const collision = grep(sortInfo, (sort) => group.selector === sort.selector);
    if (collision.length < 1) {
      filteredGroup.push(group);
    }
  });
  return filteredGroup.concat(sortInfo);
}
function queryByOptions(query2, options, isCountQuery) {
  var _options;
  options = options || {};
  const {
    filter
  } = options;
  if (null !== (_options = options) && void 0 !== _options && _options.langParams) {
    var _query$setLangParams, _query;
    null === (_query$setLangParams = (_query = query2).setLangParams) || void 0 === _query$setLangParams || _query$setLangParams.call(_query, options.langParams);
  }
  if (filter) {
    query2 = query2.filter(filter);
  }
  if (isCountQuery) {
    return query2;
  }
  let {
    sort
  } = options;
  const {
    select
  } = options;
  let {
    group
  } = options;
  const {
    skip
  } = options;
  const {
    take
  } = options;
  if (group) {
    group = normalizeSortingInfo(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = normalizeSortingInfo(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    each(sort, function(index2) {
      query2 = query2[index2 ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare);
    });
  }
  if (select) {
    query2 = query2.select(select);
  }
  if (group) {
    query2 = multiLevelGroup(query2, group);
  }
  if (take || skip) {
    query2 = query2.slice(skip || 0, take);
  }
  return query2;
}
var m_store_helper_default = {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions
};

// node_modules/devextreme/esm/__internal/data/m_abstract_store.js
var {
  abstract
} = class_default;
var {
  queryByOptions: queryByOptions2
} = m_store_helper_default;
var storeImpl = {};
var Store = class_default.inherit({
  _langParams: {},
  ctor(options) {
    const that = this;
    options = options || {};
    this._eventsStrategy = new EventsStrategy(this);
    each(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], (_, optionName) => {
      if (optionName in options) {
        that.on(optionName.slice(2).toLowerCase(), options[optionName]);
      }
    });
    this._key = options.key;
    this._errorHandler = options.errorHandler;
    this._useDefaultSearch = true;
  },
  _clearCache: noop,
  _customLoadOptions: () => null,
  key() {
    return this._key;
  },
  keyOf(obj) {
    if (!this._keyGetter) {
      this._keyGetter = compileGetter(this.key());
    }
    return this._keyGetter(obj);
  },
  _requireKey() {
    if (!this.key()) {
      throw errors.Error("E4005");
    }
  },
  load(options) {
    const that = this;
    options = options || {};
    this._eventsStrategy.fireEvent("loading", [options]);
    return this._withLock(this._loadImpl(options)).done((result) => {
      that._eventsStrategy.fireEvent("loaded", [result, options]);
    });
  },
  _loadImpl(options) {
    if (!isEmptyObject(this._langParams)) {
      options = options || {};
      options._langParams = _extends({}, this._langParams, options._langParams);
    }
    return queryByOptions2(this.createQuery(options), options).enumerate();
  },
  _withLock(task) {
    const result = new Deferred();
    task.done(function() {
      const that = this;
      const args = arguments;
      processRequestResultLock.promise().done(() => {
        result.resolveWith(that, args);
      });
    }).fail(function() {
      result.rejectWith(this, arguments);
    });
    return result;
  },
  createQuery: abstract,
  totalCount(options) {
    return this._totalCountImpl(options);
  },
  _totalCountImpl(options) {
    return queryByOptions2(this.createQuery(options), options, true).count();
  },
  byKey(key, extraOptions) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
  },
  _byKeyImpl: abstract,
  insert(values) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("inserting", [values]);
    return that._addFailHandlers(that._insertImpl(values).done((callbackValues, callbackKey) => {
      that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _insertImpl: abstract,
  update(key, values) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("updating", [key, values]);
    return that._addFailHandlers(that._updateImpl(key, values).done(() => {
      that._eventsStrategy.fireEvent("updated", [key, values]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _updateImpl: abstract,
  push(changes) {
    const beforePushArgs = {
      changes,
      waitFor: []
    };
    this._eventsStrategy.fireEvent("beforePushAggregation", [beforePushArgs]);
    when(...beforePushArgs.waitFor).done(() => {
      this._pushImpl(changes);
      this._eventsStrategy.fireEvent("beforePush", [{
        changes
      }]);
      this._eventsStrategy.fireEvent("push", [changes]);
    });
  },
  _pushImpl: noop,
  remove(key) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("removing", [key]);
    return that._addFailHandlers(that._removeImpl(key).done((callbackKey) => {
      that._eventsStrategy.fireEvent("removed", [callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _removeImpl: abstract,
  _addFailHandlers(deferred) {
    return deferred.fail(this._errorHandler).fail(handleError);
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
Store.create = function(alias, options) {
  if (!(alias in storeImpl)) {
    throw errors.Error("E4020", alias);
  }
  return new storeImpl[alias](options);
};
Store.registerClass = function(type2, alias) {
  if (alias) {
    storeImpl[alias] = type2;
  }
  return type2;
};
Store.inherit = /* @__PURE__ */ function(inheritor) {
  return function(members, alias) {
    const type2 = inheritor.apply(this, [members]);
    Store.registerClass(type2, alias);
    return type2;
  };
}(Store.inherit);
var m_abstract_store_default = Store;

// node_modules/devextreme/esm/__internal/data/m_custom_store.js
var TOTAL_COUNT = "totalCount";
var LOAD = "load";
var BY_KEY = "byKey";
var INSERT = "insert";
var UPDATE = "update";
var REMOVE = "remove";
function isPromise2(obj) {
  return obj && isFunction(obj.then);
}
function trivialPromise2(value2) {
  return new Deferred().resolve(value2).promise();
}
function ensureRequiredFuncOption(name, obj) {
  if (!isFunction(obj)) {
    throw errors.Error("E4011", name);
  }
}
function throwInvalidUserFuncResult(name) {
  throw errors.Error("E4012", name);
}
function createUserFuncFailureHandler(pendingDeferred) {
  return function(arg) {
    let error;
    if (arg instanceof Error) {
      error = arg;
    } else {
      error = new Error(function(promiseArguments) {
        const xhr = promiseArguments[0];
        const textStatus = promiseArguments[1];
        if (!xhr || !xhr.getResponseHeader) {
          return null;
        }
        return errorMessageFromXhr(xhr, textStatus);
      }(arguments) || arg && String(arg) || "Unknown error");
    }
    if (error.message !== XHR_ERROR_UNLOAD) {
      pendingDeferred.reject(error);
    }
  };
}
function invokeUserLoad(store, options) {
  const userFunc = store._loadFunc;
  let userResult;
  ensureRequiredFuncOption(LOAD, userFunc);
  userResult = userFunc.apply(store, [options]);
  if (Array.isArray(userResult)) {
    userResult = trivialPromise2(userResult);
  } else if (null === userResult || void 0 === userResult) {
    userResult = trivialPromise2([]);
  } else if (!isPromise2(userResult)) {
    throwInvalidUserFuncResult(LOAD);
  }
  return fromPromise(userResult);
}
function invokeUserTotalCountFunc(store, options) {
  const userFunc = store._totalCountFunc;
  let userResult;
  if (!isFunction(userFunc)) {
    throw errors.Error("E4021");
  }
  userResult = userFunc.apply(store, [options]);
  if (!isPromise2(userResult)) {
    userResult = Number(userResult);
    if (!isFinite(userResult)) {
      throwInvalidUserFuncResult(TOTAL_COUNT);
    }
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function invokeUserByKeyFunc(store, key, extraOptions) {
  const userFunc = store._byKeyFunc;
  let userResult;
  ensureRequiredFuncOption(BY_KEY, userFunc);
  userResult = userFunc.apply(store, [key, extraOptions]);
  if (!isPromise2(userResult)) {
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function runRawLoad(pendingDeferred, store, userFuncOptions, continuation) {
  if (store.__rawData) {
    continuation(store.__rawData);
  } else {
    const loadPromise = store.__rawDataPromise || invokeUserLoad(store, userFuncOptions);
    if (store._cacheRawData) {
      store.__rawDataPromise = loadPromise;
    }
    loadPromise.always(() => {
      delete store.__rawDataPromise;
    }).done((rawData) => {
      if (store._cacheRawData) {
        store.__rawData = rawData;
      }
      continuation(rawData);
    }).fail((error) => {
      var _store$_errorHandler;
      const userFuncFailureHandler = createUserFuncFailureHandler(pendingDeferred);
      null === (_store$_errorHandler = store._errorHandler) || void 0 === _store$_errorHandler || _store$_errorHandler.call(store, error);
      userFuncFailureHandler(error);
    });
  }
}
function runRawLoadWithQuery(pendingDeferred, store, options, countOnly) {
  options = options || {};
  const userFuncOptions = {};
  if ("userData" in options) {
    userFuncOptions.userData = options.userData;
  }
  runRawLoad(pendingDeferred, store, userFuncOptions, (rawData) => {
    const rawDataQuery = m_array_query_default(rawData, {
      errorHandler: store._errorHandler
    });
    let itemsQuery;
    let totalCountQuery;
    const waitList = [];
    let items;
    let totalCount;
    if (!countOnly) {
      itemsQuery = m_store_helper_default.queryByOptions(rawDataQuery, options);
      if (itemsQuery === rawDataQuery) {
        items = rawData.slice(0);
      } else {
        waitList.push(itemsQuery.enumerate().done((asyncResult) => {
          items = asyncResult;
        }));
      }
    }
    if (options.requireTotalCount || countOnly) {
      totalCountQuery = m_store_helper_default.queryByOptions(rawDataQuery, options, true);
      if (totalCountQuery === rawDataQuery) {
        totalCount = rawData.length;
      } else {
        waitList.push(totalCountQuery.count().done((asyncResult) => {
          totalCount = asyncResult;
        }));
      }
    }
    when.apply(renderer_default, waitList).done(() => {
      if (countOnly) {
        pendingDeferred.resolve(totalCount);
      } else if (options.requireTotalCount) {
        pendingDeferred.resolve(items, {
          totalCount
        });
      } else {
        pendingDeferred.resolve(items);
      }
    }).fail((x) => {
      pendingDeferred.reject(x);
    });
  });
}
function runRawLoadWithKey(pendingDeferred, store, key) {
  runRawLoad(pendingDeferred, store, {}, (rawData) => {
    const keyExpr = store.key();
    let item;
    for (let i = 0, len = rawData.length; i < len; i++) {
      item = rawData[i];
      if (keysEqual(keyExpr, store.keyOf(rawData[i]), key)) {
        pendingDeferred.resolve(item);
        return;
      }
    }
    pendingDeferred.reject(errors.Error("E4009"));
  });
}
var CustomStore = m_abstract_store_default.inherit({
  ctor(options) {
    options = options || {};
    this.callBase(options);
    this._useDefaultSearch = !!options.useDefaultSearch || "raw" === options.loadMode;
    this._loadMode = options.loadMode;
    this._cacheRawData = false !== options.cacheRawData;
    this._loadFunc = options[LOAD];
    this._totalCountFunc = options[TOTAL_COUNT];
    this._byKeyFunc = options[BY_KEY];
    this._insertFunc = options[INSERT];
    this._updateFunc = options[UPDATE];
    this._removeFunc = options[REMOVE];
  },
  _clearCache() {
    delete this.__rawData;
  },
  createQuery() {
    throw errors.Error("E4010");
  },
  clearRawDataCache() {
    this._clearCache();
  },
  _totalCountImpl(options) {
    let d = new Deferred();
    if ("raw" === this._loadMode && !this._totalCountFunc) {
      runRawLoadWithQuery(d, this, options, true);
    } else {
      invokeUserTotalCountFunc(this, options).done((count) => {
        d.resolve(Number(count));
      }).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _pushImpl(changes) {
    if (this.__rawData) {
      applyBatch({
        keyInfo: this,
        data: this.__rawData,
        changes
      });
    }
  },
  _loadImpl(options) {
    let d = new Deferred();
    if ("raw" === this._loadMode) {
      runRawLoadWithQuery(d, this, options, false);
    } else {
      invokeUserLoad(this, options).done((data2, extra) => {
        d.resolve(data2, extra);
      }).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _byKeyImpl(key, extraOptions) {
    const d = new Deferred();
    if (this._byKeyViaLoad()) {
      this._requireKey();
      runRawLoadWithKey(d, this, key);
    } else {
      invokeUserByKeyFunc(this, key, extraOptions).done((obj) => {
        d.resolve(obj);
      }).fail(createUserFuncFailureHandler(d));
    }
    return d.promise();
  },
  _byKeyViaLoad() {
    return "raw" === this._loadMode && !this._byKeyFunc;
  },
  _insertImpl(values) {
    const that = this;
    const userFunc = that._insertFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(INSERT, userFunc);
    userResult = userFunc.apply(that, [values]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done((serverResponse) => {
      if (config_default2().useLegacyStoreResult) {
        d.resolve(values, serverResponse);
      } else {
        d.resolve(serverResponse || values, that.keyOf(serverResponse));
      }
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _updateImpl(key, values) {
    const userFunc = this._updateFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(UPDATE, userFunc);
    userResult = userFunc.apply(this, [key, values]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done((serverResponse) => {
      if (config_default2().useLegacyStoreResult) {
        d.resolve(key, values);
      } else {
        d.resolve(serverResponse || values, key);
      }
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _removeImpl(key) {
    const userFunc = this._removeFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(REMOVE, userFunc);
    userResult = userFunc.apply(this, [key]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2();
    }
    fromPromise(userResult).done(() => {
      d.resolve(key);
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  }
});
var m_custom_store_default = CustomStore;

// node_modules/devextreme/esm/common/data/custom_store.js
function isGroupItem(item) {
  if (void 0 === item || null === item || "object" !== typeof item) {
    return false;
  }
  return "key" in item && "items" in item;
}
function isLoadResultObject(res) {
  return !Array.isArray(res) && "data" in res;
}
function isGroupItemsArray(res) {
  return Array.isArray(res) && !!res.length && isGroupItem(res[0]);
}
function isItemsArray(res) {
  return Array.isArray(res) && !isGroupItem(res[0]);
}

// node_modules/devextreme/esm/common/data/query_adapters.js
var query_adapters_default = {};

// node_modules/devextreme/esm/__internal/data/m_remote_query.js
var remoteQueryImpl = function(url, queryOptions, tasks) {
  tasks = tasks || [];
  queryOptions = queryOptions || {};
  const createTask = function(name, args) {
    return {
      name,
      args
    };
  };
  const exec = function(executorTask) {
    const d = new Deferred();
    let _adapterFactory;
    let _adapter;
    let _taskQueue;
    let _currentTask;
    let _mergedSortArgs;
    const rejectWithNotify = function(error) {
      const handler = queryOptions.errorHandler;
      if (handler) {
        handler(error);
      }
      handleError(error);
      d.reject(error);
    };
    function mergeSortTask(task) {
      switch (task.name) {
        case "sortBy":
          _mergedSortArgs = [task.args];
          return true;
        case "thenBy":
          if (!_mergedSortArgs) {
            throw errors.Error("E4004");
          }
          _mergedSortArgs.push(task.args);
          return true;
      }
      return false;
    }
    try {
      _adapterFactory = queryOptions.adapter;
      if (!isFunction(_adapterFactory)) {
        _adapterFactory = query_adapters_default[_adapterFactory];
      }
      _adapter = _adapterFactory(queryOptions);
      _taskQueue = [].concat(tasks).concat(executorTask);
      const {
        optimize
      } = _adapter;
      if (optimize) {
        optimize(_taskQueue);
      }
      while (_taskQueue.length) {
        _currentTask = _taskQueue[0];
        if (!mergeSortTask(_currentTask)) {
          if (_mergedSortArgs) {
            _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
            _mergedSortArgs = null;
            continue;
          }
          if ("enumerate" !== String(_currentTask.name)) {
            if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
              break;
            }
          }
        }
        _taskQueue.shift();
      }
      !function() {
        const head = _taskQueue[0];
        const unmergedTasks = [];
        if (head && "multiSort" === head.name) {
          _taskQueue.shift();
          each(head.args[0], function() {
            unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this));
          });
        }
        _taskQueue = unmergedTasks.concat(_taskQueue);
      }();
      _adapter.exec(url).done((result, extra) => {
        if (!_taskQueue.length) {
          d.resolve(result, extra);
        } else {
          let clientChain = m_array_query_default(result, {
            errorHandler: queryOptions.errorHandler
          });
          each(_taskQueue, function() {
            clientChain = clientChain[this.name].apply(clientChain, this.args);
          });
          clientChain.done(d.resolve).fail(d.reject);
        }
      }).fail(rejectWithNotify);
    } catch (x) {
      rejectWithNotify(x);
    }
    return d.promise();
  };
  const query2 = {};
  each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
    const name = String(this);
    query2[name] = function() {
      return remoteQueryImpl(url, queryOptions, tasks.concat(createTask(name, arguments)));
    };
  });
  each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
    const name = String(this);
    query2[name] = function() {
      return exec.call(this, createTask(name, arguments));
    };
  });
  return query2;
};
var m_remote_query_default = remoteQueryImpl;

// node_modules/devextreme/esm/common/data/query_implementation.js
var queryImpl = {
  array: m_array_query_default,
  remote: m_remote_query_default
};

// node_modules/devextreme/esm/__internal/data/m_query.js
var query = function() {
  const impl = Array.isArray(arguments[0]) ? "array" : "remote";
  return queryImpl[impl].apply(this, arguments);
};
var m_query_default = query;

// node_modules/devextreme/esm/__internal/data/m_array_store.js
var ArrayStore = m_abstract_store_default.inherit({
  ctor(options) {
    if (Array.isArray(options)) {
      options = {
        data: options
      };
    } else {
      options = options || {};
    }
    this.callBase(options);
    const initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw errors.Error("E4006");
    }
    this._array = initialArray || [];
  },
  createQuery() {
    return m_query_default(this._array, {
      errorHandler: this._errorHandler
    });
  },
  _byKeyImpl(key) {
    const index2 = indexByKey(this, this._array, key);
    if (-1 === index2) {
      return rejectedPromise(errors.Error("E4009"));
    }
    return trivialPromise(this._array[index2]);
  },
  _insertImpl(values) {
    return insert(this, this._array, values);
  },
  _pushImpl(changes) {
    applyBatch({
      keyInfo: this,
      data: this._array,
      changes
    });
  },
  _updateImpl(key, values) {
    return update(this, this._array, key, values);
  },
  _removeImpl(key) {
    return remove(this, this._array, key);
  },
  clear() {
    this._eventsStrategy.fireEvent("modifying");
    this._array = [];
    this._eventsStrategy.fireEvent("modified");
  }
}, "array");
var m_array_store_default = ArrayStore;

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

// node_modules/devextreme/esm/__internal/data/data_source/m_utils.js
var _excluded = ["items"];
var CANCELED_TOKEN = "canceled";
var isPending = (deferred) => "pending" === deferred.state();
var normalizeStoreLoadOptionAccessorArguments = (originalArguments) => {
  switch (originalArguments.length) {
    case 0:
      return;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
var mapGroup = (group, level, mapper) => map(group, (item) => {
  const restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return _extends({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
});
var mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) {
    return items;
  }
  return level ? mapGroup(items, level, mapper) : map(items, mapper);
};
var mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  const level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
var normalizeLoadResult = (data2, extra) => {
  var _data;
  if (null !== (_data = data2) && void 0 !== _data && _data.data) {
    extra = data2;
    data2 = data2.data;
  }
  if (!Array.isArray(data2)) {
    data2 = [data2];
  }
  return {
    data: data2,
    extra
  };
};
var createCustomStoreFromLoadFunc = (options) => {
  const storeConfig = {};
  each(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
    storeConfig[this] = options[this];
    delete options[this];
  });
  return new m_custom_store_default(storeConfig);
};
var createStoreFromConfig = (storeConfig) => {
  const alias = storeConfig.type;
  delete storeConfig.type;
  return m_abstract_store_default.create(alias, storeConfig);
};
var createCustomStoreFromUrl = (url, normalizationOptions) => new m_custom_store_default({
  load: () => ajax_default.sendRequest({
    url,
    dataType: "json"
  }),
  loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
});
var normalizeDataSourceOptions = (options, normalizationOptions) => {
  let store;
  if ("string" === typeof options) {
    options = {
      paginate: false,
      store: createCustomStoreFromUrl(options, normalizationOptions)
    };
  }
  if (void 0 === options) {
    options = [];
  }
  if (Array.isArray(options) || options instanceof m_abstract_store_default) {
    options = {
      store: options
    };
  } else {
    options = extend({}, options);
  }
  if (void 0 === options.store) {
    options.store = [];
  }
  store = options.store;
  if ("load" in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new m_array_store_default(store);
  } else if (isPlainObject(store)) {
    store = createStoreFromConfig(extend({}, store));
  }
  options.store = store;
  return options;
};

// node_modules/devextreme/esm/__internal/data/data_source/m_operation_manager.js
var OperationManager = class {
  constructor() {
    this._counter = -1;
    this._deferreds = {};
  }
  add(deferred) {
    this._counter++;
    this._deferreds[this._counter] = deferred;
    return this._counter;
  }
  remove(operationId) {
    return delete this._deferreds[operationId];
  }
  cancel(operationId) {
    if (operationId in this._deferreds) {
      this._deferreds[operationId].reject(CANCELED_TOKEN);
      return true;
    }
    return false;
  }
  cancelAll() {
    while (this._counter > -1) {
      this.cancel(this._counter);
      this._counter--;
    }
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_queue.js
function createQueue(discardPendingTasks) {
  let _tasks = [];
  let _busy = false;
  function exec() {
    while (_tasks.length) {
      _busy = true;
      const task = _tasks.shift();
      const result = task();
      if (void 0 === result) {
        continue;
      }
      if (result.then) {
        when(result).always(exec);
        return;
      }
      throw errors_default.Error("E0015");
    }
    _busy = false;
  }
  return {
    add: function(task, removeTaskCallback) {
      if (!discardPendingTasks) {
        _tasks.push(task);
      } else {
        if (_tasks[0] && removeTaskCallback) {
          removeTaskCallback(_tasks[0]);
        }
        _tasks = [task];
      }
      if (!_busy) {
        exec();
      }
    },
    busy: function() {
      return _busy;
    }
  };
}
var enqueue = createQueue().add;

// node_modules/devextreme/esm/__internal/data/data_source/m_data_source.js
var DataSource = class_default.inherit({
  ctor(options) {
    options = normalizeDataSourceOptions(options);
    this._eventsStrategy = new EventsStrategy(this, {
      syncStrategy: true
    });
    this._store = options.store;
    this._changedTime = 0;
    const needThrottling = 0 !== options.pushAggregationTimeout;
    if (needThrottling) {
      const throttlingTimeout = void 0 === options.pushAggregationTimeout ? () => 5 * this._changedTime : options.pushAggregationTimeout;
      let pushDeferred;
      let lastPushWaiters;
      const throttlingPushHandler = throttleChanges((changes) => {
        pushDeferred.resolve();
        const storePushPending = when(...lastPushWaiters);
        storePushPending.done(() => this._onPush(changes));
        lastPushWaiters = void 0;
        pushDeferred = void 0;
      }, throttlingTimeout);
      this._onPushHandler = (args) => {
        this._aggregationTimeoutId = throttlingPushHandler(args.changes);
        if (!pushDeferred) {
          pushDeferred = new Deferred();
        }
        lastPushWaiters = args.waitFor;
        args.waitFor.push(pushDeferred.promise());
      };
      this._store.on("beforePushAggregation", this._onPushHandler);
    } else {
      this._onPushHandler = (changes) => this._onPush(changes);
      this._store.on("push", this._onPushHandler);
    }
    this._storeLoadOptions = this._extractLoadOptions(options);
    this._mapFunc = options.map;
    this._postProcessFunc = options.postProcess;
    this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
    this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
    this._loadingCount = 0;
    this._loadQueue = this._createLoadQueue();
    this._searchValue = "searchValue" in options ? options.searchValue : null;
    this._searchOperation = options.searchOperation || "contains";
    this._searchExpr = options.searchExpr;
    this._paginate = options.paginate;
    this._reshapeOnPush = options.reshapeOnPush ?? false;
    each(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], (_, optionName) => {
      if (optionName in options) {
        this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName]);
      }
    });
    this._operationManager = new OperationManager();
    this._init();
  },
  _init() {
    this._items = [];
    this._userData = {};
    this._totalCount = -1;
    this._isLoaded = false;
    if (!isDefined(this._paginate)) {
      this._paginate = !this.group();
    }
    this._isLastPage = !this._paginate;
  },
  dispose() {
    var _this$_delayedLoadTas;
    this._store.off("beforePushAggregation", this._onPushHandler);
    this._store.off("push", this._onPushHandler);
    this._eventsStrategy.dispose();
    clearTimeout(this._aggregationTimeoutId);
    null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas || _this$_delayedLoadTas.abort();
    this._operationManager.cancelAll();
    delete this._store;
    delete this._items;
    delete this._delayedLoadTask;
    this._disposed = true;
  },
  _extractLoadOptions(options) {
    const result = {};
    let names = ["sort", "filter", "langParams", "select", "group", "requireTotalCount"];
    const customNames = this._store._customLoadOptions();
    if (customNames) {
      names = names.concat(customNames);
    }
    each(names, function() {
      result[this] = options[this];
    });
    return result;
  },
  loadOptions() {
    return this._storeLoadOptions;
  },
  items() {
    return this._items;
  },
  pageIndex(newIndex) {
    if (!isNumeric(newIndex)) {
      return this._pageIndex;
    }
    this._pageIndex = newIndex;
    this._isLastPage = !this._paginate;
  },
  paginate(value2) {
    if (!isBoolean(value2)) {
      return this._paginate;
    }
    if (this._paginate !== value2) {
      this._paginate = value2;
      this.pageIndex(0);
    }
  },
  pageSize(value2) {
    if (!isNumeric(value2)) {
      return this._pageSize;
    }
    this._pageSize = value2;
  },
  isLastPage() {
    return this._isLastPage;
  },
  generateStoreLoadOptionAccessor(optionName) {
    return (args) => {
      const normalizedArgs = normalizeStoreLoadOptionAccessorArguments(args);
      if (void 0 === normalizedArgs) {
        return this._storeLoadOptions[optionName];
      }
      this._storeLoadOptions[optionName] = normalizedArgs;
    };
  },
  sort() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.generateStoreLoadOptionAccessor("sort")(args);
  },
  filter() {
    const newFilter = normalizeStoreLoadOptionAccessorArguments(arguments);
    if (void 0 === newFilter) {
      return this._storeLoadOptions.filter;
    }
    this._storeLoadOptions.filter = newFilter;
    this.pageIndex(0);
  },
  group() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.generateStoreLoadOptionAccessor("group")(args);
  },
  select() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.generateStoreLoadOptionAccessor("select")(args);
  },
  requireTotalCount(value2) {
    if (!isBoolean(value2)) {
      return this._storeLoadOptions.requireTotalCount;
    }
    this._storeLoadOptions.requireTotalCount = value2;
  },
  searchValue(value2) {
    if (arguments.length < 1) {
      return this._searchValue;
    }
    this._searchValue = value2;
    this.pageIndex(0);
  },
  searchOperation(op) {
    if (!isString(op)) {
      return this._searchOperation;
    }
    this._searchOperation = op;
    this.pageIndex(0);
  },
  searchExpr(expr) {
    const argc = arguments.length;
    if (0 === argc) {
      return this._searchExpr;
    }
    if (argc > 1) {
      expr = [].slice.call(arguments);
    }
    this._searchExpr = expr;
    this.pageIndex(0);
  },
  store() {
    return this._store;
  },
  key() {
    var _this$_store;
    return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key();
  },
  totalCount() {
    return this._totalCount;
  },
  isLoaded() {
    return this._isLoaded;
  },
  isLoading() {
    return this._loadingCount > 0;
  },
  beginLoading() {
    this._changeLoadingCount(1);
  },
  endLoading() {
    this._changeLoadingCount(-1);
  },
  _createLoadQueue: () => createQueue(),
  _changeLoadingCount(increment) {
    const oldLoading = this.isLoading();
    this._loadingCount += increment;
    const newLoading = this.isLoading();
    if (oldLoading ^ newLoading) {
      this._eventsStrategy.fireEvent("loadingChanged", [newLoading]);
    }
  },
  _scheduleLoadCallbacks(deferred) {
    this.beginLoading();
    deferred.always(() => {
      this.endLoading();
    });
  },
  _scheduleFailCallbacks(deferred) {
    var _this = this;
    deferred.fail(function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (args[0] === CANCELED_TOKEN) {
        return;
      }
      _this._eventsStrategy.fireEvent("loadError", args);
    });
  },
  _fireChanged(args) {
    const date = /* @__PURE__ */ new Date();
    this._eventsStrategy.fireEvent("changed", args);
    this._changedTime = /* @__PURE__ */ new Date() - date;
  },
  _scheduleChangedCallbacks(deferred) {
    deferred.done(() => this._fireChanged());
  },
  loadSingle(propName, propValue) {
    const d = new Deferred();
    const key = this.key();
    const store = this._store;
    const options = this._createStoreLoadOptions();
    this._scheduleFailCallbacks(d);
    if (arguments.length < 2) {
      propValue = propName;
      propName = key;
    }
    delete options.skip;
    delete options.group;
    delete options.refresh;
    delete options.pageIndex;
    delete options.searchString;
    (() => {
      if (propName === key || store instanceof m_custom_store_default && !store._byKeyViaLoad()) {
        return store.byKey(propValue, options);
      }
      options.take = 1;
      options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
      return store.load(options);
    })().fail(d.reject).done((data2) => {
      const isEmptyArray = Array.isArray(data2) && !data2.length;
      if (!isDefined(data2) || isEmptyArray) {
        d.reject(errors.Error("E4009"));
      } else {
        if (!Array.isArray(data2)) {
          data2 = [data2];
        }
        d.resolve(this._applyMapFunction(data2)[0]);
      }
    });
    return d.promise();
  },
  load() {
    const d = new Deferred();
    const loadTask = () => {
      if (this._disposed) {
        return;
      }
      if (!isPending(d)) {
        return;
      }
      return this._loadFromStore(loadOperation, d);
    };
    this._scheduleLoadCallbacks(d);
    this._scheduleFailCallbacks(d);
    this._scheduleChangedCallbacks(d);
    const loadOperation = this._createLoadOperation(d);
    this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
    this._loadQueue.add(() => {
      if ("number" === typeof loadOperation.delay) {
        this._delayedLoadTask = m_common_default.executeAsync(loadTask, loadOperation.delay);
      } else {
        loadTask();
      }
      return d.promise();
    });
    return d.promise({
      operationId: loadOperation.operationId
    });
  },
  _onPush(changes) {
    if (this._reshapeOnPush) {
      this.load();
    } else {
      const changingArgs = {
        changes
      };
      this._eventsStrategy.fireEvent("changing", [changingArgs]);
      const group = this.group();
      const items = this.items();
      let groupLevel = 0;
      let dataSourceChanges = this.paginate() || group ? changes.filter((item) => "update" === item.type) : changes;
      if (group) {
        groupLevel = Array.isArray(group) ? group.length : 1;
      }
      if (this._mapFunc) {
        dataSourceChanges.forEach((item) => {
          if ("insert" === item.type) {
            item.data = this._mapFunc(item.data);
          }
        });
      }
      if (changingArgs.postProcessChanges) {
        dataSourceChanges = changingArgs.postProcessChanges(dataSourceChanges);
      }
      applyBatch({
        keyInfo: this.store(),
        data: items,
        changes: dataSourceChanges,
        groupCount: groupLevel,
        useInsertIndex: true
      });
      this._fireChanged([{
        changes
      }]);
    }
  },
  _createLoadOperation(deferred) {
    const operationId = this._operationManager.add(deferred);
    const storeLoadOptions = this._createStoreLoadOptions();
    if (this._store && !isEmptyObject(null === storeLoadOptions || void 0 === storeLoadOptions ? void 0 : storeLoadOptions.langParams)) {
      this._store._langParams = _extends({}, this._store._langParams, storeLoadOptions.langParams);
    }
    deferred.always(() => this._operationManager.remove(operationId));
    return {
      operationId,
      storeLoadOptions
    };
  },
  reload() {
    const store = this.store();
    store._clearCache();
    this._init();
    return this.load();
  },
  cancel(operationId) {
    return this._operationManager.cancel(operationId);
  },
  cancelAll() {
    return this._operationManager.cancelAll();
  },
  _addSearchOptions(storeLoadOptions) {
    if (this._disposed) {
      return;
    }
    if (this.store()._useDefaultSearch) {
      this._addSearchFilter(storeLoadOptions);
    } else {
      storeLoadOptions.searchOperation = this._searchOperation;
      storeLoadOptions.searchValue = this._searchValue;
      storeLoadOptions.searchExpr = this._searchExpr;
    }
  },
  _createStoreLoadOptions() {
    const result = extend({}, this._storeLoadOptions);
    this._addSearchOptions(result);
    if (this._paginate) {
      if (this._pageSize) {
        result.skip = this._pageIndex * this._pageSize;
        result.take = this._pageSize;
      }
    }
    result.userData = this._userData;
    return result;
  },
  _addSearchFilter(storeLoadOptions) {
    const value2 = this._searchValue;
    const op = this._searchOperation;
    let selector = this._searchExpr;
    const searchFilter = [];
    if (!value2) {
      return;
    }
    if (!selector) {
      selector = "this";
    }
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    each(selector, (i, item) => {
      if (searchFilter.length) {
        searchFilter.push("or");
      }
      searchFilter.push([item, op, value2]);
    });
    if (storeLoadOptions.filter) {
      storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter];
    } else {
      storeLoadOptions.filter = searchFilter;
    }
  },
  _loadFromStore(loadOptions, pendingDeferred) {
    const handleSuccess = (data2, extra) => {
      if (this._disposed) {
        return;
      }
      if (!isPending(pendingDeferred)) {
        return;
      }
      const loadResult = extend(normalizeLoadResult(data2, extra), loadOptions);
      this._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
      when(loadResult.data).done((data3) => {
        loadResult.data = data3;
        this._processStoreLoadResult(loadResult, pendingDeferred);
      }).fail(pendingDeferred.reject);
    };
    if (loadOptions.data) {
      return new Deferred().resolve(loadOptions.data).done(handleSuccess);
    }
    return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject);
  },
  _processStoreLoadResult(loadResult, pendingDeferred) {
    let {
      data: data2
    } = loadResult;
    let {
      extra
    } = loadResult;
    const {
      storeLoadOptions
    } = loadResult;
    const resolvePendingDeferred = () => {
      this._isLoaded = true;
      this._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
      return pendingDeferred.resolve(data2, extra);
    };
    const proceedLoadingTotalCount = () => {
      this.store().totalCount(storeLoadOptions).done((count) => {
        extra.totalCount = count;
        resolvePendingDeferred();
      }).fail(pendingDeferred.reject);
    };
    if (this._disposed) {
      return;
    }
    data2 = this._applyPostProcessFunction(this._applyMapFunction(data2));
    if (!isObject(extra)) {
      extra = {};
    }
    this._items = data2;
    if (!data2.length || !this._paginate || this._pageSize && data2.length < this._pageSize) {
      this._isLastPage = true;
    }
    if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
      proceedLoadingTotalCount();
    } else {
      resolvePendingDeferred();
    }
  },
  _applyMapFunction(data2) {
    if (this._mapFunc) {
      return mapDataRespectingGrouping(data2, this._mapFunc, this.group());
    }
    return data2;
  },
  _applyPostProcessFunction(data2) {
    if (this._postProcessFunc) {
      return this._postProcessFunc(data2);
    }
    return data2;
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});

// node_modules/devextreme/esm/common/data/data_source.js
var data_source_default = DataSource;

// node_modules/devextreme/esm/common/core/localization/currency.js
var currency_default = {
  _formatNumberCore: function(value2, format2, formatConfig) {
    if ("currency" === format2) {
      formatConfig.precision = formatConfig.precision || 0;
      let result = this.format(value2, extend({}, formatConfig, {
        type: "fixedpoint"
      }));
      const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
      result = result.replace(/^(\D*)(\d.*)/, "$1" + currencyPart + "$2");
      return result;
    }
    return this.callBase.apply(this, arguments);
  },
  getCurrencySymbol: function() {
    return {
      symbol: "$"
    };
  },
  getOpenXmlCurrencyFormat: function() {
    return "$#,##0{0}_);\\($#,##0{0}\\)";
  }
};

// node_modules/devextreme/esm/common/core/localization/cldr-data/parent_locales.js
var parent_locales_default = {
  "en-150": "en-001",
  "en-AG": "en-001",
  "en-AI": "en-001",
  "en-AU": "en-001",
  "en-BB": "en-001",
  "en-BM": "en-001",
  "en-BS": "en-001",
  "en-BW": "en-001",
  "en-BZ": "en-001",
  "en-CC": "en-001",
  "en-CK": "en-001",
  "en-CM": "en-001",
  "en-CX": "en-001",
  "en-CY": "en-001",
  "en-DG": "en-001",
  "en-DM": "en-001",
  "en-ER": "en-001",
  "en-FJ": "en-001",
  "en-FK": "en-001",
  "en-FM": "en-001",
  "en-GB": "en-001",
  "en-GD": "en-001",
  "en-GG": "en-001",
  "en-GH": "en-001",
  "en-GI": "en-001",
  "en-GM": "en-001",
  "en-GY": "en-001",
  "en-HK": "en-001",
  "en-IE": "en-001",
  "en-IL": "en-001",
  "en-IM": "en-001",
  "en-IN": "en-001",
  "en-IO": "en-001",
  "en-JE": "en-001",
  "en-JM": "en-001",
  "en-KE": "en-001",
  "en-KI": "en-001",
  "en-KN": "en-001",
  "en-KY": "en-001",
  "en-LC": "en-001",
  "en-LR": "en-001",
  "en-LS": "en-001",
  "en-MG": "en-001",
  "en-MO": "en-001",
  "en-MS": "en-001",
  "en-MT": "en-001",
  "en-MU": "en-001",
  "en-MV": "en-001",
  "en-MW": "en-001",
  "en-MY": "en-001",
  "en-NA": "en-001",
  "en-NF": "en-001",
  "en-NG": "en-001",
  "en-NR": "en-001",
  "en-NU": "en-001",
  "en-NZ": "en-001",
  "en-PG": "en-001",
  "en-PK": "en-001",
  "en-PN": "en-001",
  "en-PW": "en-001",
  "en-RW": "en-001",
  "en-SB": "en-001",
  "en-SC": "en-001",
  "en-SD": "en-001",
  "en-SG": "en-001",
  "en-SH": "en-001",
  "en-SL": "en-001",
  "en-SS": "en-001",
  "en-SX": "en-001",
  "en-SZ": "en-001",
  "en-TC": "en-001",
  "en-TK": "en-001",
  "en-TO": "en-001",
  "en-TT": "en-001",
  "en-TV": "en-001",
  "en-TZ": "en-001",
  "en-UG": "en-001",
  "en-VC": "en-001",
  "en-VG": "en-001",
  "en-VU": "en-001",
  "en-WS": "en-001",
  "en-ZA": "en-001",
  "en-ZM": "en-001",
  "en-ZW": "en-001",
  "en-AT": "en-150",
  "en-BE": "en-150",
  "en-CH": "en-150",
  "en-DE": "en-150",
  "en-DK": "en-150",
  "en-FI": "en-150",
  "en-NL": "en-150",
  "en-SE": "en-150",
  "en-SI": "en-150",
  "hi-Latn": "en-IN",
  "es-AR": "es-419",
  "es-BO": "es-419",
  "es-BR": "es-419",
  "es-BZ": "es-419",
  "es-CL": "es-419",
  "es-CO": "es-419",
  "es-CR": "es-419",
  "es-CU": "es-419",
  "es-DO": "es-419",
  "es-EC": "es-419",
  "es-GT": "es-419",
  "es-HN": "es-419",
  "es-MX": "es-419",
  "es-NI": "es-419",
  "es-PA": "es-419",
  "es-PE": "es-419",
  "es-PR": "es-419",
  "es-PY": "es-419",
  "es-SV": "es-419",
  "es-US": "es-419",
  "es-UY": "es-419",
  "es-VE": "es-419",
  nb: "no",
  nn: "no",
  "pt-AO": "pt-PT",
  "pt-CH": "pt-PT",
  "pt-CV": "pt-PT",
  "pt-FR": "pt-PT",
  "pt-GQ": "pt-PT",
  "pt-GW": "pt-PT",
  "pt-LU": "pt-PT",
  "pt-MO": "pt-PT",
  "pt-MZ": "pt-PT",
  "pt-ST": "pt-PT",
  "pt-TL": "pt-PT",
  "az-Arab": "und",
  "az-Cyrl": "und",
  "bal-Latn": "und",
  "blt-Latn": "und",
  "bm-Nkoo": "und",
  "bs-Cyrl": "und",
  "byn-Latn": "und",
  "cu-Glag": "und",
  "dje-Arab": "und",
  "dyo-Arab": "und",
  "en-Dsrt": "und",
  "en-Shaw": "und",
  "ff-Adlm": "und",
  "ff-Arab": "und",
  "ha-Arab": "und",
  "iu-Latn": "und",
  "kk-Arab": "und",
  "ks-Deva": "und",
  "ku-Arab": "und",
  "ky-Arab": "und",
  "ky-Latn": "und",
  "ml-Arab": "und",
  "mn-Mong": "und",
  "mni-Mtei": "und",
  "ms-Arab": "und",
  "pa-Arab": "und",
  "sat-Deva": "und",
  "sd-Deva": "und",
  "sd-Khoj": "und",
  "sd-Sind": "und",
  "shi-Latn": "und",
  "so-Arab": "und",
  "sr-Latn": "und",
  "sw-Arab": "und",
  "tg-Arab": "und",
  "ug-Cyrl": "und",
  "uz-Arab": "und",
  "uz-Cyrl": "und",
  "vai-Latn": "und",
  "wo-Arab": "und",
  "yo-Arab": "und",
  "yue-Hans": "und",
  "zh-Hant": "und",
  "zh-Hant-MO": "zh-Hant-HK"
};

// node_modules/devextreme/esm/common/core/localization/parentLocale.js
var parentLocale_default = (parentLocales, locale) => {
  const parentLocale = parentLocales[locale];
  if (parentLocale) {
    return "root" !== parentLocale && parentLocale;
  }
  return locale.substr(0, locale.lastIndexOf("-"));
};

// node_modules/devextreme/esm/common/core/localization/core.js
var core_default = dependency_injector_default({
  locale: /* @__PURE__ */ (() => {
    let currentLocale = "en";
    return (locale) => {
      if (!locale) {
        return currentLocale;
      }
      currentLocale = locale;
    };
  })(),
  getValueByClosestLocale: function(getter) {
    let locale = this.locale();
    let value2 = getter(locale);
    let isRootLocale;
    while (!value2 && !isRootLocale) {
      locale = parentLocale_default(parent_locales_default, locale);
      if (locale) {
        value2 = getter(locale);
      } else {
        isRootLocale = true;
      }
    }
    if (void 0 === value2 && "en" !== locale) {
      return getter("en");
    }
    return value2;
  }
});

// node_modules/devextreme/esm/common/core/localization/utils.js
function roundByAbs(value2) {
  const valueSign = sign(value2);
  return valueSign * Math.round(Math.abs(value2));
}
function adjustValue(value2, precision) {
  const precisionMultiplier = Math.pow(10, precision);
  const intermediateValue = multiplyInExponentialForm(value2, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
function toFixed(value2, precision) {
  const valuePrecision = precision || 0;
  const adjustedValue = valuePrecision > 0 ? adjustValue(...arguments) : value2;
  return adjustedValue.toFixed(valuePrecision);
}

// node_modules/devextreme/esm/common/core/localization/ldml/number.js
var DEFAULT_CONFIG = {
  thousandsSeparator: ",",
  decimalSeparator: "."
};
function getGroupSizes(formatString) {
  return formatString.split(",").slice(1).map(function(str) {
    let singleQuotesLeft = 0;
    return str.split("").filter(function(char, index2) {
      singleQuotesLeft += "'" === char;
      const isDigit = "#" === char || "0" === char;
      const isInStub = singleQuotesLeft % 2;
      return isDigit && !isInStub;
    }).length;
  });
}
function splitSignParts(format2) {
  let separatorChar = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ";";
  let escapingChar = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "'";
  const parts = [];
  let currentPart = "";
  let state = "searchingSeparator";
  for (let i = 0; i < format2.length; i++) {
    const char = format2[i];
    if ("searchingSeparator" === state && char === escapingChar) {
      state = "skippingSeparationInsideEscaping";
    } else if ("skippingSeparationInsideEscaping" === state && char === escapingChar) {
      state = "searchingSeparator";
    } else if ("searchingSeparator" === state && char === separatorChar) {
      state = "separating";
      parts.push(currentPart);
      currentPart = "";
    }
    if ("separating" !== state) {
      currentPart += char;
    } else {
      state = "searchingSeparator";
    }
  }
  parts.push(currentPart);
  return parts;
}
function getSignParts(format2) {
  const signParts = splitSignParts(format2);
  if (1 === signParts.length) {
    signParts.push("-" + signParts[0]);
  }
  return signParts;
}
function reverseString(str) {
  return str.toString().split("").reverse().join("");
}
function isPercentFormat(format2) {
  return -1 !== format2.indexOf("%") && !format2.match(/'[^']*%[^']*'/g);
}
function removeStubs(str) {
  return str.replace(/'[^']*'/g, "");
}
function getNonRequiredDigitCount(floatFormat) {
  if (!floatFormat) {
    return 0;
  }
  const format2 = removeStubs(floatFormat);
  return format2.length - format2.replace(/[#]/g, "").length;
}
function getRequiredDigitCount(floatFormat) {
  if (!floatFormat) {
    return 0;
  }
  const format2 = removeStubs(floatFormat);
  return format2.length - format2.replace(/[0]/g, "").length;
}
function normalizeValueString(valuePart, minDigitCount, maxDigitCount) {
  if (!valuePart) {
    return "";
  }
  if (valuePart.length > maxDigitCount) {
    valuePart = valuePart.substr(0, maxDigitCount);
  }
  while (valuePart.length > minDigitCount && "0" === valuePart.slice(-1)) {
    valuePart = valuePart.substr(0, valuePart.length - 1);
  }
  while (valuePart.length < minDigitCount) {
    valuePart += "0";
  }
  return valuePart;
}
function applyGroups(valueString, groupSizes, thousandsSeparator) {
  if (!groupSizes.length) {
    return valueString;
  }
  const groups = [];
  let index2 = 0;
  while (valueString) {
    const groupSize = groupSizes[index2];
    if (!groupSize) {
      break;
    }
    groups.push(valueString.slice(0, groupSize));
    valueString = valueString.slice(groupSize);
    if (index2 < groupSizes.length - 1) {
      index2++;
    }
  }
  return groups.join(thousandsSeparator);
}
function formatNumberPart(format2, valueString) {
  return format2.split("'").map(function(formatPart, escapeIndex) {
    const isEscape = escapeIndex % 2;
    if (!formatPart && isEscape) {
      return "'";
    }
    return isEscape ? formatPart : formatPart.replace(/[,#0]+/, valueString);
  }).join("");
}
function getFloatPointIndex(format2) {
  let isEscape = false;
  for (let index2 = 0; index2 < format2.length; index2++) {
    if ("'" === format2[index2]) {
      isEscape = !isEscape;
    }
    if ("." === format2[index2] && !isEscape) {
      return index2;
    }
  }
  return format2.length;
}
function getFormatter2(format2, config) {
  config = config || DEFAULT_CONFIG;
  return function(value2) {
    if ("number" !== typeof value2 || isNaN(value2)) {
      return "";
    }
    const signFormatParts = getSignParts(format2);
    const isPositiveZero = 1 / value2 === 1 / 0;
    const isPositive = value2 > 0 || isPositiveZero;
    const numberFormat = signFormatParts[isPositive ? 0 : 1];
    const floatPointIndex = getFloatPointIndex(numberFormat);
    const floatFormatParts = [numberFormat.substr(0, floatPointIndex), numberFormat.substr(floatPointIndex + 1)];
    const minFloatPrecision = getRequiredDigitCount(floatFormatParts[1]);
    const maxFloatPrecision = minFloatPrecision + getNonRequiredDigitCount(floatFormatParts[1]);
    if (isPercentFormat(numberFormat)) {
      value2 = multiplyInExponentialForm(value2, 2);
    }
    if (!isPositive) {
      value2 = -value2;
    }
    const minIntegerPrecision = getRequiredDigitCount(floatFormatParts[0]);
    const maxIntegerPrecision = getNonRequiredDigitCount(floatFormatParts[0]) || config.unlimitedIntegerDigits ? void 0 : minIntegerPrecision;
    const integerLength = Math.floor(value2).toString().length;
    const floatPrecision = fitIntoRange(maxFloatPrecision, 0, 15 - integerLength);
    const groupSizes = getGroupSizes(floatFormatParts[0]).reverse();
    const valueParts = toFixed(value2, floatPrecision < 0 ? 0 : floatPrecision).split(".");
    let valueIntegerPart = normalizeValueString(reverseString(valueParts[0]), minIntegerPrecision, maxIntegerPrecision);
    const valueFloatPart = normalizeValueString(valueParts[1], minFloatPrecision, maxFloatPrecision);
    valueIntegerPart = applyGroups(valueIntegerPart, groupSizes, config.thousandsSeparator);
    const integerString = reverseString(formatNumberPart(reverseString(floatFormatParts[0]), valueIntegerPart));
    const floatString = maxFloatPrecision ? formatNumberPart(floatFormatParts[1], valueFloatPart) : "";
    const result = integerString + (floatString.match(/\d/) ? config.decimalSeparator : "") + floatString;
    return result;
  };
}
function parseValue(text, isPercent, isNegative) {
  const value2 = (isPercent ? 0.01 : 1) * parseFloat(text) || 0;
  return isNegative ? -value2 : value2;
}
function prepareValueText(valueText, formatter, isPercent, isIntegerPart) {
  let nextValueText = valueText;
  let char;
  let text;
  let nextText;
  do {
    if (nextText) {
      char = text.length === nextText.length ? "0" : "1";
      valueText = isIntegerPart ? char + valueText : valueText + char;
    }
    text = nextText || formatter(parseValue(nextValueText, isPercent));
    nextValueText = isIntegerPart ? "1" + nextValueText : nextValueText + "1";
    nextText = formatter(parseValue(nextValueText, isPercent));
  } while (text !== nextText && (isIntegerPart ? text.length === nextText.length : text.length <= nextText.length));
  if (isIntegerPart && nextText.length > text.length) {
    const hasGroups = -1 === formatter(12345).indexOf("12345");
    do {
      valueText = "1" + valueText;
    } while (hasGroups && parseValue(valueText, isPercent) < 1e5);
  }
  return valueText;
}
function getFormatByValueText(valueText, formatter, isPercent, isNegative) {
  let format2 = formatter(parseValue(valueText, isPercent, isNegative));
  const valueTextParts = valueText.split(".");
  const valueTextWithModifiedFloat = valueTextParts[0] + ".3" + valueTextParts[1].slice(1);
  const valueWithModifiedFloat = parseValue(valueTextWithModifiedFloat, isPercent, isNegative);
  const decimalSeparatorIndex = formatter(valueWithModifiedFloat).indexOf("3") - 1;
  format2 = format2.replace(/(\d)\D(\d)/g, "$1,$2");
  if (decimalSeparatorIndex >= 0) {
    format2 = format2.slice(0, decimalSeparatorIndex) + "." + format2.slice(decimalSeparatorIndex + 1);
  }
  format2 = format2.replace(/1+/, "1").replace(/1/g, "#");
  if (!isPercent) {
    format2 = format2.replace(/%/g, "'%'");
  }
  return format2;
}
function getFormat(formatter) {
  let valueText = ".";
  const isPercent = formatter(1).indexOf("100") >= 0;
  valueText = prepareValueText(valueText, formatter, isPercent, true);
  valueText = prepareValueText(valueText, formatter, isPercent, false);
  const positiveFormat = getFormatByValueText(valueText, formatter, isPercent, false);
  const negativeFormat = getFormatByValueText(valueText, formatter, isPercent, true);
  return negativeFormat === "-" + positiveFormat ? positiveFormat : positiveFormat + ";" + negativeFormat;
}

// node_modules/devextreme/esm/common/core/localization/open_xml_currency_format.js
var open_xml_currency_format_default = (currencySymbol, accountingFormat) => {
  if (!accountingFormat) {
    return;
  }
  let encodedCurrencySymbol = currencySymbol;
  if ("string" === typeof currencySymbol) {
    encodedCurrencySymbol = "";
    for (let i = 0; i < currencySymbol.length; i++) {
      if ("$" !== currencySymbol[i]) {
        encodedCurrencySymbol += "\\";
      }
      encodedCurrencySymbol += currencySymbol[i];
    }
  }
  const encodeSymbols = {
    ".00": "{0}",
    "'": "\\'",
    "\\(": "\\(",
    "\\)": "\\)",
    " ": "\\ ",
    '"': "&quot;",
    "\\¤": encodedCurrencySymbol
  };
  const result = accountingFormat.split(";");
  for (let i = 0; i < result.length; i++) {
    for (const symbol in encodeSymbols) {
      if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
        result[i] = result[i].replace(new RegExp(symbol, "g"), encodeSymbols[symbol]);
      }
    }
  }
  return 2 === result.length ? result[0] + "_);" + result[1] : result[0];
};

// node_modules/devextreme/esm/common/core/localization/cldr-data/accounting_formats.js
var accounting_formats_default = {
  af: "¤#,##0.00;(¤#,##0.00)",
  "af-NA": "¤#,##0.00;(¤#,##0.00)",
  agq: "#,##0.00¤",
  ak: "¤#,##0.00",
  am: "¤#,##0.00;(¤#,##0.00)",
  ar: "¤#,##0.00;(¤#,##0.00)",
  "ar-AE": "¤#,##0.00;(¤#,##0.00)",
  "ar-BH": "¤#,##0.00;(¤#,##0.00)",
  "ar-DJ": "¤#,##0.00;(¤#,##0.00)",
  "ar-DZ": "¤#,##0.00;(¤#,##0.00)",
  "ar-EG": "¤#,##0.00;(¤#,##0.00)",
  "ar-EH": "¤#,##0.00;(¤#,##0.00)",
  "ar-ER": "¤#,##0.00;(¤#,##0.00)",
  "ar-IL": "¤#,##0.00;(¤#,##0.00)",
  "ar-IQ": "¤#,##0.00;(¤#,##0.00)",
  "ar-JO": "¤#,##0.00;(¤#,##0.00)",
  "ar-KM": "¤#,##0.00;(¤#,##0.00)",
  "ar-KW": "¤#,##0.00;(¤#,##0.00)",
  "ar-LB": "¤#,##0.00;(¤#,##0.00)",
  "ar-LY": "¤#,##0.00;(¤#,##0.00)",
  "ar-MA": "¤#,##0.00;(¤#,##0.00)",
  "ar-MR": "¤#,##0.00;(¤#,##0.00)",
  "ar-OM": "¤#,##0.00;(¤#,##0.00)",
  "ar-PS": "¤#,##0.00;(¤#,##0.00)",
  "ar-QA": "¤#,##0.00;(¤#,##0.00)",
  "ar-SA": "¤#,##0.00;(¤#,##0.00)",
  "ar-SD": "¤#,##0.00;(¤#,##0.00)",
  "ar-SO": "¤#,##0.00;(¤#,##0.00)",
  "ar-SS": "¤#,##0.00;(¤#,##0.00)",
  "ar-SY": "¤#,##0.00;(¤#,##0.00)",
  "ar-TD": "¤#,##0.00;(¤#,##0.00)",
  "ar-TN": "¤#,##0.00;(¤#,##0.00)",
  "ar-YE": "¤#,##0.00;(¤#,##0.00)",
  as: "¤ #,##,##0.00",
  asa: "#,##0.00 ¤",
  ast: "#,##0.00 ¤",
  az: "#,##0.00 ¤",
  "az-Cyrl": "#,##0.00 ¤",
  "az-Latn": "#,##0.00 ¤",
  bas: "#,##0.00 ¤",
  be: "#,##0.00 ¤",
  "be-tarask": "#,##0.00 ¤",
  bem: "¤#,##0.00;(¤#,##0.00)",
  bez: "#,##0.00¤",
  bg: "0.00 ¤;(0.00 ¤)",
  bm: "¤#,##0.00;(¤#,##0.00)",
  bn: "#,##,##0.00¤;(#,##,##0.00¤)",
  "bn-IN": "#,##,##0.00¤;(#,##,##0.00¤)",
  bo: "¤ #,##0.00",
  "bo-IN": "¤ #,##0.00",
  br: "#,##0.00 ¤",
  brx: "¤ #,##,##0.00",
  bs: "#,##0.00 ¤",
  "bs-Cyrl": "#,##0.00 ¤",
  "bs-Latn": "#,##0.00 ¤",
  ca: "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-AD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-ES-valencia": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-FR": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-IT": "#,##0.00 ¤;(#,##0.00 ¤)",
  ccp: "#,##,##0.00¤;(#,##,##0.00¤)",
  "ccp-IN": "#,##,##0.00¤;(#,##,##0.00¤)",
  ce: "#,##0.00 ¤",
  ceb: "¤#,##0.00;(¤#,##0.00)",
  cgg: "¤#,##0.00",
  chr: "¤#,##0.00;(¤#,##0.00)",
  ckb: "¤ #,##0.00",
  "ckb-IR": "¤ #,##0.00",
  cs: "#,##0.00 ¤",
  cy: "¤#,##0.00;(¤#,##0.00)",
  da: "#,##0.00 ¤",
  "da-GL": "#,##0.00 ¤",
  dav: "¤#,##0.00;(¤#,##0.00)",
  de: "#,##0.00 ¤",
  "de-AT": "#,##0.00 ¤",
  "de-BE": "#,##0.00 ¤",
  "de-CH": "#,##0.00 ¤",
  "de-IT": "#,##0.00 ¤",
  "de-LI": "#,##0.00 ¤",
  "de-LU": "#,##0.00 ¤",
  dje: "#,##0.00¤",
  doi: "¤#,##0.00",
  dsb: "#,##0.00 ¤",
  dua: "#,##0.00 ¤",
  dyo: "#,##0.00 ¤",
  dz: "¤#,##,##0.00",
  ebu: "¤#,##0.00;(¤#,##0.00)",
  ee: "¤#,##0.00;(¤#,##0.00)",
  "ee-TG": "¤#,##0.00;(¤#,##0.00)",
  el: "#,##0.00 ¤",
  "el-CY": "#,##0.00 ¤",
  en: "¤#,##0.00;(¤#,##0.00)",
  "en-001": "¤#,##0.00;(¤#,##0.00)",
  "en-150": "#,##0.00 ¤",
  "en-AE": "¤#,##0.00;(¤#,##0.00)",
  "en-AG": "¤#,##0.00;(¤#,##0.00)",
  "en-AI": "¤#,##0.00;(¤#,##0.00)",
  "en-AS": "¤#,##0.00;(¤#,##0.00)",
  "en-AT": "¤ #,##0.00",
  "en-AU": "¤#,##0.00;(¤#,##0.00)",
  "en-BB": "¤#,##0.00;(¤#,##0.00)",
  "en-BE": "#,##0.00 ¤",
  "en-BI": "¤#,##0.00;(¤#,##0.00)",
  "en-BM": "¤#,##0.00;(¤#,##0.00)",
  "en-BS": "¤#,##0.00;(¤#,##0.00)",
  "en-BW": "¤#,##0.00;(¤#,##0.00)",
  "en-BZ": "¤#,##0.00;(¤#,##0.00)",
  "en-CA": "¤#,##0.00;(¤#,##0.00)",
  "en-CC": "¤#,##0.00;(¤#,##0.00)",
  "en-CH": "¤ #,##0.00;¤-#,##0.00",
  "en-CK": "¤#,##0.00;(¤#,##0.00)",
  "en-CM": "¤#,##0.00;(¤#,##0.00)",
  "en-CX": "¤#,##0.00;(¤#,##0.00)",
  "en-CY": "¤#,##0.00;(¤#,##0.00)",
  "en-DE": "#,##0.00 ¤",
  "en-DG": "¤#,##0.00;(¤#,##0.00)",
  "en-DK": "#,##0.00 ¤",
  "en-DM": "¤#,##0.00;(¤#,##0.00)",
  "en-ER": "¤#,##0.00;(¤#,##0.00)",
  "en-FI": "#,##0.00 ¤",
  "en-FJ": "¤#,##0.00;(¤#,##0.00)",
  "en-FK": "¤#,##0.00;(¤#,##0.00)",
  "en-FM": "¤#,##0.00;(¤#,##0.00)",
  "en-GB": "¤#,##0.00;(¤#,##0.00)",
  "en-GD": "¤#,##0.00;(¤#,##0.00)",
  "en-GG": "¤#,##0.00;(¤#,##0.00)",
  "en-GH": "¤#,##0.00;(¤#,##0.00)",
  "en-GI": "¤#,##0.00;(¤#,##0.00)",
  "en-GM": "¤#,##0.00;(¤#,##0.00)",
  "en-GU": "¤#,##0.00;(¤#,##0.00)",
  "en-GY": "¤#,##0.00;(¤#,##0.00)",
  "en-HK": "¤#,##0.00;(¤#,##0.00)",
  "en-IE": "¤#,##0.00;(¤#,##0.00)",
  "en-IL": "¤#,##0.00;(¤#,##0.00)",
  "en-IM": "¤#,##0.00;(¤#,##0.00)",
  "en-IN": "¤#,##0.00;(¤#,##0.00)",
  "en-IO": "¤#,##0.00;(¤#,##0.00)",
  "en-JE": "¤#,##0.00;(¤#,##0.00)",
  "en-JM": "¤#,##0.00;(¤#,##0.00)",
  "en-KE": "¤#,##0.00;(¤#,##0.00)",
  "en-KI": "¤#,##0.00;(¤#,##0.00)",
  "en-KN": "¤#,##0.00;(¤#,##0.00)",
  "en-KY": "¤#,##0.00;(¤#,##0.00)",
  "en-LC": "¤#,##0.00;(¤#,##0.00)",
  "en-LR": "¤#,##0.00;(¤#,##0.00)",
  "en-LS": "¤#,##0.00;(¤#,##0.00)",
  "en-MG": "¤#,##0.00;(¤#,##0.00)",
  "en-MH": "¤#,##0.00;(¤#,##0.00)",
  "en-MO": "¤#,##0.00;(¤#,##0.00)",
  "en-MP": "¤#,##0.00;(¤#,##0.00)",
  "en-MS": "¤#,##0.00;(¤#,##0.00)",
  "en-MT": "¤#,##0.00;(¤#,##0.00)",
  "en-MU": "¤#,##0.00;(¤#,##0.00)",
  "en-MV": "¤ #,##0.00",
  "en-MW": "¤#,##0.00;(¤#,##0.00)",
  "en-MY": "¤#,##0.00;(¤#,##0.00)",
  "en-NA": "¤#,##0.00;(¤#,##0.00)",
  "en-NF": "¤#,##0.00;(¤#,##0.00)",
  "en-NG": "¤#,##0.00;(¤#,##0.00)",
  "en-NL": "¤ #,##0.00;(¤ #,##0.00)",
  "en-NR": "¤#,##0.00;(¤#,##0.00)",
  "en-NU": "¤#,##0.00;(¤#,##0.00)",
  "en-NZ": "¤#,##0.00;(¤#,##0.00)",
  "en-PG": "¤#,##0.00;(¤#,##0.00)",
  "en-PH": "¤#,##0.00;(¤#,##0.00)",
  "en-PK": "¤#,##0.00;(¤#,##0.00)",
  "en-PN": "¤#,##0.00;(¤#,##0.00)",
  "en-PR": "¤#,##0.00;(¤#,##0.00)",
  "en-PW": "¤#,##0.00;(¤#,##0.00)",
  "en-RW": "¤#,##0.00;(¤#,##0.00)",
  "en-SB": "¤#,##0.00;(¤#,##0.00)",
  "en-SC": "¤#,##0.00;(¤#,##0.00)",
  "en-SD": "¤#,##0.00;(¤#,##0.00)",
  "en-SE": "#,##0.00 ¤",
  "en-SG": "¤#,##0.00;(¤#,##0.00)",
  "en-SH": "¤#,##0.00;(¤#,##0.00)",
  "en-SI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "en-SL": "¤#,##0.00;(¤#,##0.00)",
  "en-SS": "¤#,##0.00;(¤#,##0.00)",
  "en-SX": "¤#,##0.00;(¤#,##0.00)",
  "en-SZ": "¤#,##0.00;(¤#,##0.00)",
  "en-TC": "¤#,##0.00;(¤#,##0.00)",
  "en-TK": "¤#,##0.00;(¤#,##0.00)",
  "en-TO": "¤#,##0.00;(¤#,##0.00)",
  "en-TT": "¤#,##0.00;(¤#,##0.00)",
  "en-TV": "¤#,##0.00;(¤#,##0.00)",
  "en-TZ": "¤#,##0.00;(¤#,##0.00)",
  "en-UG": "¤#,##0.00;(¤#,##0.00)",
  "en-UM": "¤#,##0.00;(¤#,##0.00)",
  "en-VC": "¤#,##0.00;(¤#,##0.00)",
  "en-VG": "¤#,##0.00;(¤#,##0.00)",
  "en-VI": "¤#,##0.00;(¤#,##0.00)",
  "en-VU": "¤#,##0.00;(¤#,##0.00)",
  "en-WS": "¤#,##0.00;(¤#,##0.00)",
  "en-ZA": "¤#,##0.00;(¤#,##0.00)",
  "en-ZM": "¤#,##0.00;(¤#,##0.00)",
  "en-ZW": "¤#,##0.00;(¤#,##0.00)",
  eo: "¤ #,##0.00",
  es: "#,##0.00 ¤",
  "es-419": "¤#,##0.00",
  "es-AR": "¤ #,##0.00;(¤ #,##0.00)",
  "es-BO": "¤#,##0.00",
  "es-BR": "¤#,##0.00",
  "es-BZ": "¤#,##0.00",
  "es-CL": "¤#,##0.00",
  "es-CO": "¤#,##0.00",
  "es-CR": "¤#,##0.00",
  "es-CU": "¤#,##0.00",
  "es-DO": "¤#,##0.00;(¤#,##0.00)",
  "es-EA": "#,##0.00 ¤",
  "es-EC": "¤#,##0.00",
  "es-GQ": "#,##0.00 ¤",
  "es-GT": "¤#,##0.00",
  "es-HN": "¤#,##0.00",
  "es-IC": "#,##0.00 ¤",
  "es-MX": "¤#,##0.00",
  "es-NI": "¤#,##0.00",
  "es-PA": "¤#,##0.00",
  "es-PE": "¤#,##0.00",
  "es-PH": "#,##0.00 ¤",
  "es-PR": "¤#,##0.00",
  "es-PY": "¤#,##0.00",
  "es-SV": "¤#,##0.00",
  "es-US": "¤#,##0.00",
  "es-UY": "¤ #,##0.00;(¤ #,##0.00)",
  "es-VE": "¤#,##0.00",
  et: "#,##0.00 ¤;(#,##0.00 ¤)",
  eu: "#,##0.00 ¤;(#,##0.00 ¤)",
  ewo: "#,##0.00 ¤",
  fa: "‎¤ #,##0.00;‎(¤ #,##0.00)",
  "fa-AF": "¤ #,##0.00;‎(¤ #,##0.00)",
  ff: "#,##0.00 ¤",
  "ff-Adlm": "¤ #,##0.00",
  "ff-Adlm-BF": "¤ #,##0.00",
  "ff-Adlm-CM": "¤ #,##0.00",
  "ff-Adlm-GH": "¤ #,##0.00",
  "ff-Adlm-GM": "¤ #,##0.00",
  "ff-Adlm-GW": "¤ #,##0.00",
  "ff-Adlm-LR": "¤ #,##0.00",
  "ff-Adlm-MR": "¤ #,##0.00",
  "ff-Adlm-NE": "¤ #,##0.00",
  "ff-Adlm-NG": "¤ #,##0.00",
  "ff-Adlm-SL": "¤ #,##0.00",
  "ff-Adlm-SN": "¤ #,##0.00",
  "ff-Latn": "#,##0.00 ¤",
  "ff-Latn-BF": "#,##0.00 ¤",
  "ff-Latn-CM": "#,##0.00 ¤",
  "ff-Latn-GH": "#,##0.00 ¤",
  "ff-Latn-GM": "#,##0.00 ¤",
  "ff-Latn-GN": "#,##0.00 ¤",
  "ff-Latn-GW": "#,##0.00 ¤",
  "ff-Latn-LR": "#,##0.00 ¤",
  "ff-Latn-MR": "#,##0.00 ¤",
  "ff-Latn-NE": "#,##0.00 ¤",
  "ff-Latn-NG": "#,##0.00 ¤",
  "ff-Latn-SL": "#,##0.00 ¤",
  fi: "#,##0.00 ¤",
  fil: "¤#,##0.00;(¤#,##0.00)",
  fo: "#,##0.00 ¤;(#,##0.00 ¤)",
  "fo-DK": "#,##0.00 ¤;(#,##0.00 ¤)",
  fr: "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BJ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BL": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CH": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-DJ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-DZ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GP": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-HT": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-KM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-LU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-ML": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MR": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-NC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-NE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-PF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-PM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-RE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-RW": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SY": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-VU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-WF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-YT": "#,##0.00 ¤;(#,##0.00 ¤)",
  fur: "¤ #,##0.00",
  fy: "¤ #,##0.00;(¤ #,##0.00)",
  ga: "¤#,##0.00;(¤#,##0.00)",
  "ga-GB": "¤#,##0.00;(¤#,##0.00)",
  gd: "¤#,##0.00;(¤#,##0.00)",
  gl: "#,##0.00 ¤",
  gsw: "#,##0.00 ¤",
  "gsw-FR": "#,##0.00 ¤",
  "gsw-LI": "#,##0.00 ¤",
  gu: "¤#,##,##0.00;(¤#,##,##0.00)",
  guz: "¤#,##0.00;(¤#,##0.00)",
  gv: "¤#,##0.00",
  ha: "¤ #,##0.00",
  "ha-GH": "¤ #,##0.00",
  "ha-NE": "¤ #,##0.00",
  haw: "¤#,##0.00;(¤#,##0.00)",
  he: "#,##0.00 ¤",
  hi: "¤#,##,##0.00",
  "hi-Latn": "¤#,##,##0.00",
  hr: "#,##0.00 ¤",
  "hr-BA": "#,##0.00 ¤",
  hsb: "#,##0.00 ¤",
  hu: "#,##0.00 ¤",
  hy: "#,##0.00 ¤",
  ia: "¤ #,##0.00;(¤ #,##0.00)",
  id: "¤#,##0.00",
  ig: "¤#,##0.00;(¤#,##0.00)",
  ii: "¤ #,##0.00",
  is: "#,##0.00 ¤",
  it: "#,##0.00 ¤",
  "it-CH": "#,##0.00 ¤",
  "it-SM": "#,##0.00 ¤",
  "it-VA": "#,##0.00 ¤",
  ja: "¤#,##0.00;(¤#,##0.00)",
  jgo: "¤ #,##0.00",
  jmc: "¤#,##0.00",
  jv: "¤ #,##0.00",
  ka: "#,##0.00 ¤",
  kab: "#,##0.00¤",
  kam: "¤#,##0.00;(¤#,##0.00)",
  kde: "¤#,##0.00;(¤#,##0.00)",
  kea: "#,##0.00 ¤;(#,##0.00 ¤)",
  kgp: "¤ #,##0.00",
  khq: "#,##0.00¤",
  ki: "¤#,##0.00;(¤#,##0.00)",
  kk: "#,##0.00 ¤",
  kkj: "¤ #,##0.00",
  kl: "¤#,##0.00;¤-#,##0.00",
  kln: "¤#,##0.00;(¤#,##0.00)",
  km: "#,##0.00¤;(#,##0.00¤)",
  kn: "¤#,##0.00;(¤#,##0.00)",
  ko: "¤#,##0.00;(¤#,##0.00)",
  "ko-KP": "¤#,##0.00;(¤#,##0.00)",
  kok: "¤#,##0.00;(¤#,##0.00)",
  ks: "¤#,##0.00",
  "ks-Arab": "¤#,##0.00",
  "ks-Deva": "¤ #,##0.00",
  ksb: "#,##0.00¤",
  ksf: "#,##0.00 ¤",
  ksh: "#,##0.00 ¤",
  ku: "#,##0.00 ¤;(#,##0.00 ¤)",
  kw: "¤#,##0.00",
  ky: "#,##0.00 ¤",
  lag: "¤ #,##0.00",
  lb: "#,##0.00 ¤",
  lg: "#,##0.00¤",
  lkt: "¤ #,##0.00",
  ln: "#,##0.00 ¤",
  "ln-AO": "#,##0.00 ¤",
  "ln-CF": "#,##0.00 ¤",
  "ln-CG": "#,##0.00 ¤",
  lo: "¤#,##0.00;¤-#,##0.00",
  lrc: "¤ #,##0.00",
  "lrc-IQ": "¤ #,##0.00",
  lt: "#,##0.00 ¤",
  lu: "#,##0.00¤",
  luo: "#,##0.00¤",
  luy: "¤#,##0.00;¤- #,##0.00",
  lv: "#,##0.00 ¤",
  mai: "¤ #,##0.00",
  mas: "¤#,##0.00;(¤#,##0.00)",
  "mas-TZ": "¤#,##0.00;(¤#,##0.00)",
  mer: "¤#,##0.00;(¤#,##0.00)",
  mfe: "¤ #,##0.00",
  mg: "¤#,##0.00",
  mgh: "¤ #,##0.00",
  mgo: "¤ #,##0.00",
  mi: "¤ #,##0.00",
  mk: "#,##0.00 ¤",
  ml: "¤#,##0.00;(¤#,##0.00)",
  mn: "¤ #,##0.00",
  mni: "¤ #,##0.00",
  "mni-Beng": "¤ #,##0.00",
  mr: "¤#,##0.00;(¤#,##0.00)",
  ms: "¤#,##0.00;(¤#,##0.00)",
  "ms-BN": "¤#,##0.00;(¤#,##0.00)",
  "ms-ID": "¤#,##0.00",
  "ms-SG": "¤#,##0.00;(¤#,##0.00)",
  mt: "¤#,##0.00",
  mua: "¤#,##0.00;(¤#,##0.00)",
  my: "¤ #,##0.00",
  mzn: "¤ #,##0.00",
  naq: "¤#,##0.00",
  nb: "¤ #,##0.00;(¤ #,##0.00)",
  "nb-SJ": "¤ #,##0.00;(¤ #,##0.00)",
  nd: "¤#,##0.00;(¤#,##0.00)",
  nds: "¤ #,##0.00",
  "nds-NL": "¤ #,##0.00",
  ne: "¤ #,##,##0.00",
  "ne-IN": "¤ #,##,##0.00",
  nl: "¤ #,##0.00;(¤ #,##0.00)",
  "nl-AW": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-BE": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-BQ": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-CW": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-SR": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-SX": "¤ #,##0.00;(¤ #,##0.00)",
  nmg: "#,##0.00 ¤",
  nn: "#,##0.00 ¤",
  nnh: "¤ #,##0.00",
  no: "¤ #,##0.00;(¤ #,##0.00)",
  nus: "¤#,##0.00;(¤#,##0.00)",
  nyn: "¤#,##0.00",
  om: "¤#,##0.00",
  "om-KE": "¤#,##0.00",
  or: "¤#,##0.00;(¤#,##0.00)",
  os: "¤ #,##0.00",
  "os-RU": "¤ #,##0.00",
  pa: "¤ #,##0.00",
  "pa-Arab": "¤ #,##0.00",
  "pa-Guru": "¤ #,##0.00",
  pcm: "¤#,##0.00",
  pl: "#,##0.00 ¤;(#,##0.00 ¤)",
  ps: "¤#,##0.00;(¤#,##0.00)",
  "ps-PK": "¤#,##0.00;(¤#,##0.00)",
  pt: "¤ #,##0.00",
  "pt-AO": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-CH": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-CV": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-GQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-GW": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-LU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-MO": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-MZ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-PT": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-ST": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-TL": "#,##0.00 ¤;(#,##0.00 ¤)",
  qu: "¤ #,##0.00",
  "qu-BO": "¤ #,##0.00",
  "qu-EC": "¤ #,##0.00",
  rm: "#,##0.00 ¤",
  rn: "#,##0.00¤",
  ro: "#,##0.00 ¤;(#,##0.00 ¤)",
  "ro-MD": "#,##0.00 ¤;(#,##0.00 ¤)",
  rof: "¤#,##0.00",
  ru: "#,##0.00 ¤",
  "ru-BY": "#,##0.00 ¤",
  "ru-KG": "#,##0.00 ¤",
  "ru-KZ": "#,##0.00 ¤",
  "ru-MD": "#,##0.00 ¤",
  "ru-UA": "#,##0.00 ¤",
  rw: "¤ #,##0.00",
  rwk: "#,##0.00¤",
  sa: "¤ #,##0.00",
  sah: "#,##0.00 ¤",
  saq: "¤#,##0.00;(¤#,##0.00)",
  sat: "¤ #,##0.00",
  "sat-Olck": "¤ #,##0.00",
  sbp: "#,##0.00¤",
  sc: "#,##0.00 ¤",
  sd: "¤ #,##0.00",
  "sd-Arab": "¤ #,##0.00",
  "sd-Deva": "¤ #,##0.00",
  se: "#,##0.00 ¤",
  "se-FI": "#,##0.00 ¤",
  "se-SE": "#,##0.00 ¤",
  seh: "#,##0.00¤",
  ses: "#,##0.00¤",
  sg: "¤#,##0.00;¤-#,##0.00",
  shi: "#,##0.00¤",
  "shi-Latn": "#,##0.00¤",
  "shi-Tfng": "#,##0.00¤",
  si: "¤#,##0.00;(¤#,##0.00)",
  sk: "#,##0.00 ¤;(#,##0.00 ¤)",
  sl: "#,##0.00 ¤;(#,##0.00 ¤)",
  smn: "#,##0.00 ¤",
  sn: "¤#,##0.00;(¤#,##0.00)",
  so: "¤#,##0.00;(¤#,##0.00)",
  "so-DJ": "¤#,##0.00;(¤#,##0.00)",
  "so-ET": "¤#,##0.00;(¤#,##0.00)",
  "so-KE": "¤#,##0.00;(¤#,##0.00)",
  sq: "#,##0.00 ¤;(#,##0.00 ¤)",
  "sq-MK": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sq-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  sr: "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-BA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-ME": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-BA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-ME": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  su: "¤#,##0.00",
  "su-Latn": "¤#,##0.00",
  sv: "#,##0.00 ¤",
  "sv-AX": "#,##0.00 ¤",
  "sv-FI": "#,##0.00 ¤",
  sw: "¤ #,##0.00",
  "sw-CD": "¤ #,##0.00",
  "sw-KE": "¤ #,##0.00",
  "sw-UG": "¤ #,##0.00",
  ta: "¤#,##0.00;(¤#,##0.00)",
  "ta-LK": "¤#,##0.00;(¤#,##0.00)",
  "ta-MY": "¤#,##0.00;(¤#,##0.00)",
  "ta-SG": "¤#,##0.00;(¤#,##0.00)",
  te: "¤#,##0.00;(¤#,##0.00)",
  teo: "¤#,##0.00;(¤#,##0.00)",
  "teo-KE": "¤#,##0.00;(¤#,##0.00)",
  tg: "#,##0.00 ¤",
  th: "¤#,##0.00;(¤#,##0.00)",
  ti: "¤#,##0.00",
  "ti-ER": "¤#,##0.00",
  tk: "#,##0.00 ¤",
  to: "¤ #,##0.00",
  tr: "¤#,##0.00;(¤#,##0.00)",
  "tr-CY": "¤#,##0.00;(¤#,##0.00)",
  tt: "#,##0.00 ¤",
  twq: "#,##0.00¤",
  tzm: "#,##0.00 ¤",
  ug: "¤#,##0.00;(¤#,##0.00)",
  uk: "#,##0.00 ¤",
  und: "¤ #,##0.00",
  ur: "¤#,##0.00;(¤#,##0.00)",
  "ur-IN": "¤#,##0.00;(¤#,##0.00)",
  uz: "#,##0.00 ¤",
  "uz-Arab": "¤ #,##0.00",
  "uz-Cyrl": "#,##0.00 ¤",
  "uz-Latn": "#,##0.00 ¤",
  vai: "¤#,##0.00;(¤#,##0.00)",
  "vai-Latn": "¤#,##0.00;(¤#,##0.00)",
  "vai-Vaii": "¤#,##0.00;(¤#,##0.00)",
  vi: "#,##0.00 ¤",
  vun: "¤#,##0.00",
  wae: "¤ #,##0.00",
  wo: "¤ #,##0.00",
  xh: "¤#,##0.00",
  xog: "#,##0.00 ¤",
  yav: "#,##0.00 ¤;(#,##0.00 ¤)",
  yi: "¤ #,##0.00",
  yo: "¤#,##0.00;(¤#,##0.00)",
  "yo-BJ": "¤#,##0.00;(¤#,##0.00)",
  yrl: "¤ #,##0.00",
  "yrl-CO": "¤ #,##0.00",
  "yrl-VE": "¤ #,##0.00",
  yue: "¤#,##0.00;(¤#,##0.00)",
  "yue-Hans": "¤#,##0.00;(¤#,##0.00)",
  "yue-Hant": "¤#,##0.00;(¤#,##0.00)",
  zgh: "#,##0.00¤",
  zh: "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-HK": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-MO": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-SG": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant-HK": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant-MO": "¤#,##0.00;(¤#,##0.00)",
  zu: "¤#,##0.00;(¤#,##0.00)"
};

// node_modules/devextreme/esm/common/core/localization/intl/number.js
var CURRENCY_STYLES = ["standard", "accounting"];
var detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
var formattersCache = {};
var getFormatter3 = (format2) => {
  const key = core_default.locale() + "/" + JSON.stringify(format2);
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.NumberFormat(core_default.locale(), format2).format;
  }
  return formattersCache[key];
};
var getCurrencyFormatter = (currency) => new Intl.NumberFormat(core_default.locale(), {
  style: "currency",
  currency
});
var number_default = {
  engine: function() {
    return "intl";
  },
  _formatNumberCore: function(value2, format2, formatConfig) {
    if ("exponential" === format2) {
      return this.callBase.apply(this, arguments);
    }
    return getFormatter3(this._normalizeFormatConfig(format2, formatConfig, value2))(value2);
  },
  _normalizeFormatConfig: function(format2, formatConfig, value2) {
    let config;
    if ("decimal" === format2) {
      const fractionDigits = String(value2).split(".")[1];
      config = {
        minimumIntegerDigits: formatConfig.precision || void 0,
        useGrouping: false,
        maximumFractionDigits: fractionDigits && fractionDigits.length,
        round: value2 < 0 ? "ceil" : "floor"
      };
    } else {
      config = this._getPrecisionConfig(formatConfig.precision);
    }
    if ("percent" === format2) {
      config.style = "percent";
    } else if ("currency" === format2) {
      const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? config_default().defaultUseCurrencyAccountingStyle;
      config.style = "currency";
      config.currency = formatConfig.currency || config_default().defaultCurrency;
      config.currencySign = CURRENCY_STYLES[+useAccountingStyle];
    }
    return config;
  },
  _getPrecisionConfig: function(precision) {
    let config;
    if (null === precision) {
      config = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20
      };
    } else {
      config = {
        minimumFractionDigits: precision || 0,
        maximumFractionDigits: precision || 0
      };
    }
    return config;
  },
  format: function(value2, format2) {
    if ("number" !== typeof value2) {
      return value2;
    }
    format2 = this._normalizeFormat(format2);
    if ("default" === format2.currency) {
      format2.currency = config_default().defaultCurrency;
    }
    if (!format2 || "function" !== typeof format2 && !format2.type && !format2.formatter) {
      return getFormatter3(format2)(value2);
    }
    return this.callBase.apply(this, arguments);
  },
  _getCurrencySymbolInfo: function(currency) {
    const formatter = getCurrencyFormatter(currency);
    return this._extractCurrencySymbolInfo(formatter.format(0));
  },
  _extractCurrencySymbolInfo: function(currencyValueString) {
    const match = detectCurrencySymbolRegex.exec(currencyValueString) || [];
    const position2 = match[1] ? "before" : "after";
    const symbol = match[1] || match[4] || "";
    const delimiter = match[2] || match[3] || "";
    return {
      position: position2,
      symbol,
      delimiter
    };
  },
  getCurrencySymbol: function(currency) {
    if (!currency) {
      currency = config_default().defaultCurrency;
    }
    const symbolInfo = this._getCurrencySymbolInfo(currency);
    return {
      symbol: symbolInfo.symbol
    };
  },
  getOpenXmlCurrencyFormat: function(currency) {
    const targetCurrency = currency || config_default().defaultCurrency;
    const currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
    const closestAccountingFormat = core_default.getValueByClosestLocale((locale) => accounting_formats_default[locale]);
    return open_xml_currency_format_default(currencySymbol, closestAccountingFormat);
  }
};

// node_modules/devextreme/esm/common/core/localization/number.js
var hasIntl = "undefined" !== typeof Intl;
var NUMERIC_FORMATS = ["currency", "fixedpoint", "exponential", "percent", "decimal"];
var LargeNumberFormatPostfixes = {
  1: "K",
  2: "M",
  3: "B",
  4: "T"
};
var LargeNumberFormatPowers = {
  largenumber: "auto",
  thousands: 1,
  millions: 2,
  billions: 3,
  trillions: 4
};
var numberLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  numericFormats: NUMERIC_FORMATS,
  defaultLargeNumberFormatPostfixes: LargeNumberFormatPostfixes,
  _parseNumberFormatString: function(formatType) {
    const formatObject = {};
    if (!formatType || "string" !== typeof formatType) {
      return;
    }
    const formatList = formatType.toLowerCase().split(" ");
    each(formatList, (index2, value2) => {
      if (NUMERIC_FORMATS.includes(value2)) {
        formatObject.formatType = value2;
      } else if (value2 in LargeNumberFormatPowers) {
        formatObject.power = LargeNumberFormatPowers[value2];
      }
    });
    if (formatObject.power && !formatObject.formatType) {
      formatObject.formatType = "fixedpoint";
    }
    if (formatObject.formatType) {
      return formatObject;
    }
  },
  _calculateNumberPower: function(value2, base2, minPower, maxPower) {
    let number = Math.abs(value2);
    let power = 0;
    if (number > 1) {
      while (number && number >= base2 && (void 0 === maxPower || power < maxPower)) {
        power++;
        number /= base2;
      }
    } else if (number > 0 && number < 1) {
      while (number < 1 && (void 0 === minPower || power > minPower)) {
        power--;
        number *= base2;
      }
    }
    return power;
  },
  _getNumberByPower: function(number, power, base2) {
    let result = number;
    while (power > 0) {
      result /= base2;
      power--;
    }
    while (power < 0) {
      result *= base2;
      power++;
    }
    return result;
  },
  _formatNumber: function(value2, formatObject, formatConfig) {
    if ("auto" === formatObject.power) {
      formatObject.power = this._calculateNumberPower(value2, 1e3, 0, 4);
    }
    if (formatObject.power) {
      value2 = this._getNumberByPower(value2, formatObject.power, 1e3);
    }
    const powerPostfix = this.defaultLargeNumberFormatPostfixes[formatObject.power] || "";
    let result = this._formatNumberCore(value2, formatObject.formatType, formatConfig);
    result = result.replace(/(\d|.$)(\D*)$/, "$1" + powerPostfix + "$2");
    return result;
  },
  _formatNumberExponential: function(value2, formatConfig) {
    let power = this._calculateNumberPower(value2, 10);
    let number = this._getNumberByPower(value2, power, 10);
    if (void 0 === formatConfig.precision) {
      formatConfig.precision = 1;
    }
    if (number.toFixed(formatConfig.precision || 0) >= 10) {
      power++;
      number /= 10;
    }
    const powString = (power >= 0 ? "+" : "") + power.toString();
    return this._formatNumberCore(number, "fixedpoint", formatConfig) + "E" + powString;
  },
  _addZeroes: function(value2, precision) {
    const multiplier = Math.pow(10, precision);
    const sign2 = value2 < 0 ? "-" : "";
    value2 = (Math.abs(value2) * multiplier >>> 0) / multiplier;
    let result = value2.toString();
    while (result.length < precision) {
      result = "0" + result;
    }
    return sign2 + result;
  },
  _addGroupSeparators: function(value2) {
    const parts = value2.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config_default2().thousandsSeparator) + (parts[1] ? config_default2().decimalSeparator + parts[1] : "");
  },
  _formatNumberCore: function(value2, format2, formatConfig) {
    if ("exponential" === format2) {
      return this._formatNumberExponential(value2, formatConfig);
    }
    if ("decimal" !== format2 && null !== formatConfig.precision) {
      formatConfig.precision = formatConfig.precision || 0;
    }
    if ("percent" === format2) {
      value2 *= 100;
    }
    if (void 0 !== formatConfig.precision) {
      if ("decimal" === format2) {
        value2 = this._addZeroes(value2, formatConfig.precision);
      } else {
        value2 = null === formatConfig.precision ? value2.toPrecision() : toFixed(value2, formatConfig.precision);
      }
    }
    if ("decimal" !== format2) {
      value2 = this._addGroupSeparators(value2);
    } else {
      value2 = value2.toString().replace(".", config_default2().decimalSeparator);
    }
    if ("percent" === format2) {
      value2 += "%";
    }
    return value2;
  },
  _normalizeFormat: function(format2) {
    if (!format2) {
      return {};
    }
    if ("function" === typeof format2) {
      return format2;
    }
    if (!isPlainObject(format2)) {
      format2 = {
        type: format2
      };
    }
    return format2;
  },
  _getSeparators: function() {
    return {
      decimalSeparator: this.getDecimalSeparator(),
      thousandsSeparator: this.getThousandsSeparator()
    };
  },
  getThousandsSeparator: function() {
    return this.format(1e4, "fixedPoint")[2];
  },
  getDecimalSeparator: function() {
    return this.format(1.2, {
      type: "fixedPoint",
      precision: 1
    })[1];
  },
  convertDigits: function(value2, toStandard) {
    const digits = this.format(90, "decimal");
    if ("string" !== typeof value2 || "0" === digits[1]) {
      return value2;
    }
    const fromFirstDigit = toStandard ? digits[1] : "0";
    const toFirstDigit = toStandard ? "0" : digits[1];
    const fromLastDigit = toStandard ? digits[0] : "9";
    const regExp = new RegExp("[" + fromFirstDigit + "-" + fromLastDigit + "]", "g");
    return value2.replace(regExp, (char) => String.fromCharCode(char.charCodeAt(0) + (toFirstDigit.charCodeAt(0) - fromFirstDigit.charCodeAt(0))));
  },
  getNegativeEtalonRegExp: function(format2) {
    const separators = this._getSeparators();
    const digitalRegExp = new RegExp("[0-9" + escapeRegExp(separators.decimalSeparator + separators.thousandsSeparator) + "]+", "g");
    let negativeEtalon = this.format(-1, format2).replace(digitalRegExp, "1");
    ["\\", "(", ")", "[", "]", "*", "+", "$", "^", "?", "|", "{", "}"].forEach((char) => {
      negativeEtalon = negativeEtalon.replace(new RegExp(`\\${char}`, "g"), `\\${char}`);
    });
    negativeEtalon = negativeEtalon.replace(/ /g, "\\s");
    negativeEtalon = negativeEtalon.replace(/1/g, ".*");
    return new RegExp(negativeEtalon, "g");
  },
  getSign: function(text, format2) {
    if (!format2) {
      if ("-" === text.replace(/[^0-9-]/g, "").charAt(0)) {
        return -1;
      }
      return 1;
    }
    const negativeEtalon = this.getNegativeEtalonRegExp(format2);
    return text.match(negativeEtalon) ? -1 : 1;
  },
  format: function(value2, format2) {
    if ("number" !== typeof value2) {
      return value2;
    }
    if ("number" === typeof format2) {
      return value2;
    }
    format2 = format2 && format2.formatter || format2;
    if ("function" === typeof format2) {
      return format2(value2);
    }
    format2 = this._normalizeFormat(format2);
    if (!format2.type) {
      format2.type = "decimal";
    }
    const numberConfig = this._parseNumberFormatString(format2.type);
    if (!numberConfig) {
      const formatterConfig = this._getSeparators();
      formatterConfig.unlimitedIntegerDigits = format2.unlimitedIntegerDigits;
      return this.convertDigits(getFormatter2(format2.type, formatterConfig)(value2));
    }
    return this._formatNumber(value2, numberConfig, format2);
  },
  parse: function(text, format2) {
    if (!text) {
      return;
    }
    if (format2 && format2.parser) {
      return format2.parser(text);
    }
    text = this.convertDigits(text, true);
    if (format2 && "string" !== typeof format2) {
      errors_default.log("W0011");
    }
    const decimalSeparator = this.getDecimalSeparator();
    const regExp = new RegExp("[^0-9" + escapeRegExp(decimalSeparator) + "]", "g");
    const cleanedText = text.replace(regExp, "").replace(decimalSeparator, ".").replace(/\.$/g, "");
    if ("." === cleanedText || "" === cleanedText) {
      return null;
    }
    if (this._calcSignificantDigits(cleanedText) > 15) {
      return NaN;
    }
    let parsed = +cleanedText * this.getSign(text, format2);
    format2 = this._normalizeFormat(format2);
    const formatConfig = this._parseNumberFormatString(format2.type);
    let power = null === formatConfig || void 0 === formatConfig ? void 0 : formatConfig.power;
    if (power) {
      if ("auto" === power) {
        const match = text.match(/\d(K|M|B|T)/);
        if (match) {
          power = Object.keys(LargeNumberFormatPostfixes).find((power2) => LargeNumberFormatPostfixes[power2] === match[1]);
        }
      }
      parsed *= Math.pow(10, 3 * power);
    }
    if ("percent" === (null === formatConfig || void 0 === formatConfig ? void 0 : formatConfig.formatType)) {
      parsed /= 100;
    }
    return parsed;
  },
  _calcSignificantDigits: function(text) {
    const [integer, fractional] = text.split(".");
    const calcDigitsAfterLeadingZeros = (digits) => {
      let index2 = -1;
      for (let i = 0; i < digits.length; i++) {
        if ("0" !== digits[i]) {
          index2 = i;
          break;
        }
      }
      return index2 > -1 ? digits.length - index2 : 0;
    };
    let result = 0;
    if (integer) {
      result += calcDigitsAfterLeadingZeros(integer.split(""));
    }
    if (fractional) {
      result += calcDigitsAfterLeadingZeros(fractional.split("").reverse());
    }
    return result;
  }
});
numberLocalization.inject(currency_default);
if (hasIntl) {
  numberLocalization.inject(number_default);
}
var number_default2 = numberLocalization;

// node_modules/devextreme/esm/common/core/localization/ldml/date.format.js
var FORMAT_SEPARATORS = " .,:;/\\<>()-[]،";
var checkDigit = function(char) {
  const code = char && number_default2.convertDigits(char, false).charCodeAt(0);
  const zeroCode = number_default2.convertDigits("0", false).charCodeAt(0);
  return zeroCode <= code && code < zeroCode + 10;
};
var checkPatternContinue = function(text, patterns, index2, isDigit) {
  const char = text[index2];
  const nextChar = text[index2 + 1];
  if (!isDigit) {
    if ("." === char || " " === char && ". m." === text.slice(index2 - 1, index2 + 3)) {
      return true;
    }
    if ("-" === char && !checkDigit(nextChar)) {
      return true;
    }
  }
  const isDigitChanged = isDigit && patterns.some((pattern) => text[index2] !== pattern[index2]);
  return FORMAT_SEPARATORS.indexOf(char) < 0 && isDigit === checkDigit(char) && (!isDigit || isDigitChanged);
};
var getPatternStartIndex = function(defaultPattern, index2) {
  if (!checkDigit(defaultPattern[index2])) {
    while (index2 > 0 && !checkDigit(defaultPattern[index2 - 1]) && ("." === defaultPattern[index2 - 1] || FORMAT_SEPARATORS.indexOf(defaultPattern[index2 - 1]) < 0)) {
      index2--;
    }
  }
  return index2;
};
var getDifference = function(defaultPattern, patterns, processedIndexes, isDigit) {
  let i = 0;
  const result = [];
  const patternsFilter = function(pattern) {
    return defaultPattern[i] !== pattern[i] && (void 0 === isDigit || checkDigit(defaultPattern[i]) === isDigit);
  };
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }
  for (i = 0; i < defaultPattern.length; i++) {
    if (processedIndexes.indexOf(i) < 0 && patterns.filter(patternsFilter).length) {
      i = getPatternStartIndex(defaultPattern, i);
      do {
        isDigit = checkDigit(defaultPattern[i]);
        if (!result.length && !isDigit && checkDigit(patterns[0][i])) {
          break;
        }
        result.push(i);
        processedIndexes.unshift(i);
        i++;
      } while (defaultPattern[i] && checkPatternContinue(defaultPattern, patterns, i, isDigit));
      break;
    }
  }
  if (1 === result.length && ("0" === defaultPattern[processedIndexes[0] - 1] || "٠" === defaultPattern[processedIndexes[0] - 1])) {
    processedIndexes.unshift(processedIndexes[0] - 1);
  }
  return result;
};
var replaceCharsCore = function(pattern, indexes, char, patternPositions) {
  const baseCharIndex = indexes[0];
  const patternIndex = baseCharIndex < patternPositions.length ? patternPositions[baseCharIndex] : baseCharIndex;
  indexes.forEach(function(_, index2) {
    pattern = pattern.substr(0, patternIndex + index2) + (char.length > 1 ? char[index2] : char) + pattern.substr(patternIndex + index2 + 1);
  });
  if (1 === indexes.length) {
    pattern = pattern.replace("0" + char, char + char);
    pattern = pattern.replace("٠" + char, char + char);
  }
  return pattern;
};
var replaceChars = function(pattern, indexes, char, patternPositions) {
  let i;
  let index2;
  let patternIndex;
  if (!checkDigit(pattern[indexes[0]] || "0")) {
    const letterCount = Math.max(indexes.length <= 3 ? 3 : 4, char.length);
    while (indexes.length > letterCount) {
      index2 = indexes.pop();
      patternIndex = patternPositions[index2];
      patternPositions[index2] = -1;
      for (i = index2 + 1; i < patternPositions.length; i++) {
        patternPositions[i]--;
      }
      pattern = pattern.substr(0, patternIndex) + pattern.substr(patternIndex + 1);
    }
    index2 = indexes[indexes.length - 1] + 1, patternIndex = index2 < patternPositions.length ? patternPositions[index2] : index2;
    while (indexes.length < letterCount) {
      indexes.push(indexes[indexes.length - 1] + 1);
      for (i = index2; i < patternPositions.length; i++) {
        patternPositions[i]++;
      }
      pattern = pattern.substr(0, patternIndex) + " " + pattern.substr(patternIndex);
    }
  }
  pattern = replaceCharsCore(pattern, indexes, char, patternPositions);
  return pattern;
};
var formatValue = function(value2, formatter) {
  if (Array.isArray(value2)) {
    return value2.map(function(value3) {
      return (formatter(value3) || "").toString();
    });
  }
  return (formatter(value2) || "").toString();
};
var ESCAPE_CHARS_REGEXP = /[a-zA-Z]/g;
var escapeChars = function(pattern, defaultPattern, processedIndexes, patternPositions) {
  const escapeIndexes = defaultPattern.split("").map(function(char, index2) {
    if (processedIndexes.indexOf(index2) < 0 && (char.match(ESCAPE_CHARS_REGEXP) || "'" === char)) {
      return patternPositions[index2];
    }
    return -1;
  });
  pattern = pattern.split("").map(function(char, index2) {
    let result = char;
    const isCurrentCharEscaped = escapeIndexes.indexOf(index2) >= 0;
    const isPrevCharEscaped = index2 > 0 && escapeIndexes.indexOf(index2 - 1) >= 0;
    const isNextCharEscaped = escapeIndexes.indexOf(index2 + 1) >= 0;
    if (isCurrentCharEscaped) {
      if (!isPrevCharEscaped) {
        result = "'" + result;
      }
      if (!isNextCharEscaped) {
        result += "'";
      }
    }
    return result;
  }).join("");
  return pattern;
};
var getFormat2 = function(formatter) {
  const processedIndexes = [];
  const defaultPattern = formatValue(new Date(2009, 8, 8, 6, 5, 4), formatter);
  const patternPositions = defaultPattern.split("").map(function(_, index2) {
    return index2;
  });
  let result = defaultPattern;
  const replacedPatterns = {};
  const datePatterns = [{
    date: new Date(2009, 8, 8, 6, 5, 4, 111),
    pattern: "S"
  }, {
    date: new Date(2009, 8, 8, 6, 5, 2),
    pattern: "s"
  }, {
    date: new Date(2009, 8, 8, 6, 2, 4),
    pattern: "m"
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "H",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 2, 5, 4),
    pattern: "h",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "a",
    isDigit: false
  }, {
    date: new Date(2009, 8, 1, 6, 5, 4),
    pattern: "d"
  }, {
    date: [new Date(2009, 8, 2, 6, 5, 4), new Date(2009, 8, 3, 6, 5, 4), new Date(2009, 8, 4, 6, 5, 4)],
    pattern: "E"
  }, {
    date: new Date(2009, 9, 6, 6, 5, 4),
    pattern: "M"
  }, {
    date: new Date(1998, 8, 8, 6, 5, 4),
    pattern: "y"
  }];
  if (!result) {
    return;
  }
  datePatterns.forEach(function(test) {
    const diff = getDifference(defaultPattern, formatValue(test.date, formatter), processedIndexes, test.isDigit);
    const pattern = "M" === test.pattern && !replacedPatterns.d ? "L" : test.pattern;
    result = replaceChars(result, diff, pattern, patternPositions);
    replacedPatterns[pattern] = diff.length;
  });
  result = escapeChars(result, defaultPattern, processedIndexes, patternPositions);
  if (processedIndexes.length) {
    return result;
  }
};

// node_modules/devextreme/esm/common/core/localization/ldml/date.parser.js
var FORMAT_TYPES2 = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var monthRegExpGenerator = function(count, dateParts) {
  if (count > 2) {
    return Object.keys(FORMAT_TYPES2).map(function(count2) {
      return ["format", "standalone"].map(function(type2) {
        return dateParts.getMonthNames(FORMAT_TYPES2[count2], type2).join("|");
      }).join("|");
    }).join("|");
  }
  return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
};
var PATTERN_REGEXPS = {
  ":": function(count, dateParts) {
    const countSuffix = count > 1 ? `{${count}}` : "";
    let timeSeparator = escapeRegExp(dateParts.getTimeSeparator());
    ":" !== timeSeparator && (timeSeparator = `${timeSeparator}|:`);
    return `${timeSeparator}${countSuffix}`;
  },
  y: function(count) {
    return 2 === count ? `[0-9]{${count}}` : "[0-9]+?";
  },
  M: monthRegExpGenerator,
  L: monthRegExpGenerator,
  Q: function(count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES2[count], "format").join("|");
    }
    return "0?[1-4]";
  },
  E: function(count, dateParts) {
    return "\\D*";
  },
  a: function(count, dateParts) {
    return dateParts.getPeriodNames(FORMAT_TYPES2[count < 3 ? 3 : count], "format").join("|");
  },
  d: function(count) {
    return 2 === count ? "3[01]|[12][0-9]|0?[1-9]" : "0??[1-9]|[12][0-9]|3[01]";
  },
  H: function(count) {
    return 2 === count ? "2[0-3]|1[0-9]|0?[0-9]" : "0??[0-9]|1[0-9]|2[0-3]";
  },
  h: function(count) {
    return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
  },
  m: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  s: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  S: function(count) {
    return `[0-9]{1,${count}}`;
  },
  w: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  x: function(count) {
    return 3 === count ? "[+-](?:2[0-3]|[01][0-9]):(?:[0-5][0-9])|Z" : "[+-](?:2[0-3]|[01][0-9])(?:[0-5][0-9])|Z";
  }
};
var parseNumber = Number;
var caseInsensitiveIndexOf = function(array, value2) {
  return array.map((item) => item.toLowerCase()).indexOf(value2.toLowerCase());
};
var monthPatternParser = function(text, count, dateParts) {
  if (count > 2) {
    return ["format", "standalone"].map(function(type2) {
      return Object.keys(FORMAT_TYPES2).map(function(count2) {
        const monthNames = dateParts.getMonthNames(FORMAT_TYPES2[count2], type2);
        return caseInsensitiveIndexOf(monthNames, text);
      });
    }).reduce(function(a, b) {
      return a.concat(b);
    }).filter(function(index2) {
      return index2 >= 0;
    })[0];
  }
  return parseNumber(text) - 1;
};
var PATTERN_PARSERS = {
  y: function(text, count) {
    const year = parseNumber(text);
    if (2 === count) {
      return year < 30 ? 2e3 + year : 1900 + year;
    }
    return year;
  },
  M: monthPatternParser,
  L: monthPatternParser,
  Q: function(text, count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES2[count], "format").indexOf(text);
    }
    return parseNumber(text) - 1;
  },
  E: function(text, count, dateParts) {
    const dayNames = dateParts.getDayNames(FORMAT_TYPES2[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(dayNames, text);
  },
  a: function(text, count, dateParts) {
    const periodNames = dateParts.getPeriodNames(FORMAT_TYPES2[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(periodNames, text);
  },
  d: parseNumber,
  H: parseNumber,
  h: parseNumber,
  m: parseNumber,
  s: parseNumber,
  S: function(text, count) {
    count = Math.max(count, 3);
    text = text.slice(0, 3);
    while (count < 3) {
      text += "0";
      count++;
    }
    return parseNumber(text);
  }
};
var ORDERED_PATTERNS = ["y", "M", "d", "h", "m", "s", "S"];
var PATTERN_SETTERS = {
  y: "setFullYear",
  M: "setMonth",
  L: "setMonth",
  a: function(date, value2, datePartValues) {
    let hours = date.getHours();
    const hourPartValue = datePartValues.h;
    if (void 0 !== hourPartValue && hourPartValue !== hours) {
      hours--;
    }
    if (!value2 && 12 === hours) {
      hours = 0;
    } else if (value2 && 12 !== hours) {
      hours += 12;
    }
    date.setHours(hours);
  },
  d: "setDate",
  H: "setHours",
  h: "setHours",
  m: "setMinutes",
  s: "setSeconds",
  S: "setMilliseconds"
};
var getSameCharCount = function(text, index2) {
  const char = text[index2];
  if (!char) {
    return 0;
  }
  let count = 0;
  do {
    index2++;
    count++;
  } while (text[index2] === char);
  return count;
};
var createPattern = function(char, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += char;
  }
  return result;
};
var getRegExpInfo = function(format2, dateParts) {
  let regexpText = "";
  let stubText = "";
  let isEscaping;
  const patterns = [];
  const addPreviousStub = function() {
    if (stubText) {
      patterns.push(`'${stubText}'`);
      regexpText += `${escapeRegExp(stubText)})`;
      stubText = "";
    }
  };
  for (let i = 0; i < format2.length; i++) {
    const char = format2[i];
    const isEscapeChar = "'" === char;
    const regexpPart = PATTERN_REGEXPS[char];
    if (isEscapeChar) {
      isEscaping = !isEscaping;
      if ("'" !== format2[i - 1]) {
        continue;
      }
    }
    if (regexpPart && !isEscaping) {
      const count = getSameCharCount(format2, i);
      const pattern = createPattern(char, count);
      addPreviousStub();
      patterns.push(pattern);
      regexpText += `(${regexpPart(count, dateParts)})`;
      i += count - 1;
    } else {
      if (!stubText) {
        regexpText += "(";
      }
      stubText += char;
    }
  }
  addPreviousStub();
  if (!isPossibleForParsingFormat(patterns)) {
    logger.warn(`The following format may be parsed incorrectly: ${format2}.`);
  }
  return {
    patterns,
    regexp: new RegExp(`^${regexpText}$`, "i")
  };
};
var digitFieldSymbols = ["d", "H", "h", "m", "s", "w", "M", "L", "Q"];
var isPossibleForParsingFormat = function(patterns) {
  const isDigitPattern = (pattern) => {
    if (!pattern) {
      return false;
    }
    const char = pattern[0];
    return ["y", "S"].includes(char) || digitFieldSymbols.includes(char) && pattern.length < 3;
  };
  let possibleForParsing = true;
  let ambiguousDigitPatternsCount = 0;
  return patterns.every((pattern, index2, patterns2) => {
    if (isDigitPattern(pattern)) {
      if (((pattern2) => "S" !== pattern2[0] && 2 !== pattern2.length)(pattern)) {
        possibleForParsing = ++ambiguousDigitPatternsCount < 2;
      }
      if (!isDigitPattern(patterns2[index2 + 1])) {
        ambiguousDigitPatternsCount = 0;
      }
    }
    return possibleForParsing;
  });
};
var getPatternSetters = function() {
  return PATTERN_SETTERS;
};
var setPatternPart = function(date, pattern, text, dateParts, datePartValues) {
  const patternChar = pattern[0];
  const partSetter = PATTERN_SETTERS[patternChar];
  const partParser = PATTERN_PARSERS[patternChar];
  if (partSetter && partParser) {
    const value2 = partParser(text, pattern.length, dateParts);
    datePartValues[pattern] = value2;
    if (date[partSetter]) {
      date[partSetter](value2);
    } else {
      partSetter(date, value2, datePartValues);
    }
  }
};
var setPatternPartFromNow = function(date, pattern, now) {
  const setterName = PATTERN_SETTERS[pattern];
  const getterName = "g" + setterName.substr(1);
  const value2 = now[getterName]();
  date[setterName](value2);
};
var getShortPatterns = function(fullPatterns) {
  return fullPatterns.map(function(pattern) {
    if ("'" === pattern[0]) {
      return "";
    } else {
      return "H" === pattern[0] ? "h" : pattern[0];
    }
  });
};
var getMaxOrderedPatternIndex = function(patterns) {
  const indexes = patterns.map(function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern);
  });
  return Math.max.apply(Math, indexes);
};
var getOrderedFormatPatterns = function(formatPatterns) {
  const otherPatterns = formatPatterns.filter(function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern) < 0;
  });
  return ORDERED_PATTERNS.concat(otherPatterns);
};
var getParser = function(format2, dateParts) {
  const regExpInfo = getRegExpInfo(format2, dateParts);
  return function(text) {
    const regExpResult = regExpInfo.regexp.exec(text);
    if (regExpResult) {
      const now = /* @__PURE__ */ new Date();
      const date = new Date(now.getFullYear(), 0, 1);
      const formatPatterns = getShortPatterns(regExpInfo.patterns);
      const maxPatternIndex = getMaxOrderedPatternIndex(formatPatterns);
      const orderedFormatPatterns = getOrderedFormatPatterns(formatPatterns);
      const datePartValues = {};
      orderedFormatPatterns.forEach(function(pattern, index2) {
        if (!pattern || index2 < ORDERED_PATTERNS.length && index2 > maxPatternIndex) {
          return;
        }
        const patternIndex = formatPatterns.indexOf(pattern);
        if (patternIndex >= 0) {
          const regExpPattern = regExpInfo.patterns[patternIndex];
          const regExpText = regExpResult[patternIndex + 1];
          setPatternPart(date, regExpPattern, regExpText, dateParts, datePartValues);
        } else {
          setPatternPartFromNow(date, pattern, now);
        }
      });
      return date;
    }
    return null;
  };
};

// node_modules/devextreme/esm/common/core/localization/cldr-data/first_day_of_week_data.js
var first_day_of_week_data_default = {
  "af-NA": 1,
  agq: 1,
  ak: 1,
  ar: 6,
  "ar-EH": 1,
  "ar-ER": 1,
  "ar-KM": 1,
  "ar-LB": 1,
  "ar-MA": 1,
  "ar-MR": 1,
  "ar-PS": 1,
  "ar-SO": 1,
  "ar-SS": 1,
  "ar-TD": 1,
  "ar-TN": 1,
  asa: 1,
  ast: 1,
  az: 1,
  "az-Cyrl": 1,
  bas: 1,
  be: 1,
  bem: 1,
  bez: 1,
  bg: 1,
  bm: 1,
  br: 1,
  bs: 1,
  "bs-Cyrl": 1,
  ca: 1,
  ce: 1,
  cgg: 1,
  ckb: 6,
  cs: 1,
  cy: 1,
  da: 1,
  de: 1,
  dje: 1,
  dsb: 1,
  dua: 1,
  dyo: 1,
  ee: 1,
  el: 1,
  "en-001": 1,
  "en-AE": 6,
  "en-BI": 1,
  "en-MP": 1,
  "en-MV": 5,
  "en-SD": 6,
  eo: 1,
  es: 1,
  et: 1,
  eu: 1,
  ewo: 1,
  fa: 6,
  ff: 1,
  "ff-Adlm": 1,
  fi: 1,
  fo: 1,
  fr: 1,
  "fr-DJ": 6,
  "fr-DZ": 6,
  "fr-SY": 6,
  fur: 1,
  fy: 1,
  ga: 1,
  gd: 1,
  gl: 1,
  gsw: 1,
  gv: 1,
  ha: 1,
  hr: 1,
  hsb: 1,
  hu: 1,
  hy: 1,
  ia: 1,
  ig: 1,
  is: 1,
  it: 1,
  jgo: 1,
  jmc: 1,
  ka: 1,
  kab: 6,
  kde: 1,
  kea: 1,
  khq: 1,
  kk: 1,
  kkj: 1,
  kl: 1,
  "ko-KP": 1,
  ksb: 1,
  ksf: 1,
  ksh: 1,
  ku: 1,
  kw: 1,
  ky: 1,
  lag: 1,
  lb: 1,
  lg: 1,
  ln: 1,
  lrc: 6,
  lt: 1,
  lu: 1,
  lv: 1,
  "mas-TZ": 1,
  mfe: 1,
  mg: 1,
  mgo: 1,
  mi: 1,
  mk: 1,
  mn: 1,
  ms: 1,
  mua: 1,
  mzn: 6,
  naq: 1,
  nds: 1,
  nl: 1,
  nmg: 1,
  nnh: 1,
  no: 1,
  nus: 1,
  nyn: 1,
  os: 1,
  pcm: 1,
  pl: 1,
  ps: 6,
  "pt-AO": 1,
  "pt-CH": 1,
  "pt-CV": 1,
  "pt-GQ": 1,
  "pt-GW": 1,
  "pt-LU": 1,
  "pt-ST": 1,
  "pt-TL": 1,
  "qu-BO": 1,
  "qu-EC": 1,
  rm: 1,
  rn: 1,
  ro: 1,
  rof: 1,
  ru: 1,
  rw: 1,
  rwk: 1,
  sah: 1,
  sbp: 1,
  sc: 1,
  se: 1,
  ses: 1,
  sg: 1,
  shi: 1,
  "shi-Latn": 1,
  si: 1,
  sk: 1,
  sl: 1,
  smn: 1,
  so: 1,
  "so-DJ": 6,
  sq: 1,
  sr: 1,
  "sr-Latn": 1,
  sv: 1,
  sw: 1,
  "ta-LK": 1,
  "ta-MY": 1,
  teo: 1,
  tg: 1,
  "ti-ER": 1,
  tk: 1,
  to: 1,
  tr: 1,
  tt: 1,
  twq: 1,
  tzm: 1,
  uk: 1,
  uz: 1,
  "uz-Arab": 6,
  "uz-Cyrl": 1,
  vai: 1,
  "vai-Latn": 1,
  vi: 1,
  vun: 1,
  wae: 1,
  wo: 1,
  xog: 1,
  yav: 1,
  yi: 1,
  yo: 1,
  zgh: 1
};

// node_modules/devextreme/esm/common/core/localization/intl/date.js
var SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
var NARROW_NO_BREAK_SPACE_REGEX = /[\u202F]/g;
var getIntlFormatter = (format2) => (date) => {
  if (!format2.timeZoneName) {
    const year = date.getFullYear();
    const recognizableAsTwentyCentury = String(year).length < 3;
    const safeYearShift = 400;
    const temporaryYearValue = recognizableAsTwentyCentury ? year + safeYearShift : year;
    const utcDate = new Date(Date.UTC(temporaryYearValue, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    if (recognizableAsTwentyCentury) {
      utcDate.setFullYear(year);
    }
    const utcFormat = extend({
      timeZone: "UTC"
    }, format2);
    return formatDateTime(utcDate, utcFormat);
  }
  return formatDateTime(date, format2);
};
var formattersCache2 = {};
var getFormatter4 = (format2) => {
  const key = core_default.locale() + "/" + JSON.stringify(format2);
  if (!formattersCache2[key]) {
    formattersCache2[key] = new Intl.DateTimeFormat(core_default.locale(), format2).format;
  }
  return formattersCache2[key];
};
function formatDateTime(date, format2) {
  return getFormatter4(format2)(date).replace(SYMBOLS_TO_REMOVE_REGEX, "").replace(NARROW_NO_BREAK_SPACE_REGEX, " ");
}
var formatNumber = (number) => new Intl.NumberFormat(core_default.locale()).format(number);
var getAlternativeNumeralsMap = /* @__PURE__ */ (() => {
  const numeralsMapCache = {};
  return (locale) => {
    if (!(locale in numeralsMapCache)) {
      if ("0" === formatNumber(0)) {
        numeralsMapCache[locale] = false;
        return false;
      }
      numeralsMapCache[locale] = {};
      for (let i = 0; i < 10; ++i) {
        numeralsMapCache[locale][formatNumber(i)] = i;
      }
    }
    return numeralsMapCache[locale];
  };
})();
var normalizeNumerals = (dateString) => {
  const alternativeNumeralsMap = getAlternativeNumeralsMap(core_default.locale());
  if (!alternativeNumeralsMap) {
    return dateString;
  }
  return dateString.split("").map((sign2) => sign2 in alternativeNumeralsMap ? String(alternativeNumeralsMap[sign2]) : sign2).join("");
};
var removeLeadingZeroes = (str) => str.replace(/(\D)0+(\d)/g, "$1$2");
var dateStringEquals = (actual, expected) => removeLeadingZeroes(actual) === removeLeadingZeroes(expected);
var normalizeMonth = (text) => text.replace("d’", "de ");
var intlFormats = {
  day: {
    day: "numeric"
  },
  date: {
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  dayofweek: {
    weekday: "long"
  },
  longdate: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  longdatelongtime: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  longtime: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  month: {
    month: "long"
  },
  monthandday: {
    month: "long",
    day: "numeric"
  },
  monthandyear: {
    year: "numeric",
    month: "long"
  },
  shortdate: {},
  shorttime: {
    hour: "numeric",
    minute: "numeric"
  },
  shortyear: {
    year: "2-digit"
  },
  year: {
    year: "numeric"
  }
};
Object.defineProperty(intlFormats, "shortdateshorttime", {
  get: function() {
    const defaultOptions = Intl.DateTimeFormat(core_default.locale()).resolvedOptions();
    return {
      year: defaultOptions.year,
      month: defaultOptions.month,
      day: defaultOptions.day,
      hour: "numeric",
      minute: "numeric"
    };
  }
});
var getIntlFormat = (format2) => "string" === typeof format2 && intlFormats[format2.toLowerCase()];
var monthNameStrategies = {
  standalone: function(monthIndex, monthFormat) {
    const date = new Date(1999, monthIndex, 13, 1);
    const dateString = getIntlFormatter({
      month: monthFormat
    })(date);
    return dateString;
  },
  format: function(monthIndex, monthFormat) {
    const date = new Date(0, monthIndex, 13, 1);
    const dateString = normalizeMonth(getIntlFormatter({
      day: "numeric",
      month: monthFormat
    })(date));
    const parts = dateString.split(" ").filter((part) => part.indexOf("13") < 0);
    if (1 === parts.length) {
      return parts[0];
    } else if (2 === parts.length) {
      return parts[0].length > parts[1].length ? parts[0] : parts[1];
    }
    return monthNameStrategies.standalone(monthIndex, monthFormat);
  }
};
var date_default2 = {
  engine: function() {
    return "intl";
  },
  getMonthNames: function(format2, type2) {
    const monthFormat = {
      wide: "long",
      abbreviated: "short",
      narrow: "narrow"
    }[format2 || "wide"];
    type2 = "format" === type2 ? type2 : "standalone";
    return Array.apply(null, new Array(12)).map((_, monthIndex) => monthNameStrategies[type2](monthIndex, monthFormat));
  },
  getDayNames: function(format2) {
    const result = ((format3) => Array.apply(null, new Array(7)).map((_, dayIndex) => getIntlFormatter({
      weekday: format3
    })(new Date(0, 0, dayIndex))))({
      wide: "long",
      abbreviated: "short",
      short: "narrow",
      narrow: "narrow"
    }[format2 || "wide"]);
    return result;
  },
  getPeriodNames: function() {
    const hour12Formatter = getIntlFormatter({
      hour: "numeric",
      hour12: true
    });
    return [1, 13].map((hours) => {
      const hourNumberText = formatNumber(1);
      const timeParts = hour12Formatter(new Date(0, 0, 1, hours)).split(hourNumberText);
      if (2 !== timeParts.length) {
        return "";
      }
      const biggerPart = timeParts[0].length > timeParts[1].length ? timeParts[0] : timeParts[1];
      return biggerPart.trim();
    });
  },
  format: function(date, format2) {
    if (!date) {
      return;
    }
    if (!format2) {
      return date;
    }
    if ("function" !== typeof format2 && !format2.formatter) {
      format2 = format2.type || format2;
    }
    const intlFormat = getIntlFormat(format2);
    if (intlFormat) {
      return getIntlFormatter(intlFormat)(date);
    }
    const formatType = typeof format2;
    if (format2.formatter || "function" === formatType || "string" === formatType) {
      return this.callBase.apply(this, arguments);
    }
    return getIntlFormatter(format2)(date);
  },
  parse: function(dateString, format2) {
    let formatter;
    if (format2 && !format2.parser && "string" === typeof dateString) {
      dateString = normalizeMonth(dateString);
      formatter = (date) => normalizeMonth(this.format(date, format2));
    }
    return this.callBase(dateString, formatter || format2);
  },
  _parseDateBySimpleFormat: function(dateString, format2) {
    dateString = normalizeNumerals(dateString);
    const formatParts = this.getFormatParts(format2);
    const dateParts = dateString.split(/\D+/).filter((part) => part.length > 0);
    if (formatParts.length !== dateParts.length) {
      return;
    }
    const dateArgs = this._generateDateArgs(formatParts, dateParts);
    const constructValidDate = (ampmShift) => {
      const parsedDate = ((dateArgs2, ampmShift2) => {
        const hoursShift = ampmShift2 ? 12 : 0;
        return new Date(dateArgs2.year, dateArgs2.month, dateArgs2.day, (dateArgs2.hours + hoursShift) % 24, dateArgs2.minutes, dateArgs2.seconds);
      })(dateArgs, ampmShift);
      if (dateStringEquals(normalizeNumerals(this.format(parsedDate, format2)), dateString)) {
        return parsedDate;
      }
    };
    return constructValidDate(false) || constructValidDate(true);
  },
  _generateDateArgs: function(formatParts, dateParts) {
    const currentDate = /* @__PURE__ */ new Date();
    const dateArgs = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    formatParts.forEach((formatPart, index2) => {
      const datePart = dateParts[index2];
      let parsed = parseInt(datePart, 10);
      if ("month" === formatPart) {
        parsed -= 1;
      }
      dateArgs[formatPart] = parsed;
    });
    return dateArgs;
  },
  formatUsesMonthName: function(format2) {
    if ("object" === typeof format2 && !(format2.type || format2.format)) {
      return "long" === format2.month;
    }
    return this.callBase.apply(this, arguments);
  },
  formatUsesDayName: function(format2) {
    if ("object" === typeof format2 && !(format2.type || format2.format)) {
      return "long" === format2.weekday;
    }
    return this.callBase.apply(this, arguments);
  },
  getTimeSeparator: function() {
    return normalizeNumerals(formatDateTime(new Date(2001, 1, 1, 11, 11), {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    })).replace(/\d/g, "");
  },
  getFormatParts: function(format2) {
    if ("string" === typeof format2) {
      return this.callBase(format2);
    }
    const intlFormat = extend({}, intlFormats[format2.toLowerCase()]);
    const date = new Date(2001, 2, 4, 5, 6, 7);
    let formattedDate = getIntlFormatter(intlFormat)(date);
    formattedDate = normalizeNumerals(formattedDate);
    return [{
      name: "year",
      value: 1
    }, {
      name: "month",
      value: 3
    }, {
      name: "day",
      value: 4
    }, {
      name: "hours",
      value: 5
    }, {
      name: "minutes",
      value: 6
    }, {
      name: "seconds",
      value: 7
    }].map((part) => ({
      name: part.name,
      index: formattedDate.indexOf(part.value)
    })).filter((part) => part.index > -1).sort((a, b) => a.index - b.index).map((part) => part.name);
  }
};

// node_modules/devextreme/esm/common/core/localization/date.js
var hasIntl2 = "undefined" !== typeof Intl;
var FORMATS_TO_PATTERN_MAP = {
  shortdate: "M/d/y",
  shorttime: "h:mm a",
  longdate: "EEEE, MMMM d, y",
  longtime: "h:mm:ss a",
  monthandday: "MMMM d",
  monthandyear: "MMMM y",
  quarterandyear: "QQQ y",
  day: "d",
  year: "y",
  shortdateshorttime: "M/d/y, h:mm a",
  longdatelongtime: "EEEE, MMMM d, y, h:mm:ss a",
  month: "LLLL",
  shortyear: "yy",
  dayofweek: "EEEE",
  quarter: "QQQ",
  hour: "HH",
  minute: "mm",
  second: "ss",
  millisecond: "SSS",
  "datetime-local": "yyyy-MM-ddTHH':'mm':'ss"
};
var possiblePartPatterns = {
  year: ["y", "yy", "yyyy"],
  day: ["d", "dd"],
  month: ["M", "MM", "MMM", "MMMM"],
  hours: ["H", "HH", "h", "hh", "ah"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  milliseconds: ["S", "SS", "SSS"]
};
var dateLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  _getPatternByFormat: function(format2) {
    return FORMATS_TO_PATTERN_MAP[format2.toLowerCase()];
  },
  _expandPattern: function(pattern) {
    return this._getPatternByFormat(pattern) || pattern;
  },
  formatUsesMonthName: function(format2) {
    return -1 !== this._expandPattern(format2).indexOf("MMMM");
  },
  formatUsesDayName: function(format2) {
    return -1 !== this._expandPattern(format2).indexOf("EEEE");
  },
  getFormatParts: function(format2) {
    const pattern = this._getPatternByFormat(format2) || format2;
    const result = [];
    each(pattern.split(/\W+/), (_, formatPart) => {
      each(possiblePartPatterns, (partName, possiblePatterns) => {
        if (possiblePatterns.includes(formatPart)) {
          result.push(partName);
        }
      });
    });
    return result;
  },
  getMonthNames: function(format2) {
    return default_date_names_default.getMonthNames(format2);
  },
  getDayNames: function(format2) {
    return default_date_names_default.getDayNames(format2);
  },
  getQuarterNames: function(format2) {
    return default_date_names_default.getQuarterNames(format2);
  },
  getPeriodNames: function(format2) {
    return default_date_names_default.getPeriodNames(format2);
  },
  getTimeSeparator: function() {
    return ":";
  },
  is24HourFormat: function(format2) {
    const amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
    const pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
    const amTimeFormatted = this.format(amTime, format2);
    const pmTimeFormatted = this.format(pmTime, format2);
    for (let i = 0; i < amTimeFormatted.length; i++) {
      if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
        return !isNaN(parseInt(amTimeFormatted[i]));
      }
    }
  },
  format: function(date, format2) {
    if (!date) {
      return;
    }
    if (!format2) {
      return date;
    }
    let formatter;
    if ("function" === typeof format2) {
      formatter = format2;
    } else if (format2.formatter) {
      formatter = format2.formatter;
    } else {
      format2 = format2.type || format2;
      if (isString(format2)) {
        format2 = FORMATS_TO_PATTERN_MAP[format2.toLowerCase()] || format2;
        return number_default2.convertDigits(getFormatter(format2, this)(date));
      }
    }
    if (!formatter) {
      return;
    }
    return formatter(date);
  },
  parse: function(text, format2) {
    const that = this;
    let ldmlFormat;
    let formatter;
    if (!text) {
      return;
    }
    if (!format2) {
      return this.parse(text, "shortdate");
    }
    if (format2.parser) {
      return format2.parser(text);
    }
    if ("string" === typeof format2 && !FORMATS_TO_PATTERN_MAP[format2.toLowerCase()]) {
      ldmlFormat = format2;
    } else {
      formatter = (value2) => {
        const text2 = that.format(value2, format2);
        return number_default2.convertDigits(text2, true);
      };
      try {
        ldmlFormat = getFormat2(formatter);
      } catch (e) {
      }
    }
    if (ldmlFormat) {
      text = number_default2.convertDigits(text, true);
      return getParser(ldmlFormat, this)(text);
    }
    errors_default.log("W0012");
    const result = new Date(text);
    if (!result || isNaN(result.getTime())) {
      return;
    }
    return result;
  },
  firstDayOfWeekIndex: function() {
    const index2 = core_default.getValueByClosestLocale((locale) => first_day_of_week_data_default[locale]);
    return void 0 === index2 ? 0 : index2;
  }
});
if (hasIntl2) {
  dateLocalization.inject(date_default2);
}
var date_default3 = dateLocalization;

// node_modules/devextreme/esm/common/core/localization/default_messages.js
var defaultMessages = {
  en: {
    Yes: "Yes",
    No: "No",
    Cancel: "Cancel",
    CheckState: "Check state",
    Close: "Close",
    Clear: "Clear",
    Done: "Done",
    Loading: "Loading...",
    Select: "Select...",
    Search: "Search",
    Back: "Back",
    OK: "OK",
    Today: "Today",
    Yesterday: "Yesterday",
    "dxCollectionWidget-noDataText": "No data to display",
    "dxDropDownEditor-selectLabel": "Select",
    "validation-required": "Required",
    "validation-required-formatted": "{0} is required",
    "validation-numeric": "Value must be a number",
    "validation-numeric-formatted": "{0} must be a number",
    "validation-range": "Value is out of range",
    "validation-range-formatted": "{0} is out of range",
    "validation-stringLength": "The length of the value is not correct",
    "validation-stringLength-formatted": "The length of {0} is not correct",
    "validation-custom": "Value is invalid",
    "validation-custom-formatted": "{0} is invalid",
    "validation-async": "Value is invalid",
    "validation-async-formatted": "{0} is invalid",
    "validation-compare": "Values do not match",
    "validation-compare-formatted": "{0} does not match",
    "validation-pattern": "Value does not match pattern",
    "validation-pattern-formatted": "{0} does not match pattern",
    "validation-email": "Email is invalid",
    "validation-email-formatted": "{0} is invalid",
    "validation-mask": "Value is invalid",
    "dxLookup-searchPlaceholder": "Minimum character number: {0}",
    "dxList-pullingDownText": "Pull down to refresh...",
    "dxList-pulledDownText": "Release to refresh...",
    "dxList-refreshingText": "Refreshing...",
    "dxList-pageLoadingText": "Loading...",
    "dxList-nextButtonText": "More",
    "dxList-selectAll": "Select All",
    "dxList-listAriaLabel": "Items",
    "dxList-listAriaLabel-deletable": "Deletable items",
    "dxListEditDecorator-delete": "Delete",
    "dxListEditDecorator-more": "More",
    "dxList-selectAll-indeterminate": "Half-checked",
    "dxList-selectAll-checked": "Checked",
    "dxList-selectAll-notChecked": "Not checked",
    "dxList-ariaRoleDescription": "List",
    "dxList-listAriaLabel-itemContent": "List item content",
    "dxScrollView-pullingDownText": "Pull down to refresh...",
    "dxScrollView-pulledDownText": "Release to refresh...",
    "dxScrollView-refreshingText": "Refreshing...",
    "dxScrollView-reachBottomText": "Loading...",
    "dxDateBox-simulatedDataPickerTitleTime": "Select time",
    "dxDateBox-simulatedDataPickerTitleDate": "Select date",
    "dxDateBox-simulatedDataPickerTitleDateTime": "Select date and time",
    "dxDateBox-validation-datetime": "Value must be a date or time",
    "dxDateRangeBox-invalidStartDateMessage": "Start value must be a date",
    "dxDateRangeBox-invalidEndDateMessage": "End value must be a date",
    "dxDateRangeBox-startDateOutOfRangeMessage": "Start date is out of range",
    "dxDateRangeBox-endDateOutOfRangeMessage": "End date is out of range",
    "dxDateRangeBox-startDateLabel": "Start Date",
    "dxDateRangeBox-endDateLabel": "End Date",
    "dxFileUploader-selectFile": "Select a file",
    "dxFileUploader-dropFile": "or Drop a file here",
    "dxFileUploader-bytes": "bytes",
    "dxFileUploader-kb": "KB",
    "dxFileUploader-Mb": "MB",
    "dxFileUploader-Gb": "GB",
    "dxFileUploader-upload": "Upload",
    "dxFileUploader-uploaded": "Uploaded",
    "dxFileUploader-readyToUpload": "Ready to upload",
    "dxFileUploader-uploadAbortedMessage": "Upload cancelled",
    "dxFileUploader-uploadFailedMessage": "Upload failed",
    "dxFileUploader-invalidFileExtension": "File type is not allowed",
    "dxFileUploader-invalidMaxFileSize": "File is too large",
    "dxFileUploader-invalidMinFileSize": "File is too small",
    "dxRangeSlider-ariaFrom": "From",
    "dxRangeSlider-ariaTill": "Till",
    "dxSwitch-switchedOnText": "ON",
    "dxSwitch-switchedOffText": "OFF",
    "dxForm-optionalMark": "optional",
    "dxForm-requiredMessage": "{0} is required",
    "dxNumberBox-invalidValueMessage": "Value must be a number",
    "dxNumberBox-noDataText": "No data",
    "dxDataGrid-emptyHeaderWithColumnChooserText": "Use {0} to display columns",
    "dxDataGrid-emptyHeaderWithGroupPanelText": "Drag a column from the group panel here",
    "dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText": "Use {0} or drag a column from the group panel",
    "dxDataGrid-emptyHeaderColumnChooserText": "column chooser",
    "dxDataGrid-columnChooserTitle": "Column Chooser",
    "dxDataGrid-columnChooserEmptyText": "Drag a column here to hide it",
    "dxDataGrid-groupContinuesMessage": "Continues on the next page",
    "dxDataGrid-groupContinuedMessage": "Continued from the previous page",
    "dxDataGrid-groupHeaderText": "Group by This Column",
    "dxDataGrid-ungroupHeaderText": "Ungroup",
    "dxDataGrid-ungroupAllText": "Ungroup All",
    "dxDataGrid-editingEditRow": "Edit",
    "dxDataGrid-editingSaveRowChanges": "Save",
    "dxDataGrid-editingCancelRowChanges": "Cancel",
    "dxDataGrid-editingDeleteRow": "Delete",
    "dxDataGrid-editingUndeleteRow": "Undelete",
    "dxDataGrid-editingConfirmDeleteMessage": "Are you sure you want to delete this record?",
    "dxDataGrid-validationCancelChanges": "Cancel changes",
    "dxDataGrid-groupPanelEmptyText": "Drag a column header here to group by that column",
    "dxDataGrid-noDataText": "No data",
    "dxDataGrid-searchPanelPlaceholder": "Search...",
    "dxDataGrid-filterRowShowAllText": "(All)",
    "dxDataGrid-filterRowResetOperationText": "Reset",
    "dxDataGrid-filterRowOperationEquals": "Equals",
    "dxDataGrid-filterRowOperationNotEquals": "Does not equal",
    "dxDataGrid-filterRowOperationLess": "Less than",
    "dxDataGrid-filterRowOperationLessOrEquals": "Less than or equal to",
    "dxDataGrid-filterRowOperationGreater": "Greater than",
    "dxDataGrid-filterRowOperationGreaterOrEquals": "Greater than or equal to",
    "dxDataGrid-filterRowOperationStartsWith": "Starts with",
    "dxDataGrid-filterRowOperationContains": "Contains",
    "dxDataGrid-filterRowOperationNotContains": "Does not contain",
    "dxDataGrid-filterRowOperationEndsWith": "Ends with",
    "dxDataGrid-filterRowOperationBetween": "Between",
    "dxDataGrid-filterRowOperationBetweenStartText": "Start",
    "dxDataGrid-filterRowOperationBetweenEndText": "End",
    "dxDataGrid-ariaSearchBox": "Search box",
    "dxDataGrid-applyFilterText": "Apply filter",
    "dxDataGrid-trueText": "true",
    "dxDataGrid-falseText": "false",
    "dxDataGrid-sortingAscendingText": "Sort Ascending",
    "dxDataGrid-sortingDescendingText": "Sort Descending",
    "dxDataGrid-sortingClearText": "Clear Sorting",
    "dxDataGrid-ariaNotSortedColumn": "Not sorted column",
    "dxDataGrid-ariaSortedAscendingColumn": "Column sorted in ascending order",
    "dxDataGrid-ariaSortedDescendingColumn": "Column sorted in descending order",
    "dxDataGrid-ariaSortIndex": "Sort index {0}",
    "dxDataGrid-editingSaveAllChanges": "Save changes",
    "dxDataGrid-editingCancelAllChanges": "Discard changes",
    "dxDataGrid-editingAddRow": "Add a row",
    "dxDataGrid-summaryMin": "Min: {0}",
    "dxDataGrid-summaryMinOtherColumn": "Min of {1} is {0}",
    "dxDataGrid-summaryMax": "Max: {0}",
    "dxDataGrid-summaryMaxOtherColumn": "Max of {1} is {0}",
    "dxDataGrid-summaryAvg": "Avg: {0}",
    "dxDataGrid-summaryAvgOtherColumn": "Avg of {1} is {0}",
    "dxDataGrid-summarySum": "Sum: {0}",
    "dxDataGrid-summarySumOtherColumn": "Sum of {1} is {0}",
    "dxDataGrid-summaryCount": "Count: {0}",
    "dxDataGrid-columnFixingFix": "Set Fixed Position",
    "dxDataGrid-columnFixingUnfix": "Unfix",
    "dxDataGrid-columnFixingLeftPosition": "Left",
    "dxDataGrid-columnFixingRightPosition": "Right",
    "dxDataGrid-columnFixingStickyPosition": "Sticky",
    "dxDataGrid-exportTo": "Export",
    "dxDataGrid-exportToExcel": "Export to Excel file",
    "dxDataGrid-exporting": "Exporting...",
    "dxDataGrid-excelFormat": "Excel file",
    "dxDataGrid-selectedRows": "Selected rows",
    "dxDataGrid-exportSelectedRows": "Export selected rows to {0}",
    "dxDataGrid-exportAll": "Export all data to {0}",
    "dxDataGrid-headerFilterLabel": "Filter options",
    "dxDataGrid-headerFilterIndicatorLabel": "Show filter options for column '{0}'",
    "dxDataGrid-headerFilterEmptyValue": "(Blanks)",
    "dxDataGrid-headerFilterOK": "OK",
    "dxDataGrid-headerFilterCancel": "Cancel",
    "dxDataGrid-ariaAdaptiveCollapse": "Hide additional data",
    "dxDataGrid-ariaAdaptiveExpand": "Display additional data",
    "dxDataGrid-ariaColumn": "Column",
    "dxDataGrid-ariaColumnHeader": "Column header",
    "dxDataGrid-ariaValue": "Value",
    "dxDataGrid-ariaError": "Error",
    "dxDataGrid-ariaRevertButton": "Press Escape to discard the changes",
    "dxDataGrid-ariaFilterCell": "Filter cell",
    "dxDataGrid-ariaCollapse": "Collapse",
    "dxDataGrid-ariaModifiedCell": "Modified",
    "dxDataGrid-ariaDeletedCell": "Deleted",
    "dxDataGrid-ariaEditableCell": "Editable",
    "dxDataGrid-ariaExpand": "Expand",
    "dxDataGrid-ariaCollapsedRow": "Collapsed row",
    "dxDataGrid-ariaExpandedRow": "Expanded row",
    "dxDataGrid-ariaDataGrid": "Data grid with {0} rows and {1} columns",
    "dxDataGrid-ariaSearchInGrid": "Search in the data grid",
    "dxDataGrid-ariaSelectAll": "Select all",
    "dxDataGrid-ariaSelectRow": "Select row",
    "dxDataGrid-ariaToolbar": "Data grid toolbar",
    "dxDataGrid-ariaEditForm": "Edit form",
    "dxDataGrid-filterBuilderPopupTitle": "Filter Builder",
    "dxDataGrid-filterPanelCreateFilter": "Create Filter",
    "dxDataGrid-filterPanelClearFilter": "Clear",
    "dxDataGrid-filterPanelFilterEnabledHint": "Enable the filter",
    "dxDataGrid-masterDetail": "Cell with details",
    "dxTreeList-ariaTreeList": "Tree list with {0} rows and {1} columns",
    "dxTreeList-ariaExpandableInstruction": "Press Ctrl + right arrow to expand the focused node and Ctrl + left arrow to collapse it",
    "dxTreeList-ariaSearchInGrid": "Search in the tree list",
    "dxTreeList-ariaToolbar": "Tree list toolbar",
    "dxTreeList-editingAddRowToNode": "Add",
    "dxPager-infoText": "Page {0} of {1} ({2} items)",
    "dxPager-pagesCountText": "of",
    "dxPager-pageSize": "Items per page: {0}",
    "dxPager-pageSizesAllText": "All",
    "dxPager-page": "Page {0}",
    "dxPager-prevPage": "Previous page",
    "dxPager-nextPage": "Next page",
    "dxPager-ariaLabel": "Page navigation",
    "dxPager-ariaPageSize": "Page size",
    "dxPager-ariaPageNumber": "Page number",
    "dxPagination-infoText": "Page {0} of {1} ({2} items)",
    "dxPagination-pagesCountText": "of",
    "dxPagination-pageSize": "Items per page: {0}",
    "dxPagination-pageSizesAllText": "All",
    "dxPagination-page": "Page {0}",
    "dxPagination-prevPage": "Previous page",
    "dxPagination-nextPage": "Next page",
    "dxPagination-ariaLabel": "Page navigation",
    "dxPagination-ariaPageSize": "Page size",
    "dxPagination-ariaPageNumber": "Page number",
    "dxPivotGrid-grandTotal": "Grand Total",
    "dxPivotGrid-total": "{0} Total",
    "dxPivotGrid-fieldChooserTitle": "Field Chooser",
    "dxPivotGrid-showFieldChooser": "Show Field Chooser",
    "dxPivotGrid-expandAll": "Expand All",
    "dxPivotGrid-collapseAll": "Collapse All",
    "dxPivotGrid-sortColumnBySummary": 'Sort "{0}" by This Column',
    "dxPivotGrid-sortRowBySummary": 'Sort "{0}" by This Row',
    "dxPivotGrid-removeAllSorting": "Remove All Sorting",
    "dxPivotGrid-dataNotAvailable": "N/A",
    "dxPivotGrid-rowFields": "Row Fields",
    "dxPivotGrid-columnFields": "Column Fields",
    "dxPivotGrid-dataFields": "Data Fields",
    "dxPivotGrid-filterFields": "Filter Fields",
    "dxPivotGrid-allFields": "All Fields",
    "dxPivotGrid-columnFieldArea": "Drop Column Fields Here",
    "dxPivotGrid-dataFieldArea": "Drop Data Fields Here",
    "dxPivotGrid-rowFieldArea": "Drop Row Fields Here",
    "dxPivotGrid-filterFieldArea": "Drop Filter Fields Here",
    "dxScheduler-ariaLabel": "Scheduler. {0} view",
    "dxScheduler-appointmentAriaLabel-group": "Group: {0}",
    "dxScheduler-appointmentAriaLabel-recurring": "Recurring appointment",
    "dxScheduler-appointmentListAriaLabel": "Appointment list",
    "dxScheduler-editorLabelTitle": "Subject",
    "dxScheduler-editorLabelStartDate": "Start Date",
    "dxScheduler-editorLabelEndDate": "End Date",
    "dxScheduler-editorLabelDescription": "Description",
    "dxScheduler-editorLabelRecurrence": "Repeat",
    "dxScheduler-navigationPrevious": "Previous page",
    "dxScheduler-navigationNext": "Next page",
    "dxScheduler-openAppointment": "Open appointment",
    "dxScheduler-recurrenceNever": "Never",
    "dxScheduler-recurrenceMinutely": "Every minute",
    "dxScheduler-recurrenceHourly": "Hourly",
    "dxScheduler-recurrenceDaily": "Daily",
    "dxScheduler-recurrenceWeekly": "Weekly",
    "dxScheduler-recurrenceMonthly": "Monthly",
    "dxScheduler-recurrenceYearly": "Yearly",
    "dxScheduler-recurrenceRepeatEvery": "Repeat Every",
    "dxScheduler-recurrenceRepeatOn": "Repeat On",
    "dxScheduler-recurrenceEnd": "End repeat",
    "dxScheduler-recurrenceAfter": "After",
    "dxScheduler-recurrenceOn": "On",
    "dxScheduler-recurrenceRepeatMinutely": "minute(s)",
    "dxScheduler-recurrenceRepeatHourly": "hour(s)",
    "dxScheduler-recurrenceRepeatDaily": "day(s)",
    "dxScheduler-recurrenceRepeatWeekly": "week(s)",
    "dxScheduler-recurrenceRepeatMonthly": "month(s)",
    "dxScheduler-recurrenceRepeatYearly": "year(s)",
    "dxScheduler-switcherDay": "Day",
    "dxScheduler-switcherWeek": "Week",
    "dxScheduler-switcherWorkWeek": "Work Week",
    "dxScheduler-switcherMonth": "Month",
    "dxScheduler-switcherAgenda": "Agenda",
    "dxScheduler-switcherTimelineDay": "Timeline Day",
    "dxScheduler-switcherTimelineWeek": "Timeline Week",
    "dxScheduler-switcherTimelineWorkWeek": "Timeline Work Week",
    "dxScheduler-switcherTimelineMonth": "Timeline Month",
    "dxScheduler-recurrenceRepeatOnDate": "on date",
    "dxScheduler-recurrenceRepeatCount": "occurrence(s)",
    "dxScheduler-allDay": "All day",
    "dxScheduler-ariaEditForm": "Edit form",
    "dxScheduler-confirmRecurrenceEditTitle": "Edit Recurring Appointment",
    "dxScheduler-confirmRecurrenceDeleteTitle": "Delete Recurring Appointment",
    "dxScheduler-confirmRecurrenceEditMessage": "Do you want to edit only this appointment or the whole series?",
    "dxScheduler-confirmRecurrenceDeleteMessage": "Do you want to delete only this appointment or the whole series?",
    "dxScheduler-confirmRecurrenceEditSeries": "Edit series",
    "dxScheduler-confirmRecurrenceDeleteSeries": "Delete series",
    "dxScheduler-confirmRecurrenceEditOccurrence": "Edit appointment",
    "dxScheduler-confirmRecurrenceDeleteOccurrence": "Delete appointment",
    "dxScheduler-noTimezoneTitle": "No timezone",
    "dxScheduler-moreAppointments": "{0} more",
    "dxCalendar-currentDay": "Today",
    "dxCalendar-currentMonth": "Current month",
    "dxCalendar-currentYear": "Current year",
    "dxCalendar-currentYearRange": "Current year range",
    "dxCalendar-todayButtonText": "Today",
    "dxCalendar-ariaWidgetName": "Calendar",
    "dxCalendar-previousMonthButtonLabel": "Previous month",
    "dxCalendar-previousYearButtonLabel": "Previous year",
    "dxCalendar-previousDecadeButtonLabel": "Previous decade",
    "dxCalendar-previousCenturyButtonLabel": "Previous century",
    "dxCalendar-nextMonthButtonLabel": "Next month",
    "dxCalendar-nextYearButtonLabel": "Next year",
    "dxCalendar-nextDecadeButtonLabel": "Next decade",
    "dxCalendar-nextCenturyButtonLabel": "Next century",
    "dxCalendar-captionMonthLabel": "Month selection",
    "dxCalendar-captionYearLabel": "Year selection",
    "dxCalendar-captionDecadeLabel": "Decade selection",
    "dxCalendar-captionCenturyLabel": "Century selection",
    "dxCalendar-selectedDate": "The selected date is {0}",
    "dxCalendar-selectedDates": "The selected dates",
    "dxCalendar-selectedDateRange": "The selected date range is from {0} to {1}",
    "dxCalendar-selectedMultipleDateRange": "from {0} to {1}",
    "dxCalendar-selectedDateRangeCount": "There are {0} selected date ranges",
    "dxCalendar-readOnlyLabel": "Read-only calendar",
    "dxAvatar-defaultImageAlt": "Avatar",
    "dxChat-elementAriaLabel": "Chat",
    "dxChat-textareaPlaceholder": "Type a message",
    "dxChat-sendButtonAriaLabel": "Send",
    "dxChat-defaultUserName": "Unknown User",
    "dxChat-messageListAriaLabel": "Message list",
    "dxChat-alertListAriaLabel": "Error list",
    "dxChat-emptyListMessage": "There are no messages in this chat",
    "dxChat-emptyListPrompt": "Write your first message",
    "dxChat-typingMessageSingleUser": "{0} is typing...",
    "dxChat-typingMessageTwoUsers": "{0} and {1} are typing...",
    "dxChat-typingMessageThreeUsers": "{0}, {1} and {2} are typing...",
    "dxChat-typingMessageMultipleUsers": "{0} and others are typing...",
    "dxColorView-ariaRed": "Red",
    "dxColorView-ariaGreen": "Green",
    "dxColorView-ariaBlue": "Blue",
    "dxColorView-ariaAlpha": "Transparency",
    "dxColorView-ariaHex": "Color code",
    "dxTagBox-selected": "{0} selected",
    "dxTagBox-allSelected": "All selected ({0})",
    "dxTagBox-moreSelected": "{0} more",
    "dxTagBox-tagRoleDescription": "Tag. Press the delete button to remove this tag",
    "dxTagBox-ariaRoleDescription": "Tag box",
    "vizExport-printingButtonText": "Print",
    "vizExport-titleMenuText": "Exporting/Printing",
    "vizExport-exportButtonText": "{0} file",
    "dxFilterBuilder-and": "And",
    "dxFilterBuilder-or": "Or",
    "dxFilterBuilder-notAnd": "Not And",
    "dxFilterBuilder-notOr": "Not Or",
    "dxFilterBuilder-addCondition": "Add Condition",
    "dxFilterBuilder-addGroup": "Add Group",
    "dxFilterBuilder-enterValueText": "<enter a value>",
    "dxFilterBuilder-filterOperationEquals": "Equals",
    "dxFilterBuilder-filterOperationNotEquals": "Does not equal",
    "dxFilterBuilder-filterOperationLess": "Is less than",
    "dxFilterBuilder-filterOperationLessOrEquals": "Is less than or equal to",
    "dxFilterBuilder-filterOperationGreater": "Is greater than",
    "dxFilterBuilder-filterOperationGreaterOrEquals": "Is greater than or equal to",
    "dxFilterBuilder-filterOperationStartsWith": "Starts with",
    "dxFilterBuilder-filterOperationContains": "Contains",
    "dxFilterBuilder-filterOperationNotContains": "Does not contain",
    "dxFilterBuilder-filterOperationEndsWith": "Ends with",
    "dxFilterBuilder-filterOperationIsBlank": "Is blank",
    "dxFilterBuilder-filterOperationIsNotBlank": "Is not blank",
    "dxFilterBuilder-filterOperationBetween": "Is between",
    "dxFilterBuilder-filterOperationAnyOf": "Is any of",
    "dxFilterBuilder-filterOperationNoneOf": "Is none of",
    "dxFilterBuilder-filterAriaRootElement": "Filter builder",
    "dxFilterBuilder-filterAriaGroupLevel": "Level {0}",
    "dxFilterBuilder-filterAriaGroupItem": "Group item",
    "dxFilterBuilder-filterAriaOperationButton": "Operation",
    "dxFilterBuilder-filterAriaAddButton": "Add",
    "dxFilterBuilder-filterAriaRemoveButton": "Remove {0}",
    "dxFilterBuilder-filterAriaItemField": "Item field",
    "dxFilterBuilder-filterAriaItemOperation": "Item operation",
    "dxFilterBuilder-filterAriaItemValue": "Item value",
    "dxHtmlEditor-dialogColorCaption": "Change Font Color",
    "dxHtmlEditor-dialogBackgroundCaption": "Change Background Color",
    "dxHtmlEditor-dialogLinkCaption": "Add Link",
    "dxHtmlEditor-dialogLinkUrlField": "URL",
    "dxHtmlEditor-dialogLinkTextField": "Text",
    "dxHtmlEditor-dialogLinkTargetField": "Open link in new window",
    "dxHtmlEditor-dialogImageCaption": "Add Image",
    "dxHtmlEditor-dialogImageUrlField": "URL",
    "dxHtmlEditor-dialogImageAltField": "Alternate text",
    "dxHtmlEditor-dialogImageWidthField": "Width (px)",
    "dxHtmlEditor-dialogImageHeightField": "Height (px)",
    "dxHtmlEditor-dialogInsertTableRowsField": "Rows",
    "dxHtmlEditor-dialogInsertTableColumnsField": "Columns",
    "dxHtmlEditor-dialogInsertTableCaption": "Insert Table",
    "dxHtmlEditor-dialogUpdateImageCaption": "Update Image",
    "dxHtmlEditor-dialogImageUpdateButton": "Update",
    "dxHtmlEditor-dialogImageAddButton": "Add",
    "dxHtmlEditor-dialogImageSpecifyUrl": "From the Web",
    "dxHtmlEditor-dialogImageSelectFile": "From This Device",
    "dxHtmlEditor-dialogImageKeepAspectRatio": "Keep Aspect Ratio",
    "dxHtmlEditor-dialogImageEncodeToBase64": "Encode to Base64",
    "dxHtmlEditor-heading": "Heading",
    "dxHtmlEditor-normalText": "Normal text",
    "dxHtmlEditor-background": "Background Color",
    "dxHtmlEditor-bold": "Bold",
    "dxHtmlEditor-color": "Font Color",
    "dxHtmlEditor-font": "Font",
    "dxHtmlEditor-italic": "Italic",
    "dxHtmlEditor-link": "Add Link",
    "dxHtmlEditor-image": "Add Image",
    "dxHtmlEditor-size": "Size",
    "dxHtmlEditor-strike": "Strikethrough",
    "dxHtmlEditor-subscript": "Subscript",
    "dxHtmlEditor-superscript": "Superscript",
    "dxHtmlEditor-underline": "Underline",
    "dxHtmlEditor-blockquote": "Blockquote",
    "dxHtmlEditor-header": "Header",
    "dxHtmlEditor-increaseIndent": "Increase Indent",
    "dxHtmlEditor-decreaseIndent": "Decrease Indent",
    "dxHtmlEditor-orderedList": "Ordered List",
    "dxHtmlEditor-bulletList": "Bullet List",
    "dxHtmlEditor-alignLeft": "Align Left",
    "dxHtmlEditor-alignCenter": "Align Center",
    "dxHtmlEditor-alignRight": "Align Right",
    "dxHtmlEditor-alignJustify": "Align Justify",
    "dxHtmlEditor-codeBlock": "Code Block",
    "dxHtmlEditor-variable": "Add Variable",
    "dxHtmlEditor-undo": "Undo",
    "dxHtmlEditor-redo": "Redo",
    "dxHtmlEditor-clear": "Clear Formatting",
    "dxHtmlEditor-insertTable": "Insert Table",
    "dxHtmlEditor-insertHeaderRow": "Insert Header Row",
    "dxHtmlEditor-insertRowAbove": "Insert Row Above",
    "dxHtmlEditor-insertRowBelow": "Insert Row Below",
    "dxHtmlEditor-insertColumnLeft": "Insert Column Left",
    "dxHtmlEditor-insertColumnRight": "Insert Column Right",
    "dxHtmlEditor-deleteColumn": "Delete Column",
    "dxHtmlEditor-deleteRow": "Delete Row",
    "dxHtmlEditor-deleteTable": "Delete Table",
    "dxHtmlEditor-cellProperties": "Cell Properties",
    "dxHtmlEditor-tableProperties": "Table Properties",
    "dxHtmlEditor-insert": "Insert",
    "dxHtmlEditor-delete": "Delete",
    "dxHtmlEditor-border": "Border",
    "dxHtmlEditor-style": "Style",
    "dxHtmlEditor-width": "Width",
    "dxHtmlEditor-height": "Height",
    "dxHtmlEditor-borderColor": "Color",
    "dxHtmlEditor-borderWidth": "Border Width",
    "dxHtmlEditor-tableBackground": "Background",
    "dxHtmlEditor-dimensions": "Dimensions",
    "dxHtmlEditor-alignment": "Alignment",
    "dxHtmlEditor-horizontal": "Horizontal",
    "dxHtmlEditor-vertical": "Vertical",
    "dxHtmlEditor-paddingVertical": "Vertical Padding",
    "dxHtmlEditor-paddingHorizontal": "Horizontal Padding",
    "dxHtmlEditor-pixels": "Pixels",
    "dxHtmlEditor-list": "List",
    "dxHtmlEditor-ordered": "Ordered",
    "dxHtmlEditor-bullet": "Bullet",
    "dxHtmlEditor-align": "Align",
    "dxHtmlEditor-center": "Center",
    "dxHtmlEditor-left": "Left",
    "dxHtmlEditor-right": "Right",
    "dxHtmlEditor-indent": "Indent",
    "dxHtmlEditor-justify": "Justify",
    "dxHtmlEditor-borderStyleNone": "none",
    "dxHtmlEditor-borderStyleHidden": "hidden",
    "dxHtmlEditor-borderStyleDotted": "dotted",
    "dxHtmlEditor-borderStyleDashed": "dashed",
    "dxHtmlEditor-borderStyleSolid": "solid",
    "dxHtmlEditor-borderStyleDouble": "double",
    "dxHtmlEditor-borderStyleGroove": "groove",
    "dxHtmlEditor-borderStyleRidge": "ridge",
    "dxHtmlEditor-borderStyleInset": "inset",
    "dxHtmlEditor-borderStyleOutset": "outset",
    "dxFileManager-newDirectoryName": "Untitled directory",
    "dxFileManager-rootDirectoryName": "Files",
    "dxFileManager-errorNoAccess": "Access Denied. Operation could not be completed.",
    "dxFileManager-errorDirectoryExistsFormat": "Directory '{0}' already exists.",
    "dxFileManager-errorFileExistsFormat": "File '{0}' already exists.",
    "dxFileManager-errorFileNotFoundFormat": "File '{0}' not found.",
    "dxFileManager-errorDirectoryNotFoundFormat": "Directory '{0}' not found.",
    "dxFileManager-errorWrongFileExtension": "File extension is not allowed.",
    "dxFileManager-errorMaxFileSizeExceeded": "File size exceeds the maximum allowed size.",
    "dxFileManager-errorInvalidSymbols": "This name contains invalid characters.",
    "dxFileManager-errorDefault": "Unspecified error.",
    "dxFileManager-errorDirectoryOpenFailed": "The directory cannot be opened",
    "dxFileManager-commandCreate": "New directory",
    "dxFileManager-commandRename": "Rename",
    "dxFileManager-commandMove": "Move to",
    "dxFileManager-commandCopy": "Copy to",
    "dxFileManager-commandDelete": "Delete",
    "dxFileManager-commandDownload": "Download",
    "dxFileManager-commandUpload": "Upload files",
    "dxFileManager-commandRefresh": "Refresh",
    "dxFileManager-commandThumbnails": "Thumbnails View",
    "dxFileManager-commandDetails": "Details View",
    "dxFileManager-commandClearSelection": "Clear selection",
    "dxFileManager-commandShowNavPane": "Toggle navigation pane",
    "dxFileManager-dialogDirectoryChooserMoveTitle": "Move to",
    "dxFileManager-dialogDirectoryChooserMoveButtonText": "Move",
    "dxFileManager-dialogDirectoryChooserCopyTitle": "Copy to",
    "dxFileManager-dialogDirectoryChooserCopyButtonText": "Copy",
    "dxFileManager-dialogRenameItemTitle": "Rename",
    "dxFileManager-dialogRenameItemButtonText": "Save",
    "dxFileManager-dialogCreateDirectoryTitle": "New directory",
    "dxFileManager-dialogCreateDirectoryButtonText": "Create",
    "dxFileManager-dialogDeleteItemTitle": "Delete",
    "dxFileManager-dialogDeleteItemButtonText": "Delete",
    "dxFileManager-dialogDeleteItemSingleItemConfirmation": "Are you sure you want to delete {0}?",
    "dxFileManager-dialogDeleteItemMultipleItemsConfirmation": "Are you sure you want to delete {0} items?",
    "dxFileManager-dialogButtonCancel": "Cancel",
    "dxFileManager-editingCreateSingleItemProcessingMessage": "Creating a directory inside {0}",
    "dxFileManager-editingCreateSingleItemSuccessMessage": "Created a directory inside {0}",
    "dxFileManager-editingCreateSingleItemErrorMessage": "Directory was not created",
    "dxFileManager-editingCreateCommonErrorMessage": "Directory was not created",
    "dxFileManager-editingRenameSingleItemProcessingMessage": "Renaming an item inside {0}",
    "dxFileManager-editingRenameSingleItemSuccessMessage": "Renamed an item inside {0}",
    "dxFileManager-editingRenameSingleItemErrorMessage": "Item was not renamed",
    "dxFileManager-editingRenameCommonErrorMessage": "Item was not renamed",
    "dxFileManager-editingDeleteSingleItemProcessingMessage": "Deleting an item from {0}",
    "dxFileManager-editingDeleteMultipleItemsProcessingMessage": "Deleting {0} items from {1}",
    "dxFileManager-editingDeleteSingleItemSuccessMessage": "Deleted an item from {0}",
    "dxFileManager-editingDeleteMultipleItemsSuccessMessage": "Deleted {0} items from {1}",
    "dxFileManager-editingDeleteSingleItemErrorMessage": "Item was not deleted",
    "dxFileManager-editingDeleteMultipleItemsErrorMessage": "{0} items were not deleted",
    "dxFileManager-editingDeleteCommonErrorMessage": "Some items were not deleted",
    "dxFileManager-editingMoveSingleItemProcessingMessage": "Moving an item to {0}",
    "dxFileManager-editingMoveMultipleItemsProcessingMessage": "Moving {0} items to {1}",
    "dxFileManager-editingMoveSingleItemSuccessMessage": "Moved an item to {0}",
    "dxFileManager-editingMoveMultipleItemsSuccessMessage": "Moved {0} items to {1}",
    "dxFileManager-editingMoveSingleItemErrorMessage": "Item was not moved",
    "dxFileManager-editingMoveMultipleItemsErrorMessage": "{0} items were not moved",
    "dxFileManager-editingMoveCommonErrorMessage": "Some items were not moved",
    "dxFileManager-editingCopySingleItemProcessingMessage": "Copying an item to {0}",
    "dxFileManager-editingCopyMultipleItemsProcessingMessage": "Copying {0} items to {1}",
    "dxFileManager-editingCopySingleItemSuccessMessage": "Copied an item to {0}",
    "dxFileManager-editingCopyMultipleItemsSuccessMessage": "Copied {0} items to {1}",
    "dxFileManager-editingCopySingleItemErrorMessage": "Item was not copied",
    "dxFileManager-editingCopyMultipleItemsErrorMessage": "{0} items were not copied",
    "dxFileManager-editingCopyCommonErrorMessage": "Some items were not copied",
    "dxFileManager-editingUploadSingleItemProcessingMessage": "Uploading an item to {0}",
    "dxFileManager-editingUploadMultipleItemsProcessingMessage": "Uploading {0} items to {1}",
    "dxFileManager-editingUploadSingleItemSuccessMessage": "Uploaded an item to {0}",
    "dxFileManager-editingUploadMultipleItemsSuccessMessage": "Uploaded {0} items to {1}",
    "dxFileManager-editingUploadSingleItemErrorMessage": "Item was not uploaded",
    "dxFileManager-editingUploadMultipleItemsErrorMessage": "{0} items were not uploaded",
    "dxFileManager-editingUploadCanceledMessage": "Canceled",
    "dxFileManager-editingDownloadSingleItemErrorMessage": "Item was not downloaded",
    "dxFileManager-editingDownloadMultipleItemsErrorMessage": "{0} items were not downloaded",
    "dxFileManager-listDetailsColumnCaptionName": "Name",
    "dxFileManager-listDetailsColumnCaptionDateModified": "Date Modified",
    "dxFileManager-listDetailsColumnCaptionFileSize": "File Size",
    "dxFileManager-listThumbnailsTooltipTextSize": "Size",
    "dxFileManager-listThumbnailsTooltipTextDateModified": "Date Modified",
    "dxFileManager-notificationProgressPanelTitle": "Progress",
    "dxFileManager-notificationProgressPanelEmptyListText": "No operations",
    "dxFileManager-notificationProgressPanelOperationCanceled": "Canceled",
    "dxDiagram-categoryGeneral": "General",
    "dxDiagram-categoryFlowchart": "Flowchart",
    "dxDiagram-categoryOrgChart": "Org Chart",
    "dxDiagram-categoryContainers": "Containers",
    "dxDiagram-categoryCustom": "Custom",
    "dxDiagram-commandExportToSvg": "Export to SVG",
    "dxDiagram-commandExportToPng": "Export to PNG",
    "dxDiagram-commandExportToJpg": "Export to JPEG",
    "dxDiagram-commandUndo": "Undo",
    "dxDiagram-commandRedo": "Redo",
    "dxDiagram-commandFontName": "Font Name",
    "dxDiagram-commandFontSize": "Font Size",
    "dxDiagram-commandBold": "Bold",
    "dxDiagram-commandItalic": "Italic",
    "dxDiagram-commandUnderline": "Underline",
    "dxDiagram-commandTextColor": "Font Color",
    "dxDiagram-commandLineColor": "Line Color",
    "dxDiagram-commandLineWidth": "Line Width",
    "dxDiagram-commandLineStyle": "Line Style",
    "dxDiagram-commandLineStyleSolid": "Solid",
    "dxDiagram-commandLineStyleDotted": "Dotted",
    "dxDiagram-commandLineStyleDashed": "Dashed",
    "dxDiagram-commandFillColor": "Fill Color",
    "dxDiagram-commandAlignLeft": "Align Left",
    "dxDiagram-commandAlignCenter": "Align Center",
    "dxDiagram-commandAlignRight": "Align Right",
    "dxDiagram-commandConnectorLineType": "Connector Line Type",
    "dxDiagram-commandConnectorLineStraight": "Straight",
    "dxDiagram-commandConnectorLineOrthogonal": "Orthogonal",
    "dxDiagram-commandConnectorLineStart": "Connector Line Start",
    "dxDiagram-commandConnectorLineEnd": "Connector Line End",
    "dxDiagram-commandConnectorLineNone": "None",
    "dxDiagram-commandConnectorLineArrow": "Arrow",
    "dxDiagram-commandFullscreen": "Full Screen",
    "dxDiagram-commandUnits": "Units",
    "dxDiagram-commandPageSize": "Page Size",
    "dxDiagram-commandPageOrientation": "Page Orientation",
    "dxDiagram-commandPageOrientationLandscape": "Landscape",
    "dxDiagram-commandPageOrientationPortrait": "Portrait",
    "dxDiagram-commandPageColor": "Page Color",
    "dxDiagram-commandShowGrid": "Show Grid",
    "dxDiagram-commandSnapToGrid": "Snap to Grid",
    "dxDiagram-commandGridSize": "Grid Size",
    "dxDiagram-commandZoomLevel": "Zoom Level",
    "dxDiagram-commandAutoZoom": "Auto Zoom",
    "dxDiagram-commandFitToContent": "Fit to Content",
    "dxDiagram-commandFitToWidth": "Fit to Width",
    "dxDiagram-commandAutoZoomByContent": "Auto Zoom by Content",
    "dxDiagram-commandAutoZoomByWidth": "Auto Zoom by Width",
    "dxDiagram-commandSimpleView": "Simple View",
    "dxDiagram-commandCut": "Cut",
    "dxDiagram-commandCopy": "Copy",
    "dxDiagram-commandPaste": "Paste",
    "dxDiagram-commandSelectAll": "Select All",
    "dxDiagram-commandDelete": "Delete",
    "dxDiagram-commandBringToFront": "Bring to Front",
    "dxDiagram-commandSendToBack": "Send to Back",
    "dxDiagram-commandLock": "Lock",
    "dxDiagram-commandUnlock": "Unlock",
    "dxDiagram-commandInsertShapeImage": "Insert Image...",
    "dxDiagram-commandEditShapeImage": "Change Image...",
    "dxDiagram-commandDeleteShapeImage": "Delete Image",
    "dxDiagram-commandLayoutLeftToRight": "Left-to-right",
    "dxDiagram-commandLayoutRightToLeft": "Right-to-left",
    "dxDiagram-commandLayoutTopToBottom": "Top-to-bottom",
    "dxDiagram-commandLayoutBottomToTop": "Bottom-to-top",
    "dxDiagram-unitIn": "in",
    "dxDiagram-unitCm": "cm",
    "dxDiagram-unitPx": "px",
    "dxDiagram-dialogButtonOK": "OK",
    "dxDiagram-dialogButtonCancel": "Cancel",
    "dxDiagram-dialogInsertShapeImageTitle": "Insert Image",
    "dxDiagram-dialogEditShapeImageTitle": "Change Image",
    "dxDiagram-dialogEditShapeImageSelectButton": "Select image",
    "dxDiagram-dialogEditShapeImageLabelText": "or drop a file here",
    "dxDiagram-uiExport": "Export",
    "dxDiagram-uiProperties": "Properties",
    "dxDiagram-uiSettings": "Settings",
    "dxDiagram-uiShowToolbox": "Show Toolbox",
    "dxDiagram-uiSearch": "Search",
    "dxDiagram-uiStyle": "Style",
    "dxDiagram-uiLayout": "Layout",
    "dxDiagram-uiLayoutTree": "Tree",
    "dxDiagram-uiLayoutLayered": "Layered",
    "dxDiagram-uiDiagram": "Diagram",
    "dxDiagram-uiText": "Text",
    "dxDiagram-uiObject": "Object",
    "dxDiagram-uiConnector": "Connector",
    "dxDiagram-uiPage": "Page",
    "dxDiagram-shapeText": "Text",
    "dxDiagram-shapeRectangle": "Rectangle",
    "dxDiagram-shapeEllipse": "Ellipse",
    "dxDiagram-shapeCross": "Cross",
    "dxDiagram-shapeTriangle": "Triangle",
    "dxDiagram-shapeDiamond": "Diamond",
    "dxDiagram-shapeHeart": "Heart",
    "dxDiagram-shapePentagon": "Pentagon",
    "dxDiagram-shapeHexagon": "Hexagon",
    "dxDiagram-shapeOctagon": "Octagon",
    "dxDiagram-shapeStar": "Star",
    "dxDiagram-shapeArrowLeft": "Left Arrow",
    "dxDiagram-shapeArrowUp": "Up Arrow",
    "dxDiagram-shapeArrowRight": "Right Arrow",
    "dxDiagram-shapeArrowDown": "Down Arrow",
    "dxDiagram-shapeArrowUpDown": "Up Down Arrow",
    "dxDiagram-shapeArrowLeftRight": "Left Right Arrow",
    "dxDiagram-shapeProcess": "Process",
    "dxDiagram-shapeDecision": "Decision",
    "dxDiagram-shapeTerminator": "Terminator",
    "dxDiagram-shapePredefinedProcess": "Predefined Process",
    "dxDiagram-shapeDocument": "Document",
    "dxDiagram-shapeMultipleDocuments": "Multiple Documents",
    "dxDiagram-shapeManualInput": "Manual Input",
    "dxDiagram-shapePreparation": "Preparation",
    "dxDiagram-shapeData": "Data",
    "dxDiagram-shapeDatabase": "Database",
    "dxDiagram-shapeHardDisk": "Hard Disk",
    "dxDiagram-shapeInternalStorage": "Internal Storage",
    "dxDiagram-shapePaperTape": "Paper Tape",
    "dxDiagram-shapeManualOperation": "Manual Operation",
    "dxDiagram-shapeDelay": "Delay",
    "dxDiagram-shapeStoredData": "Stored Data",
    "dxDiagram-shapeDisplay": "Display",
    "dxDiagram-shapeMerge": "Merge",
    "dxDiagram-shapeConnector": "Connector",
    "dxDiagram-shapeOr": "Or",
    "dxDiagram-shapeSummingJunction": "Summing Junction",
    "dxDiagram-shapeContainerDefaultText": "Container",
    "dxDiagram-shapeVerticalContainer": "Vertical Container",
    "dxDiagram-shapeHorizontalContainer": "Horizontal Container",
    "dxDiagram-shapeCardDefaultText": "Person's Name",
    "dxDiagram-shapeCardWithImageOnLeft": "Card with Image on the Left",
    "dxDiagram-shapeCardWithImageOnTop": "Card with Image on the Top",
    "dxDiagram-shapeCardWithImageOnRight": "Card with Image on the Right",
    "dxGantt-dialogTitle": "Title",
    "dxGantt-dialogStartTitle": "Start",
    "dxGantt-dialogEndTitle": "End",
    "dxGantt-dialogProgressTitle": "Progress",
    "dxGantt-dialogResourcesTitle": "Resources",
    "dxGantt-dialogResourceManagerTitle": "Resource Manager",
    "dxGantt-dialogTaskDetailsTitle": "Task Details",
    "dxGantt-dialogEditResourceListHint": "Edit Resource List",
    "dxGantt-dialogEditNoResources": "No resources",
    "dxGantt-dialogButtonAdd": "Add",
    "dxGantt-contextMenuNewTask": "New Task",
    "dxGantt-contextMenuNewSubtask": "New Subtask",
    "dxGantt-contextMenuDeleteTask": "Delete Task",
    "dxGantt-contextMenuDeleteDependency": "Delete Dependency",
    "dxGantt-dialogTaskDeleteConfirmation": "Deleting a task also deletes all its dependencies and subtasks. Are you sure you want to delete this task?",
    "dxGantt-dialogDependencyDeleteConfirmation": "Are you sure you want to delete the dependency from the task?",
    "dxGantt-dialogResourcesDeleteConfirmation": "Deleting a resource also deletes it from tasks to which this resource is assigned. Are you sure you want to delete these resources? Resources: {0}",
    "dxGantt-dialogConstraintCriticalViolationMessage": "The task you are attempting to move is linked to a second task by a dependency relation. This change would conflict with dependency rules. How would you like to proceed?",
    "dxGantt-dialogConstraintViolationMessage": "The task you are attempting to move is linked to a second task by a dependency relation. How would you like to proceed?",
    "dxGantt-dialogCancelOperationMessage": "Cancel the operation",
    "dxGantt-dialogDeleteDependencyMessage": "Delete the dependency",
    "dxGantt-dialogMoveTaskAndKeepDependencyMessage": "Move the task and keep the dependency",
    "dxGantt-dialogConstraintCriticalViolationSeveralTasksMessage": "The task you are attempting to move is linked to another tasks by dependency relations. This change would conflict with dependency rules. How would you like to proceed?",
    "dxGantt-dialogConstraintViolationSeveralTasksMessage": "The task you are attempting to move is linked to another tasks by dependency relations. How would you like to proceed?",
    "dxGantt-dialogDeleteDependenciesMessage": "Delete the dependency relations",
    "dxGantt-dialogMoveTaskAndKeepDependenciesMessage": "Move the task and keep the dependencies",
    "dxGantt-undo": "Undo",
    "dxGantt-redo": "Redo",
    "dxGantt-expandAll": "Expand All",
    "dxGantt-collapseAll": "Collapse All",
    "dxGantt-addNewTask": "Add New Task",
    "dxGantt-deleteSelectedTask": "Delete Selected Task",
    "dxGantt-zoomIn": "Zoom In",
    "dxGantt-zoomOut": "Zoom Out",
    "dxGantt-fullScreen": "Full Screen",
    "dxGantt-quarter": "Q{0}",
    "dxGantt-sortingAscendingText": "Sort Ascending",
    "dxGantt-sortingDescendingText": "Sort Descending",
    "dxGantt-sortingClearText": "Clear Sorting",
    "dxGantt-showResources": "Show Resources",
    "dxGantt-showDependencies": "Show Dependencies",
    "dxGantt-dialogStartDateValidation": "Start date must be after {0}",
    "dxGantt-dialogEndDateValidation": "End date must be after {0}",
    "dxGallery-itemName": "Gallery item",
    "dxMultiView-elementAriaRoleDescription": "MultiView",
    "dxMultiView-elementAriaLabel": "Use the arrow keys or swipe to navigate between views",
    "dxMultiView-itemAriaRoleDescription": "View",
    "dxMultiView-itemAriaLabel": "{0} of {1}",
    "dxSplitter-resizeHandleAriaLabel": "Split bar",
    "dxSplitter-resizeHandleAriaRoleDescription": "Separator"
  }
};

// node_modules/devextreme/esm/common/core/localization/message.js
var baseDictionary = extend(true, {}, defaultMessages);
var getDataByLocale = (localeData, locale) => {
  var _Object$entries$find;
  return localeData[locale] || (null === locale || void 0 === locale ? void 0 : locale.toLowerCase) && (null === (_Object$entries$find = Object.entries(localeData).find((_ref) => {
    let [key] = _ref;
    return key.toLowerCase() === locale.toLowerCase();
  })) || void 0 === _Object$entries$find ? void 0 : _Object$entries$find[1]) || {};
};
var newMessages = {};
var messageLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  _dictionary: baseDictionary,
  load: function(messages) {
    extend(true, this._dictionary, messages);
  },
  _localizablePrefix: "@",
  setup: function(localizablePrefix) {
    this._localizablePrefix = localizablePrefix;
  },
  localizeString: function(text) {
    const that = this;
    const regex = new RegExp("(^|[^a-zA-Z_0-9" + that._localizablePrefix + "-]+)(" + that._localizablePrefix + "{1,2})([a-zA-Z_0-9-]+)", "g");
    const escapeString = that._localizablePrefix + that._localizablePrefix;
    return text.replace(regex, (str, prefix, escape, localizationKey) => {
      const defaultResult = that._localizablePrefix + localizationKey;
      let result;
      if (escape !== escapeString) {
        result = that.format(localizationKey);
      }
      if (!result) {
        newMessages[localizationKey] = humanize(localizationKey);
      }
      return prefix + (result || defaultResult);
    });
  },
  getMessagesByLocales: function() {
    return this._dictionary;
  },
  getDictionary: function(onlyNew) {
    if (onlyNew) {
      return newMessages;
    }
    return extend({}, newMessages, this.getMessagesByLocales()[core_default.locale()]);
  },
  getFormatter: function(key) {
    return this._getFormatterBase(key) || this._getFormatterBase(key, "en");
  },
  _getFormatterBase: function(key, locale) {
    const message = core_default.getValueByClosestLocale((locale2) => getDataByLocale(this._dictionary, locale2)[key]);
    if (message) {
      return function() {
        const args = 1 === arguments.length && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
        args.unshift(message);
        return format.apply(this, args);
      };
    }
  },
  format: function(key) {
    const formatter = this.getFormatter(key);
    const values = Array.prototype.slice.call(arguments, 1);
    return formatter && formatter.apply(this, values) || "";
  }
});
var message_default = messageLocalization;

// node_modules/devextreme/esm/__internal/core/m_component_registrator_callbacks.js
var componentRegistratorCallbacks = new memorized_callbacks_default();

// node_modules/devextreme/esm/core/component_registrator_callbacks.js
var component_registrator_callbacks_default = componentRegistratorCallbacks;

// node_modules/devextreme/esm/__internal/core/m_component_registrator.js
var registerComponent = function(name, namespace, componentClass) {
  if (!componentClass) {
    componentClass = namespace;
  } else {
    namespace[name] = componentClass;
  }
  getName(componentClass, name);
  component_registrator_callbacks_default.fire(name, componentClass);
};
var registerRendererComponent = function(name, componentClass) {
  renderer_default.fn[name] = function(options) {
    const isMemberInvoke = "string" === typeof options;
    let result;
    if (isMemberInvoke) {
      const memberName = options;
      const memberArgs = [].slice.call(arguments).slice(1);
      this.each(function() {
        const instance = componentClass.getInstance(this);
        if (!instance) {
          throw errors_default.Error("E0009", name);
        }
        const member = instance[memberName];
        const memberValue = member.apply(instance, memberArgs);
        if (void 0 === result) {
          result = memberValue;
        }
      });
    } else {
      this.each(function() {
        const instance = componentClass.getInstance(this);
        if (instance) {
          instance.option(options);
        } else {
          new componentClass(this, options);
        }
      });
      result = this;
    }
    return result;
  };
};
component_registrator_callbacks_default.add(registerRendererComponent);

// node_modules/devextreme/esm/core/component_registrator.js
var component_registrator_default = registerComponent;

// node_modules/devextreme/esm/ui/themes_callback.js
var themeReadyCallback = callbacks_default();

// node_modules/devextreme/esm/ui/widget/ui.errors.js
var ui_errors_default = error_default(errors_default.ERROR_MESSAGES, {
  E1001: "Module '{0}'. Controller '{1}' is already registered",
  E1002: "Module '{0}'. Controller '{1}' does not inherit from DevExpress.ui.dxDataGrid.Controller",
  E1003: "Module '{0}'. View '{1}' is already registered",
  E1004: "Module '{0}'. View '{1}' does not inherit from DevExpress.ui.dxDataGrid.View",
  E1005: "Public method '{0}' is already registered",
  E1006: "Public method '{0}.{1}' does not exist",
  E1007: "State storing cannot be provided due to the restrictions of the browser",
  E1010: "The template does not contain the TextBox widget",
  E1011: 'Items cannot be deleted from the List. Implement the "remove" function in the data store',
  E1012: "Editing type '{0}' with the name '{1}' is unsupported",
  E1016: "Unexpected type of data source is provided for a lookup column",
  E1018: "The 'collapseAll' method cannot be called if you use a remote data source",
  E1019: "Search mode '{0}' is unavailable",
  E1020: "The type cannot be changed after initialization",
  E1021: "{0} '{1}' you are trying to remove does not exist",
  E1022: 'The "markers" option is given an invalid value. Assign an array instead',
  E1023: 'The "routes" option is given an invalid value. Assign an array instead',
  E1025: "This layout is too complex to render",
  E1026: 'The "calculateCustomSummary" function is missing from a field whose "summaryType" option is set to "custom"',
  E1031: "Unknown subscription in the Scheduler widget: '{0}'",
  E1032: "Unknown start date in an appointment: '{0}'",
  E1033: "Unknown step in the date navigator: '{0}'",
  E1034: "The browser does not implement an API for saving files",
  E1035: "The editor cannot be created: {0}",
  E1037: "Invalid structure of grouped data",
  E1038: "The browser does not support local storages for local web pages",
  E1039: "A cell's position cannot be calculated",
  E1040: "The '{0}' key value is not unique within the data array",
  E1041: "The '{0}' script is referenced after the DevExtreme scripts or not referenced at all",
  E1042: "{0} requires the key field to be specified",
  E1043: "Changes cannot be processed due to the incorrectly set key",
  E1044: "The key field specified by the keyExpr option does not match the key field specified in the data store",
  E1045: "Editing requires the key field to be specified in the data store",
  E1046: "The '{0}' key field is not found in data objects",
  E1047: 'The "{0}" field is not found in the fields array',
  E1048: 'The "{0}" operation is not found in the filterOperations array',
  E1049: "Column '{0}': filtering is allowed but the 'dataField' or 'name' option is not specified",
  E1050: "The validationRules option does not apply to third-party editors defined in the editCellTemplate",
  E1052: '{0} should have the "dataSource" option specified',
  E1053: 'The "buttons" option accepts an array that contains only objects or string values',
  E1054: "All text editor buttons must have names",
  E1055: 'One or several text editor buttons have invalid or non-unique "name" values',
  E1056: 'The {0} widget does not support buttons of the "{1}" type',
  E1058: 'The "startDayHour" and "endDayHour" options must be integers in the [0, 24] range, with "endDayHour" being greater than "startDayHour".',
  E1059: "The following column names are not unique: {0}",
  E1060: "All editable columns must have names",
  E1061: 'The "offset" option must be an integer in the [-1440, 1440] range, divisible by 5 without a remainder.',
  E1062: 'The "cellDuration" must be a positive integer, evenly dividing the ("endDayHour" - "startDayHour") interval into minutes.',
  W1001: 'The "key" option cannot be modified after initialization',
  W1002: "An item with the key '{0}' does not exist",
  W1003: "A group with the key '{0}' in which you are trying to select items does not exist",
  W1004: "The item '{0}' you are trying to select in the group '{1}' does not exist",
  W1005: "Due to column data types being unspecified, data has been loaded twice in order to apply initial filter settings. To resolve this issue, specify data types for all grid columns.",
  W1006: "The map service returned the following error: '{0}'",
  W1007: "No item with key {0} was found in the data source, but this key was used as the parent key for item {1}",
  W1008: "Cannot scroll to the '{0}' date because it does not exist on the current view",
  W1009: "Searching works only if data is specified using the dataSource option",
  W1010: "The capability to select all items works with source data of plain structure only",
  W1011: 'The "keyExpr" option is not applied when dataSource is not an array',
  W1012: "The '{0}' key field is not found in data objects",
  W1013: 'The "message" field in the dialog component was renamed to "messageHtml". Change your code correspondingly. In addition, if you used HTML code in the message, make sure that it is secure',
  W1014: "The Floating Action Button exceeds the recommended speed dial action count. If you need to display more speed dial actions, increase the maxSpeedDialActionCount option value in the global config.",
  W1016: "The '{0}' field in the HTML Editor toolbar item configuration was renamed to '{1}'. Please make a corresponding change in your code.",
  W1017: "The 'key' property is not specified for a lookup data source. Please specify it to prevent requests for the entire dataset when users filter data.",
  W1018: "Infinite scrolling may not work properly with multiple selection. To use these features together, set 'selection.deferred' to true or set 'selection.selectAllMode' to 'page'.",
  W1019: "Filter query string exceeds maximum length limit of {0} characters.",
  W1020: "hideEvent is ignored when the shading property is true",
  W1021: `The '{0}' is not rendered because none of the DOM elements match the value of the "container" property.`,
  W1022: "{0} JSON parsing error: '{1}'",
  W1023: "Appointments require unique keys. Otherwise, the agenda view may not work correctly.",
  W1024: "The client-side export is enabled. Implement the 'onExporting' function.",
  W1025: "'scrolling.mode' is set to 'virtual' or 'infinite'. Specify the height of the component."
});

// node_modules/devextreme/esm/ui/themes.js
var window7 = getWindow();
var ready3 = ready_callbacks_default.add;
var viewPort = value;
var viewPortChanged = changeCallback;
var initDeferred = new Deferred();
var DX_LINK_SELECTOR = "link[rel=dx-theme]";
var THEME_ATTR = "data-theme";
var ACTIVE_ATTR = "data-active";
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var defaultTimeout = 15e3;
function readThemeMarker() {
  if (!hasWindow()) {
    return null;
  }
  const element = renderer_default("<div>", context).addClass("dx-theme-marker").appendTo(context.documentElement);
  let result;
  try {
    result = window7.getComputedStyle(element.get(0)).fontFamily;
    if (!result) {
      return null;
    }
    result = result.replace(/["']/g, "");
    if ("dx." !== result.substr(0, 3)) {
      return null;
    }
    return result.substr(3);
  } finally {
    element.remove();
  }
}
function waitForThemeLoad(themeName) {
  let waitStartTime;
  let timerId;
  let intervalCleared = true;
  pendingThemeName = themeName;
  function handleLoaded() {
    pendingThemeName = null;
    clearInterval(timerId);
    intervalCleared = true;
    themeReadyCallback.fire();
    themeReadyCallback.empty();
    initDeferred.resolve();
  }
  if (isPendingThemeLoaded() || !defaultTimeout) {
    handleLoaded();
  } else {
    if (!intervalCleared) {
      if (pendingThemeName) {
        pendingThemeName = themeName;
      }
      return;
    }
    waitStartTime = Date.now();
    intervalCleared = false;
    timerId = setInterval(function() {
      const isLoaded = isPendingThemeLoaded();
      const isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
      if (isTimeout) {
        ui_errors_default.log("W0004", pendingThemeName);
      }
      if (isLoaded || isTimeout) {
        handleLoaded();
      }
    }, 10);
  }
}
function isPendingThemeLoaded() {
  if (!pendingThemeName) {
    return true;
  }
  const anyThemePending = "any" === pendingThemeName;
  if ("resolved" === initDeferred.state() && anyThemePending) {
    return true;
  }
  const themeMarker = readThemeMarker();
  if (themeMarker && anyThemePending) {
    return true;
  }
  return themeMarker === pendingThemeName;
}
function processMarkup() {
  const $allThemeLinks = renderer_default(DX_LINK_SELECTOR, context);
  if (!$allThemeLinks.length) {
    return;
  }
  knownThemes = {};
  $activeThemeLink = renderer_default(parseHTML("<link rel=stylesheet>"), context);
  $allThemeLinks.each(function() {
    const link = renderer_default(this, context);
    const fullThemeName = link.attr(THEME_ATTR);
    const url = link.attr("href");
    const isActive = "true" === link.attr(ACTIVE_ATTR);
    knownThemes[fullThemeName] = {
      url,
      isActive
    };
  });
  $allThemeLinks.last().after($activeThemeLink);
  $allThemeLinks.remove();
}
function resolveFullThemeName(desiredThemeName) {
  const desiredThemeParts = desiredThemeName ? desiredThemeName.split(".") : [];
  let result = null;
  if (knownThemes) {
    if (desiredThemeName in knownThemes) {
      return desiredThemeName;
    }
    each(knownThemes, function(knownThemeName, themeData) {
      const knownThemeParts = knownThemeName.split(".");
      if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
        return;
      }
      if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
        return;
      }
      if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
        return;
      }
      if (!result || themeData.isActive) {
        result = knownThemeName;
      }
      if (themeData.isActive) {
        return false;
      }
    });
  }
  return result;
}
function initContext(newContext) {
  try {
    if (newContext !== context) {
      knownThemes = null;
    }
  } catch (x) {
    knownThemes = null;
  }
  context = newContext;
}
function init(options) {
  options = options || {};
  initContext(options.context || dom_adapter_default.getDocument());
  if (!context) {
    return;
  }
  processMarkup();
  currentThemeName = void 0;
  current(options);
}
function current(options) {
  if (!arguments.length) {
    currentThemeName = currentThemeName || readThemeMarker();
    return currentThemeName;
  }
  detachCssClasses(viewPort());
  options = options || {};
  if ("string" === typeof options) {
    options = {
      theme: options
    };
  }
  const isAutoInit = options._autoInit;
  const loadCallback = options.loadCallback;
  let currentThemeData;
  currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
  if (currentThemeName) {
    currentThemeData = knownThemes[currentThemeName];
  }
  if (loadCallback) {
    themeReadyCallback.add(loadCallback);
  }
  if (currentThemeData) {
    $activeThemeLink.attr("href", knownThemes[currentThemeName].url);
    if (themeReadyCallback.has() || "resolved" !== initDeferred.state() || options._forceTimeout) {
      waitForThemeLoad(currentThemeName);
    }
  } else if (isAutoInit) {
    if (hasWindow()) {
      waitForThemeLoad("any");
    }
    themeReadyCallback.fire();
    themeReadyCallback.empty();
  } else {
    throw ui_errors_default.Error("E0021", currentThemeName);
  }
  initDeferred.done(() => attachCssClasses(originalViewPort(), currentThemeName));
}
function getCssClasses(themeName) {
  themeName = themeName || current();
  const result = [];
  const themeNameParts = themeName && themeName.split(".");
  if (themeNameParts) {
    result.push("dx-theme-" + themeNameParts[0], "dx-theme-" + themeNameParts[0] + "-typography");
    if (themeNameParts.length > 1) {
      result.push("dx-color-scheme-" + themeNameParts[1] + (isMaterialBased(themeName) ? "-" + themeNameParts[2] : ""));
    }
  }
  return result;
}
var themeClasses;
function _attachCssClasses(element, themeName) {
  themeClasses = getCssClasses(themeName).join(" ");
  renderer_default(element).addClass(themeClasses);
  !function() {
    const pixelRatio = hasWindow() && window7.devicePixelRatio;
    if (!pixelRatio || pixelRatio < 2) {
      return;
    }
    const $tester = renderer_default("<div>");
    $tester.css("border", ".5px solid transparent");
    renderer_default("body").append($tester);
    if (1 === getOuterHeight($tester)) {
      renderer_default(element).addClass("dx-hairlines");
      themeClasses += " dx-hairlines";
    }
    $tester.remove();
  }();
}
function attachCssClasses(element, themeName) {
  when(uiLayerInitialized).done(() => {
    _attachCssClasses(element, themeName);
  });
}
function detachCssClasses(element) {
  when(uiLayerInitialized).done(() => {
    renderer_default(element).removeClass(themeClasses);
  });
}
function isTheme(themeRegExp, themeName) {
  if (!themeName) {
    themeName = currentThemeName || readThemeMarker();
  }
  return new RegExp(themeRegExp).test(themeName);
}
function isMaterialBased(themeName) {
  return isMaterial(themeName) || isFluent(themeName);
}
function isMaterial(themeName) {
  return isTheme("material", themeName);
}
function isFluent(themeName) {
  return isTheme("fluent", themeName);
}
function isGeneric(themeName) {
  return isTheme("generic", themeName);
}
function isCompact(themeName) {
  return isTheme("compact", themeName);
}
function isWebFontLoaded(text, fontWeight) {
  const document2 = dom_adapter_default.getDocument();
  const testElement = document2.createElement("span");
  testElement.style.position = "absolute";
  testElement.style.top = "-9999px";
  testElement.style.left = "-9999px";
  testElement.style.visibility = "hidden";
  testElement.style.fontFamily = "Arial";
  testElement.style.fontSize = "250px";
  testElement.style.fontWeight = fontWeight;
  testElement.innerHTML = text;
  document2.body.appendChild(testElement);
  const etalonFontWidth = testElement.offsetWidth;
  testElement.style.fontFamily = "Roboto, RobotoFallback, Arial";
  const testedFontWidth = testElement.offsetWidth;
  testElement.parentNode.removeChild(testElement);
  return etalonFontWidth !== testedFontWidth;
}
function waitWebFont(text, fontWeight) {
  return new Promise((resolve) => {
    const clear = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve();
    };
    const intervalId = setInterval(() => {
      if (isWebFontLoaded(text, fontWeight)) {
        clear();
      }
    }, 15);
    const timeoutId = setTimeout(clear, 2e3);
  });
}
function autoInit() {
  init({
    _autoInit: true,
    _forceTimeout: true
  });
  if (renderer_default(DX_LINK_SELECTOR, context).length) {
    throw ui_errors_default.Error("E0022");
  }
}
if (hasWindow()) {
  autoInit();
} else {
  ready3(autoInit);
}
viewPortChanged.add(function(viewPort2, prevViewPort) {
  initDeferred.done(function() {
    detachCssClasses(prevViewPort);
    attachCssClasses(viewPort2);
  });
});
devices_default.changed.add(function() {
  init({
    _autoInit: true
  });
});

// node_modules/devextreme/esm/__internal/events/core/m_emitter.js
var Emitter = class_default.inherit({
  ctor(element) {
    this._$element = renderer_default(element);
    this._cancelCallback = callbacks_default();
    this._acceptCallback = callbacks_default();
  },
  getElement() {
    return this._$element;
  },
  validate: (e) => !isDxMouseWheelEvent(e),
  validatePointers: (e) => 1 === hasTouches(e),
  allowInterruptionByMouseWheel: () => true,
  configure(data2) {
    extend(this, data2);
  },
  addCancelCallback(callback) {
    this._cancelCallback.add(callback);
  },
  removeCancelCallback() {
    this._cancelCallback.empty();
  },
  _cancel(e) {
    this._cancelCallback.fire(this, e);
  },
  addAcceptCallback(callback) {
    this._acceptCallback.add(callback);
  },
  removeAcceptCallback() {
    this._acceptCallback.empty();
  },
  _accept(e) {
    this._acceptCallback.fire(this, e);
  },
  _requestAccept(e) {
    this._acceptRequestEvent = e;
  },
  _forgetAccept() {
    this._accept(this._acceptRequestEvent);
    this._acceptRequestEvent = null;
  },
  start: noop,
  move: noop,
  end: noop,
  cancel: noop,
  reset() {
    if (this._acceptRequestEvent) {
      this._accept(this._acceptRequestEvent);
    }
  },
  _fireEvent(eventName, e, params) {
    const eventData2 = extend({
      type: eventName,
      originalEvent: e,
      target: this._getEmitterTarget(e),
      delegateTarget: this.getElement().get(0)
    }, params);
    e = fireEvent(eventData2);
    if (e.cancel) {
      this._cancel(e);
    }
    return e;
  },
  _getEmitterTarget(e) {
    return (this.delegateSelector ? renderer_default(e.target).closest(this.delegateSelector) : this.getElement()).get(0);
  },
  dispose: noop
});
var m_emitter_default = Emitter;

// node_modules/devextreme/esm/__internal/events/core/m_wheel.js
var EVENT_NAME = "dxmousewheel";
var wheel = {
  setup(element) {
    const $element = renderer_default(element);
    m_events_engine_default.on($element, addNamespace2("wheel", "dxWheel"), wheel._wheelHandler.bind(wheel));
  },
  teardown(element) {
    m_events_engine_default.off(element, ".dxWheel");
  },
  _wheelHandler(e) {
    const {
      deltaMode,
      deltaY,
      deltaX,
      deltaZ
    } = e.originalEvent;
    fireEvent({
      type: EVENT_NAME,
      originalEvent: e,
      delta: this._normalizeDelta(deltaY, deltaMode),
      deltaX,
      deltaY,
      deltaZ,
      deltaMode,
      pointerType: "mouse"
    });
    e.stopPropagation();
  },
  _normalizeDelta(delta) {
    let deltaMode = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    if (0 === deltaMode) {
      return -delta;
    }
    return -30 * delta;
  }
};
m_event_registrator_default(EVENT_NAME, wheel);

// node_modules/devextreme/esm/__internal/events/pointer/m_base.js
var BaseStrategy = class_default.inherit({
  ctor(eventName, originalEvents) {
    this._eventName = eventName;
    this._originalEvents = addNamespace2(originalEvents, "dxPointerEvents");
    this._handlerCount = 0;
    this.noBubble = this._isNoBubble();
  },
  _isNoBubble() {
    const eventName = this._eventName;
    return "dxpointerenter" === eventName || "dxpointerleave" === eventName;
  },
  _handler(e) {
    const delegateTarget = this._getDelegateTarget(e);
    const event = {
      type: this._eventName,
      pointerType: e.pointerType || eventSource(e),
      originalEvent: e,
      delegateTarget,
      timeStamp: browser_default.mozilla ? (/* @__PURE__ */ new Date()).getTime() : e.timeStamp
    };
    const target = getEventTarget(e);
    event.target = target;
    return this._fireEvent(event);
  },
  _getDelegateTarget(e) {
    let delegateTarget;
    if (this.noBubble) {
      delegateTarget = e.delegateTarget;
    }
    return delegateTarget;
  },
  _fireEvent: (args) => fireEvent(args),
  _setSelector(handleObj) {
    this._selector = this.noBubble && handleObj ? handleObj.selector : null;
  },
  _getSelector() {
    return this._selector;
  },
  setup: () => true,
  add(element, handleObj) {
    if (this._handlerCount <= 0 || this.noBubble) {
      element = this.noBubble ? element : dom_adapter_default.getDocument();
      this._setSelector(handleObj);
      const that = this;
      m_events_engine_default.on(element, this._originalEvents, this._getSelector(), (e) => {
        that._handler(e);
      });
    }
    if (!this.noBubble) {
      this._handlerCount++;
    }
  },
  remove(handleObj) {
    this._setSelector(handleObj);
    if (!this.noBubble) {
      this._handlerCount--;
    }
  },
  teardown(element) {
    if (this._handlerCount && !this.noBubble) {
      return;
    }
    element = this.noBubble ? element : dom_adapter_default.getDocument();
    if (".dxPointerEvents" !== this._originalEvents) {
      m_events_engine_default.off(element, this._originalEvents, this._getSelector());
    }
  },
  dispose(element) {
    element = this.noBubble ? element : dom_adapter_default.getDocument();
    m_events_engine_default.off(element, this._originalEvents);
  }
});
var m_base_default = BaseStrategy;

// node_modules/devextreme/esm/__internal/events/pointer/m_observer.js
var addEventsListener = function(events, handler) {
  ready_callbacks_default.add(() => {
    events.split(" ").forEach((event) => {
      dom_adapter_default.listen(dom_adapter_default.getDocument(), event, handler, true);
    });
  });
};
var Observer = function(eventMap4, pointerEquals, onPointerAdding) {
  onPointerAdding = onPointerAdding || function() {
  };
  let pointers = [];
  const getPointerIndex = function(e) {
    let index2 = -1;
    each(pointers, (i, pointer2) => {
      if (!pointerEquals(e, pointer2)) {
        return true;
      }
      index2 = i;
      return false;
    });
    return index2;
  };
  const removePointer = function(e) {
    const index2 = getPointerIndex(e);
    if (index2 > -1) {
      pointers.splice(index2, 1);
    }
  };
  addEventsListener(eventMap4.dxpointerdown, function(e) {
    if (-1 === getPointerIndex(e)) {
      onPointerAdding(e);
      pointers.push(e);
    }
  });
  addEventsListener(eventMap4.dxpointermove, function(e) {
    pointers[getPointerIndex(e)] = e;
  });
  addEventsListener(eventMap4.dxpointerup, removePointer);
  addEventsListener(eventMap4.dxpointercancel, removePointer);
  this.pointers = function() {
    return pointers;
  };
  this.reset = function() {
    pointers = [];
  };
};
var m_observer_default = Observer;

// node_modules/devextreme/esm/__internal/events/pointer/m_mouse.js
var eventMap = {
  dxpointerdown: "mousedown",
  dxpointermove: "mousemove",
  dxpointerup: "mouseup",
  dxpointercancel: "pointercancel",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
if (browser_default.safari) {
  eventMap.dxpointercancel += " dragstart";
}
var normalizeMouseEvent = function(e) {
  e.pointerId = 1;
  return {
    pointers: observer.pointers(),
    pointerId: 1
  };
};
var observer;
var activated = false;
var activateStrategy = function() {
  if (activated) {
    return;
  }
  observer = new m_observer_default(eventMap, () => true);
  activated = true;
};
var MouseStrategy = m_base_default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy();
  },
  _fireEvent(args) {
    return this.callBase(extend(normalizeMouseEvent(args.originalEvent), args));
  }
});
MouseStrategy.map = eventMap;
MouseStrategy.normalize = normalizeMouseEvent;
MouseStrategy.activate = activateStrategy;
MouseStrategy.resetObserver = function() {
  observer.reset();
};
var m_mouse_default = MouseStrategy;

// node_modules/devextreme/esm/__internal/events/pointer/m_touch.js
var eventMap2 = {
  dxpointerdown: "touchstart",
  dxpointermove: "touchmove",
  dxpointerup: "touchend",
  dxpointercancel: "touchcancel",
  dxpointerover: "",
  dxpointerout: "",
  dxpointerenter: "",
  dxpointerleave: ""
};
var normalizeTouchEvent = function(e) {
  const pointers = [];
  each(e.touches, (_, touch2) => {
    pointers.push(extend({
      pointerId: touch2.identifier
    }, touch2));
  });
  return {
    pointers,
    pointerId: e.changedTouches[0].identifier
  };
};
var skipTouchWithSameIdentifier = function(pointerEvent) {
  return "ios" === m_devices_default.real().platform && ("dxpointerdown" === pointerEvent || "dxpointerup" === pointerEvent);
};
var TouchStrategy = m_base_default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    this._pointerId = 0;
  },
  _handler(e) {
    if (skipTouchWithSameIdentifier(this._eventName)) {
      const touch2 = e.changedTouches[0];
      if (this._pointerId === touch2.identifier && 0 !== this._pointerId) {
        return;
      }
      this._pointerId = touch2.identifier;
    }
    return this.callBase.apply(this, arguments);
  },
  _fireEvent(args) {
    return this.callBase(extend(normalizeTouchEvent(args.originalEvent), args));
  }
});
TouchStrategy.map = eventMap2;
TouchStrategy.normalize = normalizeTouchEvent;
var m_touch_default = TouchStrategy;

// node_modules/devextreme/esm/__internal/events/pointer/m_mouse_and_touch.js
var eventMap3 = {
  dxpointerdown: "touchstart mousedown",
  dxpointermove: "touchmove mousemove",
  dxpointerup: "touchend mouseup",
  dxpointercancel: "touchcancel",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
var activated2 = false;
var activateStrategy2 = function() {
  if (activated2) {
    return;
  }
  m_mouse_default.activate();
  activated2 = true;
};
var MouseAndTouchStrategy = m_base_default.inherit({
  EVENT_LOCK_TIMEOUT: 100,
  ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy2();
  },
  _handler(e) {
    const isMouse = isMouseEvent(e);
    if (!isMouse) {
      this._skipNextEvents = true;
    }
    if (isMouse && this._mouseLocked) {
      return;
    }
    if (isMouse && this._skipNextEvents) {
      this._skipNextEvents = false;
      this._mouseLocked = true;
      clearTimeout(this._unlockMouseTimer);
      const that = this;
      this._unlockMouseTimer = setTimeout(() => {
        that._mouseLocked = false;
      }, this.EVENT_LOCK_TIMEOUT);
      return;
    }
    return this.callBase(e);
  },
  _fireEvent(args) {
    const normalizer = isMouseEvent(args.originalEvent) ? m_mouse_default.normalize : m_touch_default.normalize;
    return this.callBase(extend(normalizer(args.originalEvent), args));
  },
  dispose() {
    this.callBase();
    this._skipNextEvents = false;
    this._mouseLocked = false;
    clearTimeout(this._unlockMouseTimer);
  }
});
MouseAndTouchStrategy.map = eventMap3;
MouseAndTouchStrategy.resetObserver = m_mouse_default.resetObserver;
var m_mouse_and_touch_default = MouseAndTouchStrategy;

// node_modules/devextreme/esm/__internal/events/m_pointer.js
var getStrategy = (support, _ref) => {
  let {
    tablet,
    phone
  } = _ref;
  const pointerEventStrategy = getStrategyFromGlobalConfig();
  if (pointerEventStrategy) {
    return pointerEventStrategy;
  }
  if (support.touch && !(tablet || phone)) {
    return m_mouse_and_touch_default;
  }
  if (support.touch) {
    return m_touch_default;
  }
  return m_mouse_default;
};
var EventStrategy = getStrategy(m_support_default, m_devices_default.real());
each(EventStrategy.map, (pointerEvent, originalEvents) => {
  m_event_registrator_default(pointerEvent, new EventStrategy(pointerEvent, originalEvents));
});
var pointer = {
  down: "dxpointerdown",
  up: "dxpointerup",
  move: "dxpointermove",
  cancel: "dxpointercancel",
  enter: "dxpointerenter",
  leave: "dxpointerleave",
  over: "dxpointerover",
  out: "dxpointerout"
};
function getStrategyFromGlobalConfig() {
  const eventStrategyName = config_default2().pointerEventStrategy;
  return {
    "mouse-and-touch": m_mouse_and_touch_default,
    touch: m_touch_default,
    mouse: m_mouse_default
  }[eventStrategyName];
}
var m_pointer_default = pointer;

// node_modules/devextreme/esm/__internal/events/core/m_emitter_registrator.js
var MANAGER_EVENT = "dxEventManager";
var EventManager = class_default.inherit({
  ctor() {
    this._attachHandlers();
    this.reset();
    this._proxiedCancelHandler = this._cancelHandler.bind(this);
    this._proxiedAcceptHandler = this._acceptHandler.bind(this);
  },
  _attachHandlers() {
    ready_callbacks_default.add(() => {
      const document2 = dom_adapter_default.getDocument();
      m_events_engine_default.subscribeGlobal(document2, addNamespace2(m_pointer_default.down, MANAGER_EVENT), this._pointerDownHandler.bind(this));
      m_events_engine_default.subscribeGlobal(document2, addNamespace2(m_pointer_default.move, MANAGER_EVENT), this._pointerMoveHandler.bind(this));
      m_events_engine_default.subscribeGlobal(document2, addNamespace2([m_pointer_default.up, m_pointer_default.cancel].join(" "), MANAGER_EVENT), this._pointerUpHandler.bind(this));
      m_events_engine_default.subscribeGlobal(document2, addNamespace2(EVENT_NAME, MANAGER_EVENT), this._mouseWheelHandler.bind(this));
    });
  },
  _eachEmitter(callback) {
    const activeEmitters = this._activeEmitters || [];
    let i = 0;
    while (activeEmitters.length > i) {
      const emitter = activeEmitters[i];
      if (false === callback(emitter)) {
        break;
      }
      if (activeEmitters[i] === emitter) {
        i++;
      }
    }
  },
  _applyToEmitters(method, arg) {
    this._eachEmitter((emitter) => {
      emitter[method].call(emitter, arg);
    });
  },
  reset() {
    this._eachEmitter(this._proxiedCancelHandler);
    this._activeEmitters = [];
  },
  resetEmitter(emitter) {
    this._proxiedCancelHandler(emitter);
  },
  _pointerDownHandler(e) {
    if (isMouseEvent(e) && e.which > 1) {
      return;
    }
    this._updateEmitters(e);
  },
  _updateEmitters(e) {
    if (!this._isSetChanged(e)) {
      return;
    }
    this._cleanEmitters(e);
    this._fetchEmitters(e);
  },
  _isSetChanged(e) {
    const currentSet = this._closestEmitter(e);
    const previousSet = this._emittersSet || [];
    let setChanged = currentSet.length !== previousSet.length;
    each(currentSet, (index2, emitter) => {
      setChanged = setChanged || previousSet[index2] !== emitter;
      return !setChanged;
    });
    this._emittersSet = currentSet;
    return setChanged;
  },
  _closestEmitter(e) {
    const that = this;
    const result = [];
    let $element = renderer_default(e.target);
    function handleEmitter(_, emitter) {
      if (!!emitter && emitter.validatePointers(e) && emitter.validate(e)) {
        emitter.addCancelCallback(that._proxiedCancelHandler);
        emitter.addAcceptCallback(that._proxiedAcceptHandler);
        result.push(emitter);
      }
    }
    while ($element.length) {
      const emitters = data($element.get(0), "dxEmitter") || [];
      each(emitters, handleEmitter);
      $element = $element.parent();
    }
    return result;
  },
  _acceptHandler(acceptedEmitter, e) {
    this._eachEmitter((emitter) => {
      if (emitter !== acceptedEmitter) {
        this._cancelEmitter(emitter, e);
      }
    });
  },
  _cancelHandler(canceledEmitter, e) {
    this._cancelEmitter(canceledEmitter, e);
  },
  _cancelEmitter(emitter, e) {
    const activeEmitters = this._activeEmitters;
    if (e) {
      emitter.cancel(e);
    } else {
      emitter.reset();
    }
    emitter.removeCancelCallback();
    emitter.removeAcceptCallback();
    const emitterIndex = activeEmitters.indexOf(emitter);
    if (emitterIndex > -1) {
      activeEmitters.splice(emitterIndex, 1);
    }
  },
  _cleanEmitters(e) {
    this._applyToEmitters("end", e);
    this.reset(e);
  },
  _fetchEmitters(e) {
    this._activeEmitters = this._emittersSet.slice();
    this._applyToEmitters("start", e);
  },
  _pointerMoveHandler(e) {
    this._applyToEmitters("move", e);
  },
  _pointerUpHandler(e) {
    this._updateEmitters(e);
  },
  _mouseWheelHandler(e) {
    if (!this._allowInterruptionByMouseWheel()) {
      return;
    }
    e.pointers = [null];
    this._pointerDownHandler(e);
    this._adjustWheelEvent(e);
    this._pointerMoveHandler(e);
    e.pointers = [];
    this._pointerUpHandler(e);
  },
  _allowInterruptionByMouseWheel() {
    let allowInterruption = true;
    this._eachEmitter((emitter) => {
      allowInterruption = emitter.allowInterruptionByMouseWheel() && allowInterruption;
      return allowInterruption;
    });
    return allowInterruption;
  },
  _adjustWheelEvent(e) {
    let closestGestureEmitter = null;
    this._eachEmitter((emitter) => {
      if (!emitter.gesture) {
        return;
      }
      const direction2 = emitter.getDirection(e);
      if ("horizontal" !== direction2 && !e.shiftKey || "vertical" !== direction2 && e.shiftKey) {
        closestGestureEmitter = emitter;
        return false;
      }
    });
    if (!closestGestureEmitter) {
      return;
    }
    const direction = closestGestureEmitter.getDirection(e);
    const verticalGestureDirection = "both" === direction && !e.shiftKey || "vertical" === direction;
    const prop = verticalGestureDirection ? "pageY" : "pageX";
    e[prop] += e.delta;
  },
  isActive(element) {
    let result = false;
    this._eachEmitter((emitter) => {
      result = result || emitter.getElement().is(element);
    });
    return result;
  }
});
var eventManager = new EventManager();
var registerEmitter = function(emitterConfig) {
  const EmitterClass = emitterConfig.emitter;
  const emitterName = emitterConfig.events[0];
  const emitterEvents = emitterConfig.events;
  each(emitterEvents, (_, eventName) => {
    m_event_registrator_default(eventName, {
      noBubble: !emitterConfig.bubble,
      setup(element) {
        const subscriptions = data(element, "dxEmitterSubscription") || {};
        const emitters = data(element, "dxEmitter") || {};
        const emitter = emitters[emitterName] || new EmitterClass(element);
        subscriptions[eventName] = true;
        emitters[emitterName] = emitter;
        data(element, "dxEmitter", emitters);
        data(element, "dxEmitterSubscription", subscriptions);
      },
      add(element, handleObj) {
        const emitters = data(element, "dxEmitter");
        const emitter = emitters[emitterName];
        emitter.configure(extend({
          delegateSelector: handleObj.selector
        }, handleObj.data), handleObj.type);
      },
      teardown(element) {
        const subscriptions = data(element, "dxEmitterSubscription");
        const emitters = data(element, "dxEmitter");
        const emitter = emitters[emitterName];
        delete subscriptions[eventName];
        let disposeEmitter = true;
        each(emitterEvents, (_2, eventName2) => {
          disposeEmitter = disposeEmitter && !subscriptions[eventName2];
          return disposeEmitter;
        });
        if (disposeEmitter) {
          if (eventManager.isActive(element)) {
            eventManager.resetEmitter(emitter);
          }
          emitter && emitter.dispose();
          delete emitters[emitterName];
        }
      }
    });
  });
};
var m_emitter_registrator_default = registerEmitter;

// node_modules/devextreme/esm/__internal/events/utils/m_event_nodes_disposing.js
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter((node) => !!node);
}
var subscribeNodesDisposing = (event, callback) => {
  m_events_engine_default.one(nodesByEvent(event), removeEvent, callback);
};
var unsubscribeNodesDisposing = (event, callback) => {
  m_events_engine_default.off(nodesByEvent(event), removeEvent, callback);
};

// node_modules/devextreme/esm/__internal/core/utils/m_dom.js
var window8 = getWindow();
var getRootNodeHost = (element) => {
  if (!element.getRootNode) {
    return;
  }
  const {
    host
  } = element.getRootNode();
  if (isString(host)) {
    return;
  }
  return host;
};
var resetActiveElement = () => {
  const activeElement = dom_adapter_default.getActiveElement();
  if (activeElement && activeElement !== dom_adapter_default.getBody()) {
    var _activeElement$blur;
    null === (_activeElement$blur = activeElement.blur) || void 0 === _activeElement$blur || _activeElement$blur.call(activeElement);
  }
};
var clearSelection = () => {
  const selection = window8.getSelection();
  if (!selection) {
    return;
  }
  if ("Caret" === selection.type) {
    return;
  }
  if (selection.empty) {
    selection.empty();
  } else if (selection.removeAllRanges) {
    try {
      selection.removeAllRanges();
    } catch (e) {
    }
  }
};
var closestCommonParent = (startTarget, endTarget) => {
  const $startTarget = renderer_default(startTarget);
  const $endTarget = renderer_default(endTarget);
  if ($startTarget[0] === $endTarget[0]) {
    return $startTarget[0];
  }
  const $startParents = $startTarget.parents();
  const $endParents = $endTarget.parents();
  const startingParent = Math.min($startParents.length, $endParents.length);
  for (let i = -startingParent; i < 0; i++) {
    if ($startParents.get(i) === $endParents.get(i)) {
      return $startParents.get(i);
    }
  }
};
var extractTemplateMarkup = (element) => {
  element = renderer_default(element);
  const templateTag = element.length && element.filter(function() {
    const $node = renderer_default(this);
    return $node.is("script[type]") && !$node.attr("type").includes("script");
  });
  if (templateTag.length) {
    return templateTag.eq(0).html();
  }
  element = renderer_default("<div>").append(element);
  return element.html();
};
var normalizeTemplateElement = (element) => {
  let $element = isDefined(element) && (element.nodeType || isRenderer(element)) ? renderer_default(element) : renderer_default("<div>").html(element).contents();
  if (1 === $element.length) {
    if ($element.is("script")) {
      $element = normalizeTemplateElement($element.html().trim());
    } else if ($element.is("table")) {
      $element = $element.children("tbody").contents();
    }
  }
  return $element;
};
var clipboardText = (event, text) => {
  const clipboard = event.originalEvent && event.originalEvent.clipboardData || window8.clipboardData;
  if (!text) {
    return clipboard && clipboard.getData("Text");
  }
  clipboard && clipboard.setData("Text", text);
};
var contains = (container, element) => {
  if (!element) {
    return false;
  }
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains(element) || contains(container, getRootNodeHost(element));
};
var createTextElementHiddenCopy = (element, text, options) => {
  const elementStyles = window8.getComputedStyle(renderer_default(element).get(0));
  const includePaddings = options && options.includePaddings;
  return renderer_default("<div>").text(text).css({
    fontStyle: elementStyles.fontStyle,
    fontVariant: elementStyles.fontVariant,
    fontWeight: elementStyles.fontWeight,
    fontSize: elementStyles.fontSize,
    fontFamily: elementStyles.fontFamily,
    letterSpacing: elementStyles.letterSpacing,
    border: elementStyles.border,
    paddingTop: includePaddings ? elementStyles.paddingTop : "",
    paddingRight: includePaddings ? elementStyles.paddingRight : "",
    paddingBottom: includePaddings ? elementStyles.paddingBottom : "",
    paddingLeft: includePaddings ? elementStyles.paddingLeft : "",
    visibility: "hidden",
    whiteSpace: "pre",
    position: "absolute",
    float: "left"
  });
};
var insertBefore = (element, newElement) => {
  if (newElement) {
    dom_adapter_default.insertElement(element.parentNode, newElement, element);
  }
  return element;
};
var replaceWith = (element, newElement) => {
  if (!(newElement && newElement[0])) {
    return;
  }
  if (newElement.is(element)) {
    return element;
  }
  each(newElement, (_, currentElement) => {
    insertBefore(element[0], currentElement);
  });
  element.remove();
  return newElement;
};
var isElementInDom = ($element) => {
  const element = null === $element || void 0 === $element ? void 0 : $element.get(0);
  const shadowHost = null === element || void 0 === element ? void 0 : element.getRootNode().host;
  return !!renderer_default(shadowHost || element).closest(getWindow().document).length;
};
var m_dom_default = {
  resetActiveElement,
  clearSelection,
  closestCommonParent,
  extractTemplateMarkup,
  normalizeTemplateElement,
  clipboardText,
  contains,
  createTextElementHiddenCopy,
  insertBefore,
  replaceWith,
  isElementInDom
};

// node_modules/devextreme/esm/__internal/events/m_click.js
var CLICK_EVENT_NAME = "dxclick";
var prevented = null;
var lastFiredEvent = null;
var onNodeRemove = () => {
  lastFiredEvent = null;
};
var clickHandler = function(e) {
  const {
    originalEvent
  } = e;
  const eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
  const leftButton = !e.which || 1 === e.which;
  if (leftButton && !prevented && !eventAlreadyFired) {
    if (originalEvent) {
      originalEvent.DXCLICK_FIRED = true;
    }
    unsubscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    lastFiredEvent = originalEvent;
    subscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    fireEvent({
      type: "dxclick",
      originalEvent: e
    });
  }
};
var ClickEmitter = m_emitter_default.inherit({
  ctor(element) {
    this.callBase(element);
    m_events_engine_default.on(this.getElement(), "click", clickHandler);
  },
  start() {
    prevented = null;
  },
  cancel() {
    prevented = true;
  },
  dispose() {
    m_events_engine_default.off(this.getElement(), "click", clickHandler);
  }
});
!function() {
  const desktopDevice = m_devices_default.real().generic;
  if (!desktopDevice) {
    let startTarget = null;
    let blurPrevented = false;
    const isInput = function(element) {
      return renderer_default(element).is("input, textarea, select, button ,:focus, :focus *");
    };
    const pointerDownHandler = function(e) {
      startTarget = e.target;
      blurPrevented = e.isDefaultPrevented();
    };
    const getTarget = function(e) {
      const target = getEventTarget(e);
      return renderer_default(target);
    };
    const clickHandler2 = function(e) {
      const $target = getTarget(e);
      if (!blurPrevented && startTarget && !$target.is(startTarget) && !renderer_default(startTarget).is("label") && isInput($target)) {
        m_dom_default.resetActiveElement();
      }
      startTarget = null;
      blurPrevented = false;
    };
    const NATIVE_CLICK_FIXER_NAMESPACE = "NATIVE_CLICK_FIXER";
    const document2 = dom_adapter_default.getDocument();
    m_events_engine_default.subscribeGlobal(document2, addNamespace2(m_pointer_default.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
    m_events_engine_default.subscribeGlobal(document2, addNamespace2("click", NATIVE_CLICK_FIXER_NAMESPACE), clickHandler2);
  }
}();
m_emitter_registrator_default({
  emitter: ClickEmitter,
  bubble: true,
  events: ["dxclick"]
});

// node_modules/devextreme/esm/__internal/events/core/m_emitter.feedback.js
var ACTIVE_EVENT_NAME = "dxactive";
var FeedbackEvent = class_default.inherit({
  ctor(timeout, fire) {
    this._timeout = timeout;
    this._fire = fire;
  },
  start() {
    const that = this;
    this._schedule(() => {
      that.force();
    });
  },
  _schedule(fn) {
    this.stop();
    this._timer = setTimeout(fn, this._timeout);
  },
  stop() {
    clearTimeout(this._timer);
  },
  force() {
    if (this._fired) {
      return;
    }
    this.stop();
    this._fire();
    this._fired = true;
  },
  fired() {
    return this._fired;
  }
});
var activeFeedback;
var FeedbackEmitter = m_emitter_default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    this._active = new FeedbackEvent(0, noop);
    this._inactive = new FeedbackEvent(0, noop);
  },
  configure(data2, eventName) {
    switch (eventName) {
      case "dxactive":
        data2.activeTimeout = data2.timeout;
        break;
      case "dxinactive":
        data2.inactiveTimeout = data2.timeout;
    }
    this.callBase(data2);
  },
  start(e) {
    if (activeFeedback) {
      const activeChildExists = contains(this.getElement().get(0), activeFeedback.getElement().get(0));
      const childJustActivated = !activeFeedback._active.fired();
      if (activeChildExists && childJustActivated) {
        this._cancel();
        return;
      }
      activeFeedback._inactive.force();
    }
    activeFeedback = this;
    this._initEvents(e);
    this._active.start();
  },
  _initEvents(e) {
    const that = this;
    const eventTarget = this._getEmitterTarget(e);
    const mouseEvent = isMouseEvent(e);
    const isSimulator = m_devices_default.isSimulator();
    const deferFeedback = isSimulator || !mouseEvent;
    const activeTimeout = ensureDefined(this.activeTimeout, 30);
    const inactiveTimeout = ensureDefined(this.inactiveTimeout, 400);
    this._active = new FeedbackEvent(deferFeedback ? activeTimeout : 0, () => {
      that._fireEvent("dxactive", e, {
        target: eventTarget
      });
    });
    this._inactive = new FeedbackEvent(deferFeedback ? inactiveTimeout : 0, () => {
      that._fireEvent("dxinactive", e, {
        target: eventTarget
      });
      activeFeedback = null;
    });
  },
  cancel(e) {
    this.end(e);
  },
  end(e) {
    const skipTimers = e.type !== m_pointer_default.up;
    if (skipTimers) {
      this._active.stop();
    } else {
      this._active.force();
    }
    this._inactive.start();
    if (skipTimers) {
      this._inactive.force();
    }
  },
  dispose() {
    this._active.stop();
    this._inactive.stop();
    if (activeFeedback === this) {
      activeFeedback = null;
    }
    this.callBase();
  },
  lockInactive() {
    this._active.force();
    this._inactive.stop();
    activeFeedback = null;
    this._cancel();
    return this._inactive.force.bind(this._inactive);
  }
});
FeedbackEmitter.lock = function(deferred) {
  const lockInactive = activeFeedback ? activeFeedback.lockInactive() : noop;
  deferred.done(lockInactive);
};
m_emitter_registrator_default({
  emitter: FeedbackEmitter,
  events: ["dxactive", "dxinactive"]
});
var {
  lock
} = FeedbackEmitter;

// node_modules/devextreme/esm/__internal/events/m_hover.js
var HOVERSTART = "dxhoverstart";
var POINTERENTER_NAMESPACED_EVENT_NAME = addNamespace2(m_pointer_default.enter, "dxHoverStart");
var HOVEREND = "dxhoverend";
var POINTERLEAVE_NAMESPACED_EVENT_NAME = addNamespace2(m_pointer_default.leave, "dxHoverEnd");
var Hover = class_default.inherit({
  noBubble: true,
  ctor() {
    this._handlerArrayKeyPath = `${this._eventNamespace}_HandlerStore`;
  },
  setup(element) {
    data(element, this._handlerArrayKeyPath, {});
  },
  add(element, handleObj) {
    const that = this;
    const handler = function(e) {
      that._handler(e);
    };
    m_events_engine_default.on(element, this._originalEventName, handleObj.selector, handler);
    data(element, this._handlerArrayKeyPath)[handleObj.guid] = handler;
  },
  _handler(e) {
    if (isTouchEvent(e) || m_devices_default.isSimulator()) {
      return;
    }
    fireEvent({
      type: this._eventName,
      originalEvent: e,
      delegateTarget: e.delegateTarget
    });
  },
  remove(element, handleObj) {
    const handler = data(element, this._handlerArrayKeyPath)[handleObj.guid];
    m_events_engine_default.off(element, this._originalEventName, handleObj.selector, handler);
  },
  teardown(element) {
    removeData(element, this._handlerArrayKeyPath);
  }
});
var HoverStart = Hover.inherit({
  ctor() {
    this._eventNamespace = "dxHoverStart";
    this._eventName = HOVERSTART;
    this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
    this.callBase();
  },
  _handler(e) {
    const pointers = e.pointers || [];
    if (!pointers.length) {
      this.callBase(e);
    }
  }
});
var HoverEnd = Hover.inherit({
  ctor() {
    this._eventNamespace = "dxHoverEnd";
    this._eventName = HOVEREND;
    this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
    this.callBase();
  }
});
m_event_registrator_default(HOVERSTART, new HoverStart());
m_event_registrator_default(HOVEREND, new HoverEnd());

// node_modules/devextreme/esm/__internal/events/core/m_keyboard_processor.js
var NAMESPACE = "KeyboardProcessor";
var createKeyDownOptions = (e) => ({
  keyName: normalizeKeyName(e),
  key: e.key,
  code: e.code,
  ctrl: e.ctrlKey,
  location: e.location,
  metaKey: e.metaKey,
  shift: e.shiftKey,
  alt: e.altKey,
  which: e.which,
  originalEvent: e
});
var KeyboardProcessor = class_default.inherit({
  _keydown: addNamespace2("keydown", NAMESPACE),
  _compositionStart: addNamespace2("compositionstart", NAMESPACE),
  _compositionEnd: addNamespace2("compositionend", NAMESPACE),
  ctor(options) {
    options = options || {};
    if (options.element) {
      this._element = renderer_default(options.element);
    }
    if (options.focusTarget) {
      this._focusTarget = options.focusTarget;
    }
    this._handler = options.handler;
    if (this._element) {
      this._processFunction = (e) => {
        const focusTargets = renderer_default(this._focusTarget).toArray();
        const isNotFocusTarget = this._focusTarget && this._focusTarget !== e.target && !focusTargets.includes(e.target);
        const shouldSkipProcessing = this._isComposingJustFinished && 229 === e.which || this._isComposing || isNotFocusTarget;
        this._isComposingJustFinished = false;
        if (!shouldSkipProcessing) {
          this.process(e);
        }
      };
      this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
      m_events_engine_default.on(this._element, this._keydown, this._processFunction);
      m_events_engine_default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
      m_events_engine_default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
  },
  dispose() {
    if (this._element) {
      m_events_engine_default.off(this._element, this._keydown, this._processFunction);
      m_events_engine_default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
      m_events_engine_default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
    this._element = void 0;
    this._handler = void 0;
  },
  process(e) {
    this._handler(createKeyDownOptions(e));
  },
  toggleProcessing(_ref) {
    let {
      type: type2
    } = _ref;
    this._isComposing = "compositionstart" === type2;
    this._isComposingJustFinished = !this._isComposing;
  }
});
KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
var m_keyboard_processor_default = KeyboardProcessor;

// node_modules/devextreme/esm/__internal/events/m_short.js
function addNamespace3(event, namespace) {
  return namespace ? addNamespace2(event, namespace) : event;
}
function executeAction(action, args) {
  return "function" === typeof action ? action(args) : action.execute(args);
}
var active = {
  on: ($el, active2, inactive, opts) => {
    const {
      selector,
      showTimeout,
      hideTimeout,
      namespace
    } = opts;
    m_events_engine_default.on($el, addNamespace3("dxactive", namespace), selector, {
      timeout: showTimeout
    }, (event) => executeAction(active2, {
      event,
      element: event.currentTarget
    }));
    m_events_engine_default.on($el, addNamespace3("dxinactive", namespace), selector, {
      timeout: hideTimeout
    }, (event) => executeAction(inactive, {
      event,
      element: event.currentTarget
    }));
  },
  off: ($el, _ref) => {
    let {
      namespace,
      selector
    } = _ref;
    m_events_engine_default.off($el, addNamespace3("dxactive", namespace), selector);
    m_events_engine_default.off($el, addNamespace3("dxinactive", namespace), selector);
  }
};
var resize = {
  on: function($el, resize2) {
    let {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    m_events_engine_default.on($el, addNamespace3("dxresize", namespace), resize2);
  },
  off: function($el) {
    let {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    m_events_engine_default.off($el, addNamespace3("dxresize", namespace));
  }
};
var hover = {
  on: ($el, start, end, _ref2) => {
    let {
      selector,
      namespace
    } = _ref2;
    m_events_engine_default.on($el, addNamespace3("dxhoverend", namespace), selector, (event) => end(event));
    m_events_engine_default.on($el, addNamespace3("dxhoverstart", namespace), selector, (event) => executeAction(start, {
      element: event.target,
      event
    }));
  },
  off: ($el, _ref3) => {
    let {
      selector,
      namespace
    } = _ref3;
    m_events_engine_default.off($el, addNamespace3("dxhoverstart", namespace), selector);
    m_events_engine_default.off($el, addNamespace3("dxhoverend", namespace), selector);
  }
};
var visibility = {
  on: ($el, shown, hiding, _ref4) => {
    let {
      namespace
    } = _ref4;
    m_events_engine_default.on($el, addNamespace3("dxhiding", namespace), hiding);
    m_events_engine_default.on($el, addNamespace3("dxshown", namespace), shown);
  },
  off: ($el, _ref5) => {
    let {
      namespace
    } = _ref5;
    m_events_engine_default.off($el, addNamespace3("dxhiding", namespace));
    m_events_engine_default.off($el, addNamespace3("dxshown", namespace));
  }
};
var focus = {
  on: ($el, focusIn, focusOut, _ref6) => {
    let {
      namespace
    } = _ref6;
    m_events_engine_default.on($el, addNamespace3("focusin", namespace), focusIn);
    m_events_engine_default.on($el, addNamespace3("focusout", namespace), focusOut);
  },
  off: ($el, _ref7) => {
    let {
      namespace
    } = _ref7;
    m_events_engine_default.off($el, addNamespace3("focusin", namespace));
    m_events_engine_default.off($el, addNamespace3("focusout", namespace));
  },
  trigger: ($el) => m_events_engine_default.trigger($el, "focus")
};
var dxClick = {
  on: function($el, click2) {
    let {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    m_events_engine_default.on($el, addNamespace3("dxclick", namespace), click2);
  },
  off: function($el) {
    let {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    m_events_engine_default.off($el, addNamespace3("dxclick", namespace));
  }
};
var click = {
  on: function($el, click2) {
    let {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    m_events_engine_default.on($el, addNamespace3("click", namespace), click2);
  },
  off: function($el) {
    let {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    m_events_engine_default.off($el, addNamespace3("click", namespace));
  }
};
var index = 0;
var keyboardProcessors = {};
var generateListenerId = () => "keyboardProcessorId" + index++;
var keyboard = {
  on: (element, focusTarget, handler) => {
    const listenerId = generateListenerId();
    keyboardProcessors[listenerId] = new m_keyboard_processor_default({
      element,
      focusTarget,
      handler
    });
    return listenerId;
  },
  off: (listenerId) => {
    if (listenerId && keyboardProcessors[listenerId]) {
      keyboardProcessors[listenerId].dispose();
      delete keyboardProcessors[listenerId];
    }
  },
  _getProcessor: (listenerId) => keyboardProcessors[listenerId]
};

// node_modules/devextreme/esm/__internal/core/utils/m_version.js
function compare(x, y, maxLevel) {
  function normalizeArg(value2) {
    if ("string" === typeof value2) {
      return value2.split(".");
    }
    if ("number" === typeof value2) {
      return [value2];
    }
    return value2;
  }
  x = normalizeArg(x);
  y = normalizeArg(y);
  let length = Math.max(x.length, y.length);
  if (isFinite(maxLevel)) {
    length = Math.min(length, maxLevel);
  }
  for (let i = 0; i < length; i++) {
    const xItem = parseInt(x[i] || 0, 10);
    const yItem = parseInt(y[i] || 0, 10);
    if (xItem < yItem) {
      return -1;
    }
    if (xItem > yItem) {
      return 1;
    }
  }
  return 0;
}

// node_modules/devextreme/esm/__internal/utils/version.js
var assertedVersions = [];
function stringifyVersion(version) {
  const {
    major,
    minor,
    patch
  } = version;
  return [major, minor, patch].join(".");
}
function parseVersion(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return {
    major,
    minor,
    patch
  };
}
function stringifyVersionList(assertedVersionList) {
  return assertedVersionList.map((assertedVersion) => `${assertedVersion.packageName}: ${assertedVersion.version}`).join("\n");
}
function versionsEqual(versionA, versionB) {
  return versionA.major === versionB.major && versionA.minor === versionB.minor && versionA.patch === versionB.patch;
}
function getPreviousMajorVersion(_ref) {
  let {
    major,
    minor,
    patch
  } = _ref;
  const previousMajorVersion = 1 === minor ? {
    major: major - 1,
    minor: 2,
    patch
  } : {
    major,
    minor: minor - 1,
    patch
  };
  return previousMajorVersion;
}
function assertedVersionsCompatible(currentVersion) {
  const mismatchingVersions = assertedVersions.filter((assertedVersion) => !versionsEqual(parseVersion(assertedVersion.version), currentVersion));
  if (mismatchingVersions.length) {
    errors_default.log("W0023", stringifyVersionList([{
      packageName: "devextreme",
      version: stringifyVersion(currentVersion)
    }, ...mismatchingVersions]));
    return false;
  }
  return true;
}

// node_modules/devextreme/esm/__internal/core/license/byte_utils.js
function base64ToBytes(base64) {
  return new Uint8Array(atob(base64).split("").map((s) => s.charCodeAt(0)));
}
function hexToBytes(string) {
  var _string$match;
  return new Uint8Array((null === (_string$match = string.match(/.{1,2}/g)) || void 0 === _string$match ? void 0 : _string$match.map((byte) => parseInt(byte, 16))) ?? []);
}
function stringToBytes(string) {
  const bytes = new Uint8Array(string.length);
  for (let k = 0; k < string.length; k += 1) {
    bytes[k] = 255 & string.charCodeAt(k);
  }
  return bytes;
}
function wordsToBytes(words) {
  const bytes = new Uint8Array(4 * words.length);
  for (let k = 0; k < bytes.length; k += 1) {
    bytes[k] = words[k >> 2] >>> 8 * (3 - k % 4);
  }
  return bytes;
}
function bytesToWords(bytes) {
  const words = new Uint32Array(1 + (bytes.length - 1 >> 2));
  for (let k = 0; k < bytes.length; k += 1) {
    words[k >> 2] |= bytes[k] << 8 * (3 - k % 4);
  }
  return words;
}
function leftRotate(x, n) {
  return (x << n | x >>> 32 - n) >>> 0;
}
function concatBytes(a, b) {
  const result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
}

// node_modules/devextreme/esm/__internal/core/license/key.js
var PUBLIC_KEY = {
  e: 65537,
  n: new Uint8Array([200, 219, 153, 203, 140, 7, 228, 253, 193, 243, 62, 137, 139, 60, 68, 242, 48, 142, 113, 88, 185, 235, 253, 105, 80, 74, 32, 170, 96, 74, 111, 250, 7, 205, 154, 3, 146, 115, 153, 53, 45, 132, 123, 56, 61, 208, 184, 201, 63, 24, 109, 223, 0, 179, 169, 102, 139, 224, 73, 233, 45, 173, 138, 66, 98, 88, 69, 76, 177, 111, 113, 218, 192, 33, 101, 152, 25, 134, 34, 173, 32, 82, 230, 44, 247, 200, 253, 170, 192, 246, 30, 12, 96, 205, 100, 249, 181, 93, 0, 231])
};
var INTERNAL_USAGE_ID = "Q3aoqHsRD3vXeUMPdXH7q5";

// node_modules/devextreme/esm/__internal/core/license/pkcs1.js
var ASN1_SHA1 = "3021300906052b0e03021a05000414";
function pad(hash) {
  const dataLength = (8 * PUBLIC_KEY.n.length + 6) / 8;
  const data2 = concatBytes(hexToBytes(ASN1_SHA1), hash);
  if (data2.length + 10 > dataLength) {
    throw Error("Key is too short for SHA1 signing algorithm");
  }
  const padding = new Uint8Array(dataLength - data2.length);
  padding.fill(255, 0, padding.length - 1);
  padding[0] = 0;
  padding[1] = 1;
  padding[padding.length - 1] = 0;
  return concatBytes(padding, data2);
}

// node_modules/devextreme/esm/__internal/core/license/rsa_bigint.js
function compareSignatures(args) {
  try {
    const zero = BigInt(0);
    const one = BigInt(1);
    const eight = BigInt(8);
    const modExp = (base2, exponent2, modulus2) => {
      let result = one;
      let b = base2;
      let e = exponent2;
      while (e) {
        if (e & one) {
          result = result * b % modulus2;
        }
        b = b * b % modulus2;
        e >>= one;
      }
      return result;
    };
    const bigIntFromBytes = (bytes) => bytes.reduce((acc, cur) => (acc << eight) + BigInt(cur), zero);
    const actual = bigIntFromBytes(args.actual);
    const signature = bigIntFromBytes(args.signature);
    const exponent = BigInt(args.key.e);
    const modulus = bigIntFromBytes(args.key.n);
    const expected = modExp(signature, exponent, modulus);
    return expected === actual;
  } catch {
    return true;
  }
}

// node_modules/devextreme/esm/__internal/core/license/sha1.js
function preprocess(text) {
  const bytes = new Uint8Array(text.length + 1);
  bytes.set(stringToBytes(text));
  bytes[bytes.length - 1] = 128;
  const words = bytesToWords(new Uint8Array(bytes));
  const result = new Uint32Array(16 * Math.ceil((words.length + 2) / 16));
  result.set(words, 0);
  result[result.length - 1] = 8 * (bytes.length - 1);
  return result;
}
function sha1(text) {
  const message = preprocess(text);
  const h = new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
  for (let i = 0; i < message.length; i += 16) {
    const w = new Uint32Array(80);
    for (let j = 0; j < 16; j += 1) {
      w[j] = message[i + j];
    }
    for (let j = 16; j < 80; j += 1) {
      const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
      w[j] = n << 1 | n >>> 31;
    }
    let a = h[0];
    let b = h[1];
    let c = h[2];
    let d = h[3];
    let e = h[4];
    for (let j = 0; j < 80; j += 1) {
      const [f, k] = j < 20 ? [b & c | ~b & d, 1518500249] : j < 40 ? [b ^ c ^ d, 1859775393] : j < 60 ? [b & c | b & d | c & d, 2400959708] : [b ^ c ^ d, 3395469782];
      const temp = leftRotate(a, 5) + f + e + k + w[j];
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = temp;
    }
    h[0] += a;
    h[1] += b;
    h[2] += c;
    h[3] += d;
    h[4] += e;
  }
  return wordsToBytes(h);
}

// node_modules/devextreme/esm/__internal/core/license/trial_panel.client.js
var isClient = () => "undefined" !== typeof HTMLElement && "undefined" !== typeof customElements;
var SafeHTMLElement = isClient() ? HTMLElement : class {
};
var componentNames2 = {
  trigger: "dx-license-trigger",
  panel: "dx-license"
};
var attributeNames = {
  buyNow: "buy-now",
  licensingDoc: "licensing-doc",
  version: "version"
};
var commonStyles = {
  opacity: "1",
  visibility: "visible",
  "clip-path": "none",
  filter: "none"
};
var contentStyles = _extends({}, commonStyles, {
  width: "100%",
  height: "auto",
  "line-height": "normal",
  display: "block",
  "z-index": "1500",
  position: "static",
  transform: "translate(0px, 0px)",
  "background-color": "#FF7200",
  border: "none",
  margin: "auto",
  "box-sizing": "border-box",
  "text-align": "center"
});
var containerStyles = _extends({}, contentStyles, {
  display: "flex",
  "align-items": "center",
  "flex-direction": "row",
  position: "relative",
  top: "0px",
  left: "0px",
  padding: "0.5rem"
});
var buttonStyles = {
  width: "1rem",
  cursor: "pointer",
  height: "1rem"
};
var textStyles = _extends({}, commonStyles, {
  display: "inline",
  position: "static",
  padding: "0px",
  margin: "0px",
  color: "white",
  "font-family": "'Segoe UI','Open Sans Condensed',-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,Cantarell,Ubuntu,roboto,noto,arial,sans-serif",
  "font-size": "0.875rem",
  "font-wight": "600"
});
function createImportantStyles(defaultStyles, customStyles) {
  const styles = customStyles ? _extends({}, defaultStyles, customStyles) : defaultStyles;
  return Object.keys(styles).reduce((cssString, currentKey) => `${cssString}${[currentKey, `${styles[currentKey]} !important;`].join(": ")}`, "");
}
var DxLicense = class _DxLicense extends SafeHTMLElement {
  constructor() {
    var _DxLicense$customStyl, _DxLicense$customStyl2, _DxLicense$customStyl3, _DxLicense$customStyl4, _DxLicense$customStyl5;
    super();
    this._observer = null;
    this._inReassign = false;
    this._hidden = false;
    this._spanStyles = createImportantStyles(textStyles, null === (_DxLicense$customStyl = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl ? void 0 : _DxLicense$customStyl.textStyles);
    this._linkStyles = createImportantStyles(textStyles, null === (_DxLicense$customStyl2 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl2 ? void 0 : _DxLicense$customStyl2.linkStyles);
    this._containerStyles = createImportantStyles(containerStyles, null === (_DxLicense$customStyl3 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl3 ? void 0 : _DxLicense$customStyl3.containerStyles);
    this._contentStyles = createImportantStyles(contentStyles, null === (_DxLicense$customStyl4 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl4 ? void 0 : _DxLicense$customStyl4.contentStyles);
    this._buttonStyles = createImportantStyles(buttonStyles, null === (_DxLicense$customStyl5 = _DxLicense.customStyles) || void 0 === _DxLicense$customStyl5 ? void 0 : _DxLicense$customStyl5.contentStyles);
  }
  _createSpan(text) {
    const span = document.createElement("span");
    span.innerText = text;
    span.style.cssText = this._spanStyles;
    return span;
  }
  _createLink(text, href) {
    const link = document.createElement("a");
    link.innerText = text;
    link.style.cssText = this._linkStyles;
    link.href = href;
    link.target = "_blank";
    return link;
  }
  _createButton() {
    const button = document.createElement("div");
    button.style.cssText = this._buttonStyles;
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    polygon.setAttribute("points", "13.4 12.7 8.7 8 13.4 3.4 12.6 2.6 8 7.3 3.4 2.6 2.6 3.4 7.3 8 2.6 12.6 3.4 13.4 8 8.7 12.7 13.4 13.4 12.7");
    polygon.style.cssText = createImportantStyles({
      fill: "#fff",
      opacity: ".5",
      "stroke-width": "0px"
    });
    svg.setAttribute("id", "Layer_1");
    svg.setAttribute("data-name", "Layer 1");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.style.cssText = createImportantStyles({
      "vertical-align": "baseline"
    });
    svg.appendChild(polygon);
    button.appendChild(svg);
    button.onclick = () => {
      this._hidden = true;
      this.style.cssText = createImportantStyles({
        display: "none"
      });
    };
    return button;
  }
  _createContentContainer() {
    const contentContainer = document.createElement("div");
    contentContainer.style.cssText = this._contentStyles;
    contentContainer.append(this._createSpan("For evaluation purposes only. Redistribution prohibited. Please "), this._createLink("register", this.getAttribute(attributeNames.licensingDoc)), this._createSpan(" an existing license or "), this._createLink("purchase a new license", this.getAttribute(attributeNames.buyNow)), this._createSpan(` to continue use of DevExpress product libraries (v${this.getAttribute(attributeNames.version)}).`));
    return contentContainer;
  }
  _reassignComponent() {
    this.innerHTML = "";
    this.style.cssText = this._containerStyles;
    this.append(this._createContentContainer(), this._createButton());
  }
  connectedCallback() {
    this._reassignComponent();
    if (!this._observer) {
      this._observer = new MutationObserver(() => {
        if (this._hidden) {
          var _this$_observer;
          null === (_this$_observer = this._observer) || void 0 === _this$_observer || _this$_observer.disconnect();
          return;
        }
        if (this._inReassign) {
          this._inReassign = false;
        } else {
          this._inReassign = true;
          this._reassignComponent();
        }
      });
      this._observer.observe(this, {
        childList: true,
        attributes: true,
        subtree: true
      });
    }
  }
  disconnectedCallback() {
    setTimeout(() => {
      const licensePanel = document.getElementsByTagName(componentNames2.panel);
      if (!licensePanel.length) {
        document.body.prepend(this);
      }
    }, 100);
  }
};
DxLicense.customStyles = void 0;
var DxLicenseTrigger = class extends SafeHTMLElement {
  connectedCallback() {
    this.style.cssText = createImportantStyles({
      display: "none"
    });
    const licensePanel = document.getElementsByTagName(componentNames2.panel);
    if (!licensePanel.length) {
      const license = document.createElement(componentNames2.panel);
      license.setAttribute(attributeNames.version, this.getAttribute(attributeNames.version));
      license.setAttribute(attributeNames.buyNow, this.getAttribute(attributeNames.buyNow));
      license.setAttribute(attributeNames.licensingDoc, this.getAttribute(attributeNames.licensingDoc));
      license.setAttribute("data-permanent", "true");
      document.body.prepend(license);
    }
  }
};
function registerCustomComponents(customStyles) {
  if (!customElements.get(componentNames2.trigger)) {
    DxLicense.customStyles = customStyles;
    customElements.define(componentNames2.trigger, DxLicenseTrigger);
    customElements.define(componentNames2.panel, DxLicense);
  }
}
function renderTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles) {
  registerCustomComponents(customStyles);
  const trialPanelTrigger = document.createElement(componentNames2.trigger);
  trialPanelTrigger.setAttribute(attributeNames.buyNow, buyNowUrl);
  trialPanelTrigger.setAttribute(attributeNames.licensingDoc, licensingDocUrl);
  trialPanelTrigger.setAttribute(attributeNames.version, version);
  document.body.appendChild(trialPanelTrigger);
}

// node_modules/devextreme/esm/__internal/core/license/trial_panel.js
function showTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles) {
  if (isClient()) {
    renderTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles);
  }
}

// node_modules/devextreme/esm/__internal/core/license/types.js
var TokenKind;
!function(TokenKind2) {
  TokenKind2.corrupted = "corrupted";
  TokenKind2.verified = "verified";
  TokenKind2.internal = "internal";
}(TokenKind || (TokenKind = {}));

// node_modules/devextreme/esm/__internal/core/license/license_validation.js
var _excluded2 = ["customerId", "maxVersionAllowed", "format", "internalUsageId"];
var BUY_NOW_LINK = "https://go.devexpress.com/Licensing_Installer_Watermark_DevExtremeJQuery.aspx";
var LICENSING_DOC_LINK = "https://go.devexpress.com/Licensing_Documentation_DevExtremeJQuery.aspx";
var GENERAL_ERROR = {
  kind: TokenKind.corrupted,
  error: "general"
};
var VERIFICATION_ERROR = {
  kind: TokenKind.corrupted,
  error: "verification"
};
var DECODING_ERROR = {
  kind: TokenKind.corrupted,
  error: "decoding"
};
var DESERIALIZATION_ERROR = {
  kind: TokenKind.corrupted,
  error: "deserialization"
};
var PAYLOAD_ERROR = {
  kind: TokenKind.corrupted,
  error: "payload"
};
var VERSION_ERROR = {
  kind: TokenKind.corrupted,
  error: "version"
};
var validationPerformed = false;
function verifySignature(_ref) {
  let {
    text,
    signature: encodedSignature
  } = _ref;
  return compareSignatures({
    key: PUBLIC_KEY,
    signature: base64ToBytes(encodedSignature),
    actual: pad(sha1(text))
  });
}
function parseLicenseKey(encodedKey) {
  if (void 0 === encodedKey) {
    return GENERAL_ERROR;
  }
  const parts = encodedKey.split(".");
  if (2 !== parts.length || 0 === parts[0].length || 0 === parts[1].length) {
    return GENERAL_ERROR;
  }
  if (!verifySignature({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  let decodedPayload = "";
  try {
    decodedPayload = atob(parts[0]);
  } catch {
    return DECODING_ERROR;
  }
  let payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch {
    return DESERIALIZATION_ERROR;
  }
  const {
    customerId,
    maxVersionAllowed,
    format: format2,
    internalUsageId
  } = payload, rest = _objectWithoutPropertiesLoose(payload, _excluded2);
  if (void 0 !== internalUsageId) {
    return {
      kind: TokenKind.internal,
      internalUsageId
    };
  }
  if (void 0 === customerId || void 0 === maxVersionAllowed || void 0 === format2) {
    return PAYLOAD_ERROR;
  }
  if (1 !== format2) {
    return VERSION_ERROR;
  }
  return {
    kind: TokenKind.verified,
    payload: _extends({
      customerId,
      maxVersionAllowed
    }, rest)
  };
}
function isPreview(patch) {
  return isNaN(patch) || patch < 3;
}
function getLicenseCheckParams(_ref2) {
  let {
    licenseKey,
    version
  } = _ref2;
  let preview = false;
  try {
    preview = isPreview(version.patch);
    const {
      major,
      minor
    } = preview ? getPreviousMajorVersion(version) : version;
    if (!licenseKey) {
      return {
        preview,
        error: "W0019"
      };
    }
    const license = parseLicenseKey(licenseKey);
    if (license.kind === TokenKind.corrupted) {
      return {
        preview,
        error: "W0021"
      };
    }
    if (license.kind === TokenKind.internal) {
      return {
        preview,
        internal: true,
        error: license.internalUsageId === INTERNAL_USAGE_ID ? void 0 : "W0020"
      };
    }
    if (!(major && minor)) {
      return {
        preview,
        error: "W0021"
      };
    }
    if (10 * major + minor > license.payload.maxVersionAllowed) {
      return {
        preview,
        error: "W0020"
      };
    }
    return {
      preview,
      error: void 0
    };
  } catch {
    return {
      preview,
      error: "W0021"
    };
  }
}
function validateLicense(licenseKey) {
  let versionStr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : fullVersion;
  if (validationPerformed) {
    return;
  }
  validationPerformed = true;
  const version = parseVersion(versionStr);
  const versionsCompatible = assertedVersionsCompatible(version);
  const {
    internal,
    error
  } = getLicenseCheckParams({
    licenseKey,
    version
  });
  if (!versionsCompatible && internal) {
    return;
  }
  if (error && !internal) {
    const buyNowLink = config_default2().buyNowLink ?? BUY_NOW_LINK;
    const licensingDocLink = config_default2().licensingDocLink ?? LICENSING_DOC_LINK;
    showTrialPanel(buyNowLink, licensingDocLink, fullVersion);
  }
  const preview = isPreview(version.patch);
  if (error) {
    errors_default.log(preview ? "W0022" : error);
    return;
  }
  if (preview && !internal) {
    errors_default.log("W0022");
  }
}
function peekValidationPerformed() {
  return validationPerformed;
}
var license_validation_default = {
  validateLicense
};

// node_modules/devextreme/esm/__internal/events/m_visibility_change.js
var triggerVisibilityChangeEvent = function(eventName) {
  return function(element) {
    const $element = renderer_default(element || "body");
    const changeHandlers = $element.filter(".dx-visibility-change-handler").add($element.find(".dx-visibility-change-handler"));
    for (let i = 0; i < changeHandlers.length; i++) {
      m_events_engine_default.triggerHandler(changeHandlers[i], eventName);
    }
  };
};
var triggerShownEvent = triggerVisibilityChangeEvent("dxshown");
var triggerHidingEvent = triggerVisibilityChangeEvent("dxhiding");
var triggerResizeEvent = triggerVisibilityChangeEvent("dxresize");
var m_visibility_change_default = {
  triggerHidingEvent,
  triggerResizeEvent,
  triggerShownEvent
};

// node_modules/devextreme/esm/common/core/events/visibility_change.js
var triggerShownEvent2 = m_visibility_change_default.triggerShownEvent;
var triggerHidingEvent2 = m_visibility_change_default.triggerHidingEvent;
var triggerResizeEvent2 = m_visibility_change_default.triggerResizeEvent;

// node_modules/devextreme/esm/__internal/core/templates/m_template_base.js
var renderedCallbacks = callbacks_default({
  syncStrategy: true
});
var TemplateBase = class {
  render(options) {
    options = options || {};
    const {
      onRendered
    } = options;
    delete options.onRendered;
    let $result;
    if (options.renovated && options.transclude && this._element) {
      $result = renderer_default("<div>").append(this._element).contents();
    } else {
      $result = this._renderCore(options);
    }
    this._ensureResultInContainer($result, options.container);
    renderedCallbacks.fire($result, options.container);
    onRendered && onRendered();
    return $result;
  }
  _ensureResultInContainer($result, container) {
    if (!container) {
      return;
    }
    const $container = renderer_default(container);
    const resultInContainer = contains($container.get(0), $result.get(0));
    $container.append($result);
    if (resultInContainer) {
      return;
    }
    const resultInBody = contains(dom_adapter_default.getBody(), $container.get(0));
    if (!resultInBody) {
      return;
    }
    triggerShownEvent2($result);
  }
  _renderCore() {
    throw errors_default.Error("E0001");
  }
};

// node_modules/devextreme/esm/__internal/core/templates/m_empty_template.js
var EmptyTemplate = class extends TemplateBase {
  _renderCore() {
    return renderer_default();
  }
};

// node_modules/devextreme/esm/__internal/core/templates/m_function_template.js
var FunctionTemplate = class extends TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  _renderCore(options) {
    return normalizeTemplateElement(this._render(options));
  }
};

// node_modules/devextreme/esm/__internal/core/templates/m_child_default_template.js
var ChildDefaultTemplate = class extends TemplateBase {
  constructor(name) {
    super();
    this.name = name;
  }
};

// node_modules/devextreme/esm/__internal/core/templates/m_template.js
registerTemplateEngine("default", {
  compile: (element) => normalizeTemplateElement(element),
  render: (template, model, index2) => template.clone()
});
setTemplateEngine("default");
var Template = class extends TemplateBase {
  constructor(element) {
    super();
    this._element = element;
  }
  _renderCore(options) {
    const {
      transclude
    } = options;
    if (!transclude && !this._compiledTemplate) {
      this._compiledTemplate = getCurrentTemplateEngine().compile(this._element);
    }
    return renderer_default("<div>").append(transclude ? this._element : getCurrentTemplateEngine().render(this._compiledTemplate, options.model, options.index)).contents();
  }
  source() {
    return renderer_default(this._element).clone();
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_array.js
function createOccurrenceMap(array) {
  return array.reduce((map2, value2) => {
    const count = (map2.get(value2) ?? 0) + 1;
    map2.set(value2, count);
    return map2;
  }, /* @__PURE__ */ new Map());
}
var wrapToArray = function(item) {
  return Array.isArray(item) ? item : [item];
};
var getUniqueValues = function(values) {
  return [...new Set(values)];
};
var getIntersection = function(firstArray, secondArray) {
  const toRemoveMap = createOccurrenceMap(secondArray);
  return firstArray.filter((value2) => {
    const occurrencesCount = toRemoveMap.get(value2);
    occurrencesCount && toRemoveMap.set(value2, occurrencesCount - 1);
    return occurrencesCount;
  });
};
var removeDuplicates = function() {
  let from = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
  let toRemove = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
  const toRemoveMap = createOccurrenceMap(toRemove);
  return from.filter((value2) => {
    const occurrencesCount = toRemoveMap.get(value2);
    occurrencesCount && toRemoveMap.set(value2, occurrencesCount - 1);
    return !occurrencesCount;
  });
};
var normalizeIndexes = function(items, indexPropName, currentItem, needIndexCallback) {
  const indexedItems = {};
  const {
    useLegacyVisibleIndex
  } = config_default2();
  let currentIndex = 0;
  const shouldUpdateIndex = (item) => !isDefined(item[indexPropName]) && (!needIndexCallback || needIndexCallback(item));
  items.forEach((item) => {
    const index2 = item[indexPropName];
    if (index2 >= 0) {
      indexedItems[index2] = indexedItems[index2] || [];
      if (item === currentItem) {
        indexedItems[index2].unshift(item);
      } else {
        indexedItems[index2].push(item);
      }
    } else {
      item[indexPropName] = void 0;
    }
  });
  if (!useLegacyVisibleIndex) {
    items.forEach((item) => {
      if (shouldUpdateIndex(item)) {
        while (indexedItems[currentIndex]) {
          currentIndex++;
        }
        indexedItems[currentIndex] = [item];
        currentIndex++;
      }
    });
  }
  currentIndex = 0;
  orderEach(indexedItems, function(index2, items2) {
    items2.forEach((item) => {
      if (index2 >= 0) {
        item[indexPropName] = currentIndex++;
      }
    });
  });
  if (useLegacyVisibleIndex) {
    items.forEach((item) => {
      if (shouldUpdateIndex(item)) {
        item[indexPropName] = currentIndex++;
      }
    });
  }
};
var groupBy = (array, getGroupName) => array.reduce((groupedResult, item) => {
  const groupName = getGroupName(item);
  groupedResult[groupName] = groupedResult[groupName] ?? [];
  groupedResult[groupName].push(item);
  return groupedResult;
}, {});

// node_modules/devextreme/esm/__internal/core/utils/m_template_manager.js
var findTemplates = (element, name) => {
  const templates = renderer_default(element).contents().filter(`[data-options*="${name}"]`);
  return [].slice.call(templates).map((element2) => {
    const optionsString = renderer_default(element2).attr("data-options") || "";
    return {
      element: element2,
      options: config_default2().optionsParser(optionsString)[name]
    };
  }).filter((template) => !!template.options);
};
var suitableTemplatesByName = (rawTemplates) => {
  const templatesMap = groupBy(rawTemplates, (template) => template.options.name);
  if (templatesMap.undefined) {
    throw errors_default.Error("E0023");
  }
  const result = {};
  Object.keys(templatesMap).forEach((name) => {
    var _findBestMatches$;
    const suitableTemplate = null === (_findBestMatches$ = findBestMatches(devices_default.current(), templatesMap[name], (template) => template.options)[0]) || void 0 === _findBestMatches$ ? void 0 : _findBestMatches$.element;
    if (suitableTemplate) {
      result[name] = suitableTemplate;
    }
  });
  return result;
};
var addOneRenderedCall = (template) => {
  const render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      const templateResult = render(options);
      options && options.onRendered && options.onRendered();
      return templateResult;
    }
  });
};
var addPublicElementNormalization = (template) => {
  const render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      const $container = renderer_default(options.container);
      return render(_extends({}, options, {
        container: getPublicElement($container)
      }));
    }
  });
};
var getNormalizedTemplateArgs = (options) => {
  const args = [];
  if ("model" in options) {
    args.push(options.model);
  }
  if ("index" in options) {
    args.push(options.index);
  }
  args.push(options.container);
  return args;
};
var validateTemplateSource = (templateSource) => "string" === typeof templateSource ? m_dom_default.normalizeTemplateElement(templateSource) : templateSource;
var templateKey = (templateSource) => m_type_default.isRenderer(templateSource) && templateSource[0] || templateSource;
var defaultCreateElement = (element) => new Template(element);
var acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
  let integrationTemplate = null;
  if (!skipTemplates || -1 === skipTemplates.indexOf(templateSource)) {
    integrationTemplate = templates[templateSource];
    if (integrationTemplate && !(integrationTemplate instanceof TemplateBase)) {
      if (m_type_default.isFunction(integrationTemplate.render)) {
        integrationTemplate = addPublicElementNormalization(integrationTemplate);
      }
      if (!isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
    }
  }
  return integrationTemplate;
};
var acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
  if (null == templateSource) {
    return new EmptyTemplate();
  }
  if (templateSource instanceof ChildDefaultTemplate) {
    return defaultTemplates[templateSource.name];
  }
  if (templateSource instanceof TemplateBase) {
    return templateSource;
  }
  if (m_type_default.isFunction(templateSource.render) && !m_type_default.isRenderer(templateSource)) {
    return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource);
  }
  if (templateSource.nodeType || m_type_default.isRenderer(templateSource)) {
    return createTemplate(renderer_default(templateSource));
  }
  return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource);
};

// node_modules/devextreme/esm/__internal/core/m_template_manager.js
var DX_POLYMORPH_WIDGET_TEMPLATE = new FunctionTemplate((_ref) => {
  let {
    model,
    parent
  } = _ref;
  const widgetName = model.widget;
  if (!widgetName) {
    return renderer_default();
  }
  const widgetElement = renderer_default("<div>");
  const widgetOptions = model.options || {};
  if (parent) {
    parent._createComponent(widgetElement, widgetName, widgetOptions);
  } else {
    widgetElement[widgetName](widgetOptions);
  }
  return widgetElement;
});
var TemplateManager = class {
  constructor(createElement, anonymousTemplateName) {
    this._tempTemplates = [];
    this._defaultTemplates = {};
    this._anonymousTemplateName = anonymousTemplateName || "template";
    this._createElement = createElement || defaultCreateElement;
    this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
  }
  static createDefaultOptions() {
    return {
      integrationOptions: {
        watchMethod: function(fn, callback) {
          let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          if (!options.skipImmediate) {
            callback(fn());
          }
          return noop;
        },
        templates: {
          "dx-polymorph-widget": DX_POLYMORPH_WIDGET_TEMPLATE
        },
        useDeferUpdateForTemplates: true
      }
    };
  }
  get anonymousTemplateName() {
    return this._anonymousTemplateName;
  }
  addDefaultTemplates(templates) {
    this._defaultTemplates = extend({}, this._defaultTemplates, templates);
  }
  dispose() {
    this._tempTemplates.forEach((tempTemplate) => {
      tempTemplate.template.dispose && tempTemplate.template.dispose();
    });
    this._tempTemplates = [];
  }
  extractTemplates($el) {
    const templates = this._extractTemplates($el);
    const anonymousTemplateMeta = this._extractAnonymousTemplate($el);
    return {
      templates,
      anonymousTemplateMeta
    };
  }
  _extractTemplates($el) {
    const templates = findTemplates($el, "dxTemplate");
    const suitableTemplates = suitableTemplatesByName(templates);
    templates.forEach((_ref2) => {
      let {
        element,
        options: {
          name
        }
      } = _ref2;
      if (element === suitableTemplates[name]) {
        renderer_default(element).addClass("dx-template-wrapper").detach();
      } else {
        renderer_default(element).remove();
      }
    });
    return Object.keys(suitableTemplates).map((name) => ({
      name,
      template: this._createTemplate(suitableTemplates[name])
    }));
  }
  _extractAnonymousTemplate($el) {
    const $anonymousTemplate = $el.contents().detach();
    const $notJunkTemplateContent = $anonymousTemplate.filter((_, element) => {
      const isTextNode = 3 === element.nodeType;
      const isEmptyText = renderer_default(element).text().trim().length < 1;
      return !(isTextNode && isEmptyText);
    });
    return $notJunkTemplateContent.length > 0 ? {
      template: this._createTemplate($anonymousTemplate),
      name: this._anonymousTemplateName
    } : {};
  }
  _createTemplateIfNeeded(templateSource) {
    const cachedTemplate = this._tempTemplates.filter((tempTemplate) => tempTemplate.source === templateKey(templateSource))[0];
    if (cachedTemplate) {
      return cachedTemplate.template;
    }
    const template = this._createTemplate(templateSource);
    this._tempTemplates.push({
      template,
      source: templateKey(templateSource)
    });
    return template;
  }
  _createTemplate(templateSource) {
    return this._createElement(validateTemplateSource(templateSource));
  }
  getTemplate(templateSource, templates, _ref3, context2) {
    let {
      isAsyncTemplate,
      skipTemplates
    } = _ref3;
    if (!isFunction(templateSource)) {
      return acquireTemplate(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
    }
    return new FunctionTemplate((options) => {
      const templateSourceResult = templateSource.apply(context2, getNormalizedTemplateArgs(options));
      if (!isDefined(templateSourceResult)) {
        return new EmptyTemplate();
      }
      let dispose2 = false;
      const template = acquireTemplate(templateSourceResult, (templateSource2) => {
        if (templateSource2.nodeType || isRenderer(templateSource2) && !renderer_default(templateSource2).is("script")) {
          return new FunctionTemplate(() => templateSource2);
        }
        dispose2 = true;
        return this._createTemplate(templateSource2);
      }, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      const result = template.render(options);
      dispose2 && template.dispose && template.dispose();
      return result;
    });
  }
};
var m_template_manager_default = {
  TemplateManager
};

// node_modules/devextreme/esm/__internal/core/widget/dom_component.js
var DOMComponent = class _DOMComponent extends Component {
  static getInstance(element) {
    return getInstanceByElement(renderer_default(element), this);
  }
  static defaultOptions(rule) {
    this._classCustomRules = Object.hasOwnProperty.bind(this)("_classCustomRules") && this._classCustomRules ? this._classCustomRules : [];
    this._classCustomRules.push(rule);
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      width: void 0,
      height: void 0,
      rtlEnabled: config_default2().rtlEnabled,
      elementAttr: {},
      disabled: false,
      integrationOptions: {}
    }, this._useTemplates() ? m_template_manager_default.TemplateManager.createDefaultOptions() : {});
  }
  ctor(element, options) {
    this._customClass = null;
    this._createElement(element);
    attachInstanceToElement(this._$element, this, this._dispose);
    super.ctor(options);
    const validationAlreadyPerformed = peekValidationPerformed();
    license_validation_default.validateLicense(config_default2().licenseKey);
    if (!validationAlreadyPerformed && peekValidationPerformed()) {
      config_default2({
        licenseKey: ""
      });
    }
    uiLayerInitialized.resolve();
  }
  _createElement(element) {
    this._$element = renderer_default(element);
  }
  _getSynchronizableOptionsForCreateComponent() {
    return ["rtlEnabled", "disabled", "templatesRenderAsynchronously"];
  }
  _checkFunctionValueDeprecation(optionNames) {
    if (!this.option("_ignoreFunctionValueDeprecation")) {
      optionNames.forEach((optionName) => {
        if (isFunction(this.option(optionName))) {
          errors_default.log("W0017", optionName);
        }
      });
    }
  }
  _visibilityChanged(value2) {
  }
  _dimensionChanged() {
  }
  _init() {
    super._init();
    this._checkFunctionValueDeprecation(["width", "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "popupHeight", "popupWidth"]);
    this._attachWindowResizeCallback();
    this._initTemplateManager();
  }
  _setOptionsByDevice(instanceCustomRules) {
    super._setOptionsByDevice([].concat(this.constructor._classCustomRules || [], instanceCustomRules || []));
  }
  _isInitialOptionValue(name) {
    const isCustomOption = this.constructor._classCustomRules && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
    return !isCustomOption && super._isInitialOptionValue(name);
  }
  _attachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      const windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
      resize_callbacks_default.add(windowResizeCallBack);
    }
  }
  _isDimensionChangeSupported() {
    return this._dimensionChanged !== _DOMComponent.prototype._dimensionChanged;
  }
  _renderComponent() {
    addShadowDomStyles(this.$element());
    this._initMarkup();
    hasWindow() && this._render();
  }
  _initMarkup() {
    const {
      rtlEnabled
    } = this.option() || {};
    this._renderElementAttributes();
    this._toggleRTLDirection(rtlEnabled);
    this._renderVisibilityChange();
    this._renderDimensions();
  }
  _render() {
    this._attachVisibilityChangeHandlers();
  }
  _renderElementAttributes() {
    const {
      elementAttr
    } = this.option() || {};
    const attributes = extend({}, elementAttr);
    const classNames = attributes.class;
    delete attributes.class;
    this.$element().attr(attributes).removeClass(this._customClass).addClass(classNames);
    this._customClass = classNames;
  }
  _renderVisibilityChange() {
    if (this._isDimensionChangeSupported()) {
      this._attachDimensionChangeHandlers();
    }
    if (this._isVisibilityChangeSupported()) {
      const $element = this.$element();
      $element.addClass("dx-visibility-change-handler");
    }
  }
  _renderDimensions() {
    const $element = this.$element();
    const element = $element.get(0);
    const width = this._getOptionValue("width", element);
    const height = this._getOptionValue("height", element);
    if (this._isCssUpdateRequired(element, height, width)) {
      $element.css({
        width: null === width ? "" : width,
        height: null === height ? "" : height
      });
    }
  }
  _isCssUpdateRequired(element, height, width) {
    return !!(isDefined(width) || isDefined(height) || element.style.width || element.style.height);
  }
  _attachDimensionChangeHandlers() {
    const $el = this.$element();
    const namespace = `${this.NAME}VisibilityChange`;
    resize.off($el, {
      namespace
    });
    resize.on($el, () => this._dimensionChanged(), {
      namespace
    });
  }
  _attachVisibilityChangeHandlers() {
    if (this._isVisibilityChangeSupported()) {
      const $el = this.$element();
      const namespace = `${this.NAME}VisibilityChange`;
      this._isHidden = !this._isVisible();
      visibility.off($el, {
        namespace
      });
      visibility.on($el, () => this._checkVisibilityChanged("shown"), () => this._checkVisibilityChanged("hiding"), {
        namespace
      });
    }
  }
  _isVisible() {
    const $element = this.$element();
    return $element.is(":visible");
  }
  _checkVisibilityChanged(action) {
    const isVisible = this._isVisible();
    if (isVisible) {
      if ("hiding" === action && !this._isHidden) {
        this._visibilityChanged(false);
        this._isHidden = true;
      } else if ("shown" === action && this._isHidden) {
        this._isHidden = false;
        this._visibilityChanged(true);
      }
    }
  }
  _isVisibilityChangeSupported() {
    return this._visibilityChanged !== _DOMComponent.prototype._visibilityChanged && hasWindow();
  }
  _clean() {
  }
  _modelByElement(element) {
    const {
      modelByElement
    } = this.option();
    const $element = this.$element();
    return modelByElement ? modelByElement($element) : void 0;
  }
  _invalidate() {
    if (this._isUpdateAllowed()) {
      throw errors_default.Error("E0007");
    }
    this._requireRefresh = true;
  }
  _refresh() {
    this._clean();
    this._renderComponent();
  }
  _dispose() {
    this._templateManager && this._templateManager.dispose();
    super._dispose();
    this._clean();
    this._detachWindowResizeCallback();
  }
  _detachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      resize_callbacks_default.remove(this._windowResizeCallBack);
    }
  }
  _toggleRTLDirection(rtl) {
    const $element = this.$element();
    $element.toggleClass("dx-rtl", rtl);
  }
  _createComponent(element, component, componentConfiguration) {
    const configuration = componentConfiguration ?? {};
    const synchronizableOptions = grep(this._getSynchronizableOptionsForCreateComponent(), (value2) => !(value2 in configuration));
    const {
      integrationOptions
    } = this.option();
    let {
      nestedComponentOptions
    } = this.option();
    nestedComponentOptions = nestedComponentOptions ?? noop;
    const nestedComponentConfig = extend({
      integrationOptions
    }, nestedComponentOptions(this));
    synchronizableOptions.forEach((optionName) => nestedComponentConfig[optionName] = this.option(optionName));
    this._extendConfig(configuration, nestedComponentConfig);
    let instance;
    if (isString(component)) {
      const $element = renderer_default(element)[component](configuration);
      instance = $element[component]("instance");
    } else if (element) {
      instance = component.getInstance(element);
      if (instance) {
        instance.option(configuration);
      } else {
        instance = new component(element, configuration);
      }
    }
    if (instance) {
      const optionChangedHandler = (_ref) => {
        let {
          name,
          value: value2
        } = _ref;
        if (synchronizableOptions.includes(name)) {
          instance.option(name, value2);
        }
      };
      this.on("optionChanged", optionChangedHandler);
      instance.on("disposing", () => this.off("optionChanged", optionChangedHandler));
    }
    return instance;
  }
  _extendConfig(configuration, extendConfig) {
    each(extendConfig, (key, value2) => {
      !Object.prototype.hasOwnProperty.call(configuration, key) && (configuration[key] = value2);
    });
  }
  _defaultActionConfig() {
    const $element = this.$element();
    const context2 = this._modelByElement($element);
    return extend(super._defaultActionConfig(), {
      context: context2
    });
  }
  _defaultActionArgs() {
    const $element = this.$element();
    const model = this._modelByElement($element);
    const element = this.element();
    return extend(super._defaultActionArgs(), {
      element,
      model
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "width":
      case "height":
        this._renderDimensions();
        break;
      case "rtlEnabled":
        this._invalidate();
        break;
      case "elementAttr":
        this._renderElementAttributes();
        break;
      case "disabled":
      case "integrationOptions":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _removeAttributes(element) {
    const attrs = element.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i];
      if (attr) {
        const {
          name
        } = attr;
        if (!name.indexOf("aria-") || -1 !== name.indexOf("dx-") || "role" === name || "style" === name || "tabindex" === name) {
          element.removeAttribute(name);
        }
      }
    }
  }
  _removeClasses(element) {
    element.className = element.className.split(" ").filter((cssClass) => 0 !== cssClass.lastIndexOf("dx-", 0)).join(" ");
  }
  _updateDOMComponent(renderRequired) {
    if (renderRequired) {
      this._renderComponent();
    } else if (this._requireRefresh) {
      this._requireRefresh = false;
      this._refresh();
    }
  }
  endUpdate() {
    const renderRequired = this._isInitializingRequired();
    super.endUpdate();
    this._isUpdateAllowed() && this._updateDOMComponent(renderRequired);
  }
  $element() {
    return this._$element;
  }
  element() {
    const $element = this.$element();
    return getPublicElement($element);
  }
  dispose() {
    const element = this.$element().get(0);
    cleanDataRecursive(element, true);
    element.textContent = "";
    this._removeAttributes(element);
    this._removeClasses(element);
  }
  resetOption(optionName) {
    super.resetOption(optionName);
    if ("width" === optionName || "height" === optionName) {
      const initialOption = this.initialOption(optionName);
      !isDefined(initialOption) && this.$element().css(optionName, "");
    }
  }
  _getAnonymousTemplateName() {
    return;
  }
  _initTemplateManager() {
    if (this._templateManager || !this._useTemplates()) {
      return;
    }
    const {
      integrationOptions = {}
    } = this.option();
    const {
      createTemplate
    } = integrationOptions;
    this._templateManager = new m_template_manager_default.TemplateManager(createTemplate, this._getAnonymousTemplateName());
    this._initTemplates();
    return;
  }
  _initTemplates() {
    const {
      templates,
      anonymousTemplateMeta
    } = this._templateManager.extractTemplates(this.$element());
    const anonymousTemplate = this.option(`integrationOptions.templates.${anonymousTemplateMeta.name}`);
    templates.forEach((_ref2) => {
      let {
        name,
        template
      } = _ref2;
      this._options.silent(`integrationOptions.templates.${name}`, template);
    });
    if (anonymousTemplateMeta.name && !anonymousTemplate) {
      this._options.silent(`integrationOptions.templates.${anonymousTemplateMeta.name}`, anonymousTemplateMeta.template);
      this._options.silent("_hasAnonymousTemplateContent", true);
    }
  }
  _getTemplateByOption(optionName) {
    return this._getTemplate(this.option(optionName));
  }
  _getTemplate(templateSource) {
    const templates = this.option("integrationOptions.templates");
    const isAsyncTemplate = this.option("templatesRenderAsynchronously");
    const skipTemplates = this.option("integrationOptions.skipTemplates");
    return this._templateManager.getTemplate(templateSource, templates, {
      isAsyncTemplate,
      skipTemplates
    }, this);
  }
  _saveTemplate(name, template) {
    this._setOptionWithoutOptionChange(`integrationOptions.templates.${name}`, this._templateManager._createTemplate(template));
  }
  _useTemplates() {
    return true;
  }
};
var dom_component_default = DOMComponent;

// node_modules/devextreme/esm/__internal/core/widget/widget.js
var FOCUSED_STATE_CLASS = "dx-state-focused";
function setAttribute(name, value2, target) {
  name = "role" === name || "id" === name ? name : `aria-${name}`;
  value2 = isDefined(value2) ? value2.toString() : null;
  target.attr(name, value2);
}
var Widget = class _Widget extends dom_component_default {
  constructor() {
    super(...arguments);
    this._feedbackHideTimeout = 400;
    this._feedbackShowTimeout = 30;
  }
  static getOptionsFromContainer(_ref) {
    let {
      name,
      fullName,
      value: value2
    } = _ref;
    let options = {};
    if (name === fullName) {
      options = value2;
    } else {
      const option = fullName.split(".").pop();
      options[option] = value2;
    }
    return options;
  }
  _supportedKeys() {
    return {};
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      hoveredElement: null,
      isActive: false,
      disabled: false,
      visible: true,
      hint: void 0,
      activeStateEnabled: false,
      onContentReady: null,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      tabIndex: 0,
      accessKey: void 0,
      onFocusIn: null,
      onFocusOut: null,
      onKeyboardHandled: null,
      ignoreParentReadOnly: false,
      useResizeObserver: true
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        const device = devices_default.real();
        const {
          platform
        } = device;
        const {
          version
        } = device;
        return "ios" === platform && compare(version, "13.3") <= 0;
      },
      options: {
        useResizeObserver: false
      }
    }]);
  }
  _init() {
    super._init();
    this._initContentReadyAction();
  }
  _innerWidgetOptionChanged(innerWidget, args) {
    const options = _Widget.getOptionsFromContainer(args);
    innerWidget && innerWidget.option(options);
    this._options.cache(args.name, options);
  }
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    const syncOptions = () => this._options.silent(optionsContainer, extend({}, innerWidget.option()));
    syncOptions();
    innerWidget.on("optionChanged", syncOptions);
  }
  _getAriaTarget() {
    return this._focusTarget();
  }
  _initContentReadyAction() {
    this._contentReadyAction = this._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _initMarkup() {
    const {
      disabled,
      visible: visible2
    } = this.option();
    this.$element().addClass("dx-widget");
    this._toggleDisabledState(disabled);
    this._toggleVisibility(visible2);
    this._renderHint();
    this._isFocusable() && this._renderFocusTarget();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._renderContent();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
    this._toggleIndependentState();
  }
  _renderHint() {
    const {
      hint
    } = this.option();
    this.$element().attr("title", hint || null);
  }
  _renderContent() {
    deferRender(() => !this._disposed ? this._renderContentImpl() : void 0).done(() => !this._disposed ? this._fireContentReadyAction() : void 0);
  }
  _renderContentImpl() {
  }
  _fireContentReadyAction() {
    return deferRender(() => {
      var _this$_contentReadyAc;
      return null === (_this$_contentReadyAc = this._contentReadyAction) || void 0 === _this$_contentReadyAc ? void 0 : _this$_contentReadyAc.call(this);
    });
  }
  _dispose() {
    this._contentReadyAction = null;
    this._detachKeyboardEvents();
    super._dispose();
  }
  _resetActiveState() {
    this._toggleActiveState(this._eventBindingTarget(), false);
  }
  _clean() {
    this._cleanFocusState();
    this._resetActiveState();
    super._clean();
    this.$element().empty();
  }
  _toggleVisibility(visible2) {
    this.$element().toggleClass("dx-state-invisible", !visible2);
  }
  _renderFocusState() {
    this._attachKeyboardEvents();
    if (this._isFocusable()) {
      this._renderFocusTarget();
      this._attachFocusEvents();
      this._renderAccessKey();
    }
  }
  _renderAccessKey() {
    const $el = this._focusTarget();
    const {
      accessKey
    } = this.option();
    $el.attr("accesskey", accessKey);
  }
  _isFocusable() {
    const {
      focusStateEnabled,
      disabled
    } = this.option();
    return focusStateEnabled && !disabled;
  }
  _eventBindingTarget() {
    return this.$element();
  }
  _focusTarget() {
    return this._getActiveElement();
  }
  _isFocusTarget(element) {
    const focusTargets = renderer_default(this._focusTarget()).toArray();
    return focusTargets.includes(element);
  }
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit).not(".dx-state-disabled");
  }
  _getActiveElement() {
    const activeElement = this._eventBindingTarget();
    if (this._activeStateUnit) {
      return this._findActiveTarget(activeElement);
    }
    return activeElement;
  }
  _renderFocusTarget() {
    const {
      tabIndex
    } = this.option();
    this._focusTarget().attr("tabIndex", tabIndex);
  }
  _keyboardEventBindingTarget() {
    return this._eventBindingTarget();
  }
  _refreshFocusEvent() {
    this._detachFocusEvents();
    this._attachFocusEvents();
  }
  _focusEventTarget() {
    return this._focusTarget();
  }
  _focusInHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption("onFocusIn", {
        beforeExecute: () => this._updateFocusState(event, true),
        excludeValidators: ["readOnly"]
      })({
        event
      });
    }
  }
  _focusOutHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption("onFocusOut", {
        beforeExecute: () => this._updateFocusState(event, false),
        excludeValidators: ["readOnly", "disabled"]
      })({
        event
      });
    }
  }
  _updateFocusState(_ref2, isFocused) {
    let {
      target
    } = _ref2;
    if (this._isFocusTarget(target)) {
      this._toggleFocusClass(isFocused, renderer_default(target));
    }
  }
  _toggleFocusClass(isFocused, $element) {
    const $focusTarget = $element && $element.length ? $element : this._focusTarget();
    $focusTarget.toggleClass("dx-state-focused", isFocused);
  }
  _hasFocusClass(element) {
    const $focusTarget = renderer_default(element ?? this._focusTarget());
    return $focusTarget.hasClass("dx-state-focused");
  }
  _isFocused() {
    return this._hasFocusClass();
  }
  _getKeyboardListeners() {
    return [];
  }
  _attachKeyboardEvents() {
    this._detachKeyboardEvents();
    const {
      focusStateEnabled,
      onKeyboardHandled
    } = this.option();
    const hasChildListeners = this._getKeyboardListeners().length;
    const hasKeyboardEventHandler = !!onKeyboardHandled;
    const shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
    if (shouldAttach) {
      this._keyboardListenerId = keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), (opts) => this._keyboardHandler(opts));
    }
  }
  _keyboardHandler(options, onlyChildProcessing) {
    if (!onlyChildProcessing) {
      const {
        originalEvent,
        keyName,
        which
      } = options;
      const keys = this._supportedKeys(originalEvent);
      const func = keys[keyName] || keys[which];
      if (void 0 !== func) {
        const handler = func.bind(this);
        const result = handler(originalEvent, options);
        if (!result) {
          return false;
        }
      }
    }
    const keyboardListeners = this._getKeyboardListeners();
    const {
      onKeyboardHandled
    } = this.option();
    keyboardListeners.forEach((listener) => listener && listener._keyboardHandler(options));
    onKeyboardHandled && onKeyboardHandled(options);
    return true;
  }
  _refreshFocusState() {
    this._cleanFocusState();
    this._renderFocusState();
  }
  _cleanFocusState() {
    const $element = this._focusTarget();
    $element.removeAttr("tabIndex");
    this._toggleFocusClass(false);
    this._detachFocusEvents();
    this._detachKeyboardEvents();
  }
  _detachKeyboardEvents() {
    keyboard.off(this._keyboardListenerId);
    this._keyboardListenerId = null;
  }
  _attachHoverEvents() {
    const {
      hoverStateEnabled
    } = this.option();
    const selector = this._activeStateUnit;
    const $el = this._eventBindingTarget();
    hover.off($el, {
      selector,
      namespace: "UIFeedback"
    });
    if (hoverStateEnabled) {
      hover.on($el, new action_default((_ref3) => {
        let {
          event,
          element
        } = _ref3;
        this._hoverStartHandler(event);
        this.option("hoveredElement", renderer_default(element));
      }, {
        excludeValidators: ["readOnly"]
      }), (event) => {
        this.option("hoveredElement", null);
        this._hoverEndHandler(event);
      }, {
        selector,
        namespace: "UIFeedback"
      });
    }
  }
  _attachFeedbackEvents() {
    const {
      activeStateEnabled
    } = this.option();
    const selector = this._activeStateUnit;
    const $el = this._eventBindingTarget();
    active.off($el, {
      namespace: "UIFeedback",
      selector
    });
    if (activeStateEnabled) {
      active.on($el, new action_default((_ref4) => {
        let {
          event,
          element
        } = _ref4;
        return this._toggleActiveState(renderer_default(element), true, event);
      }), new action_default((_ref5) => {
        let {
          event,
          element
        } = _ref5;
        return this._toggleActiveState(renderer_default(element), false, event);
      }, {
        excludeValidators: ["disabled", "readOnly"]
      }), {
        showTimeout: this._feedbackShowTimeout,
        hideTimeout: this._feedbackHideTimeout,
        selector,
        namespace: "UIFeedback"
      });
    }
  }
  _detachFocusEvents() {
    const $el = this._focusEventTarget();
    focus.off($el, {
      namespace: `${this.NAME}Focus`
    });
  }
  _attachFocusEvents() {
    const $el = this._focusEventTarget();
    focus.on($el, (e) => this._focusInHandler(e), (e) => this._focusOutHandler(e), {
      namespace: `${this.NAME}Focus`,
      isFocusable: (index2, el) => renderer_default(el).is(focusable)
    });
  }
  _hoverStartHandler(event) {
  }
  _hoverEndHandler(event) {
  }
  _toggleActiveState($element, value2, event) {
    this.option("isActive", value2);
    $element.toggleClass("dx-state-active", value2);
  }
  _updatedHover() {
    const hoveredElement = this._options.silent("hoveredElement");
    this._hover(hoveredElement, hoveredElement);
  }
  _findHoverTarget($el) {
    return $el && $el.closest(this._activeStateUnit || this._eventBindingTarget());
  }
  _hover($el, $previous) {
    const {
      hoverStateEnabled,
      disabled,
      isActive
    } = this.option();
    $previous = this._findHoverTarget($previous);
    $previous && $previous.toggleClass("dx-state-hover", false);
    if ($el && hoverStateEnabled && !disabled && !isActive) {
      const newHoveredElement = this._findHoverTarget($el);
      newHoveredElement && newHoveredElement.toggleClass("dx-state-hover", true);
    }
  }
  _toggleDisabledState(value2) {
    this.$element().toggleClass("dx-state-disabled", Boolean(value2));
    this.setAria("disabled", value2 || void 0);
  }
  _toggleIndependentState() {
    const {
      ignoreParentReadOnly
    } = this.option();
    this.$element().toggleClass("dx-state-independent", ignoreParentReadOnly);
  }
  _setWidgetOption(widgetName, args) {
    if (!this[widgetName]) {
      return;
    }
    if (isPlainObject(args[0])) {
      each(args[0], (option, value3) => this._setWidgetOption(widgetName, [option, value3]));
      return;
    }
    const optionName = args[0];
    let value2 = args[1];
    if (1 === args.length) {
      value2 = this.option(optionName);
    }
    const widgetOptionMap = this[`${widgetName}OptionMap`];
    this[widgetName].option(widgetOptionMap ? widgetOptionMap(optionName) : optionName, value2);
  }
  _optionChanged(args) {
    const {
      name,
      value: value2,
      previousValue
    } = args;
    switch (name) {
      case "disabled":
        this._toggleDisabledState(value2);
        this._updatedHover();
        this._refreshFocusState();
        break;
      case "hint":
        this._renderHint();
        break;
      case "ignoreParentReadOnly":
        this._toggleIndependentState();
        break;
      case "activeStateEnabled":
        this._attachFeedbackEvents();
        break;
      case "hoverStateEnabled":
        this._attachHoverEvents();
        this._updatedHover();
        break;
      case "tabIndex":
      case "focusStateEnabled":
        this._refreshFocusState();
        break;
      case "onFocusIn":
      case "onFocusOut":
      case "useResizeObserver":
        break;
      case "accessKey":
        this._renderAccessKey();
        break;
      case "hoveredElement":
        this._hover(value2, previousValue);
        break;
      case "isActive":
        this._updatedHover();
        break;
      case "visible":
        this._toggleVisibility(value2);
        if (this._isVisibilityChangeSupported()) {
          this._checkVisibilityChanged(value2 ? "shown" : "hiding");
        }
        break;
      case "onKeyboardHandled":
        this._attachKeyboardEvents();
        break;
      case "onContentReady":
        this._initContentReadyAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _isVisible() {
    const {
      visible: visible2
    } = this.option();
    return super._isVisible() && visible2;
  }
  beginUpdate() {
    this._ready(false);
    super.beginUpdate();
  }
  endUpdate() {
    super.endUpdate();
    if (this._initialized) {
      this._ready(true);
    }
  }
  _ready(value2) {
    if (0 === arguments.length) {
      return !!this._isReady;
    }
    this._isReady = !!value2;
    return this._isReady;
  }
  setAria() {
    if (!isPlainObject(arguments.length <= 0 ? void 0 : arguments[0])) {
      setAttribute(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1], (arguments.length <= 2 ? void 0 : arguments[2]) || this._getAriaTarget());
    } else {
      const target = (arguments.length <= 1 ? void 0 : arguments[1]) || this._getAriaTarget();
      each(arguments.length <= 0 ? void 0 : arguments[0], (name, value2) => setAttribute(name, value2, target));
    }
  }
  isReady() {
    return this._ready();
  }
  repaint() {
    this._refresh();
  }
  focus() {
    focus.trigger(this._focusTarget());
  }
  registerKeyHandler(key, handler) {
    const currentKeys = this._supportedKeys();
    this._supportedKeys = () => extend(currentKeys, {
      [key]: handler
    });
  }
};
var widget_default = Widget;

// node_modules/devextreme/esm/__internal/ui/m_load_indicator.js
var navigator2 = getNavigator();
var LoadIndicator = class extends widget_default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      indicatorSrc: "",
      activeStateEnabled: false,
      hoverStateEnabled: false,
      _animatingSegmentCount: 1,
      _animatingSegmentInner: false
    });
  }
  _defaultOptionsRules() {
    const themeName = current();
    return super._defaultOptionsRules().concat([{
      device() {
        const realDevice = devices_default.real();
        const obsoleteAndroid = "android" === realDevice.platform && !/chrome/i.test(navigator2.userAgent);
        return obsoleteAndroid;
      },
      options: {
        viaImage: true
      }
    }, {
      device: () => isMaterialBased(themeName),
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device: () => isGeneric(themeName),
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  }
  _useTemplates() {
    return false;
  }
  _init() {
    super._init();
    this.$element().addClass("dx-loadindicator");
    const label = message_default.format("Loading");
    const aria = {
      role: "alert",
      label
    };
    this.setAria(aria);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapper();
    this._renderIndicatorContent();
    this._renderMarkup();
  }
  _renderWrapper() {
    this._$wrapper = renderer_default("<div>").addClass("dx-loadindicator-wrapper");
    this.$element().append(this._$wrapper);
  }
  _renderIndicatorContent() {
    this._$content = renderer_default("<div>").addClass("dx-loadindicator-content");
    this._$wrapper.append(this._$content);
  }
  _renderMarkup() {
    const {
      viaImage,
      indicatorSrc
    } = this.option();
    if (m_support_default.animation() && !viaImage && !indicatorSrc) {
      this._renderMarkupForAnimation();
    } else {
      this._renderMarkupForImage();
    }
  }
  _renderMarkupForAnimation() {
    const animatingSegmentInner = this.option("_animatingSegmentInner");
    this._$indicator = renderer_default("<div>").addClass("dx-loadindicator-icon");
    this._$content.append(this._$indicator);
    for (let i = this.option("_animatingSegmentCount"); i >= 0; --i) {
      const $segment = renderer_default("<div>").addClass("dx-loadindicator-segment").addClass("dx-loadindicator-segment" + i);
      if (animatingSegmentInner) {
        $segment.append(renderer_default("<div>").addClass("dx-loadindicator-segment-inner"));
      }
      this._$indicator.append($segment);
    }
  }
  _renderMarkupForImage() {
    const {
      indicatorSrc
    } = this.option();
    if (indicatorSrc) {
      this._$wrapper.addClass("dx-loadindicator-image");
      this._$wrapper.css("backgroundImage", `url(${indicatorSrc})`);
    } else if (m_support_default.animation()) {
      this._renderMarkupForAnimation();
    }
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updateContentSizeForAnimation();
  }
  _updateContentSizeForAnimation() {
    if (!this._$indicator) {
      return;
    }
    let width = this.option("width");
    let height = this.option("height");
    if (width || height) {
      width = getWidth(this.$element());
      height = getHeight(this.$element());
      const minDimension = Math.min(height, width);
      this._$wrapper.css({
        height: minDimension,
        width: minDimension,
        fontSize: minDimension
      });
    }
  }
  _clean() {
    super._clean();
    this._removeMarkupForAnimation();
    this._removeMarkupForImage();
  }
  _removeMarkupForAnimation() {
    if (!this._$indicator) {
      return;
    }
    this._$indicator.remove();
    delete this._$indicator;
  }
  _removeMarkupForImage() {
    this._$wrapper.css("backgroundImage", "none");
  }
  _optionChanged(args) {
    switch (args.name) {
      case "_animatingSegmentCount":
      case "_animatingSegmentInner":
      case "indicatorSrc":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxLoadIndicator", LoadIndicator);
var m_load_indicator_default = LoadIndicator;

// node_modules/devextreme/esm/ui/load_indicator.js
var load_indicator_default = m_load_indicator_default;

// node_modules/devextreme/esm/__internal/events/gesture/m_emitter.gesture.js
var ready4 = ready_callbacks_default.add;
var {
  abs
} = Math;
var TOUCH_BOUNDARY = 10;
var supportPointerEvents = function() {
  return styleProp("pointer-events");
};
var setGestureCover = call_once_default(() => {
  const isDesktop = "desktop" === m_devices_default.real().deviceType;
  if (!supportPointerEvents() || !isDesktop) {
    return noop;
  }
  const $cover = renderer_default("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
  m_events_engine_default.subscribeGlobal($cover, "dxmousewheel", (e) => {
    e.preventDefault();
  });
  ready4(() => {
    $cover.appendTo("body");
  });
  return function(toggle, cursor) {
    $cover.css("pointerEvents", toggle ? "all" : "none");
    toggle && $cover.css("cursor", cursor);
  };
});
var gestureCover = function(toggle, cursor) {
  const gestureCoverStrategy = setGestureCover();
  gestureCoverStrategy(toggle, cursor);
};
var GestureEmitter = m_emitter_default.inherit({
  gesture: true,
  configure(data2) {
    this.getElement().css("msTouchAction", data2.immediate ? "pinch-zoom" : "");
    this.callBase(data2);
  },
  allowInterruptionByMouseWheel() {
    return 2 !== this._stage;
  },
  getDirection() {
    return this.direction;
  },
  _cancel() {
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
    this._stage = 0;
  },
  start(e) {
    if (e._needSkipEvent || needSkipEvent(e)) {
      this._cancel(e);
      return;
    }
    this._startEvent = createEvent(e);
    this._startEventData = eventData(e);
    this._stage = 1;
    this._init(e);
    this._setupImmediateTimer();
  },
  _setupImmediateTimer() {
    clearTimeout(this._immediateTimer);
    this._immediateAccepted = false;
    if (!this.immediate) {
      return;
    }
    if (0 === this.immediateTimeout) {
      this._immediateAccepted = true;
      return;
    }
    this._immediateTimer = setTimeout(() => {
      this._immediateAccepted = true;
    }, this.immediateTimeout ?? 180);
  },
  move(e) {
    if (1 === this._stage && this._directionConfirmed(e)) {
      this._stage = 2;
      this._resetActiveElement();
      this._toggleGestureCover(true);
      this._clearSelection(e);
      this._adjustStartEvent(e);
      this._start(this._startEvent);
      if (0 === this._stage) {
        return;
      }
      this._requestAccept(e);
      this._move(e);
      this._forgetAccept();
    } else if (2 === this._stage) {
      this._clearSelection(e);
      this._move(e);
    }
  },
  _directionConfirmed(e) {
    const touchBoundary = this._getTouchBoundary(e);
    const delta = eventDelta(this._startEventData, eventData(e));
    const deltaX = abs(delta.x);
    const deltaY = abs(delta.y);
    const horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
    const verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
    const direction = this.getDirection(e);
    const bothAccepted = "both" === direction && (horizontalMove || verticalMove);
    const horizontalAccepted = "horizontal" === direction && horizontalMove;
    const verticalAccepted = "vertical" === direction && verticalMove;
    return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted;
  },
  _validateMove(touchBoundary, mainAxis, crossAxis) {
    return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true);
  },
  _getTouchBoundary(e) {
    return this.immediate || isDxMouseWheelEvent(e) ? 0 : TOUCH_BOUNDARY;
  },
  _adjustStartEvent(e) {
    const touchBoundary = this._getTouchBoundary(e);
    const delta = eventDelta(this._startEventData, eventData(e));
    this._startEvent.pageX += sign(delta.x) * touchBoundary;
    this._startEvent.pageY += sign(delta.y) * touchBoundary;
  },
  _resetActiveElement() {
    if ("ios" === m_devices_default.real().platform && this.getElement().find(":focus").length) {
      m_dom_default.resetActiveElement();
    }
  },
  _toggleGestureCover(toggle) {
    this._toggleGestureCoverImpl(toggle);
  },
  _toggleGestureCoverImpl(toggle) {
    const isStarted = 2 === this._stage;
    if (isStarted) {
      gestureCover(toggle, this.getElement().css("cursor"));
    }
  },
  _clearSelection(e) {
    if (isDxMouseWheelEvent(e) || isTouchEvent(e)) {
      return;
    }
    m_dom_default.clearSelection();
  },
  end(e) {
    this._toggleGestureCover(false);
    if (2 === this._stage) {
      this._end(e);
    } else if (1 === this._stage) {
      this._stop(e);
    }
    this._stage = 0;
  },
  dispose() {
    clearTimeout(this._immediateTimer);
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
  },
  _init: noop,
  _start: noop,
  _move: noop,
  _stop: noop,
  _end: noop
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
  if (isDefined(newBoundary)) {
    TOUCH_BOUNDARY = newBoundary;
    return;
  }
  return TOUCH_BOUNDARY;
};
var m_emitter_gesture_default = GestureEmitter;

// node_modules/devextreme/esm/__internal/events/m_drag.js
var DRAG_START_EVENT = "dxdragstart";
var DRAG_EVENT = "dxdrag";
var DRAG_END_EVENT = "dxdragend";
var DRAG_ENTER_EVENT = "dxdragenter";
var DRAG_LEAVE_EVENT = "dxdragleave";
var DROP_EVENT = "dxdrop";
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
  setup(element, data2) {
    const knownDropTarget = knownDropTargets.includes(element);
    if (!knownDropTarget) {
      knownDropTargets.push(element);
      knownDropTargetSelectors.push([]);
      knownDropTargetConfigs.push(data2 || {});
    }
  },
  add(element, handleObj) {
    const index2 = knownDropTargets.indexOf(element);
    this.updateEventsCounter(element, handleObj.type, 1);
    const {
      selector
    } = handleObj;
    if (!knownDropTargetSelectors[index2].includes(selector)) {
      knownDropTargetSelectors[index2].push(selector);
    }
  },
  updateEventsCounter(element, event, value2) {
    if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].includes(event)) {
      const eventsCount = data(element, "dxDragEventsCount") || 0;
      data(element, "dxDragEventsCount", Math.max(0, eventsCount + value2));
    }
  },
  remove(element, handleObj) {
    this.updateEventsCounter(element, handleObj.type, -1);
  },
  teardown(element) {
    const handlersCount = data(element, "dxDragEventsCount");
    if (!handlersCount) {
      const index2 = knownDropTargets.indexOf(element);
      knownDropTargets.splice(index2, 1);
      knownDropTargetSelectors.splice(index2, 1);
      knownDropTargetConfigs.splice(index2, 1);
      removeData(element, "dxDragEventsCount");
    }
  }
};
m_event_registrator_default(DRAG_ENTER_EVENT, dropTargetRegistration);
m_event_registrator_default(DRAG_LEAVE_EVENT, dropTargetRegistration);
m_event_registrator_default(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function($element) {
  const dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  const dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter((selector) => selector);
  let $delegatedTargets = $element.find(dropTargetSelectors.join(", "));
  if (knownDropTargetSelectors[dropTargetIndex].includes(void 0)) {
    $delegatedTargets = $delegatedTargets.add($element);
  }
  return $delegatedTargets;
};
var getItemConfig = function($element) {
  const dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  return knownDropTargetConfigs[dropTargetIndex];
};
var getItemPosition = function(dropTargetConfig, $element) {
  if (dropTargetConfig.itemPositionFunc) {
    return dropTargetConfig.itemPositionFunc($element);
  }
  return $element.offset();
};
var getItemSize = function(dropTargetConfig, $element) {
  if (dropTargetConfig.itemSizeFunc) {
    return dropTargetConfig.itemSizeFunc($element);
  }
  return {
    width: $element.get(0).getBoundingClientRect().width,
    height: $element.get(0).getBoundingClientRect().height
  };
};
var DragEmitter = m_emitter_gesture_default.inherit({
  ctor(element) {
    this.callBase(element);
    this.direction = "both";
  },
  _init(e) {
    this._initEvent = e;
  },
  _start(e) {
    e = this._fireEvent("dxdragstart", this._initEvent);
    this._maxLeftOffset = e.maxLeftOffset;
    this._maxRightOffset = e.maxRightOffset;
    this._maxTopOffset = e.maxTopOffset;
    this._maxBottomOffset = e.maxBottomOffset;
    if (e.targetElements || null === e.targetElements) {
      const dropTargets = wrapToArray(e.targetElements || []);
      this._dropTargets = map(dropTargets, (element) => renderer_default(element).get(0));
    } else {
      this._dropTargets = knownDropTargets;
    }
  },
  _move(e) {
    const eventData2 = eventData(e);
    const dragOffset = this._calculateOffset(eventData2);
    e = this._fireEvent("dxdrag", e, {
      offset: dragOffset
    });
    this._processDropTargets(e);
    if (!e._cancelPreventDefault) {
      e.preventDefault();
    }
  },
  _calculateOffset(eventData2) {
    return {
      x: this._calculateXOffset(eventData2),
      y: this._calculateYOffset(eventData2)
    };
  },
  _calculateXOffset(eventData2) {
    if ("vertical" !== this.direction) {
      const offset2 = eventData2.x - this._startEventData.x;
      return this._fitOffset(offset2, this._maxLeftOffset, this._maxRightOffset);
    }
    return 0;
  },
  _calculateYOffset(eventData2) {
    if ("horizontal" !== this.direction) {
      const offset2 = eventData2.y - this._startEventData.y;
      return this._fitOffset(offset2, this._maxTopOffset, this._maxBottomOffset);
    }
    return 0;
  },
  _fitOffset(offset2, minOffset, maxOffset) {
    if (null != minOffset) {
      offset2 = Math.max(offset2, -minOffset);
    }
    if (null != maxOffset) {
      offset2 = Math.min(offset2, maxOffset);
    }
    return offset2;
  },
  _processDropTargets(e) {
    const target = this._findDropTarget(e);
    const sameTarget = target === this._currentDropTarget;
    if (!sameTarget) {
      this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
      this._currentDropTarget = target;
      this._fireDropTargetEvent(e, DRAG_ENTER_EVENT);
    }
  },
  _fireDropTargetEvent(event, eventName) {
    if (!this._currentDropTarget) {
      return;
    }
    const eventData2 = {
      type: eventName,
      originalEvent: event,
      draggingElement: this._$element.get(0),
      target: this._currentDropTarget
    };
    fireEvent(eventData2);
  },
  _findDropTarget(e) {
    const that = this;
    let result;
    each(knownDropTargets, (_, target) => {
      if (!that._checkDropTargetActive(target)) {
        return;
      }
      const $target = renderer_default(target);
      each(getItemDelegatedTargets($target), (_2, delegatedTarget) => {
        const $delegatedTarget = renderer_default(delegatedTarget);
        if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, renderer_default(result), e)) {
          result = delegatedTarget;
        }
      });
    });
    return result;
  },
  _checkDropTargetActive(target) {
    let active2 = false;
    each(this._dropTargets, (_, activeTarget) => {
      active2 = active2 || activeTarget === target || contains(activeTarget, target);
      return !active2;
    });
    return active2;
  },
  _checkDropTarget(config, $target, $prevTarget, e) {
    const isDraggingElement = $target.get(0) === renderer_default(e.target).get(0);
    if (isDraggingElement) {
      return false;
    }
    const targetPosition = getItemPosition(config, $target);
    if (e.pageX < targetPosition.left) {
      return false;
    }
    if (e.pageY < targetPosition.top) {
      return false;
    }
    const targetSize = getItemSize(config, $target);
    if (e.pageX > targetPosition.left + targetSize.width) {
      return false;
    }
    if (e.pageY > targetPosition.top + targetSize.height) {
      return false;
    }
    if ($prevTarget.length && $prevTarget.closest($target).length) {
      return false;
    }
    if (config.checkDropTarget && !config.checkDropTarget($target, e)) {
      return false;
    }
    return $target;
  },
  _end(e) {
    const eventData2 = eventData(e);
    this._fireEvent("dxdragend", e, {
      offset: this._calculateOffset(eventData2)
    });
    this._fireDropTargetEvent(e, DROP_EVENT);
    delete this._currentDropTarget;
  }
});
m_emitter_registrator_default({
  emitter: DragEmitter,
  events: ["dxdragstart", "dxdrag", "dxdragend"]
});

// node_modules/devextreme/esm/ui/widget/swatch_container.js
var getSwatchContainer = (element) => {
  const $element = renderer_default(element);
  const swatchContainer = $element.closest('[class^="dx-swatch-"], [class*=" dx-swatch-"]');
  const viewport = value();
  if (!swatchContainer.length) {
    return viewport;
  }
  const swatchClassRegex = new RegExp("(\\s|^)(dx-swatch-.*?)(\\s|$)");
  const swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
  let viewportSwatchContainer = viewport.children("." + swatchClass);
  if (!viewportSwatchContainer.length) {
    viewportSwatchContainer = renderer_default("<div>").addClass(swatchClass).appendTo(viewport);
  }
  return viewportSwatchContainer;
};
var swatch_container_default = {
  getSwatchContainer
};

// node_modules/devextreme/esm/__internal/ui/overlay/m_overlay_position_controller.js
var window9 = m_window_default.getWindow();
var OVERLAY_POSITION_ALIASES = {
  top: {
    my: "top center",
    at: "top center"
  },
  bottom: {
    my: "bottom center",
    at: "bottom center"
  },
  right: {
    my: "right center",
    at: "right center"
  },
  left: {
    my: "left center",
    at: "left center"
  },
  center: {
    my: "center",
    at: "center"
  },
  "right bottom": {
    my: "right bottom",
    at: "right bottom"
  },
  "right top": {
    my: "right top",
    at: "right top"
  },
  "left bottom": {
    my: "left bottom",
    at: "left bottom"
  },
  "left top": {
    my: "left top",
    at: "left top"
  }
};
var OVERLAY_DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
var OverlayPositionController = class {
  constructor(_ref) {
    let {
      position: position2,
      container,
      visualContainer,
      $root,
      $content,
      $wrapper,
      onPositioned,
      onVisualPositionChanged,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning
    } = _ref;
    this._props = {
      position: position2,
      container,
      visualContainer,
      restorePosition,
      onPositioned,
      onVisualPositionChanged,
      _fixWrapperPosition,
      _skipContentPositioning
    };
    this._$root = $root;
    this._$content = $content;
    this._$wrapper = $wrapper;
    this._$markupContainer = void 0;
    this._$visualContainer = void 0;
    this._shouldRenderContentInitialPosition = true;
    this._visualPosition = void 0;
    this._initialPosition = void 0;
    this._previousVisualPosition = void 0;
    this.updateContainer(container);
    this.updatePosition(position2);
    this.updateVisualContainer(visualContainer);
  }
  get $container() {
    this.updateContainer();
    return this._$markupContainer;
  }
  get $visualContainer() {
    return this._$visualContainer;
  }
  get position() {
    return this._position;
  }
  set fixWrapperPosition(fixWrapperPosition) {
    this._props._fixWrapperPosition = fixWrapperPosition;
    this.styleWrapperPosition();
  }
  set restorePosition(restorePosition) {
    this._props.restorePosition = restorePosition;
  }
  restorePositionOnNextRender(value2) {
    this._shouldRenderContentInitialPosition = value2 || !this._visualPosition;
  }
  openingHandled() {
    const shouldRestorePosition = this._props.restorePosition;
    this.restorePositionOnNextRender(shouldRestorePosition);
  }
  updatePosition(positionProp) {
    this._props.position = positionProp;
    this._position = this._normalizePosition(positionProp);
    this.updateVisualContainer();
  }
  updateContainer() {
    let containerProp = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._props.container;
    this._props.container = containerProp;
    this._$markupContainer = containerProp ? renderer_default(containerProp) : swatch_container_default.getSwatchContainer(this._$root);
    this.updateVisualContainer(this._props.visualContainer);
  }
  updateVisualContainer() {
    let visualContainer = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._props.visualContainer;
    this._props.visualContainer = visualContainer;
    this._$visualContainer = this._getVisualContainer();
  }
  detectVisualPositionChange(event) {
    this._updateVisualPositionValue();
    this._raisePositionedEvents(event);
  }
  positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      move(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  }
  positionWrapper() {
    if (this._$visualContainer) {
      position_default.setup(this._$wrapper, {
        my: "top left",
        at: "top left",
        of: this._$visualContainer
      });
    }
  }
  styleWrapperPosition() {
    const useFixed = isWindow(this.$visualContainer.get(0)) || this._props._fixWrapperPosition;
    const positionStyle = useFixed ? "fixed" : "absolute";
    this._$wrapper.css("position", positionStyle);
  }
  _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = locate(this._$content);
  }
  _renderContentInitialPosition() {
    this._renderBoundaryOffset();
    resetPosition(this._$content);
    const wrapperOverflow = this._$wrapper.css("overflow");
    this._$wrapper.css("overflow", "hidden");
    if (!this._props._skipContentPositioning) {
      const resultPosition = position_default.setup(this._$content, this._position);
      this._initialPosition = resultPosition;
    }
    this._$wrapper.css("overflow", wrapperOverflow);
    this.detectVisualPositionChange();
  }
  _raisePositionedEvents(event) {
    const previousPosition = this._previousVisualPosition;
    const newPosition = this._visualPosition;
    const isVisualPositionChanged = (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.top) !== newPosition.top || (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.left) !== newPosition.left;
    if (isVisualPositionChanged) {
      this._props.onVisualPositionChanged({
        previousPosition,
        position: newPosition,
        event
      });
    }
    this._props.onPositioned({
      position: this._initialPosition
    });
  }
  _renderBoundaryOffset() {
    const boundaryOffset = this._position ?? {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };
    this._$content.css("margin", `${boundaryOffset.v}px ${boundaryOffset.h}px`);
  }
  _getVisualContainer() {
    var _this$_props$position, _this$_props$position2;
    const containerProp = this._props.container;
    const visualContainerProp = this._props.visualContainer;
    const positionOf = isEvent(null === (_this$_props$position = this._props.position) || void 0 === _this$_props$position ? void 0 : _this$_props$position.of) ? this._props.position.of.target : null === (_this$_props$position2 = this._props.position) || void 0 === _this$_props$position2 ? void 0 : _this$_props$position2.of;
    if (visualContainerProp) {
      return renderer_default(visualContainerProp);
    }
    if (containerProp) {
      return renderer_default(containerProp);
    }
    if (positionOf) {
      return renderer_default(positionOf);
    }
    return renderer_default(window9);
  }
  _normalizePosition(positionProp) {
    const defaultPositionConfig = {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };
    if (isDefined(positionProp)) {
      return extend(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    }
    return defaultPositionConfig;
  }
  _positionToObject(position2) {
    if (isString(position2)) {
      return extend({}, OVERLAY_POSITION_ALIASES[position2]);
    }
    return position2;
  }
};

// node_modules/devextreme/esm/__internal/ui/overlay/m_z_index.js
var baseZIndex = 1500;
var zIndexStack = [];
var base = (ZIndex) => {
  baseZIndex = ensureDefined(ZIndex, baseZIndex);
  return baseZIndex;
};
var create = function() {
  let baseIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : baseZIndex;
  const {
    length
  } = zIndexStack;
  const index2 = (length ? zIndexStack[length - 1] : baseIndex) + 1;
  zIndexStack.push(index2);
  return index2;
};
var remove2 = (zIndex) => {
  const position2 = zIndexStack.indexOf(zIndex);
  if (position2 >= 0) {
    zIndexStack.splice(position2, 1);
  }
};
var isLastZIndexInStack = (zIndex) => zIndexStack.length && zIndexStack[zIndexStack.length - 1] === zIndex;

// node_modules/devextreme/esm/__internal/ui/overlay/m_overlay.js
var ready5 = ready_callbacks_default.add;
var window10 = m_window_default.getWindow();
var viewPortChanged2 = changeCallback;
var OVERLAY_STACK = [];
ready5(() => {
  m_events_engine_default.subscribeGlobal(dom_adapter_default.getDocument(), m_pointer_default.down, (e) => {
    for (let i = OVERLAY_STACK.length - 1; i >= 0; i--) {
      if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
var Overlay = class _Overlay extends widget_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape() {
        this.hide();
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: "",
      wrapperAttr: {},
      position: extend({}, OVERLAY_POSITION_ALIASES.center),
      width: "80vw",
      minWidth: null,
      maxWidth: null,
      height: "80vh",
      minHeight: null,
      maxHeight: null,
      animation: {
        show: {
          type: "pop",
          duration: 300,
          from: {
            scale: 0.55
          }
        },
        hide: {
          type: "pop",
          duration: 300,
          from: {
            opacity: 1,
            scale: 1
          },
          to: {
            opacity: 0,
            scale: 0.55
          }
        }
      },
      closeOnOutsideClick: false,
      hideOnOutsideClick: false,
      _ignorePreventScrollEventsDeprecation: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: "content",
      innerOverlay: false,
      restorePosition: true,
      hideTopOverlayHandler: () => {
        this.hide();
      },
      hideOnParentScroll: false,
      preventScrollEvents: true,
      onPositioned: null,
      propagateOutsideClick: false,
      ignoreChildEvents: true,
      _checkParentVisibility: true,
      _fixWrapperPosition: false,
      _loopFocus: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => !m_window_default.hasWindow(),
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }]);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      animation: true
    });
  }
  $wrapper() {
    return this._$wrapper;
  }
  _eventBindingTarget() {
    return this._$content;
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    extend(this._deprecatedOptions, {
      closeOnOutsideClick: {
        since: "22.1",
        alias: "hideOnOutsideClick"
      }
    });
  }
  ctor(element, options) {
    super.ctor(element, options);
    if (options) {
      if ("preventScrollEvents" in options && !options._ignorePreventScrollEventsDeprecation) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  }
  _logDeprecatedPreventScrollEventsInfo() {
    this._logDeprecatedOptionWarning("preventScrollEvents", {
      since: "23.1",
      message: "If you enable this option, end-users may experience scrolling issues."
    });
  }
  _init() {
    super._init();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = renderer_default("<div>").addClass("dx-overlay-wrapper");
    this._$content = renderer_default("<div>").addClass("dx-overlay-content");
    this._initInnerOverlayClass();
    const $element = this.$element();
    $element.addClass("dx-overlay");
    this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
    this._toggleViewPortSubscription(true);
    const {
      hideTopOverlayHandler
    } = this.option();
    this._initHideTopOverlayHandler(hideTopOverlayHandler);
    this._parentsScrollSubscriptionInfo = {
      handler: (e) => {
        this._hideOnParentsScrollHandler(e);
      }
    };
    this.warnPositionAsFunction();
  }
  warnPositionAsFunction() {
    if (isFunction(this.option("position"))) {
      errors_default.log("W0018");
    }
  }
  _initInnerOverlayClass() {
    const {
      innerOverlay
    } = this.option();
    this._$content.toggleClass("dx-inner-overlay", innerOverlay);
  }
  _initHideTopOverlayHandler(handler) {
    this._hideTopOverlayHandler = handler;
  }
  _getActionsList() {
    return ["onShowing", "onShown", "onHiding", "onHidden", "onPositioned", "onVisualPositionChanged"];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    each(actions, (_, action) => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ["disabled", "readOnly"]
      }) || noop;
    });
  }
  _initHideOnOutsideClickHandler() {
    var _this = this;
    this._proxiedDocumentDownHandler = function() {
      return _this._documentDownHandler(...arguments);
    };
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapperAttributes();
    this._initPositionController();
  }
  _documentDownHandler(e) {
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    const isAttachedTarget = renderer_default(window10.document).is(e.target) || m_dom_default.contains(window10.document, e.target);
    const isInnerOverlay = renderer_default(e.target).closest(".dx-inner-overlay").length;
    const outsideClick = isAttachedTarget && !isInnerOverlay && !(this._$content.is(e.target) || m_dom_default.contains(this._$content.get(0), e.target));
    if (outsideClick && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    const {
      propagateOutsideClick
    } = this.option();
    return propagateOutsideClick;
  }
  _shouldHideOnOutsideClick(e) {
    const {
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return hideOnOutsideClick;
  }
  _outsideClickHandler(e) {
    if (this.option("shading")) {
      e.preventDefault();
    }
    this.hide();
  }
  _getAnonymousTemplateName() {
    return "content";
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new EmptyTemplate()
    });
    super._initTemplates();
  }
  _isTopOverlay() {
    const overlayStack = this._overlayStack();
    for (let i = overlayStack.length - 1; i >= 0; i--) {
      const tabbableElements = overlayStack[i]._findTabbableBounds();
      if (tabbableElements.first || tabbableElements.last) {
        return overlayStack[i] === this;
      }
    }
    return false;
  }
  _overlayStack() {
    return OVERLAY_STACK;
  }
  _zIndexInitValue() {
    return _Overlay.baseZIndex();
  }
  _toggleViewPortSubscription(toggle) {
    var _this2 = this;
    viewPortChanged2.remove(this._viewPortChangeHandle);
    if (toggle) {
      this._viewPortChangeHandle = function() {
        _this2._viewPortChangeHandler(...arguments);
      };
      viewPortChanged2.add(this._viewPortChangeHandle);
    }
  }
  _viewPortChangeHandler() {
    this._positionController.updateContainer(this.option("container"));
    this._refresh();
  }
  _renderWrapperAttributes() {
    const {
      wrapperAttr
    } = this.option();
    const attributes = extend({}, wrapperAttr);
    const classNames = attributes.class;
    delete attributes.class;
    this.$wrapper().attr(attributes).removeClass(this._customWrapperClass).addClass(classNames);
    this._customWrapperClass = classNames;
  }
  _renderVisibilityAnimate(visible2) {
    this._stopAnimation();
    return visible2 ? this._show() : this._hide();
  }
  _getAnimationConfig() {
    return this._getOptionValue("animation", this);
  }
  _toggleBodyScroll(enabled) {
  }
  _animateShowing() {
    var _this3 = this;
    const animation2 = this._getAnimationConfig() ?? {};
    const showAnimation = this._normalizeAnimation(animation2.show, "to");
    const startShowAnimation = (null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.start) ?? noop;
    const completeShowAnimation = (null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.complete) ?? noop;
    this._animate(showAnimation, function() {
      if (_this3._isAnimationPaused) {
        return;
      }
      if (_this3.option("focusStateEnabled")) {
        m_events_engine_default.trigger(_this3._focusTarget(), "focus");
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      completeShowAnimation.call(_this3, ...args);
      _this3._showAnimationProcessing = false;
      _this3._isHidden = false;
      _this3._actions.onShown();
      _this3._toggleSafariScrolling();
      _this3._showingDeferred.resolve();
    }, function() {
      if (_this3._isAnimationPaused) {
        return;
      }
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      startShowAnimation.call(_this3, ...args);
      _this3._showAnimationProcessing = true;
    });
  }
  _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
    if (isPromise(cancelArg)) {
      cancelArg.then((shouldCancel) => {
        if (shouldCancel) {
          cancelFunction();
        } else {
          applyFunction();
        }
      }).catch(() => applyFunction());
    } else {
      cancelArg ? cancelFunction() : applyFunction();
    }
  }
  _show() {
    this._showingDeferred = Deferred();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(() => {
      delete this._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      const show = () => {
        this._stopAnimation();
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this._toggleVisibility(true);
        this._$content.css("visibility", "hidden");
        this._$content.toggleClass("dx-state-invisible", false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        const showingArgs = {
          cancel: false
        };
        this._actions.onShowing(showingArgs);
        this._processShowingHidingCancel(showingArgs.cancel, () => {
          this._$content.css("visibility", "");
          this._renderVisibility(true);
          this._animateShowing();
        }, () => {
          this._toggleVisibility(false);
          this._$content.css("visibility", "");
          this._$content.toggleClass("dx-state-invisible", true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this._toggleBodyScroll(true);
          this.option("visible", false);
          this._showingDeferred.resolve();
        });
      };
      if (this.option("templatesRenderAsynchronously")) {
        this._stopShowTimer();
        this._asyncShowTimeout = setTimeout(show);
      } else {
        show();
      }
    }
    return this._showingDeferred.promise();
  }
  _normalizeAnimation(showHideConfig, direction) {
    if (showHideConfig) {
      showHideConfig = extend({
        type: "slide",
        skipElementInitialStyles: true
      }, showHideConfig);
      if (isObject(showHideConfig[direction])) {
        extend(showHideConfig[direction], {
          position: this._positionController.position
        });
      }
    }
    return showHideConfig;
  }
  _animateHiding() {
    var _this4 = this;
    const animation2 = this._getAnimationConfig() ?? {};
    const hideAnimation = this._normalizeAnimation(animation2.hide, "from");
    const startHideAnimation = (null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.start) ?? noop;
    const completeHideAnimation = (null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.complete) ?? noop;
    this._animate(hideAnimation, function() {
      var _this4$_actions;
      _this4._$content.css("pointerEvents", "");
      _this4._renderVisibility(false);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      completeHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = false;
      null === (_this4$_actions = _this4._actions) || void 0 === _this4$_actions || _this4$_actions.onHidden();
      _this4._hidingDeferred.resolve();
    }, function() {
      _this4._$content.css("pointerEvents", "none");
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      startHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = true;
    });
  }
  _hide() {
    if (!this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = Deferred();
    const hidingArgs = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      this._actions.onHiding(hidingArgs);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      const cancelHide = () => {
        this._isHidingActionCanceled = true;
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this.option("visible", true);
        this._hidingDeferred.resolve();
      };
      const applyHide = () => {
        this._forceFocusLost();
        this._toggleShading(false);
        this._toggleSubscriptions(false);
        this._stopShowTimer();
        this._animateHiding();
      };
      this._processShowingHidingCancel(hidingArgs.cancel, applyHide, cancelHide);
    }
    return this._hidingDeferred.promise();
  }
  _forceFocusLost() {
    const activeElement = dom_adapter_default.getActiveElement();
    const shouldResetActiveElement = !!this._$content.find(activeElement).length;
    if (shouldResetActiveElement) {
      m_dom_default.resetActiveElement();
    }
  }
  _animate(animation2, completeCallback, startCallback) {
    if (animation2) {
      startCallback = startCallback || animation2.start || noop;
      fx_default.animate(this._$content, extend({}, animation2, {
        start: startCallback,
        complete: completeCallback
      }));
    } else {
      completeCallback();
    }
  }
  _stopAnimation() {
    fx_default.stop(this._$content, true);
  }
  _renderVisibility(visible2) {
    if (visible2 && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible2;
    this._stopAnimation();
    if (!visible2) {
      triggerHidingEvent2(this._$content);
    }
    if (visible2) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      triggerShownEvent2(this._$content);
      triggerResizeEvent2(this._$content);
    } else {
      this._toggleVisibility(visible2);
      this._$content.toggleClass("dx-state-invisible", !visible2);
      this._updateZIndexStackPosition(visible2);
      this._moveFromContainer();
    }
    this._toggleShading(visible2);
    this._toggleSubscriptions(visible2);
  }
  _updateZIndexStackPosition(pushToStack) {
    const overlayStack = this._overlayStack();
    const index2 = overlayStack.indexOf(this);
    if (pushToStack) {
      if (-1 === index2) {
        this._zIndex = create(this._zIndexInitValue());
        overlayStack.push(this);
      }
      this._$wrapper.css("zIndex", this._zIndex);
      this._$content.css("zIndex", this._zIndex);
    } else if (-1 !== index2) {
      overlayStack.splice(index2, 1);
      remove2(this._zIndex);
    }
  }
  _toggleShading(visible2) {
    const {
      shading,
      shadingColor
    } = this.option();
    this._$wrapper.toggleClass("dx-overlay-shader", visible2 && shading);
    this._$wrapper.css("backgroundColor", shading ? shadingColor : "");
    this._toggleTabTerminator(visible2 && shading);
  }
  _initTabTerminatorHandler() {
    var _this5 = this;
    this._proxiedTabTerminatorHandler = function() {
      _this5._tabKeyHandler(...arguments);
    };
  }
  _toggleTabTerminator(enabled) {
    const {
      _loopFocus
    } = this.option();
    const eventName = addNamespace2("keydown", this.NAME);
    if (_loopFocus || enabled) {
      m_events_engine_default.on(dom_adapter_default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      m_events_engine_default.off(dom_adapter_default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    }
  }
  _findTabbableBounds() {
    const $elements = this._$wrapper.find("*");
    const elementsCount = $elements.length - 1;
    let first = null;
    let last = null;
    for (let i = 0; i <= elementsCount; i += 1) {
      if (!first && $elements.eq(i).is(tabbable)) {
        first = $elements.eq(i);
      }
      if (!last && $elements.eq(elementsCount - i).is(tabbable)) {
        last = $elements.eq(elementsCount - i);
      }
      if (first && last) {
        break;
      }
    }
    return {
      first,
      last
    };
  }
  _tabKeyHandler(e) {
    if ("tab" !== normalizeKeyName(e) || !this._isTopOverlay()) {
      return;
    }
    const wrapper = this._$wrapper.get(0);
    const activeElement = dom_adapter_default.getActiveElement(wrapper);
    const {
      first: $firstTabbable,
      last: $lastTabbable
    } = this._findTabbableBounds();
    const isTabOnLast = !e.shiftKey && activeElement === (null === $lastTabbable || void 0 === $lastTabbable ? void 0 : $lastTabbable.get(0));
    const isShiftTabOnFirst = e.shiftKey && activeElement === (null === $firstTabbable || void 0 === $firstTabbable ? void 0 : $firstTabbable.get(0));
    const isOutsideTarget = !m_dom_default.contains(wrapper, activeElement);
    const shouldPreventDefault = isTabOnLast || isShiftTabOnFirst || isOutsideTarget;
    if (shouldPreventDefault) {
      e.preventDefault();
      const $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      m_events_engine_default.trigger($focusElement, "focusin");
      m_events_engine_default.trigger($focusElement, "focus");
    }
  }
  _toggleSubscriptions(enabled) {
    if (m_window_default.hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  }
  _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      hideCallback.add(this._hideTopOverlayHandler);
    } else {
      hideCallback.remove(this._hideTopOverlayHandler);
    }
  }
  _toggleHideOnParentsScrollSubscription(needSubscribe) {
    const scrollEvent = addNamespace2("scroll", this.NAME);
    const {
      prevTargets,
      handler
    } = this._parentsScrollSubscriptionInfo ?? {};
    m_events_engine_default.off(prevTargets, scrollEvent, handler);
    const hideOnScroll = this.option("hideOnParentScroll");
    if (needSubscribe && hideOnScroll) {
      let $parents = this._getHideOnParentScrollTarget().parents();
      if ("desktop" === devices_default.real().deviceType) {
        $parents = $parents.add(window10);
      }
      m_events_engine_default.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo.prevTargets = $parents;
    }
  }
  _hideOnParentsScrollHandler(e) {
    let hideHandled = false;
    const hideOnScroll = this.option("hideOnParentScroll");
    if (isFunction(hideOnScroll)) {
      hideHandled = hideOnScroll(e);
    }
    if (!hideHandled && !this._showAnimationProcessing) {
      this.hide();
    }
  }
  _getHideOnParentScrollTarget() {
    const {
      _hideOnParentScrollTarget
    } = this.option();
    const $hideOnParentScrollTarget = renderer_default(_hideOnParentScrollTarget);
    if ($hideOnParentScrollTarget.length) {
      return $hideOnParentScrollTarget;
    }
    return this._$wrapper;
  }
  _render() {
    super._render();
    this._appendContentToElement();
    this._renderVisibilityAnimate(this.option("visible"));
  }
  _appendContentToElement() {
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
    }
  }
  _renderContent() {
    const shouldDeferRendering = !this._currentVisible && this.option("deferRendering");
    const isParentHidden = this.option("visible") && this._isParentHidden();
    if (isParentHidden) {
      this._isHidden = true;
      return;
    }
    if (this._contentAlreadyRendered || shouldDeferRendering) {
      return;
    }
    this._contentAlreadyRendered = true;
    this._appendContentToElement();
    super._renderContent();
  }
  _isParentHidden() {
    if (!this.option("_checkParentVisibility")) {
      return false;
    }
    if (void 0 !== this._parentHidden) {
      return this._parentHidden;
    }
    const $parent = this.$element().parent();
    if ($parent.is(":visible")) {
      return false;
    }
    let isHidden = false;
    $parent.add($parent.parents()).each((index2, element) => {
      const $element = renderer_default(element);
      if ("none" === $element.css("display")) {
        isHidden = true;
        return false;
      }
    });
    return isHidden || !dom_adapter_default.getBody().contains($parent.get(0));
  }
  _renderContentImpl() {
    const whenContentRendered = Deferred();
    const contentTemplateOption = this.option("contentTemplate");
    const contentTemplate = this._getTemplate(contentTemplateOption);
    const transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    null === contentTemplate || void 0 === contentTemplate || contentTemplate.render({
      container: getPublicElement(this.$content()),
      noModel: true,
      transclude,
      onRendered: () => {
        whenContentRendered.resolve();
        if (this.option("templatesRenderAsynchronously")) {
          this._dimensionChanged();
        }
      }
    });
    const {
      preventScrollEvents
    } = this.option();
    this._toggleWrapperScrollEventsSubscription(preventScrollEvents);
    whenContentRendered.done(() => {
      if (this.option("visible")) {
        this._moveToContainer();
      }
    });
    return whenContentRendered.promise();
  }
  _getPositionControllerConfig() {
    const {
      container,
      visualContainer,
      _fixWrapperPosition,
      restorePosition,
      _skipContentPositioning
    } = this.option();
    return {
      container,
      visualContainer,
      $root: this.$element(),
      $content: this._$content,
      $wrapper: this._$wrapper,
      onPositioned: this._actions.onPositioned,
      onVisualPositionChanged: this._actions.onVisualPositionChanged,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning
    };
  }
  _initPositionController() {
    this._positionController = new OverlayPositionController(this._getPositionControllerConfig());
  }
  _toggleWrapperScrollEventsSubscription(enabled) {
    const eventName = addNamespace2(DRAG_EVENT, this.NAME);
    m_events_engine_default.off(this._$wrapper, eventName);
    if (enabled) {
      m_events_engine_default.on(this._$wrapper, eventName, {
        validate: () => true,
        getDirection: () => "both",
        _toggleGestureCover(toggle) {
          if (!toggle) {
            this._toggleGestureCoverImpl(toggle);
          }
        },
        _clearSelection: noop,
        isNative: true
      }, (e) => {
        const {
          originalEvent
        } = e.originalEvent;
        const {
          type: type2
        } = originalEvent || {};
        const isWheel = "wheel" === type2;
        const isMouseMove = "mousemove" === type2;
        const isScrollByWheel = isWheel && !isCommandKeyPressed(e);
        e._cancelPreventDefault = true;
        if (originalEvent && false !== e.cancelable && (!isMouseMove && !isWheel || isScrollByWheel)) {
          e.preventDefault();
        }
      });
    }
  }
  _moveFromContainer() {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  }
  _checkContainerExists() {
    const $wrapperContainer = this._positionController.$container;
    if (void 0 === $wrapperContainer) {
      return;
    }
    const containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      ui_errors_default.log("W1021", this.NAME);
    }
  }
  _moveToContainer() {
    const $wrapperContainer = this._positionController.$container;
    this._$wrapper.appendTo($wrapperContainer);
    this._$content.appendTo(this._$wrapper);
  }
  _renderGeometry(options) {
    const {
      visible: visible2
    } = this.option();
    if (visible2 && m_window_default.hasWindow()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  }
  _renderGeometryImpl() {
    this._positionController.updatePosition(this._getOptionValue("position"));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  }
  _renderPosition(state) {
    this._positionController.positionContent();
  }
  _isAllWindowCovered() {
    const {
      shading
    } = this.option();
    return isWindow(this._positionController.$visualContainer.get(0)) && shading;
  }
  _toggleSafariScrolling() {
    const visible2 = this.option("visible");
    const $body = renderer_default(dom_adapter_default.getBody());
    const isIosSafari = "ios" === devices_default.real().platform && browser_default.safari;
    const isAllWindowCovered = this._isAllWindowCovered();
    const isScrollingPrevented = $body.hasClass("dx-prevent-safari-scrolling");
    const shouldPreventScrolling = !isScrollingPrevented && visible2 && isAllWindowCovered;
    const shouldEnableScrolling = isScrollingPrevented && (!visible2 || !isAllWindowCovered || this._disposed);
    if (isIosSafari) {
      if (shouldEnableScrolling) {
        $body.removeClass("dx-prevent-safari-scrolling");
        window10.scrollTo(0, this._cachedBodyScrollTop);
        this._cachedBodyScrollTop = void 0;
      } else if (shouldPreventScrolling) {
        this._cachedBodyScrollTop = window10.pageYOffset;
        $body.addClass("dx-prevent-safari-scrolling");
      }
    }
  }
  _renderWrapper() {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  }
  _renderWrapperDimensions() {
    const {
      $visualContainer
    } = this._positionController;
    const documentElement = dom_adapter_default.getDocumentElement();
    const isVisualContainerWindow = isWindow($visualContainer.get(0));
    const wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : getOuterWidth($visualContainer);
    const wrapperHeight = isVisualContainerWindow ? window10.innerHeight : getOuterHeight($visualContainer);
    this._$wrapper.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  }
  _renderDimensions() {
    const content = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue("minWidth", content),
      maxWidth: this._getOptionValue("maxWidth", content),
      minHeight: this._getOptionValue("minHeight", content),
      maxHeight: this._getOptionValue("maxHeight", content),
      width: this._getOptionValue("width", content),
      height: this._getOptionValue("height", content)
    });
  }
  _focusTarget() {
    return this._$content;
  }
  _attachKeyboardEvents() {
    this._keyboardListenerId = keyboard.on(this._$content, null, (opts) => this._keyboardHandler(opts));
  }
  _keyboardHandler(options) {
    const e = options.originalEvent;
    const $target = renderer_default(e.target);
    if ($target.is(this._$content) || !this.option("ignoreChildEvents")) {
      super._keyboardHandler(...arguments);
    }
  }
  _isVisible() {
    const {
      visible: visible2
    } = this.option();
    return visible2;
  }
  _visibilityChanged(visible2) {
    if (visible2) {
      if (this.option("visible")) {
        this._renderVisibilityAnimate(visible2);
      }
    } else {
      this._renderVisibilityAnimate(visible2);
    }
  }
  _dimensionChanged() {
    this._renderGeometry();
  }
  _clean() {
    const {
      isRenovated
    } = this.option();
    if (!this._contentAlreadyRendered && !isRenovated) {
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._stopShowTimer();
    this._cleanFocusState();
  }
  _stopShowTimer() {
    if (this._asyncShowTimeout) {
      clearTimeout(this._asyncShowTimeout);
    }
    this._asyncShowTimeout = null;
  }
  _dispose() {
    fx_default.stop(this._$content, false);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._toggleTabTerminator(false);
    this._actions = null;
    this._parentsScrollSubscriptionInfo = null;
    super._dispose();
    this._toggleSafariScrolling();
    this.option("visible") && remove2(this._zIndex);
    this._$wrapper.remove();
    this._$content.remove();
  }
  _toggleRTLDirection(rtl) {
    this._$content.toggleClass("dx-rtl", rtl);
  }
  _optionChanged(args) {
    const {
      value: value2,
      name
    } = args;
    if (this._getActionsList().includes(name)) {
      this._initActions();
      return;
    }
    switch (name) {
      case "animation":
      case "closeOnOutsideClick":
      case "hideOnOutsideClick":
      case "propagateOutsideClick":
        break;
      case "_loopFocus":
      case "shading": {
        const {
          visible: visible2
        } = this.option();
        this._toggleShading(visible2);
        this._toggleSafariScrolling();
        break;
      }
      case "shadingColor": {
        const {
          visible: visible2
        } = this.option();
        this._toggleShading(visible2);
        break;
      }
      case "width":
      case "height":
      case "minWidth":
      case "maxWidth":
      case "minHeight":
      case "maxHeight":
        this._renderGeometry();
        break;
      case "position":
        this._positionController.updatePosition(this.option("position"));
        this._positionController.restorePositionOnNextRender(true);
        this._renderGeometry();
        this._toggleSafariScrolling();
        break;
      case "visible":
        this._renderVisibilityAnimate(value2).done(() => {
          var _this$_animateDeferre;
          return null === (_this$_animateDeferre = this._animateDeferred) || void 0 === _this$_animateDeferre ? void 0 : _this$_animateDeferre.resolveWith(this);
        }).fail(() => {
          var _this$_animateDeferre2;
          return null === (_this$_animateDeferre2 = this._animateDeferred) || void 0 === _this$_animateDeferre2 ? void 0 : _this$_animateDeferre2.reject();
        });
        break;
      case "container":
        this._positionController.updateContainer(value2);
        this._invalidate();
        this._toggleSafariScrolling();
        break;
      case "visualContainer":
        this._positionController.updateVisualContainer(value2);
        this._renderWrapper();
        this._toggleSafariScrolling();
        break;
      case "innerOverlay":
        this._initInnerOverlayClass();
        break;
      case "deferRendering":
      case "contentTemplate":
        this._contentAlreadyRendered = false;
        this._clean();
        this._invalidate();
        break;
      case "hideTopOverlayHandler":
        this._toggleHideTopOverlayCallback(false);
        this._initHideTopOverlayHandler(value2);
        this._toggleHideTopOverlayCallback(this.option("visible"));
        break;
      case "hideOnParentScroll":
      case "_hideOnParentScrollTarget": {
        const {
          visible: visible2
        } = this.option();
        this._toggleHideOnParentsScrollSubscription(visible2);
        break;
      }
      case "rtlEnabled":
        this._contentAlreadyRendered = false;
        super._optionChanged(args);
        break;
      case "_fixWrapperPosition":
        this._positionController.fixWrapperPosition = value2;
        break;
      case "wrapperAttr":
        this._renderWrapperAttributes();
        break;
      case "restorePosition":
        this._positionController.restorePosition = value2;
        break;
      case "preventScrollEvents":
        this._logDeprecatedPreventScrollEventsInfo();
        this._toggleWrapperScrollEventsSubscription(value2);
        break;
      default:
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    showing = void 0 === showing ? !this.option("visible") : showing;
    const result = Deferred();
    if (showing === this.option("visible")) {
      return result.resolveWith(this, [showing]).promise();
    }
    const animateDeferred = Deferred();
    this._animateDeferred = animateDeferred;
    this.option("visible", showing);
    animateDeferred.promise().done(() => {
      delete this._animateDeferred;
      result.resolveWith(this, [this.option("visible")]);
    }).fail(() => {
      delete this._animateDeferred;
      result.reject();
    });
    return result.promise();
  }
  $content() {
    return this._$content;
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  content() {
    return getPublicElement(this._$content);
  }
  repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      triggerResizeEvent2(this._$content);
    } else {
      super.repaint();
    }
  }
};
Overlay.baseZIndex = (zIndex) => base(zIndex);
component_registrator_default("dxOverlay", Overlay);
var m_overlay_default = Overlay;

// node_modules/devextreme/esm/__internal/ui/m_load_panel.js
var LoadPanel = class extends m_overlay_default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape: noop
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      message: message_default.format("Loading"),
      width: 222,
      height: 90,
      animation: null,
      showIndicator: true,
      indicatorSrc: "",
      showPane: true,
      delay: 0,
      templatesRenderAsynchronously: false,
      hideTopOverlayHandler: null,
      focusStateEnabled: false,
      propagateOutsideClick: true,
      preventScrollEvents: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "generic"
      },
      options: {
        shadingColor: "transparent"
      }
    }, {
      device: () => isMaterial(),
      options: {
        message: "",
        width: 60,
        height: 60,
        maxHeight: 60,
        maxWidth: 60
      }
    }, {
      device: () => isFluent(),
      options: {
        width: "auto",
        height: "auto"
      }
    }]);
  }
  _init() {
    super._init.apply(this, arguments);
  }
  _render() {
    super._render();
    this.$element().addClass("dx-loadpanel");
    this.$wrapper().addClass("dx-loadpanel-wrapper");
    this._updateWrapperAria();
  }
  _updateWrapperAria() {
    this.$wrapper().removeAttr("aria-label").removeAttr("role");
    const showIndicator = this.option("showIndicator");
    if (!showIndicator) {
      const aria = this._getAriaAttributes();
      this.$wrapper().attr(aria);
    }
  }
  _getAriaAttributes() {
    const {
      message
    } = this.option();
    const label = message || message_default.format("Loading");
    const aria = {
      role: "alert",
      "aria-label": label
    };
    return aria;
  }
  _renderContentImpl() {
    super._renderContentImpl();
    this.$content().addClass("dx-loadpanel-content");
    this._$loadPanelContentWrapper = renderer_default("<div>").addClass("dx-loadpanel-content-wrapper");
    this._$loadPanelContentWrapper.appendTo(this.$content());
    this._togglePaneVisible();
    this._cleanPreviousContent();
    this._renderLoadIndicator();
    this._renderMessage();
  }
  _show() {
    const {
      delay
    } = this.option();
    if (!delay) {
      return super._show();
    }
    const deferred = Deferred();
    const callBase = super._show.bind(this);
    this._clearShowTimeout();
    this._showTimeout = setTimeout(() => {
      callBase().done(() => {
        deferred.resolve();
      });
    }, delay);
    return deferred.promise();
  }
  _hide() {
    this._clearShowTimeout();
    return super._hide();
  }
  _clearShowTimeout() {
    clearTimeout(this._showTimeout);
  }
  _renderMessage() {
    if (!this._$loadPanelContentWrapper) {
      return;
    }
    const {
      message
    } = this.option();
    if (!message) {
      return;
    }
    const $message = renderer_default("<div>").addClass("dx-loadpanel-message").text(message);
    this._$loadPanelContentWrapper.append($message);
  }
  _renderLoadIndicator() {
    if (!this._$loadPanelContentWrapper || !this.option("showIndicator")) {
      return;
    }
    if (!this._$indicator) {
      this._$indicator = renderer_default("<div>").addClass("dx-loadpanel-indicator").appendTo(this._$loadPanelContentWrapper);
    }
    this._createComponent(this._$indicator, load_indicator_default, {
      elementAttr: this._getAriaAttributes(),
      indicatorSrc: this.option("indicatorSrc")
    });
  }
  _cleanPreviousContent() {
    this.$content().find(".dx-loadpanel-message").remove();
    this.$content().find(".dx-loadpanel-indicator").remove();
    delete this._$indicator;
  }
  _togglePaneVisible() {
    this.$content().toggleClass("dx-loadpanel-pane-hidden", !this.option("showPane"));
  }
  _optionChanged(args) {
    switch (args.name) {
      case "delay":
        break;
      case "message":
      case "showIndicator":
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage();
        this._updateWrapperAria();
        break;
      case "showPane":
        this._togglePaneVisible();
        break;
      case "indicatorSrc":
        this._renderLoadIndicator();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    this._clearShowTimeout();
    super._dispose();
  }
};
component_registrator_default("dxLoadPanel", LoadPanel);
var m_load_panel_default = LoadPanel;

// node_modules/devextreme/esm/ui/load_panel.js
var load_panel_default = m_load_panel_default;

// node_modules/devextreme/esm/format_helper.js
var format_helper_default = dependency_injector_default({
  format: function(value2, format2) {
    const formatIsValid = isString(format2) && "" !== format2 || isPlainObject(format2) || isFunction(format2);
    const valueIsValid = isNumeric(value2) || isDate(value2);
    if (!formatIsValid || !valueIsValid) {
      return isDefined(value2) ? value2.toString() : "";
    }
    if (isFunction(format2)) {
      return format2(value2);
    }
    if (isString(format2)) {
      format2 = {
        type: format2
      };
    }
    if (isNumeric(value2)) {
      return number_default2.format(value2, format2);
    }
    if (isDate(value2)) {
      return date_default3.format(value2, format2);
    }
  },
  getTimeFormat: function(showSecond) {
    return showSecond ? "longtime" : "shorttime";
  },
  _normalizeFormat: function(format2) {
    if (!Array.isArray(format2)) {
      return format2;
    }
    if (1 === format2.length) {
      return format2[0];
    }
    return function(date) {
      return format2.map(function(formatPart) {
        return date_default3.format(date, formatPart);
      }).join(" ");
    };
  },
  getDateFormatByDifferences: function(dateDifferences, intervalFormat) {
    const resultFormat = [];
    const needSpecialSecondFormatter = intervalFormat && dateDifferences.millisecond && !(dateDifferences.year || dateDifferences.month || dateDifferences.day);
    if (needSpecialSecondFormatter) {
      const secondFormatter = function(date) {
        return date.getSeconds() + date.getMilliseconds() / 1e3 + "s";
      };
      resultFormat.push(secondFormatter);
    } else if (dateDifferences.millisecond) {
      resultFormat.push("millisecond");
    }
    if (dateDifferences.hour || dateDifferences.minute || !needSpecialSecondFormatter && dateDifferences.second) {
      resultFormat.unshift(this.getTimeFormat(dateDifferences.second));
    }
    if (dateDifferences.year && dateDifferences.month && dateDifferences.day) {
      if (intervalFormat && "month" === intervalFormat) {
        return "monthandyear";
      } else {
        resultFormat.unshift("shortdate");
        return this._normalizeFormat(resultFormat);
      }
    }
    if (dateDifferences.year && dateDifferences.month) {
      return "monthandyear";
    }
    if (dateDifferences.year && dateDifferences.quarter) {
      return "quarterandyear";
    }
    if (dateDifferences.year) {
      return "year";
    }
    if (dateDifferences.quarter) {
      return "quarter";
    }
    if (dateDifferences.month && dateDifferences.day) {
      if (intervalFormat) {
        const monthDayFormatter = function(date) {
          return date_default3.getMonthNames("abbreviated")[date.getMonth()] + " " + date_default3.format(date, "day");
        };
        resultFormat.unshift(monthDayFormatter);
      } else {
        resultFormat.unshift("monthandday");
      }
      return this._normalizeFormat(resultFormat);
    }
    if (dateDifferences.month) {
      return "month";
    }
    if (dateDifferences.day) {
      if (intervalFormat) {
        resultFormat.unshift("day");
      } else {
        const dayFormatter = function(date) {
          return date_default3.format(date, "dayofweek") + ", " + date_default3.format(date, "day");
        };
        resultFormat.unshift(dayFormatter);
      }
      return this._normalizeFormat(resultFormat);
    }
    return this._normalizeFormat(resultFormat);
  },
  getDateFormatByTicks: function(ticks) {
    let maxDiff;
    let currentDiff;
    let i;
    if (ticks.length > 1) {
      maxDiff = date_default.getDatesDifferences(ticks[0], ticks[1]);
      for (i = 1; i < ticks.length - 1; i++) {
        currentDiff = date_default.getDatesDifferences(ticks[i], ticks[i + 1]);
        if (maxDiff.count < currentDiff.count) {
          maxDiff = currentDiff;
        }
      }
    } else {
      maxDiff = {
        year: true,
        month: true,
        day: true,
        hour: ticks[0].getHours() > 0,
        minute: ticks[0].getMinutes() > 0,
        second: ticks[0].getSeconds() > 0,
        millisecond: ticks[0].getMilliseconds() > 0
      };
    }
    const resultFormat = this.getDateFormatByDifferences(maxDiff);
    return resultFormat;
  },
  getDateFormatByTickInterval: function(startValue, endValue, tickInterval) {
    let dateUnitInterval;
    const correctDateDifferences = function(dateDifferences2, tickInterval2, value2) {
      switch (tickInterval2) {
        case "year":
        case "quarter":
          dateDifferences2.month = value2;
        case "month":
          dateDifferences2.day = value2;
        case "week":
        case "day":
          dateDifferences2.hour = value2;
        case "hour":
          dateDifferences2.minute = value2;
        case "minute":
          dateDifferences2.second = value2;
        case "second":
          dateDifferences2.millisecond = value2;
      }
    };
    tickInterval = isString(tickInterval) ? tickInterval.toLowerCase() : tickInterval;
    const dateDifferences = date_default.getDatesDifferences(startValue, endValue);
    if (startValue !== endValue) {
      !function(differences, minDate, maxDate) {
        if (!maxDate.getMilliseconds() && maxDate.getSeconds()) {
          if (maxDate.getSeconds() - minDate.getSeconds() === 1) {
            differences.millisecond = true;
            differences.second = false;
          }
        } else if (!maxDate.getSeconds() && maxDate.getMinutes()) {
          if (maxDate.getMinutes() - minDate.getMinutes() === 1) {
            differences.second = true;
            differences.minute = false;
          }
        } else if (!maxDate.getMinutes() && maxDate.getHours()) {
          if (maxDate.getHours() - minDate.getHours() === 1) {
            differences.minute = true;
            differences.hour = false;
          }
        } else if (!maxDate.getHours() && maxDate.getDate() > 1) {
          if (maxDate.getDate() - minDate.getDate() === 1) {
            differences.hour = true;
            differences.day = false;
          }
        } else if (1 === maxDate.getDate() && maxDate.getMonth()) {
          if (maxDate.getMonth() - minDate.getMonth() === 1) {
            differences.day = true;
            differences.month = false;
          }
        } else if (!maxDate.getMonth() && maxDate.getFullYear()) {
          if (maxDate.getFullYear() - minDate.getFullYear() === 1) {
            differences.month = true;
            differences.year = false;
          }
        }
      }(dateDifferences, startValue > endValue ? endValue : startValue, startValue > endValue ? startValue : endValue);
    }
    dateUnitInterval = date_default.getDateUnitInterval(dateDifferences);
    correctDateDifferences(dateDifferences, dateUnitInterval, true);
    dateUnitInterval = date_default.getDateUnitInterval(tickInterval || "second");
    correctDateDifferences(dateDifferences, dateUnitInterval, false);
    dateDifferences[{
      week: "day"
    }[dateUnitInterval] || dateUnitInterval] = true;
    const resultFormat = this.getDateFormatByDifferences(dateDifferences);
    return resultFormat;
  }
});

// node_modules/devextreme/esm/ui/shared/filtering.js
var DEFAULT_DATE_INTERVAL = ["year", "month", "day"];
var DEFAULT_DATETIME_INTERVAL = ["year", "month", "day", "hour", "minute"];
var isDateType = function(dataType) {
  return "date" === dataType || "datetime" === dataType;
};
var getGroupInterval = function(column) {
  let index2;
  let result = [];
  const dateIntervals = ["year", "month", "day", "hour", "minute", "second"];
  const groupInterval = column.headerFilter && column.headerFilter.groupInterval;
  const interval = "quarter" === groupInterval ? "month" : groupInterval;
  if (isDateType(column.dataType) && null !== groupInterval) {
    result = "datetime" === column.dataType ? DEFAULT_DATETIME_INTERVAL : DEFAULT_DATE_INTERVAL;
    index2 = dateIntervals.indexOf(interval);
    if (index2 >= 0) {
      result = dateIntervals.slice(0, index2);
      result.push(groupInterval);
      return result;
    }
    return result;
  } else if (isDefined(groupInterval)) {
    return Array.isArray(groupInterval) ? groupInterval : [groupInterval];
  }
};
var filtering_default = /* @__PURE__ */ function() {
  const getFilterSelector = function(column, target) {
    let selector = column.dataField || column.selector;
    if ("search" === target) {
      selector = column.displayField || column.calculateDisplayValue || selector;
    }
    return selector;
  };
  const getFilterExpressionByRange = function(filterValue, target) {
    const column = this;
    let endFilterValue;
    let startFilterExpression;
    let endFilterExpression;
    const selector = getFilterSelector(column, target);
    if (Array.isArray(filterValue) && isDefined(filterValue[0]) && isDefined(filterValue[1])) {
      startFilterExpression = [selector, ">=", filterValue[0]];
      endFilterExpression = [selector, "<=", filterValue[1]];
      if (isDateType(column.dataType) && (date = filterValue[1], date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1)) {
        endFilterValue = new Date(filterValue[1].getTime());
        if ("date" === column.dataType) {
          endFilterValue.setDate(filterValue[1].getDate() + 1);
        }
        endFilterExpression = [selector, "<", endFilterValue];
      }
      return [startFilterExpression, "and", endFilterExpression];
    }
    var date;
  };
  const getFilterExpressionForDate = function(filterValue, selectedFilterOperation, target) {
    const column = this;
    let dateStart;
    let dateEnd;
    let dateInterval;
    const values = function(dateValue) {
      if (isDate(dateValue)) {
        return [dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()];
      }
      return map(("" + dateValue).split("/"), function(value2, index2) {
        return 1 === index2 ? Number(value2) - 1 : Number(value2);
      });
    }(filterValue);
    const selector = getFilterSelector(column, target);
    if ("headerFilter" === target) {
      dateInterval = getGroupInterval(column)[values.length - 1];
    } else if ("datetime" === column.dataType) {
      dateInterval = "minute";
    }
    switch (dateInterval) {
      case "year":
        dateStart = new Date(values[0], 0, 1);
        dateEnd = new Date(values[0] + 1, 0, 1);
        break;
      case "month":
        dateStart = new Date(values[0], values[1], 1);
        dateEnd = new Date(values[0], values[1] + 1, 1);
        break;
      case "quarter":
        dateStart = new Date(values[0], 3 * values[1], 1);
        dateEnd = new Date(values[0], 3 * values[1] + 3, 1);
        break;
      case "hour":
        dateStart = new Date(values[0], values[1], values[2], values[3]);
        dateEnd = new Date(values[0], values[1], values[2], values[3] + 1);
        break;
      case "minute":
        dateStart = new Date(values[0], values[1], values[2], values[3], values[4]);
        dateEnd = new Date(values[0], values[1], values[2], values[3], values[4] + 1);
        break;
      case "second":
        dateStart = new Date(values[0], values[1], values[2], values[3], values[4], values[5]);
        dateEnd = new Date(values[0], values[1], values[2], values[3], values[4], values[5] + 1);
        break;
      default:
        dateStart = new Date(values[0], values[1], values[2]);
        dateEnd = new Date(values[0], values[1], values[2] + 1);
    }
    switch (selectedFilterOperation) {
      case "<":
        return [selector, "<", dateStart];
      case "<=":
        return [selector, "<", dateEnd];
      case ">":
        return [selector, ">=", dateEnd];
      case ">=":
        return [selector, ">=", dateStart];
      case "<>":
        return [[selector, "<", dateStart], "or", [selector, ">=", dateEnd]];
      default:
        return [[selector, ">=", dateStart], "and", [selector, "<", dateEnd]];
    }
  };
  const getFilterExpressionForNumber = function(filterValue, selectedFilterOperation, target) {
    const selector = getFilterSelector(this, target);
    const groupInterval = getGroupInterval(this);
    if ("headerFilter" === target && groupInterval && isDefined(filterValue)) {
      const values = ("" + filterValue).split("/");
      const value2 = Number(values[values.length - 1]);
      const interval = groupInterval[values.length - 1];
      const startFilterValue = [selector, ">=", value2];
      const endFilterValue = [selector, "<", value2 + interval];
      const condition = [startFilterValue, "and", endFilterValue];
      return condition;
    }
    return [selector, selectedFilterOperation || "=", filterValue];
  };
  return {
    defaultCalculateFilterExpression: function(filterValue, selectedFilterOperation, target) {
      const column = this;
      const selector = getFilterSelector(column, target);
      const isSearchByDisplayValue = column.calculateDisplayValue && "search" === target;
      const dataType = isSearchByDisplayValue && column.lookup && column.lookup.dataType || column.dataType;
      let filter = null;
      if (("headerFilter" === target || "filterBuilder" === target) && null === filterValue) {
        filter = [selector, selectedFilterOperation || "=", null];
        if ("string" === dataType) {
          filter = [filter, "=" === selectedFilterOperation ? "or" : "and", [selector, selectedFilterOperation || "=", ""]];
        }
      } else if ("string" === dataType && (!column.lookup || isSearchByDisplayValue)) {
        filter = [selector, selectedFilterOperation || "contains", filterValue];
      } else if ("between" === selectedFilterOperation) {
        return getFilterExpressionByRange.apply(column, [filterValue, target]);
      } else if (isDateType(dataType) && isDefined(filterValue)) {
        return getFilterExpressionForDate.apply(column, arguments);
      } else if ("number" === dataType) {
        return getFilterExpressionForNumber.apply(column, arguments);
      } else {
        filter = [selector, selectedFilterOperation || "=", filterValue];
      }
      return filter;
    },
    getGroupInterval
  };
}();

// node_modules/devextreme/esm/__internal/grids/grid_core/m_utils.js
var LEGACY_SCROLLING_MODE = "scrolling.legacyMode";
var ROW_RENDERING_MODE_OPTION = "scrolling.rowRenderingMode";
var DATE_INTERVAL_SELECTORS = {
  year: (value2) => value2 && value2.getFullYear(),
  month: (value2) => value2 && value2.getMonth() + 1,
  day: (value2) => value2 && value2.getDate(),
  quarter: (value2) => value2 && Math.floor(value2.getMonth() / 3) + 1,
  hour: (value2) => value2 && value2.getHours(),
  minute: (value2) => value2 && value2.getMinutes(),
  second: (value2) => value2 && value2.getSeconds()
};
var getIntervalSelector = function() {
  const data2 = arguments[1];
  const value2 = this.calculateCellValue(data2);
  if (!isDefined(value2)) {
    return null;
  }
  if (isDateType2(this.dataType)) {
    const nameIntervalSelector = arguments[0];
    return DATE_INTERVAL_SELECTORS[nameIntervalSelector](value2);
  }
  if ("number" === this.dataType) {
    const groupInterval = arguments[0];
    return Math.floor(Number(value2) / groupInterval) * groupInterval;
  }
};
var equalSelectors = function(selector1, selector2) {
  if (isFunction(selector1) && isFunction(selector2)) {
    if (selector1.originalCallback && selector2.originalCallback) {
      return selector1.originalCallback === selector2.originalCallback && selector1.columnIndex === selector2.columnIndex;
    }
  }
  return selector1 === selector2;
};
function isDateType2(dataType) {
  return "date" === dataType || "datetime" === dataType;
}
var setEmptyText = function($container) {
  $container.get(0).textContent = " ";
};
var normalizeSortingInfo2 = function(sort) {
  sort = sort || [];
  const result = normalizeSortingInfo(sort);
  for (let i = 0; i < sort.length; i++) {
    if (sort && sort[i] && void 0 !== sort[i].isExpanded) {
      result[i].isExpanded = sort[i].isExpanded;
    }
    if (sort && sort[i] && void 0 !== sort[i].groupInterval) {
      result[i].groupInterval = sort[i].groupInterval;
    }
  }
  return result;
};
var formatValue2 = function(value2, options) {
  const valueText = format_helper_default.format(value2, options.format) || value2 && value2.toString() || "";
  const formatObject = {
    value: value2,
    valueText: options.getDisplayFormat ? options.getDisplayFormat(valueText) : valueText,
    target: options.target || "row",
    groupInterval: options.groupInterval
  };
  return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText;
};
var getSummaryText = function(summaryItem, summaryTexts) {
  const displayFormat = summaryItem.displayFormat || summaryItem.columnCaption && summaryTexts[`${summaryItem.summaryType}OtherColumn`] || summaryTexts[summaryItem.summaryType];
  return formatValue2(summaryItem.value, {
    format: summaryItem.valueFormat,
    getDisplayFormat: (valueText) => displayFormat ? format(displayFormat, valueText, summaryItem.columnCaption) : valueText,
    customizeText: summaryItem.customizeText
  });
};
var getWidgetInstance = function($element) {
  const editorData = $element.data && $element.data();
  const dxComponents = editorData && editorData.dxComponents;
  const widgetName = dxComponents && dxComponents[0];
  return widgetName && editorData[widgetName];
};
var equalFilterParameters = function(filter1, filter2, langParams) {
  if (Array.isArray(filter1) && Array.isArray(filter2)) {
    if (filter1.length !== filter2.length) {
      return false;
    }
    for (let i = 0; i < filter1.length; i++) {
      if (!equalFilterParameters(filter1[i], filter2[i], langParams)) {
        return false;
      }
    }
    return true;
  }
  if (isFunction(filter1) && filter1.columnIndex >= 0 && isFunction(filter2) && filter2.columnIndex >= 0) {
    return filter1.columnIndex === filter2.columnIndex && toComparable(filter1.filterValue, void 0, langParams) === toComparable(filter2.filterValue, void 0, langParams) && toComparable(filter1.selectedFilterOperation, void 0, langParams) === toComparable(filter2.selectedFilterOperation, void 0, langParams);
  }
  return toComparable(filter1, void 0, langParams) == toComparable(filter2, void 0, langParams);
};
var createPoint = (options) => ({
  index: options.index,
  columnIndex: options.columnIndex,
  x: options.x,
  y: options.y
});
var addPointIfNeed = (points, pointProps, pointCreated) => {
  let notCreatePoint = false;
  if (pointCreated) {
    notCreatePoint = pointCreated(pointProps);
  }
  if (!notCreatePoint) {
    const point = createPoint(pointProps);
    points.push(point);
  }
};
function normalizeGroupingLoadOptions(group) {
  if (!Array.isArray(group)) {
    group = [group];
  }
  return group.map((item, i) => {
    if (isString(item)) {
      return {
        selector: item,
        isExpanded: i < group.length - 1
      };
    }
    return item;
  });
}
var m_utils_default = {
  renderNoDataText($element) {
    const that = this;
    $element = $element || this.element();
    if (!$element) {
      return;
    }
    const noDataClass = that.addWidgetPrefix("nodata");
    let noDataElement = $element.find(`.${noDataClass}`).last();
    const isVisible = this._dataController.isEmpty();
    const isLoading = this._dataController.isLoading();
    if (!noDataElement.length) {
      noDataElement = renderer_default("<span>").addClass(noDataClass);
    }
    if (!noDataElement.parent().is($element)) {
      noDataElement.appendTo($element);
    }
    if (isVisible && !isLoading) {
      noDataElement.removeClass("dx-hidden").text(that._getNoDataText());
    } else {
      noDataElement.addClass("dx-hidden");
    }
  },
  renderLoadPanel($element, $container, isLocalStore) {
    const that = this;
    let loadPanelOptions;
    that._loadPanel && that._loadPanel.$element().remove();
    loadPanelOptions = that.option("loadPanel");
    if (loadPanelOptions && ("auto" === loadPanelOptions.enabled ? !isLocalStore : loadPanelOptions.enabled)) {
      loadPanelOptions = extend({
        shading: false,
        message: loadPanelOptions.text,
        container: $container
      }, loadPanelOptions);
      that._loadPanel = that._createComponent(renderer_default("<div>").appendTo($container), load_panel_default, loadPanelOptions);
    } else {
      that._loadPanel = null;
    }
  },
  calculateLoadPanelPosition($element) {
    const $window = renderer_default(getWindow());
    if (getHeight($element) > getHeight($window)) {
      return {
        of: $window,
        boundary: $element,
        collision: "fit"
      };
    }
    return {
      of: $element
    };
  },
  getIndexByKey(key, items, keyName) {
    let index2 = -1;
    if (void 0 !== key && Array.isArray(items)) {
      keyName = arguments.length <= 2 ? "key" : keyName;
      for (let i = 0; i < items.length; i++) {
        const item = isDefined(keyName) ? items[i][keyName] : items[i];
        if (equalByValue(key, item)) {
          index2 = i;
          break;
        }
      }
    }
    return index2;
  },
  combineFilters(filters, operation) {
    let resultFilter = [];
    operation = operation || "and";
    for (let i = 0; i < filters.length; i++) {
      var _filters$i;
      if (!filters[i]) {
        continue;
      }
      if (1 === (null === (_filters$i = filters[i]) || void 0 === _filters$i ? void 0 : _filters$i.length) && "!" === filters[i][0]) {
        if ("and" === operation) {
          return ["!"];
        }
        if ("or" === operation) {
          continue;
        }
      }
      if (resultFilter.length) {
        resultFilter.push(operation);
      }
      resultFilter.push(filters[i]);
    }
    if (1 === resultFilter.length) {
      resultFilter = resultFilter[0];
    }
    if (resultFilter.length) {
      return resultFilter;
    }
    return;
  },
  checkChanges(changes, changeNames) {
    let changesWithChangeNamesCount = 0;
    for (let i = 0; i < changeNames.length; i++) {
      if (changes[changeNames[i]]) {
        changesWithChangeNamesCount++;
      }
    }
    return changes.length && changes.length === changesWithChangeNamesCount;
  },
  equalFilterParameters,
  proxyMethod(instance, methodName, defaultResult) {
    if (!instance[methodName]) {
      instance[methodName] = function() {
        const dataSource = this._dataSource;
        return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
      };
    }
  },
  formatValue: formatValue2,
  getFormatOptionsByColumn: (column, target) => ({
    format: column.format,
    getDisplayFormat: column.getDisplayFormat,
    customizeText: column.customizeText,
    target,
    trueText: column.trueText,
    falseText: column.falseText
  }),
  getDisplayValue(column, value2, data2, rowType) {
    if (column.displayValueMap && void 0 !== column.displayValueMap[value2]) {
      return column.displayValueMap[value2];
    }
    if (column.calculateDisplayValue && data2 && "group" !== rowType) {
      return column.calculateDisplayValue(data2);
    }
    if (column.lookup && !("group" === rowType && (column.calculateGroupValue || column.calculateDisplayValue))) {
      return column.lookup.calculateCellValue(value2);
    }
    return value2;
  },
  getGroupRowSummaryText(summaryItems, summaryTexts) {
    let result = "(";
    for (let i = 0; i < summaryItems.length; i++) {
      const summaryItem = summaryItems[i];
      result += (i > 0 ? ", " : "") + getSummaryText(summaryItem, summaryTexts);
    }
    return result + ")";
  },
  getSummaryText,
  normalizeSortingInfo: normalizeSortingInfo2,
  getFormatByDataType(dataType) {
    switch (dataType) {
      case "date":
        return "shortDate";
      case "datetime":
        return "shortDateShortTime";
      default:
        return;
    }
  },
  getHeaderFilterGroupParameters(column, remoteGrouping) {
    let result = [];
    const dataField = column.dataField || column.name;
    const groupInterval = filtering_default.getGroupInterval(column);
    if (groupInterval) {
      each(groupInterval, (index2, interval) => {
        result.push(remoteGrouping ? {
          selector: dataField,
          groupInterval: interval,
          isExpanded: index2 < groupInterval.length - 1
        } : getIntervalSelector.bind(column, interval));
      });
      return result;
    }
    if (remoteGrouping) {
      result = [{
        selector: dataField,
        isExpanded: false
      }];
    } else {
      result = function(data2) {
        let result2 = column.calculateCellValue(data2);
        if (void 0 === result2 || "" === result2) {
          result2 = null;
        }
        return result2;
      };
      if (column.sortingMethod) {
        result = [{
          selector: result,
          compare: column.sortingMethod.bind(column)
        }];
      }
    }
    return result;
  },
  equalSortParameters(sortParameters1, sortParameters2, ignoreIsExpanded) {
    sortParameters1 = normalizeSortingInfo2(sortParameters1);
    sortParameters2 = normalizeSortingInfo2(sortParameters2);
    if (Array.isArray(sortParameters1) && Array.isArray(sortParameters2)) {
      if (sortParameters1.length !== sortParameters2.length) {
        return false;
      }
      for (let i = 0; i < sortParameters1.length; i++) {
        if (!equalSelectors(sortParameters1[i].selector, sortParameters2[i].selector) || sortParameters1[i].desc !== sortParameters2[i].desc || sortParameters1[i].groupInterval !== sortParameters2[i].groupInterval || !ignoreIsExpanded && Boolean(sortParameters1[i].isExpanded) !== Boolean(sortParameters2[i].isExpanded)) {
          return false;
        }
      }
      return true;
    }
    return (!sortParameters1 || !sortParameters1.length) === (!sortParameters2 || !sortParameters2.length);
  },
  getPointsByColumns(items, pointCreated) {
    let isVertical = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
    let startColumnIndex = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    let needToCheckPrevPoint = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    const result = [];
    const cellsLength = items.length;
    let $item;
    let offset2 = {
      left: 0,
      top: 0
    };
    let itemRect = {
      width: 0,
      height: 0
    };
    let columnIndex = startColumnIndex;
    let rtlEnabled;
    for (let i = 0; i <= cellsLength; i++) {
      var _$item;
      if (i < cellsLength) {
        $item = items.eq(i);
        offset2 = $item.offset();
        itemRect = getBoundingRect($item.get(0));
        rtlEnabled = "rtl" === $item.css("direction");
      }
      const offsetRight = offset2.left + itemRect.width;
      const offsetBottom = offset2.top + itemRect.height;
      const pointProps = {
        index: columnIndex,
        columnIndex,
        item: null === (_$item = $item) || void 0 === _$item ? void 0 : _$item.get(0),
        x: !isVertical && rtlEnabled !== (i === cellsLength) ? offsetRight : offset2.left,
        y: isVertical && i === cellsLength ? offsetBottom : offset2.top
      };
      if (!isVertical && i > 0) {
        const prevItemOffset = items.eq(i - 1).offset();
        const {
          width: prevItemWidth
        } = getBoundingRect(items[i - 1]);
        const prevItemOffsetX = rtlEnabled ? prevItemOffset.left : prevItemOffset.left + prevItemWidth;
        if (prevItemOffset.top < pointProps.y) {
          pointProps.y = prevItemOffset.top;
        }
        if (needToCheckPrevPoint && Math.round(prevItemOffsetX) !== Math.round(pointProps.x)) {
          const prevPointProps = _extends({}, pointProps, {
            item: items[i - 1],
            x: prevItemOffsetX
          });
          if (rtlEnabled) {
            pointProps.isRightBoundary = true;
            prevPointProps.isLeftBoundary = true;
          } else {
            pointProps.isLeftBoundary = true;
            prevPointProps.isRightBoundary = true;
          }
          addPointIfNeed(result, prevPointProps, pointCreated);
        }
      }
      addPointIfNeed(result, pointProps, pointCreated);
      columnIndex++;
    }
    return result;
  },
  getExpandCellTemplate: () => ({
    allowRenderToDetachedContainer: true,
    render(container, options) {
      const $container = renderer_default(container);
      if (isDefined(options.value) && !(options.data && options.data.isContinuation) && !options.row.isNewRow) {
        const rowsView = options.component.getView("rowsView");
        $container.addClass("dx-datagrid-expand").addClass("dx-selection-disabled");
        renderer_default("<div>").addClass(options.value ? "dx-datagrid-group-opened" : "dx-datagrid-group-closed").appendTo($container);
        rowsView.setAria("label", options.value ? rowsView.localize("dxDataGrid-ariaCollapse") : rowsView.localize("dxDataGrid-ariaExpand"), $container);
      } else {
        setEmptyText($container);
      }
    }
  }),
  setEmptyText,
  isDateType: isDateType2,
  getSelectionRange(focusedElement) {
    try {
      if (focusedElement) {
        return {
          selectionStart: focusedElement.selectionStart,
          selectionEnd: focusedElement.selectionEnd
        };
      }
    } catch (e) {
    }
    return {};
  },
  setSelectionRange(focusedElement, selectionRange) {
    try {
      if (focusedElement && focusedElement.setSelectionRange) {
        focusedElement.setSelectionRange(selectionRange.selectionStart, selectionRange.selectionEnd);
      }
    } catch (e) {
    }
  },
  focusAndSelectElement(component, $element) {
    const isFocused = $element.is(":focus");
    m_events_engine_default.trigger($element, "focus");
    const isSelectTextOnEditingStart = component.option("editing.selectTextOnEditStart");
    const element = $element.get(0);
    if (!isFocused && isSelectTextOnEditingStart && $element.is(".dx-texteditor-input") && !$element.is("[readonly]")) {
      const editor = getWidgetInstance($element.closest(".dx-texteditor"));
      when(editor && editor._loadItemDeferred).done(() => {
        element.select();
      });
    }
  },
  getWidgetInstance,
  getLastResizableColumnIndex(columns, resultWidths) {
    const hasResizableColumns = columns.some((column) => column && !column.command && !column.fixed && false !== column.allowResizing);
    let lastColumnIndex;
    for (lastColumnIndex = columns.length - 1; columns[lastColumnIndex]; lastColumnIndex--) {
      const column = columns[lastColumnIndex];
      const width = resultWidths && resultWidths[lastColumnIndex];
      const allowResizing = !hasResizableColumns || false !== column.allowResizing;
      if (!column.command && !column.fixed && "adaptiveHidden" !== width && allowResizing) {
        break;
      }
    }
    return lastColumnIndex;
  },
  isElementInCurrentGrid(controller, $element) {
    if ($element && $element.length) {
      const $grid = $element.closest(`.${controller.getWidgetContainerClass()}`).parent();
      return $grid.is(controller.component.$element());
    }
    return false;
  },
  isVirtualRowRendering(that) {
    const rowRenderingMode = that.option(ROW_RENDERING_MODE_OPTION);
    const isVirtualMode = "virtual" === that.option("scrolling.mode");
    const isAppendMode = "infinite" === that.option("scrolling.mode");
    if (false === that.option(LEGACY_SCROLLING_MODE) && (isVirtualMode || isAppendMode)) {
      return true;
    }
    return "virtual" === rowRenderingMode;
  },
  getPixelRatio: (window11) => window11.devicePixelRatio || 1,
  getContentHeightLimit(browser2) {
    if (browser2.mozilla) {
      return 8e6;
    }
    return 15e6 / this.getPixelRatio(getWindow());
  },
  normalizeLookupDataSource(lookup) {
    let lookupDataSourceOptions;
    if (lookup.items) {
      lookupDataSourceOptions = lookup.items;
    } else {
      lookupDataSourceOptions = lookup.dataSource;
      if (isFunction(lookupDataSourceOptions) && !variable_wrapper_default.isWrapped(lookupDataSourceOptions)) {
        lookupDataSourceOptions = lookupDataSourceOptions({});
      }
    }
    return normalizeDataSourceOptions(lookupDataSourceOptions);
  },
  getWrappedLookupDataSource(column, dataSource, filter) {
    if (!dataSource) {
      return [];
    }
    const lookupDataSourceOptions = this.normalizeLookupDataSource(column.lookup);
    if (column.calculateCellValue !== column.defaultCalculateCellValue) {
      return lookupDataSourceOptions;
    }
    const hasGroupPaging = dataSource.remoteOperations().groupPaging;
    const hasLookupOptimization = column.displayField && isString(column.displayField);
    let cachedUniqueRelevantItems;
    let previousTake;
    let previousSkip;
    const sliceItems = (items, loadOptions) => {
      const start = loadOptions.skip ?? 0;
      const end = loadOptions.take ? start + loadOptions.take : items.length;
      return items.slice(start, end);
    };
    const lookupDataSource = _extends({}, lookupDataSourceOptions, {
      __dataGridSourceFilter: filter,
      load: (loadOptions) => {
        const d = new Deferred();
        ((loadOptions2) => {
          const group = normalizeGroupingLoadOptions(hasLookupOptimization ? [column.dataField, column.displayField] : column.dataField);
          const d2 = new Deferred();
          const canUseCache = cachedUniqueRelevantItems && (!hasGroupPaging || loadOptions2.skip === previousSkip && loadOptions2.take === previousTake);
          if (canUseCache) {
            d2.resolve(sliceItems(cachedUniqueRelevantItems, loadOptions2));
          } else {
            previousSkip = loadOptions2.skip;
            previousTake = loadOptions2.take;
            dataSource.load({
              filter,
              group,
              take: hasGroupPaging ? loadOptions2.take : void 0,
              skip: hasGroupPaging ? loadOptions2.skip : void 0
            }).done((items) => {
              cachedUniqueRelevantItems = items;
              d2.resolve(hasGroupPaging ? items : sliceItems(items, loadOptions2));
            }).fail(d2.fail);
          }
          return d2;
        })(loadOptions).done((items) => {
          if (0 === items.length) {
            d.resolve([]);
            return;
          }
          const filter2 = this.combineFilters(items.flatMap((data2) => data2.key).map((key) => [column.lookup.valueExpr, key]), "or");
          const newDataSource = new data_source_default(_extends({}, lookupDataSourceOptions, loadOptions, {
            filter: this.combineFilters([filter2, loadOptions.filter], "and"),
            paginate: false
          }));
          newDataSource.load().done(d.resolve).fail(d.fail);
        }).fail(d.fail);
        return d;
      },
      key: column.lookup.valueExpr,
      byKey(key) {
        const d = Deferred();
        this.load({
          filter: [column.lookup.valueExpr, "=", key]
        }).done((arr) => {
          d.resolve(arr[0]);
        });
        return d.promise();
      }
    });
    return lookupDataSource;
  },
  logHeaderFilterDeprecatedWarningIfNeed(component) {
    const logWarning = component._logDeprecatedOptionWarning.bind(component);
    if (isDefined(component.option("headerFilter.allowSearch"))) {
      logWarning("headerFilter.allowSearch", {
        since: "23.1",
        alias: "headerFilter.search.enabled"
      });
    }
    if (isDefined(component.option("headerFilter.searchTimeout"))) {
      logWarning("headerFilter.searchTimeout", {
        since: "23.1",
        alias: "headerFilter.search.timeout"
      });
    }
    const specificName = "dxPivotGrid" === component.NAME ? "dataSource.fields" : "columns";
    const columns = component.option(specificName);
    if (!Array.isArray(columns)) {
      return;
    }
    const logSpecificDeprecatedWarningIfNeed = (columns2) => {
      columns2.forEach((column) => {
        var _column$columns;
        const headerFilter = column.headerFilter || {};
        if (isDefined(headerFilter.allowSearch)) {
          logWarning(`${specificName}[].headerFilter.allowSearch`, {
            since: "23.1",
            alias: `${specificName}[].headerFilter.search.enabled`
          });
        }
        if (isDefined(headerFilter.searchMode)) {
          logWarning(`${specificName}[].headerFilter.searchMode`, {
            since: "23.1",
            alias: `${specificName}[].headerFilter.search.mode`
          });
        }
        if (null !== (_column$columns = column.columns) && void 0 !== _column$columns && _column$columns.length) {
          logSpecificDeprecatedWarningIfNeed(column.columns);
        }
      });
    };
    logSpecificDeprecatedWarningIfNeed(columns);
  },
  getComponentBorderWidth(that, $rowsViewElement) {
    const borderWidth = that.option("showBorders") ? Math.ceil(getOuterWidth($rowsViewElement) - getInnerWidth($rowsViewElement)) : 0;
    return borderWidth;
  },
  isCustomCommandColumn(columns, commandColumn) {
    const customCommandColumns = columns.filter((column) => column.type === commandColumn.type);
    return !!customCommandColumns.length;
  }
};

// node_modules/devextreme/esm/exporter/common/export_load_panel.js
var ExportLoadPanel = class {
  constructor(component, $targetElement, $container, options) {
    this._$targetElement = $targetElement;
    this._$container = $container;
    this._loadPanel = component._createComponent(renderer_default("<div>").addClass("dx-export-loadpanel").appendTo(this._$container), load_panel_default, this.getOptions(options));
  }
  getDefaultOptions() {
    return {
      animation: null,
      shading: false,
      height: 90,
      width: 200,
      container: this._$container
    };
  }
  getOptions(options) {
    if (isDefined(options.text)) {
      options.message = options.text;
    } else {
      options.message = message_default.format("dxDataGrid-exporting");
    }
    return extend(this.getDefaultOptions(), options);
  }
  show() {
    this._loadPanel.option("position", m_utils_default.calculateLoadPanelPosition(this._$targetElement));
    this._loadPanel.show();
  }
  dispose() {
    renderer_default(this._loadPanel.element()).remove();
    delete this._loadPanel;
  }
};

export {
  sign,
  fitIntoRange,
  inRange,
  getExponent,
  adjust,
  getPrecision,
  solveCubicEquation,
  trunc,
  getRemainderByDivision,
  getExponentLength,
  roundFloatPart,
  toFixed,
  getFormat,
  core_default,
  number_default2 as number_default,
  getFormat2,
  getRegExpInfo,
  getPatternSetters,
  default_date_names_default,
  date_default3 as date_default,
  message_default,
  m_event_registrator_default,
  removeEvent,
  getName,
  attachInstanceToElement,
  getInstanceByElement,
  component_registrator_default,
  EventsStrategy,
  resize_callbacks_default,
  getSessionStorage,
  value,
  originalViewPort,
  m_devices_default,
  hide_top_overlay_default,
  inputType,
  pointerEvents,
  m_support_default,
  init_mobile_viewport_default,
  dateUtilsTs,
  date_serialization_default,
  AppointmentDataAccessor,
  macro_task_array_default,
  dateUtils,
  date_default as date_default2,
  m_utils_time_zone_default,
  getTimeZones2 as getTimeZones,
  devices_default,
  ui_errors_default,
  current,
  isMaterialBased,
  isMaterial,
  isFluent,
  isGeneric,
  isCompact,
  waitWebFont,
  requestAnimationFrame,
  cancelAnimationFrame,
  getPublicElement,
  locate,
  move,
  resetPosition,
  getDefaultAlignment,
  getBoundingRect,
  browser_default,
  position_default,
  focusable,
  tabbable,
  focused,
  isPointerEvent,
  isMouseEvent,
  isDxMouseWheelEvent,
  isTouchEvent,
  isFakeClickEvent,
  eventData,
  eventDelta,
  hasTouches,
  needSkipEvent,
  createEvent,
  fireEvent,
  normalizeKeyName,
  getChar,
  addNamespace2 as addNamespace,
  isCommandKeyPressed,
  fx_default,
  action_default,
  convertRulesToOptions,
  normalizeOptions,
  getFieldName,
  createDefaultOptionRules,
  equals,
  Component,
  presets_default,
  TransitionExecutor,
  transition_executor_default,
  m_emitter_default,
  EVENT_NAME,
  m_pointer_default,
  m_emitter_registrator_default,
  closestCommonParent,
  clipboardText,
  contains,
  createTextElementHiddenCopy,
  replaceWith,
  isElementInDom,
  m_dom_default,
  CLICK_EVENT_NAME,
  ACTIVE_EVENT_NAME,
  lock,
  HOVERSTART,
  HOVEREND,
  m_keyboard_processor_default,
  resize,
  visibility,
  focus,
  dxClick,
  click,
  keyboard,
  compare,
  _objectWithoutPropertiesLoose,
  triggerShownEvent2 as triggerShownEvent,
  triggerResizeEvent2 as triggerResizeEvent,
  TemplateBase,
  EmptyTemplate,
  FunctionTemplate,
  ChildDefaultTemplate,
  wrapToArray,
  getUniqueValues,
  getIntersection,
  removeDuplicates,
  normalizeIndexes,
  findTemplates,
  dom_component_default,
  FOCUSED_STATE_CLASS,
  widget_default,
  load_indicator_default,
  m_emitter_gesture_default,
  DRAG_START_EVENT,
  DRAG_EVENT,
  DRAG_END_EVENT,
  DRAG_ENTER_EVENT,
  DRAG_LEAVE_EVENT,
  DROP_EVENT,
  swatch_container_default,
  OverlayPositionController,
  create,
  remove2 as remove,
  isLastZIndexInStack,
  m_overlay_default,
  m_load_panel_default,
  load_panel_default,
  errors,
  errorHandler,
  handleError,
  setErrorHandler,
  XHR_ERROR_UNLOAD,
  normalizeBinaryCriterion,
  normalizeSortingInfo,
  errorMessageFromXhr,
  aggregators,
  isConjunctiveOperator,
  keysEqual,
  base64_encode,
  isUnaryOperation,
  createObjectWithChanges,
  applyBatch,
  applyChanges,
  update,
  insert,
  indexByKey,
  m_store_helper_default,
  m_abstract_store_default,
  m_custom_store_default,
  isLoadResultObject,
  isGroupItemsArray,
  isItemsArray,
  query_adapters_default,
  m_query_default,
  m_array_store_default,
  normalizeLoadResult,
  normalizeDataSourceOptions,
  DataSource,
  data_source_default,
  format_helper_default,
  filtering_default,
  m_utils_default,
  ExportLoadPanel
};
//# sourceMappingURL=chunk-2SPVQWIC.js.map
