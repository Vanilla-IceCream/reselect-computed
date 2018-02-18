'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bindSelectCreators = function (selectors, state) {
  var obj = {};
  var keys = Object.keys(selectors);

  for (var i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = selectors[keys[i]](state);
  }

  return obj;
};

exports.bindSelectCreators = bindSelectCreators;
//# sourceMappingURL=reselect-computed.cjs.js.map
