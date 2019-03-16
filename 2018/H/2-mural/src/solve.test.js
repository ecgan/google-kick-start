import { solve } from './solve'

test('Google sample 1', () => {
  const data = {
    digits: '1332'
  }

  const result = solve(data)

  expect(result).toBe(6)
})

test('Google sample 2', () => {
  const data = {
    digits: '9583'
  }

  const result = solve(data)

  expect(result).toBe(14)
})

test('Google sample 3', () => {
  const data = {
    digits: '616'
  }

  const result = solve(data)

  expect(result).toBe(7)
})

test('Google sample 4', () => {
  const data = {
    digits: '1029384756'
  }

  const result = solve(data)

  expect(result).toBe(31)
})
