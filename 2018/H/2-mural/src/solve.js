export const solve = (data) => {
  const { digits } = data

  let max = 0
  const sums = []
  const paintLength = Math.ceil(digits.length / 2)

  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i])

    if (i === 0) {
      sums[i] = digit
    } else {
      sums[i] = sums[i - 1] + digit
    }

    if ((i + 1) - paintLength < 0) {
      continue
    }

    const sumsTail = (i - paintLength < 0) ? 0 : sums[i - paintLength]
    const paintScore = sums[i] - sumsTail

    if (paintScore > max) {
      max = paintScore
    }
  }

  return max
}
