import { parseCase } from './parseCase'
import { solve } from './solve'

test('Google sample 1', () => {
  let data = {}
  data = parseCase('4 3', data)
  data = parseCase('3 1 9 100', data)

  const result = solve(data)

  expect(result).toBe(14)
})
