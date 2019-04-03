"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseParser = exports.solve = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var solve = function solve(data) {
  if (data.trie.isPrefixEnded) {
    return 0;
  }

  var initialTotal = Math.pow(2, data.N);
  var branches = getTrieBranchLengths(data.trie);
  var subtractValues = branches.map(function (b) {
    return Math.pow(2, data.N - b);
  }).reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  return initialTotal - subtractValues;
};

exports.solve = solve;

function getTrieBranchLengths(node) {
  if (!node) {
    return [];
  }

  if (node.isPrefixEnded) {
    return [0];
  }

  var branchB = getTrieBranchLengths(node.B).map(function (x) {
    return x + 1;
  });
  var branchR = getTrieBranchLengths(node.R).map(function (x) {
    return x + 1;
  });
  var result = [].concat(branchB).concat(branchR);
  return result;
}

var addPrefixToTrie = function addPrefixToTrie(prefix, trie) {
  if (prefix.length === 0) {
    return {
      isPrefixEnded: true
    };
  }

  if (prefix.length === 1) {
    trie = preCheckLastNode(prefix, trie);
  }

  if (trie.isPrefixEnded) {
    return trie;
  }

  var char = prefix.slice(0, 1);
  var remainPrefix = prefix.slice(1);

  var result = _objectSpread({}, trie);

  if (!result[char] && result.isPrefixEnded === false) {
    result[char] = {
      isPrefixEnded: false
    };
  }

  result[char] = addPrefixToTrie(remainPrefix, result[char]);
  return result;
};

var getOtherChar = function getOtherChar(char) {
  return char === 'B' ? 'R' : 'B';
};

var preCheckLastNode = function preCheckLastNode(char, node) {
  var otherChar = getOtherChar(char);

  if (!node[char] && node[otherChar] && node[otherChar].isPrefixEnded) {
    return {
      isPrefixEnded: true
    };
  }

  return node;
};

var CaseParser =
/*#__PURE__*/
function () {
  function CaseParser() {
    _classCallCheck(this, CaseParser);

    this.N = 0;
    this.P = 0;
    this.currentP = 0;
    this.prefixes = [];
    this.trie = {
      isPrefixEnded: false
    };
    this.state = '1';
  }

  _createClass(CaseParser, [{
    key: "readline",
    value: function readline(line) {
      switch (this.state) {
        case '1':
          {
            var firstLine = line.split(' ');
            this.N = parseInt(firstLine[0]);
            this.P = parseInt(firstLine[1]);
            this.state = 'rows';
            break;
          }

        case 'rows':
          {
            this.prefixes.push(line);
            this.trie = addPrefixToTrie(line, this.trie);
            this.currentP++;

            if (this.currentP === this.P) {
              this.state = 'done';
            }

            break;
          }
      }
    }
  }, {
    key: "isComplete",
    value: function isComplete() {
      return this.state === 'done';
    }
  }, {
    key: "getCase",
    value: function getCase() {
      return {
        N: this.N,
        P: this.P,
        prefixes: this.prefixes,
        trie: this.trie
      };
    }
  }]);

  return CaseParser;
}(); //
// ProblemParser
//


exports.CaseParser = CaseParser;

var ProblemParser =
/*#__PURE__*/
function () {
  function ProblemParser() {
    _classCallCheck(this, ProblemParser);

    this.t = 0;
    this.currentT = 0;
    this.cases = [];
    this.caseParser = new CaseParser(1);
    this.state = 't';
  }

  _createClass(ProblemParser, [{
    key: "readline",
    value: function readline(line) {
      switch (this.state) {
        case 't':
          {
            this.t = parseInt(line);
            this.state = 'case';
            break;
          }

        case 'case':
          {
            this.caseParser.readline(line);

            if (this.caseParser.isComplete()) {
              this.cases.push(this.caseParser.getCase());
              this.currentT += 1;
              this.caseParser = new CaseParser(this.currentT + 1);
            }

            break;
          }
      }

      if (this.currentT === this.t) {
        this.state = 'done';
      }
    }
  }, {
    key: "isComplete",
    value: function isComplete() {
      return this.state === 'done';
    }
  }, {
    key: "getCases",
    value: function getCases() {
      return this.cases;
    }
  }]);

  return ProblemParser;
}(); //
// solveCases
//


function solveCases(cases) {
  for (var index = 0; index < cases.length; index++) {
    var result = solve(cases[index]);
    console.log(`Case #${index + 1}: ${result}`);
  }
} //
// Main
//


function main() {
  var readline = require('readline');

  var problemParser = new ProblemParser();
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', function (line) {
    problemParser.readline(line);

    if (problemParser.isComplete()) {
      rl.close();
    }
  }).on('close', function () {
    solveCases(problemParser.getCases());
    process.exit(0);
  });
}

if (!module.parent) {
  main();
} // module.exports = {
//   solve,
//   CaseParser
// }
