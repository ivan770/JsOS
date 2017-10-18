'use strict';

/* eslint-disable no-param-reassign, no-nested-ternary, func-names */

// File-Size | 1.0.0 | MIT | Nijiko Yonskai <nijikokun@gmail.com> | 2015
(plugin => {
    /* istanbul ignore next: differing implementations */
  module.exports = plugin();
})(() => {
  const units = 'BKMGTPEZY'.split('');
  function equals(a, b) { return a && a.toLowerCase() === b.toLowerCase(); }

  return function filesize(bytes, options) {
    bytes = typeof bytes === 'number' ? bytes : 0;
    options = options || {};
    options.fixed = typeof options.fixed === 'number' ? options.fixed : 2;
    options.spacer = typeof options.spacer === 'string' ? options.spacer : ' ';

    options.calculate = spec => {
      const type = equals(spec, 'si') ? ['k', 'B'] : ['K', 'iB'];
      const algorithm = equals(spec, 'si') ? 1e3 : 1024;
      const magnitude = Math.log(bytes) / Math.log(algorithm) | 0;
      const result = (bytes / Math.pow(algorithm, magnitude));
      const fixed = result.toFixed(options.fixed);
      const suffix = magnitude
          ? (`${type[0]}MGTPEZY`)[magnitude - 1] + type[1]
          : ((fixed | 0) === 1 ? 'Byte' : 'Bytes');

      if (magnitude - 1 < 3 && !equals(spec, 'si') && equals(spec, 'jedec')) { type[1] = 'B'; }

      return {
        suffix,
        magnitude,
        result,
        fixed,
        bits: { result: result / 8, fixed: (result / 8).toFixed(options.fixed) },
      };
    };

    options.to = function (unit, spec) {
      const algorithm = equals(spec, 'si') ? 1e3 : 1024;
      let position = units.indexOf(typeof unit === 'string' ? unit[0].toUpperCase() : 'B');
      let result = bytes;

      if (position === -1 || position === 0) return result.toFixed(2);
      for (; position > 0; position--) result /= algorithm;
      return result.toFixed(2);
    };

    options.human = function (spec) {
      const output = options.calculate(spec);
      return output.fixed + options.spacer + output.suffix;
    };

    return options;
  };
});
