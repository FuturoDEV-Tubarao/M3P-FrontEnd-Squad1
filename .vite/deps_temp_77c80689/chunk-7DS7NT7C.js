import {
  __esm
} from "./chunk-ROME4SDB.js";

// node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}
var init_emotion_memoize_esm = __esm({
  "node_modules/@emotion/memoize/dist/emotion-memoize.esm.js"() {
  }
});

export {
  memoize,
  init_emotion_memoize_esm
};
//# sourceMappingURL=chunk-7DS7NT7C.js.map
