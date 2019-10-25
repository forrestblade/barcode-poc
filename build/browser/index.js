/*!
 * @license
 *
 * Scandit Barcode Scanner SDK for the Web
 * v. 4.4.0
 *
 * Copyright © 2019 Scandit AG. All Rights Reserved.
 *
 * The use of this software is governed by the Scandit Terms and Conditions.
 * https://ssl.scandit.com/terms/test.pdf
 *
 * The following sets forth attribution notices for third party software that may be contained in portions of the product.
 * https://docs.scandit.com/stable/web/LICENSE
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global = global || self), factory((global.ScanditSDK = {})));
})(this, function(exports) {
  "use strict";

  function ___$insertStyle(css) {
    if (!css) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    var style = document.createElement("style");

    style.setAttribute("type", "text/css");
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
  }

  var _isObject = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  var toString = {}.toString;

  var _cof = function(it) {
    return toString.call(it).slice(8, -1);
  };

  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
  }

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }

  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
  }

  var _core = createCommonjsModule(function(module) {
    var core = (module.exports = { version: "2.6.5" });
    if (typeof __e == "number") __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _global = createCommonjsModule(function(module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = (module.exports =
      typeof window != "undefined" && window.Math == Math
        ? window
        : typeof self != "undefined" && self.Math == Math
        ? self
        : // eslint-disable-next-line no-new-func
          Function("return this")());
    if (typeof __g == "number") __g = global; // eslint-disable-line no-undef
  });

  var _library = false;

  var _shared = createCommonjsModule(function(module) {
    var SHARED = "__core-js_shared__";
    var store = _global[SHARED] || (_global[SHARED] = {});

    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })("versions", []).push({
      version: _core.version,
      mode: "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function(key) {
    return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
  };

  var _wks = createCommonjsModule(function(module) {
    var store = _shared("wks");

    var Symbol = _global.Symbol;
    var USE_SYMBOL = typeof Symbol == "function";

    var $exports = (module.exports = function(name) {
      return (
        store[name] || (store[name] = (USE_SYMBOL && Symbol[name]) || (USE_SYMBOL ? Symbol : _uid)("Symbol." + name))
      );
    });

    $exports.store = store;
  });

  // 7.2.8 IsRegExp(argument)

  var MATCH = _wks("match");
  var _isRegexp = function(it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == "RegExp");
  };

  var _anObject = function(it) {
    if (!_isObject(it)) throw TypeError(it + " is not an object!");
    return it;
  };

  var _aFunction = function(it) {
    if (typeof it != "function") throw TypeError(it + " is not a function!");
    return it;
  };

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)

  var SPECIES = _wks("species");
  var _speciesConstructor = function(O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function(it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function(TO_STRING) {
    return function(that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING
          ? s.charAt(i)
          : a
        : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var at = _stringAt(true);

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var _advanceStringIndex = function(S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG = _wks("toStringTag");
  // ES3 wrong here
  var ARG =
    _cof(
      (function() {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  var tryGet = function(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  var _classof = function(it) {
    var O, T, B;
    return it === undefined
      ? "Undefined"
      : it === null
      ? "Null"
      : // @@toStringTag case
      typeof (T = tryGet((O = Object(it)), TAG)) == "string"
      ? T
      : // builtinTag case
      ARG
      ? _cof(O)
      : // ES3 arguments fallback
      (B = _cof(O)) == "Object" && typeof O.callee == "function"
      ? "Arguments"
      : B;
  };

  var builtinExec = RegExp.prototype.exec;

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var _regexpExecAbstract = function(R, S) {
    var exec = R.exec;
    if (typeof exec === "function") {
      var result = exec.call(R, S);
      if (typeof result !== "object") {
        throw new TypeError("RegExp exec method returned something other than an Object or null");
      }
      return result;
    }
    if (_classof(R) !== "RegExp") {
      throw new TypeError("RegExp#exec called on incompatible receiver");
    }
    return builtinExec.call(R, S);
  };

  // 21.2.5.3 get RegExp.prototype.flags

  var _flags = function() {
    var that = _anObject(this);
    var result = "";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.unicode) result += "u";
    if (that.sticky) result += "y";
    return result;
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var LAST_INDEX = "lastIndex";

  var UPDATES_LAST_INDEX_WRONG = (function() {
    var re1 = /a/,
      re2 = /b*/g;
    nativeExec.call(re1, "a");
    nativeExec.call(re2, "a");
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp("^" + re.source + "$(?!\\s)", _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function() {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  var _fails = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function() {
    return (
      Object.defineProperty({}, "a", {
        get: function() {
          return 7;
        }
      }).a != 7
    );
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function(it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine =
    !_descriptors &&
    !_fails(function() {
      return (
        Object.defineProperty(_domCreate("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7
      );
    });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function(it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == "function" && !_isObject((val = fn.call(it)))) return val;
    if (typeof (fn = it.valueOf) == "function" && !_isObject((val = fn.call(it)))) return val;
    if (!S && typeof (fn = it.toString) == "function" && !_isObject((val = fn.call(it)))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine)
          try {
            return dP(O, P, Attributes);
          } catch (e) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  var _objectDp = {
    f: f
  };

  var _propertyDesc = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors
    ? function(object, key, value) {
        return _objectDp.f(object, key, _propertyDesc(1, value));
      }
    : function(object, key, value) {
        object[key] = value;
        return object;
      };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var _functionToString = _shared("native-function-to-string", Function.toString);

  var _redefine = createCommonjsModule(function(module) {
    var SRC = _uid("src");

    var TO_STRING = "toString";
    var TPL = ("" + _functionToString).split(TO_STRING);

    _core.inspectSource = function(it) {
      return _functionToString.call(it);
    };

    (module.exports = function(O, key, val, safe) {
      var isFunction = typeof val == "function";
      if (isFunction) _has(val, "name") || _hide(val, "name", key);
      if (O[key] === val) return;
      if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return (typeof this == "function" && this[SRC]) || _functionToString.call(this);
    });
  });

  // optional / simple context binding

  var _ctx = function(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE = "prototype";

  var $export = function(type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL
      ? _global
      : IS_STATIC
      ? _global[name] || (_global[name] = {})
      : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1; // forced
  $export.G = 2; // global
  $export.S = 4; // static
  $export.P = 8; // proto
  $export.B = 16; // bind
  $export.W = 32; // wrap
  $export.U = 64; // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  _export(
    {
      target: "RegExp",
      proto: true,
      forced: _regexpExec !== /./.exec
    },
    {
      exec: _regexpExec
    }
  );

  var SPECIES$1 = _wks("species");

  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function() {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function() {
      var result = [];
      result.groups = { a: "7" };
      return result;
    };
    return "".replace(re, "$<a>") !== "7";
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function() {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function() {
      return originalExec.apply(this, arguments);
    };
    var result = "ab".split(re);
    return result.length === 2 && result[0] === "a" && result[1] === "b";
  })();

  var _fixReWks = function(KEY, length, exec) {
    var SYMBOL = _wks(KEY);

    var DELEGATES_TO_SYMBOL = !_fails(function() {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function() {
        return 7;
      };
      return ""[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL
      ? !_fails(function() {
          // Symbol-named RegExp methods call .exec
          var execCalled = false;
          var re = /a/;
          re.exec = function() {
            execCalled = true;
            return null;
          };
          if (KEY === "split") {
            // RegExp[@@split] doesn't call the regex's exec method, but first creates
            // a new one. We need to return the patched regex when creating the new one.
            re.constructor = {};
            re.constructor[SPECIES$1] = function() {
              return re;
            };
          }
          re[SYMBOL]("");
          return !execCalled;
        })
      : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(_defined, SYMBOL, ""[KEY], function maybeCallNative(
        nativeMethod,
        regexp,
        str,
        arg2,
        forceStringMethod
      ) {
        if (regexp.exec === _regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });
      var strfn = fns[0];
      var rxfn = fns[1];

      _redefine(String.prototype, KEY, strfn);
      _hide(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            function(string, arg) {
              return rxfn.call(string, this, arg);
            }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            function(string) {
              return rxfn.call(string, this);
            }
      );
    }
  };

  var $min = Math.min;
  var $push = [].push;
  var $SPLIT = "split";
  var LENGTH = "length";
  var LAST_INDEX$1 = "lastIndex";
  var MAX_UINT32 = 0xffffffff;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !_fails(function() {
    RegExp(MAX_UINT32, "y");
  });

  // @@split logic
  _fixReWks("split", 2, function(defined, SPLIT, $split, maybeCallNative) {
    var internalSplit;
    if (
      "abbc"[$SPLIT](/(b)*/)[1] == "c" ||
      "test"[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
      "ab"[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
      "."[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
      "."[$SPLIT](/()()/)[LENGTH] > 1 ||
      ""[$SPLIT](/.?/)[LENGTH]
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function(separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
        var output = [];
        var flags =
          (separator.ignoreCase ? "i" : "") +
          (separator.multiline ? "m" : "") +
          (separator.unicode ? "u" : "") +
          (separator.sticky ? "y" : "");
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + "g");
        var match, lastIndex, lastLength;
        while ((match = _regexpExec.call(separatorCopy, string))) {
          lastIndex = separatorCopy[LAST_INDEX$1];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test("")) output.push("");
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
      // Chakra, V8
    } else if ("0"[$SPLIT](undefined, 0)[LENGTH]) {
      internalSplit = function(separator, limit) {
        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
      };
    } else {
      internalSplit = $split;
    }

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = defined(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function(regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
        if (res.done) return res.value;

        var rx = _anObject(regexp);
        var S = String(this);
        var C = _speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags =
          (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (SUPPORTS_Y ? "y" : "g");

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : "^(?:" + rx.source + ")", flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
            q = _advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  });

  // 7.1.4 ToInteger
  var ceil$1 = Math.ceil;
  var floor$1 = Math.floor;
  var _toInteger$1 = function(it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined$1 = function(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt$1 = function(TO_STRING) {
    return function(that, pos) {
      var s = String(_defined$1(that));
      var i = _toInteger$1(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING
          ? s.charAt(i)
          : a
        : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var _library$1 = true;

  var _global$1 = createCommonjsModule(function(module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = (module.exports =
      typeof window != "undefined" && window.Math == Math
        ? window
        : typeof self != "undefined" && self.Math == Math
        ? self
        : // eslint-disable-next-line no-new-func
          Function("return this")());
    if (typeof __g == "number") __g = global; // eslint-disable-line no-undef
  });

  var _core$1 = createCommonjsModule(function(module) {
    var core = (module.exports = { version: "2.6.5" });
    if (typeof __e == "number") __e = core; // eslint-disable-line no-undef
  });
  var _core_1$1 = _core$1.version;

  var _aFunction$1 = function(it) {
    if (typeof it != "function") throw TypeError(it + " is not a function!");
    return it;
  };

  // optional / simple context binding

  var _ctx$1 = function(fn, that, length) {
    _aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function(/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var _isObject$1 = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  var _anObject$1 = function(it) {
    if (!_isObject$1(it)) throw TypeError(it + " is not an object!");
    return it;
  };

  var _fails$1 = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors$1 = !_fails$1(function() {
    return (
      Object.defineProperty({}, "a", {
        get: function() {
          return 7;
        }
      }).a != 7
    );
  });

  var document$2 = _global$1.document;
  // typeof document.createElement is 'object' in old IE
  var is$1 = _isObject$1(document$2) && _isObject$1(document$2.createElement);
  var _domCreate$1 = function(it) {
    return is$1 ? document$2.createElement(it) : {};
  };

  var _ie8DomDefine$1 =
    !_descriptors$1 &&
    !_fails$1(function() {
      return (
        Object.defineProperty(_domCreate$1("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7
      );
    });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive$1 = function(it, S) {
    if (!_isObject$1(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == "function" && !_isObject$1((val = fn.call(it)))) return val;
    if (typeof (fn = it.valueOf) == "function" && !_isObject$1((val = fn.call(it)))) return val;
    if (!S && typeof (fn = it.toString) == "function" && !_isObject$1((val = fn.call(it)))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP$1 = Object.defineProperty;

  var f$1 = _descriptors$1
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
        _anObject$1(O);
        P = _toPrimitive$1(P, true);
        _anObject$1(Attributes);
        if (_ie8DomDefine$1)
          try {
            return dP$1(O, P, Attributes);
          } catch (e) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  var _objectDp$1 = {
    f: f$1
  };

  var _propertyDesc$1 = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide$1 = _descriptors$1
    ? function(object, key, value) {
        return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
      }
    : function(object, key, value) {
        object[key] = value;
        return object;
      };

  var hasOwnProperty$1 = {}.hasOwnProperty;
  var _has$1 = function(it, key) {
    return hasOwnProperty$1.call(it, key);
  };

  var PROTOTYPE$1 = "prototype";

  var $export$1 = function(type, name, source) {
    var IS_FORCED = type & $export$1.F;
    var IS_GLOBAL = type & $export$1.G;
    var IS_STATIC = type & $export$1.S;
    var IS_PROTO = type & $export$1.P;
    var IS_BIND = type & $export$1.B;
    var IS_WRAP = type & $export$1.W;
    var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
    var expProto = exports[PROTOTYPE$1];
    var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$1];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has$1(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] =
        IS_GLOBAL && typeof target[key] != "function"
          ? source[key]
          : // bind timers to global for call from export context
          IS_BIND && own
          ? _ctx$1(out, _global$1)
          : // wrap global constructors for prevent change them in library
          IS_WRAP && target[key] == out
          ? (function(C) {
              var F = function(a, b, c) {
                if (this instanceof C) {
                  switch (arguments.length) {
                    case 0:
                      return new C();
                    case 1:
                      return new C(a);
                    case 2:
                      return new C(a, b);
                  }
                  return new C(a, b, c);
                }
                return C.apply(this, arguments);
              };
              F[PROTOTYPE$1] = C[PROTOTYPE$1];
              return F;
              // make static versions for prototype methods
            })(out)
          : IS_PROTO && typeof out == "function"
          ? _ctx$1(Function.call, out)
          : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export$1.F = 1; // forced
  $export$1.G = 2; // global
  $export$1.S = 4; // static
  $export$1.P = 8; // proto
  $export$1.B = 16; // bind
  $export$1.W = 32; // wrap
  $export$1.U = 64; // safe
  $export$1.R = 128; // real proto method for `library`
  var _export$1 = $export$1;

  var _redefine$1 = _hide$1;

  var _iterators = {};

  var toString$1 = {}.toString;

  var _cof$1 = function(it) {
    return toString$1.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object("z").propertyIsEnumerable(0)
    ? Object
    : function(it) {
        return _cof$1(it) == "String" ? it.split("") : Object(it);
      };

  // to indexed object, toObject with fallback for non-array-like ES3 strings

  var _toIobject = function(it) {
    return _iobject(_defined$1(it));
  };

  // 7.1.15 ToLength

  var min$1 = Math.min;
  var _toLength$1 = function(it) {
    return it > 0 ? min$1(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$2 = Math.min;
  var _toAbsoluteIndex = function(index, length) {
    index = _toInteger$1(index);
    return index < 0 ? max(index + length, 0) : min$2(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes

  var _arrayIncludes = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength$1(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++)
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
      return !IS_INCLUDES && -1;
    };
  };

  var _shared$1 = createCommonjsModule(function(module) {
    var SHARED = "__core-js_shared__";
    var store = _global$1[SHARED] || (_global$1[SHARED] = {});

    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })("versions", []).push({
      version: _core$1.version,
      mode: "pure",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  });

  var id$1 = 0;
  var px$1 = Math.random();
  var _uid$1 = function(key) {
    return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id$1 + px$1).toString(36));
  };

  var shared = _shared$1("keys");

  var _sharedKey = function(key) {
    return shared[key] || (shared[key] = _uid$1(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey("IE_PROTO");

  var _objectKeysInternal = function(object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has$1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (_has$1(O, (key = names[i++]))) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
    ","
  );

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)

  var _objectKeys =
    Object.keys ||
    function keys(O) {
      return _objectKeysInternal(O, _enumBugKeys);
    };

  var _objectDps = _descriptors$1
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        _anObject$1(O);
        var keys = _objectKeys(Properties);
        var length = keys.length;
        var i = 0;
        var P;
        while (length > i) _objectDp$1.f(O, (P = keys[i++]), Properties[P]);
        return O;
      };

  var document$3 = _global$1.document;
  var _html = document$3 && document$3.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

  var IE_PROTO$1 = _sharedKey("IE_PROTO");
  var Empty = function() {
    /* empty */
  };
  var PROTOTYPE$2 = "prototype";

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate$1("iframe");
    var i = _enumBugKeys.length;
    var lt = "<";
    var gt = ">";
    var iframeDocument;
    iframe.style.display = "none";
    _html.appendChild(iframe);
    iframe.src = "javascript:"; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$2][_enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE$2] = _anObject$1(O);
        result = new Empty();
        Empty[PROTOTYPE$2] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = createDict();
      return Properties === undefined ? result : _objectDps(result, Properties);
    };

  var _wks$1 = createCommonjsModule(function(module) {
    var store = _shared$1("wks");

    var Symbol = _global$1.Symbol;
    var USE_SYMBOL = typeof Symbol == "function";

    var $exports = (module.exports = function(name) {
      return (
        store[name] || (store[name] = (USE_SYMBOL && Symbol[name]) || (USE_SYMBOL ? Symbol : _uid$1)("Symbol." + name))
      );
    });

    $exports.store = store;
  });

  var def = _objectDp$1.f;

  var TAG$1 = _wks$1("toStringTag");

  var _setToStringTag = function(it, tag, stat) {
    if (it && !_has$1((it = stat ? it : it.prototype), TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide$1(IteratorPrototype, _wks$1("iterator"), function() {
    return this;
  });

  var _iterCreate = function(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc$1(1, next) });
    _setToStringTag(Constructor, NAME + " Iterator");
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function(it) {
    return Object(_defined$1(it));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

  var IE_PROTO$2 = _sharedKey("IE_PROTO");
  var ObjectProto = Object.prototype;

  var _objectGpo =
    Object.getPrototypeOf ||
    function(O) {
      O = _toObject(O);
      if (_has$1(O, IE_PROTO$2)) return O[IE_PROTO$2];
      if (typeof O.constructor == "function" && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    };

  var ITERATOR = _wks$1("iterator");
  var BUGGY = !([].keys && "next" in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = "@@iterator";
  var KEYS = "keys";
  var VALUES = "values";

  var returnThis = function() {
    return this;
  };

  var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function(kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + " Iterator";
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT]);
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? (!DEF_VALUES ? $default : getMethod("entries")) : undefined;
    var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    // Define iterator
    if (FORCED && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide$1(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto)) _redefine$1(proto, key, methods[key]);
        }
      else _export$1(_export$1.P + _export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  var $at = _stringAt$1(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(
    String,
    "String",
    function(iterated) {
      this._t = String(iterated); // target
      this._i = 0; // next index
      // 21.1.5.2.1 %StringIteratorPrototype%.next()
    },
    function() {
      var O = this._t;
      var index = this._i;
      var point;
      if (index >= O.length) return { value: undefined, done: true };
      point = $at(O, index);
      this._i += point.length;
      return { value: point, done: false };
    }
  );

  var _iterStep = function(done, value) {
    return { value: value, done: !!done };
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(
    Array,
    "Array",
    function(iterated, kind) {
      this._t = _toIobject(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    },
    function() {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep(1);
      }
      if (kind == "keys") return _iterStep(0, index);
      if (kind == "values") return _iterStep(0, O[index]);
      return _iterStep(0, [index, O[index]]);
    },
    "values"
  );

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  var TO_STRING_TAG = _wks$1("toStringTag");

  var DOMIterables = (
    "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList," +
    "DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement," +
    "MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList," +
    "SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList," +
    "TextTrackList,TouchList"
  ).split(",");

  for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = _global$1[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) _hide$1(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = _iterators.Array;
  }

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$2 = _wks$1("toStringTag");
  // ES3 wrong here
  var ARG$1 =
    _cof$1(
      (function() {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  var tryGet$1 = function(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  var _classof$1 = function(it) {
    var O, T, B;
    return it === undefined
      ? "Undefined"
      : it === null
      ? "Null"
      : // @@toStringTag case
      typeof (T = tryGet$1((O = Object(it)), TAG$2)) == "string"
      ? T
      : // builtinTag case
      ARG$1
      ? _cof$1(O)
      : // ES3 arguments fallback
      (B = _cof$1(O)) == "Object" && typeof O.callee == "function"
      ? "Arguments"
      : B;
  };

  var _anInstance = function(it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ": incorrect invocation!");
    }
    return it;
  };

  // call something on iterator step with safe closing on error

  var _iterCall = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject$1(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator["return"];
      if (ret !== undefined) _anObject$1(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$1 = _wks$1("iterator");
  var ArrayProto = Array.prototype;

  var _isArrayIter = function(it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var ITERATOR$2 = _wks$1("iterator");

  var core_getIteratorMethod = (_core$1.getIteratorMethod = function(it) {
    if (it != undefined) return it[ITERATOR$2] || it["@@iterator"] || _iterators[_classof$1(it)];
  });

  var _forOf = createCommonjsModule(function(module) {
    var BREAK = {};
    var RETURN = {};
    var exports = (module.exports = function(iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR
        ? function() {
            return iterable;
          }
        : core_getIteratorMethod(iterable);
      var f = _ctx$1(fn, that, entries ? 2 : 1);
      var index = 0;
      var length, step, iterator, result;
      if (typeof iterFn != "function") throw TypeError(iterable + " is not iterable!");
      // fast case for arrays with default iterator
      if (_isArrayIter(iterFn))
        for (length = _toLength$1(iterable.length); length > index; index++) {
          result = entries ? f(_anObject$1((step = iterable[index]))[0], step[1]) : f(iterable[index]);
          if (result === BREAK || result === RETURN) return result;
        }
      else
        for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
          result = _iterCall(iterator, f, step.value, entries);
          if (result === BREAK || result === RETURN) return result;
        }
    });
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)

  var SPECIES$2 = _wks$1("species");
  var _speciesConstructor$1 = function(O, D) {
    var C = _anObject$1(O).constructor;
    var S;
    return C === undefined || (S = _anObject$1(C)[SPECIES$2]) == undefined ? D : _aFunction$1(S);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };

  var process = _global$1.process;
  var setTask = _global$1.setImmediate;
  var clearTask = _global$1.clearImmediate;
  var MessageChannel = _global$1.MessageChannel;
  var Dispatch = _global$1.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = "onreadystatechange";
  var defer, channel, port;
  var run = function() {
    var id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  var listener = function(event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function() {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn == "function" ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof$1(process) == "process") {
      defer = function(id) {
        process.nextTick(_ctx$1(run, id, 1));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function(id) {
        Dispatch.now(_ctx$1(run, id, 1));
      };
      // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx$1(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global$1.addEventListener && typeof postMessage == "function" && !_global$1.importScripts) {
      defer = function(id) {
        _global$1.postMessage(id + "", "*");
      };
      _global$1.addEventListener("message", listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate$1("script")) {
      defer = function(id) {
        _html.appendChild(_domCreate$1("script"))[ONREADYSTATECHANGE] = function() {
          _html.removeChild(this);
          run.call(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function(id) {
        setTimeout(_ctx$1(run, id, 1), 0);
      };
    }
  }
  var _task = {
    set: setTask,
    clear: clearTask
  };

  var macrotask = _task.set;
  var Observer = _global$1.MutationObserver || _global$1.WebKitMutationObserver;
  var process$1 = _global$1.process;
  var Promise$1 = _global$1.Promise;
  var isNode = _cof$1(process$1) == "process";

  var _microtask = function() {
    var head, last, notify;

    var flush = function() {
      var parent, fn;
      if (isNode && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (e) {
          if (head) notify();
          else last = undefined;
          throw e;
        }
      }
      last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode) {
      notify = function() {
        process$1.nextTick(flush);
      };
      // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(_global$1.navigator && _global$1.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode("");
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function() {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);
      notify = function() {
        promise.then(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify = function() {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global$1, flush);
      };
    }

    return function(fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  };

  // 25.4.1.5 NewPromiseCapability(C)

  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError("Bad Promise constructor");
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction$1(resolve);
    this.reject = _aFunction$1(reject);
  }

  var f$2 = function(C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
    f: f$2
  };

  var _perform = function(exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var navigator$1 = _global$1.navigator;

  var _userAgent = (navigator$1 && navigator$1.userAgent) || "";

  var _promiseResolve = function(C, x) {
    _anObject$1(C);
    if (_isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function(target, src, safe) {
    for (var key in src) {
      if (safe && target[key]) target[key] = src[key];
      else _hide$1(target, key, src[key]);
    }
    return target;
  };

  var SPECIES$3 = _wks$1("species");

  var _setSpecies = function(KEY) {
    var C = typeof _core$1[KEY] == "function" ? _core$1[KEY] : _global$1[KEY];
    if (_descriptors$1 && C && !C[SPECIES$3])
      _objectDp$1.f(C, SPECIES$3, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };

  var ITERATOR$3 = _wks$1("iterator");
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$3]();
    riter["return"] = function() {
      SAFE_CLOSING = true;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {
    /* empty */
  }

  var _iterDetect = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$3]();
      iter.next = function() {
        return { done: (safe = true) };
      };
      arr[ITERATOR$3] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {
      /* empty */
    }
    return safe;
  };

  var task = _task.set;
  var microtask = _microtask();

  var PROMISE = "Promise";
  var TypeError$1 = _global$1.TypeError;
  var process$2 = _global$1.process;
  var versions = process$2 && process$2.versions;
  var v8 = (versions && versions.v8) || "";
  var $Promise = _global$1[PROMISE];
  var isNode$1 = _classof$1(process$2) == "process";
  var empty = function() {
    /* empty */
  };
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = (newGenericPromiseCapability = _newPromiseCapability.f);

  var USE_NATIVE = !!(function() {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = ((promise.constructor = {})[_wks$1("species")] = function(exec) {
        exec(empty, empty);
      });
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (
        (isNode$1 || typeof PromiseRejectionEvent == "function") &&
        promise.then(empty) instanceof FakePromise &&
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        v8.indexOf("6.6") !== 0 &&
        _userAgent.indexOf("Chrome/66") === -1
      );
    } catch (e) {
      /* empty */
    }
  })();

  // helpers
  var isThenable = function(it) {
    var then;
    return _isObject$1(it) && typeof (then = it.then) == "function" ? then : false;
  };
  var notify = function(promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function() {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function(reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // may throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1("Promise-chain cycle"));
            } else if ((then = isThenable(result))) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };
      while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };
  var onUnhandled = function(promise) {
    task.call(_global$1, function() {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = _perform(function() {
          if (isNode$1) {
            process$2.emit("unhandledRejection", value, promise);
          } else if ((handler = _global$1.onunhandledrejection)) {
            handler({ promise: promise, reason: value });
          } else if ((console = _global$1.console) && console.error) {
            console.error("Unhandled promise rejection", value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      }
      promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function(promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function(promise) {
    task.call(_global$1, function() {
      var handler;
      if (isNode$1) {
        process$2.emit("rejectionHandled", promise);
      } else if ((handler = _global$1.onrejectionhandled)) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject = function(value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function(value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if ((then = isThenable(value))) {
        microtask(function() {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx$1($resolve, wrapper, 1), _ctx$1($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      _anInstance(this, $Promise, PROMISE, "_h");
      _aFunction$1(executor);
      Internal.call(this);
      try {
        executor(_ctx$1($resolve, this, 1), _ctx$1($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = []; // <- awaiting reactions
      this._a = undefined; // <- checked in isUnhandled reactions
      this._s = 0; // <- state
      this._d = false; // <- done
      this._v = undefined; // <- value
      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false; // <- notify
    };
    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor$1(this, $Promise));
        reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
        reaction.fail = typeof onRejected == "function" && onRejected;
        reaction.domain = isNode$1 ? process$2.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      catch: function(onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function() {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx$1($resolve, promise, 1);
      this.reject = _ctx$1($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability = function(C) {
      return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };
  }

  _export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core$1[PROMISE];

  // statics
  _export$1(_export$1.S + _export$1.F * !USE_NATIVE, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export$1(_export$1.S + _export$1.F * _library$1, PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(this === Wrapper ? $Promise : this, x);
    }
  });
  _export$1(
    _export$1.S +
      _export$1.F *
        !(
          USE_NATIVE &&
          _iterDetect(function(iter) {
            $Promise.all(iter)["catch"](empty);
          })
        ),
    PROMISE,
    {
      // 25.4.4.1 Promise.all(iterable)
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = _perform(function() {
          var values = [];
          var index = 0;
          var remaining = 1;
          _forOf(iterable, false, function(promise) {
            var $index = index++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            C.resolve(promise).then(function(value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[$index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.e) reject(result.v);
        return capability.promise;
      },
      // 25.4.4.4 Promise.race(iterable)
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = _perform(function() {
          _forOf(iterable, false, function(promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (result.e) reject(result.v);
        return capability.promise;
      }
    }
  );

  _export$1(_export$1.P + _export$1.R, "Promise", {
    finally: function(onFinally) {
      var C = _speciesConstructor$1(this, _core$1.Promise || _global$1.Promise);
      var isFunction = typeof onFinally == "function";
      return this.then(
        isFunction
          ? function(x) {
              return _promiseResolve(C, onFinally()).then(function() {
                return x;
              });
            }
          : onFinally,
        isFunction
          ? function(e) {
              return _promiseResolve(C, onFinally()).then(function() {
                throw e;
              });
            }
          : onFinally
      );
    }
  });

  // https://github.com/tc39/proposal-promise-try

  _export$1(_export$1.S, "Promise", {
    try: function(callbackfn) {
      var promiseCapability = _newPromiseCapability.f(this);
      var result = _perform(callbackfn);
      (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
      return promiseCapability.promise;
    }
  });

  var promise = _core$1.Promise;

  var promise$1 = promise;

  !(function() {
    if ("undefined" != typeof window) {
      var t = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        n = !!t && 16 <= parseInt(t[1], 10);
      if (!("objectFit" in document.documentElement.style != !1) || n) {
        var o = function(t, e, i) {
            var n, o, l, a, d;
            if (((i = i.split(" ")).length < 2 && (i[1] = i[0]), "x" === t))
              (n = i[0]), (o = i[1]), (l = "left"), (a = "right"), (d = e.clientWidth);
            else {
              if ("y" !== t) return;
              (n = i[1]), (o = i[0]), (l = "top"), (a = "bottom"), (d = e.clientHeight);
            }
            if (n !== l && o !== l) {
              if (n !== a && o !== a)
                return "center" === n || "50%" === n
                  ? ((e.style[l] = "50%"), void (e.style["margin-" + l] = d / -2 + "px"))
                  : void (0 <= n.indexOf("%")
                      ? (n = parseInt(n)) < 50
                        ? ((e.style[l] = n + "%"), (e.style["margin-" + l] = d * (n / -100) + "px"))
                        : ((n = 100 - n), (e.style[a] = n + "%"), (e.style["margin-" + a] = d * (n / -100) + "px"))
                      : (e.style[l] = n));
              e.style[a] = "0";
            } else e.style[l] = "0";
          },
          l = function(t) {
            var e = t.dataset ? t.dataset.objectFit : t.getAttribute("data-object-fit"),
              i = t.dataset ? t.dataset.objectPosition : t.getAttribute("data-object-position");
            (e = e || "cover"), (i = i || "50% 50%");
            var n = t.parentNode;
            return (
              (function(t) {
                var e = window.getComputedStyle(t, null),
                  i = e.getPropertyValue("position"),
                  n = e.getPropertyValue("overflow"),
                  o = e.getPropertyValue("display");
                (i && "static" !== i) || (t.style.position = "relative"),
                  "hidden" !== n && (t.style.overflow = "hidden"),
                  (o && "inline" !== o) || (t.style.display = "block"),
                  0 === t.clientHeight && (t.style.height = "100%"),
                  -1 === t.className.indexOf("object-fit-polyfill") &&
                    (t.className = t.className + " object-fit-polyfill");
              })(n),
              (function(t) {
                var e = window.getComputedStyle(t, null),
                  i = {
                    "max-width": "none",
                    "max-height": "none",
                    "min-width": "0px",
                    "min-height": "0px",
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    "margin-top": "0px",
                    "margin-right": "0px",
                    "margin-bottom": "0px",
                    "margin-left": "0px"
                  };
                for (var n in i) e.getPropertyValue(n) !== i[n] && (t.style[n] = i[n]);
              })(t),
              (t.style.position = "absolute"),
              (t.style.width = "auto"),
              (t.style.height = "auto"),
              "scale-down" === e &&
                (e = t.clientWidth < n.clientWidth && t.clientHeight < n.clientHeight ? "none" : "contain"),
              "none" === e
                ? (o("x", t, i), void o("y", t, i))
                : "fill" === e
                ? ((t.style.width = "100%"), (t.style.height = "100%"), o("x", t, i), void o("y", t, i))
                : ((t.style.height = "100%"),
                  void (("cover" === e && t.clientWidth > n.clientWidth) ||
                  ("contain" === e && t.clientWidth < n.clientWidth)
                    ? ((t.style.top = "0"), (t.style.marginTop = "0"), o("x", t, i))
                    : ((t.style.width = "100%"),
                      (t.style.height = "auto"),
                      (t.style.left = "0"),
                      (t.style.marginLeft = "0"),
                      o("y", t, i))))
            );
          },
          e = function(t) {
            if (void 0 === t || t instanceof Event) t = document.querySelectorAll("[data-object-fit]");
            else if (t && t.nodeName) t = [t];
            else {
              if ("object" != typeof t || !t.length || !t[0].nodeName) return !1;
              t = t;
            }
            for (var e = 0; e < t.length; e++)
              if (t[e].nodeName) {
                var i = t[e].nodeName.toLowerCase();
                if ("img" === i) {
                  if (n) continue;
                  t[e].complete
                    ? l(t[e])
                    : t[e].addEventListener("load", function() {
                        l(this);
                      });
                } else
                  "video" === i
                    ? 0 < t[e].readyState
                      ? l(t[e])
                      : t[e].addEventListener("loadedmetadata", function() {
                          l(this);
                        })
                    : l(t[e]);
              }
            return !0;
          };
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e(),
          window.addEventListener("resize", e),
          (window.objectFitPolyfill = e);
      } else
        window.objectFitPolyfill = function() {
          return !1;
        };
    }
  })();

  var adapter_no_global = createCommonjsModule(function(module) {
    (function() {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f && c) return c(i, !0);
              if (u) return u(i, !0);
              var a = new Error("Cannot find module '" + i + "'");
              throw ((a.code = "MODULE_NOT_FOUND"), a);
            }
            var p = (n[i] = { exports: {} });
            e[i][0].call(
              p.exports,
              function(r) {
                var n = e[i][1][r];
                return o(n || r);
              },
              p,
              p.exports,
              r,
              e,
              n,
              t
            );
          }
          return n[i].exports;
        }
        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++) o(t[i]);
        return o;
      }
      return r;
    })()(
      {
        1: [
          function(require, module, exports) {
            var _adapter_factory = require("./adapter_factory.js");

            var adapter = (0, _adapter_factory.adapterFactory)({ window: window });
            module.exports = adapter; // this is the difference from adapter_core.
          },
          { "./adapter_factory.js": 2 }
        ],
        2: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.adapterFactory = adapterFactory;

            var _utils = require("./utils");

            var utils = _interopRequireWildcard(_utils);

            var _chrome_shim = require("./chrome/chrome_shim");

            var chromeShim = _interopRequireWildcard(_chrome_shim);

            var _edge_shim = require("./edge/edge_shim");

            var edgeShim = _interopRequireWildcard(_edge_shim);

            var _firefox_shim = require("./firefox/firefox_shim");

            var firefoxShim = _interopRequireWildcard(_firefox_shim);

            var _safari_shim = require("./safari/safari_shim");

            var safariShim = _interopRequireWildcard(_safari_shim);

            var _common_shim = require("./common_shim");

            var commonShim = _interopRequireWildcard(_common_shim);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            // Shimming starts here.
            /*
             *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
             *
             *  Use of this source code is governed by a BSD-style license
             *  that can be found in the LICENSE file in the root of the source
             *  tree.
             */
            function adapterFactory() {
              var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                window = _ref.window;

              var options =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : {
                      shimChrome: true,
                      shimFirefox: true,
                      shimEdge: true,
                      shimSafari: true
                    };

              // Utils.
              var logging = utils.log;
              var browserDetails = utils.detectBrowser(window);

              var adapter = {
                browserDetails: browserDetails,
                commonShim: commonShim,
                extractVersion: utils.extractVersion,
                disableLog: utils.disableLog,
                disableWarnings: utils.disableWarnings
              };

              // Shim browser if found.
              switch (browserDetails.browser) {
                case "chrome":
                  if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                    logging("Chrome shim is not included in this adapter release.");
                    return adapter;
                  }
                  logging("adapter.js shimming chrome.");
                  // Export to the adapter global object visible in the browser.
                  adapter.browserShim = chromeShim;

                  chromeShim.shimGetUserMedia(window);
                  chromeShim.shimMediaStream(window);
                  chromeShim.shimPeerConnection(window);
                  chromeShim.shimOnTrack(window);
                  chromeShim.shimAddTrackRemoveTrack(window);
                  chromeShim.shimGetSendersWithDtmf(window);
                  chromeShim.shimGetStats(window);
                  chromeShim.shimSenderReceiverGetStats(window);
                  chromeShim.fixNegotiationNeeded(window);

                  commonShim.shimRTCIceCandidate(window);
                  commonShim.shimConnectionState(window);
                  commonShim.shimMaxMessageSize(window);
                  commonShim.shimSendThrowTypeError(window);
                  commonShim.removeAllowExtmapMixed(window);
                  break;
                case "firefox":
                  if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                    logging("Firefox shim is not included in this adapter release.");
                    return adapter;
                  }
                  logging("adapter.js shimming firefox.");
                  // Export to the adapter global object visible in the browser.
                  adapter.browserShim = firefoxShim;

                  firefoxShim.shimGetUserMedia(window);
                  firefoxShim.shimPeerConnection(window);
                  firefoxShim.shimOnTrack(window);
                  firefoxShim.shimRemoveStream(window);
                  firefoxShim.shimSenderGetStats(window);
                  firefoxShim.shimReceiverGetStats(window);
                  firefoxShim.shimRTCDataChannel(window);

                  commonShim.shimRTCIceCandidate(window);
                  commonShim.shimConnectionState(window);
                  commonShim.shimMaxMessageSize(window);
                  commonShim.shimSendThrowTypeError(window);
                  break;
                case "edge":
                  if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                    logging("MS edge shim is not included in this adapter release.");
                    return adapter;
                  }
                  logging("adapter.js shimming edge.");
                  // Export to the adapter global object visible in the browser.
                  adapter.browserShim = edgeShim;

                  edgeShim.shimGetUserMedia(window);
                  edgeShim.shimGetDisplayMedia(window);
                  edgeShim.shimPeerConnection(window);
                  edgeShim.shimReplaceTrack(window);

                  // the edge shim implements the full RTCIceCandidate object.

                  commonShim.shimMaxMessageSize(window);
                  commonShim.shimSendThrowTypeError(window);
                  break;
                case "safari":
                  if (!safariShim || !options.shimSafari) {
                    logging("Safari shim is not included in this adapter release.");
                    return adapter;
                  }
                  logging("adapter.js shimming safari.");
                  // Export to the adapter global object visible in the browser.
                  adapter.browserShim = safariShim;

                  safariShim.shimRTCIceServerUrls(window);
                  safariShim.shimCreateOfferLegacy(window);
                  safariShim.shimCallbacksAPI(window);
                  safariShim.shimLocalStreamsAPI(window);
                  safariShim.shimRemoteStreamsAPI(window);
                  safariShim.shimTrackEventTransceiver(window);
                  safariShim.shimGetUserMedia(window);

                  commonShim.shimRTCIceCandidate(window);
                  commonShim.shimMaxMessageSize(window);
                  commonShim.shimSendThrowTypeError(window);
                  commonShim.removeAllowExtmapMixed(window);
                  break;
                default:
                  logging("Unsupported browser!");
                  break;
              }

              return adapter;
            }

            // Browser shims.
          },
          {
            "./chrome/chrome_shim": 3,
            "./common_shim": 6,
            "./edge/edge_shim": 7,
            "./firefox/firefox_shim": 11,
            "./safari/safari_shim": 14,
            "./utils": 15
          }
        ],
        3: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            var _getusermedia = require("./getusermedia");

            Object.defineProperty(exports, "shimGetUserMedia", {
              enumerable: true,
              get: function get() {
                return _getusermedia.shimGetUserMedia;
              }
            });

            var _getdisplaymedia = require("./getdisplaymedia");

            Object.defineProperty(exports, "shimGetDisplayMedia", {
              enumerable: true,
              get: function get() {
                return _getdisplaymedia.shimGetDisplayMedia;
              }
            });
            exports.shimMediaStream = shimMediaStream;
            exports.shimOnTrack = shimOnTrack;
            exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
            exports.shimGetStats = shimGetStats;
            exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
            exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
            exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
            exports.shimPeerConnection = shimPeerConnection;
            exports.fixNegotiationNeeded = fixNegotiationNeeded;

            var _utils = require("../utils.js");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            function _defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }
              return obj;
            }

            function shimMediaStream(window) {
              window.MediaStream = window.MediaStream || window.webkitMediaStream;
            }

            function shimOnTrack(window) {
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCPeerConnection &&
                !("ontrack" in window.RTCPeerConnection.prototype)
              ) {
                Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                  get: function get() {
                    return this._ontrack;
                  },
                  set: function set(f) {
                    if (this._ontrack) {
                      this.removeEventListener("track", this._ontrack);
                    }
                    this.addEventListener("track", (this._ontrack = f));
                  },

                  enumerable: true,
                  configurable: true
                });
                var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                  var _this = this;

                  if (!this._ontrackpoly) {
                    this._ontrackpoly = function(e) {
                      // onaddstream does not fire when a track is added to an existing
                      // stream. But stream.onaddtrack is implemented so we use that.
                      e.stream.addEventListener("addtrack", function(te) {
                        var receiver = void 0;
                        if (window.RTCPeerConnection.prototype.getReceivers) {
                          receiver = _this.getReceivers().find(function(r) {
                            return r.track && r.track.id === te.track.id;
                          });
                        } else {
                          receiver = { track: te.track };
                        }

                        var event = new Event("track");
                        event.track = te.track;
                        event.receiver = receiver;
                        event.transceiver = { receiver: receiver };
                        event.streams = [e.stream];
                        _this.dispatchEvent(event);
                      });
                      e.stream.getTracks().forEach(function(track) {
                        var receiver = void 0;
                        if (window.RTCPeerConnection.prototype.getReceivers) {
                          receiver = _this.getReceivers().find(function(r) {
                            return r.track && r.track.id === track.id;
                          });
                        } else {
                          receiver = { track: track };
                        }
                        var event = new Event("track");
                        event.track = track;
                        event.receiver = receiver;
                        event.transceiver = { receiver: receiver };
                        event.streams = [e.stream];
                        _this.dispatchEvent(event);
                      });
                    };
                    this.addEventListener("addstream", this._ontrackpoly);
                  }
                  return origSetRemoteDescription.apply(this, arguments);
                };
              } else {
                // even if RTCRtpTransceiver is in window, it is only used and
                // emitted in unified-plan. Unfortunately this means we need
                // to unconditionally wrap the event.
                utils.wrapPeerConnectionEvent(window, "track", function(e) {
                  if (!e.transceiver) {
                    Object.defineProperty(e, "transceiver", { value: { receiver: e.receiver } });
                  }
                  return e;
                });
              }
            }

            function shimGetSendersWithDtmf(window) {
              // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCPeerConnection &&
                !("getSenders" in window.RTCPeerConnection.prototype) &&
                "createDTMFSender" in window.RTCPeerConnection.prototype
              ) {
                var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
                  return {
                    track: track,
                    get dtmf() {
                      if (this._dtmf === undefined) {
                        if (track.kind === "audio") {
                          this._dtmf = pc.createDTMFSender(track);
                        } else {
                          this._dtmf = null;
                        }
                      }
                      return this._dtmf;
                    },
                    _pc: pc
                  };
                };

                // augment addTrack when getSenders is not available.
                if (!window.RTCPeerConnection.prototype.getSenders) {
                  window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                    this._senders = this._senders || [];
                    return this._senders.slice(); // return a copy of the internal state.
                  };
                  var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                  window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                    var sender = origAddTrack.apply(this, arguments);
                    if (!sender) {
                      sender = shimSenderWithDtmf(this, track);
                      this._senders.push(sender);
                    }
                    return sender;
                  };

                  var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                  window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                    origRemoveTrack.apply(this, arguments);
                    var idx = this._senders.indexOf(sender);
                    if (idx !== -1) {
                      this._senders.splice(idx, 1);
                    }
                  };
                }
                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                  var _this2 = this;

                  this._senders = this._senders || [];
                  origAddStream.apply(this, [stream]);
                  stream.getTracks().forEach(function(track) {
                    _this2._senders.push(shimSenderWithDtmf(_this2, track));
                  });
                };

                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                  var _this3 = this;

                  this._senders = this._senders || [];
                  origRemoveStream.apply(this, [stream]);

                  stream.getTracks().forEach(function(track) {
                    var sender = _this3._senders.find(function(s) {
                      return s.track === track;
                    });
                    if (sender) {
                      // remove sender
                      _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                    }
                  });
                };
              } else if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCPeerConnection &&
                "getSenders" in window.RTCPeerConnection.prototype &&
                "createDTMFSender" in window.RTCPeerConnection.prototype &&
                window.RTCRtpSender &&
                !("dtmf" in window.RTCRtpSender.prototype)
              ) {
                var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                  var _this4 = this;

                  var senders = origGetSenders.apply(this, []);
                  senders.forEach(function(sender) {
                    return (sender._pc = _this4);
                  });
                  return senders;
                };

                Object.defineProperty(window.RTCRtpSender.prototype, "dtmf", {
                  get: function get() {
                    if (this._dtmf === undefined) {
                      if (this.track.kind === "audio") {
                        this._dtmf = this._pc.createDTMFSender(this.track);
                      } else {
                        this._dtmf = null;
                      }
                    }
                    return this._dtmf;
                  }
                });
              }
            }

            function shimGetStats(window) {
              if (!window.RTCPeerConnection) {
                return;
              }

              var origGetStats = window.RTCPeerConnection.prototype.getStats;
              window.RTCPeerConnection.prototype.getStats = function getStats() {
                var _this5 = this;

                var _arguments = Array.prototype.slice.call(arguments),
                  selector = _arguments[0],
                  onSucc = _arguments[1],
                  onErr = _arguments[2];

                // If selector is a function then we are in the old style stats so just
                // pass back the original getStats format to avoid breaking old users.

                if (arguments.length > 0 && typeof selector === "function") {
                  return origGetStats.apply(this, arguments);
                }

                // When spec-style getStats is supported, return those when called with
                // either no arguments or the selector argument is null.
                if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== "function")) {
                  return origGetStats.apply(this, []);
                }

                var fixChromeStats_ = function fixChromeStats_(response) {
                  var standardReport = {};
                  var reports = response.result();
                  reports.forEach(function(report) {
                    var standardStats = {
                      id: report.id,
                      timestamp: report.timestamp,
                      type:
                        {
                          localcandidate: "local-candidate",
                          remotecandidate: "remote-candidate"
                        }[report.type] || report.type
                    };
                    report.names().forEach(function(name) {
                      standardStats[name] = report.stat(name);
                    });
                    standardReport[standardStats.id] = standardStats;
                  });

                  return standardReport;
                };

                // shim getStats with maplike support
                var makeMapStats = function makeMapStats(stats) {
                  return new Map(
                    Object.keys(stats).map(function(key) {
                      return [key, stats[key]];
                    })
                  );
                };

                if (arguments.length >= 2) {
                  var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                    onSucc(makeMapStats(fixChromeStats_(response)));
                  };

                  return origGetStats.apply(this, [successCallbackWrapper_, selector]);
                }

                // promise-support
                return new Promise(function(resolve, reject) {
                  origGetStats.apply(_this5, [
                    function(response) {
                      resolve(makeMapStats(fixChromeStats_(response)));
                    },
                    reject
                  ]);
                }).then(onSucc, onErr);
              };
            }

            function shimSenderReceiverGetStats(window) {
              if (
                !(
                  (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                  window.RTCPeerConnection &&
                  window.RTCRtpSender &&
                  window.RTCRtpReceiver
                )
              ) {
                return;
              }

              // shim sender stats.
              if (!("getStats" in window.RTCRtpSender.prototype)) {
                var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                if (origGetSenders) {
                  window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                    var _this6 = this;

                    var senders = origGetSenders.apply(this, []);
                    senders.forEach(function(sender) {
                      return (sender._pc = _this6);
                    });
                    return senders;
                  };
                }

                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                if (origAddTrack) {
                  window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                    var sender = origAddTrack.apply(this, arguments);
                    sender._pc = this;
                    return sender;
                  };
                }
                window.RTCRtpSender.prototype.getStats = function getStats() {
                  var sender = this;
                  return this._pc.getStats().then(function(result) {
                    return (
                      /* Note: this will include stats of all senders that
                       *   send a track with the same id as sender.track as
                       *   it is not possible to identify the RTCRtpSender.
                       */
                      utils.filterStats(result, sender.track, true)
                    );
                  });
                };
              }

              // shim receiver stats.
              if (!("getStats" in window.RTCRtpReceiver.prototype)) {
                var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                if (origGetReceivers) {
                  window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                    var _this7 = this;

                    var receivers = origGetReceivers.apply(this, []);
                    receivers.forEach(function(receiver) {
                      return (receiver._pc = _this7);
                    });
                    return receivers;
                  };
                }
                utils.wrapPeerConnectionEvent(window, "track", function(e) {
                  e.receiver._pc = e.srcElement;
                  return e;
                });
                window.RTCRtpReceiver.prototype.getStats = function getStats() {
                  var receiver = this;
                  return this._pc.getStats().then(function(result) {
                    return utils.filterStats(result, receiver.track, false);
                  });
                };
              }

              if (!("getStats" in window.RTCRtpSender.prototype && "getStats" in window.RTCRtpReceiver.prototype)) {
                return;
              }

              // shim RTCPeerConnection.getStats(track).
              var origGetStats = window.RTCPeerConnection.prototype.getStats;
              window.RTCPeerConnection.prototype.getStats = function getStats() {
                if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
                  var track = arguments[0];
                  var sender = void 0;
                  var receiver = void 0;
                  var err = void 0;
                  this.getSenders().forEach(function(s) {
                    if (s.track === track) {
                      if (sender) {
                        err = true;
                      } else {
                        sender = s;
                      }
                    }
                  });
                  this.getReceivers().forEach(function(r) {
                    if (r.track === track) {
                      if (receiver) {
                        err = true;
                      } else {
                        receiver = r;
                      }
                    }
                    return r.track === track;
                  });
                  if (err || (sender && receiver)) {
                    return Promise.reject(
                      new DOMException(
                        "There are more than one sender or receiver for the track.",
                        "InvalidAccessError"
                      )
                    );
                  } else if (sender) {
                    return sender.getStats();
                  } else if (receiver) {
                    return receiver.getStats();
                  }
                  return Promise.reject(
                    new DOMException("There is no sender or receiver for the track.", "InvalidAccessError")
                  );
                }
                return origGetStats.apply(this, arguments);
              };
            }

            function shimAddTrackRemoveTrackWithNative(window) {
              // shim addTrack/removeTrack with native variants in order to make
              // the interactions with legacy getLocalStreams behave as in other browsers.
              // Keeps a mapping stream.id => [stream, rtpsenders...]
              window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                var _this8 = this;

                this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
                  return _this8._shimmedLocalStreams[streamId][0];
                });
              };

              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
              window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                if (!stream) {
                  return origAddTrack.apply(this, arguments);
                }
                this._shimmedLocalStreams = this._shimmedLocalStreams || {};

                var sender = origAddTrack.apply(this, arguments);
                if (!this._shimmedLocalStreams[stream.id]) {
                  this._shimmedLocalStreams[stream.id] = [stream, sender];
                } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
                  this._shimmedLocalStreams[stream.id].push(sender);
                }
                return sender;
              };

              var origAddStream = window.RTCPeerConnection.prototype.addStream;
              window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                var _this9 = this;

                this._shimmedLocalStreams = this._shimmedLocalStreams || {};

                stream.getTracks().forEach(function(track) {
                  var alreadyExists = _this9.getSenders().find(function(s) {
                    return s.track === track;
                  });
                  if (alreadyExists) {
                    throw new DOMException("Track already exists.", "InvalidAccessError");
                  }
                });
                var existingSenders = this.getSenders();
                origAddStream.apply(this, arguments);
                var newSenders = this.getSenders().filter(function(newSender) {
                  return existingSenders.indexOf(newSender) === -1;
                });
                this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
              };

              var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
              window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                delete this._shimmedLocalStreams[stream.id];
                return origRemoveStream.apply(this, arguments);
              };

              var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
              window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                var _this10 = this;

                this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                if (sender) {
                  Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
                    var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
                    if (idx !== -1) {
                      _this10._shimmedLocalStreams[streamId].splice(idx, 1);
                    }
                    if (_this10._shimmedLocalStreams[streamId].length === 1) {
                      delete _this10._shimmedLocalStreams[streamId];
                    }
                  });
                }
                return origRemoveTrack.apply(this, arguments);
              };
            }

            function shimAddTrackRemoveTrack(window) {
              if (!window.RTCPeerConnection) {
                return;
              }
              var browserDetails = utils.detectBrowser(window);
              // shim addTrack and removeTrack.
              if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
                return shimAddTrackRemoveTrackWithNative(window);
              }

              // also shim pc.getLocalStreams when addTrack is shimmed
              // to return the original streams.
              var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
              window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                var _this11 = this;

                var nativeStreams = origGetLocalStreams.apply(this);
                this._reverseStreams = this._reverseStreams || {};
                return nativeStreams.map(function(stream) {
                  return _this11._reverseStreams[stream.id];
                });
              };

              var origAddStream = window.RTCPeerConnection.prototype.addStream;
              window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                var _this12 = this;

                this._streams = this._streams || {};
                this._reverseStreams = this._reverseStreams || {};

                stream.getTracks().forEach(function(track) {
                  var alreadyExists = _this12.getSenders().find(function(s) {
                    return s.track === track;
                  });
                  if (alreadyExists) {
                    throw new DOMException("Track already exists.", "InvalidAccessError");
                  }
                });
                // Add identity mapping for consistency with addTrack.
                // Unless this is being used with a stream from addTrack.
                if (!this._reverseStreams[stream.id]) {
                  var newStream = new window.MediaStream(stream.getTracks());
                  this._streams[stream.id] = newStream;
                  this._reverseStreams[newStream.id] = stream;
                  stream = newStream;
                }
                origAddStream.apply(this, [stream]);
              };

              var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
              window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                this._streams = this._streams || {};
                this._reverseStreams = this._reverseStreams || {};

                origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
                delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
                delete this._streams[stream.id];
              };

              window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                var _this13 = this;

                if (this.signalingState === "closed") {
                  throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                }
                var streams = [].slice.call(arguments, 1);
                if (
                  streams.length !== 1 ||
                  !streams[0].getTracks().find(function(t) {
                    return t === track;
                  })
                ) {
                  // this is not fully correct but all we can manage without
                  // [[associated MediaStreams]] internal slot.
                  throw new DOMException(
                    "The adapter.js addTrack polyfill only supports a single " +
                      " stream which is associated with the specified track.",
                    "NotSupportedError"
                  );
                }

                var alreadyExists = this.getSenders().find(function(s) {
                  return s.track === track;
                });
                if (alreadyExists) {
                  throw new DOMException("Track already exists.", "InvalidAccessError");
                }

                this._streams = this._streams || {};
                this._reverseStreams = this._reverseStreams || {};
                var oldStream = this._streams[stream.id];
                if (oldStream) {
                  // this is using odd Chrome behaviour, use with caution:
                  // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
                  // Note: we rely on the high-level addTrack/dtmf shim to
                  // create the sender with a dtmf sender.
                  oldStream.addTrack(track);

                  // Trigger ONN async.
                  Promise.resolve().then(function() {
                    _this13.dispatchEvent(new Event("negotiationneeded"));
                  });
                } else {
                  var newStream = new window.MediaStream([track]);
                  this._streams[stream.id] = newStream;
                  this._reverseStreams[newStream.id] = stream;
                  this.addStream(newStream);
                }
                return this.getSenders().find(function(s) {
                  return s.track === track;
                });
              };

              // replace the internal stream id with the external one and
              // vice versa.
              function replaceInternalStreamId(pc, description) {
                var sdp = description.sdp;
                Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                  var externalStream = pc._reverseStreams[internalId];
                  var internalStream = pc._streams[externalStream.id];
                  sdp = sdp.replace(new RegExp(internalStream.id, "g"), externalStream.id);
                });
                return new RTCSessionDescription({
                  type: description.type,
                  sdp: sdp
                });
              }
              function replaceExternalStreamId(pc, description) {
                var sdp = description.sdp;
                Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                  var externalStream = pc._reverseStreams[internalId];
                  var internalStream = pc._streams[externalStream.id];
                  sdp = sdp.replace(new RegExp(externalStream.id, "g"), internalStream.id);
                });
                return new RTCSessionDescription({
                  type: description.type,
                  sdp: sdp
                });
              }
              ["createOffer", "createAnswer"].forEach(function(method) {
                var nativeMethod = window.RTCPeerConnection.prototype[method];
                var methodObj = _defineProperty({}, method, function() {
                  var _this14 = this;

                  var args = arguments;
                  var isLegacyCall = arguments.length && typeof arguments[0] === "function";
                  if (isLegacyCall) {
                    return nativeMethod.apply(this, [
                      function(description) {
                        var desc = replaceInternalStreamId(_this14, description);
                        args[0].apply(null, [desc]);
                      },
                      function(err) {
                        if (args[1]) {
                          args[1].apply(null, err);
                        }
                      },
                      arguments[2]
                    ]);
                  }
                  return nativeMethod.apply(this, arguments).then(function(description) {
                    return replaceInternalStreamId(_this14, description);
                  });
                });
                window.RTCPeerConnection.prototype[method] = methodObj[method];
              });

              var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
              window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
                if (!arguments.length || !arguments[0].type) {
                  return origSetLocalDescription.apply(this, arguments);
                }
                arguments[0] = replaceExternalStreamId(this, arguments[0]);
                return origSetLocalDescription.apply(this, arguments);
              };

              // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

              var origLocalDescription = Object.getOwnPropertyDescriptor(
                window.RTCPeerConnection.prototype,
                "localDescription"
              );
              Object.defineProperty(window.RTCPeerConnection.prototype, "localDescription", {
                get: function get() {
                  var description = origLocalDescription.get.apply(this);
                  if (description.type === "") {
                    return description;
                  }
                  return replaceInternalStreamId(this, description);
                }
              });

              window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                var _this15 = this;

                if (this.signalingState === "closed") {
                  throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                }
                // We can not yet check for sender instanceof RTCRtpSender
                // since we shim RTPSender. So we check if sender._pc is set.
                if (!sender._pc) {
                  throw new DOMException(
                    "Argument 1 of RTCPeerConnection.removeTrack " + "does not implement interface RTCRtpSender.",
                    "TypeError"
                  );
                }
                var isLocal = sender._pc === this;
                if (!isLocal) {
                  throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                }

                // Search for the native stream the senders track belongs to.
                this._streams = this._streams || {};
                var stream = void 0;
                Object.keys(this._streams).forEach(function(streamid) {
                  var hasTrack = _this15._streams[streamid].getTracks().find(function(track) {
                    return sender.track === track;
                  });
                  if (hasTrack) {
                    stream = _this15._streams[streamid];
                  }
                });

                if (stream) {
                  if (stream.getTracks().length === 1) {
                    // if this is the last track of the stream, remove the stream. This
                    // takes care of any shimmed _senders.
                    this.removeStream(this._reverseStreams[stream.id]);
                  } else {
                    // relying on the same odd chrome behaviour as above.
                    stream.removeTrack(sender.track);
                  }
                  this.dispatchEvent(new Event("negotiationneeded"));
                }
              };
            }

            function shimPeerConnection(window) {
              var browserDetails = utils.detectBrowser(window);

              if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
                // very basic support for old versions.
                window.RTCPeerConnection = window.webkitRTCPeerConnection;
              }
              if (!window.RTCPeerConnection) {
                return;
              }

              // shim implicit creation of RTCSessionDescription/RTCIceCandidate
              if (browserDetails.version < 53) {
                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(method) {
                  var nativeMethod = window.RTCPeerConnection.prototype[method];
                  var methodObj = _defineProperty({}, method, function() {
                    arguments[0] = new (method === "addIceCandidate"
                      ? window.RTCIceCandidate
                      : window.RTCSessionDescription)(arguments[0]);
                    return nativeMethod.apply(this, arguments);
                  });
                  window.RTCPeerConnection.prototype[method] = methodObj[method];
                });
              }

              // support for addIceCandidate(null or undefined)
              var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
              window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
                if (!arguments[0]) {
                  if (arguments[1]) {
                    arguments[1].apply(null);
                  }
                  return Promise.resolve();
                }
                // Firefox 68+ emits and processes {candidate: "", ...}, ignore
                // in older versions. Native support planned for Chrome M77.
                if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === "") {
                  return Promise.resolve();
                }
                return nativeAddIceCandidate.apply(this, arguments);
              };
            }

            function fixNegotiationNeeded(window) {
              utils.wrapPeerConnectionEvent(window, "negotiationneeded", function(e) {
                var pc = e.target;
                if (pc.signalingState !== "stable") {
                  return;
                }
                return e;
              });
            }
          },
          { "../utils.js": 15, "./getdisplaymedia": 4, "./getusermedia": 5 }
        ],
        4: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;
            function shimGetDisplayMedia(window, getSourceId) {
              if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) {
                return;
              }
              if (!window.navigator.mediaDevices) {
                return;
              }
              // getSourceId is a function that returns a promise resolving with
              // the sourceId of the screen/window/tab to be shared.
              if (typeof getSourceId !== "function") {
                console.error("shimGetDisplayMedia: getSourceId argument is not " + "a function");
                return;
              }
              window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
                return getSourceId(constraints).then(function(sourceId) {
                  var widthSpecified = constraints.video && constraints.video.width;
                  var heightSpecified = constraints.video && constraints.video.height;
                  var frameRateSpecified = constraints.video && constraints.video.frameRate;
                  constraints.video = {
                    mandatory: {
                      chromeMediaSource: "desktop",
                      chromeMediaSourceId: sourceId,
                      maxFrameRate: frameRateSpecified || 3
                    }
                  };
                  if (widthSpecified) {
                    constraints.video.mandatory.maxWidth = widthSpecified;
                  }
                  if (heightSpecified) {
                    constraints.video.mandatory.maxHeight = heightSpecified;
                  }
                  return window.navigator.mediaDevices.getUserMedia(constraints);
                });
              };
            }
          },
          {}
        ],
        5: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            exports.shimGetUserMedia = shimGetUserMedia;

            var _utils = require("../utils.js");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            var logging = utils.log;

            function shimGetUserMedia(window) {
              var navigator = window && window.navigator;

              if (!navigator.mediaDevices) {
                return;
              }

              var browserDetails = utils.detectBrowser(window);

              var constraintsToChrome_ = function constraintsToChrome_(c) {
                if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== "object" || c.mandatory || c.optional) {
                  return c;
                }
                var cc = {};
                Object.keys(c).forEach(function(key) {
                  if (key === "require" || key === "advanced" || key === "mediaSource") {
                    return;
                  }
                  var r = _typeof(c[key]) === "object" ? c[key] : { ideal: c[key] };
                  if (r.exact !== undefined && typeof r.exact === "number") {
                    r.min = r.max = r.exact;
                  }
                  var oldname_ = function oldname_(prefix, name) {
                    if (prefix) {
                      return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                    }
                    return name === "deviceId" ? "sourceId" : name;
                  };
                  if (r.ideal !== undefined) {
                    cc.optional = cc.optional || [];
                    var oc = {};
                    if (typeof r.ideal === "number") {
                      oc[oldname_("min", key)] = r.ideal;
                      cc.optional.push(oc);
                      oc = {};
                      oc[oldname_("max", key)] = r.ideal;
                      cc.optional.push(oc);
                    } else {
                      oc[oldname_("", key)] = r.ideal;
                      cc.optional.push(oc);
                    }
                  }
                  if (r.exact !== undefined && typeof r.exact !== "number") {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_("", key)] = r.exact;
                  } else {
                    ["min", "max"].forEach(function(mix) {
                      if (r[mix] !== undefined) {
                        cc.mandatory = cc.mandatory || {};
                        cc.mandatory[oldname_(mix, key)] = r[mix];
                      }
                    });
                  }
                });
                if (c.advanced) {
                  cc.optional = (cc.optional || []).concat(c.advanced);
                }
                return cc;
              };

              var shimConstraints_ = function shimConstraints_(constraints, func) {
                if (browserDetails.version >= 61) {
                  return func(constraints);
                }
                constraints = JSON.parse(JSON.stringify(constraints));
                if (constraints && _typeof(constraints.audio) === "object") {
                  var remap = function remap(obj, a, b) {
                    if (a in obj && !(b in obj)) {
                      obj[b] = obj[a];
                      delete obj[a];
                    }
                  };
                  constraints = JSON.parse(JSON.stringify(constraints));
                  remap(constraints.audio, "autoGainControl", "googAutoGainControl");
                  remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
                  constraints.audio = constraintsToChrome_(constraints.audio);
                }
                if (constraints && _typeof(constraints.video) === "object") {
                  // Shim facingMode for mobile & surface pro.
                  var face = constraints.video.facingMode;
                  face =
                    face &&
                    ((typeof face === "undefined" ? "undefined" : _typeof(face)) === "object" ? face : { ideal: face });
                  var getSupportedFacingModeLies = browserDetails.version < 66;

                  if (
                    face &&
                    (face.exact === "user" ||
                      face.exact === "environment" ||
                      face.ideal === "user" ||
                      face.ideal === "environment") &&
                    !(
                      navigator.mediaDevices.getSupportedConstraints &&
                      navigator.mediaDevices.getSupportedConstraints().facingMode &&
                      !getSupportedFacingModeLies
                    )
                  ) {
                    delete constraints.video.facingMode;
                    var matches = void 0;
                    if (face.exact === "environment" || face.ideal === "environment") {
                      matches = ["back", "rear"];
                    } else if (face.exact === "user" || face.ideal === "user") {
                      matches = ["front"];
                    }
                    if (matches) {
                      // Look for matches in label, or use last cam for back (typical).
                      return navigator.mediaDevices.enumerateDevices().then(function(devices) {
                        devices = devices.filter(function(d) {
                          return d.kind === "videoinput";
                        });
                        var dev = devices.find(function(d) {
                          return matches.some(function(match) {
                            return d.label.toLowerCase().includes(match);
                          });
                        });
                        if (!dev && devices.length && matches.includes("back")) {
                          dev = devices[devices.length - 1]; // more likely the back cam
                        }
                        if (dev) {
                          constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
                        }
                        constraints.video = constraintsToChrome_(constraints.video);
                        logging("chrome: " + JSON.stringify(constraints));
                        return func(constraints);
                      });
                    }
                  }
                  constraints.video = constraintsToChrome_(constraints.video);
                }
                logging("chrome: " + JSON.stringify(constraints));
                return func(constraints);
              };

              var shimError_ = function shimError_(e) {
                if (browserDetails.version >= 64) {
                  return e;
                }
                return {
                  name:
                    {
                      PermissionDeniedError: "NotAllowedError",
                      PermissionDismissedError: "NotAllowedError",
                      InvalidStateError: "NotAllowedError",
                      DevicesNotFoundError: "NotFoundError",
                      ConstraintNotSatisfiedError: "OverconstrainedError",
                      TrackStartError: "NotReadableError",
                      MediaDeviceFailedDueToShutdown: "NotAllowedError",
                      MediaDeviceKillSwitchOn: "NotAllowedError",
                      TabCaptureError: "AbortError",
                      ScreenCaptureError: "AbortError",
                      DeviceCaptureError: "AbortError"
                    }[e.name] || e.name,
                  message: e.message,
                  constraint: e.constraint || e.constraintName,
                  toString: function toString() {
                    return this.name + (this.message && ": ") + this.message;
                  }
                };
              };

              var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
                shimConstraints_(constraints, function(c) {
                  navigator.webkitGetUserMedia(c, onSuccess, function(e) {
                    if (onError) {
                      onError(shimError_(e));
                    }
                  });
                });
              };
              navigator.getUserMedia = getUserMedia_.bind(navigator);

              // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
              // function which returns a Promise, it does not accept spec-style
              // constraints.
              if (navigator.mediaDevices.getUserMedia) {
                var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(cs) {
                  return shimConstraints_(cs, function(c) {
                    return origGetUserMedia(c).then(
                      function(stream) {
                        if (
                          (c.audio && !stream.getAudioTracks().length) ||
                          (c.video && !stream.getVideoTracks().length)
                        ) {
                          stream.getTracks().forEach(function(track) {
                            track.stop();
                          });
                          throw new DOMException("", "NotFoundError");
                        }
                        return stream;
                      },
                      function(e) {
                        return Promise.reject(shimError_(e));
                      }
                    );
                  });
                };
              }
            }
          },
          { "../utils.js": 15 }
        ],
        6: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            exports.shimRTCIceCandidate = shimRTCIceCandidate;
            exports.shimMaxMessageSize = shimMaxMessageSize;
            exports.shimSendThrowTypeError = shimSendThrowTypeError;
            exports.shimConnectionState = shimConnectionState;
            exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

            var _sdp = require("sdp");

            var _sdp2 = _interopRequireDefault(_sdp);

            var _utils = require("./utils");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function shimRTCIceCandidate(window) {
              // foundation is arbitrarily chosen as an indicator for full support for
              // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
              if (
                !window.RTCIceCandidate ||
                (window.RTCIceCandidate && "foundation" in window.RTCIceCandidate.prototype)
              ) {
                return;
              }

              var NativeRTCIceCandidate = window.RTCIceCandidate;
              window.RTCIceCandidate = function RTCIceCandidate(args) {
                // Remove the a= which shouldn't be part of the candidate string.
                if (
                  (typeof args === "undefined" ? "undefined" : _typeof(args)) === "object" &&
                  args.candidate &&
                  args.candidate.indexOf("a=") === 0
                ) {
                  args = JSON.parse(JSON.stringify(args));
                  args.candidate = args.candidate.substr(2);
                }

                if (args.candidate && args.candidate.length) {
                  // Augment the native candidate with the parsed fields.
                  var nativeCandidate = new NativeRTCIceCandidate(args);
                  var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
                  var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

                  // Add a serializer that does not serialize the extra attributes.
                  augmentedCandidate.toJSON = function toJSON() {
                    return {
                      candidate: augmentedCandidate.candidate,
                      sdpMid: augmentedCandidate.sdpMid,
                      sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                      usernameFragment: augmentedCandidate.usernameFragment
                    };
                  };
                  return augmentedCandidate;
                }
                return new NativeRTCIceCandidate(args);
              };
              window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

              // Hook up the augmented candidate in onicecandidate and
              // addEventListener('icecandidate', ...)
              utils.wrapPeerConnectionEvent(window, "icecandidate", function(e) {
                if (e.candidate) {
                  Object.defineProperty(e, "candidate", {
                    value: new window.RTCIceCandidate(e.candidate),
                    writable: "false"
                  });
                }
                return e;
              });
            }

            function shimMaxMessageSize(window) {
              if (!window.RTCPeerConnection) {
                return;
              }
              var browserDetails = utils.detectBrowser(window);

              if (!("sctp" in window.RTCPeerConnection.prototype)) {
                Object.defineProperty(window.RTCPeerConnection.prototype, "sctp", {
                  get: function get() {
                    return typeof this._sctp === "undefined" ? null : this._sctp;
                  }
                });
              }

              var sctpInDescription = function sctpInDescription(description) {
                if (!description || !description.sdp) {
                  return false;
                }
                var sections = _sdp2.default.splitSections(description.sdp);
                sections.shift();
                return sections.some(function(mediaSection) {
                  var mLine = _sdp2.default.parseMLine(mediaSection);
                  return mLine && mLine.kind === "application" && mLine.protocol.indexOf("SCTP") !== -1;
                });
              };

              var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
                // TODO: Is there a better solution for detecting Firefox?
                var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                if (match === null || match.length < 2) {
                  return -1;
                }
                var version = parseInt(match[1], 10);
                // Test for NaN (yes, this is ugly)
                return version !== version ? -1 : version;
              };

              var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
                // Every implementation we know can send at least 64 KiB.
                // Note: Although Chrome is technically able to send up to 256 KiB, the
                //       data does not reach the other peer reliably.
                //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
                var canSendMaxMessageSize = 65536;
                if (browserDetails.browser === "firefox") {
                  if (browserDetails.version < 57) {
                    if (remoteIsFirefox === -1) {
                      // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                      // fragmentation.
                      canSendMaxMessageSize = 16384;
                    } else {
                      // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                      // messages. Thus, supporting ~2 GiB when sending.
                      canSendMaxMessageSize = 2147483637;
                    }
                  } else if (browserDetails.version < 60) {
                    // Currently, all FF >= 57 will reset the remote maximum message size
                    // to the default value when a data channel is created at a later
                    // stage. :(
                    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                    canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
                  } else {
                    // FF >= 60 supports sending ~2 GiB
                    canSendMaxMessageSize = 2147483637;
                  }
                }
                return canSendMaxMessageSize;
              };

              var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
                // Note: 65536 bytes is the default value from the SDP spec. Also,
                //       every implementation we know supports receiving 65536 bytes.
                var maxMessageSize = 65536;

                // FF 57 has a slightly incorrect default remote max message size, so
                // we need to adjust it here to avoid a failure when sending.
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
                if (browserDetails.browser === "firefox" && browserDetails.version === 57) {
                  maxMessageSize = 65535;
                }

                var match = _sdp2.default.matchPrefix(description.sdp, "a=max-message-size:");
                if (match.length > 0) {
                  maxMessageSize = parseInt(match[0].substr(19), 10);
                } else if (browserDetails.browser === "firefox" && remoteIsFirefox !== -1) {
                  // If the maximum message size is not present in the remote SDP and
                  // both local and remote are Firefox, the remote peer can receive
                  // ~2 GiB.
                  maxMessageSize = 2147483637;
                }
                return maxMessageSize;
              };

              var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
              window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                this._sctp = null;
                // Chrome decided to not expose .sctp in plan-b mode.
                // As usual, adapter.js has to do an 'ugly worakaround'
                // to cover up the mess.
                if (browserDetails.browser === "chrome" && browserDetails.version >= 76) {
                  var _getConfiguration = this.getConfiguration(),
                    sdpSemantics = _getConfiguration.sdpSemantics;

                  if (sdpSemantics === "plan-b") {
                    Object.defineProperty(this, "sctp", {
                      get: function get() {
                        return typeof this._sctp === "undefined" ? null : this._sctp;
                      },

                      enumerable: true,
                      configurable: true
                    });
                  }
                }

                if (sctpInDescription(arguments[0])) {
                  // Check if the remote is FF.
                  var isFirefox = getRemoteFirefoxVersion(arguments[0]);

                  // Get the maximum message size the local peer is capable of sending
                  var canSendMMS = getCanSendMaxMessageSize(isFirefox);

                  // Get the maximum message size of the remote peer.
                  var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

                  // Determine final maximum message size
                  var maxMessageSize = void 0;
                  if (canSendMMS === 0 && remoteMMS === 0) {
                    maxMessageSize = Number.POSITIVE_INFINITY;
                  } else if (canSendMMS === 0 || remoteMMS === 0) {
                    maxMessageSize = Math.max(canSendMMS, remoteMMS);
                  } else {
                    maxMessageSize = Math.min(canSendMMS, remoteMMS);
                  }

                  // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
                  // attribute.
                  var sctp = {};
                  Object.defineProperty(sctp, "maxMessageSize", {
                    get: function get() {
                      return maxMessageSize;
                    }
                  });
                  this._sctp = sctp;
                }

                return origSetRemoteDescription.apply(this, arguments);
              };
            }

            function shimSendThrowTypeError(window) {
              if (!(window.RTCPeerConnection && "createDataChannel" in window.RTCPeerConnection.prototype)) {
                return;
              }

              // Note: Although Firefox >= 57 has a native implementation, the maximum
              //       message size can be reset for all data channels at a later stage.
              //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

              function wrapDcSend(dc, pc) {
                var origDataChannelSend = dc.send;
                dc.send = function send() {
                  var data = arguments[0];
                  var length = data.length || data.size || data.byteLength;
                  if (dc.readyState === "open" && pc.sctp && length > pc.sctp.maxMessageSize) {
                    throw new TypeError(
                      "Message too large (can send a maximum of " + pc.sctp.maxMessageSize + " bytes)"
                    );
                  }
                  return origDataChannelSend.apply(dc, arguments);
                };
              }
              var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
              window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
                var dataChannel = origCreateDataChannel.apply(this, arguments);
                wrapDcSend(dataChannel, this);
                return dataChannel;
              };
              utils.wrapPeerConnectionEvent(window, "datachannel", function(e) {
                wrapDcSend(e.channel, e.target);
                return e;
              });
            }

            /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
             * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
             * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
             * since DTLS failures would be hidden. See
             * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
             * for the Firefox tracking bug.
             */
            function shimConnectionState(window) {
              if (!window.RTCPeerConnection || "connectionState" in window.RTCPeerConnection.prototype) {
                return;
              }
              var proto = window.RTCPeerConnection.prototype;
              Object.defineProperty(proto, "connectionState", {
                get: function get() {
                  return (
                    {
                      completed: "connected",
                      checking: "connecting"
                    }[this.iceConnectionState] || this.iceConnectionState
                  );
                },

                enumerable: true,
                configurable: true
              });
              Object.defineProperty(proto, "onconnectionstatechange", {
                get: function get() {
                  return this._onconnectionstatechange || null;
                },
                set: function set(cb) {
                  if (this._onconnectionstatechange) {
                    this.removeEventListener("connectionstatechange", this._onconnectionstatechange);
                    delete this._onconnectionstatechange;
                  }
                  if (cb) {
                    this.addEventListener("connectionstatechange", (this._onconnectionstatechange = cb));
                  }
                },

                enumerable: true,
                configurable: true
              });

              ["setLocalDescription", "setRemoteDescription"].forEach(function(method) {
                var origMethod = proto[method];
                proto[method] = function() {
                  if (!this._connectionstatechangepoly) {
                    this._connectionstatechangepoly = function(e) {
                      var pc = e.target;
                      if (pc._lastConnectionState !== pc.connectionState) {
                        pc._lastConnectionState = pc.connectionState;
                        var newEvent = new Event("connectionstatechange", e);
                        pc.dispatchEvent(newEvent);
                      }
                      return e;
                    };
                    this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly);
                  }
                  return origMethod.apply(this, arguments);
                };
              });
            }

            function removeAllowExtmapMixed(window) {
              /* remove a=extmap-allow-mixed for Chrome < M71 */
              if (!window.RTCPeerConnection) {
                return;
              }
              var browserDetails = utils.detectBrowser(window);
              if (browserDetails.browser === "chrome" && browserDetails.version >= 71) {
                return;
              }
              var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
              window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
                if (desc && desc.sdp && desc.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
                  desc.sdp = desc.sdp
                    .split("\n")
                    .filter(function(line) {
                      return line.trim() !== "a=extmap-allow-mixed";
                    })
                    .join("\n");
                }
                return nativeSRD.apply(this, arguments);
              };
            }
          },
          { "./utils": 15, sdp: 17 }
        ],
        7: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

            var _getusermedia = require("./getusermedia");

            Object.defineProperty(exports, "shimGetUserMedia", {
              enumerable: true,
              get: function get() {
                return _getusermedia.shimGetUserMedia;
              }
            });

            var _getdisplaymedia = require("./getdisplaymedia");

            Object.defineProperty(exports, "shimGetDisplayMedia", {
              enumerable: true,
              get: function get() {
                return _getdisplaymedia.shimGetDisplayMedia;
              }
            });
            exports.shimPeerConnection = shimPeerConnection;
            exports.shimReplaceTrack = shimReplaceTrack;

            var _utils = require("../utils");

            var utils = _interopRequireWildcard(_utils);

            var _filtericeservers = require("./filtericeservers");

            var _rtcpeerconnectionShim = require("rtcpeerconnection-shim");

            var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            function shimPeerConnection(window) {
              var browserDetails = utils.detectBrowser(window);

              if (window.RTCIceGatherer) {
                if (!window.RTCIceCandidate) {
                  window.RTCIceCandidate = function RTCIceCandidate(args) {
                    return args;
                  };
                }
                if (!window.RTCSessionDescription) {
                  window.RTCSessionDescription = function RTCSessionDescription(args) {
                    return args;
                  };
                }
                // this adds an additional event listener to MediaStrackTrack that signals
                // when a tracks enabled property was changed. Workaround for a bug in
                // addStream, see below. No longer required in 15025+
                if (browserDetails.version < 15025) {
                  var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, "enabled");
                  Object.defineProperty(window.MediaStreamTrack.prototype, "enabled", {
                    set: function set(value) {
                      origMSTEnabled.set.call(this, value);
                      var ev = new Event("enabled");
                      ev.enabled = value;
                      this.dispatchEvent(ev);
                    }
                  });
                }
              }

              // ORTC defines the DTMF sender a bit different.
              // https://github.com/w3c/ortc/issues/714
              if (window.RTCRtpSender && !("dtmf" in window.RTCRtpSender.prototype)) {
                Object.defineProperty(window.RTCRtpSender.prototype, "dtmf", {
                  get: function get() {
                    if (this._dtmf === undefined) {
                      if (this.track.kind === "audio") {
                        this._dtmf = new window.RTCDtmfSender(this);
                      } else if (this.track.kind === "video") {
                        this._dtmf = null;
                      }
                    }
                    return this._dtmf;
                  }
                });
              }
              // Edge currently only implements the RTCDtmfSender, not the
              // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
              if (window.RTCDtmfSender && !window.RTCDTMFSender) {
                window.RTCDTMFSender = window.RTCDtmfSender;
              }

              var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
              window.RTCPeerConnection = function RTCPeerConnection(config) {
                if (config && config.iceServers) {
                  config.iceServers = (0, _filtericeservers.filterIceServers)(
                    config.iceServers,
                    browserDetails.version
                  );
                  utils.log("ICE servers after filtering:", config.iceServers);
                }
                return new RTCPeerConnectionShim(config);
              };
              window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
            }

            function shimReplaceTrack(window) {
              // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
              if (window.RTCRtpSender && !("replaceTrack" in window.RTCRtpSender.prototype)) {
                window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
              }
            }
          },
          {
            "../utils": 15,
            "./filtericeservers": 8,
            "./getdisplaymedia": 9,
            "./getusermedia": 10,
            "rtcpeerconnection-shim": 16
          }
        ],
        8: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.filterIceServers = filterIceServers;

            var _utils = require("../utils");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            // Edge does not like
            // 1) stun: filtered after 14393 unless ?transport=udp is present
            // 2) turn: that does not have all of turn:host:port?transport=udp
            // 3) turn: with ipv6 addresses
            // 4) turn: occurring muliple times
            function filterIceServers(iceServers, edgeVersion) {
              var hasTurn = false;
              iceServers = JSON.parse(JSON.stringify(iceServers));
              return iceServers.filter(function(server) {
                if (server && (server.urls || server.url)) {
                  var urls = server.urls || server.url;
                  if (server.url && !server.urls) {
                    utils.deprecated("RTCIceServer.url", "RTCIceServer.urls");
                  }
                  var isString = typeof urls === "string";
                  if (isString) {
                    urls = [urls];
                  }
                  urls = urls.filter(function(url) {
                    // filter STUN unconditionally.
                    if (url.indexOf("stun:") === 0) {
                      return false;
                    }

                    var validTurn =
                      url.startsWith("turn") && !url.startsWith("turn:[") && url.includes("transport=udp");
                    if (validTurn && !hasTurn) {
                      hasTurn = true;
                      return true;
                    }
                    return validTurn && !hasTurn;
                  });

                  delete server.url;
                  server.urls = isString ? urls[0] : urls;
                  return !!urls.length;
                }
              });
            }
          },
          { "../utils": 15 }
        ],
        9: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;
            function shimGetDisplayMedia(window) {
              if (!("getDisplayMedia" in window.navigator)) {
                return;
              }
              if (!window.navigator.mediaDevices) {
                return;
              }
              if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) {
                return;
              }
              window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
            }
          },
          {}
        ],
        10: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetUserMedia = shimGetUserMedia;
            function shimGetUserMedia(window) {
              var navigator = window && window.navigator;

              var shimError_ = function shimError_(e) {
                return {
                  name: { PermissionDeniedError: "NotAllowedError" }[e.name] || e.name,
                  message: e.message,
                  constraint: e.constraint,
                  toString: function toString() {
                    return this.name;
                  }
                };
              };

              // getUserMedia error shim.
              var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
              navigator.mediaDevices.getUserMedia = function(c) {
                return origGetUserMedia(c).catch(function(e) {
                  return Promise.reject(shimError_(e));
                });
              };
            }
          },
          {}
        ],
        11: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            var _getusermedia = require("./getusermedia");

            Object.defineProperty(exports, "shimGetUserMedia", {
              enumerable: true,
              get: function get() {
                return _getusermedia.shimGetUserMedia;
              }
            });

            var _getdisplaymedia = require("./getdisplaymedia");

            Object.defineProperty(exports, "shimGetDisplayMedia", {
              enumerable: true,
              get: function get() {
                return _getdisplaymedia.shimGetDisplayMedia;
              }
            });
            exports.shimOnTrack = shimOnTrack;
            exports.shimPeerConnection = shimPeerConnection;
            exports.shimSenderGetStats = shimSenderGetStats;
            exports.shimReceiverGetStats = shimReceiverGetStats;
            exports.shimRemoveStream = shimRemoveStream;
            exports.shimRTCDataChannel = shimRTCDataChannel;

            var _utils = require("../utils");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            function _defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }
              return obj;
            }

            function shimOnTrack(window) {
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCTrackEvent &&
                "receiver" in window.RTCTrackEvent.prototype &&
                !("transceiver" in window.RTCTrackEvent.prototype)
              ) {
                Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
                  get: function get() {
                    return { receiver: this.receiver };
                  }
                });
              }
            }

            function shimPeerConnection(window) {
              var browserDetails = utils.detectBrowser(window);

              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
                !(window.RTCPeerConnection || window.mozRTCPeerConnection)
              ) {
                return; // probably media.peerconnection.enabled=false in about:config
              }
              if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
                // very basic support for old versions.
                window.RTCPeerConnection = window.mozRTCPeerConnection;
              }

              if (browserDetails.version < 53) {
                // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(method) {
                  var nativeMethod = window.RTCPeerConnection.prototype[method];
                  var methodObj = _defineProperty({}, method, function() {
                    arguments[0] = new (method === "addIceCandidate"
                      ? window.RTCIceCandidate
                      : window.RTCSessionDescription)(arguments[0]);
                    return nativeMethod.apply(this, arguments);
                  });
                  window.RTCPeerConnection.prototype[method] = methodObj[method];
                });
              }

              // support for addIceCandidate(null or undefined)
              var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
              window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
                if (!arguments[0]) {
                  if (arguments[1]) {
                    arguments[1].apply(null);
                  }
                  return Promise.resolve();
                }
                // Firefox 68+ emits and processes {candidate: "", ...}, ignore
                // in older versions.
                if (browserDetails.version < 68 && arguments[0] && arguments[0].candidate === "") {
                  return Promise.resolve();
                }
                return nativeAddIceCandidate.apply(this, arguments);
              };

              var modernStatsTypes = {
                inboundrtp: "inbound-rtp",
                outboundrtp: "outbound-rtp",
                candidatepair: "candidate-pair",
                localcandidate: "local-candidate",
                remotecandidate: "remote-candidate"
              };

              var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
              window.RTCPeerConnection.prototype.getStats = function getStats() {
                var _arguments = Array.prototype.slice.call(arguments),
                  selector = _arguments[0],
                  onSucc = _arguments[1],
                  onErr = _arguments[2];

                return nativeGetStats
                  .apply(this, [selector || null])
                  .then(function(stats) {
                    if (browserDetails.version < 53 && !onSucc) {
                      // Shim only promise getStats with spec-hyphens in type names
                      // Leave callback version alone; misc old uses of forEach before Map
                      try {
                        stats.forEach(function(stat) {
                          stat.type = modernStatsTypes[stat.type] || stat.type;
                        });
                      } catch (e) {
                        if (e.name !== "TypeError") {
                          throw e;
                        }
                        // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                        stats.forEach(function(stat, i) {
                          stats.set(
                            i,
                            Object.assign({}, stat, {
                              type: modernStatsTypes[stat.type] || stat.type
                            })
                          );
                        });
                      }
                    }
                    return stats;
                  })
                  .then(onSucc, onErr);
              };
            }

            function shimSenderGetStats(window) {
              if (
                !(
                  (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                  window.RTCPeerConnection &&
                  window.RTCRtpSender
                )
              ) {
                return;
              }
              if (window.RTCRtpSender && "getStats" in window.RTCRtpSender.prototype) {
                return;
              }
              var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
              if (origGetSenders) {
                window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                  var _this = this;

                  var senders = origGetSenders.apply(this, []);
                  senders.forEach(function(sender) {
                    return (sender._pc = _this);
                  });
                  return senders;
                };
              }

              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
              if (origAddTrack) {
                window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                  var sender = origAddTrack.apply(this, arguments);
                  sender._pc = this;
                  return sender;
                };
              }
              window.RTCRtpSender.prototype.getStats = function getStats() {
                return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
              };
            }

            function shimReceiverGetStats(window) {
              if (
                !(
                  (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                  window.RTCPeerConnection &&
                  window.RTCRtpSender
                )
              ) {
                return;
              }
              if (window.RTCRtpSender && "getStats" in window.RTCRtpReceiver.prototype) {
                return;
              }
              var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
              if (origGetReceivers) {
                window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                  var _this2 = this;

                  var receivers = origGetReceivers.apply(this, []);
                  receivers.forEach(function(receiver) {
                    return (receiver._pc = _this2);
                  });
                  return receivers;
                };
              }
              utils.wrapPeerConnectionEvent(window, "track", function(e) {
                e.receiver._pc = e.srcElement;
                return e;
              });
              window.RTCRtpReceiver.prototype.getStats = function getStats() {
                return this._pc.getStats(this.track);
              };
            }

            function shimRemoveStream(window) {
              if (!window.RTCPeerConnection || "removeStream" in window.RTCPeerConnection.prototype) {
                return;
              }
              window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                var _this3 = this;

                utils.deprecated("removeStream", "removeTrack");
                this.getSenders().forEach(function(sender) {
                  if (sender.track && stream.getTracks().includes(sender.track)) {
                    _this3.removeTrack(sender);
                  }
                });
              };
            }

            function shimRTCDataChannel(window) {
              // rename DataChannel to RTCDataChannel (native fix in FF60):
              // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
              if (window.DataChannel && !window.RTCDataChannel) {
                window.RTCDataChannel = window.DataChannel;
              }
            }
          },
          { "../utils": 15, "./getdisplaymedia": 12, "./getusermedia": 13 }
        ],
        12: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;
            function shimGetDisplayMedia(window, preferredMediaSource) {
              if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) {
                return;
              }
              if (!window.navigator.mediaDevices) {
                return;
              }
              window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
                if (!(constraints && constraints.video)) {
                  var err = new DOMException("getDisplayMedia without video " + "constraints is undefined");
                  err.name = "NotFoundError";
                  // from https://heycam.github.io/webidl/#idl-DOMException-error-names
                  err.code = 8;
                  return Promise.reject(err);
                }
                if (constraints.video === true) {
                  constraints.video = { mediaSource: preferredMediaSource };
                } else {
                  constraints.video.mediaSource = preferredMediaSource;
                }
                return window.navigator.mediaDevices.getUserMedia(constraints);
              };
            }
          },
          {}
        ],
        13: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            exports.shimGetUserMedia = shimGetUserMedia;

            var _utils = require("../utils");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            function shimGetUserMedia(window) {
              var browserDetails = utils.detectBrowser(window);
              var navigator = window && window.navigator;
              var MediaStreamTrack = window && window.MediaStreamTrack;

              navigator.getUserMedia = function(constraints, onSuccess, onError) {
                // Replace Firefox 44+'s deprecation warning with unprefixed version.
                utils.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
                navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
              };

              if (
                !(browserDetails.version > 55 && "autoGainControl" in navigator.mediaDevices.getSupportedConstraints())
              ) {
                var remap = function remap(obj, a, b) {
                  if (a in obj && !(b in obj)) {
                    obj[b] = obj[a];
                    delete obj[a];
                  }
                };

                var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(c) {
                  if (
                    (typeof c === "undefined" ? "undefined" : _typeof(c)) === "object" &&
                    _typeof(c.audio) === "object"
                  ) {
                    c = JSON.parse(JSON.stringify(c));
                    remap(c.audio, "autoGainControl", "mozAutoGainControl");
                    remap(c.audio, "noiseSuppression", "mozNoiseSuppression");
                  }
                  return nativeGetUserMedia(c);
                };

                if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
                  var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
                  MediaStreamTrack.prototype.getSettings = function() {
                    var obj = nativeGetSettings.apply(this, arguments);
                    remap(obj, "mozAutoGainControl", "autoGainControl");
                    remap(obj, "mozNoiseSuppression", "noiseSuppression");
                    return obj;
                  };
                }

                if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
                  var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
                  MediaStreamTrack.prototype.applyConstraints = function(c) {
                    if (this.kind === "audio" && (typeof c === "undefined" ? "undefined" : _typeof(c)) === "object") {
                      c = JSON.parse(JSON.stringify(c));
                      remap(c, "autoGainControl", "mozAutoGainControl");
                      remap(c, "noiseSuppression", "mozNoiseSuppression");
                    }
                    return nativeApplyConstraints.apply(this, [c]);
                  };
                }
              }
            }
          },
          { "../utils": 15 }
        ],
        14: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
            exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
            exports.shimCallbacksAPI = shimCallbacksAPI;
            exports.shimGetUserMedia = shimGetUserMedia;
            exports.shimConstraints = shimConstraints;
            exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
            exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
            exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

            var _utils = require("../utils");

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
              if (obj && obj.__esModule) {
                return obj;
              } else {
                var newObj = {};
                if (obj != null) {
                  for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                  }
                }
                newObj.default = obj;
                return newObj;
              }
            }

            function shimLocalStreamsAPI(window) {
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
                !window.RTCPeerConnection
              ) {
                return;
              }
              if (!("getLocalStreams" in window.RTCPeerConnection.prototype)) {
                window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                  if (!this._localStreams) {
                    this._localStreams = [];
                  }
                  return this._localStreams;
                };
              }
              if (!("addStream" in window.RTCPeerConnection.prototype)) {
                var _addTrack = window.RTCPeerConnection.prototype.addTrack;
                window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                  var _this = this;

                  if (!this._localStreams) {
                    this._localStreams = [];
                  }
                  if (!this._localStreams.includes(stream)) {
                    this._localStreams.push(stream);
                  }
                  // Try to emulate Chrome's behaviour of adding in audio-video order.
                  // Safari orders by track id.
                  stream.getAudioTracks().forEach(function(track) {
                    return _addTrack.call(_this, track, stream);
                  });
                  stream.getVideoTracks().forEach(function(track) {
                    return _addTrack.call(_this, track, stream);
                  });
                };

                window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                  if (stream) {
                    if (!this._localStreams) {
                      this._localStreams = [stream];
                    } else if (!this._localStreams.includes(stream)) {
                      this._localStreams.push(stream);
                    }
                  }
                  return _addTrack.call(this, track, stream);
                };
              }
              if (!("removeStream" in window.RTCPeerConnection.prototype)) {
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                  var _this2 = this;

                  if (!this._localStreams) {
                    this._localStreams = [];
                  }
                  var index = this._localStreams.indexOf(stream);
                  if (index === -1) {
                    return;
                  }
                  this._localStreams.splice(index, 1);
                  var tracks = stream.getTracks();
                  this.getSenders().forEach(function(sender) {
                    if (tracks.includes(sender.track)) {
                      _this2.removeTrack(sender);
                    }
                  });
                };
              }
            }

            function shimRemoteStreamsAPI(window) {
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
                !window.RTCPeerConnection
              ) {
                return;
              }
              if (!("getRemoteStreams" in window.RTCPeerConnection.prototype)) {
                window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
                  return this._remoteStreams ? this._remoteStreams : [];
                };
              }
              if (!("onaddstream" in window.RTCPeerConnection.prototype)) {
                Object.defineProperty(window.RTCPeerConnection.prototype, "onaddstream", {
                  get: function get() {
                    return this._onaddstream;
                  },
                  set: function set(f) {
                    var _this3 = this;

                    if (this._onaddstream) {
                      this.removeEventListener("addstream", this._onaddstream);
                      this.removeEventListener("track", this._onaddstreampoly);
                    }
                    this.addEventListener("addstream", (this._onaddstream = f));
                    this.addEventListener(
                      "track",
                      (this._onaddstreampoly = function(e) {
                        e.streams.forEach(function(stream) {
                          if (!_this3._remoteStreams) {
                            _this3._remoteStreams = [];
                          }
                          if (_this3._remoteStreams.includes(stream)) {
                            return;
                          }
                          _this3._remoteStreams.push(stream);
                          var event = new Event("addstream");
                          event.stream = stream;
                          _this3.dispatchEvent(event);
                        });
                      })
                    );
                  }
                });
                var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                  var pc = this;
                  if (!this._onaddstreampoly) {
                    this.addEventListener(
                      "track",
                      (this._onaddstreampoly = function(e) {
                        e.streams.forEach(function(stream) {
                          if (!pc._remoteStreams) {
                            pc._remoteStreams = [];
                          }
                          if (pc._remoteStreams.indexOf(stream) >= 0) {
                            return;
                          }
                          pc._remoteStreams.push(stream);
                          var event = new Event("addstream");
                          event.stream = stream;
                          pc.dispatchEvent(event);
                        });
                      })
                    );
                  }
                  return origSetRemoteDescription.apply(pc, arguments);
                };
              }
            }

            function shimCallbacksAPI(window) {
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
                !window.RTCPeerConnection
              ) {
                return;
              }
              var prototype = window.RTCPeerConnection.prototype;
              var origCreateOffer = prototype.createOffer;
              var origCreateAnswer = prototype.createAnswer;
              var setLocalDescription = prototype.setLocalDescription;
              var setRemoteDescription = prototype.setRemoteDescription;
              var addIceCandidate = prototype.addIceCandidate;

              prototype.createOffer = function createOffer(successCallback, failureCallback) {
                var options = arguments.length >= 2 ? arguments[2] : arguments[0];
                var promise = origCreateOffer.apply(this, [options]);
                if (!failureCallback) {
                  return promise;
                }
                promise.then(successCallback, failureCallback);
                return Promise.resolve();
              };

              prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
                var options = arguments.length >= 2 ? arguments[2] : arguments[0];
                var promise = origCreateAnswer.apply(this, [options]);
                if (!failureCallback) {
                  return promise;
                }
                promise.then(successCallback, failureCallback);
                return Promise.resolve();
              };

              var withCallback = function withCallback(description, successCallback, failureCallback) {
                var promise = setLocalDescription.apply(this, [description]);
                if (!failureCallback) {
                  return promise;
                }
                promise.then(successCallback, failureCallback);
                return Promise.resolve();
              };
              prototype.setLocalDescription = withCallback;

              withCallback = function withCallback(description, successCallback, failureCallback) {
                var promise = setRemoteDescription.apply(this, [description]);
                if (!failureCallback) {
                  return promise;
                }
                promise.then(successCallback, failureCallback);
                return Promise.resolve();
              };
              prototype.setRemoteDescription = withCallback;

              withCallback = function withCallback(candidate, successCallback, failureCallback) {
                var promise = addIceCandidate.apply(this, [candidate]);
                if (!failureCallback) {
                  return promise;
                }
                promise.then(successCallback, failureCallback);
                return Promise.resolve();
              };
              prototype.addIceCandidate = withCallback;
            }

            function shimGetUserMedia(window) {
              var navigator = window && window.navigator;

              if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // shim not needed in Safari 12.1
                var mediaDevices = navigator.mediaDevices;
                var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
                navigator.mediaDevices.getUserMedia = function(constraints) {
                  return _getUserMedia(shimConstraints(constraints));
                };
              }

              if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
                  navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
                }.bind(navigator);
              }
            }

            function shimConstraints(constraints) {
              if (constraints && constraints.video !== undefined) {
                return Object.assign({}, constraints, { video: utils.compactObject(constraints.video) });
              }

              return constraints;
            }

            function shimRTCIceServerUrls(window) {
              // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
              var OrigPeerConnection = window.RTCPeerConnection;
              window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
                if (pcConfig && pcConfig.iceServers) {
                  var newIceServers = [];
                  for (var i = 0; i < pcConfig.iceServers.length; i++) {
                    var server = pcConfig.iceServers[i];
                    if (!server.hasOwnProperty("urls") && server.hasOwnProperty("url")) {
                      utils.deprecated("RTCIceServer.url", "RTCIceServer.urls");
                      server = JSON.parse(JSON.stringify(server));
                      server.urls = server.url;
                      delete server.url;
                      newIceServers.push(server);
                    } else {
                      newIceServers.push(pcConfig.iceServers[i]);
                    }
                  }
                  pcConfig.iceServers = newIceServers;
                }
                return new OrigPeerConnection(pcConfig, pcConstraints);
              };
              window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
              // wrap static methods. Currently just generateCertificate.
              if ("generateCertificate" in window.RTCPeerConnection) {
                Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                  get: function get() {
                    return OrigPeerConnection.generateCertificate;
                  }
                });
              }
            }

            function shimTrackEventTransceiver(window) {
              // Add event.transceiver member over deprecated event.receiver
              if (
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCTrackEvent &&
                "receiver" in window.RTCTrackEvent.prototype &&
                !("transceiver" in window.RTCTrackEvent.prototype)
              ) {
                Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
                  get: function get() {
                    return { receiver: this.receiver };
                  }
                });
              }
            }

            function shimCreateOfferLegacy(window) {
              var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
              window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
                if (offerOptions) {
                  if (typeof offerOptions.offerToReceiveAudio !== "undefined") {
                    // support bit values
                    offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
                  }
                  var audioTransceiver = this.getTransceivers().find(function(transceiver) {
                    return transceiver.receiver.track.kind === "audio";
                  });
                  if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                    if (audioTransceiver.direction === "sendrecv") {
                      if (audioTransceiver.setDirection) {
                        audioTransceiver.setDirection("sendonly");
                      } else {
                        audioTransceiver.direction = "sendonly";
                      }
                    } else if (audioTransceiver.direction === "recvonly") {
                      if (audioTransceiver.setDirection) {
                        audioTransceiver.setDirection("inactive");
                      } else {
                        audioTransceiver.direction = "inactive";
                      }
                    }
                  } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                    this.addTransceiver("audio");
                  }

                  if (typeof offerOptions.offerToReceiveVideo !== "undefined") {
                    // support bit values
                    offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
                  }
                  var videoTransceiver = this.getTransceivers().find(function(transceiver) {
                    return transceiver.receiver.track.kind === "video";
                  });
                  if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                    if (videoTransceiver.direction === "sendrecv") {
                      if (videoTransceiver.setDirection) {
                        videoTransceiver.setDirection("sendonly");
                      } else {
                        videoTransceiver.direction = "sendonly";
                      }
                    } else if (videoTransceiver.direction === "recvonly") {
                      if (videoTransceiver.setDirection) {
                        videoTransceiver.setDirection("inactive");
                      } else {
                        videoTransceiver.direction = "inactive";
                      }
                    }
                  } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                    this.addTransceiver("video");
                  }
                }
                return origCreateOffer.apply(this, arguments);
              };
            }
          },
          { "../utils": 15 }
        ],
        15: [
          function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _typeof =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function(obj) {
                    return typeof obj;
                  }
                : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  };

            exports.extractVersion = extractVersion;
            exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
            exports.disableLog = disableLog;
            exports.disableWarnings = disableWarnings;
            exports.log = log;
            exports.deprecated = deprecated;
            exports.detectBrowser = detectBrowser;
            exports.compactObject = compactObject;
            exports.walkStats = walkStats;
            exports.filterStats = filterStats;

            function _defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }
              return obj;
            }

            var logDisabled_ = true;
            var deprecationWarnings_ = true;

            /**
             * Extract browser version out of the provided user agent string.
             *
             * @param {!string} uastring userAgent string.
             * @param {!string} expr Regular expression used as match criteria.
             * @param {!number} pos position in the version string to be returned.
             * @return {!number} browser version.
             */
            function extractVersion(uastring, expr, pos) {
              var match = uastring.match(expr);
              return match && match.length >= pos && parseInt(match[pos], 10);
            }

            // Wraps the peerconnection event eventNameToWrap in a function
            // which returns the modified event object (or false to prevent
            // the event).
            function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
              if (!window.RTCPeerConnection) {
                return;
              }
              var proto = window.RTCPeerConnection.prototype;
              var nativeAddEventListener = proto.addEventListener;
              proto.addEventListener = function(nativeEventName, cb) {
                if (nativeEventName !== eventNameToWrap) {
                  return nativeAddEventListener.apply(this, arguments);
                }
                var wrappedCallback = function wrappedCallback(e) {
                  var modifiedEvent = wrapper(e);
                  if (modifiedEvent) {
                    cb(modifiedEvent);
                  }
                };
                this._eventMap = this._eventMap || {};
                this._eventMap[cb] = wrappedCallback;
                return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
              };

              var nativeRemoveEventListener = proto.removeEventListener;
              proto.removeEventListener = function(nativeEventName, cb) {
                if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
                  return nativeRemoveEventListener.apply(this, arguments);
                }
                var unwrappedCb = this._eventMap[cb];
                delete this._eventMap[cb];
                return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
              };

              Object.defineProperty(proto, "on" + eventNameToWrap, {
                get: function get() {
                  return this["_on" + eventNameToWrap];
                },
                set: function set(cb) {
                  if (this["_on" + eventNameToWrap]) {
                    this.removeEventListener(eventNameToWrap, this["_on" + eventNameToWrap]);
                    delete this["_on" + eventNameToWrap];
                  }
                  if (cb) {
                    this.addEventListener(eventNameToWrap, (this["_on" + eventNameToWrap] = cb));
                  }
                },

                enumerable: true,
                configurable: true
              });
            }

            function disableLog(bool) {
              if (typeof bool !== "boolean") {
                return new Error(
                  "Argument type: " +
                    (typeof bool === "undefined" ? "undefined" : _typeof(bool)) +
                    ". Please use a boolean."
                );
              }
              logDisabled_ = bool;
              return bool ? "adapter.js logging disabled" : "adapter.js logging enabled";
            }

            /**
             * Disable or enable deprecation warnings
             * @param {!boolean} bool set to true to disable warnings.
             */
            function disableWarnings(bool) {
              if (typeof bool !== "boolean") {
                return new Error(
                  "Argument type: " +
                    (typeof bool === "undefined" ? "undefined" : _typeof(bool)) +
                    ". Please use a boolean."
                );
              }
              deprecationWarnings_ = !bool;
              return "adapter.js deprecation warnings " + (bool ? "disabled" : "enabled");
            }

            function log() {
              if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
                if (logDisabled_) {
                  return;
                }
                if (typeof console !== "undefined" && typeof console.log === "function") {
                  console.log.apply(console, arguments);
                }
              }
            }

            /**
             * Shows a deprecation warning suggesting the modern and spec-compatible API.
             */
            function deprecated(oldMethod, newMethod) {
              if (!deprecationWarnings_) {
                return;
              }
              console.warn(oldMethod + " is deprecated, please use " + newMethod + " instead.");
            }

            /**
             * Browser detector.
             *
             * @return {object} result containing browser and version
             *     properties.
             */
            function detectBrowser(window) {
              var navigator = window.navigator;

              // Returned result object.

              var result = { browser: null, version: null };

              // Fail early if it's not a browser
              if (typeof window === "undefined" || !window.navigator) {
                result.browser = "Not a browser.";
                return result;
              }

              if (navigator.mozGetUserMedia) {
                // Firefox.
                result.browser = "firefox";
                result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
              } else if (
                navigator.webkitGetUserMedia ||
                (window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer)
              ) {
                // Chrome, Chromium, Webview, Opera.
                // Version matches Chrome/WebRTC version.
                // Chrome 74 removed webkitGetUserMedia on http as well so we need the
                // more complicated fallback to webkitRTCPeerConnection.
                result.browser = "chrome";
                result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
              } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
                // Edge.
                result.browser = "edge";
                result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
              } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
                // Safari.
                result.browser = "safari";
                result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
                result.supportsUnifiedPlan =
                  window.RTCRtpTransceiver && "currentDirection" in window.RTCRtpTransceiver.prototype;
              } else {
                // Default fallthrough: not supported.
                result.browser = "Not a supported browser.";
                return result;
              }

              return result;
            }

            /**
             * Checks if something is an object.
             *
             * @param {*} val The something you want to check.
             * @return true if val is an object, false otherwise.
             */
            function isObject(val) {
              return Object.prototype.toString.call(val) === "[object Object]";
            }

            /**
             * Remove all empty objects and undefined values
             * from a nested object -- an enhanced and vanilla version
             * of Lodash's `compact`.
             */
            function compactObject(data) {
              if (!isObject(data)) {
                return data;
              }

              return Object.keys(data).reduce(function(accumulator, key) {
                var isObj = isObject(data[key]);
                var value = isObj ? compactObject(data[key]) : data[key];
                var isEmptyObject = isObj && !Object.keys(value).length;
                if (value === undefined || isEmptyObject) {
                  return accumulator;
                }
                return Object.assign(accumulator, _defineProperty({}, key, value));
              }, {});
            }

            /* iterates the stats graph recursively. */
            function walkStats(stats, base, resultSet) {
              if (!base || resultSet.has(base.id)) {
                return;
              }
              resultSet.set(base.id, base);
              Object.keys(base).forEach(function(name) {
                if (name.endsWith("Id")) {
                  walkStats(stats, stats.get(base[name]), resultSet);
                } else if (name.endsWith("Ids")) {
                  base[name].forEach(function(id) {
                    walkStats(stats, stats.get(id), resultSet);
                  });
                }
              });
            }

            /* filter getStats for a sender/receiver track. */
            function filterStats(result, track, outbound) {
              var streamStatsType = outbound ? "outbound-rtp" : "inbound-rtp";
              var filteredResult = new Map();
              if (track === null) {
                return filteredResult;
              }
              var trackStats = [];
              result.forEach(function(value) {
                if (value.type === "track" && value.trackIdentifier === track.id) {
                  trackStats.push(value);
                }
              });
              trackStats.forEach(function(trackStat) {
                result.forEach(function(stats) {
                  if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                    walkStats(result, stats, filteredResult);
                  }
                });
              });
              return filteredResult;
            }
          },
          {}
        ],
        16: [
          function(require, module, exports) {
            var SDPUtils = require("sdp");

            function fixStatsType(stat) {
              return (
                {
                  inboundrtp: "inbound-rtp",
                  outboundrtp: "outbound-rtp",
                  candidatepair: "candidate-pair",
                  localcandidate: "local-candidate",
                  remotecandidate: "remote-candidate"
                }[stat.type] || stat.type
              );
            }

            function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
              var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

              // Map ICE parameters (ufrag, pwd) to SDP.
              sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

              // Map DTLS parameters to SDP.
              sdp += SDPUtils.writeDtlsParameters(
                transceiver.dtlsTransport.getLocalParameters(),
                type === "offer" ? "actpass" : dtlsRole || "active"
              );

              sdp += "a=mid:" + transceiver.mid + "\r\n";

              if (transceiver.rtpSender && transceiver.rtpReceiver) {
                sdp += "a=sendrecv\r\n";
              } else if (transceiver.rtpSender) {
                sdp += "a=sendonly\r\n";
              } else if (transceiver.rtpReceiver) {
                sdp += "a=recvonly\r\n";
              } else {
                sdp += "a=inactive\r\n";
              }

              if (transceiver.rtpSender) {
                var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
                transceiver.rtpSender._initialTrackId = trackId;
                // spec.
                var msid = "msid:" + (stream ? stream.id : "-") + " " + trackId + "\r\n";
                sdp += "a=" + msid;
                // for Chrome. Legacy should no longer be required.
                sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " " + msid;

                // RTX
                if (transceiver.sendEncodingParameters[0].rtx) {
                  sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " " + msid;
                  sdp +=
                    "a=ssrc-group:FID " +
                    transceiver.sendEncodingParameters[0].ssrc +
                    " " +
                    transceiver.sendEncodingParameters[0].rtx.ssrc +
                    "\r\n";
                }
              }
              // FIXME: this should be written by writeRtpDescription.
              sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " cname:" + SDPUtils.localCName + "\r\n";
              if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
                sdp +=
                  "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " cname:" + SDPUtils.localCName + "\r\n";
              }
              return sdp;
            }

            // Edge does not like
            // 1) stun: filtered after 14393 unless ?transport=udp is present
            // 2) turn: that does not have all of turn:host:port?transport=udp
            // 3) turn: with ipv6 addresses
            // 4) turn: occurring muliple times
            function filterIceServers(iceServers, edgeVersion) {
              var hasTurn = false;
              iceServers = JSON.parse(JSON.stringify(iceServers));
              return iceServers.filter(function(server) {
                if (server && (server.urls || server.url)) {
                  var urls = server.urls || server.url;
                  if (server.url && !server.urls) {
                    console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                  }
                  var isString = typeof urls === "string";
                  if (isString) {
                    urls = [urls];
                  }
                  urls = urls.filter(function(url) {
                    var validTurn =
                      url.indexOf("turn:") === 0 &&
                      url.indexOf("transport=udp") !== -1 &&
                      url.indexOf("turn:[") === -1 &&
                      !hasTurn;

                    if (validTurn) {
                      hasTurn = true;
                      return true;
                    }
                    return url.indexOf("stun:") === 0 && edgeVersion >= 14393 && url.indexOf("?transport=udp") === -1;
                  });

                  delete server.url;
                  server.urls = isString ? urls[0] : urls;
                  return !!urls.length;
                }
              });
            }

            // Determines the intersection of local and remote capabilities.
            function getCommonCapabilities(localCapabilities, remoteCapabilities) {
              var commonCapabilities = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: []
              };

              var findCodecByPayloadType = function(pt, codecs) {
                pt = parseInt(pt, 10);
                for (var i = 0; i < codecs.length; i++) {
                  if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
                    return codecs[i];
                  }
                }
              };

              var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
                var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
                var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
                return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
              };

              localCapabilities.codecs.forEach(function(lCodec) {
                for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
                  var rCodec = remoteCapabilities.codecs[i];
                  if (
                    lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
                    lCodec.clockRate === rCodec.clockRate
                  ) {
                    if (lCodec.name.toLowerCase() === "rtx" && lCodec.parameters && rCodec.parameters.apt) {
                      // for RTX we need to find the local rtx that has a apt
                      // which points to the same local codec as the remote one.
                      if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
                        continue;
                      }
                    }
                    rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                    // number of channels is the highest common number of channels
                    rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
                    // push rCodec so we reply with offerer payload type
                    commonCapabilities.codecs.push(rCodec);

                    // determine common feedback mechanisms
                    rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                      for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                        if (
                          lCodec.rtcpFeedback[j].type === fb.type &&
                          lCodec.rtcpFeedback[j].parameter === fb.parameter
                        ) {
                          return true;
                        }
                      }
                      return false;
                    });
                    // FIXME: also need to determine .parameters
                    //  see https://github.com/openpeer/ortc/issues/569
                    break;
                  }
                }
              });

              localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
                for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
                  var rHeaderExtension = remoteCapabilities.headerExtensions[i];
                  if (lHeaderExtension.uri === rHeaderExtension.uri) {
                    commonCapabilities.headerExtensions.push(rHeaderExtension);
                    break;
                  }
                }
              });

              // FIXME: fecMechanisms
              return commonCapabilities;
            }

            // is action=setLocalDescription with type allowed in signalingState
            function isActionAllowedInSignalingState(action, type, signalingState) {
              return (
                {
                  offer: {
                    setLocalDescription: ["stable", "have-local-offer"],
                    setRemoteDescription: ["stable", "have-remote-offer"]
                  },
                  answer: {
                    setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                    setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
                  }
                }[type][action].indexOf(signalingState) !== -1
              );
            }

            function maybeAddCandidate(iceTransport, candidate) {
              // Edge's internal representation adds some fields therefore
              // not all fieldѕ are taken into account.
              var alreadyAdded = iceTransport.getRemoteCandidates().find(function(remoteCandidate) {
                return (
                  candidate.foundation === remoteCandidate.foundation &&
                  candidate.ip === remoteCandidate.ip &&
                  candidate.port === remoteCandidate.port &&
                  candidate.priority === remoteCandidate.priority &&
                  candidate.protocol === remoteCandidate.protocol &&
                  candidate.type === remoteCandidate.type
                );
              });
              if (!alreadyAdded) {
                iceTransport.addRemoteCandidate(candidate);
              }
              return !alreadyAdded;
            }

            function makeError(name, description) {
              var e = new Error(description);
              e.name = name;
              // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
              e.code = {
                NotSupportedError: 9,
                InvalidStateError: 11,
                InvalidAccessError: 15,
                TypeError: undefined,
                OperationError: undefined
              }[name];
              return e;
            }

            module.exports = function(window, edgeVersion) {
              // https://w3c.github.io/mediacapture-main/#mediastream
              // Helper function to add the track to the stream and
              // dispatch the event ourselves.
              function addTrackToStreamAndFireEvent(track, stream) {
                stream.addTrack(track);
                stream.dispatchEvent(new window.MediaStreamTrackEvent("addtrack", { track: track }));
              }

              function removeTrackFromStreamAndFireEvent(track, stream) {
                stream.removeTrack(track);
                stream.dispatchEvent(new window.MediaStreamTrackEvent("removetrack", { track: track }));
              }

              function fireAddTrack(pc, track, receiver, streams) {
                var trackEvent = new Event("track");
                trackEvent.track = track;
                trackEvent.receiver = receiver;
                trackEvent.transceiver = { receiver: receiver };
                trackEvent.streams = streams;
                window.setTimeout(function() {
                  pc._dispatchEvent("track", trackEvent);
                });
              }

              var RTCPeerConnection = function(config) {
                var pc = this;

                var _eventTarget = document.createDocumentFragment();
                ["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(method) {
                  pc[method] = _eventTarget[method].bind(_eventTarget);
                });

                this.canTrickleIceCandidates = null;

                this.needNegotiation = false;

                this.localStreams = [];
                this.remoteStreams = [];

                this._localDescription = null;
                this._remoteDescription = null;

                this.signalingState = "stable";
                this.iceConnectionState = "new";
                this.connectionState = "new";
                this.iceGatheringState = "new";

                config = JSON.parse(JSON.stringify(config || {}));

                this.usingBundle = config.bundlePolicy === "max-bundle";
                if (config.rtcpMuxPolicy === "negotiate") {
                  throw makeError("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
                } else if (!config.rtcpMuxPolicy) {
                  config.rtcpMuxPolicy = "require";
                }

                switch (config.iceTransportPolicy) {
                  case "all":
                  case "relay":
                    break;
                  default:
                    config.iceTransportPolicy = "all";
                    break;
                }

                switch (config.bundlePolicy) {
                  case "balanced":
                  case "max-compat":
                  case "max-bundle":
                    break;
                  default:
                    config.bundlePolicy = "balanced";
                    break;
                }

                config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

                this._iceGatherers = [];
                if (config.iceCandidatePoolSize) {
                  for (var i = config.iceCandidatePoolSize; i > 0; i--) {
                    this._iceGatherers.push(
                      new window.RTCIceGatherer({
                        iceServers: config.iceServers,
                        gatherPolicy: config.iceTransportPolicy
                      })
                    );
                  }
                } else {
                  config.iceCandidatePoolSize = 0;
                }

                this._config = config;

                // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
                // everything that is needed to describe a SDP m-line.
                this.transceivers = [];

                this._sdpSessionId = SDPUtils.generateSessionId();
                this._sdpSessionVersion = 0;

                this._dtlsRole = undefined; // role for a=setup to use in answers.

                this._isClosed = false;
              };

              Object.defineProperty(RTCPeerConnection.prototype, "localDescription", {
                configurable: true,
                get: function() {
                  return this._localDescription;
                }
              });
              Object.defineProperty(RTCPeerConnection.prototype, "remoteDescription", {
                configurable: true,
                get: function() {
                  return this._remoteDescription;
                }
              });

              // set up event handlers on prototype
              RTCPeerConnection.prototype.onicecandidate = null;
              RTCPeerConnection.prototype.onaddstream = null;
              RTCPeerConnection.prototype.ontrack = null;
              RTCPeerConnection.prototype.onremovestream = null;
              RTCPeerConnection.prototype.onsignalingstatechange = null;
              RTCPeerConnection.prototype.oniceconnectionstatechange = null;
              RTCPeerConnection.prototype.onconnectionstatechange = null;
              RTCPeerConnection.prototype.onicegatheringstatechange = null;
              RTCPeerConnection.prototype.onnegotiationneeded = null;
              RTCPeerConnection.prototype.ondatachannel = null;

              RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
                if (this._isClosed) {
                  return;
                }
                this.dispatchEvent(event);
                if (typeof this["on" + name] === "function") {
                  this["on" + name](event);
                }
              };

              RTCPeerConnection.prototype._emitGatheringStateChange = function() {
                var event = new Event("icegatheringstatechange");
                this._dispatchEvent("icegatheringstatechange", event);
              };

              RTCPeerConnection.prototype.getConfiguration = function() {
                return this._config;
              };

              RTCPeerConnection.prototype.getLocalStreams = function() {
                return this.localStreams;
              };

              RTCPeerConnection.prototype.getRemoteStreams = function() {
                return this.remoteStreams;
              };

              // internal helper to create a transceiver object.
              // (which is not yet the same as the WebRTC 1.0 transceiver)
              RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
                var hasBundleTransport = this.transceivers.length > 0;
                var transceiver = {
                  track: null,
                  iceGatherer: null,
                  iceTransport: null,
                  dtlsTransport: null,
                  localCapabilities: null,
                  remoteCapabilities: null,
                  rtpSender: null,
                  rtpReceiver: null,
                  kind: kind,
                  mid: null,
                  sendEncodingParameters: null,
                  recvEncodingParameters: null,
                  stream: null,
                  associatedRemoteMediaStreams: [],
                  wantReceive: true
                };
                if (this.usingBundle && hasBundleTransport) {
                  transceiver.iceTransport = this.transceivers[0].iceTransport;
                  transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
                } else {
                  var transports = this._createIceAndDtlsTransports();
                  transceiver.iceTransport = transports.iceTransport;
                  transceiver.dtlsTransport = transports.dtlsTransport;
                }
                if (!doNotAdd) {
                  this.transceivers.push(transceiver);
                }
                return transceiver;
              };

              RTCPeerConnection.prototype.addTrack = function(track, stream) {
                if (this._isClosed) {
                  throw makeError("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
                }

                var alreadyExists = this.transceivers.find(function(s) {
                  return s.track === track;
                });

                if (alreadyExists) {
                  throw makeError("InvalidAccessError", "Track already exists.");
                }

                var transceiver;
                for (var i = 0; i < this.transceivers.length; i++) {
                  if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
                    transceiver = this.transceivers[i];
                  }
                }
                if (!transceiver) {
                  transceiver = this._createTransceiver(track.kind);
                }

                this._maybeFireNegotiationNeeded();

                if (this.localStreams.indexOf(stream) === -1) {
                  this.localStreams.push(stream);
                }

                transceiver.track = track;
                transceiver.stream = stream;
                transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
                return transceiver.rtpSender;
              };

              RTCPeerConnection.prototype.addStream = function(stream) {
                var pc = this;
                if (edgeVersion >= 15025) {
                  stream.getTracks().forEach(function(track) {
                    pc.addTrack(track, stream);
                  });
                } else {
                  // Clone is necessary for local demos mostly, attaching directly
                  // to two different senders does not work (build 10547).
                  // Fixed in 15025 (or earlier)
                  var clonedStream = stream.clone();
                  stream.getTracks().forEach(function(track, idx) {
                    var clonedTrack = clonedStream.getTracks()[idx];
                    track.addEventListener("enabled", function(event) {
                      clonedTrack.enabled = event.enabled;
                    });
                  });
                  clonedStream.getTracks().forEach(function(track) {
                    pc.addTrack(track, clonedStream);
                  });
                }
              };

              RTCPeerConnection.prototype.removeTrack = function(sender) {
                if (this._isClosed) {
                  throw makeError("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
                }

                if (!(sender instanceof window.RTCRtpSender)) {
                  throw new TypeError(
                    "Argument 1 of RTCPeerConnection.removeTrack " + "does not implement interface RTCRtpSender."
                  );
                }

                var transceiver = this.transceivers.find(function(t) {
                  return t.rtpSender === sender;
                });

                if (!transceiver) {
                  throw makeError("InvalidAccessError", "Sender was not created by this connection.");
                }
                var stream = transceiver.stream;

                transceiver.rtpSender.stop();
                transceiver.rtpSender = null;
                transceiver.track = null;
                transceiver.stream = null;

                // remove the stream from the set of local streams
                var localStreams = this.transceivers.map(function(t) {
                  return t.stream;
                });
                if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
                  this.localStreams.splice(this.localStreams.indexOf(stream), 1);
                }

                this._maybeFireNegotiationNeeded();
              };

              RTCPeerConnection.prototype.removeStream = function(stream) {
                var pc = this;
                stream.getTracks().forEach(function(track) {
                  var sender = pc.getSenders().find(function(s) {
                    return s.track === track;
                  });
                  if (sender) {
                    pc.removeTrack(sender);
                  }
                });
              };

              RTCPeerConnection.prototype.getSenders = function() {
                return this.transceivers
                  .filter(function(transceiver) {
                    return !!transceiver.rtpSender;
                  })
                  .map(function(transceiver) {
                    return transceiver.rtpSender;
                  });
              };

              RTCPeerConnection.prototype.getReceivers = function() {
                return this.transceivers
                  .filter(function(transceiver) {
                    return !!transceiver.rtpReceiver;
                  })
                  .map(function(transceiver) {
                    return transceiver.rtpReceiver;
                  });
              };

              RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex, usingBundle) {
                var pc = this;
                if (usingBundle && sdpMLineIndex > 0) {
                  return this.transceivers[0].iceGatherer;
                } else if (this._iceGatherers.length) {
                  return this._iceGatherers.shift();
                }
                var iceGatherer = new window.RTCIceGatherer({
                  iceServers: this._config.iceServers,
                  gatherPolicy: this._config.iceTransportPolicy
                });
                Object.defineProperty(iceGatherer, "state", { value: "new", writable: true });

                this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
                this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
                  var end = !event.candidate || Object.keys(event.candidate).length === 0;
                  // polyfill since RTCIceGatherer.state is not implemented in
                  // Edge 10547 yet.
                  iceGatherer.state = end ? "completed" : "gathering";
                  if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
                    pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
                  }
                };
                iceGatherer.addEventListener("localcandidate", this.transceivers[sdpMLineIndex].bufferCandidates);
                return iceGatherer;
              };

              // start gathering from an RTCIceGatherer.
              RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
                var pc = this;
                var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                if (iceGatherer.onlocalcandidate) {
                  return;
                }
                var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
                this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
                iceGatherer.removeEventListener("localcandidate", this.transceivers[sdpMLineIndex].bufferCandidates);
                iceGatherer.onlocalcandidate = function(evt) {
                  if (pc.usingBundle && sdpMLineIndex > 0) {
                    // if we know that we use bundle we can drop candidates with
                    // ѕdpMLineIndex > 0. If we don't do this then our state gets
                    // confused since we dispose the extra ice gatherer.
                    return;
                  }
                  var event = new Event("icecandidate");
                  event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

                  var cand = evt.candidate;
                  // Edge emits an empty object for RTCIceCandidateComplete‥
                  var end = !cand || Object.keys(cand).length === 0;
                  if (end) {
                    // polyfill since RTCIceGatherer.state is not implemented in
                    // Edge 10547 yet.
                    if (iceGatherer.state === "new" || iceGatherer.state === "gathering") {
                      iceGatherer.state = "completed";
                    }
                  } else {
                    if (iceGatherer.state === "new") {
                      iceGatherer.state = "gathering";
                    }
                    // RTCIceCandidate doesn't have a component, needs to be added
                    cand.component = 1;
                    // also the usernameFragment. TODO: update SDP to take both variants.
                    cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

                    var serializedCandidate = SDPUtils.writeCandidate(cand);
                    event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));

                    event.candidate.candidate = serializedCandidate;
                    event.candidate.toJSON = function() {
                      return {
                        candidate: event.candidate.candidate,
                        sdpMid: event.candidate.sdpMid,
                        sdpMLineIndex: event.candidate.sdpMLineIndex,
                        usernameFragment: event.candidate.usernameFragment
                      };
                    };
                  }

                  // update local description.
                  var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
                  if (!end) {
                    sections[event.candidate.sdpMLineIndex] += "a=" + event.candidate.candidate + "\r\n";
                  } else {
                    sections[event.candidate.sdpMLineIndex] += "a=end-of-candidates\r\n";
                  }
                  pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join("");
                  var complete = pc.transceivers.every(function(transceiver) {
                    return transceiver.iceGatherer && transceiver.iceGatherer.state === "completed";
                  });

                  if (pc.iceGatheringState !== "gathering") {
                    pc.iceGatheringState = "gathering";
                    pc._emitGatheringStateChange();
                  }

                  // Emit candidate. Also emit null candidate when all gatherers are
                  // complete.
                  if (!end) {
                    pc._dispatchEvent("icecandidate", event);
                  }
                  if (complete) {
                    pc._dispatchEvent("icecandidate", new Event("icecandidate"));
                    pc.iceGatheringState = "complete";
                    pc._emitGatheringStateChange();
                  }
                };

                // emit already gathered candidates.
                window.setTimeout(function() {
                  bufferedCandidateEvents.forEach(function(e) {
                    iceGatherer.onlocalcandidate(e);
                  });
                }, 0);
              };

              // Create ICE transport and DTLS transport.
              RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
                var pc = this;
                var iceTransport = new window.RTCIceTransport(null);
                iceTransport.onicestatechange = function() {
                  pc._updateIceConnectionState();
                  pc._updateConnectionState();
                };

                var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
                dtlsTransport.ondtlsstatechange = function() {
                  pc._updateConnectionState();
                };
                dtlsTransport.onerror = function() {
                  // onerror does not set state to failed by itself.
                  Object.defineProperty(dtlsTransport, "state", { value: "failed", writable: true });
                  pc._updateConnectionState();
                };

                return {
                  iceTransport: iceTransport,
                  dtlsTransport: dtlsTransport
                };
              };

              // Destroy ICE gatherer, ICE transport and DTLS transport.
              // Without triggering the callbacks.
              RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(sdpMLineIndex) {
                var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                if (iceGatherer) {
                  delete iceGatherer.onlocalcandidate;
                  delete this.transceivers[sdpMLineIndex].iceGatherer;
                }
                var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
                if (iceTransport) {
                  delete iceTransport.onicestatechange;
                  delete this.transceivers[sdpMLineIndex].iceTransport;
                }
                var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
                if (dtlsTransport) {
                  delete dtlsTransport.ondtlsstatechange;
                  delete dtlsTransport.onerror;
                  delete this.transceivers[sdpMLineIndex].dtlsTransport;
                }
              };

              // Start the RTP Sender and Receiver for a transceiver.
              RTCPeerConnection.prototype._transceive = function(transceiver, send, recv) {
                var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
                if (send && transceiver.rtpSender) {
                  params.encodings = transceiver.sendEncodingParameters;
                  params.rtcp = {
                    cname: SDPUtils.localCName,
                    compound: transceiver.rtcpParameters.compound
                  };
                  if (transceiver.recvEncodingParameters.length) {
                    params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
                  }
                  transceiver.rtpSender.send(params);
                }
                if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
                  // remove RTX field in Edge 14942
                  if (transceiver.kind === "video" && transceiver.recvEncodingParameters && edgeVersion < 15019) {
                    transceiver.recvEncodingParameters.forEach(function(p) {
                      delete p.rtx;
                    });
                  }
                  if (transceiver.recvEncodingParameters.length) {
                    params.encodings = transceiver.recvEncodingParameters;
                  } else {
                    params.encodings = [{}];
                  }
                  params.rtcp = {
                    compound: transceiver.rtcpParameters.compound
                  };
                  if (transceiver.rtcpParameters.cname) {
                    params.rtcp.cname = transceiver.rtcpParameters.cname;
                  }
                  if (transceiver.sendEncodingParameters.length) {
                    params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
                  }
                  transceiver.rtpReceiver.receive(params);
                }
              };

              RTCPeerConnection.prototype.setLocalDescription = function(description) {
                var pc = this;

                // Note: pranswer is not supported.
                if (["offer", "answer"].indexOf(description.type) === -1) {
                  return Promise.reject(makeError("TypeError", 'Unsupported type "' + description.type + '"'));
                }

                if (
                  !isActionAllowedInSignalingState("setLocalDescription", description.type, pc.signalingState) ||
                  pc._isClosed
                ) {
                  return Promise.reject(
                    makeError(
                      "InvalidStateError",
                      "Can not set local " + description.type + " in state " + pc.signalingState
                    )
                  );
                }

                var sections;
                var sessionpart;
                if (description.type === "offer") {
                  // VERY limited support for SDP munging. Limited to:
                  // * changing the order of codecs
                  sections = SDPUtils.splitSections(description.sdp);
                  sessionpart = sections.shift();
                  sections.forEach(function(mediaSection, sdpMLineIndex) {
                    var caps = SDPUtils.parseRtpParameters(mediaSection);
                    pc.transceivers[sdpMLineIndex].localCapabilities = caps;
                  });

                  pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                    pc._gather(transceiver.mid, sdpMLineIndex);
                  });
                } else if (description.type === "answer") {
                  sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
                  sessionpart = sections.shift();
                  var isIceLite = SDPUtils.matchPrefix(sessionpart, "a=ice-lite").length > 0;
                  sections.forEach(function(mediaSection, sdpMLineIndex) {
                    var transceiver = pc.transceivers[sdpMLineIndex];
                    var iceGatherer = transceiver.iceGatherer;
                    var iceTransport = transceiver.iceTransport;
                    var dtlsTransport = transceiver.dtlsTransport;
                    var localCapabilities = transceiver.localCapabilities;
                    var remoteCapabilities = transceiver.remoteCapabilities;

                    // treat bundle-only as not-rejected.
                    var rejected =
                      SDPUtils.isRejected(mediaSection) &&
                      SDPUtils.matchPrefix(mediaSection, "a=bundle-only").length === 0;

                    if (!rejected && !transceiver.rejected) {
                      var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                      var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                      if (isIceLite) {
                        remoteDtlsParameters.role = "server";
                      }

                      if (!pc.usingBundle || sdpMLineIndex === 0) {
                        pc._gather(transceiver.mid, sdpMLineIndex);
                        if (iceTransport.state === "new") {
                          iceTransport.start(
                            iceGatherer,
                            remoteIceParameters,
                            isIceLite ? "controlling" : "controlled"
                          );
                        }
                        if (dtlsTransport.state === "new") {
                          dtlsTransport.start(remoteDtlsParameters);
                        }
                      }

                      // Calculate intersection of capabilities.
                      var params = getCommonCapabilities(localCapabilities, remoteCapabilities);

                      // Start the RTCRtpSender. The RTCRtpReceiver for this
                      // transceiver has already been started in setRemoteDescription.
                      pc._transceive(transceiver, params.codecs.length > 0, false);
                    }
                  });
                }

                pc._localDescription = {
                  type: description.type,
                  sdp: description.sdp
                };
                if (description.type === "offer") {
                  pc._updateSignalingState("have-local-offer");
                } else {
                  pc._updateSignalingState("stable");
                }

                return Promise.resolve();
              };

              RTCPeerConnection.prototype.setRemoteDescription = function(description) {
                var pc = this;

                // Note: pranswer is not supported.
                if (["offer", "answer"].indexOf(description.type) === -1) {
                  return Promise.reject(makeError("TypeError", 'Unsupported type "' + description.type + '"'));
                }

                if (
                  !isActionAllowedInSignalingState("setRemoteDescription", description.type, pc.signalingState) ||
                  pc._isClosed
                ) {
                  return Promise.reject(
                    makeError(
                      "InvalidStateError",
                      "Can not set remote " + description.type + " in state " + pc.signalingState
                    )
                  );
                }

                var streams = {};
                pc.remoteStreams.forEach(function(stream) {
                  streams[stream.id] = stream;
                });
                var receiverList = [];
                var sections = SDPUtils.splitSections(description.sdp);
                var sessionpart = sections.shift();
                var isIceLite = SDPUtils.matchPrefix(sessionpart, "a=ice-lite").length > 0;
                var usingBundle = SDPUtils.matchPrefix(sessionpart, "a=group:BUNDLE ").length > 0;
                pc.usingBundle = usingBundle;
                var iceOptions = SDPUtils.matchPrefix(sessionpart, "a=ice-options:")[0];
                if (iceOptions) {
                  pc.canTrickleIceCandidates =
                    iceOptions
                      .substr(14)
                      .split(" ")
                      .indexOf("trickle") >= 0;
                } else {
                  pc.canTrickleIceCandidates = false;
                }

                sections.forEach(function(mediaSection, sdpMLineIndex) {
                  var lines = SDPUtils.splitLines(mediaSection);
                  var kind = SDPUtils.getKind(mediaSection);
                  // treat bundle-only as not-rejected.
                  var rejected =
                    SDPUtils.isRejected(mediaSection) &&
                    SDPUtils.matchPrefix(mediaSection, "a=bundle-only").length === 0;
                  var protocol = lines[0].substr(2).split(" ")[2];

                  var direction = SDPUtils.getDirection(mediaSection, sessionpart);
                  var remoteMsid = SDPUtils.parseMsid(mediaSection);

                  var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

                  // Reject datachannels which are not implemented yet.
                  if (
                    rejected ||
                    (kind === "application" && (protocol === "DTLS/SCTP" || protocol === "UDP/DTLS/SCTP"))
                  ) {
                    // TODO: this is dangerous in the case where a non-rejected m-line
                    //     becomes rejected.
                    pc.transceivers[sdpMLineIndex] = {
                      mid: mid,
                      kind: kind,
                      protocol: protocol,
                      rejected: true
                    };
                    return;
                  }

                  if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
                    // recycle a rejected transceiver.
                    pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
                  }

                  var transceiver;
                  var iceGatherer;
                  var iceTransport;
                  var dtlsTransport;
                  var rtpReceiver;
                  var sendEncodingParameters;
                  var recvEncodingParameters;
                  var localCapabilities;

                  var track;
                  // FIXME: ensure the mediaSection has rtcp-mux set.
                  var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
                  var remoteIceParameters;
                  var remoteDtlsParameters;
                  if (!rejected) {
                    remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                    remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                    remoteDtlsParameters.role = "client";
                  }
                  recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);

                  var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

                  var isComplete = SDPUtils.matchPrefix(mediaSection, "a=end-of-candidates", sessionpart).length > 0;
                  var cands = SDPUtils.matchPrefix(mediaSection, "a=candidate:")
                    .map(function(cand) {
                      return SDPUtils.parseCandidate(cand);
                    })
                    .filter(function(cand) {
                      return cand.component === 1;
                    });

                  // Check if we can use BUNDLE and dispose transports.
                  if (
                    (description.type === "offer" || description.type === "answer") &&
                    !rejected &&
                    usingBundle &&
                    sdpMLineIndex > 0 &&
                    pc.transceivers[sdpMLineIndex]
                  ) {
                    pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                    pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
                    pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
                    pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
                    if (pc.transceivers[sdpMLineIndex].rtpSender) {
                      pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
                    }
                    if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                      pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
                    }
                  }
                  if (description.type === "offer" && !rejected) {
                    transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
                    transceiver.mid = mid;

                    if (!transceiver.iceGatherer) {
                      transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
                    }

                    if (cands.length && transceiver.iceTransport.state === "new") {
                      if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                        transceiver.iceTransport.setRemoteCandidates(cands);
                      } else {
                        cands.forEach(function(candidate) {
                          maybeAddCandidate(transceiver.iceTransport, candidate);
                        });
                      }
                    }

                    localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

                    // filter RTX until additional stuff needed for RTX is implemented
                    // in adapter.js
                    if (edgeVersion < 15019) {
                      localCapabilities.codecs = localCapabilities.codecs.filter(function(codec) {
                        return codec.name !== "rtx";
                      });
                    }

                    sendEncodingParameters = transceiver.sendEncodingParameters || [
                      {
                        ssrc: (2 * sdpMLineIndex + 2) * 1001
                      }
                    ];

                    // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                    var isNewTrack = false;
                    if (direction === "sendrecv" || direction === "sendonly") {
                      isNewTrack = !transceiver.rtpReceiver;
                      rtpReceiver =
                        transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

                      if (isNewTrack) {
                        var stream;
                        track = rtpReceiver.track;
                        // FIXME: does not work with Plan B.
                        if (remoteMsid && remoteMsid.stream === "-");
                        else if (remoteMsid) {
                          if (!streams[remoteMsid.stream]) {
                            streams[remoteMsid.stream] = new window.MediaStream();
                            Object.defineProperty(streams[remoteMsid.stream], "id", {
                              get: function() {
                                return remoteMsid.stream;
                              }
                            });
                          }
                          Object.defineProperty(track, "id", {
                            get: function() {
                              return remoteMsid.track;
                            }
                          });
                          stream = streams[remoteMsid.stream];
                        } else {
                          if (!streams.default) {
                            streams.default = new window.MediaStream();
                          }
                          stream = streams.default;
                        }
                        if (stream) {
                          addTrackToStreamAndFireEvent(track, stream);
                          transceiver.associatedRemoteMediaStreams.push(stream);
                        }
                        receiverList.push([track, rtpReceiver, stream]);
                      }
                    } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                      transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                        var nativeTrack = s.getTracks().find(function(t) {
                          return t.id === transceiver.rtpReceiver.track.id;
                        });
                        if (nativeTrack) {
                          removeTrackFromStreamAndFireEvent(nativeTrack, s);
                        }
                      });
                      transceiver.associatedRemoteMediaStreams = [];
                    }

                    transceiver.localCapabilities = localCapabilities;
                    transceiver.remoteCapabilities = remoteCapabilities;
                    transceiver.rtpReceiver = rtpReceiver;
                    transceiver.rtcpParameters = rtcpParameters;
                    transceiver.sendEncodingParameters = sendEncodingParameters;
                    transceiver.recvEncodingParameters = recvEncodingParameters;

                    // Start the RTCRtpReceiver now. The RTPSender is started in
                    // setLocalDescription.
                    pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
                  } else if (description.type === "answer" && !rejected) {
                    transceiver = pc.transceivers[sdpMLineIndex];
                    iceGatherer = transceiver.iceGatherer;
                    iceTransport = transceiver.iceTransport;
                    dtlsTransport = transceiver.dtlsTransport;
                    rtpReceiver = transceiver.rtpReceiver;
                    sendEncodingParameters = transceiver.sendEncodingParameters;
                    localCapabilities = transceiver.localCapabilities;

                    pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
                    pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
                    pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

                    if (cands.length && iceTransport.state === "new") {
                      if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
                        iceTransport.setRemoteCandidates(cands);
                      } else {
                        cands.forEach(function(candidate) {
                          maybeAddCandidate(transceiver.iceTransport, candidate);
                        });
                      }
                    }

                    if (!usingBundle || sdpMLineIndex === 0) {
                      if (iceTransport.state === "new") {
                        iceTransport.start(iceGatherer, remoteIceParameters, "controlling");
                      }
                      if (dtlsTransport.state === "new") {
                        dtlsTransport.start(remoteDtlsParameters);
                      }
                    }

                    // If the offer contained RTX but the answer did not,
                    // remove RTX from sendEncodingParameters.
                    var commonCapabilities = getCommonCapabilities(
                      transceiver.localCapabilities,
                      transceiver.remoteCapabilities
                    );

                    var hasRtx = commonCapabilities.codecs.filter(function(c) {
                      return c.name.toLowerCase() === "rtx";
                    }).length;
                    if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                      delete transceiver.sendEncodingParameters[0].rtx;
                    }

                    pc._transceive(
                      transceiver,
                      direction === "sendrecv" || direction === "recvonly",
                      direction === "sendrecv" || direction === "sendonly"
                    );

                    // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                    if (rtpReceiver && (direction === "sendrecv" || direction === "sendonly")) {
                      track = rtpReceiver.track;
                      if (remoteMsid) {
                        if (!streams[remoteMsid.stream]) {
                          streams[remoteMsid.stream] = new window.MediaStream();
                        }
                        addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                        receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                      } else {
                        if (!streams.default) {
                          streams.default = new window.MediaStream();
                        }
                        addTrackToStreamAndFireEvent(track, streams.default);
                        receiverList.push([track, rtpReceiver, streams.default]);
                      }
                    } else {
                      // FIXME: actually the receiver should be created later.
                      delete transceiver.rtpReceiver;
                    }
                  }
                });

                if (pc._dtlsRole === undefined) {
                  pc._dtlsRole = description.type === "offer" ? "active" : "passive";
                }

                pc._remoteDescription = {
                  type: description.type,
                  sdp: description.sdp
                };
                if (description.type === "offer") {
                  pc._updateSignalingState("have-remote-offer");
                } else {
                  pc._updateSignalingState("stable");
                }
                Object.keys(streams).forEach(function(sid) {
                  var stream = streams[sid];
                  if (stream.getTracks().length) {
                    if (pc.remoteStreams.indexOf(stream) === -1) {
                      pc.remoteStreams.push(stream);
                      var event = new Event("addstream");
                      event.stream = stream;
                      window.setTimeout(function() {
                        pc._dispatchEvent("addstream", event);
                      });
                    }

                    receiverList.forEach(function(item) {
                      var track = item[0];
                      var receiver = item[1];
                      if (stream.id !== item[2].id) {
                        return;
                      }
                      fireAddTrack(pc, track, receiver, [stream]);
                    });
                  }
                });
                receiverList.forEach(function(item) {
                  if (item[2]) {
                    return;
                  }
                  fireAddTrack(pc, item[0], item[1], []);
                });

                // check whether addIceCandidate({}) was called within four seconds after
                // setRemoteDescription.
                window.setTimeout(function() {
                  if (!(pc && pc.transceivers)) {
                    return;
                  }
                  pc.transceivers.forEach(function(transceiver) {
                    if (
                      transceiver.iceTransport &&
                      transceiver.iceTransport.state === "new" &&
                      transceiver.iceTransport.getRemoteCandidates().length > 0
                    ) {
                      console.warn(
                        "Timeout for addRemoteCandidate. Consider sending " + "an end-of-candidates notification"
                      );
                      transceiver.iceTransport.addRemoteCandidate({});
                    }
                  });
                }, 4000);

                return Promise.resolve();
              };

              RTCPeerConnection.prototype.close = function() {
                this.transceivers.forEach(function(transceiver) {
                  /* not yet
        if (transceiver.iceGatherer) {
          transceiver.iceGatherer.close();
        }
        */
                  if (transceiver.iceTransport) {
                    transceiver.iceTransport.stop();
                  }
                  if (transceiver.dtlsTransport) {
                    transceiver.dtlsTransport.stop();
                  }
                  if (transceiver.rtpSender) {
                    transceiver.rtpSender.stop();
                  }
                  if (transceiver.rtpReceiver) {
                    transceiver.rtpReceiver.stop();
                  }
                });
                // FIXME: clean up tracks, local streams, remote streams, etc
                this._isClosed = true;
                this._updateSignalingState("closed");
              };

              // Update the signaling state.
              RTCPeerConnection.prototype._updateSignalingState = function(newState) {
                this.signalingState = newState;
                var event = new Event("signalingstatechange");
                this._dispatchEvent("signalingstatechange", event);
              };

              // Determine whether to fire the negotiationneeded event.
              RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
                var pc = this;
                if (this.signalingState !== "stable" || this.needNegotiation === true) {
                  return;
                }
                this.needNegotiation = true;
                window.setTimeout(function() {
                  if (pc.needNegotiation) {
                    pc.needNegotiation = false;
                    var event = new Event("negotiationneeded");
                    pc._dispatchEvent("negotiationneeded", event);
                  }
                }, 0);
              };

              // Update the ice connection state.
              RTCPeerConnection.prototype._updateIceConnectionState = function() {
                var newState;
                var states = {
                  new: 0,
                  closed: 0,
                  checking: 0,
                  connected: 0,
                  completed: 0,
                  disconnected: 0,
                  failed: 0
                };
                this.transceivers.forEach(function(transceiver) {
                  if (transceiver.iceTransport && !transceiver.rejected) {
                    states[transceiver.iceTransport.state]++;
                  }
                });

                newState = "new";
                if (states.failed > 0) {
                  newState = "failed";
                } else if (states.checking > 0) {
                  newState = "checking";
                } else if (states.disconnected > 0) {
                  newState = "disconnected";
                } else if (states.new > 0) {
                  newState = "new";
                } else if (states.connected > 0) {
                  newState = "connected";
                } else if (states.completed > 0) {
                  newState = "completed";
                }

                if (newState !== this.iceConnectionState) {
                  this.iceConnectionState = newState;
                  var event = new Event("iceconnectionstatechange");
                  this._dispatchEvent("iceconnectionstatechange", event);
                }
              };

              // Update the connection state.
              RTCPeerConnection.prototype._updateConnectionState = function() {
                var newState;
                var states = {
                  new: 0,
                  closed: 0,
                  connecting: 0,
                  connected: 0,
                  completed: 0,
                  disconnected: 0,
                  failed: 0
                };
                this.transceivers.forEach(function(transceiver) {
                  if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
                    states[transceiver.iceTransport.state]++;
                    states[transceiver.dtlsTransport.state]++;
                  }
                });
                // ICETransport.completed and connected are the same for this purpose.
                states.connected += states.completed;

                newState = "new";
                if (states.failed > 0) {
                  newState = "failed";
                } else if (states.connecting > 0) {
                  newState = "connecting";
                } else if (states.disconnected > 0) {
                  newState = "disconnected";
                } else if (states.new > 0) {
                  newState = "new";
                } else if (states.connected > 0) {
                  newState = "connected";
                }

                if (newState !== this.connectionState) {
                  this.connectionState = newState;
                  var event = new Event("connectionstatechange");
                  this._dispatchEvent("connectionstatechange", event);
                }
              };

              RTCPeerConnection.prototype.createOffer = function() {
                var pc = this;

                if (pc._isClosed) {
                  return Promise.reject(makeError("InvalidStateError", "Can not call createOffer after close"));
                }

                var numAudioTracks = pc.transceivers.filter(function(t) {
                  return t.kind === "audio";
                }).length;
                var numVideoTracks = pc.transceivers.filter(function(t) {
                  return t.kind === "video";
                }).length;

                // Determine number of audio and video tracks we need to send/recv.
                var offerOptions = arguments[0];
                if (offerOptions) {
                  // Reject Chrome legacy constraints.
                  if (offerOptions.mandatory || offerOptions.optional) {
                    throw new TypeError("Legacy mandatory/optional constraints not supported.");
                  }
                  if (offerOptions.offerToReceiveAudio !== undefined) {
                    if (offerOptions.offerToReceiveAudio === true) {
                      numAudioTracks = 1;
                    } else if (offerOptions.offerToReceiveAudio === false) {
                      numAudioTracks = 0;
                    } else {
                      numAudioTracks = offerOptions.offerToReceiveAudio;
                    }
                  }
                  if (offerOptions.offerToReceiveVideo !== undefined) {
                    if (offerOptions.offerToReceiveVideo === true) {
                      numVideoTracks = 1;
                    } else if (offerOptions.offerToReceiveVideo === false) {
                      numVideoTracks = 0;
                    } else {
                      numVideoTracks = offerOptions.offerToReceiveVideo;
                    }
                  }
                }

                pc.transceivers.forEach(function(transceiver) {
                  if (transceiver.kind === "audio") {
                    numAudioTracks--;
                    if (numAudioTracks < 0) {
                      transceiver.wantReceive = false;
                    }
                  } else if (transceiver.kind === "video") {
                    numVideoTracks--;
                    if (numVideoTracks < 0) {
                      transceiver.wantReceive = false;
                    }
                  }
                });

                // Create M-lines for recvonly streams.
                while (numAudioTracks > 0 || numVideoTracks > 0) {
                  if (numAudioTracks > 0) {
                    pc._createTransceiver("audio");
                    numAudioTracks--;
                  }
                  if (numVideoTracks > 0) {
                    pc._createTransceiver("video");
                    numVideoTracks--;
                  }
                }

                var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
                pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                  // For each track, create an ice gatherer, ice transport,
                  // dtls transport, potentially rtpsender and rtpreceiver.
                  var track = transceiver.track;
                  var kind = transceiver.kind;
                  var mid = transceiver.mid || SDPUtils.generateIdentifier();
                  transceiver.mid = mid;

                  if (!transceiver.iceGatherer) {
                    transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
                  }

                  var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
                  // filter RTX until additional stuff needed for RTX is implemented
                  // in adapter.js
                  if (edgeVersion < 15019) {
                    localCapabilities.codecs = localCapabilities.codecs.filter(function(codec) {
                      return codec.name !== "rtx";
                    });
                  }
                  localCapabilities.codecs.forEach(function(codec) {
                    // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                    // by adding level-asymmetry-allowed=1
                    if (codec.name === "H264" && codec.parameters["level-asymmetry-allowed"] === undefined) {
                      codec.parameters["level-asymmetry-allowed"] = "1";
                    }

                    // for subsequent offers, we might have to re-use the payload
                    // type of the last offer.
                    if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
                      transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                        if (
                          codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                          codec.clockRate === remoteCodec.clockRate
                        ) {
                          codec.preferredPayloadType = remoteCodec.payloadType;
                        }
                      });
                    }
                  });
                  localCapabilities.headerExtensions.forEach(function(hdrExt) {
                    var remoteExtensions =
                      (transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions) || [];
                    remoteExtensions.forEach(function(rHdrExt) {
                      if (hdrExt.uri === rHdrExt.uri) {
                        hdrExt.id = rHdrExt.id;
                      }
                    });
                  });

                  // generate an ssrc now, to be used later in rtpSender.send
                  var sendEncodingParameters = transceiver.sendEncodingParameters || [
                    {
                      ssrc: (2 * sdpMLineIndex + 1) * 1001
                    }
                  ];
                  if (track) {
                    // add RTX
                    if (edgeVersion >= 15019 && kind === "video" && !sendEncodingParameters[0].rtx) {
                      sendEncodingParameters[0].rtx = {
                        ssrc: sendEncodingParameters[0].ssrc + 1
                      };
                    }
                  }

                  if (transceiver.wantReceive) {
                    transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
                  }

                  transceiver.localCapabilities = localCapabilities;
                  transceiver.sendEncodingParameters = sendEncodingParameters;
                });

                // always offer BUNDLE and dispose on return if not supported.
                if (pc._config.bundlePolicy !== "max-compat") {
                  sdp +=
                    "a=group:BUNDLE " +
                    pc.transceivers
                      .map(function(t) {
                        return t.mid;
                      })
                      .join(" ") +
                    "\r\n";
                }
                sdp += "a=ice-options:trickle\r\n";

                pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                  sdp += writeMediaSection(
                    transceiver,
                    transceiver.localCapabilities,
                    "offer",
                    transceiver.stream,
                    pc._dtlsRole
                  );
                  sdp += "a=rtcp-rsize\r\n";

                  if (
                    transceiver.iceGatherer &&
                    pc.iceGatheringState !== "new" &&
                    (sdpMLineIndex === 0 || !pc.usingBundle)
                  ) {
                    transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
                      cand.component = 1;
                      sdp += "a=" + SDPUtils.writeCandidate(cand) + "\r\n";
                    });

                    if (transceiver.iceGatherer.state === "completed") {
                      sdp += "a=end-of-candidates\r\n";
                    }
                  }
                });

                var desc = new window.RTCSessionDescription({
                  type: "offer",
                  sdp: sdp
                });
                return Promise.resolve(desc);
              };

              RTCPeerConnection.prototype.createAnswer = function() {
                var pc = this;

                if (pc._isClosed) {
                  return Promise.reject(makeError("InvalidStateError", "Can not call createAnswer after close"));
                }

                if (!(pc.signalingState === "have-remote-offer" || pc.signalingState === "have-local-pranswer")) {
                  return Promise.reject(
                    makeError("InvalidStateError", "Can not call createAnswer in signalingState " + pc.signalingState)
                  );
                }

                var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
                if (pc.usingBundle) {
                  sdp +=
                    "a=group:BUNDLE " +
                    pc.transceivers
                      .map(function(t) {
                        return t.mid;
                      })
                      .join(" ") +
                    "\r\n";
                }
                sdp += "a=ice-options:trickle\r\n";

                var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
                pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                  if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
                    return;
                  }
                  if (transceiver.rejected) {
                    if (transceiver.kind === "application") {
                      if (transceiver.protocol === "DTLS/SCTP") {
                        // legacy fmt
                        sdp += "m=application 0 DTLS/SCTP 5000\r\n";
                      } else {
                        sdp += "m=application 0 " + transceiver.protocol + " webrtc-datachannel\r\n";
                      }
                    } else if (transceiver.kind === "audio") {
                      sdp += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\n" + "a=rtpmap:0 PCMU/8000\r\n";
                    } else if (transceiver.kind === "video") {
                      sdp += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\n" + "a=rtpmap:120 VP8/90000\r\n";
                    }
                    sdp += "c=IN IP4 0.0.0.0\r\n" + "a=inactive\r\n" + "a=mid:" + transceiver.mid + "\r\n";
                    return;
                  }

                  // FIXME: look at direction.
                  if (transceiver.stream) {
                    var localTrack;
                    if (transceiver.kind === "audio") {
                      localTrack = transceiver.stream.getAudioTracks()[0];
                    } else if (transceiver.kind === "video") {
                      localTrack = transceiver.stream.getVideoTracks()[0];
                    }
                    if (localTrack) {
                      // add RTX
                      if (
                        edgeVersion >= 15019 &&
                        transceiver.kind === "video" &&
                        !transceiver.sendEncodingParameters[0].rtx
                      ) {
                        transceiver.sendEncodingParameters[0].rtx = {
                          ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                        };
                      }
                    }
                  }

                  // Calculate intersection of capabilities.
                  var commonCapabilities = getCommonCapabilities(
                    transceiver.localCapabilities,
                    transceiver.remoteCapabilities
                  );

                  var hasRtx = commonCapabilities.codecs.filter(function(c) {
                    return c.name.toLowerCase() === "rtx";
                  }).length;
                  if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                    delete transceiver.sendEncodingParameters[0].rtx;
                  }

                  sdp += writeMediaSection(transceiver, commonCapabilities, "answer", transceiver.stream, pc._dtlsRole);
                  if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
                    sdp += "a=rtcp-rsize\r\n";
                  }
                });

                var desc = new window.RTCSessionDescription({
                  type: "answer",
                  sdp: sdp
                });
                return Promise.resolve(desc);
              };

              RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
                var pc = this;
                var sections;
                if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
                  return Promise.reject(new TypeError("sdpMLineIndex or sdpMid required"));
                }

                // TODO: needs to go into ops queue.
                return new Promise(function(resolve, reject) {
                  if (!pc._remoteDescription) {
                    return reject(
                      makeError("InvalidStateError", "Can not add ICE candidate without a remote description")
                    );
                  } else if (!candidate || candidate.candidate === "") {
                    for (var j = 0; j < pc.transceivers.length; j++) {
                      if (pc.transceivers[j].rejected) {
                        continue;
                      }
                      pc.transceivers[j].iceTransport.addRemoteCandidate({});
                      sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                      sections[j] += "a=end-of-candidates\r\n";
                      pc._remoteDescription.sdp =
                        SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join("");
                      if (pc.usingBundle) {
                        break;
                      }
                    }
                  } else {
                    var sdpMLineIndex = candidate.sdpMLineIndex;
                    if (candidate.sdpMid) {
                      for (var i = 0; i < pc.transceivers.length; i++) {
                        if (pc.transceivers[i].mid === candidate.sdpMid) {
                          sdpMLineIndex = i;
                          break;
                        }
                      }
                    }
                    var transceiver = pc.transceivers[sdpMLineIndex];
                    if (transceiver) {
                      if (transceiver.rejected) {
                        return resolve();
                      }
                      var cand =
                        Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
                      // Ignore Chrome's invalid candidates since Edge does not like them.
                      if (cand.protocol === "tcp" && (cand.port === 0 || cand.port === 9)) {
                        return resolve();
                      }
                      // Ignore RTCP candidates, we assume RTCP-MUX.
                      if (cand.component && cand.component !== 1) {
                        return resolve();
                      }
                      // when using bundle, avoid adding candidates to the wrong
                      // ice transport. And avoid adding candidates added in the SDP.
                      if (
                        sdpMLineIndex === 0 ||
                        (sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport)
                      ) {
                        if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                          return reject(makeError("OperationError", "Can not add ICE candidate"));
                        }
                      }

                      // update the remoteDescription.
                      var candidateString = candidate.candidate.trim();
                      if (candidateString.indexOf("a=") === 0) {
                        candidateString = candidateString.substr(2);
                      }
                      sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                      sections[sdpMLineIndex] += "a=" + (cand.type ? candidateString : "end-of-candidates") + "\r\n";
                      pc._remoteDescription.sdp =
                        SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join("");
                    } else {
                      return reject(makeError("OperationError", "Can not add ICE candidate"));
                    }
                  }
                  resolve();
                });
              };

              RTCPeerConnection.prototype.getStats = function(selector) {
                if (selector && selector instanceof window.MediaStreamTrack) {
                  var senderOrReceiver = null;
                  this.transceivers.forEach(function(transceiver) {
                    if (transceiver.rtpSender && transceiver.rtpSender.track === selector) {
                      senderOrReceiver = transceiver.rtpSender;
                    } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) {
                      senderOrReceiver = transceiver.rtpReceiver;
                    }
                  });
                  if (!senderOrReceiver) {
                    throw makeError("InvalidAccessError", "Invalid selector.");
                  }
                  return senderOrReceiver.getStats();
                }

                var promises = [];
                this.transceivers.forEach(function(transceiver) {
                  ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(
                    method
                  ) {
                    if (transceiver[method]) {
                      promises.push(transceiver[method].getStats());
                    }
                  });
                });
                return Promise.all(promises).then(function(allStats) {
                  var results = new Map();
                  allStats.forEach(function(stats) {
                    stats.forEach(function(stat) {
                      results.set(stat.id, stat);
                    });
                  });
                  return results;
                });
              };

              // fix low-level stat names and return Map instead of object.
              var ortcObjects = [
                "RTCRtpSender",
                "RTCRtpReceiver",
                "RTCIceGatherer",
                "RTCIceTransport",
                "RTCDtlsTransport"
              ];
              ortcObjects.forEach(function(ortcObjectName) {
                var obj = window[ortcObjectName];
                if (obj && obj.prototype && obj.prototype.getStats) {
                  var nativeGetstats = obj.prototype.getStats;
                  obj.prototype.getStats = function() {
                    return nativeGetstats.apply(this).then(function(nativeStats) {
                      var mapStats = new Map();
                      Object.keys(nativeStats).forEach(function(id) {
                        nativeStats[id].type = fixStatsType(nativeStats[id]);
                        mapStats.set(id, nativeStats[id]);
                      });
                      return mapStats;
                    });
                  };
                }
              });

              // legacy callback shims. Should be moved to adapter.js some days.
              var methods = ["createOffer", "createAnswer"];
              methods.forEach(function(method) {
                var nativeMethod = RTCPeerConnection.prototype[method];
                RTCPeerConnection.prototype[method] = function() {
                  var args = arguments;
                  if (typeof args[0] === "function" || typeof args[1] === "function") {
                    // legacy
                    return nativeMethod.apply(this, [arguments[2]]).then(
                      function(description) {
                        if (typeof args[0] === "function") {
                          args[0].apply(null, [description]);
                        }
                      },
                      function(error) {
                        if (typeof args[1] === "function") {
                          args[1].apply(null, [error]);
                        }
                      }
                    );
                  }
                  return nativeMethod.apply(this, arguments);
                };
              });

              methods = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"];
              methods.forEach(function(method) {
                var nativeMethod = RTCPeerConnection.prototype[method];
                RTCPeerConnection.prototype[method] = function() {
                  var args = arguments;
                  if (typeof args[1] === "function" || typeof args[2] === "function") {
                    // legacy
                    return nativeMethod.apply(this, arguments).then(
                      function() {
                        if (typeof args[1] === "function") {
                          args[1].apply(null);
                        }
                      },
                      function(error) {
                        if (typeof args[2] === "function") {
                          args[2].apply(null, [error]);
                        }
                      }
                    );
                  }
                  return nativeMethod.apply(this, arguments);
                };
              });

              // getStats is special. It doesn't have a spec legacy method yet we support
              // getStats(something, cb) without error callbacks.
              ["getStats"].forEach(function(method) {
                var nativeMethod = RTCPeerConnection.prototype[method];
                RTCPeerConnection.prototype[method] = function() {
                  var args = arguments;
                  if (typeof args[1] === "function") {
                    return nativeMethod.apply(this, arguments).then(function() {
                      if (typeof args[1] === "function") {
                        args[1].apply(null);
                      }
                    });
                  }
                  return nativeMethod.apply(this, arguments);
                };
              });

              return RTCPeerConnection;
            };
          },
          { sdp: 17 }
        ],
        17: [
          function(require, module, exports) {
            // SDP helpers.
            var SDPUtils = {};

            // Generate an alphanumeric identifier for cname or mids.
            // TODO: use UUIDs instead? https://gist.github.com/jed/982883
            SDPUtils.generateIdentifier = function() {
              return Math.random()
                .toString(36)
                .substr(2, 10);
            };

            // The RTCP CNAME used by all peerconnections from the same JS.
            SDPUtils.localCName = SDPUtils.generateIdentifier();

            // Splits SDP into lines, dealing with both CRLF and LF.
            SDPUtils.splitLines = function(blob) {
              return blob
                .trim()
                .split("\n")
                .map(function(line) {
                  return line.trim();
                });
            };
            // Splits SDP into sessionpart and mediasections. Ensures CRLF.
            SDPUtils.splitSections = function(blob) {
              var parts = blob.split("\nm=");
              return parts.map(function(part, index) {
                return (index > 0 ? "m=" + part : part).trim() + "\r\n";
              });
            };

            // returns the session description.
            SDPUtils.getDescription = function(blob) {
              var sections = SDPUtils.splitSections(blob);
              return sections && sections[0];
            };

            // returns the individual media sections.
            SDPUtils.getMediaSections = function(blob) {
              var sections = SDPUtils.splitSections(blob);
              sections.shift();
              return sections;
            };

            // Returns lines that start with a certain prefix.
            SDPUtils.matchPrefix = function(blob, prefix) {
              return SDPUtils.splitLines(blob).filter(function(line) {
                return line.indexOf(prefix) === 0;
              });
            };

            // Parses an ICE candidate line. Sample input:
            // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
            // rport 55996"
            SDPUtils.parseCandidate = function(line) {
              var parts;
              // Parse both variants.
              if (line.indexOf("a=candidate:") === 0) {
                parts = line.substring(12).split(" ");
              } else {
                parts = line.substring(10).split(" ");
              }

              var candidate = {
                foundation: parts[0],
                component: parseInt(parts[1], 10),
                protocol: parts[2].toLowerCase(),
                priority: parseInt(parts[3], 10),
                ip: parts[4],
                address: parts[4], // address is an alias for ip.
                port: parseInt(parts[5], 10),
                // skip parts[6] == 'typ'
                type: parts[7]
              };

              for (var i = 8; i < parts.length; i += 2) {
                switch (parts[i]) {
                  case "raddr":
                    candidate.relatedAddress = parts[i + 1];
                    break;
                  case "rport":
                    candidate.relatedPort = parseInt(parts[i + 1], 10);
                    break;
                  case "tcptype":
                    candidate.tcpType = parts[i + 1];
                    break;
                  case "ufrag":
                    candidate.ufrag = parts[i + 1]; // for backward compability.
                    candidate.usernameFragment = parts[i + 1];
                    break;
                  default:
                    // extension handling, in particular ufrag
                    candidate[parts[i]] = parts[i + 1];
                    break;
                }
              }
              return candidate;
            };

            // Translates a candidate object into SDP candidate attribute.
            SDPUtils.writeCandidate = function(candidate) {
              var sdp = [];
              sdp.push(candidate.foundation);
              sdp.push(candidate.component);
              sdp.push(candidate.protocol.toUpperCase());
              sdp.push(candidate.priority);
              sdp.push(candidate.address || candidate.ip);
              sdp.push(candidate.port);

              var type = candidate.type;
              sdp.push("typ");
              sdp.push(type);
              if (type !== "host" && candidate.relatedAddress && candidate.relatedPort) {
                sdp.push("raddr");
                sdp.push(candidate.relatedAddress);
                sdp.push("rport");
                sdp.push(candidate.relatedPort);
              }
              if (candidate.tcpType && candidate.protocol.toLowerCase() === "tcp") {
                sdp.push("tcptype");
                sdp.push(candidate.tcpType);
              }
              if (candidate.usernameFragment || candidate.ufrag) {
                sdp.push("ufrag");
                sdp.push(candidate.usernameFragment || candidate.ufrag);
              }
              return "candidate:" + sdp.join(" ");
            };

            // Parses an ice-options line, returns an array of option tags.
            // a=ice-options:foo bar
            SDPUtils.parseIceOptions = function(line) {
              return line.substr(14).split(" ");
            };

            // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
            // a=rtpmap:111 opus/48000/2
            SDPUtils.parseRtpMap = function(line) {
              var parts = line.substr(9).split(" ");
              var parsed = {
                payloadType: parseInt(parts.shift(), 10) // was: id
              };

              parts = parts[0].split("/");

              parsed.name = parts[0];
              parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
              parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
              // legacy alias, got renamed back to channels in ORTC.
              parsed.numChannels = parsed.channels;
              return parsed;
            };

            // Generate an a=rtpmap line from RTCRtpCodecCapability or
            // RTCRtpCodecParameters.
            SDPUtils.writeRtpMap = function(codec) {
              var pt = codec.payloadType;
              if (codec.preferredPayloadType !== undefined) {
                pt = codec.preferredPayloadType;
              }
              var channels = codec.channels || codec.numChannels || 1;
              return (
                "a=rtpmap:" +
                pt +
                " " +
                codec.name +
                "/" +
                codec.clockRate +
                (channels !== 1 ? "/" + channels : "") +
                "\r\n"
              );
            };

            // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
            // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
            // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
            SDPUtils.parseExtmap = function(line) {
              var parts = line.substr(9).split(" ");
              return {
                id: parseInt(parts[0], 10),
                direction: parts[0].indexOf("/") > 0 ? parts[0].split("/")[1] : "sendrecv",
                uri: parts[1]
              };
            };

            // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
            // RTCRtpHeaderExtension.
            SDPUtils.writeExtmap = function(headerExtension) {
              return (
                "a=extmap:" +
                (headerExtension.id || headerExtension.preferredId) +
                (headerExtension.direction && headerExtension.direction !== "sendrecv"
                  ? "/" + headerExtension.direction
                  : "") +
                " " +
                headerExtension.uri +
                "\r\n"
              );
            };

            // Parses an ftmp line, returns dictionary. Sample input:
            // a=fmtp:96 vbr=on;cng=on
            // Also deals with vbr=on; cng=on
            SDPUtils.parseFmtp = function(line) {
              var parsed = {};
              var kv;
              var parts = line.substr(line.indexOf(" ") + 1).split(";");
              for (var j = 0; j < parts.length; j++) {
                kv = parts[j].trim().split("=");
                parsed[kv[0].trim()] = kv[1];
              }
              return parsed;
            };

            // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
            SDPUtils.writeFmtp = function(codec) {
              var line = "";
              var pt = codec.payloadType;
              if (codec.preferredPayloadType !== undefined) {
                pt = codec.preferredPayloadType;
              }
              if (codec.parameters && Object.keys(codec.parameters).length) {
                var params = [];
                Object.keys(codec.parameters).forEach(function(param) {
                  if (codec.parameters[param]) {
                    params.push(param + "=" + codec.parameters[param]);
                  } else {
                    params.push(param);
                  }
                });
                line += "a=fmtp:" + pt + " " + params.join(";") + "\r\n";
              }
              return line;
            };

            // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
            // a=rtcp-fb:98 nack rpsi
            SDPUtils.parseRtcpFb = function(line) {
              var parts = line.substr(line.indexOf(" ") + 1).split(" ");
              return {
                type: parts.shift(),
                parameter: parts.join(" ")
              };
            };
            // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
            SDPUtils.writeRtcpFb = function(codec) {
              var lines = "";
              var pt = codec.payloadType;
              if (codec.preferredPayloadType !== undefined) {
                pt = codec.preferredPayloadType;
              }
              if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
                // FIXME: special handling for trr-int?
                codec.rtcpFeedback.forEach(function(fb) {
                  lines +=
                    "a=rtcp-fb:" +
                    pt +
                    " " +
                    fb.type +
                    (fb.parameter && fb.parameter.length ? " " + fb.parameter : "") +
                    "\r\n";
                });
              }
              return lines;
            };

            // Parses an RFC 5576 ssrc media attribute. Sample input:
            // a=ssrc:3735928559 cname:something
            SDPUtils.parseSsrcMedia = function(line) {
              var sp = line.indexOf(" ");
              var parts = {
                ssrc: parseInt(line.substr(7, sp - 7), 10)
              };
              var colon = line.indexOf(":", sp);
              if (colon > -1) {
                parts.attribute = line.substr(sp + 1, colon - sp - 1);
                parts.value = line.substr(colon + 1);
              } else {
                parts.attribute = line.substr(sp + 1);
              }
              return parts;
            };

            SDPUtils.parseSsrcGroup = function(line) {
              var parts = line.substr(13).split(" ");
              return {
                semantics: parts.shift(),
                ssrcs: parts.map(function(ssrc) {
                  return parseInt(ssrc, 10);
                })
              };
            };

            // Extracts the MID (RFC 5888) from a media section.
            // returns the MID or undefined if no mid line was found.
            SDPUtils.getMid = function(mediaSection) {
              var mid = SDPUtils.matchPrefix(mediaSection, "a=mid:")[0];
              if (mid) {
                return mid.substr(6);
              }
            };

            SDPUtils.parseFingerprint = function(line) {
              var parts = line.substr(14).split(" ");
              return {
                algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
                value: parts[1]
              };
            };

            // Extracts DTLS parameters from SDP media section or sessionpart.
            // FIXME: for consistency with other functions this should only
            //   get the fingerprint line as input. See also getIceParameters.
            SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
              var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, "a=fingerprint:");
              // Note: a=setup line is ignored since we use the 'auto' role.
              // Note2: 'algorithm' is not case sensitive except in Edge.
              return {
                role: "auto",
                fingerprints: lines.map(SDPUtils.parseFingerprint)
              };
            };

            // Serializes DTLS parameters to SDP.
            SDPUtils.writeDtlsParameters = function(params, setupType) {
              var sdp = "a=setup:" + setupType + "\r\n";
              params.fingerprints.forEach(function(fp) {
                sdp += "a=fingerprint:" + fp.algorithm + " " + fp.value + "\r\n";
              });
              return sdp;
            };
            // Parses ICE information from SDP media section or sessionpart.
            // FIXME: for consistency with other functions this should only
            //   get the ice-ufrag and ice-pwd lines as input.
            SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
              var lines = SDPUtils.splitLines(mediaSection);
              // Search in session part, too.
              lines = lines.concat(SDPUtils.splitLines(sessionpart));
              var iceParameters = {
                usernameFragment: lines
                  .filter(function(line) {
                    return line.indexOf("a=ice-ufrag:") === 0;
                  })[0]
                  .substr(12),
                password: lines
                  .filter(function(line) {
                    return line.indexOf("a=ice-pwd:") === 0;
                  })[0]
                  .substr(10)
              };
              return iceParameters;
            };

            // Serializes ICE parameters to SDP.
            SDPUtils.writeIceParameters = function(params) {
              return "a=ice-ufrag:" + params.usernameFragment + "\r\n" + "a=ice-pwd:" + params.password + "\r\n";
            };

            // Parses the SDP media section and returns RTCRtpParameters.
            SDPUtils.parseRtpParameters = function(mediaSection) {
              var description = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: [],
                rtcp: []
              };
              var lines = SDPUtils.splitLines(mediaSection);
              var mline = lines[0].split(" ");
              for (var i = 3; i < mline.length; i++) {
                // find all codecs from mline[3..]
                var pt = mline[i];
                var rtpmapline = SDPUtils.matchPrefix(mediaSection, "a=rtpmap:" + pt + " ")[0];
                if (rtpmapline) {
                  var codec = SDPUtils.parseRtpMap(rtpmapline);
                  var fmtps = SDPUtils.matchPrefix(mediaSection, "a=fmtp:" + pt + " ");
                  // Only the first a=fmtp:<pt> is considered.
                  codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
                  codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, "a=rtcp-fb:" + pt + " ").map(
                    SDPUtils.parseRtcpFb
                  );
                  description.codecs.push(codec);
                  // parse FEC mechanisms from rtpmap lines.
                  switch (codec.name.toUpperCase()) {
                    case "RED":
                    case "ULPFEC":
                      description.fecMechanisms.push(codec.name.toUpperCase());
                      break;
                    default:
                      // only RED and ULPFEC are recognized as FEC mechanisms.
                      break;
                  }
                }
              }
              SDPUtils.matchPrefix(mediaSection, "a=extmap:").forEach(function(line) {
                description.headerExtensions.push(SDPUtils.parseExtmap(line));
              });
              // FIXME: parse rtcp.
              return description;
            };

            // Generates parts of the SDP media section describing the capabilities /
            // parameters.
            SDPUtils.writeRtpDescription = function(kind, caps) {
              var sdp = "";

              // Build the mline.
              sdp += "m=" + kind + " ";
              sdp += caps.codecs.length > 0 ? "9" : "0"; // reject if no codecs.
              sdp += " UDP/TLS/RTP/SAVPF ";
              sdp +=
                caps.codecs
                  .map(function(codec) {
                    if (codec.preferredPayloadType !== undefined) {
                      return codec.preferredPayloadType;
                    }
                    return codec.payloadType;
                  })
                  .join(" ") + "\r\n";

              sdp += "c=IN IP4 0.0.0.0\r\n";
              sdp += "a=rtcp:9 IN IP4 0.0.0.0\r\n";

              // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
              caps.codecs.forEach(function(codec) {
                sdp += SDPUtils.writeRtpMap(codec);
                sdp += SDPUtils.writeFmtp(codec);
                sdp += SDPUtils.writeRtcpFb(codec);
              });
              var maxptime = 0;
              caps.codecs.forEach(function(codec) {
                if (codec.maxptime > maxptime) {
                  maxptime = codec.maxptime;
                }
              });
              if (maxptime > 0) {
                sdp += "a=maxptime:" + maxptime + "\r\n";
              }
              sdp += "a=rtcp-mux\r\n";

              if (caps.headerExtensions) {
                caps.headerExtensions.forEach(function(extension) {
                  sdp += SDPUtils.writeExtmap(extension);
                });
              }
              // FIXME: write fecMechanisms.
              return sdp;
            };

            // Parses the SDP media section and returns an array of
            // RTCRtpEncodingParameters.
            SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
              var encodingParameters = [];
              var description = SDPUtils.parseRtpParameters(mediaSection);
              var hasRed = description.fecMechanisms.indexOf("RED") !== -1;
              var hasUlpfec = description.fecMechanisms.indexOf("ULPFEC") !== -1;

              // filter a=ssrc:... cname:, ignore PlanB-msid
              var ssrcs = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
                .map(function(line) {
                  return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(parts) {
                  return parts.attribute === "cname";
                });
              var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
              var secondarySsrc;

              var flows = SDPUtils.matchPrefix(mediaSection, "a=ssrc-group:FID").map(function(line) {
                var parts = line.substr(17).split(" ");
                return parts.map(function(part) {
                  return parseInt(part, 10);
                });
              });
              if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
                secondarySsrc = flows[0][1];
              }

              description.codecs.forEach(function(codec) {
                if (codec.name.toUpperCase() === "RTX" && codec.parameters.apt) {
                  var encParam = {
                    ssrc: primarySsrc,
                    codecPayloadType: parseInt(codec.parameters.apt, 10)
                  };
                  if (primarySsrc && secondarySsrc) {
                    encParam.rtx = { ssrc: secondarySsrc };
                  }
                  encodingParameters.push(encParam);
                  if (hasRed) {
                    encParam = JSON.parse(JSON.stringify(encParam));
                    encParam.fec = {
                      ssrc: primarySsrc,
                      mechanism: hasUlpfec ? "red+ulpfec" : "red"
                    };
                    encodingParameters.push(encParam);
                  }
                }
              });
              if (encodingParameters.length === 0 && primarySsrc) {
                encodingParameters.push({
                  ssrc: primarySsrc
                });
              }

              // we support both b=AS and b=TIAS but interpret AS as TIAS.
              var bandwidth = SDPUtils.matchPrefix(mediaSection, "b=");
              if (bandwidth.length) {
                if (bandwidth[0].indexOf("b=TIAS:") === 0) {
                  bandwidth = parseInt(bandwidth[0].substr(7), 10);
                } else if (bandwidth[0].indexOf("b=AS:") === 0) {
                  // use formula from JSEP to convert b=AS to TIAS value.
                  bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
                } else {
                  bandwidth = undefined;
                }
                encodingParameters.forEach(function(params) {
                  params.maxBitrate = bandwidth;
                });
              }
              return encodingParameters;
            };

            // parses http://draft.ortc.org/#rtcrtcpparameters*
            SDPUtils.parseRtcpParameters = function(mediaSection) {
              var rtcpParameters = {};

              // Gets the first SSRC. Note tha with RTX there might be multiple
              // SSRCs.
              var remoteSsrc = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
                .map(function(line) {
                  return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(obj) {
                  return obj.attribute === "cname";
                })[0];
              if (remoteSsrc) {
                rtcpParameters.cname = remoteSsrc.value;
                rtcpParameters.ssrc = remoteSsrc.ssrc;
              }

              // Edge uses the compound attribute instead of reducedSize
              // compound is !reducedSize
              var rsize = SDPUtils.matchPrefix(mediaSection, "a=rtcp-rsize");
              rtcpParameters.reducedSize = rsize.length > 0;
              rtcpParameters.compound = rsize.length === 0;

              // parses the rtcp-mux attrіbute.
              // Note that Edge does not support unmuxed RTCP.
              var mux = SDPUtils.matchPrefix(mediaSection, "a=rtcp-mux");
              rtcpParameters.mux = mux.length > 0;

              return rtcpParameters;
            };

            // parses either a=msid: or a=ssrc:... msid lines and returns
            // the id of the MediaStream and MediaStreamTrack.
            SDPUtils.parseMsid = function(mediaSection) {
              var parts;
              var spec = SDPUtils.matchPrefix(mediaSection, "a=msid:");
              if (spec.length === 1) {
                parts = spec[0].substr(7).split(" ");
                return { stream: parts[0], track: parts[1] };
              }
              var planB = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
                .map(function(line) {
                  return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(msidParts) {
                  return msidParts.attribute === "msid";
                });
              if (planB.length > 0) {
                parts = planB[0].value.split(" ");
                return { stream: parts[0], track: parts[1] };
              }
            };

            // Generate a session ID for SDP.
            // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
            // recommends using a cryptographically random +ve 64-bit value
            // but right now this should be acceptable and within the right range
            SDPUtils.generateSessionId = function() {
              return Math.random()
                .toString()
                .substr(2, 21);
            };

            // Write boilder plate for start of SDP
            // sessId argument is optional - if not supplied it will
            // be generated randomly
            // sessVersion is optional and defaults to 2
            // sessUser is optional and defaults to 'thisisadapterortc'
            SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
              var sessionId;
              var version = sessVer !== undefined ? sessVer : 2;
              if (sessId) {
                sessionId = sessId;
              } else {
                sessionId = SDPUtils.generateSessionId();
              }
              var user = sessUser || "thisisadapterortc";
              // FIXME: sess-id should be an NTP timestamp.
              return (
                "v=0\r\n" +
                "o=" +
                user +
                " " +
                sessionId +
                " " +
                version +
                " IN IP4 127.0.0.1\r\n" +
                "s=-\r\n" +
                "t=0 0\r\n"
              );
            };

            SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
              var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

              // Map ICE parameters (ufrag, pwd) to SDP.
              sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

              // Map DTLS parameters to SDP.
              sdp += SDPUtils.writeDtlsParameters(
                transceiver.dtlsTransport.getLocalParameters(),
                type === "offer" ? "actpass" : "active"
              );

              sdp += "a=mid:" + transceiver.mid + "\r\n";

              if (transceiver.direction) {
                sdp += "a=" + transceiver.direction + "\r\n";
              } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
                sdp += "a=sendrecv\r\n";
              } else if (transceiver.rtpSender) {
                sdp += "a=sendonly\r\n";
              } else if (transceiver.rtpReceiver) {
                sdp += "a=recvonly\r\n";
              } else {
                sdp += "a=inactive\r\n";
              }

              if (transceiver.rtpSender) {
                // spec.
                var msid = "msid:" + stream.id + " " + transceiver.rtpSender.track.id + "\r\n";
                sdp += "a=" + msid;

                // for Chrome.
                sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " " + msid;
                if (transceiver.sendEncodingParameters[0].rtx) {
                  sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " " + msid;
                  sdp +=
                    "a=ssrc-group:FID " +
                    transceiver.sendEncodingParameters[0].ssrc +
                    " " +
                    transceiver.sendEncodingParameters[0].rtx.ssrc +
                    "\r\n";
                }
              }
              // FIXME: this should be written by writeRtpDescription.
              sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " cname:" + SDPUtils.localCName + "\r\n";
              if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
                sdp +=
                  "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " cname:" + SDPUtils.localCName + "\r\n";
              }
              return sdp;
            };

            // Gets the direction from the mediaSection or the sessionpart.
            SDPUtils.getDirection = function(mediaSection, sessionpart) {
              // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
              var lines = SDPUtils.splitLines(mediaSection);
              for (var i = 0; i < lines.length; i++) {
                switch (lines[i]) {
                  case "a=sendrecv":
                  case "a=sendonly":
                  case "a=recvonly":
                  case "a=inactive":
                    return lines[i].substr(2);
                  default:
                  // FIXME: What should happen here?
                }
              }
              if (sessionpart) {
                return SDPUtils.getDirection(sessionpart);
              }
              return "sendrecv";
            };

            SDPUtils.getKind = function(mediaSection) {
              var lines = SDPUtils.splitLines(mediaSection);
              var mline = lines[0].split(" ");
              return mline[0].substr(2);
            };

            SDPUtils.isRejected = function(mediaSection) {
              return mediaSection.split(" ", 2)[1] === "0";
            };

            SDPUtils.parseMLine = function(mediaSection) {
              var lines = SDPUtils.splitLines(mediaSection);
              var parts = lines[0].substr(2).split(" ");
              return {
                kind: parts[0],
                port: parseInt(parts[1], 10),
                protocol: parts[2],
                fmt: parts.slice(3).join(" ")
              };
            };

            SDPUtils.parseOLine = function(mediaSection) {
              var line = SDPUtils.matchPrefix(mediaSection, "o=")[0];
              var parts = line.substr(2).split(" ");
              return {
                username: parts[0],
                sessionId: parts[1],
                sessionVersion: parseInt(parts[2], 10),
                netType: parts[3],
                addressType: parts[4],
                address: parts[5]
              };
            };

            // a very naive interpretation of a valid SDP.
            SDPUtils.isValidSDP = function(blob) {
              if (typeof blob !== "string" || blob.length === 0) {
                return false;
              }
              var lines = SDPUtils.splitLines(blob);
              for (var i = 0; i < lines.length; i++) {
                if (lines[i].length < 2 || lines[i].charAt(1) !== "=") {
                  return false;
                }
                // TODO: check the modifier a bit more.
              }
              return true;
            };

            // Expose public methods.
            if (typeof module === "object") {
              module.exports = SDPUtils;
            }
          },
          {}
        ]
      },
      {},
      [1]
    );
  });

  unwrapExports(adapter_no_global);

  // @@match logic
  _fixReWks("match", 1, function(defined, MATCH, $match, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function(regexp) {
        var res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        var rx = _anObject(regexp);
        var S = String(this);
        if (!rx.global) return _regexpExecAbstract(rx, S);
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = _regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === "") rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject$1 = Object("z").propertyIsEnumerable(0)
    ? Object
    : function(it) {
        return _cof(it) == "String" ? it.split("") : Object(it);
      };

  // to indexed object, toObject with fallback for non-array-like ES3 strings

  var _toIobject$1 = function(it) {
    return _iobject$1(_defined(it));
  };

  var max$1 = Math.max;
  var min$3 = Math.min;
  var _toAbsoluteIndex$1 = function(index, length) {
    index = _toInteger(index);
    return index < 0 ? max$1(index + length, 0) : min$3(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes

  var _arrayIncludes$1 = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = _toIobject$1($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex$1(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++)
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
      return !IS_INCLUDES && -1;
    };
  };

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks("unscopables");
  var ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
  var _addToUnscopables = function(key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  // https://github.com/tc39/Array.prototype.includes

  var $includes = _arrayIncludes$1(true);

  _export(_export.P, "Array", {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _addToUnscopables("includes");

  // helper for String#{startsWith, endsWith, includes}

  var _stringContext = function(that, searchString, NAME) {
    if (_isRegexp(searchString)) throw TypeError("String#" + NAME + " doesn't accept regex!");
    return String(_defined(that));
  };

  var MATCH$1 = _wks("match");
  var _failsIsRegexp = function(KEY) {
    var re = /./;
    try {
      "/./"[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !"/./"[KEY](re);
      } catch (f) {
        /* empty */
      }
    }
    return true;
  };

  var INCLUDES = "includes";

  _export(_export.P + _export.F * _failsIsRegexp(INCLUDES), "String", {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~_stringContext(this, searchString, INCLUDES).indexOf(
        searchString,
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  var dP$2 = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = "name";

  // 19.2.4.2 name
  NAME$1 in FProto ||
    (_descriptors &&
      dP$2(FProto, NAME$1, {
        configurable: true,
        get: function() {
          try {
            return ("" + this).match(nameRE)[1];
          } catch (e) {
            return "";
          }
        }
      }));

  var f$3 = _wks$1;

  var _wksExt = {
    f: f$3
  };

  var iterator = _wksExt.f("iterator");

  var iterator$1 = iterator;

  var _meta = createCommonjsModule(function(module) {
    var META = _uid$1("meta");

    var setDesc = _objectDp$1.f;
    var id = 0;
    var isExtensible =
      Object.isExtensible ||
      function() {
        return true;
      };
    var FREEZE = !_fails$1(function() {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function(it) {
      setDesc(it, META, {
        value: {
          i: "O" + ++id, // object ID
          w: {} // weak collections IDs
        }
      });
    };
    var fastKey = function(it, create) {
      // return primitive with prefix
      if (!_isObject$1(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
      if (!_has$1(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return "F";
        // not necessary to add metadata
        if (!create) return "E";
        // add missing metadata
        setMeta(it);
        // return object ID
      }
      return it[META].i;
    };
    var getWeak = function(it, create) {
      if (!_has$1(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
        // return hash weak collections IDs
      }
      return it[META].w;
    };
    // add metadata on freeze-family methods calling
    var onFreeze = function(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has$1(it, META)) setMeta(it);
      return it;
    };
    var meta = (module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    });
  });
  var _meta_1 = _meta.KEY;
  var _meta_2 = _meta.NEED;
  var _meta_3 = _meta.fastKey;
  var _meta_4 = _meta.getWeak;
  var _meta_5 = _meta.onFreeze;

  var defineProperty = _objectDp$1.f;
  var _wksDefine = function(name) {
    var $Symbol = _core$1.Symbol || (_core$1.Symbol = {});
    if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
  };

  var f$4 = Object.getOwnPropertySymbols;

  var _objectGops = {
    f: f$4
  };

  var f$5 = {}.propertyIsEnumerable;

  var _objectPie = {
    f: f$5
  };

  // all enumerable object keys, includes symbols

  var _enumKeys = function(it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;
      while (symbols.length > i) if (isEnum.call(it, (key = symbols[i++]))) result.push(key);
    }
    return result;
  };

  // 7.2.2 IsArray(argument)

  var _isArray =
    Array.isArray ||
    function isArray(arg) {
      return _cof$1(arg) == "Array";
    };

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys.concat("length", "prototype");

  var f$6 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return _objectKeysInternal(O, hiddenKeys);
    };

  var _objectGopn = {
    f: f$6
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var gOPN = _objectGopn.f;
  var toString$2 = {}.toString;

  var windowNames =
    typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function(it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$7 = function getOwnPropertyNames(it) {
    return windowNames && toString$2.call(it) == "[object Window]" ? getWindowNames(it) : gOPN(_toIobject(it));
  };

  var _objectGopnExt = {
    f: f$7
  };

  var gOPD = Object.getOwnPropertyDescriptor;

  var f$8 = _descriptors$1
    ? gOPD
    : function getOwnPropertyDescriptor(O, P) {
        O = _toIobject(O);
        P = _toPrimitive$1(P, true);
        if (_ie8DomDefine$1)
          try {
            return gOPD(O, P);
          } catch (e) {
            /* empty */
          }
        if (_has$1(O, P)) return _propertyDesc$1(!_objectPie.f.call(O, P), O[P]);
      };

  var _objectGopd = {
    f: f$8
  };

  // ECMAScript 6 symbols shim

  var META = _meta.KEY;

  var gOPD$1 = _objectGopd.f;
  var dP$3 = _objectDp$1.f;
  var gOPN$1 = _objectGopnExt.f;
  var $Symbol = _global$1.Symbol;
  var $JSON = _global$1.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE$3 = "prototype";
  var HIDDEN = _wks$1("_hidden");
  var TO_PRIMITIVE = _wks$1("toPrimitive");
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = _shared$1("symbol-registry");
  var AllSymbols = _shared$1("symbols");
  var OPSymbols = _shared$1("op-symbols");
  var ObjectProto$1 = Object[PROTOTYPE$3];
  var USE_NATIVE$1 = typeof $Symbol == "function";
  var QObject = _global$1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE$3] || !QObject[PROTOTYPE$3].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc =
    _descriptors$1 &&
    _fails$1(function() {
      return (
        _objectCreate(
          dP$3({}, "a", {
            get: function() {
              return dP$3(this, "a", { value: 7 }).a;
            }
          })
        ).a != 7
      );
    })
      ? function(it, key, D) {
          var protoDesc = gOPD$1(ObjectProto$1, key);
          if (protoDesc) delete ObjectProto$1[key];
          dP$3(it, key, D);
          if (protoDesc && it !== ObjectProto$1) dP$3(ObjectProto$1, key, protoDesc);
        }
      : dP$3;

  var wrap = function(tag) {
    var sym = (AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$3]));
    sym._k = tag;
    return sym;
  };

  var isSymbol =
    USE_NATIVE$1 && typeof $Symbol.iterator == "symbol"
      ? function(it) {
          return typeof it == "symbol";
        }
      : function(it) {
          return it instanceof $Symbol;
        };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
    _anObject$1(it);
    key = _toPrimitive$1(key, true);
    _anObject$1(D);
    if (_has$1(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has$1(it, HIDDEN)) dP$3(it, HIDDEN, _propertyDesc$1(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has$1(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc$1(0, false) });
      }
      return setSymbolDesc(it, key, D);
    }
    return dP$3(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    _anObject$1(it);
    var keys = _enumKeys((P = _toIobject(P)));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, (key = keys[i++]), P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, (key = _toPrimitive$1(key, true)));
    if (this === ObjectProto$1 && _has$1(AllSymbols, key) && !_has$1(OPSymbols, key)) return false;
    return E || !_has$1(this, key) || !_has$1(AllSymbols, key) || (_has$1(this, HIDDEN) && this[HIDDEN][key])
      ? E
      : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive$1(key, true);
    if (it === ObjectProto$1 && _has$1(AllSymbols, key) && !_has$1(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has$1(AllSymbols, key) && !(_has$1(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!_has$1(AllSymbols, (key = names[i++])) && key != HIDDEN && key != META) result.push(key);
    }
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto$1;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (_has$1(AllSymbols, (key = names[i++])) && (IS_OP ? _has$1(ObjectProto$1, key) : true))
        result.push(AllSymbols[key]);
    }
    return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE$1) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
      var tag = _uid$1(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function(value) {
        if (this === ObjectProto$1) $set.call(OPSymbols, value);
        if (_has$1(this, HIDDEN) && _has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc$1(1, value));
      };
      if (_descriptors$1 && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    _redefine$1($Symbol[PROTOTYPE$3], "toString", function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp$1.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors$1 && !_library$1) {
      _redefine$1(ObjectProto$1, "propertyIsEnumerable", $propertyIsEnumerable, true);
    }

    _wksExt.f = function(name) {
      return wrap(_wks$1(name));
    };
  }

  _export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE$1, { Symbol: $Symbol });

  for (
    var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
      "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
        ","
      ),
      j = 0;
    es6Symbols.length > j;

  )
    _wks$1(es6Symbols[j++]);

  for (var wellKnownSymbols = _objectKeys(_wks$1.store), k = 0; wellKnownSymbols.length > k; )
    _wksDefine(wellKnownSymbols[k++]);

  _export$1(_export$1.S + _export$1.F * !USE_NATIVE$1, "Symbol", {
    // 19.4.2.1 Symbol.for(key)
    for: function(key) {
      return _has$1(SymbolRegistry, (key += "")) ? SymbolRegistry[key] : (SymbolRegistry[key] = $Symbol(key));
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol!");
      for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function() {
      setter = true;
    },
    useSimple: function() {
      setter = false;
    }
  });

  _export$1(_export$1.S + _export$1.F * !USE_NATIVE$1, "Object", {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON &&
    _export$1(
      _export$1.S +
        _export$1.F *
          (!USE_NATIVE$1 ||
            _fails$1(function() {
              var S = $Symbol();
              // MS Edge converts symbol values to JSON as {}
              // WebKit converts symbol values to JSON as null
              // V8 throws on boxed symbols
              return _stringify([S]) != "[null]" || _stringify({ a: S }) != "{}" || _stringify(Object(S)) != "{}";
            })),
      "JSON",
      {
        stringify: function stringify(it) {
          var args = [it];
          var i = 1;
          var replacer, $replacer;
          while (arguments.length > i) args.push(arguments[i++]);
          $replacer = replacer = args[1];
          if ((!_isObject$1(replacer) && it === undefined) || isSymbol(it)) return; // IE8 returns string on undefined
          if (!_isArray(replacer))
            replacer = function(key, value) {
              if (typeof $replacer == "function") value = $replacer.call(this, key, value);
              if (!isSymbol(value)) return value;
            };
          args[1] = replacer;
          return _stringify.apply($JSON, args);
        }
      }
    );

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$3][TO_PRIMITIVE] || _hide$1($Symbol[PROTOTYPE$3], TO_PRIMITIVE, $Symbol[PROTOTYPE$3].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, "Symbol");
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, "Math", true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global$1.JSON, "JSON", true);

  _wksDefine("asyncIterator");

  _wksDefine("observable");

  var symbol = _core$1.Symbol;

  var symbol$1 = symbol;

  var _typeof_1 = createCommonjsModule(function(module) {
    function _typeof2(obj) {
      if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") {
        _typeof2 = function _typeof2(obj) {
          return typeof obj;
        };
      } else {
        _typeof2 = function _typeof2(obj) {
          return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype
            ? "symbol"
            : typeof obj;
        };
      }
      return _typeof2(obj);
    }

    function _typeof(obj) {
      if (typeof symbol$1 === "function" && _typeof2(iterator$1) === "symbol") {
        module.exports = _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype
            ? "symbol"
            : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    module.exports = _typeof;
  });

  var uaParser = createCommonjsModule(function(module, exports) {
    /*!
     * UAParser.js v0.7.20
     * Lightweight JavaScript-based User-Agent string parser
     * https://github.com/faisalman/ua-parser-js
     *
     * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
     * Licensed under MIT License
     */

    (function(window, undefined$1) {
      //////////////
      // Constants
      /////////////

      var LIBVERSION = "0.7.20",
        EMPTY = "",
        UNKNOWN = "?",
        FUNC_TYPE = "function",
        UNDEF_TYPE = "undefined",
        OBJ_TYPE = "object",
        STR_TYPE = "string",
        MAJOR = "major", // deprecated
        MODEL = "model",
        NAME = "name",
        TYPE = "type",
        VENDOR = "vendor",
        VERSION = "version",
        ARCHITECTURE = "architecture",
        CONSOLE = "console",
        MOBILE = "mobile",
        TABLET = "tablet",
        SMARTTV = "smarttv",
        WEARABLE = "wearable",
        EMBEDDED = "embedded";

      ///////////
      // Helper
      //////////

      var util = {
        extend: function(regexes, extensions) {
          var mergedRegexes = {};
          for (var i in regexes) {
            if (extensions[i] && extensions[i].length % 2 === 0) {
              mergedRegexes[i] = extensions[i].concat(regexes[i]);
            } else {
              mergedRegexes[i] = regexes[i];
            }
          }
          return mergedRegexes;
        },
        has: function(str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize: function(str) {
          return str.toLowerCase();
        },
        major: function(version) {
          return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, "").split(".")[0] : undefined$1;
        },
        trim: function(str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        }
      };

      ///////////////
      // Map helper
      //////////////

      var mapper = {
        rgx: function(ua, arrays) {
          var i = 0,
            j,
            k,
            p,
            q,
            matches,
            match;

          // loop through all regexes maps
          while (i < arrays.length && !matches) {
            var regex = arrays[i], // even sequence (0,2,4,..)
              props = arrays[i + 1]; // odd sequence (1,3,5,..)
            j = k = 0;

            // try matching uastring with regexes
            while (j < regex.length && !matches) {
              matches = regex[j++].exec(ua);

              if (!!matches) {
                for (p = 0; p < props.length; p++) {
                  match = matches[++k];
                  q = props[p];
                  // check if given property is actually array
                  if (typeof q === OBJ_TYPE && q.length > 0) {
                    if (q.length == 2) {
                      if (typeof q[1] == FUNC_TYPE) {
                        // assign modified match
                        this[q[0]] = q[1].call(this, match);
                      } else {
                        // assign given value, ignore regex match
                        this[q[0]] = q[1];
                      }
                    } else if (q.length == 3) {
                      // check whether function or regex
                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                        // call function (usually string mapper)
                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                      } else {
                        // sanitize match using given regex
                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                      }
                    } else if (q.length == 4) {
                      this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                    }
                  } else {
                    this[q] = match ? match : undefined$1;
                  }
                }
              }
            }
            i += 2;
          }
        },

        str: function(str, map) {
          for (var i in map) {
            // check if array
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
              for (var j = 0; j < map[i].length; j++) {
                if (util.has(map[i][j], str)) {
                  return i === UNKNOWN ? undefined$1 : i;
                }
              }
            } else if (util.has(map[i], str)) {
              return i === UNKNOWN ? undefined$1 : i;
            }
          }
          return str;
        }
      };

      ///////////////
      // String map
      //////////////

      var maps = {
        browser: {
          oldsafari: {
            version: {
              "1.0": "/8",
              "1.2": "/1",
              "1.3": "/3",
              "2.0": "/412",
              "2.0.2": "/416",
              "2.0.3": "/417",
              "2.0.4": "/419",
              "?": "/"
            }
          }
        },

        device: {
          amazon: {
            model: {
              "Fire Phone": ["SD", "KF"]
            }
          },
          sprint: {
            model: {
              "Evo Shift 4G": "7373KT"
            },
            vendor: {
              HTC: "APA",
              Sprint: "Sprint"
            }
          }
        },

        os: {
          windows: {
            version: {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              "2000": "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              "7": "NT 6.1",
              "8": "NT 6.2",
              "8.1": "NT 6.3",
              "10": ["NT 6.4", "NT 10.0"],
              RT: "ARM"
            }
          }
        }
      };

      //////////////
      // Regex map
      /////////////

      var regexes = {
        browser: [
          [
            // Presto based
            /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
          ],
          [NAME, VERSION],
          [
            /(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
          ],
          [[NAME, "Opera Mini"], VERSION],
          [
            /\s(opr)\/([\w\.]+)/i // Opera Webkit
          ],
          [[NAME, "Opera"], VERSION],
          [
            // Mixed
            /(kindle)\/([\w\.]+)/i, // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
            // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
            // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i, // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
            // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
          ],
          [NAME, VERSION],
          [
            /(konqueror)\/([\w\.]+)/i // Konqueror
          ],
          [[NAME, "Konqueror"], VERSION],
          [
            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
          ],
          [[NAME, "IE"], VERSION],
          [
            /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i // Microsoft Edge
          ],
          [[NAME, "Edge"], VERSION],
          [
            /(yabrowser)\/([\w\.]+)/i // Yandex
          ],
          [[NAME, "Yandex"], VERSION],
          [
            /(puffin)\/([\w\.]+)/i // Puffin
          ],
          [[NAME, "Puffin"], VERSION],
          [
            /(focus)\/([\w\.]+)/i // Firefox Focus
          ],
          [[NAME, "Firefox Focus"], VERSION],
          [
            /(opt)\/([\w\.]+)/i // Opera Touch
          ],
          [[NAME, "Opera Touch"], VERSION],
          [
            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
          ],
          [[NAME, "UCBrowser"], VERSION],
          [
            /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
          ],
          [[NAME, /_/g, " "], VERSION],
          [
            /(windowswechat qbcore)\/([\w\.]+)/i // WeChat Desktop for Windows Built-in Browser
          ],
          [[NAME, "WeChat(Win) Desktop"], VERSION],
          [
            /(micromessenger)\/([\w\.]+)/i // WeChat
          ],
          [[NAME, "WeChat"], VERSION],
          [
            /(brave)\/([\w\.]+)/i // Brave browser
          ],
          [[NAME, "Brave"], VERSION],
          [
            /(qqbrowserlite)\/([\w\.]+)/i // QQBrowserLite
          ],
          [NAME, VERSION],
          [
            /(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
          ],
          [NAME, VERSION],
          [
            /m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
          ],
          [NAME, VERSION],
          [
            /(BIDUBrowser)[\/\s]?([\w\.]+)/i // Baidu Browser
          ],
          [NAME, VERSION],
          [
            /(2345Explorer)[\/\s]?([\w\.]+)/i // 2345 Browser
          ],
          [NAME, VERSION],
          [
            /(MetaSr)[\/\s]?([\w\.]+)/i // SouGouBrowser
          ],
          [NAME],
          [
            /(LBBROWSER)/i // LieBao Browser
          ],
          [NAME],
          [
            /xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
          ],
          [VERSION, [NAME, "MIUI Browser"]],
          [
            /;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
          ],
          [VERSION, [NAME, "Facebook"]],
          [
            /safari\s(line)\/([\w\.]+)/i, // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i // Line App for Android
          ],
          [NAME, VERSION],
          [
            /headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
          ],
          [VERSION, [NAME, "Chrome Headless"]],
          [
            /\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
          ],
          [[NAME, /(.+)/, "$1 WebView"], VERSION],
          [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
          [[NAME, /(.+(?:g|us))(.+)/, "$1 $2"], VERSION],
          [
            // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
          ],
          [VERSION, [NAME, "Android Browser"]],
          [
            /(sailfishbrowser)\/([\w\.]+)/i // Sailfish Browser
          ],
          [[NAME, "Sailfish Browser"], VERSION],
          [
            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
            // Chrome/OmniWeb/Arora/Tizen/Nokia
          ],
          [NAME, VERSION],
          [
            /(dolfin)\/([\w\.]+)/i // Dolphin
          ],
          [[NAME, "Dolphin"], VERSION],
          [
            /((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
          ],
          [[NAME, "Chrome"], VERSION],
          [
            /(coast)\/([\w\.]+)/i // Opera Coast
          ],
          [[NAME, "Opera Coast"], VERSION],
          [
            /fxios\/([\w\.-]+)/i // Firefox for iOS
          ],
          [VERSION, [NAME, "Firefox"]],
          [
            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
          ],
          [VERSION, NAME],
          [
            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
          ],
          [[NAME, "GSA"], VERSION],
          [
            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
          ],
          [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]],
          [/(webkit|khtml)\/([\w\.]+)/i],
          [NAME, VERSION],
          [
            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i // Netscape
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /(swiftfox)/i, // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i, // Links
            /(gobrowser)\/?([\w\.]*)/i, // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
          ],
          [NAME, VERSION]
        ],

        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i // IA32 (quicktime)
          ],
          [[ARCHITECTURE, util.lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i // IA32
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
          ],
          [[ARCHITECTURE, /ower/, "", util.lowerize]],
          [
            /(sun4\w)[;\)]/i // SPARC
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ],
          [[ARCHITECTURE, util.lowerize]]
        ],

        device: [
          [
            /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i // iPad/PlayBook
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /applecoremedia\/[\w\.]+ \((ipad)/ // iPad
          ],
          [MODEL, [VENDOR, "Apple"], [TYPE, TABLET]],
          [
            /(apple\s{0,1}tv)/i // Apple TV
          ],
          [[MODEL, "Apple TV"], [VENDOR, "Apple"]],
          [
            /(archos)\s(gamepad2?)/i, // Archos
            /(hp).+(touchpad)/i, // HP TouchPad
            /(hp).+(tablet)/i, // HP Tablet
            /(kindle)\/([\w\.]+)/i, // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(kf[A-z]+)\sbuild\/.+silk\//i // Kindle Fire HD
          ],
          [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]],
          [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i // Fire Phone
          ],
          [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, "Amazon"], [TYPE, MOBILE]],
          [
            /android.+aft([bms])\sbuild/i // Fire TV
          ],
          [MODEL, [VENDOR, "Amazon"], [TYPE, SMARTTV]],
          [
            /\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
          ],
          [MODEL, VENDOR, [TYPE, MOBILE]],
          [
            /\((ip[honed|\s\w*]+);/i // iPod/iPhone
          ],
          [MODEL, [VENDOR, "Apple"], [TYPE, MOBILE]],
          [
            /(blackberry)[\s-]?(\w+)/i, // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
            // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i, // HP iPAQ
            /(asus)-?(\w+)/i // Asus
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /\(bb10;\s(\w+)/i // BlackBerry 10
          ],
          [MODEL, [VENDOR, "BlackBerry"], [TYPE, MOBILE]],
          [
            // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
          ],
          [MODEL, [VENDOR, "Asus"], [TYPE, TABLET]],
          [
            /(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
          ],
          [[VENDOR, "Sony"], [MODEL, "Xperia Tablet"], [TYPE, TABLET]],
          [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
          [MODEL, [VENDOR, "Sony"], [TYPE, MOBILE]],
          [
            /\s(ouya)\s/i, // Ouya
            /(nintendo)\s([wids3u]+)/i // Nintendo
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /android.+;\s(shield)\sbuild/i // Nvidia
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation\s[34portablevi]+)/i // Playstation
          ],
          [MODEL, [VENDOR, "Sony"], [TYPE, CONSOLE]],
          [
            /(sprint\s(\w+))/i // Sprint Phones
          ],
          [
            [VENDOR, mapper.str, maps.device.sprint.vendor],
            [MODEL, mapper.str, maps.device.sprint.model],
            [TYPE, MOBILE]
          ],
          [
            /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, // HTC
            /(zte)-(\w*)/i, // ZTE
            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
            // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            /(nexus\s9)/i // HTC Nexus 9
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p)/i // Huawei
          ],
          [MODEL, [VENDOR, "Huawei"], [TYPE, MOBILE]],
          [
            /(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
          ],
          [MODEL, [VENDOR, "Microsoft"], [TYPE, CONSOLE]],
          [
            /(kin\.[onetw]{3})/i // Microsoft Kin
          ],
          [[MODEL, /\./g, " "], [VENDOR, "Microsoft"], [TYPE, MOBILE]],
          [
            // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
          ],
          [MODEL, [VENDOR, "Motorola"], [TYPE, MOBILE]],
          [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
          [MODEL, [VENDOR, "Motorola"], [TYPE, TABLET]],
          [
            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
          ],
          [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]],
          [/hbbtv.+maple;(\d+)/i],
          [[MODEL, /^/, "SmartTV"], [VENDOR, "Samsung"], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i // Sharp
          ],
          [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]],
          [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
          [[VENDOR, "Samsung"], MODEL, [TYPE, TABLET]],
          [
            // Samsung
            /smart-tv.+(samsung)/i
          ],
          [VENDOR, [TYPE, SMARTTV], MODEL],
          [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
          [[VENDOR, "Samsung"], MODEL, [TYPE, MOBILE]],
          [
            /sie-(\w*)/i // Siemens
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
          ],
          [[VENDOR, "Nokia"], MODEL, [TYPE, MOBILE]],
          [
            /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i // Acer
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            /android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
          ],
          [MODEL, [VENDOR, "LG"], [TYPE, TABLET]],
          [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
          ],
          [[VENDOR, "LG"], MODEL, [TYPE, TABLET]],
          [
            /(lg) netcast\.tv/i // LG SmartTV
          ],
          [VENDOR, MODEL, [TYPE, SMARTTV]],
          [
            /(nexus\s[45])/i, // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
          ],
          [MODEL, [VENDOR, "LG"], [TYPE, MOBILE]],
          [
            /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i // Lenovo tablets
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [/(lenovo)[_\s-]?([\w-]+)/i],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /linux;.+((jolla));/i // Jolla
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /((pebble))app\/[\d\.]+\s/i // Pebble
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /crkey/i // Google Chromecast
          ],
          [[MODEL, "Chromecast"], [VENDOR, "Google"]],
          [
            /android.+;\s(glass)\s\d/i // Google Glass
          ],
          [MODEL, [VENDOR, "Google"], [TYPE, WEARABLE]],
          [
            /android.+;\s(pixel c)[\s)]/i // Google Pixel C
          ],
          [MODEL, [VENDOR, "Google"], [TYPE, TABLET]],
          [
            /android.+;\s(pixel( [23])?( xl)?)[\s)]/i // Google Pixel
          ],
          [MODEL, [VENDOR, "Google"], [TYPE, MOBILE]],
          [
            /android.+;\s(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
            // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i // Redmi Phones
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, MOBILE]],
          [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i // Mi Pad tablets
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, TABLET]],
          [
            /android.+;\s(m[1-5]\snote)\sbuild/i // Meizu
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [/(mz)-([\w-]{2,})/i],
          [[VENDOR, "Meizu"], MODEL, [TYPE, MOBILE]],
          [
            /android.+a000(1)\s+build/i, // OnePlus
            /android.+oneplus\s(a\d{4})\s+build/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i // Dell Venue Tablets
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
          ],
          [[VENDOR, "Barnes & Noble"], MODEL, [TYPE, TABLET]],
          [
            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /android.+;\s(k88)\sbuild/i // ZTE K Series Tablet
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i // Dragon Touch Tablet
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i // Insignia Tablets
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i // NextBook Tablets
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i // LvTel Phones
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [/android.+;\s(PH-1)\s/i],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            // Essential PH-1

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i // Le Pan Tablets
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
          ],
          [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]],
          [
            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i // Gigaset Tablets
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
          ],
          [[TYPE, util.lowerize], VENDOR, MODEL],
          [
            /[\s\/\(](smart-?tv)[;\)]/i // SmartTV
          ],
          [[TYPE, SMARTTV]],
          [
            /(android[\w\.\s\-]{0,9});.+build/i // Generic Android Device
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],

        engine: [
          [
            /windows.+\sedge\/([\w\.]+)/i // EdgeHTML
          ],
          [VERSION, [NAME, "EdgeHTML"]],
          [
            /webkit\/537\.36.+chrome\/(?!27)/i // Blink
          ],
          [[NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i, // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9}).+(gecko)/i // Gecko
          ],
          [VERSION, NAME]
        ],

        os: [
          [
            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
          ],
          [NAME, VERSION],
          [
            /(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
          ],
          [NAME, [VERSION, mapper.str, maps.os.windows.version]],
          [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
          [[NAME, "Windows"], [VERSION, mapper.str, maps.os.windows.version]],
          [
            // Mobile/Embedded OS
            /\((bb)(10);/i // BlackBerry 10
          ],
          [[NAME, "BlackBerry"], VERSION],
          [
            /(blackberry)\w*\/?([\w\.]*)/i, // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i, // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
            // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
          ],
          [NAME, VERSION],
          [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i // Symbian
          ],
          [[NAME, "Symbian"], VERSION],
          [
            /\((series40);/i // Series 40
          ],
          [NAME],
          [
            /mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
          ],
          [[NAME, "Firefox OS"], VERSION],
          [
            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i, // Mint
            /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
            // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
            // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i, // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i // GNU
          ],
          [NAME, VERSION],
          [
            /(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
          ],
          [[NAME, "Chromium OS"], VERSION],
          [
            // Solaris
            /(sunos)\s?([\w\.\d]*)/i // Solaris
          ],
          [[NAME, "Solaris"], VERSION],
          [
            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
          ],
          [NAME, VERSION],
          [
            /(haiku)\s(\w+)/i // Haiku
          ],
          [NAME, VERSION],
          [
            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
          ],
          [[NAME, "Mac OS"], [VERSION, /_/g, "."]],
          [
            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
            // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i // UNIX
          ],
          [NAME, VERSION]
        ]
      };

      /////////////////
      // Constructor
      ////////////////
      var UAParser = function(uastring, extensions) {
        if (typeof uastring === "object") {
          extensions = uastring;
          uastring = undefined$1;
        }

        if (!(this instanceof UAParser)) {
          return new UAParser(uastring, extensions).getResult();
        }

        var ua =
          uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

        this.getBrowser = function() {
          var browser = { name: undefined$1, version: undefined$1 };
          mapper.rgx.call(browser, ua, rgxmap.browser);
          browser.major = util.major(browser.version); // deprecated
          return browser;
        };
        this.getCPU = function() {
          var cpu = { architecture: undefined$1 };
          mapper.rgx.call(cpu, ua, rgxmap.cpu);
          return cpu;
        };
        this.getDevice = function() {
          var device = { vendor: undefined$1, model: undefined$1, type: undefined$1 };
          mapper.rgx.call(device, ua, rgxmap.device);
          return device;
        };
        this.getEngine = function() {
          var engine = { name: undefined$1, version: undefined$1 };
          mapper.rgx.call(engine, ua, rgxmap.engine);
          return engine;
        };
        this.getOS = function() {
          var os = { name: undefined$1, version: undefined$1 };
          mapper.rgx.call(os, ua, rgxmap.os);
          return os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return ua;
        };
        this.setUA = function(uastring) {
          ua = uastring;
          return this;
        };
        return this;
      };

      UAParser.VERSION = LIBVERSION;
      UAParser.BROWSER = {
        NAME: NAME,
        MAJOR: MAJOR, // deprecated
        VERSION: VERSION
      };
      UAParser.CPU = {
        ARCHITECTURE: ARCHITECTURE
      };
      UAParser.DEVICE = {
        MODEL: MODEL,
        VENDOR: VENDOR,
        TYPE: TYPE,
        CONSOLE: CONSOLE,
        MOBILE: MOBILE,
        SMARTTV: SMARTTV,
        TABLET: TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
      };
      UAParser.ENGINE = {
        NAME: NAME,
        VERSION: VERSION
      };
      UAParser.OS = {
        NAME: NAME,
        VERSION: VERSION
      };

      ///////////
      // Export
      //////////

      // check js environment
      {
        // nodejs env
        if (module.exports) {
          exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
      }

      // jQuery/Zepto specific (optional)
      // Note:
      //   In AMD env the global scope should be kept clean, but jQuery is an exception.
      //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
      //   and we should catch that.
      var $ = window && (window.jQuery || window.Zepto);
      if (typeof $ !== UNDEF_TYPE && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(uastring) {
          parser.setUA(uastring);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : commonjsGlobal);
  });
  var uaParser_1 = uaParser.UAParser;

  (function(BrowserCompatibility) {
    /**
     * Browser feature.
     */
    var Feature;

    (function(Feature) {
      /**
       * [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) -
       * [current support?](https://caniuse.com/#feat=blobbuilder)
       */
      Feature["BLOB"] = "blob";
      /**
       * [MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) -
       * [current support?](https://caniuse.com/#feat=stream)
       */

      Feature["MEDIA_DEVICES"] = "mediaDevices";
      /**
       * [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) -
       * [current support?](https://caniuse.com/#feat=offscreencanvas)
       */

      Feature["OFFSCREEN_CANVAS"] = "offscreenCanvas";
      /**
       * [URL/createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) -
       * [current support?](https://caniuse.com/#feat=bloburls)
       */

      Feature["URL_OBJECT"] = "urlObject";
      /**
       * [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) -
       * [current support?](https://caniuse.com/#feat=webworkers)
       */

      Feature["WEB_WORKERS"] = "webWorkers";
      /**
       * [WebAssembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly) -
       * [current support?](https://caniuse.com/#feat=wasm)
       */

      Feature["WEB_ASSEMBLY"] = "webAssembly";
      /**
       * WebAssembly without memory corruption (specific iOS version 11.2.2/11.2.5/11.2.6 bug)
       */

      Feature["WEB_ASSEMBLY_ERROR_FREE"] = "webAssemblyErrorFree";
      /**
       * [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) -
       * [current support?](https://caniuse.com/#feat=webgl)
       */

      Feature["WEBGL"] = "webgl";
    })((Feature = BrowserCompatibility.Feature || (BrowserCompatibility.Feature = {})));
  })(exports.BrowserCompatibility || (exports.BrowserCompatibility = {}));

  (function(BrowserHelper) {
    /**
     * @hidden
     */
    BrowserHelper.userAgentInfo = new uaParser_1(navigator.userAgent);
    /**
     * @hidden
     */

    BrowserHelper.canvas = document.createElement("canvas");
    /**
     * @returns The built [[BrowserCompatibility]] object representing the current OS/Browser's support for features.
     */

    function checkBrowserCompatibility() {
      var fullSupport = true;
      var scannerSupport = true;
      var missingFeatures = [];

      if (navigator.mediaDevices == null || typeof navigator.mediaDevices.getUserMedia !== "function") {
        missingFeatures.push(exports.BrowserCompatibility.Feature.MEDIA_DEVICES);
        fullSupport = false;
      }

      if (!window.hasOwnProperty("Worker") || typeof window.Worker !== "function") {
        missingFeatures.push(exports.BrowserCompatibility.Feature.WEB_WORKERS);
        fullSupport = scannerSupport = false;
      }

      if (!window.hasOwnProperty("WebAssembly") || _typeof_1(window.WebAssembly) !== "object") {
        missingFeatures.push(exports.BrowserCompatibility.Feature.WEB_ASSEMBLY);
        fullSupport = scannerSupport = false;
      }

      if (!window.hasOwnProperty("Blob") || typeof window.Blob !== "function") {
        missingFeatures.push(exports.BrowserCompatibility.Feature.BLOB);
        fullSupport = scannerSupport = false;
      }

      if (
        !window.hasOwnProperty("URL") ||
        (typeof window.URL !== "function" && _typeof_1(window.URL) !== "object") ||
        typeof window.URL.createObjectURL !== "function"
      ) {
        missingFeatures.push(exports.BrowserCompatibility.Feature.URL_OBJECT);
        fullSupport = scannerSupport = false;
      }

      if (!window.hasOwnProperty("OffscreenCanvas") || typeof window.OffscreenCanvas !== "function") {
        missingFeatures.push(exports.BrowserCompatibility.Feature.OFFSCREEN_CANVAS);
      }

      try {
        if (
          !window.hasOwnProperty("WebGLRenderingContext") ||
          (BrowserHelper.canvas.getContext("webgl") == null &&
            BrowserHelper.canvas.getContext("experimental-webgl") == null)
        ) {
          throw new Error();
        }
      } catch (e) {
        missingFeatures.push(exports.BrowserCompatibility.Feature.WEBGL);
      }

      var os = BrowserHelper.userAgentInfo.getOS();

      if (os.name === "iOS" && os.version != null && ["11.2.2", "11.2.5", "11.2.6"].includes(os.version)) {
        missingFeatures.push(exports.BrowserCompatibility.Feature.WEB_ASSEMBLY_ERROR_FREE);
        fullSupport = scannerSupport = false;
      }

      return {
        fullSupport: fullSupport,
        scannerSupport: scannerSupport,
        missingFeatures: missingFeatures
      };
    }

    BrowserHelper.checkBrowserCompatibility = checkBrowserCompatibility;
    /**
     * @hidden
     *
     * Get a value from a cookie.
     *
     * @param key The key for the cookie for which to get the value.
     * @returns The cookie value for the given key, empty string if not found.
     */

    function getCookieValue(key) {
      var cookieMatch = document.cookie.match("(^|;)\\s*".concat(key, "\\s*=\\s*([^;]+)"));

      if (cookieMatch == null) {
        return "";
      } else {
        var cookieValue = cookieMatch.pop(); // istanbul ignore next

        return cookieValue == null ? "" : cookieValue;
      }
    }
    /**
     * @hidden
     *
     * Store a value in a cookie.
     *
     * @param key The key for the cookie.
     * @param value The value of the cookie.
     * @param expirationDays The amount of days after which the cookie will expire.
     */

    function setCookieValue(key, value, expirationDays) {
      var date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      document.cookie = ""
        .concat(key, "=")
        .concat(value, ";expires=")
        .concat(date.toUTCString());
    }
    /**
     * @hidden
     *
     * Get a device id for the current browser, when available it's retrieved from a cookie,
     * when not it's randomly generated and stored in a cookie to be retrieved by later calls.
     *
     * @returns The device id for the current browser.
     */

    function getDeviceId() {
      var cookieKey = "scandit-device-id";
      var storedDeviceId = getCookieValue(cookieKey);

      if (storedDeviceId !== "") {
        return storedDeviceId;
      }

      var hexCharacters = "0123456789abcdef";
      var randomDeviceId = "";

      for (var i = 0; i < 40; ++i) {
        // tslint:disable-next-line:insecure-random
        randomDeviceId += hexCharacters.charAt(Math.floor(Math.random() * 16));
      }

      setCookieValue(cookieKey, randomDeviceId, 3650);
      return randomDeviceId;
    }

    BrowserHelper.getDeviceId = getDeviceId;
    /**
     * @hidden
     *
     * Check if a given object is a valid HTMLElement
     *
     * @param object The object to check.
     * @returns Whether the given object is a valid HTMLElement.
     */

    function isValidHTMLElement(object) {
      return (
        object instanceof HTMLElement ||
        (object != null && _typeof_1(object) === "object" && typeof object.tagName === "string")
      );
    }

    BrowserHelper.isValidHTMLElement = isValidHTMLElement;
  })(exports.BrowserHelper || (exports.BrowserHelper = {}));

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */

  var check = function(O, proto) {
    _anObject$1(O);
    if (!_isObject$1(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set:
      Object.setPrototypeOf ||
      ("__proto__" in {} // eslint-disable-line
        ? (function(test, buggy, set) {
            try {
              set = _ctx$1(Function.call, _objectGopd.f(Object.prototype, "__proto__").set, 2);
              set(test, []);
              buggy = !(test instanceof Array);
            } catch (e) {
              buggy = true;
            }
            return function setPrototypeOf(O, proto) {
              check(O, proto);
              if (buggy) O.__proto__ = proto;
              else set(O, proto);
              return O;
            };
          })({}, false)
        : undefined),
    check: check
  };

  // 19.1.3.19 Object.setPrototypeOf(O, proto)

  _export$1(_export$1.S, "Object", { setPrototypeOf: _setProto.set });

  var setPrototypeOf = _core$1.Object.setPrototypeOf;

  var setPrototypeOf$1 = setPrototypeOf;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  // most Object methods by ES6 should accept primitives

  var _objectSap = function(KEY, exec) {
    var fn = (_core$1.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export$1(
      _export$1.S +
        _export$1.F *
          _fails$1(function() {
            fn(1);
          }),
      "Object",
      exp
    );
  };

  // 19.1.2.9 Object.getPrototypeOf(O)

  _objectSap("getPrototypeOf", function() {
    return function getPrototypeOf(it) {
      return _objectGpo(_toObject(it));
    };
  });

  var getPrototypeOf = _core$1.Object.getPrototypeOf;

  var getPrototypeOf$1 = getPrototypeOf;

  var getPrototypeOf$2 = createCommonjsModule(function(module) {
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = setPrototypeOf$1
        ? getPrototypeOf$1
        : function _getPrototypeOf(o) {
            return o.__proto__ || getPrototypeOf$1(o);
          };
      return _getPrototypeOf(o);
    }

    module.exports = _getPrototypeOf;
  });

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  _export$1(_export$1.S, "Object", { create: _objectCreate });

  var $Object = _core$1.Object;
  var create = function create(P, D) {
    return $Object.create(P, D);
  };

  var create$1 = create;

  var setPrototypeOf$2 = createCommonjsModule(function(module) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf =
        setPrototypeOf$1 ||
        function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

      return _setPrototypeOf(o, p);
    }

    module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = create$1(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf$2(subClass, superClass);
  }

  var inherits = _inherits;

  var _validateCollection = function(it, TYPE) {
    if (!_isObject$1(it) || it._t !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required!");
    return it;
  };

  var dP$4 = _objectDp$1.f;

  var fastKey = _meta.fastKey;

  var SIZE = _descriptors$1 ? "_s" : "size";

  var getEntry = function(that, key) {
    // fast case
    var index = fastKey(key);
    var entry;
    if (index !== "F") return that._i[index];
    // frozen object case
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  var _collectionStrong = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        _anInstance(that, C, NAME, "_i");
        that._t = NAME; // collection type
        that._i = _objectCreate(null); // index
        that._f = undefined; // first entry
        that._l = undefined; // last entry
        that[SIZE] = 0; // size
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p) entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        delete: function(key) {
          var that = _validateCollection(this, NAME);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.n;
            var prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev) prev.n = next;
            if (next) next.p = prev;
            if (that._f == entry) that._f = next;
            if (that._l == entry) that._l = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          _validateCollection(this, NAME);
          var f = _ctx$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while ((entry = entry ? entry.n : this._f)) {
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while (entry && entry.r) entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(_validateCollection(this, NAME), key);
        }
      });
      if (_descriptors$1)
        dP$4(C.prototype, "size", {
          get: function() {
            return _validateCollection(this, NAME)[SIZE];
          }
        });
      return C;
    },
    def: function(that, key, value) {
      var entry = getEntry(that, key);
      var prev, index;
      // change existing entry
      if (entry) {
        entry.v = value;
        // create new entry
      } else {
        that._l = entry = {
          i: (index = fastKey(key, true)), // <- index
          k: key, // <- key
          v: value, // <- value
          p: (prev = that._l), // <- previous entry
          n: undefined, // <- next entry
          r: false // <- removed
        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++;
        // add to index
        if (index !== "F") that._i[index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setStrong: function(C, NAME, IS_MAP) {
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      _iterDefine(
        C,
        NAME,
        function(iterated, kind) {
          this._t = _validateCollection(iterated, NAME); // target
          this._k = kind; // kind
          this._l = undefined; // previous
        },
        function() {
          var that = this;
          var kind = that._k;
          var entry = that._l;
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
          // get next entry
          if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
            // or finish the iteration
            that._t = undefined;
            return _iterStep(1);
          }
          // return step by kind
          if (kind == "keys") return _iterStep(0, entry.k);
          if (kind == "values") return _iterStep(0, entry.v);
          return _iterStep(0, [entry.k, entry.v]);
        },
        IS_MAP ? "entries" : "values",
        !IS_MAP,
        true
      );

      // add [@@species], 23.1.2.2, 23.2.2.2
      _setSpecies(NAME);
    }
  };

  var SPECIES$4 = _wks$1("species");

  var _arraySpeciesConstructor = function(original) {
    var C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == "function" && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject$1(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)

  var _arraySpeciesCreate = function(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex

  var _arrayMethods = function(TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function($this, callbackfn, that) {
      var O = _toObject($this);
      var self = _iobject(O);
      var f = _ctx$1(callbackfn, that, 3);
      var length = _toLength$1(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;
            // map
            else if (res)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return val; // find
                case 6:
                  return index; // findIndex
                case 2:
                  result.push(val); // filter
              }
            else if (IS_EVERY) return false; // every
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  var dP$5 = _objectDp$1.f;
  var each = _arrayMethods(0);

  var _collection = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = _global$1[NAME];
    var C = Base;
    var ADDER = IS_MAP ? "set" : "add";
    var proto = C && C.prototype;
    var O = {};
    if (
      !_descriptors$1 ||
      typeof C != "function" ||
      !(
        IS_WEAK ||
        (proto.forEach &&
          !_fails$1(function() {
            new C().entries().next();
          }))
      )
    ) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      _redefineAll(C.prototype, methods);
      _meta.NEED = true;
    } else {
      C = wrapper(function(target, iterable) {
        _anInstance(target, C, NAME, "_c");
        target._c = new Base();
        if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
      });
      each("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","), function(KEY) {
        var IS_ADDER = KEY == "add" || KEY == "set";
        if (KEY in proto && !(IS_WEAK && KEY == "clear"))
          _hide$1(C.prototype, KEY, function(a, b) {
            _anInstance(this, C, KEY);
            if (!IS_ADDER && IS_WEAK && !_isObject$1(a)) return KEY == "get" ? undefined : false;
            var result = this._c[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          });
      });
      IS_WEAK ||
        dP$5(C.prototype, "size", {
          get: function() {
            return this._c.size;
          }
        });
    }

    _setToStringTag(C, NAME);

    O[NAME] = C;
    _export$1(_export$1.G + _export$1.W + _export$1.F, O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

    return C;
  };

  var MAP = "Map";

  // 23.1 Map Objects
  var es6_map = _collection(
    MAP,
    function(get) {
      return function Map() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    },
    {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
        return entry && entry.v;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
      }
    },
    _collectionStrong,
    true
  );

  var _arrayFromIterable = function(iter, ITERATOR) {
    var result = [];
    _forOf(iter, false, result.push, result, ITERATOR);
    return result;
  };

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON

  var _collectionToJson = function(NAME) {
    return function toJSON() {
      if (_classof$1(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
      return _arrayFromIterable(this);
    };
  };

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON

  _export$1(_export$1.P + _export$1.R, "Map", { toJSON: _collectionToJson("Map") });

  // https://tc39.github.io/proposal-setmap-offrom/

  var _setCollectionOf = function(COLLECTION) {
    _export$1(_export$1.S, COLLECTION, {
      of: function of() {
        var length = arguments.length;
        var A = new Array(length);
        while (length--) A[length] = arguments[length];
        return new this(A);
      }
    });
  };

  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
  _setCollectionOf("Map");

  // https://tc39.github.io/proposal-setmap-offrom/

  var _setCollectionFrom = function(COLLECTION) {
    _export$1(_export$1.S, COLLECTION, {
      from: function from(source /* , mapFn, thisArg */) {
        var mapFn = arguments[1];
        var mapping, A, n, cb;
        _aFunction$1(this);
        mapping = mapFn !== undefined;
        if (mapping) _aFunction$1(mapFn);
        if (source == undefined) return new this();
        A = [];
        if (mapping) {
          n = 0;
          cb = _ctx$1(mapFn, arguments[2], 2);
          _forOf(source, false, function(nextItem) {
            A.push(cb(nextItem, n++));
          });
        } else {
          _forOf(source, false, A.push, A);
        }
        return new this(A);
      }
    });
  };

  // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
  _setCollectionFrom("Map");

  var map = _core$1.Map;

  var map$1 = map;

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var arraySlice = [].slice;
  var factories = {};

  var construct = function(F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) n[i] = "a[" + i + "]";
      // eslint-disable-next-line no-new-func
      factories[len] = Function("F,a", "return new F(" + n.join(",") + ")");
    }
    return factories[len](F, args);
  };

  var _bind =
    Function.bind ||
    function bind(that /* , ...args */) {
      var fn = _aFunction$1(this);
      var partArgs = arraySlice.call(arguments, 1);
      var bound = function(/* args... */) {
        var args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
      };
      if (_isObject$1(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };

  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])

  var rConstruct = (_global$1.Reflect || {}).construct;

  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = _fails$1(function() {
    function F() {
      /* empty */
    }
    return !(
      rConstruct(
        function() {
          /* empty */
        },
        [],
        F
      ) instanceof F
    );
  });
  var ARGS_BUG = !_fails$1(function() {
    rConstruct(function() {
      /* empty */
    });
  });

  _export$1(_export$1.S + _export$1.F * (NEW_TARGET_BUG || ARGS_BUG), "Reflect", {
    construct: function construct(Target, args /* , newTarget */) {
      _aFunction$1(Target);
      _anObject$1(args);
      var newTarget = arguments.length < 3 ? Target : _aFunction$1(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        $args.push.apply($args, args);
        return new (_bind.apply(Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = _objectCreate(_isObject$1(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return _isObject$1(result) ? result : instance;
    }
  });

  var construct$1 = _core$1.Reflect.construct;

  var construct$2 = construct$1;

  var construct$3 = createCommonjsModule(function(module) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !construct$2) return false;
      if (construct$2.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(construct$2(Date, [], function() {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        module.exports = _construct = construct$2;
      } else {
        module.exports = _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) setPrototypeOf$2(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function(module) {
    function _wrapNativeSuper(Class) {
      var _cache = typeof map$1 === "function" ? new map$1() : undefined;

      module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return construct$3(Class, arguments, getPrototypeOf$2(this).constructor);
        }

        Wrapper.prototype = create$1(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return setPrototypeOf$2(Wrapper, Class);
      };

      return _wrapNativeSuper(Class);
    }

    module.exports = _wrapNativeSuper;
  });

  /**
   * @hidden
   */
  var CustomError =
    /*#__PURE__*/
    (function(_Error) {
      inherits(CustomError, _Error);

      // istanbul ignore next
      function CustomError() {
        var _this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$name = _ref.name,
          name = _ref$name === void 0 ? "" : _ref$name,
          _ref$message = _ref.message,
          message = _ref$message === void 0 ? "" : _ref$message,
          data = _ref.data;

        classCallCheck(this, CustomError);

        _this = possibleConstructorReturn(this, getPrototypeOf$2(CustomError).call(this, message));

        setPrototypeOf$1(assertThisInitialized(_this), CustomError.prototype);

        _this.name = name;
        _this.data = data;
        return _this;
      }

      return CustomError;
    })(wrapNativeSuper(Error));

  /**
   * @hidden
   */

  var UnsupportedBrowserError =
    /*#__PURE__*/
    (function(_CustomError) {
      inherits(UnsupportedBrowserError, _CustomError);

      // istanbul ignore next
      function UnsupportedBrowserError(browserCompatibility) {
        classCallCheck(this, UnsupportedBrowserError);

        return possibleConstructorReturn(
          this,
          getPrototypeOf$2(UnsupportedBrowserError).call(this, {
            name: "UnsupportedBrowserError",
            message: "This OS / Browser has one or more missing features preventing it from working correctly",
            data: browserCompatibility
          })
        );
      }

      return UnsupportedBrowserError;
    })(CustomError);

  ___$insertStyle(
    '.scandit.scandit-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.scandit.scandit-barcode-picker{position:relative;width:100%;height:100%;background-color:#000}.scandit .scandit-video{width:100%;height:100%;position:relative;display:block}.scandit .scandit-video.mirrored{transform:scaleX(-1)}.scandit .scandit-logo{bottom:5%;right:5%;max-width:35%;max-height:12.5%}.scandit .scandit-laser,.scandit .scandit-logo{position:absolute;pointer-events:none;transform:translateZ(0)}.scandit .scandit-laser{z-index:10;box-sizing:border-box;top:-9999px;display:flex;align-items:center}.scandit .scandit-laser img{width:100%;max-height:47px}.scandit .scandit-laser img,.scandit .scandit-viewfinder{position:absolute;transition:opacity .25s ease;-webkit-animation-duration:.25s;animation-duration:.25s}.scandit .scandit-viewfinder{z-index:10;box-sizing:border-box;border:2px solid #fff;border-radius:10px;top:-9999px;pointer-events:none;transform:translateZ(0)}.scandit .scandit-viewfinder.paused{opacity:.4}.scandit .scandit-camera-switcher,.scandit .scandit-torch-toggle{-webkit-tap-highlight-color:rgba(255,255,255,0);position:absolute;top:5%;max-width:15%;max-height:15%;z-index:10;cursor:pointer;-webkit-filter:drop-shadow(0 2px 0 grey);filter:drop-shadow(0 2px 0 #808080);transform:translateZ(0)}.scandit .scandit-camera-switcher{left:5%}.scandit .scandit-torch-toggle{right:5%}.scandit .scandit-camera-upload{-webkit-tap-highlight-color:rgba(255,255,255,0);display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;z-index:5}.scandit .scandit-camera-upload label{cursor:pointer;text-align:center;width:224px;height:224px;min-width:224px;min-height:224px;z-index:10;margin:4px;padding:20px;box-sizing:border-box;border-radius:50%;-webkit-filter:drop-shadow(0 0 .15rem #000);filter:drop-shadow(0 0 .15rem #000)}.scandit .scandit-camera-upload label input[type=file]{position:absolute;top:-9999px}.scandit .scandit-camera-upload label img{width:60%;height:60%}.scandit .scandit-camera-upload label div{font-family:sans-serif;color:#fff;font-size:16pt}.scandit .radial-progress{width:224px;height:224px;background-color:transparent;border:4px solid #fff;border-radius:50%;position:absolute;transition:opacity 1s ease,border-color .5s;-webkit-animation-duration:.25s;animation-duration:.25s;z-index:7;box-shadow:0 0 .3rem #000,inset 0 0 .3rem #000}.scandit .radial-progress[data-progress="0"]{border-color:hsla(0,0%,100%,.2)}.scandit .radial-progress[data-progress="5"]{border-color:hsla(0,0%,100%,.24)}.scandit .radial-progress[data-progress="10"]{border-color:hsla(0,0%,100%,.28)}.scandit .radial-progress[data-progress="15"]{border-color:hsla(0,0%,100%,.32)}.scandit .radial-progress[data-progress="20"]{border-color:hsla(0,0%,100%,.36)}.scandit .radial-progress[data-progress="25"]{border-color:hsla(0,0%,100%,.4)}.scandit .radial-progress[data-progress="30"]{border-color:hsla(0,0%,100%,.44)}.scandit .radial-progress[data-progress="35"]{border-color:hsla(0,0%,100%,.48)}.scandit .radial-progress[data-progress="40"]{border-color:hsla(0,0%,100%,.52)}.scandit .radial-progress[data-progress="45"]{border-color:hsla(0,0%,100%,.56)}.scandit .radial-progress[data-progress="50"]{border-color:hsla(0,0%,100%,.6)}.scandit .radial-progress[data-progress="55"]{border-color:hsla(0,0%,100%,.64)}.scandit .radial-progress[data-progress="60"]{border-color:hsla(0,0%,100%,.68)}.scandit .radial-progress[data-progress="65"]{border-color:hsla(0,0%,100%,.72)}.scandit .radial-progress[data-progress="70"]{border-color:hsla(0,0%,100%,.76)}.scandit .radial-progress[data-progress="75"]{border-color:hsla(0,0%,100%,.8)}.scandit .radial-progress[data-progress="80"]{border-color:hsla(0,0%,100%,.84)}.scandit .radial-progress[data-progress="85"]{border-color:hsla(0,0%,100%,.88)}.scandit .radial-progress[data-progress="90"]{border-color:hsla(0,0%,100%,.92)}.scandit .radial-progress[data-progress="95"]{border-color:hsla(0,0%,100%,.96)}.scandit .radial-progress[data-progress="100"]{border-color:#fff}.scandit .scandit-flash-color{-webkit-animation-name:scandit-flash-color;animation-name:scandit-flash-color}.scandit .scandit-flash-white{-webkit-animation-name:scandit-flash-white;animation-name:scandit-flash-white}.scandit .scandit-flash-white-inset{-webkit-animation-name:scandit-flash-white-inset;animation-name:scandit-flash-white-inset}.scandit .scandit-opacity-pulse{-webkit-animation-duration:.333s,1s;animation-duration:.333s,1s;-webkit-animation-iteration-count:1,infinite;animation-iteration-count:1,infinite;-webkit-animation-delay:0s,.333s;animation-delay:0s,.333s;-webkit-animation-timing-function:cubic-bezier(.645,.045,.355,1),cubic-bezier(.645,.045,.355,1);animation-timing-function:cubic-bezier(.645,.045,.355,1),cubic-bezier(.645,.045,.355,1);-webkit-animation-name:scandit-opacity-pulse-before,scandit-opacity-pulse;animation-name:scandit-opacity-pulse-before,scandit-opacity-pulse}.scandit .scandit-hidden-opacity{opacity:0}.scandit-hidden{display:none!important}@-webkit-keyframes scandit-flash-color{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2);filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2)}to{-webkit-filter:none;filter:none}}@keyframes scandit-flash-color{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2);filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2)}to{-webkit-filter:none;filter:none}}@-webkit-keyframes scandit-flash-white{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff);filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff)}to{-webkit-filter:none;filter:none}}@keyframes scandit-flash-white{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff);filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff)}to{-webkit-filter:none;filter:none}}@-webkit-keyframes scandit-flash-white-inset{0%{box-shadow:none}50%{box-shadow:inset 0 0 .5rem #fff,inset 0 0 1rem #fff,inset 0 0 2.5rem #fff}to{box-shadow:none}}@keyframes scandit-flash-white-inset{0%{box-shadow:none}50%{box-shadow:inset 0 0 .5rem #fff,inset 0 0 1rem #fff,inset 0 0 2.5rem #fff}to{box-shadow:none}}@-webkit-keyframes scandit-opacity-pulse-before{0%{opacity:1}to{opacity:.4}}@keyframes scandit-opacity-pulse-before{0%{opacity:1}to{opacity:.4}}@-webkit-keyframes scandit-opacity-pulse{0%{opacity:.4}50%{opacity:.6}to{opacity:.4}}@keyframes scandit-opacity-pulse{0%{opacity:.4}50%{opacity:.6}to{opacity:.4}}@-webkit-keyframes scandit-opacity-pulse-after{0%{opacity:.5}to{opacity:1}}@keyframes scandit-opacity-pulse-after{0%{opacity:.5}to{opacity:1}}'
  );

  var TYPED = _uid("typed_array");
  var VIEW = _uid("view");
  var ABV = !!(_global.ArrayBuffer && _global.DataView);
  var CONSTR = ABV;
  var i$1 = 0;
  var l = 9;
  var Typed;

  var TypedArrayConstructors = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(
    ","
  );

  while (i$1 < l) {
    if ((Typed = _global[TypedArrayConstructors[i$1++]])) {
      _hide(Typed.prototype, TYPED, true);
      _hide(Typed.prototype, VIEW, true);
    } else CONSTR = false;
  }

  var _typed = {
    ABV: ABV,
    CONSTR: CONSTR,
    TYPED: TYPED,
    VIEW: VIEW
  };

  var _redefineAll$1 = function(target, src, safe) {
    for (var key in src) _redefine(target, key, src[key], safe);
    return target;
  };

  var _anInstance$1 = function(it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ": incorrect invocation!");
    }
    return it;
  };

  // https://tc39.github.io/ecma262/#sec-toindex

  var _toIndex = function(it) {
    if (it === undefined) return 0;
    var number = _toInteger(it);
    var length = _toLength(number);
    if (number !== length) throw RangeError("Wrong length!");
    return length;
  };

  var shared$1 = _shared("keys");

  var _sharedKey$1 = function(key) {
    return shared$1[key] || (shared$1[key] = _uid(key));
  };

  var arrayIndexOf$1 = _arrayIncludes$1(false);
  var IE_PROTO$3 = _sharedKey$1("IE_PROTO");

  var _objectKeysInternal$1 = function(object, names) {
    var O = _toIobject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO$3) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (_has(O, (key = names[i++]))) {
        ~arrayIndexOf$1(result, key) || result.push(key);
      }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys$1 = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
    ","
  );

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys$1 = _enumBugKeys$1.concat("length", "prototype");

  var f$9 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return _objectKeysInternal$1(O, hiddenKeys$1);
    };

  var _objectGopn$1 = {
    f: f$9
  };

  // 7.1.13 ToObject(argument)

  var _toObject$1 = function(it) {
    return Object(_defined(it));
  };

  var _arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = _toObject$1(this);
    var length = _toLength(O.length);
    var aLen = arguments.length;
    var index = _toAbsoluteIndex$1(aLen > 1 ? arguments[1] : undefined, length);
    var end = aLen > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : _toAbsoluteIndex$1(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var def$1 = _objectDp.f;

  var TAG$3 = _wks("toStringTag");

  var _setToStringTag$1 = function(it, tag, stat) {
    if (it && !_has((it = stat ? it : it.prototype), TAG$3)) def$1(it, TAG$3, { configurable: true, value: tag });
  };

  var _typedBuffer = createCommonjsModule(function(module, exports) {
    var gOPN = _objectGopn$1.f;
    var dP = _objectDp.f;

    var ARRAY_BUFFER = "ArrayBuffer";
    var DATA_VIEW = "DataView";
    var PROTOTYPE = "prototype";
    var WRONG_LENGTH = "Wrong length!";
    var WRONG_INDEX = "Wrong index!";
    var $ArrayBuffer = _global[ARRAY_BUFFER];
    var $DataView = _global[DATA_VIEW];
    var Math = _global.Math;
    var RangeError = _global.RangeError;
    // eslint-disable-next-line no-shadow-restricted-names
    var Infinity = _global.Infinity;
    var BaseBuffer = $ArrayBuffer;
    var abs = Math.abs;
    var pow = Math.pow;
    var floor = Math.floor;
    var log = Math.log;
    var LN2 = Math.LN2;
    var BUFFER = "buffer";
    var BYTE_LENGTH = "byteLength";
    var BYTE_OFFSET = "byteOffset";
    var $BUFFER = _descriptors ? "_b" : BUFFER;
    var $LENGTH = _descriptors ? "_l" : BYTE_LENGTH;
    var $OFFSET = _descriptors ? "_o" : BYTE_OFFSET;

    // IEEE754 conversions based on https://github.com/feross/ieee754
    function packIEEE754(value, mLen, nBytes) {
      var buffer = new Array(nBytes);
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
      var i = 0;
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
      var e, m, c;
      value = abs(value);
      // eslint-disable-next-line no-self-compare
      if (value != value || value === Infinity) {
        // eslint-disable-next-line no-self-compare
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);
        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
      e = (e << mLen) | m;
      eLen += mLen;
      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
      buffer[--i] |= s * 128;
      return buffer;
    }
    function unpackIEEE754(buffer, mLen, nBytes) {
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = eLen - 7;
      var i = nBytes - 1;
      var s = buffer[i--];
      var e = s & 127;
      var m;
      s >>= 7;
      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
      m = e & ((1 << -nBits) - 1);
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * pow(2, e - mLen);
    }

    function unpackI32(bytes) {
      return (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    }
    function packI8(it) {
      return [it & 0xff];
    }
    function packI16(it) {
      return [it & 0xff, (it >> 8) & 0xff];
    }
    function packI32(it) {
      return [it & 0xff, (it >> 8) & 0xff, (it >> 16) & 0xff, (it >> 24) & 0xff];
    }
    function packF64(it) {
      return packIEEE754(it, 52, 8);
    }
    function packF32(it) {
      return packIEEE754(it, 23, 4);
    }

    function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, {
        get: function() {
          return this[internal];
        }
      });
    }

    function get(view, bytes, index, isLittleEndian) {
      var numIndex = +index;
      var intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    }
    function set(view, bytes, index, conversion, value, isLittleEndian) {
      var numIndex = +index;
      var intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = conversion(+value);
      for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
    }

    if (!_typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance$1(this, $ArrayBuffer, ARRAY_BUFFER);
        var byteLength = _toIndex(length);
        this._b = _arrayFill.call(new Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        _anInstance$1(this, $DataView, DATA_VIEW);
        _anInstance$1(buffer, $ArrayBuffer, DATA_VIEW);
        var bufferLength = buffer[$LENGTH];
        var offset = _toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError("Wrong offset!");
        byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (_descriptors) {
        addGetter($ArrayBuffer, BYTE_LENGTH, "_l");
        addGetter($DataView, BUFFER, "_b");
        addGetter($DataView, BYTE_LENGTH, "_l");
        addGetter($DataView, BYTE_OFFSET, "_o");
      }

      _redefineAll$1($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return (get(this, 1, byteOffset)[0] << 24) >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset /* , littleEndian */) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (((bytes[1] << 8) | bytes[0]) << 16) >> 16;
        },
        getUint16: function getUint16(byteOffset /* , littleEndian */) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8) | bytes[0];
        },
        getInt32: function getInt32(byteOffset /* , littleEndian */) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset /* , littleEndian */) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
          set(this, 8, byteOffset, packF64, value, arguments[2]);
        }
      });
    } else {
      if (
        !_fails(function() {
          $ArrayBuffer(1);
        }) ||
        !_fails(function() {
          new $ArrayBuffer(-1); // eslint-disable-line no-new
        }) ||
        _fails(function() {
          new $ArrayBuffer(); // eslint-disable-line no-new
          new $ArrayBuffer(1.5); // eslint-disable-line no-new
          new $ArrayBuffer(NaN); // eslint-disable-line no-new
          return $ArrayBuffer.name != ARRAY_BUFFER;
        })
      ) {
        $ArrayBuffer = function ArrayBuffer(length) {
          _anInstance$1(this, $ArrayBuffer);
          return new BaseBuffer(_toIndex(length));
        };
        var ArrayBufferProto = ($ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE]);
        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ) {
          if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
        }
        ArrayBufferProto.constructor = $ArrayBuffer;
      }
      // iOS Safari 7.x bug
      var view = new $DataView(new $ArrayBuffer(2));
      var $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1))
        _redefineAll$1(
          $DataView[PROTOTYPE],
          {
            setInt8: function setInt8(byteOffset, value) {
              $setInt8.call(this, byteOffset, (value << 24) >> 24);
            },
            setUint8: function setUint8(byteOffset, value) {
              $setInt8.call(this, byteOffset, (value << 24) >> 24);
            }
          },
          true
        );
    }
    _setToStringTag$1($ArrayBuffer, ARRAY_BUFFER);
    _setToStringTag$1($DataView, DATA_VIEW);
    _hide($DataView[PROTOTYPE], _typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  });

  var _iterators$1 = {};

  // check on default Array iterator

  var ITERATOR$4 = _wks("iterator");
  var ArrayProto$2 = Array.prototype;

  var _isArrayIter$1 = function(it) {
    return it !== undefined && (_iterators$1.Array === it || ArrayProto$2[ITERATOR$4] === it);
  };

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)

  var _objectKeys$1 =
    Object.keys ||
    function keys(O) {
      return _objectKeysInternal$1(O, _enumBugKeys$1);
    };

  var _objectDps$1 = _descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        _anObject(O);
        var keys = _objectKeys$1(Properties);
        var length = keys.length;
        var i = 0;
        var P;
        while (length > i) _objectDp.f(O, (P = keys[i++]), Properties[P]);
        return O;
      };

  var document$4 = _global.document;
  var _html$1 = document$4 && document$4.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

  var IE_PROTO$4 = _sharedKey$1("IE_PROTO");
  var Empty$1 = function() {
    /* empty */
  };
  var PROTOTYPE$4 = "prototype";

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict$1 = function() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate("iframe");
    var i = _enumBugKeys$1.length;
    var lt = "<";
    var gt = ">";
    var iframeDocument;
    iframe.style.display = "none";
    _html$1.appendChild(iframe);
    iframe.src = "javascript:"; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
    iframeDocument.close();
    createDict$1 = iframeDocument.F;
    while (i--) delete createDict$1[PROTOTYPE$4][_enumBugKeys$1[i]];
    return createDict$1();
  };

  var _objectCreate$1 =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty$1[PROTOTYPE$4] = _anObject(O);
        result = new Empty$1();
        Empty$1[PROTOTYPE$4] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$4] = O;
      } else result = createDict$1();
      return Properties === undefined ? result : _objectDps$1(result, Properties);
    };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

  var IE_PROTO$5 = _sharedKey$1("IE_PROTO");
  var ObjectProto$2 = Object.prototype;

  var _objectGpo$1 =
    Object.getPrototypeOf ||
    function(O) {
      O = _toObject$1(O);
      if (_has(O, IE_PROTO$5)) return O[IE_PROTO$5];
      if (typeof O.constructor == "function" && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto$2 : null;
    };

  var ITERATOR$5 = _wks("iterator");

  var core_getIteratorMethod$1 = (_core.getIteratorMethod = function(it) {
    if (it != undefined) return it[ITERATOR$5] || it["@@iterator"] || _iterators$1[_classof(it)];
  });

  // 7.2.2 IsArray(argument)

  var _isArray$1 =
    Array.isArray ||
    function isArray(arg) {
      return _cof(arg) == "Array";
    };

  var SPECIES$5 = _wks("species");

  var _arraySpeciesConstructor$1 = function(original) {
    var C;
    if (_isArray$1(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == "function" && (C === Array || _isArray$1(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES$5];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)

  var _arraySpeciesCreate$1 = function(original, length) {
    return new (_arraySpeciesConstructor$1(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex

  var _arrayMethods$1 = function(TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate$1;
    return function($this, callbackfn, that) {
      var O = _toObject$1($this);
      var self = _iobject$1(O);
      var f = _ctx(callbackfn, that, 3);
      var length = _toLength(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;
            // map
            else if (res)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return val; // find
                case 6:
                  return index; // findIndex
                case 2:
                  result.push(val); // filter
              }
            else if (IS_EVERY) return false; // every
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  var _iterStep$1 = function(done, value) {
    return { value: value, done: !!done };
  };

  var IteratorPrototype$1 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype$1, _wks("iterator"), function() {
    return this;
  });

  var _iterCreate$1 = function(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate$1(IteratorPrototype$1, { next: _propertyDesc(1, next) });
    _setToStringTag$1(Constructor, NAME + " Iterator");
  };

  var ITERATOR$6 = _wks("iterator");
  var BUGGY$1 = !([].keys && "next" in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR$1 = "@@iterator";
  var KEYS$1 = "keys";
  var VALUES$1 = "values";

  var returnThis$1 = function() {
    return this;
  };

  var _iterDefine$1 = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate$1(Constructor, NAME, next);
    var getMethod = function(kind) {
      if (!BUGGY$1 && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS$1:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES$1:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + " Iterator";
    var DEF_VALUES = DEFAULT == VALUES$1;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR$6] || proto[FF_ITERATOR$1] || (DEFAULT && proto[DEFAULT]);
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? (!DEF_VALUES ? $default : getMethod("entries")) : undefined;
    var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag$1(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (typeof IteratorPrototype[ITERATOR$6] != "function") _hide(IteratorPrototype, ITERATOR$6, returnThis$1);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES$1) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    // Define iterator
    if (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$6]) {
      _hide(proto, ITERATOR$6, $default);
    }
    // Plug for library
    _iterators$1[NAME] = $default;
    _iterators$1[TAG] = returnThis$1;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES$1),
        keys: IS_SET ? $default : getMethod(KEYS$1),
        entries: $entries
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto)) _redefine(proto, key, methods[key]);
        }
      else _export(_export.P + _export.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator$1 = _iterDefine$1(
    Array,
    "Array",
    function(iterated, kind) {
      this._t = _toIobject$1(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    },
    function() {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep$1(1);
      }
      if (kind == "keys") return _iterStep$1(0, index);
      if (kind == "values") return _iterStep$1(0, O[index]);
      return _iterStep$1(0, [index, O[index]]);
    },
    "values"
  );

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators$1.Arguments = _iterators$1.Array;

  _addToUnscopables("keys");
  _addToUnscopables("values");
  _addToUnscopables("entries");

  var ITERATOR$7 = _wks("iterator");
  var SAFE_CLOSING$1 = false;

  try {
    var riter$1 = [7][ITERATOR$7]();
    riter$1["return"] = function() {
      SAFE_CLOSING$1 = true;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(riter$1, function() {
      throw 2;
    });
  } catch (e) {
    /* empty */
  }

  var _iterDetect$1 = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING$1) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$7]();
      iter.next = function() {
        return { done: (safe = true) };
      };
      arr[ITERATOR$7] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {
      /* empty */
    }
    return safe;
  };

  var SPECIES$6 = _wks("species");

  var _setSpecies$1 = function(KEY) {
    var C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$6])
      _objectDp.f(C, SPECIES$6, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };

  var _arrayCopyWithin =
    [].copyWithin ||
    function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
      var O = _toObject$1(this);
      var len = _toLength(O.length);
      var to = _toAbsoluteIndex$1(target, len);
      var from = _toAbsoluteIndex$1(start, len);
      var end = arguments.length > 2 ? arguments[2] : undefined;
      var count = Math.min((end === undefined ? len : _toAbsoluteIndex$1(end, len)) - from, len - to);
      var inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count-- > 0) {
        if (from in O) O[to] = O[from];
        else delete O[to];
        to += inc;
        from += inc;
      }
      return O;
    };

  var f$a = {}.propertyIsEnumerable;

  var _objectPie$1 = {
    f: f$a
  };

  var gOPD$2 = Object.getOwnPropertyDescriptor;

  var f$b = _descriptors
    ? gOPD$2
    : function getOwnPropertyDescriptor(O, P) {
        O = _toIobject$1(O);
        P = _toPrimitive(P, true);
        if (_ie8DomDefine)
          try {
            return gOPD$2(O, P);
          } catch (e) {
            /* empty */
          }
        if (_has(O, P)) return _propertyDesc(!_objectPie$1.f.call(O, P), O[P]);
      };

  var _objectGopd$1 = {
    f: f$b
  };

  var _typedArray = createCommonjsModule(function(module) {
    if (_descriptors) {
      var LIBRARY = _library;
      var global = _global;
      var fails = _fails;
      var $export = _export;
      var $typed = _typed;
      var $buffer = _typedBuffer;
      var ctx = _ctx;
      var anInstance = _anInstance$1;
      var propertyDesc = _propertyDesc;
      var hide = _hide;
      var redefineAll = _redefineAll$1;
      var toInteger = _toInteger;
      var toLength = _toLength;
      var toIndex = _toIndex;
      var toAbsoluteIndex = _toAbsoluteIndex$1;
      var toPrimitive = _toPrimitive;
      var has = _has;
      var classof = _classof;
      var isObject = _isObject;
      var toObject = _toObject$1;
      var isArrayIter = _isArrayIter$1;
      var create = _objectCreate$1;
      var getPrototypeOf = _objectGpo$1;
      var gOPN = _objectGopn$1.f;
      var getIterFn = core_getIteratorMethod$1;
      var uid = _uid;
      var wks = _wks;
      var createArrayMethod = _arrayMethods$1;
      var createArrayIncludes = _arrayIncludes$1;
      var speciesConstructor = _speciesConstructor;
      var ArrayIterators = es6_array_iterator$1;
      var Iterators = _iterators$1;
      var $iterDetect = _iterDetect$1;
      var setSpecies = _setSpecies$1;
      var arrayFill = _arrayFill;
      var arrayCopyWithin = _arrayCopyWithin;
      var $DP = _objectDp;
      var $GOPD = _objectGopd$1;
      var dP = $DP.f;
      var gOPD = $GOPD.f;
      var RangeError = global.RangeError;
      var TypeError = global.TypeError;
      var Uint8Array = global.Uint8Array;
      var ARRAY_BUFFER = "ArrayBuffer";
      var SHARED_BUFFER = "Shared" + ARRAY_BUFFER;
      var BYTES_PER_ELEMENT = "BYTES_PER_ELEMENT";
      var PROTOTYPE = "prototype";
      var ArrayProto = Array[PROTOTYPE];
      var $ArrayBuffer = $buffer.ArrayBuffer;
      var $DataView = $buffer.DataView;
      var arrayForEach = createArrayMethod(0);
      var arrayFilter = createArrayMethod(2);
      var arraySome = createArrayMethod(3);
      var arrayEvery = createArrayMethod(4);
      var arrayFind = createArrayMethod(5);
      var arrayFindIndex = createArrayMethod(6);
      var arrayIncludes = createArrayIncludes(true);
      var arrayIndexOf = createArrayIncludes(false);
      var arrayValues = ArrayIterators.values;
      var arrayKeys = ArrayIterators.keys;
      var arrayEntries = ArrayIterators.entries;
      var arrayLastIndexOf = ArrayProto.lastIndexOf;
      var arrayReduce = ArrayProto.reduce;
      var arrayReduceRight = ArrayProto.reduceRight;
      var arrayJoin = ArrayProto.join;
      var arraySort = ArrayProto.sort;
      var arraySlice = ArrayProto.slice;
      var arrayToString = ArrayProto.toString;
      var arrayToLocaleString = ArrayProto.toLocaleString;
      var ITERATOR = wks("iterator");
      var TAG = wks("toStringTag");
      var TYPED_CONSTRUCTOR = uid("typed_constructor");
      var DEF_CONSTRUCTOR = uid("def_constructor");
      var ALL_CONSTRUCTORS = $typed.CONSTR;
      var TYPED_ARRAY = $typed.TYPED;
      var VIEW = $typed.VIEW;
      var WRONG_LENGTH = "Wrong length!";

      var $map = createArrayMethod(1, function(O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });

      var LITTLE_ENDIAN = fails(function() {
        // eslint-disable-next-line no-undef
        return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      });

      var FORCED_SET =
        !!Uint8Array &&
        !!Uint8Array[PROTOTYPE].set &&
        fails(function() {
          new Uint8Array(1).set({});
        });

      var toOffset = function(it, BYTES) {
        var offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError("Wrong offset!");
        return offset;
      };

      var validate = function(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + " is not a typed array!");
      };

      var allocate = function(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError("It is not a typed array constructor!");
        }
        return new C(length);
      };

      var speciesFromList = function(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function(C, list) {
        var index = 0;
        var length = list.length;
        var result = allocate(C, length);
        while (length > index) result[index] = list[index++];
        return result;
      };

      var addGetter = function(it, key, internal) {
        dP(it, key, {
          get: function() {
            return this._d[internal];
          }
        });
      };

      var $from = function from(source /* , mapfn, thisArg */) {
        var O = toObject(source);
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var iterFn = getIterFn(O);
        var i, length, values, result, step, iterator;
        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }
          O = values;
        }
        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }
        return result;
      };

      var $of = function of(/* ...items */) {
        var index = 0;
        var length = arguments.length;
        var result = allocate(this, length);
        while (length > index) result[index] = arguments[index++];
        return result;
      };

      // iOS Safari 6.x fails here
      var TO_LOCALE_BUG =
        !!Uint8Array &&
        fails(function() {
          arrayToLocaleString.call(new Uint8Array(1));
        });

      var $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      var proto = {
        copyWithin: function copyWithin(target, start /* , end */) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn /* , thisArg */) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value /* , start, end */) {
          // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn /* , thisArg */) {
          return speciesFromList(
            this,
            arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined)
          );
        },
        find: function find(predicate /* , thisArg */) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate /* , thisArg */) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn /* , thisArg */) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement /* , fromIndex */) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement /* , fromIndex */) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) {
          // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
          // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn /* , thisArg */) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn /* , initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn /* , initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          var that = this;
          var length = validate(that).length;
          var middle = Math.floor(length / 2);
          var index = 0;
          var value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }
          return that;
        },
        some: function some(callbackfn /* , thisArg */) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          var O = validate(this);
          var length = O.length;
          var $begin = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
            O.buffer,
            O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
            toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
          );
        }
      };

      var $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      var $set = function set(arrayLike /* , offset */) {
        validate(this);
        var offset = toOffset(arguments[1], 1);
        var length = this.length;
        var src = toObject(arrayLike);
        var len = toLength(src.length);
        var index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);
        while (index < len) this[offset + index] = src[index++];
      };

      var $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        }
      };

      var isTAIndex = function(target, key) {
        return (
          isObject(target) &&
          target[TYPED_ARRAY] &&
          typeof key != "symbol" &&
          key in target &&
          String(+key) == String(key)
        );
      };
      var $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, (key = toPrimitive(key, true))) ? propertyDesc(2, target[key]) : gOPD(target, key);
      };
      var $setDesc = function defineProperty(target, key, desc) {
        if (
          isTAIndex(target, (key = toPrimitive(key, true))) &&
          isObject(desc) &&
          has(desc, "value") &&
          !has(desc, "get") &&
          !has(desc, "set") &&
          // TODO: add validation descriptor w/o calling accessors
          !desc.configurable &&
          (!has(desc, "writable") || desc.writable) &&
          (!has(desc, "enumerable") || desc.enumerable)
        ) {
          target[key] = desc.value;
          return target;
        }
        return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, "Object", {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc
      });

      if (
        fails(function() {
          arrayToString.call({});
        })
      ) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      var $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor: function() {
          /* noop */
        },
        toString: arrayToString,
        toLocaleString: $toLocaleString
      });
      addGetter($TypedArrayPrototype$, "buffer", "b");
      addGetter($TypedArrayPrototype$, "byteOffset", "o");
      addGetter($TypedArrayPrototype$, "byteLength", "l");
      addGetter($TypedArrayPrototype$, "length", "e");
      dP($TypedArrayPrototype$, TAG, {
        get: function() {
          return this[TYPED_ARRAY];
        }
      });

      // eslint-disable-next-line max-statements
      module.exports = function(KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        var NAME = KEY + (CLAMPED ? "Clamped" : "") + "Array";
        var GETTER = "get" + KEY;
        var SETTER = "set" + KEY;
        var TypedArray = global[NAME];
        var Base = TypedArray || {};
        var TAC = TypedArray && getPrototypeOf(TypedArray);
        var FORCED = !TypedArray || !$typed.ABV;
        var O = {};
        var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
        var getter = function(that, index) {
          var data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };
        var setter = function(that, index, value) {
          var data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };
        var addElement = function(that, index) {
          dP(that, index, {
            get: function() {
              return getter(this, index);
            },
            set: function(value) {
              return setter(this, index, value);
            },
            enumerable: true
          });
        };
        if (FORCED) {
          TypedArray = wrapper(function(that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, "_d");
            var index = 0;
            var offset = 0;
            var buffer, byteLength, length, klass;
            if (!isObject(data)) {
              length = toIndex(data);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (
              data instanceof $ArrayBuffer ||
              (klass = classof(data)) == ARRAY_BUFFER ||
              klass == SHARED_BUFFER
            ) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              var $len = data.byteLength;
              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }
              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }
            hide(that, "_d", {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer)
            });
            while (index < length) addElement(that, index++);
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, "constructor", TypedArray);
        } else if (
          !fails(function() {
            TypedArray(1);
          }) ||
          !fails(function() {
            new TypedArray(-1); // eslint-disable-line no-new
          }) ||
          !$iterDetect(function(iter) {
            new TypedArray(); // eslint-disable-line no-new
            new TypedArray(null); // eslint-disable-line no-new
            new TypedArray(1.5); // eslint-disable-line no-new
            new TypedArray(iter); // eslint-disable-line no-new
          }, true)
        ) {
          TypedArray = wrapper(function(that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            var klass;
            // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645
            if (!isObject(data)) return new Base(toIndex(data));
            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined
                ? new Base(data, toOffset($offset, BYTES), $length)
                : $offset !== undefined
                ? new Base(data, toOffset($offset, BYTES))
                : new Base(data);
            }
            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }
        var $nativeIterator = TypedArrayPrototype[ITERATOR];
        var CORRECT_ITER_NAME =
          !!$nativeIterator && ($nativeIterator.name == "values" || $nativeIterator.name == undefined);
        var $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get: function() {
              return NAME;
            }
          });
        }

        O[NAME] = TypedArray;

        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES
        });

        $export(
          $export.S +
            $export.F *
              fails(function() {
                Base.of.call(TypedArray, 1);
              }),
          NAME,
          {
            from: $from,
            of: $of
          }
        );

        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

        $export($export.P, NAME, proto);

        setSpecies(NAME);

        $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

        if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

        $export(
          $export.P +
            $export.F *
              fails(function() {
                new TypedArray(1).slice();
              }),
          NAME,
          { slice: $slice }
        );

        $export(
          $export.P +
            $export.F *
              (fails(function() {
                return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
              }) ||
                !fails(function() {
                  TypedArrayPrototype.toLocaleString.call([1, 2]);
                })),
          NAME,
          { toLocaleString: $toLocaleString }
        );

        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else
      module.exports = function() {
        /* empty */
      };
  });

  _typedArray("Uint8", 1, function(init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  (function(Barcode) {
    /**
     * @hidden
     *
     * Create a [[Barcode]] object from a partial object returned by the external Scandit Engine library.
     * The *rawData* and *data* fields are computed and stored.
     *
     * @param result The barcode result coming from the external Scandit Engine library.
     * @returns The generated [[Barcode]] object.
     */
    function createFromWASMResult(result) {
      var decodedData;

      try {
        decodedData = decodeURIComponent(escape(String.fromCharCode.apply(null, result.rawData)));
      } catch (error) {
        decodedData = "";
      }

      return {
        symbology: result.symbology,
        data: decodedData,
        rawData: new Uint8Array(result.rawData),
        location: {
          topLeft: {
            x: result.location[0][0],
            y: result.location[0][1]
          },
          topRight: {
            x: result.location[1][0],
            y: result.location[1][1]
          },
          bottomRight: {
            x: result.location[2][0],
            y: result.location[2][1]
          },
          bottomLeft: {
            x: result.location[3][0],
            y: result.location[3][1]
          }
        },
        compositeFlag: result.compositeFlag,
        isGs1DataCarrier: result.isGs1DataCarrier,
        encodingArray: result.encodingArray
      };
    }

    Barcode.createFromWASMResult = createFromWASMResult;
    /**
     * Barcode symbology type.
     */

    var Symbology;

    (function(Symbology) {
      Symbology["AZTEC"] = "aztec";
      Symbology["CODABAR"] = "codabar";
      Symbology["CODE11"] = "code11";
      Symbology["CODE128"] = "code128";
      Symbology["CODE25"] = "code25";
      Symbology["CODE32"] = "code32";
      Symbology["CODE39"] = "code39";
      Symbology["CODE93"] = "code93";
      Symbology["DATA_MATRIX"] = "data-matrix";
      Symbology["DOTCODE"] = "dotcode";
      Symbology["EAN13"] = "ean13";
      Symbology["EAN8"] = "ean8";
      Symbology["FIVE_DIGIT_ADD_ON"] = "five-digit-add-on";
      Symbology["GS1_DATABAR"] = "databar";
      Symbology["GS1_DATABAR_EXPANDED"] = "databar-expanded";
      Symbology["GS1_DATABAR_LIMITED"] = "databar-limited";
      Symbology["INTERLEAVED_2_OF_5"] = "itf";
      Symbology["KIX"] = "kix";
      Symbology["LAPA4SC"] = "lapa4sc";
      Symbology["MAXICODE"] = "maxicode";
      Symbology["MICRO_PDF417"] = "micropdf417";
      Symbology["MICRO_QR"] = "microqr";
      Symbology["MSI_PLESSEY"] = "msi-plessey";
      Symbology["PDF417"] = "pdf417";
      Symbology["QR"] = "qr";
      Symbology["RM4SCC"] = "rm4scc";
      Symbology["TWO_DIGIT_ADD_ON"] = "two-digit-add-on";
      Symbology["UPCA"] = "upca";
      Symbology["UPCE"] = "upce";
    })((Symbology = Barcode.Symbology || (Barcode.Symbology = {})));
    /**
     * Flags to hint that two codes form a composite code.
     */

    var CompositeFlag;

    (function(CompositeFlag) {
      /**
       * Code is not part of a composite code.
       */
      CompositeFlag[(CompositeFlag["NONE"] = 0)] = "NONE";
      /**
       * Code could be part of a composite code. This flag is set by linear (1D) symbologies that have
       * no composite flag support but can be part of a composite code like the EAN/UPC symbology family.
       */

      CompositeFlag[(CompositeFlag["UNKNOWN"] = 1)] = "UNKNOWN";
      /**
       * Code is the linear component of a composite code. This flag can be set by GS1 DataBar or GS1-128 (Code 128).
       */

      CompositeFlag[(CompositeFlag["LINKED"] = 2)] = "LINKED";
      /**
       * Code is a GS1 Composite Code Type A (CC - A).This flag can be set by MicroPDF417 codes.
       */

      CompositeFlag[(CompositeFlag["GS1_A"] = 4)] = "GS1_A";
      /**
       * Code is a GS1 Composite Code Type B (CC-B). This flag can be set by MicroPDF417 codes.
       */

      CompositeFlag[(CompositeFlag["GS1_B"] = 8)] = "GS1_B";
      /**
       * Code is a GS1 Composite Code Type C (CC-C). This flag can be set by PDF417 codes.
       */

      CompositeFlag[(CompositeFlag["GS1_C"] = 16)] = "GS1_C";
    })((CompositeFlag = Barcode.CompositeFlag || (Barcode.CompositeFlag = {}))); // istanbul ignore next

    (function(Symbology) {
      // tslint:disable:no-unnecessary-qualifier
      var humanizedSymbologyNames = new map$1([
        [Symbology.AZTEC, "Aztec"],
        [Symbology.CODABAR, "Codabar"],
        [Symbology.CODE11, "Code 11"],
        [Symbology.CODE128, "Code 128"],
        [Symbology.CODE25, "Code 25"],
        [Symbology.CODE32, "Code 32"],
        [Symbology.CODE39, "Code 39"],
        [Symbology.CODE93, "Code 93"],
        [Symbology.DATA_MATRIX, "Data Matrix"],
        [Symbology.DOTCODE, "DotCode"],
        [Symbology.EAN13, "EAN-13"],
        [Symbology.EAN8, "EAN-8"],
        [Symbology.FIVE_DIGIT_ADD_ON, "Five-Digit Add-On"],
        [Symbology.GS1_DATABAR_EXPANDED, "GS1 DataBar Expanded"],
        [Symbology.GS1_DATABAR_LIMITED, "GS1 DataBar Limited"],
        [Symbology.GS1_DATABAR, "GS1 DataBar 14"],
        [Symbology.INTERLEAVED_2_OF_5, "Interleaved Two of Five"],
        [Symbology.KIX, "KIX"],
        [Symbology.LAPA4SC, "LAPA4SC"],
        [Symbology.MAXICODE, "MaxiCode"],
        [Symbology.MICRO_PDF417, "MicroPDF417"],
        [Symbology.MICRO_QR, "Micro QR"],
        [Symbology.MSI_PLESSEY, "MSI-Plessey"],
        [Symbology.PDF417, "PDF417"],
        [Symbology.QR, "QR"],
        [Symbology.RM4SCC, "RM4SCC"],
        [Symbology.TWO_DIGIT_ADD_ON, "Two-Digit Add-On"],
        [Symbology.UPCA, "UPC-A"],
        [Symbology.UPCE, "UPC-E]"]
      ]);
      var jsonSymbologyNames = new map$1([
        [Symbology.AZTEC, "aztec"],
        [Symbology.CODABAR, "codabar"],
        [Symbology.CODE11, "code11"],
        [Symbology.CODE128, "code128"],
        [Symbology.CODE25, "code25"],
        [Symbology.CODE32, "code32"],
        [Symbology.CODE39, "code39"],
        [Symbology.CODE93, "code93"],
        [Symbology.DATA_MATRIX, "data-matrix"],
        [Symbology.DOTCODE, "dotcode"],
        [Symbology.EAN13, "ean13"],
        [Symbology.EAN8, "ean8"],
        [Symbology.FIVE_DIGIT_ADD_ON, "five-digit-add-on"],
        [Symbology.GS1_DATABAR_EXPANDED, "databar-expanded"],
        [Symbology.GS1_DATABAR_LIMITED, "databar-limited"],
        [Symbology.GS1_DATABAR, "databar"],
        [Symbology.INTERLEAVED_2_OF_5, "itf"],
        [Symbology.KIX, "kix"],
        [Symbology.LAPA4SC, "lapa4sc"],
        [Symbology.MAXICODE, "maxicode"],
        [Symbology.MICRO_PDF417, "micropdf417"],
        [Symbology.MICRO_QR, "microqr"],
        [Symbology.MSI_PLESSEY, "msi-plessey"],
        [Symbology.PDF417, "pdf417"],
        [Symbology.QR, "qr"],
        [Symbology.RM4SCC, "rm4scc"],
        [Symbology.TWO_DIGIT_ADD_ON, "two-digit-add-on"],
        [Symbology.UPCA, "upca"],
        [Symbology.UPCE, "upce"]
      ]); // tslint:enable:no-unnecessary-qualifier

      /**
       * Get the humanized name of a symbology.
       *
       * @param symbology The symbology for which to retrieve the name.
       * @returns The humanized name of the symbology.
       */

      function toHumanizedName(symbology) {
        var humanizedSymbologyName = humanizedSymbologyNames.get(symbology.toLowerCase());

        if (humanizedSymbologyName == null) {
          return "Unknown";
        }

        return humanizedSymbologyName;
      }

      Symbology.toHumanizedName = toHumanizedName;
      /**
       * Get the JSON key name of a symbology, used for JSON-formatted ScanSettings and Scandit Engine library.
       *
       * @param symbology The symbology for which to retrieve the name.
       * @returns The json key name of the symbology.
       */

      function toJSONName(symbology) {
        var jsonSymbologyName = jsonSymbologyNames.get(symbology.toLowerCase());

        if (jsonSymbologyName == null) {
          return "unknown";
        }

        return jsonSymbologyName;
      }

      Symbology.toJSONName = toJSONName;
    })((Symbology = Barcode.Symbology || (Barcode.Symbology = {})));
  })(exports.Barcode || (exports.Barcode = {}));

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export$1(_export$1.S + _export$1.F * !_descriptors$1, "Object", { defineProperty: _objectDp$1.f });

  var $Object$1 = _core$1.Object;
  var defineProperty$1 = function defineProperty(it, key, desc) {
    return $Object$1.defineProperty(it, key, desc);
  };

  var defineProperty$2 = defineProperty$1;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      defineProperty$2(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var eventemitter3 = createCommonjsModule(function(module) {
    var has = Object.prototype.hasOwnProperty,
      prefix = "~";

    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @private
     */
    function Events() {}

    //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //
    if (Object.create) {
      Events.prototype = Object.create(null);

      //
      // This hack is needed because the `__proto__` property is still inherited in
      // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
      //
      if (!new Events().__proto__) prefix = false;
    }

    /**
     * Representation of a single event listener.
     *
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
     * @constructor
     * @private
     */
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }

    /**
     * Add a listener for a given event.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} once Specify if the listener is a one-time listener.
     * @returns {EventEmitter}
     * @private
     */
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }

      var listener = new EE(fn, context || emitter, once),
        evt = prefix ? prefix + event : event;

      if (!emitter._events[evt]) (emitter._events[evt] = listener), emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];

      return emitter;
    }

    /**
     * Clear event by name.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} evt The Event name.
     * @private
     */
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }

    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @public
     */
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }

    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @public
     */
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [],
        events,
        name;

      if (this._eventsCount === 0) return names;

      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }

      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }

      return names;
    };

    /**
     * Return the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Array} The registered listeners.
     * @public
     */
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event,
        handlers = this._events[evt];

      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];

      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }

      return ee;
    };

    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Number} The number of listeners.
     * @public
     */
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event,
        listeners = this._events[evt];

      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };

    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return false;

      var listeners = this._events[evt],
        len = arguments.length,
        args,
        i;

      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length,
          j;

        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }

              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }

      return true;
    };

    /**
     * Add a listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };

    /**
     * Add a one-time listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };

    /**
     * Remove the listeners of a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {*} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }

      var listeners = this._events[evt];

      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || (once && !listeners[i].once) || (context && listeners[i].context !== context)) {
            events.push(listeners[i]);
          }
        }

        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }

      return this;
    };

    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {(String|Symbol)} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;

      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

      return this;
    };

    //
    // Alias methods names because people roll like that.
    //
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    //
    // Expose the prefix.
    //
    EventEmitter.prefixed = prefix;

    //
    // Allow `EventEmitter` to be imported as module namespace.
    //
    EventEmitter.EventEmitter = EventEmitter;

    //
    // Expose the module.
    //
    {
      module.exports = EventEmitter;
    }
  });
  var eventemitter3_1 = eventemitter3.EventEmitter;

  var howler_core_min = createCommonjsModule(function(module, exports) {
    /*! howler.js v2.1.2 | (c) 2013-2019, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
    !(function() {
      var e = function() {
        this.init();
      };
      e.prototype = {
        init: function() {
          var e = this || n;
          return (
            (e._counter = 1e3),
            (e._html5AudioPool = []),
            (e.html5PoolSize = 10),
            (e._codecs = {}),
            (e._howls = []),
            (e._muted = !1),
            (e._volume = 1),
            (e._canPlayEvent = "canplaythrough"),
            (e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null),
            (e.masterGain = null),
            (e.noAudio = !1),
            (e.usingWebAudio = !0),
            (e.autoSuspend = !0),
            (e.ctx = null),
            (e.autoUnlock = !0),
            e._setup(),
            e
          );
        },
        volume: function(e) {
          var o = this || n;
          if (((e = parseFloat(e)), o.ctx || _(), void 0 !== e && e >= 0 && e <= 1)) {
            if (((o._volume = e), o._muted)) return o;
            o.usingWebAudio && o.masterGain.gain.setValueAtTime(e, n.ctx.currentTime);
            for (var t = 0; t < o._howls.length; t++)
              if (!o._howls[t]._webAudio)
                for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
                  var u = o._howls[t]._soundById(r[a]);
                  u && u._node && (u._node.volume = u._volume * e);
                }
            return o;
          }
          return o._volume;
        },
        mute: function(e) {
          var o = this || n;
          o.ctx || _(),
            (o._muted = e),
            o.usingWebAudio && o.masterGain.gain.setValueAtTime(e ? 0 : o._volume, n.ctx.currentTime);
          for (var t = 0; t < o._howls.length; t++)
            if (!o._howls[t]._webAudio)
              for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
                var u = o._howls[t]._soundById(r[a]);
                u && u._node && (u._node.muted = !!e || u._muted);
              }
          return o;
        },
        unload: function() {
          for (var e = this || n, o = e._howls.length - 1; o >= 0; o--) e._howls[o].unload();
          return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), (e.ctx = null), _()), e;
        },
        codecs: function(e) {
          return (this || n)._codecs[e.replace(/^x-/, "")];
        },
        _setup: function() {
          var e = this || n;
          if (((e.state = e.ctx ? e.ctx.state || "suspended" : "suspended"), e._autoSuspend(), !e.usingWebAudio))
            if ("undefined" != typeof Audio)
              try {
                var o = new Audio();
                void 0 === o.oncanplaythrough && (e._canPlayEvent = "canplay");
              } catch (n) {
                e.noAudio = !0;
              }
            else e.noAudio = !0;
          try {
            var o = new Audio();
            o.muted && (e.noAudio = !0);
          } catch (e) {}
          return e.noAudio || e._setupCodecs(), e;
        },
        _setupCodecs: function() {
          var e = this || n,
            o = null;
          try {
            o = "undefined" != typeof Audio ? new Audio() : null;
          } catch (n) {
            return e;
          }
          if (!o || "function" != typeof o.canPlayType) return e;
          var t = o.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g),
            a = r && parseInt(r[0].split("/")[1], 10) < 33;
          return (
            (e._codecs = {
              mp3: !(a || (!t && !o.canPlayType("audio/mp3;").replace(/^no$/, ""))),
              mpeg: !!t,
              opus: !!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
              ogg: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              oga: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              wav: !!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
              aac: !!o.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!o.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(
                o.canPlayType("audio/x-m4a;") ||
                o.canPlayType("audio/m4a;") ||
                o.canPlayType("audio/aac;")
              ).replace(/^no$/, ""),
              mp4: !!(
                o.canPlayType("audio/x-mp4;") ||
                o.canPlayType("audio/mp4;") ||
                o.canPlayType("audio/aac;")
              ).replace(/^no$/, ""),
              weba: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
              webm: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
              dolby: !!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
              flac: !!(o.canPlayType("audio/x-flac;") || o.canPlayType("audio/flac;")).replace(/^no$/, "")
            }),
            e
          );
        },
        _unlockAudio: function() {
          var e = this || n;
          if (!e._audioUnlocked && e.ctx) {
            (e._audioUnlocked = !1),
              (e.autoUnlock = !1),
              e._mobileUnloaded || 44100 === e.ctx.sampleRate || ((e._mobileUnloaded = !0), e.unload()),
              (e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050));
            var o = function(n) {
              for (var t = 0; t < e.html5PoolSize; t++)
                try {
                  var r = new Audio();
                  (r._unlocked = !0), e._releaseHtml5Audio(r);
                } catch (n) {
                  e.noAudio = !0;
                }
              for (var t = 0; t < e._howls.length; t++)
                if (!e._howls[t]._webAudio)
                  for (var a = e._howls[t]._getSoundIds(), u = 0; u < a.length; u++) {
                    var i = e._howls[t]._soundById(a[u]);
                    i && i._node && !i._node._unlocked && ((i._node._unlocked = !0), i._node.load());
                  }
              e._autoResume();
              var d = e.ctx.createBufferSource();
              (d.buffer = e._scratchBuffer),
                d.connect(e.ctx.destination),
                void 0 === d.start ? d.noteOn(0) : d.start(0),
                "function" == typeof e.ctx.resume && e.ctx.resume(),
                (d.onended = function() {
                  d.disconnect(0),
                    (e._audioUnlocked = !0),
                    document.removeEventListener("touchstart", o, !0),
                    document.removeEventListener("touchend", o, !0),
                    document.removeEventListener("click", o, !0);
                  for (var n = 0; n < e._howls.length; n++) e._howls[n]._emit("unlock");
                });
            };
            return (
              document.addEventListener("touchstart", o, !0),
              document.addEventListener("touchend", o, !0),
              document.addEventListener("click", o, !0),
              e
            );
          }
        },
        _obtainHtml5Audio: function() {
          var e = this || n;
          if (e._html5AudioPool.length) return e._html5AudioPool.pop();
          var o = new Audio().play();
          return (
            o &&
              "undefined" != typeof Promise &&
              (o instanceof Promise || "function" == typeof o.then) &&
              o.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
              }),
            new Audio()
          );
        },
        _releaseHtml5Audio: function(e) {
          var o = this || n;
          return e._unlocked && o._html5AudioPool.push(e), o;
        },
        _autoSuspend: function() {
          var e = this;
          if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && n.usingWebAudio) {
            for (var o = 0; o < e._howls.length; o++)
              if (e._howls[o]._webAudio)
                for (var t = 0; t < e._howls[o]._sounds.length; t++) if (!e._howls[o]._sounds[t]._paused) return e;
            return (
              e._suspendTimer && clearTimeout(e._suspendTimer),
              (e._suspendTimer = setTimeout(function() {
                e.autoSuspend &&
                  ((e._suspendTimer = null),
                  (e.state = "suspending"),
                  e.ctx.suspend().then(function() {
                    (e.state = "suspended"), e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
                  }));
              }, 3e4)),
              e
            );
          }
        },
        _autoResume: function() {
          var e = this;
          if (e.ctx && void 0 !== e.ctx.resume && n.usingWebAudio)
            return (
              "running" === e.state && e._suspendTimer
                ? (clearTimeout(e._suspendTimer), (e._suspendTimer = null))
                : "suspended" === e.state
                ? (e.ctx.resume().then(function() {
                    e.state = "running";
                    for (var n = 0; n < e._howls.length; n++) e._howls[n]._emit("resume");
                  }),
                  e._suspendTimer && (clearTimeout(e._suspendTimer), (e._suspendTimer = null)))
                : "suspending" === e.state && (e._resumeAfterSuspend = !0),
              e
            );
        }
      };
      var n = new e(),
        o = function(e) {
          var n = this;
          if (!e.src || 0 === e.src.length)
            return void console.error("An array of source files must be passed with any new Howl.");
          n.init(e);
        };
      o.prototype = {
        init: function(e) {
          var o = this;
          return (
            n.ctx || _(),
            (o._autoplay = e.autoplay || !1),
            (o._format = "string" != typeof e.format ? e.format : [e.format]),
            (o._html5 = e.html5 || !1),
            (o._muted = e.mute || !1),
            (o._loop = e.loop || !1),
            (o._pool = e.pool || 5),
            (o._preload = "boolean" != typeof e.preload || e.preload),
            (o._rate = e.rate || 1),
            (o._sprite = e.sprite || {}),
            (o._src = "string" != typeof e.src ? e.src : [e.src]),
            (o._volume = void 0 !== e.volume ? e.volume : 1),
            (o._xhrWithCredentials = e.xhrWithCredentials || !1),
            (o._duration = 0),
            (o._state = "unloaded"),
            (o._sounds = []),
            (o._endTimers = {}),
            (o._queue = []),
            (o._playLock = !1),
            (o._onend = e.onend ? [{ fn: e.onend }] : []),
            (o._onfade = e.onfade ? [{ fn: e.onfade }] : []),
            (o._onload = e.onload ? [{ fn: e.onload }] : []),
            (o._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : []),
            (o._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : []),
            (o._onpause = e.onpause ? [{ fn: e.onpause }] : []),
            (o._onplay = e.onplay ? [{ fn: e.onplay }] : []),
            (o._onstop = e.onstop ? [{ fn: e.onstop }] : []),
            (o._onmute = e.onmute ? [{ fn: e.onmute }] : []),
            (o._onvolume = e.onvolume ? [{ fn: e.onvolume }] : []),
            (o._onrate = e.onrate ? [{ fn: e.onrate }] : []),
            (o._onseek = e.onseek ? [{ fn: e.onseek }] : []),
            (o._onunlock = e.onunlock ? [{ fn: e.onunlock }] : []),
            (o._onresume = []),
            (o._webAudio = n.usingWebAudio && !o._html5),
            void 0 !== n.ctx && n.ctx && n.autoUnlock && n._unlockAudio(),
            n._howls.push(o),
            o._autoplay &&
              o._queue.push({
                event: "play",
                action: function() {
                  o.play();
                }
              }),
            o._preload && o.load(),
            o
          );
        },
        load: function() {
          var e = this,
            o = null;
          if (n.noAudio) return void e._emit("loaderror", null, "No audio support.");
          "string" == typeof e._src && (e._src = [e._src]);
          for (var r = 0; r < e._src.length; r++) {
            var u, i;
            if (e._format && e._format[r]) u = e._format[r];
            else {
              if ("string" != typeof (i = e._src[r])) {
                e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              (u = /^data:audio\/([^;,]+);/i.exec(i)),
                u || (u = /\.([^.]+)$/.exec(i.split("?", 1)[0])),
                u && (u = u[1].toLowerCase());
            }
            if (
              (u ||
                console.warn(
                  'No file extension was found. Consider using the "format" property or specify an extension.'
                ),
              u && n.codecs(u))
            ) {
              o = e._src[r];
              break;
            }
          }
          return o
            ? ((e._src = o),
              (e._state = "loading"),
              "https:" === window.location.protocol &&
                "http:" === o.slice(0, 5) &&
                ((e._html5 = !0), (e._webAudio = !1)),
              new t(e),
              e._webAudio && a(e),
              e)
            : void e._emit("loaderror", null, "No codec support for selected audio sources.");
        },
        play: function(e, o) {
          var t = this,
            r = null;
          if ("number" == typeof e) (r = e), (e = null);
          else {
            if ("string" == typeof e && "loaded" === t._state && !t._sprite[e]) return null;
            if (void 0 === e && ((e = "__default"), !t._playLock)) {
              for (var a = 0, u = 0; u < t._sounds.length; u++)
                t._sounds[u]._paused && !t._sounds[u]._ended && (a++, (r = t._sounds[u]._id));
              1 === a ? (e = null) : (r = null);
            }
          }
          var i = r ? t._soundById(r) : t._inactiveSound();
          if (!i) return null;
          if ((r && !e && (e = i._sprite || "__default"), "loaded" !== t._state)) {
            (i._sprite = e), (i._ended = !1);
            var d = i._id;
            return (
              t._queue.push({
                event: "play",
                action: function() {
                  t.play(d);
                }
              }),
              d
            );
          }
          if (r && !i._paused) return o || t._loadQueue("play"), i._id;
          t._webAudio && n._autoResume();
          var _ = Math.max(0, i._seek > 0 ? i._seek : t._sprite[e][0] / 1e3),
            s = Math.max(0, (t._sprite[e][0] + t._sprite[e][1]) / 1e3 - _),
            l = (1e3 * s) / Math.abs(i._rate),
            c = t._sprite[e][0] / 1e3,
            f = (t._sprite[e][0] + t._sprite[e][1]) / 1e3,
            p = !(!i._loop && !t._sprite[e][2]);
          (i._sprite = e), (i._ended = !1);
          var m = function() {
            (i._paused = !1), (i._seek = _), (i._start = c), (i._stop = f), (i._loop = p);
          };
          if (_ >= f) return void t._ended(i);
          var v = i._node;
          if (t._webAudio) {
            var h = function() {
              (t._playLock = !1), m(), t._refreshBuffer(i);
              var e = i._muted || t._muted ? 0 : i._volume;
              v.gain.setValueAtTime(e, n.ctx.currentTime),
                (i._playStart = n.ctx.currentTime),
                void 0 === v.bufferSource.start
                  ? i._loop
                    ? v.bufferSource.noteGrainOn(0, _, 86400)
                    : v.bufferSource.noteGrainOn(0, _, s)
                  : i._loop
                  ? v.bufferSource.start(0, _, 86400)
                  : v.bufferSource.start(0, _, s),
                l !== 1 / 0 && (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), l)),
                o ||
                  setTimeout(function() {
                    t._emit("play", i._id), t._loadQueue();
                  }, 0);
            };
            "running" === n.state ? h() : ((t._playLock = !0), t.once("resume", h), t._clearTimer(i._id));
          } else {
            var y = function() {
              (v.currentTime = _),
                (v.muted = i._muted || t._muted || n._muted || v.muted),
                (v.volume = i._volume * n.volume()),
                (v.playbackRate = i._rate);
              try {
                var r = v.play();
                if (
                  (r && "undefined" != typeof Promise && (r instanceof Promise || "function" == typeof r.then)
                    ? ((t._playLock = !0),
                      m(),
                      r
                        .then(function() {
                          (t._playLock = !1), (v._unlocked = !0), o || (t._emit("play", i._id), t._loadQueue());
                        })
                        .catch(function() {
                          (t._playLock = !1),
                            t._emit(
                              "playerror",
                              i._id,
                              "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                            ),
                            (i._ended = !0),
                            (i._paused = !0);
                        }))
                    : o || ((t._playLock = !1), m(), t._emit("play", i._id), t._loadQueue()),
                  (v.playbackRate = i._rate),
                  v.paused)
                )
                  return void t._emit(
                    "playerror",
                    i._id,
                    "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                  );
                "__default" !== e || i._loop
                  ? (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), l))
                  : ((t._endTimers[i._id] = function() {
                      t._ended(i), v.removeEventListener("ended", t._endTimers[i._id], !1);
                    }),
                    v.addEventListener("ended", t._endTimers[i._id], !1));
              } catch (e) {
                t._emit("playerror", i._id, e);
              }
            };
            "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === v.src &&
              ((v.src = t._src), v.load());
            var g = (window && window.ejecta) || (!v.readyState && n._navigator.isCocoonJS);
            if (v.readyState >= 3 || g) y();
            else {
              t._playLock = !0;
              var A = function() {
                y(), v.removeEventListener(n._canPlayEvent, A, !1);
              };
              v.addEventListener(n._canPlayEvent, A, !1), t._clearTimer(i._id);
            }
          }
          return i._id;
        },
        pause: function(e) {
          var n = this;
          if ("loaded" !== n._state || n._playLock)
            return (
              n._queue.push({
                event: "pause",
                action: function() {
                  n.pause(e);
                }
              }),
              n
            );
          for (var o = n._getSoundIds(e), t = 0; t < o.length; t++) {
            n._clearTimer(o[t]);
            var r = n._soundById(o[t]);
            if (
              r &&
              !r._paused &&
              ((r._seek = n.seek(o[t])), (r._rateSeek = 0), (r._paused = !0), n._stopFade(o[t]), r._node)
            )
              if (n._webAudio) {
                if (!r._node.bufferSource) continue;
                void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0),
                  n._cleanBuffer(r._node);
              } else (isNaN(r._node.duration) && r._node.duration !== 1 / 0) || r._node.pause();
            arguments[1] || n._emit("pause", r ? r._id : null);
          }
          return n;
        },
        stop: function(e, n) {
          var o = this;
          if ("loaded" !== o._state || o._playLock)
            return (
              o._queue.push({
                event: "stop",
                action: function() {
                  o.stop(e);
                }
              }),
              o
            );
          for (var t = o._getSoundIds(e), r = 0; r < t.length; r++) {
            o._clearTimer(t[r]);
            var a = o._soundById(t[r]);
            a &&
              ((a._seek = a._start || 0),
              (a._rateSeek = 0),
              (a._paused = !0),
              (a._ended = !0),
              o._stopFade(t[r]),
              a._node &&
                (o._webAudio
                  ? a._node.bufferSource &&
                    (void 0 === a._node.bufferSource.stop
                      ? a._node.bufferSource.noteOff(0)
                      : a._node.bufferSource.stop(0),
                    o._cleanBuffer(a._node))
                  : (isNaN(a._node.duration) && a._node.duration !== 1 / 0) ||
                    ((a._node.currentTime = a._start || 0),
                    a._node.pause(),
                    a._node.duration === 1 / 0 && o._clearSound(a._node))),
              n || o._emit("stop", a._id));
          }
          return o;
        },
        mute: function(e, o) {
          var t = this;
          if ("loaded" !== t._state || t._playLock)
            return (
              t._queue.push({
                event: "mute",
                action: function() {
                  t.mute(e, o);
                }
              }),
              t
            );
          if (void 0 === o) {
            if ("boolean" != typeof e) return t._muted;
            t._muted = e;
          }
          for (var r = t._getSoundIds(o), a = 0; a < r.length; a++) {
            var u = t._soundById(r[a]);
            u &&
              ((u._muted = e),
              u._interval && t._stopFade(u._id),
              t._webAudio && u._node
                ? u._node.gain.setValueAtTime(e ? 0 : u._volume, n.ctx.currentTime)
                : u._node && (u._node.muted = !!n._muted || e),
              t._emit("mute", u._id));
          }
          return t;
        },
        volume: function() {
          var e,
            o,
            t = this,
            r = arguments;
          if (0 === r.length) return t._volume;
          if (1 === r.length || (2 === r.length && void 0 === r[1])) {
            t._getSoundIds().indexOf(r[0]) >= 0 ? (o = parseInt(r[0], 10)) : (e = parseFloat(r[0]));
          } else r.length >= 2 && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
          var a;
          if (!(void 0 !== e && e >= 0 && e <= 1)) return (a = o ? t._soundById(o) : t._sounds[0]), a ? a._volume : 0;
          if ("loaded" !== t._state || t._playLock)
            return (
              t._queue.push({
                event: "volume",
                action: function() {
                  t.volume.apply(t, r);
                }
              }),
              t
            );
          void 0 === o && (t._volume = e), (o = t._getSoundIds(o));
          for (var u = 0; u < o.length; u++)
            (a = t._soundById(o[u])) &&
              ((a._volume = e),
              r[2] || t._stopFade(o[u]),
              t._webAudio && a._node && !a._muted
                ? a._node.gain.setValueAtTime(e, n.ctx.currentTime)
                : a._node && !a._muted && (a._node.volume = e * n.volume()),
              t._emit("volume", a._id));
          return t;
        },
        fade: function(e, o, t, r) {
          var a = this;
          if ("loaded" !== a._state || a._playLock)
            return (
              a._queue.push({
                event: "fade",
                action: function() {
                  a.fade(e, o, t, r);
                }
              }),
              a
            );
          (e = parseFloat(e)), (o = parseFloat(o)), (t = parseFloat(t)), a.volume(e, r);
          for (var u = a._getSoundIds(r), i = 0; i < u.length; i++) {
            var d = a._soundById(u[i]);
            if (d) {
              if ((r || a._stopFade(u[i]), a._webAudio && !d._muted)) {
                var _ = n.ctx.currentTime,
                  s = _ + t / 1e3;
                (d._volume = e), d._node.gain.setValueAtTime(e, _), d._node.gain.linearRampToValueAtTime(o, s);
              }
              a._startFadeInterval(d, e, o, t, u[i], void 0 === r);
            }
          }
          return a;
        },
        _startFadeInterval: function(e, n, o, t, r, a) {
          var u = this,
            i = n,
            d = o - n,
            _ = Math.abs(d / 0.01),
            s = Math.max(4, _ > 0 ? t / _ : t),
            l = Date.now();
          (e._fadeTo = o),
            (e._interval = setInterval(function() {
              var r = (Date.now() - l) / t;
              (l = Date.now()),
                (i += d * r),
                (i = Math.max(0, i)),
                (i = Math.min(1, i)),
                (i = Math.round(100 * i) / 100),
                u._webAudio ? (e._volume = i) : u.volume(i, e._id, !0),
                a && (u._volume = i),
                ((o < n && i <= o) || (o > n && i >= o)) &&
                  (clearInterval(e._interval),
                  (e._interval = null),
                  (e._fadeTo = null),
                  u.volume(o, e._id),
                  u._emit("fade", e._id));
            }, s));
        },
        _stopFade: function(e) {
          var o = this,
            t = o._soundById(e);
          return (
            t &&
              t._interval &&
              (o._webAudio && t._node.gain.cancelScheduledValues(n.ctx.currentTime),
              clearInterval(t._interval),
              (t._interval = null),
              o.volume(t._fadeTo, e),
              (t._fadeTo = null),
              o._emit("fade", e)),
            o
          );
        },
        loop: function() {
          var e,
            n,
            o,
            t = this,
            r = arguments;
          if (0 === r.length) return t._loop;
          if (1 === r.length) {
            if ("boolean" != typeof r[0]) return !!(o = t._soundById(parseInt(r[0], 10))) && o._loop;
            (e = r[0]), (t._loop = e);
          } else 2 === r.length && ((e = r[0]), (n = parseInt(r[1], 10)));
          for (var a = t._getSoundIds(n), u = 0; u < a.length; u++)
            (o = t._soundById(a[u])) &&
              ((o._loop = e),
              t._webAudio &&
                o._node &&
                o._node.bufferSource &&
                ((o._node.bufferSource.loop = e),
                e && ((o._node.bufferSource.loopStart = o._start || 0), (o._node.bufferSource.loopEnd = o._stop))));
          return t;
        },
        rate: function() {
          var e,
            o,
            t = this,
            r = arguments;
          if (0 === r.length) o = t._sounds[0]._id;
          else if (1 === r.length) {
            var a = t._getSoundIds(),
              u = a.indexOf(r[0]);
            u >= 0 ? (o = parseInt(r[0], 10)) : (e = parseFloat(r[0]));
          } else 2 === r.length && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
          var i;
          if ("number" != typeof e) return (i = t._soundById(o)), i ? i._rate : t._rate;
          if ("loaded" !== t._state || t._playLock)
            return (
              t._queue.push({
                event: "rate",
                action: function() {
                  t.rate.apply(t, r);
                }
              }),
              t
            );
          void 0 === o && (t._rate = e), (o = t._getSoundIds(o));
          for (var d = 0; d < o.length; d++)
            if ((i = t._soundById(o[d]))) {
              t.playing(o[d]) &&
                ((i._rateSeek = t.seek(o[d])), (i._playStart = t._webAudio ? n.ctx.currentTime : i._playStart)),
                (i._rate = e),
                t._webAudio && i._node && i._node.bufferSource
                  ? i._node.bufferSource.playbackRate.setValueAtTime(e, n.ctx.currentTime)
                  : i._node && (i._node.playbackRate = e);
              var _ = t.seek(o[d]),
                s = (t._sprite[i._sprite][0] + t._sprite[i._sprite][1]) / 1e3 - _,
                l = (1e3 * s) / Math.abs(i._rate);
              (!t._endTimers[o[d]] && i._paused) ||
                (t._clearTimer(o[d]), (t._endTimers[o[d]] = setTimeout(t._ended.bind(t, i), l))),
                t._emit("rate", i._id);
            }
          return t;
        },
        seek: function() {
          var e,
            o,
            t = this,
            r = arguments;
          if (0 === r.length) o = t._sounds[0]._id;
          else if (1 === r.length) {
            var a = t._getSoundIds(),
              u = a.indexOf(r[0]);
            u >= 0 ? (o = parseInt(r[0], 10)) : t._sounds.length && ((o = t._sounds[0]._id), (e = parseFloat(r[0])));
          } else 2 === r.length && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
          if (void 0 === o) return t;
          if ("loaded" !== t._state || t._playLock)
            return (
              t._queue.push({
                event: "seek",
                action: function() {
                  t.seek.apply(t, r);
                }
              }),
              t
            );
          var i = t._soundById(o);
          if (i) {
            if (!("number" == typeof e && e >= 0)) {
              if (t._webAudio) {
                var d = t.playing(o) ? n.ctx.currentTime - i._playStart : 0,
                  _ = i._rateSeek ? i._rateSeek - i._seek : 0;
                return i._seek + (_ + d * Math.abs(i._rate));
              }
              return i._node.currentTime;
            }
            var s = t.playing(o);
            s && t.pause(o, !0),
              (i._seek = e),
              (i._ended = !1),
              t._clearTimer(o),
              t._webAudio || !i._node || isNaN(i._node.duration) || (i._node.currentTime = e);
            var l = function() {
              t._emit("seek", o), s && t.play(o, !0);
            };
            if (s && !t._webAudio) {
              var c = function() {
                t._playLock ? setTimeout(c, 0) : l();
              };
              setTimeout(c, 0);
            } else l();
          }
          return t;
        },
        playing: function(e) {
          var n = this;
          if ("number" == typeof e) {
            var o = n._soundById(e);
            return !!o && !o._paused;
          }
          for (var t = 0; t < n._sounds.length; t++) if (!n._sounds[t]._paused) return !0;
          return !1;
        },
        duration: function(e) {
          var n = this,
            o = n._duration,
            t = n._soundById(e);
          return t && (o = n._sprite[t._sprite][1] / 1e3), o;
        },
        state: function() {
          return this._state;
        },
        unload: function() {
          for (var e = this, o = e._sounds, t = 0; t < o.length; t++)
            o[t]._paused || e.stop(o[t]._id),
              e._webAudio ||
                (e._clearSound(o[t]._node),
                o[t]._node.removeEventListener("error", o[t]._errorFn, !1),
                o[t]._node.removeEventListener(n._canPlayEvent, o[t]._loadFn, !1),
                n._releaseHtml5Audio(o[t]._node)),
              delete o[t]._node,
              e._clearTimer(o[t]._id);
          var a = n._howls.indexOf(e);
          a >= 0 && n._howls.splice(a, 1);
          var u = !0;
          for (t = 0; t < n._howls.length; t++)
            if (n._howls[t]._src === e._src || e._src.indexOf(n._howls[t]._src) >= 0) {
              u = !1;
              break;
            }
          return (
            r && u && delete r[e._src], (n.noAudio = !1), (e._state = "unloaded"), (e._sounds = []), (e = null), null
          );
        },
        on: function(e, n, o, t) {
          var r = this,
            a = r["_on" + e];
          return "function" == typeof n && a.push(t ? { id: o, fn: n, once: t } : { id: o, fn: n }), r;
        },
        off: function(e, n, o) {
          var t = this,
            r = t["_on" + e],
            a = 0;
          if (("number" == typeof n && ((o = n), (n = null)), n || o))
            for (a = 0; a < r.length; a++) {
              var u = o === r[a].id;
              if ((n === r[a].fn && u) || (!n && u)) {
                r.splice(a, 1);
                break;
              }
            }
          else if (e) t["_on" + e] = [];
          else {
            var i = Object.keys(t);
            for (a = 0; a < i.length; a++) 0 === i[a].indexOf("_on") && Array.isArray(t[i[a]]) && (t[i[a]] = []);
          }
          return t;
        },
        once: function(e, n, o) {
          var t = this;
          return t.on(e, n, o, 1), t;
        },
        _emit: function(e, n, o) {
          for (var t = this, r = t["_on" + e], a = r.length - 1; a >= 0; a--)
            (r[a].id && r[a].id !== n && "load" !== e) ||
              (setTimeout(
                function(e) {
                  e.call(this, n, o);
                }.bind(t, r[a].fn),
                0
              ),
              r[a].once && t.off(e, r[a].fn, r[a].id));
          return t._loadQueue(e), t;
        },
        _loadQueue: function(e) {
          var n = this;
          if (n._queue.length > 0) {
            var o = n._queue[0];
            o.event === e && (n._queue.shift(), n._loadQueue()), e || o.action();
          }
          return n;
        },
        _ended: function(e) {
          var o = this,
            t = e._sprite;
          if (!o._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop)
            return setTimeout(o._ended.bind(o, e), 100), o;
          var r = !(!e._loop && !o._sprite[t][2]);
          if ((o._emit("end", e._id), !o._webAudio && r && o.stop(e._id, !0).play(e._id), o._webAudio && r)) {
            o._emit("play", e._id), (e._seek = e._start || 0), (e._rateSeek = 0), (e._playStart = n.ctx.currentTime);
            var a = (1e3 * (e._stop - e._start)) / Math.abs(e._rate);
            o._endTimers[e._id] = setTimeout(o._ended.bind(o, e), a);
          }
          return (
            o._webAudio &&
              !r &&
              ((e._paused = !0),
              (e._ended = !0),
              (e._seek = e._start || 0),
              (e._rateSeek = 0),
              o._clearTimer(e._id),
              o._cleanBuffer(e._node),
              n._autoSuspend()),
            o._webAudio || r || o.stop(e._id, !0),
            o
          );
        },
        _clearTimer: function(e) {
          var n = this;
          if (n._endTimers[e]) {
            if ("function" != typeof n._endTimers[e]) clearTimeout(n._endTimers[e]);
            else {
              var o = n._soundById(e);
              o && o._node && o._node.removeEventListener("ended", n._endTimers[e], !1);
            }
            delete n._endTimers[e];
          }
          return n;
        },
        _soundById: function(e) {
          for (var n = this, o = 0; o < n._sounds.length; o++) if (e === n._sounds[o]._id) return n._sounds[o];
          return null;
        },
        _inactiveSound: function() {
          var e = this;
          e._drain();
          for (var n = 0; n < e._sounds.length; n++) if (e._sounds[n]._ended) return e._sounds[n].reset();
          return new t(e);
        },
        _drain: function() {
          var e = this,
            n = e._pool,
            o = 0,
            t = 0;
          if (!(e._sounds.length < n)) {
            for (t = 0; t < e._sounds.length; t++) e._sounds[t]._ended && o++;
            for (t = e._sounds.length - 1; t >= 0; t--) {
              if (o <= n) return;
              e._sounds[t]._ended &&
                (e._webAudio && e._sounds[t]._node && e._sounds[t]._node.disconnect(0), e._sounds.splice(t, 1), o--);
            }
          }
        },
        _getSoundIds: function(e) {
          var n = this;
          if (void 0 === e) {
            for (var o = [], t = 0; t < n._sounds.length; t++) o.push(n._sounds[t]._id);
            return o;
          }
          return [e];
        },
        _refreshBuffer: function(e) {
          var o = this;
          return (
            (e._node.bufferSource = n.ctx.createBufferSource()),
            (e._node.bufferSource.buffer = r[o._src]),
            e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node),
            (e._node.bufferSource.loop = e._loop),
            e._loop &&
              ((e._node.bufferSource.loopStart = e._start || 0), (e._node.bufferSource.loopEnd = e._stop || 0)),
            e._node.bufferSource.playbackRate.setValueAtTime(e._rate, n.ctx.currentTime),
            o
          );
        },
        _cleanBuffer: function(e) {
          var o = this,
            t = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0;
          if (n._scratchBuffer && e.bufferSource && ((e.bufferSource.onended = null), e.bufferSource.disconnect(0), t))
            try {
              e.bufferSource.buffer = n._scratchBuffer;
            } catch (e) {}
          return (e.bufferSource = null), o;
        },
        _clearSound: function(e) {
          /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent) ||
            (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
        }
      };
      var t = function(e) {
        (this._parent = e), this.init();
      };
      t.prototype = {
        init: function() {
          var e = this,
            o = e._parent;
          return (
            (e._muted = o._muted),
            (e._loop = o._loop),
            (e._volume = o._volume),
            (e._rate = o._rate),
            (e._seek = 0),
            (e._paused = !0),
            (e._ended = !0),
            (e._sprite = "__default"),
            (e._id = ++n._counter),
            o._sounds.push(e),
            e.create(),
            e
          );
        },
        create: function() {
          var e = this,
            o = e._parent,
            t = n._muted || e._muted || e._parent._muted ? 0 : e._volume;
          return (
            o._webAudio
              ? ((e._node = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain()),
                e._node.gain.setValueAtTime(t, n.ctx.currentTime),
                (e._node.paused = !0),
                e._node.connect(n.masterGain))
              : ((e._node = n._obtainHtml5Audio()),
                (e._errorFn = e._errorListener.bind(e)),
                e._node.addEventListener("error", e._errorFn, !1),
                (e._loadFn = e._loadListener.bind(e)),
                e._node.addEventListener(n._canPlayEvent, e._loadFn, !1),
                (e._node.src = o._src),
                (e._node.preload = "auto"),
                (e._node.volume = t * n.volume()),
                e._node.load()),
            e
          );
        },
        reset: function() {
          var e = this,
            o = e._parent;
          return (
            (e._muted = o._muted),
            (e._loop = o._loop),
            (e._volume = o._volume),
            (e._rate = o._rate),
            (e._seek = 0),
            (e._rateSeek = 0),
            (e._paused = !0),
            (e._ended = !0),
            (e._sprite = "__default"),
            (e._id = ++n._counter),
            e
          );
        },
        _errorListener: function() {
          var e = this;
          e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0),
            e._node.removeEventListener("error", e._errorFn, !1);
        },
        _loadListener: function() {
          var e = this,
            o = e._parent;
          (o._duration = Math.ceil(10 * e._node.duration) / 10),
            0 === Object.keys(o._sprite).length && (o._sprite = { __default: [0, 1e3 * o._duration] }),
            "loaded" !== o._state && ((o._state = "loaded"), o._emit("load"), o._loadQueue()),
            e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1);
        }
      };
      var r = {},
        a = function(e) {
          var n = e._src;
          if (r[n]) return (e._duration = r[n].duration), void d(e);
          if (/^data:[^;]+;base64,/.test(n)) {
            for (var o = atob(n.split(",")[1]), t = new Uint8Array(o.length), a = 0; a < o.length; ++a)
              t[a] = o.charCodeAt(a);
            i(t.buffer, e);
          } else {
            var _ = new XMLHttpRequest();
            _.open("GET", n, !0),
              (_.withCredentials = e._xhrWithCredentials),
              (_.responseType = "arraybuffer"),
              (_.onload = function() {
                var n = (_.status + "")[0];
                if ("0" !== n && "2" !== n && "3" !== n)
                  return void e._emit("loaderror", null, "Failed loading audio file with status: " + _.status + ".");
                i(_.response, e);
              }),
              (_.onerror = function() {
                e._webAudio && ((e._html5 = !0), (e._webAudio = !1), (e._sounds = []), delete r[n], e.load());
              }),
              u(_);
          }
        },
        u = function(e) {
          try {
            e.send();
          } catch (n) {
            e.onerror();
          }
        },
        i = function(e, o) {
          var t = function() {
              o._emit("loaderror", null, "Decoding audio data failed.");
            },
            a = function(e) {
              e && o._sounds.length > 0 ? ((r[o._src] = e), d(o, e)) : t();
            };
          "undefined" != typeof Promise && 1 === n.ctx.decodeAudioData.length
            ? n.ctx
                .decodeAudioData(e)
                .then(a)
                .catch(t)
            : n.ctx.decodeAudioData(e, a, t);
        },
        d = function(e, n) {
          n && !e._duration && (e._duration = n.duration),
            0 === Object.keys(e._sprite).length && (e._sprite = { __default: [0, 1e3 * e._duration] }),
            "loaded" !== e._state && ((e._state = "loaded"), e._emit("load"), e._loadQueue());
        },
        _ = function() {
          if (n.usingWebAudio) {
            try {
              "undefined" != typeof AudioContext
                ? (n.ctx = new AudioContext())
                : "undefined" != typeof webkitAudioContext
                ? (n.ctx = new webkitAudioContext())
                : (n.usingWebAudio = !1);
            } catch (e) {
              n.usingWebAudio = !1;
            }
            n.ctx || (n.usingWebAudio = !1);
            var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
              o = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
              t = o ? parseInt(o[1], 10) : null;
            if (e && t && t < 9) {
              var r = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());
              ((n._navigator && n._navigator.standalone && !r) || (n._navigator && !n._navigator.standalone && !r)) &&
                (n.usingWebAudio = !1);
            }
            n.usingWebAudio &&
              ((n.masterGain = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain()),
              n.masterGain.gain.setValueAtTime(n._muted ? 0 : 1, n.ctx.currentTime),
              n.masterGain.connect(n.ctx.destination)),
              n._setup();
          }
        };
      ((exports.Howler = n), (exports.Howl = o)),
        "undefined" != typeof window
          ? ((window.HowlerGlobal = e), (window.Howler = n), (window.Howl = o), (window.Sound = t))
          : "undefined" != typeof commonjsGlobal &&
            ((commonjsGlobal.HowlerGlobal = e),
            (commonjsGlobal.Howler = n),
            (commonjsGlobal.Howl = o),
            (commonjsGlobal.Sound = t));
    })();
  });
  var howler_core_min_1 = howler_core_min.Howler;
  var howler_core_min_2 = howler_core_min.Howl;

  // TODO: gracefully load assets from files inside build process

  /**
   * @hidden
   */
  var beepSound = // tslint:disable-next-line:max-line-length
    "data:audio/mp3;base64,//uwAAAAA8ROTJVigAB4icmSrFAAE/IjVfj6gAJ+RGq/H1AAADEN55555509PSUkYjEMQ5DCaBiMBmSoGPBh6QGGJAZo8BoDwGYJADEBmQbAAbMBcAJ0IIRQuFwuF8vm6aaaaaaCCH/9RcIubDkCgBQAzBOLL5cLhog3p////6BgTBFC4yZfTah/////WmYFwuBgTh///5cEDgnB8AMQ3nnnnnnT09JSRiMQxDkMJoGIwGZKgY8GHpAYYkBmjwGgPAZgkAMQGZBsABswFwAnQghFC4XC4Xy+bppppppoIIf/1Fwi5sOQKAFADME4svlwuGiDen////oGBMEULjJl9NqH////9aZgXC4GBOH///lwQOCcH7usq4IwABEoZUkABBACSAH6LQxWQ1ekTmN4ZafMA1wANy7UyDUPgZzK4WdA1sdhHQGm0eAcG0Uwxsang94vpi3jMEgeLBTM1nUEFdDatet8mwsLJddIZ0CIGTVYoADBkuf9NrJ1f3UsUMJtLy/dMOCTfrUURBBm/6mKA7P6lkcLj/z5mI2/+plE5/9TFgqrf/qYpFf/9v///9Z7////Weu6yrgjAAEShlSQAEEAJIAfotDFZDV6ROY3hlp8wDXAA3LtTINQ+BnMrhZ0DWx2EdAabR4BwbRTDGxqeD3i+mLeMwSB4sFMzWdQQV0Nq163ybCwsl10hnQIgZNVigAMGS5/02snV/dSxQwm0vL90w4JN+tRREEGb/qYoDs/qWRwuP/PmYjb/6mUTn/1MWCqt/+pikV//2////1nv///9Z57qrtSAAaAEOPo6q0VkVoBSMfBmZVHFMomra/sFv//+7IADwAEcXjR92KgAo4vGj7sVABRJeNFzHKLAiS8aLmOUWARYQFAEDoGXFeBv7iAZHHAGKwQLnD0RkkCKmpzOKUjUjUiy0nUlpOh2UUjSoc4VsAaFAMkgspOZb1de+/222v3lN9ikN8FBKOaa0lI/b/+32+TGsxIaGIRJknav9///1fSInqSWHRKS6v///6/nCEJvdVdqQADQAhx9HVWisitAKRj4MzKo4plE1bX9gt/iLCAoAgdAy4rwN/cQDI44AxWCBc4eiMkgRU1OZxSkakakWWk6ktJ0OyikaVDnCtgDQoBkkFlJzLerr33+221+8pvsUhvgoJRzTWkpH7f/2+3yY1mJDQxCJMk7V/v//+r6RE9SSw6JSXV////X84QhNqq9yGAAtDIPgN54cGQ0s4MLUdIZgz1qumUxddqEpWGZfQdAYAOR0btmDgYpm3SG6ec7wnc1aVs2dj+1bbTnyweolsigCR4Bd4UcqIoKbf1mlbVoekvRo/NT+yIW3Ci11PUfr6dTaC7b2fe/yLtUspAgFDuR53///+pvOkM14YR+pvt/+v6/koSLVV7kMABaGQfAbzw4MhpZwYWo6QzBnrVdMpi67UJSsMy+g6AwAcjo3bMHAxTNukN0853hO5q0rZs7H9q22nPlg9RLZFAEjwC7wo5URQU2/rNK2rQ9JejR+an9kQtuFFrqeo/X06m0F23s+9/kXapZSBAKHcjzv///9TedIZrwwj9Tfb/9f1/JQkVi7zplQAFIAgwMk9GmLaGUorLwS8iIOIgIHDACBpGPGPIQTeb9Ig1+zoNGAMN6Ijtv5KI3h0rZfrLVE0dZ6n/+7IAHwAEk3jRez2kEJJvGi9ntIIT3eU/7PqwQnu8p/2fVgg7IPUzJfLB65iPwTcgPIEeWDqpvvvo6N2qSs9T1fIxKtlg1Fg5Kkp6z7nWWdSqqUulspS3s9vkhqoBb8Kg7POv6///9vUQVqqgx7Xmf7f//rbyUN1Rd50yoACkAQYGSejTFtDKUVl4JeREHEQEDhgBA0jHjHkIJvN+kQa/Z0GjAGG9ER238lEbw6Vsv1lqiaOs9SdkHqZkvlg9cxH4JuQHkCPLB1U3330dG7VJWep6vkYlWywaiwclSU9Z9zrLOpVVKXS2Upb2e3yQ1UAt+FQdnnX9f//+3qIK1VQY9rzP9v//1t5KG6jmYd0IAA0gIAD4Llq2gAnFo8YQd9sJd67dV09LYmltad5GkSGPh80IAtg4NUiAWeV15W6FXRpnnczdM46C/SvZzut0SUNUjYiIywAAvA1QCg40iSbnTJdtr85/P3fO63YhxpWgiDUWgsOUjjzp+tq2+r+++jtYd2dURoFQ+LhSOZ0/Xrb/9T9Sz21xU3rrCIH1Zi9ev9/1atZ7aRwqb1nMw7oQABpAQAHwXLVtABOLR4wg77YS7126rp6WxNLa07yNIkMfD5oQBbBwapEAs8rryt0KujTPO5m6Zx0F+lezndbokoapGxERlgABeBqgFBxpEk3OmS7bX5z+fu+d1uxDjStBEGotBYcpHHnT9bVt9X999Haw7s6ojQKh8XCkczp+vW3/6n6lntripvXWEQPqzF69f7/q1az20jhU3rV7maZEAAWQDDArs+W/cFQBSysHAKdYWnzUwc2mlLOlivqupASYLMR//In/+7IAFQAEsHlRe4mkoJYPKi9xNJQSUeVF7hqSwko8qL3DUliIwQla+ytB9/jCGTwOk7YLCgqBZuy6Dc6/c4eQc0L4CDQAc0T4T5smsq7e5vm9np2bqoaspnmWgiEzoOAqU861fWtS6kamrTW703pasnfL4YpEzZ2sf+32//WnrnSY1XDcPXnP/r/q/baZjfd7maZEAAWQDDArs+W/cFQBSysHAKdYWnzUwc2mlLOlivqupASYLMR//ImIwQla+ytB9/jCGTwOk7YLCgqBZuy6Dc6/c4eQc0L4CDQAc0T4T5smsq7e5vm9np2bqoaspnmWgiEzoOAqU861fWtS6kamrTW703pasnfL4YpEzZ2sf+32//WnrnSY1XDcPXnP/r/q/baZjfdpycyVAATgBDA1ALqbMHAeBrYsAWWvHH2AywaA7BHvZmwaGmklUBEh5MPfAYCKjjZQRAGyw/4fwM8hGdB9J4CJscei+u5YLTImQ+QavAASY+iycWpPbNd999Hba+rMXrrCZ0W1StZar1utXOa91mj1O3XkCZ1SkCRAiy16n9Tfq//P+onVdYcXq02/9f9bf+P47nacnMlQAE4AQwNQC6mzBwHga2LAFlrxx9gMsGgOwR72ZsGhppJVARIeTD3wGAio42UEQBssP+H8DPIRnQfSeAibHHovruWC0yJkPkGrwAEmPosnFqT2zXfffR22vqzF66wmdFtUrWWq9brVzmvdZo9Tt15AmdUpAkQIstep/U36v/z/qJ1XWHF6tNv/X/W3/j+O543/+6UACbAYaztA4tsHCcKBx5S8EJ48ScsKkEaV3wtIwd45ACAQBij/+7IAFAAEt3hUfWKgApbvCo+sVABSgV9f+YoAAlAr6/8xQAAgAbKYoGDwWBIDlhrJuWqzTL9SbKMay9NzZaZstX1Hqz6AYYCxHFLl9Pf+tVapulmK7UWt9B61l8Neg3tQSZCrztaV88yFfW7oCbU6RmLPAOCwEggQQ0TqfapGrV//Uf9RC6EzDAiSHKL/////nREb//dKABNgMNZ2gcW2DhOFA48peCE8eJOWFSCNK74WkYO8cgBAIAxQQANlMUDB4LAkByw1k3LVZpl+pNlGNZem5stM2Wr6j1Z9AMMBYjily+nv/WqtU3SzFdqLW+g9ay+GvQb2oJMhV52tK+eZCvrd0BNqdIzFngHBYCQQIIaJ1PtUjVq//qP+ohdCZhgRJDlF/////zoi5C6lVAABQCoDYQD4ZCwVB9kTFKkiv9NQcExMLk3ipgtxrzPf8LZgdNYHsgYIPgbIgAEXEAwCgpAie4XVi5BaBlBUxSQfMO7yfQPFcsGReNjIgX0QvmASaIgQc3SJkgpqr+myNNNNJSSX/n1Hw/4CgwqkXN3qSMTVX//U2skkQuTq9JJEy/+ybvT6p1IjCCpfiL/+SuQupVQAAUAqA2EA+GQsFQfZExSpIr/TUHBMTC5N4qYLca8z3/C2YHTWB7IGCD4GyIABFxAMAoKQInuF1YuQWgZQVMUkHzDu8n0DxXLBkXjYyIF9EL5gEmiIEHN0iZIKaq/psjTTTSUkl/59R8P+AoMKpFzd6kjE1V//1NrJJELk6vSSRMv/sm70+qdSIwgqX4i//klMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+7IAAA/wAABpBwAACAAADSDgAAEAAAGkAAAAIAAANIAAAARMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
  /**
   * @hidden
   */

  var scanditLogoImage = // tslint:disable-next-line:max-line-length
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUcAAAAhCAMAAAB9TZmqAAABgFBMVEVHcEyCgoL+/v6Kior///+FhYXW1tbn5+eAgIDp6en+/v6BgYH///////////+BgYH///////////+wsLCCgoL4+PiBgYH///+srKyAgID////s7OyCgoKBgYGDg4P///+BgYH6+vqBgYH////MzMz39/f///+BgYGbm5uDg4OMjIyBgYG+vr6QkJD///////+BgYGDg4P+/v7Hx8eOjo6BgYH09PT7+/v///////+MjIz9/f3////////Y2Nj6+vrPz8+BgYH9/f3///+3t7f///+Ghob///+AgICDg4P///+IiIj///////+CgoL6+vqmpqb////////t7e3////////////b29vj4+PNzc3y8vLl5eXv7+/U1NTDw8O8vLyRkZH////x8fGJiYmZmZnDw8Pf39/S0tLT09PCwsKfn5/4+PjV1dWlpaWwsLCjo6OsrKzj4+OZmZnCwsLq6uqurq7///+AgICfn5+Tk5OFhYXCwsLJycmYmJjU1NS/v79wPZvPAAAAdnRSTlMAcvoPxiTEAsby9L8p/eusNEoJBlEZ2Pb67nz25fVGOv1Eh+RW7oyC/ToXzkALzmqTe8BJHmf9Uu+n/B2Dnt7/+6MvEP2ZKrmzXHIx2dScYv6wkf3o3SL+/uDhqLbnuNrVV4u4ie7LNGlhweeUnrTsZOjkis/PjpWtfQAACfhJREFUaN7tmXlbGksWxtlMEwRUVjUgrSQqEAQccXdQQRUVVYxqoolqjGa9WW7uW25Xv/pUdxe9q2TM88zMM55/aE5V1/Lr03XeqrZYHuzBHuzB/vPmX+hzgdmcyh/sXrIx95LKPQ64/JoG5oaHHVztzya8Ssl0rV1PfO6A03YbR4xdzUBnblbgXphZm2hv+W0z9bW0+H7tjmL9d2w6VDPon7XX/CsuxR2fTcr1hervk+oWBM9KDa0bLqVys5pOn1vTrxfvG6SrCT3HpwNiS3O1Gzt/E8dN5RHVadNAsL6aXB9ch3/9zWyUdDF/Bqh8/ngm2Shpkp+QB49xEdJy3MbgW4UjaVQ42nola73ywDWt5XhKpIcWbP4h9F3CIOuOEOodiwNz4wvdDsDW/N/PMYPhb1GiGOMY82CiSeWWObYgXsI2SWo4tq7jusOco9xC7yAGF005WixOocIq1mt1eerrw/BT6/L8cu69C3Hfb+EY3NkJ/tINHOU4Vl/VORxGiTOQ9DOTVjGugrVGwmdn/Zxkcv0qds/gOS9rOa6isM+Zc3TaRUsmvhQw2WDO0Z+mNoRnpEnurgjs8RLVPeD3vNkNhMz+2h1PgZP6anrxkTT69d4hhI8IHzCpX8Eb8gyrU1qOxIHJ/A0c5XqHwL7flCOL9GdK2NMR4JRv7LJmnYQvoF2OEHcsqEpY/s1YzK1JYJy7WRu8KoeGo75iMea7iWMxdncYb6CXLBq8I5jhSd7s1YBnnxzjMqLjSDv8kb6Do8+L6556OXYCpYR41RFdbWXx2NwfBrCRYU+jOO4FgBfjEsn+8EpxZBjAHHsX9Y4Tm+3EtKLFV10CPA73SrjfwPFgA0C8KlIOusILtVmHq1pil1HOsC548YcKgMpWUOHJCtbJrJZjwwi2eu7gaGnHdlu6To4DgHdIugwQIi2+GRvwogJgRByxzwF4+vqos5uNY8EBl/Cfrad6Ry3PGCoGHYCLqr94Nxx6joceeIWqfSLzNVQkQptATE0sBk+rXU9rDJ4IKZtxnMAOCQWB0byO46YNqwN3cIzRv+U6OQauAfSNd9KJ+qMkx1SUY3M2cVIFFiQl6xqaTSQW55hkpWy8Q9zs83EgY+pQOBorDiUT9gMbYOCIjWl7YmDBI2nrFmCaxURFS2YG+JlpoRYrWpT5ewlvN+MYp4Gapbm0dV7H0dKN9ak7OAaB8+U6OXaQkihgPX3jsY5yQkqJS05BWkQ+SbN14FGbkIe+ApvC/8dAZxP18IMYsZg5ngP/MPPHgD9C9K9zBXis5+j9FhL6fCMmu2R0kAV/BaWs9h3eqclf20RQntInkjLD6IYtRAKU2WQbp+NY9KK0eDtHH3CWqpNjmieRz2vDAABHjEVTiU6Izqr3pbgiruydET6Vip6yMHuMV07SluLJJfotZg6Fo9Y/gieERFNREnlm5PiIF6uSdZH5/DXinCQsRxM6OB8vtx6/evXKBWyM1Rb5T2TeXG06hEBtwSBJ6DjSMkGM38axCJxH6uRoyRFCUl0fMmthwNYpvVKjTtpPQ5YQq1Cjh0QD6WBn+6DMcbKNSgx77hqvLCYOTuGorVihOSLAWfzl6JWR498hGh1+K3+JPmG5GZVE2DiuQoaskuNrSvl7ks3fRabMOK5hh1AwPhvOcnqO/iVcBG7lOA2Qtno5WqziS8ununY8GKbL5AIKKTFL+UNSo87zR3PDAFwyngsxH3HvGA294/kNFV0oSYmsfGHkOCohyZcQFm6JbGFClDmrVhOBmlueorZvw1d7bSFrMtP3w/iDCDuefpQa9Ryp5Cvs+2/jeEDDvN54PDhwp/NNIkryUsyNhyiw5Jbo6hHerT/D8DjoOcY3Gc9LqfyRzFHjUMWj1m/DOza/SSPHI1b0Djah055V4aE2Y5BP3iwmd3GdZenktNGkPAZXRNQg7diKpvUcKd0r620cZ/CT1Ls+VsTHzi3mm6LkTEzQfwIDTH0HBS0edGEuaEl25H7IeB7pOWodz2+o+ATHrNfvRo4f2OUxnoh6jB/EEE0QF/O3iPIFXPED0so7GTEpb0c/ifpFoAWm6dQcm4GvJzdz9HvxhkzVyXECGyyTpXtOgRaR41BtGC6fEN04mhcCtrdOjtxNHK/wTOoraDNyPGSXn7Al/s5fYI2L4yxwC8cqXksCrxOF0QFjeT8FIULyu9DbZeBI8W9/uZnjAsIhYq2T4+eauhZDoUAfWm4d0jGn7wXWRJoFKlWWc4Hde8YjtwqssPmb6J4iGx1axd4DZx5bC7Yj/lvOOV9QTlL+6MNWzlhuw0diZQnnOmXkOBbGxY0cm13YIaShTo6hLWBElLxjM8Ak7TWwCqwVhT0c0MlZuCFgj65RxRkAT+8Vj6lteDJFy2YVg0aOWKKj4IbC2JYStJBp4mjtugXjGuIptuGYtmHLsDlvQTwqbca5DLblhVbhSOVA4QaO/swwlt6qovMOjsvnTwDEHf1LAK6ERWSRXILKcscwcCEsLuV1YGNuyePZGUR84T7rY9PoNoBhYK5k5HgMvOinZetnbEWkmQaFc/3BUay7ZmteeN4TnhEZssE2Mt4uGdubd2OXtNWOx2znASPHohdajp7J1xOC9dOCjSOiUp13cCwT8qbCDunfED4typ2/Kh4AG19FcZs72wLgWWpZvgBm7hOPHYTfcYRRqWav8d2gezJxAN7dc8LmK2SaSacxdSjmfR+R8wD3YVspcFnYy/5Gnmkcq8tGjpYMUFBzVMy2+5aQrKVejtw8IVPPYysrnSdZQpbZeUVTsjkWzBK+Q/p7FIv57LT47AMnngazl62Hhb3eUTs3M1RsJHw+WaQCf7KmiJgtEkJCs+7OzUBUURpvCzg1nIV1zhz/U7KXexFCInJ24QK915evWdGUsFhy1eq+fJiW2V0NmXDkltQcgzPHl5OvBXu5N0p4MsXVzdFiTwnbWmdjiCeE3ZcVZLmTpmjxZMkeIiREi/muCIlY78Nx+nCPtkzbfevCnp7jMh1FY5uAU0mB64roU0z+fEAHPK+e2WKjUiChsfNKnlCug+6owrH45YyopGde9W0ipJEKY8+JlqPffaTZz3DlkHRfY7mGPyBAldtpmBfGFuqgOMRA//c5Al+cUT6UnVG+M8kcB/I0vEjblDxW3xJKyybppcNas7J+8Wwo14qkoSfzqnjOW2WmbUQRSemImuOs3HhA33iS53VP1Up0m6iBRLncodFf6cWEah+RTCTEJhpmuXt9cHAgXG3pzPQDJbM8PKsaQ7W9D4PniYfP9Sa2mPsJAMBwyfQjgNqGgfBp6IGZKUfCf1vonmkfWiZt9ru+r1bb9++E/f9qThLNBhL5RkKsd1XN9qRIJP2AzNTSTdLJYVv+znWWZu7ow+p4ow1Ys3Snnry7Yj5rHfjfmda/AA1uqYyEPVX6AAAAAElFTkSuQmCC";
  /**
   * @hidden
   */

  var laserActiveImage = // tslint:disable-next-line:max-line-length
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuwAAAAvCAMAAACPHW/9AAAAwFBMVEVHcExUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFVydJUyNFUyNFUyNFUyNH8/v5UyNFUyNFUyNFVydJUyNFUyNFUyNFVydJUyNFVydL3/f1YytNUyNFUyNFUyNHx+/ve9fbp+PnR8fNUyNGF2N9009q15+uW3ePD7O+l4+dv0dlv0dj///9Ujp4pAAAAP3RSTlMAiXJnBFsIARM5oA1+UKsuG5W3JEULBishQj5iAm0QkTQZ/h5MF3snWISbSHb8plMFjfjv9Oeyua3Ww9/Nn4y/IgemAAAIrElEQVR42u2da1saOxCAq8jRVuql0qOVIgcvgHhBrBbUYv//vzpzySSTZBeWqo8fOm+E9Vv3eXxnOptNJh8+vD3rhvFC3lHR73/GmmEsxdKKVY+N3ONFN3OT8O+S/GMYnmXtid0rCJAy7b3nrPDyQn5dnk3DiFnaoeJ4Ife98ZnqTnTSPHZ38R0ezWPDMF6BeY6lseK0F+Ej3Vl1MJ1EZ78rmXrmBvxWTLcCO4axU8WUEsk2nIMhJsh6Et75HnQn10l1NB093xB9F9p4UsBBKXuGsQSlIuXSScSQ/Og8Ch9097aT66I6mo6S74i1c++mn7G/v4+fQrYNYymKPWLBEvEkOtD7LhoPvmN+R93R9sR1UR1FR8n7/cqS/oejjI+G8UIyqbb9NQ4NtB6MJ99J99j2deU6q35AnrPDFew99FcY+MN8K6VpGHMpVecwQL5p/1h+dL6/Bwm+i9k92M6yY2IPrpPqaLqT2omrR7hk9l4ETvEHRuAzD8OogNNFgUpd8DeRhgYGACkPvqPuO5jc2XZM7SGxK9dRdRSdknNicIy+Ey/xyDMYDRR1dzGMaihrHKCUxweFhALpD8qj76Q71jLOdknt6y6xB9dZdRCddU4ibpSgdA606q2cWqtWq7VqfDWMUpwk8BVRd99xPHAYkP6oPPkOurPtVMlwaneyU2KHZ1NxHVVvXqDm3uXC0GuR1Nrr+J7bODyr9IGByNUwYtr+wrYEgcClJCZ0FJD6YDz5Drqz7Vi3U2oX2amKgcR+1nWuk+okelmOrmVWB6XxVi9xBHpFNHoNw0gpUkU8WsUfCYoQBLW2uA/Cj0aQ353tBydcyHAdQ8+na5TYsYg52GPXUXUwnbXW2TnC/atKbO+x47xxnrFiGBXIxEGbkoCQAHD2k/CgO2T3JtkOT6ldl9q17JtUxOz1xXXM6WC6N5qVVtm6B2ZfRmrnPo9Xxkxn3InYlWEYGudFDOjDpHEAyin7UXoQnnVn27mQodQusksVw0UMuj6CrM6mU7ZO/6ehIFNZ28uNXjudFUPNJxz8ZRgxw09eDbgEQCEdERwCSn+X+EF48B11B9uxkqFCZmNjk4t2/3xKFTsl9m9Ndh1N7zUa5eWHZO1Y7qFzW+7/GgZ+AVvXW1v0RR/DKMGZgldAFJKAcP7vDhP30fkG6I7ZnWynQoZS+9ev/ISKz6euioHEDkWMdx1UJ8Wdz+NOqEZU1vaJW9ntxBZ+5nzhYRgJJEYBKhQoAjL3wXr0nXRH20+bnNpdHQNPqCQ7VzGS2C9GXnUQncQe+nyNZcjsegZMZ1NgMp0Aj8Av5AF5Qu6RH8wdcctcBY49v42/m6CC8oN8YXnu2CSyivwi01A5dO8RJZxMp+jl8/Pzee+yXasPJLV3pWj3slMVgxV78xTyunN93KG8HWoqjKkZfKZb06A6u462P4DtTyT7Pdn+g3S/I9tvyfYrHInpJPvxbzP+79Qc//BBddEdPLm9cvmRZCfd78t0d7ZP2fbn3mq7VcfU7uqYWPYjnnekKmYAiV1cZ9W5MnGmo+jadQotSuwPvySxR64H1dl2dh1/LLMbLHyku8/sV2z6rU/tJPvTvbhO1cSjtx2E5NzeoNT++SLUMaWy1yPZOZ+L7VtTlP3ndPqFbJ9M0irmKVQxktddYpfMTrofp5ndMNlF9WNnep7ZXWIH2x+C7uT6Y5zaWfZvy8o+lPIF8/oW6z5F3Sec2UNiDxX7vS7Z7+6KqhjU3TK7kVTsKrOz7XeuaM/KGK5iojpmSmU7uT43s0c1Oz2fNs7P8elUlewzrGJwkO6+Yp/oil1ndl2ySxnjXD9OUrv9vU12pzqNUMWEZ9TwiPoUinYpYySzu0dUKmNKa3Y9G0MTj5doO0/G4BzMDAZ+fZrRXEw0FePLmHQu5l5l9rRmvzLZjeLUfhW7ns3GJM+nfj5mqlzHB9Ti2Zh8nr2l5tnjF/67qL9+PxomJYd6ziZ6bVQwz24Y5XPt2SQ7jvDGiebZr7Np9irz7Okb1IvsDeqKjNIXqJ3s/elQvWOS6Rz1psneoRrlL1D16yN+gxpeoPplBLslb1BXy9+ghrUx3cK1Mb2CtTGN4oWMWv6Ol1/nfnkvRStkeJmMrZExooUxTo4E8kjWioXFYdHSsEZj0dqYSqseLwuQNY9h0WMjW0Yz9sTrHnnFY0fu3jCcCR2vc77ocbwyztf/hmWPbtVjbf6qR1nP3o3Xs9fdevaa3yeithz5bRpxMMT6Fy1o53vlj61tN+I17JEX2Xr282SDh9/TIbs5eD37YDRvPXvpTqV6vcI+Jdou5f1XWzr0fwL5ZiW+a9uZY0T7lBpzNioFsfVOJdr9WXGnkt+DulG+B7Vk+3eyZa+m4qCdbEBVwWCbT41Ke1H1/tOgdbtoE6reg3qa7kHd1HtQo+4Ce2l3gfLeAoO4X0YSBfWstUAr7Bo3jMXtBdiatMGA7i5Qj3pshO4C4rokdtVdwPeNOYv7xnD7o6W6xnzWoTBIWsdwRFjrGGNBw5ikT4YyelDaN+ZU+sYcUp+k4r4xlTqCHc7radcsagiWBINvCGYdwYxqHcFO855g1BWMWs2VtwRTHcHQ9aOoI9jcXo/S3NEP/3tOHBSuRV4WGNbq0ajW7DFr+Mg9F2Oy5qfS6/Eg9HpUib2ki+8ed/HtL27iK91PS9ugWhtf4zW6+H7MO/lux518ky6+2vWsZ3VRf/ZqzdnD70l39m1rz268eoN2TML9/Vi90J/9ZE5/9kUnbyx77gYOfdqGHbxhvPLRGycFZ2+EkzfO+LQZOXnjZi0/Z6boTKVFJyrJLy84UcmOVDJefqhSctDYnDOVotPy3GGQ1Q7LO8JhZ+UZ731cHoqojsuT0/Ju1uYeDpmfg/pmp6DaMajGWx2EOvcc1OTg32oHXN+89HxrO+DaeNMjrqsd7M5Huxfy/Y9ZM4wlWVoyZ+mHd2LdMF7Ma5j4P+hE04Z78rHKAAAAAElFTkSuQmCC";
  /**
   * @hidden
   */

  var laserPausedImage = // tslint:disable-next-line:max-line-length
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuwAAAAvCAMAAACPHW/9AAAAYFBMVEVHcExUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFTyNFUyNE9ws1UyNFUyNFUyNFTyNFCxM5UyNFHxc9RyNE5wcwd5ZO7AAAAH3RSTlMAZ35yAQgbBAwTI4lbRDmUoKtQLrc080osVZvhKMyyq5oARwAAB8JJREFUeNrtnYtS4koQhhUENRFRRBQRff+3PNP3nktCRHbPqTr9T5jErdrVrfr6t5PMdF9d/XndhEK/1H8T0dtQ6K/ol7FxAWIX+Veh0AVVoLaYEAojoP8C1btQ6O8KmBsPiSbwnvSfsHvPB4w7ucBhRyh0EQlROgw5/kKjwDNf4G6ke8yngrrkaYmDr+hIk35CoXPlOKJTAZxQSCHhiK9xV9aFdKN3BNNOJ5w7nTs60tR1PIdCZ2pp52VHXC3lBMh1SqEGBjHPvJe056gj6UsFt6HPdMAH5s9K73zQ9I6Tnlp6CYVqGSCf/hK4+pQTq6OJg4KQF+AVdzV2Yt2jjlDjP1ux2cLzFUZTj3A8hkLn6JXn1yEReRofSD0gT7wb7WLtjnVGHTkHpo3YbIxrBccKjlDoskKucLQiA+lPzAPw7O6OdoNdWGfUCXSBtxhyKnh+g5GEU0sbGqHQKb1tGJYBlFY854EgyL+8GO5CO8HOxm6sA+oIOsEsDBffqODYaZ+OfTpMD6HQWdrLKQ0T8JWFhqIJzAPviHuDdjV2ZZ1RB9ALjgXmzd7jDD/S/qFG+pqGnUKhn+iBJkUojToaLAwIe+Q94f5utJewo7Ej68nWkXTkfIov489AP5PTPA0+zfmY21eh0KgEE4GHh2DlwsFHAQAvuCvtYO0edjV29HVgnUh3/vxwPeLOAnGB8awcIrsKhXLNGY+5Xs95QqJ8PABzHn5kHnh3tDtrB9idsad7U2adSDeY9eCpsueZwV2r7+lInxme+15OoVCtmcwzZgYpqoOCsWP6EXjAHdw90Y53qWbtBjsbO7KebF1QL3Cm06yJdT9jlBXjNQ1/QvEpFCrUu6t+vc4B8rEAmOX0E6CKO3q7WbvBTlmMJOyJdUad4B6U0t0b3X2J8sdHOgo9PcGUBkyhEIphIELwYK1pAph8LHj6e3Z/wZ1p50SG8pgbn7KzsaccZg+oK+gDCcea4e6N7g+Hdv4feYYRCv1IT8/PRE4WExYEAr/aPvGutIu1Ux6T7lARdjV2TGI2zDom2y4d6UvTZr4rujOwv56/vvQj2tIIhTIxGIUSRIkeHwQV/Agj8Q7unmgvrL2GHZMY9nVCvfDrD8k8GGTgFnQUHY4H067SN4xv/IRCA9p9IyeAS6bDzthKpJG2RwqTFAxA/pp4v0bazdqHYSfWGfXCs51tM+nHLX5LZZ1x38kwzr9tootQqME5kQFnYl5QJ6CYdcOdgUfchfaUyoC1D8LedZTFJGNnX/eoU9b95HMTJn0rpAPqauye853EKYNunAfvoYx0vVJ3d/Z+8N5+VNq3Ge2QzaC1b+DxI+Qxbdg/4fZ0442dWLc7BYe6ZNyKumd9dyh8fWesh7OHTno7o54lM4ec92OWyhydtc+asN82nV1gtyTm+Snz9crYt01nrzj3pLfiOfQ/t/WdT9kbeXuGepbFHC1td87+yrDfD+bslsb0RcpON8HFvamzdkvZd2buyrsDPjtCoTx/cfeombET621nB9iJ9fWUnL28QeU71LU+hDHuFXez9/phzO7QeBKzC7xDU4DftY39MJTDoK9Lyi6wjz6NyZ6zu/dJ/Oq2krzcGnvOrnGhj9jtcvu1jSfuoS8/CIniYXv1tql6zN54zr5qP2fP36Bu9rJYYKbvlXgZV/0a1cVA/TRen+M82Q1uvEkNTXt7ys9F+Jax8Qb1w1bU9PIGdT72BvXU2pjB9bi6irGIgew3QGthDK16gGiIpTEhvzYGgfjQ1TFea8d2c21MP2VtzPCqx2LRY75GvV726NaEzZr+H2sdQ+csg2xxravF3YrfYtXjamDV4/B69odsb4Yuma83G7UX/orzZxexkj00bU27QqMI5dt/5oJ4vqB9bD37lJ1KugHK9gaWW/Aa2zlm/heBj4LYqRQa36k0L7ZoCNSzYqOS36pEG5XGdypN2YO69xtc29uqiyiY2xanYkfhtW0zDIXG9qEaN5JdtPZku53Y+/3pPagj1QVaVT2stMCD1hfgKgMaAdmmcPndEAqdridwnW13tu3PVYGBPeKt9QVcdYHHkeoCi2bdGKuB9DasRuWjfVYzBn4U/o3gym5w0YIoKRNqFYmRCyOmVF43hsopcbEkrJPUrhszXBFMC4LVFcHa4npKqywWaJKIeMvLPoVCw0XB+PxWFwdbYTmwt6o4nlQEex+oCCbWPlbr0RcqxWqTUgGyVebRRUUodPFqj4JYWfDxNav1WLBusOdVfJdVFd/091/k896q4Gs1VduFfF1J1KjoG5pUvZeReR2u4fviSvm6Mr6uii+zvrAqvpzHtOqzj8nXZu/qQu3D9dijPHvoRGn2F/XUkpbPrDC7VWdnyLVA+1B99qrzhnaPmdwehnsgVO0Lou9G6A904ei6svdG1XhDSF8M95nJeyqdbKR0r81tfI8buaBQuY+OSqFLNVVSsvyF76zkQB/oqZThzt3ysPHeYqRDnmtTZh3yrK0Zf+7sD0KhczvkOYQyohyM2jAvsbsY65ZX9UFd/KAP6p2c7vwVd6ksm1ZG787Q+V1P2X4BOYKNDfzOMETKF+N9UH/V4XpRNB1e6BdFM1b+hEKT+lkLLbd5P1+meZGBVzZX/0Fjdwf+dN3+pg98KPRDjbF49S/pJhT6tS5B4j8UFQCShr1YqAAAAABJRU5ErkJggg==";
  /**
   * @hidden
   */

  var cameraImage = // tslint:disable-next-line:max-line-length
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0xNyA1Yy0uOCAwLTEuNC41LTEuOCAxLS40LjUtLjcgMS0xLjEgMS41cy0uNiAxLS44IDEuM2wtLjMuM0gzYy0xLjYgMC0zIDEuNC0zIDN2MjdjMCAxLjYgMS40IDMgMyAzaDQ0YzEuNiAwIDMtMS40IDMtM3YtMjdjMC0xLjYtMS40LTMtMy0zSDM3bC0uMy0uM2MtLjItLjMtLjUtLjctLjgtMS4ycy0uNi0xLTEuMS0xLjVjLS40LS41LTEtMS0xLjgtMXptMCAyaDE2Yy0uMSAwIC4xIDAgLjMuM3MuNS44LjggMS4zLjcgMSAxLjEgMS41IDEgMSAxLjggMWgxMGMuNiAwIDEgLjQgMSAxdjI3YzAgLjYtLjQgMS0xIDFIM2MtLjYgMC0xLS40LTEtMXYtMjdjMC0uNi40LTEgMS0xaDEwYy44IDAgMS40LS41IDEuOC0xcy44LTEgMS4xLTEuNS42LTEgLjgtMS4yLjQtLjMuMy0uM3ptOCA0Yy03LjIgMC0xMyA1LjgtMTMgMTNzNS44IDEzIDEzIDEzIDEzLTUuOCAxMy0xMy01LjgtMTMtMTMtMTN6bTAgMmM2LjEgMCAxMSA0LjkgMTEgMTFzLTQuOSAxMS0xMSAxMS0xMS00LjktMTEtMTEgNC45LTExIDExLTExek04IDE0Yy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMmgxYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnptMTcgMWMtNSAwLTkgNC05IDlzNCA5IDkgOSA5LTQgOS05LTQtOS05LTl6bTAgMmMzLjkgMCA3IDMuMSA3IDdzLTMuMSA3LTcgNy03LTMuMS03LTcgMy4xLTcgNy03eiIgY2xhc3M9ImEiLz48L3N2Zz4K";
  /**
   * @hidden
   */

  var switchCameraImage = // tslint:disable-next-line:max-line-length
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0yNi4xNCA4YTQuOTkgNC45OSAwIDAgMC00LjE2IDIuMjI3bC0yLjIxOCAzLjMyOGExLjAwMyAxLjAwMyAwIDAgMS0uODMyLjQ0NUgxOHYtMmMwLTEuMTAyLS44OTgtMi0yLTJoLTZjLTEuMTAyIDAtMiAuODk4LTIgMnYySDVjLTEuNjUyIDAtMyAxLjM0OC0zIDN2MzZjMCAxLjY1MiAxLjM0OCAzIDMgM2g1NGMxLjY1MiAwIDMtMS4zNDggMy0zVjE3YzAtMS42NTItMS4zNDgtMy0zLTNoLTN2LTFjMC0xLjEwMi0uODk4LTItMi0yaC0yYy0xLjEwMiAwLTIgLjg5OC0yIDJ2MWgtNC45MzhhLjk5Ny45OTcgMCAwIDEtLjgyOC0uNDQxbC0yLjI1NC0zLjM1MkE1LjAwMSA1LjAwMSAwIDAgMCAzNy44MjggOHptMCAyaDExLjY4OGMxIDAgMS45MzQuNDk2IDIuNDkyIDEuMzI0bDIuMjU0IDMuMzUyQTIuOTk4IDIuOTk4IDAgMCAwIDQ1LjA2MyAxNkg1OWMuNTUgMCAxIC40NSAxIDF2MzZjMCAuNTUtLjQ1IDEtMSAxSDVjLS41NSAwLTEtLjQ1LTEtMVYxN2MwLS41NS40NS0xIDEtMWgxMy45M2MxLjAwNCAwIDEuOTM3LS41IDIuNDk2LTEuMzM2bDIuMjE5LTMuMzI4QTIuOTk4IDIuOTk4IDAgMCAxIDI2LjE0IDEwek0xMCAxMmg2djJoLTZ6bTQyIDFoMnYxaC0yem0tMjAgNWMtNS4yOSAwLTEwLjI0NiAyLjgzNi0xMi45MzQgNy4zOThhLjk5Ni45OTYgMCAwIDAgLjM1NiAxLjM2OC45OTcuOTk3IDAgMCAwIDEuMzY3LS4zNTZBMTMuMDY1IDEzLjA2NSAwIDAgMSAzMiAyMGM3LjE2OCAwIDEzIDUuODMyIDEzIDEzIDAgLjE4OC0uMDE2LjM3NS0uMDIzLjU2M2wtMi4yNy0yLjI3YTEgMSAwIDEgMC0xLjQxNCAxLjQxNGw0IDRjLjE5NS4xOTUuNDUuMjkzLjcwNy4yOTNhLjk5My45OTMgMCAwIDAgLjcwNy0uMjkzbDQtNGExIDEgMCAxIDAtMS40MTQtMS40MTRsLTIuMzIgMi4zMTZjLjAxMS0uMjAzLjAyNy0uNDA2LjAyNy0uNjA5IDAtOC4yNy02LjczLTE1LTE1LTE1ek0xOCAyOWExIDEgMCAwIDAtLjcwNy4yOTNsLTQgNGExIDEgMCAxIDAgMS40MTQgMS40MTRsMi4zMTMtMi4zMTZjLS4wMDguMjAzLS4wMi40MDYtLjAyLjYwOSAwIDguMjcgNi43MyAxNSAxNSAxNSA1LjM2NyAwIDEwLjM2LTIuODk4IDEzLjAyNy03LjU2M2EuOTk5Ljk5OSAwIDEgMC0xLjczNC0uOTkyQTEzLjA0MiAxMy4wNDIgMCAwIDEgMzIgNDZjLTcuMTY4IDAtMTMtNS44MzItMTMtMTMgMC0uMTg4LjAxMi0uMzc5LjAyLS41NjZsMi4yNzMgMi4yNzNjLjE5NS4xOTUuNDUuMjkzLjcwNy4yOTNhMSAxIDAgMCAwIC43MDctMS43MDdsLTQtNEExIDEgMCAwIDAgMTggMjl6bTkgMmMtLjU1NSAwLTEgLjQ0NS0xIDF2MmMwIC41NTUuNDQ1IDEgMSAxIC41NTUgMCAxLS40NDUgMS0xdi0yYzAtLjU1NS0uNDQ1LTEtMS0xem01IDBjLS41NTUgMC0xIC40NDUtMSAxdjJjMCAuNTU1LjQ0NSAxIDEgMSAuNTU1IDAgMS0uNDQ1IDEtMXYtMmMwLS41NTUtLjQ0NS0xLTEtMXptNSAwYy0uNTU1IDAtMSAuNDQ1LTEgMXYyYzAgLjU1NS40NDUgMSAxIDEgLjU1NSAwIDEtLjQ0NSAxLTF2LTJjMC0uNTU1LS40NDUtMS0xLTF6Ii8+PC9zdmc+Cg==";
  /**
   * @hidden
   */

  var toggleTorchImage = // tslint:disable-next-line:max-line-length
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0zMC45MzggMWMtLjQ0Ni4wMi0xIC4yMy0xLjMxMy42NTZhMS4zMDIgMS4zMDIgMCAwIDAtLjA2My4wOTRsLTYuNzggMTIuMDYzLS4wNjMuMDkzYy0uNTU1Ljc4NS0uNzI3IDEuNzMtLjU5NCAyLjY1NmwtMjAuNSAyMi41NjMtLjAzMS4wMzFjLTEuMDcgMS4yMTktLjY2NCAzLjAxMi40NjggNC4xNTdoLjAzMmw0LjU5NCA0LjU5M2MuNTcuNTcgMS4yNjUuOTUgMiAxLjA2My43MzQuMTEzIDEuNTQ2LS4wNTUgMi4xNTYtLjU5NGguMDMxbDIyLjU2My0yMC41Yy45My4xMjkgMS44Ny0uMDQzIDIuNjU2LS41OTQuMDItLjAxNS4wNDMtLjAxNS4wNjItLjAzMWwuMDYzLS4wMzEgMTIuMDMxLTYuNzgyYy4wMzEtLjAxOS4wNjMtLjAzOS4wOTQtLjA2Mi40MjItLjMxMy42MzYtLjg2Ny42NTYtMS4zMTMuMDItLjQ0NS0uMDk4LS44NC0uMjUtMS4yNS0uMzA1LS44Mi0uODI4LTEuNjktMS41MzEtMi42ODctMS40MDctMS45OTItMy41MTYtNC4zOS01Ljc1LTYuNjI1LTIuMjM1LTIuMjM0LTQuNjAyLTQuMzEzLTYuNTk0LTUuNzE5LS45OTYtLjcwMy0xLjg2Ny0xLjIyNi0yLjY4OC0xLjUzMS0uNDEtLjE1Mi0uODA0LS4yNy0xLjI1LS4yNXptLjIxOCAyLjAzMWMuMDc4LjAxMi4xNTMuMDI0LjM0NC4wOTQuNTIuMTkxIDEuMy42MzMgMi4yMTkgMS4yODEgMS44MzYgMS4yOTcgNC4xNjggMy4zNTYgNi4zNDMgNS41MzIgMi4xNzYgMi4xNzUgNC4yMzUgNC40NzYgNS41MzIgNi4zMTIuNjQ4LjkxOCAxLjA5IDEuNzMgMS4yODEgMi4yNS4wNy4xOTEuMDgyLjI2Ni4wOTQuMzQ0TDM1LjEyNSAyNS41M2EuOTQ5Ljk0OSAwIDAgMC0uMTI1LjA5NGMtLjMxNi4yNDItLjg2LjMyOC0xLjQzOC4yMTlhMS4wNTYgMS4wNTYgMCAwIDAtLjE4Ny0uMDYzIDMuMTEzIDMuMTEzIDAgMCAxLTEuNDM4LS44MTJsLTYuOTA2LTYuOTA3Yy0uOTc2LS45ODQtMS4xMjktMi40MzctLjY1Ni0zLjA2MmEuNTMyLjUzMiAwIDAgMCAuMDk0LS4wOTR6bS04LjIxOCAxNS41OTRjLjE5OS4yOTcuNDMuNTg2LjY4Ny44NDRsNi45MDYgNi45MDZjLjI2Mi4yNjIuNTQzLjQ4OC44NDQuNjg4TDkuNTMxIDQ2LjkwNmMtLjA4Ni4wNzgtLjI1NC4xMzctLjUzMS4wOTQtLjI3Ny0uMDQzLS42MjktLjIyMy0uOTA2LS41TDMuNSA0MS45MDZjLS41NTktLjU2Ni0uNTYzLTEuMjYxLS40MDYtMS40Mzd6bS0yLjg3NSA4LjMxM2MtLjc3IDAtMS41NDMuMjkyLTIuMTI1Ljg3NWwtMi4xMjUgMi4xMjVhMy4wMjMgMy4wMjMgMCAwIDAgMCA0LjI1IDMuMDIzIDMuMDIzIDAgMCAwIDQuMjUgMGwyLjEyNS0yLjEyNmEzLjAyMyAzLjAyMyAwIDAgMCAwLTQuMjUgMy4wMDIgMy4wMDIgMCAwIDAtMi4xMjUtLjg3NXptMCAyYy4yNTMgMCAuNTE5LjA4Mi43MTguMjguMzk5LjQuMzk5IDEuMDQgMCAxLjQzOGwtMi4xMjUgMi4xMjVhMS4wMTQgMS4wMTQgMCAwIDEtMS40MzcgMCAxLjAxNCAxLjAxNCAwIDAgMSAwLTEuNDM3Yy40MjItLjQyMiAxLjY5OS0xLjY5NiAyLjEyNS0yLjEyNS4xOTktLjIuNDY1LS4yODIuNzE4LS4yODJ6Ii8+PC9zdmc+Cg==";

  // 19.1.2.14 Object.keys(O)

  _objectSap("keys", function() {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  var keys = _core$1.Object.keys;

  var keys$1 = keys;

  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

  var abs = Math.abs;

  _export(_export.S, "Math", {
    hypot: function hypot(value1, value2) {
      // eslint-disable-line no-unused-vars
      var sum = 0;
      var i = 0;
      var aLen = arguments.length;
      var larg = 0;
      var arg, div;
      while (i < aLen) {
        arg = abs(arguments[i++]);
        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else sum += arg;
      }
      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    }
  });

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

  var $find = _arrayMethods$1(5);
  var KEY = "find";
  var forced = true;
  // Shouldn't skip holes
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  _export(_export.P + _export.F * forced, "Array", {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY);

  (function(Camera) {
    /**
     * Camera type (not guaranteed to be correct, depending on the device).
     */
    var Type;

    (function(Type) {
      /**
       * Front facing camera.
       */
      Type["FRONT"] = "front";
      /**
       * Back facing camera.
       */

      Type["BACK"] = "back";
    })((Type = Camera.Type || (Camera.Type = {})));
  })(exports.Camera || (exports.Camera = {}));

  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)

  _export$1(_export$1.S, "Array", { isArray: _isArray });

  var isArray = _core$1.Array.isArray;

  var isArray$1 = isArray;

  function _arrayWithoutHoles(arr) {
    if (isArray$1(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  var _createProperty = function(object, index, value) {
    if (index in object) _objectDp$1.f(object, index, _propertyDesc$1(0, value));
    else object[index] = value;
  };

  _export$1(
    _export$1.S +
      _export$1.F *
        !_iterDetect(function(iter) {
          Array.from(iter);
        }),
    "Array",
    {
      // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
      from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
        var O = _toObject(arrayLike);
        var C = typeof this == "function" ? this : Array;
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var index = 0;
        var iterFn = core_getIteratorMethod(O);
        var length, result, step, iterator;
        if (mapping) mapfn = _ctx$1(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
        // if object isn't iterable or it's array with default iterator - use simple case
        if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
          for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
            _createProperty(
              result,
              index,
              mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value
            );
          }
        } else {
          length = _toLength$1(O.length);
          for (result = new C(length); length > index; index++) {
            _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
          }
        }
        result.length = index;
        return result;
      }
    }
  );

  var from_1 = _core$1.Array.from;

  var from_1$1 = from_1;

  var ITERATOR$8 = _wks$1("iterator");

  var core_isIterable = (_core$1.isIterable = function(it) {
    var O = Object(it);
    return (
      O[ITERATOR$8] !== undefined ||
      "@@iterator" in O ||
      // eslint-disable-next-line no-prototype-builtins
      _iterators.hasOwnProperty(_classof$1(O))
    );
  });

  var isIterable = core_isIterable;

  var isIterable$1 = isIterable;

  function _iterableToArray(iter) {
    if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]")
      return from_1$1(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  var _stringWs =
    "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  var space = "[" + _stringWs + "]";
  var non = "\u200b\u0085";
  var ltrim = RegExp("^" + space + space + "*");
  var rtrim = RegExp(space + space + "*$");

  var exporter = function(KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = _fails$1(function() {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    var fn = (exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY]);
    if (ALIAS) exp[ALIAS] = fn;
    _export$1(_export$1.P + _export$1.F * FORCE, "String", exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = (exporter.trim = function(string, TYPE) {
    string = String(_defined$1(string));
    if (TYPE & 1) string = string.replace(ltrim, "");
    if (TYPE & 2) string = string.replace(rtrim, "");
    return string;
  });

  var _stringTrim = exporter;

  var $parseInt = _global$1.parseInt;
  var $trim = _stringTrim.trim;

  var hex = /^[-+]?0[xX]/;

  var _parseInt =
    $parseInt(_stringWs + "08") !== 8 || $parseInt(_stringWs + "0x16") !== 22
      ? function parseInt(str, radix) {
          var string = $trim(String(str), 3);
          return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
        }
      : $parseInt;

  // 18.2.5 parseInt(string, radix)
  _export$1(_export$1.G + _export$1.F * (parseInt != _parseInt), { parseInt: _parseInt });

  var _parseInt$1 = _core$1.parseInt;

  var _parseInt$2 = _parseInt$1;

  (function(CameraAccess) {
    /**
     * @hidden
     *
     * Handle localized camera labels. Supported languages:
     * English, German, French, Spanish (spain), Portuguese (brasil), Portuguese (portugal), Italian,
     * Chinese (simplified), Chinese (traditional), Japanese, Russian, Turkish, Dutch, Arabic, Thai, Swedish,
     * Danish, Vietnamese, Norwegian, Polish, Finnish, Indonesian, Hebrew, Greek, Romanian, Hungarian, Czech,
     * Catalan, Slovak, Ukraininan, Croatian, Malay, Hindi.
     */
    var backCameraKeywords = [
      "rear",
      "back",
      "rück",
      "arrière",
      "trasera",
      "trás",
      "traseira",
      "posteriore",
      "后面",
      "後面",
      "背面",
      "后置",
      "後置",
      "背置",
      "задней",
      "الخلفية",
      "후",
      "arka",
      "achterzijde",
      "หลัง",
      "baksidan",
      "bagside",
      "sau",
      "bak",
      "tylny",
      "takakamera",
      "belakang",
      "אחורית",
      "πίσω",
      "spate",
      "hátsó",
      "zadní",
      "darrere",
      "zadná",
      "задня",
      "stražnja",
      "belakang",
      "बैक"
    ];
    /**
     * @hidden
     */

    var cameraObjects = new map$1();
    /**
     * @hidden
     */

    var getCamerasPromise;
    /**
     * @hidden
     *
     * @param label The camera label.
     * @returns Whether the label mentions the camera being a back-facing one.
     */

    function isBackCameraLabel(label) {
      var lowercaseLabel = label.toLowerCase();
      return backCameraKeywords.some(function(keyword) {
        return lowercaseLabel.includes(keyword);
      });
    }
    /**
     * @hidden
     *
     * Adjusts the cameras' type classification based on the given currently active video stream:
     * If the stream comes from an environment-facing camera, the camera is marked to be a back-facing camera
     * and the other cameras to be of other types accordingly (if they are not correctly set already).
     *
     * The method returns the currently active camera if it's actually the main (back or only) camera in use.
     *
     * @param mediaStreamTrack The currently active `MediaStreamTrack`.
     * @param cameras The array of available [[Camera]] objects.
     * @returns Whether the stream was actually from the main camera.
     */

    function adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras) {
      var mediaTrackSettings;

      if (typeof mediaStreamTrack.getSettings === "function") {
        mediaTrackSettings = mediaStreamTrack.getSettings();
      }

      var activeCamera = cameras.find(function(camera) {
        return (
          (mediaTrackSettings != null && camera.deviceId === mediaTrackSettings.deviceId) ||
          camera.label === mediaStreamTrack.label
        );
      });

      if (activeCamera !== undefined) {
        var activeCameraIsBackFacing =
          (mediaTrackSettings != null && mediaTrackSettings.facingMode === "environment") ||
          isBackCameraLabel(mediaStreamTrack.label); // TODO: also correct camera types when active camera is not back-facing

        if (activeCameraIsBackFacing && cameras.length > 1) {
          // Correct camera types if needed
          cameras.forEach(function(camera) {
            if (camera.deviceId === activeCamera.deviceId) {
              camera.cameraType = exports.Camera.Type.BACK;
            } else if (!isBackCameraLabel(camera.label)) {
              camera.cameraType = exports.Camera.Type.FRONT;
            }
          });
        }

        if (cameras.length === 1 || activeCameraIsBackFacing) {
          return activeCamera;
        }
      }

      return undefined;
    }

    CameraAccess.adjustCamerasFromMainCameraStream = adjustCamerasFromMainCameraStream;
    /**
     * Get a list of cameras (if any) available on the device, a camera access permission is requested to the user
     * the first time this method is called if needed.
     *
     * Depending on device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `UnsupportedBrowserError`
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     *
     * @returns A promise resolving to the array of available [[Camera]] objects (could be empty).
     */

    function getCameras() {
      if (getCamerasPromise != null) {
        return getCamerasPromise;
      }

      var browserCompatibility = exports.BrowserHelper.checkBrowserCompatibility();

      if (!browserCompatibility.fullSupport) {
        return promise$1.reject(new UnsupportedBrowserError(browserCompatibility));
      }

      var accessPermissionPromise = new promise$1(function(resolve, reject) {
        return enumerateDevices()
          .then(function(devices) {
            if (
              devices
                .filter(function(device) {
                  return device.kind === "videoinput";
                })
                .every(function(device) {
                  return device.label === "";
                })
            ) {
              resolve(
                navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: false
                })
              );
            } else {
              resolve();
            }
          })
          .catch(reject);
      });
      getCamerasPromise = new promise$1(function(resolve, reject) {
        accessPermissionPromise
          .then(function(stream) {
            return enumerateDevices()
              .then(function(devices) {
                var _console;

                var cameras = devices
                  .filter(function(device) {
                    return device.kind === "videoinput";
                  })
                  .map(function(videoDevice) {
                    if (cameraObjects.has(videoDevice.deviceId)) {
                      return cameraObjects.get(videoDevice.deviceId);
                    }

                    var label = videoDevice.label != null ? videoDevice.label : "";
                    var camera = {
                      deviceId: videoDevice.deviceId,
                      label: label,
                      cameraType: isBackCameraLabel(label) ? exports.Camera.Type.BACK : exports.Camera.Type.FRONT
                    };

                    if (label !== "") {
                      cameraObjects.set(videoDevice.deviceId, camera);
                    }

                    return camera;
                  });

                if (
                  cameras.length > 1 &&
                  !cameras.some(function(camera) {
                    return camera.cameraType === exports.Camera.Type.BACK;
                  })
                ) {
                  // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
                  // Otherwise pick the last camera
                  var backCameraIndex = cameras.length - 1;
                  var cameraResolutions = cameras.map(function(camera) {
                    var match = camera.label.match(/\b([0-9]+)MP?\b/i);

                    if (match != null) {
                      return _parseInt$2(match[1], 10);
                    }

                    return NaN;
                  });

                  if (
                    !cameraResolutions.some(function(cameraResolution) {
                      return isNaN(cameraResolution);
                    })
                  ) {
                    backCameraIndex = cameraResolutions.lastIndexOf(
                      Math.max.apply(Math, toConsumableArray(cameraResolutions))
                    );
                  }

                  cameras[backCameraIndex].cameraType = exports.Camera.Type.BACK;
                } // istanbul ignore else

                if (stream != null) {
                  stream.getVideoTracks().forEach(function(track) {
                    track.stop();
                  });
                }

                (_console = console).debug.apply(_console, ["Camera list: "].concat(toConsumableArray(cameras)));

                getCamerasPromise = undefined;
                return resolve(cameras);
              })
              .catch(function(error) {
                // istanbul ignore else
                if (stream != null) {
                  stream.getVideoTracks().forEach(function(track) {
                    track.stop();
                  });
                }

                getCamerasPromise = undefined;
                return reject(error);
              });
          })
          .catch(function(error) {
            getCamerasPromise = undefined; // istanbul ignore if

            if (error.name === "SourceUnavailableError") {
              error.name = "NotReadableError";
            }

            return reject(error);
          });
      });
      return getCamerasPromise;
    }

    CameraAccess.getCameras = getCameras;
    /**
     * @hidden
     *
     * Call `navigator.mediaDevices.getUserMedia` asynchronously in a `setTimeout` call.
     *
     * @param getUserMediaParams The parameters for the `navigator.mediaDevices.getUserMedia` call.
     * @returns A promise resolving when the camera is accessed.
     */

    function getUserMediaDelayed(getUserMediaParams) {
      console.debug("Camera access:", getUserMediaParams.video);
      return new promise$1(function(resolve, reject) {
        window.setTimeout(function() {
          navigator.mediaDevices
            .getUserMedia(getUserMediaParams)
            .then(resolve)
            .catch(reject);
        }, 0);
      });
    }
    /**
     * @hidden
     *
     * Try to access a given camera for video input at the given resolution level.
     *
     * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
     * resulting in higher to lower video resolutions.
     * @param camera The camera to try to access for video input.
     * @returns A promise resolving to the `MediaStream` object coming from the accessed camera.
     */

    function accessCameraStream(resolutionFallbackLevel, camera) {
      var browserName = exports.BrowserHelper.userAgentInfo.getBrowser().name;
      var isSafariBrowser = browserName != null && browserName.includes("Safari");
      var getUserMediaParams = {
        audio: false,
        video: {}
      };

      if (resolutionFallbackLevel === 0) {
        getUserMediaParams.video = {
          width: {
            min: 1400,
            ideal: 1920,
            max: 1920
          },
          height: {
            min: 900,
            ideal: isSafariBrowser ? 1080 : 1440,
            max: 1440
          }
        };
      } else if (resolutionFallbackLevel === 1) {
        getUserMediaParams.video = {
          width: {
            min: 1200,
            ideal: isSafariBrowser ? 1600 : 1920,
            max: 1920
          },
          height: {
            min: 900,
            ideal: isSafariBrowser ? 1080 : 1200,
            max: 1200
          }
        };
      } else if (resolutionFallbackLevel === 2) {
        getUserMediaParams.video = {
          width: {
            min: 1080,
            ideal: isSafariBrowser ? 1600 : 1920,
            max: 1920
          },
          height: {
            min: 900,
            ideal: isSafariBrowser ? 900 : 1080,
            max: 1080
          }
        };
      } else if (resolutionFallbackLevel === 3) {
        getUserMediaParams.video = {
          width: {
            min: 960,
            ideal: 1280,
            max: 1440
          },
          height: {
            min: 480,
            ideal: isSafariBrowser ? 720 : 960,
            max: 960
          }
        };
      } else if (resolutionFallbackLevel === 4) {
        getUserMediaParams.video = {
          width: {
            min: 720,
            ideal: isSafariBrowser ? 1024 : 1280,
            max: 1440
          },
          height: {
            min: 480,
            ideal: isSafariBrowser ? 768 : 720,
            max: 768
          }
        };
      } else if (resolutionFallbackLevel === 5) {
        getUserMediaParams.video = {
          width: {
            min: 640,
            ideal: isSafariBrowser ? 800 : 960,
            max: 1440
          },
          height: {
            min: 480,
            ideal: isSafariBrowser ? 600 : 720,
            max: 720
          }
        };
      }

      if (camera.deviceId === "") {
        getUserMediaParams.video.facingMode = {
          ideal: camera.cameraType === exports.Camera.Type.BACK ? "environment" : "user"
        };
      } else {
        getUserMediaParams.video.deviceId = {
          exact: camera.deviceId
        };
      }

      return getUserMediaDelayed(getUserMediaParams);
    }

    CameraAccess.accessCameraStream = accessCameraStream;
    /**
     * @hidden
     *
     * Get a list of available devices in a cross-browser compatible way.
     *
     * @returns A promise resolving to the `MediaDeviceInfo` array of all available devices.
     */

    function enumerateDevices() {
      if (typeof navigator.enumerateDevices === "function") {
        return navigator.enumerateDevices();
      } else if (
        _typeof_1(navigator.mediaDevices) === "object" &&
        typeof navigator.mediaDevices.enumerateDevices === "function"
      ) {
        return navigator.mediaDevices.enumerateDevices();
      } else {
        return new promise$1(function(resolve, reject) {
          try {
            window.MediaStreamTrack.getSources(function(devices) {
              resolve(
                devices
                  .filter(function(device) {
                    return device.kind.toLowerCase() === "video" || device.kind.toLowerCase() === "videoinput";
                  })
                  .map(function(device) {
                    return {
                      deviceId: device.deviceId != null ? device.deviceId : "",
                      groupId: device.groupId,
                      kind: "videoinput",
                      label: device.label,
                      toJSON:
                        /* istanbul ignore next */
                        function toJSON() {
                          return this;
                        }
                    };
                  })
              );
            });
          } catch (error) {
            var browserCompatibility = {
              fullSupport: false,
              scannerSupport: true,
              missingFeatures: [exports.BrowserCompatibility.Feature.MEDIA_DEVICES]
            };
            return reject(new UnsupportedBrowserError(browserCompatibility));
          }
        });
      }
    }
  })(exports.CameraAccess || (exports.CameraAccess = {}));

  /**
   * @hidden
   */
  var CameraManager = function CameraManager() {
    classCallCheck(this, CameraManager);
  };

  (function(CameraSettings) {
    /**
     * Video frame resolution request (not guaranteed to be precise depending on device, could be imprecise/lower).
     */
    var ResolutionPreference;

    (function(ResolutionPreference) {
      /**
       * Resolution of around 1080p (or less).
       */
      ResolutionPreference["FULL_HD"] = "full-hd";
      /**
       * Resolution of around 720p (or less).
       */

      ResolutionPreference["HD"] = "hd";
    })((ResolutionPreference = CameraSettings.ResolutionPreference || (CameraSettings.ResolutionPreference = {})));
  })(exports.CameraSettings || (exports.CameraSettings = {}));

  /**
   * @hidden
   *
   * A barcode picker utility class used to handle camera interaction.
   */

  var BarcodePickerCameraManager =
    /*#__PURE__*/
    (function(_CameraManager) {
      inherits(BarcodePickerCameraManager, _CameraManager);

      function BarcodePickerCameraManager(triggerFatalError, barcodePickerGui) {
        var _this;

        classCallCheck(this, BarcodePickerCameraManager);

        _this = possibleConstructorReturn(this, getPrototypeOf$2(BarcodePickerCameraManager).call(this));
        _this.postStreamInitializationListener = _this.postStreamInitialization.bind(assertThisInitialized(_this));
        _this.videoTrackUnmuteListener = _this.videoTrackUnmuteRecovery.bind(assertThisInitialized(_this));
        _this.triggerManualFocusListener = _this.triggerManualFocus.bind(assertThisInitialized(_this));
        _this.triggerZoomStartListener = _this.triggerZoomStart.bind(assertThisInitialized(_this));
        _this.triggerZoomMoveListener = _this.triggerZoomMove.bind(assertThisInitialized(_this));
        _this.triggerFatalError = triggerFatalError;
        _this.barcodePickerGui = barcodePickerGui;
        return _this;
      }

      createClass(BarcodePickerCameraManager, [
        {
          key: "setInteractionOptions",
          value: function setInteractionOptions(
            cameraSwitcherEnabled,
            torchToggleEnabled,
            tapToFocusEnabled,
            pinchToZoomEnabled
          ) {
            this.cameraSwitcherEnabled = cameraSwitcherEnabled;
            this.torchToggleEnabled = torchToggleEnabled;
            this.tapToFocusEnabled = tapToFocusEnabled;
            this.pinchToZoomEnabled = pinchToZoomEnabled;
          }
        },
        {
          key: "isCameraSwitcherEnabled",
          value: function isCameraSwitcherEnabled() {
            return this.cameraSwitcherEnabled;
          }
        },
        {
          key: "setCameraSwitcherEnabled",
          value: function setCameraSwitcherEnabled(enabled) {
            var _this2 = this;

            this.cameraSwitcherEnabled = enabled;

            if (this.cameraSwitcherEnabled) {
              return exports.CameraAccess.getCameras().then(function(cameras) {
                if (cameras.length > 1) {
                  _this2.barcodePickerGui.setCameraSwitcherVisible(true);
                }
              });
            } else {
              this.barcodePickerGui.setCameraSwitcherVisible(false);
              return promise$1.resolve();
            }
          }
        },
        {
          key: "isTorchToggleEnabled",
          value: function isTorchToggleEnabled() {
            return this.torchToggleEnabled;
          }
        },
        {
          key: "setTorchToggleEnabled",
          value: function setTorchToggleEnabled(enabled) {
            this.torchToggleEnabled = enabled;

            if (this.torchToggleEnabled) {
              if (
                this.mediaStream != null &&
                this.mediaTrackCapabilities != null &&
                this.mediaTrackCapabilities.torch != null &&
                this.mediaTrackCapabilities.torch
              ) {
                this.barcodePickerGui.setTorchTogglerVisible(true);
              }
            } else {
              this.barcodePickerGui.setTorchTogglerVisible(false);
            }
          }
        },
        {
          key: "isTapToFocusEnabled",
          value: function isTapToFocusEnabled() {
            return this.tapToFocusEnabled;
          }
        },
        {
          key: "setTapToFocusEnabled",
          value: function setTapToFocusEnabled(enabled) {
            this.tapToFocusEnabled = enabled;

            if (this.mediaStream != null) {
              if (this.tapToFocusEnabled) {
                this.enableTapToFocusListeners();
              } else {
                this.disableTapToFocusListeners();
              }
            }
          }
        },
        {
          key: "isPinchToZoomEnabled",
          value: function isPinchToZoomEnabled() {
            return this.pinchToZoomEnabled;
          }
        },
        {
          key: "setPinchToZoomEnabled",
          value: function setPinchToZoomEnabled(enabled) {
            this.pinchToZoomEnabled = enabled;

            if (this.mediaStream != null) {
              if (this.pinchToZoomEnabled) {
                this.enablePinchToZoomListeners();
              } else {
                this.disablePinchToZoomListeners();
              }
            }
          }
        },
        {
          key: "setSelectedCamera",
          value: function setSelectedCamera(camera) {
            this.selectedCamera = camera;
          }
        },
        {
          key: "setSelectedCameraSettings",
          value: function setSelectedCameraSettings(cameraSettings) {
            this.selectedCameraSettings = cameraSettings;
          }
        },
        {
          key: "setupCameras",
          value: function setupCameras() {
            var _this3 = this;

            if (this.cameraInitializationPromise != null) {
              return this.cameraInitializationPromise;
            }

            return this.accessInitialCamera().then(function(mediaStreamTrack) {
              return exports.CameraAccess.getCameras().then(function(cameras) {
                if (_this3.cameraSwitcherEnabled && cameras.length > 1) {
                  _this3.barcodePickerGui.setCameraSwitcherVisible(true);
                }

                if (mediaStreamTrack != null) {
                  // We successfully accessed a camera, check if it's really the main (back or only) camera
                  var mainCamera = exports.CameraAccess.adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras);

                  if (mainCamera != null) {
                    _this3.selectedCamera = mainCamera;

                    _this3.updateActiveCameraCurrentResolution(mainCamera);

                    return promise$1.resolve();
                  }

                  _this3.setSelectedCamera();
                }

                if (_this3.selectedCamera == null) {
                  var autoselectedCamera = cameras.find(function(camera) {
                    return camera.cameraType === exports.Camera.Type.BACK;
                  });

                  if (autoselectedCamera == null) {
                    autoselectedCamera = cameras[0];
                  }

                  if (autoselectedCamera == null) {
                    return promise$1.reject(new CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
                  }

                  return _this3.initializeCameraWithSettings(autoselectedCamera, _this3.selectedCameraSettings);
                } else {
                  return _this3.initializeCameraWithSettings(_this3.selectedCamera, _this3.selectedCameraSettings);
                }
              });
            });
          }
        },
        {
          key: "stopStream",
          value: function stopStream() {
            if (this.activeCamera != null) {
              this.activeCamera.currentResolution = undefined;
            }

            this.activeCamera = undefined;

            if (this.mediaStream != null) {
              window.clearTimeout(this.cameraAccessTimeout);
              window.clearInterval(this.cameraMetadataCheckInterval);
              window.clearTimeout(this.getCapabilitiesTimeout);
              window.clearTimeout(this.manualFocusWaitTimeout);
              window.clearTimeout(this.manualToAutofocusResumeTimeout);
              window.clearInterval(this.autofocusInterval);
              this.mediaStream.getVideoTracks().forEach(function(track) {
                track.stop();
              });
              this.mediaStream = undefined;
              this.mediaTrackCapabilities = undefined;
            }
          }
        },
        {
          key: "applyCameraSettings",
          value: function applyCameraSettings(cameraSettings) {
            this.selectedCameraSettings = cameraSettings;

            if (this.activeCamera == null) {
              return promise$1.reject(new CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
            }

            return this.initializeCameraWithSettings(this.activeCamera, cameraSettings);
          }
        },
        {
          key: "reinitializeCamera",
          value: function reinitializeCamera() {
            if (this.activeCamera != null) {
              this.initializeCameraWithSettings(this.activeCamera, this.activeCameraSettings).catch(
                this.triggerFatalError
              );
            }
          }
        },
        {
          key: "initializeCameraWithSettings",
          value: function initializeCameraWithSettings(camera, cameraSettings) {
            var _this4 = this;

            var existingCameraInitializationPromise = promise$1.resolve();

            if (this.cameraInitializationPromise != null) {
              existingCameraInitializationPromise = this.cameraInitializationPromise;
            }

            return existingCameraInitializationPromise.then(function() {
              _this4.setSelectedCamera(camera);

              _this4.selectedCameraSettings = _this4.activeCameraSettings = cameraSettings;

              if (
                cameraSettings != null &&
                cameraSettings.resolutionPreference === exports.CameraSettings.ResolutionPreference.FULL_HD
              ) {
                _this4.cameraInitializationPromise = _this4.initializeCameraAndCheckUpdatedSettings(camera);
              } else {
                _this4.cameraInitializationPromise = _this4.initializeCameraAndCheckUpdatedSettings(camera, 3);
              }

              return _this4.cameraInitializationPromise;
            });
          }
        },
        {
          key: "setTorchEnabled",
          value: function setTorchEnabled(enabled) {
            if (
              this.mediaStream != null &&
              this.mediaTrackCapabilities != null &&
              this.mediaTrackCapabilities.torch != null &&
              this.mediaTrackCapabilities.torch
            ) {
              this.torchEnabled = enabled;
              var videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

              if (videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function") {
                videoTracks[0].applyConstraints({
                  advanced: [
                    {
                      torch: enabled
                    }
                  ]
                });
              }
            }
          }
        },
        {
          key: "toggleTorch",
          value: function toggleTorch() {
            this.torchEnabled = !this.torchEnabled;
            this.setTorchEnabled(this.torchEnabled);
          }
        },
        {
          key: "setZoom",
          value: function setZoom(zoomPercentage, currentZoom) {
            if (
              this.mediaStream != null &&
              this.mediaTrackCapabilities != null &&
              this.mediaTrackCapabilities.zoom != null
            ) {
              var videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

              if (videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function") {
                var zoomRange = this.mediaTrackCapabilities.zoom.max - this.mediaTrackCapabilities.zoom.min;

                if (currentZoom == null) {
                  currentZoom = this.mediaTrackCapabilities.zoom.min;
                }

                var targetZoom = Math.max(
                  this.mediaTrackCapabilities.zoom.min,
                  Math.min(currentZoom + zoomRange * zoomPercentage, this.mediaTrackCapabilities.zoom.max)
                );
                videoTracks[0].applyConstraints({
                  advanced: [
                    {
                      zoom: targetZoom
                    }
                  ]
                });
              }
            }
          }
        },
        {
          key: "accessInitialCamera",
          value: function accessInitialCamera() {
            var _this5 = this;

            var initialCameraAccessPromise = promise$1.resolve();

            if (this.selectedCamera == null) {
              // Try to directly access primary (back or only) camera
              var primaryCamera = {
                deviceId: "",
                label: "",
                cameraType: exports.Camera.Type.BACK
              };
              initialCameraAccessPromise = new promise$1(function(resolve) {
                _this5
                  .initializeCameraWithSettings(primaryCamera, _this5.selectedCameraSettings)
                  .then(function() {
                    if (_this5.mediaStream != null) {
                      var videoTracks = _this5.mediaStream.getVideoTracks();

                      if (videoTracks.length !== 0) {
                        return resolve(videoTracks[0]);
                      }
                    }

                    resolve();
                  })
                  .catch(function() {
                    resolve();
                  });
              });
            }

            return initialCameraAccessPromise;
          }
        },
        {
          key: "updateActiveCameraCurrentResolution",
          value: function updateActiveCameraCurrentResolution(camera) {
            this.activeCamera = camera;
            this.activeCamera.currentResolution = {
              width: this.barcodePickerGui.videoElement.videoWidth,
              height: this.barcodePickerGui.videoElement.videoHeight
            };
            this.barcodePickerGui.setMirrorImageEnabled(this.barcodePickerGui.isMirrorImageEnabled(), false);
          }
        },
        {
          key: "postStreamInitialization",
          value: function postStreamInitialization() {
            var _this6 = this;

            window.clearTimeout(this.getCapabilitiesTimeout);
            this.getCapabilitiesTimeout = window.setTimeout(function() {
              _this6.storeStreamCapabilities();

              _this6.setupAutofocus();

              if (
                _this6.torchToggleEnabled &&
                _this6.mediaStream != null &&
                _this6.mediaTrackCapabilities != null &&
                _this6.mediaTrackCapabilities.torch != null &&
                _this6.mediaTrackCapabilities.torch
              ) {
                _this6.barcodePickerGui.setTorchTogglerVisible(true);
              }
            }, BarcodePickerCameraManager.getCapabilitiesTimeoutMs);
          }
        },
        {
          key: "videoTrackUnmuteRecovery",
          value: function videoTrackUnmuteRecovery() {
            this.reinitializeCamera();
          }
        },
        {
          key: "triggerManualFocus",
          value: function triggerManualFocus(event) {
            var _this7 = this;

            if (event != null) {
              event.preventDefault();

              if (event.type === "touchend" && event.touches.length !== 0) {
                return;
              } // Check if we were using pinch-to-zoom

              if (this.pinchToZoomDistance != null) {
                this.pinchToZoomDistance = undefined;
                return;
              }
            }

            window.clearTimeout(this.manualFocusWaitTimeout);
            window.clearTimeout(this.manualToAutofocusResumeTimeout);

            if (this.mediaStream != null && this.mediaTrackCapabilities != null) {
              var focusModeCapability = this.mediaTrackCapabilities.focusMode;

              if (focusModeCapability instanceof Array && focusModeCapability.includes("single-shot")) {
                if (focusModeCapability.includes("continuous") && focusModeCapability.includes("manual")) {
                  this.triggerFocusMode("continuous")
                    .then(function() {
                      _this7.manualFocusWaitTimeout = window.setTimeout(function() {
                        _this7.triggerFocusMode("manual");
                      }, BarcodePickerCameraManager.manualFocusWaitTimeoutMs);
                    })
                    .catch(
                      /* istanbul ignore next */
                      function() {
                        // Ignored
                      }
                    );
                  this.manualToAutofocusResumeTimeout = window.setTimeout(function() {
                    _this7.triggerFocusMode("continuous");
                  }, BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs);
                } else if (!focusModeCapability.includes("continuous")) {
                  window.clearInterval(this.autofocusInterval);
                  this.triggerFocusMode("single-shot").catch(
                    /* istanbul ignore next */
                    function() {
                      // Ignored
                    }
                  );
                  this.manualToAutofocusResumeTimeout = window.setTimeout(function() {
                    _this7.autofocusInterval = window.setInterval(
                      _this7.triggerAutoFocus.bind(_this7),
                      BarcodePickerCameraManager.autofocusIntervalMs
                    );
                  }, BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs);
                }
              }
            }
          }
        },
        {
          key: "triggerZoomStart",
          value: function triggerZoomStart(event) {
            if (event == null || event.touches.length !== 2) {
              return;
            }

            event.preventDefault();
            this.pinchToZoomDistance = Math.hypot(
              (event.touches[1].screenX - event.touches[0].screenX) / screen.width,
              (event.touches[1].screenY - event.touches[0].screenY) / screen.height
            );

            if (
              this.mediaStream != null &&
              this.mediaTrackCapabilities != null &&
              this.mediaTrackCapabilities.zoom != null
            ) {
              var videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

              if (videoTracks.length !== 0 && typeof videoTracks[0].getConstraints === "function") {
                this.pinchToZoomInitialZoom = this.mediaTrackCapabilities.zoom.min;
                var currentConstraints = videoTracks[0].getConstraints();

                if (currentConstraints.advanced != null) {
                  var currentZoomConstraint = currentConstraints.advanced.find(function(constraint) {
                    return "zoom" in constraint;
                  });

                  if (currentZoomConstraint != null) {
                    this.pinchToZoomInitialZoom = currentZoomConstraint.zoom;
                  }
                }
              }
            }
          }
        },
        {
          key: "triggerZoomMove",
          value: function triggerZoomMove(event) {
            if (this.pinchToZoomDistance == null || event == null || event.touches.length !== 2) {
              return;
            }

            event.preventDefault();
            this.setZoom(
              (Math.hypot(
                (event.touches[1].screenX - event.touches[0].screenX) / screen.width,
                (event.touches[1].screenY - event.touches[0].screenY) / screen.height
              ) -
                this.pinchToZoomDistance) *
                2,
              this.pinchToZoomInitialZoom
            );
          }
        },
        {
          key: "storeStreamCapabilities",
          value: function storeStreamCapabilities() {
            // istanbul ignore else
            if (this.mediaStream != null) {
              var videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

              if (videoTracks.length !== 0 && typeof videoTracks[0].getCapabilities === "function") {
                this.mediaTrackCapabilities = videoTracks[0].getCapabilities();
              }
            }
          }
        },
        {
          key: "setupAutofocus",
          value: function setupAutofocus() {
            window.clearTimeout(this.manualFocusWaitTimeout);
            window.clearTimeout(this.manualToAutofocusResumeTimeout); // istanbul ignore else

            if (this.mediaStream != null && this.mediaTrackCapabilities != null) {
              var focusModeCapability = this.mediaTrackCapabilities.focusMode;

              if (
                focusModeCapability instanceof Array &&
                !focusModeCapability.includes("continuous") &&
                focusModeCapability.includes("single-shot")
              ) {
                window.clearInterval(this.autofocusInterval);
                this.autofocusInterval = window.setInterval(
                  this.triggerAutoFocus.bind(this),
                  BarcodePickerCameraManager.autofocusIntervalMs
                );
              }
            }
          }
        },
        {
          key: "triggerAutoFocus",
          value: function triggerAutoFocus() {
            this.triggerFocusMode("single-shot").catch(
              /* istanbul ignore next */
              function() {
                // Ignored
              }
            );
          }
        },
        {
          key: "triggerFocusMode",
          value: function triggerFocusMode(focusMode) {
            // istanbul ignore else
            if (this.mediaStream != null) {
              var videoTracks = this.mediaStream.getVideoTracks();

              if (videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function") {
                return videoTracks[0].applyConstraints({
                  advanced: [
                    {
                      focusMode: focusMode
                    }
                  ]
                });
              }
            }

            return promise$1.reject(undefined);
          }
        },
        {
          key: "enableTapToFocusListeners",
          value: function enableTapToFocusListeners() {
            var _this8 = this;

            ["touchend", "mousedown"].forEach(function(eventName) {
              _this8.barcodePickerGui.videoElement.addEventListener(eventName, _this8.triggerManualFocusListener);
            });
          }
        },
        {
          key: "enablePinchToZoomListeners",
          value: function enablePinchToZoomListeners() {
            this.barcodePickerGui.videoElement.addEventListener("touchstart", this.triggerZoomStartListener);
            this.barcodePickerGui.videoElement.addEventListener("touchmove", this.triggerZoomMoveListener);
          }
        },
        {
          key: "disableTapToFocusListeners",
          value: function disableTapToFocusListeners() {
            var _this9 = this;

            ["touchend", "mousedown"].forEach(function(eventName) {
              _this9.barcodePickerGui.videoElement.removeEventListener(eventName, _this9.triggerManualFocusListener);
            });
          }
        },
        {
          key: "disablePinchToZoomListeners",
          value: function disablePinchToZoomListeners() {
            this.barcodePickerGui.videoElement.removeEventListener("touchstart", this.triggerZoomStartListener);
            this.barcodePickerGui.videoElement.removeEventListener("touchmove", this.triggerZoomMoveListener);
          }
        },
        {
          key: "initializeCameraAndCheckUpdatedSettings",
          value: function initializeCameraAndCheckUpdatedSettings(camera, resolutionFallbackLevel) {
            var _this10 = this;

            return this.initializeCamera(camera, resolutionFallbackLevel)
              .then(function() {
                // Check if due to asynchronous behaviour camera settings were changed while camera was initialized
                if (
                  _this10.selectedCameraSettings !== _this10.activeCameraSettings &&
                  (_this10.selectedCameraSettings == null ||
                    _this10.activeCameraSettings == null ||
                    keys$1(_this10.selectedCameraSettings).some(function(cameraSettingsProperty) {
                      return (
                        _this10.selectedCameraSettings[cameraSettingsProperty] !==
                        _this10.activeCameraSettings[cameraSettingsProperty]
                      );
                    }))
                ) {
                  _this10.activeCameraSettings = _this10.selectedCameraSettings;
                  return _this10.initializeCameraAndCheckUpdatedSettings(camera, resolutionFallbackLevel);
                }

                _this10.cameraInitializationPromise = undefined;
                return promise$1.resolve();
              })
              .catch(function(error) {
                _this10.cameraInitializationPromise = undefined;
                return promise$1.reject(error);
              });
          }
        },
        {
          key: "retryInitializeCameraIfNeeded",
          value: function retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error) {
            if (resolutionFallbackLevel < 6) {
              return this.initializeCamera(camera, resolutionFallbackLevel + 1)
                .then(resolve)
                .catch(reject);
            } else {
              return reject(error);
            }
          }
        },
        {
          key: "initializeCamera",
          value: function initializeCamera(camera) {
            var _this11 = this;

            var resolutionFallbackLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (camera == null) {
              return promise$1.reject(new CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
            }

            this.stopStream();
            this.torchEnabled = false;
            this.barcodePickerGui.setTorchTogglerVisible(false);
            return new promise$1(function(resolve, reject) {
              exports.CameraAccess.accessCameraStream(resolutionFallbackLevel, camera)
                .then(function(stream) {
                  // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
                  if (typeof stream.getTracks()[0].getSettings === "function") {
                    var mediaTrackSettings = stream.getTracks()[0].getSettings();

                    if (
                      mediaTrackSettings.width != null &&
                      mediaTrackSettings.height != null &&
                      (mediaTrackSettings.width === 2 || mediaTrackSettings.height === 2)
                    ) {
                      if (resolutionFallbackLevel === 6) {
                        return reject(
                          new CustomError({
                            name: "NotReadableError",
                            message: "Could not initialize camera correctly"
                          })
                        );
                      } else {
                        return _this11
                          .initializeCamera(camera, resolutionFallbackLevel + 1)
                          .then(resolve)
                          .catch(reject);
                      }
                    }
                  }

                  _this11.mediaStream = stream;

                  _this11.mediaStream.getVideoTracks().forEach(function(track) {
                    // Reinitialize camera on weird pause/resumption coming from the OS
                    // This will add the listener only once in the case of multiple calls, identical listeners are ignored
                    track.addEventListener("unmute", _this11.videoTrackUnmuteListener);
                  }); // This will add the listener only once in the case of multiple calls, identical listeners are ignored

                  _this11.barcodePickerGui.videoElement.addEventListener(
                    "loadedmetadata",
                    _this11.postStreamInitializationListener
                  );

                  if (_this11.tapToFocusEnabled) {
                    _this11.enableTapToFocusListeners();
                  }

                  if (_this11.pinchToZoomEnabled) {
                    _this11.enablePinchToZoomListeners();
                  }

                  _this11.resolveInitializeCamera(camera, resolve, reject);

                  _this11.barcodePickerGui.videoElement.srcObject = stream;

                  _this11.barcodePickerGui.videoElement.load();

                  _this11.barcodePickerGui.playVideo();
                })
                .catch(function(error) {
                  // istanbul ignore if
                  if (error.name === "SourceUnavailableError") {
                    error.name = "NotReadableError";
                  }

                  if (
                    error.message === "Invalid constraint" ||
                    (error.name === "OverconstrainedError" && error.constraint === "deviceId")
                  ) {
                    // Camera might have changed deviceId: check for new cameras with same label and type but different deviceId
                    return exports.CameraAccess.getCameras().then(function(cameras) {
                      var newCamera = cameras.find(function(currentCamera) {
                        return (
                          currentCamera.label === camera.label &&
                          currentCamera.cameraType === camera.cameraType &&
                          currentCamera.deviceId !== camera.deviceId
                        );
                      });

                      if (newCamera == null) {
                        return _this11.retryInitializeCameraIfNeeded(
                          camera,
                          resolutionFallbackLevel,
                          resolve,
                          reject,
                          error
                        );
                      } else {
                        return _this11
                          .initializeCamera(newCamera, resolutionFallbackLevel)
                          .then(resolve)
                          .catch(reject);
                      }
                    });
                  }

                  if (
                    error.name === "PermissionDeniedError" ||
                    error.name === "PermissionDismissedError" ||
                    error.name === "NotAllowedError" ||
                    error.name === "NotFoundError" ||
                    error.name === "AbortError"
                  ) {
                    // Camera is not accessible at all
                    return reject(error);
                  }

                  return _this11.retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error);
                });
            });
          }
        },
        {
          key: "resolveInitializeCamera",
          value: function resolveInitializeCamera(camera, resolve, reject) {
            var _this12 = this;

            var cameraNotReadableError = new CustomError({
              name: "NotReadableError",
              message: "Could not initialize camera correctly"
            });
            window.clearTimeout(this.cameraAccessTimeout);
            this.cameraAccessTimeout = window.setTimeout(function() {
              _this12.stopStream();

              reject(cameraNotReadableError);
            }, BarcodePickerCameraManager.cameraAccessTimeoutMs);

            this.barcodePickerGui.videoElement.onloadeddata = function() {
              _this12.barcodePickerGui.videoElement.onloadeddata = null;
              window.clearTimeout(_this12.cameraAccessTimeout); // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
              // Also detect failed camera access with no error but also no video stream provided

              if (
                _this12.barcodePickerGui.videoElement.videoWidth > 2 &&
                _this12.barcodePickerGui.videoElement.videoHeight > 2 &&
                _this12.barcodePickerGui.videoElement.currentTime > 0
              ) {
                if (camera.deviceId !== "") {
                  _this12.updateActiveCameraCurrentResolution(camera);
                }

                return resolve();
              }

              var cameraMetadataCheckStartTime = performance.now();
              window.clearInterval(_this12.cameraMetadataCheckInterval);
              _this12.cameraMetadataCheckInterval = window.setInterval(function() {
                // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
                // Also detect failed camera access with no error but also no video stream provided
                if (
                  _this12.barcodePickerGui.videoElement.videoWidth === 2 ||
                  _this12.barcodePickerGui.videoElement.videoHeight === 2 ||
                  _this12.barcodePickerGui.videoElement.currentTime === 0
                ) {
                  if (
                    performance.now() - cameraMetadataCheckStartTime >
                    BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs
                  ) {
                    window.clearInterval(_this12.cameraMetadataCheckInterval);

                    _this12.stopStream();

                    return reject(cameraNotReadableError);
                  }

                  return;
                }

                window.clearInterval(_this12.cameraMetadataCheckInterval);

                if (camera.deviceId !== "") {
                  _this12.updateActiveCameraCurrentResolution(camera);

                  _this12.barcodePickerGui.videoElement.dispatchEvent(new Event("canplay"));
                }

                return resolve();
              }, BarcodePickerCameraManager.cameraMetadataCheckIntervalMs);
            };
          }
        }
      ]);

      return BarcodePickerCameraManager;
    })(CameraManager);
  BarcodePickerCameraManager.cameraAccessTimeoutMs = 4000;
  BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs = 4000;
  BarcodePickerCameraManager.cameraMetadataCheckIntervalMs = 50;
  BarcodePickerCameraManager.getCapabilitiesTimeoutMs = 500;
  BarcodePickerCameraManager.autofocusIntervalMs = 1500;
  BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs = 5000;
  BarcodePickerCameraManager.manualFocusWaitTimeoutMs = 400;
  BarcodePickerCameraManager.noCameraErrorParameters = {
    name: "NoCameraAvailableError",
    message: "No camera available"
  };

  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

  var $find$1 = _arrayMethods$1(6);
  var KEY$1 = "findIndex";
  var forced$1 = true;
  // Shouldn't skip holes
  if (KEY$1 in [])
    Array(1)[KEY$1](function() {
      forced$1 = false;
    });
  _export(_export.P + _export.F * forced$1, "Array", {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY$1);

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors && /./g.flags != "g")
    _objectDp.f(RegExp.prototype, "flags", {
      configurable: true,
      get: _flags
    });

  var TO_STRING = "toString";
  var $toString = /./[TO_STRING];

  var define = function(fn) {
    _redefine(RegExp.prototype, TO_STRING, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (
    _fails(function() {
      return $toString.call({ source: "a", flags: "b" }) != "/a/b";
    })
  ) {
    define(function toString() {
      var R = _anObject(this);
      return "/".concat(
        R.source,
        "/",
        "flags" in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined
      );
    });
    // FF44- RegExp#toString has a wrong name
  } else if ($toString.name != TO_STRING) {
    define(function toString() {
      return $toString.call(this);
    });
  }

  var DateProto = Date.prototype;
  var INVALID_DATE = "Invalid Date";
  var TO_STRING$1 = "toString";
  var $toString$1 = DateProto[TO_STRING$1];
  var getTime = DateProto.getTime;
  if (new Date(NaN) + "" != INVALID_DATE) {
    _redefine(DateProto, TO_STRING$1, function toString() {
      var value = getTime.call(this);
      // eslint-disable-next-line no-self-compare
      return value === value ? $toString$1.call(this) : INVALID_DATE;
    });
  }

  // 19.1.3.6 Object.prototype.toString()

  var test = {};
  test[_wks("toStringTag")] = "z";
  if (test + "" != "[object z]") {
    _redefine(
      Object.prototype,
      "toString",
      function toString() {
        return "[object " + _classof(this) + "]";
      },
      true
    );
  }

  (function(ImageSettings) {
    // Warning: the values of Format are important as the engine web worker relies on them without type checking.

    /**
     * Image bytes format/layout.
     */
    var Format;

    (function(Format) {
      /**
       * Single-channel 8-bit gray scale image.
       */
      Format[(Format["GRAY_8U"] = 0)] = "GRAY_8U";
      /**
       * RGB image with 8 bits per color channel.
       */

      Format[(Format["RGB_8U"] = 1)] = "RGB_8U";
      /**
       * RGBA image with 8 bits per color channel.
       */

      Format[(Format["RGBA_8U"] = 2)] = "RGBA_8U";
    })((Format = ImageSettings.Format || (ImageSettings.Format = {})));
  })(exports.ImageSettings || (exports.ImageSettings = {}));

  /**
   * @hidden
   */

  var BarcodePickerGui =
    /*#__PURE__*/
    (function() {
      function BarcodePickerGui(options) {
        var _this = this;

        classCallCheck(this, BarcodePickerGui);

        this.scanner = options.scanner;
        this.originElement = options.originElement;
        this.singleImageMode = options.singleImageMode;
        this.scanningPaused = options.scanningPaused;
        this.cameraUploadCallback = options.cameraUploadCallback;
        this.mirrorImageOverrides = new map$1();
        this.grandParentElement = document.createElement("div");
        this.grandParentElement.className = BarcodePickerGui.grandParentElementClassName;
        this.originElement.appendChild(this.grandParentElement);
        this.parentElement = document.createElement("div");
        this.parentElement.className = BarcodePickerGui.parentElementClassName;
        this.grandParentElement.appendChild(this.parentElement);
        this.videoImageCanvasContext = document.createElement("canvas").getContext("2d");
        this.videoElement = document.createElement("video");
        this.cameraSwitcherElement = document.createElement("img");
        this.torchTogglerElement = document.createElement("img");
        this.laserContainerElement = document.createElement("div");
        this.laserActiveImageElement = document.createElement("img");
        this.laserPausedImageElement = document.createElement("img");
        this.viewfinderElement = document.createElement("div");

        if (options.singleImageMode) {
          this.cameraUploadElement = document.createElement("div");
          this.cameraUploadInputElement = document.createElement("input");
          this.cameraUploadLabelElement = document.createElement("label");
          this.cameraUploadProgressElement = document.createElement("div");
          this.setupCameraUploadGuiAssets();
          this.guiStyle = exports.BarcodePicker.GuiStyle.NONE;
        } else {
          this.setupVideoElement();
          this.setupCameraSwitcher();
          this.setupTorchToggler();
          this.setupFullGuiAssets();
          this.setGuiStyle(options.guiStyle);
          this.setVideoFit(options.videoFit);
          this.setLaserArea(options.laserArea);
          this.setViewfinderArea(options.viewfinderArea);
          this.visibilityListener = this.checkAndRecoverPlayback.bind(this);
          document.addEventListener("visibilitychange", this.visibilityListener);
          this.newScanSettingsListener = this.handleNewScanSettings.bind(this);
          this.scanner.onNewScanSettings(this.newScanSettingsListener);
          this.handleNewScanSettings();
        }

        this.resizeInterval = window.setInterval(function() {
          _this.resizeIfNeeded();
        }, 200);

        if (options.hideLogo) {
          this.licenseFeaturesReadyListener = this.showScanditLogo.bind(this, options.hideLogo);
          this.scanner.onLicenseFeaturesReady(this.licenseFeaturesReadyListener);
        } else {
          this.showScanditLogo(false);
        }

        this.setVisible(options.visible);
      }

      createClass(BarcodePickerGui, [
        {
          key: "destroy",
          value: function destroy() {
            if (this.visibilityListener != null) {
              document.removeEventListener("visibilitychange", this.visibilityListener);
            }

            if (this.newScanSettingsListener != null) {
              this.scanner.removeListener("newScanSettings", this.newScanSettingsListener);
            }

            if (this.licenseFeaturesReadyListener != null) {
              this.scanner.removeListener("licenseFeaturesReady", this.licenseFeaturesReadyListener);
            }

            window.clearInterval(this.resizeInterval);
            this.grandParentElement.remove();
            this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
          }
        },
        {
          key: "setCameraManager",
          value: function setCameraManager(cameraManager) {
            this.cameraManager = cameraManager;
          }
        },
        {
          key: "pauseScanning",
          value: function pauseScanning() {
            this.scanningPaused = true;
            this.laserActiveImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
            this.laserPausedImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
            this.viewfinderElement.classList.add(BarcodePickerGui.pausedClassName);
          }
        },
        {
          key: "resumeScanning",
          value: function resumeScanning() {
            this.scanningPaused = false;
            this.laserPausedImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
            this.laserActiveImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
            this.viewfinderElement.classList.remove(BarcodePickerGui.pausedClassName);
          }
        },
        {
          key: "isVisible",
          value: function isVisible() {
            return this.visible;
          }
        },
        {
          key: "setVisible",
          value: function setVisible(visible) {
            var browserName = exports.BrowserHelper.userAgentInfo.getBrowser().name;

            if (
              browserName != null &&
              browserName.includes("Safari") &&
              this.visible != null &&
              !this.visible &&
              visible
            ) {
              // Safari behaves very weirdly when displaying the video element again after being hidden:
              // it undetectably reuses video frames "buffered" from the video just before it was hidden.
              // We do this to avoid reusing old data
              this.videoElement.pause();
              this.videoElement.currentTime = 0;
              this.videoElement.load();
              this.playVideo();
            }

            this.visible = visible;

            if (visible) {
              this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);

              if (this.guiStyle === exports.BarcodePicker.GuiStyle.LASER) {
                this.laserActiveImageElement.classList.remove(BarcodePickerGui.flashColorClassName);
              } else if (this.guiStyle === exports.BarcodePicker.GuiStyle.VIEWFINDER) {
                this.viewfinderElement.classList.remove(BarcodePickerGui.flashWhiteClassName);
              }
            } else {
              this.originElement.classList.add(BarcodePickerGui.hiddenClassName);
            }
          }
        },
        {
          key: "isMirrorImageEnabled",
          value: function isMirrorImageEnabled() {
            if (
              this.cameraManager != null &&
              this.cameraManager.selectedCamera != null &&
              this.cameraManager.activeCamera != null
            ) {
              var mirrorImageOverride = this.mirrorImageOverrides.get(
                this.cameraManager.activeCamera.deviceId + this.cameraManager.activeCamera.label
              );

              if (mirrorImageOverride != null) {
                return mirrorImageOverride;
              } else {
                return this.cameraManager.activeCamera.cameraType === exports.Camera.Type.FRONT;
              }
            } else {
              return false;
            }
          }
        },
        {
          key: "setMirrorImageEnabled",
          value: function setMirrorImageEnabled(enabled, override) {
            if (this.cameraManager != null && this.cameraManager.selectedCamera != null) {
              if (enabled) {
                this.videoElement.classList.add(BarcodePickerGui.mirroredClassName);
              } else {
                this.videoElement.classList.remove(BarcodePickerGui.mirroredClassName);
              }

              if (override) {
                this.mirrorImageOverrides.set(
                  this.cameraManager.selectedCamera.deviceId + this.cameraManager.selectedCamera.label,
                  enabled
                );
              }
            }
          }
        },
        {
          key: "setGuiStyle",
          value: function setGuiStyle(guiStyle) {
            if (this.singleImageMode) {
              return;
            }

            switch (guiStyle) {
              case exports.BarcodePicker.GuiStyle.NONE:
                this.guiStyle = guiStyle;
                this.laserContainerElement.classList.add(BarcodePickerGui.hiddenClassName);
                this.viewfinderElement.classList.add(BarcodePickerGui.hiddenClassName);
                break;

              case exports.BarcodePicker.GuiStyle.LASER:
                this.guiStyle = guiStyle;
                this.laserContainerElement.classList.remove(BarcodePickerGui.hiddenClassName);
                this.viewfinderElement.classList.add(BarcodePickerGui.hiddenClassName);
                break;

              case exports.BarcodePicker.GuiStyle.VIEWFINDER:
                this.guiStyle = guiStyle;
                this.laserContainerElement.classList.add(BarcodePickerGui.hiddenClassName);
                this.viewfinderElement.classList.remove(BarcodePickerGui.hiddenClassName);
                break;

              default:
                break;
            }
          }
        },
        {
          key: "setLaserArea",
          value: function setLaserArea(area) {
            this.customLaserArea = area;

            if (area == null) {
              area = this.scanner.getScanSettings().getSearchArea();
            }

            var borderPercentage = 0.025;
            var usablePercentage = 1 - borderPercentage * 2;
            this.laserContainerElement.style.left = "".concat(
              (borderPercentage + area.x * usablePercentage) * 100,
              "%"
            );
            this.laserContainerElement.style.width = "".concat(area.width * usablePercentage * 100, "%");
            this.laserContainerElement.style.top = "".concat((borderPercentage + area.y * usablePercentage) * 100, "%");
            this.laserContainerElement.style.height = "".concat(area.height * usablePercentage * 100, "%");
          }
        },
        {
          key: "setViewfinderArea",
          value: function setViewfinderArea(area) {
            this.customViewfinderArea = area;

            if (area == null) {
              area = this.scanner.getScanSettings().getSearchArea();
            }

            var borderPercentage = 0.025;
            var usablePercentage = 1 - borderPercentage * 2;
            this.viewfinderElement.style.left = "".concat((borderPercentage + area.x * usablePercentage) * 100, "%");
            this.viewfinderElement.style.width = "".concat(area.width * usablePercentage * 100, "%");
            this.viewfinderElement.style.top = "".concat((borderPercentage + area.y * usablePercentage) * 100, "%");
            this.viewfinderElement.style.height = "".concat(area.height * usablePercentage * 100, "%");
          }
        },
        {
          key: "setVideoFit",
          value: function setVideoFit(objectFit) {
            if (this.singleImageMode) {
              return;
            }

            this.videoFit = objectFit;

            if (objectFit === exports.BarcodePicker.ObjectFit.COVER) {
              this.videoElement.style.objectFit = "cover";
              this.videoElement.dataset.objectFit = "cover"; // used by "objectFitPolyfill" library
            } else {
              this.videoElement.style.objectFit = "contain";
              this.videoElement.dataset.objectFit = "contain"; // used by "objectFitPolyfill" library

              this.scanner.applyScanSettings(
                this.scanner.getScanSettings().setBaseSearchArea({
                  x: 0,
                  y: 0,
                  width: 1.0,
                  height: 1.0
                })
              );
            }

            this.resizeIfNeeded(true);
            window.objectFitPolyfill(this.videoElement);
          }
        },
        {
          key: "reassignOriginElement",
          value: function reassignOriginElement(originElement) {
            if (!this.visible) {
              this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
              originElement.classList.add(BarcodePickerGui.hiddenClassName);
            }

            originElement.appendChild(this.grandParentElement);
            this.checkAndRecoverPlayback();
            this.resizeIfNeeded();
            this.originElement = originElement;
          }
        },
        {
          key: "flashGUI",
          value: function flashGUI() {
            if (this.guiStyle === exports.BarcodePicker.GuiStyle.LASER) {
              this.flashLaser();
            } else if (this.guiStyle === exports.BarcodePicker.GuiStyle.VIEWFINDER) {
              this.flashViewfinder();
            }
          }
        },
        {
          key: "getVideoImageData",
          value: function getVideoImageData() {
            if (!this.singleImageMode) {
              this.videoImageCanvasContext.drawImage(this.videoElement, 0, 0); // This could happen in very weird situations and should be temporary

              if (
                this.videoElement.readyState !== 4 ||
                this.videoImageCanvasContext.canvas.width <= 2 ||
                this.videoImageCanvasContext.canvas.height <= 2
              ) {
                return undefined;
              }
            }

            return this.videoImageCanvasContext.getImageData(
              0,
              0,
              this.videoImageCanvasContext.canvas.width,
              this.videoImageCanvasContext.canvas.height
            ).data;
          }
        },
        {
          key: "getVideoCurrentTime",
          value: function getVideoCurrentTime() {
            return this.videoElement.currentTime;
          }
        },
        {
          key: "setCameraSwitcherVisible",
          value: function setCameraSwitcherVisible(visible) {
            if (visible) {
              this.cameraSwitcherElement.classList.remove(BarcodePickerGui.hiddenClassName);
            } else {
              this.cameraSwitcherElement.classList.add(BarcodePickerGui.hiddenClassName);
            }
          }
        },
        {
          key: "setTorchTogglerVisible",
          value: function setTorchTogglerVisible(visible) {
            if (visible) {
              this.torchTogglerElement.classList.remove(BarcodePickerGui.hiddenClassName);
            } else {
              this.torchTogglerElement.classList.add(BarcodePickerGui.hiddenClassName);
            }
          }
        },
        {
          key: "playVideo",
          value: function playVideo() {
            var playPromise = this.videoElement.play();

            if (playPromise != null) {
              playPromise.catch(
                /* istanbul ignore next */
                function() {
                  // Can sometimes cause an incorrect rejection (all is good, ignore).
                }
              );
            }
          }
        },
        {
          key: "setCameraUploadGuiAvailable",
          value: function setCameraUploadGuiAvailable(available) {
            if (available) {
              this.cameraUploadProgressElement.classList.add(BarcodePickerGui.flashWhiteInsetClassName);
              this.cameraUploadElement.classList.remove(BarcodePickerGui.opacityPulseClassName);
            } else {
              this.cameraUploadProgressElement.classList.remove(BarcodePickerGui.flashWhiteInsetClassName);
              this.cameraUploadElement.classList.add(BarcodePickerGui.opacityPulseClassName);
            }
          }
        },
        {
          key: "setupVideoElement",
          value: function setupVideoElement() {
            var _this2 = this;

            this.videoElement.setAttribute("autoplay", "autoplay");
            this.videoElement.setAttribute("playsinline", "true");
            this.videoElement.setAttribute("muted", "muted");
            this.videoElement.className = BarcodePickerGui.videoElementClassName;
            this.parentElement.appendChild(this.videoElement);
            this.videoElement.addEventListener("canplay", function() {
              window.setTimeout(function() {
                _this2.resizeIfNeeded(true);

                window.objectFitPolyfill(_this2.videoElement);
              }, 0);
              _this2.videoImageCanvasContext.canvas.width = _this2.videoElement.videoWidth;
              _this2.videoImageCanvasContext.canvas.height = _this2.videoElement.videoHeight;

              _this2.scanner.applyImageSettings({
                width: _this2.videoElement.videoWidth,
                height: _this2.videoElement.videoHeight,
                format: exports.ImageSettings.Format.RGBA_8U
              });
            });
          }
        },
        {
          key: "setupCameraUploadGuiAssets",
          value: function setupCameraUploadGuiAssets() {
            var _this3 = this;

            this.cameraUploadElement.className = BarcodePickerGui.cameraUploadElementClassName;
            this.parentElement.appendChild(this.cameraUploadElement);
            this.cameraUploadInputElement.type = "file";
            this.cameraUploadInputElement.accept = "image/*";
            this.cameraUploadInputElement.setAttribute("capture", "environment");
            this.cameraUploadInputElement.addEventListener("change", this.cameraUploadFile.bind(this));
            this.cameraUploadInputElement.addEventListener(
              "click",
              /* istanbul ignore next */
              function(event) {
                if (_this3.scanningPaused || _this3.scanner.isBusyProcessing()) {
                  event.preventDefault();
                }
              }
            );
            this.cameraUploadLabelElement.appendChild(this.cameraUploadInputElement);
            this.cameraUploadElement.appendChild(this.cameraUploadLabelElement);
            var cameraUploadImageElement = document.createElement("img");
            cameraUploadImageElement.src = cameraImage;
            this.cameraUploadLabelElement.appendChild(cameraUploadImageElement);
            var cameraUploadTextElement = document.createElement("div");
            cameraUploadTextElement.innerText = "Scan from Camera";
            this.cameraUploadLabelElement.appendChild(cameraUploadTextElement);
            this.cameraUploadProgressElement.classList.add("radial-progress");
            this.cameraUploadElement.appendChild(this.cameraUploadProgressElement);
          }
        },
        {
          key: "setupFullGuiAssets",
          value: function setupFullGuiAssets() {
            this.laserActiveImageElement.src = laserActiveImage;
            this.laserContainerElement.appendChild(this.laserActiveImageElement);
            this.laserPausedImageElement.src = laserPausedImage;
            this.laserContainerElement.appendChild(this.laserPausedImageElement);
            this.laserContainerElement.className = BarcodePickerGui.laserContainerElementClassName;
            this.parentElement.appendChild(this.laserContainerElement);
            this.viewfinderElement.className = BarcodePickerGui.viewfinderElementClassName;
            this.parentElement.appendChild(this.viewfinderElement); // Show inactive GUI, as for now the scanner isn't ready yet

            this.laserActiveImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
            this.laserPausedImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
            this.viewfinderElement.classList.add(BarcodePickerGui.pausedClassName);
          }
        },
        {
          key: "flashLaser",
          value: function flashLaser() {
            this.laserActiveImageElement.classList.remove(BarcodePickerGui.flashColorClassName); // tslint:disable-next-line:no-unused-expression

            this.laserActiveImageElement.offsetHeight; // NOSONAR // Trigger reflow to restart animation

            this.laserActiveImageElement.classList.add(BarcodePickerGui.flashColorClassName);
          }
        },
        {
          key: "flashViewfinder",
          value: function flashViewfinder() {
            this.viewfinderElement.classList.remove(BarcodePickerGui.flashWhiteClassName); // tslint:disable-next-line:no-unused-expression NOSONAR

            this.viewfinderElement.offsetHeight; // NOSONAR // Trigger reflow to restart animation

            this.viewfinderElement.classList.add(BarcodePickerGui.flashWhiteClassName);
          }
        },
        {
          key: "resizeIfNeeded",
          value: function resizeIfNeeded() {
            var forceResize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (forceResize) {
              this.lastKnownElementWidth = 0;
              this.lastKnownElementHeight = 0;
            } else if (
              this.lastKnownElementWidth === this.originElement.clientWidth &&
              this.lastKnownElementHeight === this.originElement.clientHeight
            ) {
              return;
            }

            if (this.singleImageMode) {
              this.resizeCameraUploadIfNeeded();
            } else {
              this.resizeVideoIfNeeded();
            }
          }
        },
        {
          key: "resizeCameraUploadIfNeeded",
          value: function resizeCameraUploadIfNeeded() {
            var width = this.cameraUploadElement.clientWidth;
            var height = this.cameraUploadElement.clientHeight;
            this.lastKnownElementWidth = width;
            this.lastKnownElementHeight = height;
            this.cameraUploadLabelElement.style.transform = "scale(".concat(
              Math.min(1, width / 500, height / 300),
              ")"
            );
            this.cameraUploadProgressElement.style.transform = "scale(".concat(
              Math.min(1, width / 500, height / 300),
              ")"
            );
          }
        },
        {
          key: "resizeVideoIfNeeded",
          value: function resizeVideoIfNeeded() {
            if (
              this.videoElement.videoHeight < 1 ||
              this.originElement.clientHeight < 1 ||
              (this.lastKnownElementWidth === this.originElement.clientWidth &&
                this.lastKnownElementHeight === this.originElement.clientHeight)
            ) {
              return;
            }

            this.parentElement.style.maxWidth = null;
            this.parentElement.style.maxHeight = null;
            var videoRatio = this.videoElement.videoWidth / this.videoElement.videoHeight;
            var width = this.originElement.clientWidth;
            var height = this.originElement.clientHeight;
            this.lastKnownElementWidth = width;
            this.lastKnownElementHeight = height;

            if (this.videoFit === exports.BarcodePicker.ObjectFit.COVER) {
              var widthPercentage = 1;
              var heightPercentage = 1;

              if (videoRatio < width / height) {
                heightPercentage = Math.min(1, height / (width / videoRatio));
              } else {
                widthPercentage = Math.min(1, width / (height * videoRatio));
              }

              this.scanner.applyScanSettings(
                this.scanner.getScanSettings().setBaseSearchArea({
                  x: (1 - widthPercentage) / 2,
                  y: (1 - heightPercentage) / 2,
                  width: widthPercentage,
                  height: heightPercentage
                })
              );
              return;
            }

            if (videoRatio > width / height) {
              height = width / videoRatio;
            } else {
              width = height * videoRatio;
            }

            this.parentElement.style.maxWidth = "".concat(Math.ceil(width), "px");
            this.parentElement.style.maxHeight = "".concat(Math.ceil(height), "px");
            window.objectFitPolyfill(this.videoElement);
          }
        },
        {
          key: "checkAndRecoverPlayback",
          value: function checkAndRecoverPlayback() {
            if (
              this.cameraManager != null &&
              this.cameraManager.activeCamera != null &&
              this.videoElement != null &&
              this.videoElement.srcObject != null
            ) {
              if (!this.videoElement.srcObject.active) {
                this.cameraManager.reinitializeCamera();
              } else {
                this.playVideo();
              }
            }
          }
        },
        {
          key: "updateCameraUploadProgress",
          value: function updateCameraUploadProgress(progressPercentageValue) {
            this.cameraUploadProgressElement.setAttribute("data-progress", progressPercentageValue);
          }
        },
        {
          key: "cameraUploadImageLoad",
          value: function cameraUploadImageLoad(image) {
            this.updateCameraUploadProgress("100");
            var resizedImageWidth;
            var resizedImageHeight;
            var resizedImageSizeLimit = 1440;

            if (image.naturalWidth <= resizedImageSizeLimit && image.naturalHeight <= resizedImageSizeLimit) {
              resizedImageWidth = image.naturalWidth;
              resizedImageHeight = image.naturalHeight;
            } else {
              if (image.naturalWidth > image.naturalHeight) {
                resizedImageWidth = resizedImageSizeLimit;
                resizedImageHeight = Math.round((image.naturalHeight / image.naturalWidth) * resizedImageSizeLimit);
              } else {
                resizedImageWidth = Math.round((image.naturalWidth / image.naturalHeight) * resizedImageSizeLimit);
                resizedImageHeight = resizedImageSizeLimit;
              }
            }

            this.cameraUploadFileProcess(image, resizedImageWidth, resizedImageHeight);
          }
        },
        {
          key: "cameraUploadFileProcess",
          value: function cameraUploadFileProcess(image, width, height) {
            var _this4 = this;

            this.videoImageCanvasContext.canvas.width = width;
            this.videoImageCanvasContext.canvas.height = height;
            this.videoImageCanvasContext.drawImage(image, 0, 0, width, height);
            this.scanner.applyImageSettings({
              width: width,
              height: height,
              format: exports.ImageSettings.Format.RGBA_8U
            });
            this.setCameraUploadGuiAvailable(false);
            this.cameraUploadCallback().then(function() {
              _this4.setCameraUploadGuiAvailable(true);
            });
          }
        },
        {
          key: "cameraUploadFile",
          value: function cameraUploadFile() {
            var _this5 = this;

            var files = this.cameraUploadInputElement.files;

            if (files != null && files.length !== 0) {
              var image = new Image();
              var fileReader = new FileReader();

              fileReader.onload = function(event) {
                _this5.cameraUploadInputElement.value = "";

                if (event.target != null) {
                  image.onload = _this5.cameraUploadImageLoad.bind(_this5, image);

                  image.onprogress = function(event2) {
                    if (event2.lengthComputable) {
                      var progress = Math.round((event2.loaded / event2.total) * 20) * 5;

                      if (progress <= 100) {
                        _this5.updateCameraUploadProgress(progress.toString());
                      }
                    }
                  };

                  image.src = event.target.result;
                }
              };

              this.updateCameraUploadProgress("0");
              fileReader.readAsDataURL(files[0]);
            }
          }
        },
        {
          key: "setupCameraSwitcher",
          value: function setupCameraSwitcher() {
            var _this6 = this;

            this.cameraSwitcherElement.src = switchCameraImage;
            this.cameraSwitcherElement.className = BarcodePickerGui.cameraSwitcherElementClassName;
            this.cameraSwitcherElement.classList.add(BarcodePickerGui.hiddenClassName);
            this.parentElement.appendChild(this.cameraSwitcherElement);
            ["touchstart", "mousedown"].forEach(function(eventName) {
              _this6.cameraSwitcherElement.addEventListener(eventName, function(event) {
                if (_this6.cameraManager != null) {
                  var cameraManager = _this6.cameraManager;
                  event.preventDefault();
                  exports.CameraAccess.getCameras()
                    .then(function(cameras) {
                      var newCameraIndex =
                        (cameras.findIndex(function(camera) {
                          return (
                            camera.deviceId ===
                            (cameraManager.activeCamera == null ? camera.deviceId : cameraManager.activeCamera.deviceId)
                          );
                        }) +
                          1) %
                        cameras.length;
                      cameraManager
                        .initializeCameraWithSettings(cameras[newCameraIndex], cameraManager.activeCameraSettings)
                        .catch(console.error);
                    })
                    .catch(console.error);
                }
              });
            });
          }
        },
        {
          key: "setupTorchToggler",
          value: function setupTorchToggler() {
            var _this7 = this;

            this.torchTogglerElement.src = toggleTorchImage;
            this.torchTogglerElement.className = BarcodePickerGui.torchTogglerElementClassName;
            this.torchTogglerElement.classList.add(BarcodePickerGui.hiddenClassName);
            this.parentElement.appendChild(this.torchTogglerElement);
            ["touchstart", "mousedown"].forEach(function(eventName) {
              _this7.torchTogglerElement.addEventListener(eventName, function(event) {
                if (_this7.cameraManager != null) {
                  event.preventDefault();

                  _this7.cameraManager.toggleTorch();
                }
              });
            });
          }
        },
        {
          key: "showScanditLogo",
          value: function showScanditLogo(hideLogo, licenseFeatures) {
            if (hideLogo && licenseFeatures != null && licenseFeatures.hiddenScanditLogoAllowed) {
              return;
            }

            var scanditLogoImageElement = document.createElement("img");
            scanditLogoImageElement.src = scanditLogoImage;
            scanditLogoImageElement.className = BarcodePickerGui.scanditLogoImageElementClassName;
            this.parentElement.appendChild(scanditLogoImageElement);
          }
        },
        {
          key: "handleNewScanSettings",
          value: function handleNewScanSettings() {
            if (this.customLaserArea == null) {
              this.setLaserArea();
            }

            if (this.customViewfinderArea == null) {
              this.setViewfinderArea();
            }
          }
        }
      ]);

      return BarcodePickerGui;
    })();
  BarcodePickerGui.grandParentElementClassName = "scandit scandit-container";
  BarcodePickerGui.parentElementClassName = "scandit scandit-barcode-picker";
  BarcodePickerGui.hiddenClassName = "scandit-hidden";
  BarcodePickerGui.hiddenOpacityClassName = "scandit-hidden-opacity";
  BarcodePickerGui.videoElementClassName = "scandit-video";
  BarcodePickerGui.laserContainerElementClassName = "scandit-laser";
  BarcodePickerGui.viewfinderElementClassName = "scandit-viewfinder";
  BarcodePickerGui.cameraSwitcherElementClassName = "scandit-camera-switcher";
  BarcodePickerGui.torchTogglerElementClassName = "scandit-torch-toggle";
  BarcodePickerGui.cameraUploadElementClassName = "scandit-camera-upload";
  BarcodePickerGui.flashColorClassName = "scandit-flash-color";
  BarcodePickerGui.flashWhiteClassName = "scandit-flash-white";
  BarcodePickerGui.flashWhiteInsetClassName = "scandit-flash-white-inset";
  BarcodePickerGui.opacityPulseClassName = "scandit-opacity-pulse";
  BarcodePickerGui.mirroredClassName = "mirrored";
  BarcodePickerGui.pausedClassName = "paused";

  /**
   * @hidden
   *
   * A dummy barcode picker utility class used to (not) handle camera interaction.
   */
  // istanbul ignore next

  var DummyCameraManager =
    /*#__PURE__*/
    (function(_CameraManager) {
      inherits(DummyCameraManager, _CameraManager);

      function DummyCameraManager() {
        classCallCheck(this, DummyCameraManager);

        return possibleConstructorReturn(this, getPrototypeOf$2(DummyCameraManager).apply(this, arguments));
      }

      createClass(DummyCameraManager, [
        {
          key: "setInteractionOptions",
          value: function setInteractionOptions(_1, _2, _3, _4) {
            return;
          }
        },
        {
          key: "isCameraSwitcherEnabled",
          value: function isCameraSwitcherEnabled() {
            return false;
          }
        },
        {
          key: "setCameraSwitcherEnabled",
          value: function setCameraSwitcherEnabled(_1) {
            return promise$1.resolve();
          }
        },
        {
          key: "isTorchToggleEnabled",
          value: function isTorchToggleEnabled() {
            return false;
          }
        },
        {
          key: "setTorchToggleEnabled",
          value: function setTorchToggleEnabled(_1) {
            return;
          }
        },
        {
          key: "isTapToFocusEnabled",
          value: function isTapToFocusEnabled() {
            return false;
          }
        },
        {
          key: "setTapToFocusEnabled",
          value: function setTapToFocusEnabled(_1) {
            return;
          }
        },
        {
          key: "isPinchToZoomEnabled",
          value: function isPinchToZoomEnabled() {
            return false;
          }
        },
        {
          key: "setPinchToZoomEnabled",
          value: function setPinchToZoomEnabled(_1) {
            return;
          }
        },
        {
          key: "setSelectedCamera",
          value: function setSelectedCamera(_1) {
            return;
          }
        },
        {
          key: "setSelectedCameraSettings",
          value: function setSelectedCameraSettings(_1) {
            return;
          }
        },
        {
          key: "setupCameras",
          value: function setupCameras() {
            return promise$1.resolve();
          }
        },
        {
          key: "stopStream",
          value: function stopStream() {
            return;
          }
        },
        {
          key: "applyCameraSettings",
          value: function applyCameraSettings(_1) {
            return promise$1.resolve();
          }
        },
        {
          key: "reinitializeCamera",
          value: function reinitializeCamera() {
            return;
          }
        },
        {
          key: "initializeCameraWithSettings",
          value: function initializeCameraWithSettings(_1, _2) {
            return promise$1.resolve();
          }
        },
        {
          key: "setTorchEnabled",
          value: function setTorchEnabled(_1) {
            return;
          }
        },
        {
          key: "toggleTorch",
          value: function toggleTorch() {
            return;
          }
        },
        {
          key: "setZoom",
          value: function setZoom(_1, _2) {
            return;
          }
        }
      ]);

      return DummyCameraManager;
    })(CameraManager);

  var $JSON$1 = _core$1.JSON || (_core$1.JSON = { stringify: JSON.stringify });
  var stringify = function stringify(it) {
    // eslint-disable-line no-unused-vars
    return $JSON$1.stringify.apply($JSON$1, arguments);
  };

  var stringify$1 = stringify;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * @hidden
   * @returns Engine
   */
  // tslint:disable-next-line:max-func-body-length
  function engine() {
    var scanQueue = [];
    var parseQueue = [];
    var gpuAccelerationAvailable = typeof self.OffscreenCanvas === "function";
    var imageBufferPointer;
    var licenseKey;
    var settings;
    var imageSettings;
    var scanWorkSubmitted = false;
    var fileSystemSynced = false;
    var runtimeLoaded = false;
    var wasmReady = false;
    var scannerSettingsReady = false;
    var scannerImageSettingsReady = false;
    var contextAvailable = false;
    var fsSyncInProgress;
    var fsSyncScheduled = false; // Public
    // Promise is used only during testing

    function loadLibrary(deviceId, libraryLocation, locationPath) {
      function start() {
        if (!wasmReady && fileSystemSynced && runtimeLoaded) {
          wasmReady = true;
          Module.callMain();
          postMessage(["status", "ready"]);
          workOnScanQueue();
          workOnParseQueue();
        }
      }

      var _getLibraryLocationUR = getLibraryLocationURIs(libraryLocation),
        jsURI = _getLibraryLocationUR.jsURI,
        wasmURI = _getLibraryLocationUR.wasmURI;

      Module = {
        arguments: [deviceId],
        canvas: gpuAccelerationAvailable
          ? new self.OffscreenCanvas(32, 32)
          : /* istanbul ignore next */
            undefined,
        instantiateWasm: function instantiateWasm(importObject, successCallback) {
          // wasmJSVersion is globally defined inside scandit-engine-sdk.min.js
          var wasmJSVersion = self.wasmJSVersion; // istanbul ignore if

          if (wasmJSVersion == null) {
            wasmJSVersion = "undefined";
          } // istanbul ignore if

          if (wasmJSVersion !== "4.4.0") {
            console.error(
              "The Scandit SDK Engine library JS file found at ".concat(jsURI, " seems invalid: ") +
                "expected version doesn't match (received: ".concat(wasmJSVersion, ", expected: ", "4.4.0", "). ") +
                "Please ensure the correct Scandit SDK Engine file (with correct version) is retrieved."
            );
          }

          if (typeof self.WebAssembly.instantiateStreaming === "function") {
            instantiateWebAssemblyStreaming(importObject, wasmURI, successCallback);
          } else {
            instantiateWebAssembly(importObject, wasmURI, successCallback);
          }

          return {};
        },
        noInitialRun: true,
        preRun: function preRun() {
          try {
            FS.mkdir("/scandit_sync_folder");
          } catch (error) {
            // istanbul ignore next
            if (error.code !== "EEXIST") {
              throw error;
            }
          }

          FS.mount(IDBFS, {}, "/scandit_sync_folder");
          FS.syncfs(true, function() {
            fileSystemSynced = true;
            start();
          });
        },
        onRuntimeInitialized: function onRuntimeInitialized() {
          runtimeLoaded = true;
          start();
        }
      };
      self.window = self.document = self; // Fix some Emscripten quirks

      self.path = locationPath; // Used by the Scandit SDK Engine library

      function tryImportScripts() {
        try {
          var importScriptsResults = importScripts(jsURI); // istanbul ignore else

          if (importScriptsResults != null) {
            return importScriptsResults;
          } else {
            return Promise.resolve();
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return retryWithExponentialBackoff(tryImportScripts, 250, 4000, function(error) {
        console.warn(error);
        console.warn("Couldn't retrieve Scandit SDK Engine library at ".concat(jsURI, ", retrying..."));
      })["catch"](function(error) {
        console.error(error);
        console.error(
          "Couldn't retrieve Scandit SDK Engine library at ".concat(
            jsURI,
            ", did you configure the path for it correctly?"
          )
        );
        return Promise.resolve(error); // Promise is used only during testing
      });
    }

    function createContext(newLicenseKey) {
      licenseKey = newLicenseKey;

      if (contextAvailable || licenseKey == null || !wasmReady) {
        return;
      }

      var licenseKeyLength = Module.lengthBytesUTF8(licenseKey) + 1;

      var licenseKeyPointer = Module._malloc(licenseKeyLength);

      Module.stringToUTF8(licenseKey, licenseKeyPointer, licenseKeyLength);

      Module._create_context(licenseKeyPointer, false);

      Module._free(licenseKeyPointer);

      contextAvailable = true;
      postMessage([
        "license-features",
        {
          hiddenScanditLogoAllowed: Module._can_hide_logo() === 1
        }
      ]);
    }

    function setSettings(newSettings) {
      settings = newSettings;
      applySettings();
    }

    function setImageSettings(newImageSettings) {
      imageSettings = newImageSettings;
      applyImageSettings();
    }

    function processScanWorkUnit(currentScanWorkUnit) {
      var resultData;

      if (currentScanWorkUnit.highQualitySingleFrameMode) {
        applySettings(true);
      } // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime

      if (imageSettings.format.valueOf() === 1) {
        // RGB_8U
        resultData = scanImage(convertImageDataToGrayscale(currentScanWorkUnit.data, 3));
      } else if (imageSettings.format.valueOf() === 2) {
        // RGBA_8U
        resultData = scanImage(convertImageDataToGrayscale(currentScanWorkUnit.data, 4));
      } else {
        // GRAY_8U
        resultData = scanImage(currentScanWorkUnit.data);
      }

      if (currentScanWorkUnit.highQualitySingleFrameMode) {
        applySettings(false);
      }

      var result = JSON.parse(resultData);

      if (result.error != null) {
        postMessage([
          "work-error",
          {
            requestId: currentScanWorkUnit.requestId,
            error: result.error
          }
        ]);
      } else {
        // istanbul ignore else
        if (result.scanResult != null) {
          if (result.scanResult.length > 0 || fsSyncInProgress == null) {
            syncFS();
          }

          postMessage([
            "work-result",
            {
              requestId: currentScanWorkUnit.requestId,
              result: result
            }
          ]);
        } else {
          console.error("Unrecognized Scandit Engine result:", result);
          postMessage([""], [currentScanWorkUnit.data.buffer]);
        }
      }
    }

    function workOnScanQueue() {
      if ((!scannerSettingsReady || !scannerImageSettingsReady) && scanQueue.length !== 0) {
        // First submitted work unit
        createContext(licenseKey);
        applySettings();
        applyImageSettings();
      }

      if (!scannerSettingsReady || !scannerImageSettingsReady || scanQueue.length === 0) {
        return;
      }

      while (scanQueue.length !== 0) {
        processScanWorkUnit(scanQueue.shift());
      }
    }

    function workOnParseQueue() {
      if (!contextAvailable && parseQueue.length !== 0) {
        // First submitted work unit
        createContext(licenseKey);
      }

      if (!contextAvailable || !wasmReady || parseQueue.length === 0) {
        return;
      }

      var currentParseWorkUnit;
      var resultData;

      while (parseQueue.length !== 0) {
        currentParseWorkUnit = parseQueue.shift();
        resultData = parseString(
          currentParseWorkUnit.dataFormat,
          currentParseWorkUnit.dataString,
          currentParseWorkUnit.options
        );
        var result = JSON.parse(resultData);

        if (result.error != null) {
          postMessage([
            "parse-string-error",
            {
              requestId: currentParseWorkUnit.requestId,
              error: result.error
            }
          ]);
        } else {
          // istanbul ignore else
          if (result.result != null) {
            postMessage([
              "parse-string-result",
              {
                requestId: currentParseWorkUnit.requestId,
                result: result.result
              }
            ]);
          } else {
            console.error("Unrecognized Scandit Parser result:", result);
            postMessage([
              "parse-string-error",
              {
                requestId: currentParseWorkUnit.requestId,
                error: {
                  errorCode: -1,
                  errorMessage: "Unknown Scandit Parser error"
                }
              }
            ]);
          }
        }
      }

      syncFS();
    }

    function addScanWorkUnit(scanWorkUnit) {
      scanWorkSubmitted = true;
      scanQueue.push(scanWorkUnit);
      workOnScanQueue();
    }

    function addParseWorkUnit(parseWorkUnit) {
      parseQueue.push(parseWorkUnit);
      workOnParseQueue();
    }

    function clearSession() {
      if (scannerSettingsReady) {
        Module._scanner_session_clear();
      }
    } // Private

    function retryWithExponentialBackoff(handler, backoffMs, maxBackoffMs, singleTryRejectionCallback) {
      return new Promise(function(resolve, reject) {
        handler()
          .then(resolve)
          ["catch"](function(error) {
            var newBackoffMs = backoffMs * 2;

            if (newBackoffMs > maxBackoffMs) {
              return reject(error);
            }

            singleTryRejectionCallback(error);
            setTimeout(function() {
              retryWithExponentialBackoff(handler, newBackoffMs, maxBackoffMs, singleTryRejectionCallback)
                .then(resolve)
                ["catch"](reject);
            }, backoffMs);
          });
      });
    }

    function getLibraryLocationURIs(libraryLocation) {
      var cdnURI = false;

      if (/^https?:\/\/([^\/.]*\.)*cdn.jsdelivr.net\//.test(libraryLocation)) {
        libraryLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@4.4.0/build/";
        cdnURI = true;
      } else if (/^https?:\/\/([^\/.]*\.)*unpkg.com\//.test(libraryLocation)) {
        libraryLocation = "https://unpkg.com/scandit-sdk@4.4.0/build/";
        cdnURI = true;
      }

      if (cdnURI) {
        return {
          jsURI: "".concat(libraryLocation, "scandit-engine-sdk.min.js"),
          wasmURI: "".concat(libraryLocation, "scandit-engine-sdk.wasm")
        };
      }

      return {
        jsURI: "".concat(libraryLocation, "scandit-engine-sdk.min.js?v=4.4.0"),
        wasmURI: "".concat(libraryLocation, "scandit-engine-sdk.wasm?v=4.4.0")
      };
    }

    function arrayBufferToHexString(arrayBuffer) {
      return Array.from(new Uint8Array(arrayBuffer))
        .map(function(byteNumber) {
          var byteHex = byteNumber.toString(16);
          return byteHex.length === 1
            ? /* istanbul ignore next */
              "0".concat(byteHex)
            : byteHex;
        })
        .join("");
    }

    function applySettings() {
      var highQualitySingleFrameMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (settings == null || !contextAvailable || !wasmReady || !scanWorkSubmitted) {
        return;
      }

      scannerSettingsReady = false;
      var parsedSettings = JSON.parse(settings);
      var settingsLength = Module.lengthBytesUTF8(settings) + 1;

      var settingsPointer = Module._malloc(settingsLength);

      Module.stringToUTF8(settings, settingsPointer, settingsLength);

      var resultPointer = Module._scanner_settings_new_from_json(
        settingsPointer,
        parsedSettings.blurryRecognition,
        parsedSettings.matrixScanEnabled,
        highQualitySingleFrameMode,
        gpuAccelerationAvailable && parsedSettings.gpuAcceleration
      );

      Module._free(settingsPointer);

      var result = Module.UTF8ToString(resultPointer);

      if (result !== "") {
        scannerSettingsReady = true;
        console.debug(JSON.parse(result));
      }
    }

    function applyImageSettings() {
      if (imageSettings == null || !wasmReady || !scanWorkSubmitted) {
        return;
      }

      scannerImageSettingsReady = false; // We allocate for a grayscale image only as we will do a conversion here in the worker before passing it

      Module._scanner_image_settings_new(imageSettings.width, imageSettings.height, 1);

      if (imageBufferPointer != null) {
        Module._free(imageBufferPointer);

        imageBufferPointer = undefined;
      }

      imageBufferPointer = Module._malloc(imageSettings.width * imageSettings.height);
      scannerImageSettingsReady = true;
    }

    function convertImageDataToGrayscale(imageData, channels) {
      var grayscaleImageData = new Uint8ClampedArray(imageData.length / channels);
      var grayscaleImageDataIndex = imageData.length / channels - 1;
      var imageDataIndex = imageData.length - channels;

      while (imageDataIndex >= 0) {
        grayscaleImageData[grayscaleImageDataIndex--] =
          imageData[imageDataIndex] * 0.299 +
          imageData[imageDataIndex + 1] * 0.587 +
          imageData[imageDataIndex + 2] * 0.114;
        imageDataIndex -= channels;
      }

      return grayscaleImageData;
    }

    function scanImage(imageData) {
      Module.HEAPU8.set(imageData, imageBufferPointer);
      return Module.UTF8ToString(Module._scanner_scan(imageBufferPointer));
    }

    function parseString(dataFormat, dataString, options) {
      var dataStringLength = Module.lengthBytesUTF8(dataString) + 1;

      var dataStringPointer = Module._malloc(dataStringLength);

      Module.stringToUTF8(dataString, dataStringPointer, dataStringLength);
      var optionsLength = Module.lengthBytesUTF8(options) + 1;

      var optionsPointer = Module._malloc(optionsLength);

      Module.stringToUTF8(options, optionsPointer, optionsLength);

      var resultPointer = Module._parser_parse_string(
        dataFormat.valueOf(),
        dataStringPointer,
        dataStringLength - 1,
        optionsPointer
      );

      Module._free(dataStringPointer);

      Module._free(optionsPointer);

      return Module.UTF8ToString(resultPointer);
    }

    function verifiedWasmFetch(wasmURI, awaitFullResponse) {
      function verifyResponseData(responseData) {
        // istanbul ignore else
        if (
          crypto.subtle != null &&
          _typeof(crypto.subtle) === "object" &&
          typeof crypto.subtle.digest === "function"
        ) {
          crypto.subtle.digest("SHA-256", responseData).then(function(hash) {
            var hashString = arrayBufferToHexString(hash); // istanbul ignore if

            if (hashString !== "db47c76cfbc6c82736dcf6ae97c6d2d2eb8055e9461e2acc0cc050880a6c0252") {
              console.error(
                "The Scandit SDK Engine library WASM file found at ".concat(wasmURI, " seems invalid: ") +
                  "expected file hash doesn't match (received: ".concat(hashString, ", ") +
                  "expected: ".concat("db47c76cfbc6c82736dcf6ae97c6d2d2eb8055e9461e2acc0cc050880a6c0252", "). ") +
                  "Please ensure the correct Scandit SDK Engine file (with correct version) is retrieved."
              );
            }
          });
        } else {
          console.warn(
            "Insecure origin (see https://goo.gl/Y0ZkNV): " +
              "The hash of the Scandit SDK Engine library WASM file found at ".concat(wasmURI, " could not be verified")
          );
        }
      }

      function tryFetch() {
        return new Promise(function(resolve, reject) {
          fetch(wasmURI)
            .then(function(response) {
              // istanbul ignore else
              if (response.ok) {
                response
                  .clone()
                  .arrayBuffer()
                  .then(function(responseData) {
                    if (awaitFullResponse) {
                      resolve(response);
                    }

                    verifyResponseData(responseData);
                  })
                  ["catch"](
                    // istanbul ignore next
                    function(error) {
                      if (awaitFullResponse) {
                        reject(error);
                      }
                    }
                  );

                if (!awaitFullResponse) {
                  resolve(response);
                }
              } else {
                reject(new Error("HTTP status code is not ok"));
              }
            })
            ["catch"](function(error) {
              reject(error);
            });
        });
      }

      return retryWithExponentialBackoff(tryFetch, 250, 4000, function(error) {
        console.warn(error);
        console.warn("Couldn't retrieve Scandit SDK Engine library at ".concat(wasmURI, ", retrying..."));
      })["catch"](function(error) {
        console.error(error);
        console.error(
          "Couldn't retrieve/instantiate Scandit SDK Engine library at ".concat(wasmURI, ", ") +
            "did you configure the path for it correctly?"
        );
        return Promise.reject(error);
      });
    }

    function instantiateWebAssembly(importObject, wasmURI, successCallback) {
      verifiedWasmFetch(wasmURI, true)
        .then(function(response) {
          return response.arrayBuffer();
        })
        .then(function(bytes) {
          return self.WebAssembly.instantiate(bytes, importObject)
            .then(function(results) {
              successCallback(results.instance);
            })
            ["catch"](function(error) {
              console.error(error);
              console.error(
                "Couldn't instantiate Scandit SDK Engine library at ".concat(wasmURI, ", ") +
                  "did you configure the path for it correctly?"
              );
            });
        })
        ["catch"](
          /* istanbul ignore next */
          function() {
            // Ignored
          }
        );
    }

    function instantiateWebAssemblyStreaming(importObject, wasmURI, successCallback) {
      verifiedWasmFetch(wasmURI, false)
        .then(function(response) {
          self.WebAssembly.instantiateStreaming(response, importObject)
            .then(function(results) {
              successCallback(results.instance);
            })
            ["catch"](function(error) {
              console.warn(error);
              console.warn(
                "WebAssembly streaming compile failed. " +
                  "Falling back to ArrayBuffer instantiation (this will make things slower)"
              );
              instantiateWebAssembly(importObject, wasmURI, successCallback);
            });
        })
        ["catch"](
          /* istanbul ignore next */
          function() {
            // Ignored
          }
        );
    }

    function syncFS() {
      // istanbul ignore if
      if (fsSyncInProgress === true) {
        fsSyncScheduled = true;
      } else {
        fsSyncInProgress = true;
        fsSyncScheduled = false;
        FS.syncfs(false, function() {
          fsSyncInProgress = false; // istanbul ignore if

          if (fsSyncScheduled) {
            syncFS();
          }
        });
      }
    }

    return {
      loadLibrary: loadLibrary,
      createContext: createContext,
      setSettings: setSettings,
      setImageSettings: setImageSettings,
      workOnScanQueue: workOnScanQueue,
      workOnParseQueue: workOnParseQueue,
      addScanWorkUnit: addScanWorkUnit,
      addParseWorkUnit: addParseWorkUnit,
      clearSession: clearSession
    };
  }
  /**
   * @hidden
   */
  // istanbul ignore next

  function engineWorkerFunction() {
    var engineInstance = engine();

    onmessage = function onmessage(e) {
      // Setting settings triggers license verification and activation: delay until first frame processed
      var data = e.data;

      switch (data.type) {
        case "load-library":
          engineInstance.loadLibrary(data.deviceId, data.libraryLocation, data.path);
          break;

        case "license-key":
          engineInstance.createContext(data.licenseKey);
          engineInstance.workOnParseQueue();
          break;

        case "settings":
          engineInstance.setSettings(data.settings);
          engineInstance.workOnScanQueue();
          break;

        case "image-settings":
          engineInstance.setImageSettings(data.imageSettings);
          engineInstance.workOnScanQueue();
          break;

        case "work":
          engineInstance.addScanWorkUnit({
            requestId: data.requestId,
            data: data.data,
            highQualitySingleFrameMode: data.highQualitySingleFrameMode
          });
          break;

        case "parse-string":
          engineInstance.addParseWorkUnit({
            requestId: data.requestId,
            dataFormat: data.dataFormat,
            dataString: data.dataString,
            options: data.options
          });
          break;

        case "clear-session":
          engineInstance.clearSession();
          break;

        default:
          break;
      }
    };
  }
  /**
   * @hidden
   */

  var engineWorkerBlob = new Blob(
    ["var Module;".concat(engine.toString(), "(").concat(engineWorkerFunction.toString(), ")()")],
    {
      type: "text/javascript"
    }
  );

  /**
   * A data string parser.
   *
   * Parsers are capable of parsing one particular data format, which is passed to them during construction.
   *
   * The parser is created through [[BarcodePicker.createParserForFormat]] or [[Scanner.createParserForFormat]].
   * Note that you need to have a valid license with the parsing feature enabled to use the parser functionalities.
   *
   * For documentation on the available formats, check the official parser library documentation here:
   * https://docs.scandit.com/parser/formats.html.
   */
  exports.Parser =
    /*#__PURE__*/
    (function() {
      /**
       * @hidden
       *
       * @param scanner The [[Scanner]] object used to interact with the external Scandit library.
       * @param dataFormat The data format for this parser.
       */
      function Parser(scanner, dataFormat) {
        classCallCheck(this, Parser);

        this.scanner = scanner;
        this.dataFormat = dataFormat;
      }
      /**
       * Apply the option map to the parser, allowing the user to fine-tune the behaviour of the parser.
       * Available options depend on the data format and are specified in the respective documentation.
       *
       * @param options The new options to be applied (replacing previous ones, if any).
       */

      createClass(Parser, [
        {
          key: "setOptions",
          value: function setOptions(options) {
            this.options = options;
          }
          /**
           * Process the given raw data with the parser, retrieving the result as a [[ParserResult]] object.
           *
           * Multiple requests done without waiting for previous results will be queued and handled in order.
           *
           * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
           *
           * @param dataRaw The raw data to be parsed.
           * @returns A promise resolving to the [[ParserResult]] object.
           */
        },
        {
          key: "parseRawData",
          value: function parseRawData(dataRaw) {
            var dataString = "";

            try {
              dataRaw.forEach(function(_byte) {
                dataString += String.fromCharCode(_byte);
              });
              dataString = decodeURIComponent(escape(dataString));
            } catch (error) {
              dataString = "";
            }

            return this.scanner.parseString(this.dataFormat, dataString, this.options);
          }
          /**
           * Process the given string data with the parser, retrieving the result as a [[ParserResult]] object.
           *
           * Multiple requests done without waiting for previous results will be queued and handled in order.
           *
           * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
           *
           * @param dataString The string to be parsed.
           * @returns A promise resolving to the [[ParserResult]] object.
           */
        },
        {
          key: "parseString",
          value: function parseString(dataString) {
            return this.scanner.parseString(this.dataFormat, dataString, this.options);
          }
        }
      ]);

      return Parser;
    })(); // istanbul ignore next

  (function(Parser) {
    /**
     * Data format of a string to be parsed into a set of key-value mappings by the Scandit Parser Library.
     *
     * See https://docs.scandit.com/parser/formats.html for more details.
     */
    var DataFormat;

    (function(DataFormat) {
      /**
       * GS1 Application Identifier (AI).
       *
       * See: http://www.gs1.org/docs/barcodes/GS1_General_Specifications.pdf.
       */
      DataFormat[(DataFormat["GS1_AI"] = 1)] = "GS1_AI";
      /**
       * Health Industry Bar Code (HIBC).
       *
       * See: http://www.hibcc.org.
       */

      DataFormat[(DataFormat["HIBC"] = 2)] = "HIBC";
      /**
       * AAMVA Driver License/Identification (DL/ID).
       *
       * See: http://www.aamva.org.
       */

      DataFormat[(DataFormat["DLID"] = 3)] = "DLID";
      /**
       * ICAO Machine Readable Travel Document (MRTD).
       *
       * See: https://www.icao.int.
       */

      DataFormat[(DataFormat["MRTD"] = 4)] = "MRTD";
      /**
       * Swiss QR ISO 20022.
       *
       * See: https://www.paymentstandards.ch.
       */

      DataFormat[(DataFormat["SWISSQR"] = 5)] = "SWISSQR";
    })((DataFormat = Parser.DataFormat || (Parser.DataFormat = {})));
  })(exports.Parser || (exports.Parser = {}));

  var SET = "Set";

  // 23.2 Set Objects
  var es6_set = _collection(
    SET,
    function(get) {
      return function Set() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    },
    {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return _collectionStrong.def(_validateCollection(this, SET), (value = value === 0 ? 0 : value), value);
      }
    },
    _collectionStrong
  );

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON

  _export$1(_export$1.P + _export$1.R, "Set", { toJSON: _collectionToJson("Set") });

  // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
  _setCollectionOf("Set");

  // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
  _setCollectionFrom("Set");

  var set = _core$1.Set;

  var set$1 = set;

  /**
   * A result of a scanning operation on an image.
   */
  var ScanResult =
    /*#__PURE__*/
    (function() {
      /**
       * @hidden
       *
       * Create a ScanResult instance.
       *
       * @param barcodes The list of barcodes found in the image.
       * @param imageData The image data given as a byte array, formatted accordingly to the set settings.
       * @param imageSettings The configuration object defining the properties of the processed image.
       */
      function ScanResult(barcodes, imageData, imageSettings) {
        classCallCheck(this, ScanResult);

        this.barcodes = barcodes;
        this.imageData = imageData;
        this.imageSettings = imageSettings;
        this.rejectedCodes = new set$1();
      }
      /**
       * Prevent playing a sound, vibrating or flashing the GUI for a particular code.
       * If all codes in the result are rejected (or no barcode is present), sound, vibration and GUI flashing will be
       * suppressed.
       *
       * Rejected codes will still be part of the [[ScanResult.barcodes]] property like all other codes.
       *
       * @param barcode The barcode to be rejected.
       */

      createClass(ScanResult, [
        {
          key: "rejectCode",
          value: function rejectCode(barcode) {
            this.rejectedCodes.add(barcode);
          }
        }
      ]);

      return ScanResult;
    })();

  var core_getIterator = (_core$1.getIterator = function(it) {
    var iterFn = core_getIteratorMethod(it);
    if (typeof iterFn != "function") throw TypeError(it + " is not iterable!");
    return _anObject$1(iterFn.call(it));
  });

  var getIterator = core_getIterator;

  var getIterator$1 = getIterator;

  var isEnum$1 = _objectPie.f;
  var _objectToArray = function(isEntries) {
    return function(it) {
      var O = _toIobject(it);
      var keys = _objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i)
        if (isEnum$1.call(O, (key = keys[i++]))) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }
      return result;
    };
  };

  // https://github.com/tc39/proposal-object-values-entries

  var $values = _objectToArray(false);

  _export$1(_export$1.S, "Object", {
    values: function values(it) {
      return $values(it);
    }
  });

  var values = _core$1.Object.values;

  var values$1 = values;

  /**
   * A symbology-specific configuration object.
   *
   * See https://docs.scandit.com/stable/c_api/symbologies.html for more details.
   */
  exports.SymbologySettings =
    /*#__PURE__*/
    (function() {
      /**
       * Create a SymbologySettings instance.
       *
       * @param enabled <div class="tsd-signature-symbol">Default =&nbsp;false</div>
       * Whether the symbology is enabled for recognition.
       * @param colorInvertedEnabled <div class="tsd-signature-symbol">Default =&nbsp;false</div>
       * Whether color inverted recognition is enabled.
       * @param activeSymbolCounts
       * <div class="tsd-signature-symbol">Default =&nbsp;[] &nbsp;(default symbology range)</div>
       * The list of active symbol counts.
       * @param extensions
       * <div class="tsd-signature-symbol">Default =&nbsp;undefined &nbsp;(default symbology extensions)</div>
       * The list/set of enabled extensions.
       * @param checksums
       * <div class="tsd-signature-symbol">Default =&nbsp;undefined &nbsp;(default symbology checksums)</div>
       * The list/set of enabled checksums.
       */
      function SymbologySettings() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$enabled = _ref.enabled,
          enabled = _ref$enabled === void 0 ? false : _ref$enabled,
          _ref$colorInvertedEna = _ref.colorInvertedEnabled,
          colorInvertedEnabled = _ref$colorInvertedEna === void 0 ? false : _ref$colorInvertedEna,
          _ref$activeSymbolCoun = _ref.activeSymbolCounts,
          activeSymbolCounts = _ref$activeSymbolCoun === void 0 ? [] : _ref$activeSymbolCoun,
          extensions = _ref.extensions,
          checksums = _ref.checksums;

        classCallCheck(this, SymbologySettings);

        this.enabled = enabled;
        this.colorInvertedEnabled = colorInvertedEnabled;
        this.activeSymbolCounts = activeSymbolCounts;
        this.customExtensions = extensions != null;
        this.customChecksums = checksums != null;

        if (extensions == null) {
          extensions = [];
        }

        if (checksums == null) {
          checksums = [];
        }

        this.extensions = new set$1(
          from_1$1(extensions).filter(function(e) {
            return e in SymbologySettings.Extension || values$1(SymbologySettings.Extension).includes(e.toLowerCase());
          })
        );
        this.checksums = new set$1(
          from_1$1(checksums).filter(function(c) {
            return c in SymbologySettings.Checksum || values$1(SymbologySettings.Checksum).includes(c.toLowerCase());
          })
        );
      }
      /**
       * @returns Whether the symbology enabled for recognition.
       */

      createClass(SymbologySettings, [
        {
          key: "isEnabled",
          value: function isEnabled() {
            return this.enabled;
          }
          /**
           * Enable or disable recognition of the symbology.
           *
           * @param enabled Whether the symbology is enabled for recognition.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "setEnabled",
          value: function setEnabled(enabled) {
            this.enabled = enabled;
            return this;
          }
          /**
           * @returns Whether color inverted recognition is enabled.
           */
        },
        {
          key: "isColorInvertedEnabled",
          value: function isColorInvertedEnabled() {
            return this.colorInvertedEnabled;
          }
          /**
           * Enable or disable recognition of inverted-color symbology (in addition to normal colors).
           *
           * @param enabled Whether color inverted recognition is enabled.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "setColorInvertedEnabled",
          value: function setColorInvertedEnabled(enabled) {
            this.colorInvertedEnabled = enabled;
            return this;
          }
          /**
           * Get the currently set custom list of active symbol counts.
           * If never set, an empty array is returned
           * but the Scandit Engine library will use the default list for the symbology.
           *
           * @returns The list of active symbol counts.
           */
        },
        {
          key: "getActiveSymbolCounts",
          value: function getActiveSymbolCounts() {
            return this.activeSymbolCounts;
          }
          /**
           * Set the list of active symbol counts.
           *
           * @param activeSymbolCounts The list of active symbol counts.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "setActiveSymbolCounts",
          value: function setActiveSymbolCounts(activeSymbolCounts) {
            this.activeSymbolCounts = activeSymbolCounts;
            return this;
          }
          /**
           * Set the (inclusive) range of active symbol counts.
           *
           * @param minCount The minimum accepted number of symbols.
           * @param maxCount The maximum accepted number of symbols.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "setActiveSymbolCountsRange",
          value: function setActiveSymbolCountsRange(minCount, maxCount) {
            this.activeSymbolCounts = from_1$1(
              {
                length: maxCount - minCount + 1
              },
              function(_, k) {
                return k + minCount;
              }
            );
            return this;
          }
          /**
           * Get the currently set custom set of extensions.
           * If never set, an empty set is returned
           * but the Scandit Engine library will use the default extension set for the symbology.
           *
           * @returns The set of enabled extensions.
           */
        },
        {
          key: "getEnabledExtensions",
          value: function getEnabledExtensions() {
            return this.extensions;
          }
          /**
           * Enable an extension or list/set of extensions
           *
           * @param extension The single extension or list/set of extensions to enable.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "enableExtensions",
          value: function enableExtensions(extension) {
            this.customExtensions = true;

            if (_typeof_1(extension) === "object") {
              this.extensions = new set$1(
                [].concat(
                  toConsumableArray(this.extensions),
                  toConsumableArray(
                    from_1$1(extension).filter(function(e) {
                      return (
                        e in SymbologySettings.Extension ||
                        values$1(SymbologySettings.Extension).includes(e.toLowerCase())
                      );
                    })
                  )
                )
              );
            } else {
              if (
                extension in SymbologySettings.Extension ||
                values$1(SymbologySettings.Extension).includes(extension.toLowerCase())
              ) {
                this.extensions.add(extension);
              }
            }

            return this;
          }
          /**
           * Disable an extension or list/set of extensions.
           *
           * @param extension The single extension or list/set of extensions to disable.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "disableExtensions",
          value: function disableExtensions(extension) {
            if (_typeof_1(extension) === "object") {
              this.extensions = new set$1(
                toConsumableArray(this.extensions).filter(function(x) {
                  return extension instanceof Array ? !extension.includes(x) : !extension.has(x);
                })
              );
            } else {
              this.extensions.delete(extension);
            }

            return this;
          }
          /**
           * Get the currently set custom set of checksums.
           * If never set, an empty set is returned
           * but the Scandit Engine library will use the default checksum set for the symbology.
           *
           * @returns The set of enabled checksums.
           */
        },
        {
          key: "getEnabledChecksums",
          value: function getEnabledChecksums() {
            return this.checksums;
          }
          /**
           * Enable a checksum or list/set of checksums.
           *
           * @param checksum The single checksum or list/set of checksums to enable.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "enableChecksums",
          value: function enableChecksums(checksum) {
            this.customChecksums = true;

            if (_typeof_1(checksum) === "object") {
              this.checksums = new set$1(
                [].concat(
                  toConsumableArray(this.checksums),
                  toConsumableArray(
                    from_1$1(checksum).filter(function(c) {
                      return (
                        c in SymbologySettings.Checksum ||
                        values$1(SymbologySettings.Checksum).includes(c.toLowerCase())
                      );
                    })
                  )
                )
              );
            } else {
              if (
                checksum in SymbologySettings.Checksum ||
                values$1(SymbologySettings.Checksum).includes(checksum.toLowerCase())
              ) {
                this.checksums.add(checksum);
              }
            }

            return this;
          }
          /**
           * Disable a checksum or list/set of checksums.
           *
           * @param checksum The single checksum or list/set of checksums to disable.
           * @returns The updated [[SymbologySettings]] object.
           */
        },
        {
          key: "disableChecksums",
          value: function disableChecksums(checksum) {
            if (_typeof_1(checksum) === "object") {
              this.checksums = new set$1(
                toConsumableArray(this.checksums).filter(function(x) {
                  return checksum instanceof Array ? !checksum.includes(x) : !checksum.has(x);
                })
              );
            } else {
              this.checksums.delete(checksum);
            }

            return this;
          }
        },
        {
          key: "toJSON",
          value: function toJSON() {
            return {
              enabled: this.enabled,
              colorInvertedEnabled: this.colorInvertedEnabled,
              activeSymbolCounts: this.activeSymbolCounts.length === 0 ? undefined : this.activeSymbolCounts,
              extensions: this.customExtensions ? from_1$1(this.extensions) : undefined,
              checksums: this.customChecksums ? from_1$1(this.checksums) : undefined
            };
          }
        }
      ]);

      return SymbologySettings;
    })(); // istanbul ignore next

  (function(SymbologySettings) {
    /**
     * Symbology extensions for particular functionalities, only applicable to specific barcodes.
     * See: https://docs.scandit.com/stable/c_api/symbologies.html.
     */
    var Extension;

    (function(Extension) {
      /**
       * Improve scan performance when reading direct part marked (DPM) Data Matrix codes.
       * Enabling this extension comes at the cost of increased frame processing times.
       */
      Extension["DIRECT_PART_MARKING_MODE"] = "direct_part_marking_mode";
      /**
       * Interpret the Code 39 / Code 93 code data using two symbols per output character to encode all ASCII characters.
       */

      Extension["FULL_ASCII"] = "full_ascii";
      /**
       * Enable scanning codes that have quiet zones (white area before and after the code) significantly smaller
       * than what's allowed by the symbology specification.
       */

      Extension["RELAXED_SHARP_QUIET_ZONE_CHECK"] = "relaxed_sharp_quiet_zone_check";
      /**
       * Remove the leading zero digit from the result.
       */

      Extension["REMOVE_LEADING_ZERO"] = "remove_leading_zero";
      /**
       * Remove the leading zero digit from the result if the UPC-A representation extension "RETURN_AS_UPCA" is enabled.
       */

      Extension["REMOVE_LEADING_UPCA_ZERO"] = "remove_leading_upca_zero";
      /**
       * Transform the UPC-E result into its UPC-A representation.
       */

      Extension["RETURN_AS_UPCA"] = "return_as_upca";
      /**
       * Remove the leading FNC1 character that indicates a GS1 code.
       */

      Extension["STRIP_LEADING_FNC1"] = "strip_leading_fnc1";
    })((Extension = SymbologySettings.Extension || (SymbologySettings.Extension = {})));
    /**
     * Checksum algorithms, only applicable to specific barcodes.
     * See: https://docs.scandit.com/stable/c_api/symbologies.html.
     */

    var Checksum;

    (function(Checksum) {
      /**
       * Modulo 10 checksum.
       */
      Checksum["MOD_10"] = "mod10";
      /**
       * Modulo 11 checksum.
       */

      Checksum["MOD_11"] = "mod11";
      /**
       * Modulo 16 checksum.
       */

      Checksum["MOD_16"] = "mod16";
      /**
       * Modulo 43 checksum.
       */

      Checksum["MOD_43"] = "mod43";
      /**
       * Modulo 47 checksum.
       */

      Checksum["MOD_47"] = "mod47";
      /**
       * Modulo 103 checksum.
       */

      Checksum["MOD_103"] = "mod103";
      /**
       * Two modulo 10 checksums.
       */

      Checksum["MOD_1010"] = "mod1010";
      /**
       * Modulo 11 and modulo 10 checksum.
       */

      Checksum["MOD_1110"] = "mod1110";
    })((Checksum = SymbologySettings.Checksum || (SymbologySettings.Checksum = {})));
  })(exports.SymbologySettings || (exports.SymbologySettings = {}));

  /**
   * A configuration object for scanning options.
   *
   * Modified ScanSettings need to be applied to a scanner via
   * [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
   */

  var ScanSettings =
    /*#__PURE__*/
    (function() {
      /**
       * Create a ScanSettings instance.
       *
       * @param enabledSymbologies <div class="tsd-signature-symbol">Default =&nbsp;[]</div>
       * The single symbology or list/set of symbologies that should be initialized as enabled for recognition.
       * @param codeDuplicateFilter <div class="tsd-signature-symbol">Default =&nbsp;0</div>
       * The duplicate filter specifying how often a code can be scanned.
       * When the filter is set to -1, each unique code is only scanned once. When set to 0,
       * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
       * When the same code (data/symbology) is scanned within the specified interval it is filtered out as a duplicate.
       * @param maxNumberOfCodesPerFrame <div class="tsd-signature-symbol">Default =&nbsp;1</div>
       * The maximum number of barcodes to be recognized every frame.
       * @param searchArea <div class="tsd-signature-symbol">Default =&nbsp;{ x: 0, y: 0, width: 1.0, height: 1.0 }</div>
       * The area of the image in which barcodes are searched.
       * @param gpuAcceleration <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to enable/disable GPU support via WebGL, to provide faster and more accurate barcode localization.
       * The GPU can and will be used only if the browser also supports the needed technologies
       * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
       * @param blurryRecognition <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to enable/disable blurry recognition, to allow accurate scanning capabilities for out-of-focus (1D) codes.
       * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
       * to successfully decode/scan difficult codes.
       */
      function ScanSettings() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$enabledSymbologi = _ref.enabledSymbologies,
          enabledSymbologies = _ref$enabledSymbologi === void 0 ? [] : _ref$enabledSymbologi,
          _ref$codeDuplicateFil = _ref.codeDuplicateFilter,
          codeDuplicateFilter = _ref$codeDuplicateFil === void 0 ? 0 : _ref$codeDuplicateFil,
          _ref$maxNumberOfCodes = _ref.maxNumberOfCodesPerFrame,
          maxNumberOfCodesPerFrame = _ref$maxNumberOfCodes === void 0 ? 1 : _ref$maxNumberOfCodes,
          _ref$searchArea = _ref.searchArea,
          searchArea =
            _ref$searchArea === void 0
              ? {
                  x: 0,
                  y: 0,
                  width: 1.0,
                  height: 1.0
                }
              : _ref$searchArea,
          _ref$gpuAcceleration = _ref.gpuAcceleration,
          gpuAcceleration = _ref$gpuAcceleration === void 0 ? true : _ref$gpuAcceleration,
          _ref$blurryRecognitio = _ref.blurryRecognition,
          blurryRecognition = _ref$blurryRecognitio === void 0 ? true : _ref$blurryRecognitio;

        classCallCheck(this, ScanSettings);

        this.symbologySettings = new map$1();
        this.enableSymbologies(enabledSymbologies);
        this.codeDuplicateFilter = codeDuplicateFilter;
        this.maxNumberOfCodesPerFrame = maxNumberOfCodesPerFrame;
        this.baseSearchArea = {
          x: 0,
          y: 0,
          width: 1.0,
          height: 1.0
        };
        this.searchArea = searchArea;
        this.gpuAcceleration = gpuAcceleration;
        this.blurryRecognition = blurryRecognition;
      }
      /**
       * @returns The configuration object as a JSON string.
       */

      createClass(ScanSettings, [
        {
          key: "toJSONString",
          value: function toJSONString() {
            var symbologies = {};
            this.symbologySettings.forEach(function(symbologySettings, symbology) {
              symbologies[exports.Barcode.Symbology.toJSONName(symbology)] = symbologySettings;
            });
            var combinedSearchArea = {
              x: Math.min(1, this.baseSearchArea.x + this.searchArea.x * this.baseSearchArea.width),
              y: Math.min(1, this.baseSearchArea.y + this.searchArea.y * this.baseSearchArea.height),
              width: Math.min(1, this.baseSearchArea.width * this.searchArea.width),
              height: Math.min(1, this.baseSearchArea.height * this.searchArea.height)
            };
            var isFullSearchArea =
              Math.round(combinedSearchArea.x * 100) === 0 &&
              Math.round(combinedSearchArea.y * 100) === 0 &&
              Math.round(combinedSearchArea.width * 100) === 100 &&
              Math.round(combinedSearchArea.height * 100) === 100;
            return stringify$1({
              symbologies: symbologies,
              codeDuplicateFilter: this.codeDuplicateFilter,
              maxNumberOfCodesPerFrame: this.maxNumberOfCodesPerFrame,
              searchArea: combinedSearchArea,
              codeLocation1d: isFullSearchArea
                ? undefined
                : {
                    area: {
                      x: combinedSearchArea.x,
                      y: combinedSearchArea.y + (combinedSearchArea.height * 0.75) / 2,
                      width: combinedSearchArea.width,
                      height: combinedSearchArea.height * 0.25
                    }
                  },
              codeLocation2d: isFullSearchArea
                ? undefined
                : {
                    area: combinedSearchArea
                  },
              gpuAcceleration: this.gpuAcceleration,
              blurryRecognition: this.blurryRecognition
            });
          }
          /**
           * Get the configuration object for a symbology (which can then be modified).
           *
           * @param symbology The symbology for which to retrieve the configuration.
           * @returns The symbology configuration object for the specified symbology.
           */
        },
        {
          key: "getSymbologySettings",
          value: function getSymbologySettings(symbology) {
            if (this.symbologySettings.has(symbology)) {
              return this.symbologySettings.get(symbology);
            } else {
              if (symbology in exports.Barcode.Symbology || values$1(exports.Barcode.Symbology).includes(symbology)) {
                this.symbologySettings.set(symbology, new exports.SymbologySettings());
                return this.symbologySettings.get(symbology);
              } else {
                throw new TypeError('Invalid symbology "'.concat(symbology, '"'));
              }
            }
          }
          /**
           * Get the recognition enabled status for a symbology.
           *
           * @param symbology The symbology for which to retrieve the recognition enabled status.
           * @returns Whether the symbology enabled for recognition.
           */
        },
        {
          key: "isSymbologyEnabled",
          value: function isSymbologyEnabled(symbology) {
            return this.getSymbologySettings(symbology).isEnabled();
          }
          /**
           * Enable recognition of a symbology or list/set of symbologies.
           *
           * @param symbology The single symbology or list/set of symbologies to enable.
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "enableSymbologies",
          value: function enableSymbologies(symbology) {
            return this.setSymbologiesEnabled(symbology, true);
          }
          /**
           * Disable recognition of a symbology or list/set of symbologies.
           *
           * @param symbology The single symbology or list/set of symbologies to disable.
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "disableSymbologies",
          value: function disableSymbologies(symbology) {
            return this.setSymbologiesEnabled(symbology, false);
          }
          /**
           * When the filter is set to -1, each unique code is only scanned once. When set to 0,
           * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
           *
           * @returns The code duplicate filter value.
           */
        },
        {
          key: "getCodeDuplicateFilter",
          value: function getCodeDuplicateFilter() {
            return this.codeDuplicateFilter;
          }
          /**
           * Set the code duplicate filter value.
           *
           * When the filter is set to -1, each unique code is only scanned once. When set to 0,
           * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
           *
           * @param durationMilliseconds The new value (-1, 0, or positive integer).
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "setCodeDuplicateFilter",
          value: function setCodeDuplicateFilter(durationMilliseconds) {
            this.codeDuplicateFilter = durationMilliseconds;
            return this;
          }
          /**
           * @returns The maximum number of barcodes to be recognized every frame.
           */
        },
        {
          key: "getMaxNumberOfCodesPerFrame",
          value: function getMaxNumberOfCodesPerFrame() {
            return this.maxNumberOfCodesPerFrame;
          }
          /**
           * Set the maximum number of barcodes to be recognized every frame.
           *
           * @param limit The new value (non-zero positive integer).
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "setMaxNumberOfCodesPerFrame",
          value: function setMaxNumberOfCodesPerFrame(limit) {
            this.maxNumberOfCodesPerFrame = limit;
            return this;
          }
          /**
           * @returns The area of the image in which barcodes are searched.
           */
        },
        {
          key: "getSearchArea",
          value: function getSearchArea() {
            return this.searchArea;
          }
          /**
           * Set the area of the image in which barcodes are searched.
           *
           * @param searchArea The new search area.
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "setSearchArea",
          value: function setSearchArea(searchArea) {
            this.searchArea = searchArea;
            return this;
          }
          /**
           * @hidden
           *
           * @returns The base area of the image in which barcodes are searched.
           */
        },
        {
          key: "getBaseSearchArea",
          value: function getBaseSearchArea() {
            return this.baseSearchArea;
          }
          /**
           * @hidden
           *
           * Set the base area of the image in which barcodes are searched, this is set automatically by a [[BarcodePicker]]
           * and is combined with the searchArea to obtain the final combined search area.
           *
           * @param baseSearchArea The new base search area.
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "setBaseSearchArea",
          value: function setBaseSearchArea(baseSearchArea) {
            this.baseSearchArea = baseSearchArea;
            return this;
          }
          /**
           * @returns Whether GPU acceleration is configured to be enabled ot not.
           *
           * Note that this refers to the settings: depending on browser capabilities the actual GPU usage might be prevented.
           */
        },
        {
          key: "isGpuAccelerationEnabled",
          value: function isGpuAccelerationEnabled() {
            return this.gpuAcceleration;
          }
          /**
           * Enable or disable GPU acceleration.
           *
           * Provide faster and more accurate barcode localization.
           * The GPU can and will be used only if the browser also supports the needed technologies
           * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
           *
           * @param enabled Whether to enable or disable GPU acceleration.
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "setGpuAccelerationEnabled",
          value: function setGpuAccelerationEnabled(enabled) {
            this.gpuAcceleration = enabled;
            return this;
          }
          /**
           * @returns Whether blurry recognition is configured to be enabled ot not.
           */
        },
        {
          key: "isBlurryRecognitionEnabled",
          value: function isBlurryRecognitionEnabled() {
            return this.blurryRecognition;
          }
          /**
           * Enable or disable blurry recognition.
           *
           * Allow accurate scanning capabilities for out-of-focus (1D) codes.
           * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
           * to successfully decode/scan difficult codes.
           *
           * @param enabled Whether to enable or disable blurry recognition.
           * @returns The updated [[ScanSettings]] object.
           */
        },
        {
          key: "setBlurryRecognitionEnabled",
          value: function setBlurryRecognitionEnabled(enabled) {
            this.blurryRecognition = enabled;
            return this;
          }
        },
        {
          key: "setSingleSymbologyEnabled",
          value: function setSingleSymbologyEnabled(symbology, enabled) {
            if (symbology in exports.Barcode.Symbology || values$1(exports.Barcode.Symbology).includes(symbology)) {
              if (this.symbologySettings.has(symbology)) {
                this.symbologySettings.get(symbology).setEnabled(enabled);
              } else {
                this.symbologySettings.set(
                  symbology,
                  new exports.SymbologySettings({
                    enabled: enabled
                  })
                );
              }
            } else {
              throw new TypeError('Invalid symbology "'.concat(symbology, '"'));
            }
          }
        },
        {
          key: "setMultipleSymbologiesEnabled",
          value: function setMultipleSymbologiesEnabled(symbology, enabled) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (
                var _iterator = getIterator$1(symbology), _step;
                !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                _iteratorNormalCompletion = true
              ) {
                var s = _step.value;

                if (!(s in exports.Barcode.Symbology || values$1(exports.Barcode.Symbology).includes(s))) {
                  throw new TypeError('Invalid symbology "'.concat(s, '"'));
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (
                var _iterator2 = getIterator$1(symbology), _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
                _iteratorNormalCompletion2 = true
              ) {
                var _s = _step2.value;

                if (this.symbologySettings.has(_s)) {
                  this.symbologySettings.get(_s).setEnabled(enabled);
                } else {
                  this.symbologySettings.set(
                    _s,
                    new exports.SymbologySettings({
                      enabled: enabled
                    })
                  );
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        },
        {
          key: "setSymbologiesEnabled",
          value: function setSymbologiesEnabled(symbology, enabled) {
            if (_typeof_1(symbology) === "object") {
              this.setMultipleSymbologiesEnabled(symbology, enabled);
            } else {
              this.setSingleSymbologyEnabled(symbology, enabled);
            }

            return this;
          }
        }
      ]);

      return ScanSettings;
    })();

  /**
   * A low-level scanner interacting with the external Scandit Engine library.
   * Used to set up scan / image settings and to process single image frames.
   *
   * The loading of the external Scandit Engine library which takes place on creation can take some time,
   * the [[on]] method targeting the [[ready]] event can be used to set up a listener function to be called when the
   * library is loaded and the [[isReady]] method can return the current status. The scanner will be ready to start
   * scanning when the library is fully loaded.
   *
   * In the special case where a single [[Scanner]] instance is shared between multiple active [[BarcodePicker]]
   * instances, the fairness in resource allocation for processing images between the different pickers is not guaranteed.
   */

  exports.Scanner =
    /*#__PURE__*/
    (function() {
      /**
       * Create a Scanner instance.
       *
       * It is required to having configured the library via [[configure]] before this object can be created.
       *
       * Before processing an image the relative settings must also have been set.
       *
       * If the library has not been correctly configured yet a `LibraryNotConfiguredError` error is thrown.
       *
       * If a browser is incompatible a `UnsupportedBrowserError` error is thrown.
       *
       * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
       * The configuration object for scanning options.
       * @param imageSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
       * The configuration object to define the properties of an image to be scanned.
       */
      function Scanner() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$scanSettings = _ref.scanSettings,
          scanSettings = _ref$scanSettings === void 0 ? new ScanSettings() : _ref$scanSettings,
          imageSettings = _ref.imageSettings;

        classCallCheck(this, Scanner);

        var browserCompatibility = exports.BrowserHelper.checkBrowserCompatibility();

        if (!browserCompatibility.scannerSupport) {
          throw new UnsupportedBrowserError(browserCompatibility);
        }

        if (exports.userLicenseKey == null || exports.userLicenseKey.trim() === "") {
          throw new CustomError({
            name: "LibraryNotConfiguredError",
            message: "The library has not correctly been configured yet, please call 'configure' with valid parameters"
          });
        }

        this.isReadyToWork = false;
        this.workerScanQueueLength = 0;
        this.engineWorker = new Worker(URL.createObjectURL(engineWorkerBlob));
        this.engineWorker.onmessage = this.engineWorkerOnMessage.bind(this);
        this.engineWorker.postMessage({
          type: "load-library",
          deviceId: deviceId,
          libraryLocation: exports.scanditEngineLocation,
          path: self.location.pathname
        });
        this.eventEmitter = new eventemitter3_1();
        this.workerParseRequestId = 0;
        this.workerScanRequestId = 0;
        this.applyLicenseKey(exports.userLicenseKey);
        this.applyScanSettings(scanSettings);

        if (imageSettings != null) {
          this.applyImageSettings(imageSettings);
        }
      }
      /**
       * Stop the internal `WebWorker` and destroy the scanner itself; ensuring complete cleanup.
       *
       * This method should be called after you don't plan to use the scanner anymore,
       * before the object is automatically cleaned up by JavaScript.
       * The barcode picker must not be used in any way after this call.
       */

      createClass(Scanner, [
        {
          key: "destroy",
          value: function destroy() {
            if (this.engineWorker != null) {
              this.engineWorker.terminate();
            }

            this.eventEmitter.removeAllListeners();
          }
          /**
           * Apply a new set of scan settings to the scanner (replacing old settings).
           *
           * @param scanSettings The scan configuration object to be applied to the scanner.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "applyScanSettings",
          value: function applyScanSettings(scanSettings) {
            this.scanSettings = scanSettings;
            this.engineWorker.postMessage({
              type: "settings",
              settings: this.scanSettings.toJSONString()
            });
            this.eventEmitter.emit("newScanSettings", this.scanSettings);
            return this;
          }
          /**
           * Apply a new set of image settings to the scanner (replacing old settings).
           *
           * @param imageSettings The image configuration object to be applied to the scanner.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "applyImageSettings",
          value: function applyImageSettings(imageSettings) {
            this.imageSettings = imageSettings;
            this.engineWorker.postMessage({
              type: "image-settings",
              imageSettings: imageSettings
            });
            return this;
          }
          /**
           * Clear the scanner session.
           *
           * This removes all recognized barcodes from the scanner session and allows them to be scanned again in case a custom
           * *codeDuplicateFilter* was set in the [[ScanSettings]].
           *
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "clearSession",
          value: function clearSession() {
            this.engineWorker.postMessage({
              type: "clear-session"
            });
            return this;
          }
          /**
           * Process a given image using the previously set scanner and image settings,
           * recognizing codes and retrieving the result as a list of barcodes (if any).
           *
           * Multiple requests done without waiting for previous results will be queued and handled in order.
           *
           * If *highQualitySingleFrameMode* is enabled the image will be processed with really accurate internal settings,
           * resulting in much slower but more precise scanning results. This should be used only for single images not part
           * of a continuous video stream.
           *
           * Passing image data as a *Uint8ClampedArray* is the fastest option, passing a *HTMLImageElement* will incur
           * in additional operations.
           *
           * Depending on the current image settings, given *imageData* and scanning execution, any of the following errors
           * could be the rejected result of the returned promise:
           * - `NoImageSettings`
           * - `ImageSettingsDataMismatch`
           * - `ScanditEngineError`
           *
           * @param imageData The image data given as a byte array, complying with the previously set image settings.
           * @param highQualitySingleFrameMode Whether to process the image as a high quality single frame.
           * @returns A promise resolving to the [[ScanResult]] object.
           */
        },
        {
          key: "processImage",
          value: function processImage(imageData) {
            var _this = this;

            var highQualitySingleFrameMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.imageSettings == null) {
              return promise$1.reject(
                new CustomError({
                  name: "NoImageSettings",
                  message: "No image settings set up in the scanner"
                })
              );
            }

            if (imageData instanceof HTMLImageElement) {
              var imageDataConversionContext = document.createElement("canvas").getContext("2d");
              imageDataConversionContext.canvas.width = imageData.naturalWidth;
              imageDataConversionContext.canvas.height = imageData.naturalHeight;
              imageDataConversionContext.drawImage(imageData, 0, 0, imageData.naturalWidth, imageData.naturalHeight);
              imageData = imageDataConversionContext.getImageData(0, 0, imageData.naturalWidth, imageData.naturalHeight)
                .data;
            }

            var channels;

            switch (this.imageSettings.format.valueOf()) {
              case exports.ImageSettings.Format.GRAY_8U:
                channels = 1;
                break;

              case exports.ImageSettings.Format.RGB_8U:
                channels = 3;
                break;

              case exports.ImageSettings.Format.RGBA_8U:
                channels = 4;
                break;

              default:
                channels = 1;
                break;
            }

            if (this.imageSettings.width * this.imageSettings.height * channels !== imageData.length) {
              return promise$1.reject(
                new CustomError({
                  name: "ImageSettingsDataMismatch",
                  message: "The provided image data doesn't match the previously set image settings"
                })
              );
            }

            this.workerScanRequestId++;
            this.workerScanQueueLength++;
            var originalImageData = imageData.slice();
            return new promise$1(function(resolve, reject) {
              var workResultEvent = "workResult-".concat(_this.workerScanRequestId);
              var workErrorEvent = "workError-".concat(_this.workerScanRequestId);

              _this.eventEmitter.once(workResultEvent, function(workResult) {
                _this.eventEmitter.removeAllListeners(workErrorEvent);

                resolve(
                  new ScanResult(
                    workResult.scanResult.map(exports.Barcode.createFromWASMResult),
                    originalImageData,
                    _this.imageSettings
                  )
                );
              });

              _this.eventEmitter.once(workErrorEvent, function(error) {
                console.error("Scandit Engine error (".concat(error.errorCode, "):"), error.errorMessage);

                _this.eventEmitter.removeAllListeners(workResultEvent);

                var errorObject = new CustomError({
                  name: "ScanditEngineError",
                  message: "".concat(error.errorMessage, " (").concat(error.errorCode, ")")
                });
                reject(errorObject);
              }); // Important! Do not use the recommended postMessage "ArrayBuffer/Transferable" option to send data on Safari!
              // Doing so (mysteriously) causes memory and stability issues.
              // Going with the simple data copy approach instead seems to work.
              // https://developer.mozilla.org/en-US/docs/Web/API/Transferable
              // https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage

              var browserName = exports.BrowserHelper.userAgentInfo.getBrowser().name;
              var message = {
                type: "work",
                requestId: _this.workerScanRequestId,
                data: imageData,
                highQualitySingleFrameMode: highQualitySingleFrameMode
              };

              if (browserName != null && browserName.includes("Safari")) {
                _this.engineWorker.postMessage(message);
              } else {
                _this.engineWorker.postMessage(message, [imageData.buffer]);
              }
            });
          }
          /**
           * @returns Whether the scanner is currently busy processing an image.
           */
        },
        {
          key: "isBusyProcessing",
          value: function isBusyProcessing() {
            return this.workerScanQueueLength !== 0;
          }
          /**
           * @returns Whether the scanner has loaded the external Scandit Engine library and is ready to scan.
           */
        },
        {
          key: "isReady",
          value: function isReady() {
            return this.isReadyToWork;
          }
        },
        {
          key: "on",
          value: function on(eventName, listener) {
            if (eventName === "ready") {
              if (this.isReadyToWork) {
                listener();
              } else {
                this.eventEmitter.once(eventName, listener, this);
              }
            } else if (eventName === "licenseFeaturesReady") {
              if (this.licenseFeatures != null) {
                listener(this.licenseFeatures);
              } else {
                this.eventEmitter.once(eventName, listener, this);
              }
            } else {
              this.eventEmitter.on(eventName, listener, this);
            }

            return this;
          }
          /**
           * Add the listener function to the listeners array for the [[ready]] event, fired only once when the external
           * Scandit Engine library has been loaded and the scanner can thus start to scan barcodes.
           * If the external Scandit Engine library has already been loaded the listener is called immediately.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @deprecated Use the [[on]] method instead.
           *
           * @param listener The listener function.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "onReady",
          value: function onReady(listener) {
            console.warn(
              "The onReady(<listener>) method is deprecated and will be removed in the next major library version." +
                'Please use on("ready", <listener>) instead.'
            );
            return this.on("ready", listener);
          }
          /**
           * *See the [[on]] method.*
           *
           * @param eventName The name of the event to listen to.
           * @param listener The listener function.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "addListener",
          value: function addListener(eventName, listener) {
            return this.on(eventName, listener);
          }
          /**
           * Create a new parser object.
           *
           * @param dataFormat The format of the input data for the parser.
           * @returns The newly created parser.
           */
        },
        {
          key: "createParserForFormat",
          value: function createParserForFormat(dataFormat) {
            return new exports.Parser(this, dataFormat);
          }
          /**
           * Return the current image settings.
           *
           * @returns The current image settings.
           */
        },
        {
          key: "getImageSettings",
          value: function getImageSettings() {
            return this.imageSettings;
          }
          /**
           * Return the current scan settings.
           *
           * @returns The current scan settings.
           */
        },
        {
          key: "getScanSettings",
          value: function getScanSettings() {
            return this.scanSettings;
          }
          /**
           * @hidden
           *
           * Process a given string using the Scandit Parser library,
           * parsing the data in the given format and retrieving the result as a [[ParserResult]] object.
           *
           * Multiple requests done without waiting for previous results will be queued and handled in order.
           *
           * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
           *
           * @param dataFormat The format of the given data.
           * @param dataString The string containing the data to be parsed.
           * @param options Options for the specific data format parser.
           * @returns A promise resolving to the [[ParserResult]] object.
           */
        },
        {
          key: "parseString",
          value: function parseString(dataFormat, dataString, options) {
            var _this2 = this;

            this.workerParseRequestId++;
            return new promise$1(function(resolve, reject) {
              var parseStringResultEvent = "parseStringResult-".concat(_this2.workerParseRequestId);
              var parseStringErrorEvent = "parseStringError-".concat(_this2.workerParseRequestId);

              _this2.eventEmitter.once(parseStringResultEvent, function(result) {
                _this2.eventEmitter.removeAllListeners(parseStringErrorEvent);

                var parserResult = {
                  jsonString: result,
                  fields: [],
                  fieldsByName: {}
                };
                JSON.parse(result).forEach(function(parserField) {
                  parserResult.fields.push(parserField);
                  parserResult.fieldsByName[parserField.name] = parserField;
                });
                resolve(parserResult);
              });

              _this2.eventEmitter.once(parseStringErrorEvent, function(error) {
                console.error("Scandit Engine error (".concat(error.errorCode, "):"), error.errorMessage);

                _this2.eventEmitter.removeAllListeners(parseStringResultEvent);

                var errorObject = new CustomError({
                  name: "ScanditEngineError",
                  message: "".concat(error.errorMessage, " (").concat(error.errorCode, ")")
                });
                reject(errorObject);
              });

              _this2.engineWorker.postMessage({
                type: "parse-string",
                requestId: _this2.workerParseRequestId,
                dataFormat: dataFormat,
                dataString: dataString,
                options: options == null ? "{}" : stringify$1(options)
              });
            });
          }
          /**
           * @hidden
           *
           * Add the listener function to the listeners array for the "licenseFeaturesReady" event, fired only once
           * when the external Scandit Engine library has verified and loaded the license key and parsed its features.
           * If the license features are already available the listener is called immediately.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @param listener The listener function, which will be invoked with a *licenseFeatures* object.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "onLicenseFeaturesReady",
          value: function onLicenseFeaturesReady(listener) {
            return this.on("licenseFeaturesReady", listener);
          }
          /**
           * @hidden
           *
           * Add the listener function to the listeners array for the "newScanSettings" event, fired when new a new
           * [[ScanSettings]] object is applied via the [[applyScanSettings]] method.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @param listener The listener function, which will be invoked with a [[ScanSettings]] object.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "onNewScanSettings",
          value: function onNewScanSettings(listener) {
            return this.on("newScanSettings", listener);
          }
          /**
           * @hidden
           *
           * Remove the specified listener from the given event's listener array.
           *
           * @param eventName The name of the event from which to remove the listener.
           * @param listener The listener function to be removed.
           * @returns The updated [[Scanner]] object.
           */
        },
        {
          key: "removeListener",
          value: function removeListener(eventName, listener) {
            this.eventEmitter.removeListener(eventName, listener);
            return this;
          }
        },
        {
          key: "applyLicenseKey",
          value: function applyLicenseKey(licenseKey) {
            this.engineWorker.postMessage({
              type: "license-key",
              licenseKey: licenseKey
            });
            return this;
          }
        },
        {
          key: "engineWorkerOnMessage",
          value: function engineWorkerOnMessage(ev) {
            var messageType = ev.data[0];
            var messageData = ev.data[1];

            if (messageType === "status" && messageData === "ready") {
              this.isReadyToWork = true;
              this.eventEmitter.emit("ready");
            } else if (messageData != null) {
              if (messageType === "license-features") {
                this.licenseFeatures = messageData;
                this.eventEmitter.emit("licenseFeaturesReady", this.licenseFeatures);
              } else if (messageType === "work-result") {
                this.eventEmitter.emit("workResult-".concat(messageData.requestId), messageData.result);
                this.workerScanQueueLength--;
              } else if (messageType === "work-error") {
                this.eventEmitter.emit("workError-".concat(messageData.requestId), messageData.error);
                this.workerScanQueueLength--;
              } else if (messageType === "parse-string-result") {
                this.eventEmitter.emit("parseStringResult-".concat(messageData.requestId), messageData.result);
              } else if (messageType === "parse-string-error") {
                this.eventEmitter.emit("parseStringError-".concat(messageData.requestId), messageData.error);
              }
            }
          }
        }
      ]);

      return Scanner;
    })(); // istanbul ignore next

  (function(Scanner) {
    /**
     * @hidden
     *
     * Fired when the external Scandit Engine library has verified and loaded the license key and parsed its features.
     *
     * @asMemberOf Scanner
     * @event
     * @param licenseFeatures The features of the used license key.
     */
    // @ts-ignore
    // declare function licenseFeaturesReady(licenseFeatures: any): void;
    /**
     * @hidden
     *
     * Fired when new a new [[ScanSettings]] object is applied via the [[applyScanSettings]] method.
     *
     * @asMemberOf Scanner
     * @event
     * @param newScanSettings The features of the used license key.
     */
    // @ts-ignore
    // declare function newScanSettings(newScanSettings: any): void;
  })(exports.Scanner || (exports.Scanner = {}));

  /**
   * A barcode picker element used to get and show camera input and perform scanning operations.
   *
   * The barcode picker will automatically fit and scale inside the given *originElement*.
   *
   * Each barcode picker internally contains a [[Scanner]] object with its own WebWorker thread running a
   * separate copy of the external Scandit Engine library. To optimize loading times and performance it's
   * recommended to reuse the same picker and to already create the picker in advance (hidden) and just
   * display it when needed whenever possible.
   *
   * As the loading of the external Scandit Engine library can take some time the picker always starts inactive
   * (but showing GUI and video) and then activates, if not paused, as soon as the library is ready to scan.
   * The [[on]] method targeting the [[ready]] event can be used to set up a listener function to be called when the
   * library is loaded.
   *
   * The picker can also operate in "single image mode", letting the user click/tap to take a single image to be scanned
   * via the camera (mobile/tablet) or a file select dialog (desktop). This is provided automatically as fallback by
   * default when the OS/browser only supports part of the needed features and cannot provide direct access to the camera
   * for video streaming and continuous scanning, or can also be forced. This behaviour can be set up on creation. Note
   * that in this mode some of the functions provided by the picker will have no effect.
   *
   * By default an alert is shown if an internal error during scanning is encountered which prevents the scanning
   * procedure from continuing when running on a local IP address. As this uses the built-in [[scanError]] event
   * functionality, if unwanted it can be disabled by calling [[removeAllListeners]] on the BarcodePicker
   * instance (right after creation).
   *
   * You are not allowed to hide the Scandit logo present in the corner of the GUI.
   */

  exports.BarcodePicker =
    /*#__PURE__*/
    (function() {
      function BarcodePicker(originElement, _ref) {
        var visible = _ref.visible,
          singleImageMode = _ref.singleImageMode,
          playSoundOnScan = _ref.playSoundOnScan,
          vibrateOnScan = _ref.vibrateOnScan,
          scanningPaused = _ref.scanningPaused,
          guiStyle = _ref.guiStyle,
          videoFit = _ref.videoFit,
          laserArea = _ref.laserArea,
          viewfinderArea = _ref.viewfinderArea,
          scanner = _ref.scanner,
          scanSettings = _ref.scanSettings,
          targetScanningFPS = _ref.targetScanningFPS,
          hideLogo = _ref.hideLogo;

        classCallCheck(this, BarcodePicker);

        this.isReadyToWork = false;
        this.destroyed = false;
        this.scanningPaused = scanningPaused;
        howler_core_min_1.autoSuspend = false;
        this.beepSound = new howler_core_min_2({
          src: beepSound
        });
        this.vibrateFunction =
          navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        this.eventEmitter = new eventemitter3_1();
        this.setPlaySoundOnScanEnabled(playSoundOnScan);
        this.setVibrateOnScanEnabled(vibrateOnScan);
        this.setTargetScanningFPS(targetScanningFPS);

        if (scanner == null) {
          this.scanner = new exports.Scanner({
            scanSettings: scanSettings
          });
        } else {
          this.scanner = scanner;
          this.scanner.applyScanSettings(scanSettings);
        }

        this.scannerReadyEventListener = this.handleScannerReady.bind(this);
        this.scanner.on("ready", this.scannerReadyEventListener);
        this.barcodePickerGui = new BarcodePickerGui({
          scanner: this.scanner,
          originElement: originElement,
          singleImageMode: singleImageMode,
          scanningPaused: scanningPaused,
          visible: visible,
          guiStyle: guiStyle,
          videoFit: videoFit,
          hideLogo: hideLogo,
          laserArea: laserArea,
          viewfinderArea: viewfinderArea,
          cameraUploadCallback: this.processVideoFrame.bind(this, true)
        });

        if (singleImageMode) {
          this.cameraManager = new DummyCameraManager();
        } else {
          this.scheduleVideoProcessing();
          this.cameraManager = new BarcodePickerCameraManager(this.triggerFatalError.bind(this), this.barcodePickerGui);
        }

        this.barcodePickerGui.setCameraManager(this.cameraManager);
      }
      /**
       * Create a [[BarcodePicker]] instance, creating the needed HTML in the given origin element.
       * If the *accessCamera* option is enabled (active by default) and the picker is not in "single image mode",
       * the available cameras are accessed and camera access permission is requested to the user if needed.
       * This object expects that at least a camera is available. The active camera is accessed and kept active during the
       * lifetime of the picker (also when hidden or scanning is paused), and is only released when [[destroy]] is called.
       *
       * It is required to having configured the library via [[configure]] before this object can be created.
       *
       * The "single image mode" behaviour of the picker can be set up via the
       * *singleImageMode* option, which accepts a configuration object of the form:
       * ```
       * {
       *   desktop: {
       *     always: false, allowFallback: true
       *   },
       *   mobile: {
       *     always: false, allowFallback: true
       *   }
       * }
       * ```
       *
       * Depending on parameters, device features and user permissions for camera access, any of the following errors
       * could be the rejected result of the returned promise:
       * - `LibraryNotConfiguredError`
       * - `NoOriginElementError`
       * - `UnsupportedBrowserError`
       * - `PermissionDeniedError`
       * - `NotAllowedError`
       * - `NotFoundError`
       * - `AbortError`
       * - `NotReadableError`
       * - `InternalError`
       * - `NoCameraAvailableError`
       *
       * @param originElement The HTMLElement inside which all the necessary elements for the picker will be added.
       * @param visible <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether the picker starts in a visible state.
       * @param singleImageMode <div class="tsd-signature-symbol">Default =&nbsp;
       * { desktop: { always: false, allowFallback: true }, mobile: { always: false, allowFallback: true } }</div>
       * Whether to provide a UI to pick/snap a single image from the camera instead of accessing and using the persistent
       * video stream from a camera ("force"), or to allow to provide this as a fallback ("allowFallback") in case the
       * necessary features for direct camera access are not provided by the OS/browser.
       * @param playSoundOnScan <div class="tsd-signature-symbol">Default =&nbsp;false</div>
       * Whether a sound is played on barcode recognition (iOS requires user input).
       * @param vibrateOnScan <div class="tsd-signature-symbol">Default =&nbsp;false</div>
       * Whether the device vibrates on barcode recognition (only Chrome & Firefox, requires user input).
       * @param scanningPaused <div class="tsd-signature-symbol">Default =&nbsp;false</div>
       * Whether the picker starts in a paused scanning state.
       * @param guiStyle <div class="tsd-signature-symbol">Default =&nbsp;GuiStyle.LASER</div>
       * The GUI style for the picker.
       * @param videoFit <div class="tsd-signature-symbol">Default =&nbsp;ObjectFit.CONTAIN</div>
       * The fit type for the video element of the picker.
       * @param laserArea <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
       * The area of the laser displayed when the GUI style is set to *laser* (the laser will match the width and be
       * vertically centered), by default the area will match the current [[ScanSettings]]'s *searchArea*.
       * @param viewfinderArea <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
       * The area of the viewfinder displayed when the GUI style is set to *viewfinder*, by default the area will match
       * the current [[ScanSettings]]'s *searchArea*.
       * @param enableCameraSwitcher <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to show a GUI button to switch between different cameras (when available).
       * @param enableTorchToggle <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to show a GUI button to toggle device torch on/off (when available, only Chrome).
       * @param enableTapToFocus <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to trigger a manual focus of the camera when clicking/tapping on the video (when available, only Chrome).
       * @param enablePinchToZoom <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to control the zoom of the camera when doing a pinching gesture on the video (when available, only Chrome).
       * @param accessCamera <div class="tsd-signature-symbol">Default =&nbsp;true</div>
       * Whether to immediately access the camera (and requesting user permissions if needed) on picker creation.
       * @param camera <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
       * The camera to be used for video input, if not specified the back or only camera will be used.
       * @param cameraSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
       * The camera options used when accessing the camera, by default HD resolution is used.
       * @param scanner <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
       * The scanner object responsible for scanning via the external Scandit Engine library
       * (a new scanner will be created and initialized if not provided).
       * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
       * The configuration object for scanning options to be applied to the scanner (all symbologies disabled by default).
       * @param targetScanningFPS <div class="tsd-signature-symbol">Default =&nbsp;30</div>
       * The target frames per second to be processed, the final speed is limited by the camera framerate (usually 30 FPS)
       * and the frame processing time of the device. By setting this to lower numbers devices can save power by performing
       * less work during scanning operations, depending on device speed (faster devices can "sleep" for longer periods).
       * Must be a number bigger than 0.
       * @returns A promise resolving to the created ready [[BarcodePicker]] object.
       */

      createClass(
        BarcodePicker,
        [
          {
            key: "destroy",

            /**
             * Stop scanning and displaying video output, remove HTML elements added to the page,
             * destroy the internal [[Scanner]] (by default) and destroy the barcode picker itself; ensuring complete cleanup.
             *
             * This method should be called after you don't plan to use the picker anymore,
             * before the object is automatically cleaned up by JavaScript.
             * The barcode picker must not be used in any way after this call.
             *
             * If the [[Scanner]] is or will be in use for other purposes, the relative option can be passed to prevent
             * its destruction.
             *
             * @param destroyScanner Whether to destroy the internally used [[Scanner]] or not.
             */
            value: function destroy() {
              var destroyScanner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
              this.pauseScanning(true);
              this.scanner.removeListener("ready", this.scannerReadyEventListener);
              this.destroyed = true;

              if (destroyScanner) {
                this.scanner.destroy();
              }

              this.barcodePickerGui.destroy();
              this.eventEmitter.removeAllListeners();
            }
            /**
             * Apply a new set of scan settings to the internal scanner (replacing old settings).
             *
             * @param scanSettings The scan configuration object to be applied to the scanner.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "applyScanSettings",
            value: function applyScanSettings(scanSettings) {
              this.scanner.applyScanSettings(scanSettings);
              return this;
            }
            /**
             * @returns Whether the scanning is currently paused.
             */
          },
          {
            key: "isScanningPaused",
            value: function isScanningPaused() {
              return this.scanningPaused;
            }
            /**
             * Pause the recognition of codes in the input image.
             *
             * By default video from the camera is still shown, if the *pauseCamera* option is enabled the camera stream
             * is paused (camera access is fully interrupted) and will be resumed when calling [[resumeScanning]] or
             * [[accessCamera]], possibly requesting user permissions if needed.
             *
             * In "single image mode" the input for submitting a picture is disabled.
             *
             * @param pauseCamera Whether to also pause the camera stream.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "pauseScanning",
            value: function pauseScanning() {
              var pauseCamera = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              this.scanningPaused = true;

              if (pauseCamera) {
                this.cameraManager.stopStream();
              }

              if (this.scanner.isReady()) {
                this.barcodePickerGui.pauseScanning();
              }

              return this;
            }
            /**
             * Resume the recognition of codes in the input image.
             *
             * If the camera stream was stopped when calling [[pauseScanning]], the camera stream is also resumed and
             * user permissions are requested if needed to resume video input.
             *
             * In "single image mode" the input for submitting a picture is enabled.
             *
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "resumeScanning",
            value: function resumeScanning() {
              var _this = this;

              this.scanningPaused = false;

              if (this.scanner.isReady()) {
                this.barcodePickerGui.resumeScanning();
              }

              if (this.cameraManager.activeCamera == null && this.cameraAccess) {
                return this.cameraManager.setupCameras().then(function() {
                  return _this;
                });
              }

              return promise$1.resolve(this);
            }
            /**
             * @returns The currently active camera.
             */
          },
          {
            key: "getActiveCamera",
            value: function getActiveCamera() {
              return this.cameraManager.activeCamera;
            }
            /**
             * Select a camera to be used for video input, if no camera is passed, the default one is selected.
             *
             * If camera access is enabled, the camera is enabled and accessed.
             *
             * Depending on device features and user permissions for camera access, any of the following errors
             * could be the rejected result of the returned promise:
             * - `PermissionDeniedError`
             * - `NotAllowedError`
             * - `NotFoundError`
             * - `AbortError`
             * - `NotReadableError`
             * - `InternalError`
             * - `NoCameraAvailableError`
             *
             * In "single image mode" this method has no effect.
             *
             * @param camera The new camera to be used, by default the automatically detected back camera is used.
             * @param cameraSettings The camera options used when accessing the camera, by default HD resolution is used.
             * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is set
             * (and accessed, if camera access is currently enabled).
             */
          },
          {
            key: "setActiveCamera",
            value: function setActiveCamera(camera, cameraSettings) {
              var _this2 = this;

              if (camera == null || !this.cameraAccess) {
                this.cameraManager.setSelectedCamera(camera);
                this.cameraManager.setSelectedCameraSettings(cameraSettings);

                if (this.cameraAccess) {
                  return this.cameraManager.setupCameras().then(function() {
                    return _this2;
                  });
                } else {
                  return promise$1.resolve(this);
                }
              } else {
                return this.cameraManager.initializeCameraWithSettings(camera, cameraSettings).then(function() {
                  return _this2;
                });
              }
            }
            /**
             * Try to apply new settings to the currently used camera for video input,
             * if no settings are passed the default ones are set.
             *
             * If camera access is enabled, the camera is updated and accessed with the new settings.
             *
             * Depending on device features and user permissions for camera access, any of the following errors
             * could be the rejected result of the returned promise:
             * - `PermissionDeniedError`
             * - `NotAllowedError`
             * - `NotFoundError`
             * - `AbortError`
             * - `NotReadableError`
             * - `InternalError`
             * - `NoCameraAvailableError`
             *
             * In "single image mode" this method has no effect.
             *
             * @param cameraSettings The new camera options used when accessing the camera, by default HD resolution is used.
             * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is updated
             * (and accessed, if camera access is currently enabled).
             */
          },
          {
            key: "applyCameraSettings",
            value: function applyCameraSettings(cameraSettings) {
              var _this3 = this;

              if (!this.cameraAccess) {
                this.cameraManager.setSelectedCameraSettings(cameraSettings);
                return promise$1.resolve(this);
              }

              return this.cameraManager.applyCameraSettings(cameraSettings).then(function() {
                return _this3;
              });
            }
            /**
             * @returns Whether the picker is in a visible state or not.
             */
          },
          {
            key: "isVisible",
            value: function isVisible() {
              return this.barcodePickerGui.isVisible();
            }
            /**
             * Enable or disable picker visibility.
             *
             * @param visible Whether the picker is in a visible state or not.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setVisible",
            value: function setVisible(visible) {
              this.barcodePickerGui.setVisible(visible);
              return this;
            }
            /**
             * @returns Whether the currently selected camera's video is mirrored along the vertical axis.
             */
          },
          {
            key: "isMirrorImageEnabled",
            value: function isMirrorImageEnabled() {
              return this.barcodePickerGui.isMirrorImageEnabled();
            }
            /**
             * Enable or disable camera video mirroring along the vertical axis.
             * By default front cameras are automatically mirrored.
             * This setting is applied per camera and the method has no effect if no camera is currently selected.
             *
             * In "single image mode" this method has no effect.
             *
             * @param enabled Whether the camera video is mirrored along the vertical axis.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setMirrorImageEnabled",
            value: function setMirrorImageEnabled(enabled) {
              this.barcodePickerGui.setMirrorImageEnabled(enabled, true);
              return this;
            }
            /**
             * @returns Whether a sound should be played on barcode recognition (iOS requires user input).
             * Note that the sound is played if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
             */
          },
          {
            key: "isPlaySoundOnScanEnabled",
            value: function isPlaySoundOnScanEnabled() {
              return this.playSoundOnScan;
            }
            /**
             * Enable or disable playing a sound on barcode recognition (iOS requires user input).
             *
             * The sound is played if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
             *
             * @param enabled Whether a sound should be played on barcode recognition.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setPlaySoundOnScanEnabled",
            value: function setPlaySoundOnScanEnabled(enabled) {
              this.playSoundOnScan = enabled;
              return this;
            }
            /**
             * @returns Whether the device should vibrate on barcode recognition (only Chrome & Firefox, requires user input).
             * Note that the vibration is triggered if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
             */
          },
          {
            key: "isVibrateOnScanEnabled",
            value: function isVibrateOnScanEnabled() {
              return this.vibrateOnScan;
            }
            /**
             * Enable or disable vibrating the device on barcode recognition (only Chrome & Firefox, requires user input).
             *
             * The vibration is triggered if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
             *
             * @param enabled Whether the device should vibrate on barcode recognition.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setVibrateOnScanEnabled",
            value: function setVibrateOnScanEnabled(enabled) {
              this.vibrateOnScan = enabled;
              return this;
            }
            /**
             * @returns Whether a GUI button to switch between different cameras is shown (when available).
             */
          },
          {
            key: "isCameraSwitcherEnabled",
            value: function isCameraSwitcherEnabled() {
              return this.cameraManager.isCameraSwitcherEnabled();
            }
            /**
             * Show or hide a GUI button to switch between different cameras (when available).
             *
             * In "single image mode" this method has no effect.
             *
             * @param enabled Whether to show a GUI button to switch between different cameras.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setCameraSwitcherEnabled",
            value: function setCameraSwitcherEnabled(enabled) {
              this.cameraManager.setCameraSwitcherEnabled(enabled);
              return this;
            }
            /**
             * @returns Whether a GUI button to toggle device torch on/off is shown (when available, only Chrome).
             */
          },
          {
            key: "isTorchToggleEnabled",
            value: function isTorchToggleEnabled() {
              return this.cameraManager.isTorchToggleEnabled();
            }
            /**
             * Show or hide a GUI button to toggle device torch on/off (when available, only Chrome).
             *
             * In "single image mode" this method has no effect.
             *
             * @param enabled Whether to show a GUI button to toggle device torch on/off.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setTorchToggleEnabled",
            value: function setTorchToggleEnabled(enabled) {
              this.cameraManager.setTorchToggleEnabled(enabled);
              return this;
            }
            /**
             * @returns Whether manual camera focus when clicking/tapping on the video is enabled (when available, only Chrome).
             */
          },
          {
            key: "isTapToFocusEnabled",
            value: function isTapToFocusEnabled() {
              return this.cameraManager.isTapToFocusEnabled();
            }
            /**
             * Enable or disable manual camera focus when clicking/tapping on the video (when available, only Chrome).
             *
             * In "single image mode" this method has no effect.
             *
             * @param enabled Whether to enable manual camera focus when clicking/tapping on the video.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setTapToFocusEnabled",
            value: function setTapToFocusEnabled(enabled) {
              this.cameraManager.setTapToFocusEnabled(enabled);
              return this;
            }
            /**
             * @returns Whether camera zoom control via pinching gesture on the video is enabled (when available, only Chrome).
             */
          },
          {
            key: "isPinchToZoomEnabled",
            value: function isPinchToZoomEnabled() {
              return this.cameraManager.isPinchToZoomEnabled();
            }
            /**
             * Enable or disable camera zoom control via pinching gesture on the video (when available, only Chrome).
             *
             * In "single image mode" this method has no effect.
             *
             * @param enabled Whether to enable camera zoom control via pinching gesture on the video.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setPinchToZoomEnabled",
            value: function setPinchToZoomEnabled(enabled) {
              this.cameraManager.setPinchToZoomEnabled(enabled);
              return this;
            }
            /**
             * Enable or disable the torch/flashlight of the device (when available, only Chrome).
             * Changing active camera or camera settings will cause the torch to become disabled.
             *
             * A button on the [[BarcodePicker]] GUI to let the user toggle this functionality can also be set
             * on creation via the *enableTorchToggle* option (enabled by default, when available).
             *
             * In "single image mode" this method has no effect.
             *
             * @param enabled Whether the torch should be enabled or disabled.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setTorchEnabled",
            value: function setTorchEnabled(enabled) {
              this.cameraManager.setTorchEnabled(enabled);
              return this;
            }
            /**
             * Set the zoom level of the device (when available, only Chrome).
             * Changing active camera or camera settings will cause the zoom to be reset.
             *
             * In "single image mode" this method has no effect.
             *
             * @param zoomPercentage The percentage of the max zoom (between 0 and 1).
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setZoom",
            value: function setZoom(zoomPercentage) {
              this.cameraManager.setZoom(zoomPercentage);
              return this;
            }
            /**
             * @returns Whether the barcode picker has loaded the external Scandit Engine library and is ready to scan.
             */
          },
          {
            key: "isReady",
            value: function isReady() {
              return this.isReadyToWork;
            }
          },
          {
            key: "on",
            value: function on(eventName, listener) {
              var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

              if (eventName === "ready") {
                if (this.isReadyToWork) {
                  listener();
                } else {
                  this.eventEmitter.once(eventName, listener, this);
                }
              } else {
                if (once === true) {
                  this.eventEmitter.once(eventName, listener, this);
                } else {
                  this.eventEmitter.on(eventName, listener, this);
                }
              }

              return this;
            }
            /**
             * Remove the specified listener from the given event's listener array.
             *
             * @param eventName The name of the event from which to remove the listener.
             * @param listener The listener function to be removed.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "removeListener",
            value: function removeListener(eventName, listener) {
              this.eventEmitter.removeListener(eventName, listener);
              return this;
            }
            /**
             * Remove all listeners from the given event's listener array.
             *
             * @param eventName The name of the event from which to remove all listeners.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "removeAllListeners",
            value: function removeAllListeners(eventName) {
              this.eventEmitter.removeAllListeners(eventName);
              return this;
            }
            /**
             * *See the [[on]] method.*
             *
             * @param eventName The name of the event to listen to.
             * @param listener The listener function.
             * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
             * Whether the listener should just be triggered only once and then discarded.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:bool-param-default
          },
          {
            key: "addListener",
            value: function addListener(eventName, listener, once) {
              return this.on(eventName, listener, once);
            }
            /**
             * Add the listener function to the listeners array for the [[ready]] event, fired when the external
             * Scandit Engine library has been loaded and the barcode picker can thus start to scan barcodes.
             * If the library has already been loaded the listener is called immediately.
             *
             * No checks are made to see if the listener has already been added.
             * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
             *
             * @deprecated Use the [[on]] method instead.
             *
             * @param listener The listener function.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "onReady",
            value: function onReady(listener) {
              console.warn(
                "The onReady(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use on("ready", <listener>) instead.'
              );
              return this.on("ready", listener);
            }
            /**
             * Add the listener function to the listeners array for the [[scan]] event, fired when new barcodes
             * are recognized in the image frame. The returned barcodes are affected
             * by the [[ScanSettings.setCodeDuplicateFilter]] option.
             *
             * No checks are made to see if the listener has already been added.
             * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
             *
             * @deprecated Use the [[on]] method instead.
             *
             * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
             * @param once Whether the listener should just be triggered only once and then discarded.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "onScan",
            value: function onScan(listener) {
              var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              console.warn(
                "The onScan(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use on("scan", <listener>) instead.'
              );
              return this.on("scan", listener, once);
            }
            /**
             * Remove the specified listener from the [[scan]] event's listener array.
             *
             * @deprecated Use the [[removeListener]] method instead.
             *
             * @param listener The listener function to be removed.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "removeScanListener",
            value: function removeScanListener(listener) {
              console.warn(
                "The removeScanListener(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeListener("scan", <listener>) instead.'
              );
              return this.removeListener("scan", listener);
            }
            /**
             * Remove all listeners from the [[scan]] event's listener array.
             *
             * @deprecated Use the [[removeAllListeners]] method instead.
             *
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "removeScanListeners",
            value: function removeScanListeners() {
              console.warn(
                "The removeScanListeners() method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeAllListeners("scan") instead.'
              );
              return this.removeAllListeners("scan");
            }
            /**
             * Add the listener function to the listeners array for the [[scanError]] event, fired when an error occurs
             * during scanning initialization and execution. The barcode picker will be automatically paused when this happens.
             *
             * No checks are made to see if the listener has already been added.
             * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
             *
             * @deprecated Use the [[on]] method instead.
             *
             * @param listener The listener function, which will be invoked with an `ScanditEngineError` object.
             * @param once Whether the listener should just be triggered only once and then discarded.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "onScanError",
            value: function onScanError(listener) {
              var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              console.warn(
                "The onScanError(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use on("scanError", <listener>) instead.'
              );
              return this.on("scanError", listener, once);
            }
            /**
             * Remove the specified listener from the [[scanError]] event's listener array.
             *
             * @deprecated Use the [[removeListener]] method instead.
             *
             * @param listener The listener function to be removed.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "removeScanErrorListener",
            value: function removeScanErrorListener(listener) {
              console.warn(
                "The removeScanErrorListener(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeListener("scanError", <listener>) instead.'
              );
              return this.removeListener("scanError", listener);
            }
            /**
             * Remove all listeners from the [[scanError]] event's listener array.
             *
             * @deprecated Use the [[removeAllListeners]] method instead.
             *
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "removeScanErrorListeners",
            value: function removeScanErrorListeners() {
              console.warn(
                "The removeScanErrorListeners() method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeAllListeners("scanError") instead.'
              );
              return this.removeAllListeners("scanError");
            }
            /**
             * Add the listener function to the listeners array for the [[submitFrame]] event, fired when a new frame is submitted
             * to the engine to be processed. As the frame is not processed yet, the [[ScanResult.barcodes]] property will
             * always be empty (no results yet).
             *
             * No checks are made to see if the listener has already been added.
             * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
             *
             * @deprecated Use the [[on]] method instead.
             *
             * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
             * @param once Whether the listener should just be triggered only once and then discarded.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "onSubmitFrame",
            value: function onSubmitFrame(listener) {
              var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              console.warn(
                "The onSubmitFrame(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use on("submitFrame", <listener>) instead.'
              );
              return this.on("submitFrame", listener, once);
            }
            /**
             * Remove the specified listener from the [[submitFrame]] event's listener array.
             *
             * @deprecated Use the [[removeListener]] method instead.
             *
             * @param listener The listener function to be removed.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "removeSubmitFrameListener",
            value: function removeSubmitFrameListener(listener) {
              console.warn(
                "The removeSubmitFrameListener(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeListener("submitFrame", <listener>) instead.'
              );
              return this.removeListener("submitFrame", listener);
            }
            /**
             * Remove all listeners from the [[submitFrame]] event's listener array.
             *
             * @deprecated Use the [[removeAllListeners]] method instead.
             *
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "removeSubmitFrameListeners",
            value: function removeSubmitFrameListeners() {
              console.warn(
                "The removeSubmitFrameListeners() method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeAllListeners("submitFrame") instead.'
              );
              return this.removeAllListeners("submitFrame");
            }
            /**
             * Add the listener function to the listeners array for the [[processFrame]] event, fired when a new frame is
             * processed. This event is fired on every frame, independently from the number of recognized barcodes (can be none).
             * The returned barcodes are affected by the [[ScanSettings.setCodeDuplicateFilter]] option.
             *
             * No checks are made to see if the listener has already been added.
             * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
             *
             * @deprecated Use the [[on]] method instead.
             *
             * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
             * @param once Whether the listener should just be triggered only once and then discarded.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "onProcessFrame",
            value: function onProcessFrame(listener) {
              var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              console.warn(
                "The onProcessFrame(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use on("processFrame", <listener>) instead.'
              );
              return this.on("processFrame", listener, once);
            }
            /**
             * Remove the specified listener from the [[processFrame]] event's listener array.
             *
             * @deprecated Use the [[removeListener]] method instead.
             *
             * @param listener The listener function to be removed.
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "removeProcessFrameListener",
            value: function removeProcessFrameListener(listener) {
              console.warn(
                "The removeProcessFrameListener(<listener>) method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeListener("processFrame", <listener>) instead.'
              );
              return this.removeListener("processFrame", listener);
            }
            /**
             * Remove all listeners from the [[processFrame]] event's listener array.
             *
             * @deprecated Use the [[removeAllListeners]] method instead.
             *
             * @returns The updated [[BarcodePicker]] object.
             */
            // tslint:disable-next-line:no-identical-functions
          },
          {
            key: "removeProcessFrameListeners",
            value: function removeProcessFrameListeners() {
              console.warn(
                "The removeProcessFrameListeners() method is deprecated and will be removed in the next" +
                  ' major library version. Please use removeAllListeners("processFrame") instead.'
              );
              return this.removeAllListeners("processFrame");
            }
            /**
             * Set the GUI style for the picker.
             *
             * In "single image mode" this method has no effect.
             *
             * When the GUI style is set to *laser* or *viewfinder*, the GUI will flash on barcode recognition.
             * Note that the GUI will flash if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
             *
             * @param guiStyle The new GUI style to be applied.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setGuiStyle",
            value: function setGuiStyle(guiStyle) {
              this.barcodePickerGui.setGuiStyle(guiStyle);
              return this;
            }
            /**
             * Set the fit type for the video element of the picker.
             *
             * If the "cover" type is selected the maximum available search area for barcode detection is (continuously) adjusted
             * automatically according to the visible area of the picker.
             *
             * In "single image mode" this method has no effect.
             *
             * @param objectFit The new fit type to be applied.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setVideoFit",
            value: function setVideoFit(objectFit) {
              this.barcodePickerGui.setVideoFit(objectFit);
              return this;
            }
            /**
             * Access the currently set or default camera, requesting user permissions if needed.
             * This method is meant to be used after the picker has been initialized with disabled camera access
             * (*accessCamera*=false) or after [[pauseScanning]] has been called with the pause camera stream option.
             * Calling this doesn't do anything if the camera is already being accessed.
             *
             * Depending on device features and user permissions for camera access, any of the following errors
             * could be the rejected result of the returned promise:
             * - `PermissionDeniedError`
             * - `NotAllowedError`
             * - `NotFoundError`
             * - `AbortError`
             * - `NotReadableError`
             * - `InternalError`
             * - `NoCameraAvailableError`
             *
             * In "single image mode" this method has no effect.
             *
             * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is accessed.
             */
          },
          {
            key: "accessCamera",
            value: function accessCamera() {
              var _this4 = this;

              if (!this.cameraAccess || this.cameraManager.activeCamera == null) {
                return new promise$1(function(resolve, reject) {
                  _this4.cameraManager
                    .setupCameras()
                    .then(function() {
                      _this4.cameraAccess = true;
                      return resolve(_this4);
                    })
                    .catch(reject);
                });
              }

              return promise$1.resolve(this);
            }
            /**
             * Create a new parser object.
             *
             * @param dataFormat The format of the input data for the parser.
             * @returns The newly created parser.
             */
          },
          {
            key: "createParserForFormat",
            value: function createParserForFormat(dataFormat) {
              return this.scanner.createParserForFormat(dataFormat);
            }
            /**
             * Reassign the barcode picker to a different HTML element.
             *
             * All the barcode picker elements inside the current origin element will be moved to the new given one.
             *
             * If an invalid element is given, a `NoOriginElementError` error is thrown.
             *
             * @param originElement The HTMLElement into which all the necessary elements for the picker will be moved.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "reassignOriginElement",
            value: function reassignOriginElement(originElement) {
              if (!exports.BrowserHelper.isValidHTMLElement(originElement)) {
                throw new CustomError({
                  name: "NoOriginElementError",
                  message: "A valid origin HTML element must be given"
                });
              }

              this.barcodePickerGui.reassignOriginElement(originElement);
              return this;
            }
            /**
             * Set the target frames per second to be processed by the scanning engine.
             *
             * The final speed is limited by the camera framerate (usually 30 FPS) and the frame processing time of the device.
             * By setting this to lower numbers devices can save power by performing less work during scanning operations,
             * depending on device speed (faster devices can "sleep" for longer periods).
             *
             * In "single image mode" this method has no effect.
             *
             * @param targetScanningFPS The target frames per second to be processed.
             * Must be a number bigger than 0, by default set to 30.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setTargetScanningFPS",
            value: function setTargetScanningFPS(targetScanningFPS) {
              if (targetScanningFPS <= 0) {
                targetScanningFPS = 30;
              }

              this.targetScanningFPS = targetScanningFPS;
              return this;
            }
            /**
             * @returns The internally used initialized (and possibly configured) [[Scanner]] object instance.
             */
          },
          {
            key: "getScanner",
            value: function getScanner() {
              return this.scanner;
            }
            /**
             * Clear the internal scanner session.
             *
             * This removes all recognized barcodes from the scanner session and allows them to be scanned again in case a custom
             * *codeDuplicateFilter* was set in the [[ScanSettings]].
             *
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "clearSession",
            value: function clearSession() {
              this.scanner.clearSession();
              return this;
            }
            /**
             * Set the area of the laser displayed when the GUI style is set to *laser* (the laser will match the width and be
             * vertically centered).
             * Note that this functionality affects UI only and doesn't change the actual search area set via [[ScanSettings]].
             * If no area is passed, the default automatic size behaviour is set, where the laser will match the current area
             * of the image in which barcodes are searched, controlled via the *searchArea* option in [[ScanSettings]].
             *
             * @param area The new search area, by default the area will match the [[ScanSettings]]'s *searchArea*.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setLaserArea",
            value: function setLaserArea(area) {
              this.barcodePickerGui.setLaserArea(area);
              return this;
            }
            /**
             * Set the area of the viewfinder displayed when the GUI style is set to *viewfinder*.
             * Note that this functionality affects UI only and doesn't change the actual search area set via [[ScanSettings]].
             * If no area is passed, the default automatic size behaviour is set, where the viewfinder will match the current area
             * of the image in which barcodes are searched, controlled via the *searchArea* option in [[ScanSettings]].
             *
             * @param area The new search area, by default the area will match the [[ScanSettings]]'s *searchArea*.
             * @returns The updated [[BarcodePicker]] object.
             */
          },
          {
            key: "setViewfinderArea",
            value: function setViewfinderArea(area) {
              this.barcodePickerGui.setViewfinderArea(area);
              return this;
            }
          },
          {
            key: "triggerFatalError",
            value: function triggerFatalError(error) {
              this.fatalError = error;
              console.error(error);
            }
          },
          {
            key: "handleScanResult",
            value: function handleScanResult(scanResult) {
              var _this5 = this;

              this.eventEmitter.emit("processFrame", scanResult);

              if (scanResult.barcodes.length !== 0) {
                // This will get executed only after the other existing listeners for "processFrame" and "scan" are executed
                this.eventEmitter.once("scan", function() {
                  if (
                    scanResult.barcodes.some(function(barcode) {
                      return !scanResult.rejectedCodes.has(barcode);
                    })
                  ) {
                    _this5.barcodePickerGui.flashGUI();

                    if (_this5.playSoundOnScan) {
                      _this5.beepSound.play();
                    }

                    if (_this5.vibrateOnScan && _this5.vibrateFunction != null) {
                      _this5.vibrateFunction.call(navigator, 300);
                    }
                  }
                });
                this.eventEmitter.emit("scan", scanResult);
              }
            }
          },
          {
            key: "scheduleVideoProcessing",
            value: function scheduleVideoProcessing() {
              var _this6 = this;

              var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              window.setTimeout(function() {
                _this6.videoProcessing();
              }, timeout); // Leave some breathing room for other operations
            }
          },
          {
            key: "scheduleNextVideoProcessing",
            value: function scheduleNextVideoProcessing(processingStartTime) {
              if (this.targetScanningFPS < 30) {
                if (this.averageProcessingTime == null) {
                  this.averageProcessingTime = performance.now() - processingStartTime;
                } else {
                  this.averageProcessingTime =
                    this.averageProcessingTime * 0.9 + (performance.now() - processingStartTime) * 0.1;
                }

                var nextProcessingCallDelay = 1000 / this.targetScanningFPS - this.averageProcessingTime;

                if (nextProcessingCallDelay > 16.66) {
                  // More than 60 FPS, we have time to sleep
                  this.scheduleVideoProcessing(nextProcessingCallDelay);
                } else {
                  this.scheduleVideoProcessing();
                }
              } else {
                this.scheduleVideoProcessing();
              }
            }
          },
          {
            key: "processVideoFrame",
            value: function processVideoFrame(highQualitySingleFrameMode) {
              var _this7 = this;

              var imageData = this.barcodePickerGui.getVideoImageData(); // This could happen in very weird situations and should be temporary
              // istanbul ignore if

              if (imageData == null) {
                return promise$1.resolve();
              }

              if (this.eventEmitter.listenerCount("submitFrame") > 0 && !this.scanningPaused) {
                this.eventEmitter.emit(
                  "submitFrame",
                  new ScanResult([], imageData.slice(), this.scanner.getImageSettings())
                );
              }

              return new promise$1(function(resolve) {
                _this7.scanner
                  .processImage(imageData, highQualitySingleFrameMode)
                  .then(function(scanResult) {
                    // istanbul ignore else
                    if (!_this7.scanningPaused) {
                      _this7.handleScanResult(scanResult);
                    }

                    resolve();
                  })
                  .catch(function(error) {
                    // istanbul ignore else
                    if (!_this7.scanningPaused) {
                      _this7.pauseScanning();

                      _this7.eventEmitter.emit("scanError", error);
                    }

                    resolve();
                  });
              });
            }
          },
          {
            key: "videoProcessing",
            value: function videoProcessing() {
              var _this8 = this;

              if (this.destroyed) {
                return;
              }

              if (
                this.cameraManager.activeCamera == null ||
                this.cameraManager.activeCamera.currentResolution == null ||
                this.fatalError != null ||
                this.scanningPaused ||
                !this.scanner.isReady() ||
                this.scanner.isBusyProcessing() ||
                this.latestVideoTimeProcessed === this.barcodePickerGui.getVideoCurrentTime()
              ) {
                this.scheduleVideoProcessing();
                return;
              }

              if (this.latestVideoTimeProcessed == null) {
                // Show active GUI if needed, as now it's the moment the scanner is ready and used for the first time
                this.resumeScanning();
              }

              var processingStartTime = performance.now();
              this.latestVideoTimeProcessed = this.barcodePickerGui.getVideoCurrentTime();
              this.processVideoFrame(false).then(function() {
                _this8.scheduleNextVideoProcessing(processingStartTime);
              });
            }
          },
          {
            key: "handleScannerReady",
            value: function handleScannerReady() {
              this.isReadyToWork = true;
              this.eventEmitter.emit("ready");
            }
          }
        ],
        [
          {
            key: "create",
            value: function create(originElement) {
              var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref2$visible = _ref2.visible,
                visible = _ref2$visible === void 0 ? true : _ref2$visible,
                _ref2$singleImageMode = _ref2.singleImageMode,
                singleImageMode =
                  _ref2$singleImageMode === void 0
                    ? {
                        desktop: {
                          always: false,
                          allowFallback: true
                        },
                        mobile: {
                          always: false,
                          allowFallback: true
                        }
                      }
                    : _ref2$singleImageMode,
                _ref2$playSoundOnScan = _ref2.playSoundOnScan,
                playSoundOnScan = _ref2$playSoundOnScan === void 0 ? false : _ref2$playSoundOnScan,
                _ref2$vibrateOnScan = _ref2.vibrateOnScan,
                vibrateOnScan = _ref2$vibrateOnScan === void 0 ? false : _ref2$vibrateOnScan,
                _ref2$scanningPaused = _ref2.scanningPaused,
                scanningPaused = _ref2$scanningPaused === void 0 ? false : _ref2$scanningPaused,
                _ref2$guiStyle = _ref2.guiStyle,
                guiStyle = _ref2$guiStyle === void 0 ? BarcodePicker.GuiStyle.LASER : _ref2$guiStyle,
                _ref2$videoFit = _ref2.videoFit,
                videoFit = _ref2$videoFit === void 0 ? BarcodePicker.ObjectFit.CONTAIN : _ref2$videoFit,
                laserArea = _ref2.laserArea,
                viewfinderArea = _ref2.viewfinderArea,
                scanner = _ref2.scanner,
                _ref2$scanSettings = _ref2.scanSettings,
                scanSettings = _ref2$scanSettings === void 0 ? new ScanSettings() : _ref2$scanSettings,
                _ref2$enableCameraSwi = _ref2.enableCameraSwitcher,
                enableCameraSwitcher = _ref2$enableCameraSwi === void 0 ? true : _ref2$enableCameraSwi,
                _ref2$enableTorchTogg = _ref2.enableTorchToggle,
                enableTorchToggle = _ref2$enableTorchTogg === void 0 ? true : _ref2$enableTorchTogg,
                _ref2$enableTapToFocu = _ref2.enableTapToFocus,
                enableTapToFocus = _ref2$enableTapToFocu === void 0 ? true : _ref2$enableTapToFocu,
                _ref2$enablePinchToZo = _ref2.enablePinchToZoom,
                enablePinchToZoom = _ref2$enablePinchToZo === void 0 ? true : _ref2$enablePinchToZo,
                _ref2$accessCamera = _ref2.accessCamera,
                accessCamera = _ref2$accessCamera === void 0 ? true : _ref2$accessCamera,
                camera = _ref2.camera,
                cameraSettings = _ref2.cameraSettings,
                _ref2$targetScanningF = _ref2.targetScanningFPS,
                targetScanningFPS = _ref2$targetScanningF === void 0 ? 30 : _ref2$targetScanningF;

              var singleImageModeForced;
              var singleImageModeFallbackAllowed;
              var deviceType = exports.BrowserHelper.userAgentInfo.getDevice().type;

              if (deviceType === "mobile" || deviceType === "tablet") {
                singleImageModeForced = singleImageMode.mobile.always;
                singleImageModeFallbackAllowed = singleImageMode.mobile.allowFallback;
              } else {
                singleImageModeForced = singleImageMode.desktop.always;
                singleImageModeFallbackAllowed = singleImageMode.desktop.allowFallback;
              }

              var browserCompatibility = exports.BrowserHelper.checkBrowserCompatibility();

              if (
                !browserCompatibility.scannerSupport ||
                (!singleImageModeForced && !singleImageModeFallbackAllowed && !browserCompatibility.fullSupport)
              ) {
                return promise$1.reject(new UnsupportedBrowserError(browserCompatibility));
              }

              if (exports.userLicenseKey == null || exports.userLicenseKey.trim() === "") {
                return promise$1.reject(
                  new CustomError({
                    name: "LibraryNotConfiguredError",
                    message:
                      "The library has not correctly been configured yet, please call 'configure' with valid parameters"
                  })
                );
              }

              if (!exports.BrowserHelper.isValidHTMLElement(originElement)) {
                return promise$1.reject(
                  new CustomError({
                    name: "NoOriginElementError",
                    message: "A valid origin HTML element must be given"
                  })
                );
              }

              var barcodePicker = new BarcodePicker(originElement, {
                visible: visible,
                singleImageMode: browserCompatibility.fullSupport ? singleImageModeForced : true,
                playSoundOnScan: playSoundOnScan,
                vibrateOnScan: vibrateOnScan,
                scanningPaused: scanningPaused,
                guiStyle: guiStyle,
                videoFit: videoFit,
                laserArea: laserArea,
                viewfinderArea: viewfinderArea,
                scanner: scanner,
                scanSettings: scanSettings,
                targetScanningFPS: targetScanningFPS,
                // tslint:disable-next-line:use-named-parameter
                hideLogo: arguments[1] == null ? false : arguments[1].hideLogo === true // Hidden parameter
              });
              barcodePicker.cameraManager.setInteractionOptions(
                enableCameraSwitcher,
                enableTorchToggle,
                enableTapToFocus,
                enablePinchToZoom
              );
              barcodePicker.cameraManager.setSelectedCamera(camera);
              barcodePicker.cameraManager.setSelectedCameraSettings(cameraSettings);
              barcodePicker.cameraAccess = accessCamera; // Show error in alert on ScanError by default when running on local IP address for easier customer debugging

              barcodePicker.on("scanError", function(error) {
                // istanbul ignore if
                if (["localhost", "127.0.0.1", ""].includes(window.location.hostname)) {
                  alert(error);
                }
              });

              if (accessCamera) {
                return barcodePicker.cameraManager.setupCameras().then(function() {
                  return barcodePicker;
                });
              }

              return promise$1.resolve(barcodePicker);
            }
          }
        ]
      );

      return BarcodePicker;
    })(); // istanbul ignore next

  (function(BarcodePicker) {
    /**
     * GUI style to be used by a barcode picker, used to hint barcode placement in the frame.
     */
    var GuiStyle;

    (function(GuiStyle) {
      /**
       * No GUI is shown to indicate where the barcode should be placed.
       * Be aware that the Scandit logo continues to be displayed as showing it is part of the license agreement.
       */
      GuiStyle["NONE"] = "none";
      /**
       * A laser line is shown.
       */

      GuiStyle["LASER"] = "laser";
      /**
       * A rectangular viewfinder with rounded corners is shown.
       */

      GuiStyle["VIEWFINDER"] = "viewfinder";
    })((GuiStyle = BarcodePicker.GuiStyle || (BarcodePicker.GuiStyle = {})));
    /**
     * Fit type used to control the resizing (scale) of the barcode picker to fit in its container *originElement*.
     */

    var ObjectFit;

    (function(ObjectFit) {
      /**
       * Scale to maintain aspect ratio while fitting within the *originElement*'s content box.
       * Aspect ratio is preserved, so the barcode picker will be "letterboxed" if its aspect ratio
       * does not match the aspect ratio of the box.
       */
      ObjectFit["CONTAIN"] = "contain";
      /**
       * Scale to maintain aspect ratio while filling the *originElement*'s entire content box.
       * Aspect ratio is preserved, so the barcode picker will be clipped to fit if its aspect ratio
       * does not match the aspect ratio of the box.
       */

      ObjectFit["COVER"] = "cover";
    })((ObjectFit = BarcodePicker.ObjectFit || (BarcodePicker.ObjectFit = {})));
  })(exports.BarcodePicker || (exports.BarcodePicker = {}));

  /**
   * @hidden
   */

  var deviceId = exports.BrowserHelper.getDeviceId();
  /**
   * Initialize and configure the Scandit Barcode Scanner SDK library. This function must be called as first thing
   * before using any other function of the library.
   *
   * Depending on parameters and device features, any of the following errors could be the rejected result of the returned
   * promise:
   * - `NoLicenseKeyError`
   * - `UnsupportedBrowserError`
   *
   * Camera access requests and external Scandit Engine library loads are done lazily only when needed by a
   * [[BarcodePicker]] (or [[Scanner]]) object. To make the loading process faster when scanning is actually needed, it is
   * recommended depending on the use case to create in advance a (hidden and paused) [[BarcodePicker]] or [[Scanner]]
   * object, to later simply show and unpause it when needed. You can also eagerly ask only for camera access permissions
   * by calling the [[CameraAccess.getCameras]] function.
   *
   * @param licenseKey The Scandit license key to be used by the library.
   * @param engineLocation <div class="tsd-signature-symbol">Default =&nbsp;"/"</div>
   * The location of the folder containing the external scandit-engine-sdk.min.js and
   * scandit-engine-sdk.wasm files (external Scandit Engine library).
   * By default they are retrieved from the root of the web application.
   * Can be a full URL to folder or an absolute folder path.
   * @returns A promise resolving when the library has been configured.
   */

  function configure(licenseKey) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$engineLocation = _ref.engineLocation,
      engineLocation = _ref$engineLocation === void 0 ? "/" : _ref$engineLocation;

    var browserCompatibility = exports.BrowserHelper.checkBrowserCompatibility();

    if (!browserCompatibility.fullSupport && !browserCompatibility.scannerSupport) {
      return promise$1.reject(new UnsupportedBrowserError(browserCompatibility));
    }

    if (licenseKey == null || licenseKey.trim() === "") {
      return promise$1.reject(
        new CustomError({
          name: "NoLicenseKeyError",
          message: "No license key provided"
        })
      );
    }

    exports.userLicenseKey = licenseKey;
    engineLocation += engineLocation.slice(-1) === "/" ? "" : "/";

    if (/^https?:\/\//.test(engineLocation)) {
      exports.scanditEngineLocation = "".concat(engineLocation);
    } else {
      engineLocation = engineLocation
        .split("/")
        .filter(function(s) {
          return s.length > 0;
        })
        .join("/");

      if (engineLocation === "") {
        engineLocation = "/";
      } else {
        engineLocation = "/".concat(engineLocation, "/");
      }

      if (location.protocol === "file:" || location.origin === "null") {
        exports.scanditEngineLocation = ""
          .concat(
            location.href
              .split("/")
              .slice(0, -1)
              .join("/")
          )
          .concat(engineLocation);
      } else {
        exports.scanditEngineLocation = "".concat(location.origin).concat(engineLocation);
      }
    }

    return promise$1.resolve();
  }

  exports.CustomError = CustomError;
  exports.ScanResult = ScanResult;
  exports.ScanSettings = ScanSettings;
  exports.UAParser = uaParser_1;
  exports.configure = configure;
  exports.deviceId = deviceId;
  exports.engine = engine;
  exports.engineWorkerBlob = engineWorkerBlob;
  exports.engineWorkerFunction = engineWorkerFunction;

  Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=index.js.map
