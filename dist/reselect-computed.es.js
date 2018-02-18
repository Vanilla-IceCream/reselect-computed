var bindSelectCreators = function (selectors, state) {
  var obj = {};
  var keys = Object.keys(selectors);

  for (var i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = selectors[keys[i]](state);
  }

  return obj;
};

export { bindSelectCreators };
//# sourceMappingURL=reselect-computed.es.js.map
