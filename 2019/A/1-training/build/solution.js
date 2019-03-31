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
    var _numbers = line.split(' ');

    result.N = parseInt(_numbers[0]);
    result.P = parseInt(_numbers[1]);
    return result;
  }

  var numbers = line.split(' ');
  result.students = numbers.map(function (n) {
    return parseInt(n);
  });
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
  var N = data.N,
      P = data.P,
      _data$students = data.students,
      students = _data$students === void 0 ? [] : _data$students;
  students.sort(function (a, b) {
    return a - b;
  });
  var lineSum = 0;
  var hillSum = 0;

  for (var i = 1; i < P; i++) {
    var diff = students[i] - students[i - 1];
    hillSum += diff * i;
    lineSum += diff;
  }

  var min = hillSum;

  for (var _i = P; _i < students.length; _i++) {
    var headDiff = students[_i] - students[_i - 1];
    var tailDiff = students[_i - (P - 1)] - students[_i - P];
    hillSum = hillSum - lineSum + headDiff * (P - 1);
    lineSum = lineSum + headDiff - tailDiff;

    if (hillSum < min) {
      min = hillSum;
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
