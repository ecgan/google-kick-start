export const solve = (data) => {
  if (data.trie.isPrefixEnded) {
    return 0
  }

  const initialTotal = Math.pow(2, data.N)
  const branches = getTrieBranchLengths(data.trie)

  const subtractValues = branches
    .map(b => {
      return Math.pow(2, data.N - b)
    })
    .reduce((acc, cur) => {
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

  const branchB = getTrieBranchLengths(node.B).map(x => x + 1)
  const branchR = getTrieBranchLengths(node.R).map(x => x + 1)

  const result = [].concat(branchB).concat(branchR)

  return result
}

const addPrefixToTrie = (prefix, trie) => {
  if (prefix.length === 0) {
    return {
      isPrefixEnded: true
    }
  }

  if (prefix.length === 1) {
    trie = preCheckLastNode(prefix, trie)
  }

  if (trie.isPrefixEnded) {
    return trie
  }

  const char = prefix.slice(0, 1)
  const remainPrefix = prefix.slice(1)

  const result = { ...trie }

  if (!result[char] && result.isPrefixEnded === false) {
    result[char] = {
      isPrefixEnded: false
    }
  }

  result[char] = addPrefixToTrie(remainPrefix, result[char])

  return result
}

const getOtherChar = (char) => {
  return char === 'B' ? 'R' : 'B'
}

const preCheckLastNode = (char, node) => {
  const otherChar = getOtherChar(char)

  if (
    !node[char] &&
    node[otherChar] &&
    node[otherChar].isPrefixEnded
  ) {
    return {
      isPrefixEnded: true
    }
  }

  return node
}

export const CaseParser = class {
  constructor () {
    this.N = 0
    this.P = 0
    this.currentP = 0
    this.prefixes = []
    this.trie = {
      isPrefixEnded: false
    }

    this.state = '1'
  }

  readline (line) {
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
        this.trie = addPrefixToTrie(line, this.trie)
        this.currentP++

        if (this.currentP === this.P) {
          this.state = 'done'
        }

        break
      }
    }
  }

  isComplete () {
    return (this.state === 'done')
  }

  getCase () {
    return {
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
  constructor () {
    this.t = 0
    this.currentT = 0
    this.cases = []
    this.caseParser = new CaseParser(1)
    this.state = 't'
  }

  readline (line) {
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

  isComplete () {
    return (this.state === 'done')
  }

  getCases () {
    return this.cases
  }
}

//
// solveCases
//
function solveCases (cases) {
  for (let index = 0; index < cases.length; index++) {
    const result = solve(cases[index])
    console.log(`Case #${index + 1}: ${result}`)
  }
}

//
// Main
//
function main () {
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
