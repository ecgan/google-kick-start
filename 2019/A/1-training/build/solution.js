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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
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
  var isProcessing = data.isProcessing,
      result = _objectWithoutProperties(data, ["isProcessing"]);

  if (!result.N) {
    var _numbers = line.split(' ');

    result.N = parseInt(_numbers[0]);
    result.P = parseInt(_numbers[1]);
    result.isProcessing = true;
    return result;
  }

  var numbers = line.split(' ');
  result.students = numbers.map(function (n) {
    return parseInt(n);
  });
  return result;
};

var parseProblem = function parseProblem(line, problem) {
  if (!problem.T || problem.T === 0) {
    var _result = _objectSpread({}, problem, {
      T: parseInt(line),
      isProcessing: true
    });

    return _result;
  }

  var cases = _toConsumableArray(problem.cases);

  if (cases.length === 0 || !cases[cases.length - 1].isProcessing) {
    cases.push({
      isProcessing: true
    });
  }

  var currentCase = cases[cases.length - 1];
  cases[cases.length - 1] = parseCase(line, currentCase);
  var isProcessing = cases.length < problem.T || cases[cases.length - 1].isProcessing;

  var result = _objectSpread({}, problem, {
    cases,
    isProcessing
  });

  return result;
};

var solve = function solve(data) {
  var P = data.P,
      _data$students = data.students,
      students = _data$students === void 0 ? [] : _data$students;

  var sorted = _toConsumableArray(students).sort(function (a, b) {
    return a - b;
  });

  var hillDiffSum = 0;
  var baseDiffSum = 0;

  for (var i = 1; i < P; i++) {
    var diff = sorted[i] - sorted[i - 1];
    hillDiffSum += diff * i;
    baseDiffSum += diff;
  }

  var min = hillDiffSum;

  for (var _i = P; _i < sorted.length; _i++) {
    var headDiff = sorted[_i] - sorted[_i - 1];
    var tailDiff = sorted[_i - (P - 1)] - sorted[_i - P];
    hillDiffSum = hillDiffSum - baseDiffSum + headDiff * (P - 1);
    baseDiffSum = baseDiffSum + headDiff - tailDiff;

    if (hillDiffSum < min) {
      min = hillDiffSum;
    }
  }

  return min;
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
    isProcessing: true
  };
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', function (line) {
    problem = parseProblem(line, problem);

    if (!problem.isProcessing) {
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
