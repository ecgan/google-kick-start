'use strict' //
// solve
//

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function solve (data) {
  if (data.trie.root.isPrefixEnded) {
    return 0
  }

  var initialTotal = Math.pow(2, data.N)
  var branches = getTrieBranchLengths(data.trie.root)
  var subtractValues = branches.map(function (b) {
    return Math.pow(2, data.N - b)
  }).reduce(function (acc, cur) {
    return acc + cur
  }, 0)
  return initialTotal - subtractValues
}

function getTrieBranchLengths (node) {
  if (!node) {
    return []
  }

  if (node.isPrefixEnded) {
    return [0]
  }

  var branchB = getTrieBranchLengths(node.children.B).map(function (x) {
    return x + 1
  })
  var branchR = getTrieBranchLengths(node.children.R).map(function (x) {
    return x + 1
  })
  var result = [].concat(branchB).concat(branchR)
  return result
}

var TrieNode = function TrieNode () {
  _classCallCheck(this, TrieNode)

  this.children = {}
  this.isPrefixEnded = false
} //
// Trie
//

var Trie =
/* #__PURE__ */
(function () {
  function Trie () {
    _classCallCheck(this, Trie)

    this.root = new TrieNode()
  }

  _createClass(Trie, [{
    key: 'add',
    value: function add (prefix) {
      var currentTrieNode = this.root

      for (var index = 0; index < prefix.length; index++) {
        var char = prefix[index]

        if (index === prefix.length - 1) {
          currentTrieNode = this.preCheckLastNode(char, currentTrieNode)
        }

        if (currentTrieNode.isPrefixEnded) {
          return
        }

        currentTrieNode = this.checkAddNode(char, currentTrieNode)
      }

      currentTrieNode.isPrefixEnded = true
      currentTrieNode.children = {}
    }
  }, {
    key: 'checkAddNode',
    value: function checkAddNode (char, node) {
      if (!node.children[char] && node.isPrefixEnded === false) {
        node.children[char] = new TrieNode()
      }

      return node.children[char]
    }
  }, {
    key: 'preCheckLastNode',
    value: function preCheckLastNode (char, node) {
      var otherChar = this.getOtherChar(char)

      if (!node.children[char] && node.children[otherChar] && node.children[otherChar].isPrefixEnded) {
        node.isPrefixEnded = true
        node.children = {}
      }

      return node
    }
  }, {
    key: 'getOtherChar',
    value: function getOtherChar (char) {
      return char === 'B' ? 'R' : 'B'
    }
  }])

  return Trie
}()) //
// CaseParser
//

var CaseParser =
/* #__PURE__ */
(function () {
  function CaseParser () {
    _classCallCheck(this, CaseParser)

    this.N = 0
    this.P = 0
    this.currentP = 0
    this.prefixes = []
    this.trie = new Trie()
    this.state = '1'
  }

  _createClass(CaseParser, [{
    key: 'readline',
    value: function readline (line) {
      switch (this.state) {
        case '1':
        {
          var firstLine = line.split(' ')
          this.N = parseInt(firstLine[0])
          this.P = parseInt(firstLine[1])
          this.state = 'rows'
          break
        }

        case 'rows':
        {
          this.prefixes.push(line)
          this.trie.add(line)
          this.currentP++

          if (this.currentP === this.P) {
            this.state = 'done'
          }

          break
        }
      }
    }
  }, {
    key: 'isComplete',
    value: function isComplete () {
      return this.state === 'done'
    }
  }, {
    key: 'getCase',
    value: function getCase () {
      return {
        N: this.N,
        P: this.P,
        prefixes: this.prefixes,
        trie: this.trie
      }
    }
  }])

  return CaseParser
}()) //
// ProblemParser
//

var ProblemParser =
/* #__PURE__ */
(function () {
  function ProblemParser () {
    _classCallCheck(this, ProblemParser)

    this.t = 0
    this.currentT = 0
    this.cases = []
    this.caseParser = new CaseParser(1)
    this.state = 't'
  }

  _createClass(ProblemParser, [{
    key: 'readline',
    value: function readline (line) {
      switch (this.state) {
        case 't':
        {
          this.t = parseInt(line)
          this.state = 'case'
          break
        }

        case 'case':
        {
          this.caseParser.readline(line)

          if (this.caseParser.isComplete()) {
            this.cases.push(this.caseParser.getCase())
            this.currentT += 1
            this.caseParser = new CaseParser(this.currentT + 1)
          }

          break
        }
      }

      if (this.currentT === this.t) {
        this.state = 'done'
      }
    }
  }, {
    key: 'isComplete',
    value: function isComplete () {
      return this.state === 'done'
    }
  }, {
    key: 'getCases',
    value: function getCases () {
      return this.cases
    }
  }])

  return ProblemParser
}()) //
// solveCases
//

function solveCases (cases) {
  for (var index = 0; index < cases.length; index++) {
    var result = solve(cases[index])
    console.log(`Case #${index + 1}: ${result}`)
  }
} //
// Main
//

function main () {
  var readline = require('readline')

  var problemParser = new ProblemParser()
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.on('line', function (line) {
    problemParser.readline(line)

    if (problemParser.isComplete()) {
      rl.close()
    }
  }).on('close', function () {
    solveCases(problemParser.getCases())
    process.exit(0)
  })
}

if (!module.parent) {
  main()
}

module.exports = {
  solve,
  CaseParser
}
