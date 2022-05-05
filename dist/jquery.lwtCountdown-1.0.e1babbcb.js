// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/jquery.lwtCountdown-1.0.js":[function(require,module,exports) {
/*!
 * jQuery Countdown plugin v1.0
 * http://www.littlewebthings.com/projects/countdown/
 *
 * Copyright 2010, Vassilis Dourdounis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function ($) {
  $.fn.countDown = function (options) {
    config = {};
    $.extend(config, options);
    diffSecs = this.setCountDown(config);

    if (config.onComplete) {
      $.data($(this)[0], 'callback', config.onComplete);
    }

    if (config.omitWeeks) {
      $.data($(this)[0], 'omitWeeks', config.omitWeeks);
    }

    $('#' + $(this).attr('id') + ' .digit').html('<div class="top"></div><div class="bottom"></div>');
    $(this).doCountDown($(this).attr('id'), diffSecs, 500);
    return this;
  };

  $.fn.stopCountDown = function () {
    clearTimeout($.data(this[0], 'timer'));
  };

  $.fn.startCountDown = function () {
    this.doCountDown($(this).attr('id'), $.data(this[0], 'diffSecs'), 500);
  };

  $.fn.setCountDown = function (options) {
    var targetTime = new Date();

    if (options.targetDate) {
      targetTime = new Date(options.targetDate.month + '/' + options.targetDate.day + '/' + options.targetDate.year + ' ' + options.targetDate.hour + ':' + options.targetDate.min + ':' + options.targetDate.sec + (options.targetDate.utc ? ' UTC' : ''));
    } else if (options.targetOffset) {
      targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
      targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
      targetTime.setDate(options.targetOffset.day + targetTime.getDate());
      targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
      targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
      targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
    }

    var nowTime = new Date();
    diffSecs = Math.floor((targetTime.valueOf() - nowTime.valueOf()) / 1000);
    $.data(this[0], 'diffSecs', diffSecs);
    return diffSecs;
  };

  $.fn.doCountDown = function (id, diffSecs, duration) {
    $this = $('#' + id);

    if (diffSecs <= 0) {
      diffSecs = 0;

      if ($.data($this[0], 'timer')) {
        clearTimeout($.data($this[0], 'timer'));
      }
    }

    secs = diffSecs % 60;
    mins = Math.floor(diffSecs / 60) % 60;
    hours = Math.floor(diffSecs / 60 / 60) % 24;

    if ($.data($this[0], 'omitWeeks') == true) {
      days = Math.floor(diffSecs / 60 / 60 / 24);
      weeks = Math.floor(diffSecs / 60 / 60 / 24 / 7);
    } else {
      days = Math.floor(diffSecs / 60 / 60 / 24) % 7;
      weeks = Math.floor(diffSecs / 60 / 60 / 24 / 7);
    }

    $this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
    $this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
    $this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
    $this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
    $this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);
    $.data($this[0], 'diffSecs', diffSecs);

    if (diffSecs > 0) {
      e = $this;
      t = setTimeout(function () {
        e.doCountDown(id, diffSecs - 1);
      }, 1000);
      $.data(e[0], 'timer', t);
    } else if (cb = $.data($this[0], 'callback')) {
      $.data($this[0], 'callback')();
    }
  };

  $.fn.dashChangeTo = function (id, dash, n, duration) {
    $this = $('#' + id);

    for (var i = $this.find('.' + dash + ' .digit').length - 1; i >= 0; i--) {
      var d = n % 10;
      n = (n - d) / 10;
      $this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:eq(' + i + ')', d, duration);
    }
  };

  $.fn.digitChangeTo = function (digit, n, duration) {
    if (!duration) {
      duration = 800;
    }

    if ($(digit + ' div.top').html() != n + '') {
      $(digit + ' div.top').css({
        'display': 'none'
      });
      $(digit + ' div.top').html(n ? n : '0').slideDown(duration);
      $(digit + ' div.bottom').animate({
        'height': ''
      }, duration, function () {
        $(digit + ' div.bottom').html($(digit + ' div.top').html());
        $(digit + ' div.bottom').css({
          'display': 'block',
          'height': ''
        });
        $(digit + ' div.top').hide().slideUp(10);
      });
    }
  };
})(jQuery);
},{}],"../../Users/Jilo/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50004" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../Users/Jilo/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/jquery.lwtCountdown-1.0.js"], null)
//# sourceMappingURL=/jquery.lwtCountdown-1.0.e1babbcb.js.map