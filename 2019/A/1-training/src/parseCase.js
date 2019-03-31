export const parseCase = (line, data) => {
  const result = { ...data }

  if (!result.N) {
    const numbers = line.split(' ')
    result.N = parseInt(numbers[0])
    result.P = parseInt(numbers[1])
    return result
  }

  const numbers = line.split(' ')
  result.students = numbers.map(n => {
    return parseInt(n)
  })
  result.isComplete = true

  return result
}
