'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var parseCase = function parseCase(line, data) {
  var result = _objectSpread({}, data);

  if (!result.N) {
    result.N = parseInt(line);
    return result;
  }

  result.digits = line;
  result.isComplete = true;
  return result;
};

var parseProblem = function parseProblem(line, problem) {
  if (!problem.T || problem.T === 0) {
    var _result = _objectSpread({}, problem, {
      T: parseInt(line)
    });

    return _result;
  }

  var cases = _toConsumableArray(problem.cases);

  if (cases.length === 0 || cases[cases.length - 1].isComplete === true) {
    cases.push({
      isComplete: false
    });
  }

  var currentCase = cases[cases.length - 1];
  cases[cases.length - 1] = parseCase(line, currentCase);
  var isComplete = cases.length === problem.T && cases[cases.length - 1].isComplete;

  var result = _objectSpread({}, problem, {
    cases,
    isComplete
  });

  return result;
};

var solve = function solve(data) {
  var digits = data.digits;
  var max = 0;
  var sums = [];
  var paintLength = Math.ceil(digits.length / 2);

  for (var i = 0; i < digits.length; i++) {
    var digit = parseInt(digits[i]);

    if (i === 0) {
      sums[i] = digit;
    } else {
      sums[i] = sums[i - 1] + digit;
    }

    if (i + 1 - paintLength < 0) {
      continue;
    }

    var sumsTail = i - paintLength < 0 ? 0 : sums[i - paintLength];
    var paintScore = sums[i] - sumsTail;

    if (paintScore > max) {
      max = paintScore;
    }
  }

  return max;
};

var solveCases = function solveCases(cases) {
  for (var index = 0; index < cases.length; index++) {
    var result = solve(cases[index]);
    console.log(`Case #${index + 1}: ${result}`);
  }
};

var main = function main() {
  var readline = require('readline');

  var problem = {
    T: 0,
    cases: [],
    isComplete: false
  };
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', function (line) {
    problem = parseProblem(line, problem);

    if (problem.isComplete) {
      rl.close();
    }
  }).on('close', function () {
    solveCases(problem.cases);
    process.exit(0);
  });
};

if (!module.parent) {
  main();
}
