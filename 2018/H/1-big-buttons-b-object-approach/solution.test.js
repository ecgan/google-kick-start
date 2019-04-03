import { solve, CaseParser } from './solution'

test('1', () => {
  const caseParser = new CaseParser()
  caseParser.readline('3 2')
  caseParser.readline('BBB')
  caseParser.readline('RB')

  const result = solve(caseParser.getCase())

  expect(result).toBe(5)
})

test('2', () => {
  const caseParser = new CaseParser()
  caseParser.readline('5 1')
  caseParser.readline('R')

  const result = solve(caseParser.getCase())

  expect(result).toBe(16)
})

test('3', () => {
  const caseParser = new CaseParser()
  caseParser.readline('4 3')
  caseParser.readline('R')
  caseParser.readline('B')
  caseParser.readline('RBRB')

  const result = solve(caseParser.getCase())

  expect(result).toBe(0)
})

test('4', () => {
  const caseParser = new CaseParser()
  caseParser.readline('50 5')
  caseParser.readline('BRBRBBBRBRRRBBB')
  caseParser.readline('BRBRBRRRBRRRBRB')
  caseParser.readline('BBBRBBBRBRRRBBB')
  caseParser.readline('BRBRBRRRBRRRB')
  caseParser.readline('BRBRBBBRBBBRB')

  const result = solve(caseParser.getCase())

  expect(result).toBe(1125556309458944)
})

test('5', () => {
  const caseParser = new CaseParser()
  caseParser.readline('5 2')
  caseParser.readline('RR')
  caseParser.readline('RB')

  const result = solve(caseParser.getCase())

  expect(result).toBe(16)
})

test('6', () => {
  const caseParser = new CaseParser()
  caseParser.readline('50 2')
  caseParser.readline('B')
  caseParser.readline('R')

  const result = solve(caseParser.getCase())

  expect(result).toBe(0)
})
