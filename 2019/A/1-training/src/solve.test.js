import { solve } from './solve'

test('Google sample 1', () => {
  const data = {
    N: 4,
    P: 3,
    students: [3, 1, 9, 100]
  }

  const result = solve(data)

  expect(result).toBe(14)
})

test('Google sample 2', () => {
  const data = {
    N: 6,
    P: 2,
    students: [5, 5, 1, 2, 3, 4]
  }

  const result = solve(data)

  expect(result).toBe(0)
})

test('Google sample 3', () => {
  const data = {
    N: 5,
    P: 5,
    students: [7, 7, 1, 7, 7]
  }

  const result = solve(data)

  expect(result).toBe(6)
})

test('2 pick 2, require training', () => {
  const data = {
    N: 2,
    P: 2,
    students: [1, 10000]
  }

  const result = solve(data)

  expect(result).toBe(9999)
})

test('2 pick 2, no training required', () => {
  const data = {
    N: 2,
    P: 2,
    students: [10000, 10000]
  }

  const result = solve(data)

  expect(result).toBe(0)
})

test('5 pick 3, result is any contiguous three', () => {
  const data = {
    N: 5,
    P: 3,
    students: [5, 4, 3, 2, 1]
  }

  const result = solve(data)

  expect(result).toBe(3)
})

test('5 pick 3 - 1st, 3rd and 5th element are equidistance 4 units apart - result is the last three', () => {
  const data = {
    N: 5,
    P: 3,
    students: [1, 2, 5, 8, 9]
  }

  const result = solve(data)

  expect(result).toBe(5)
})

test('5 pick 3, result is the last three', () => {
  const data = {
    N: 5,
    P: 3,
    students: [1, 2, 60, 99, 100]
  }

  const result = solve(data)

  expect(result).toBe(41)
})

test('5 pick 3, result is the first three', () => {
  const data = {
    N: 5,
    P: 3,
    students: [15, 60, 60, 91, 100]
  }

  const result = solve(data)

  expect(result).toBe(45)
})
