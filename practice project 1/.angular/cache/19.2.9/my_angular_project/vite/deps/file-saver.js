import {
  __commonJS
} from "./chunk-NJ4VOZBH.js";

// node_modules/file-saver/dist/FileSaver.min.js
var require_FileSaver_min = __commonJS({
  "node_modules/file-saver/dist/FileSaver.min.js"(exports, module) {
    (function(a, b) {
      if ("function" == typeof define && define.amd) define([], b);
      else if ("undefined" != typeof exports) b();
      else {
        b(), a.FileSaver = {
          exports: {}
        }.exports;
      }
    })(exports, function() {
      "use strict";
      function b(a2, b2) {
        return "undefined" == typeof b2 ? b2 = {
          autoBom: false
        } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = {
          autoBom: !b2
        }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], {
          type: a2.type
        }) : a2;
      }
      function c(b2, c2, d2) {
        var e2 = new XMLHttpRequest();
        e2.open("GET", b2), e2.responseType = "blob", e2.onload = function() {
          a(e2.response, c2, d2);
        }, e2.onerror = function() {
          console.error("could not download file");
        }, e2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, false);
        try {
          b2.send();
        } catch (a3) {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch (c2) {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0, a = f.saveAs || ("object" != typeof window || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype ? function(b2, g, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g = g || b2.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g, h) {
        if (g = g || f2.name || "download", "string" != typeof f2) navigator.msSaveOrOpenBlob(b(f2, h), g);
        else if (d(f2)) c(f2, g, h);
        else {
          var i = document.createElement("a");
          i.href = f2, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(a2, b2, d2, e2) {
        if (e2 = e2 || open("", "_blank"), e2 && (e2.document.title = e2.document.body.innerText = "downloading..."), "string" == typeof a2) return c(a2, b2, d2);
        var g = "application/octet-stream" === a2.type, h = /constructor/i.test(f.HTMLElement) || f.safari, i = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((i || g && h) && "object" == typeof FileReader) {
          var j = new FileReader();
          j.onloadend = function() {
            var a3 = j.result;
            a3 = i ? a3 : a3.replace(/^data:[^;]*;/, "data:attachment/file;"), e2 ? e2.location.href = a3 : location = a3, e2 = null;
          }, j.readAsDataURL(a2);
        } else {
          var k = f.URL || f.webkitURL, l = k.createObjectURL(a2);
          e2 ? e2.location = l : location.href = l, e2 = null, setTimeout(function() {
            k.revokeObjectURL(l);
          }, 4e4);
        }
      });
      f.saveAs = a.saveAs = a, "undefined" != typeof module && (module.exports = a);
    });
  }
});
export default require_FileSaver_min();
//# sourceMappingURL=file-saver.js.map
