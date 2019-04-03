export const solve = (data) => {
  const { P, students = [] } = data

  const sorted = [...students].sort((a, b) => {
    return a - b
  })

  let hillDiffSum = 0
  let baseDiffSum = 0

  for (let i = 1; i < P; i++) {
    const diff = sorted[i] - sorted[i - 1]
    hillDiffSum += diff * i
    baseDiffSum += diff
  }

  let min = hillDiffSum

  for (let i = P; i < sorted.length; i++) {
    const headDiff = sorted[i] - sorted[i - 1]
    const tailDiff = sorted[i - (P - 1)] - sorted[i - P]

    hillDiffSum = hillDiffSum - baseDiffSum + (headDiff * (P - 1))
    baseDiffSum = baseDiffSum + headDiff - tailDiff

    if (hillDiffSum < min) {
      min = hillDiffSum
    }
  }

  return min
}
