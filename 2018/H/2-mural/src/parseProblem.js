import { parseCase } from './parseCase'

export const parseProblem = (line, problem) => {
  if (!problem.T || problem.T === 0) {
    const result = {
      ...problem,
      T: parseInt(line)
    }

    return result
  }

  const cases = [...problem.cases]

  if (cases.length === 0 || cases[cases.length - 1].isComplete === true) {
    cases.push({
      isComplete: false
    })
  }

  const currentCase = cases[cases.length - 1]
  cases[cases.length - 1] = parseCase(line, currentCase)

  const isComplete = (cases.length === problem.T && cases[cases.length - 1].isComplete)

  const result = {
    ...problem,
    cases,
    isComplete
  }

  return result
}
