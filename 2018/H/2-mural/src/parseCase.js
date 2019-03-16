export const parseCase = (line, data) => {
  const result = { ...data }

  if (!result.N) {
    result.N = parseInt(line)
    return result
  }

  result.digits = line
  result.isComplete = true

  return result
}
