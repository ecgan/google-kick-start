 
'use strict'

//
// solve
//
function solve(data) {
  if (data.trie.root.isPrefixEnded) {
    return 0
  }

  const initialTotal = Math.pow(2, data.N)
  const branches = getTrieBranches(data.trie.root)
  
  const subtractValues = branches
    .map(b => {
      return Math.pow(2, data.N - b)
    })
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  return initialTotal - subtractValues
}

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : [].slice.call(arr);
};

function getTrieBranches(node) {
  if (!node) {
    return []
  }

  if (node.isPrefixEnded) {
    return [0]
  }

  const branchB = getTrieBranches(node.children.B).map(x => x+1)
  const branchR = getTrieBranches(node.children.R).map(x => x+1)

  let result = []
  result = result.concat(branchB).concat(branchR)

  return result
}

class TrieNode {
  constructor(value) {
    this._value = value
    this.children = {}
    this.isPrefixEnded = false
  }

  get value() {
    return this._value
  }
}

//
// Trie
//
class Trie {
  constructor() {
    this.root = new TrieNode('')
  }
  
  add(prefix) {
    let currentTrieNode = this.root
    for (let index = 0; index < prefix.length; index++) {
      const char = prefix[index];

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

  checkAddNode (char, node) {
    if (!node.children[char] && node.isPrefixEnded === false) {
      node.children[char] = new TrieNode(char)
    }

    return node.children[char]
  }

  preCheckLastNode (char, node) {
    const otherChar = this.getOtherChar(char)

    if (
      !node.children[char] && 
      node.children[otherChar] &&
      node.children[otherChar].isPrefixEnded
    ) {
      node.isPrefixEnded = true
      node.children = {}
    }

    return node
  }

  getOtherChar(char) {
    return char === 'B' ? 'R' : 'B'
  }
}

//
// CaseParser
//
class CaseParser {
  constructor(caseNumber) {
    this.caseNo = caseNumber

    this.N = 0
    this.P = 0
    this.currentP = 0
    this.prefixes = []
    this.trie = new Trie()
    
    this.state = '1'
  }

  readline(line) {
    switch (this.state) {
      case '1': {
        const firstLine = line.split(' ')
        this.N = parseInt(firstLine[0])
        this.P = parseInt(firstLine[1])

        this.state = 'rows'
        break
      }

      case 'rows': {
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

  isComplete() {
    return (this.state === 'done')
  }

  getCase() {
    return {
      caseNo: this.caseNo,
      N: this.N,
      P: this.P,
      prefixes: this.prefixes,
      trie: this.trie
    }
  }
}

//
// ProblemParser
//
class ProblemParser {
  constructor() {
    this.t = 0
    this.currentT = 0
    this.cases = []
    this.caseParser = new CaseParser(1)
    this.state = 't'
  }

  readline(line) {
    switch (this.state) {
      case 't': {
        this.t = parseInt(line)
        this.state = 'case'
        break
      }
    
      case 'case': {
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

  isComplete() {
    return (this.state === 'done')
  }

  getCases() {
    return this.cases
  }
}

//
// solveCases
//
function solveCases(cases) {
  for (let index = 0; index < cases.length; index++) {
    const result = solve(cases[index])
    console.log(`Case #${index + 1}: ${result}`)
  }
}

//
// Main
//
function main() {
  const readline = require('readline')
  const problemParser = new ProblemParser()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (line) => {
    problemParser.readline(line)

    if (problemParser.isComplete()) {
      rl.close()
    }
  }).on('close', () => {
      solveCases(problemParser.getCases())
      process.exit(0)
    }
  )
}

if (!module.parent) {
  main()
}

module.exports = {
  solve,
  CaseParser
}
