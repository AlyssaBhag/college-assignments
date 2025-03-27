/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/navigo/lib/navigo.min.js":
/*!***********************************************!*\
  !*** ./node_modules/navigo/lib/navigo.min.js ***!
  \***********************************************/
/***/ (function(module) {

!function (t, n) {
   true ? module.exports = n() : 0;
}("undefined" != typeof self ? self : this, function () {
  return function () {
    "use strict";

    var t = {
        407: function (t, n, e) {
          e.d(n, {
            default: function () {
              return N;
            }
          });
          var o = /([:*])(\w+)/g,
            r = /\*/g,
            i = /\/\?/g;
          function a(t) {
            return void 0 === t && (t = "/"), v() ? location.pathname + location.search + location.hash : t;
          }
          function s(t) {
            return t.replace(/\/+$/, "").replace(/^\/+/, "");
          }
          function c(t) {
            return "string" == typeof t;
          }
          function u(t) {
            return t && t.indexOf("#") >= 0 && t.split("#").pop() || "";
          }
          function h(t) {
            var n = s(t).split(/\?(.*)?$/);
            return [s(n[0]), n.slice(1).join("")];
          }
          function f(t) {
            for (var n = {}, e = t.split("&"), o = 0; o < e.length; o++) {
              var r = e[o].split("=");
              if ("" !== r[0]) {
                var i = decodeURIComponent(r[0]);
                n[i] ? (Array.isArray(n[i]) || (n[i] = [n[i]]), n[i].push(decodeURIComponent(r[1] || ""))) : n[i] = decodeURIComponent(r[1] || "");
              }
            }
            return n;
          }
          function l(t, n) {
            var e,
              a = h(s(t.currentLocationPath)),
              l = a[0],
              p = a[1],
              d = "" === p ? null : f(p),
              v = [];
            if (c(n.path)) {
              if (e = "(?:/^|^)" + s(n.path).replace(o, function (t, n, e) {
                return v.push(e), "([^/]+)";
              }).replace(r, "?(?:.*)").replace(i, "/?([^/]+|)") + "$", "" === s(n.path) && "" === s(l)) return {
                url: l,
                queryString: p,
                hashString: u(t.to),
                route: n,
                data: null,
                params: d
              };
            } else e = n.path;
            var g = new RegExp(e, ""),
              m = l.match(g);
            if (m) {
              var y = c(n.path) ? function (t, n) {
                return 0 === n.length ? null : t ? t.slice(1, t.length).reduce(function (t, e, o) {
                  return null === t && (t = {}), t[n[o]] = decodeURIComponent(e), t;
                }, null) : null;
              }(m, v) : m.groups ? m.groups : m.slice(1);
              return {
                url: s(l.replace(new RegExp("^" + t.instance.root), "")),
                queryString: p,
                hashString: u(t.to),
                route: n,
                data: y,
                params: d
              };
            }
            return !1;
          }
          function p() {
            return !("undefined" == typeof window || !window.history || !window.history.pushState);
          }
          function d(t, n) {
            return void 0 === t[n] || !0 === t[n];
          }
          function v() {
            return "undefined" != typeof window;
          }
          function g(t, n) {
            return void 0 === t && (t = []), void 0 === n && (n = {}), t.filter(function (t) {
              return t;
            }).forEach(function (t) {
              ["before", "after", "already", "leave"].forEach(function (e) {
                t[e] && (n[e] || (n[e] = []), n[e].push(t[e]));
              });
            }), n;
          }
          function m(t, n, e) {
            var o = n || {},
              r = 0;
            !function n() {
              t[r] ? Array.isArray(t[r]) ? (t.splice.apply(t, [r, 1].concat(t[r][0](o) ? t[r][1] : t[r][2])), n()) : t[r](o, function (t) {
                void 0 === t || !0 === t ? (r += 1, n()) : e && e(o);
              }) : e && e(o);
            }();
          }
          function y(t, n) {
            void 0 === t.currentLocationPath && (t.currentLocationPath = t.to = a(t.instance.root)), t.currentLocationPath = t.instance._checkForAHash(t.currentLocationPath), n();
          }
          function _(t, n) {
            for (var e = 0; e < t.instance.routes.length; e++) {
              var o = l(t, t.instance.routes[e]);
              if (o && (t.matches || (t.matches = []), t.matches.push(o), "ONE" === t.resolveOptions.strategy)) return void n();
            }
            n();
          }
          function k(t, n) {
            t.navigateOptions && (void 0 !== t.navigateOptions.shouldResolve && console.warn('"shouldResolve" is deprecated. Please check the documentation.'), void 0 !== t.navigateOptions.silent && console.warn('"silent" is deprecated. Please check the documentation.')), n();
          }
          function O(t, n) {
            !0 === t.navigateOptions.force ? (t.instance._setCurrent([t.instance._pathToMatchObject(t.to)]), n(!1)) : n();
          }
          m.if = function (t, n, e) {
            return Array.isArray(n) || (n = [n]), Array.isArray(e) || (e = [e]), [t, n, e];
          };
          var w = v(),
            L = p();
          function b(t, n) {
            if (d(t.navigateOptions, "updateBrowserURL")) {
              var e = ("/" + t.to).replace(/\/\//g, "/"),
                o = w && t.resolveOptions && !0 === t.resolveOptions.hash;
              L ? (history[t.navigateOptions.historyAPIMethod || "pushState"](t.navigateOptions.stateObj || {}, t.navigateOptions.title || "", o ? "#" + e : e), location && location.hash && (t.instance.__freezeListening = !0, setTimeout(function () {
                if (!o) {
                  var n = location.hash;
                  location.hash = "", location.hash = n;
                }
                t.instance.__freezeListening = !1;
              }, 1))) : w && (window.location.href = t.to);
            }
            n();
          }
          function A(t, n) {
            var e = t.instance;
            e.lastResolved() ? m(e.lastResolved().map(function (n) {
              return function (e, o) {
                if (n.route.hooks && n.route.hooks.leave) {
                  var r = !1,
                    i = t.instance.matchLocation(n.route.path, t.currentLocationPath, !1);
                  r = "*" !== n.route.path ? !i : !(t.matches && t.matches.find(function (t) {
                    return n.route.path === t.route.path;
                  })), d(t.navigateOptions, "callHooks") && r ? m(n.route.hooks.leave.map(function (n) {
                    return function (e, o) {
                      return n(function (n) {
                        !1 === n ? t.instance.__markAsClean(t) : o();
                      }, t.matches && t.matches.length > 0 ? 1 === t.matches.length ? t.matches[0] : t.matches : void 0);
                    };
                  }).concat([function () {
                    return o();
                  }])) : o();
                } else o();
              };
            }), {}, function () {
              return n();
            }) : n();
          }
          function P(t, n) {
            d(t.navigateOptions, "updateState") && t.instance._setCurrent(t.matches), n();
          }
          var R = [function (t, n) {
              var e = t.instance.lastResolved();
              if (e && e[0] && e[0].route === t.match.route && e[0].url === t.match.url && e[0].queryString === t.match.queryString) return e.forEach(function (n) {
                n.route.hooks && n.route.hooks.already && d(t.navigateOptions, "callHooks") && n.route.hooks.already.forEach(function (n) {
                  return n(t.match);
                });
              }), void n(!1);
              n();
            }, function (t, n) {
              t.match.route.hooks && t.match.route.hooks.before && d(t.navigateOptions, "callHooks") ? m(t.match.route.hooks.before.map(function (n) {
                return function (e, o) {
                  return n(function (n) {
                    !1 === n ? t.instance.__markAsClean(t) : o();
                  }, t.match);
                };
              }).concat([function () {
                return n();
              }])) : n();
            }, function (t, n) {
              d(t.navigateOptions, "callHandler") && t.match.route.handler(t.match), t.instance.updatePageLinks(), n();
            }, function (t, n) {
              t.match.route.hooks && t.match.route.hooks.after && d(t.navigateOptions, "callHooks") && t.match.route.hooks.after.forEach(function (n) {
                return n(t.match);
              }), n();
            }],
            S = [A, function (t, n) {
              var e = t.instance._notFoundRoute;
              if (e) {
                t.notFoundHandled = !0;
                var o = h(t.currentLocationPath),
                  r = o[0],
                  i = o[1],
                  a = u(t.to);
                e.path = s(r);
                var c = {
                  url: e.path,
                  queryString: i,
                  hashString: a,
                  data: null,
                  route: e,
                  params: "" !== i ? f(i) : null
                };
                t.matches = [c], t.match = c;
              }
              n();
            }, m.if(function (t) {
              return t.notFoundHandled;
            }, R.concat([P]), [function (t, n) {
              t.resolveOptions && !1 !== t.resolveOptions.noMatchWarning && void 0 !== t.resolveOptions.noMatchWarning || console.warn('Navigo: "' + t.currentLocationPath + "\" didn't match any of the registered routes."), n();
            }, function (t, n) {
              t.instance._setCurrent(null), n();
            }])];
          function E() {
            return (E = Object.assign || function (t) {
              for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
              }
              return t;
            }).apply(this, arguments);
          }
          function x(t, n) {
            var e = 0;
            A(t, function o() {
              e !== t.matches.length ? m(R, E({}, t, {
                match: t.matches[e]
              }), function () {
                e += 1, o();
              }) : P(t, n);
            });
          }
          function H(t) {
            t.instance.__markAsClean(t);
          }
          function j() {
            return (j = Object.assign || function (t) {
              for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
              }
              return t;
            }).apply(this, arguments);
          }
          var C = "[data-navigo]";
          function N(t, n) {
            var e,
              o = n || {
                strategy: "ONE",
                hash: !1,
                noMatchWarning: !1,
                linksSelector: C
              },
              r = this,
              i = "/",
              d = null,
              w = [],
              L = !1,
              A = p(),
              P = v();
            function R(t) {
              return t.indexOf("#") >= 0 && (t = !0 === o.hash ? t.split("#")[1] || "/" : t.split("#")[0]), t;
            }
            function E(t) {
              return s(i + "/" + s(t));
            }
            function N(t, n, e, o) {
              return t = c(t) ? E(t) : t, {
                name: o || s(String(t)),
                path: t,
                handler: n,
                hooks: g(e)
              };
            }
            function U(t, n) {
              if (!r.__dirty) {
                r.__dirty = !0, t = t ? s(i) + "/" + s(t) : void 0;
                var e = {
                  instance: r,
                  to: t,
                  currentLocationPath: t,
                  navigateOptions: {},
                  resolveOptions: j({}, o, n)
                };
                return m([y, _, m.if(function (t) {
                  var n = t.matches;
                  return n && n.length > 0;
                }, x, S)], e, H), !!e.matches && e.matches;
              }
              r.__waiting.push(function () {
                return r.resolve(t, n);
              });
            }
            function q(t, n) {
              if (r.__dirty) r.__waiting.push(function () {
                return r.navigate(t, n);
              });else {
                r.__dirty = !0, t = s(i) + "/" + s(t);
                var e = {
                  instance: r,
                  to: t,
                  navigateOptions: n || {},
                  resolveOptions: n && n.resolveOptions ? n.resolveOptions : o,
                  currentLocationPath: R(t)
                };
                m([k, O, _, m.if(function (t) {
                  var n = t.matches;
                  return n && n.length > 0;
                }, x, S), b, H], e, H);
              }
            }
            function F() {
              if (P) return (P ? [].slice.call(document.querySelectorAll(o.linksSelector || C)) : []).forEach(function (t) {
                "false" !== t.getAttribute("data-navigo") && "_blank" !== t.getAttribute("target") ? t.hasListenerAttached || (t.hasListenerAttached = !0, t.navigoHandler = function (n) {
                  if ((n.ctrlKey || n.metaKey) && "a" === n.target.tagName.toLowerCase()) return !1;
                  var e = t.getAttribute("href");
                  if (null == e) return !1;
                  if (e.match(/^(http|https)/) && "undefined" != typeof URL) try {
                    var o = new URL(e);
                    e = o.pathname + o.search;
                  } catch (t) {}
                  var i = function (t) {
                    if (!t) return {};
                    var n,
                      e = t.split(","),
                      o = {};
                    return e.forEach(function (t) {
                      var e = t.split(":").map(function (t) {
                        return t.replace(/(^ +| +$)/g, "");
                      });
                      switch (e[0]) {
                        case "historyAPIMethod":
                          o.historyAPIMethod = e[1];
                          break;
                        case "resolveOptionsStrategy":
                          n || (n = {}), n.strategy = e[1];
                          break;
                        case "resolveOptionsHash":
                          n || (n = {}), n.hash = "true" === e[1];
                          break;
                        case "updateBrowserURL":
                        case "callHandler":
                        case "updateState":
                        case "force":
                          o[e[0]] = "true" === e[1];
                      }
                    }), n && (o.resolveOptions = n), o;
                  }(t.getAttribute("data-navigo-options"));
                  L || (n.preventDefault(), n.stopPropagation(), r.navigate(s(e), i));
                }, t.addEventListener("click", t.navigoHandler)) : t.hasListenerAttached && t.removeEventListener("click", t.navigoHandler);
              }), r;
            }
            function I(t, n, e) {
              var o = w.find(function (n) {
                  return n.name === t;
                }),
                r = null;
              if (o) {
                if (r = o.path, n) for (var a in n) r = r.replace(":" + a, n[a]);
                r = r.match(/^\//) ? r : "/" + r;
              }
              return r && e && !e.includeRoot && (r = r.replace(new RegExp("^/" + i), "")), r;
            }
            function M(t) {
              var n = h(s(t)),
                o = n[0],
                r = n[1],
                i = "" === r ? null : f(r);
              return {
                url: o,
                queryString: r,
                hashString: u(t),
                route: N(o, function () {}, [e], o),
                data: null,
                params: i
              };
            }
            function T(t, n, e) {
              return "string" == typeof n && (n = z(n)), n ? (n.hooks[t] || (n.hooks[t] = []), n.hooks[t].push(e), function () {
                n.hooks[t] = n.hooks[t].filter(function (t) {
                  return t !== e;
                });
              }) : (console.warn("Route doesn't exists: " + n), function () {});
            }
            function z(t) {
              return "string" == typeof t ? w.find(function (n) {
                return n.name === E(t);
              }) : w.find(function (n) {
                return n.handler === t;
              });
            }
            t ? i = s(t) : console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.'), this.root = i, this.routes = w, this.destroyed = L, this.current = d, this.__freezeListening = !1, this.__waiting = [], this.__dirty = !1, this.__markAsClean = function (t) {
              t.instance.__dirty = !1, t.instance.__waiting.length > 0 && t.instance.__waiting.shift()();
            }, this.on = function (t, n, o) {
              var r = this;
              return "object" != typeof t || t instanceof RegExp ? ("function" == typeof t && (o = n, n = t, t = i), w.push(N(t, n, [e, o])), this) : (Object.keys(t).forEach(function (n) {
                if ("function" == typeof t[n]) r.on(n, t[n]);else {
                  var o = t[n],
                    i = o.uses,
                    a = o.as,
                    s = o.hooks;
                  w.push(N(n, i, [e, s], a));
                }
              }), this);
            }, this.off = function (t) {
              return this.routes = w = w.filter(function (n) {
                return c(t) ? s(n.path) !== s(t) : "function" == typeof t ? t !== n.handler : String(n.path) !== String(t);
              }), this;
            }, this.resolve = U, this.navigate = q, this.navigateByName = function (t, n, e) {
              var o = I(t, n);
              return null !== o && (q(o.replace(new RegExp("^/?" + i), ""), e), !0);
            }, this.destroy = function () {
              this.routes = w = [], A && window.removeEventListener("popstate", this.__popstateListener), this.destroyed = L = !0;
            }, this.notFound = function (t, n) {
              return r._notFoundRoute = N("*", t, [e, n], "__NOT_FOUND__"), this;
            }, this.updatePageLinks = F, this.link = function (t) {
              return "/" + i + "/" + s(t);
            }, this.hooks = function (t) {
              return e = t, this;
            }, this.extractGETParameters = function (t) {
              return h(R(t));
            }, this.lastResolved = function () {
              return d;
            }, this.generate = I, this.getLinkPath = function (t) {
              return t.getAttribute("href");
            }, this.match = function (t) {
              var n = {
                instance: r,
                currentLocationPath: t,
                to: t,
                navigateOptions: {},
                resolveOptions: o
              };
              return _(n, function () {}), !!n.matches && n.matches;
            }, this.matchLocation = function (t, n, e) {
              void 0 === n || void 0 !== e && !e || (n = E(n));
              var o = {
                instance: r,
                to: n,
                currentLocationPath: n
              };
              return y(o, function () {}), "string" == typeof t && (t = void 0 === e || e ? E(t) : t), l(o, {
                name: String(t),
                path: t,
                handler: function () {},
                hooks: {}
              }) || !1;
            }, this.getCurrentLocation = function () {
              return M(s(a(i)).replace(new RegExp("^" + i), ""));
            }, this.addBeforeHook = T.bind(this, "before"), this.addAfterHook = T.bind(this, "after"), this.addAlreadyHook = T.bind(this, "already"), this.addLeaveHook = T.bind(this, "leave"), this.getRoute = z, this._pathToMatchObject = M, this._clean = s, this._checkForAHash = R, this._setCurrent = function (t) {
              return d = r.current = t;
            }, function () {
              A && (this.__popstateListener = function () {
                r.__freezeListening || U();
              }, window.addEventListener("popstate", this.__popstateListener));
            }.call(this), F.call(this);
          }
        }
      },
      n = {};
    function e(o) {
      if (n[o]) return n[o].exports;
      var r = n[o] = {
        exports: {}
      };
      return t[o](r, r.exports, e), r.exports;
    }
    return e.d = function (t, n) {
      for (var o in n) e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, {
        enumerable: !0,
        get: n[o]
      });
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e(407);
  }().default;
});

/***/ }),

/***/ "./src/client/app/components/footer/footer.ejs":
/*!*****************************************************!*\
  !*** ./src/client/app/components/footer/footer.ejs ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("\r\n    \r\n    <footer class=\"container\">\r\n        <p class=\"float-end\"><a href=\"#\">Back to top</a></p>\r\n        <p>&copy; <span id=\"copyright\"></span> Alyssa Bhagwandin. &middot; <a href=\"privacy-policy.html\">Privacy</a> &middot; <a href=\"terms.html\">Terms</a></p>\r\n      </footer>\r\n      \r\n      \r\n      <script src=\"../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js\"></script>\r\n      <script type=\"module\" src=\"app/app.js\"></script>\r\n      <script type=\"module\" src=\"app/animals/create.js\"></script>\r\n    \r\n  \r\n  ")
  }
  return __output;

}

/***/ }),

/***/ "./src/client/app/components/footer/footer.js":
/*!****************************************************!*\
  !*** ./src/client/app/components/footer/footer.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _footer_ejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.ejs */ "./src/client/app/components/footer/footer.ejs");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const html = _footer_ejs__WEBPACK_IMPORTED_MODULE_0__();
  document.getElementById('app').insertAdjacentElement('afterend', html);
});

/***/ }),

/***/ "./src/client/app/components/header/header.ejs":
/*!*****************************************************!*\
  !*** ./src/client/app/components/header/header.ejs ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("\r\n<!doctype html>\r\n<html lang=\"en\" data-bs-theme=\"auto\">\r\n  <head>\r\n    <meta charset=\"utf-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\r\n    <title>Home Page - INFT 2202</title>\r\n\r\n    \r\n    <link rel=\"stylesheet\" href=\"css/style.css\">\r\n    <link rel=\"icon\" type=\"image/x-icon\" href=\"img/Poké_Ball_icon.png\">\r\n    <link rel=\"stylesheet\" href=\"../../node_modules/@fortawesome/fontawesome-free/css/all.min.css\">\r\n    <link rel=\"stylesheet\" href=\"../../node_modules/bootstrap/dist/css/bootstrap.min.css\">\r\n  </head>\r\n  <body>\r\n    \r\n    <header>\r\n      <nav class=\"navbar navbar-expand-md fixed-top custom-navbar\">\r\n        <div class=\"container-fluid\">\r\n          <a class=\"navbar-brand active\" data-navigo=\"/\" href=\"index.ejs\"> <i class=\"fa-solid fa-circle-dot\"></i> Zookédex</a>\r\n          <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n          </button>\r\n          <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">\r\n            <ul class=\"navbar-nav me-auto mb-2 mb-md-0\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" data-navigo=\"/search\" href=\"search.ejs\"><i class=\"fas fa-list\"></i> List</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" data-navigo=\"/create\" href=\"create.ejs\"><i class=\"fas fa-plus\"></i> Create</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" data-navigo=\"/about\" href=\"about.ejs\"><i class=\"fas fa-info-circle\"></i> About</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" data-navigo=\"/contact\" href=\"contact.ejs\"><i class=\"fas fa-envelope\"></i> Contact</a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </nav>\r\n    </header>\r\n</body></html>")
  }
  return __output;

}

/***/ }),

/***/ "./src/client/app/components/header/header.js":
/*!****************************************************!*\
  !*** ./src/client/app/components/header/header.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _header_ejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.ejs */ "./src/client/app/components/header/header.ejs");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const html = _header_ejs__WEBPACK_IMPORTED_MODULE_0__();
  document.getElementById('app').insertAdjacentElement('beforebegin', html);
});

/***/ }),

/***/ "./src/client/app/components/pages/home/home.ejs":
/*!*******************************************************!*\
  !*** ./src/client/app/components/pages/home/home.ejs ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("\r\n<div id=\"myCarousel\" class=\"carousel slide mb-6\" data-bs-ride=\"carousel\">\r\n    <div class=\"carousel-indicators\">\r\n      <button type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide-to=\"0\" class=\"active\" aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n      <button type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide-to=\"1\" aria-label=\"Slide 2\"></button>\r\n      <button type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide-to=\"2\" aria-label=\"Slide 3\"></button>\r\n    </div>\r\n    <div class=\"carousel-inner\">\r\n      <div class=\"carousel-item active\">\r\n        <div class=\"container\">\r\n          <div class=\"carousel-caption text-start\">\r\n            <h1>Welcome to Zookédex!</h1>\r\n            <p class=\"opacity-75\">Your one-stop destination to discover, learn about, and add to an ever-growing collection of animals from around the world!</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"carousel-item\">\r\n        <div class=\"carousel-caption\">\r\n          <h1>Explore the Animal Kingdom!</h1>\r\n          <p>Delve into a rich variety of animals and uncover fascinating facts about each species. Perfect for animal lovers of all ages!</p>\r\n        </div>\r\n      </div>\r\n      <div class=\"carousel-item\">\r\n        <div class=\"container\">\r\n          <div class=\"carousel-caption text-end\">\r\n            <h1>Join the Zookédex Community!</h1>\r\n            <p>Become a part of our vibrant community. Add your favorite animals and share your knowledge with fellow enthusiasts!</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide=\"prev\">\r\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n      <span class=\"visually-hidden\">Previous</span>\r\n    </button>\r\n    <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide=\"next\">\r\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n      <span class=\"visually-hidden\">Next</span>\r\n    </button>\r\n  </div>\r\n  \r\n  <div class=\"container marketing\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-4\">\r\n        <img src=\"img/turtle.png\" class=\"rounded-circle\" width=\"140\" height=\"140\" alt=\"Add to Zookédex\">\r\n        <h2 class=\"fw-normal\">Add To Zookédex</h2>\r\n        <p>Here you can add to your collection of animals in the Zookédex!</p>\r\n        <p><a class=\"btn custom-btn\" href=\"create.html\">View page &raquo;</a></p>\r\n      </div>\r\n      <div class=\"col-lg-4 text-center\">\r\n        <img src=\"img/folder.png\" class=\"rounded-circle\" width=\"140\" height=\"140\" alt=\"Add to Zookédex\">\r\n        <h2 class=\"fw-normal\">Zookédex</h2>\r\n        <p>Here is where you can view the collection of the animals in the Zookédex!</p>\r\n        <p><a class=\"btn custom-btn\" href=\"list.html\">View page &raquo;</a></p>\r\n      </div>\r\n      <div class=\"col-lg-4\">\r\n        <img src=\"img/info.jpg\" class=\"rounded-circle\" width=\"140\" height=\"140\" alt=\"Add to Zookédex\">\r\n        <h2 class=\"fw-normal\">About Us</h2>\r\n        <p>Here you can learn all about us and what we do here at Zookédex.</p>\r\n        <p><a class=\"btn custom-btn\" href=\"about.html\">View page &raquo;</a></p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  ")
  }
  return __output;

}

/***/ }),

/***/ "./src/client/app/components/pages/home/home.js":
/*!******************************************************!*\
  !*** ./src/client/app/components/pages/home/home.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_ejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.ejs */ "./src/client/app/components/pages/home/home.ejs");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router => {
  console.log('index', router);
  render();
});
function render() {
  const html = _home_ejs__WEBPACK_IMPORTED_MODULE_0__({
    'random stuff': 'HEllowwwwww'
  });
  document.getElementById('app').innerHTML = html;
}

/***/ }),

/***/ "./src/client/scss/styles.scss":
/*!*************************************!*\
  !*** ./src/client/scss/styles.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var navigo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! navigo */ "./node_modules/navigo/lib/navigo.min.js");
/* harmony import */ var _app_components_header_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/components/header/header.js */ "./src/client/app/components/header/header.js");
/* harmony import */ var _app_components_footer_footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/components/footer/footer.js */ "./src/client/app/components/footer/footer.js");
/* harmony import */ var _client_app_components_pages_home_home_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client/app/components/pages/home/home.js */ "./src/client/app/components/pages/home/home.js");
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scss/styles.scss */ "./src/client/scss/styles.scss");
// Import statments/.


// imports out page components.



// ! Uncomment this when you add all of the pages all correctly.
// import AboutPage from './app/components/home/home.js';
// import CreatePage from './app/components/home/home.js';
// import SearchPage from './app/components/home/home.js';

//import the styles.


// Initialize router
const router = new navigo__WEBPACK_IMPORTED_MODULE_0__('/');
// console.log("Hello World!");

window.addEventListener('load', () => {
  (0,_app_components_header_header_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_app_components_footer_footer_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // Main pages.
  router.on("/", router => {
    (0,_client_app_components_pages_home_home_js__WEBPACK_IMPORTED_MODULE_3__["default"])(router);
    console.log("The Index / Home page!", router);
  });
  router.on("/search", router => {
    console.log("The Search page!", router);
  });
  router.on("/create", router => {
    console.log("The Create page!", router);
  });

  // Other supplementary pages.
  router.on("/about", router => {
    console.log("The About page!", router);
  });
  router.on("/contact", router => {
    console.log("The Contact page!", router);
  });

  // router.on("/privacy-policy", (router) => {
  //     console.log("The About page!");
  // });

  // router.on("/terms", (router) => {
  //     console.log("The About page!");
  // });

  router.resolve();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map