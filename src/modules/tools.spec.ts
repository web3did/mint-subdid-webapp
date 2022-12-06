import { collapseString, isMobile } from '~/modules/tools'

describe('isMobile', () => {
  test('isMobile to be false', () => {
    const ret = isMobile()
    expect(ret).toBeFalsy()
  })
})

describe('collapseString', () => {
  test('123456789012 after processing: 123456789012', () => {
    const value = '123456789012'
    const ret = collapseString(value)
    expect(ret).toBe(value)
  })

  test('12345678901234 after processing: 1234...1234', () => {
    const value = collapseString('12345678901234')
    expect(value).toBe('1234...1234')
  })
})
